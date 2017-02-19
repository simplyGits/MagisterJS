'use strict'

import fetch from 'node-fetch'
import VersionInfo from './versionInfo'

/**
 * @typedef {Object} VersionInfo
 * @property {String} core
 * @property {String} api
 * @property {String} db
 * @property {String} product
 * @property {Date} releasedOn
 */

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

	/**
	 * @return {Promise<VersionInfo>}
	 */
	versionInfo() {
		return fetch(`${this.url}/api/versie`)
		.then(res => res.json())
		.then(obj => new VersionInfo(obj))
	}
}

export default School
