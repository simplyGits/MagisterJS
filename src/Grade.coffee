###*
# A Grade (ex. 1,0)
#
# @class Grade
# @private
# @constructor
# @param _magisterObj {Magister} A Magister object this Grade is child of.
###
class @Grade
	constructor: (@_magisterObj) ->
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = _getset "_id"
		###*
		# @property grade
		# @final
		# @type String
		###
		@grade = _getset "_grade"
		###*
		# @property passed
		# @final
		# @type Boolean
		###
		@passed = _getset "_passed"
		###*
		# @property dateFilledIn
		# @final
		# @type Date
		###
		@dateFilledIn = _getset "_dateFilledIn"
		###*
		# @property gradePeriod
		# @final
		# @type Object
		###
		@gradePeriod = _getset "_gradePeriod"
		###*
		# @property class
		# @final
		# @type Object
		###
		@class = _getset "_class"
		###*
		# @property atLaterDate
		# @final
		# @type Boolean
		###
		@atLaterDate = _getset "_atLaterDate"
		###*
		# @property exemption
		# @final
		# @type Boolean
		###
		@exemption = _getset "_exemption"
		###*
		# @property counts
		# @final
		# @type Boolean
		###
		@counts = _getset "_counts"
		###*
		# @property type
		# @final
		# @type Number
		###
		@type = _getset "_type"
		###*
		# @property teacher
		# @final
		# @type Person
		###
		@teacher = _getset "_teacher"
		###*
		# @property classExemption
		# @final
		# @type Boolean
		###
		@classExemption = _getset "_classExemption"
		###*
		# @property description
		# @final
		# @type String
		###
		@description = _getset "_description"
		###*
		# @property weight
		# @final
		# @type Number
		###
		@weight = _getset "_weight"

	###*
	# Downloads extra info, if it's not downloaded yet and fills the current grade with it.
	#
	# @method fillGrade
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Grade} The current grade filled with the newely downloaded info.
	###
	fillGrade: (callback) ->
		unless @_filled
			@_magisterObj.http.get @_columnUrl, {}, (error, result) =>
				if error? then callback? error, null
				else
					result = EJSON.parse(result.content)
					@_description = result.WerkInformatieOmschrijving
					@_weight = result.Weging

					@_type._level = result.KolomNiveau
					@_type._description = result.KolomOmschrijving

					@_filled = yes
					callback? null, @
		else callback? null, @

	@_convertRaw: (magisterObj, raw) ->
		obj = new Grade magisterObj

		obj._id = raw.CijferId
		obj._grade = raw.CijferStr
		obj._passed = raw.IsVoldoende
		obj._dateFilledIn = new Date Date.parse raw.DatumIngevoerd

		obj._gradePeriod =
			id: -> raw.CijferPeriode.Id
			name: -> raw.CijferPeriode.Naam

		obj._class =
			id: -> raw.Vak.Id
			abbreviation: -> raw.Vak.Afkorting
			description: -> raw.Vak.Omschrijving

		obj._atLaterDate = raw.Inhalen
		obj._exemption = raw.Vrijstelling
		obj._counts = raw.TeltMee

		if raw.CijferKolom?
			obj._type = GradeType._convertRaw magisterObj, raw.CijferKolom

		obj._assignmentId = raw.CijferKolomIdEloOpdracht

		obj._teacher = Person._convertRaw magisterObj, Docentcode: raw.Docent
		obj._teacher._type = 3

		obj._classExemption = raw.VakDispensatie or raw.VakVrijstelling

		# Should be filled in later by Course::grades(...)
		obj._description = ""
		obj._weight = 0

		return obj

###*
# A Type of a Grade object.
#
# @class GradeType
# @private
# @constructor
# @param _magisterObj {Magister} A Magister object this GradeType is child of.
###
class @GradeType
	constructor: (@_magisterObj) ->
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = _getset "_id"
		###*
		# @property name
		# @final
		# @type String
		###
		@name = _getset "_name"
		###*
		# @property number
		# @final
		# @type Number
		###
		@number = _getset "_number"
		###*
		# @property header
		# @final
		# @type String
		###
		@header = _getset "_header"
		###*
		# @property description
		# @final
		# @type String
		###
		@description = _getset "_description"
		###*
		# @property type
		# @final
		# @type Number
		###
		@type = _getset "_type"
		###*
		# @property isAtLaterDate
		# @final
		# @type Boolean
		###
		@isAtLaterDate = _getset "_isAtLaterDate"
		###*
		# @property isTeacher
		# @final
		# @type Boolean
		###
		@isTeacher = _getset "_isTeacher"
		###*
		# @property hasNestedTypes
		# @final
		# @type Boolean
		###
		@hasNestedTypes = _getset "_hasNestedTypes"
		###*
		# @property isPTA
		# @final
		# @type Boolean
		###
		@isPTA = _getset "_isPTA"
		###*
		# Have no idea what this is. If anybody has an idea, tell me please so we can make this doc at least a bit useful.
		# @property level
		# @final
		###
		@level = _getset "_level"

	@_convertRaw: (magisterObj, raw) ->
		obj = new GradeType magisterObj

		obj._id = raw.Id
		obj._name = raw.KolomNaam
		obj._number = raw.KolomNummer
		obj._header = raw.KolomKop
		obj._type = raw.KolomSoort
		obj._isAtLaterDate = raw.IsHerkansingKolom
		obj._isTeacher = raw.IsDocentKolom
		obj._hasNestedTypes = raw.HeeftOndeliggendeKolommen
		obj._isPTA = raw.IsPTAKolom

		# Those should be filled in later by Course::grades(...)
		obj._level = null # I have no idea...
		obj._description = ""

		return obj
