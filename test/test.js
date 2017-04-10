'use strict'

import chai, { expect } from 'chai'
import magister, * as magisterjs from '../src/magister'
import * as util from '../src/util'

chai.use(require('chai-stream'))
chai.use(require('chai-as-promised'))

const options = {
	isParent: false,
	school: {},
	username: undefined,
	password: undefined,
}
try {
	const parsed = require('./options.json')
	const isParent = parsed.parent != null
	const { school, username, password } = parsed[isParent ? 'parent' : 'child']

	options.isParent = isParent
	options.school = school
	options.username = username
	options.password = password
} catch (e) { // For Travis CI we use environment variables.
	options.isParent = process.env.TEST_ISPARENT
	options.school.url = process.env.TEST_SCHOOLURL
	options.username = process.env.TEST_USERNAME
	options.password = process.env.TEST_PASSWORD
}
if (!options.school.url || !options.username || !options.password) {
	throw new Error('No login information found.')
}

/*
	To use this test, create a file in this folder called options.json with as
	content (fill in your information):

		{
			"child": {
				"school": {
					"url": "https://<schoolname>.magister.net"
				},
				"username": "<username>",
				"password": "<password>"
			}
		}

	"child" can also be replaced with "parent" if your account is a parent account.

	Instead of this JSON file you can also use the environment variables
	TEST_SCHOOLURL, TEST_USERNAME, TEST_PASSWORD, TEST_ISPARENT.
*/

