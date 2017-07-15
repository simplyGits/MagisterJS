import fetch from 'node-fetch'
import MagisterError from './magisterError'

const DEFAULT_REQUEST_TIMEOUT = 1000 * 30 // 30 seconds

/**
 * Class to communicate with the outside world. With those delicious cookies
 * inserted for you.
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
		 * @type Object
		 * @private
		 * @readonly
		 */
		this._ratelimit = {
			queue: [],
			timeoutId: undefined,
		}
		/**
		 * @type String
		 * @private
		 */
		this._cookie = ''
		/**
		 * @type Number
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
				cookie: this._cookie,
				'X-API-Client-ID': '12D8',
			},
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
	_request(obj) {
		const request = this.makeRequest(obj)

		let promise
		const info = this._ratelimit

		if (info.timeoutId === undefined) {
			promise = fetch(request)
		} else {
			promise = this._enqueue(request)
		}

		return promise
		.then(res => res.ok ? res : res.json())
		.then(res => {
			if (res instanceof fetch.Response) {
				return res
			}

			if ('SecondsLeft' in res) {
				// Handle rate limit errors
				this._setRatelimitTime(Number.parseInt(res.SecondsLeft, 10))
				return this._request(obj)
			} else {
				// Other errors we could parse
				throw new MagisterError(res)
			}
		})
	}

	/**
	 * Gets the content at `url`
	 * @param {String} url
	 * @return {Promise<Response>}
	 */
	get(url) {
		return this._request({
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
