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

	/**
	 * @override
	 * @return {String}
	 */
	toString() {
		return 'AuthError: ' + this.message
	}
}

export default AuthError
