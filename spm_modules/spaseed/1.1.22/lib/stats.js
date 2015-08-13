/**
 * stats
 * @class stats
 * @static
 */

'use strict';

var config = require('config');
var stats = {
	requestUrl:location.protocol + '//log.hm.baidu.com/hm.gif',
	fixedData : [
 		'cc=1',
 		'ck='+(navigator.cookieEnabled?1:0),
 		'cl='+window.screen.colorDepth+'-bit',
 		'ds='+window.screen.width+'x'+window.screen.height,
 		'fl=17.0',
 		'ja='+(navigator.javaEnabled()?1:0),
 		'ln='+navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || '' ,
 		'lo=0',
 		'nv=1',
 		'si='+config.statsId,
 		'st=1',
 		'v=1.0.94',
 		'lv=2'
 	],

	 _send:function(params){
	 	var src = this.requestUrl+'?'+params.concat(this.fixedData).join('&');

        var img=new Image();
        img.onload = img.onerror = img.onabort = function() {
            img.onload = img.onerror = img.onabort = null;
            img=null;
        };
        setTimeout(function(){
            img.src=src;
        },500); 
	 },

	 /**
	  * pv,uv
	  * @method pv
	  * 统计页面pv，在页面底部调用即可
	  * @param {number} domReadyTime 
	  * @param {number} loadEventTime 
	  */
	 pv:function(domReadyTime, loadEventTime){
	 	//请求一
	 	var params = [
	 		'et=0',
	 		'rnd='+Math.round(Math.random() * 2147483647),
	 		'tt='+encodeURIComponent(document.title)
	 	];
	 	this._send(params.concat(this.fixedData));

	 	var self = this;
	 	setTimeout(function(){
	 		//请求二
	 		params = [
	 			'et=87',
	 			'ep={"netAll":1,"netDns":0,"netTcp":0,"srv":39,"dom":'+(domReadyTime?domReadyTime:0)+',"loadEvent":'+(loadEventTime?loadEventTime:0)+',"qid":"","bdDom":0,"bdRun":0,"bdDef":0}',
	 			'rnd='+Math.round(Math.random() * 2147483647),
	 			'tt='+encodeURIComponent(document.title)
	 		];
	 		self._send(params);
	 	},100);
 	},

 	/**
	  * 自定义事件
	  * @method trackEvent
	  * 自定义统计事件
	  * @param {string} category 
	  * @param {string} action 
	  * @param {string} label 
	  * @param {string} value 
	  */
 	trackEvent:function(category, action, label, value){
 		var str = [category, action, label, value];
 		var params = [
	 		'et=4',
	 		'rnd='+Math.round(Math.random() * 2147483647),
	 		'ep='+encodeURIComponent(str.join('*'))
	 	];

	 	this._send(params);
 	}
};

module.exports = stats;