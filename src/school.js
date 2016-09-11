'use strict'

import fetch from 'node-fetch'
import * as util from './util'

/**
 * @private
 */
class School {
	/**
	 * @param {String} id
	 * @param {String} name
	 * @param {String} url
	 */
	constructor(raw) {
		this.id = raw.Id
		this.name = raw.Name
		this.url = raw.Url
	}

	versionInfo() {
		const url = `${this.url}/api/versie`
		return fetch(url)
		.then(res => res.json())
		.then(obj => ({
			core: obj.CoreVersie,
			api: obj.ApiVersie,
			db: obj.DatabaseVersie,
			product: obj.ProductVersie,
			releasedOn: util.parseDate(obj.ReleaseDatum),
		}))
	}
}

export default School
