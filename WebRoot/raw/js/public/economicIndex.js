function numFormat(v) {
    var str = parseFloat(v).toFixed(2);
    if (str == "0.00") return "";
    if (str.slice(-1) == "0") {
        str = str.slice(0,-1);
    }
    return str;
}

$(function () {
    var $win = $(window),
        paramObj = getParam();
    if(!paramObj.time || !/^\d{6}$/.test(paramObj.time)){
        location.href = "error.html";
        return;
    }
    var isCity = /city/.test(location.href),//全市或者各县
        year = paramObj.time.substr(0, 4) - 0,
        month = paramObj.time.slice(-2) - 0,
        lastYear , nextYear , currYear = (new Date()).getFullYear() , lastMonth , nextMonth;

    //title
    $("#listContent>h2").html((isCity ? "赣州市" : "各县(市、区)")+ year + "年1-" + month + "月主要经济指标<a class='noPrint' href='javascript:window.print()'>[打印]</a>");

    //query data
    if(isCity){
        $.post("/economicIndicatorServlet", {
            opeType: "queryAllByYearMonth", place: "赣州市", yearMonth: paramObj.time, refresh: (new Date()).getTime()
        }, function(res, textStatus) {
                if (textStatus == "success") {
                    var _html = "" , v1 , v2 , indicator;
                    for (var i = 0; i < res.data.length; i++) {
                        v1 = parseFloat(res.data[i].indicatorValue).toFixed(2);
                        if (v1 == "0.00" || v1=="NaN") v1 = "";
                        v2 = parseFloat(res.data[i].indicatorGrowth).toFixed(2);
                        if (v2 == "0.00" || v2=="NaN") v2 = "";
                        indicator = res.data[i].indicator;
                        if(/#/.test(indicator)){
                            indicator = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+indicator;
                        }
                        _html += "<tr class='"+(i%2==0 ? "odd" : "even")+"'><td>" + indicator + "</td><td>" + res.data[i].unit + "</td><td>" + v1 + "</td><td>" + v2 + "</td></tr>";
                    }
                    if(_html == ""){
                        _html = "<tr><td colspan='4' style='height:300px'>抱歉！暂无数据！</td></tr>";
                    }
                    $("#listContent>table>tbody").html(_html);
                }
            }, "json");
    }
    else{
        if(year>2013 && (month == 3 || month == 6 || month == 9 || month == 12)){
            $("#xeth").text("社会消费品零售总额(亿元)");
        }
        $.get("/economicIndicatorServlet2", {
            opeType: "queryAllByYearMonth", yearMonth: paramObj.time, refresh:(new Date()).getTime()
        }, function(res, textStatus) {
                if (textStatus == "success") {
                    var _html = "" , row;
                    for (var i = 0; i < res.data.length; i++) {
                        row = res.data[i];
                        _html += "<tr class='"+(i%2==0 ? "odd" : "even")+"'><td>" + row.place + "</td><td>" + numFormat(row.scV) + "</td><td>" + numFormat(row.scP) + "</td><td>" + numFormat(row.czV) + "</td><td>" + numFormat(row.czP) + "</td><td>" + numFormat(row.ggV) + "</td><td>" + numFormat(row.ggP) + "</td><td>" + numFormat(row.gmV) + "</td><td>" + numFormat(row.gmP) + "</td><td>" + numFormat(row.gdV) + "</td><td>" + numFormat(row.gdP) + "</td><td>" + numFormat(row.xeV) + "</td><td>" + numFormat(row.xeP) + "</td><td>" + numFormat(row.sjV) + "</td><td>" + numFormat(row.sjP) + "</td><td>" + numFormat(row.ckV) + "</td><td>" + numFormat(row.ckP) + "</td></tr>";
                    }
                    if(_html == ""){
                        _html = "<tr><td colspan='17' style='height:300px'>抱歉！暂无数据！</td></tr>";
                    }
                    $("#listContent>table>tbody").html(_html);
                }
            }, "json");
    }
    //////////////////////////////////////页脚信息
    if(year == currYear){
        if(month == 12){
            lastYear=currYear;
            lastMonth=month-1;
        }
        else if(month == 2){
            lastYear=currYear-1;
            lastMonth=12;
            nextYear=currYear;
            nextMonth=month+1;
        }
        else{
            lastYear = currYear;
            lastMonth = month-1;
            nextYear = currYear;
            nextMonth = month+1;
        }
    }
    else if(year == currYear-8){
        if(month == 12){
            lastYear = year;
            lastMonth = month-1;
            nextYear = year+1;
            nextMonth=2;
        }
        else if(month == 2){
            nextYear = year;
            nextMonth = month+1;
        }
        else{
            lastYear = year;
            lastMonth = month-1;
            nextYear = year;
            nextMonth = month+1;
        }
    }
    else{
        if(month == 12){
            lastYear = year;
            lastMonth = month-1;
            nextYear = year+1;
            nextMonth=2;
        }
        else if(month == 2){
            lastYear = year-1;
            lastMonth = 12;
            nextYear = year;
            nextMonth=month+1;
        }
        else{
            lastYear = year;
            lastMonth = month-1;
            nextYear = year;
            nextMonth = month+1;
        }
    }

    if(lastYear && lastMonth){
        if(isCity){
            $("#lastArticle").attr("href","cityEconomicIndexDetail.html?time="+lastYear+(lastMonth<10 ? "0" : "")+lastMonth).text("赣州市" + lastYear + "年1-" + lastMonth + "月主要经济指标");
        }
        else{
            $("#lastArticle").attr("href","countyEconomicIndexDetail.html?time="+lastYear+(lastMonth<10 ? "0" : "")+lastMonth).text("各县(市、区)" + lastYear + "年1-" + lastMonth + "月主要经济指标");
        }
    }
    else{
        $("#lastArticle").text("无");
    }

    if(nextYear && nextMonth){
        if(isCity){
            $("#nextArticle").attr("href","cityEconomicIndexDetail.html?time="+nextYear+(nextMonth<10 ? "0" : "")+nextMonth).text("赣州市" + nextYear + "年1-" + nextMonth + "月主要经济指标");
        }
        else{
            $("#nextArticle").attr("href","countyEconomicIndexDetail.html?time="+nextYear+(nextMonth<10 ? "0" : "")+nextMonth).text("各县(市、区)" + nextYear + "年1-" + nextMonth + "月主要经济指标");
        }
    }
    else{
        $("#nextArticle").text("无");
    }
});