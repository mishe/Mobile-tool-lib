var template = _.template(require('./mainNav.html')),
    toucheStartY = {},
    height = $(window).height(),
    width = $(window).width(),
    curHeight,
    toucheStartX;
require('./mainNav.css');

module.exports = Backbone.View.extend({
    initialize: function () {
        this.getDate();
    },
    getDate: function () {
        this.cache = {
            userInfo: $.getCache('userInfo', 1),
            category: $.getCache('category', 1)
        };
        if (this.cache) {
            this.render();
        } else {
            $.sync({})
        }
    },
    render: function () {
        this.$el.html(template(this.cache));
        this.$el.translate3d($(window).width());
        return this;
    },
    _showCate: function (obj) {
        var self = this;
        if (obj.hasClass('open')) {
            obj.removeClass('open').find('ul').slideUp();
        } else {
            obj.addClass('open').find('ul').slideDown(function () {
                var top = obj[0].getBoundingClientRect().top;
                self.$el[0].scrollTop = self.$el[0].scrollTop + top;
            });
        }
    },
    events: {
        'tap .product-list-box li': 'changeSelect',
        'swipeLeft': 'hideMainNav',
        'touchmove': 'cancelDefaultEvent',
        'touchstart': 'touchstart',
        'tap .category-list li': 'showCate'
    },
    showCate: function (e) {
        var obj = $(e.currentTarget),
            self = this;
        if (obj.siblings('.open').length) {
            obj.siblings('.open').removeClass('open').find('ul').slideUp();
        }
        this._showCate(obj);
        return false;
    },
    touchstart: function (e) {
        toucheStartY = e.originalEvent.touches[0].clientY;
        toucheStartX = e.originalEvent.touches[0].clientX;
        curHeight = this.$el.find('.main-nav').height();
    },
    cancelDefaultEvent: function (e) {
        var end = e.originalEvent.touches[0].clientY,
            scrollTop = this.$el[0].scrollTop;
        if (scrollTop == 0 && end - toucheStartY > 0) {
            e.preventDefault();
        }
        if (scrollTop == curHeight - height && end - toucheStartY < 0) {
            e.preventDefault();
        }
    },
    hideMainNav: function () {
        var self = this;
        if (toucheStartX > width - 50) {
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