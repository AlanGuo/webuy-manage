'use strict';


define(function(require, exports, module) {
	var $ = require('$');
	var spaseedConfig = require('spm_modules/spaseed/1.1.17/config');
	//参数配置
	var config = $.extend(true,spaseedConfig,{
	});

	module.exports = config;
});
