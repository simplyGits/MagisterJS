import _ from 'lodash'
import MagisterThing from './magisterThing'
import Person from './person'
import * as util from './util'

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

		this.id = raw.Id.toString()
		this.type = raw.BronSoort
		this.name = raw.Naam
		this.uri = raw.Uri
		this.size = raw.Grootte
		this.rights = raw.Privilege
		this.mime = raw.ContentType

		this.changedDate = util.parseDate(raw.GewijzigdOp)
		this.creationDate = util.parseDate(raw.GemaaktOp || raw.Datum)

		const addedBy = new Person(magister, null, '', '')
		addedBy.fullName = raw.GeplaatstDoor
		this.addedBy = addedBy

		this.fileBlobId = util.toString(raw.FileBlobId)
		this.fileFolder = fileFolder
		this.uniqueId = raw.UniqueId
		this.referenceId = util.toString(raw.Referentie)

		let l = _.find(raw.Links, { Rel: 'Contents' })
		l = l || _.find(raw.Links, { Rel: 'Self' })
		if (/^https?/.test(l.Href)) {
			this._downloadUrl = l.Href
		} else {
			this._downloadUrl = magister.school.url + l.Href
		}
	}

	/**
	 * Downloads the current file
	 * @method download
	 * @return {Promise<Error|Blob>}
	 */
	download() {
		return this._magister.get(this._downloadUrl)
		.then(res => res.blob())
	}

	// REVIEW: is this method useful?
	move(fileFolder) {
		this.fileFolder = fileFolder
		return this.saveChanges()
	}

	/**
	 * Removes the current file permanently
	 * @method remove
	 * @return {Promise<Error|undefined>}
	 */
	remove() {
		this._magister.http.delete(`${this._magister._personUrl}/bronnen/${this.id}`)
		.then(() => undefined) // throw away the useless result from magister. (current object)
	}

	saveChanges() {

	}
}

export default File
