'use strict'

import fetch from 'node-fetch'
import VersionInfo from './versionInfo'

class School {
	/**
	 * @private
	 * @param {Object} raw
	 */
	constructor(raw) {
		/**
		 * @type {String}
		 * @readonly
		 */
		this.id = raw.Id
		/**
		 * @type {String}
		 * @readonly
		 */
		this.name = raw.Name
		/**
		 * @type {String}
		 * @readonly
		 */
		this.url = raw.Url
	}

	/**
	 * @returns {Promise<VersionInfo>}
	 */
	versionInfo() {
		return fetch(`${this.url}/api/versie`)
		.then(res => res.json())
		.then(obj => new VersionInfo(obj))
	}
}

export default School
