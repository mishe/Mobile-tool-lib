require('./addCart.css');
module.exports = function () {
    var obj = $(this),
        id = obj.attr('data-id'),
        type = obj.attr('data-type'),
        timeout,
        data = {
            id: obj.attr('data-id'),
            num: 1,
            name: obj.attr('data-name'),
            price: obj.attr('data-price'),
            pic: obj.attr('data-pic') || obj.parent().find('img').attr('src'),
            selected: true,
            spec: obj.attr('data-spec'),
            standard:obj.attr('data-standard')
        };

    if (type == 'simple') {
        addCart1();
    } else {
        addCart2();
    }

    function addCart2() {
        $.popWindow({
            title: 'aaa',
            callback: function (bl) {
                if (bl) {
                    updataCart();
                }
            }
        });
    }

    function addCart1() {
        obj.html('<span class="add-cart-less"></span><span class="add-cart-more"></span><span class="add-cart-num">1</span>');
        obj.on('tap.changeNum', '.add-cart-less,.add-cart-more', function () {
            var self = $(this);
            if (self.hasClass('add-cart-less')) {
                data.num -= 1;
                if (data.num == 0) {
                    obj.html('加入购物车').off('tap.changeNum');
                }
            } else {
                //最多9个
                if(data.num==9) return;
                data.num += 1;
            }
            data.num && obj.find('.add-cart-num').html(data.num);
            updataCart();
        });
        updataCart();
    }


    function updataCart() {
        saveLocalCart();
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            syncServer();
        }, 500);
    }

    function syncServer() {
        if ($.checkUser()) {
            $.sync({
                url: '/ajax/index/add/',
                type: 'post',
                dataType: 'json',
                data: {
                    product: id,
                    qty: num,
                    isAjax: 1,
                    replace: 1
                }
            })
        }
    }

    function saveLocalCart() {
        var cart = $.getCache('cart', 1) || {};
        if (cart[id]) {
            cart[id].num += data.num;
        } else {
            cart[id] = data;
        }
        $.setCache('cart', cart, 0, 1);
        //todo  显示购物车数量
    }
};