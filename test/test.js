/* global describe, it, before */

'use strict';

var expect = require('chai').expect;

var magisterjs = require('../');
var Magister = magisterjs.Magister;
var Message = magisterjs.Message;
var ProfileInfo = magisterjs.ProfileInfo;
var Appointment = magisterjs.Appointment;
var MagisterSchool = magisterjs.MagisterSchool;
var File = magisterjs.File;
var Grade = magisterjs.Grade;
var GradePeriod = magisterjs.GradePeriod;
var Person = magisterjs.Person;
var DigitalSchoolUtility = magisterjs.DigitalSchoolUtility;
var Class = magisterjs.Class;
var AddressInfo = magisterjs.AddressInfo;
var ProfileSettings = magisterjs.ProfileSettings;
var Helpers = magisterjs._helpers;

var options = null;

try {
	options = require('./options.json');
} catch (e) { // For Travis CI we use environment variables.
	options = { school: {} };

	options.school.url = process.env.TEST_SCHOOLURL;
	options.username = process.env.TEST_USERNAME;
	options.password = process.env.TEST_PASSWORD;
}
if (options.school.url == null || options.username == null || options.password == null) {
	throw new Error('No login information found.');
}

/*
	To use this test:
		Create a file in this folder called testOptions.json with as content (fill in your information):

		{
			'school': {
				'url': 'https://<schoolname>.magister.net'
			},
			'username': '<username>',
			'password': '<password>'
		}
*/

