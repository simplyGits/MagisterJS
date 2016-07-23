import MagisterThing from './magisterThing'
import { parseDate } from './util'

/**
 * @class ProfileInfo
 * @constructor
 * @param {Magister} magister
 * @param {Object} raw
 */
export default class ProfileInfo extends MagisterThing {
	constructor(magister, raw) {
		super(magister)

		/**
		 * @property id
		 * @final
		 * @type String
		 */
		this.id = raw.Id.toString()
		/**
		 * @property officialFirstNames
		 * @final
		 * @type String
		 */
		this.officialFirstNames = raw.OfficieleVoornamen
		/**
		 * @property initials
		 * @final
		 * @type String
		 */
		this.initials = raw.Voorletters
		/**
		 * @property namePrefix
		 * @final
		 * @type String
		 */
		this.namePrefix = raw.Tussenvoegsel
		/**
		 * @property officialSurname
		 * @final
		 * @type String
		 */
		this.officialSurname = raw.OfficieleAchternaam
		/**
		 * @property birthSurname
		 * @final
		 * @type String
		 */
		this.birthSurname = raw.GeboorteAchternaam
		/**
		 * @property birthNamePrefix
		 * @final
		 * @type String
		 */
		this.birthNamePrefix = raw.GeboortenaamTussenvoegsel
		/**
		 * @property useBirthname
		 * @final
		 * @type Boolean
		 */
		this.useBirthname = raw.GebruikGeboortenaam
		/**
		 * @property firstName
		 * @final
		 * @type String
		 */
		this.firstName = raw.Roepnaam
		/**
		 * @property lastName
		 * @final
		 * @type String
		 */
		this.lastName = raw.Achternaam
		/**
		 * @property birthDate
		 * @final
		 * @type Date
		 */
		this.birthDate = parseDate(raw.Geboortedatum)

		/**
		 * @property isChild
		 * @final
		 * @type Boolean
		 */
		this.isChild = raw.ZichtbaarVoorOuder != null
		/**
		 * @property isVisibleForParent
		 * @final
		 * @type Boolean|undefined
		 */
		this.isVisibleForParent = raw.ZichtbaarVoorOuder

		/**
		 * @property fullName
		 * @final
		 * @type String
		 */
		this.fullName = this.useBirthname ?
			`${this.officialFirstNames} ${this.birthSurname}` :
			`${this.firstName} ${this.lastName}`
	}

	/**
	 * Get the URL for the profile picture of the current user with the given
	 * options.
	 *
	 * @method getProfilePictureUrl
	 * @param {Number} [width=640] The width of the picture.
	 * @param {Number} [height=640] The height of the picture.
	 * @param {Boolean} [crop=false] Whether or not to crop the image.
	 * @return {String} The URL to the picture, including the given options.
	 */
	getProfilePictureUrl(width = 640, height = 640, crop = false) {
		return `${this._magister._personUrl}/foto?width=${width}&height=${height}&crop=${crop}`
	}

	/**
	 * @method address
	 * @return {Promise<Error|AddressInfo>}
	 */
	address() {
		const url = `${this._magister._personUrl}/adresprofiel`
		return this._magister._privileges.needs('profiel', 'read')
		.then(() => this._magister.http.get(url))
		.then(res => res.json())
		.then(raw => new AddressInfo(this._magister, raw))
	}

	/**
	 * @method settings
	 * @return {Promise<Error|ProfileSettings>}
	 */
	settings() {
		const url = `${this._magister._personUrl}/profiel`
		return this._magister._privileges.needs('profiel', 'read')
		.then(() => this._magister.http.get(url))
		.then(res => res.json())
		.then(raw => new ProfileSettings(this._magister, raw))
	}
}
