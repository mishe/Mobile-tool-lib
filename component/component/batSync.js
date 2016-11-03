module.exports=function(opt){
    var data={
        url:fresh.batchRoot+'batch/batchRequest.html?timer='+new Date().getTime(),
        type:'post',
        data:{
            data:JSON.stringify(opt.data)
        },
        headers:{
            logintoken:$.getToken()
        },
        dataType:'json',
        timeout:20000,
        success:function(d){
            $('.loading-refresh').hide();
            if (d.status == 0) {
                var callbackData=[];
                if(opt.data.length>1){
                    $.each(d.data,function(i,n){
                        if (n.status == 0) {
                            callbackData.push(n.data);
                        }else{
                            callbackData.push(null);
                            // $.toast(n.msg)
                            console.log(opt.data[i].url+' ::: '+n.msg);
                        }
                    });
                }else{
                    callbackData=d.data;
                }
                opt.success && opt.success(callbackData);
            }else if (opt.error && $.type(opt.error) === 'function') {
                opt.error(d);
            } else {
                $.toast(d.message, 2000);
            }
        },
        error:function(d){
            $('.loading-refresh').hide();
            if (opt.error && $.type(opt.error) === 'function') {
                opt.error(d);
            }else {
                $.serverError();
            }
        }
    };
    $('.loading-refresh').show();
    $.ajax(data);
};