var template = _.template(require('./header.html'));
require('./header.css');

module.exports = Backbone.View.extend({
    initialize: function (options) {
        this.type = options.type || '';
        this.render();
    },
    render: function () {
        this.$el.html(template(this.cache));
        return this;
    },
    events: {
        'tap .header-options': 'showMainNav',
        'tap .shopping-cart': 'shopCart',
        'touchstart':'recordTouchStart'
    },
    showMainNav: function (e) {
        $.showMainNav();
        return false;
    },
    shopCart: function () {
        $.showShopCart();
        return false;
    }
});