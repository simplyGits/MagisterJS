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

		/**
		 * @type String
		 * @readonly
		 */
		this.id = toString(raw.Id)
		/**
		 * @type String
		 * @readonly
		 */
		this.title = raw.Titel
		/**
		 * @type String
		 * @readonly
		 */
		this.description = cleanHtmlContent(raw.Details)

		/**
		 * @type Date
		 * @readonly
		 */
		this.signinStart = parseDate(raw.StartInschrijfdatum)
		/**
		 * @type Date
		 * @readonly
		 */
		this.signinEnd = parseDate(raw.EindeInschrijfdatum)

		/**
		 * @type Date
		 * @readonly
		 */
		this.visibleFrom = parseDate(raw.ZichtbaarVanaf)
		/**
		 * @type Date
		 * @readonly
		 */
		this.visibleTo = parseDate(raw.ZichtbaarTotEnMet)

		/**
		 * @type String
		 * @private
		 * @readonly
		 */
		this._url = `${magister._personUrl}/activiteiten/${this.id}`
	}

	/**
	 * @return {Promise<ActivityElement[]>}
	 */
	elements() {
		const url = `${this._url}/onderdelen`
		return this._magister.http.get(url)
		.then(res => res.json())
		.then(res => res.Items.map(e => new ActivityElement(this._magister, this, e)))
	}
}

export default Activity
