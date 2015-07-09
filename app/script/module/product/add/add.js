'use strict';

define(function (require, exports, module) {
    var $ = require('$'),
        template = require('template'),
        request = require('request'),
        binder = require('binder'),
        CustomSideBarView = require('CustomSideBarView');

    var ProductAddPageView = CustomSideBarView.extend({

        binderObject:null,

        //绑定的数据
        data:{
            uploading:false,
            files:[]
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
                'uploadCover':function(){
                    document.getElementById('file-choose').click();
                }
            },
            'change':{
                'filechange':function(){
                    var self = this;
                    this.data.uploading = true;
                    this.$net.request({
                        request:request.uploadProductCover,
                        data:this.files[0],
                        success:function(){
                            self.data.uploading = false;
                        },
                        error:function(){
                            self.data.uploading = false;
                        }
                    });
                }
            }
        },

        destroy:function(){
            this.binderObject.unobserve();
        }
    });
        
    module.exports = ProductAddPageView;
});