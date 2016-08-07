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
		document.querySelector(".photo-container").removeChild(modalContainer);
	}

	/**
	 * Render a modal lightbox and shows the content provided by the given contentProvider.
	 */
	function _render(contentProvider) {
		var modalContainer = document.createElement("div");
		modalContainer.classList.add("modal-lightbox", "full-page");

		var modal = document.createElement("div");
		modal.classList.add("modal");

		var modalBody = document.createElement("div");
		modalBody.classList.add("modal-body");

		var modalContent = document.createElement("div");
		modalContent.classList.add("modal-content");
		// insert the content
		modalContent.appendChild(contentProvider.build());

		modalBody.appendChild(_buildCloseButton());
		modalBody.appendChild(modalContent);
		modal.appendChild(modalBody);
		modalContainer.appendChild(modal);
		document.querySelector(".photo-container").appendChild(modalContainer);
	};

	function _buildCloseButton() {
		var closeBtn = document.createElement("button");
		closeBtn.classList.add("close-button");
		EventUtil.on(closeBtn, "click", function() {
			_close();
		}.bind(this));
		closeBtn.appendChild(document.createTextNode("Close"));
		return closeBtn;
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