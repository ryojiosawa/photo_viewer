"use strict";

var util = {};

util.extend = function(target, source) {
	for (curKey in source) {
		if (!target[curKey])
			target[curKey] = source[curKey];
	}

	return target;
};

util.find = function(list, predicate) {
	for (var i = 0; i < list.length; i++) {
		if (predicate(list[i]))
			return list[i];
	}

	return undefined;
};

util.findIndex = function(list, predicate) {
	for (var i = 0; i < list.length; i++) {
		if (predicate(list[i]))
			return i;
	}

	return -1;
};