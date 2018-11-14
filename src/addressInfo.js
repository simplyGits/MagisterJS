import MagisterThing from './magisterThing'

class AddressInfo extends MagisterThing {
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
		this.postalCode = raw.Postcode
		/**
		 * @type {String}
		 * @readonly
		 */
		this.street = raw.Straatnaam
		/**
		 * @type {Number}
		 * @readonly
		 */
		this.houseNumber = raw.Huisnummer
		/**
		 * String behind the `houseNumber` (eg 'A')
		 * @type {String}
		 * @readonly
		 */
		this.suffix = raw.Toevoeging
		/**
		 * @type {String}
		 * @readonly
		 */
		this.city = raw.Woonplaats
	}
}

export default AddressInfo
