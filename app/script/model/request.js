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
		},
		getproduct:{
			url:'/cgi-bin/product/get'
		},
		addproduct:{
			url:'/cgi-bin/product/add',
			method:'post',
			contentType:false
		}
	};

	module.exports = request;
});
