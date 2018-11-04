import MagisterThing from './magisterThing'
import File from './file'
import { toString } from './util'

/**
 * @extends MagisterThing
 * @private
 */
class FileFolder extends MagisterThing {
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
		this.rights = raw.Privilege
		/**
		 * @type String
		 * @readonly
		 */
		this.parentId = toString(raw.ParentId)
	}

	/**
	 * @param {Boolean} [fillPersons=false]
	 * @return {Promise<File[]>}
	 */
	files(fillPersons = false) {
		const url = `${this._magister._personUrl}/bronnen?parentId=${this.id}`
		return this._magister._privileges.needs('bronnen', 'read')
		.then(() => this._magister.http.get(url))
		.then(res => res.json())
		.then(res => {
			const promises = res.Items.map(f => {
				const file = new File(this._magister, this, f)
				return fillPersons ?
					file.addedBy.getFilled().then(() => file) :
					Promise.resolve(file)
			})
			return Promise.all(promises)
		})
	}
}

export default FileFolder
