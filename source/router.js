var oldRouter,
    ref='';

function clearPageData(){
    fresh.$content.off().html('<div class="loading"></div><div class="grey center">加载中...</div>');
}

module.exports=Backbone.Router.extend({
    initialize:function(){
        var that = this;
        this.bind('route',function(curRouter){
            //after Route
            ref=location.href;
            setTimeout(function(){
                $('#changePageAnimate').fadeOut();
            },400);
        });
    },
    //before route
    _beforeRoute:function(curRouter){
        //if(st.loadDate) st.loadDate.destory();

        oldRouter=curRouter;
        if(!ref){
            fresh.$body.append('<div class="change_page_loading" id="changePageAnimate"><div class="page_loading"></div></div>');
        }else{
            $('#changePageAnimate').show();
        }
    },

    routes:{
        '':                             'home',
        'subjects/*':                   'subjects',
        'subject/:subjectID/*':         'subjects',
        'cate/:cateID/*':               'category',
        'cate/:cateID/:subCateID':      'category',
        'search/*':                     'search',
        'search/:key/*':                'search',
        'product/*':                    'productDetail',


        'user/*':                       'userCenter',
        'user/account/*':               'myAccount',
        'user/account/accountDetail':   'myAccountDetail',
        'user/card/*':                  'myCard',
        'user/orders/*':                'myOrders',
        'user/purchase/*':              'myPurchase',
        'user/coupon/*':                'myCoupon',
        'user/address/*':               'myAddress',
        'user/credit/*':                'myCredit',
        'user/credit/:creditID*':       'myCreditDetail',
        'user/info/*':                  'myInfo',
        'user/password/*':              'myPassword',
        'user/history/*':               'myHistory',
        'user/favorite/*':              'myFavorite',
        'user/recommend/*':             'myRecommend',
        'user/comment/*':               'myComment',
        'user/shopCart/*':              'shopCart',
        'user/login/*':                 'login',
        'user/smslogin/*':              'smsLogin',
        'user/login/weChat/*':          'weChatLogin',
        'user/register/*':              'register',
        'user/register/weChat*':        'weChatRegister',
        'user/forgot/*':                'forgot',
        'user/reset/*':                 'reset'

    },

    home:function(){
        clearPageData();
        var Index=require('./mall/index/index');
        new Index({el:fresh.$content});
    }

});