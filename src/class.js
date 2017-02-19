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

		// TODO: doccomments

		this.id = toString(raw.id || raw.Id)
		this.beginDate = parseDate(raw.begindatum)
		this.endDate = parseDate(raw.einddatum)
		this.abbreviation = raw.afkorting || raw.Afkorting
		this.description = raw.omschrijving || raw.Omschrijving
		this.number = raw.volgnr || raw.Volgnr
		this.teacher = new Person(magister, { Docentcode: raw.docent })
		this.classExemption = raw.VakDispensatie || raw.VakVrijstelling
	}
}

export default Class
