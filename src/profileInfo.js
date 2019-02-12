import _ from 'lodash'
import MagisterThing from './magisterThing'
import AddressInfo from './addressInfo'
import ProfileSettings from './profileSettings'
import { parseDate, toString } from './util'

class ProfileInfo extends MagisterThing {
	/**
	 * @private
	 * @param {Magister} magister
	 * @param {Object} raw
	 * @param {boolean} [isParent=false]
	 */
	constructor(magister, raw, isParent = false) {
		super(magister)

		/**
		 * @readonly
		 * @type {String}
		 */
		this.id = toString(raw.Id)
		/**
		 * @readonly
		 * @type {String}
		 */
		this.officialFirstNames = raw.OfficieleVoornamen
		/**
		 * @readonly
		 * @type {String}
		 */
		this.initials = raw.Voorletters
		/**
		 * @readonly
		 * @type {String}
		 */
		this.namePrefix = raw.Tussenvoegsel
		/**
		 * @readonly
		 * @type {String}
		 */
		this.officialSurname = raw.OfficieleAchternaam
		/**
		 * @readonly
		 * @type {String}
		 */
		this.birthSurname = raw.GeboorteAchternaam
		/**
		 * @readonly
		 * @type {String}
		 */
		this.birthNamePrefix = raw.GeboortenaamTussenvoegsel
		/**
		 * @readonly
		 * @type {Boolean}
		 */
		this.useBirthname = raw.GebruikGeboortenaam
		/**
		 * @readonly
		 * @type {String}
		 */
		this.firstName = raw.Roepnaam
		/**
		 * @readonly
		 * @type {String}
		 */
		this.lastName = raw.Achternaam
		/**
		 * @readonly
		 * @type {Date}
		 */
		this.birthDate = parseDate(raw.Geboortedatum)

		/**
		 * @readonly
		 * @type {Boolean}
		 */
		this.isParent = isParent
	}

	/**
	 * @param {boolean} [useBirthname=this.useBirthname]
	 * @returns {string}
	 */
	getFullName(useBirthname = this.useBirthname) {
		return _(
			useBirthname ?
				[ this.officialFirstNames, this.birthNamePrefix, this.birthSurname ] :
				[ this.firstName, this.namePrefix, this.lastName ]
		).compact().join(' ')
	}

	/**
	 * Opens a stream to the profile picture of the current user with the given
	 * options.
	 *
	 * @param {number} [width=640] The width of the picture.
	 * @param {number} [height=640] The height of the picture.
	 * @param {boolean} [crop=false] Whether or not to crop the image.
	 * @returns {Promise<Stream>}
	 */
	getProfilePicture(width = 640, height = 640, crop = false) {
		const url = `${this._magister._personUrl}/foto?width=${width}&height=${height}&crop=${crop}`
		return this._magister.http.get(url).then(res => res.body)
	}

	/**
	 * @returns {Promise<Error|AddressInfo>}
	 */
	address() {
		const url = `${this._magister._personUrl}/adresprofiel`

		return this._magister._privileges.needs('profiel', 'read')
		.then(() => this._magister.http.get(url))
		.then(res => res.json())
		.then(raw => new AddressInfo(this._magister, raw))
	}

	/**
	 * @returns {Promise<Error|ProfileSettings>}
	 */
	settings() {
		const url = `${this._magister._personUrl}/profiel`

		return this._magister._privileges.needs('profiel', 'read')
		.then(() => this._magister.http.get(url))
		.then(res => res.json())
		.then(raw => new ProfileSettings(this._magister, raw))
	}

	/**
	 * @returns {boolean}
	 */
	async isVisibleForParent() {
		if (this.isParent) {
			return false
		}

		const resp = await this._magister.http.get(`${this._magister._pupilUrl}/autorisatie`)
		const json = await resp.json()
		return json.oudersMogenGegevensZien
	}
}

export default ProfileInfo
