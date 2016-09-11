/**
 * @extends Error
 */
class MagisterError extends Error {
	/**
	 * @param {Object} raw
	 */
	constructor(raw) {
		super(raw.Message || raw.message)
	}
}

export default MagisterError
