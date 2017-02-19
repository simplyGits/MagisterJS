import _ from 'lodash'
import MagisterThing from './magisterThing'
import { toString } from './util'

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
		if (raw == null) {
			return
		}

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
		this.id = toString(raw.Id)
		/**
		 * @type Number
		 * @private
		 * @readonly
		 */
		this._type = type || raw.Type
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
		if (!Number.isInteger(val)) {
			val = ({
				'group': 1,
				'study': 2,
				'person': 3,
				'location': 6,
				'project': 8,
			})[val]
		}

		if (![ 1, 2, 3, 6, 8 ].includes(val)) {
			throw new Error(`${val} is an invalid type value`)
		}

		this._type = val
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
		const obj = _.omit(super.toJSON(), '_filled')
		delete obj._type
		return obj
	}

	/**
	 * @private
	 * @return {Object}
	 */
	_toMagister() {
		const obj = {}

		obj.Id = this.id
		obj.Type = this._type
		obj.Voornaam = this.firstName
		obj.Achternaam = this.lastName
		obj.Tussenvoegsel = this.namePrefix
		obj.Naam = this.fullName
		obj.Omschrijving = this.description
		obj.Groep = this.group
		obj.Docentcode = this.teacherCode
		obj.Emailadres = this.emailAddress

		return obj
	}
}

export default Person
