"use strict";

var EventUtil = {};

EventUtil.on = function(el, type, listener, useCapture) {
	if (el.addEventListener) {
		useCapture = useCapture || false;
		el.addEventListener(type, listener, useCapture);
	} else if (el.attachEvent) {
		// IE
		el.attachEvent("on" + type, listener);
	}
};

EventUtil.off = function(el, type, listener, useCapture) {
	if (el.removeEventListener) {
		useCapture = useCapture || false;
		el.addEventListener(type, listener, useCapture);
	} else if (el.detatchEvent) {
		// IE
		el.detachEvent("on" + type, listener);
	}
};

EventUtil.trigger = function(el, type) {
	if (el.dispatchEvent) {
		var event = new Event(type);
		el.dispatchEvent(event);
	}
	// TODO add support for IE
};