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
$(function () {
    var paramObj = getParam();

    if(!paramObj.id){
        location.href = "error.html";
        return;
    }

    //由ID查询文章
    $.get("/articleServlet", { opeType : "queryArticleById" , id : paramObj.id , querySameCategory : '1', refresh : (new Date()).getTime() },
        function(data,textStatus){
            if(textStatus == "success" && data.title){
                $("#articleTitle").text(data.title);
                data.content = data.content.replace(/(FONT-FAMILY: 宋体;|font-family: 宋体;) /g,"");
                $("#articleContainer").html(data.content);

                var linkStr = "" , currPos = $("div.content>div.currPos")[0];
                var similarArticle = $("#similarArticle");
                if(paramObj.sid && paramObj.sname){//专题文章
                    linkStr ="<a href='statisticsBusiness.html'>统计业务</a> >> <a href='statisticsBusiness.html#subject'>专题聚焦</a> >> "+"<a href='subject.html?id="+paramObj.sid+"&name="+paramObj.sname+"'>"+decodeURIComponent(paramObj.sname)+"</a>";
                }
                else
                {
                    switch(data.category){
                        //统计数据------年度公报(全市)
                        case "020100" : linkStr ="<a href='statisticsData.html'>统计数据</a> >> <a href='statisticsData.html#cityYearBulletin'>年度公报(全市)</a>"; break;
                        //统计数据------年度公报(各县)
                        case "020101" : linkStr ="<a href='statisticsData.html'>统计数据</a> >> <a href='statisticsData.html#countyYearBulletin'>年度公报(各县)</a>";break;
                        //统计数据------普查公报
                        case "020200" : linkStr ="<a href='statisticsData.html'>统计数据</a> >> <a href='statisticsData.html#surveyBulletin'>普查公报</a>";break;

                        //统计业务------市级工作动态
                        case "030100" : linkStr ="<a href='statisticsBusiness.html'>统计业务</a> >> <a href='statisticsBusiness.html#cityLevelWorkNews'>市级工作动态</a>";break;
                        //统计业务------市级工作动态
                        case "030101" : linkStr ="<a href='statisticsBusiness.html'>统计业务</a> >> <a href='statisticsBusiness.html#countyLevelWorkNews'>县级工作动态</a>";break;
                        //统计业务------公告通知
                        case "030300" : linkStr ="<a href='statisticsBusiness.html'>统计业务</a> >> <a href='statisticsBusiness.html#notice'>公告通知</a>";break;
                        //统计业务------领导讲话
                        case "030400" : linkStr ="<a href='statisticsBusiness.html'>统计业务</a> >> <a href='statisticsBusiness.html#directorSpeech'>领导讲话</a>";break;
                        //统计业务------工作交流
                        case "030500" : linkStr ="<a href='statisticsBusiness.html'>统计业务</a> >> <a href='statisticsBusiness.html#workExchange'>工作交流</a>";break;
                        //统计业务------统计风采
                        case "030700" : linkStr ="<a href='statisticsBusiness.html'>统计业务</a> >> <a href='statisticsBusiness.html#mien'>统计风采</a>";break;

                        //统计建设------党建工作
                        case "030800" : linkStr ="<a href='statisticsBuild.html'>统计建设</a> >> <a href='statisticsBuild.html#partyBuild'>党建工作</a>";break;
                        //统计建设------纪检监察
                        case "030900" : linkStr ="<a href='statisticsBuild.html'>统计建设</a> >> <a href='statisticsBuild.html#supervise'>纪检监察</a>";break;
                        //统计建设------教育培训
                        case "031000" : linkStr ="<a href='statisticsBuild.html'>统计建设</a> >> <a href='statisticsBuild.html#education'>教育培训</a>";break;

                        //统计分析------市级简要信息
                        case "040100" : linkStr ="<a href='statisticsAnalysis.html'>统计分析</a> >> <a href='statisticsAnalysis.html#cityBriefInfo'>市级简要信息</a>";break;
                        //统计分析------县级简要信息
                        case "040101" : linkStr ="<a href='statisticsAnalysis.html'>统计分析</a> >> <a href='statisticsAnalysis.html#countyBriefInfo'>县级简要信息</a>";break;
                        //统计分析------市级运行分析
                        case "040200" : linkStr ="<a href='statisticsAnalysis.html'>统计分析</a> >> <a href='statisticsAnalysis.html#cityRunningAnalysis'>市级运行分析</a>";break;
                        //统计分析------市级运行分析
                        case "040201" : linkStr ="<a href='statisticsAnalysis.html'>统计分析</a> >> <a href='statisticsAnalysis.html#countyRunningAnalysis'>县级运行分析</a>";break;
                        //统计分析------综合调研
                        case "040300" : linkStr ="<a href='statisticsAnalysis.html'>统计分析</a> >> <a href='statisticsAnalysis.html#comprehensiveSurvey'>综合调研</a>";break;
                        //统计分析------经济观点
                        case "040400" : linkStr ="<a href='statisticsAnalysis.html'>统计分析</a> >> <a href='statisticsAnalysis.html#economicViewpoint'>经济观点</a>";break;

                        //统计知识------统计制度
                        case "050100" : linkStr ="<a href='statisticsKnowledge.html'>统计知识</a> >> <a href='statisticsKnowledge.html#system'>统计制度</a>";break;
                        //统计知识------统计标准
                        case "050200" : linkStr ="<a href='statisticsKnowledge.html'>统计知识</a> >> <a href='statisticsKnowledge.html#criterion'>统计标准</a>";break;
                        //统计知识------统计指标
                        case "050300" : linkStr ="<a href='statisticsKnowledge.html'>统计知识</a> >> <a href='statisticsKnowledge.html#index'>统计指标</a>";break;
                        //统计知识------统计法规
                        case "010400" : linkStr ="<a href='statisticsKnowledge.html'>统计知识</a> >> <a href='statisticsKnowledge.html#laws'>统计法规</a>";break;
                        //统计知识------统计知识
                        case "050500" : linkStr ="<a href='statisticsKnowledge.html'>统计知识</a> >> <a href='statisticsKnowledge.html#knowledge'>统计知识</a>";break;

                        //经济要闻------国际要闻
                        case "060100" : linkStr ="<a href='economicNews.html'>经济要闻</a> >> <a href='economicNews.html##international'>国际要闻</a>";break;
                        //经济要闻------国内要闻
                        case "060200" : linkStr ="<a href='economicNews.html'>经济要闻</a> >> <a href='economicNews.html#civil'>国内要闻</a>";break;
                        //经济要闻------观点荟萃
                        case "060300" : linkStr ="<a href='economicNews.html'>经济要闻</a> >> <a href='economicNews.html#viewpoints'>观点荟萃</a>";break;

                        //统计服务------意见征集
                        case "070600" : linkStr ="<a href='statisticsService.html'>统计服务</a> >> <a href='statisticsService.html#solicitOpinion'>意见征集</a>";break;
                        //统计服务------考试动态
                        case "070500" : linkStr ="<a href='statisticsService.html'>统计服务</a> >> <a href='statisticsService.html#examNews'>考试动态</a>";break;
                        //统计服务------考试文件
                        case "070100" : linkStr ="<a href='statisticsService.html'>统计服务</a> >> <a href='statisticsService.html#examFiles'>考试文件</a>";break;
                        //统计服务------表格下载
                        case "070200" : linkStr ="<a href='statisticsService.html'>统计服务</a> >> <a href='statisticsService.html#downloadTables'>表格下载</a>";break;
                        //统计服务------统计行政许可
                        case "070300" : linkStr ="<a href='statisticsService.html'>统计服务</a> >> <a href='statisticsService.html#licensing'>统计行政许可</a>";break;
                        //统计服务------资料下载
                        case "070400" : linkStr ="<a href='statisticsService.html'>统计服务</a> >> <a href='statisticsService.html#download'>资料下载</a>";break;
                        //统计服务---地方调查项目管理办事程序
                        case "070701" : linkStr ="<a href='statisticsService.html'>统计服务</a> >> <a href='statisticsService.html#itemProgram'>地方统计调查项目管理(办事程序)</a>";break;
                        //统计服务-----地方调查项目管理表格下载
                        case "070702" : linkStr ="<a href='statisticsService.html'>统计服务</a> >> <a href='statisticsService.html#itemTables'>地方统计调查项目管理(表格下载)</a>";break;

                        //首页头条
                        case "010300" : linkStr = "<a>首页头条</a>" ;break;
                        //失信企业公示------资料下载
                        case "010600":linkStr+="<a href='dishonestInfo.html'>失信企业公示</a> >> <a href='dishonestInfo.html#info'>失信企业信息</a>";break;

                        //1%人口抽样调查------工作要闻
                        case "080100" : linkStr = "<a href='statisticsBusiness.html#subject'>专题聚焦</a> >> <a href='censusSubject.html'>1%人口抽样调查</a> >> <a href='censusSubject.html#news'>工作要闻</a>";break;
                        //1%人口抽样调查------文件通知
                        case "080101" : linkStr ="<a href='statisticsBusiness.html#subject'>专题聚焦</a> >> <a href='censusSubject.html'>1%人口抽样调查</a> >> <a href='censusSubject.html#notes'>文件通知</a>";break;
                        //1%人口抽样调查------各地交流
                        case "080102" : linkStr ="<a href='statisticsBusiness.html#subject'>专题聚焦</a> >> <a href='censusSubject.html'>1%人口抽样调查</a> >> <a href='censusSubject.html#exchange'>各地交流</a>";break;
                    }
                }
                currPos.innerHTML += linkStr;
                $("#articleInfo").html("发布时间："+data.publishTime+"&nbsp;&nbsp;&nbsp;&nbsp;浏览次数："+data.browseCount+"&nbsp;&nbsp;&nbsp;&nbsp;来源："+data.origin+"&nbsp;&nbsp;&nbsp;&nbsp;<a onclick='javascript:window.print();' class='noPrint'>打印</a>");

                if(paramObj.id == 5) return;//首页头条的页面

                if(data.sameCategoryArticle_0_id || data.sameCategoryArticle_1_id){
                    similarArticle[0].className = "active noPrint";
                    var lastNextObj = {} , k;
                    for(k = 0 ; k<2;k++){
                        if(data["sameCategoryArticle_"+k+"_id"]){
                            if(data["sameCategoryArticle_"+k+"_id"] - 0 < paramObj.id - 0){
                                lastNextObj.next = { id : data["sameCategoryArticle_"+k+"_id"] , title : data["sameCategoryArticle_"+k+"_title"] }
                            }
                            else{
                                lastNextObj.last = { id : data["sameCategoryArticle_"+k+"_id"] , title : data["sameCategoryArticle_"+k+"_title"] }
                            }
                        }
                    }

                    if(lastNextObj.last){
                        similarArticle[0].children[0].innerHTML += "<li>上一篇：<a href='article.html?id="+lastNextObj.last.id+((paramObj.sid && paramObj.sname) ? "&sid="+paramObj.sid+"&sname="+paramObj.sname : "" )+"'>"+lastNextObj.last.title+"</a></li>";
                    }
                    else{
                        similarArticle[0].children[0].innerHTML += "<li>上一篇：无</li>";
                    }
                    if(lastNextObj.next){
                        similarArticle[0].children[0].innerHTML += "<li>下一篇：<a href='article.html?id="+lastNextObj.next.id+((paramObj.sid && paramObj.sname) ? "&sid="+paramObj.sid+"&sname="+paramObj.sname : "" )+"'>"+lastNextObj.next.title+"</a></li>";
                    }
                    else{
                        similarArticle[0].children[0].innerHTML += "<li>下一篇：无";
                    }
                }
            }
            else{
                location.href = "error.html";
            }
        },"json");
});