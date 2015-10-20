var expect = require("chai").expect;

var magisterjs = require("../");
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
var ExtraProfileInfo = magisterjs.ExtraProfileInfo;

var options = null;

try {
	options = require("./testOptions.json");
} catch (e) { // For Travis CI we use environment variables.
	options = { school: {} };

	options.school.url = process.env.TEST_SCHOOLURL;
	options.userName = process.env.TEST_USERNAME;
	options.password = process.env.TEST_PASSWORD;
}
if (options.school.url == null || options.userName == null || options.password == null) {
	throw new Error("No login information found.");
}

/*
	To use this test:
		Create a file in this folder called testOptions.json with as content (fill in your information):

		{
			"school": {
				"url": "https://<schoolname>.magister.net"
			},
			"userName": "<username>",
			"password": "<password>"
		}
*/

describe("Magister", function() {
	"use strict";

	this.timeout(7000);
	var m;
	before(function (done) {
		new Magister({
			school: options.school,
			username: options.userName,
			password: options.password,
		}).ready(function (e) {
			m = this;
			done(e);
		});
	});

	it("should be a correct Magister object", function () {
		expect(m).to.be.an.instanceof(Magister);
		expect(m).to.have.a.property("ready").be.a("function");

		expect(m).to.have.a.property("magisterSchool").be.a("object");
		expect(m).to.have.a.property("magisterSchool").to.have.a.property("url");
	});

	describe("profileInfo", function () {
		it("should contain profileInfo", function () {
			expect(m.profileInfo()).to.be.a("object");
			expect(m.profileInfo()).to.be.an.instanceof(ProfileInfo);
			expect(m.profileInfo().profilePicture()).to.be.a("string");
		});

		it("should fetch address info", function (done) {
			m.profileInfo().address(function (e, r) {
				expect(e).to.not.exist;
				expect(r).to.be.an.instanceof(AddressInfo);
				done();
			});
		});

		it("should fetch extra profile info", function (done) {
			m.profileInfo().extraInfo(function (e, r) {
				expect(e).to.not.exist;
				expect(r).to.be.an.instanceof(ExtraProfileInfo);
				done();
			});
		});
	});

	describe("messages", function () {
		it("should search messageFolders correctly", function () {
			expect(
				m.messageFolders('postvak in')[0].id() ===
				m.messageFolders('mededelingen')[0].id()
			).to.be.false;
		});

		it("should send messages and retreive them", function (done) {
			this.timeout(10000);
			var body = "" + ~~(Math.random() * 100);
			m.composeAndSendMessage("Magister.js mocha test.", body, [m.profileInfo().firstName()], function (e, r) {
				expect(e).to.not.exist;
				expect(r).to.be.an.instanceof(Message);

				m.inbox().messages(1, false, function(e, r) {
					expect(e).to.not.exist;
					expect(r).to.be.a("array");
					expect(r).to.not.be.empty;

					expect(r[0]).to.be.an.instanceof(Message);
					expect(r[0].body()).to.equal(body);

					r[0].remove(done);
				});
			});
		});
	});

	describe("courses", function () {
		it("should correctly get the limited current course", function (done) {
			m.getLimitedCurrentCourseInfo(function (e, r) {
				expect(r).to.be.a("object");
				done(e);
			});
		});

		it("should correctly get courses", function (done) {
			m.courses(function (e, r) {
				expect(e).to.not.exist;
				expect(r).to.be.a("array");
				var course = r[0];

				m.currentCourse(function (e, r) {
					expect(r.id()).to.equal(course.id());
					done(e);
				});
			});
		});
	});

	describe("appointments", function () {
		it("should give appointments", function (done) {
			m.appointments(new Date(), false, function(e, r) {
				expect(e).to.not.exist;
				expect(r).to.be.a("array");

				r.forEach(function (appointment) {
					expect(appointment).to.be.an.instanceof(Appointment);
					expect(appointment.teachers()).to.be.a("array");
				});

				done();
			});
		});

		it("should be able to mark appointments as ready", function (done) {
			m.appointments(new Date(), false, function(e, r) {
				expect(e).to.not.exist;
				expect(r).to.be.a("array");
				if (r[0] != null) {
					expect(r[0]).to.be.an.instanceof(Appointment);
					expect(r[0]).to.have.a.property("isDone").be.a("function");

					r[0].isDone(true);
					r[0].isDone(false);
				}
				done();
			});
		});
	});

	describe("files", function () {
		it("should download files", function (done) {
			m.fileFolders(function (error, result) {
				expect(error).to.not.exist;
				result[0].files(function (error, result) {
					expect(error).to.not.exist;
					result[0].download(false, function(e, r) {
						expect(e).to.not.exist;
						expect(r).to.be.a("string");
						done();
					});
				});
			});
		});

		it("should download attachments", function (done) {
			m.inbox().messages(false, function(e, r) {
				expect(r[0].attachments()).to.be.a("array");
				var foundAttachment = false;

				for (var i = 0; i < r.length; i++) {
					var msg = r[i];

					if (msg.attachments().length > 0) {
						foundAttachment = true;
						var attachment = msg.attachments()[0];

						expect(attachment).to.be.an.instanceof(File);
						expect(attachment.download(false, function(e, r) {
							expect(r).to.be.a("string");
							done(e);
						}));
						break;
					}
				}
				if (!foundAttachment) done();
			});
		});
	});

	describe("grades", function () {
		it("should correctly get grades", function (done) {
			m.currentCourse(function (e, r) {
				if (e != null) { // case covered by 'should correctly get courses'.
					done();
				} else {
					r.grades(false, false, false, function (e, r) {
						expect(e).to.not.exist;
						expect(r).to.be.a("array");

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

		it("should correctly get gradePeriods", function (done) {
			m.currentCourse(function (e, r) {
				if (e != null) { // case covered by 'should correctly get courses'.
					done();
				} else {
					r.gradePeriods(function (e, r) {
						expect(e).to.not.exist;
						expect(r).to.be.a("array");

						r.forEach(function (p) {
							expect(p).to.be.an.instanceof(GradePeriod);
						});

						done();
					});
				}
			});
		});
	});

	describe("persons", function () {
		it("should handle empty queries correctly", function (done) {
			m.getPersons(null, function (e, r) {
				expect(r).to.be.an("array").to.have.length(0);
				done(e);
			});
		});

		it("should get persons", function (done) {
			m.getPersons(m.profileInfo().firstName(), function (e, r) {
				expect(r).to.be.an("array").to.have.length.above(0);

				expect(r[0]).to.be.an.instanceof(Person);
				expect(r[0].type()).to.equal("pupil"); // test if it correctly get a persons type

				done(e);
			});
		});

		it("should cache persons", function () {
			var cached = m.getPersons(m.profileInfo().firstName(), function () {});
			expect(cached).to.equal(true);
		});
	});

	describe("digitalSchoolUtilities", function () {
		it("should get digitalSchoolUtilities", function (done) {
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
});
