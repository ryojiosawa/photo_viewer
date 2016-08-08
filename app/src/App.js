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
		var photoContainer = document.querySelector(".search-photo-results");
		EventUtil.on(photoContainer, "dataChange", _renderPhotos.bind(this));
		EventUtil.on(photoContainer, "click", function(e) {
			// use event delegation to avoid attaching this handler to every image
			if(e.target && e.target.className === "photo-thumbnail") {
				_showPhoto(e.target.id);
			}
		}.bind(this));
		var searchBox = document.querySelector(".search-box");
		EventUtil.on(searchBox, "keypress", function(e) {
			if (e.keyCode != 13) // enter key
				return;

			var searchTerm = e.target.value.trim();
			if (!searchTerm) return;

			_searchPhotos(searchTerm);
		});
		EventUtil.on(document.body, "request_begin", _showSpinner.bind(this));
		EventUtil.on(document.body, "request_finish", _hideSpinner.bind(this));

		// for test
		//_fetchPhotos("72157626553199177");
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
				document.querySelector(".search-photo-results"), "dataChange"
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
				document.querySelector(".search-photo-results"), "dataChange"
			);
		})
	};

	function _renderPhotos() {
		var photoList = document.querySelector(".photo-list");
		var photoContainer = document.querySelector(".search-photo-results");

		// delete old photoList before rendering if exists
		if (photoList)
			photoContainer.removeChild(photoList);

		photoList = document.createElement("div");
		photoList.classList.add("photo-list");

		if (_photos.length === 0) {
			photoList.innerHTML = '<span class="no-results">No matching photos found.</span>';
			return photoContainer.appendChild(photoList);
		}

		for (var i = 0; i < _photos.length; i++) {
			photoList.appendChild(
				_renderPhotoThumbnail(_photos[i])
			);
		}

		photoContainer.appendChild(photoList);
	};

	/**
	 * Render individual photo thumbnail.
	 */
	function _renderPhotoThumbnail(photo) {
		var photoEl = document.createElement("div");
		photoEl.setAttribute("id", photo.id);
		photoEl.classList.add("photo-thumbnail");

		photoEl.style.backgroundImage = "url(" + FlickrApi.getPhotoUrl(photo, "m") + ")";
		return photoEl;
	};

	/**
	 * Show the photo specified by the given id in a modal
	 */
	function _showPhoto(photoId) {
		var photo = _getPhotoById(photoId);
		var index = _getIndexById(photoId);

		var prevDisabled = index === 0 ? true : false;
		var nextDisabled = index === (_photos.length - 1) ? true : false;

		Modal.open(
			new PhotoContentProvider(
				photo.id,
				photo.title,
				_buildImage(photo),
				_boundOnPhotoNavHandler,
				prevDisabled,
				nextDisabled
			)
		);
	};

	/**
	 * Event handler to call when Next/Previous link is clicked
	 */
	function _onPhotoNavHandler(isNext, photoId) {
		var selectedIndex = Util.findIndex(_photos, function(curPhoto) {
			return curPhoto.id === photoId;
		});

		// invalid photoId
		if (selectedIndex === -1) return;

		if (isNext) {
			if (selectedIndex === _photos.length - 1) return; // last photo
			selectedIndex++;
		} else {
			if (selectedIndex === 0) return; // first photo
			selectedIndex--;
		}

		var newPhoto = _photos[selectedIndex];
		var prevDisabled = selectedIndex === 0 ? true : false;
		var nextDisabled = selectedIndex === (_photos.length - 1) ? true : false;

		Modal.open(
			new PhotoContentProvider(
				newPhoto.id,
				newPhoto.title,
				_buildImage(newPhoto),
				_boundOnPhotoNavHandler,
				prevDisabled,
				nextDisabled
			)
		);
	};

	var _boundOnPhotoNavHandler = _onPhotoNavHandler.bind(this);

	/**
	 * Return a string of HTML img tag from the given photo object.
	 */
	function _buildImage(photo) {
		var photoUrl = FlickrApi.getPhotoUrl(photo, "z");
		var imageTag = '<img src="' + photoUrl + '" id="' + photo.id + '" alt="' + photo.title + '" />';

		return imageTag;
	};

	function _getPhotoById(id) {
		return Util.find(_photos, function(curPhoto) {
			return curPhoto.id === id;
		});
	};

	function _getIndexById(id) {
		return Util.findIndex(_photos, function(curPhoto) {
			return curPhoto.id === id;
		});
	};

	function _showSpinner() {
		var spinner = document.createElement("div");
		spinner.classList.add("spinner");
		spinner.innerHTML = '<img src="../images/spinner.gif" />';

		document.body.appendChild(spinner);
	};

	function _hideSpinner() {
		var spinner = document.querySelector(".spinner");
		document.body.removeChild(spinner);
	};

	// public methods
	return {
		init: _init,
		fetchPhotos: _fetchPhotos,
		renderPhotos: _renderPhotos,
		renderPhotoThumbnail: _renderPhotoThumbnail
	};
})();
