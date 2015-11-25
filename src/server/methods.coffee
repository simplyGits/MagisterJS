request = Npm.require "request"
future = Npm.require "fibers/future"

Meteor.methods
	###*
	# Do a HTTP request.
	# @method magisterjs-http
	# @param method {String} The HTTP method to use.
	# @param url {String} The URL to send the HTTP request to.
	# @param options {Object} A request settings object.
	# @return {Object} { content: String, headers: Object }
	###
	"magisterjs-http": (method, url, options = {}) ->
		@unblock()
		check method, String
		check url, String
		check options, Object

		headers = options.headers ? {}
		fut = new future()

		opt = _.extend options, {
			method
			url
			headers
			jar: no
			body: options.data ? options.content
			json: options.data?
			encoding: if _.isUndefined(options.encoding) then "utf8" else options.encoding
		}

		request opt, (error, response, content) ->
			if error? then fut.throw error
			else fut.return { content, headers: response?.headers, statusCode: response?.statusCode }

		fut.wait()
