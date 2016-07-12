'use strict'

import { expect } from 'chai'
import magister, { Magister, getSchools } from '../src/magister'
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
	To use this test:
		Create a file in this folder called options.json with as content (fill in your information):

		{
			"school": {
				"url": "https://<schoolname>.magister.net"
			},
			"username": "<username>",
			"password": "<password>"
		}
*/

describe('Magister', function() {
	let m
	this.timeout(7000)

	before(function () {
		return magister(options).then(function (obj) {
			m = obj
		})
	})

	it('should expose an correct Magister object', function () {
		expect(m).to.be.an.instanceof(Magister)
	})

	it('should correctly fetch privileges', function () {
		expect(m._can('aanmeldingen', 'read')).to.be.true
		expect(m._can('foo', 'bar')).to.be.false
	})

	describe('schools', function () {
		it('should find schools', function () {
			return getSchools('adelbert')
			.then(function (res) {
				const found = res.some((school) => school.name == 'Adelbert College')
				expect(found).to.be.true
			})
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

	describe('dates', function () {
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
