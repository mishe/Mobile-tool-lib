module.exports = function (options) {
    var defaultSetting = {
            loading: '.loading',
            padding: 200,
            url: '',
            loadFirstPage: false,
            type:'get',
            data: {
                start: 1,
                limit: 10,
                pageType: 1
            },
            success: function () {
            },
            error: null
        },
        opt = $.extend(true, defaultSetting, options),
        windowHeight = $(window).height(),
        loading = false,
        uniqID = $.uniqID(),
        curPage = typeof opt.data.currentPage != "undefined" ? opt.data.currentPage : opt.data.page;

    function loadData() {
        opt.data.currentPage = curPage;
        opt.data.page = curPage;
        
        var data = {
            url: opt.url,
            type: opt.type,
            contentBox: '',
            data: opt.data,
            success: function (d) {
                var hasMore = true;
                if(d && d.data && d.data.salOfList){
                    if (!d || Math.ceil(d.totalCount / opt.data.limit) <= curPage||d.data.salOfList.length==0) {
                        $(window).off('scroll.' + uniqID);
                        hasMore = false;
                    }
                }else if(d && d.list && d.list.length < opt.data.count){
                    $(window).off('scroll.' + uniqID);
                     hasMore = false;
                }
                
                curPage += 1;
                loading = false;
                opt.success(d, hasMore);
            },
            error: function (d) {
                opt.error && opt.error(d);
                $(window).off('scroll.' + uniqID);
            },
            loading: opt.loading
        };
        $.sync(data);
    }

    if (opt.loadFirstPage) {
        loading = true;
        loadData();
    }
    $(window).on('scroll.' + uniqID, function () {
        var offset = document.body.scrollTop;
        if (offset + windowHeight + opt.padding > fresh.$content.height() && !loading) {
            loading = true;
            loadData();
        }
    });
    return {
        destory: function () {
            $(window).off('scroll.' + uniqID);
        }
    };
};