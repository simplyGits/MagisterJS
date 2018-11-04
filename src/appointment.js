import _ from 'lodash'
import MagisterThing from './magisterThing'
import Person from './person'
import File from './file'
import { parseDate, toString } from './util'

/**
 * @extends MagisterThing
 */
class Appointment extends MagisterThing {
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
		this.start = parseDate(raw.Start)
		/**
		 * @type Date
		 * @readonly
		 */
		this.end = parseDate(raw.Einde)
		/**
		 * @type Number
		 * @readonly
		 */
		this.startBySchoolhour = raw.LesuurVan
		/**
		 * @type Number
		 * @readonly
		 */
		this.endBySchoolhour = raw.LesuurTotMet
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isFullDay = raw.DuurtHeleDag
		/**
		 * @type String
		 * @readonly
		 */
		this.description = _.trim(raw.Omschrijving)
		/**
		 * @type String
		 * @readonly
		 */
		this.location = _.trim(raw.Lokatie)
		/**
		 * @type String
		 * @readonly
		 */
		this.status = raw.Status
		/**
		 * @type String
		 * @readonly
		 */
		this.type = raw.Type
		/**
		 * @type String
		 * @readonly
		 */
		this.displayType = raw.WeergaveType
		/**
		 * @type String
		 * @readonly
		 */
		this.content = raw.Inhoud
		/**
		 * @type String
		 * @readonly
		 */
		this.infoType = raw.InfoType
		/**
		 * @type String
		 * @readonly
		 */
		this.annotation = raw.Aantekening
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isDone = raw.Afgerond
		/**
		 * @type String[]
		 * @readonly
		 */
		this.classes = raw.Vakken != null ? _.map(raw.Vakken, 'Naam') : [] // REVIEW: moeten we de key 'Naam' wel plucken?
		/**
		 * @type String[]
		 * @readonly
		 */
		this.teachers = raw.Docenten != null ? _.map(raw.Docenten, p => new Person(magister, p)) : []
		/**
		 * @type String[]
		 * @readonly
		 */
		this.classRooms = raw.Lokalen != null ? _.map(raw.Lokalen, 'Naam') : [] // REVIEW: moeten we de key 'Naam' wel plucken?
		/**
		 * @type String[]
		 * @readonly
		 */
		this.groups = raw.Groepen // ?
		/**
		 * @type String
		 * @readonly
		 */
		this.appointmentId = raw.OpdrachtId // REVIEW
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.hasAttachments = raw.HeeftBijlagen
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isCancelled = [ 4, 5 ].includes(raw.Status)
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isChanged = [ 3, 9, 10 ].includes(raw.Status)
		/**
		 * @type AbsenceInfo
		 * @readonly
		 */
		this.absenceInfo = undefined

		/**
		 * @type String
		 * @private
		 * @readonly
		 */
		this._url = `${magister._personUrl}/afspraken/${this.id}`
	}

	/**
	 * @return {Promise<Error|File[]}>
	 */
	attachments() {
		if (!this.hasAttachments) {
			return Promise.resolve([])
		}

		return this._magister.http.get(this._url)
		.then(res => res.json())
		.then(res => {
			const attachments = res.Bijlagen
			const person = this.teachers[0]

			return attachments.map(raw => {
				const f = new File(this._magister, undefined, raw)
				f.addedBy = person
				return f
			})
		})
	}

	/**
	 * @return {Promise<Error|undefined>}
	 */
	remove() {
		if (this.type !== 1 && this.type !== 16) {
			return Promise.reject(new Error('Appointment not created by user'))
		}

		return this._magister._privileges.needs('afspraken', 'delete')
		.then(() => this._magister.http.delete(this._url))
	}

	/**
	 * Update the server to reflect the changes made on the properties of this
	 * Appointment instance.
	 * @return {Promise<undefined>}
	 */
	saveChanges() {
		return this._magister._privileges.needs('afspraken', 'update')
		.then(() => this._magister.http.put(this._url, this._toMagister()))
		.then(() => undefined)
	}

	/**
	 * @private
	 * @return {Object}
	 */
	_toMagister() {
		return {
			Id: this.id,
			Start: this.start.toISOString(),
			Einde: this.end.toISOString(),
			LesuurVan: this.startBySchoolhour,
			LesuurTotMet: this.endBySchoolhour,
			DuurtHeleDag: this.isFullDay,
			Omschrijving: this.description,
			Lokatie: this.location,
			Status: this.status,
			Type: this.type,
			WeergaveType: this.displayType,
			Inhoud: this.content,
			InfoType: this.infoType,
			Aantekening: this.annotation,
			Afgerond: this.isDone,
			Vakken: this.classes,
			Docenten: this.teachers,
			Lokalen: this.classRooms,
			Groepen: this.groups,
			OpdrachtId: this.appointmentId,
			HeeftBijlagen: this.hasAttachments,
		}
	}
}

export default Appointment
