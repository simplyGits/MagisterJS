###*
# A StudyGuide, containing various Files and Links teachers can put on Magister.
#
# @class StudyGuide
# @private
# @constructor
# @param _magisterObj {Magister} A Magister object this StudyGuide is child of.
###
class @StudyGuide
	constructor: (@_magisterObj) ->
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = _getset "_id"
		###*
		# @property from
		# @final
		# @type Date
		###
		@from = _getset "_from"
		###*
		# @property to
		# @final
		# @type Date
		###
		@to = _getset "_to"
		###*
		# @property classCodes
		# @final
		# @type String[]
		###
		@classCodes = _getset "_classCodes"
		###*
		# @property name
		# @final
		# @type String
		###
		@name = _getset "_name"
		###*
		# @property archived
		# @final
		# @type Boolean
		###
		@archived = _getset "_archived"
		###*
		# @property class
		# @final
		# @type Class
		###
		@class = _getset "_class"

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
				result = EJSON.parse(result.content).Onderdelen.Items
				pushResult = _helpers.asyncResultWaiter result.length, (r) -> callback null, r

				for id in (p.Id for p in result)
					@_magisterObj.http.get "#{@_magisterObj._pupilUrl}/studiewijzers/#{@id()}/onderdelen/#{id}", {}, (error, result) =>
						pushResult StudyGuidePart._convertRaw @_magisterObj, EJSON.parse(result.content)


	@_convertRaw: (magisterObj, raw) ->
		obj = new StudyGuide magisterObj

		obj._id = raw.Id
		obj._from = new Date Date.parse raw.Van
		obj._to = new Date Date.parse raw.TotEnMet
		obj._classCodes = raw.VakCodes
		obj._class = raw.VakCodes[0]
		obj._name = raw.Titel
		obj._archived = raw.InLeerlingArchief

		return obj

###*
# A part of a StudyGuide.
#
# @class StudyGuidePart
# @private
# @constructor
# @param _magisterObj {Magister} A Magister object this StudyGuidePart is child of.
###
class @StudyGuidePart
	constructor: (@_magisterObj) ->
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = _getset "_id"
		###*
		# @property from
		# @final
		# @type Date
		###
		@from = _getset "_from"
		###*
		# @property to
		# @final
		# @type Date
		###
		@to = _getset "_to"
		###*
		# @property name
		# @final
		# @type String
		###
		@name = _getset "_name"
		###*
		# @property description
		# @final
		# @type String
		###
		@description = _getset "_description", null, (x) -> if x? then x.replace(/<br ?\/?>/g, "\n").replace(/(<[^>]*>)|(&nbsp;)/g, "").replace(/&amp;/ig, "&") else x
		###*
		# @property visible
		# @final
		# @type Boolean
		###
		@visible = _getset "_visible"
		###*
		# @property number
		# @final
		# @type Number
		###
		@number = _getset "_number"
		###*
		# @property files
		# @final
		# @type File[]
		###
		@files = _getset "_files"

	@_convertRaw: (magisterObj, raw) ->
		obj = new StudyGuidePart magisterObj

		obj._id = raw.Id
		obj._from = new Date Date.parse raw.Van
		obj._to = new Date Date.parse raw.TotEnMet
		obj._name = raw.Titel
		obj._description = raw.Omschrijving
		obj._visible = raw.IsZichtbaar
		obj._number = raw.Volgnummer

		obj._files = ( File._convertRaw magisterObj, undefined, f for f in raw.Bronnen )

		return obj
