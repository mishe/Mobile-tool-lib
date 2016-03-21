var template = _.template(require('./shopCart.html')),
    timeout,
    scrollTop,
    toucheStartX;
require('./shopCart.css');

module.exports = Backbone.View.extend({
    initialize: function () {
        this.getDate();
    },
    getDate: function () {
        this.cache = $.getCache('cart', 1);
        if (this.cache) {
            this.render();
        } else {
            $.sync({})
        }
    },
    render: function () {
        var count = this._calc();
        this.$el.html(template({data: this.cache, count: count}));
        if (_.size(this.cache) == 0) {
            alert('购物车为空')
        }
        this.$el.translate3d(-$(window).width());
        return this;
    },
    _calc: require('./calcPrice'),
    _saveCache: function (bl) {
        var self = this;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            $.setCache('cart', self.cache, 0, 1);
            self._calc(self.cache, function (count) {
                self._changeCartStatus(self.$el, count, function (bl) {
                    self._patchGoods(self.$el.find('.patch-goods'), bl)
                });
            });
        }, 100);
    },
    _changeCartStatus: require('./changeCartStatus'),
    _patchGoods: require('./patchGoods'),
    _removeProduct: function (obj, id) {
        var self = this;
        $.popWindow({
            content: '您确认要删除该商品吗？',
            type: 2,
            yes: '确认',
            no: '取消',
            callback: function (bl) {
                if (bl) {
                    delete self.cache[id];
                    obj.remove();
                    self._saveCache();
                }
            }
        });
    },
    events: {
        'tap .product-list-box li': 'changeSelect',
        'swipeRight': 'hideCart',
        'tap .add-cart-less': 'cartLess',
        'tap .add-cart-more': 'cartMore',
        'tap .product-del-btn': 'removeProduct',
        'tap .select-all': 'selectAll',
        'tap .checkout-btn': 'checkout',
        'touchmove': 'cancelDefaultEvent',
        'touchstart': 'toucheStartX'
    },
    toucheStartX: function (e) {
        toucheStartX = e.originalEvent.touches[0].clientX;
    },
    cancelDefaultEvent: function (e) {
        e.preventDefault();
    },
    checkout: function () {
        if ($.checkUser()) {
        }
    },
    selectAll: function (e) {
        if (!_.size(this.cache)) {
            return false;
        }
        var s = 1,
            obj = $(e.currentTarget);
        if (obj.hasClass('selected')) {
            s = 0;
            obj.removeClass('selected');
            this.$el.find('.product-list-box li').removeClass('selected');
        } else {
            obj.addClass('selected');
            this.$el.find('.product-list-box li').addClass('selected');
        }
        _.each(this.cache, function (d) {
            d.selected = s;
        });
        this._saveCache();
    },
    removeProduct: function (e) {
        var obj = $(e.currentTarget).parents('li'),
            id = obj.attr('data-id');
        this._removeProduct(obj, id);
        return false;
    },
    cartLess: function (e) {
        var obj = $(e.currentTarget),
            parent = obj.parents('li'),
            id = parent.attr('data-id'),
            pd = this.cache[id];
        pd.num -= 1;
        if (pd.num == 0) {
            pd.num = 1;
            this._removeProduct(parent, id);
            return false;
        }
        obj.next().next().html(pd.num);
        this._saveCache();
        return false;
    },
    cartMore: function (e) {
        var obj = $(e.currentTarget),
            parent = obj.parents('li'),
            id = parent.attr('data-id'),
            pd = this.cache[id];
        pd.num += 1;
        obj.next().html(pd.num);
        this._saveCache();
        return false;
    },
    changeSelect: function (e) {
        var obj = $(e.currentTarget),
            id = obj.attr('data-id'),
            selected = 1;
        if (obj.hasClass('selected')) {
            obj.removeClass('selected');
            selected = 0;
        } else {
            obj.addClass('selected');
        }
        this.cache[id].selected = selected;
        this._saveCache();
    },
    hideCart: function () {
        var self = this;
        if (toucheStartX < 50) {
            this.$el.translate3d(0);
            setTimeout(function () {
                self.remove();
            }, 800);
        }
    },
    changePage: function (e) {
        var link = $(e.currentTarget).attr('data-link');
        $.changePage(link);
    }
});