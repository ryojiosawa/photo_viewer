"use strict";

var utils = {};

utils.extend = function(target, source) {
	for (curKey in source) {
		if (!target[curKey])
			target[curKey] = source[curKey];
	}

	return target;
};