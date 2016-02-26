root = (module?.exports ? this.Magister ?= {})

###*
# A StudyGuide, containing various Files and Links teachers can put on Magister.
#
# @class StudyGuide
# @private
# @constructor
# @param _magisterObj {Magister} A Magister object this StudyGuide is child of.
###
class root.StudyGuide
	constructor: (@_magisterObj) ->
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = root._getset "_id"
		###*
		# @property from
		# @final
		# @type Date|undefined
		###
		@from = root._getset "_from"
		###*
		# @property to
		# @final
		# @type Date|undefined
		###
		@to = root._getset "_to"
		###*
		# @property classCodes
		# @final
		# @type String[]
		###
		@classCodes = root._getset "_classCodes"
		###*
		# @property name
		# @final
		# @type String
		###
		@name = root._getset "_name"
		###*
		# @property archived
		# @final
		# @type Boolean
		###
		@archived = root._getset "_archived"
		###*
		# @property class
		# @final
		# @type Class
		###
		@class = root._getset "_class"

	###*
	# Get the parts of this StudyGuide.
	#
	# @method parts
	# @async
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	#	@param [callback.result] {StudyGuidePart[]} The parts of this StudyGuide of the current logged in user.
	###
	parts: (callback) ->
		return unless callback?

		@_magisterObj.http.get "#{@_magisterObj._pupilUrl}/studiewijzers/#{@id()}", {}, (error, result) =>
			if error? then callback error, null
			else
				result = JSON.parse(result.content).Onderdelen.Items
				pushResult = root._helpers.asyncResultWaiter result.length, (r) -> callback null, r

				for id in (p.Id for p in result)
					@_magisterObj.http.get "#{@_magisterObj._pupilUrl}/studiewijzers/#{@id()}/onderdelen/#{id}", {}, (error, result) =>
						if error? then callback error, null
						else
							parsed = JSON.parse result.content
							part = root.StudyGuidePart._convertRaw @_magisterObj, parsed
							pushResult part

	@_convertRaw: (magisterObj, raw) ->
		obj = new root.StudyGuide magisterObj

		obj._id = raw.Id
		obj._from = root._helpers.parseDate raw.Van
		obj._to = root._helpers.parseDate raw.TotEnMet
		obj._classCodes = raw.VakCodes
		obj._class = raw.VakCodes[0]
		obj._name = raw.Titel
		obj._archived = raw.InLeerlingArchief

		obj

###*
# A part of a StudyGuide.
#
# @class StudyGuidePart
# @private
# @constructor
# @param _magisterObj {Magister} A Magister object this StudyGuidePart is child of.
###
class root.StudyGuidePart
	constructor: (@_magisterObj) ->
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = root._getset "_id"
		###*
		# @property from
		# @final
		# @type Date|undefined
		###
		@from = root._getset "_from"
		###*
		# @property to
		# @final
		# @type Date|undefined
		###
		@to = root._getset "_to"
		###*
		# @property name
		# @final
		# @type String
		###
		@name = root._getset "_name"
		###*
		# @property description
		# @final
		# @type String
		###
		@description = root._getset "_description", null, root._helpers.cleanHtmlContent
		###*
		# @property visible
		# @final
		# @type Boolean
		###
		@visible = root._getset "_visible"
		###*
		# @property number
		# @final
		# @type Number
		###
		@number = root._getset "_number"
		###*
		# @property files
		# @final
		# @type File[]
		###
		@files = root._getset "_files"

	@_convertRaw: (magisterObj, raw) ->
		obj = new root.StudyGuidePart magisterObj

		obj._id = raw.Id
		obj._from = root._helpers.parseDate raw.Van
		obj._to = root._helpers.parseDate raw.TotEnMet
		obj._name = raw.Titel
		obj._description = raw.Omschrijving ? ""
		obj._visible = raw.IsZichtbaar
		obj._number = raw.Volgnummer

		obj._files = ( root.File._convertRaw magisterObj, undefined, f for f in raw.Bronnen )

		obj
