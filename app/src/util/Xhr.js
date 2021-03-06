"use strict";

/**
 * A class that encapuslates XMLHttpRequest.
 */

function Xhr() {

	this.get = function(url, callback) {
		this._makeRequest("GET", url, null, callback);
	};

	this.post = function(url, data, callback) {
		this._makeRequest("GET", url, data, callback);
	};

	this._makeRequest = function(method, url, data, callback) {
		var req = new XMLHttpRequest();

		req.open(method, url, true);
		req.onreadystatechange = function() {
			this._handleRequest(req, callback);
		}.bind(this);

		req.send(data);
	};

	this._handleRequest = function(req, callback) {
		if (req.readyState === 4) {
			try {
				if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
					if (callback)
						callback(req);
				} else {
					var errorMsg = req.status + " for URL: " + req.responseURL;
					err = new Error(errorMsg);
					err.response = req;
					callback(undefined, err);
				}
			} finally {
				req = null;
			}
		}
	};
}
