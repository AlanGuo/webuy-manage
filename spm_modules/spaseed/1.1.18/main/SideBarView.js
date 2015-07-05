'use strict';

define(function(require, exports, module){
	var $ = require('$'),
		View = require('View'),
		MenuView = require('MenuView'),
		template = require('template');
	
	var SideBarView = View.extend({
		$elem:$('#wrapper-all'),
		/*其他控制元素*/
		elements:{},

		ctor:function(data){
			this.$super(data);

			var sidebar = $(data.sidebar || '#sidebar'),
				container = $(data.container || '#container');

			if(!sidebar.length || !container.length){
				this.$elem.html(template('sidebartemplate'));
				this.elements.$sidebar = $(data.sidebar ||'#sidebar');
				this.elements.$container = $(data.container ||'#container');
			}
			else{
				this.elements.$sidebar = sidebar;
				this.elements.$container = container;
			}

			data.$elem = this.elements.$sidebar;
			//menuview控制
			this.$menu = new MenuView(data);
		},

		renderContent:function(option){
			this.elements.$container.html(option.container);
			this.elements.$sidebar.html(option.sidebar);

			this.$menu.render();
		},

		/*重载*/
		render:function(){
		},
		/*重载*/
		reload:function(){
		},
		/*重载*/
		destroy:function(){
			//移除事件
			this.$super();
		}
	})

	module.exports = SideBarView;
})
