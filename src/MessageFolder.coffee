root = (module?.exports ? this.Magister ?= {})

###*
# A MessageFolder.
#
# @class MessageFolder
# @private
# @param _magisterObj {Magister} A Magister object this MessageFolder is child of.
# @constructor
###
class root.MessageFolder
	constructor: (@_magisterObj) ->
		###*
		# @property name
		# @final
		# @type String
		###
		@name = root._getset "_name"
		###*
		# @property unreadMessagesCount
		# @final
		# @type Number
		###
		@unreadMessagesCount = root._getset "_unreadMessagesCount"
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = root._getset "_id"
		###*
		# @property parentId
		# @final
		# @type Number
		###
		@parentId = root._getset "_parentId"

	###*
	# Gets the Messages of this MessageFolder.
	#
	# @method messages
	# @async
	# @param {Object} [options={}]
	# 	@param {Number} [options.limit=10] The limit of the amount of Messages to fetch.
	# 	@param {Number} [options.skip=0] The amount of messages in front to skip.
	# 	@param {String} [options.readState='all'] One of: 'all', 'read', 'unread'.
	# 	@param {Boolean} [options.fill=true] Whether or not to call `fillMessage` on every message.
	# 	@param {Boolean} [options.fillPersons=false] Whether or not to download the users from the server. `options.fill` has to be true for this option to take effect.
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Message[]} An array containing the Messages.
	###
	messages: ->
		if arguments.length is 0
			return undefined
		else if arguments.length is 1
			options = {}
			callback = arguments[0]
		else
			options = arguments[0]
			callback = arguments[1]

		{ limit, skip, readState, fillPersons, fill } = options
		limit ?= 10
		skip ?= 0
		readState ?= 'all'
		fill ?= yes
		fillPersons ?= no

		if limit is 0
			root._helpers.defer callback, null, []
			return undefined

		url = "#{@_magisterObj._personUrl}/berichten?mapId=#{@id()}&top=#{limit}&skip=#{skip}"
		url += switch readState
			when 'read' then '&gelezen=true'
			when 'unread' then '&gelezen=false'
			else ''

		@_magisterObj.http.get url, {}, (error, result) =>
			if error?
				callback error, null
			else
				messages = ( root.Message._convertRaw(@_magisterObj, m) for m in JSON.parse(result.content).Items )
				pushMessage = root._helpers.asyncResultWaiter messages.length, (r) ->
					callback null, _.sortBy(r, (m) -> m.sendDate()).reverse()

				if fill
					for m in messages then do (m) ->
						m.fillMessage fillPersons, (e, r) ->
							if e? then callback e, null
							else pushMessage r
				else
					for m in messages
						pushMessage m

			undefined

	###*
	# Gets the MessageFolders in this MessageFolder that matches the given query. Or if no query is given, all MessageFolders
	#
	# @method messageFolders
	# @async
	# @param query {String} A case insensetive query the MessageFolder need to match.
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	#	@param [callback.result] {MessageFolder[]} An array containing the matching MessageFolders.
	# @return {MessageFolder[]} An array containing the matching messageFolders.
	###
	messageFolders: (query, callback) ->
		callback = (if callback? then callback else query) ? (->)
		return unless callback?
		@_magisterObj.http.get "#{@_magisterObj._personUrl}/berichten/mappen?parentId=#{@id()}", {},
			(error, result) =>
				if error?
					callback error, null
				else
					messageFolders = (root.MessageFolder._convertRaw(@_magisterObj, mF) for mF in JSON.parse(result.content).Items)

					if _.isString(query) and query isnt ""
						result = _.where messageFolders, (mF) -> Helpers.contains mF.name(), query, yes
					else
						result = messageFolders

					callback null, result

	###*
	# DANGER. Removes ALL messages from the current MessageFolder.
	# @method removeAllMessages
	###
	removeAllMessages: -> @_magisterObj.http.delete "#{@_magisterObj._personUrl}/berichten/map/#{@id()}", {}, (e, r) -> throw e if e?

	###*
	# Creates a new MessageFolder inside of this MessageFolder with the given name.
	#
	# @method createMessageFolder
	# @async
	# @param name {String} The name of the MessageFolder.
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	#	@param [callback.result] {MessageFolder} The new MessageFolder.
	###
	createMessageFolder: (name, callback = (->)) ->
		folder =
			naam: name
			parentId: @id()
			persoonId: @_magisterObj._id

		@_magisterObj.http.post "#{@_magisterObj._personUrl}/berichten/mappen", folder, {}, (error, result) =>
			if error? then callback error, null
			else callback null, root.MessageFolder._convertRaw @_magisterObj, JSON.parse(result.content)

	# TODO: Doesn't work!
	###*
	# DANGER. Removes the current MessageFolder.
	# @method remove
	###
	remove: -> @_magisterObj.http.put "#{@_magisterObj._personUrl}/berichten/mappen", @_toMagisterStyle(), {}, (e, r) -> throw e if e?

	_toMagisterStyle: ->
		obj = {}

		obj.Naam = @_name
		obj.OngelezenBerichten = @_unreadMessagesCount
		obj.Id = @_id
		obj.ParentId = @_parentId

		obj

	@_convertRaw: (magisterObj, raw) ->
		obj = new root.MessageFolder magisterObj

		obj._name = raw.Naam
		obj._unreadMessagesCount = raw.OngelezenBerichten
		obj._id = raw.Id
		obj._parentId = raw.ParentId

		obj
