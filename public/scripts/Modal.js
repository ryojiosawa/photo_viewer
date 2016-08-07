/**
 * A simple Modal lightbox component.
 */
var Modal = (function() {

	/**
	 * Close a Modal if it's present.
	 */
	function _close() {
		if (!_isModalOpen()) return;

		var modalContainer = document.querySelector(".modal-lightbox");
		document.querySelector(".search-photo-results").removeChild(modalContainer);
	}

	/**
	 * Render a modal lightbox and shows the content provided by the given contentProvider.
	 */
	function _render(contentProvider) {
		var modalContainer = document.createElement("div");
		modalContainer.classList.add("modal-lightbox", "full-page");

		var modal = document.createElement("div");
		modal.classList.add("modal");
		var header = document.createElement("div");
		header.classList.add("modal-header");
		header.appendChild(_buildCloseLink());

		var body = document.createElement("div");
		body.classList.add("modal-body");

		var modalContent = document.createElement("div");
		modalContent.classList.add("modal-content");
		// insert the content
		modalContent.appendChild(contentProvider.build());

		body.appendChild(modalContent);
		modal.appendChild(header);
		modal.appendChild(body);
		modalContainer.appendChild(modal);
		document.querySelector(".search-photo-results").appendChild(modalContainer);
	};

	function _buildCloseLink() {
		var closeLink = document.createElement("a");
		closeLink.setAttribute("href", "#0");
		closeLink.classList.add("modal-close");
		EventUtil.on(closeLink, "click", function() {
			_close();
		}.bind(this));

		closeLink.appendChild(document.createTextNode("Back"));
		return closeLink;
	}

	function _isModalOpen() {
		return document.querySelector(".modal-lightbox") != null;
	}

	return {
		open: function(contentProvider) {
			if (_isModalOpen())
				_close();

			_render(contentProvider);
		},
		close: function() {
			_close();
		}
	};
})();