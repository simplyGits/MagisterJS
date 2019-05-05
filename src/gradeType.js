import MagisterThing from './magisterThing'
import { toString } from './util'

class GradeType extends MagisterThing {
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
		 * @type {String}
		 * @readonly
		 */
		this.name = raw.KolomNaam
		/**
		 * @type {Number}
		 * @readonly
		 */
		this.number = raw.KolomNummer
		/**
		 * @type {String}
		 * @readonly
		 */
		this.header = raw.KolomKop
		/**
		 * @type {Boolean}
		 * @readonly
		 */
		this.isAtLaterDate = raw.IsHerkansingKolom
		/**
		 * @type {Boolean}
		 * @readonly
		 */
		this.isTeacher = raw.IsDocentKolom
		/**
		 * @type {Boolean}
		 * @readonly
		 */
		this.hasNestedTypes = raw.HeeftOndeliggendeKolommen
		/**
		 * @type {Boolean}
		 * @readonly
		 */
		this.isPTA = raw.IsPTAKolom

		/**
		 * Value will be set by {@link Grade.fill}
		 * @type {Number}
		 * @default undefined
		 */
		this.level = undefined
		/**
		 * Value will be set by {@link Grade.fill}
		 * @type {String}
		 * @default ''
		 */
		this.description = ''

		/**
		 * @type {Number}
		 * @private
		 * @readonly
		 */
		this._type = raw.KolomSoort
	}

	/**
	 * @type {string}
	 * @readonly
	 */
	get type() {
		switch (this._type) {
		case 0:  return 'unknown' // Unkown
		case 1:  return 'grade' // Cijfer
		case 2:  return 'average' // Gemiddelde
		case 3:  return 'maximum' // Maximum
		case 4:  return 'formula' // Formule
		case 5:  return 'minimum' // Minimum
		case 6:  return 'sum' // Som
		case 7:  return 'count' // Tel
		case 8:  return 'cevo' // Cevo
		case 9:  return 'text' // Vrije tekst
		case 10: return 'cevocpe' // Cevo CPE
		case 11: return 'cevocie' // Cevo CIE
		case 12: return 'weight' // Weegfactor
		case 13: return 'end' // Eind cijfer
		case 14: return 'deficit' // Tekortpunten
		case 15: return 'tree top' // Boom top
		case 16: return 'subject requirement' // Vak voorwaarde

		default: return 'unknown'
		}
	}
}

export default GradeType
