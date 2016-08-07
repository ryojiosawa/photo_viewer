"use strict";

function PhotoContentProvider(photoId, title, imageTag, onNavPhotoHandler, prevDisabled, nextDisabled) {
	this._photoId = photoId;
	this._title = title;
	this._imageTag = imageTag;
	this._onNavPhotoHandler = onNavPhotoHandler;

	this.build = function() {
		var content = document.createElement("div");
		content.classList.add("photo-content");

		content.appendChild(this._buildNavLinks());
		content.appendChild(this._buildTitle());
		content.appendChild(this._buildPhotoImage());

		return content;
	};

	this._buildTitle = function() {
		var title = document.createElement("div");
		title.classList.add("photo-title");
		title.innerHTML = "<h1>" + this._title + "</h1>";
		return title;
	};

	this._buildPhotoImage = function() {
		var title = document.createElement("div");
		title.classList.add("photo-image");
		title.innerHTML = this._imageTag;
		return title;
	};

	this._buildNavLinks = function() {
		var nav = document.createElement("div");
		nav.classList.add("photo-nav");

		var prev = document.createElement("a");
		prev.classList.add("prev-photo");
		if (prevDisabled) prev.classList.add("disabled");
		prev.innerHTML = "Previous";
		eventUtil.on(prev, "click", function(event) {
			onNavPhotoHandler(false, this._photoId);
		}.bind(this));

		var next = document.createElement("a");
		next.classList.add("next-photo");
		if (nextDisabled) next.classList.add("disabled");
		next.innerHTML = "Next";
		eventUtil.on(next, "click", function(event) {
			onNavPhotoHandler(true, this._photoId);
		}.bind(this));

		nav.appendChild(prev);
		nav.appendChild(next);
		return nav;
	};
}