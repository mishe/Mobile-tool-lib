module.exports=function(){
    var defaultSetting={
            type:'popup', //type：popup  page
            pageContain:'', //type=page 时有效；密码框的展示区域
            value:0,
            callback:function(){}
        },
        opt=$.extend(true,defaultSetting,opt),
        forgotUrl=location.origin + "/pages/member/forgetPayPwd",
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
    }).on('tap','.key-one',function(e){
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
        if(password.length>=6){
            if(opt.type=='popup') {
                setTimeout(function () {
                    opt.callback(password.join(''));
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
    }).on('tap','.cancel-btn',function(){
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
}
