(function() {
	if (!this.Magister) this.Magister = {};

	this.Magister.MagisterHttp = (function() {
			function MagisterHttp() {}

			MagisterHttp.prototype.get = function(url, options, callback) {
				if(options.headers == null) options.headers = {};
				options.headers.Cookie = this._cookie;

				var request = JSON.stringify({ url: url, method: "GET", headers: options.headers });

				$.post("http://smallproxy.herokuapp.com/", request, function(result, status, jqHXR) {
					result = JSON.parse(result);

					if (result.error != null) 
						callback(result.error, null);
					else
						callback(null, result);
				}).fail(function(e){ callback(e, null); });
			};

			MagisterHttp.prototype["delete"] = function(url, options, callback) {
				if(options.headers == null) options.headers = {};
				options.headers.Cookie = this._cookie;

				var request = JSON.stringify({ url: url, method: "DELETE", headers: options.headers });

				$.post("http://smallproxy.herokuapp.com/", request, function(result, status, jqHXR) {
					result = JSON.parse(result);

					if (result.error != null) 
						callback(result.error, null);
					else
						callback(null, result);
				}).fail(function(e){ callback(e, null); });
			};

			MagisterHttp.prototype.post = function(url, data, options, callback) {
				if(options.headers == null) options.headers = {};
				options.headers.Cookie = this._cookie;

				var request = JSON.stringify({ url: url, method: "POST", data: data, headers: options.headers });

				$.post("http://smallproxy.herokuapp.com/", request, function(result, status, jqHXR) {
					result = JSON.parse(result);

					if (result.error != null) 
						callback(result.error, null);
					else
						callback(null, result);
				}).fail(function(e){ callback(e, null); });
			};

			MagisterHttp.prototype.put = function(url, data, options, callback) {
				if(options.headers == null) options.headers = {};
				options.headers.Cookie = this._cookie;

				var request = JSON.stringify({ url: url, method: "PUT", data: data, headers: options.headers });

				$.post("http://smallproxy.herokuapp.com/", request, function(result, status, jqHXR) {
					result = JSON.parse(result);

					if (result.error != null) 
						callback(result.error, null);
					else
						callback(null, result);
				}).fail(function(e){ callback(e, null); });
			};

			MagisterHttp.prototype._cookie = "";

			return MagisterHttp;

	})();
}).call(this);
