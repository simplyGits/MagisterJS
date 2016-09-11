import MagisterThing from './magisterThing'

/**
 * @extends MagisterThing
 * @private
 */
class AddressInfo extends MagisterThing {
	/**
	 * @param {Magister} magister
	 * @param {Object} raw
	 */
	constructor(magister, raw) {
		super(magister)

		this.postalCode = raw.Postcode
		this.street = raw.Straatnaam
		this.houseNumber = raw.Huisnummer
		this.suffix = raw.Toevoeging
		this.city = raw.Woonplaats
	}
}

export default AddressInfo
