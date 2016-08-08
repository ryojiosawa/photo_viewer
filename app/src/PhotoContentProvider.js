"use strict";

/**
 * PhotoContentProvider is responsible for producing the photo content in the modal lightbox. This class
 * has one public method 'build' which is used in the Modal (modal.js) to generate the content and attach
 * to the document.
 */

function PhotoContentProvider(photoId, title, imageTag, onNavPhotoHandler, prevDisabled, nextDisabled) {
	this._photoId = photoId;
	this._title = title;
	this._imageTag = imageTag;
	this._onNavPhotoHandler = onNavPhotoHandler;

	/**
	 * Build method will generate an HTML content displayed in a modal.
	 */
	this.build = function() {
		var content = document.createElement("div");
		content.classList.add("photo-content");

		content.appendChild(this._buildNav());
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

	this._buildNav = function() {
		var nav = document.createElement("div");
		nav.classList.add("photo-nav");

		nav.appendChild(this._buildNavLink(false, prevDisabled));
		nav.appendChild(this._buildNavLink(true, nextDisabled));
		return nav;
	};

	this._buildNavLink = function(isNext, disabled) {
		var className = isNext ? "next" : "prev";
		var text = isNext ? "Next >>" : "<< Previous";

		var navDiv = document.createElement("div");
		navDiv.classList.add(className);
		var link = document.createElement("a");
		link.setAttribute("href", "#0");
		if (disabled) link.classList.add("disabled");

		link.innerHTML = text;
		EventUtil.on(link, "click", function(event) {
			onNavPhotoHandler(isNext, this._photoId);
		}.bind(this));

		navDiv.appendChild(link);
		return navDiv;
	};
}
