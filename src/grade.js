import assert from 'assert'
import _ from 'lodash'
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

		/*
		 * Should be set by `Course#grades`!
		 * @private
		 */
		this._fillUrl = undefined

		this.id = toString(raw.CijferId)
		this.grade = raw.CijferStr
		this.passed = raw.IsVoldoende
		this.dateFilledIn = parseDate(raw.DatumIngevoerd)

		this.class = new Class(magister, raw.Vak)

		this.atLaterDate = raw.Inhalen
		this.exemption = raw.Vrijstelling
		this.counts = raw.TeltMee

		if (raw.Periode != null) {
			this.period = new GradePeriod(magister, raw.Periode)
		}

		if (raw.CijferKolom != null) {
			this.type = new GradeType(magister, raw.CijferKolom)
		}

		this.assignmentId = raw.CijferKolomIdEloOpdracht

		this.teacher = new Person(magister, { Docentcode: raw.Docent }, 3)

		this.classExemption = raw.VakDispensatie || raw.VakVrijstelling

		/**
		 * Value will be set by `Grade#fill`
		 */
		this.description = ''
		/**
		 * Value will be set by `Grade#fill`
		 */
		this.weight = 0
		/**
		 * Value will be set by `Grade#fill`
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
			this.description = res.WerkInformatieOmschrijving || ''
			this.weight = Number.parseInt(res.Weging, 10) || 0

			this.type.level = res.KolomNiveau
			this.type.description = res.KolomOmschrijving || ''

			this.filled = true
			return this
		})
	}
}

export default Grade
