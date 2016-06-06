var ShopCart=require('../source/common/shopCart/shopCart'),
    MainNav=require('../source/common/mainNav/mainNav');
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
        $.toast('服务器忙，请稍候再试~', 500);
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
        }
        else {
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
        return !isNaN(num) && /^1[3|5|7|8]\d{9}$/.test(num);
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
            +'&title='+encodeURIComponent(title)+'&site='+encodeURIComponent('沪江社团')
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
        // hack在微信IOS webview中无法修改document.title的情况
        if($.isWeixin() && $.isIOS()) {
            var $iframe = $('<iframe src="/st/images/icon144.png"></iframe>');
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
    imageFormat:function(url,width,height,format,style){
        style=style||1;
        width=width||0;
        height=height||0;
        format=format||'jpg'
        if(!url) return '';
        url = url.replace('http://i3.s.yun.hjfile.cn', 'http://i3.s.7.hjfile.cn');
        url = url.replace('http://i3.s.7.hjfile.cn/entry/', 'http://i3.s.7.hjfile.cn/img/entry/');
        url = url.replace('http://i3.s.hjfile.cn/entry/', 'http://i3.s.7.hjfile.cn/img/entry/');
        return url+'?imageView2/'+style+'/w/'+width+'/h/'+height+'/format/'+format
    },
    scoreFormat:function(num,format){
        if(isNaN(num) || !num) return '<span class="score_num_b">0<span>';
        num=num.toFixed('2').toString().split('.');
        format=format||'html';
        if(format=='html'){
            return '<span class="score_num_b">'+num[0]+'.</span><span class="score_num_s">'+num[1]+'%</span>'
        }else{
            return {
                b:num[0],
                s:num[1]
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
    checkUser:function(){

    },
    customEvent:require('./customEvent'),
    toast:require('./toast/toast') ,
    parseURL:require('./parseUrl'),
    dateFormat: require('./dateFormat'),
    popWindow:require('./popWindow/popWindow'),
    loadMoreData:require('./loadMoreData'),
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
    praiseAction:require('./praiseAction'),
    login:require('./login/login'),
    register:require('./register/register'),
    shareWeixinTip:require('./shareWeixinTip/shareWeixinTip'),
    sync:require('./sync'),
    upload:require('./upload'),
    fullSlider:require('./fullSlider/fullSlider'),
    showShopCart:function(callback){
        if(!fresh.$main.find('#shopCart').length)
            fresh.$main.append('<div id="shopCart" class="shop-cart-box animate"></div>');
        new ShopCart({el:fresh.$main.find('#shopCart'),callback:callback});
    },
    showMainNav:function(callback){
        if(!fresh.$main.find('#showMainNav').length)
            fresh.$main.prepend('<div id="showMainNav" class="main-nav-box animate"></div>');
        new MainNav({el:fresh.$main.find('#showMainNav'),callback:callback});
    },
    showShopCartNum:function(cart){
        var num=0;
        cart=cart|| $.getCache('cart',1);
        _.each(cart,function(d){
            if(d.num>0)
                num+= parseInt(d.num);
        });
        $('.shopping-cart-bubble').html(num);
    },
    login:function(){
        var hash=location.hash.substr(1);
        $.changePage('user/login/?backUrl='+hash);
    },
    register:function(){
        var hash=location.hash.substr(1);
        $.changePage('user/register/?backUrl='+hash);
    },
    getParam: function(str,key){
        var reg = new RegExp(key +"=([^&]*)(&|$)");
        var r = str.match(reg);
        if (r!=null) return unescape(r[1]); return null;
    },
    timePicker:require('./timePicker/timePicker')

});


$.extend($.fn, {
    css3Hack:require('./css3Hack'),
    translate3d: function (x, y, z) {
        x = x || 0, y = y || 0, z = z || 0;
        $(this).css3Hack('transform','translate3d(' + x + 'px,' + y + 'px,' + z + 'px)');
    },
    setTransitionTime: function (num) {
        $(this).css3Hack('transition',num+'s');
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
    pullRefresh:require('./pullRefresh'),
    addCart:require('../source/common/addCart/addCart')
});