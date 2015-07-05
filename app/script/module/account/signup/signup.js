'use strict';

define(function (require, exports, module) {
    var $ = require('$'),
        View = require('View'),
        ErrorTips = require('ErrorTips'),
        template = require('template'),
        binder = require('binder'),
        request = require('request'),
        formatchecker = require('formatcheck'),
        vercode = '/cgi-bin/security/verifycode';

    var signuppageView = View.extend({

        $elem:$('#wrapper-all'),

        ctor:function(data){
            data.className = 'login-wrapper';
            this.$super(data);
        },

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

            this.$elem.html(template('account/signup'));
            this.$errorTips = ErrorTips.create({$elem:$('#errortips')});
            binder.bind(this.$elem,this.data);
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
                        self.$errorTips.show('请填写正确的email');
                        return;
                    }
                    if(!formatchecker.isMobile(postedData.usermobile)){
                        self.$errorTips.show('请填写正确的手机号码');
                        return;
                    }                   
                    if(!formatchecker.isPassword(postedData.userpassword)){
                        self.$errorTips.show('请填写正确的密码');
                        return;
                    }
                    if(postedData.userpassword !== postedData.repeatpassword){
                        self.$errorTips.show('两次输入的密码不相同');
                        return;
                    }
                    if(!formatchecker.notEmpty(postedData.vercode)){
                        self.$errorTips.show('请填写验证码');
                        return;
                    }

                    //注册账户
                    this.$net.request({
                        request:request.signup,
                        data:postedData,
                        success:function(){
                            location.href = '/';
                        },
                        error:function(msg){
                            self.data.src = vercode + '?random=' + Math.random();
                            self.$errorTips.show(msg);
                        }
                    });
                },
                'changevercode':function(){
                    this.data.src = vercode + '?random=' + Math.random();
                }
            }
        },

        destroy: function () {
        }
    });
        
    module.exports = signuppageView;
});