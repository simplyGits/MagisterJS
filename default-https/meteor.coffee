root = (module?.exports ? this.Magister ?= {})

wrapCallback = (cb) ->
	Meteor.bindEnvironment (e, r) ->
		if r?.statusCode >= 400 then cb r.content, null
		else cb e, r

class root.MagisterHttp
	###
	# HTTP CLASS
	# ======================
	#
	# You have to implement this with your own serverside implementation.
	# Beneath here are the requirements you have to follow.
	#
	# ======================
	#  MINIMAL REQUIREMENTS
	# ======================
	# callback: function (error, result) {...}
	# result: { content (string), headers (dictionary) }
	# options: { headers (dictionary), data (object) }
	#
	# get(url, options*, callback)
	# delete(url, options*, callback)
	# post(url, data, options*, callback)
	# put(url, data, options*, callback)
	#
	# * = optional (Fill with default value if null (object) ex.: options ?= {})
	#
	# Class holds variable _cookie which is required to be added to the headers
	#
	# =======================
	#  METEOR IMPLEMENTATION
	# =======================
	###
	get: (url, options = {}, callback) -> Meteor.call "magisterjs-http", "GET", url, @_cookieInserter(options), wrapCallback(callback)

	delete: (url, options = {}, callback) -> Meteor.call "magisterjs-http", "DELETE", url, @_cookieInserter(options), wrapCallback(callback)

	post: (url, data, options = {}, callback) -> Meteor.call "magisterjs-http", "POST", url, @_cookieInserter(_.extend({ data }, options)), wrapCallback(callback)

	put: (url, data, options = {}, callback) -> Meteor.call "magisterjs-http", "PUT", url, @_cookieInserter(_.extend({ data }, options)), wrapCallback(callback)

	_cookie: ''
	_cookieInserter: (original = {}) ->
		original.headers = _.extend (original.headers ? {}),
			cookie: @_cookie
			'X-API-Client-ID': '12D8'
		original
