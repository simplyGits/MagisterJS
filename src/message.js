import _ from 'lodash'
import MagisterThing from './magisterThing'
import Person from './person'
import { cleanHtmlContent, parseDate } from './util'

/**
 * @extends MagisterThing
 */
class Message extends MagisterThing {
	/**
	 * @param {Magister} magister
	 * @param {Object} [raw]
	 */
	constructor(magister, raw) {
		super(magister)

		/**
		 * @type Boolean
		 * @private
		 * @readonly
		 * @default true
		 */
		this._canSend = true
		/**
		 * @type Number
		 * @private
		 * @readonly
		 * @default 1
		 */
		this._type = 1
		/**
		 * @type String
		 * @readonly
		 * @default ''
		 */
		this.subject = ''
		/**
		 * @type String
		 * @readonly
		 * @default ''
		 */
		this.body = ''
		/**
		 * @type Person[]
		 * @readonly
		 * @default []
		 */
		this.recipients = []

		if (raw != null) {
			this._canSend = false
			this._type = raw.Soort
			this.subject = raw.Onderwerp
			this.body = cleanHtmlContent(raw.Inhoud)
			this.recipients = raw.Ontvangers.map(p => new Person(magister, p))

			/**
			 * @type String
			 * @readonly
			 */
			this.id = raw.Id.toString()
			/**
			 * @type String
			 * @readonly
			 */
			this.folderId = raw.MapId.toString()
			/**
			 * @type Person
			 * @readonly
			 */
			this.sender = new Person(magister, raw.Afzender)
			/**
			 * @type Date
			 * @readonly
			 */
			this.sendDate = parseDate(raw.VerstuurdOp)
			/**
			 * @type Date
			 * @readonly
			 */
			this.begin = parseDate(raw.Begin)
			/**
			 * @type Date
			 * @readonly
			 */
			this.end = parseDate(raw.Einde)
			/**
			 * @type Boolean
			 * @readonly
			 */
			this.isRead = raw.IsGelezen
			/**
			 * @type Number
			 * @readonly
			 */
			this.state = raw.Status
			/**
			 * @type Boolean
			 * @readonly
			 */
			this.isFlagged = raw.HeeftPrioriteit
		}
	}

	/**
	 * @type String
	 * @readonly
	 * @default 'message'
	 */
	get type() {
		switch (this._type) {
		case 1:  return 'message'
		case 2:  return 'alert'
		default: return 'unknown'
		}
	}

	/**
	 * @param {Person|Person[]} recipients
	 */
	addRecipient(recipients) {
		if (!Array.isArray(recipients)) {
			recipients = [ recipients ]
		}

		if (!recipients.every(x => x instanceof Person)) {
			throw new Error('recipients should be a person or an persons array')
		}

		this.recipients = this.recipients.concat(recipients)
	}

	/**
	 * @param {Boolean} [fillPersons=false]
	 * @return {Promise<Message>}
	 */
	fill(fillPersons = false) {
		if (this._filled && (this._filledPersons || !fillPersons)) {
			return Promise.resolve(this)
		}

		return this._magister.http.get()
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
		return this.saveChanges()
	}

	// REVIEW
	markRead(val) {
		this.isRead = val
		return this.saveChanges()
	}

	/**
	 * @return {Promise<Error|undefined>}
	 */
	remove() {
		const url = `${this._magister._personUrl}/berichten/${this.id}`
		return this._magister._privileges.needs('berichten', 'delete')
		.then(() => this._magister.http.delete(url))
	}

	/**
	 * @return {Promise<Message>}
	 */
	send() {
		const reject = message => Promise.reject(new Error(message))

		if (!this._canSend) {
			return reject('message is marked as unsendable')
		} else if (this.recipients.length === 0) {
			return reject('message doesn\'t have recipients')
		} else if (this.subject.length === 0) {
			return reject('subject is empty')
		}

		return this._magister._privileges.needs('berichten', 'create')
		.then(() => this._magister.http.post(
			`${this._magister._personUrl}/berichten`,
			this._toMagister()
		))
		.then(() => this)
	}

	/**
	 * @private
	 * @return {Object}
	 */
	_toMagister() {
		const obj = {}

		obj.Id = this.id
		obj.Inhoud = this.body
		obj.MapId = this.folderId // number?
		obj.Onderwerp = this.subject
		obj.Ontvangers = this.recipients.map(p => p._toMagister())
		obj.VerstuurdOp = this.sendDate || new Date()
		obj.Begin = this.begin
		obj.Einde = this.end
		obj.IsGelezen = this.isRead
		obj.Status = this.state
		obj.HeeftPrioriteit = this.isFlagged
		obj.Soort = this._type

		return obj
	}
}

export default Message