describe('Magister', function() {
	this.timeout(7000);

	var m;
	before(function (done) {
		new Magister({
			school: options.school,
			username: options.username,
			password: options.password,
		}).ready(function (e) {
			m = this;
			done(e);
		});
	});

	it('should be a correct Magister object', function () {
		expect(m).to.be.an.instanceof(Magister);
		expect(m).to.have.a.property('ready').be.a('function');

		expect(m).to.have.a.property('magisterSchool').be.an.instanceof(MagisterSchool);
		expect(m).to.have.a.property('magisterSchool').to.have.a.property('url');
	});

	describe('profileInfo', function () {
		it('should contain profileInfo', function () {
			expect(m.profileInfo()).to.be.a('object');
			expect(m.profileInfo()).to.be.an.instanceof(ProfileInfo);
			expect(m.profileInfo().profilePicture()).to.be.a('string');
		});

		it('should fetch address info', function (done) {
			m.profileInfo().address(function (e, r) {
				expect(e).to.not.exist;
				expect(r).to.be.an.instanceof(AddressInfo);
				done();
			});
		});

		it('should fetch profile settings', function (done) {
			m.profileInfo().settings(function (e, r) {
				expect(e).to.not.exist;
				expect(r).to.be.an.instanceof(ProfileSettings);
				done();
			});
		});
	});

	describe('messages', function () {
		it('should search messageFolders correctly', function () {
			expect(
				m.messageFolders('postvak in')[0].id() ===
				m.messageFolders('mededelingen')[0].id()
			).to.be.false;
		});

		it('should send messages and retreive them', function (done) {
			this.timeout(10000);
			var body = '' + ~~(Math.random() * 100);
			m.composeAndSendMessage('Magister.js mocha test.', body, [m.profileInfo().firstName()], function (e, r) {
				expect(e).to.not.exist;
				expect(r).to.be.an.instanceof(Message);

				m.inbox().messages({
					limit: 1,
					skip: 0,
					readState: 'all',
					fillPersons: false,
					fill: true,
				}, function (e, r) {
					expect(e).to.not.exist;
					expect(r).to.be.a('array');
					expect(r).to.not.be.empty;

					expect(r[0]).to.be.an.instanceof(Message);
					expect(r[0].body()).to.equal(body);

					r[0].remove(done);
				});
			});
		});
	});

	describe('courses', function () {
		it('should correctly get the limited current course', function (done) {
			m.getLimitedCurrentCourseInfo(function (e, r) {
				expect(r).to.be.a('object');
				done(e);
			});
		});

		it('should correctly get courses', function (done) {
			m.courses(function (e, r) {
				expect(e).to.not.exist;
				expect(r).to.be.a('array');
				var course = r[0];

				m.currentCourse(function (e, r) {
					expect(r.id()).to.equal(course.id());
					done(e);
				});
			});
		});
	});

	describe('appointments', function () {
		it('should give appointments', function (done) {
			m.appointments(new Date(), false, function(e, r) {
				expect(e).to.not.exist;
				expect(r).to.be.a('array');

				r.forEach(function (appointment) {
					expect(appointment).to.be.an.instanceof(Appointment);
					expect(appointment.teachers()).to.be.a('array');
				});

				done();
			});
		});

		it('should be able to mark appointments as ready', function (done) {
			m.appointments(new Date(), false, function(e, r) {
				expect(e).to.not.exist;
				expect(r).to.be.a('array');
				if (r[0] != null) {
					expect(r[0]).to.be.an.instanceof(Appointment);
					expect(r[0]).to.have.a.property('isDone').be.a('function');

					r[0].isDone(true);
					r[0].isDone(false);
				}
				done();
			});
		});

		it('should be able to create appointments and delete them', function (done) {
			var now = new Date();
			m.createAppointment({
				start: now,
				end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
				name: 'magister.js test appointment',
			}, function (e, r) {
				expect(e).to.not.exist;
				expect(r).to.be.an.instanceof(Appointment);
				r.remove(done);
			});
		});
	});

	describe('files', function () {
		it('should download files', function (done) {
			m.fileFolders(function (error, result) {
				expect(error).to.not.exist;
				result[0].files(function (error, result) {
					expect(error).to.not.exist;
					result[0].download(false, function(e, r) {
						expect(e).to.not.exist;
						expect(r).to.be.a('string');
						done();
					});
				});
			});
		});

		it('should download attachments', function (done) {
			m.inbox().messages(function(e, r) {
				expect(r[0].attachments()).to.be.a('array');
				var foundAttachment = false;

				for (var i = 0; i < r.length; i++) {
					var msg = r[i];

					if (msg.attachments().length > 0) {
						foundAttachment = true;
						var attachment = msg.attachments()[0];

						expect(attachment).to.be.an.instanceof(File);
						expect(attachment.download(false, function(e, r) {
							expect(r).to.be.a('string');
							done(e);
						}));
						break;
					}
				}
				if (!foundAttachment) done();
			});
		});
	});

	describe('grades', function () {
		it('should correctly get grades', function (done) {
			m.currentCourse(function (e, r) {
				if (e != null) { // case covered by 'should correctly get courses'.
					done();
				} else {
					r.grades(false, false, false, function (e, r) {
						expect(e).to.not.exist;
						expect(r).to.be.a('array');

						r.forEach(function (g) {
							expect(g).to.be.an.instanceof(Grade);
						});

						var grade = r[0];
						if (grade) {
							grade.fillGrade(function (e, r) {
								expect(r).to.be.an.instanceof(Grade);
								done(e);
							});
						} else {
							done();
						}
					});
				}
			});
		});

		it('should correctly get gradePeriods', function (done) {
			m.currentCourse(function (e, r) {
				if (e != null) { // case covered by 'should correctly get courses'.
					done();
				} else {
					r.gradePeriods(function (e, r) {
						expect(e).to.not.exist;
						expect(r).to.be.a('array');

						r.forEach(function (p) {
							expect(p).to.be.an.instanceof(GradePeriod);
						});

						done();
					});
				}
			});
		});
	});

	describe('persons', function () {
		it('should handle empty queries correctly', function (done) {
			m.getPersons(null, function (e, r) {
				expect(r).to.be.an('array').to.have.length(0);
				done(e);
			});
		});

		it('should get persons', function (done) {
			m.getPersons(m.profileInfo().firstName(), function (e, r) {
				expect(r).to.be.an('array').to.have.length.above(0);

				expect(r[0]).to.be.an.instanceof(Person);
				expect(r[0].type()).to.equal('person'); // test if it correctly get a persons type

				done(e);
			});
		});

		it('should cache persons', function () {
			var cached = m.getPersons(m.profileInfo().firstName(), function () {});
			expect(cached).to.equal(true);
		});
	});

	describe('digitalSchoolUtilities', function () {
		it('should get digitalSchoolUtilities', function (done) {
			m.digitalSchoolUtilities(function (e, r) {
				expect(e).to.not.exist;
				expect(r).to.be.an('array');

				r.forEach(function (u) {
					expect(u).to.be.an.instanceof(DigitalSchoolUtility);

					expect(u.url()).to.be.an('string');
					expect(u.url()).to.not.be.empty;

					expect(u.class()).to.be.an.instanceof(Class);
				});

				done();
			});
		});
	});

	describe('version info', function () {
		it('should get version infos', function (done) {
			m.magisterSchool.versionInfo(function (e, r) {
				expect(e).not.to.exist;
				expect(r).to.be.an('object');
				done();
			});
		});
	});
});

