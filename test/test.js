var expect = require("chai").expect;
var Magister = require("../").Magister;
var options = null;

try {
	options = require("./testOptions.json");
} catch (e) { // For Travis CI we use environment variables.
	options = { school: {} };

	options.school.url = process.env.TEST_SCHOOLURL;
	options.userName = process.env.TEST_USERNAME;
	options.password = process.env.TEST_PASSWORD;
}
if (options.school.url == null || options.userName == null || options.password == null)
	throw new Error("No login information found.");

/*
	to use this test:
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
	this.timeout(5000);
	x = new Magister(options.school, options.userName, options.password);

	it("should be a correct Magister object", function(done) {
		expect(x).to.be.a("object");
		expect(x).to.have.a.property("ready").be.a("function");
		expect(x).to.have.a.property("magisterSchool").be.a("object");

		x.ready(function () {
			expect(this).to.equal(x);
			done();
		});
	});

	it("should contain profileInfo", function (done) {
		x.ready(function () {
			expect(this.profileInfo().profilePicture()).to.be.a("string");
			expect(this.profileInfo()).to.be.a("object").and.have.a.property("profilePicture").be.a("function");
			done();
		});
	});

	it("should give appointments", function (done) {
		x.ready(function () {
			this.appointments(new Date(), false, function(e, r) {
				expect(e).to.not.exist;
				expect(r).to.be.a("array");
				for(var i = 0; i < r.length; i++) {
					expect(r[i]).to.exist;
					expect(r[i]).to.be.a("object");
					expect(r[i]).to.have.a.property("teachers")
					expect(r[i].teachers()).to.be.a("array");
				}
				done();
			});
		});
	});

	it("should download files", function (done) {
		x.ready(function () {
			this.fileFolders(function (error, result) {
				result[0].files(function (error, result) {
					result[0].download(function(e, r) {
						expect(r).to.exist;
						done();
					});
				});
			});
		});
	});

	it("should send messages and retreive them", function (done) {
		this.timeout(10000);
		x.ready(function () {
			s = "" + ~~(Math.random() * 100);
			m = this;

			m.composeAndSendMessage("Magister.js mocha test.", s, [x.profileInfo().firstName()]);

			setTimeout(function () {
				m.inbox().messages(1, false, function(e, r) {
					expect(e).to.not.exist;
					expect(r).to.be.a("array");
					expect(r).to.not.be.empty;

					expect(r[0]).to.exist;
					expect(r[0].body()).to.equal(s);

					r[0].remove();

					done();
				});
			}, 3000);
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
						expect(msg.attachments()[0]).to.exist;
						expect(msg.attachments()[0]).to.have.a.property("download").be.a("function");
						expect(msg.attachments()[0].download(false, function(e, r) {
							expect(e).to.not.exist;
							expect(r).to.be.a("string");
							done();
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
					expect(r[0]).to.be.a("object");
					expect(r[0]).to.have.a.property("isDone").be.a("function");

					r[0].isDone(true);
					r[0].isDone(false);
				}
				done();
			});
		});
	});
});
