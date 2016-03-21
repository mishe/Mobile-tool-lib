module.exports = function (cart, callback) {
    var count = {
        count: 0,
        discount: 0,
        selectAll: 1
    };
    _.each(cart, function (d) {
        if (!d.selected){
            count.selectAll = 0;
        }else{
            count.count += d.price * d.num;
            count.discount += d.spec * d.num;
        }
    });
    count.discount = count.discount - count.count;
    if (callback) {
        callback(count);
    } else {
        return count;
    }
};