import MagisterThing from './magisterThing'

/**
 * @class ProfileSettings
 * @extends MagisterThing
 * @constructor
 * @private
 * @param {Magister} magister
 * @param {Object} raw
 */
export default class ProfileSettings extends MagisterThing {
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
