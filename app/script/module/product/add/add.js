'use strict';

define(function (require, exports, module) {
    var $ = require('$'),
        template = require('template'),
        request = require('request'),
        binder = require('binder'),
        ErrorTips = require('ErrorTips'),
        CustomSideBarView = require('CustomSideBarView');

    var ProductAddPageView = CustomSideBarView.extend({

        binderObject:null,

        //绑定的数据
        data:{
            coverSelected:false,
            coverData:'',
            bannerData:'',
            bannerSelected:false,
            formdata:{
                serial:'',
                name:'',
                type:0,
                price:0,
                timeleft:30,
                count:1,
                detail:'',
                bannerFiles:[],
                coverFiles:[]
            }
        },

        render: function () {
            var sidebar = $('#side-nav').length?undefined:template('sidebar',{cur:'manage'});
            this.renderContent({
                sidebar:sidebar,
                container:template('product/add')
            });

            this.$errorTips = ErrorTips.create({$elem:$('#errortips')});
            this.binderObject = binder.bind(this.$elem,this.data);
        },

        prepare:function(onthecourt){
            //这里检查输入的合法性
            var formdata = new FormData();
            for(var p in this.data.formdata){
                if(/files/i.test(p)){
                    if(this.data.formdata[p].length){
                        formdata.append(p,this.data.formdata[p][0]);
                    }
                }
                else{
                    formdata.append(p,this.data.formdata[p]);
                }
            }

            formdata.append('onthecourt',onthecourt);

            var self = this;
            //更新数据
            this.$net.request({
                request:request.addproduct,
                data:formdata,
                success:function(result){
                    if(!result.code){
                        self.$router.loadUrl('/product/addsuccess');
                    }
                },
                error:function(msg){
                    self.$errorTips.show(msg);
                }
            });
        },

        events:{
            'click':{
                'uploadCover':function(){
                    $('#cover-file-choose').click();
                },
                'uploadBanner':function(){
                    $('#banner-file-choose').click();
                },
                'save':function(){
                    this.prepare(0);
                },
                'saveAndPublish':function(){
                    this.prepare(1);
                }
            },
            'change':{
                'coverChange':function(){
                    var self = this;
                    this.data.coverSelected = true;
                    var reader = new FileReader();
                    reader.onload = function(e){
                        self.data.coverData = e.target.result;
                    };
                    reader.readAsDataURL(this.data.formdata.coverFiles[0]);
                },
                'bannerChange':function(){
                    var self = this;
                    this.data.bannerSelected = true;
                    var reader = new FileReader();
                    reader.onload = function(e){
                        self.data.bannerData = e.target.result;
                    };
                    reader.readAsDataURL(this.data.formdata.bannerFiles[0]);
                }
            }
        },

        destroy:function(){
            this.binderObject.unobserve();
        }
    });
        
    module.exports = ProductAddPageView;
});