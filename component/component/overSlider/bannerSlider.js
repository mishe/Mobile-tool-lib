module.exports = function (pageObj, autoscroll) {
    var slideObj = $(this),
        $child = $(this).children(),
        slideWidth = $child.outerWidth(true),
        countPage = $child.length,
        slideCurPage = 1,
        returnObj,
        timeout;
    $child.css('width', $child.outerWidth(true));
    pageObj.eq(0).addClass('active').siblings().removeClass('active');

    function autoScrollBanner() {
        if (autoscroll !== 0) {
            clearInterval(timeout);
            timeout = setInterval(function () {
                turnPage(-21);
            }, autoscroll);
        }
    }

    var turnPage = function (dx) {

        if (dx > 20) {
            slideCurPage -= 1;
            slideCurPage = slideCurPage == 0 ? countPage : slideCurPage;
        } else if (dx < -20) {
            slideCurPage += 1;
            slideCurPage = slideCurPage > countPage ? 1 : slideCurPage;
        }

        slideObj.translate3d(-(slideCurPage - 1) * slideWidth);
        pageObj.eq(slideCurPage - 1).addClass('active').siblings().removeClass('active');
        //console.log(slideCurPage, countPage, dx);
        autoScrollBanner();
    };

    returnObj = slideObj.overSlide({move: false, tap: true}, function (dx) {
        turnPage(dx);
    });

    autoScrollBanner();


    return {
        next: function () {
            turnPage(-21);
        },
        prev: function () {
            turnPage(21);
        }
    };
}