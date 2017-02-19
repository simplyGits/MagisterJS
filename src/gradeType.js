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

		// TODO: doccomments

		this.id = toString(raw.Id)
		this.name = raw.KolomNaam
		this.number = raw.KolomNummer
		this.header = raw.KolomKop
		this._type = raw.KolomSoort
		this.isAtLaterDate = raw.IsHerkansingKolom
		this.isTeacher = raw.IsDocentKolom
		this.hasNestedTypes = raw.HeeftOndeliggendeKolommen
		this.isPTA = raw.IsPTAKolom

		/**
		 * Value will be set by `Grade#fill`
		 */
		this.level = undefined
		/**
		 * Value will be set by `Grade#fill`
		 */
		this.description = ''
	}

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
