'use strict';

define(function (require, exports, module) {
    var pageManager = require('pagemanager');
    //var stats = require('stats');
    var template = require('apptemplate');
    var env = require('env');
    //var dialog = require('dialog');
    //var binder = require('binder');
    //var request = require('request');
    //var formatchecker = require('formatcheck');

    var productmanagepage = {

        title: env.defaultTitle,

        data:{
        },

        render: function () {
            pageManager.html({
                container:template('product/manage')()
            });
        },

        events:{
            'click':{
            }
        },

        destroy: function () {
        }
    };
        
    module.exports = productmanagepage;
});