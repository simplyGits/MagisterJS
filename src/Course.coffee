root = (module?.exports ? this.Magister ?= {})

###*
# A Class (ex. English class)
#
# @class Class
# @private
# @constructor
# @param _magisterObj {Magister} A Magister object this Class is child of.
###
class root.Class
	constructor: (@_magisterObj) ->
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = root._getset "_id"
		###*
		# @property beginDate
		# @final
		# @type Date|undefined
		###
		@beginDate = root._getset "_beginDate"
		###*
		# @property endDate
		# @final
		# @type Date|undefined
		###
		@endDate = root._getset "_endDate"
		###*
		# @property abbreviation
		# @final
		# @type String
		###
		@abbreviation = root._getset "_abbreviation"
		###*
		# @property description
		# @final
		# @type String
		###
		@description = root._getset "_description"
		###*
		# @property number
		# @final
		# @type Number
		###
		@number = root._getset "_number"
		###*
		# @property teacher
		# @final
		# @type Person
		###
		@teacher = root._getset "_teacher"
		###*
		# @property classExemption
		# @final
		# @type Boolean
		###
		@classExemption = root._getset "_classExemption"

	@_convertRaw: (magisterObj, raw) ->
		obj = new root.Class magisterObj

		obj._id = raw.id ? raw.Id
		obj._beginDate = root._helpers.parseDate raw.begindatum
		obj._endDate = root._helpers.parseDate raw.einddatum
		obj._abbreviation = raw.afkorting ? raw.Afkorting
		obj._description = raw.omschrijving ? raw.Omschrijving
		obj._number = raw.volgnr ? raw.Volgnr
		obj._teacher = root.Person._convertRaw magisterObj, Docentcode: raw.docent
		obj._classExemption = raw.VakDispensatie or raw.VakVrijstelling

		obj

