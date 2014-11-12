###*
# A Magister school.
#
# @class MagisterSchool
# @param name {String} The name of the school.
# @param url {String} The URL of the school.
# @constructor
###
class @MagisterSchool
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
		if !query? or _helpers.trim(query).length < 3
			callback null, []
			return

		new MagisterHttp().get "https://mijn.magister.net/api/schools?filter=#{query}", {}, (error, result) =>
			if error?
				callback error, null
			else
				callback null, (@_convertRaw s for s in EJSON.parse result.content)

	@_convertRaw: (raw) -> new MagisterSchool raw.Id, raw.Name, raw.Url