module.exports = (grunt) ->
	head = '/* Magister.js (browser version) by simplyApps. Built on: <%= grunt.template.today("dd-mm-yyyy") %> */\n'

	grunt.initConfig
		pkg: grunt.file.readJSON "package.json"
		coffee:
			compile:
				options:
					join: yes
				files:
					"lib/separateHttp/magister-browser-noHttp.js": ["src/*.coffee", "src/private/*.coffee"]
		uglify:
			options:
				compress: yes
				mangle: yes
			default:
				files:
					"lib/separateHttp/magister-browser-noHttp.min.js": "lib/separateHttp/magister-browser-noHttp.js"

		concat:
			options:
				banner: head
			files:
				src: ["src/http/http.js", "lib/separateHttp/magister-browser-noHttp.min.js"]
				dest: "lib/magister-browser.min.js"

		compress:
			main:
				options:
					archive: "Magister.js.zip"
				files: [
					{ expand: yes, cwd: "lib/", src: ["**"] }
				]

	grunt.loadNpmTasks "grunt-contrib-coffee"
	grunt.loadNpmTasks "grunt-contrib-uglify"
	grunt.loadNpmTasks "grunt-contrib-concat"
	grunt.loadNpmTasks "grunt-contrib-compress"

	grunt.registerTask "copy", ->
		grunt.file.copy "src/http/http.js", "lib/separateHttp/http.js"
		
		grunt.file.write "lib/separateHttp/http.js", grunt.template.process(head) + grunt.file.read "lib/separateHttp/http.js"
		grunt.file.write "lib/separateHttp/magister-browser-noHttp.min.js", grunt.template.process(head) + grunt.file.read "lib/separateHttp/magister-browser-noHttp.min.js"
	
	grunt.registerTask "default", [ "coffee", "uglify", "concat", "copy", "compress" ]