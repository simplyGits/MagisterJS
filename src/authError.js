/**
 * @extends Error
 */
class AuthError extends Error {
	/**
	 * @param {String} error
	 */
	constructor(message) {
		super(message)
	}
}

export default AuthError
