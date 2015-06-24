'use strict';

define(function (require, exports, module) {
    var pageManager = require('pagemanager');
    //var stats = require('stats');
    var template = require('apptemplate');
    var env = require('env');

    var signuppage = {

        title: env.defaultTitle,

        render: function () {
            pageManager.html({
                container:template('account/signup')(),
                className:'login-wrapper'
            });
        },

        events:{
            'click':{
            }
        },

        destroy: function () {
        }
    };
        
    module.exports = signuppage;
});