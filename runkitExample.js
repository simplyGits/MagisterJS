// Replace every '<thing>' with your credentials:

const { default: magister, getSchools } = require('magister.js');

// Get the schools matching <schoolname>
const schools = await getSchools('<schoolname>');

// Login into Magister using the given credentials
const m = await magister({
	school: schools[0],
	username: '<username>',
	password: '<password>',
});

// Say hi
console.log(`Hey ${m.profileInfo.firstName}!`);
