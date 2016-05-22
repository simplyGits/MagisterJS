root = (module?.exports ? this.Magister ?= {})

###*
# A utility class containing various helper methods.
#
# @static
# @private
# @class _helpers
###
class root._helpers
	###*
	# Adds a zero in front of the original number if it doesn't yet.
	#
	# @method addZero
	# @param original {Number} The number to add a zero in front to.
	# @return {String} The number as string with a zero in front of it.
	###
	@addZero: (original) ->
		if original < 10
			"0#{original}"
		else
			original.toString()

	@toUtcString: (d) -> "#{_helpers.addZero d.getFullYear()}-#{_helpers.addZero d.getMonth() + 1}-#{_helpers.addZero d.getDate()}T#{_helpers.addZero d.getHours()}:#{_helpers.addZero d.getMinutes()}:#{_helpers.addZero d.getSeconds()}.0000000Z"

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
		if ignoreCasing
			original.toUpperCase().indexOf(query.toUpperCase()) >= 0
		else
			original.indexOf(query) >= 0

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
		(result) ->
			if _.isArray result
				results = results.concat result
				left -= result.length
			else
				results.push result
				left--
			callback(results) if left is 0

	###*
	# @method urlDateConvert
	# @param {Date} date
	# @return {String}
	###
	@urlDateConvert: (date) -> "#{date.getFullYear()}-#{_helpers.addZero(date.getMonth() + 1)}-#{_helpers.addZero(date.getDate())}"

	###*
	# @method date
	# @param {Date} date
	# @return {Date}
	###
	@date: (date) -> new Date date.getFullYear(), date.getMonth(), date.getDate()

	###*
	# Strips HTML tags and entities from the given `str`
	# If `str` is `undefined` or `null` an empty string will be returned.
	#
	# @method cleanHtmlContent
	# @param {String} [str]
	# @return {String}
	###
	@cleanHtmlContent: (str) ->
		if str?
			_.unescape str
				.replace /<br\s*\/?>/g, '\n'
				.replace /<\/\s*p\s*>/g, '\n'
				.replace /&nbsp;/g, ' '
				.replace /(<[^>]*>)|(&#x200b;)/g, ''
				.replace /\r?\n/g, '\n'
				.trim()
		else ''

	###*
	# @method defer
	# @param {Function} callback
	# @param {mixed} args...
	###
	@defer: (callback, args...) ->
		if Meteor?.defer?
			Meteor.defer -> callback args...
		else if setImmediate?
			setImmediate -> callback args...
		else
			_.defer callback, args...

		undefined

	###*
	# Tries to parse `val` to a date, if it fails this function will return
	# `undefined` instead of an invalid date.
	#
	# @method parseDate
	# @param {any} val
	# @return {Date|undefined}
	###
	@parseDate: (val) ->
		n = Date.parse val
		val = new Date n unless isNaN n

	@typeof: (val) ->
		if _.isNull val
			'null'
		else
			typeof val

root._getset = (varName, setter, getter) ->
	(newVar) ->
		if newVar?
			if _.isFunction(setter) then setter(newVar, yes)
			else throw new Error "Changes on this property aren't allowed"
		if _.isFunction(getter) then getter(@[varName], no) else @[varName]
