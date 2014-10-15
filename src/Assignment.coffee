###*
# An Assignment.
#
# @class Assignment
# @private
# @constructor
# @param _magisterObj {Magister} A Magister object this Assignment is child of.
###
class @Assignment
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
		# @property description
		# @final
		# @type String
		###
		@description = _getset "_description"
		###*
		# @property class
		# @final
		# @type Class
		###
		@class = _getset "_class"
		###*
		# @property deadline
		# @final
		# @type Date
		###
		@deadline = _getset "_deadline"
		###*
		# @property handedInOn
		# @final
		# @type Date
		###
		@handedInOn = _getset "_handedInOn"
		###*
		# @property files
		# @final
		# @type File[]
		###
		@files = _getset "_files"
		###*
		# @property teachers
		# @final
		# @type Person[]
		###
		@teachers = _getset "_teachers"
		###*
		# @property grade
		# @final
		# @type String
		###
		@grade = _getset "_grade"
		###*
		# @property markedOn
		# @final
		# @type Date
		###
		@markedOn = _getset "_markedOn"
		###*
		# @property handInAgain
		# @final
		# @type Boolean
		###
		@handInAgain = _getset "_handInAgain"
		###*
		# @property finished
		# @final
		# @type Boolean
		###
		@finished = _getset "_finished"
		###*
		# @property canHandIn
		# @final
		# @type Boolean
		###
		@canHandIn = _getset "_canHandIn"

	###*
	# Gets the versions of this Assigment.
	#
	# @method versions
	# @async
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {AssignmentVersion[]} An array containing AssignmentVersions.
	###
	versions: (callback) ->
		pushResult = _helpers.asyncResultWaiter @_versionIds.length, (r) -> callback null, r
		for id in @_versionIds
			@_magisterObj.http.get "#{@_magisterObj._personUrl}/opdrachten/versie/#{id}", {}, (error, result) =>
				if error? then callback error, null
				else pushResult AssignmentVersion._convertRaw @_magisterObj, @, EJSON.parse(result.content)

	@_convertRaw: (magisterObj, raw) ->
		obj = new Assignment magisterObj

		obj._id = raw.Id
		obj._name = raw.Titel
		obj._description = raw.Omschrijving
		obj._class = raw.Vak
		obj._deadline = new Date Date.parse raw.InleverenVoor
		obj._handedInOn = new Date Date.parse raw.IngeleverdOp
		obj._files = ( File._convertRaw magisterObj, undefined, f for f in raw.Bijlagen )
		obj._teachers = if raw.Docenten? then (Person._convertRaw(magisterObj, p) for p in raw.Docenten) else undefined
		obj._versionIds = ( v.Id for v in raw.VersieNavigatieItems )
		obj._grade = raw.Beoordeling
		obj._markedOn = new Date Date.parse raw.BeoordeeldOp
		obj._handInAgain = raw.OpnieuwInleveren
		obj._finished = raw.Afgesloten
		obj._canHandIn = raw.MagInleveren

		return obj

###*
# An (handed in) version of an Assignment.
#
# @class AssignmentVersion
# @private
# @constructor
# @param _magisterObj {Magister} A Magister object this AssignmentVersion is child of.
###
class @AssignmentVersion
	constructor: (@_magisterObj) ->
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = _getset "_id"
		###*
		# @property class
		# @final
		# @type Class
		###
		@class = _getset "_class"
		###*
		# @property state
		# @final
		# @type Number
		###
		@state = _getset "_state"
		###*
		# @property pupilMessage
		# @final
		# @type String
		###
		@pupilMessage = _getset "_pupilMessage"
		###*
		# @property teacherNotice
		# @final
		# @type String
		###
		@teacherNotice = _getset "_teacherNotice"
		###*
		# @property handedInFiles
		# @final
		# @type File[]
		###
		@handedInFiles = _getset "_handedInFiles"
		###*
		# @property feedbackFiles
		# @final
		# @type File[]
		###
		@feedbackFiles = _getset "_feedbackFiles"
		###*
		# @property deadline
		# @final
		# @type Date
		###
		@deadline = _getset "_deadline"
		###*
		# @property handedInOn
		# @final
		# @type Date
		###
		@handedInOn = _getset "_handedInOn"
		###*
		# @property grade
		# @final
		# @type String
		###
		@grade = _getset "_grade"
		###*
		# @property markedOn
		# @final
		# @type Date
		###
		@markedOn = _getset "_markedOn"
		###*
		# @property version
		# @final
		# @type Number
		###
		@version = _getset "_version"
		###*
		# @property tooLate
		# @final
		# @type Boolean
		###
		@tooLate = _getset "_tooLate"

	@_convertRaw: (magisterObj, sender, raw) ->
		obj = new AssignmentVersion magisterObj

		obj._id = raw.Id
		obj._class = sender._class
		obj._state = raw.Status
		obj._pupilMessage = raw.LeerlingOpmerking
		obj._teacherNotice = raw.DocentOpmerking
		obj._handedInFiles = ( File._convertRaw magisterObj, undefined, f for f in raw.LeerlingBijlagen )
		obj._feedbackFiles = ( File._convertRaw magisterObj, undefined, f for f in raw.FeedbackBijlagen )
		obj._deadline = new Date Date.parse raw.InleverenVoor
		obj._handedInOn = new Date Date.parse raw.IngeleverdOp
		obj._grade = raw.Beoordeling
		obj._markedOn = new Date Date.parse raw.BeoordeeldOp
		obj._version = raw.VersieNummer
		obj._tooLate = raw.IsTeLaat

		return obj