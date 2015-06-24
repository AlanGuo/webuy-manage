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
                }
            }
        },

        destroy: function () {
        }
    };
        
    module.exports = signinpage;
});