import url from 'url'
import _ from 'lodash'
import MagisterThing from './magisterThing'
import Person from './person'
import { parseDate, toString } from './util'

/**
 * @extends MagisterThing
 * @private
 */
class File extends MagisterThing {
	/**
	 * @param {Magister} magister
	 * @param {FileFolder} fileFolder
	 * @param {Object} raw
	 */
	constructor(magister, fileFolder, raw) {
		super(magister)

		/**
		 * @type String
		 * @readonly
		 */
		this.id = toString(raw.Id)
		/**
		 * @type Number
		 * @readonly
		 */
		this.type = raw.BronSoort // REVIEW: string?
		/**
		 * @type String
		 * @readonly
		 */
		this.name = raw.Naam
		/**
		 * @type String
		 * @readonly
		 */
		this.uri = raw.Uri
		/**
		 * @type Number
		 * @readonly
		 */
		this.size = raw.Grootte
		// REVIEW
		/**
		 * @type Number
		 * @readonly
		 */
		this.rights = raw.Privilege
		/**
		 * @type String
		 * @readonly
		 */
		this.mime = raw.ContentType || 'application/octet-stream'

		/**
		 * @type Date
		 * @readonly
		 */
		this.changedDate = parseDate(raw.GewijzigdOp)
		/**
		 * @type Date
		 * @readonly
		 */
		this.creationDate = parseDate(raw.GemaaktOp || raw.Datum)

		/**
		 * @type Person
		 * @readonly
		 */
		this.addedBy = new Person(magister, { Naam: raw.GeplaatstDoor })

		/**
		 * @type String
		 * @readonly
		 */
		this.fileBlobId = toString(raw.FileBlobId)
		/**
		 * @type FileFolder
		 * @readonly
		 */
		this.fileFolder = fileFolder
		/**
		 * @type String
		 * @readonly
		 */
		this.uniqueId = raw.UniqueId
		/**
		 * @type String
		 * @readonly
		 */
		this.referenceId = toString(raw.Referentie)

		const selfUrl = _.find(raw.Links, { Rel: 'Self' })
		const contentUrl = _.find(raw.Links, { Rel: 'Contents' })
		const getUrl = link => !link ? null : url.resolve(magister.school.url, link.Href)

		/**
		 * @type String|null
		 * @readonly
		 * @private
		 */
		this._selfUrl = getUrl(selfUrl)
		/**
		 * @type String
		 * @readonly
		 * @private
		 */
		this._downloadUrl = getUrl(contentUrl || selfUrl)
	}

	/**
	 * Opens a stream to the current file
	 * @return {Promise<Stream>}
	 */
	download() {
		return this._magister._privileges.needs('bronnen', 'read')
		.then(() => this._magister.http.get(this._downloadUrl))
		.then(res => res.body)
	}

	/**
	 * Removes the current file permanently
	 * @return {Promise<undefined>}
	 */
	remove() {
		return this._magister._privileges.needs('bronnen', 'delete')
		.then(() => this._magister.http.delete(this._selfUrl))
		.then(() => undefined) // throw away the useless result from magister. (current object)
	}

	/**
	 * Update the server to reflect the changes made on the properties of this
	 * File instance.
	 * @return {Promise<undefined>}
	 */
	saveChanges() {
		return this._magister._privileges.needs('bronnen', 'update')
		.then(() => this._magister.http.put(this._selfUrl, this._toMagister()))
		.then(() => undefined)
	}

	/**
	 * @private
	 * @return {Object}
	 */
	_toMagister() {
		const toNumberSafe = val => val == null ? val : parseInt(val, 10)

		return {
			Id: parseInt(this.id, 10),
			BronSoort: this.type,
			Naam: this.name,
			Uri: this.uri,
			Grootte: this.size,
			Privilege: this.rights,
			ContentType: this.mime,
			FileBlobId: toNumberSafe(this.fileBlobId),
			ParentId: this.fileFolder.id,
			UniqueId: this.uniqueId,
			Referentie: toNumberSafe(this.referenceId),
		}
	}
}

export default File
