root = (module?.exports ? this.Magister ?= {})

###*
# A folder containing File instances.
#
# @class FileFolder
# @private
# @param _magisterObj {Magister} A Magister object this FileFolder is child of.
# @constructor
###
class root.FileFolder
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
		# The rights the current user has on this FileFolder.
		# @property rights
		# @final
		# @type Number
		###
		@rights = root._getset "_rights"
		###*
		# The ID of the parent FileFolder of this FileFolder.
		# @property parentId
		# @final
		# @type Number
		###
		@parentId = root._getset "_parentId"

	###*
	# Gets all the files in the current FileFolder.
	#
	# @method files
	# @async
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {File[]} The results as an Array.
	###
	files: (callback) ->
		@_magisterObj.http.get "#{@_magisterObj._personUrl}/bronnen?parentId=#{@id()}", {}, (error, result) =>
			if error? then callback error, null
			else
				files = (root.File._convertRaw @_magisterObj, this, f for f in JSON.parse(result.content).Items)
				pushResult = root._helpers.asyncResultWaiter files.length, (r) -> callback null, files

				for f in files
					do (f) => @_magisterObj.getPersons f.GeplaatstDoor, (e, r) ->
						unless e? or r.length is 0 then f._addedBy = r[0]
						pushResult()

	@_convertRaw: (magisterObj, raw) ->
		obj = new root.FileFolder magisterObj

		obj._id = raw.Id
		obj._name = raw.Naam
		obj._rights = raw.Privilege
		obj._parentId = raw.ParentId

		obj

###*
# A file from Magister, can be downloaded.
#
# @class File
# @private
# @param _magisterObj {Magister} A Magister object this File is child of.
# @constructor
###
class root.File
	constructor: (@_magisterObj) ->
		###*
		# @property id
		# @final
		# @type String
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
		# @type String
		###
		@name = root._getset "_name", (x) => @_name = x; @_update()
		###*
		# @property uri
		# @final
		# @type String
		###
		@uri = root._getset "_uri"
		###*
		# The size of this file in bytes.
		# @property size
		# @final
		# @type Number
		###
		@size = root._getset "_size"
		###*
		# The rights the current user has on this File.
		# @property rights
		# @final
		# @type Number
		###
		@rights = root._getset "_rights"
		###*
		# @property mime
		# @final
		# @type String
		###
		@mime = root._getset "_mime"
		###*
		# @property changedDate
		# @final
		# @type Date|undefined
		###
		@changedDate = root._getset "_changedDate"
		###*
		# @property creationDate
		# @final
		# @type Date|undefined
		###
		@creationDate = root._getset "_creationDate"
		###*
		# @property addedBy
		# @final
		# @type Person
		###
		@addedBy = root._getset "_addedBy"
		###*
		# @property fileBlobId
		# @final
		# @type String|undefined
		###
		@fileBlobId = root._getset "_fileBlobId"
		###*
		# The FileFolder this File is in.
		# @property fileFolder
		# @type FileFolder
		###
		@fileFolder = root._getset "_fileFolder", @move
		###*
		# @property uniqueId
		# @final
		# @type String
		###
		@uniqueId = root._getset "_uniqueId"
		###*
		# @property referenceId
		# @final
		# @type String|undefined
		###
		@referenceId = root._getset "_referenceId"

	###*
	# Downloads the current file
	# Currently only accessible from the server.
	#
	# @method download
	# @async
	# @param [fileName=true] {Boolean|String} Whether or not to download the file directly. If `downloadFile` is a truely string the file will be downloaded in with the name set to the string's content.
	# @param [callback] {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {String} A string containing the base64 encoded binary data of the downloaded file.
	###
	download: ->
		fileName = _.find(arguments, (a) -> _.isString(a) or _.isBoolean(a)) ? yes
		callback = _.find arguments, (a) -> _.isFunction a

		if Meteor?.isServer
			request = Npm.require 'request'
			fs = Npm.require 'fs'
		else if module?.exports?
			request = require 'request'
			fs = require 'fs'
		else
			callback? new Error('`File.download` is only accessible from the server at the moment.\nYou can set a proxy yourself with something like iron:router serverside routes.'), null
			return undefined

		fileName = (
			if _.isBoolean(fileName) and fileName
				@name()
			else if _.isString fileName
				if /(\.{1,2}\/?)*$/.test fileName
					fileName += "/#{@name()}"
				else
					fileName
			else
				undefined
		)

		req = request(
			url: @_downloadUrl
			method: 'GET'
			headers: @_magisterObj.http._cookieInserter()
			encoding: null
		)
			.on 'error', (err) -> callback? err, null
			.on 'response', (res) -> callback? null, ''

		if fileName?
			req.pipe require('fs').createWriteStream fileName

		undefined

	###*
	# Moves the current File to another FileFolder
	#
	# @method move
	# @param fileFolder {FileFolder|Number|String} A FileFolder, an ID of a FileFolder or (a part of) the name of a FileFolder.
	###
	move: (fileFolder) ->
		@_magisterObj.fileFolders (e, r) =>
			throw e if e?
			unless _.isObject fileFolder
				fileFolder = _.find r, (f) -> root._helpers.contains(f.name(), fileFolder, yes) or f.id() is fileFolder

			@_fileFolder = fileFolder
			@_update()

	###*
	# WARNING. Removes the current File.
	#
	# @method remove
	###
	remove: -> @_magisterObj.http.delete "#{@_magisterObj._personUrl}/bronnen/#{@id()}", {}, (error, result) -> throw error if error?

	###*
	# Updates the current File on the Magister servers.
	#
	# @private
	# @method _update
	###
	_update: -> @_magisterObj.http.put "#{@_magisterObj._personUrl}/bronnen/#{@id()}", @_toMagisterStyle(), {}, (->)

	_toMagisterStyle: ->
		obj = {}

		obj.Id = parseInt @_id, 10
		obj.BronSoort = @_type
		obj.Naam = @_name
		obj.Uri = @_uri
		obj.Grootte = @_size
		obj.Privilege = @_rights
		obj.ContentType = @_mime
		obj.FileBlobId = if @_fileBlobId? then parseInt @_fileBlobId, 10
		obj.ParentId = @_fileFolder.id()
		obj.UniqueId = @_uniqueId
		obj.Referentie = if @_referenceId? then parseInt @_referenceId, 10

		obj

	@_convertRaw: (magisterObj, fileFolder, raw) ->
		if raw._addedBy? then addedBy = raw._addedBy
		else
			addedBy = new root.Person magisterObj, null, "", ""
			addedBy._fullName = raw.GeplaatstDoor

		obj = new root.File magisterObj

		obj._id = raw.Id.toString()
		obj._type = raw.BronSoort
		obj._name = raw.Naam
		obj._uri = raw.Uri
		obj._size = raw.Grootte
		obj._rights = raw.Privilege
		obj._mime = raw.ContentType or 'application/octet-stream'

		obj._changedDate = root._helpers.parseDate raw.GewijzigdOp
		obj._creationDate = root._helpers.parseDate (raw.GemaaktOp ? raw.Datum)

		obj._addedBy = addedBy
		obj._fileBlobId = raw.FileBlobId?.toString()
		obj._fileFolder = fileFolder
		obj._uniqueId = raw.UniqueId
		obj._referenceId = raw.Referentie?.toString()

		l = _.find raw.Links, Rel: 'Contents'
		l ?= _.find raw.Links, Rel: 'Self'
		if /^https?/.test l.Href
			obj._downloadUrl = l.Href
		else
			obj._downloadUrl = magisterObj.magisterSchool.url + l.Href

		obj
