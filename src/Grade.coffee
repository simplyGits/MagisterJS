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
		obj._type = GradeType._convertRaw magisterObj, raw.CijferKolom
		obj._assignmentId = raw.CijferKolomIdEloOpdracht
		obj._teacher = raw.teacher
		obj._classExemption = raw.VakDispensatie or raw.VakVrijstelling

		obj._description = "" # Should be filled in later by Course::grades(...)

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
		###*
		# @property weight
		# @final
		# @type Number
		###
		@weight = _getset "_weight"

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
		obj._weight = 0

		return obj
