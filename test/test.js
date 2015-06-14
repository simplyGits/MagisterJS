var expect = require("chai").expect;
var fs = require("fs");

var magisterjs = require("../");
var Magister = magisterjs.Magister;
var Message = magisterjs.Message;
var ProfileInfo = magisterjs.ProfileInfo;
var Appointment = magisterjs.Appointment;
var MagisterSchool = magisterjs.MagisterSchool;
var File = magisterjs.File;
var Grade = magisterjs.Grade;

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

	this.timeout(5000);
	var x = new Magister(options.school, options.userName, options.password);

	it("should be a correct Magister object", function (done) {
		expect(x).to.be.a("object");
		expect(x).to.have.a.property("ready").be.a("function");

		expect(x).to.have.a.property("magisterSchool").be.a("object");
		expect(x).to.have.a.property("magisterSchool").to.have.a.property("url");

		x.ready(function () {
			expect(this).to.equal(x);
			done();
		});
	});

	it("should login", function (done) {
		x.ready(function (e) {
			done(e);
		});
	});

	it("should contain profileInfo", function (done) {
		x.ready(function () {
			expect(this.profileInfo()).to.be.a("object");
			expect(this.profileInfo()).to.be.an.instanceof(ProfileInfo);
			expect(this.profileInfo().profilePicture()).to.be.a("string");
			done();
		});
	});

	it("should give appointments", function (done) {
		x.ready(function () {
			this.appointments(new Date(), false, function(e, r) {
				expect(e).to.not.exist;
				expect(r).to.be.a("array");

				r.forEach(function (appointment) {
					expect(appointment).to.be.an.instanceof(Appointment);
					expect(appointment.teachers()).to.be.a("array");
				});

				done();
			});
		});
	});

	it("should download files", function (done) {
		x.ready(function () {
			this.fileFolders(function (error, result) {
				result[0].files(function (error, result) {
					result[0].download(false, function(e, r) {
						expect(r).to.be.a("string");
						done(e);
					});
				});
			});
		});
	});

	it("should send messages and retreive them", function (done) {
		this.timeout(10000);
		x.ready(function () {
			var body = "" + ~~(Math.random() * 100);
			var m = this;

			m.composeAndSendMessage("Magister.js mocha test.", body, [x.profileInfo().firstName()], function (e, r) {
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

	it("should download attachments", function (done) {
		x.ready(function () {
			this.inbox().messages(false, function(e, r) {
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

	it("should be able to mark appointments as ready", function (done) {
		x.ready(function () {
			this.appointments(new Date(), false, function(e, r) {
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

	it("should correctly get courses", function (done) {
		x.ready(function () {
			var self = this;

			self.courses(function (e, r) {
				expect(e).to.not.exist;
				expect(r).to.be.a("array");
				var course = r[0];

				self.currentCourse(function (e, r) {
					expect(r.id()).to.equal(course.id());
					done(e);
				});
			});
		});
	});

	it("should correctly get grades", function (done) {
		x.ready(function () {
			this.currentCourse(function (e, r) {
				if (e != null) { // case covered by 'should correctly get courses'.
					done();
				} else {
					r.grades(false, false, false, function (e, r) {
						expect(r).to.be.a("array");

						r.forEach(function (g) {
							expect(g).to.be.an.instanceof(Grade);
						});

						done(e);
					});
				}
			});
		});
	});

	it("should correctly get the limited current course", function (done) {
		x.ready(function () {
			this.getLimitedCurrentCourseInfo(function (e, r) {
				expect(r).to.be.a("object");
				done(e);
			});
		});
	});
});
