/**
 * @author syj
 *
 */

function check(obj, type) {
    return Object.prototype.toString.call(obj) === "[object " + type + "]";
}

function extend(o, p, t) {
    if (check(p, "Object") && check(t, "Object")) {
        for (let i in p) {
            o[i] = p[i];
        }
        for (let j in t) {
            o[j] = t[j];
        }
    }
    return o;
}

function apply(o, p) {
    if (check(p, "Object")) {
        for (let i in p) {
            o[i] = p[i];
        }
    }
    return o;
}

function applyHave(o, p) {
    if (check(p, "Object")) {
        for (let i in o) {
            if (p[i] != undefined) {
                o[i] = p[i];
            }
        }
    }
    return o;
}

function formatTime(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    return [year, month, day].map(formatNumber).join("/") + " " + [hour, minute, second].map(formatNumber).join(":");
}

function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
}

/**
 * 时间戳转时间格式
 * @param {number} 时间戳13位
 * @return {string}
 * @example
 * formatTimestamp(1489047777000)=>'2017-03-09 16:22:57'
 * */
function formatTimestamp(timestamp, fmt) {
    let date;
    if (timestamp) {
        date = new Date(timestamp - 0);
    } else {
        date = new Date();
    }
    let Y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        H = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds(),
        w = date.getDay();
    if (m < 10) {
        m = "0" + m;
    }
    if (d < 10) {
        d = "0" + d;
    }
    if (H < 10) {
        H = "0" + H;
    }
    if (i < 10) {
        i = "0" + i;
    }
    if (s < 10) {
        s = "0" + s;
    }
    switch (w) {
        case 0:
            w = "周日";
            break;
        case 1:
            w = "周一";
            break;
        case 2:
            w = "周二";
            break;
        case 3:
            w = "周三";
            break;
        case 4:
            w = "周四";
            break;
        case 5:
            w = "周五";
            break;
        case 6:
            w = "周六";
            break;
        default:
            w = "啥也不是";
            break;

    }
    let t = fmt || "yyyy-MM-dd hh:mm:ss";
    t = t.replace("yyyy", Y);
    t = t.replace("MM", m);
    t = t.replace("dd", d);
    t = t.replace("hh", H);
    t = t.replace("mm", i);
    t = t.replace("ss", s);
    t = t.replace("ww", w);
    return t;
}


/**
 * 时间格式转时间戳
 */
function transdate(time) {
    let date = new Date();
    date.setFullYear(time.substring(0, 4));
    date.setMonth(time.substring(5, 7) - 1);
    date.setDate(time.substring(8, 10));
    date.setHours(time.substring(11, 13));
    date.setMinutes(time.substring(14, 16));
    date.setSeconds(time.substring(17, 19));
    return Date.parse(date) / 1000 + "000" - 0;
}

/**
 * 对象转url参数
 * @param opt
 * @returns {string}
 */
function parseUrlParams(opt) {
    let params = "";
    for (let i in opt) {
        if (typeof opt[i] != "object") {
            params += i + "=" + opt[i] + "&";
        }
    }
    return params.substr(0, params.length - 1);
}

/**
 * 获取url参数
 * @param name
 * @returns {null}
 * @constructor
 */
function getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

/**
 * 生成uuid
 * @returns {string}
 */
function uuid() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";

    let uuid = s.join("");
    return uuid.replace(/-/g, "");
}

/**
 * 坐标系转换
 * @constructor
 */
function CoordinateTransform() {

    let pi = 3.14159265358979324;
    let a = 6378245.0;
    let ee = 0.00669342162296594323;

    this.WGS84TOGCJ_02 = function (wgLat, wgLon) {
        var result = {}, mgLat, mgLon;

        if (outOfChina(wgLat, wgLon)) {
            result.lat = wgLat;
            result.lng = wgLon;
            return result;
        }
        let dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
        let dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
        let radLat = wgLat / 180.0 * pi;
        let magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        let sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
        mgLat = wgLat + dLat;
        mgLon = wgLon + dLon;

        result.lat = mgLat;
        result.lng = mgLon;
        return result;
    };

    this.GCJ_02TOWGS84 = function (wgLat, wgLon) {
        var result = {}, mgLat, mgLon;

        if (outOfChina(wgLat, wgLon)) {
            result.lat = wgLat;
            result.lng = wgLon;
            return result;
        }
        let dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
        let dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
        let radLat = wgLat / 180.0 * pi;
        let magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        let sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
        mgLat = wgLat - dLat;
        mgLon = wgLon - dLon;

        result.lat = mgLat;
        result.lng = mgLon;
        return result;
    };

    function outOfChina(lat, lon) {
        return (lon < 72.004 || lon > 137.8347) && (lat < 0.8293 || lat > 55.8271);
    }

    function transformLat(x, y) {
        let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
        return ret;
    }

    function transformLon(x, y) {
        let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
        return ret;
    }

}

/**
 *  获取指定月的天数
 */
function getCountDays(year, month) {

    let date = new Date();
    /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
    date.setMonth(month * 1);
    date.setYear(year);
    date.setDate(0);
    return date.getDate();
}

/**
 * 获取一月第一天是星期几
 */
function getFirstMonthDay(year, month) {
    month = month - 1;
    let date = new Date();
    date.setFullYear(year);
    date.setMonth(month);
    date.setDate(1);

    return date.getDay();
}

/**
 * 去除html中的标签
 **/
function escapeHTMLTag(htmlStr) {
    return htmlStr.replace(/&[a-zA-Z]+;/g, "");
}

function toFixed(number, num) {
    return (number - 0).toFixed(num || 6) - 0;
}

export default {
    check: check,
    extend: extend,
    apply: apply,
    applyHave: applyHave,
    formatTime: formatTime,
    formatTimestamp: formatTimestamp,
    parseUrlParams: parseUrlParams,
    transdate: transdate,
    getUrlParam: getUrlParam,
    coordinateTransform: new CoordinateTransform(),
    uuid: uuid,
    getCountDays: getCountDays,
    getFirstMonthDay: getFirstMonthDay,
    escapeHTMLTag: escapeHTMLTag,
    toFixed: toFixed,
    regex: {
        TELEPHONE_NUM: /^[1][3,4,5,7,8][0-9]{9}$/
    }
};


