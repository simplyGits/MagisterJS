new Magister.Magister({
	school: 'xxxx',
	username: 'xxxx',
	password: 'xxxx'
}).ready(function (error) {
	if (error) return console.log('oops!', error);
	this.composeAndSendMessage("subject", "body", ["Thomas", "Tom", "Jesse"]);
});
