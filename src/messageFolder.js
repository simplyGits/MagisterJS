import _ from 'lodash'
import MagisterThing from './magisterThing'
import Message from './message'
import { toString } from './util'

const MAX_LIMIT = 250

/**
 * @extends MagisterThing
 * @private
 */
class MessageFolder extends MagisterThing {
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
		this.name = raw.Naam
		/**
		 * @type Number
		 * @readonly
		 */
		this.unreadCount = raw.OngelezenBerichten
		/**
		 * @type String
		 * @readonly
		 */
		this.parentId = raw.ParentId

		/**
		 * @type String
		 * @readonly
		 */
		this.type = ({
			'postvak in': 'inbox',
			'verzonden items': 'sent',
			'verwijderde items': 'bin',
			'mededelingen': 'alerts',
		})[this.name.toLowerCase()] || 'unknown'
	}

	/**
	 * @param {Object} [options={}]
	 * 	@param {Number} [options.count=10] The limit of the amount of Messages to fetch. If `null`, all messages will be downloaded form the server.
	 * 	@param {Number} [options.skip=0] The amount of messages in front of the
	 * 	MessageFolder to skip.
	 * 	@param {String} [options.readState='all'] One of: 'all', 'read', 'unread'.
	 * 	@param {Boolean} [options.fill=true] Whether or not to call `fill` on every message.
	 * 	@param {Boolean} [options.fillPersons=false] Whether or not to download the users from the server. `options.fill` has to be true for this option to take effect.
	 * @return {Promise<Object>} { messages: Message[], totalCount: Number }
	 */
	messages({ count = 10, skip = 0, readState = 'all', fill = true, fillPersons = false } = {}) {
		if (![ 'all', 'read', 'unread' ].includes(readState)) {
			return Promise.reject(new Error('Invalid option to readState'))
		}

		let url = `${this._magister._personUrl}/berichten?mapId=${this.id}&top=${count}&skip=${skip}`
		if ([ 'read', 'unread' ].includes(readState)) {
			url += `&gelezen=${readState === 'read'}`
		}

		count = count === null ? Infinity : count
		if (count === 0) {
			return Promise.resolve([])
		} else if (count > MAX_LIMIT) {
			url += '&count=true'

			return this._magister._privileges.needs('berichten', 'read')
			.then(() => this._magister.http.get(url))
			.then(res => res.json())
			.then(res => res.TotalCount)
			.then(totalCount => {
				count = Math.min(count, totalCount)

				const promises = _.chain(count / MAX_LIMIT)
				.range()
				.map(n => this.messages({
					count: MAX_LIMIT,
					skip: n * MAX_LIMIT,
					readState,
					fill,
					fillPersons,
				}))
				.value()

				return Promise.all(promises).then(objects => ({
					messages: _(objects).map('messages').flatten().value(),
					totalCount,
				}))
			})
		}

		return this._magister._privileges.needs('berichten', 'read')
		.then(() => this._magister.http.get(url))
		.then(res => res.json())
		.then(res => {
			const messages = res.Items.map(m => new Message(this._magister, m))
			const promise = fill ?
				Promise.all(messages.map(m => m.fill(fillPersons))) :
				Promise.resolve(messages)

			return promise.then(messages => ({
				messages,
				totalCount: res.TotalCount,
			}))
		})
	}

	/**
	 * @override
	 * @return {Object}
	 */
	toJSON() {
		return _.omit(super.toJSON(), 'type')
	}
}

export default MessageFolder
