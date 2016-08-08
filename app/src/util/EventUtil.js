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
	// use createEvent() to support custom event in IE
	var event = document.createEvent("Event");
	event.initEvent(type, true, true);
	el.dispatchEvent(event);
};