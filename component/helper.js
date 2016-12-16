$.extend({
    checkNetwork: function () {
//        if (navigator.onLine) {
//            return true;
//        } else {
//            $.toast('您的网络不太给力哦~', 500);
//            return false;
//        }
    return true;
    },
    serverError: function () {
        $.toast('服务器忙，请稍候再试!',1500);
    },
    isRetina: function () {
        return window.devicePixelRatio && window.devicePixelRatio >= 1.5;
    },
    uniqID: function (string) {
        string = string || '';
        return string + Math.floor(Math.random() * 10000000) + new Date().getTime().toString().substring(10, 13);
    },
    scrollTo: function (obj) {
        if (typeof obj === "number") {
            $(window).scrollTop(obj);
        }else {
            var offset = $(obj).offset();
            $(window).scrollTop(offset.top);
        }
    },
    isWeixin: function () {
        return /MicroMessenger/i.test(navigator.userAgent);
    },
    isIOS: function () {
        return /ipad|iphone|iPod|Macintosh|mac os/i.test(navigator.userAgent);
    },
    isAndroid: function () {
        return /Android/i.test(navigator.userAgent);
    },
    charLen: function (string) {
        if (!string) return 0;
        return string.replace(/[^\x00-\xff]/g, '00').length;
    },
    isMobileNum:function(num){
        return !isNaN(num) && /^1[3|4|5|7|8]\d{9}$/.test(num);
    },
    setCache:function(key,value,exp,type){
        //过期时间默认1天
        exp=exp||86400;
        type=type||0;
        !type && (key+='_'+ curUserID);
        fresh.cache[key] = value;
        store.set(key, value, exp);
    },
    getCache:function(key,type){
        type=type||0;
        !type && (key+='_'+ curUserID);
        return (fresh.cache[key] || store.get(key));
    },
    shareQQAddress:function(title,summary){
        return 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent('http://channel.hujiang.com/ch_click.aspx?ch_source=st_qq&page='+location.href)
        +'&showcount=0&summary='+encodeURIComponent(summary)+'&desc='+encodeURIComponent(summary)
        +'&title='+encodeURIComponent(title)+'&site='+encodeURIComponent('摇旺理财')
        +'&pics='+encodeURIComponent('http://ms.hujiang.com/st/images/icon114.png')
    },
    shareWeiboAddress:function(title){
        var url=escape('http://channel.hujiang.com/ch_click.aspx?ch_source=st_weibo&amp;page='+location.href);
        return 'http://service.weibo.com/share/share.php?url='+url
        +'&type=icon&language=zh_cn&title='+encodeURIComponent(title+'（阅读原文：'+location.href+'，下载沪江手机客户端：http://hj.vc/vrjU3vJ）')
        +'&searchPic=http://ms.hujiang.com/st/images/icon114.png&style=simple'
    },
    setWeixinTitle:function(title){
        document.title=title;
        // $.setAppTitle(title);
        // hack在微信IOS webview中无法修改document.title的情况
        if($.isWeixin() && $.isIOS()) {
            var $iframe = $('<iframe src="/images/9e3e8cf0.png" style="border: 0;outline: 0"></iframe>');
            $iframe.on('load', function () {
                setTimeout(function () {
                    $iframe.off('load').remove();
                }, 0);
            }).appendTo('body');
        }
    },
    setCursorPosition: function (htmlTag, start, end) {
        if (start === undefined) start = htmlTag.value.length;
        if (end === undefined) end = htmlTag.value.length;
        if (htmlTag.setSelectionRange) { //W3C
            setTimeout(function () {
                htmlTag.setSelectionRange(start, end);
                htmlTag.focus();
            }, 0);
        }else if (htmlTag.createTextRange) { //IE
            var textRange = htmlTag.createTextRange();
            textRange.moveStart("character", start);
            textRange.moveEnd("character", end);
            textRange.select();
        }
    },
    getLimitString: function (str, limit) {
        var pos = 0;
        if (!limit || $.charlen(str) <= limit) return str;
        for (var i = 0; i < str.length; i++) {
            pos += str.charCodeAt(i) > 255 ? 2 : 1;
            if (limit <= pos) {
                return str.substr(0, i + 1);
                break;
            }
        }
    },
    numberFormat:function(num,dot){
        dot=dot||1;
        if(isNaN(num=parseInt(num))) return 0..toFixed(dot);
        return num>=10000?((num/10000).toFixed(dot)+'万'):num;
    },
    changePage: function (hash_path,replace) {
        fresh.router.navigate(hash_path, {trigger:true,replace:replace});
    },
    
    //没有更多列表统一处理
    hasNotMoreData:function(obj,hasData,notDataText){
        if(hasData){
            obj.append('<div class="has_not_data">'+(notDataText||'暂无数据')+'</div>');
        }else{
            obj.append('<div class="has_not_more_topic">没有更多了</div>');
            setTimeout(function(){
                obj.find('.has_not_more_topic').fadeOut();
            },3000);
        }
    },
    
    getParam: function(str,key){
        if(arguments.length==1){
            key=str;
            str=location.href;
        }

        var reg = new RegExp(key +"=([^#&]*)",'i');
        var r = str.match(reg);
        if (r!=null) return encodeURIComponent(r[1]); return null;
    },
    sendSMS:require('./sendSMS'),
    /*登录状态检索*/
    checkUser:require('./checkUser'),
    tradePassword:require('./tradePassword'),
    sync:require('./sync'),
    batSync:require('./batSync'),
    customEvent:require('./customEvent'),
    toast:require('./toast/toast') ,
    parseURL:require('./parseUrl'),
    dateFormat: require('./dateFormat'),
    popWindow:require('./popWindow/popWindow'),
    loadMoreData:require('./loadMoreData'),
    loadMore:require('./loadMore'),
    praiseAction:require('./praiseAction'),
    shareWeixinTip:require('./shareWeixinTip/shareWeixinTip'),
    upload:require('./upload'),
    fullSlider:require('./fullSlider/fullSlider'),
    swiper:require('./swiper/swiper-3.3.1.jquery.min.js'),
    swiperAnimate:require('./swiper/swiper.animate1.0.2.min.js'),
    login:function(url){
        $.setafterLogin(url||location.href);
        if($.isWeixin()){
            var callback=location.origin+location.pathname+'%23login',
            iframeSrc=fresh.weizhanApi+'/weizhan/oauth',
            redirectUrl=encodeURIComponent(fresh.weizhanApi+'/weizhan/oauth/auth');
            window.location=iframeSrc+'?redirectUrl='+redirectUrl+'&scope=snsapi_base&callback='+callback;
        }else{
            $.changePage('login');
        }
    },
    amountFormat:function(v) {
        if(!v) return '0.00'
        v = v.toString().split('.');
        return (+v[0]).toLocaleString() + '.' + (v[1] >= 01 ? v[1] : '00');
    },
    isIDCard:require('./isIDCard'),
    monthPicker:function(opt){
        var defaultOpt={
            years:'2016-2019',
            curValue:'2016-08',
            yes:'确认',
            no:'取消',
            onSelect:function(){

            }
        }
        opt=$.extend(defaultOpt,opt);
        var win=$(template()),
            startYear=parseInt(opt.years.split('-')[0]);
            curYear=opt.curValue.split('-')[0]||startYear,
            curMonth=opt.curValue.split('-')[1]||'01';

        function n2s(v){
            return v>9?v:'0'+v;
        }
        function template(){
            var str='<div class="month-picker-wrap"><div class="picker-box"><div class="picker-bar">'
                +'<span class="cancel-btn">'+opt.no+'</span><span class="confirm-btn">'+opt.yes+'</span>'
                +'</div><div class="picker-hover"></div><ul class="picker-year">';
            var year=opt.years.split('-');
            for(var i=year[0];i<year[1];i++){
                str+='<li class="picker-li" data-id="'+i+'">'+i+' 年</li>';
            }
            str+='</ul><ul class="picker-month">';
            for(i=1;i<13;i++){
                str+='<li class="picker-li" data-id="'+i+'">'+n2s(i)+' 月</li>';
            }
            str+='</ul></div></div>';
            return str;
        }

        $('body').append(win);
        var height=win.find('.picker-li').height(),
            height2=win.find('.picker-bar').height(),
            scroll1,scroll2;

        win.find('.picker-year').scrollTop(win.find('.picker-li[data-id='+curYear+']').position().top-height*2-height2);
        win.find('.picker-month').scrollTop(win.find('.picker-li[data-id='+parseInt(curMonth,10)+']').position().top-height*2-height2);
        win.on('click',function(e){
            if(!$(e.target).closest('.picker-box').length){
                win.off().remove();
            }
        }).on('click','.cancel-btn,.confirm-btn',function(e){
            var obj=$(e.currentTarget);
            if(obj.hasClass('cancel-btn')) {
                win.off().remove();
            }else{
                opt.onSelect(curYear,curMonth);
                win.off().remove();
            }
        });
        win.find('.picker-year').on('scroll',function(){
            clearTimeout(scroll1);
            scroll1=setTimeout(function(){
                var h=win.find('.picker-year').scrollTop(),
                    index=Math.round(h/height);
                win.find('.picker-year').scrollTop(height*index);
                curYear=startYear+index;
            },100)
        });
        win.find('.picker-month').on('scroll',function(){
            clearTimeout(scroll2);
            scroll2=setTimeout(function(){
                var h=win.find('.picker-month').scrollTop(),
                    index=Math.round(h/height);
                win.find('.picker-month').scrollTop(height*index);
                curMonth=n2s(index+1);
            },100)
        })
    }
});

$.extend($.fn, {
    css3Hack:require('./css3Hack'),
    translate3d: function (x, y, z) {
        x = x || 0, y = y || 0, z = z || 0;
        $(this).css({
            "-webkit-transform": "translate3d(" + x + "px," + y + "px," + z + "px)",
            "-moz-transform": "translate3d(" + x + "px," + y + "px," + z + "px)",
            transform: "translate3d(" + x + "px," + y + "px," + z + "px)"
        })
    },
    setTransitionTime: function (num) {
        $(this).css({
            "-webkit-transition": +num + "s",
            "-moz-transition": +num + "s",
            transition: +num + "s"
        })
    },
    overSlides: function (callback) {
        $(this).each(function () {
            $(this).overSlide(callback);
        })
    },
    //整体滚动
    overSlide: require('./overSlider/overSlider'),
    //单个滚动
    bannerSlider:require('./overSlider/bannerSlider'),
    pullRefresh:require('./pullRefresh')
});
