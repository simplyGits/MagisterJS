import MagisterThing from './magisterThing'

/**
 * @extends MagisterThing
 * @private
 */
class ProfileSettings extends MagisterThing {
	/**
	 * @param {Magister} magister
	 * @param {Object} raw
	 */
	constructor(magister, raw) {
		super(magister)

		/**
		 * @type Boolean
		 * @readonly
		 */
		this.redirectMagisterMessages = raw.EloBerichtenDoorsturen
		/**
		 * @type String
		 * @readonly
		 */
		this.emailAddress = raw.EmailAdres
		/**
		 * @type String
		 * @readonly
		 */
		this.mobileNumber = raw.Mobiel
	}

	/**
	 * Update the server to reflect the changes made on the properties of this
	 * ProfileSettings instance.
	 * @return {Promise<Error|undefined>}
	 */
	saveChanges() {
		const url = `${this._magister._personUrl}/profiel`

		return this._magister._privileges.needs('profiel', 'update')
		.then(() => this._magister.http.put(url, this._toMagister()))
		.then(() => undefined)
	}

	/**
	 * @private
	 * @return {Object}
	 */
	_toMagister() {
		return {
			EloBerichtenDoorsturen: this.redirectMagisterMessages,
			EmailAdres: this.emailAddress,
			Mobiel: this.mobileNumber,
		}
	}
}

export default ProfileSettings
