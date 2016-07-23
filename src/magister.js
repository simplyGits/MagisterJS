'use strict'

import _ from 'lodash'
import Http from './http'
import fetch from 'node-fetch'
import School from './school'
import ProfileInfo from './profileInfo'
import Privileges from './privileges'
import Person from './person'

// TODO: add nice warnings when trying to do stuff while not logged in yet

/**
 * Class to communicate with Magister.
 * @class Magister
 * @constructor
 * @param {Object} options
 * @param {School} school
 * @param {Http} http
 */
export class Magister {
	constructor(options, school, http) {
		this._options = options
		this.school = _.extend(new School({}), school)
		this.http = http
	}

	/**
	 * Logins to Magister.
	 * @param {Boolean} [forceNew=false]
	 * @return {Promise<String>} A promise that resolves when done logging in. With the current session ID as parameter.
	 */
	login(forceNew = false) {
		const setSessionId = sessionId => {
			const cookie = `SESSION_ID=${sessionId}; M6UserName=${this._options.username}`
			this.http._cookie = cookie
			return sessionId
		}

		const options = this._options
		const baseUrl = this.school.url.replace(/^https?/, 'https')
		const deleteUrl = `${baseUrl}/api/sessies/huidige`
		const postUrl = `${baseUrl}/api/sessies`

		let promise
		if (!forceNew && options.sessionId) {
			promise = Promise.resolve(options.sessionId)
		} else {
			promise = this.http.delete(deleteUrl).then(r => {
				setSessionId(/[a-z\d-]+/.exec(r.headers.get('set-cookie'))[0])

				return this.http.post(postUrl, {
					Gebruikersnaam: options.username,
					Wachtwoord: options.password,
					IngelogdBlijven: options.keepLoggedIn,
				})
			}).then(r => {
				return setSessionId(/[a-z\d-]+/.exec(r.headers.get('set-cookie'))[0])
			})
		}

		return promise
		.then(setSessionId)
		.then(sessionId => {
			return this.http.get(`${baseUrl}/api/account`)
			.then(res => res.json())
			.then(res => {
				const id = res.Persoon.Id

				this.profileInfo = new ProfileInfo(this, res.Persoon)

				this._privileges = new Privileges(this, res.Groep[0].Privileges)
				this._personUrl = `${baseUrl}/api/personen/${id}`
				this._pupilUrl = `${baseUrl}/api/leerlingen/${id}`

				return sessionId
			})
		})
	}
}

/**
 * @method magister
 * @param {Object} options
 * @return {Promise<Error|Magister>}
 */
export default function magister (options) {
	_.defaults(options, {
		keepLoggedIn: true,
		login: true,
	})

	if (!
		(options.school &&
		(options.sessionId || (options.username && options.password)))
	) {
		return Promise.reject(new Error('school, username and password are required.'))
	}

	const http = new Http()

	const m = new Magister(options, options.school, http)
	if (options.login) {
		return m.login().then(() => m)
	} else {
		return Promise.resolve(m)
	}
}

/**
 * @method getSchools
 * @param {String} query
 * @return {Promise<Error|School>}
 */
export function getSchools (query) {
	query = query.replace(/\d/g, '').trim()

	if (query.length < 3) {
		return Promise.resolve([])
	}

	const url = `https://mijn.magister.net/api/schools?filter=${query}`
	return fetch(url)
	.then(res => res.json())
	.then(function (schools) {
		return schools.map(school => new School(school))
	})
}

export const VERSION = __VERSION__
export {
	School,
	ProfileInfo,
	Privileges,
	Person,
}
