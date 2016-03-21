module.exports=function css3Hack(key,value){
    function ch(key,value){
        var d={}
        d['-weikit-'+key]=value;
        d['-moz-'+key]=value;
        d['-ms-'+key]=value;
        d[key]=value;
        return d;
    }
    $(this).each(function(){
        $(this).css(ch(key,value));
    });
}