import _ from 'lodash'
import MagisterThing from './magisterThing'
import Appointment from './appointment'
import { toString, parseDate } from './util'

/**
 * @extends MagisterThing
 * @private
 */
class AbsenceInfo extends MagisterThing {
	/**
	 * @param {Magister} magister
	 * @param {Object} raw
	 */
	constructor(magister, raw) {
		super(magister)

		/**
		 * @type Number
		 * @private
		 * @readonly
		 */
		this._type = raw.Verantwoordingtype

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
		this.end = parseDate(raw.Eind)
		/**
		 * @type Number
		 * @readonly
		 */
		this.schoolHour = raw.Lesuur
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isPermitted = raw.Geoorloofd
		/**
		 * @type String
		 * @readonly
		 */
		this.description = _.toString(raw.Omschrijving).trim()
		/**
		 * @type String
		 * @readonly
		 */
		this.code = _.toString(raw.Code)
		/**
		 * @type Appointment
		 * @readonly
		 */
		this.appointment = new Appointment(magister, raw.Afspraak) // REVIEW: do we want (and need) this?
	}

	/**
	 * @type String
	 * @readonly
	 */
	get type() {
		switch (this._type) {
		case 1:  return 'absent'
		case 2:  return 'late'
		case 3:  return 'sick'
		case 4:  return 'discharged'
		case 6:  return 'exemption'
		case 7:  return 'books'
		case 8:  return 'homework'

		default: return 'unknown'
		}
	}
}

export default AbsenceInfo
