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

}
