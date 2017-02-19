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

		this.id = raw.Id
		this.type = raw.MateriaalType
		this.name = raw.Titel
		this.publisher = raw.Uitgeverij
		this.state = raw.Status
		this.begin = parseDate(raw.Start)
		this.end = parseDate(raw.Eind)
		this.EAN = raw.EAN
		this.url = (function () {
			const link = raw.Links.find(l => l.Rel === 'content')
			return link == null ? undefined : link.Href
		})()
		this.class = new Class(magister, raw.Vak)
	}
}

export default SchoolUtility
