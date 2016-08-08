"use strict";

/**
 * A simple API stub that provides some basic Flickr APIs.
 * Flickr API doc: https://www.flickr.com/services/api/
 */

var DEFAULT_PER_PAGE = 50;
var DEFAULT_FORMAT = "json";
var BASE_URL = "https://www.flickr.com/services/rest";

var FlickrApi = (function() {

	var _apiKey, _userId;
	var _perPage = DEFAULT_PER_PAGE;
	var _format = DEFAULT_FORMAT;

	function _init(apiKey, userId) {
		_apiKey = apiKey;
		_userId = userId;
	};

	function _searchPhotos(params, callback) {
		if (!params["api_key"])
			params["api_key"] = _apiKey;

		var url = _buildUrl("flickr.photos.search", params);
		_makeRequest(url, callback);
	};

	function _getPhotos(photosetId, callback) {
		var params = {
			api_key: _apiKey,
			user_id: _userId,
			photoset_id: photosetId
		};
		var url = _buildUrl("flickr.photosets.getPhotos", params);
		_makeRequest(url, callback);
	};

	function _getPhotoUrl(photo, sizeSuffix) {
		var url = "https://farm" + photo.farm + ".staticflickr.com";
		url += "/" + photo.server + "/" + photo.id + "_" + photo.secret;
		if (sizeSuffix)
			url += "_" + sizeSuffix;
		url += ".jpg"

		return url;
	};

	function _makeRequest(url, callback) {
		var xhr = new Xhr();

		EventUtil.trigger(document.body, "request_begin");
		xhr.get(url, function(resp, err) {
			EventUtil.trigger(document.body, "request_finish");
			if (err) throw err;

			var response = JSON.parse(resp.response);

			if (response.stat === "fail")
				throw new Error(response.message);

			callback(response);
		});
	};

	function _buildUrl(method, params) {
		var url = BASE_URL + "/?method=" + method + "&per_page=" + _perPage + "&format=" + _format + "&nojsoncallback=1";
		for (var curParam in params) {
			url += "&" + curParam + "=" + params[curParam];
		}

		return url;
	};

	// public methods
	return {
		init: _init,
		searchPhotos: _searchPhotos,
		getPhotos: _getPhotos,
		getPhotoUrl: _getPhotoUrl
	};

})();
