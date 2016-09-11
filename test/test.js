'use strict'

import { expect } from 'chai'
import magister, * as magisterjs from '../src/magister'
import * as util from '../src/util'

let options = { school: {} }
try {
	options = require('./options.json')
} catch (e) { // For Travis CI we use environment variables.
	options.school.url = process.env.TEST_SCHOOLURL
	options.userName = process.env.TEST_USERNAME
	options.password = process.env.TEST_PASSWORD
}
if (!options.school.url || !options.username || !options.password) {
	throw new Error('No login information found.')
}

/*
	To use this test, create a file in this folder called options.json with as
	content (fill in your information):

		{
			"school": {
				"url": "https://<schoolname>.magister.net"
			},
			"username": "<username>",
			"password": "<password>"
		}

	Or use the environment variables TEST_SCHOOLURL, TEST_USERNAME,
	TEST_PASSWORD.
*/

describe('Magister', function() {
	let m, personPromise
	this.timeout(7000)

	before(function () {
		return magister(options).then(function (obj) {
			// don't fail the tests when stuff isn't allowed on users
			obj._privileges.needs = function (thing, action) {
				if (obj._privileges.can(thing, action)) {
					return Promise.resolve()
				} else {
					return {
						then: function () {},
						catch: function () {},
					}
				}
			}

			m = obj
		})
	})

	it('should expose an correct Magister object', function () {
		expect(m).to.be.an.instanceof(magisterjs.Magister)
	})

	it('should correctly fetch privileges', function () {
		expect(m._privileges.can('Profiel', 'read')).to.be.true
		expect(m._privileges.can('foo', 'bar')).to.be.false

		return m._privileges.needs('profiel', 'read')
	})

	describe('school', function () {
		it('should find schools', function () {
			return magisterjs.getSchools('adelbert')
			.then(function (res) {
				const found = res.some(school => school.name === 'Adelbert College')
				expect(found).to.be.true
				expect(res[0]).to.be.an.instanceof(magisterjs.School)
			})
		})

		it('should get version info', function () {
			return m.school.versionInfo().then(r => {
				expect(r).to.be.an('object')
			})
		})
	})

	describe('profileInfo', function () {
		it('should correctly fetch profileInfo', function () {
			expect(m.profileInfo).to.be.an.instanceof(magisterjs.ProfileInfo)
			expect(m.profileInfo.getProfilePictureUrl()).to.be.a('string')
		})

		it('should fetch address info', function () {
			return m.profileInfo.address().then(r => {
				expect(r).to.be.an.instanceof(magisterjs.AddressInfo)
			})
		})

		it('should fetch profile settings', function () {
			return m.profileInfo.settings().then(r => {
				expect(r).to.be.an.instanceof(magisterjs.ProfileSettings)
			})
		})
	})

	describe('appointment', function () {
		it('should fetch appointments', function () {
			return m.appointments(new Date()).then(r => {
				expect(r).to.be.a('array')

				for (const appointment of r) {
					expect(appointment).to.be.an.instanceof(magisterjs.Appointment)
					expect(appointment.teachers).to.be.a('array')
				}
			})
		})

		it('should be able to mark appointments as ready', function () {
			return m.appointments(new Date()).then(r => {
				expect(r).to.be.a('array')
				if (r[0] != null) {
					expect(r[0]).to.be.an.instanceof(magisterjs.Appointment)
					expect(r[0]).to.have.a.property('isDone').be.a('boolean')

					const initial = r[0].isDone
					const toggle = function () {
						r[0].isDone = !r[0].isDone
						return r[0].saveChanges()
					}

					return toggle()
					.then(toggle)
					.then(() => {
						expect(r[0].isDone).to.equal(initial)
					})
				}
			})
		})

		it('should be able to create appointments and delete them', function () {
			const now = new Date()
			return m.createAppointment({
				start: now,
				end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
				name: 'magister.js test appointment',
			}).then(r => {
				expect(r).to.be.an.instanceof(magisterjs.Appointment)
				return r.remove()
			})
		})
	})

	describe('course', function () {
		it('should correctly get courses', function () {
			return m.courses()
			.then(r => {
				expect(r).to.be.an('aray')
			})
		})

		it('should correctly get the current course', function () {
			return Promise.all([
				m.currentCourse(),
				m.courses().then(r => r[0]),
			]).then(([ curr, first ]) => {
				if (curr !== undefined) {
					expect(curr.id).to.equal(first.id)
				}
			})
		})
	})

	describe('grade', function () {
		it('should correctly get grades', function () {
			return m.currentCourse()
			.then(r => {
				return r.grades({
					fillPersons: false,
					fillGrade: false,
					onlyRecent: false,
				})
			})
			.then(r => {
				expect(r).to.be.a('array')

				for (const g in r) {
					expect(g).to.be.an.instanceof(magisterjs.Grade)
				}

				const grade = r[0]
				if (grade != null) {
					return grade.fillGrade()
					.then(r => expect(r).to.be.an.instanceof(magisterjs.Grade))
				}
			})
		})
	})

	describe('person', function () {
		it('should handle empty queries correctly', function () {
			return Promise.all([
				m.getPersons(''),
				m.getPersons('    '),
				m.getPersons(null),
				m.getPersons(undefined),
			]).then(arrays => {
				for (const arr of arrays) {
					expect(arr).to.be.an('array')
					expect(arr).to.have.length(0)
				}
			})
		})

		it('should get persons', function () {
			personPromise = m.getPersons(m.profileInfo.firstName)
			.then(r => {
				expect(r).to.be.an('array')
				expect(r).to.not.be.empty

				expect(r[0]).to.be.an.instanceof(magisterjs.Person)
				expect(r[0].type).to.equal('person')
			})

			return personPromise
		})

		it('should convert types correctly', function () {
			const person = new magisterjs.Person(m, {})

			expect(person.type).to.equal('unknown')

			person.type = 'person'
			expect(person.type).to.equal('person')
			expect(person._type).to.equal(3)
		})
	})

	describe('messageFolder', function () {
		it('should fetch messageFolders', function () {
			return m.messageFolders().then(r => {
				for (const folder in r) {
					expect(folder).to.be.an.instanceof(magisterjs.MessageFolder)
				}

				const inbox = r.find(f => f.type === 'inbox')
				expect(inbox).to.exist
			})
		})
	})

	describe('message', function () {
		const body = Date.now().toString()
		let messagePromise

		it('should send messages', function () {
			return personPromise
			.then(p => m.composeAndSendMessage('magister.js mocha tests', body, [ p ]))
			.then(r => {
				expect(r).to.be.an.instanceof(magisterjs.Message)
				expect(r.body).to.equal(body)
			})
		})

		it('should retrieve messages', function () {
			messagePromise = m.messageFolders()
			.then(r => r.find(f => f.type === 'inbox'))
			.then(f => f.messages({
				limit: 1,
				skip: 0,
				readState: 'all',
				fillPersons: false,
				fill: true,
			}))
			.then(r => {
				expect(r).to.be.a('array')
				expect(r).to.not.be.empty

				expect(r[0]).to.be.an.instanceof(magisterjs.Message)
				expect(r[0].body).to.equal(body)

				return r[0]
			})

			return messagePromise
		})

		it('should be able to remove messages', function () {
			return messagePromise
			.then(m => m.remove())
		})
	})
})

describe('util', function () {
	describe('html stripping', function () {
		it('should strip html tags', function () {
			const a = '<p syle="font-size: 10px">kaas</p>'
			const b = 'kaas'
			expect(util.cleanHtmlContent(a)).to.equal(b)
		})

		it('should convert nonbreaking spaces to normal spaces', function () {
			const a = 'kaas&nbsp;swag'
			const b = 'kaas swag'
			expect(util.cleanHtmlContent(a)).to.equal(b)
		})
	})

	describe('date', function () {
		it('should be able to get the date of a Date object', function () {
			const a = new Date(2016, 4, 20, 13, 37, 69)
			const b = new Date(2016, 4, 20)
			expect(util.date(a).getTime()).to.equal(b.getTime())
		})

		it('should correctly convert a date to Magister\'s url format', function () {
			const a = new Date(2016, 3, 22)
			const b = '2016-04-22'
			expect(util.urlDateConvert(a)).to.equal(b)
		})

		it('should parse dates correctly', function () {
			expect(util.parseDate('2016-01-01')).to.be.a('Date')
			expect(util.parseDate('jkdsjfds')).to.be.undefined
		})
	})
})
