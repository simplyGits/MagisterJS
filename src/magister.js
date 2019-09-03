'use strict'

// external
import _ from 'lodash'
import fetch from 'node-fetch'
import url from 'url'
import AuthCode from '@magisterjs/authcode'
import { AuthManager } from 'magister-openid'

// internal: used in this file
import AbsenceInfo from './absenceInfo'
import Activity from './activity'
import Appointment from './appointment'
import Assignment from './assignment'
import AuthError from './authError'
import Class from './class'
import Course from './course'
import FileFolder from './fileFolder'
import Http from './http'
import MessageFolder from './messageFolder'
import Person from './person'
import Privileges from './privileges'
import ProfileInfo from './profileInfo'
import School from './school'
import SchoolUtility from './schoolUtility'
import * as util from './util'

// internal: only being exported
import ActivityElement from './activityElement'
import AddressInfo from './addressInfo'
import AssignmentVersion from './assignmentVersion'
import File from './file'
import Grade from './grade'
import GradePeriod from './gradePeriod'
import GradeType from './gradeType'
import Message from './message'
import ProfileSettings from './profileSettings'
import VersionInfo from './versionInfo'

// TODO: add nice warnings when trying to do stuff while not logged in yet

/**
 * Class to communicate with Magister.
 */
class Magister {
	/**
	 * @private
	 * @param {Object} options
	 * @param {School} school
	 * @param {Http} http
	 */
	constructor(options, school, http) {
		const info = url.parse(school.url)
		if (!/^[^.#/\\]+\.magister\.net$/.test(info.host)) {
			throw new Error('`school.url` is not a correct magister url')
		}
		school.tenant = info.host
		school.url = `https://${info.host}`

		/**
		 * @type {Object}
		 * @readonly
		 * @private
		 */
		this._options = options
		/**
		 * @type {School}
		 * @readonly
		 */
		this.school = _.extend(new School({}), school)
		/**
		 * @type {Http}
		 * @readonly
		 */
		this.http = http
		/**
		 * @type {ProfileInfo}
		 * @readonly
		 */
		this.profileInfo = null
	}

	/**
 	 * @type {AuthManager}
 	 */
	get authManager() {
		return this.http.authManager
	}

	/**
 	 * @type {AuthManager}
	 * @param {AuthManager} authManager
 	 */
	set authManager(authManager) {
		this.http.authManager = authManager
	}

	/**
	 * @returns {Promise<Activity[]>}
	 */
	activities() {
		return this._privileges.needs('activiteiten', 'read')
		.then(() => this.http.get(`${this._personUrl}/activiteiten`))
		.then(res => res.json())
		.then(res => res.Items.map(a => new Activity(this, a)))
	}

	/**
	 * @param {Date} from Time is ignored.
	 * @param {Date} [to=from] Time is ignored
	 * @param {Object} [options={}]
	 * 	@param {boolean} [options.fillPersons=false]
	 * 	@param {boolean} [options.fetchAbsences=true]
	 * 	@param {boolean} [options.ignoreAbsenceErrors=true]
	 * @returns {Promise<Appointment[]>}
	 */
	appointments() {
		// extract options
		const {
			fillPersons = false,
			fetchAbsences = true,
			ignoreAbsenceErrors = true,
		} = _.find(arguments, _.isPlainObject) || {}

		// extract dates
		const dates = _(arguments).filter(_.isDate).sortBy().value()
		const from = dates[0]
		const to = dates[1] || dates[0]

		const fromUrl = util.urlDateConvert(from)
		const toUrl = util.urlDateConvert(to)

		// fetch appointments
		const appointmentsUrl = `${this._personUrl}/afspraken?van=${fromUrl}&tot=${toUrl}`
		const appointmentsPromise = this._privileges.needs('afspraken', 'read')
		.then(() => this.http.get(appointmentsUrl))
		.then(res => res.json())
		.then(res => res.Items.map(a => new Appointment(this, a)))
		.then(appointments => {
			if (!fillPersons) {
				return appointments
			}

			const promises = appointments.map(a => {
				return Promise.all(a.teachers.map(t => t.getFilled('teacher')))
				.then(teachers => a.teachers = teachers)
				.then(() => a)
			})
			return Promise.all(promises)
		})

		// fetch absences
		let absencesPromise = Promise.resolve([])
		if (fetchAbsences) {
			const absencesUrl = `${this._personUrl}/absenties?van=${fromUrl}&tot=${toUrl}`
			absencesPromise = this._privileges.needs('Absenties', 'read')
			.then(() => this.http.get(absencesUrl))
			.then(res => res.json())
			.then(res => res.Items.map(a => new AbsenceInfo(this, a)))

			if (ignoreAbsenceErrors) {
				absencesPromise = absencesPromise.catch(() => [])
			}
		}

		return Promise.all([ appointmentsPromise, absencesPromise ])
		.then(([ appointments, absences ]) => {
			for (const a of appointments) {
				a.absenceInfo = absences.find(i => i.appointment.id === a.id)
			}

			return appointments
		})
		.then(appointments => _.sortBy(appointments, 'start'))
	}

	/**
	 * @param {Object} [options={}]
	 * 	@param {number} [options.count=50]
	 * 	@param {number} [options.skip=0]
	 * 	@param {boolean} [options.fillPersons=false]
	 * @returns {Promise<Assignment[]>}
	 */
	assignments({
		count = 50,
		skip = 0,
		fillPersons = false,
	} = {}) {
		const url = `${this._personUrl}/opdrachten?top=${count}&skip=${skip}&status=alle`

		return this._privileges.needs('eloopdracht', 'read')
		.then(() => this.http.get(url))
		.then(res => res.json())
		.then(res => res.Items.map(i => i.Id))
		.then(ids => {
			const promises = ids.map(id => {
				return this.http.get(`${this._personUrl}/opdrachten/${id}`)
				.then(res => res.json())
			})
			return Promise.all(promises)
		})
		.then(items => {
			const promises = items.map(item => {
				const assignment = new Assignment(this, item)
				if (!fillPersons) {
					return assignment
				}

				return Promise.all(assignment.teachers.map(p => p.getFilled('teacher')))
				.then(teachers => assignment.teachers = teachers)
				.then(() => assignment)
			})
			return Promise.all(promises)
		})
	}

	/**
	 * @returns {Promise<Magister[]>}
	 */
	children() {
		if (this.profileInfo.isChild) {
			return Promise.reject(new Error('User is not a parent'))
		}

		return this.http.get(`${this._personUrl}/kinderen`)
		.then(res => res.json())
		.then(res => res.Items)
		.then(items => items.map(raw => {
			const m = Object.create(this)

			m.school = this.school
			m.http = this.http

			m._personUrl = `${this.school.url}/api/personen/${raw.Id}`
			m._pupilUrl = `${this.school.url}/api/leerlingen/${raw.Id}`
			m.profileInfo = new ProfileInfo(m, raw)

			return m
		}))
	}

	/**
	 * @returns {Promise<Course[]>}
	 */
	courses() {
		return this._privileges.needs('aanmeldingen', 'read')
		.then(() => this.http.get(`${this._personUrl}/aanmeldingen`))
		.then(res => res.json())
		.then(res => res.Items.map(c => new Course(this, c)))
		.then(items => _.sortBy(items, 'start'))
	}

	/**
	 * @param {Object} options
	 * 	@param {string} options.description The description of the appointment.
	 * 	@param {Date} options.start The start of the appointment, time is
	 * 	ignored when `options.fullDay` is set to true.
	 * 	@param {Date} options.end The end of the appointment, this is ignored
	 * 	when `options.fullDay` is set to true.
	 * 	@param {boolean} [options.fullDay=false] When this is true,
	 * 	`options.end` is ignored and only `options.start` is used to set the
	 * 	begin and the end for the appointment.
	 * 	@param {string} [options.location] The location (classroom for example)
	 * 	for the appointment.
	 * 	@param {string} [options.content] Some arbitrary string you want to
	 * 	save.
	 * 	@param {number} [options.type=1] The type of the appointment: 1 for
	 * 	personal or 16 for planning
	 * @returns {Promise}
	 */
	createAppointment(options) {
		const required = [ 'description', 'start', 'end' ]
		for (const key of required) {
			if (options[key] == null) {
				const err = new Error(`Not all required fields for \`options\` are given, required are: [ ${required.join(', ')} ]`)
				return Promise.reject(err)
			}
		}

		if (options.fullDay) {
			options.start = util.date(options.start)
			options.end = new Date(options.start.getTime()) + 1000 * 60 * 60 * 24
		}

		let content = _.trim(options.content)
		content = content.length > 0 ? _.escape(content) : null

		const payload = {
			Omschrijving: options.description,
			Start: options.start.toJSON(),
			Einde: options.end.toJSON(),

			Lokatie: _.trim(options.location),
			Inhoud: content,
			Type: options.type || 1,
			DuurtHeleDag: options.fullDay || false,

			InfoType: content === null ? 0 : 6,

			// Static non-configurable stuff.
			WeergaveType: 1,
			Status: 2,
			HeeftBijlagen: false,
			Bijlagen: null,
			LesuurVan: null,
			LesuurTotMet: null,
			Aantekening: null,
			Afgerond: false,
			Vakken: null,
			Docenten: null,
			Links: null,
			Id: 0,
			Lokalen: null,
			Groepen: null,
			OpdrachtId: 0,
		}

		return this._privileges.needs('afspraken', 'create')
		.then(() => this.http.post(`${this._personUrl}/afspraken`, payload))
	}

	/**
	 * @param {Integer} [parentId = 0]
	 * @returns {Promise<FileFolder[]>}
	 */
	fileFolders(parentId = 0) {
		return this._privileges.needs('bronnen', 'read')
		.then(() => {
			let url = `${this._personUrl}/bronnen?soort=0`
			if (parentId !== 0) {
				url += `&parentId=${parentId}`
			}

			return this.http.get(url)
		})
		.then(res => res.json())
		.then(res => {
			return res.Items.filter(item => ![ 0, 1, 2, 4 ].includes(item.Type)).map(f => new FileFolder(this, f))
		})
	}

	/**
	 * @returns {Promise<MessageFolder[]>}
	 */
	messageFolders() {
		return this._privileges.needs('berichten', 'read')
		.then(() => this.http.get(`${this._personUrl}/berichten/mappen`))
		.then(res => res.json())
		.then(res => res.Items.map(m => new MessageFolder(this, m)))
	}

	/**
	 * @param {string} query
	 * @param {string} [type]
	 * @returns {Promise<Person[]>}
	 */
	persons(query, type) {
		query = query != null ? query.trim() : ''

		if (query.length < 3) {
			return Promise.resolve([])
		} else if (type == null) {
			return Promise.all([
				this.persons(query, 'teacher'),
				this.persons(query, 'pupil'),
			]).then(([ teachers, pupils ]) => teachers.concat(pupils))
		}

		type = ({
			'teacher': 'Personeel',
			'pupil': 'Leerling',
			'project': 'Project',
		})[type] || 'Overig'
		query = query.replace(/ +/g, '+')

		const url = `${this._personUrl}/contactpersonen?contactPersoonType=${type}&q=${query}`

		return this._privileges.needs('contactpersonen', 'read')
		.then(() => this.http.get(url))
		.then(res => res.json())
		.then(res => res.Items.map(p => {
			p = new Person(this, p)
			p._filled = true
			return p
		}))
	}

	/**
	 * @returns {Promise<SchoolUtility[]>}
	 */
	schoolUtilities() {
		const url = `${this._personUrl}/lesmateriaal`

		return this._privileges.needs('digitaallesmateriaal', 'read')
		.then(() => this.http.get(url))
		.then(res => res.json())
		.then(res => res.Items.map(u => new SchoolUtility(this, u)))
	}

	/**
	 * Logins to Magister.
	 * @param {boolean} [forceLogin=false] Force a login, even when a tokenSet
	 * is in the options object.
	 * @returns {Promise<string>} A promise that resolves when done logging in.
	 */
	async login(forceLogin = false) {
		const options = this._options
		const school = this.school
		const tenant = school.tenant
		this.authManager = new AuthManager(tenant, options.tokenSet)

		const retrieveAccount = async () => {
			const accountData =
				await this.http.get(`${school.url}/api/account`).then(res => res.json())
			const id = accountData.Persoon.Id

			this._personUrl = `${school.url}/api/personen/${id}`
			this._pupilUrl = `${school.url}/api/leerlingen/${id}`

			this._privileges = new Privileges(this, accountData.Groep[0].Privileges)
			// REVIEW: do we want to make profileInfo a function?
			this.profileInfo = new ProfileInfo(
				this,
				accountData.Persoon,
				await this._privileges.can('kinderen', 'read'),
			)
		}

		if (options.tokenSet && !forceLogin) {
			this.authManager.tokenSet = options.tokenSet
			await this.authManager.checkExpiration()
			.catch(error => {
				throw new AuthError(error)
			})
		} else {
			await this.authManager.login(options.username, options.password)
			.catch(error => {
				throw new AuthError(error)
			})
		}

		return await retrieveAccount()
	}
}

/**
 * Create a new Magister object using `options`.
 * @param {Object} options
 * 	@param {School} options.school The school to login to.
 * 	@param {string} [options.username] The username of the user to login to.
 * 	@param {string} [options.password] The password of the user to login to.
 * 	@param {string} [options.token] The Bearer token to use. (instead of the username and password)
 * 	@param {boolean} [options.keepLoggedIn=true] Whether or not to keep the user logged in.
 * 	@param {boolean} [options.login=true] Whether or not to call {@link login} before returning the object.
 * 	@param {string} [options.authCode=AuthCode] The AuthCode that Magister uses in their
 * 	requests. Per default we use the value from the @magisterjs/authcode
 * 	package. Which you should keep up-to-date.
 * @returns {Promise<Magister>}
 */
export default function magister(options) {
	_.defaults(options, {
		keepLoggedIn: true,
		login: true,
		authCode: AuthCode,
	})
	const rej = s => Promise.reject(new Error(s))

	if (!(
		options.school &&
		(options.tokenSet || (options.username && options.password))
	)) {
		return rej('school and username&password or tokenSet are required.')
	}

	if (!_.isObject(options.school)) {
		return rej('school is not an object')
	} else if (!_.isString(options.school.url)) {
		return rej('`school.url` is not a string')
	}

	return Promise.resolve().then(() => {
		const m = new Magister(options, options.school, new Http())

		return options.login ?
			m.login().then(() => m) :
			m
	})
}

/**
 * Get the schools matching `query`.
 * @param {string} query
 * @returns {Promise<School[]>}
 */
export function getSchools(query) {
	query = query.replace(/\d/g, '')
	query = query.trim()
	query = query.replace(/ +/g, '+')

	if (query.length < 3) {
		return Promise.resolve([])
	}

	return fetch(`https://mijn.magister.net/api/schools?filter=${query}`)
	.then(res => res.json())
	.then(schools => schools.map(school => new School(school)))
}

/**
 * The version of the library.
 * @type {String}
 * @readonly
 */
export const VERSION = __VERSION__
export {
	AbsenceInfo,
	Activity,
	ActivityElement,
	AddressInfo,
	Appointment,
	Assignment,
	AssignmentVersion,
	AuthError,
	Class,
	Course,
	File,
	FileFolder,
	Grade,
	GradePeriod,
	GradeType,
	Magister,
	Message,
	MessageFolder,
	Person,
	Privileges,
	ProfileInfo,
	ProfileSettings,
	School,
	SchoolUtility,
	VersionInfo,
}
