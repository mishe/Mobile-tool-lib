require('./timePicker.css');
var daysTemplate=_.template(require('./timePicker.html')),
    timeTemplate=_.template(require('./timePicker-time.html'));

module.exports=function (opt, callback) {
    var options = {
            startDate: new Date(),
            days: 14,
            timeRange: '8:30-21:30',
            sp: '/',
            changeDay: function () {},
            select:'2016/04/08 15:00'
        },
        dayList = [],
        layoutDayList = [],
        timeList = [],
    //用户选择的日期
        day,
    //用户选择的时间
        time;

    if (typeof(opt) == 'function') {
        callback = opt;
        opt = {}
    }

    opt = $.extend(options, opt);
    if (!opt.timeRange) throw  new Error('时间间距格式不正确');
    if (opt.days < 1) throw  new Error('日期跨度不能小于1天');

    timeList = getTimeList();
    layoutDayList = getDayList();

    day = new Date(opt.startDate);
    day = day.getFullYear() + opt.sp + n2s(day.getMonth() + 1) + opt.sp + n2s(day.getDate());

    var obj = $(daysTemplate({data:dayList,layout:layoutDayList}));
    $('body').append(obj);
    var overSlider=obj.find('.animate').overSlide();

    if(opt.selected){
        var s=opt.selected.split(' ');
        day=s[0];
        time=s[1];
        showTimeList(s[0]);
        obj.find('.pick-date[data-value="'+day+'"]').addClass('active');
        obj.find('.pick-time[data-value="'+time+'"]').addClass('active');
        overSlider.moveTo(obj.find('.pick-date').index(obj.find('.pick-date[data-value="'+day+'"]')))
    }else{
        showTimeList(day);
        obj.find('.pick-date').eq(0).addClass('active');
    }

    function showTimeList(day) {
        var times = timeList;
        if (day == dayList[0]) {
            times = getTimeList([Math.floor(new Date().getHours()) + 1])
        }
        obj.find('.pick-time-box').html(timeTemplate({data:times}));
        opt.changeDay(day);
    }

    function getTimeList(st) {
        var range = opt.timeRange.split('-'),
            start = st || range[0].split(':'),
            end = range[1].split(':'),
            timeArray = [];

        start = start[1] ? parseInt(start[0]) + .5 : parseInt(start[0]);
        end = end[1] ? parseInt(end[0]) + .5 : parseInt(end[0]);

        console.log(start, end);

        for (var i = start; i <= end; i += .5) {
            timeArray.push(i % 1 > 0 ? n2s(Math.floor(i)) + ':30' : n2s(i) + ':00');
        }
        return timeArray;
    }

    function n2s(v) {
        return v > 9 ? v : '0' + v;
    }

    function getMonthDay(day) {
        return n2s(day.getMonth() + 1) + opt.sp + n2s(day.getDate());
    }

    function getDayList() {
        var tempDay = day = new Date(opt.startDate),
            days = [],
            cnDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            temp;

        temp = getMonthDay(day);
        days.push('今天<br>' + temp);
        dayList.push(day.getFullYear() + opt.sp + temp);

        tempDay = new Date(day.getTime() + 86400000);
        temp = getMonthDay(tempDay);
        days.push('明天<br>' + temp);
        dayList.push(tempDay.getFullYear() + opt.sp + temp);

        for (var i = 2; i < opt.days; i++) {
            tempDay = new Date(day.getTime() + i * 86400000);
            temp = getMonthDay(tempDay);
            days.push(cnDay[tempDay.getDay()] + '<br>' + temp);
            dayList.push(tempDay.getFullYear() + opt.sp + temp);
        }
        return days;
    }




    obj.on('touchmove', function (e) {
        if (!$(e.target).parents('.choose-server-time').length) {
            e.preventDefault()
        }
    }).on('tap', function (e) {
        if (!$(e.target).parents('.choose-server-time').length) {
            callback && callback();
            obj.off().remove();
        }
    }).on('tap', '.pick-date', function (e) {
        var obj = $(e.currentTarget);
        if(obj.hasClass('active')) return;
        obj.addClass('active').siblings().removeClass('active');
        showTimeList(obj.attr('data-value'));
        day=obj.attr('data-value');
        time='';
        return false;
    }).on('tap', '.pick-time', function (e) {
        var self=$(e.currentTarget);
        if(self.hasClass('booked')){
            return false;
        }else{
            self.addClass('active').siblings().removeClass('active');
            time=self.attr('data-value');
            callback && callback()
            setTimeout(function(){
                obj.off().remove();
            },300);

        }
    }).on('tap', '.close-btn', function () {
        callback && callback();
        obj.off().remove();
    });

    //return {
    //    getDay: function () {
    //        return day
    //    },
    //    getTime: function () {
    //        return time;
    //    }
    //}
}