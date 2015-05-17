root = (module?.exports ? this.Magister ?= {})
request = require "request"

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
	# ========================
	#  NODE.JS IMPLEMENTATION
	# ========================
	###
	get: (url, options = {}, callback) ->
		request { url, method: "GET", headers: @_cookieInserter(options.headers) }, (error, response, content) ->
			callback error, { content, headers: response.headers }

	delete: (url, options = {}, callback) ->
		request { url, method: "DELETE", headers: @_cookieInserter(options.headers) }, (error, response, content) ->
			callback error, { content, headers: response.headers }

	post: (url, data, options = {}, callback) ->
		request { url, method: "POST", headers: @_cookieInserter(options.headers), json: data }, (error, response, content) ->
			callback error, { content: JSON.stringify(content), headers: response.headers }

	put: (url, data, options = {}, callback) ->
		request { url, method: "PUT", headers: @_cookieInserter(options.headers), json: data }, (error, response, content) ->
			callback error, { content: JSON.stringify(content), headers: response.headers }

	_cookie: ""
	_cookieInserter: (original) -> return if @_cookie isnt "" then _.extend (original ? {}), { cookie: @_cookie } else original
