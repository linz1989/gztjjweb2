if(navigator.appName == "Microsoft Internet Explorer" && (/(MSIE6.0|MSIE7.0)/.test(navigator.appVersion.split(";")[1].replace(/[ ]/g,"")))){
    location.href="tip.html";
}
var _hmt = _hmt || [];

//*********************************************************************
// 检测是否支持某个CSS3样式的方法
//*********************************************************************
function isSupportCss3(style) {
    var prefix = ['webkit', 'Moz', 'ms', 'o'],
        i,
        humpString = [],
        htmlStyle = document.documentElement.style,
        _toHumb = function (string) {
            return string.replace(/-(\w)/g, function ($0, $1) {
                return $1.toUpperCase();
            });
        };

    for (i in prefix) {
        humpString.push(_toHumb(prefix[i] + '-' + style));
    }
    humpString.push(_toHumb(style));

    for (i in humpString)
        if (humpString[i] in htmlStyle) return true;
    return false;
}
//********************************************************************
//对localStorage的封装
//*******************************************************************
function ls(key,value){
    if(localStorage){
        if(value){
            if(localStorage.setItem) return localStorage.setItem(key,value);
        }
        else if(localStorage.getItem){
            return localStorage.getItem(key);
        }
    }
    return false;
}

///获取地址栏参数
function getParam(){
    var paramObj = {},
        paramArr = [],
        i,
        arr,
        paramUrl = location.href.split("?")[1];
    if(paramUrl){
        paramArr = paramUrl.split("&");
        for(i=0;i<paramArr.length;i++){
            arr = paramArr[i].split("=");
            if(arr.length==2){
                paramObj[arr[0]] = arr[1];
            }
        }
    }
    return paramObj;
}

////在窗口中弹出提示
var tipShow = function(text){
    $("body>div.tipShow>span").text(text);
    var $tipDiv = $("body>div.tipShow");
    $tipDiv.css({"line-height":$(window).height()+"px"}).addClass("active");
    setTimeout(function(){
        $tipDiv.removeClass("active");
    },3000);
};

$(function () {
    var $win = $(window), supportTouch = "ontouchend" in document;
    ///////////////////////////////////////////////////////////点击菜单弹出
    var menuListArr = $("div.wrap>div.menu>ul>li");
    menuListArr[supportTouch ? "click" : "hover"](function(event){ doHandlerMenu(this); event.stopPropagation(); });

    function doHandlerMenu(menu){
        if(menu.className != "active"){
            menuListArr.removeClass("active");
            menu.className = "active";
        }
        else menu.className = "";
    }

    //////////////////////////////////////////////////////////收藏、当前日期、搜索
    //当前日期
    var currDate = new Date();
    var month = currDate.getMonth()+ 1,
        date = currDate.getDate(),
        weekObj = ['日', '一', '二', '三', '四', '五', '六'],
        searchBtn = $("body>div.search>i.search");
    $("body>div.search>span:eq(1)").text(currDate.getFullYear()+"年"+(month>9 ? month : "0"+month)+"月"+(date>9 ? date : "0"+date )+"日 星期"+weekObj[currDate.getDay()]);

    //搜索
    $("#search-input").on("input",function(){
        if(this.value.length>20) this.value = this.value.substr(0,20);
    }).on("keypress",function(event){
        if(event.keyCode==13){
            searchBtn.click();
        }
    });
    searchBtn.click(function(){
        ////////////////搜索
        var searchKey = $("#search-input")[0].value;
        if(searchKey && searchKey.length>0){
            location.href="search.html?key="+encodeURIComponent(searchKey);
        }
    });

    //添加收藏夹
    $("body>div.search>span:eq(0)").click(function(){
        try {
            window.external.addFavorite(window.location, document.title);
        }
        catch (e) {
            try {
                window.sidebar.addPanel(window.location, document.title, "");
            } catch (e) {
                tipShow("请尝试按键Ctrl+D！");
            }
        }
    });

    //设置为首页
    $("body>div.search>span:eq(2)").click(function(){
        if (document.all){
            document.body.style.behavior='url(#default#homepage)';
            document.body.setHomePage(location.href);
        }else if (window.sidebar){
            if(window.netscape){
                try{
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                }catch (e){
                    tipShow("您的浏览器不支持自动设置，请您手动设置！");
                }
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components. interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage',location.href);
        }else{
            tipShow("您的浏览器不支持自动设置，请您手动设置！");
        }
    });

    ///////////////////////////////////////////////////////////友情链接的弹出
    var linkPopBtn = $("#friendlyLink>li>i");
    var linkList = $("#friendlyLink>li>ul");
    linkPopBtn.click(function(e){
        e.stopPropagation();
        var linkIndex = linkPopBtn.index(this);
        if(linkList[linkIndex].className == "active"){
            linkList[linkIndex].className = "";
        }
        else{
            linkList.removeClass("active");
            linkList[linkIndex].className = "active";
        }
    });
    $("body").click(function(){
        linkList.removeClass("active");
        menuListArr.removeClass("active");
    });

    ////////////////////////////////////////////////////////////滚动条的监听
    var menu = $("body>div.wrap>div.menu"),
        sideBar =$("body>ul.sideBar"),
        content = $("body>div.wrap>div.content"),
        sideMenu = $("body>div.wrap>div.content>div.listContent>div.leftMenu");

    $win.scroll(function(){
        var scrollTop = $win.scrollTop();
        if(scrollTop>286 && $win.width()>=1000){
            if(!menu.hasClass("fixed")){
                menu.addClass("fixed");
            }
        }
        else{
            if(menu.hasClass("fixed")){
                menu.removeClass("fixed");
            }
        }

        if(scrollTop>441){
            sideMenu.addClass("fixed");
            sideMenu.css("left",(content.offset().left+16)+"px");
            if($win.height()-70-sideMenu.height()<190){
                sideMenu.addClass("bottomFixed");
            }
            else{
                sideMenu.removeClass("bottomFixed");
            }
        }
        else{
            sideMenu.removeClass("fixed");
            sideMenu.css("left","0px");
        }

        if(scrollTop>$win.height()){
            if(!sideBar.hasClass("active")) sideBar.addClass("active");
        }
        else{
            if(sideBar.hasClass("active")) sideBar.removeClass("active");
        }
    });

    if($win.scrollTop()>286){
        menu.addClass("fixed");
    }
    if($win.scrollTop()>$win.height()){
        sideBar.addClass("active");
    }
    ////////////////////////////////////////////////////////////侧边栏
    var sideBarList = $("body>ul.sideBar>li");
    sideBarList[1].onclick = function(){//跳转到赣州统计局腾讯微博
        window.open("http://t.qq.com/ganzhoutongji");
    };
    sideBarList[4].onclick = function(){//返回到顶部
        $("html,body").animate({ scrollTop : 0 },800);
    };

    //////////////////////////////////////////lazyload bg
    $("body>div.wrap").css("background-image","url(img/public/common/bg.jpg)");
    $("body>div.wrap>div.title>div.logo").css("background-image","url(img/public/common/title.png)");
    $("body>div.wrap>div.title>div.txt").css("background-image","url(img/public/common/title-txt.png)");

    //////////////////////////////////////////////css的修正
    if(isSupportCss3("background-size")){
        $("body>div.wrap").addClass("bgSize");
    }
    if(!isSupportCss3("transform")){
        $("body>div.wrap>div.menu,body>div.wrap>div.footer").addClass("compatible");
    }

    /////////////////////////////////////add baidu statistics
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?811035e8ded4c8bc44ced6f7aa336357";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
});
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