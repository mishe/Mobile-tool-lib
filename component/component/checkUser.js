module.exports=function(bl,callback){
    var isLogin = $.getLogin();
    if(typeof(bl)=='function'){
        callback=bl;
        bl=false;
    }
    if(isLogin){
        callback && callback(true);
    }else{
        $.sync({
            url:fresh.apiRoot+'verifCode/verifLogin',
            type:'post',
            success:function () {
                callback && callback(true);
                $.setLogin(true);
            },
            error:function(){
                if(!bl){
                    $.login()
                }else{
                    callback &&callback(false);
                }
            }
        });
    }
}