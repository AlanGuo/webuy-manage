'use strict';

define(function(require, exports, module) {
	var spaseedEntry = require('entry');

	//应用入口函数
    var entry = {
    	startup : function () {
    		//spaseed初始化
	        spaseedEntry.init();
	    }
    };

    module.exports = entry;
});