import MagisterThing from './magisterThing'
import File from './file'
import { parseDate, toString } from './util'

/**
 * @extends MagisterThing
 * @private
 */
class AssignmentVersion extends MagisterThing {
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
		 * @type Number
		 * @readonly
		 */
		this.state = raw.Status
		/**
		 * @type String
		 * @readonly
		 */
		this.pupilMessage = raw.LeerlingOpmerking
		/**
		 * @type String
		 * @readonly
		 */
		this.teacherNotice = raw.DocentOpmerking
		/**
		 * @type File[]
		 * @readonly
		 */
		this.handedInFiles = raw.LeerlingBijlagen.map(f => new File(magister, undefined, f))
		/**
		 * @type File[]
		 * @readonly
		 */
		this.feedbackFiles = raw.FeedbackBijlagen.map(f => new File(magister, undefined, f))
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
		 * @type String|null
		 * @readonly
		 */
		this.grade = raw.Beoordeling
		/**
		 * @type Date
		 * @readonly
		 */
		this.markedOn = parseDate(raw.BeoordeeldOp)
		/**
		 * @type Number
		 * @readonly
		 */
		this.version = raw.VersieNummer
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.tooLate = raw.IsTeLaat
	}
}

export default AssignmentVersion