describe('Helpers', function () {
	describe('html stripping', function () {
		it('should strip html tags', function () {
			var a = '<p syle="font-size: 10px">kaas</p>';
			var b = 'kaas';
			expect(Helpers.cleanHtmlContent(a)).to.equal(b);
		});

		it('should convert nonbreaking spaces to normal spaces', function () {
			var a = 'kaas&nbsp;swag';
			var b = 'kaas swag';
			expect(Helpers.cleanHtmlContent(a)).to.equal(b);
		});
	});

	describe('dates', function () {
		it('should be able to get the date of a Date object', function () {
			var a = new Date(2016, 4, 20, 13, 37, 69);
			var b = new Date(2016, 4, 20);
			expect(Helpers.date(a).getTime()).to.equal(b.getTime());
		});

		it('should correctly convert a date to Magister\'s url format', function () {
			var a = new Date(2016, 3, 22);
			var b = '2016-04-22';
			expect(Helpers.urlDateConvert(a)).to.equal(b);
		});

		it('should parse dates correctly', function () {
			expect(Helpers.parseDate('2016-01-01')).to.be.a('Date');
			expect(Helpers.parseDate('jkdsjfds')).to.be.undefined;
		});
	});

	describe('contains', function () {
		it('should correctly check if a string contains a substring', function () {
			var str = 'kaas is lekker';
			expect(Helpers.contains(str, 'kaas')).to.be.true;
			expect(Helpers.contains(str, 'is')).to.be.true;
			expect(Helpers.contains(str, 'swag')).to.be.false;
		});

		it('should correctly handle case', function () {
			var str = 'kaas Is lekker';
			expect(Helpers.contains(str, 'is')).to.be.false;
			expect(Helpers.contains(str, 'Is')).to.be.true;
			expect(Helpers.contains(str, 'is', true)).to.be.true;
		});
	});

	describe('defer', function () {
		it('should defer the execution correctly', function (done) {
			var b = false;
			Helpers.defer(function () {
				expect(b).to.be.true;
				done();
			});
			b = true; // this should be executed before the callback above
		});
	});

	describe('asyncResultWaiter', function () {
		it('should wait for all callbacks to be done', function (done) {
			var push = Helpers.asyncResultWaiter(5, function (r) {
				expect(r).to.be.an('array');
				expect(r).to.have.length(5);

				expect(r[0]).to.equals(0);
				expect(r[4]).to.equals(4);

				done();
			});

			for (var i = 0; i < 5; i++) {
				push(i);
			}
		});

		it('should group the results together if some consits of an array', function (done) {
			var push = Helpers.asyncResultWaiter(5, function (r) {
				expect(r).to.be.an('array');
				expect(r).to.have.length(5);

				expect(r[0]).to.equals(0);
				expect(r[4]).to.equals(4);

				done();
			});

			for (var i = 0; i < 5; i++) {
				push([ i ]);
			}
		});

		it('should handle invocations with length set to 0', function (done) {
			Helpers.asyncResultWaiter(0, function () {
				done();
			});
		});
	})
});
