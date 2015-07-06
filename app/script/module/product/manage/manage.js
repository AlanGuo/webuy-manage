'use strict';

define(function (require, exports, module) {
    var $ = require('$'),
        template = require('template'),
        request = require('request'),
        asyncRequest = require('asyncrequest'),
        CustomSideBarView = require('CustomSideBarView');

    var ProductManagepageView = CustomSideBarView.extend({

        render: function () {
            var sidebar = $('#side-nav').length?undefined:template('sidebar',{cur:'manage'});
            this.renderContent({
                sidebar:sidebar,
                container:template('product/manage')
            });

            this.elements.$tablebody = $('#tbody');

            var self = this;
            asyncRequest.all(this.$net,
            [{
                request:request.getproduct,
                params:{onthecourt:false}
            }],
            function(data){
                self.elements.$tablebody.html(template('product/productitem',data[0]));
            },function(){
            });
        }
    });
        
    module.exports = ProductManagepageView;
});