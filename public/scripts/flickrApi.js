var flickrApi = {
	_baseUrl: "https://www.flickr.com/services/rest",
	_perPage: 10,
	_format: "json"
};

flickrApi.init = function(apiKey, userId, options) {
	this._apiKey = apiKey;
	this._userId = userId;
	this._options = options;
};

flickrApi.searchPhotos = function(params, callback) {
	var searchParams = {
		api_key: this._apiKey
	};
	searchParams = utils.extend(searchParams, params);

	var url = this._buildUrl("flickr.photos.search", searchParams);
	this._makeRequest(url, callback);
};

flickrApi.getPhotos = function(photosetId, callback) {
	var params = {
		api_key: this._apiKey,
		user_id: this._userId,
		photoset_id: photosetId
	};
	var url = this._buildUrl("flickr.photosets.getPhotos", params);

	this._makeRequest(url, function(resp) {
		callback(resp.photoset.photo);
	});
};

flickrApi.getPhotoUrl = function(photo, sizeSuffix) {
	var url = "https://farm" + photo.farm + ".staticflickr.com";
	url += "/" + photo.server + "/" + photo.id + "_" + photo.secret;
	if (sizeSuffix)
		url += "_" + sizeSuffix;
	url += ".jpg"

	return url;
};

flickrApi._makeRequest = function(url, callback) {
	var xhr = new Xhr();

	xhr.get(url, function(resp, err) {
		if (err) throw err;

		var response = JSON.parse(resp.response);

		if (response.stat === "fail")
			throw new Error(response.message);

		callback(response);
	});
};

flickrApi._buildUrl = function(method, params) {
	var url = this._baseUrl;
	url += "/?method=" + method + "&per_page=" + this._perPage + "&format=" + this._format + "&nojsoncallback=1";
	for (curParam in params) {
		url += "&" + curParam + "=" + params[curParam];
	}

	return url;
};