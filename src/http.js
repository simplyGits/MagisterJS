import fetch from 'node-fetch'
import _ from 'lodash'
import MagisterError from './magisterError'

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
			for (const info of this._ratelimit.queue) {
				fetch(info.request).then(info.resolve, info.reject)
			}

			info.queue = []
			info.timeoutId = undefined
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
				err = new MagisterError(JSON.parse(text))
			} catch (e) {
				err = res
			}

			throw err
		})
		.catch(err => {
			// Handle rate limit errors
			if ('SecondsLeft' in err) {
				const secondsLeft = Number.parseInt(err.SecondsLeft, 10)

				this._setRatelimitTime(secondsLeft)
				return this._enqueue(request)
			}

			// Error wasn't a ratelimit, pass it through
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
