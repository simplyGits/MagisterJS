import _ from 'lodash'
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

	/**
	 * @method addRecipient
	 * @param {Person|Person[]} recipients
	 */
	addRecipient(recipients) {
		if (!Array.isArray(recipients)) {
			recipients = [ recipients ]
		}

		this.recipients = this.recipients.concat(recipients)
	}

	// REVIEW
	move(destination) {
		if (_.isObject(destination)) {
			destination = destination.id
		}

		if (this.folderId === destination) {
			return Promise.resolve(undefined)
		}

		this.folderId = destination
		this.saveChanges()
	}

	/**
	 * @method remove
	 * @return {Promise<Error|undefined>}
	 */
	remove() {
		const url = `${this._magister._personUrl}/berichten/${this.id}`
		return this._magister._privileges.needs('berichten', 'delete')
		.then(() => this._magister.http.delete(url))
	}
}
