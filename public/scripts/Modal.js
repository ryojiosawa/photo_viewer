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
		EventUtil.off(document.body, "keyup");
	}

	/**
	 * Render a modal lightbox.
	 */
	function _render(contentProvider) {
		var modalContainer = document.createElement("div");
		modalContainer.classList.add("modal-lightbox", "full-page");

		EventUtil.on(document.body, "keyup", _handleHotKeys.bind(this));

		// render modal
		modalContainer.appendChild(_renderModal(contentProvider));

		document.querySelector(".search-photo-results").appendChild(modalContainer);
	};

	/**
	 *  Render a modal.  Call the provided contentProvider param to produce the modal's content.
	 */
	function _renderModal(contentProvider) {
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

		return modal;
	};

	function _removeModal() {
		var modal = document.querySelector(".modal");
		document.querySelector(".modal-lightbox").removeChild(modal);		
	}

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

	function _handleHotKeys(e) {
		if (e.keyCode === 27) { // esc key
			_close();
		}
	};

	return {
		open: function(contentProvider) {
			if (_isModalOpen()) {
				// if the modal lightbox is already present, let's re-render only the modal element
				_removeModal();
				document.querySelector(".modal-lightbox")
					.appendChild(_renderModal(contentProvider));
				return;
			}

			// otherwise, render the whole modal lightbox
			_render(contentProvider);
		},
		close: function() {
			_close();
		}
	};
})();