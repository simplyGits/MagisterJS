import fetch from 'node-fetch'
import _ from 'lodash'

/**
 * Class to communicate with the outside world. With those delicious cookies
 * inserted for you.
 * Wraps around fetch.
 * @class Http
 * @constructor
 */
export default class Http {
	constructor() {
		this._ratelimit = {
			queue: [],
			timeoutId: undefined,
		}
		this._cookie = ''
	}

	_enqueue(request) {
		return new Promise((resolve, reject) => {
			this._ratelimit.queue.push({
				...request,
				resolve,
				reject,
			})
		})
	}
	_setRatelimitTime(timeLeft) {
		const info = this._ratelimit
		if (info.timeoutId !== undefined) {
			return
		}

		info.timeoutId = setInterval(() => {
			this._ratelimit.queue.forEach(function (info) {
				fetch(info.request).then(info.resolve, info.reject)
			})
		}, timeLeft*1000 + 10)
	}

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

		return promise.catch((err) => {
			// Handle rate limit error.
			console.log(err)
			if (err.error.SecondsLeft !== undefined) {
				const secondsLeft = parseInt(err.error.SecondsLeft, 10)

				this._setRatelimitTime(secondsLeft)
				return this._enqueue(request)
			}

			throw err
		})
	}

	/**
	 * Gets the content at `url`
	 * @method get
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
	 * @method post
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
	 * Deletes the content at `url`
	 * @method delete
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
