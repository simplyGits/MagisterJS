root = (module?.exports ? this.Magister ?= {})
if Meteor?
	@_ = _ = lodash
else if module?.exports? and require? and not window?
	@_ = _ = require("lodash") if not _?
else if @_?
	_ = @_
else
	throw new Error "Lo-dash or underscore is required."

###*
# The version of this Magister.js.
# @property VERSION
# @final
# @type String
###
root.VERSION = "1.24.2"

###*
# A JavaScript implementation of the Magister 6 API.
# @author Lieuwe Rooijakkers
# @module Magister
###

###*
# Class to communicate with Magister.
#
# @class Magister
# @param options {Object} An object containing your perfered options.
#	 @param options.school {MagisterSchool|String} A MagisterSchool to logon to. If this is a String it will use that String as a query to search for a possible school.
#	 @param [options.username] {String} The username of the user to login to. (Not needed when using an sessionId.)
#	 @param [options.password] {String} The password of the user to login to. (Not needed when using an sessionId.)
#	 @param [options.sessionId] {String} An sessionId to use instead of logging in to retreive a new one.
#	 @param [options.keepLoggedIn=true] {Boolean} Whether or not to keep the user logged in.
#	 @param [options.login=true] {Boolean} If this is set to false you will have to call `Magister::_reLogin` yourself.
# @constructor
###
class root.Magister
	constructor: ->
		options =
			keepLoggedIn: yes
			login: yes

		if arguments.length is 1 and _.isObject arguments[0] # Options object.
			options = _.extend options, arguments[0]
		else # Backwards compatibility.
			throw new Error "Expected 3 or 4 arguments, got #{arguments.length}" unless arguments.length is 3 or arguments.length is 4

			school = arguments[0]
			username = arguments[1]
			password = arguments[2]
			keepLoggedIn = arguments[3]

			options = _.extend options, { school, username, password, keepLoggedIn }

		if not options.school? or (
			not options.sessionId? and
			(_.isEmpty(options.username) or _.isEmpty(options.password))
		)
			throw new Error 'school, username and password are required.'

		@_readyCallbacks = [] # Fixes weird bug where callbacks from previous Magister objects were mixed with the new ones.
		@http = new root.MagisterHttp()

		@magisterSchool = options.school
		@username = options.username
		@password = options.password
		@_keepLoggedIn = options.keepLoggedIn

		if _.isString @magisterSchool
			root.MagisterSchool.getSchools @magisterSchool, (e, r) =>
				if e? then @_setErrored e
				else if r.length is 0 then @_setErrored new Error "No school with the query #{@magisterSchool} found."
				else
					@magisterSchool = r[0]
					@_reLogin options.sessionId if options.login
		else
			@magisterSchool = _.extend new root.MagisterSchool, @magisterSchool
			unless @magisterSchool.url? and @magisterSchool.url.search(/https?:\/\//) is 0
				throw new Error "Invalid url given: '#{@magisterSchool.url}'"
			@_reLogin options.sessionId if options.login

	###*
	# Get the appoinments of the current User between the two given Dates.
	#
	# @method appointments
	# @async
	# @param from {Date} The start date for the Appointments, you won't get appointments from before this date.
	# @param [to] {Date} The end date for the Appointments, you won't get appointments from after this date.
	# @param [fillPersons=false] {Boolean} Whether or not to download the full user objects from the server.
	# @param [ignoreAbsenceErrors=true] {Boolean} When true, the callback will not be called with an error if only fetching the absences failed.
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Appointment[]} An array containing the Appointments.
	###
	appointments: ->
		callback = _.find arguments, (a) -> _.isFunction a

		[ fillPersons, ignoreAbsenceErrors ] = _.filter arguments, (a) -> _.isBoolean a
		fillPersons ?= no
		ignoreAbsenceErrors ?= yes

		dates = _.filter arguments, _.isDate
		[from, to] = _.sortBy dates
		to ?= from

		from = root._helpers.date from
		to = root._helpers.date to

		@_forceReady()
		dateConvert = root._helpers.urlDateConvert
		url = "#{@_personUrl}/afspraken?tot=#{dateConvert(to)}&van=#{dateConvert(from)}"
		@http.get url, {}, (error, result) =>
				if error? then callback error, null
				else
					result = JSON.parse result.content
					appointments = (root.Appointment._convertRaw(this, a) for a in result.Items)

					absenceInfo = null

					# Gets run when the appointments persons and absenceInfo is loaded
					finish = root._helpers.asyncResultWaiter 2, (r) ->
						_.each appointments, (a) ->
							a._absenceInfo = _.find absenceInfo, (i) -> i.appointment().id() is a.id()

						appointments = _.chain(appointments)
							.sortBy '_begin'
							.value()

						callback null, appointments

					# Get absenceInfo.
					@http.get "#{@_personUrl}/absenties?tot=#{dateConvert(to)}&van=#{dateConvert(from)}", {}, (error, result) =>
						if error?
							if ignoreAbsenceErrors then finish()
							else callback error, null
						else
							result = JSON.parse(result.content).Items
							absenceInfo = result.map (i) =>
								root.AbsenceInfo._convertRaw this, i
							finish()

					# Get persons.
					if fillPersons
						pushResult = root._helpers.asyncResultWaiter appointments.length, -> finish()

						for a in appointments then do (a) =>
							teachers = a.teachers()

							@fillPersons teachers, ((e, r) ->
								a._teachers = r
								pushResult()
							), 3
					else finish()

	###*
	# Creates a new appointment based on the given `options`.
	#
	# @method createAppointment
	# @param options {Object} An object containing options and stuff.
	# 	@param options.name {String} The name of the appointment.
	# 	@param options.start {Date} The start of the appointment, time is ignored when `options.fullDay` is set to true.
	# 	@param options.end {Date} The end of the appointment, this is ignored when `options.fullDay` is set to true.
	# 	@param [options.fullDay=false] {Boolean} When this is true, `options.end` is ignored and only `options.start` is used to set the begin and the end for the appointment.
	# 	@param [options.location] {String} The location (classroom for example) for the appointment.
	# 	@param [options.content] {String} Some arbitrary string you want to save.
	# 	@param [options.type=1] {Number} The type of the appointment: 1 for personal or 16 for planning
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	###
	createAppointment: (options, callback) ->
		@_forceReady()

		required = [ 'name', 'start', 'end' ]
		for key in required
			unless options[key]?
				callback new Error("Not all required fields for `options` are given, required are: [ #{required.join ', '} ]"), null
				return undefined

		start = (
			if options.fullDay
				root._helpers.date options.start
			else
				options.start
		)
		payload =
			Start: root._helpers.toUtcString start
			Einde: root._helpers.toUtcString (
				if options.fullDay
					new Date start.getTime() + ( 1000 * 60 * 60 * 24 )
				else
					options.end
			)
			Omschrijving: options.name

			Lokatie: options.location ? ''
			Inhoud: (
				content = options.content?.trim()
				if content? and content.length > 0 then _.escape options.content
				else null
			)
			Type: options.type ? 1
			DuurtHeleDag: options.fullDay ? no

			# Static non-configurable stuff.
			InfoType: 0
			WeergaveType: 1
			Status: 2
			HeeftBijlagen: false
			Bijlagen: null
			LesuurVan: null
			LesuurTotMet: null
			Aantekening: null
			Afgerond: false
			Vakken: null
			Docenten: null
			Links: null
			Id: 0
			Lokalen: null
			Groepen: null
			OpdrachtId: 0

		@http.post "#{@_personUrl}/afspraken", payload, {}, (e, r) -> callback e, null

	###*
	# Gets the MessageFolders that matches the given query. Or if no query is given, all MessageFolders
	#
	# @method messageFolders
	# @param [query] {String} A case insensetive query the MessageFolder need to match.
	# @param [callback] {Function} If a callback is given, the message folders will be refetched.
	#	@param [callback.error] {Object} The error, if it exists.
	#	@param [callback.result] {MessageFolder[]} An array containing the matching MessageFolders.
	# @return {MessageFolder[]|undefined} An array containing the matching messageFolders or undefined if a callback is given.
	###
	messageFolders: (query, callback) ->
		@_forceReady()

		if callback?
			@_fetchMessageFolders (e, r) =>
				if e? then callback e, null
				else callback null, @messageFolders query
			return undefined

		query = query?.trim()
		result = (
			if _.isString query
				_.filter @_messageFolders, (mF) ->
					root._helpers.contains mF.name(), query, yes
			else
				@_messageFolders
		)

		result ? []

	###*
	# Fetches the messageFolders for the current Magister object.
	#
	# @method _fetchMessageFolders
	# @private
	# @param callback {Function}
	# 	@param [callback.error] {Object} The error, if it exists.
	###
	_fetchMessageFolders: (callback) ->
		@http.get "#{@_personUrl}/berichten/mappen", {}, (e, r) =>
			if e?
				e.statusCode = r?.statusCode
				callback e
			else
				@_messageFolders = (root.MessageFolder._convertRaw(this, m) for m in JSON.parse(r.content).Items)
				callback null

	###*
	# @method inbox
	# @return {MessageFolder} The inbox of the current user.
	###
	inbox: -> @messageFolders("postvak in")[0]
	###*
	# @method sentItems
	# @return {MessageFolder} The sent items folder of the current user.
	###
	sentItems: -> @messageFolders("verzonden items")[0]
	###*
	# @method bin
	# @return {MessageFolder} The bin of the current user.
	###
	bin: -> @messageFolders("verwijderde items")[0]
	###*
	# @method alerts
	# @return {MessageFolder} The alerts folder of the current user.
	###
	alerts: -> @messageFolders("mededelingen")[0]

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
					result = JSON.parse result.content
					converted = (root.Course._convertRaw(this, c) for c in result.Items)
					callback null, _.chain(converted).sortBy("_beginDate").sortBy((x) -> not x._current).value()

	###*
	# Gets the current grade of the current User.
	#
	# @method currentCourse
	# @async
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Course} The current Course.
	###
	currentCourse: (callback) ->
		@_forceReady()
		@courses (e, r) ->
			if e? then callback e, null
			else callback null, _.find r, (c) -> c.current()

	###*
	# Gets limited course info for the current Course for the current User.
	#
	# This is quicker than `courses`, however it's not as consistent and
	# doesn't really fit in Magister.js's style, however if you know what
	# you're doing and you're willing to use this, go ahead.
	#
	# @method getLimitedCurrentCourseInfo
	# @async
	# @deprecated `courses` is prefered.
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Object} The limited course info.
	# 		@param [callback.result.group] {String}
	# 		@param [callback.result.profile] {String}
	# 		@param [callback.result.pupilId] {any}
	# 		@param [callback.result.type] {Object}
	# 			@param [callback.result.type.year] {Number}
	# 			@param [callback.result.type.schoolVariant] {String}
	###
	getLimitedCurrentCourseInfo: (callback) ->
		@_forceReady()
		url = "#{@_personUrl}/opleidinggegevensprofiel"

		@http.get url, {}, (error, result) ->
			if error? then callback error, null
			else
				try
					parsed = JSON.parse result.content
					callback null,
						group: (
							group = parsed.Klas
							if group?
								_.find(group.split(' '), (str) -> /\d/.test str) ? group
						)
						profile: parsed.Profielen # It says 'profielen' but I really have no idea how multiple profiles are shown in a String...
						pupilId: parsed.StamNr # Should be the same as `@userName` AFAIK.
						type:
							year: +/\d+/.exec(parsed.Studie)?[0]
							schoolVariant: /[^\d\s]+/.exec(parsed.Studie)?[0]
				catch e
					callback e, null

	@_cachedPersons: {}
	###*
	# Gets an Array of Persons that matches the given profile.
	#
	# @method getPersons
	# @async
	# @param query {String} The query the persons must match to (e.g: Surname, Name, ...). Should at least be 3 chars long.
	# @param [type] {String} The type the person must have. One of: 'pupil', 'teacher', 'project', 'other'. If none is given it will search for both Teachers and Pupils.
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Person[]} An array containing the Persons.
	# @return {Boolean} True if cached result was used, false otherwise.
	###
	getPersons: ->
		@_forceReady()

		[query, type] = _.filter arguments, (a) -> _.isString a
		callback = _.find arguments, (a) -> _.isFunction a

		query = (
			if query? then query.trim()
			else ''
		)

		if query.length < 3
			callback null, []
			return false

		unless type? # Try both Teachers and Pupils
			# best varname award goes to...
			b1 = b2 = no
			b1 = @getPersons query, 'teacher', (e, r) =>
				if e? then callback e, null
				else
					teachers = r
					b2 = @getPersons query, 'pupil', (e, r) ->
						if e? then callback e, null
						else callback null, r.concat teachers
			return b1 or b2

		queryType = switch type
			when 'teacher' then 'Personeel'
			when 'pupil' then 'Leerling'
			when 'project' then 'Project'

			else 'Overig'
		url = "#{@_personUrl}/contactpersonen?contactPersoonType=#{queryType}&q=#{query.replace /\ +/g, "+"}"

		if (val = root.Magister._cachedPersons["#{@_id}#{type}#{query}"])?
			root._helpers.defer callback, null, val
			true
		else
			@http.get url, {}, (error, result) =>
				if error?
					callback error, null
				else
					result = (root.Person._convertRaw(this, p) for p in JSON.parse(result.content).Items)
					root.Magister._cachedPersons["#{@_id}#{type}#{query}"] = result
					callback null, result
			false

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

			pushResult = root._helpers.asyncResultWaiter persons.length, (r) -> callback null, r

			for p in persons
				try
					@getPersons _.last(p.fullName().split " "), (p._type ? overwriteType), (e, r) ->
						pushResult r[0] ? p
				catch
					pushResult p

		else if _.isObject persons
			try
				@getPersons _.last(persons.fullName().split " "), (persons._type ? overwriteType), (e, r) ->
					callback null, r[0] ? persons
			catch
				callback null, persons

		else
			throw new Error "Expected persons to be an Array or an Object, got a(n) #{typeof persons}"

		undefined

	###*
	# Shortcut for composing and sending a Message.
	#
	# @method composeAndSendMessage
	# @param subject {String} The subject of the message
	# @param [body] {String} The body of the message, if none is given the body will be empty.
	# @param recipients {Person[]|String[]|Number[]|Person|String|Number} The recipient(s) the message will be sent to.
	# @param [callback] {Function} An optional callback.
	# 	@param [callback.error] {Object} An error, if it exists.
	# 	@param [callback.result] {Message} The sent message.
	###
	composeAndSendMessage: ->
		@_forceReady()

		[ subject, body ] = _.filter arguments, _.isString
		callback = _.find arguments, _.isFunction
		recipients = _.last _.filter(arguments, (a) -> a isnt callback)

		m = new root.Message this
		m.subject subject
		m.body body ? ''
		m.addRecipient recipients
		m.send callback

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
			else callback null, ( root.FileFolder._convertRaw this, f for f in JSON.parse(result.content).Items )

	###*
	# Gets the StudyGuides of the current user.
	#
	# @method studyGuides
	# @async
	# @param [fillClass=true] {Boolean} Whether or not to download the full class objects from the server. If this is false StudyGuide.class() will return null. (You can use `StudyGuide.classCodes` instead then.)
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {StudyGuide[]} An array containing StudyGuides.
	###
	studyGuides: (callback) ->
		@_forceReady()

		fillClass = _.find(arguments, (a) -> _.isBoolean a) ? yes
		callback = _.find arguments, (a) -> _.isFunction a

		cb = (classes) =>
			@http.get "#{@_pupilUrl}/studiewijzers?peildatum=#{root._helpers.urlDateConvert new Date}", {}, (error, result) =>
				if error? then callback error, null
				else
					result = ( root.StudyGuide._convertRaw this, s for s in JSON.parse(result.content).Items )

					for studyGuide in result then do (studyGuide) ->
						if classes? then studyGuide._class = _.find classes, (c) -> c.abbreviation() is studyGuide._class
						else studyGuide._class = null

					callback null, result

		if fillClass
			@courses (e, r) ->
				if r? and r.length isnt 0
					r[0].classes (e, r) ->
						if r? and r.length isnt 0 then cb r
						else cb()
				else cb()
		else cb()

	###*
	# Gets the Assignments for the current user.
	#
	# @method assignments
	# @async
	# @param [amount=50] {Number} The amount of Assignments to fetch from the server.
	# @param [skip=0] {Number} The amount of Assignments to skip.
	# @param [fillPersons=false] {Boolean} Whether or not to download the full user objects from the server.
	# @param [fillClass=true] {Boolean} Whether or not to download the full class objects from the server. If this is false Assignment.class() will return null.
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Assignment[]} An array containing Assignments.
	###
	assignments: ->
		@_forceReady()

		[amount, skip] = _.filter arguments, (a) -> _.isNumber a
		[fillPersons, fillClass] = _.filter arguments, (a) -> _.isBoolean a
		callback = _.find arguments, (a) -> _.isFunction a

		return unless callback?
		fillPersons ?= no
		fillClass ?= yes
		amount ?= 50
		skip ?= 0

		cb = (classes) =>
			@http.get "#{@_personUrl}/opdrachten?skip=#{skip}&top=#{amount}&status=alle", {}, (error, result) =>
				if error? then callback error, null
				else
					result = (e.Id for e in JSON.parse(result.content).Items)
					pushResult = root._helpers.asyncResultWaiter result.length, (r) -> callback null, r

					for id in result
						@http.get "#{@_personUrl}/opdrachten/#{id}", {}, (error, result) =>
							assignment = root.Assignment._convertRaw this, JSON.parse(result.content)

							if classes? then assignment._class = _.find classes, (c) -> c.abbreviation() is assignment._class
							else assignment._class = null

							if fillPersons
								teachers = assignment.teachers() ? []

								@fillPersons teachers, ((e, r) ->
									assignment._teachers = r
									pushResult assignment
								), 3

							else pushResult assignment

		if fillClass
			@courses (e, r) ->
				if r? and r.length isnt 0
					r[0].classes (e, r) ->
						if r? and r.length isnt 0 then cb r
						else cb()
				else cb()
		else cb()

	###*
	# Gets the Digital school utilities for the current user.
	#
	# @method digitalSchoolUtilities
	# @async
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {DigitalSchoolUtility[]} An array containing DigitalSchoolUtilities.
	###
	digitalSchoolUtilities: ->
		@_forceReady()

		fillClass = _.find(arguments, (a) -> _.isBoolean a) ? yes
		callback = _.find arguments, (a) -> _.isFunction a
		return unless callback?

		url = "#{@_personUrl}/lesmateriaal"

		@http.get url, {}, (e, r) =>
			if e?
				callback e, null
			else
				convert = _.partial root.DigitalSchoolUtility._convertRaw, this

				parsed = JSON.parse(r.content).Items
				callback null, _.map(parsed, convert)

	###*
	# Returns the profile for the current logged in user.
	#
	# @method profileInfo
	# @return {ProfileInfo} The profile of the current logged in user.
	###
	profileInfo: ->
		@_forceReady()
		@_profileInfo

	###*
	# Returns the children of the current user.
	#
	# @method children
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Magister[]} An array containg an Magister instance for each child.
	###
	children: (callback) ->
		@http.get "#{@_personUrl}/kinderen", {}, (error, result) =>
			if error? then callback error, null
			else
				parsed = JSON.parse(result.content)
				if parsed.ExceptionId? and parsed.Reason is 1
					callback _.extend(parsed, message: "User is not a parent."), null
					return

				res = []
				for raw in parsed.Items
					info = root.ProfileInfo._convertRaw this, raw
					info._profilePicture = "#{@magisterSchool.url}/api/personen/#{raw.Id}/foto"
					res.push (
						m = new Magister
							school: @magisterSchool
							username: @username
							password: @password
							login: false
						m.http = @http

						m._id = raw.Id
						m._personUrl = "#{@magisterSchool.url}/api/personen/#{m._id}"
						m._pupilUrl = "#{@magisterSchool.url}/api/leerlingen/#{m._id}"
						m._profileInfo = info
						m._ready = yes

						m
					)

				callback null, res

	###*
	# Checks if this Magister instance is done logging in.
	#
	# You can also provide a callback, which will be called when this instance is done logging in.
	#
	# @method ready
	# @param [callback] {Function} The callback which will be called if the current instance is done logging in.
	# 	@param [callback.error] {Object} A error that occured when logging onto Magister, if it exists.
	# 		@param [callback.error.statusCode] {Number} If the error is returned over HTTP, the statusCode that was returned.
	# 	@param callback.this {Magister} The current Magister object.
	# @return {Boolean} Whether or not the current Magister instance is done logging in.
	###
	ready: (callback) ->
		if _.isFunction callback
			callback = _.bind callback, this
			if @_ready or @_magisterLoadError? then callback @_magisterLoadError
			else @_readyCallbacks.push callback
		@_ready is yes

	_forceReady: -> throw new Error "Not done with logging in or errored during logging in! (did you use Magister.ready(callback) to be sure that logging in is done?)" unless @_ready
	_setReady: ->
		@_ready = yes
		callback() for callback in @_readyCallbacks
		@_readyCallbacks = []

	_setErrored: (e, statusCode) ->
		try
			parsed = JSON.parse e
			@_magisterLoadError = {}
			# Copy all keys of the error Magister gave us, but lowerCase the keys.
			for key of parsed
				@_magisterLoadError[key.toLowerCase()] = parsed[key]
			@_magisterLoadError.toString = -> parsed.message ? ''
		catch
			@_magisterLoadError = e

		@_magisterLoadError.statusCode = statusCode if statusCode?

		callback @_magisterLoadError for callback in @_readyCallbacks
		@_readyCallbacks = []

	_readyCallbacks: []
	_magisterLoadError: null

	###*
	# (Re-)Login the current Magister instance.
	#
	# Usually not needed to call manually.
	#
	# @method _reLogin
	# @param [sessionId] {String} An optional sessionId to use. Shortens login process.
	# @private
	###
	_reLogin: (sessionId) ->
		@_ready = no
		@_magisterLoadError = null
		@magisterSchool.url = @magisterSchool.url.replace /^https?/, "https" # Force HTTPS.
		deleteUrl = "#{@magisterSchool.url}/api/sessies/huidige"
		postUrl = "#{@magisterSchool.url}/api/sessies"

		setSessionId = (sessionId) =>
			@_sessionId = sessionId
			@http._cookie = "SESSION_ID=#{@_sessionId}; M6UserName=#{@username}"

		cb = =>
			try
				@http.get "#{@magisterSchool.url}/api/account", {},
					(error, result) =>
						if error?
							@_setErrored error, result?.statusCode
							return

						try
							result = JSON.parse result.content
							@_id = result.Persoon.Id
							@_personUrl = "#{@magisterSchool.url}/api/personen/#{@_id}"
							@_pupilUrl = "#{@magisterSchool.url}/api/leerlingen/#{@_id}"
							@_profileInfo = root.ProfileInfo._convertRaw this, result.Persoon
						catch e
							@_setErrored e, result?.statusCode
							return

						@_fetchMessageFolders (e) =>
							if e? then @_setErrored e, e.statusCode
							else @_setReady()

			catch e then @_setErrored e

		if sessionId?
			setSessionId sessionId
			cb()
		else
			@http.delete deleteUrl, {}, (e, r) =>
				if e?
					@_setErrored e, r?.statusCode
					return

				setSessionId /[a-z\d-]+/.exec(r.headers["set-cookie"][0])[0]
				@http.post postUrl, {
					Gebruikersnaam: @username
					Wachtwoord: @password
					# If this works for every school, we actually wouldn't need a "relogin"
					# method. We will keep it and then see how it goes.
					IngelogdBlijven: @_keepLoggedIn
				}, {
					headers: "Content-Type": "application/json;charset=UTF-8"
				}, (error, result) =>
					if error? then @_setErrored error, result?.statusCode
					else
						setSessionId /[a-z\d-]+/.exec(result.headers["set-cookie"][0])[0]
						cb()
