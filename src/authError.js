class AuthError extends Error {
	/**
	 * @private
	 * @param {String} error
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
