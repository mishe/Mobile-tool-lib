var template = _.template(require('./my-exclusive.html'));
require('./my-exclusive.css');

module.exports = Backbone.View.extend({
    initialize: function (options) {
        this.cache = options.cache || '';
        this.getDate();
    },
    getDate: function () {
        if (this.cache) {
            this.render();
        } else {
            $.sync({})
        }
    },
    render: function () {
        this.cache = [
            {
                "product_id": "440",
                "name": "柠蜜美白礼盒",
                "sku": "FR8QT00473",
                "national_flag": "",
                "origin_text": "",
                "image": "http://127.0.0.1/2014/media/catalog/product/cache/1/small_image/400x/0dc2d03fe217f8c83829496872af24a0/4/w/4w9a0671x.jpg",
                "appimage": "",
                "can_sale": "1",
                "categories": "6,36,57,77",
                "website": "1",
                "type": "simple",
                "time": "2015-11-26 14:37:44",
                "status": "1",
                "special_category": null,
                "standard2": "盒",
                "price": "99.00",
                "special_price": "66.00",
                "is_in_stock": "1",
                "app_price": "",
                "is_app_price": "0",
                "limit": 10000,
                "delay_delivery_day": null,
                "app_persale_html5_url": "test_url",
                "msrp": "100.0000",
                "special_price_from_date": "",
                "special_price_to_date": ""
            },
            {
                "product_id": "783",
                "name": "芒果大战尝鲜装",
                "sku": "FR8LH00772",
                "national_flag": "",
                "origin_text": "",
                "image": "http://127.0.0.1/2014/media/catalog/product/cache/1/small_image/400x/0dc2d03fe217f8c83829496872af24a0/images/catalog/product/placeholder/small_image.jpg",
                "appimage": "",
                "can_sale": "0",
                "categories": "3,6,57,71,77",
                "website": "1",
                "type": "simple",
                "time": "2015-11-26 14:37:44",
                "status": "1",
                "special_category": null,
                "standard2": "7个/盒",
                "price": "88.00",
                "special_price": "49.00",
                "is_in_stock": "0",
                "app_price": "",
                "is_app_price": "0",
                "limit": 10000,
                "delay_delivery_day": null,
                "app_persale_html5_url": "",
                "msrp": "",
                "special_price_from_date": "",
                "special_price_to_date": ""
            },
            {
                "product_id": "1152",
                "name": "测试产品01",
                "sku": "SKU20151118",
                "national_flag": "",
                "origin_text": "",
                "image": "http://127.0.0.1/2014/media/catalog/product/cache/1/small_image/400x/0dc2d03fe217f8c83829496872af24a0/images/catalog/product/placeholder/small_image.jpg",
                "appimage": "",
                "can_sale": "1",
                "categories": "3,4,5,6,77",
                "website": "1",
                "type": "simple",
                "time": "2015-11-26 14:37:44",
                "status": "1",
                "special_category": null,
                "standard2": "11",
                "price": "30.00",
                "special_price": "24.00",
                "is_in_stock": "1",
                "app_price": "24.0000",
                "is_app_price": "1",
                "limit": 10000,
                "delay_delivery_day": null,
                "app_persale_html5_url": "",
                "msrp": "",
                "special_price_from_date": "2015-11-17 00:00:00",
                "special_price_to_date": "2020-11-30 00:00:00"
            },
            {
                "product_id": "1153",
                "name": "测试产品02",
                "sku": "sku02",
                "national_flag": "",
                "origin_text": "",
                "image": "http://127.0.0.1/2014/media/catalog/product/cache/1/small_image/400x/0dc2d03fe217f8c83829496872af24a0/images/catalog/product/placeholder/small_image.jpg",
                "appimage": "",
                "can_sale": "1",
                "categories": "3,4,5,6,15,77",
                "website": "1",
                "type": "simple",
                "time": "2015-11-26 14:37:44",
                "status": "1",
                "special_category": null,
                "standard2": "02",
                "price": "40.00",
                "special_price": "40.00",
                "is_in_stock": "1",
                "app_price": "",
                "is_app_price": "0",
                "limit": 10000,
                "delay_delivery_day": null,
                "app_persale_html5_url": "",
                "msrp": "",
                "special_price_from_date": "",
                "special_price_to_date": ""
            },
            {
                "product_id": "1154",
                "name": "测试产品03",
                "sku": "sku03",
                "national_flag": "",
                "origin_text": "",
                "image": "http://127.0.0.1/2014/media/catalog/product/cache/1/small_image/400x/0dc2d03fe217f8c83829496872af24a0/images/catalog/product/placeholder/small_image.jpg",
                "appimage": "",
                "can_sale": "1",
                "categories": "2,3,4,5,6,77",
                "website": "1",
                "type": "simple",
                "time": "2015-11-26 14:37:44",
                "status": "1",
                "special_category": null,
                "standard2": "03",
                "price": "100.00",
                "special_price": "100.00",
                "is_in_stock": "1",
                "app_price": "",
                "is_app_price": "0",
                "limit": 10000,
                "delay_delivery_day": null,
                "app_persale_html5_url": "",
                "msrp": "",
                "special_price_from_date": "",
                "special_price_to_date": ""
            },
            {
                "product_id": "1155",
                "name": "测试产品04",
                "sku": "sku04",
                "national_flag": "",
                "origin_text": "",
                "image": "http://127.0.0.1/2014/media/catalog/product/cache/1/small_image/400x/0dc2d03fe217f8c83829496872af24a0/images/catalog/product/placeholder/small_image.jpg",
                "appimage": "",
                "can_sale": "1",
                "categories": "2,3,4,5,6,77",
                "website": "1",
                "type": "simple",
                "time": "2015-11-26 14:37:44",
                "status": "1",
                "special_category": null,
                "standard2": "04",
                "price": "120.00",
                "special_price": "120.00",
                "is_in_stock": "1",
                "app_price": "",
                "is_app_price": "0",
                "limit": 10000,
                "delay_delivery_day": null,
                "app_persale_html5_url": "",
                "msrp": "",
                "special_price_from_date": "",
                "special_price_to_date": ""
            }
        ];
        this.$el.html(template({data: this.cache.slice(0, 2), count: this.cache.length}));
        return this;
    },
    events: {
        'tap .product-box li': 'changePage',
        'tap .add-cart-btn': 'addCart',
        'tap .my-exclusive-more': 'changePage2'
    },
    addCart: function (e) {
        var obj = $(e.currentTarget);
        if (obj.text() != '加入购物车') {
            return;
        }
        obj.addCart();
        return false;
    },
    changePage: function (e) {
        var link = $(e.currentTarget).attr('data-link');
        $.changePage(link);
    },
    changePage2: function (e) {
        var link = $(e.currentTarget).attr('data-link');
        $.changePage(link);
    }
});