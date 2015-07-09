'use strict';

define(function (require, exports, module) {
    var $ = require('$'),
        template = require('template'),
        request = require('request'),
        asyncRequest = require('asyncrequest'),
        binder = require('binder'),
        CustomSideBarView = require('CustomSideBarView');

    var ProductManagePageView = CustomSideBarView.extend({

        pageSize: 10,

        binderObject:null,

        //绑定的数据
        data:{
            activeTab:'offthecourt',
            gridData:[]
        },

        render: function () {
            var sidebar = $('#side-nav').length?undefined:template('sidebar',{cur:'manage'});
            this.renderContent({
                sidebar:sidebar,
                container:template('product/manage')
            });
            this.loadGrid(0,0,0);
            this.binderObject = binder.bind(this.$elem,this.data);
        },

        loadGrid:function(onthecourt,expired, begin){
            var self = this;
            asyncRequest.all(this.$net,[{
                request:request.getproduct,
                params:{onthecourt:onthecourt, expired:expired, begin:begin, size:self.pageSize}
            }],
            function(data){
                self.data.gridData = data[0].product;
            },
            function(){
            });
        },

        events:{
            'click':{
                'offthecourt':function(){
                    this.data.activeTab = 'offthecourt';
                    this.loadGrid(0,0,0);
                },
                'onthecourt':function(){
                    this.data.activeTab = 'onthecourt';
                    this.loadGrid(1,0,0);
                },
                'expired':function(){
                    this.data.activeTab = 'expired';
                    this.loadGrid(1,1,0);
                },
                'oncourt':function(){

                },
                'offcourt':function(){

                },
                'delete':function(){

                }
            }
        },

        destroy:function(){
            this.binderObject.unobserve();
        }
    });
        
    module.exports = ProductManagePageView;
});