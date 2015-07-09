'use strict';

define(function (require, exports, module) {
    var $ = require('$'),
        template = require('template'),
        binder = require('binder'),
        CustomSideBarView = require('CustomSideBarView');

    var ProductAddPageView = CustomSideBarView.extend({

        binderObject:null,

        //绑定的数据
        data:{
        },

        render: function () {
            var sidebar = $('#side-nav').length?undefined:template('sidebar',{cur:'manage'});
            this.renderContent({
                sidebar:sidebar,
                container:template('product/add')
            });
            this.binderObject = binder.bind(this.$elem,this.data);
        },

        events:{
            'click':{

            }
        },

        destroy:function(){
            this.binderObject.unobserve();
        }
    });
        
    module.exports = ProductAddPageView;
});