/**
 * @author syj
 *
 */

//两端去空格函数
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}


/**
 * ------------------------------------------------------------------------
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

    this.GCJ02_TO_BD09 = function (gg_lat, gg_lon) {
        var X_PI = Math.PI * 3000.0 / 180.0;
        var x = gg_lon, y = gg_lat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
        var bd_lon = z * Math.cos(theta) + 0.0065;
        var bd_lat = z * Math.sin(theta) + 0.006;
        return {
            lat: bd_lat,
            lng: bd_lon
        };
    };

    this.BD09_TO_GCJ02 = function (bd_lat, bd_lon) {
        var X_PI = Math.PI * 3000.0 / 180.0;
        var x = bd_lon - 0.0065;
        var y = bd_lat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
        var gg_lon = z * Math.cos(theta);
        var gg_lat = z * Math.sin(theta);
        return {
            lng: gg_lon,
            lat: gg_lat
        }
    };

    this.BD09_TO_WGS84 = function (lat, lng) {
        var latlng = this.BD09_TO_GCJ02(lat, lng);
        return this.GCJ_02TOWGS84(latlng.lat, latlng.lng);
    };

    this.WGS84_TO_BD09 = function (lat, lng) {
        var latlng = this.WGS84TOGCJ_02(lat, lng);
        return this.GCJ02_TO_BD09(latlng.lat, latlng.lng);
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

/**
 * 靠近动画抛物线模拟
 * @param point1   点1
 * @param point2    点2
 * @param factor    变化因子
 * @returns {getY} 方程 y=ax^2+bx+c
 */
function getParabolaEquation(point) {
    var b = 2 * point.y / point.x,
        a = -b / (2 * point.x)

    // console.log(a, b);
    return function getY(x) {
        return a * x * x + b * x;
    }
}

/**
 * 获取物体位置
 */
function getPosition(entity, position) {
    if (entity.type === "Scene") {
        return position.copy(entity.position);
    } else {
        return getPosition(entity.parent, position).add(entity.position);
    }
}

/**
 * 异步条件调用
 * @param callback
 * @param isDefined
 */
function doIF(callback, isDefined) {
    if (isDefined()) {
        callback && callback();
    } else {
        setTimeout(function () {
            doIF(callback, isDefined);
        }, 500);
    }
}

/**
 * 获取节流函数
 */
function getShortage(method, delay) {
    var timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(method, delay);
    };
}

function parsePipe(data) {
    var result = [];
    data.forEach((v) => {
        result.push(parseRegion(v));
    });
    console.log("----------------------------\n", JSON.stringify(result));
}

/**
 * 转换百度地图数据
 * @param data
 * @returns {string}
 */
function parseRegion(data) {
    var latlng = data.split(';');
    var result = "";
    for (var i = 0; i < latlng.length; i++) {
        var lng = latlng[i].split(', ')[0], lat = latlng[i].split(', ')[1];
        var trans = _utils.coordinateTransform.BD09_TO_GCJ02(lat, lng);
        result += trans.lng + ", " + trans.lat + ";"
    }
    return result.substr(0, result.length - 1);
}

/**
 * ------------------------------------某地长度坐标转经纬度------------------------------------
 */

/**
 * 地球纬度半径获取
 */
function getRadiusByLat(lat) {
    var a = 6.378,   //地球竖切近似椭圆长轴a,短轴b
        b = 6.357;
    return Math.pow(10, 6) / Math.sqrt((1 / Math.pow(a, 2) + Math.pow(Math.tan(lat * 2 * Math.PI / 360) / b, 2)));
}

function getRadius() {
    return;
}

/**
 * 经纬度跨度计算
 * @param x,y   单位米
 * @returns {{lat: number, lng: number}}
 */
function getLatlngByDistans(x, y, lat) {
    var PI = Math.PI;
    var R = 6371 * 1000;
    var dLat = 360 * y / (2 * PI * R);

    var Rlat = R * Math.cos(Math.abs(lat * 2 * PI / 360));
    // var Rlat = getRadiusByLat(lat);  //椭圆近似计算

    var lng = 360 * x / (2 * PI * Rlat);
    return {
        lat: dLat,
        lng: lng
    }
}

/**
 * 反转经纬度为x，y相对位置
 * @param lat
 * @param lng
 * @param base
 */
function getXYbyLatLng(lat, lng, base) {
    var PI = Math.PI;
    var R = 6371 * 1000;
    var dlat = lat;
    var dlng = lng;
    var RLat = R * Math.cos(Math.abs(base.lat * 2 * PI / 360));

    var y = dlat * (2 * PI * R) / 360;
    var x = dlng * (2 * PI * RLat) / 360;

    return {
        x: x,
        y: y
    }
}


