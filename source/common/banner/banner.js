var template = _.template(require('./banner.html'));
require('./banner.css');

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
        this.$el.find('.animate').bannerSlider(this.$el.find('.pages'), 3000);
        return this;
    },
    events: {
        'tap .animate li': 'changePage',
    },
    changePage: function (e) {
        var link = $(e.currentTarget).attr('data-link');
        $.changePage(link);
    }
});