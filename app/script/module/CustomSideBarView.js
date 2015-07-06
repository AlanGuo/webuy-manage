'use strict';

define(function(require, exports, module){
	var $ = require('$'),
		SideBarView = require('SideBarView');
	
	var CustomSideBarView = SideBarView.extend({
		$elem:$('#wrapper-all'),
		/*其他控制元素*/
		elements:{},

		ctor:function(data){
			data.sidebarData = {user:'alan'};
			this.$super(data);
		}
	});

	module.exports = CustomSideBarView;
});
