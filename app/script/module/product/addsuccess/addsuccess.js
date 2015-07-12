'use strict';

define(function (require, exports, module) {
    var $ = require('$'),
        template = require('template'),
        CustomSideBarView = require('CustomSideBarView');

    var ProductAddSuccessPageView = CustomSideBarView.extend({

        render: function () {
            var sidebar = $('#side-nav').length?undefined:template('sidebar',{cur:'manage'});
            this.renderContent({
                sidebar:sidebar,
                container:template('product/addsuccess')
            });
            this.binderObject = binder.bind(this.$elem,this.data);
        },

        events:{
            'click':{
                'continue':function(){

                },
                'returnToList':function(){

                }
            }
        },

        destroy:function(){
        }
    });
        
    module.exports = ProductAddSuccessPageView;
});