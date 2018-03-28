class Year {
    constructor(year) {
        this.year = year;
        this.isLeapYear = this.getIsLeapYear(year);
    }
    getIsLeapYear(year) {
        return ( year % 4 === 0 && !( year % 100 === 0 ) ) || ( year % 100 === 0 && year % 400 === 0 );
    }
};
class Month {
    constructor(year, month) {
        this.year = year;

        this.month = month - 1;

        this.dayCount = this.getMonthDays(year, month);

        this.en_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][ month - 1 ];

        this.zh_name = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'][ month - 1 ];

    }
    getMonthDays(year, month) {
        if( !( year instanceof Year ) ) {
            year = new Year(year);
        }
        if( year.isLeapYear && month === 2 ) {
            return 29;
        } else if( !year.isLeapYear && month === 2 ) {
            return 28;
        } else {
            return [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][ month - 1 ];
        }
    }
};
class Day {
    constructor(year, month, day) {
        this.year = year;

        this.month = month;

        this.day = day;

        this.weekday = this.getWeekday(year, month, day);

        this.en_name = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][ this.weekday];

        this.zh_name = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][ this.weekday];
    }
    getWeekday(year, month, day){
        if( !( year instanceof Year ) ) {
            year = new Year(year);
        }
        if ( !( month instanceof Month) ) {
            month = new Month(year, month);
        }
        return new Date(year.year, month.month, day).getDay();
    }
};

window.onload = onready;
function onready() {
    console.time('calendar');
    var now = new Date();
    //获取1900年到未来50年的日历
    let years = {};
    for( let yyyy = 1900; yyyy <= (now.getFullYear() + 50 ); yyyy++ ) {
        let year = new Year(yyyy);
        let months = {};
        //获取12个月
        for( let mm = 1; mm <= 12; mm++ ) {
            let days = {};
            let month = new Month(year, mm);
            //获取这个月有多少天
            for( let dd = 1; dd <= month.dayCount; dd++ ) {
                let day = new Day(year, month, dd);
                days[dd] = day;
            }
            months[mm] = days;
        }
        years[yyyy] = months;
    }
    //console.log(years[2018][3]);

    var yearSelect = document.getElementById('years');
    var monthSelect = document.getElementById('months');
    yearSelect.addEventListener('change', renderCalendar);
    monthSelect.addEventListener('change', renderCalendar);
    for( let y in years ) {
        var option = document.createElement('option');
        option.value = y;
        option.innerHTML = y;
        if(y == new Date().getFullYear()) {
            option.setAttribute('selected', 'selected')
        }
        yearSelect.add(option);
    }
    for( let m = 1; m <= 12; m++ ) {
        var option = document.createElement('option');
        option.value = m;
        option.innerHTML = m;
        if(m == ( new Date().getMonth() + 1 ) ) {
            option.setAttribute('selected', 'selected')
        }
        monthSelect.add(option);
    }
    function renderCalendar() {
        let year = document.getElementById('years').value;
        let month = document.getElementById('months').value;
        let ys = years[year];
        let ms = ys[month];
        let days = [];
        for(let d in ms) {
            let day = ms[d];
            let weekday = day.weekday;
            days.push(day);
        }
        let firstDay = days[0].weekday;
        let lastDay = days[ days.length - 1 ].weekday;
        days = new Array( firstDay == 0 ? 6 : firstDay - 1 ).fill( 0 ).concat( days ).concat( new Array( lastDay == 0 ? 0 : 7 - lastDay ).fill( 0 ));
        
        let t = '<div class="row">' + year + '</div><div class="row"><div>星期一</div><div>星期二</div><div>星期三</div><div>星期四</div><div>星期五</div><div>星期六</div><div>星期天</div></div>';
        days.forEach(function(v, index) {
            if( ( ( index + 1 ) % 7) === 1){
                t += '<div class="row">'
            }
            let now = new Date();
            let isCurrent = (v.year && v.year.year == now.getFullYear() && v.month && v.month.month == now.getMonth() && v.day == now.getDate() );
            t += `<div class=${isCurrent?"current":""}>${v.day || '&nbsp;'}</div>`;
            if( ( ( index + 1 ) % 7) === 0){
                t += '</div>'
            }
        });
        var calendar = document.getElementById('calendar');
        calendar.innerHTML = t;
    };
    renderCalendar();
    console.timeEnd('calendar');
};