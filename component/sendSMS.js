module.exports=function (mobile,obj){
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
            $(obj).attr('disabled',true).addClass('disabled');
            timeout=setInterval(function(){
                if(count<=0){
                    self.sendSMSing=false;
                    $(obj).html('获取验证码');
                    $(obj).attr('disabled',false).removeClass('disabled');
                    clearInterval(timeout)
                }else{
                    $(obj).html('重发 '+count+' S');
                }
                count--;
            },1000);
        }
    });
}