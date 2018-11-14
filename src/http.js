import fetch from 'node-fetch'

const DEFAULT_REQUEST_TIMEOUT = 1000 * 30 // 30 seconds

/**
 * Class to communicate with the outside world.
 * Wraps around fetch.
 * @private
 */
class Http {
	/**
	 * @param {Number} [requestTimeout=DEFAULT_REQUEST_TIMEOUT] A time in ms
	 * after the start of a request when it should be timed out.
	 */
	constructor(requestTimeout = DEFAULT_REQUEST_TIMEOUT) {
		/**
		 * @type {{ queue: Object, timeoutId: ?Number }}
		 * @private
		 * @readonly
		 */
		this._ratelimit = {
			queue: [],
			timeoutId: undefined,
		}
		/**
		 * @type {String}
		 * @private
		 */
		this._token = ''
		/**
		 * @type {Number}
		 * @private
		 * @readonly
		 */
		this._requestTimeout = requestTimeout
	}

	/**
	 * @private
	 * @param {Object} request
	 */
	_enqueue(request) {
		return new Promise((resolve, reject) => {
			this._ratelimit.queue.push({
				request,
				resolve,
				reject,
			})
		})
	}
	/**
	 * @private
	 * @param {Number} timeLeft time left for the ratelimit in seconds.
	 */
	_setRatelimitTime(timeLeft) {
		const info = this._ratelimit
		if (info.timeoutId !== undefined) {
			return
		}

		info.timeoutId = setInterval(() => {
			for (const item of info.queue) {
				fetch(item.request).then(item.resolve, item.reject)
			}

			info.queue = []
			info.timeoutId = undefined
		}, timeLeft*1000 + 10)
	}

	/**
	 * @param {Object} obj
	 * @return {Request}
	 */
	makeRequest(obj) {
		const init = {
			method: obj.method,
			timeout: this._requestTimeout,
			headers: {
				...obj.headers,
				Authorization: 'Bearer ' + this._token,
				'X-API-Client-ID': '12D8',
			},
			redirect: obj.redirect,
		}

		if (obj.data != null) {
			init.body = JSON.stringify(obj.data)
			init.headers['Content-Type'] = 'application/json;charset=UTF-8'
		}

		return new fetch.Request(obj.url, init)
	}

	/**
	 * @private
	 * @param {Object} obj
	 */
	async _request(obj) {
		const request = this.makeRequest(obj)
		const info = this._ratelimit

		let res
		if (info.timeoutId === undefined) {
			res = await fetch(request)
		} else {
			res = await this._enqueue(request)
		}

		if (res.ok || res.status === 302) {
			return res
		}

		try {
			const body = await res.body()
			const parsed = JSON.parse(body)
			if ('SecondsLeft' in parsed) {
				// Handle rate limit errors
				this._setRatelimitTime(Number.parseInt(parsed.SecondsLeft, 10))
				return this._request(obj)
			}
		} catch (_) {
			return res
		}
	}

	/**
	 * Gets the content at `url`
	 * @param {String} url
	 * @param {Object} [opt]
	 * @return {Promise<Response>}
	 */
	get(url, opt) {
		return this._request({
			...opt,
			method: 'get',
			url: url,
		})
	}

	/**
	 * Posts the given `data` to `url`
	 * @param {String} url
	 * @param {Object} [data]
	 * @param {Object} [opt]
	 * @return {Promise<Response>}
	 */
	post(url, data, opt) {
		return this._request({
			...opt,
			method: 'post',
			url: url,
			data: data,
		})
	}

	/**
	 * Puts the given `data` to `url`
	 * @param {String} url
	 * @param {Object} [data]
	 * @param {Object} [opt]
	 * @return {Promise<Response>}
	 */
	put(url, data, opt) {
		return this._request({
			...opt,
			method: 'put',
			url: url,
			data: data,
		})
	}

	/**
	 * Deletes the content at `url`
	 * @param {String} url
	 * @return {Promise<Response>}
	 */
	delete(url) {
		return this._request({
			method: 'delete',
			url: url,
		})
	}
}

export default Http
