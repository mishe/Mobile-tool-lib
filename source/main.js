window.underscore=window._=require('./../component/underscore.js');
window.Backbone=require('./../component/backbone.js');
window.store = require('./../component/store');
require('./base/base.css');
require('./../component/helper');
require('./../component/touch');

window.fresh = {
    cache: {},
    loadDate: 0,
    apiRoot:'',
    init: function () {
        this.$body = $('body');
        this.$main = $('#mainPage');
        this.$content = $('#content');
        this.$footer = $('#footer');
        this.$bubble = $('#bubble');
        var Router = require('./router.js');
        window.fresh.router = new Router;
        Backbone.history.start({pushState: false});
        //var footer = require('../source/common/footer/footer');
        //new footer({el: $footer});
    }
};
$(function(){
    fresh.init();
});
