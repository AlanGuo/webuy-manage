'use strict';

define(function(require, exports, module) {
	
	var request = {
		signin:{
			url:'/cgi-bin/account/signin',
			method:'post'
		},
		signup:{
			url:'/cgi-bin/account/signup',
			method:'post'
		}
	};

	module.exports = request;
});
