new Magister.Magister({
	school: 'xxxx',
	username: 'xxxx',
	password: 'xxxx'
}).ready(function (error) {
	if (error) return console.log('oops!', error);

	this.currentCourse(function (error, result) {
		if (error) return console.log('oops!', error);

		result.grades(function (error, result) {
			if (error) return console.log('oops!', error);

			console.log(result.map(function (g) {
				return g.grade();
			}));
		});
	});
});
