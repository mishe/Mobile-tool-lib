var template= _.template(require('./product-list.html'));
require('./product-list.css');

module.exports=Backbone.View.extend({
    initialize:function (options) {
        this.cache=options.cache||'';
        this.getDate();
    },
    getDate:function(){
        if(this.cache){
            this.render();
        }else{
            $.sync({

            })
        }
    },
    render:function(){
        this.$el.html(template(this.cache));
        return this;
    },
    events:{
        'tap .product-box li':'changePage',
        'tap .add-cart-btn':'addCart'
    },
    addCart:function(e){
        var obj=$(e.currentTarget);
        if(obj.text()!='加入购物车'){
            return;
        }
        obj.addCart();
        return false;
    },
    changePage:function(e){
        var link=$(e.currentTarget).attr('data-link');
        $.changePage(link);
    }
});