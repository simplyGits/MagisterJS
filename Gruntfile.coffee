module.exports = (grunt) ->
	headNode = '/* Magister.js (node version) by simplyApps. Built on: <%= grunt.template.today("dd-mm-yyyy") %> */\n'
	headBrowser = '/* Magister.js (browser version) by simplyApps. Built on: <%= grunt.template.today("dd-mm-yyyy") %> */\n'

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
			setExport:
				options:
					banner: headBrowser
				files:
					"lib/browser/separateHttp/magister-browser-noHttp.js": ["lib/browser/separateHttp/magister-browser-noHttp.js", "src/xport.js"]

			mergeHttp:
				options:
					banner: headBrowser
				files:
					"lib/browser/magister-browser.min.js": ["src/http/http.js", "lib/browser/separateHttp/magister-browser-noHttp.min.js"]

		compress:
			main:
				options:
					archive: "Magister.js-browser.zip"
				files: [
					{ expand: yes, cwd: "lib/", src: ["**"] }
				]

	grunt.loadNpmTasks "grunt-contrib-coffee"
	grunt.loadNpmTasks "grunt-contrib-uglify"
	grunt.loadNpmTasks "grunt-contrib-concat"
	grunt.loadNpmTasks "grunt-contrib-compress"

	grunt.registerTask "copy", ->
		grunt.file.copy "src/http/http.js", "lib/browser/separateHttp/http.js"

		grunt.file.write "lib/browser/separateHttp/http.js", grunt.template.process(headBrowser) + grunt.file.read "lib/browser/separateHttp/http.js"
		grunt.file.write "lib/browser/separateHttp/magister-browser-noHttp.min.js", grunt.template.process(headBrowser) + grunt.file.read "lib/browser/separateHttp/magister-browser-noHttp.min.js"

	grunt.registerTask "default", [ "coffee", "concat:setExport", "uglify", "concat:mergeHttp", "copy", "compress" ]
