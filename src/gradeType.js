import MagisterThing from './magisterThing'
import { toString } from './util'

/**
 * @extends MagisterThing
 * @private
 */
class GradeType extends MagisterThing {
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
		this.name = raw.KolomNaam
		/**
		 * @type Number
		 * @readonly
		 */
		this.number = raw.KolomNummer
		/**
		 * @type String
		 * @readonly
		 */
		this.header = raw.KolomKop
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isAtLaterDate = raw.IsHerkansingKolom
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isTeacher = raw.IsDocentKolom
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.hasNestedTypes = raw.HeeftOndeliggendeKolommen
		/**
		 * @type Boolean
		 * @readonly
		 */
		this.isPTA = raw.IsPTAKolom

		/**
		 * Value will be set by `Grade#fill`
		 * @type Number
		 * @default undefined
		 */
		this.level = undefined
		/**
		 * Value will be set by `Grade#fill`
		 * @type String
		 * @default ''
		 */
		this.description = ''

		/**
		 * @type Number
		 * @private
		 * @readonly
		 */
		this._type = raw.KolomSoort
	}

	/**
	 * @type String
	 * @readonly
	 */
	get type() {
		switch (this._type) {
		case 1:  return 'grade'
		case 2:  return 'average'
		case 3:  return 'maximum'
		case 4:  return 'formula'
		case 5:  return 'minimum'
		case 6:  return 'sum'
		case 7:  return 'count'
		case 8:  return 'cevo'
		case 9:  return 'text'
		case 10: return 'cevocpe'
		case 11: return 'cevocie'
		case 12: return 'weight'
		case 13: return 'end'
		case 14: return 'deficit'

		default: return 'unknown'
		}
	}
}

export default GradeType
