'use strict';

define(function(require, exports, module) {
	
	var request = {
		signin:{
			url:'/cgi-bin/admin/signin',
			method:'post'
		},
		signup:{
			url:'/cgi-bin/admin/signup',
			method:'post'
		}
	};

	module.exports = request;
});
