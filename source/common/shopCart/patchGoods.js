var template = _.template(require('./patchGoods.html'));
module.exports = function (obj, bl) {
    if (bl) {
        if ($.trim(obj.html()) != '') {
            obj.fadeIn();
        } else {
            var patchGoods = $.getCache('patchGoods', 1);
            if (!patchGoods) {
                obj.html(template(patchGoods));
            } else {
                $.sync({});
            }
        }
    } else {
        obj.fadeOut();
    }
}
