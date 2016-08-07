"use strict";

/**
 * Main app module
 */

var App = (function() {

	// private variable that stores a list of photos to be shown
	var _photos = [];

	/**
	 * Initialization includes initializing FlickrApi stub, registering event handlers,
	 * and fetching and rendering photos
	 */
	function _init() {
		FlickrApi.init(Config.API_KEY, Config.USER_ID);

		// register event handlers
		var photoContainer = document.querySelector(".photo-container");
		EventUtil.on(photoContainer, "dataChange", _renderPhotos.bind(this));
		EventUtil.on(photoContainer, "click", function(e) {
			// use event delegation to avoid attaching this handler to every image
			if(e.target && e.target.nodeName == "IMG") {
				_showPhoto(e.target.id);
			}
		});
		var searchBox = document.querySelector(".search-box");
		EventUtil.on(searchBox, "keypress", function(e) {
			if (e.keyCode != 13) // enter key
				return;

			var searchTerm = e.target.value;
			_searchPhotos(searchTerm.trim());
		});
	};

	/**
	 * Fetch a list of photos in the specified photosetId using FlickrApi. When photos are fetched,
	 * "dataChange" event is dispatched to notify app to render a view.
	 */
	function _fetchPhotos(photosetId) {
		FlickrApi.getPhotos(photosetId, function(resp) {
			// update photos and re-render view
			_photos = resp.photoset.photo;

			EventUtil.trigger(
				document.querySelector(".photo-container"), "dataChange"
			);
		});
	};

	/**
	 * Fetch a list of photos that matches the given search term. When photos are fetched,
	 * "dataChange" event is dispatched to notify app to render a view.
	 */
	function _searchPhotos(searchTerm) {
		FlickrApi.searchPhotos({text: searchTerm}, function(resp) {
			// update photos and re-render view
			_photos = resp.photos.photo;

			EventUtil.trigger(
				document.querySelector(".photo-container"), "dataChange"
			);
		})
	};

	function _renderPhotos() {
		var photoContainer = document.querySelector(".photo-container");
		var photoList = document.createElement("div");
		photoList.classList.add("photo-list");

		for (var i = 0; i < _photos.length; i++) {
			photoList.appendChild(
				_renderPhotoThumbnail(_photos[i])
			);
		}

		// delete old photos before rendering
		var oldPhotos = document.querySelector(".photo-list");
		if (oldPhotos) photoContainer.removeChild(oldPhotos);

		photoContainer.appendChild(photoList);
	};

	/**
	 * Render individual photo thumbnail.
	 */
	function _renderPhotoThumbnail(photo) {
		var photoEl = document.createElement("div");
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
		Modal.open(
			new PhotoContentProvider(photo.id, photo.title, _buildImage(photo), _boundOnPhotoNavHandler)
		);
	};

	function _onPhotoNavHandler(isNext, photoId) {
		var newIndex;
		var selectedIndex = Util.findIndex(_photos, function(curPhoto) {
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
		Modal.open(
			new PhotoContentProvider(newPhoto.id, newPhoto.title, _buildImage(newPhoto), _boundOnPhotoNavHandler)
		);
	};

	var _boundOnPhotoNavHandler = _onPhotoNavHandler.bind(this);

	/**
	 * Return a string of HTML img tag from the given photo object.
	 */
	function _buildImage(photo) {
		var photoUrl = FlickrApi.getPhotoUrl(photo, "m");
		var imageTag = '<img src="' + photoUrl + '" id="' + photo.id + '" alt="' + photo.title + '" />';

		return imageTag;
	};

	function _getPhotoById(id) {
		return Util.find(_photos, function(curPhoto) {
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
