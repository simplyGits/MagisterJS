'use strict'

import _ from 'lodash'
import Http from './http'
import fetch from 'node-fetch'
import School from './school'
import ProfileInfo from './profileInfo'

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
		this.school = school
		this.http = http
	}

	/**
	 * Logins to Magister.
	 * @return {Promise<String>} A promise that resolves when done logging in.  With the current session ID as parameter.
	 */
	login() {
		const setSessionId = (sessionId) => {
			const cookie = `SESSION_ID=${sessionId}; M6UserName=${this._options.username}`
			this.http._cookie = cookie
			return sessionId
		}

		const options = this._options
		const baseUrl = this.school.url.replace(/^https?/, 'https')
		const deleteUrl = `${baseUrl}/api/sessies/huidige`
		const postUrl = `${baseUrl}/api/sessies`

		let promise
		if (options.sessionId) {
			promise = Promise.resolve(options.sessionId)
		} else {
			promise = this.http.delete(deleteUrl).then((r) => {
				setSessionId(/[a-z\d-]+/.exec(r.headers.get('set-cookie'))[0])

				return this.http.post(postUrl, {
					Gebruikersnaam: options.username,
					Wachtwoord: options.password,
					IngelogdBlijven: options.keepLoggedIn,
				})
			}).then((r) => {
				return setSessionId(/[a-z\d-]+/.exec(r.headers.get('set-cookie'))[0])
			})
		}

		return promise
		.then(setSessionId)
		.then((sessionId) => {
			return this.http.get(`${baseUrl}/api/account`)
			.then((res) => res.json())
			.then((res) => {
				const id = res.Persoon.Id

				this._privileges = res.Groep[0].Privileges
				this._profileInfo = new ProfileInfo(this, res.Persoon)
				this._personUrl = `${baseUrl}/api/personen/${id}`
				this._pupilUrl = `${baseUrl}/api/leerlingen/${id}`

				return sessionId
			})
		})
	}

	/**
	 * @method _can
	 * @param {String} thing
	 * @param {String} action
	 * @return {Boolean}
	 */
	_can(thing, action) {
		thing = thing.toLowerCase()
		action = action.toLowerCase()

		return this._privileges.some((x) => {
			return (
				x.Naam.toLowerCase() === thing &&
				x.AccessType.some((a) => a.toLowerCase() === action)
			)
		})
	}
}

/**
 * @method magister
 * @param {Object} options
 * @return {Promise<Magister>}
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

	/*
	return new Promise(function (resolve, reject) {
		if (_.isString(options.school)) {
			return School
				.getSchools(options.school)
				.then((r) => {
					if (r.length === 0) {
						reject(new Error(`No school with the query ${options.school} found.`))
					} else {
						resolve(r[0])
					}
				})
		} else {
			resolve(options.school)
		}
	}).then(function (school) {
		const m = new Magister(options, school, http)
		if (options.login) {
			return m.login().then(() => m)
		} else {
			return m
		}
	})
	*/
}

/**
 * @method getSchools
 * @param {String} query
 * @return {Promise<School>}
 */
export function getSchools (query) {
	query = query.replace(/\d/g, '').trim()

	if (query.length < 3) {
		return Promise.resolve([])
	}

	const url = `https://mijn.magister.net/api/schools?filter=${query}`
	return fetch(url)
	.then((res) => res.json())
	.then(function (schools) {
		return schools.map((school) => new School(school))
	})
}

export const VERSION = '2.0.0-alpha'
export * from './profileInfo'
