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

		this.redirectMagisterMessages = raw.EloBerichtenDoorsturen
		this.emailAddress = raw.EmailAdres
		this.mobileNumber = raw.Mobiel
	}

	/**
	 * @method saveChanges
	 * @return {Promise<Error|undefined>}
	 */
	saveChanges() {
		const url = `${this._magister._personUrl}/profiel`

		return this._magister._privileges.needs('profiel', 'update')
		.then(() => this._magister.http.put(url, this._toMagister()))
	}
}

export default ProfileSettings
