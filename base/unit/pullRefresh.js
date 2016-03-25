module.exports = function (options, callback) {
    var cfg = {
            offsetScrollTop: 5,     //滚动条偏移值，大于此值不触发下拉事件
            offsetY: 75,             //触摸起止Y偏移值，大于些值才会触发下拉事件
            pullTipBox:'.pull-refresh',
            pullMoving: function (moveNum) {
                $(this.pullTipBox).show().css('height',moveNum);
                //$(this.pullTipBox).html('释放即可刷新_'+moveNum)
            },
            pullRefresh: function () {
                var obj=$(this.pullTipBox)
                obj.slideUp();
                //obj.html('加载中...')
                setTimeout(function(){
                    //obj.html('');
                },500);
            },
            pullCancel: function (el) {
                var obj=$(this.pullTipBox);
                obj.slideUp();
                //obj.html('下拉取消...')
                setTimeout(function(){

                    //obj.html('');
                },500);
            }
        },
        pushed=false;
    options=options||{};
    cfg = $.extend(cfg, options);

    this.each(function () {
        var self = $(this),
            touchStartX = 0,
            touchStartY = 0,
            scrollTop;
        self.on('touchstart', function (e) {
                var touchTarget = e.originalEvent.touches[0];
                touchStartX = touchTarget.clientX;
                touchStartY = touchTarget.clientY;
                scrollTop = document.body.scrollTop;
            })
            .on('touchmove', function (e) {
                var touchTarget = e.originalEvent.touches[0],
                    touchMoveY = touchTarget.clientY,
                    offsetX = touchTarget.clientX - touchStartX,
                    offsetY = touchMoveY - touchStartY;
                if (offsetY > 5 && scrollTop < cfg.offsetScrollTop && Math.abs(offsetX) < Math.abs(offsetY)) {
                    event.preventDefault();
                    pushed=true;
                    cfg.pullMoving(touchMoveY-touchStartY);
                }
            })
            .on('touchend', function (event) {
                var touchTarget = event.originalEvent.changedTouches[0],
                    touchEndY = touchTarget.clientY,
                    offsetX = touchTarget.clientX - touchStartX,
                    offsetY = touchEndY - touchStartY;

                if (offsetY > cfg.offsetY && scrollTop < cfg.offsetScrollTop && Math.abs(offsetX) < Math.abs(offsetY)) {
                    cfg.pullRefresh(self);
                } else if(scrollTop < cfg.offsetScrollTop && pushed) {
                    cfg.pullCancel(self);
                }
                pushed=false;
            })
            .on('touchcancel', function () {
                if(scrollTop < cfg.offsetScrollTop && pushed)
                    cfg.pullCancel(self);
                pushed =false;
            });

    });
};