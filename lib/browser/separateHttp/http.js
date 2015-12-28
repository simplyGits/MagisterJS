/* Magister.js (browser version) by simplyApps. Built on: 28-12-2015 14:46 UTC */
/*
	HTTP CLASS
	======================

	You have to implement this with your own serverside implementation.
	Beneath here are the requirements you have to follow.

 	======================
   MINIMAL REQUIREMENTS
 	======================
 	callback: function (error, result) {...}
 	result: { content (string), headers (dictionary), statusCode (number) }
 	options: { headers (dictionary), data (object) }

 	get(url, options*, callback)
 	delete(url, options*, callback)
 	post(url, data, options*, callback)
 	put(url, data, options*, callback)

 	* = optional (Fill with default value if null (object) ex.: options ?= {})

 	Class holds variable _cookie which is required to be added to the headers
*/
(function() {
	if (!this.Magister) this.Magister = {};

	this.Magister.MagisterHttp = (function() {
			function MagisterHttp() {}

			MagisterHttp.prototype.get = function(url, options, callback) {

			};

			MagisterHttp.prototype["delete"] = function(url, options, callback) {

			};

			MagisterHttp.prototype.post = function(url, data, options, callback) {

			};

			MagisterHttp.prototype.put = function(url, data, options, callback) {

			};

			MagisterHttp.prototype._cookie = "";

			return MagisterHttp;

	})();
}).call(this);
