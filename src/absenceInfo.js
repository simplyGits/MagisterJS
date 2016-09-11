import _ from 'lodash'
import MagisterThing from './magisterThing'
import Appointment from './appointment'
import * as util from './util'

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

		this.id = raw.Id.toString()
		this.begin = util.parseDate(raw.Start)
		this.end = util.parseDate(raw.Eind)
		this.schoolHour = raw.Lesuur
		this.permitted = raw.Geoorloofd
		this.description = _.toString(raw.Omschrijving).trim()
		this.code = _.toString(raw.Code)
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
