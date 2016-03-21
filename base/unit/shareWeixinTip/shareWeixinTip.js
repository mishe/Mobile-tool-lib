var template=require('./shareWeixinTip.html');
module.exports = function () {
    var html = $(template());
    $('body').append(html);
    html.on('tap', function (e) {
        var obj = $(e.target);
        if (obj.hasClass('btn_login')) {
            $.login();
        }
        html.remove();
    });
}