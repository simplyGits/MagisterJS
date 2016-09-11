import MagisterThing from './magisterThing'

/**
 * @class AddressInfo
 * @extends MagisterThing
 * @constructor
 * @private
 * @param {Magister} magister
 * @param {Object} raw
 */
export default class AddressInfo extends MagisterThing {
	constructor(magister, raw) {
		super(magister)

		this.postalCode = raw.Postcode
		this.street = raw.Straatnaam
		this.houseNumber = raw.Huisnummer
		this.suffix = raw.Toevoeging
		this.city = raw.Woonplaats
	}
}
