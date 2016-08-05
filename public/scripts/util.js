"use strict";

var util = {};

util.extend = function(target, source) {
	for (curKey in source) {
		if (!target[curKey])
			target[curKey] = source[curKey];
	}

	return target;
};
