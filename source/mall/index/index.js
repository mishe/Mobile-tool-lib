var template = _.template(require('./index.html')),
    touchStartX,
    pageWidth = $(window).width();
require('./index.css');

module.exports = Backbone.View.extend({
    initialize: function (options) {
        this.render();
    },
    render: function () {
        this.$el.html(template());
        this._initEvent();
        return this;
    },
    _initEvent: function () {
        this.$el.find('.animate').overSlide();
        var header = require('../../common/header/header');
        new header({el: this.$el.find('.header-box'), type: 1});

        var Banner = require('../../common/banner/banner');
        new Banner({el: this.$el.find('.banner-box'), cache: '111'});

        var MyExclusive = require('./my-exclusive/my-exclusive');
        new MyExclusive({el: this.$el.find('.my-exclusive-box'), cache: '23123'});

        var HotEvent = require('./hot-event/hot-event');
        new HotEvent({el: this.$el.find('.hot-event-box'), cache: '23123'});

        var HotEvent = require('./recommend/recommend');
        new HotEvent({el: this.$el.find('.recommend-box'), cache: '23123'});

        var ProductList = require('../../common/product-list/product-list');
        new ProductList({el: this.$el.find('.product-list-box ul'), cache: '111234487'});
        this.$el.pullRefresh({})
    },
    events: {
        'tap .index-nav li': 'changePage',
        'tap .add-cart-btn': 'addCart',
        'touchstart': 'recordTouchStart',
        'swipeLeft': 'showShopCart',
        'swipeRight': 'showMainNav'
    },
    showMainNav: function () {
        if (touchStartX < 50) {
            $.showMainNav();
        }
        return false;
    },
    recordTouchStart: function (e) {
        touchStartX = e.originalEvent.touches[0].clientX;
    },
    showShopCart: function (e) {
        //if(!$(e.target).parents('.overSilder').length && touchStartX>pageWidth-50){
        if (touchStartX > pageWidth - 50) {
            $.showShopCart();
            return false;
        }
    },
    addCart: function (e) {
        var obj = $(e.currentTarget);
        if (obj.text() != '加入购物车') {
            return;
        }
        obj.addCart();
        return false;
    },
    changePage: function () {
        $.changePage('st');
    }
});

