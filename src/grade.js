import _ from 'lodash'
import assert from 'assert'
import MagisterThing from './magisterThing'
import { parseDate, toString } from './util'
import GradeType from './gradeType'
import GradePeriod from './gradePeriod'
import Class from './class'
import Person from './person'

/**
 * @extends MagisterThing
 * @private
 */
class Grade extends MagisterThing {
	/**
	 * @param {Magister} magister
	 * @param {Object} raw
	 */
	constructor(magister, raw) {
		super(magister)

		/**
		 * Should be set by `Course#grades`!
		 * @type String
		 * @private
		 */
		this._fillUrl = undefined

		/**
		 * @type String
		 * @readonly
		 */
		this.id = toString(raw.CijferId)
		/**
		 * @type String
		 * @readonly
		 */
		this.grade = raw.CijferStr
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.passed = raw.IsVoldoende
		/**
		 * @type Date
		 * @readonly
		 */
		this.dateFilledIn = parseDate(raw.DatumIngevoerd)

		/**
		 * @type Class
		 * @readonly
		 */
		this.class = new Class(magister, raw.Vak)

		/**
		 * @type Boolean
		 * @readonly
		 */
		this.atLaterDate = raw.Inhalen
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.exemption = raw.Vrijstelling
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.counts = raw.TeltMee

		/**
		 * @type GradePeriod
		 * @readonly
		 * @default null
		 */
		this.period = raw.Periode == null ? null : new GradePeriod(magister, raw.Periode)

		/**
		 * @type GradeType
		 * @readonly
		 * @default null
		 */
		this.type = raw.CijferKolom == null ? null : new GradeType(magister, raw.CijferKolom)

		/**
		 * @type String
		 * @readonly
		 */
		this.assignmentId = toString(raw.CijferKolomIdEloOpdracht)

		/**
		 * @type Person
		 * @readonly
		 */
		this.teacher = new Person(magister, { Docentcode: raw.Docent }, 3)

		/**
		 * @type Boolean
		 * @readonly
		 */
		this.classExemption = raw.VakDispensatie || raw.VakVrijstelling

		/**
		 * Value will be set by `Grade#fill`
		 * @type String
		 * @default ''
		 */
		this.description = ''
		/**
		 * Value will be set by `Grade#fill`
		 * @type String
		 * @default 0
		 */
		this.weight = 0
		/**
		 * Value will be set by `Grade#fill`
		 * @type Date
		 * @default undefined
		 */
		this.testDate = undefined
	}

	// TODO: add ability to fill persons
	/**
	 * @return {Promise<Grade>}
	 */
	fill() {
		if (this._filled) {
			return Promise.resolve(this)
		}
		assert(this._fillUrl != null, 'this._fillUrl not set')

		return this._magister.http.get(this._fillUrl)
		.then(res => res.json())
		.then(res => {
			this.testDate = parseDate(res.WerkinformatieDatumIngevoerd)
			this.description = _.trim(res.WerkInformatieOmschrijving)
			this.weight = Number.parseInt(res.Weging, 10) || 0

			this.type.level = res.KolomNiveau
			this.type.description = _.trim(res.KolomOmschrijving)

			this.filled = true
			return this
		})
	}
}

export default Grade
