var template = _.template(require('./hot-event.html'));
require('./hot-event.css');

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
        this.$el.find('.animate').overSlide();
        return this;
    },
    events: {
        'tap li': 'changePage',
        'tap .more-link': 'changePage2'
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