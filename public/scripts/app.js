"use strict";

/**
 * Main app module
 */

var app = (function() {

	// private variable that stores a list of photos to be shown
	var _photos = [];

	/**
	 * Initialization includes initializing flickrApi stub, registering event handlers,
	 * and fetching and rendering photos
	 */
	function _init() {
		flickrApi.init(config.API_KEY, config.USER_ID);

		// register event handlers
		var photoContainer = document.querySelector(".photo-container");
		eventUtil.on(photoContainer, "dataChange", _renderPhotos.bind(this));
		eventUtil.on(photoContainer, "click", function(e) {
			// use event delegation to avoid attaching this handler to every image
			if(e.target && e.target.nodeName == "IMG") {
				_showPhoto(e.target.id);
			}
		});

		var photosetId = "72157626553199177";
		_fetchPhotos(photosetId);
	};

	/**
	 * Fetch a list of photos in the specified photosetId using FlickrApi. When photos are fetched,
	 * "dataChange" event is dispatched to notify app to render a view.
	 */
	function _fetchPhotos(photosetId) {
		flickrApi.getPhotos(photosetId, function(photos) {
			// update photos and re-render view
			_photos = photos;

			eventUtil.trigger(
				document.querySelector(".photo-container"),
				"dataChange"
			);
		});
	};

	function _renderPhotos() {
		var photoContainer = document.querySelector(".photo-container");
		var photoList = document.createElement("ul");
		photoList.classList.add("photo-list");

		for (var i = 0; i < _photos.length; i++) {
			photoList.appendChild(
				_renderPhotoThumbnail(_photos[i])
			);
		}

		// TODO - remove existing photos if exit before rendering

		photoContainer.appendChild(photoList);
	};

	/**
	 * Render individual photo thumbnail.
	 */
	function _renderPhotoThumbnail(photo) {
		var photoEl = document.createElement("li");
		photoEl.setAttribute("id", photo.id);
		photoEl.classList.add("photo-thumbnail");

		photoEl.innerHTML = _buildImage(photo);

		return photoEl;
	};

	/**
	 * Show the photo specified by the given id in a modal
	 */
	function _showPhoto(photoId) {
		var photo = _getPhotoById(photoId);
		modal.open(
			new PhotoContentProvider(photo.id, photo.title, _buildImage(photo), _boundOnPhotoNavHandler)
		);
	};

	function _onPhotoNavHandler(isNext, photoId) {
		var newIndex;
		var selectedIndex = util.findIndex(_photos, function(curPhoto) {
			return curPhoto.id === photoId;
		});

		// invalid photoId
		if (selectedIndex === -1) return;

		if (isNext) {
			newIndex = selectedIndex + 1;
			if (newIndex === _photos.length - 1) return;
		} else {
			if (selectedIndex === 0) return;
			newIndex = selectedIndex - 1;
		}

		var newPhoto = _photos[newIndex];
		modal.open(
			new PhotoContentProvider(newPhoto.id, newPhoto.title, _buildImage(newPhoto), _boundOnPhotoNavHandler)
		);
	};

	var _boundOnPhotoNavHandler = _onPhotoNavHandler.bind(this);

	/**
	 * Return a string of HTML img tag from the given photo object.
	 */
	function _buildImage(photo) {
		var photoUrl = flickrApi.getPhotoUrl(photo, "m");
		var imageTag = '<img src="' + photoUrl + '" id="' + photo.id + '" alt="' + photo.title + '" />';

		return imageTag;
	};

	function _getPhotoById(id) {
		return util.find(_photos, function(curPhoto) {
			return curPhoto.id === id;
		});
	};

	// public methods
	return {
		init: _init,
		fetchPhotos: _fetchPhotos,
		renderPhotos: _renderPhotos,
		renderPhotoThumbnail: _renderPhotoThumbnail
	};
})();