'use strict';

define(function (require, exports, module) {
    var template = require('template'),
        SideBarView = require('SideBarView');

    var productManagepageView = SideBarView.extend({

        data:{
        },

        render: function () {
            this.renderContent({
                sidebar:template('sidebar',{}),
                container:template('product/manage',{})
            });
        }
    });
        
    module.exports = productManagepageView;
});