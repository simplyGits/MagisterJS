import MagisterThing from './magisterThing'
import Message from './message'

class MessageFolder extends MagisterThing {
	constructor(magister, raw) {
		super(magister)

		/**
		 * @property id
		 * @type String
		 * @private
		 */
		this.id = raw.Id.toString()
		/**
		 * @property name
		 * @type String
		 * @private
		 */
		this.name = raw.Naam
		/**
		 * @property unreadMessagesCount
		 * @type Number
		 * @private
		 */
		this.unreadMessagesCount = raw.OngelezenBerichten
		/**
		 * @property parentId
		 * @type String
		 * @private
		 */
		this.parentId = raw.ParentId
	}

	/**
	 * @method messages
	 * @param {Object} [options={}]
	 * 	@param {Number} [options.limit=10] The limit of the amount of Messages to fetch.
	 * 	@param {Number} [options.skip=0] The amount of messages in front to skip.
	 * 	@param {String} [options.readState='all'] One of: 'all', 'read', 'unread'.
	 * 	@param {Boolean} [options.fill=true] Whether or not to call `fillMessage` on every message.
	 * 	@param {Boolean} [options.fillPersons=false] Whether or not to download the users from the server. `options.fill` has to be true for this option to take effect.
	 * @return {Promise<Error|Message[]>}
	 */
	messages({ limit = 10, skip = 0, readState = 'all', fill = true, fillPersons = false }) {
		if (![ 'all', 'read', 'unread' ].includes(readState)) {
			return Promise.reject(new Error('Invalid option to readState'))
		}

		if (limit === 0) {
			return Promise.resolve([])
		}

		let url = `${this._magister._personUrl}/berichten?mapId=${this.id}&top=${limit}&skip=${skip}`
		if (readState === 'read' || readState === 'unread') {
			url += `&gelezen=${readState === 'read'}`
		}

		return this._magister._privileges.needs('berichten', 'read')
		.then(() => this._magister.http.get(url))
		.then(res => res.json())
		.then(res => {
			const messages = res.Items.map(m => new Message(this.magister, m))
			if (fill) {
				const promises = messages.map(m => m.fillMessage(fillPersons))
				return Promise.all(promises)
			} else {
				return messages
			}
		})
	}
}

export default MessageFolder
