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

		return this._items.some(x => {
			return (
				x.Naam.toLowerCase() === thing &&
				x.AccessType.some(a => a.toLowerCase() === action)
			)
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
