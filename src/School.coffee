root = (module?.exports ? this.Magister ?= {})

###*
# A Magister school.
#
# @class MagisterSchool
# @param name {String} The name of the school.
# @param url {String} The URL of the school.
# @constructor
###
class root.MagisterSchool
	###*
	# @property id
	# @final
	# @type String
	###
	###*
	# @property name
	# @final
	# @type String
	###
	###*
	# @property url
	# @final
	# @type String
	###
	constructor: (@id, @name, @url) ->

	###*
	# @method versionInfo
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {Object}
	#			@param [callback.result.core] {String}
	#			@param [callback.result.api] {String}
	#			@param [callback.result.db] {String}
	#			@param [callback.result.product] {String}
	#			@param [callback.result.releasedOn] {Date}
	###
	versionInfo: (callback) ->
		new root.MagisterHttp().get "#{@url}/api/versie", {}, (e, r) ->
			if e? then callback e, null
			else
				parsed = JSON.parse r.content
				callback null,
					core: parsed.CoreVersie
					api: parsed.ApiVersie
					db: parsed.DatabaseVersie
					product: parsed.ProductVersie
					releasedOn: root._helpers.parseDate parsed.ReleaseDatum

	###*
	# Gets the schools that matches the given query.
	#
	# @method getSchools
	# @async
	# @static
	# @param query {String} The query the school should match to. Should be at least 3 chars long.
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {MagisterSchool[]} An array containing the MagisterSchools.
	###
	@getSchools: (query, callback) ->
		unless query? and query.trim().length >= 3
			callback null, []
			return

		query = query.replace(/\d/g, "").trim()

		new root.MagisterHttp().get "https://mijn.magister.net/api/schools?filter=#{query}", {}, (error, result) =>
			if error?
				callback error, null
			else
				callback null, (@_convertRaw s for s in JSON.parse result.content)

	@_convertRaw: (raw) -> new root.MagisterSchool raw.Id, raw.Name, raw.Url
