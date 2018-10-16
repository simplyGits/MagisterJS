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
		 * @type Object[]
		 */
		this._items = raw
	}

	/**
	 * @method can
	 * @param {String} thing
	 * @param {String} action
	 * @return {Boolean}
	 */
	can(thing, action) {
		thing = thing.toLowerCase()
		action = action.toLowerCase()

		const item = this._items.find(item => {
			return item.Naam.toLowerCase() === thing
		})

		if (!item) { 
			return false 
		}
		
		return item.AccessType.some(item => {
			return item.toLowerCase() === action
		})
	}

	/**
	 * @method needs
	 * @param {String} thing
	 * @param {String} action
	 * @return {Promise<[Error]>}
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
