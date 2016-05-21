// JavaScript Document
var APP_PATH="/GztjjWeb";
//var UEDITOR_HOME_URL="http://localhost:8080"+APP_PATH+"/";

//格式化日期 时间
function formatDate(dateObj, formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, dateObj.getFullYear());
    str = str.replace(/yy|YY/, (dateObj.getYear() % 100) > 9 ? (dateObj.getYear() % 100).toString() : '0' + (dateObj.getYear() % 100));
    str = str.replace(/MM/, (dateObj.getMonth() + 1) > 9 ? (dateObj.getMonth() + 1) : '0' + (dateObj.getMonth() + 1));
    str = str.replace(/M/g, dateObj.getMonth());
    str = str.replace(/w|W/g, Week[dateObj.getDay()]);
    str = str.replace(/dd|DD/, dateObj.getDate() > 9 ? dateObj.getDate().toString() : '0' + dateObj.getDate());
    str = str.replace(/d|D/g, dateObj.getDate());
    str = str.replace(/hh|HH/, dateObj.getHours() > 9 ? dateObj.getHours().toString() : '0' + dateObj.getHours());
    str = str.replace(/h|H/g, dateObj.getHours());
    str = str.replace(/mm/, dateObj.getMinutes() > 9 ? dateObj.getMinutes().toString() : '0' + dateObj.getMinutes());
    str = str.replace(/m/g, dateObj.getMinutes());
    str = str.replace(/ss|SS/, dateObj.getSeconds() > 9 ? dateObj.getSeconds().toString() : '0' + dateObj.getSeconds());
    str = str.replace(/s|S/g, dateObj.getSeconds());
    return str;
}