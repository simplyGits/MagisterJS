import MagisterThing from './magisterThing'
import AssignmentVersion from './assignmentVersion'
import File from './file'
import Person from './person'
import { parseDate, toString } from './util'

/**
 * @extends MagisterThing
 * @private
 */
class Assignment extends MagisterThing {
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
		 * @type String
		 * @readonly
		 */
		this.name = raw.Titel
		/**
		 * @type String
		 * @readonly
		 */
		this.description = raw.Omschrijving
		/**
		 * @type Object
		 * @readonly
		 */
		this.class = raw.Vak // TODO
		/**
		 * @type Date
		 * @readonly
		 */
		this.deadline = parseDate(raw.InleverenVoor)
		/**
		 * @type Date
		 * @readonly
		 */
		this.handedInOn = parseDate(raw.IngeleverdOp)
		/**
		 * @type File[]
		 * @readonly
		 */
		this.files = raw.Bijlagen.map(f => new File(magister, undefined, f))
		/**
		 * @type Person[]
		 * @readonly
		 */
		this.teachers = raw.Docenten != null ? raw.Docenten.map(p => new Person(magister, p)) : []
		/**
		 * @type String[]
		 * @readonly
		 */
		this.versionIds = raw.VersieNavigatieItems.map(v => toString(v.Id))
		/**
		 * @type String
		 * @readonly
		 */
		this.grade = raw.Beoordeling
		/**
		 * @type Date
		 * @readonly
		 */
		this.markedOn = parseDate(raw.BeoordeeldOp)
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.handInAgain = raw.OpnieuwInleveren
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.finished = raw.Afgesloten
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.canHandIn = raw.MagInleveren
	}

	/**
	 * @return {Promise<AssignmentVersion[]>}
	 */
	versions() {
		const promises = this.versionIds.map(id => {
			const url = `${this._magister._personUrl}/opdrachten/versie/${id}`
			return this._magister.http.get(url)
			.then(res => res.json())
			.then(raw => new AssignmentVersion(this._magister, raw))
		})
		return Promise.all(promises)
	}
}

export default Assignment
