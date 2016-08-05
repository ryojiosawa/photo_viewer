var app = {};

app.init = function() {
	// initialize flickrApi
	flickrApi.init(config.API_KEY, config.USER_ID);

	// search photos
	var params = {
		text: "San Francisco"
	};

	flickrApi.searchPhotos(params, function(resp) {
		console.log(resp);
	});
};