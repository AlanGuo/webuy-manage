'use strict';

define(function(require, exports, module) {
	var requestmanager = require('requestmanager');

	requestmanager.add('signup', '/cgi-bin/admin/signup', 'POST');

	module.exports = requestmanager;
});
