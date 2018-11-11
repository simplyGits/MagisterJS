import { parseDate } from './util'

class VersionInfo {
	/**
	 * @private
	 * @param {Object} raw
	 */
	constructor(raw) {
		/**
		 * @type {String}
		 * @readonly
		 */
		this.core = raw.CoreVersie
		/**
		 * @type {String}
		 * @readonly
		 */
		this.api = raw.ApiVersie
		/**
		 * @type {String}
		 * @readonly
		 */
		this.db = raw.DatabaseVersie
		/**
		 * @type {String}
		 * @readonly
		 */
		this.product = raw.ProductVersie
		/**
		 * @type {Date}
		 * @readonly
		 */
		this.releasedOn = parseDate(raw.ReleaseDatum)
	}
}

export default VersionInfo
