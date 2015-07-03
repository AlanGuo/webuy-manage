'use strict';

define(function (require, exports, module) {
    var template = require('template'),
        SideBarView = require('SideBarView');

    var productmanagepageView = SideBarView.extend({

        data:{
        },

        render: function () {
            this.renderContent({
                sidebar:template('sidebar',{}),
                container:template('index',{})
            });
        }
    });
        
    module.exports = productmanagepageView;
});