###*
# A Course (like: 4 VWO E/M 14-15).
#
# @class Course
# @private
# @param _magisterObj {Magister} A Magister object this Course is child of.
# @constructor
###
class root.Course
	constructor: (@_magisterObj) ->
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = root._getset "_id"
		###*
		# @property begin
		# @final
		# @type Date|undefined
		###
		@begin = root._getset "_begin"
		###*
		# @property end
		# @final
		# @type Date|undefined
		###
		@end = root._getset "_end"
		###*
		# The 'school period' of this Course (e.g: "1415").
		# @property schoolPeriod
		# @final
		# @type String
		###
		@schoolPeriod = root._getset "_schoolPeriod"
		###*
		# Type of this Course (e.g: { description: "VWO 4", id: 420 }).
		# @property type
		# @final
		# @type Object
		###
		@type = root._getset "_type"
		###*
		# The group of this Course contains the class the user belongs to (e.g: { description: "Klas 4v3", id: 420, locationId: 0 }).
		# @property group
		# @final
		# @type Object
		###
		@group = root._getset "_group"
		###*
		# The 'profile' of this Course (e.g: "A-EM").
		# @property profile
		# @final
		# @type String
		###
		@profile = root._getset "_profile"
		###*
		# An alternative profile, if it exists (e.g: "A-EM").
		# @property alternativeProfile
		# @final
		# @type String
		###
		@alternativeProfile = root._getset "_alternativeProfile"
		###*
		# True if this Course is the current Course.
		# @property current
		# @final
		# @type Boolean
		###
		@current = root._getset "_current"

	###*
	# Gets the classes of this Course.
	#
	# @method classes
	# @async
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Class[]} An array containing the Classes.
	###
	classes: (callback) ->
		@_magisterObj.http.get @_classesUrl, {}, (error, result) =>
			if error?
				callback error, null
			else
				callback null, (root.Class._convertRaw @_magisterObj, c for c in JSON.parse(result.content))

	###*
	# Gets the grade periods of this Course.
	#
	# @method gradePeriods
	# @async
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {GradePeriod[]} An array containing the GradePeriods.
	###
	gradePeriods: (callback) ->
		@_magisterObj.http.get @_periodsUrl, {}, (error, result) =>
			if error?
				callback error, null
			else
				callback null, (root.GradePeriod._convertRaw @_magisterObj, p for p in JSON.parse(result.content).Items)

	###*
	# Gets the grades of this Course.
	#
	# @method grades
	# @async
	# @param {Object} [options={}]
	# 	@param {Boolean} [options.fillPersons=false] Whether or not to download the full user objects from the server.
	# 	@param {Boolean} [options.fillGrade=true] Whether or not to download the full grade info should be downloaded from the server. If this is set to false some properties will be not be set or have incorrect values.
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Grade[]} An array containing the Grades.
	###
	grades: ->
		options = _.find(arguments, (a) -> _.isPlainObject a) ? {}
		{ fillPersons, fillGrade } = options

		callback = _.find(arguments, (a) -> _.isFunction a)
		throw new Error "Callback can't be null" unless callback?
		callback = _.once callback

		fillPersons ?= no
		fillGrade ?= yes
		onlyRecent = no # TODO: onlyRecent is currently broken. Fix it. See #21

		@_magisterObj.http.get (if onlyRecent then @_gradesUrlPrefix else @_gradesUrl), {}, (error, result) =>
			if error?
				callback error, null
			else
				result = JSON.parse(result.content).Items
				result = _.filter result, (raw) -> raw.CijferId isnt 0

				pushResult = root._helpers.asyncResultWaiter result.length, (r) ->
					_.chain(r) # Make sure that every class with the same ID can be compared with the === operator.
						.uniq (g) -> g.class().id
						.pluck "_class"
						.forEach (c) ->
							for g in _.filter(r, (g) -> g.class().id is c.id)
								g._class = c

					callback null, _.sortBy r, (g) -> g.dateFilledIn()

				for raw in result
					do (raw) =>
						g = root.Grade._convertRaw @_magisterObj, raw
						g._columnUrl = @_columnUrlPrefix + raw.CijferKolom?.Id

						push = root._helpers.asyncResultWaiter 2, -> pushResult g

						if fillPersons and not onlyRecent
							@_magisterObj.getPersons g.Docent, 3, (e, r) ->
								unless e? or not r[0]? then g._teacher = r[0]
								push()
						else push()

						if fillGrade and not onlyRecent
							g.fillGrade (e, r) ->
								if e? then callback e, null
								else push()
						else push()

	###*
	# Gets the perosnal tutor of the current user for this Course.
	#
	# @method getPersonalTutor
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Person} The tutor as a Person object.
	###
	getPersonalTutor: (callback) ->
		throw new Error "Callback can't be null" unless callback?

		@_magisterObj.http.get "#{@_magisterObj._personUrl}/aanmeldingen/#{@_id}/mentor", {}, (error, result) =>
			if error? then callback error, null
			else callback null, root.Person._convertRaw @_magisterObj, JSON.parse result.content

	###*
	# Gets the (group / class) tutors.
	#
	# @method getOtherTutors
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Person} The tutor as a Person object.
	###
	getOtherTutors: (callback) =>
		throw new Error "Callback can't be null" unless callback?

		@_magisterObj.http.get "#{@_magisterObj._personUrl}/aanmeldingen/#{@_id}/mentoren", {}, (error, result) =>
			if error? then callback error, null
			else
				items = JSON.parse(result.content).items # Really SchoolMaster, get consistent with using da capz.
				callback null, (root.Person._convertRaw @_magisterObj, p for p in items)

	@_convertRaw: (magisterObj, raw) ->
		obj = new root.Course magisterObj

		obj._classesUrl = magisterObj._personUrl + "/aanmeldingen/#{raw.Id}/vakken"

		obj._gradesUrlPrefix = magisterObj._personUrl + "/aanmeldingen/#{raw.Id}/cijfers"
		obj._gradesUrl = obj._gradesUrlPrefix + "/cijferoverzichtvooraanmelding?actievePerioden=false&alleenBerekendeKolommen=false&alleenPTAKolommen=false"
		obj._periodsUrl = obj._gradesUrlPrefix + "/cijferperiodenvooraanmelding"
		obj._columnUrlPrefix = obj._gradesUrlPrefix + "/extracijferkolominfo/"

		obj._id = raw.Id
		obj._begin = root._helpers.parseDate raw.Start
		obj._end = root._helpers.parseDate raw.Einde
		obj._schoolPeriod = raw.Lesperiode
		obj._type =
			id: raw.Studie.Id
			description: raw.Studie.Omschrijving
		obj._group =
			id: raw.Groep.Id
			description: (
				group = raw.Groep.Omschrijving
				if group?
					_.find(group.split(' '), (str) -> /\d/.test str) ? group
			)
			locationId: raw.Groep.LocatieId
		obj._profile = raw.Profiel
		obj._alternativeProfile = raw.Profiel2

		obj._current = obj._begin.getTime() <= _.now() <= obj._end.getTime()

		obj
