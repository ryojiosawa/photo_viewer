"use strict";

var app = {};

app.init = function() {
	flickrApi.init(config.API_KEY, config.USER_ID);

	var photosetId = "72157626553199177";
	this.fetchPhotos(photosetId, this.renderPhotos.bind(this));
};

app.fetchPhotos = function(photosetId, callback) {
	flickrApi.getPhotos(photosetId, callback);
};

app.renderPhotos = function(photos) {
	var photoContainer = document.createElement("div");
	photoContainer.classList.add("photo-container");

	var photoList = document.createElement("ul");
	photoList.classList.add("photo-list");

	for (var i = 0; i < photos.length; i++) {
		photoList.appendChild(this.renderPhotoThumbnail(photos[i]));
	}

	photoContainer.appendChild(photoList);
	document.querySelector(".photo-viewer").appendChild(photoContainer);
};

app.renderPhotoThumbnail = function(photo) {
	var photoEl = document.createElement("li");
	photoEl.setAttribute("id", photo.id);
	photoEl.classList.add("photo-thumbnail");

	var photoUrl = flickrApi.getPhotoUrl(photo, "m");
	photoEl.innerHTML = '<img src="' + photoUrl + '" alt="' + photo.title + '" />';

	return photoEl;
};