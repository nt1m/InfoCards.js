module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		clean: {
			dist: ["dist"]
		},
		copy: {
			dist: {
				files: [
					{
						expand: true,
						cwd: "js/",
						src: "**.js",
						dest: "dist/",
						flatten: true,
						filter: "isFile"
					}
				]
			},
			prod: {
				files: [
					{
						expand: true,
						cwd: "dist/",
						src: "**.js",
						dest: "js/",
						flatten: true,
						filter: "isFile"
					}
				]
			}
		},
		uglify: {
			main: {
				options: {
					compress: {
						drop_console: true
					},
					banner: "/********** Infocards.js by Tim Nguyen ***********/" +
					        "\n" +
					        "/****** http://github.com/nt1m/InfoCards.js ******/\n"
				},
				files: [
					{
						expand: true,
						cwd: "dist/",
						src: "**.js",
						dest: "dist/",
					}
				]
			}
		},
		rename: {
			main: {
				files: [
					{src: ["dist/infocards.js"], dest: "dist/infocards.min.js"},
				]
			}
		}
	});
	var npmTasksToLoad = [
		"grunt-contrib-clean",
		"grunt-contrib-copy",
		"grunt-contrib-uglify",
		"grunt-contrib-rename"
	];
	npmTasksToLoad.forEach(function(taskName) {
		grunt.loadNpmTasks(taskName);
	});
	grunt.registerTask("minify", ["copy:dist", "uglify:main", "rename:main", "copy:prod", "clean:dist"]);
};