describe('Magister', function() {
	let m, personPromise
	this.timeout(15000)

	before(function () {
		return magister(options)
		.then(obj => {
			return options.isParent ?
				obj.children().then(children => children[0]) :
				obj
		})
		.then(obj => {
			// TODO : this doesn't work actually, we need something better than
			// this.

			// don't fail the tests when stuff isn't allowed on users
			obj._privileges.needs = function (thing, action) {
				if (obj._privileges.can(thing, action)) {
					return Promise.resolve()
				} else {
					return {
						then: function () {}, // eslint-disable-line no-empty-function
						catch: function () {}, // eslint-disable-line no-empty-function
					}
				}
			}

			m = obj
		})
	})

	it('should check if given school url is correct', function () {
		return expect(magister({
			school: {
				url: 'adelbert',
			},
			username: 'xxx',
			password: 'xxx',
		})).to.be.rejectedWith(/correct magister url/)
	})

	it('should throw an AuthError when an authentication error occurs', function () {
		return expect(magister({
			...options,
			username: 'xxx',
			password: 'xxx',
		})).to.be.rejectedWith(magisterjs.AuthError)
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
				expect(r).to.be.an.instanceof(magisterjs.VersionInfo)
			})
		})
	})

	describe('profileInfo', function () {
		it('should correctly fetch profileInfo', function () {
			expect(m.profileInfo).to.be.an.instanceof(magisterjs.ProfileInfo)
		})

		it('should correctly fetch the profile picture', function () {
			return m.profileInfo.getProfilePicture()
			.then(stream => {
				expect(stream).to.be.a.ReadableStream
				return expect(stream).to.end
			})
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

	describe('activity', function () {
		// TODO: add test for `ActivityElement#signup`

		it('should fetch activities and parts', function () {
			return m.activities().then(r => {
				expect(r).to.be.an('array')

				for (const activity of r) {
					expect(activity).to.be.an.instanceof(magisterjs.Activity)
				}

				return r[0] == null ? [] : r[0].elements()
			}).then(r => {
				expect(r).to.be.an('array')
				for (const element of r) {
					expect(element).to.be.an.instanceof(magisterjs.ActivityElement)
				}
			})
		})
	})

	// TODO: add tests for fillPersons option
	describe('appointment', function () {
		it('should fetch appointments', function () {
			return m.appointments(new Date()).then(r => {
				expect(r).to.be.an('array')

				for (const appointment of r) {
					expect(appointment).to.be.an.instanceof(magisterjs.Appointment)
					expect(appointment.teachers).to.be.a('array')
				}

				return r[0] == null ? [] : r[0].attachments()
			}).then(r => {
				expect(r).to.be.an('array')
				for (const file of r) {
					expect(file).to.be.an.instanceof(magisterjs.File)
				}
			})
		})

		it('should be able to mark appointments as done', function () {
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
			const description = 'magister.js test appointment'

			return m.createAppointment({
				start: now,
				end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
				description,
			}).then(() => {
				return m.appointments(now).then(r => {
					const appointment = r.find(a => a.description === description)
					expect(appointment).to.exist
					return appointment.remove()
				})
			})
		})
	})

	describe('assignment', function () {
		it('should correctly get assignments and assignment parts', function () {
			return m.assignments()
			.then(r => {
				expect(r).to.be.an('array')
				for (const a of r) {
					expect(a).to.be.an.instanceof(magisterjs.Assignment)
				}

				return r[0] == null ? [] : r[0].versions()
			})
			.then(r => {
				expect(r).to.be.an('array')
				for (const v of r) {
					expect(v).to.be.an.instanceof(magisterjs.AssignmentVersion)
				}
			})
		})
	})

	describe('course', function () {
		it('should correctly get courses and classes', function () {
			return m.courses()
			.then(r => {
				expect(r).to.be.an('array')
				for (const c of r) {
					expect(c).to.be.an.instanceof(magisterjs.Course)
				}
				return r.find(c => c.current).classes()
			}).then(r => {
				expect(r).to.be.an('array')
				for (const c of r) {
					expect(c).to.be.an.instanceof(magisterjs.Class)
				}
			})
		})
	})

	describe('schoolUtility', function () {
		it('should get schoolUtilities', function () {
			return m.schoolUtilities()
			.then(r => {
				expect(r).to.be.an('array')
				for (const u of r) {
					expect(u).to.be.an.instanceof(magisterjs.SchoolUtility)
					expect(u.class).to.be.an.instanceof(magisterjs.Class)
				}
			})
		})
	})

	describe('file', function () {
		it('should download files', function () {
			return m.fileFolders()
			.then(folders => {
				expect(folders).to.be.an('array')
				for (const f of folders) {
					expect(f).to.be.an.instanceof(magisterjs.FileFolder)
				}

				return folders[0].files(false)
			})
			.then(files => {
				expect(files).to.be.an('array')
				for (const f of files) {
					expect(f).to.be.an.instanceof(magisterjs.File)
				}

				return files[0].download()
			})
			.then(stream => {
				expect(stream).to.be.a.ReadableStream
				return expect(stream).to.end
			})
		})
	})

	describe('grade', function () {
		it('should correctly get grades', function () {
			return m.courses()
			.then(res => res.find(c => c.current))
			.then(c => c.grades({
				fillGrades: false,
			}))
			.then(r => {
				expect(r).to.be.a('array')

				for (const g of r) {
					expect(g).to.be.an.instanceof(magisterjs.Grade)
				}

				const grade = r[0]
				if (grade != null) {
					return grade.fill()
					.then(r => expect(r).to.be.an.instanceof(magisterjs.Grade))
				}
			})
		})
	})

	describe('person', function () {
		it('should handle empty queries correctly', function () {
			return Promise.all([
				m.persons(''),
				m.persons('    '),
				m.persons(null),
				m.persons(undefined),
			]).then(arrays => {
				for (const arr of arrays) {
					expect(arr).to.be.an('array')
					expect(arr).to.have.length(0)
				}
			})
		})

		it('should get persons', function () {
			personPromise = m.persons(m.profileInfo.firstName)
			return personPromise.then(r => {
				expect(r).to.be.an('array')
				expect(r).to.not.be.empty

				expect(r[0]).to.be.an.instanceof(magisterjs.Person)
				expect(r[0].type).to.equal('person')
			})
		})

		it('should convert types correctly', function () {
			const person = new magisterjs.Person(m, {})

			expect(person.type).to.equal('unknown')

			person.type = 'person'
			expect(person.type).to.equal('person')
			expect(person._type).to.equal(3)
		})

		it('should fail to set incorrect types', function () {
			const person = new magisterjs.Person(m, {})
			expect(function () {
				person.type = 'foo'
			}).to.throw(Error)
		})
	})

	describe('messageFolder', function () {
		it('should fetch messageFolders', function () {
			return m.messageFolders().then(r => {
				for (const f of r) {
					expect(f).to.be.an.instanceof(magisterjs.MessageFolder)
				}

				const inbox = r.find(f => f.type === 'inbox')
				expect(inbox).to.exist
			})
		})
	})

	describe('message', function () {
		const body = Date.now().toString()
		let messageSentPromise
		let messageRetrievedPromise

		it('should send messages', function () {
			messageSentPromise = personPromise.then(p => {
				const message = new magisterjs.Message(m)
				message.subject = 'magister.js mocha tests'
				message.body = body
				message.addRecipient(p)
				return message.send()
			})

			return messageSentPromise.then(r => {
				expect(r).to.be.an.instanceof(magisterjs.Message)
				expect(r.body).to.equal(body)
			})
		})

		it('should retrieve messages', function () {
			messageRetrievedPromise = messageSentPromise
			.then(() => m.messageFolders())
			.then(r => r.find(f => f.type === 'inbox'))
			.then(f => f.messages({
				limit: 1,
				skip: 0,
				readState: 'all',
				fillPersons: false,
				fill: true,
			}))
			.then(r => {
				expect(r).to.be.an('object')

				expect(r.totalCount).to.be.a('number')
				expect(r.messages).to.be.an('array')

				expect(r.messages).to.not.be.empty
				expect(r.messages[0]).to.be.an.instanceof(magisterjs.Message)
				expect(r.messages[0].body).to.equal(body)

				return r.messages[0]
			})

			return messageRetrievedPromise
		})

		it('should create reply messages', function () {
			return messageRetrievedPromise.then(m => {
				const msg = m.createReplyMessage()
				expect(msg.subject).to.equal(`RE: ${m.subject}`)
				expect(msg).to.be.an.instanceof(magisterjs.Message)
			})
		})

		it('should be able to mark messages as read', function () {
			return messageRetrievedPromise.then(m => {
				m.isRead = true
				return m.saveChanges()
			})
		})

		it('should be able to remove messages', function () {
			return messageRetrievedPromise.then(m => m.remove())
		})

		it('should retrieve messages with fill=false', function () {
			return m.messageFolders()
			.then(r => r[0].messages({
				limit: 1,
				fill: false,
			}))
			.then(r => {
				expect(r).to.be.an('object')
			})
		})
	})
})

describe('util', function () {
	it('should clone class instances', function () {
		const a = new magisterjs.School({ Name: 'kaas' })
		const b = util.cloneClassInstance(a)

		expect(b).to.be.an.instanceof(magisterjs.School)
		expect(b.name).to.equal(a.name)
	})

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
