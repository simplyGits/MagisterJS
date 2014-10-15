###*
# A utility class containing various helper methods.
#
# @static
# @private
# @class _helpers
###
class @_helpers
	###*
	# Adds a zero in front of the original number if it doesn't yet.
	#
	# @method addZero
	# @param original {Number} The number to add a zero in front to.
	# @return {String} The number as string with a zero in front of it.
	###
	@addZero: (original) -> return if original < 10 then "0#{original}" else original.toString()

	@toUtcString: (original) -> return new moment(original).format("YYYY-MM-DDTHH:mm:ss.0000000[Z]")
	
	@pushMore = (arr, items) -> [].push.apply arr, items; return arr

	###*
	# Checks if the given original string contains the given query string.
	#
	# @method contains
	# @param original {String} The original string to search in.
	# @param query {String} The string to search for.
	# @param ignoreCasing {Boolean} Whether to ignore the casing of the search.
	# @return {Boolean} Whether the original string contains the query string.
	###
	@contains: (original, query, ignoreCasing = false) ->
		return if ignoreCasing then original.toUpperCase().indexOf(query.toUpperCase()) >= 0 else original.indexOf(query) >= 0

	###*
	# Returns a function which requires a result, when all results are pushed the callback is called with the result.
	#
	# @method asyncResultWaiter
	# @param amount {Number} The amount of results needed before the callback is called.
	# @param callback {Function} The callback which will be called when all the results are pushed.
	# @return {Function} The function which should be called with the reuslts.
	###
	@asyncResultWaiter: (amount, callback) ->
		callback [] if amount is 0
		results = []
		left = amount
		return (result) ->
			if _.isArray result
				_helpers.pushMore results, result
				left -= result.length
			else
				results.push result
				left--
			callback(results) if left is 0

	@trim: (original) ->
		return "" unless original? and original.length isnt 0
		return if _.isFunction(String::trim) then original.trim() else original.replace /^\s+|\s+$/g, ""

	@saveFile: (rawData, mime, name) -> try saveAs new Blob([rawData], type: mime), name

	@urlDateConvert: (date) -> "#{date.getUTCFullYear()}-#{_helpers.addZero(date.getMonth() + 1)}-#{_helpers.addZero(date.getDate())}"

	@date: (date) -> new Date date.getUTCFullYear(), date.getMonth(), date.getDate()

@_getset = (varName, setter, getter) ->
	return (newVar) ->
		if newVar?
			if _.isFunction(setter) then setter(newVar, yes)
			else throw new Error "Changes on this property aren't allowed"
		return if _.isFunction(getter) then getter(@[varName], no) else @[varName]

unless Array.isArray? # isArray polyfill
	_.isArray = jQuery.isArray = Array.isArray = (x) -> Object.prototype.toString.call x is "[object Array]"

###
@_getset = (varName, setter, getter) ->
	return (newVar) ->
		if newVar?
			if _.isFunction(setter) then setter(newVar, _.toArray(arguments)[1..], yes)
			else throw new Error "Changes on this property aren't allowed"
		return if _.isFunction(getter) then getter(@[varName], _.toArray(arguments)[1..], no) else @[varName]
###