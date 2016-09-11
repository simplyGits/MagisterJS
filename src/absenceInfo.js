import _ from 'lodash'
import MagisterThing from './magisterThing'
import Appointment from './appointment'
import * as util from './util'

/**
 * @class AbsenceInfo
 * @extends MagisterThing
 * @constructor
 * @private
 * @param {Magister} magister
 * @param {Object} raw
 */
export default class AbsenceInfo extends MagisterThing {
	constructor(magister, raw) {
		super(magister)

		/**
		 * @property _type
		 * @private
		 * @final
		 * @type Number
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
	 * @property type
	 * @final
	 * @type String
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
