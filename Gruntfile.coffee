module.exports = (grunt) ->
	grunt.initConfig
		pkg: grunt.file.readJSON "package.json"
		coffee:
			compile:
				options:
					join: yes
				files:
					"build/magister-browser.js": ["src/*.coffee", "src/private/*.coffee"]
		uglify:
			options:
				compress: yes
				mangle: no
			default:
				files:
					"build/magister-browser.min.js": "build/magister-browser.js"

		concat:
			options:
				banner: '/* Magister.js by simplyApps. Built on: <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			files:
				src: ["src/http/http.js", "build/magister-browser.min.js"]
				dest: "magister-browser.min.js"

	grunt.loadNpmTasks "grunt-contrib-coffee"
	grunt.loadNpmTasks "grunt-contrib-uglify"
	grunt.loadNpmTasks "grunt-contrib-concat"

	grunt.registerTask "clear", -> grunt.file.delete "./build", force: yes
	grunt.registerTask "default", [ "coffee", "uglify", "concat", "clear" ]