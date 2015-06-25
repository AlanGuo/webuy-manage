'use strict';

define(function (require, exports, module) {
    var pageManager = require('pagemanager');
    //var stats = require('stats');
    var template = require('apptemplate');
    var env = require('env');
    var dialog = require('dialog');
    var binder = require('binder');
    var request = require('request');
    var formatchecker = require('formatcheck');
    var vercode = '/cgi-bin/secure/verifycode';

    var signinpage = {

        title: env.defaultTitle,

        data:{
            postedData:{
                login:'',
                userpassword:'',
                vercode:''
            },
            src:vercode
        },

        render: function () {
            pageManager.html({
                container:template('account/signin')(),
                className:'login-wrapper'
            });

            binder.bind(pageManager.container[0],this.data);
        },

        events:{
            'click':{
                'signin':function(){
                    var self = this;
                    var postedData = this.data.postedData;
                    for(var p in postedData){
                        postedData[p] = postedData[p].trim();
                    }

                    if(!formatchecker.isEmail(postedData.login) && !formatchecker.isMobile(postedData.login)){
                        dialog.showError('请填写正确的email或者手机号码');
                        return;
                    }                 
                    if(!formatchecker.isPassword(postedData.userpassword)){
                        dialog.showError('请填写正确的密码');
                        return;
                    }
                    if(!formatchecker.notEmpty(postedData.vercode)){
                        dialog.showError('请填写验证码');
                        return;
                    }

                    //注册账户
                    request.signin(this.data.postedData,function(){
                        location.href = '/';
                    },function(msg){
                        self.data.src = vercode + '?random=' + Math.random();
                        dialog.showError(msg);
                    });
                },
                'changevercode':function(){
                    this.data.src = vercode + '?random=' + Math.random();
                },
                'forgetpassword':function(){

                },
                'resetpassword':function(){

                }
            }
        },

        destroy: function () {
        }
    };
        
    module.exports = signinpage;
});