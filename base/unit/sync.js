module.exports = function (options) {
    var defaultSetting = {
            checkNetwork: true,
            timeout: 20000
        },
        opt = $.extend(true, defaultSetting, options),
        type = (opt.type || 'get').toLowerCase();
    if (type == 'get') {
        if (opt.data) {
            opt.data.uniq = $.uniqID();
        }else {
            opt.data = {
                uniq: $.uniqID()
            };
        }
    }
    if (!opt.checkNetwork || (opt.checkNetwork && $.checkNetwork())) {
        var data = {
            url: opt.url,
            type: type,
            data: opt.data,
            dataType:'json',
            timeout:opt.timeout,
            success:function(d){
                if (opt.loading) $(opt.loading).hide();
                if (d.result == 1) {
                    opt.success && opt.success(d.data);
                } else if (opt.error && $.type(opt.error) === 'function') {
                    opt.error(d);
                } else {
                    $.toast(d.message, 500);
                }
            },
            error:function(d){
                if (opt.loading) $(opt.loading).hide();
                if (opt.error && $.type(opt.error) === 'function') {
                    opt.error(d);
                }else {
                    $.serverError();
                }
            }
        };
        if (opt.loading) $(opt.loading).show();
        $.ajax(data);
    }
}