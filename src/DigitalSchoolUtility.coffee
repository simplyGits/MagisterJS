root = (module?.exports ? this.Magister ?= {})

###*
# A Digital school utility, usually things like a gateway to an online platform of a book used by a school.
#
# @class DigitalSchoolUtility
# @private
# @constructor
# @param _magisterObj {Magister} A Magister object this DigitalSchoolUtility is child of.
###
class root.DigitalSchoolUtility
	constructor: (@_magisterObj) ->
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = root._getset "_id"
		###*
		# @property type
		# @final
		# @type Number
		###
		@type = root._getset "_type"
		###*
		# @property name
		# @final
		# @type String
		###
		@name = root._getset "_name"
		###*
		# @property publisher
		# @final
		# @type String
		###
		@publisher = root._getset "_publisher"
		###*
		# @property state
		# @final
		# @type Number
		###
		@state = root._getset "_state"
		###*
		# @property begin
		# @final
		# @type Date
		###
		@begin = root._getset "_begin"
		###*
		# @property end
		# @final
		# @type Date
		###
		@end = root._getset "_end"
		###*
		# @property EAN
		# @final
		# @type Number
		###
		@EAN = root._getset "_EAN"
		###*
		# @property url
		# @final
		# @type String
		###
		@url = root._getset "_url"
		###*
		# This should be a Class object, if no class was found this will be undefined.
		# @property class
		# @final
		# @type Class|undefined
		###
		@class = root._getset "_class"

	@_convertRaw: (magisterObj, raw) ->
		obj = new root.DigitalSchoolUtility magisterObj

		obj._id = raw.Id
		obj._type = raw.MateriaalType
		obj._name = raw.Titel
		obj._publisher = raw.Uitgeverij
		obj._state = raw.Status
		obj._begin = new Date Date.parse raw.Start
		obj._end = new Date Date.parse raw.Eind
		obj._EAN = (Number) raw.EAN
		obj._url = raw.Url
		obj._class = raw.Vak # Will be replace with a Class object by Magister.digitalSchoolUtitlies(...) if everything goes correctly.

		return obj
