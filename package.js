Package.describe({
	name: "simply:magisterjs",
	version: "1.23.2",
	summary: "A JavaScript implementation of the Magister 6 API",
	git: "https://github.com/simplyGits/MagisterJS",
	documentation: "README.md"
});

Npm.depends({
	"request": "2.78.0"
});

Package.onUse(function(api) {
	api.versionsFrom("1.0.4.2");

	api.use(["coffeescript", "stevezhu:lodash@3.10.1", "check"]);

	api.addFiles([
		"src/private/Helpers.coffee",
		"src/private/polyfills.coffee",
		"src/Appointment.coffee",
		"src/Assignment.coffee",
		"src/Course.coffee",
		"src/DigitalSchoolUtility.coffee",
		"src/File.coffee",
		"src/Grade.coffee",
		"src/Magister.coffee",
		"src/Message.coffee",
		"src/MessageFolder.coffee",
		"src/Person.coffee",
		"src/ProfileInfo.coffee",
		"src/School.coffee",
		"src/StudyGuide.coffee",
		"src/MeteorExport.js",
		"default-https/meteor.coffee"
	]);
	api.addFiles("src/server/methods.coffee", "server");

	api.export("Magister");
});
