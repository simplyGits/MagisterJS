import MagisterThing from './magisterThing'

/**
 * @extends {MagisterThing}
 */
class ProfileSettings extends MagisterThing {
	/**
	 * @private
	 * @param {Magister} magister
	 * @param {Object} raw
	 */
	constructor(magister, raw) {
		super(magister)

		/**
		 * @type {Boolean}
		 */
		this.redirectMagisterMessages = raw.EloBerichtenDoorsturen
		/**
		 * @type {String}
		 */
		this.emailAddress = raw.EmailAdres
		/**
		 * @type {String}
		 */
		this.mobileNumber = raw.Mobiel
	}

	/**
	 * Update the server to reflect the changes made on the properties of this
	 * ProfileSettings instance.
	 * @return {Promise<Error|undefined>}
	 */
	async saveChanges() {
		await this._magister._privileges.needs('profiel', 'update')

		const url = `${this._magister._personUrl}/profiel`
		await this._magister.http.put(url, this._toMagister())
	}

	/**
	 * Change the user password,
	 * seperate function because requires verification.
	 *
	 * @param {String} changed
	 * @param {String} [original] - Not required, defaults to password set on auth
	 * @return {Promise}
	 */
	async changePassword(changed, original) {
		original = original || this._magister._options.password
		const schoolUrl = this._magister.school.url

		await this._magister._privileges.needs('wachtwoordwijzigen', 'update')
		const profile = await this._magister.http.post(`${schoolUrl}/api/sessies/huidige/valideer`, {
			'wachtwoord': original,
		}).then(res => res.json())

		if (profile.isVerified) {
			const selfUrl = profile.links.account.href
			const status = await this._magister.http.put(`${schoolUrl}/${selfUrl}/wachtwoord`, {
				'wachtwoord': changed,
				'wachtwoordControle': original,
			}).then(res => res.status)

			if (status !== 204) {
				throw new Error(`Changing password failed with status code ${status}!`)
			}
		} else {
			throw new Error('Original password incorrect')
		}
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
