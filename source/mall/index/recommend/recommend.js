var template = _.template(require('./recommend.html'));
require('./recommend.css');

module.exports = Backbone.View.extend({
    initialize: function (options) {
        this.cache = options.cache || '';
        this.getDate();
    },
    getDate: function () {
        if (this.cache) {
            this.render();
        } else {
            $.sync({})
        }
    },
    render: function () {
        this.$el.html(template(this.cache));
        this.$el.find('.animate').overSlides();
        return this;
    },
    events: {
        'tap .animate li': 'changePage',
        'tap .recommend-pic-box': 'changePage2'
    },
    changePage: function (e) {
        var link = $(e.currentTarget).attr('data-link');
        $.changePage(link);
    },
    changePage2: function (e) {
        var link = $(e.currentTarget).attr('data-link');
        $.changePage(link);
    }
});