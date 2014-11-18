messageFolder = (magisterObj, x) ->
	switch x
		when 1 then magisterObj.inbox()
		when 2 then magisterObj.sentItems()
		when 3 then magisterObj.bin()
		when 4 then magisterObj.alerts()

		else MessageFolder._convertRaw { Id: x }

#TODO: Support sending Attachments.
###*
# A Magister message.
#
# @class Message
# @param _magisterObj {Magister} A Magister object this Message is child of.
# @constructor
###
class @Message
	constructor: (@_magisterObj) ->
		throw new Error "Magister instance is null!" unless @_magisterObj?
		@_magisterObj._forceReady()

		@_canSend = yes
		@_sender = @_magisterObj.profileInfo()
		@_recipients = []
		@_sendDate = new Date()
		@_isRead = no
		@_type = 1
		@_subject = ""
		@_body = ""

		###*
		# @property id
		# @final
		# @type Number
		###
		@id = _getset "_id"
		###*
		# @property body
		# @type String
		# @default ""
		###
		@body = _getset "_body", ((x) => @_body = x.replace "\n", "<br>"), (x) -> if x? then x.replace(/<br ?\/?>/g, "\n").replace(/(<[^>]*>)|(&nbsp;)/g, "") else ""
		###*
		# @property attachments
		# @final
		# @type File[]
		###
		@attachments = _getset "_attachments"
		###*
		# The MessageFolder this Message in, changing this will move the Message.
		# @property messageFolder
		# @type MessageFolder
		###
		@messageFolder = _getset "_folderId", ((x) => @move x), (x) => messageFolder @_magisterObj, x
		###*
		# @property subject
		# @type String
		# @default ""
		###
		@subject = _getset "_subject", (x) => @_subject = x
		###*
		# @property sender
		# @final
		# @type Person
		###
		@sender = _getset "_sender"
		###*
		# @property recipients
		# @final
		# @type Person[]
		# @default []
		###
		@recipients = _getset "_recipients"
		###*
		# @property sendDate
		# @final
		# @type Date
		# @default new Date()
		###
		@sendDate = _getset "_sendDate"
		###*
		# @property begin
		# @final
		# @type Date
		###
		@begin = _getset "_begin"
		###*
		# @property end
		# @final
		# @type Date
		###
		@end = _getset "_end"
		###*
		# @property isRead
		# @type Boolean
		# @default false
		###
		@isRead = _getset "_isRead", (x) =>
			return if @_isRead is x or @_canSend

			@_isRead = x
			@_update()
		###*
		# @property state
		# @final
		# @type Number
		###
		@state = _getset "_state"
		###*
		# @property isFlagged
		# @final
		# @type Boolean
		###
		@isFlagged = _getset "_isFlagged"
		###*
		# @property type
		# @final
		# @type Number
		###
		@type = _getset "_type"

	_tasks: 0
	_sendAfterFinished: no
	_working: -> @_tasks isnt 0
	_tickDown: -> if --@_tasks is 0 and @_sendAfterFinished then @send()
	_reset: -> @_tasks = 0; @_sendAfterFinished = no

	###*
	# Adds (a) recipient(s) to the current Message.
	#
	# @method addRecipient
	# @param recipient {String|Person|String[]|Person[]} The recipient(s) to add.
	# @param [type] {String|Number} The type of the recipient, if none is provided and recipient is a String it will search for both Teachers and Pupils.
	###
	addRecipient: (recipient, type) ->
		if _.isString recipient
			@_tasks++
			@_magisterObj.getPersons recipient, type, (e, r) =>
				if r.length isnt 0
					@recipients().push r[0]
					@_tickDown()
				else if type? then @_reset(); throw new Error "Couldn't find a person with the type: \"#{type}\" and with the query: \"#{recipient}\""
				else @_reset(); throw new Error "Couldn't find a person with the query: \"#{recipient}\""
		else if _.isArray recipient
			@addRecipient p, type for p in recipient

		else if _.isObject recipient
			@recipients().push recipient

		else
			@_reset()
			throw new Error "Expected recipient to be a String or an Object, got a(n) #{typeof recipient}"

		return undefined

	###*
	# Sends the current Message. Sending will be delayed if there are processes running in the background.
	#
	# @method send
	# @return {Boolean} False if the sending is delayed, otherwise true.
	###
	send: ->
		if @_working()
			@_sendAfterFinished = yes
			return no
		throw new Error "This message is marked as unsendable" unless @_canSend
		throw new Error "Sender and/or recipients cannot be null" unless @recipients()? and @sender()?
		throw new Error "Subject cannot be null or empty" if _.isEmpty @subject()
		@body "" unless @body()?

		@_magisterObj.http.post "#{@_magisterObj._personUrl}/berichten", @_toMagisterStyle(), {}, (e, r) -> throw e if e?
		return yes

	###*
	# Move the current message to the given position.
	#
	# @method move
	# @param destination {Number|MessageFolder} The MessageFolder of the ID of a MessageFolder or the MessageFolder itself where to move this Message to.
	###
	move: (destination) ->
		destination = destination.id() if _.isObject(destination)
		throw new Error("Could not resolve MessageFolder form the given destination.") unless _.isNumber(destination)
		return if @_folderId is destination

		@_folderId = destination
		@_update()

	###*
	# WARNING. Removes the current Message.
	#
	# @method remove
	###
	remove: -> @_magisterObj.http.delete "#{@_magisterObj._personUrl}/berichten/#{@id()}", {}, (error, result) -> throw error if error?

	_update: -> @_magisterObj.http.put "#{@_magisterObj._personUrl}/berichten/#{@id()}?berichtSoort=#{@type()}", @_toMagisterStyle(), {}, (->)

	_toMagisterStyle: ->
		obj = {}

		obj.Id = @_id
		obj.Inhoud = @_body
		obj.MapId = @_folderId
		obj.Onderwerp = @_subject
		#obj.Afzender = @_sender._toMagisterStyle()
		obj.Ontvangers = ( p._toMagisterStyle() for p in @_recipients )
		obj.VerstuurdOp = @_sendDate
		obj.Begin = @_begin
		obj.Einde = @_end
		obj.IsGelezen = @_isRead
		obj.Status = @_state
		obj.HeeftPrioriteit = @_isFlagged
		obj.Soort = @_type

		return obj

	@_convertRaw: (magisterObj, raw) ->
		obj = new Message magisterObj

		obj._id = raw.Id
		obj._body = raw.Inhoud ? ""
		obj._folderId = raw.MapId
		obj._subject = raw.Onderwerp
		obj._sender = Person._convertRaw magisterObj, raw.Afzender
		obj._recipients = ( Person._convertRaw magisterObj, o for o in (raw.Ontvangers ? []) )
		obj._sendDate = new Date Date.parse raw.VerstuurdOp
		obj._begin = new Date Date.parse raw.Begin
		obj._end = new Date Date.parse raw.Einde
		obj._isRead = raw.IsGelezen
		obj._state = raw.Status
		obj._isFlagged = raw.HeeftPrioriteit
		obj._type = raw.Soort
		obj._canSend = no

		return obj