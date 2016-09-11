import MagisterThing from './magisterThing'

/**
 * @class Message
 * @extends MagisterThing
 * @constructor
 * @param {Magister} magister
 * @param {Object} [raw]
 */
export default class Message extends MagisterThing {
	constructor(magister) {
		super(magister)
	}
}