/**
 * 获取偏移位置
 * @param offset   偏移x,y 单位米
 * @param base  基准点经纬度
 * @returns {Array}
 */
function getOffsetLatlng(offset, base) {
    var results;

    var posX = (offset.posX + "").split("|"),
        posY = (offset.posY + "").split("|");

    results = [];

    var length = Math.min(posX.length, posY.length);

    for (var i = 0; i < length; i++) {
        results.push(parse({
            posX: posX[i],
            posY: posY[i]
        }, base));
    }

    return results;

    function parse(offset, base) {

        var latlng;

        if (typeof base.lat === "function") {
            latlng = {
                lat: base.lat(),
                lng: base.lng()
            }
        } else {
            latlng = {
                lat: base.lat,
                lng: base.lng
            }
        }

        var offsetLatlng = getLatlngByDistans(offset.posX, offset.posY, latlng.lat);


        return {
            lat: latlng.lat + offsetLatlng.lat,
            lng: latlng.lng + offsetLatlng.lng
        }
    }

}

/**
 * ------------------------------------高斯坐标正反算------------------------------------
 */

/**
 * 正算
 * @param longitude
 * @param latitude
 * @returns {{x: *, Y: *}}
 */
function gaussBLtoXY(latitude, longitude) {
    var ProjNo = 0;

    // 带宽
    var ZoneWide = 6;

    var longitude1, latitude1, longitude0, X0, Y0, xval, yval;
    var a, f, e2, ee, NN, T, C, A, M, iPI;

    // 3.1415926535898/180.0;
    iPI = 0.0174532925199433;

    // 54年北京坐标系参数
    a = 6378245.0;
    f = 1.0 / 298.3;

    // 80年西安坐标系参数
    // a=6378140.0;
    // f=1/298.257;

    ProjNo = longitude / ZoneWide;
    longitude0 = ProjNo * ZoneWide + ZoneWide / 2;
    longitude0 = longitude0 * iPI;

    // 经度转换为弧度
    longitude1 = longitude * iPI;

    // 纬度转换为弧度
    latitude1 = latitude * iPI;

    e2 = 2 * f - f * f;
    ee = e2 * (1.0 - e2);
    NN = a / Math.sqrt(1.0 - e2 * Math.sin(latitude1) * Math.sin(latitude1));
    T = Math.tan(latitude1) * Math.tan(latitude1);
    C = ee * Math.cos(latitude1) * Math.cos(latitude1);
    A = (longitude1 - longitude0) * Math.cos(latitude1);
    M = a * ((1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256) * latitude1 - (3 * e2 / 8 + 3 * e2 * e2 / 32 + 45 * e2 * e2 * e2 / 1024) * Math.sin(2 * latitude1) + (15 * e2 * e2 / 256 + 45 * e2 * e2 * e2 / 1024) * Math.sin(4 * latitude1) - (35 * e2 * e2 * e2 / 3072) * Math.sin(6 * latitude1));
    xval = NN * (A + (1 - T + C) * A * A * A / 6 + (5 - 18 * T + T * T + 72 * C - 58 * ee) * A * A * A * A * A / 120);
    yval = M + NN * Math.tan(latitude1) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24 + (61 - 58 * T + T * T + 600 * C - 330 * ee) * A * A * A * A * A * A / 720);
    X0 = 1000000 * (ProjNo + 1) + 500000;
    Y0 = 0;
    xval = xval + X0;
    yval = yval + Y0;
    return {x: xval, y: yval};
}

/**
 * 反算
 * @param X
 * @param Y
 * @returns {{lat: number, lng: number}}
 */
