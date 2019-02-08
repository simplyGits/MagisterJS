import _ from 'lodash'
import MagisterThing from './magisterThing'
import Class from './class'
import Grade from './grade'
import { parseDate, toString } from './util'

class Course extends MagisterThing {
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
		 * The school year of this course, e.g: '1617'
		 * @type {String}
		 * @readonly
		 */
		this.schoolPeriod = raw.Lesperiode

		/**
		 * Basic type information of this course, e.g: { description: "VWO 6", id: 420 }
		 * @type {{ description: String, id: Number }}
		 * @readonly
		 */
		this.type = ({
			id: raw.Studie.Id,
			description: raw.Studie.Omschrijving,
		})

		/**
		 * The group of this course, e.g: { description: "Klas 6v3", id: 420, locationId: 0 }
		 * @type {{ description: String, id: Number, LocatieId: Number }}
		 * @readonly
		 */
		this.group = ({
			id: raw.Groep.Id,
			get description() {
				const group = raw.Groep.Omschrijving
				return group != null
					? group.split(' ').find(w => /\d/.test(w)) || group
					: null
			},
			locationId: raw.Groep.LocatieId,
		})

		/**
		 * @type {String[]}
		 * @readonly
		 */
		this.curricula = _.compact([ raw.Profiel, raw.Profiel2 ])
	}

	/**
	 * @type {Boolean}
	 * @readonly
	 */
	get current() {
		const now = new Date()
		return this.start <= now && now <= this.end
	}

	/**
	 * @return {Promise<Class[]>}
	 */
	classes() {
		const url = `${this._magister._personUrl}/aanmeldingen/${this.id}/vakken`
		return this._magister.http.get(url)
		.then(res => res.json())
		.then(res => res.map(c => new Class(this._magister, c)))
	}

	/**
	 * @param {Object} [options={}]
	 * 	@param {Boolean} [options.fillGrades=true]
	 *  @param {Boolean} [options.latest=false]
	 * @return {Promise<Grade[]>}
	 */
	grades({ fillGrades = true, latest = false } = {}) {
		const urlPrefix = `${this._magister._personUrl}/aanmeldingen/${this.id}/cijfers`
		const url = latest
		? `${this._magister._personUrl}/cijfers/laatste?top=50&skip=0`
		: `${urlPrefix}/cijferoverzichtvooraanmelding?actievePerioden=false&alleenBerekendeKolommen=false&alleenPTAKolommen=false`

		return this._magister._privileges.needs('cijfers', 'read')
		.then(() => this._magister.http.get(url))
		.then(res => res.json())
		.then(res => res.Items)
		.then(grades => {
			grades = _.reject(grades, raw => raw.CijferId === 0)

			const promises = grades.map(raw => {
				const grade = new Grade(this._magister, raw)
				grade._fillUrl = `${urlPrefix}/extracijferkolominfo/${_.get(raw, 'CijferKolom.Id')}`
				return Promise.resolve(fillGrades ? grade.fill() : grade)
			})

			return Promise.all(promises)
		})
		.then(r => _.sortBy(r, 'dateFilledIn'))
	}
}

export default Course
