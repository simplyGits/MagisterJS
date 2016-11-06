import fetch from 'node-fetch'
import MagisterError from './magisterError'

/**
 * Class to communicate with the outside world. With those delicious cookies
 * inserted for you.
 * Wraps around fetch.
 * @private
 */
class Http {
	constructor() {
		this._ratelimit = {
			queue: [],
			timeoutId: undefined,
		}
		this._cookie = ''
	}

	/**
	 * @private
	 * @param {Object} request
	 */
	_enqueue(request) {
		return new Promise((resolve, reject) => {
			this._ratelimit.queue.push({
				...request,
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
			for (const info of info.queue) {
				fetch(info.request).then(info.resolve, info.reject)
			}

			info.queue = []
			info.timeoutId = undefined
		}, timeLeft*1000 + 10)
	}

	/**
	 * @private
	 * @param {Object} obj
	 */
	_request(obj) {
		const init = {
			method: obj.method,
			headers: {
				...obj.headers,
				cookie: this._cookie,
			},
		}

		if (obj.data != null) {
			init.body = JSON.stringify(obj.data)
			init.headers['Content-Type'] = 'application/json;charset=UTF-8'
		}

		const request = new fetch.Request(obj.url, init)

		let promise
		const info = this._ratelimit

		console.log('request:', request, 'cookie:', request.headers.get('cookie'))
		if (info.timeoutId === undefined) {
			promise = fetch(request)
		} else {
			promise = this._enqueue(request)
		}

		let res
		return promise
		.then(r => {
			// clone to object to pass through to the caller, since we can't
			// reuse an Response object
			res = r.clone()

			return r.text()
		})
		.then(text => {
			if (res.ok) {
				return res
			}

			// try to get an useful error out of the response
			let err
			try {
				const parsed = JSON.parse(text)

				if ('SecondsLeft' in parsed) {
					// Handle rate limit errors
					this._setRatelimitTime(Number.parseInt(parsed.SecondsLeft, 10))
					return this._enqueue(request)
				} else {
					// Other errors we could parse
					err = new MagisterError(parsed)
				}

			} catch (e) {
				// Some unparseable error
				err = res
			}

			throw err
		})
	}

	/**
	 * Gets the content at `url`
	 * @param {String} url
	 * @return {Promise<Response>} A promise that resolves to the content of `url`.
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
