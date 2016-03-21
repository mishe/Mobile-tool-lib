(function () {
    var coord = {},
        start = {},
        el;

    document.addEventListener('touchstart', touchStart);
    document.addEventListener('touchmove', touchMove);
    document.addEventListener('touchend', touchEnd);
    document.addEventListener('touchcanel', touchCancel);

    function newEvent(type) {
        return new Event(type, {bubbles: true, cancelable: true});
    }

    function touchCancel() {
        coord = {}

    }

    function touchStart(e) {
        var c = e.touches[0];
        start = {
            x: c.clientX,
            y: c.clientY,
            time: Date.now()
        };
        el = e.target;
        el = 'tagName' in el ? el : el.parentNode;
    }

    function touchMove(e) {
        var t = e.touches[0];
        coord = {
            x: t.clientX - start.x,
            y: t.clientY - start.y
        }
    }

    function touchEnd() {
        var touchTimes = Date.now() - start.time,
            ty = Math.abs(coord.y),
            tx = Math.abs(coord.x),
            c = ((250 > touchTimes && tx > 20) || tx > 80) && (ty < 30 || tx > ty * 1.5),
            s = ((250 > touchTimes && ty > 20) || ty > 80) && (tx < 30 || ty > tx * 1.5),
            left = coord.x < 0,
            top = coord.y < 0;
        if (250 > touchTimes && (isNaN(coord.y) || ty) < 12 && (isNaN(coord.x) || tx < 12)) {
            el.dispatchEvent(newEvent('tap'));
        } else if (750 < touchTimes && (isNaN(coord.y) || ty) < 12 && (isNaN(coord.x) || tx < 12)) {
            el.dispatchEvent(newEvent('longTap'));
        }
        c ? el.dispatchEvent(left ? newEvent('swipeLeft') : newEvent('swipeRight')) : s && el.dispatchEvent(top ? newEvent('swipeUp') : newEvent('swipeDown'));

        coord = {};
    }
}());