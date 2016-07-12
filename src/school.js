'use strict'

/**
 * @class School
 * @constructor
 * @private
 * @param {String} id
 * @param {String} name
 * @param {String} url
 */
export default class School {
	constructor(raw) {
		this.id = raw.Id
		this.name = raw.Name
		this.url = raw.Url
	}
}
