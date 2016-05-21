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
    var $win = $(window);
    ///////////////////////////////////////////////////////////
    var navStrObj = {},
        $leftNavMenu = $("#leftNavMenu>li[data-nav]"),
        $leftLayerMenu = $("#leftNavMenu>li[data-layer]"),
        $rightContentList = $("#articleContent>div.list"),
        $currPos = $("div.content>div.currPos>a.curr"),
        $consultBtn = $("#consultBtn"),
        $consultWrap = $("#consultWrap");

    var pageNum = 20,
        i,
        articleInfoObj = {},
        category,
        navStr,
        defaultNav,
        $listDiv , $listPageInfoDiv;

    for(i=0;i<$leftNavMenu.length;i++){
        category = $leftNavMenu[i].getAttribute("data-article-type");
        navStr = $leftNavMenu[i].getAttribute("data-nav");
        navStrObj[navStr] = i;
        if(i==0) defaultNav = navStr;
        if(category){
            $listDiv = $($rightContentList[i]);
            $listPageInfoDiv = $listDiv.children("div");
            articleInfoObj[category] = {
                category : category,
                listContainer : $listDiv.children("ul"),
                totalPageInput : $listPageInfoDiv.children("input.totalPage"),
                currPageInput :  $listPageInfoDiv.children("input.currPage"),
                currPageNumInput : $listPageInfoDiv.children("input.currPageNum"),
                totalPageSpan : $listPageInfoDiv.children("span").children("span.totalPage"),
                totalRecordSpan : $listPageInfoDiv.children("span").children("span.totalRecord"),
                currPageSpan : $listPageInfoDiv.children("span").children("span.currPage"),
                firstPageLink : $listPageInfoDiv.children("a.first"),
                prevPageLink : $listPageInfoDiv.children("a.prev"),
                nextPageLink : $listPageInfoDiv.children("a.next"),
                lastPageLink : $listPageInfoDiv.children("a.last")
            };
        }
    }

    $leftLayerMenu.click(function(){
        var $this = $(this),
            layerCls = this.getAttribute("data-layer"),
            $subMenus = $("#leftNavMenu>li."+layerCls);
        if($subMenus.is(':visible')){
            $subMenus.hide();
            $this.removeClass("active");
        }
        else{
            $subMenus.show();
            $this.addClass("active");
        }
    });

    //跳转到首页
    $("#articleContent>div.list>div>a.first").click(function(){
        var p = $(this).parent(), category = p.attr("data-article-type"), obj = articleInfoObj[category];
        if(obj){
            var currPageNo = obj.currPageInput.val()-0;
            if (currPageNo > 1) {
                queryOnePageData(0, 1, obj);
            }
        }
    });

    //跳转上一页
    $("#articleContent>div.list>div>a.prev").click(function(){
        var p = $(this).parent(), category = p.attr("data-article-type"), obj = articleInfoObj[category];
        if(obj){
            var currPageNo = obj.currPageInput.val() - 0 ,
                pageNum = obj.currPageNumInput.val() - 0;
            if (currPageNo > 1) {
                queryOnePageData((currPageNo - 2) * pageNum, currPageNo - 1 , obj)
            }
        }
    });

    //跳转下一页
    $("#articleContent>div.list>div>a.next").click(function(){
        var p = $(this).parent(), category = p.attr("data-article-type"), obj = articleInfoObj[category];
        if(obj){
            var currPageNo = obj.currPageInput.val()-0,
                totalPage = obj.totalPageInput.val()-0,
                pageNum = obj.currPageNumInput.val()-0;
            if (currPageNo < totalPage) {
                queryOnePageData(currPageNo * pageNum, currPageNo + 1 , obj);
            }
        }
    });

    //跳转到尾页
    $("#articleContent>div.list>div>a.last").click(function(){
        var p = $(this).parent(), category = p.attr("data-article-type"), obj = articleInfoObj[category];
        if(obj) {
            var currPageNo = obj.currPageInput.val() -0,
                totalPage = obj.totalPageInput.val() - 0,
                pageNum = obj.currPageNumInput.val() - 0;
            if (currPageNo < totalPage) {
                queryOnePageData((totalPage - 1) * pageNum, totalPage , obj);
            }
        }
    });

    $leftNavMenu.click(function(){
        if(this.className == "curr") return;
        location.hash = this.getAttribute("data-nav");
    });

    window.onhashchange = function(){
        if(!location.hash || navStrObj[location.hash.substr(1)] == undefined){
            location.hash = defaultNav;
        }
        doHashChange();
    };

    function doHashChange(){
        $leftNavMenu.removeClass("curr");
        $consultBtn.hide();
        var navIndex = navStrObj[location.hash.substr(1)],
            navMenu = $leftNavMenu[navIndex];
        $(navMenu).addClass("curr");
        $currPos.text($(navMenu).text().replace(/\s+/g,"").replace(">>",""));

        if(navMenu.className != "curr"){
            var parentLayerCls = navMenu.className.split(" ")[0]+"-layer",
                parentLayer = $("#leftNavMenu>li."+parentLayerCls);
            if(!parentLayer.hasClass("active")) parentLayer[0].click();
        }

        if($rightContentList.length>0){
            $rightContentList.removeClass("active");
            $rightContentList[navIndex].className = "list active";
        }

        //article list
        category = navMenu.getAttribute("data-article-type");
        if(category == "note" && $win.width()>414) $consultBtn.show();
        if(category) return queryOnePageData(0,1,articleInfoObj[category]);

        //article
        category = navMenu.getAttribute("data-article-id");
        if(category) return queryArticleById(category,navIndex);

        //subject
        category = navMenu.getAttribute("data-subject");
        if(category) return querySubject(navIndex);
        
        //economic data
        category = navMenu.getAttribute("data-economic-type");
        if(category) return generateEconomicDataTable(navIndex);

        //map
        category = navMenu.getAttribute("data-map");
        if(category) return createMap();
    }

    if(!location.hash || navStrObj[location.hash.substr(1)] == undefined){
        location.hash = defaultNav;
    }
    else{
        doHashChange();
    }

    /// economic data
    function generateEconomicDataTable(navIndex){
        var container = $($rightContentList[navIndex]).children().eq(0);
        if(container.html() != "") return;
        var thisYear = (new Date()).getFullYear() , j , m, _html = "" , labelStr = (navIndex==0 ? "全市主要经济指标" : "各县主要经济指标") , navLink = (navIndex == 0 ? "cityEconomicIndexDetail.html" : "countyEconomicIndexDetail.html");
        for(var k=0; k<5;k++){
            _html += "<tr class='"+(k%2==0 ? 'even' : 'odd')+"'>\
                <th>"+(thisYear-k)+"年"+labelStr+"</th>";
            for(j=2;j<13;j++){
                m = j<10 ? "0"+j : j;
                _html += "<td><a href='"+navLink+"?time="+(thisYear-k)+m+"'>"+m+"月</a></td>";
            }
            _html += "</tr>";
        }
        container.html(_html);
    }

    ///do handle subject
    function querySubject(navIndex){
        $.get("/subjectServlet",
            { opeType: "queryAll",refresh:Math.random() },
            function (data, textStatus) {
                if (textStatus == "success") {
                    var listHTML = "" , subObj;
                    for (i = 0; i < data.data.length; i++) {
                        subObj = data.data[i];
                        if(subObj.isOutLink == "1"){
                            listHTML += "<li><a href=\"" + subObj.outLink + "\" title=\""+subObj.subjectName+"\">" + subObj.subjectName + "</a></li>";
                        }
                        else{
                            listHTML += "<li><a href=\"subject.html?id=" + subObj.id + "&name=" + encodeURIComponent(subObj.subjectName) + "\" title=\""+subObj.subjectName+"\">" + subObj.subjectName + "</a></li>";
                        }
                    }
                    $($rightContentList[navIndex]).children().eq(0).html(listHTML);
                }
            }, "json");
    }

    ////
    function queryArticleById(id,navIndex){
        $.get("articleServlet", {
            opeType : "queryArticleById", id : id
        }, function(res){
            $rightContentList[navIndex].innerHTML=res.content;
        },"json")
    }

    ///查询一页数据 根据category查询已发布文章列表
    function queryOnePageData(startPos, queryPageNo, itemObj) {
        var listHTML = "" , i;
        if(itemObj.category == "note"){//////查询统计咨询
            $.get("/noteBookServlet",{
                opeType : "queryAll",
                start : startPos,
                length : pageNum,
                isPublish : 1,
                refresh : (new Date()).getTime()
            },function(data,textStatus){
                if (textStatus == "success") {
                    for (i = 0; i < data.data.length; i++) {
                        listHTML += "<li><a href=\"consult.html?id=" + data.data[i].id + "\" title=\""+data.data[i].noteTitle+"\">" + data.data[i].noteTitle + "</a><span>"+data.data[i].createTime.slice(0,-3)+"</span></li>";
                    }
                    itemObj.listContainer.html(listHTML);
                    doHandlerPagefoot(data,itemObj,queryPageNo);
                }
            },"json");
        }
        else{
            $.get("/articleServlet", {
                    opeType: "queryArticleListByCategory",
                    category: itemObj.category,
                    searchKeyWords: "",
                    start: startPos,
                    length: pageNum,
                    lineWordsNum:400,
                    isPublic: "1",
                    refresh:(new Date()).getTime()
                },
                function (data, textStatus) {
                    if (textStatus == "success") {
                        for (i = 0; i < data.data.length; i++) {
                            listHTML += "<li><a href=\"article.html?id=" + data.data[i].id + "\" title=\""+data.data[i].title+"\">" + data.data[i].title + "</a><span>"+data.data[i].publishTime.slice(0,-3)+"</span></li>";
                        }
                        itemObj.listContainer.html(listHTML);
                        doHandlerPagefoot(data,itemObj,queryPageNo);
                    }
                }, "json");
        }
    }

    ////////////////////////////////////////////////////////////////////////////////页脚信息
    function doHandlerPagefoot(data,itemObj,queryPageNo){
        var totalPage = parseInt(data.recordsTotal / pageNum, 10);
        if (data.recordsTotal % pageNum != 0) totalPage = totalPage + 1;
        itemObj.totalPageInput.val(totalPage);
        itemObj.currPageInput.val(queryPageNo);
        itemObj.currPageNumInput.val(data.data.length);//当前页的记录数
        if (data.recordsTotal == 0) {
            //$("#pageTextInfo").text("没有查询到相应记录！");
            itemObj.firstPageLink.hide();
            itemObj.prevPageLink.hide();
            itemObj.nextPageLink.hide();
            itemObj.lastPageLink.hide();
        }
        else {
            itemObj.totalPageSpan.text(totalPage);
            itemObj.totalRecordSpan.text(data.recordsTotal);
            itemObj.currPageSpan.text(queryPageNo);
            if (queryPageNo == 1) {
                itemObj.firstPageLink.hide();
                itemObj.prevPageLink.hide();
            }
            else {
                itemObj.firstPageLink.show();
                itemObj.prevPageLink.show();
            }
            if (queryPageNo == totalPage) {
                itemObj.nextPageLink.hide();
                itemObj.lastPageLink.hide();
            }
            else {
                itemObj.nextPageLink.show();
                itemObj.lastPageLink.show();
            }
        }
    }

    //////////////////////////////////////////////////////////////////////////////////构建地图
    function createMap(){
        if($("#mapContainer").html() != "") return;
        ///地图
        var map = new AMap.Map('mapContainer',{
            zoom : 6.5,
            resizeEnable : true,
            center: [115.200278,25.85097]
        });
        var infoWin = $("#mapInfo");
        var districtSearch;//行政区划查询
        var districtArr = [{"name":"章贡区","link":"http://xxgk.zgq.gov.cn/bmgkxx/tjj"},
            {"name":"赣县","link":"http://xxgk.ganxian.gov.cn/bmgkxx/tjj"},
            {"name":"信丰县","link":"http://xxgk.jxxf.gov.cn/bmgkxx/zhbm/xtjj"},
            {"name":"大余县","link":"http://xxgk.jxdy.gov.cn/cms/admin/common/testcontent4.action?channelId=9472"},
            {"name":"南康区","link":"http://xxgk.nkjx.gov.cn/bmgkxx/tjj"},
            {"name":"上犹县","link":"http://xxgk.shangyou.gov.cn/bmgkxx/tjj"},
            {"name":"崇义县","link":"http://xxgk.chongyi.gov.cn/bmgkxx/tjj"},
            {"name":"安远县","link":"http://xxgk.ay.gov.cn/bmgkxx/tjj"},
            {"name":"龙南县","link":"http://xxgk.jxln.gov.cn/bmgkxx/tjj"},
            {"name":"定南县","link":"http://xxgk.dingnan.gov.cn/bmgkxx/tjj"},
            {"name":"全南县","link":"http://xxgk.quannan.gov.cn/bmgkxx/tjj"},
            {"name":"宁都县","link":"http://xxgk.ningdu.gov.cn/bmgkxx/xtjj"},
            {"name":"于都县","link":"http://xxgk.yudu.gov.cn/bmgkxx/xtjj"},
            {"name":"兴国县","link":"http://xxgk.xingguo.gov.cn/bmgkxx/tjj"},
            {"name":"会昌县","link":"http://xxgk.huichang.gov.cn/bmgkxx/xtjj"},
            {"name":"寻乌县","link":"http://xxgk.xunwu.gov.cn/bmgkxx/xtjj/gkxx/jgzn"},
            {"name":"石城县","link":"http://xxgk.shicheng.gov.cn/bmgkxx/xtjj"},
            {"name":"瑞金市","link":"http://xxgk.ruijin.gov.cn/bmgkxx/tjj"}];

        var queryIndex = 0, bounds, polygon;

        AMap.service('AMap.DistrictSearch',function(){//回调函数
            ///////////////////////////实例化DistrictSearch
            districtSearch = new AMap.DistrictSearch({
                level : "district",
                extensions : "all",
                subdistrict : 0
            });
            ////////////////////////////调用查询方法
            queryDistrict();
        });

        function queryDistrict(){
            bounds = ls("mapData_"+queryIndex);
            if(bounds){
                doInitDistrict(JSON.parse(bounds));
            }
            else{
                districtSearch.search(districtArr[queryIndex].name,function(status, result){
                    if(status == "complete"){
                        bounds = result.districtList[0].boundaries;
                        if(bounds) ls("mapData_"+queryIndex,JSON.stringify(bounds));
                        doInitDistrict(bounds);
                    }
                })
            }
        }

        function doInitDistrict(boundData){
            polygon = new AMap.Polygon({
                map: map,
                strokeWeight: 0.5,
                path: boundData,
                fillOpacity: 0.1,
                fillColor: "#000000",
                strokeColor: "#428bca",
                strokeOpacity:0.5,
                extData: {
                    name : districtArr[queryIndex].name,
                    link : districtArr[queryIndex].link
                }
            });
            ////点击事件
            AMap.event.addListener(polygon, "click", function(){
                window.open(this.getExtData().link);
            });
            ////鼠标经过事件
            AMap.event.addListener(polygon, "mouseover", function(e){
                this.setOptions({
                    strokeColor : "#17579d",
                    fillOpacity : 0.3
                });
                infoWin.text(this.getExtData().name).show();
            });
            ////鼠标移除事件
            AMap.event.addListener(polygon, "mouseout", function(e){
                this.setOptions({
                    strokeColor: "#428bca",
                    fillOpacity : 0.1
                });
                infoWin.hide();
            });

            queryIndex++;
            if(queryIndex<districtArr.length){
                queryDistrict();
            }
            else{
                map.setZoom(7.5);
            }
        }
    }

    if($consultWrap[0]){
        var consultName = $("#consult-name"),
            consultEmail = $("#consult-email"),
            consultTitle = $("#consult-title"),
            consultContent = $("#consult-content"),
            consultSexWrap = $("#consultWrap>div>div.spec");

        $consultBtn.click(function(){//弹出表单
            consultName.val("");
            consultEmail.val("");
            consultTitle.val("");
            consultContent.val("");
            $consultWrap.show();
            setTimeout(function(){
                $consultWrap.addClass("active");
                $consultWrap.children("div").addClass("active");
            },100);
        });

        consultSexWrap.on("click","i",function(){
            if(this.className != "active"){
                consultSexWrap.children("i").removeClass("active");
                this.className = "active";
            }
        });

        $("#consult-name,#consult-email,#consult-title,#consult-content").on("input",function(){
            var $this = $(this) , len = $this.attr("maxlength");
            if($this.val().length> len){
                $this.val($this.val().substr(0,len));
            }
        });

        $("#consultWrap>div>h4>a.close").click(function(){
            $consultWrap.removeClass("active");
            $consultWrap.children("div").removeClass("active");
            setTimeout(function(){
                $consultWrap.hide();
            },500);
        });
        $("#consultWrap>div>h4>a.submit").click(function(){
            if(consultName.val().length == 0){
                tipShow("请输入您的姓名！",1000);
                consultName[0].focus();
                return;
            }
            if(consultEmail.val().length != 0 && !/^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(consultEmail.val())){
                tipShow("请输入正确的电子邮箱！",1000);
                consultEmail[0].focus();
                return;
            }
            if(consultTitle.val().length == 0){
                tipShow("请输入留言标题！",1000);
                consultTitle[0].focus();
                return;
            }
            if(consultContent.val().length == 0){
                tipShow("请输入留言内容！",1000);
                consultContent[0].focus();
                return;
            }

            $.post('/noteBookServlet', { opeType : 'saveNoteBook',
                name : consultName.val(),
                email : consultEmail.val(),
                sex : $("#consultWrap>div>div.spec>i.active").attr("data-label"),
                noteTitle : consultTitle.val(),
                noteContent : consultContent.val()
            }, function(res,status){
                if(status == "success" && res == 1){
                    tipShow('您的留言提交成功，请等待后台审核.');
                    $("#consultWrap>div>h4>a.close")[0].click();
                }
                else{
                    tipShow('您的留言提交失败，请稍后重试.');
                }
            });
        });
    }
});