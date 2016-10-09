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
        if (!limit || $.charLen(str) <= limit) return str;
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
    timePicker:require('./timePicker/timePicker'),
    sendSMS:function (mobile,obj){
        var self=this;
        if(!$.isMobileNum(mobile)){
            $.toast('请输入正确的手机号码');
            return false;
        }
        if(this.sendSMSing) return false;
        this.sendSMSing=true;
        $.sync({
            url:fresh.apiRoot+'verifCode/getVerifCode',
            type:'post',
            data:{
                phoneNum:mobile
            },
            success:function(){
                var count=60,timeout;
                $(obj).attr('disabled',true);
                timeout=setInterval(function(){
                    if(count<=0){
                        self.sendSMSing=false;
                        $(obj).html('获取验证码');
                        $(obj).attr('disabled',false);
                        clearInterval(timeout)
                    }else{
                        $(obj).html(count+'s重新获取');
                    }
                    count--;
                },1000);
            }
        });
    },
    amountFormat:function(v) {
        if(!v) return '0.00'
        v = v.toString().split('.');
        return (+v[0]).toLocaleString() + '.' + (v[1] >= 01 ? v[1] : '00');
    },
    isIDCard:function(code){
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var tip = "";
        var pass= true;
        var patten= /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
        // var patten= /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;

        if(!code || !patten.test(code)){
            tip = "身份证号格式错误";
            pass = false;
        }else if(!city[code.substr(0,2)]){
            tip = "地址编码错误";
            pass = false;
        }else{
            //18位身份证需要验证最后一位校验位
            if(code.length == 18){
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                //校验位
                var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++)
                {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if(parity[sum % 11] != code[17]){
                    tip = "校验位错误";
                    pass =false;
                }
            }
        }
        return pass;
    },
    tradePassword:function (opt) {
        var defaultSetting={
                type:'popup', //type：popup  page
                pageContain:'', //type=page 时有效；密码框的展示区域
                value:0,
                callback:function(){}
            },
            opt=$.extend(defaultSetting,opt),
            forgotUrl='/asdad',
            oldPassword,
            password=[],
            win;
        if(opt.type=='popup'){
            win=$(template());
        }else{
            passworkBox=$(passwordBox());
            $(opt.pageContain).html(passworkBox);
            win=$(keyBoard())
        }
        $('body').append(win);


        win.on('touchmove',function(e){
            e.preventDefault();
        }).on('click','.key-one',function(e){
            var obj=$(e.currentTarget),
                value=obj.attr('data-num');
            if(value=='reset'){
                password=[];
            }else if(value=='backspace'){
                password.pop();
            }else{
                password.push(value);
            }
            renderPassword();
            if(password.length==6){
                if(opt.type=='popup') {
                    setTimeout(function () {
                        callback(password.join(''));
                        win.off().remove();
                    }, 300);
                }else{
                    if(!oldPassword) {
                        oldPassword = password.join('');
                        passworkBox = $(passwordBox(1));
                        password=[];
                        $(opt.pageContain).html(passworkBox);
                    }else{
                        if(oldPassword==password.join('')){
                            opt.callback(password.join(''));
                            win.off().remove();
                        }else{
                            $.toast('两次密码输入不一致');
                            passworkBox = $(passwordBox());
                            password=[];
                            oldPassword=0;
                            password=[];
                            $(opt.pageContain).html(passworkBox);
                        }
                    }
                }
            }
        }).on('click','.cancel-btn',function(){
            win.off().remove();
            opt.callback('');
        });

        function renderPassword(){
            var len=password.length,
                obj=win;
            if(opt.type!='popup'){
                obj=passworkBox;
            }
            obj.find('.key-value').html('');
            for(var i=0;i<len;i++){
                obj.find('.key-value').eq(i).html('●');
            }
        }

        function passwordBox(bl){
            var title=bl?'请再次输入交易密码':'请设置交易密码';

            return '<div class="trade-password" style="position:inherit;background-color:inherit;padding-bottom:50px"><h3 class="trade-password-title" style="border-bottom:inherit">'+title+'</h3>'
                +'<div class="trade-box" style="background-color: #fff"><span class="key-value"></span><span class="key-value"></span>'
                +'<span class="key-value"></span><span class="key-value"></span><span class="key-value"></span>'
                +'<span class="key-value"></span></div></div>';
        }

        function keyBoard(){
            return '<div class="keyboard-box">'
                +'<span class="key-one" data-num="1">1</span><span class="key-one" data-num="2">2</span>'
                +'<span class="key-one" data-num="3">3</span><span class="key-one" data-num="4">4</span>'
                +'<span class="key-one" data-num="5">5</span><span class="key-one" data-num="6">6</span>'
                +'<span class="key-one" data-num="7">7</span><span class="key-one" data-num="8">8</span>'
                +'<span class="key-one" data-num="9">9</span><span class="icons key-one reset" data-num="reset"></span>'
                +'<span class="key-one" data-num="0">0</span><span class="icons key-one backspace" data-num="backspace"></span></div>';
        }

        function template(){
            var str='<div class="password-mask"><div class="trade-password"><h3 class="trade-password-title">请输入摇旺交易密码</h3>';
            if(opt.value>0)
                str+='<p class="trade-tip">交易金额：<span class="trade-num">￥'+opt.value+'元</span></p>'

            str+='<div class="trade-box"><span class="key-value"></span><span class="key-value"></span>'
                +'<span class="key-value"></span><span class="key-value"></span><span class="key-value"></span>'
                +'<span class="key-value"></span></div><a href="'+forgotUrl+'" class="forgot-password-btn">忘记密码</a>'
                +'<div class="cancel-btn">取消</div></div><div class="keyboard-box">'
                +'<span class="key-one" data-num="1">1</span><span class="key-one" data-num="2">2</span>'
                +'<span class="key-one" data-num="3">3</span><span class="key-one" data-num="4">4</span>'
                +'<span class="key-one" data-num="5">5</span><span class="key-one" data-num="6">6</span>'
                +'<span class="key-one" data-num="7">7</span><span class="key-one" data-num="8">8</span>'
                +'<span class="key-one" data-num="9">9</span><span class="icons key-one reset" data-num="reset"></span>'
                +'<span class="key-one" data-num="0">0</span><span class="icons key-one backspace" data-num="backspace"></span></div></div>';
            return str;
        }
    },
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
