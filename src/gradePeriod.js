import _ from 'lodash'
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

		/**
		 * @type String
		 * @readonly
		 */
		this.id = toString(raw.Id)
		/**
		 * @type Date
		 * @readonly
		 */
		this.begin = parseDate(raw.Start)
		/**
		 * @type Date
		 * @readonly
		 */
		this.end = parseDate(raw.Einde)
		/**
		 * @type String
		 * @readonly
		 * @default ''
		 */
		this.name = _.trim(raw.Naam)
		/**
		 * @type String
		 * @readonly
		 * @default ''
		 */
		this.description = _.trim(raw.Omschrijving)
	}
}

export default GradePeriod
