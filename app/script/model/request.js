'use strict';

define(function(require, exports, module) {
	var requestmanager = require('requestmanager');

	requestmanager.add('signup', '/cgi-bin/admin/signup', 'POST');
	requestmanager.add('signin', '/cgi-bin/admin/signin', 'POST');

	module.exports = requestmanager;
});
