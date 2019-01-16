[<img src="http://i.imgur.com/Lrg80ax.png" alt="Magister.js" align="left" width="200"/>](http://simplyGits.github.io/MagisterJS/)
<p align="right">
	<a href="https://travis-ci.org/simplyGits/MagisterJS">
		<img src="https://api.travis-ci.org/simplyGits/MagisterJS.png?branch=master" alt="Travis CI Badge"/>
	</a>
</p>

---

[![Gitter](https://badges.gitter.im/simplyGits/MagisterJS.svg)](https://gitter.im/simplyGits/MagisterJS?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![npm version](https://badge.fury.io/js/magister.js.svg)](https://badge.fury.io/js/magister.js)
[![Known Vulnerabilities](https://snyk.io/test/github/simplyGits/MagisterJS/badge.svg?targetFile=package.json)](https://snyk.io/test/github/simplyGits/MagisterJS?targetFile=package.json)
[![CodeFactor](https://www.codefactor.io/repository/github/simplygits/magisterjs/badge)](https://www.codefactor.io/repository/github/simplygits/magisterjs)

A JavaScript implementation of the [Magister 6](http://magister6.nl/) API.

Quickstart
===
`npm install magister.js`

```javascript
const { default: magister, getSchools } = require('magister.js');
// or with es6 modules:
// import magister, { getSchools } from 'magister.js'

// replace every '<thing>' with your credentials:

getSchools('<schoolname>') // get schools matching '<schoolname>'
	.then((schools) => schools[0]) // get the first school
	.then((school) => magister({ // login
		school,
		username: '<username>',
		password: '<password>',
	}))
	.then((m) => { // done logging in, say hi
		console.log(`Hey ${m.profileInfo.firstName}!`);
	}, (err) => { // something went wrong
		console.error('something went wrong:', err);
	});
```

Useful links
===
* [Documentation](http://simplyGits.github.io/MagisterJS/)

Before creating issues
===
1. Update all dependencies with `npm update`
2. Be sure you haven't made a typo and your code is correct (check the [docs](http://simplyGits.github.io/MagisterJS/))
3. Don't create issues which occur in a modified version

Contributing
===
* Document your code using [jsdoc](http://usejsdoc.org/)
* Respect and follow the current programming style
* Test your changes with `npm run test`
* Check your code style with `npm run lint`
* Make sure that your code compiles with babel using `npm run build`
* Only commit the `src/` and `test/` directory

License
===
[LGPLv3](LICENSE)
