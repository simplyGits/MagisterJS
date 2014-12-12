###*
# A JavaScript implementation of the Magister 6 API.
# @author Lieuwe Rooijakkers
# @module Magister
###

###*
# Class to communicate with Magister.
#
# @class Magister
# @param magisterSchool {MagisterSchool|String} A MagisterSchool to logon to. If this is a String it will use that String as a query to search for a possible school.
# @param username {String} The username of the user to login to.
# @param password {String} The password of the user to login to.
# @param [_keepLoggedIn=true] {Boolean} Whether or not to keep the user logged in.
# @constructor
###
class @Magister
	constructor: (@magisterSchool, @username, @password, @_keepLoggedIn = yes) ->
		throw new Error "Expected 3 or 4 arguments, got #{arguments.length}" unless arguments.length is 3 or arguments.length is 4
		@_readyCallbacks = [] #Fixes weird bug where callbacks from previous Magister objects were mixed with the new ones.
		@http = new MagisterHttp()

		if _.isString(@magisterSchool)
			MagisterSchool.getSchools @magisterSchool, (e, r) =>
				if e? then throw e
				else if r.length is 0 then throw new Error "No school with the query #{@magisterSchool} found."
				else
					@magisterSchool = r[0]
					@reLogin()

		else @reLogin()

	###*
	# Get the appoinments of the current User between the two given Dates.
	#
	# @method appointments
	# @async
	# @param from {Date} The start date for the Appointments, you won't get appointments from before this date.
	# @param [to] {Date} The end date for the Appointments, you won't get appointments from after this date.
	# @param [fillPersons=true] {Boolean} Whether or not to download the full user objects from the server.
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Appointment[]} An array containing the Appointments.
	###
	appointments: ->
		callback = _.find arguments, (a) -> _.isFunction a
		download = _.find(arguments, (a) -> _.isBoolean a) ? yes
		[from, to] = _.where arguments, (a) -> _.isDate a
		unless _.isDate(to) then to = from

		@_forceReady()
		dateConvert = _helpers.urlDateConvert
		url = "#{@_personUrl}/afspraken?tot=#{dateConvert(to)}&van=#{dateConvert(from)}"
		@http.get url, {},
			(error, result) =>
				if error?
					callback error, null
				else
					result = EJSON.parse result.content
					appointments = (Appointment._convertRaw(@, a) for a in result.Items)
					absences = []

					hit = _helpers.asyncResultWaiter 3, (r) ->
						for a in appointments
							do (a) -> a._absenceInfo = _.find absences, (absence) -> absence.appointmentId is a.id()

						_.remove appointments, (a) -> _helpers.date(a.begin()) < _helpers.date(from) or _helpers.date(a.end()) > _helpers.date(to)
						callback null, _.sortBy appointments, (x) -> x.begin()

					@http.get "#{@_personUrl}/roosterwijzigingen?tot=#{dateConvert(to)}&van=#{dateConvert(from)}", {}, (error, result) =>
						for c in EJSON.parse(result.content).Items
							appointment = Appointment._convertRaw(@, c)
							_.remove appointments, (a) -> a.id() is appointment.id()
							appointments.push appointment
						hit()

					@http.get "#{@_personUrl}/absenties?tot=#{dateConvert(to)}&van=#{dateConvert(from)}", {}, (error, result) ->
						result = EJSON.parse(result.content).Items
						for a in result
							do (a) -> absences.push
								id: a.Id
								begin: new Date Date.parse a.Start
								end: new Date Date.parse a.Eind
								schoolHour: a.Lesuur
								permitted: a.Geoorloofd
								appointmentId: a.AfspraakId
								description: _helpers.trim a.Omschrijving
								type: a.VerantwoordingType
								code: a.Code
						hit()

					if download
						pushResult = _helpers.asyncResultWaiter appointments.length, -> hit()

						for a in appointments
							do (a) =>
								teachers = a.teachers() ? []

								@fillPersons teachers, ((e, r) ->
									a._teachers = r
									pushResult()
								), 3
					else hit()

	###*
	# Gets the MessageFolders that matches the given query. Or if no query is given, all MessageFolders
	#
	# @method messageFolders
	# @param [query] {String} A case insensetive query the MessageFolder need to match.
	# @param [callback] {Function} Not useful at all, just here to prevent possible mistakes.
	#	@param [callback.error] {null} Will always be null
	#	@param [callback.result] {MessageFolder[]} An array containing the matching MessageFolders.
	# @return {MessageFolder[]} An array containing the matching messageFolders.
	###
	messageFolders: (query, callback = ->) ->
		@_forceReady()

		if _.isString(query) and query isnt ""
			result = _.where @_messageFolders, (mF) -> _helpers.contains mF.name(), query, yes
		else
			result = @_messageFolders

		callback null, result
		return result
	###*
	# @method inbox
	# @return {MessageFolder} The inbox of the current user.
	###
	inbox: (callback = ->) -> @messageFolders("postvak in", (e, r) -> callback(null, r[0]))[0]
	###*
	# @method sentItems
	# @return {MessageFolder} The sent items folder of the current user.
	###
	sentItems: (callback = ->) -> @messageFolders("verzonden items", (e, r) -> callback(null, r[0]))[0]
	###*
	# @method bin
	# @return {MessageFolder} The bin of the current user.
	###
	bin: (callback = ->) -> @messageFolders("verwijderde items", (e, r) -> callback(null, r[0]))[0]
	###*
	# @method alerts
	# @return {MessageFolder} The alerts folder of the current user.
	###
	alerts: (callback = ->) -> @messageFolders("mededelingen", (e, r) -> callback(null, r[0]))[0]

	###*
	# Gets the courses of the current User.
	#
	# @method courses
	# @async
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Course[]} An array containing the Courses.
	###
	courses: (callback) ->
		@_forceReady()
		url = "#{@_personUrl}/aanmeldingen"

		@http.get url, {},
			(error, result) =>
				if error?
					callback error, null
				else
					result = EJSON.parse result.content
					callback null, _.sortBy((Course._convertRaw(@, c) for c in result.Items), (c) -> c.begin()).reverse()

	@_cachedPersons: {}
	###*
	# Gets an Array of Persons that matches the given profile.
	#
	# @method getPersons
	# @async
	# @param query {String} The query the persons must match to (e.g: Surname, Name, ...). Should at least be 3 chars long.
	# @param [type] {String|Number} The type the person must have. If none is given it will search for both Teachers and Pupils.
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Person[]} An array containing the Persons.
	###
	getPersons: ->
		@_forceReady()

		query = _helpers.trim arguments[0]
		callback = if arguments.length is 2 then arguments[1] else arguments[2]
		type = arguments[1] if arguments.length is 3

		unless query? and callback? and query.length >= 3
			callback null, []
			return undefined

		unless type? # Try both Teachers and Pupils
			@getPersons query, 3, (e, r) =>
				if e? then callback e, null
				else
					teachers = r
					@getPersons query, 4, (e, r) ->
						if e? then callback e, null
						else callback null, _helpers.pushMore r, teachers
			return undefined

		type = switch Person._convertType type
			when 3 then "Personeel"
			when 4 then "Leerling"
			when 8 then "Project"

			else "Overig"
		url = "#{@_personUrl}/contactpersonen?contactPersoonType=#{type}&q=#{query}"

		if (val = Magister._cachedPersons["#{@_id}#{type}#{query}"])?
			callback null, val
		else
			@http.get url, {}, (error, result) =>
				if error?
					callback error, null
				else
					result = (Person._convertRaw(@, p) for p in EJSON.parse(result.content).Items)

					Magister._cachedPersons["#{@_id}#{type}#{query}"] = result
					callback null, result

	###*
	# Fills the given person(s) by downloading the person from Magister and replacing the local instance.
	#
	# @method fillPersons
	# @async
	# @param persons {Person|Person[]} A Person or an Array of Persons to fetch more information for.
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Person|Person[]} A fetched person or an array containing the fetched Persons, according to the type of the given persons parameter.
	# @param [overwriteType] {Number|String} Not recommended. Forces the type used to search the persons for.
	###
	fillPersons: (persons, callback, overwriteType) ->
		@_forceReady()

		if _.isArray persons
			if persons.length is 0
				callback null, []
				return undefined
			pushResult = _helpers.asyncResultWaiter persons.length, (r) -> callback null, r
			
			for p in persons
				try
					@getPersons _.last(p.fullName().split " "), (p._type ? overwriteType), (e, r) ->
						if e? or !r? then throw e
						else pushResult r[0] ? p
				catch
					pushResult p

		else if _.isObject persons
			try
				@getPersons _.last(persons.fullName().split " "), (persons._type ? overwriteType), (e, r) ->
					if e? or !r? then throw e
					else callback null, r[0] ? persons
			catch
				callback persons

		else
			throw new Error "Expected persons to be an Array or an Object, got a(n) #{typeof persons}"

		return undefined

	###*
	# Shortcut for composing and sending a Message.
	#
	# @method composeAndSendMessage
	# @param subject {String} The subject of the message
	# @param [body] {String} The body of the message, if none is given the body will be empty.
	# @param recipients {Person[]|String[]|Person|String} The recipient(s) the message will be sent to.
	###
	composeAndSendMessage: ->
		@_forceReady()

		[subject, body] = _.filter arguments, (a) -> _.isString a
		recipients = _.last arguments
		if arguments.length is 2 then body = ""

		m = new Message @
		m.subject subject
		m.body body ? ""
		m.addRecipient recipients
		m.send()

	###*
	# Gets the FileFolders of the current user.
	#
	# @method fileFolders
	# @async
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {FileFolder[]} An array containing FileFolders.
	###
	fileFolders: (callback) ->
		@_forceReady()

		@http.get "#{@_personUrl}/bronnen?soort=0", {}, (error, result) =>
			if error? then callback error, null
			else callback null, ( FileFolder._convertRaw @, f for f in EJSON.parse(result.content).Items )

	###*
	# Gets the StudyGuides of the current user.
	#
	# @method studyGuides
	# @async
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {StudyGuide[]} An array containing StudyGuides.
	###
	studyGuides: (callback) ->
		@_forceReady()

		@http.get "#{@_pupilUrl}/studiewijzers?peildatum=#{_helpers.urlDateConvert new Date}", {}, (error, result) =>
			if error? then callback error, null
			else callback null, ( StudyGuide._convertRaw @, s for s in EJSON.parse(result.content).Items )

	###*
	# Gets the Assignments for the current user.
	#
	# @method assignments
	# @async
	# @param [amount=50] {Number} The amount of Assignments to fetch from the server.
	# @param [skip=0] {Number} The amount of Assignments to skip.
	# @param [fillPersons=true] {Boolean} Whether or not to download the full user objects from the server.
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Assignment[]} An array containing Assignments.
	###
	assignments: ->
		@_forceReady()

		[amount, skip] = _.filter arguments, (a) -> _.isNumber a
		download = _.find arguments, (a) -> _.isBoolean a
		callback = _.find arguments, (a) -> _.isFunction a

		return unless callback?
		download ?= yes
		amount ?= 50
		skip ?= 0

		@courses (e, r) ->
			if r? and r.length isnt 0
				r[0].classes (e, r) ->
					if r? and r.length isnt 0 then cb r
					else cb()
			else cb()
		cb = (classes) =>
			@http.get "#{@_personUrl}/opdrachten?skip=#{skip}&top=#{amount}&status=alle", {}, (error, result) =>
				if error? then callback error, null
				else
					result = (e.Id for e in EJSON.parse(result.content).Items)
					pushResult = _helpers.asyncResultWaiter result.length, (r) -> callback null, r

					for id in result
						@http.get "#{@_personUrl}/opdrachten/#{id}", {}, (error, result) =>
							assignment = Assignment._convertRaw @, EJSON.parse(result.content)

							if classes? then assignment._class = _.find classes, (c) -> c.abbreviation() is assignment._class

							if download
								teachers = assignment.teachers() ? []

								@fillPersons teachers, ((e, r) ->
									assignment._teachers = r
									pushResult assignment
								), 3

							else pushResult assignment

	###*
	# Gets the Digital school utilities for the current user.
	#
	# @method digitalSchoolUtilities
	# @async
	# @fixme /NOT WORKING/ (Weird ID mismatch) @param [class] {Class|Number} The class or ID of a class to get the Digital school utitlities for. If none is given it will return every DigitalSchoolUtility.
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {DigitalSchoolUtility[]} An array containing DigitalSchoolUtilities.
	###
	digitalSchoolUtilities: ->
		@_forceReady()

		#_class = _.find arguments, (a) -> _.isNumber a or _.isObject a

		callback = _.find arguments, (a) -> _.isFunction a
		return unless callback?

		_class = _class.id() if _.isObject _class

		url = if _class? then "#{@_personUrl}/lesmateriaal?vakken=#{_class}" else "#{@_personUrl}/lesmateriaal"

		classes = null
		@courses (e, r) =>
			if r? and r.length isnt 0
				_.last(r).classes (e, r) ->
					classes = r if r? and r.length isnt 0
			
			@http.get url, {}, (error, result) =>
				if error? then callback error, null
				else
					utilities = ( DigitalSchoolUtility._convertRaw @, u for u in EJSON.parse(result.content).Items )

					if classes? then for u in utilities
						do (u) ->
							u._class = _.find classes, (c) -> c.abbreviation() is u._class.Afkorting and c.description() is u._class.Omschrijving

					callback null, utilities

	###*
	# Returns the profile for the current logged in user.
	#
	# @method profileInfo
	# @param [callback] {Function} Not useful at all, just here to prevent possible mistakes.
	#	@param [callback.error] {Null} Will always be null
	#	@param [callback.result] {ProfileInfo} The profile of the current logged in user.
	# @return {ProfileInfo} The profile of the current logged in user.
	###
	profileInfo: (callback) ->
		@_forceReady()
		
		callback? null, @_profileInfo
		return @_profileInfo

	###*
	# Returns the children of the current user.
	#
	# @method children
	# @param callback
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {ProfileInfo[]} An array containing ProfileInfo instances.
	###
	children: (callback) ->
		@http.get "#{@_personUrl}/kinderen", {}, (error, result) =>
			if error? then callback error, null
			else
				parsed = EJSON.parse(result.content)
				if parsed.ExceptionId? and parsed.Reason is 1
					callback _.extend(parsed, message: "User is not a parent."), null
					return

				res = []
				for raw in parsed.Items
					c = ProfileInfo._convertRaw @, c
					c._profilePicture = "#{@magisterSchool.url}/api/personen/#{raw.Id}/foto"
					c.magister (callback) =>
						r = _.clone @
						r._id = raw.Id
						r._personUrl = "#{@magisterSchool.url}/api/personen/#{r._id}"
						r._pupilUrl = "#{@magisterSchool.url}/api/leerlingen/#{r._id}"
						r._profileInfo = c
						@http.get "#{r._personUrl}/berichten/mappen", {}, (error, result) ->
							r._messageFolders = (MessageFolder._convertRaw(r, m) for m in EJSON.parse(result.content).Items)
							callback r
						return undefined
					res.push c

				callback null, res

	###*
	# Checks if this Magister instance is done logging in.
	#
	# You can also provide a callback, which will be called when this instance is done logging in.
	#
	# @method ready
	# @param [callback] {Function} The callback which will be called if the current instance is done logging in.
	# 	@param [callback.error] {Object} A error that occured when logging onto Magister, if it exists.
	#	@param callback.this {Magister} The current Magister object.
	# @return {Boolean} Whether or not the current Magister instance is done logging in.
	###
	ready: (callback) ->
		if _.isFunction callback
			if @_ready or @_magisterLoadError? then _.bind(callback, @)(@._magisterLoadError)
			else @_readyCallbacks.push _.bind callback, @
		return @_ready is yes

	_forceReady: -> throw new Error "Not done with logging in! (use Magister.ready(callback) to be sure that logging in is done)" unless @_ready
	_setReady: ->
		@_ready = yes
		callback() for callback in @_readyCallbacks
		@_readyCallbacks = []

	_setErrored: (e) ->
		@_magisterLoadError = e
		callback @_magisterLoadError for callback in @_readyCallbacks
		@_readyCallbacks = []

	_readyCallbacks: []
	_magisterLoadError: null

	###*
	# (Re-)Login the current Magister instance.
	#
	# Usually not needed to call manually.
	#
	# @method reLogin
	# @deprecated
	###
	reLogin: ->
		@_ready = no
		@_magisterLoadError = null
		url = "#{@magisterSchool.url}/api/sessie"
		@http.post url,
			Gebruikersnaam: @username
			Wachtwoord: @password
			GebruikersnaamOnthouden: yes
			# if this works for every school, we actually wouldn't need a "relogin" method. We will keep it and then see how it goes.
			IngelogdBlijven: @_keepLoggedIn
		, {headers: "Content-Type": "application/json;charset=UTF-8" }, (error, result) =>
			if error? then @_setErrored error
			else
				@_sessionId = /[a-z\d-]+/.exec(result.headers["set-cookie"][0])[0]
				@http._cookie = "SESSION_ID=#{@_sessionId}; M6UserName=#{@username}"
				@http.get "#{@magisterSchool.url}/api/account", {},
					(error, result) =>
						if error? then @_setErrored error; return

						result = EJSON.parse result.content
						@_group = result.Groep[0]
						@_id = result.Persoon.Id
						@_personUrl = "#{@magisterSchool.url}/api/personen/#{@_id}"
						@_pupilUrl = "#{@magisterSchool.url}/api/leerlingen/#{@_id}"
						@_profileInfo = ProfileInfo._convertRaw @, result

						@http.get "#{@_personUrl}/berichten/mappen", {}, (error, result) =>
							if error? then @_setErrored error; return
							@_messageFolders = (MessageFolder._convertRaw(@, m) for m in EJSON.parse(result.content).Items)
							@_setReady()