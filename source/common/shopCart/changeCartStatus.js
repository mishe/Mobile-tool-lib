var switchkey = true;
module.exports = function (obj, count, callback) {
    obj.find('.save-price').html('已优惠：¥' + count.discount);
    obj.find('.count-price').html('合计：¥' + count.count);
    if (count.count >= 100) {
        obj.find('.product-list-box').addClass('product-list-box2').prev('.shopping-tip').addClass('shopping-tip2');
        callback(0);
    } else {
        obj.find('.product-list-box').removeClass('product-list-box2').prev('.shopping-tip').removeClass('shopping-tip2');
        obj.find('.shopping-tip-c').html(100 - count.count);
        callback(1);
    }
    if (count.selectAll) {
        obj.find('.select-all').addClass('selected');
    } else {
        obj.find('.select-all').removeClass('selected');
    }
}