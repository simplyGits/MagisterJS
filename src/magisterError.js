class MagisterError extends Error {
	/**
	 * @private
	 * @param {Object} raw
	 */
	constructor(raw) {
		super(raw.Message || raw.message)

		/**
		 * @type {String}
		 * @readonly
		 * @override
		 */
		this.name = 'MagisterError'
	}
}

export default MagisterError
