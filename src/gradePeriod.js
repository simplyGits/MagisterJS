import MagisterThing from './magisterThing'
import { parseDate, toString } from './util'

/**
 * @extends MagisterThing
 * @private
 */
class GradePeriod extends MagisterThing {
	/**
	 * @param {Magister} magister
	 * @param {Object} raw
	 */
	constructor(magister, raw) {
		super(magister)

		this.id = toString(raw.Id)
		this.begin = parseDate(raw.Start)
		this.end = parseDate(raw.Einde)
		this.name = raw.Naam || ''
		this.description = raw.Omschrijving || ''
	}
}

export default GradePeriod
