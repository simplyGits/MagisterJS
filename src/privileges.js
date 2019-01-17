/**
 * @private
 */
class Privileges {
	/**
	 * @param {Magister} magister
	 * @param {Object} raw
	 */
	constructor(magister, raw) {
		/**
		 * @property _items
		 * @private
		 * @final
		 * @type {{ Naam: String, AccessType: String[] }[]}
		 */
		this._items = raw
	}

	/**
	 * @param {string} thing
	 * @param {string} action
	 * @returns {boolean}
	 */
	can(thing, action) {
		thing = thing.toLowerCase()
		action = action.toLowerCase()

		return this._items.some(x =>
			x.Naam.toLowerCase() === thing &&
			x.AccessType.some(a => a.toLowerCase() === action)
		)
	}

	/**
	 * @param {string} thing
	 * @param {string} action
	 * @returns {Promise}
	 */
	needs(thing, action) {
		if (this.can(thing, action)) {
			return Promise.resolve()
		} else {
			return Promise.reject(new Error(`Account is not privileged to '${action}' '${thing}'`))
		}
	}
}

export default Privileges
