import MagisterThing from './magisterThing'
import Person from './person'
import { parseDate, toString } from './util'

/**
 * @extends MagisterThing
 * @private
 */
class Class extends MagisterThing {
	/**
	 * @param {Magister} magister
	 * @param {Object} raw
	 */
	constructor(magister, raw) {
		super(magister)

		/**
		 * @type String
		 * @readonly
		 */
		this.id = toString(raw.id || raw.Id)
		/**
		 * @type Date
		 * @readonly
		 */
		this.beginDate = parseDate(raw.begindatum)
		/**
		 * @type Date
		 * @readonly
		 */
		this.endDate = parseDate(raw.einddatum)
		/**
		 * @type String
		 * @readonly
		 */
		this.abbreviation = raw.afkorting || raw.Afkorting
		/**
		 * @type String
		 * @readonly
		 */
		this.description = raw.omschrijving || raw.Omschrijving
		/**
		 * @type Number
		 * @readonly
		 */
		this.number = raw.volgnr || raw.Volgnr
		/**
		 * @type Person
		 * @readonly
		 */
		this.teacher = new Person(magister, { Docentcode: raw.docent })
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.hasClassExemption = raw.VakDispensatie || raw.VakVrijstelling
	}
}

export default Class
