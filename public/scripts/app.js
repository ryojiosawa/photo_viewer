"use strict";

var app = (function() {

	function _init() {
		flickrApi.init(config.API_KEY, config.USER_ID);

		var photosetId = "72157626553199177";
		_fetchPhotos(photosetId, _renderPhotos.bind(this));
	};

	function _fetchPhotos(photosetId, callback) {
		flickrApi.getPhotos(photosetId, callback);
	};

	function _renderPhotos(photos) {
		var photoContainer = document.createElement("div");
		photoContainer.classList.add("photo-container");

		var photoList = document.createElement("ul");
		photoList.classList.add("photo-list");

		for (var i = 0; i < photos.length; i++) {
			photoList.appendChild(_renderPhotoThumbnail(photos[i]));
		}

		photoContainer.appendChild(photoList);
		document.querySelector(".photo-viewer").appendChild(photoContainer);
	};

	function _renderPhotoThumbnail(photo) {
		var photoEl = document.createElement("li");
		photoEl.setAttribute("id", photo.id);
		photoEl.classList.add("photo-thumbnail");

		var photoUrl = flickrApi.getPhotoUrl(photo, "m");
		photoEl.innerHTML = '<img src="' + photoUrl + '" alt="' + photo.title + '" />';

		return photoEl;
	};

	// public methods
	return {
		init: _init,
		fetchPhotos: _fetchPhotos,
		renderPhotos: _renderPhotos,
		renderPhotoThumbnail: _renderPhotoThumbnail
	};

})();