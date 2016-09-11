import _ from 'lodash'
import MagisterThing from './magisterThing'
import Person from './person'
import File from './file'
import * as util from './util'

export default class Appointment extends MagisterThing {
	constructor(magister, raw) {
		super(magister)

		this.id = raw.Id.toString()
		this.start = util.parseDate(raw.Start)
		this.end = util.parseDate(raw.Einde)
		this.startBySchoolhour = raw.LesuurVan
		this.endBySchoolhour = raw.LesuurTotMet
		this.isFullDay = raw.DuurtHeleDag
		this.description = raw.Omschrijving || ''
		this.location = raw.Lokatie || ''
		this.status = raw.Status
		this.type = raw.Type
		this.displayType = raw.WeergaveType
		this.content = raw.Inhoud
		this.infoType = raw.InfoType
		this.annotation = raw.Aantekening
		this.isDone = raw.Afgerond
		this.classes = raw.Vakken != null ? _.map(raw.Vakken, 'Naam') : [] // REVIEW: moeten we de key 'Naam' wel plucken?
		this.teachers = raw.Docenten != null ? _.map(raw.Docenten, p => new Person(magister, p)) : []
		this.classRooms = raw.Lokalen != null ? _.map(raw.Lokalen, 'Naam') : [] // REVIEW: moeten we de key 'Naam' wel plucken?
		this.groups = raw.Groepen // ?
		this.appointmentId = raw.OpdrachtId
		this.hasAttachments = raw.HeeftBijlagen // REVIEW: do we want this to be a public property?
		this.isCancelled = [ 4, 5 ].includes(raw.Status)
		this.isChanged = [ 3, 9, 10 ].includes(raw.Status)
		this.absenceInfo = undefined

		this._url = `${magister._personUrl}/afspraken/${this._id}`
	}

	/**
	 * @method attachments
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
				const f = new File(this.magister, undefined, raw)
				f.addedBy = person
				return f
			})
		})
	}

	/**
	 * @method remove
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
	 * @method saveChanges
	 * @return {Promise<undefined>}
	 */
	saveChanges() {
		return this._magister._privileges.needs('afspraken', 'update')
		.then(() => this._magister.http.put(this._url, this._toMagister()))
	}

	/**
	 * @method _toMagister
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
