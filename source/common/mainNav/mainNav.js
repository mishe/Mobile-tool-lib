var template = _.template(require('./mainNav.html')),
    start={},
    height=$(window).height(),
    curHeight;
require('./mainNav.css');

module.exports = Backbone.View.extend({
    initialize: function () {
        this.getDate();
    },
    getDate: function () {
        this.cache = {
            userInfo: $.getCache('userInfo',1),
            category: $.getCache('category',1)
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
        curHeight=this.$el.find('.main-nav').height();
        return this;
    },
    events: {
        'tap .product-list-box li': 'changeSelect',
        'swipeLeft': 'hideMainNav',
        'touchmove':'cancelDefaultEvent',
        'touchstart':'touchstart'
    },
    touchstart:function(e){
        start = e.originalEvent.touches[0].clientY;
    },
    cancelDefaultEvent:function(e){
        var end =e.originalEvent.touches[0].clientY,
            scrollTop=this.$el[0].scrollTop;
        if(scrollTop==0 && end-start>0){
            e.preventDefault();
        }
        if(scrollTop==curHeight-height && end-start<0){
            e.preventDefault();
        }
    },
    hideMainNav:function(){
        var self=this;
        this.$el.translate3d(0);
        setTimeout(function () {
            self.remove();
        }, 800)
    },
    changePage: function (e) {
        var link = $(e.currentTarget).attr('data-link');
        $.changePage(link);
    }
});