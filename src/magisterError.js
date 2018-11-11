/**
 * @extends {Error}
 */
class MagisterError extends Error {
	/**
	 * @private
	 * @param {Object} raw
	 */
	constructor(raw) {
		super(raw.Message || raw.message)
	}

	/**
	 * @override
	 * @return {String}
	 */
	toString() {
		return 'MagisterError: ' + this.message
	}
}

export default MagisterError
