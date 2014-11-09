findQueries = (queries) ->
	final = ""

	if _.any(["unread", "ongelezen"], (x) -> _helpers.contains queries, x, yes)
		final += "&gelezen=false"
	else if _.any(["read", "gelezen"], (x) -> _helpers.contains queries, x, yes)
		final += "&gelezen=true"

	if (result = /(skip \d+)|(sla \d+ over)/ig.exec(queries))?
		numbers = /\d+/.exec(result[0])[0]
		final += "&skip=#{numbers}"

	return final

###*
# A MessageFolder.
#
# @class MessageFolder
# @private
# @param _magisterObj {Magister} A Magister object this MessageFolder is child of.
# @constructor
###
class @MessageFolder
	constructor: (@_magisterObj) ->
		###*
		# @property name
		# @final
		# @type String
		###
		@name = _getset "_name"
		###*
		# @property unreadMessagesCount
		# @final
		# @type Number
		###
		@unreadMessagesCount = _getset "_unreadMessagesCount"
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = _getset "_id"
		###*
		# @property parentId
		# @final
		# @type Number
		###
		@parentId = _getset "_parentId"

	###*
	# Gets the Messages of this MessageFolder.
	#
	# @method messages
	# @async
	# @param [limit=10] {Number} The limit of the amount of Messages to fetch.
	# @param [queries=""] {String} Queries to do on the message (e.g: "unread, skip 5")
	# @param [download=true] {Boolean} Whether or not to download the users from the server.
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Message[]} An array containing the Messages.
	###
	messages: ->
		limit = _.find(arguments, (a) -> _.isNumber a) ? 10
		queries = _.find(arguments, (a) -> _.isString a) ? ""
		download = _.find(arguments, (a) -> _.isBoolean a) ? yes

		callback = _.find(arguments, (a) -> _.isFunction a)
		throw new Error("Callback is null") unless callback?

		if limit is 0
			callback null, []
			return undefined

		url = "#{@_magisterObj._personUrl}/berichten?mapId=#{@id()}&top=#{limit}#{findQueries queries}"

		@_magisterObj.http.get url, {}, (error, result) =>
			if error?
				callback error, null
			else
				messages = ( Message._convertRaw(@_magisterObj, m) for m in EJSON.parse(result.content).Items )
				pushMessage = _helpers.asyncResultWaiter messages.length, (r) -> callback null, _.sortBy(r, (m) -> m.sendDate()).reverse()

				for m in messages
					do (m) =>
						url = "#{@_magisterObj._personUrl}/berichten/#{m.id()}?berichtSoort=#{m.type()}"
						@_magisterObj.http.get url, {}, (error, result) =>
							parsed = EJSON.parse(result.content)
							m._body = parsed.Inhoud
							m._attachments = (File._convertRaw(@_magisterObj, undefined, a) for a in (parsed.Bijlagen ? []))

							if download
								pushPeople = _helpers.asyncResultWaiter m.recipients().length + 1, -> pushMessage m
								
								@_magisterObj.fillPersons m.recipients(), (e, r) ->
									m._recipients = r
									pushPeople r
								@_magisterObj.fillPersons m.sender(), (e, r) ->
									m._sender = r
									pushPeople r
							else
								pushMessage m

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
					messageFolders = (MessageFolder._convertRaw(@_magisterObj, mF) for mF in EJSON.parse(result.content).Items)

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
	createMessageFolder: (name, callback = ->) ->
		folder =
			naam: name
			parentId: @id()
			persoonId: @_magisterObj._id

		@_magisterObj.http.post "#{@_magisterObj._personUrl}/berichten/mappen", folder, {}, (error, result) =>
			if error? then callback error, null
			else callback null, MessageFolder._convertRaw @_magisterObj, EJSON.parse(result.content)

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

		return obj

	@_convertRaw: (magisterObj, raw) ->
		obj = new MessageFolder magisterObj

		obj._name = raw.Naam
		obj._unreadMessagesCount = raw.OngelezenBerichten
		obj._id = raw.Id
		obj._parentId = raw.ParentId

		return obj