import MagisterThing from './magisterThing'

/**
 * @class Person
 * @extends MagisterThing
 * @constructor
 * @private
 * @param {Magister} magister
 * @param {Object} raw
 * @param {Number} type
 */
export default class Person extends MagisterThing {
	constructor(magister, raw, type) {
		super(magister)

		/**
		 * @property id
		 * @type String
		 * @final
		 */
		this.id = raw.Id
		/**
		 * @property type
		 * @type Number
		 * @private
		 * @final
		 */
		this._type = type || raw.Type // REVIEW: do we want this to be a String?
		/**
		 * @property firstName
		 * @type String
		 * @final
		 */
		this.firstName = raw.Voornaam
		/**
		 * @property lastName
		 * @type String
		 * @final
		 */
		this.lastName = raw.Achternaam
		/**
		 * @property namePrefix
		 * @type String
		 * @final
		 */
		this.namePrefix = raw.Tussenvoegsel
		/**
		 * @property fullName
		 * @type String
		 * @final
		 */
		this.fullName = raw.Naam
		/**
		 * @property description
		 * @type String
		 * @final
		 */
		this.description = raw.Omschrijving || raw.Naam || raw.naam
		/**
		 * @property group
		 * @type String
		 * @final
		 */
		this.group = raw.Groep
		/**
		 * @property teacherCode
		 * @type String
		 * @final
		 */
		this.teacherCode = raw.Docentcode
		/**
		 * @property emailAddress
		 * @type String
		 * @final
		 */
		this.emailAddress = raw.Emailadres
	}

	get type() {
		switch (this._type) {
		case 1: return 'group'
		case 2: return 'study'
		case 3: return 'person'
		case 6: return 'location'
		case 8: return 'project'

		default: return 'unknown'
		}
	}

	set type(val) {
		if ([ 1, 2, 3, 6, 8 ].includes(val)) {
			this._type = val
		} else {
			this.type = ({
				'group': 1,
				'study': 2,
				'person': 3,
				'location': 6,
				'project': 8,
			})[val]
		}
	}
}
