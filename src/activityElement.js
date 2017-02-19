import MagisterThing from './magisterThing'
import File from './file'
import { cleanHtmlContent, parseDate, toString } from './util'

/**
 * @extends MagisterThing
 * @private
 */
class ActivityElement extends MagisterThing {
	/**
	 * @param {Magister} magister
	 * @param {Object} raw
	 */
	constructor(magister, activity, raw) {
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
		 * @type Number
		 * @readonly
		 */
		this.minParticipants = raw.MinAantalDeelnemers
		/**
		 * @type Number
		 * @readonly
		 */
		this.maxParticipants = raw.MaxAantalDeelnemers
		/**
		 * @type Number
		 * @readonly
		 */
		this.placesLeft = raw.AantalPlaatsenBeschikbaar

		/**
		 * @type Boolean
		 * @readonly
		 */
		this.signedup = raw.IsIngeschreven
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.ableToSignup = raw.IsOpInTeSchrijven
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.mandatorilySignedup = raw.IsVerplichtIngeschreven

		/**
		 * @type File[]
		 * @readonly
		 */
		this.attachments = (raw.Bijlagen || []).map(a => new File(this._magister, undefined, a))

		// REVIEW: do we want a reference to the parent activity?
		// this._activity = activity
		/**
		 * @type String
		 * @readonly
		 */
		this.activityId = toString(activity.id)
		/**
		 * @type String
		 * @private
		 * @readonly
		 */
		this._url = `${activity._url}/onderdelen/${this.id}`
	}

	/**
	 * @param {Boolean} val
	 * @return {ActivityElement}
	 */
	signup(val) {
		// TODO: handle errors, I have no idea how an error looks like, though.

		if (!this.ableToSignup || this.signedup === val) {
			return
		}

		return Promise.resolve().then(() => {
			const url = `${this._url}/inschrijvingen`

			if (val) {
				const payload = {
					persoonId: this._magister.profileInfo.id,
					activiteitId: Number.parseInt(this.activityId, 10),
					onderdeelId: Number.parseInt(this.id, 10),
				}

				return this._magister._privileges.needs('activiteiten', 'update')
				.then(() => this._magister.http.post(url, payload))
			} else {
				return this._magister._privileges.needs('activiteiten', 'delete')
				.then(() => this._magister.http.delete(url))
			}
		}).then(() => {
			this.signedup = val
			return this
		})
	}

	/**
	 * @private
	 * @return {Object}
	 */
	_toMagister() {
		return {
			Id: Number.parseInt(this.id, 10),
			Titel: this.title,
			Details: this.description,

			StartInschrijfdatum: this.signinStart.toJSON(),
			EindeInschrijfdatum: this.signinEnd.toJSON(),

			MinAantalDeelnemers: this.minParticipants,
			MaxAantalDeelnemers: this.maxParticipants,
			AantalPlaatsenBeschikbaar: this.placesLeft,

			IsIngeschreven: this.signedup,
			IsOpInTeSchrijven: this.ableToSignup,
			IsVerplichtIngeschreven: this.mandatorilySignedup,

			activiteitId: Number.parseInt(this.activityId, 10),
		}
	}
}

export default ActivityElement
