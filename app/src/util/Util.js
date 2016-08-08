"use strict";

/**
 * A set of util methods.
 */

var Util = {};

Util.extend = function(target, source) {
	for (curKey in source) {
		if (!target[curKey])
			target[curKey] = source[curKey];
	}

	return target;
};

Util.find = function(list, predicate) {
	for (var i = 0; i < list.length; i++) {
		if (predicate(list[i]))
			return list[i];
	}

	return undefined;
};

Util.findIndex = function(list, predicate) {
	for (var i = 0; i < list.length; i++) {
		if (predicate(list[i]))
			return i;
	}

	return -1;
};