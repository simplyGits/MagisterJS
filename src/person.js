import _ from 'lodash'
import MagisterThing from './magisterThing'

/**
 * @extends MagisterThing
 * @private
 */
class Person extends MagisterThing {
	/**
	 * @param {Magister} magister
	 * @param {Object} raw
	 * @param {Number} type
	 */
	constructor(magister, raw, type) {
		super(magister)

		/**
		 * @type Boolean
		 * @private
		 * @default false
		 */
		this._filled = false

		/**
		 * @type String
		 * @readonly
		 */
		this.id = raw.Id
		/**
		 * @type Number
		 * @private
		 * @readonly
		 */
		this._type = type || raw.Type // REVIEW: do we want this to be a String?
		/**
		 * @type String
		 * @readonly
		 */
		this.firstName = raw.Voornaam
		/**
		 * @type String
		 * @readonly
		 */
		this.lastName = raw.Achternaam
		/**
		 * @type String
		 * @readonly
		 */
		this.namePrefix = raw.Tussenvoegsel
		/**
		 * @type String
		 * @readonly
		 */
		this.fullName = raw.Naam
		/**
		 * @type String
		 * @readonly
		 */
		this.description = raw.Omschrijving || raw.Naam || raw.naam
		/**
		 * @type String
		 * @readonly
		 */
		this.group = raw.Groep
		/**
		 * @type String
		 * @readonly
		 */
		this.teacherCode = raw.Docentcode
		/**
		 * @type String
		 * @readonly
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

	/**
	 * @param {String} [type]
	 * @return {Promise<User>}
	 */
	getFilled(type) {
		if (this._filled) {
			return Promise.resolve(this)
		}

		return this._magister.persons(this.fullName, type)
		.then(persons => persons[0] || this)
	}

	/**
	 * @override
	 * @return {Object}
	 */
	toJSON() {
		const obj = _.omit(this, [ '_magister' ])
		obj.type = this.type()
		delete obj._type
		return obj
	}
}

export default Person
