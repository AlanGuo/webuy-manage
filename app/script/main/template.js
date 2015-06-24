'use strict';

define(function(require, exports,module) {
	var env = require('env');
	var apptemplate = require('apptemplate');

    module.exports = function(tid,data){
    	data = data || {};
    	data.env = env;
    	return apptemplate(tid,data);
    };
});