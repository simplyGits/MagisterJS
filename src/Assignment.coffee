root = (module?.exports ? this.Magister ?= {})

###*
# An Assignment.
#
# @class Assignment
# @private
# @constructor
# @param _magisterObj {Magister} A Magister object this Assignment is child of.
###
class root.Assignment
	constructor: (@_magisterObj) ->
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = root._getset "_id"
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
		@description = root._getset "_description"
		###*
		# @property class
		# @final
		# @type Class
		###
		@class = root._getset "_class"
		###*
		# @property deadline
		# @final
		# @type Date|undefined
		###
		@deadline = root._getset "_deadline"
		###*
		# @property handedInOn
		# @final
		# @type Date|undefined
		###
		@handedInOn = root._getset "_handedInOn"
		###*
		# @property files
		# @final
		# @type File[]
		###
		@files = root._getset "_files"
		###*
		# @property teachers
		# @final
		# @type Person[]
		###
		@teachers = root._getset "_teachers"
		###*
		# @property grade
		# @final
		# @type String
		###
		@grade = root._getset "_grade"
		###*
		# @property markedOn
		# @final
		# @type Date|undefined
		###
		@markedOn = root._getset "_markedOn"
		###*
		# @property handInAgain
		# @final
		# @type Boolean
		###
		@handInAgain = root._getset "_handInAgain"
		###*
		# @property finished
		# @final
		# @type Boolean
		###
		@finished = root._getset "_finished"
		###*
		# @property canHandIn
		# @final
		# @type Boolean
		###
		@canHandIn = root._getset "_canHandIn"

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
		pushResult = root._helpers.asyncResultWaiter @_versionIds.length, (r) -> callback null, r
		for id in @_versionIds
			@_magisterObj.http.get "#{@_magisterObj._personUrl}/opdrachten/versie/#{id}", {}, (error, result) =>
				if error? then callback error, null
				else pushResult root.AssignmentVersion._convertRaw @_magisterObj, this, JSON.parse(result.content)

	@_convertRaw: (magisterObj, raw) ->
		obj = new root.Assignment magisterObj

		obj._id = raw.Id
		obj._name = raw.Titel
		obj._description = raw.Omschrijving
		obj._class = raw.Vak
		obj._deadline = root._helpers.parseDate raw.InleverenVoor
		obj._handedInOn = root._helpers.parseDate raw.IngeleverdOp
		obj._files = ( root.File._convertRaw magisterObj, undefined, f for f in raw.Bijlagen )
		obj._teachers = if raw.Docenten? then (root.Person._convertRaw(magisterObj, p) for p in raw.Docenten) else undefined
		obj._versionIds = ( v.Id for v in raw.VersieNavigatieItems )
		obj._grade = raw.Beoordeling
		obj._markedOn = root._helpers.parseDate raw.BeoordeeldOp
		obj._handInAgain = raw.OpnieuwInleveren
		obj._finished = raw.Afgesloten
		obj._canHandIn = raw.MagInleveren

		obj

###*
# An (handed in) version of an Assignment.
#
# @class AssignmentVersion
# @private
# @constructor
# @param _magisterObj {Magister} A Magister object this AssignmentVersion is child of.
###
class root.AssignmentVersion
	constructor: (@_magisterObj) ->
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = root._getset "_id"
		###*
		# @property class
		# @final
		# @type Class
		###
		@class = root._getset "_class"
		###*
		# @property state
		# @final
		# @type Number
		###
		@state = root._getset "_state"
		###*
		# @property pupilMessage
		# @final
		# @type String
		###
		@pupilMessage = root._getset "_pupilMessage"
		###*
		# @property teacherNotice
		# @final
		# @type String
		###
		@teacherNotice = root._getset "_teacherNotice"
		###*
		# @property handedInFiles
		# @final
		# @type File[]
		###
		@handedInFiles = root._getset "_handedInFiles"
		###*
		# @property feedbackFiles
		# @final
		# @type File[]
		###
		@feedbackFiles = root._getset "_feedbackFiles"
		###*
		# @property deadline
		# @final
		# @type Date|undefined
		###
		@deadline = root._getset "_deadline"
		###*
		# @property handedInOn
		# @final
		# @type Date|undefined
		###
		@handedInOn = root._getset "_handedInOn"
		###*
		# @property grade
		# @final
		# @type String
		###
		@grade = root._getset "_grade"
		###*
		# @property markedOn
		# @final
		# @type Date|undefined
		###
		@markedOn = root._getset "_markedOn"
		###*
		# @property version
		# @final
		# @type Number
		###
		@version = root._getset "_version"
		###*
		# @property tooLate
		# @final
		# @type Boolean
		###
		@tooLate = root._getset "_tooLate"

	@_convertRaw: (magisterObj, sender, raw) ->
		obj = new root.AssignmentVersion magisterObj

		obj._id = raw.Id
		obj._class = sender._class
		obj._state = raw.Status
		obj._pupilMessage = raw.LeerlingOpmerking
		obj._teacherNotice = raw.DocentOpmerking
		obj._handedInFiles = ( root.File._convertRaw magisterObj, undefined, f for f in raw.LeerlingBijlagen )
		obj._feedbackFiles = ( root.File._convertRaw magisterObj, undefined, f for f in raw.FeedbackBijlagen )
		obj._deadline = root._helpers.parseDate raw.InleverenVoor
		obj._handedInOn = root._helpers.parseDate raw.IngeleverdOp
		obj._grade = raw.Beoordeling
		obj._markedOn = root._helpers.parseDate raw.BeoordeeldOp
		obj._version = raw.VersieNummer
		obj._tooLate = raw.IsTeLaat

		obj
