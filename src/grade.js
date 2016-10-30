import _ from 'lodash'
import MagisterThing from './magisterThing'

/**
 * @extends MagisterThing
 * @private
 */
class Grade extends MagisterThing {
	/**
	 * @param {Magister} magister
	 * @param {Object} raw
	 */
	constructor(magister, raw) {
		super(magister)
	}

	/**
	 * @return {Promise<Grade>}
	 */
	fill() {
		if (this._filled) {
			return Promise.resolve(this)
		}

		return this._magister.http.get()
	}
}

export default Grade
