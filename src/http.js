import fetch from 'node-fetch'

const DEFAULT_REQUEST_TIMEOUT = 1000 * 30 // 30 seconds

/**
 * Class to communicate with the outside world.
 * Wraps around fetch.
 * @private
 */
class Http {
	/**
	 * @param {number} [requestTimeout=DEFAULT_REQUEST_TIMEOUT] A time in ms
	 * after the start of a request when it should be timed out.
	 */
	constructor(requestTimeout = DEFAULT_REQUEST_TIMEOUT) {
		/**
		 * @type {AuthManager}
		 */
		this.authManager = undefined
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
	 * @param {number} timeLeft time left for the ratelimit in seconds.
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
	 * @returns {Request}
	 */
	async makeRequest(obj) {
		await this.authManager.checkExpiration()
		const accessToken = this.authManager.accessToken
		const init = {
			method: obj.method,
			timeout: this._requestTimeout,
			headers: {
				...obj.headers,
				Authorization: `Bearer ${accessToken}`,
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
		const request = await this.makeRequest(obj)
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
			const clone = await res.clone()
			const parsed = await clone.json()
			if ('SecondsLeft' in parsed) {
				// Handle rate limit errors
				this._setRatelimitTime(Number.parseInt(parsed.SecondsLeft, 10))
				return this._request(obj)
			} else if ('error' in parsed) {
				error.message = parsed.error
			}
		} catch (_) {}

		return res
	}

	/**
	 * Gets the content at `url`
	 * @param {string} url
	 * @param {Object} [opt]
	 * @returns {Promise<Response>}
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
	 * @param {string} url
	 * @param {Object} [data]
	 * @param {Object} [opt]
	 * @returns {Promise<Response>}
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
	 * @param {string} url
	 * @param {Object} [data]
	 * @param {Object} [opt]
	 * @returns {Promise<Response>}
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
	 * @param {string} url
	 * @returns {Promise<Response>}
	 */
	delete(url) {
		return this._request({
			method: 'delete',
			url: url,
		})
	}
}

export default Http