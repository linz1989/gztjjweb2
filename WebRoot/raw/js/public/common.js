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
        searchBtn = $("body>div.search>div>i.search");
    $("body>div.search>div>span:eq(1)").text(currDate.getFullYear()+"年"+(month>9 ? month : "0"+month)+"月"+(date>9 ? date : "0"+date )+"日 星期"+weekObj[currDate.getDay()]);

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
    $("body>div.search>div>span:eq(0)").click(function(){
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
    $("body>div.search>div>span:eq(2)").click(function(){
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
    //$("body>div.wrap").css("background-image","url(img/public/common/bg.jpg)");
    $("body>div.wrap>div.title>div>div.logo").css("background-image","url(img/public/common/title.png)");
    $("body>div.wrap>div.title>div>div.txt").css("background-image","url(img/public/common/title-txt.png)");

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