class AuthError extends Error {
	/**
	 * @private
	 * @param {string} message
	 */
	constructor(message) {
		super(message)

		/**
		 * @type {String}
		 * @readonly
		 * @override
		 */
		this.name = 'AuthError'
	}
}

export default AuthError
