module.exports = function (obj, ajaxUrl, callback) {
    var praiseNumObj = obj.find('.praise_num');
    if ($.checkUser()) {
        $.sync({
            url: ajaxUrl,
            type: 'post',
            success: function () {
                var praiseNum = parseInt(praiseNumObj.text());
                praiseNum = isNaN(praiseNum) ? 0 : praiseNum;
                praiseNumObj.text(praiseNum + 1);
                obj.addClass('animate_praise').append('<span class="praise_add_one">+1</span>');
                setTimeout(function () {
                    obj.find('.praise_add_one').remove();
                }, 1500);
                callback && callback();
            },
            error: function (d) {
                if (d.status == -7340064) {
                    if (praiseNumObj.length) {
                        praiseNumObj.text('已赞');
                    } else {
                        $.toast('您已经点过赞了~');
                    }
                } else {
                    $.toast(d.message);
                }
            }
        });
    }
}