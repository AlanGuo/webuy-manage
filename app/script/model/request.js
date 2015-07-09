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
		uploadProductCover:{
			url:'/cgi-bin/product/uploadcover',
			method:'post',
			type:'multipart/form-data'
		}
	};

	module.exports = request;
});
