###*
# A folder containing File instances.
#
# @class FileFolder
# @private
# @param _magisterObj {Magister} A Magister object this FileFolder is child of.
# @constructor
###
class @FileFolder
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
		# The rights the current user has on this FileFolder.
		# @property rights
		# @final
		# @type Number
		###
		@rights = _getset "_rights"
		###*
		# The ID of the parent FileFolder of this FileFolder.
		# @property parentId
		# @final
		# @type Number
		###
		@parentId = _getset "_parentId"

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
				files = (File._convertRaw @_magisterObj, @, f for f in EJSON.parse(result.content).Items)
				pushResult = _helpers.asyncResultWaiter files.length, (r) -> callback null, files

				for f in files
					do (f) => @_magisterObj.getPersons f.GeplaatstDoor, (e, r) ->
						unless e? or r.length is 0 then f._addedBy = r[0]
						pushResult()

	@_convertRaw: (magisterObj, raw) ->
		obj = new FileFolder magisterObj

		obj._id = raw.Id
		obj._name = raw.Naam
		obj._rights = raw.Privilege
		obj._parentId = raw.ParentId

		return obj

###*
# A file from Magister, can be downloaded.
#
# @class File
# @private
# @param _magisterObj {Magister} A Magister object this File is child of.
# @constructor
###
class @File
	constructor: (@_magisterObj) ->
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = _getset "_id"
		###*
		# @property type
		# @final
		# @type Number
		###
		@type = _getset "_type"
		###*
		# @property name
		# @type String
		###
		@name = _getset "_name", (x) => @_name = x; @_update()
		###*
		# @property uri
		# @final
		# @type String
		###
		@uri = _getset "_uri"
		###*
		# The size of this file in bytes.
		# @property size
		# @final
		# @type Number
		###
		@size = _getset "_size"
		###*
		# The rights the current user has on this File.
		# @property rights
		# @final
		# @type Number
		###
		@rights = _getset "_rights"
		###*
		# @property mime
		# @final
		# @type String
		###
		@mime = _getset "_mime"
		###*
		# @property changedDate
		# @final
		# @type Date
		###
		@changedDate = _getset "_changedDate"
		###*
		# @property creationDate
		# @final
		# @type Date
		###
		@creationDate = _getset "_creationDate"
		###*
		# @property addedBy
		# @final
		# @type Person
		###
		@addedBy = _getset "_addedBy"
		###*
		# @property fileBlobId
		# @final
		# @type Number
		###
		@fileBlobId = _getset "_fileBlobId"
		###*
		# The FileFolder this File is in.
		# @property fileFolder
		# @type FileFolder
		###
		@fileFolder = _getset "_fileFolder", @move
		###*
		# @property uniqueId
		# @final
		# @type String
		###
		@uniqueId = _getset "_uniqueId"

	###*
	# Downloads the current file
	#
	# @method download
	# @async
	# @param [downloadFile=true] {Boolean} Whether or not to download the file directly. Only works client-side.
	# @param [callback] {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {String} A string containing the binary data of the downloaded file.
	###
	download: ->
		callback = _.find arguments, (a) -> _.isFunction a
		downloadFile = _.find(arguments, (a) -> _.isBoolean a) ? yes

		@_magisterObj.http.get @_downloadUrl, {}, (error, result) =>
			if error? then callback error, null
			else
				data = result.content
				if downloadFile then _helpers.saveFile data, @mime(), @name()
				callback? null, data

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
				fileFolder = _.find r, (f) -> _helpers.contains(f.name(), fileFolder, yes) or f.id() is fileFolder

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

		obj.Id = @_id
		obj.BronSoort = @_type
		obj.Naam = @_name
		obj.Uri = @_uri
		obj.Grootte = @_size
		obj.Privilege = @_rights
		obj.ContentType = @_mime
		obj.FileBlobId = @_fileBlobId
		obj.ParentId = @_fileFolder.id()
		obj.UniqueId = @_uniqueId

		return obj

	@_convertRaw: (magisterObj, sender, raw) ->
		if raw._addedBy? then addedBy = raw._addedBy
		else
			addedBy = new Person magisterObj, null, "", ""
			addedBy._fullName = raw.GeplaatstDoor

		obj = new File magisterObj

		obj._id = raw.Id
		obj._type = raw.BronSoort
		obj._name = raw.Naam
		obj._uri = raw.Uri
		obj._size = raw.Grootte
		obj._rights = raw.Privilege
		obj._mime = raw.ContentType
		obj._changedDate = new Date Date.parse raw.GewijzigdOp
		obj._creationDate = new Date Date.parse (raw.GemaaktOp ? raw.Datum)
		obj._addedBy = addedBy
		obj._fileBlobId = raw.FileBlobId
		obj._fileFolder = sender
		obj._uniqueId = raw.UniqueId

		l = _.find(raw.Links, Rel: "Contents")
		l ?= _.find(raw.Links, Rel: "Self")
		obj._downloadUrl = magisterObj.magisterSchool.url + l.Href

		return obj