function gaussXYtoBL(X, Y) {
    var ProjNo;
    var ZoneWide; // //带宽
    var output = [];
    var longitude1, latitude1, longitude0, X0, Y0, xval, yval;// latitude0,
    var e1, e2, f, a, ee, NN, T, C, M, D, R, u, fai, iPI;
    iPI = 0.0174532925199433; // //3.1415926535898/180.0;
    a = 6378245.0;
    f = 1.0 / 298.3; //54年北京坐标系参数
    //a = 6378140.0;
    //f = 1 / 298.257; // 80年西安坐标系参数
    // 54年北京坐标系参数

    ZoneWide = 6; // //6度带宽
    ProjNo = X / 1000000; // 查找带号
    longitude0 = (ProjNo - 1) * ZoneWide + ZoneWide / 2;
    longitude0 = longitude0 * iPI; // 中央经线

    X0 = ProjNo * 1000000 + 500000;
    Y0 = 0;
    xval = X - X0;
    yval = Y - Y0; // 带内大地坐标
    e2 = 2 * f - f * f;
    e1 = (1.0 - Math.sqrt(1 - e2)) / (1.0 + Math.sqrt(1 - e2));
    ee = e2 / (1 - e2);
    M = yval;
    u = M / (a * (1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256));
    fai = u + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * u) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * u) + (151 * e1 * e1 * e1 / 96) * Math.sin(6 * u) + (1097 * e1 * e1 * e1 * e1 / 512) * Math.sin(8 * u);
    C = ee * Math.cos(fai) * Math.cos(fai);
    T = Math.tan(fai) * Math.tan(fai);
    NN = a / Math.sqrt(1.0 - e2 * Math.sin(fai) * Math.sin(fai));
    R = a * (1 - e2) / Math.sqrt((1 - e2 * Math.sin(fai) * Math.sin(fai)) * (1 - e2 * Math.sin(fai) * Math.sin(fai)) * (1 - e2 * Math.sin(fai) * Math.sin(fai)));
    D = xval / NN;
    // 计算经度(Longitude) 纬度(Latitude)
    longitude1 = longitude0 + (D - (1 + 2 * T + C) * D * D * D / 6 + (5 - 2 * C + 28 * T - 3 * C * C + 8 * ee + 24 * T * T) * D * D * D * D * D / 120) / Math.cos(fai);
    latitude1 = fai - (NN * Math.tan(fai) / R) * (D * D / 2 - (5 + 3 * T + 10 * C - 4 * C * C - 9 * ee) * D * D * D * D / 24 + (61 + 90 * T + 298 * C + 45 * T * T - 256 * ee - 3 * C * C) * D * D * D * D * D * D / 720);

    return {
        lat: latitude1 / iPI,
        lng: longitude1 / iPI
    };
}

/**
 * 生成随机色
 */
function getRadomColor() {
    return "#" + Math.round((0xffffff) * Math.random()).toString(16);
}

/**
 * 模拟jquery创建html对象
 */
function createNode(htmlStr) {
    var div = document.createElement("div");
    div.innerHTML = htmlStr;
    return div.childNodes[0];
}

/**
 * 处理请求
 * @param message
 * @param result
 * @param success
 */
function resolveResult(message, result, success, complete) {
    if (result.code == 200 || result.status == 200) {
        var data = result.data;
        if (data.code === 200) {
            success && success(data.data)
        } else {
            message.error(data.msg);
        }
    } else {
        message.error("访问出错，请稍后再试");
    }
    complete && complete(result);
}

function prefixNum(number, length) {
    var _number = number + "";
    for (var i = _number.length; i < length; i++) {
        _number = "0" + _number;
    }
    return _number;
}

function checkByFilter(v, filter) {
    for (var i = 0; i < filter.length; i++) {
        var item = filter[i];
        if (item.value instanceof Array) {
            if (item.value.indexOf(v[item.path[0]]) === -1) {
                return false;
            }
        } else {
            if (v[item.path[0]] !== item.value) {
                return false;
            }
        }
    }
    return true;
}

/**
 * 生成模拟数据
 */
function getSimData(model) {
    var data = [];
    model = apply({}, model);
    for (var i in model) {
        model[i] = "123123";
    }

    for (var i = 0; i < 10; i++) {
        data.push(model);
    }

    return data;
}


/**
 * ------------------------------------for vue------------------------------------
 */


function getRules(data) {
    var rules = {};
    for (var key in data) {
        rules[key] = [{
            required: true, message: "请输入或选择" + data[key], trigger: 'blur'
        }];
    }
    return rules;
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
    getRadomColor: getRadomColor,
    regex: {
        TELEPHONE_NUM: /^[1][3,4,5,7,8][0-9]{9}$/
    },
    getParabolaEquation: getParabolaEquation,
    getPosition: getPosition,
    doIF: doIF,
    getShortage: getShortage,
    parsePipe: parsePipe,
    getLatlngByDistans: getLatlngByDistans,
    getOffsetLatlng: getOffsetLatlng,
    getRadiusByLat: getRadiusByLat,
    gaussBLtoXY: gaussBLtoXY,
    gaussXYtoBL: gaussXYtoBL,
    createNode: createNode,
    getXYbyLatLng: getXYbyLatLng,
    resolveResult: resolveResult,
    prefixNum: prefixNum,
    checkByFilter: checkByFilter,
    getSimData: getSimData,

    /**
     * ------------------------------------for vue------------------------------------
     */

    STREET_DATA: {
        provence: {
            name: "四川省",
            id: 1
        },
        city: {
            name: "成都市",
            id: 510100000000
        },
        country: {
            id: 659005000000,
            name: "高新区"
        },
        town: null,
        street: null
    },
    getRules: getRules,

    /**
     * ------------------------------------enum------------------------------------
     */

    enum: {
        /**
         * 员工类型
         */
        WorkerType: {
            "段长": 1,
            "协助人": 2,
            "工人": 3
        }
    }
};


