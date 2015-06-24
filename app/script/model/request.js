'use strict';

define(function(require, exports, module) {
	var requestmanager = require('requestmanager');

	requestmanager.add('sample', '/cgi/sample', 'GET', function(data, cb){
		setTimeout(function(){
			if(cb){
				cb(data);
			}
		},100);
	});

	module.exports = requestmanager;
});
