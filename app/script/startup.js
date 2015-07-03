'use strict';

define(function(require, exports, module) {
	var App = require('App');
	var config = require('config');
	var $ = require('$');
	//应用入口函数
    var startup = function(container){
		container = container || $('#wrapper-all');
		var app = App.create($.extend(config,{
			title:'WeBuy',
			$elem:container,
			netback:function(options,ret){
				if(ret.code === 403){
					//跳转到登录
					app.$router.loadUrl('/account/signin');
				}
			}
		}));
		app.startup();
	};

    module.exports = startup;
});
