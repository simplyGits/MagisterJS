import MagisterThing from './magisterThing'
import Class from './class'
import { parseDate } from './util'

/**
 * @extends MagisterThing
 * @private
 */
class SchoolUtility extends MagisterThing {
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
		 * @type Number
		 * @readonly
		 */
		this.type = raw.MateriaalType // REVIEW: do we want a string getter for this?
		/**
		 * @type String
		 * @readonly
		 */
		this.name = raw.Titel
		/**
		 * @type String
		 * @readonly
		 */
		this.publisher = raw.Uitgeverij
		/**
		 * @type Number
		 * @readonly
		 */
		this.state = raw.Status
		/**
		 * @type Date
		 * @readonly
		 */
		this.begin = parseDate(raw.Start)
		/**
		 * @type Date
		 * @readonly
		 */
		this.end = parseDate(raw.Eind)
		/**
		 * @type String
		 * @readonly
		 */
		this.EAN = raw.EAN
		/**
		 * @type String
		 * @readonly
		 */
		this.url = (function () {
			const link = raw.Links.find(l => l.Rel === 'content')
			return link == null ? undefined : link.Href
		})()
		/**
		 * @type Class
		 * @readonly
		 */
		this.class = new Class(magister, raw.Vak)
	}
}

export default SchoolUtility
