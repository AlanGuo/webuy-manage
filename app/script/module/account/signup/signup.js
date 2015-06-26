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
    var vercode = '/cgi-bin/security/verifycode';

    var signuppage = {

        title: env.defaultTitle,

        data:{
            postedData:{
                useremail:'',
                usermobile:'',
                userpassword:'',
                repeatpassword:'',
                vercode:''
            },
            src:vercode
        },

        render: function () {
            pageManager.html({
                container:template('account/signup')(),
                className:'login-wrapper'
            });

            binder.bind(pageManager.container[0],this.data);
        },

        events:{
            'click':{
                'signup':function(){
                    var self = this;
                    var postedData = this.data.postedData;
                    for(var p in postedData){
                        postedData[p] = postedData[p].trim();
                    }

                    if(!formatchecker.isEmail(postedData.useremail)){
                        dialog.showError('请填写正确的email');
                        return;
                    }
                    if(!formatchecker.isMobile(postedData.usermobile)){
                        dialog.showError('请填写正确的手机号码');
                        return;
                    }                   
                    if(!formatchecker.isPassword(postedData.userpassword)){
                        dialog.showError('请填写正确的密码');
                        return;
                    }
                    if(postedData.userpassword !== postedData.repeatpassword){
                        dialog.showError('两次输入的密码不相同');
                        return;
                    }
                    if(!formatchecker.notEmpty(postedData.vercode)){
                        dialog.showError('请填写验证码');
                        return;
                    }

                    //注册账户
                    request.signup(this.data.postedData,function(){
                        location.href = '/';
                    },function(msg){
                        self.data.src = vercode + '?random=' + Math.random();
                        dialog.showError(msg);
                    });
                },
                'changevercode':function(){
                    this.data.src = vercode + '?random=' + Math.random();
                }
            }
        },

        destroy: function () {
        }
    };
        
    module.exports = signuppage;
});