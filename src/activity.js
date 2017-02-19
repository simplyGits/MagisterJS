import MagisterThing from './magisterThing'
import ActivityElement from './activityElement'
import { cleanHtmlContent, parseDate, toString } from './util'

/**
 * @extends MagisterThing
 * @private
 */
class Activity extends MagisterThing {
	/**
	 * @param {Magister} magister
	 * @param {Object} raw
	 */
	constructor(magister, raw) {
		super(magister)

		this.id = toString(raw.Id)
		this.title = raw.Titel
		this.description = cleanHtmlContent(raw.Details)

		this.signinStart = parseDate(raw.StartInschrijfdatum)
		this.signinEnd = parseDate(raw.EindeInschrijfdatum)

		this.visibleFrom = parseDate(raw.ZichtbaarVanaf)
		this.visibleTo = parseDate(raw.ZichtbaarTotEnMet)

		this._url = `${this._magister._personUrl}/activiteiten/${this.id}`
	}

	elements() {
		const url = `${this._url}/onderdelen`
		return this._magister.http.get(url)
		.then(res => res.json())
		.then(res => res.Items.map(e => new ActivityElement(this._magister, this, e)))
	}
}

export default Activity
