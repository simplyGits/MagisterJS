root = (module?.exports ? this.Magister ?= {})

messageFolder = (magisterObj, x) ->
	switch x
		when 1 then magisterObj.inbox()
		when 2 then magisterObj.sentItems()
		when 3 then magisterObj.bin()
		when 4 then magisterObj.alerts()

		# TODO: allow search with id to `Magister::messageFolders` so that we can
		# give back the real messagefolder.
		else root.MessageFolder._convertRaw { Id: x }

#TODO: Support sending Attachments.
###*
# A Magister message.
#
# @class Message
# @param _magisterObj {Magister} A Magister object this Message is child of.
# @constructor
###
class root.Message
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
		@id = root._getset "_id"
		###*
		# @property body
		# @type String
		# @default ""
		###
		@body = root._getset "_body", ((x) => @_body = (x ? "").replace "\n", "<br>"), root._helpers.cleanHtmlContent
		###*
		# @property attachments
		# @final
		# @type File[]
		###
		@attachments = root._getset "_attachments"
		###*
		# The MessageFolder this Message in, changing this will move the Message.
		# @property messageFolder
		# @type MessageFolder
		###
		@messageFolder = root._getset "_folderId", ((x) => @move x), (x) => messageFolder @_magisterObj, x
		###*
		# @property subject
		# @type String
		# @default ""
		###
		@subject = root._getset "_subject", (x) => @_subject = x
		###*
		# @property sender
		# @final
		# @type Person
		###
		@sender = root._getset "_sender"
		###*
		# @property recipients
		# @final
		# @type Person[]
		# @default []
		###
		@recipients = root._getset "_recipients"
		###*
		# @property sendDate
		# @final
		# @type Date|undefined
		# @default new Date()
		###
		@sendDate = root._getset "_sendDate"
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
		# @property isRead
		# @type Boolean
		# @default false
		###
		@isRead = root._getset "_isRead", (x) =>
			return if @_isRead is x or @_canSend

			@_isRead = x
			@_update()
		###*
		# @property state
		# @final
		# @type Number
		###
		@state = root._getset "_state"
		###*
		# @property isFlagged
		# @final
		# @type Boolean
		###
		@isFlagged = root._getset "_isFlagged"
		###*
		# @property type
		# @final
		# @type Number
		###
		@type = root._getset "_type"

	_tasks: 0
	_sendAfterFinished: no
	_finishedCallback: null
	_isWorking: -> @_tasks isnt 0
	_tickDown: -> if --@_tasks is 0 and @_sendAfterFinished then @send @_finishedCallback
	_reset: -> @_tasks = 0; @_sendAfterFinished = no

	###*
	# Adds (a) recipient(s) to the current Message.
	#
	# @method addRecipient
	# @param recipient {String|Person|Number|String[]|Person[]|Number[]} The recipient(s) to add.
	# @param [type] {String|Number} The type of the recipient, if none is provided and recipient is a String it will search for persons.
	###
	addRecipient: (recipient, type) ->
		if _.isString recipient
			@_tasks++
			@_magisterObj.getPersons recipient, type, (e, r) =>
				if e? then @_reset(); throw e
				else if r.length isnt 0
					@recipients().push r[0]
					@_tickDown()
				else if type? then @_reset(); throw new Error "Couldn't find a person with the type: \"#{type}\" and with the query: \"#{recipient}\""
				else @_reset(); throw new Error "Couldn't find a person with the query: \"#{recipient}\""

		else if _.isArray recipient
			@addRecipient p, type for p in recipient

		else if _.isObject recipient
			@recipients().push recipient

		else if _.isNumber recipient
			person = new root.Person @_magisterObj, '', ''
			person._id = recipient
			person._type = 3
			@recipients().push person

		else
			@_reset()
			throw new Error "Expected recipient to be a String, Number, or an Object, got a(n) #{root._helpers.typeof recipient}"

		undefined

	###*
	# Creates a new Message that replies to the sender of the current Message.
	#
	# @method createReplyMessage
	# @param [newContent] {String} The string to prepend the current message with.
	# @return {Message} The newely created Message.
	###
	createReplyMessage: (newContent) ->
		subject = if @subject().indexOf("RE: ") isnt 0 then "RE: #{@subject()}" else subject()

		msg = new root.Message @_magisterObj
		msg._sender = @_sender
		msg._folderId = @_folderId
		msg._isFlagged = @_isFlagged
		msg._id = @_id
		msg._body = (if newContent? then "#{newContent}<br><br>---------------<br>" else "") + "<b>Van:</b> #{@sender().description()}<br><b>Verzonden:</b> #{@sendDate().toLocaleString()}<br><b>Aan:</b> #{@recipients().map((x) -> x.fullName()).join ", "}<br><b>Onderwerp:</b> #{@subject()}<br><br>\"#{@body()}\"<br><br>"
		msg._subject = subject
		msg._recipients = [ @sender() ]

		msg

	###*
	# Creates a new Message that replies to the sender and recipients of the current Message.
	#
	# @method createReplyToAllMessage
	# @param [newContent] {String} The string to prepend the current message with.
	# @return {Message} The newely created Message.
	###
	createReplyToAllMessage: (newContent) ->
		subject = if @subject().indexOf("RE: ") isnt 0 then "RE: #{@subject()}" else subject()

		msg = new root.Message @_magisterObj
		msg._sender = @_sender
		msg._folderId = @_folderId
		msg._isFlagged = @_isFlagged
		msg._id = @_id
		msg._body = (if newContent? then "#{newContent}<br><br>---------------<br>" else "") + "<b>Van:</b> #{@sender().description()}<br><b>Verzonden:</b> #{@sendDate().toLocaleString()}<br><b>Aan:</b> #{@recipients().map((x) -> x.fullName()).join ", "}<br><b>Onderwerp:</b> #{@subject()}<br><br>\"#{@body()}\"<br><br>"
		msg._subject = subject
		msg._recipients = _.reject(@recipients(), (x) -> x.id() is @_magisterObj.profileInfo().id()).concat [ @sender() ]

		msg

	###*
	# Creates a new Message that forwards the current Message.
	#
	# @method createForwardMessage
	# @param [newContent] {String} The string to prepend the current message with.
	# @return {Message} The newely created Message.
	###
	createForwardMessage: (newContent) ->
		subject = if @subject().indexOf("FW: ") isnt 0 then "FW: #{@subject()}" else subject()

		msg = new root.Message @_magisterObj
		msg._sender = @_sender
		msg._folderId = @_folderId
		msg._isFlagged = @_isFlagged
		msg._id = @_id
		msg._body = (if newContent? then "#{newContent}<br><br>---------------<br>" else "") + "<b>Van:</b> #{@sender().description()}<br><b>Verzonden:</b> #{@sendDate().toLocaleString()}<br><b>Aan:</b> #{@recipients().map((x) -> x.fullName()).join ", "}<br><b>Onderwerp:</b> #{@subject()}<br><br>\"#{@body()}\"<br><br>"
		msg._subject = subject

		msg

	###*
	# Sends the current Message. Sending will be delayed if there are processes running in the background.
	#
	# @method send
	# @param [cb] {Function} An optional callback.
	# 	@param [cb.error] {Object} An error, if it exists.
	# 	@param [cb.result] {Message} The sent message.
	# @return {Boolean} False if the sending is delayed, otherwise true.
	###
	send: (cb) ->
		if @_isWorking()
			@_sendAfterFinished = yes
			@_finishedCallback = cb
			no
		else
			error = (str) -> root._helpers.defer cb, new Error(str), null
			unless @_canSend
				error 'this message is marked as unsendable'
				return undefined
			unless @recipients()? and @sender()?
				error 'both sender and recipients must have a value'
				return undefined
			if _.isEmpty @subject()
				error "subject can't be empty"
				return undefined

			@_magisterObj.http.post "#{@_magisterObj._personUrl}/berichten", @_toMagisterStyle(), {}, (e, r) =>
				if e? then cb? e, null
				else cb? null, this

			yes

	###*
	# Move the current message to the given position.
	#
	# @method move
	# @param destination {Number|MessageFolder} The ID of a MessageFolder or the MessageFolder itself where to move this Message to.
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
	# @param [callback] {Function} An optional callback.
	# 	@param [callback.error] {Object} An error, if it exists.
	###
	remove: (cb) -> @_magisterObj.http.delete "#{@_magisterObj._personUrl}/berichten/#{@id()}", {}, (error, result) -> cb? error

	###*
	# Downloads extra info, if it's not downloaded yet and fills the current
	# message with it.
	#
	# @method fillMessage
	# @param {Boolean} [fillPersons=false] Whether or not to download the users from the server.
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Message} The current message filled with the newely downloaded info.
	###
	fillMessage: ->
		fillPersons = _.first(arguments) ? no
		callback = _.last arguments

		if @_filled
			root._helpers.defer callback, null, this
		else if callback?
			@_magisterObj.http.get @_fillUrl, {}, (error, result) =>
				if error? then callback? error, null
				else
					parsed = JSON.parse(result.content)
					@_body = parsed.Inhoud
					@_attachments = (root.File._convertRaw(@_magisterObj, undefined, a) for a in (parsed.Bijlagen ? []))

					if fillPersons
						pushPeople = root._helpers.asyncResultWaiter m.recipients().length + 1, =>
							@_filled = yes
							callback? null, this

						@_magisterObj.fillPersons m.recipients(), (e, r) ->
							m._recipients = r
							pushPeople r

						@_magisterObj.fillPersons m.sender(), (e, r) ->
							m._sender = r
							pushPeople r
					else
						@_filled = yes
						callback? null, this

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

		obj

	@_convertRaw: (magisterObj, raw) ->
		obj = new root.Message magisterObj

		obj._id = raw.Id
		obj._body = raw.Inhoud ? ""
		obj._folderId = raw.MapId
		obj._subject = raw.Onderwerp
		obj._sender = root.Person._convertRaw magisterObj, raw.Afzender
		obj._recipients = ( root.Person._convertRaw magisterObj, o for o in (raw.Ontvangers ? []) )
		obj._sendDate = root._helpers.parseDate raw.VerstuurdOp
		obj._begin = root._helpers.parseDate raw.Begin
		obj._end = root._helpers.parseDate raw.Einde
		obj._isRead = raw.IsGelezen
		obj._state = raw.Status
		obj._isFlagged = raw.HeeftPrioriteit
		obj._type = raw.Soort
		obj._canSend = no

		obj._fillUrl = "#{magisterObj._personUrl}/berichten/#{obj._id}?berichtSoort=#{obj._type}"

		obj
