window.underscore=window._=require('./libs/underscore.js');
window.Backbone=require('./libs/backbone.js');
window.store = require('./libs/store');
require('./base.css');
require('./helper');
require('./libs/touch');

window.fresh = {
    cache: {},
    loadDate: 0,
    cfg:{
        upload:'',
        batch:'',
        passport:''
    },
    userInfo: {
    },
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
    var userInfo= $.getCache('userInfo',1);
    if(userInfo){
        $.sync({
            url:'',
            type:'get',
            success:function(d){
                $.setCache('userInfo',d,0,1);
            }
        });
    }

});