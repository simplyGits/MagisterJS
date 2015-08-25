module.exports = (grunt) ->
	headNode = '/* Magister.js (node version) by simplyApps. Built on: <%= grunt.template.today("UTC:dd-mm-yyyy HH:MM \'UTC\'") %> */\n'
	headBrowser = '/* Magister.js (browser version) by simplyApps. Built on: <%= grunt.template.today("UTC:dd-mm-yyyy HH:MM \'UTC\'") %> */\n'

	grunt.initConfig
		pkg: grunt.file.readJSON "package.json"
		coffee:
			compile:
				options:
					join: yes
				files:
					"lib/browser/separateHttp/magister-browser-noHttp.js": ["src/*.coffee", "src/private/*.coffee"]
					"lib/node/magister-node.js": ["src/*.coffee", "src/private/Helpers.coffee", "default-https/node.coffee"]
		uglify:
			options:
				compress: {}
				mangle: yes
			default:
				files:
					"lib/browser/separateHttp/magister-browser-noHttp.min.js": "lib/browser/separateHttp/magister-browser-noHttp.js"

		concat:
			options:
				banner: headBrowser
			dist:
				src: ["src/http/http.js", "lib/browser/separateHttp/magister-browser-noHttp.min.js"]
				dest: "lib/browser/magister-browser.min.js"

		compress:
			main:
				options:
					archive: "Magister.js-browser.zip"
				files: [
					{ expand: yes, cwd: "lib/browser/", src: ["**"] }
				]

	grunt.loadNpmTasks "grunt-contrib-coffee"
	grunt.loadNpmTasks "grunt-contrib-uglify"
	grunt.loadNpmTasks "grunt-contrib-concat"
	grunt.loadNpmTasks "grunt-contrib-compress"

	grunt.registerTask "copy", ->
		grunt.file.copy "src/http/http.js", "lib/browser/separateHttp/http.js"

		grunt.file.write "lib/browser/separateHttp/http.js", grunt.template.process(headBrowser) + grunt.file.read "lib/browser/separateHttp/http.js"
		grunt.file.write "lib/browser/separateHttp/magister-browser-noHttp.min.js", grunt.template.process(headBrowser) + grunt.file.read "lib/browser/separateHttp/magister-browser-noHttp.min.js"

	grunt.registerTask "default", [ "coffee", "uglify", "concat", "copy", "compress" ]
