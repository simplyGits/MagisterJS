import _ from 'lodash'
import MagisterThing from './magisterThing'
import Person from './person'
import File from './file'
import { parseDate, toString } from './util'

class Appointment extends MagisterThing {
	/**
	 * @private
	 * @param {Magister} magister
	 * @param {Object} raw
	 */
	constructor(magister, raw) {
		super(magister)

		/**
		 * @type {String}
		 * @readonly
		 */
		this.id = toString(raw.Id)
		/**
		 * @type {Date}
		 * @readonly
		 */
		this.start = parseDate(raw.Start)
		/**
		 * @type {Date}
		 * @readonly
		 */
		this.end = parseDate(raw.Einde)
		/**
		 * @type {Number}
		 * @readonly
		 */
		this.startBySchoolhour = raw.LesuurVan
		/**
		 * @type {Number}
		 * @readonly
		 */
		this.endBySchoolhour = raw.LesuurTotMet
		/**
		 * @type {Boolean}
		 * @readonly
		 */
		this.isFullDay = raw.DuurtHeleDag
		/**
		 * @type {String}
		 * @readonly
		 */
		this.description = _.trim(raw.Omschrijving)
		/**
		 * @type {String}
		 * @readonly
		 */
		this.location = _.trim(raw.Lokatie)
		/**
		 * @type {String}
		 * @readonly
		 */
		this.displayType = raw.WeergaveType
		/**
		 * @type {String}
		 * @readonly
		 */
		this.content = raw.Inhoud
		/**
		 * @type {String}
		 * @readonly
		 */
		this.annotation = raw.Aantekening
		/**
		 * @type {Boolean}
		 * @readonly
		 */
		this.isDone = raw.Afgerond
		/**
		 * @type {String[]}
		 * @readonly
		 */
		this.classes = raw.Vakken != null ? _.map(raw.Vakken, 'Naam') : [] // REVIEW: moeten we de key 'Naam' wel plucken?
		/**
		 * @type {String[]}
		 * @readonly
		 */
		this.teachers = raw.Docenten != null ? _.map(raw.Docenten, p => new Person(magister, p)) : []
		/**
		 * @type {String[]}
		 * @readonly
		 */
		this.classRooms = raw.Lokalen != null ? _.map(raw.Lokalen, 'Naam') : [] // REVIEW: moeten we de key 'Naam' wel plucken?
		/**
		 * @type {String[]}
		 * @readonly
		 */
		this.groups = raw.Groepen // ?
		/**
		 * @type {String}
		 * @readonly
		 */
		this.appointmentId = raw.OpdrachtId // REVIEW
		/**
		 * @type {Boolean}
		 * @readonly
		 */
		this.hasAttachments = raw.HeeftBijlagen
		/**
		 * @type {Boolean}
		 * @readonly
		 */
		this.isCancelled = [ 4, 5 ].includes(raw.Status)
		/**
		 * @type {Boolean}
		 * @readonly
		 */
		this.isChanged = [ 3, 9, 10 ].includes(raw.Status)
		/**
		 * @type {AbsenceInfo}
		 * @readonly
		 */
		this.absenceInfo = undefined

		/**
		 * @type {String}
		 * @readonly
		 */
		this._type = raw.Type
		/**
		 * @type {String}
		 * @readonly
		 */
		this._infoType = raw.InfoType
		/**
		 * @type {String}
		 * @readonly
		 */
		this._status = raw.Status

		/**
		 * @type {String}
		 * @private
		 * @readonly
		 */
		this._url = `${magister._personUrl}/afspraken/${this.id}`
	}

	/**
	 * @type {string}
	 * @readonly
	 */
	get type() {
		switch (this._type) {
		case 0:   return 'none' // None
		case 1:   return 'personal' // Persoonlijk
		case 2:   return 'general' // Algemeen
		case 3:   return 'school wide' // School breed
		case 4:   return 'internship' // Stage
		case 5:   return 'intake' // Intake
		case 6:   return 'free' // Roostervrij
		case 7:   return 'kwt' // Kwt
		case 8:   return 'standby' // Standby
		case 9:   return 'blocked' // Blokkade
		case 10:  return 'other' // Overig
		case 11:  return 'blocked classroom' // Blokkade lokaal
		case 12:  return 'blocked class' // Blokkade klas
		case 13:  return 'class' // Les
		case 14:  return 'study house' // Studiehuis
		case 15:  return 'free study' // Roostervrije studie
		case 16:  return 'schedule' // Planning
		case 101: return 'measures' // Maatregelen
		case 102: return 'presentations' // Presentaties
		case 103: return 'exam schedule' // Examen rooster

		default:  return 'unknown'
		}
	}

	/**
	 * @type {string}
	 * @readonly
	 */
	get infoType() {
		switch (this._infoType) {
		case 0:  return 'none' // None
		case 1:  return 'homework' // Huiswerk
		case 2:  return 'test' // Proefwerk
		case 3:  return 'exam' // Tentamen
		case 4:  return 'written exam' // Schriftelijke overhoring
		case 5:  return 'oral exam' // Mondelinge overhoring
		case 6:  return 'information' // Informatie
		case 7:  return 'note' // Aantekening

		default: return 'unknown'
		}
	}

	/**
	 * @type {string}
	 * @readonly
	 */
	get status() {
		switch (this._status) {
		case 0:  return 'unknown' // Geen status
		case 1:  return 'scheduled automatically' // Geroosterd automatisch
		case 2:  return 'scheduled manually' // Geroosterd handmatig
		case 3:  return 'changed' // Gewijzigd
		case 4:  return 'canceled manually' // Vervallen handmatig
		case 5:  return 'canceled automatically' // Vervallen automatisch
		case 6:  return 'in use' // In gebruik
		case 7:  return 'finished' // Afgesloten
		case 8:  return 'used' // Ingezet
		case 9:  return 'moved' // Verplaatst
		case 10: return 'changed and moved' // Gewijzigd en verplaatst

		default: return 'unknown'
		}
	}

	/**
	 * @returns {Promise<File[]>}
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
	 * @returns {Promise}
	 */
	remove() {
		if (this.type !== 'personal' && this.type !== 'schedule') {
			return Promise.reject(new Error('Appointment not created by user'))
		}

		return this._magister._privileges.needs('afspraken', 'delete')
		.then(() => this._magister.http.delete(this._url))
	}

	/**
	 * Update the server to reflect the changes made on the properties of this
	 * Appointment instance.
	 * @returns {Promise}
	 */
	saveChanges() {
		return this._magister._privileges.needs('afspraken', 'update')
		.then(() => this._magister.http.put(this._url, this._toMagister()))
		.then(() => undefined)
	}

	/**
	 * @private
	 * @returns {Object}
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
			Status: this._status,
			Type: this._type,
			WeergaveType: this.displayType,
			Inhoud: this.content,
			InfoType: this._infoType,
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
