/**************************************************************
 * Tab页
 ****************************************************************/
;(function ($) {
    $.fn.Tab = function(){
        var $this = $(this);
        var $tabHeader = $this.find("div.header");
        var $tabPos = $tabHeader.find("div");
        var $tab = $tabHeader.find("ul").find("li");
        var $tabItem = $this.find("ul.tab");
        var step = 100.0/$tab.length;

        if("ontouchend" in document){
            $tab.find("a").attr("href","javascript:void(0)");
            $tab.click(function () { doHandlerTabSwitch(this) });
        }
        else{
            $tab.hover(function () { doHandlerTabSwitch(this) });
        }

        function doHandlerTabSwitch(item){
            var index = $tab.index($(item));
            if (item.className != "active") {
                $tab.removeClass();
                $tabItem.removeClass("active");
                item.className = "active";
                $tabItem[index].className = "tab active";
                $tabPos.css("left",  step* index + "%");
            }
        }
    }
})(jQuery);

$(function () {
    var $win = $(window),
        timeStamp = (new Date()).getTime(),
        supportTouch = "ontouchend" in document;

    /////////////////////////////获取所有文章列表
    var i, j, articleCategory = {}, htmlStr, categoryObj, categoryArr;
    $.get("/articleServlet",{ opeType : "queryHomeArticleData", refresh: timeStamp } , function(res,textStatus){
        if(textStatus !="success" || res.length==0) return errorHandler();
        for(i=0;i<res.length;i++){
            if(!articleCategory[res[i].category]) articleCategory[res[i].category] = [];
            articleCategory[res[i].category].push(res[i]);
        }
        //头条
        categoryObj = articleCategory["010300"];
        if(categoryObj && categoryObj.length>0){
            $("#headline>a").attr("href","article.html?id="+categoryObj[0].id).text(categoryObj[0].title);
        }
        //市级工作动态 县级工作动态  文件通知
        categoryArr = ["030100","030101","030300"];
        for(j=0;j<3;j++){
            htmlStr = "", categoryObj = articleCategory[categoryArr[j]];
            if(categoryObj && categoryObj.length>0){
                for(i=0;i<categoryObj.length && i<8;i++){
                    htmlStr += "<li><a href='article.html?id="+categoryObj[i].id+"' title='"+categoryObj[i].title+"'>"+categoryObj[i].title+"</a><span>"+categoryObj[i].publishTime.slice(0,-3)+"</span><i></i></li>";
                }
                $("#workTab>ul:eq("+j+")").html(htmlStr);
            }
        }

        //市级简要信息等3个tab
        categoryArr = ["040100","040101","040200"];
        for(j=0;j<3;j++){
            htmlStr = "" , categoryObj = articleCategory[categoryArr[j]];
            if(categoryObj && categoryObj.length>0){
                for(i=0;i<categoryObj.length && i<6;i++){
                    htmlStr += "<li><a href='article.html?id="+categoryObj[i].id+"' title='"+categoryObj[i].title+"'>"+categoryObj[i].title+"</a><span>"+categoryObj[i].publishTime.slice(0,-3)+"</span><i></i></li>";
                }
                $("#statisticsAnalysisTab-1>ul:eq("+j+")").html(htmlStr);
            }
        }

        //县级运行分析、综合调研、经济观点等3个tab
        categoryArr = ["040201","040300","040400"];
        for(j=0;j<3;j++){
            htmlStr = "" , categoryObj = articleCategory[categoryArr[j]];
            if(categoryObj && categoryObj.length>0){
                for(i=0;i<categoryObj.length && i<6;i++){
                    htmlStr += "<li><a href='article.html?id="+categoryObj[i].id+"' title='"+categoryObj[i].title+"'>"+categoryObj[i].title+"</a><span>"+categoryObj[i].publishTime.slice(0,-3)+"</span><i></i></li>";
                }
                $("#statisticsAnalysisTab-2>ul:eq("+j+")").html(htmlStr);
            }
        }

        //经济要闻等3个tab
        categoryArr = ["060100","060200","060300"];
        for(j=0;j<3;j++){
            htmlStr = "" , categoryObj = articleCategory[categoryArr[j]];
            if(categoryObj && categoryObj.length>0){
                for(i=0;i<categoryObj.length && i<6;i++){
                    htmlStr += "<li><a href='article.html?id="+categoryObj[i].id+"' title='"+categoryObj[i].title+"'>"+categoryObj[i].title+"</a><span>"+categoryObj[i].publishTime.slice(0,-3)+"</span><i></i></li>";
                }
                $("#economicNewsTab>ul:eq("+j+")").html(htmlStr);
            }
        }

        //全市公报、年度公报2个tab
        categoryArr = ["020100","020101"];
        for(j=0;j<2;j++){
            htmlStr = "" , categoryObj = articleCategory[categoryArr[j]];
            if(categoryObj && categoryObj.length>0){
                for(i=0;i<categoryObj.length && i<6;i++){
                    htmlStr += "<li><a href='article.html?id="+categoryObj[i].id+"' title='"+categoryObj[i].title+"'>"+categoryObj[i].title+"</a><span>"+categoryObj[i].publishTime.slice(0,-3)+"</span><i></i></li>";
                }
                $("#yearBulletinTab>ul:eq("+j+")").html(htmlStr);
            }
        }
    },"json");

    ////////////////////////////获取顶部幻灯片图片和底部风采图片
    var topImageSwiper , bottomImageSwiper;
    $.get("/imageServlet",{ opeType: "query", category: "all" , refresh: timeStamp } , function(res, textStatus){
        if(textStatus!="success" || res.length==0) return errorHandler();
        var topSlideImgs = "", topImgsSwitcher = "", topImgsCount=1, bottomSlideImgs = "", k;
        for (k = 0; k < res.length; k++) { //
            if (res[k]["category"] == 1) {//top
                topSlideImgs += "<div class='swiper-slide' data-swiper-slide-index='"+topImgsCount+"'><a ";
                if(res[k]["articleId"] == -1) topSlideImgs += "href='javascript:void(0)'";
                else{
                    topSlideImgs += "href='article.html?id="+res[k]["articleId"];
                    if(res[k]["subjectID"]){
                        topSlideImgs +="&sid="+res[k]["subjectID"]+"&sname="+encodeURIComponent(res[k]["subjectName"]);
                    }
                    topSlideImgs +="'";
                }
                topSlideImgs += "><img alt='"+res[k]["imageDescribe"]+"' data-src='"+res[k]["imagePath"]+"'/></a></div>";
                if(topImgsCount==1){
                    topImgsSwitcher="<a class='cur'>1</a>";
                    $("#imgSlide>div.imgTip").html(res[k]["imageDescribe"]);
                }
                else{
                    topImgsSwitcher +="<a title='"+res[k]["imageDescribe"]+"'>"+topImgsCount+"</a>";
                }
                topImgsCount++;
            }
            else {//bottom
                bottomSlideImgs +="<div class='swiper-slide'><a><img title='"+res[k]["imageDescribe"]+"' alt='"+res[k]["imageDescribe"]+"' data-src='"+res[k]["imagePath"]+"'/>"+res[k]["imageDescribe"]+"</a></div>";
            }
        }

        //////////////顶部imgSlide
        $("#imgSlide>div.swiper-wrapper").html(topSlideImgs);
        $("#imgSlide>div.switcher").html(topImgsSwitcher);
        var switcher = $("#imgSlide>div.switcher>a"), activeSilde;
        topImageSwiper = new Swiper ('#imgSlide', { autoplay : 3500, loop : true, autoplayDisableOnInteraction : false, slideToClickedSlide : true,
                onSlideChangeStart : function(){
                    activeSilde = $("#imgSlide>div.swiper-wrapper>div.swiper-slide-active");
                    $("#imgSlide>div.imgTip").html(activeSilde.find("a>img").attr("alt"));
                    switcher.removeClass("cur");
                    switcher[activeSilde.attr("data-swiper-slide-index")-1].className = "cur";
                }});
        switcher.click(function(){
            if(this.className != "cur"){
                topImageSwiper.swipeTo(parseInt(this.innerHTML),500,false);
                switcher.removeClass("cur");
                this.className = "cur";
                $("#imgSlide>div.imgTip").html(this.getAttribute("title"));
            }
        });

        ////////////底部imgSlide
        $("div#statisticsFeatureSwiperContainer>div.swiper-wrapper").html(bottomSlideImgs);
        bottomImageSwiper = new Swiper("#statisticsFeatureSwiperContainer",{
            autoplay : 3500 , loop : true, autoplayDisableOnInteraction : false , slidesPerView : 'auto', loopedSlides : switcher.length, spaceBetween : 15,
            onInit : function(){
                setTimeout(function(){
                    $("div#statisticsFeatureSwiperContainer").css("width",$("#statisticsFeature").width()+"px");
                },1000);
            }
        });

        ///加载顶部图片
        var imgArr=$("#imgSlide>div.swiper-wrapper>div.swiper-slide>a>img");
        for(k=0;k<imgArr.length;k++) imgArr[k].src=imgArr[k].getAttribute("data-src");

        ////加载底部统计风采图片
        imgArr = $("#statisticsFeatureSwiperContainer>div.swiper-wrapper>div>a>img");
        for(k=0;k<imgArr.length;k++) imgArr[k].src = imgArr[k].getAttribute("data-src");

    },"json");

    ////////////////////////////统计专题和统计咨询
    var subjectImageSwiper;
    $.get("/noteBookServlet",{ opeType: "queryAll", start : 0 , length: 10, isPublish:1, andQuerySubject : 1, refresh: timeStamp } , function(res,textStatus){
        if(textStatus!="success") return errorHandler();
        //////专题
        var k, subjectHtml = "";
        for(k=0;k<res["subject"].length;k++){
            if(res["subject"][k]["isMain"]==1) continue;
            subjectHtml += "<div class='swiper-slide'>";
            if(res["subject"][k]["isOutLink"]==1){
                subjectHtml += "<a href='"+res["subject"][k]["outLink"]+"'>";
            }
            else{
                subjectHtml += "<a href='subject.html?id="+res["subject"][k]["id"]+"&name="+encodeURIComponent(res["subject"][k]["subjectName"])+"'>";
            }
            subjectHtml +="<img data-src='"+res["subject"][k]["imagePath"]+"'/></a></div>";
        }
        $("#subjectSwiperContainer>div.swiper-wrapper").html(subjectHtml);
        subjectImageSwiper = new Swiper("#subjectSwiperContainer",{
            autoplay : 3500 , loop : true, autoplayDisableOnInteraction : false , slidesPerView : 'auto', loopedSlides : res["subject"].length, spaceBetween : 15,
            onInit : function(){
                setTimeout(function(){ $("div#subjectSwiperContainer").css("width",$("#subjectWrap").width()+"px") },1000);
            }
        });

        /////统计咨询
        var noteBookHtml = "";
        for (k = 0; k < res["noteBook"].length; k++) {
            noteBookHtml += "<li><i></i><a href='consult.html?id=" + res["noteBook"][k]["id"] + "' title='" + res["noteBook"][k]["noteTitle"] + "'>" + res["noteBook"][k]["noteTitle"] + "</a><span>" + res["noteBook"][k]["createTime"].slice(0,-3) + "</span></li>"
        }
        $("#statisticsConsult>div.panelContent>ul").html(noteBookHtml);

        //////////加载专题图片
        var subjectImgs = $("#subjectSwiperContainer>div.swiper-wrapper>div>a>img");
        for(k=0;k<subjectImgs.length;k++) subjectImgs[k].src = subjectImgs[k].getAttribute("data-src");

    },"json");

    /////工作动态、文件通知Tab页的切换
    $("#workTab").Tab();

    ///经济指标tab页的切换
    var $indicatorTabPos = $("#indicatorTab>div.header>div");
    var $indicatorTab = $("#indicatorTab>div.header>ul>li");
    if(supportTouch){
        $indicatorTab.find("a").attr("href","javascript:void(0)");
        $indicatorTab.click(function () {
            doSwitchIndicatorTab(this);
        })
    }
    else{
        $indicatorTab.hover(function () {
            doSwitchIndicatorTab(this);
        });
    }
    function doSwitchIndicatorTab(item){
        if (item.className != "active") {
            var index = $indicatorTab.index($(item));
            $indicatorTab.removeClass();
            item.className = "active";
            $indicatorTabPos.css("left", 50 * index + "%");
        }
    }

    ///统计分析tab页
    $("#statisticsAnalysisTab-1").Tab();
    $("#statisticsAnalysisTab-2").Tab();

    ///经济要闻tab页
    $("#economicNewsTab").Tab();

    ///年度公报tab页
    $("#yearBulletinTab").Tab();

    ////////////////////////全市主要经济指标
    var indicatorActiveTab = $("#indicatorTab>div.header>ul>li:eq(0)");
    $("#indicatorTab>div.date").on("click","li",function(){
        var $this = $(this);
        if($this.html() != "01"){
            location.href = (indicatorActiveTab.hasClass("active") ? "cityEconomicIndexDetail.html" : "countyEconomicIndexDetail.html") +"?time="+$this.parent().attr("data-year")+$this.html();
        }
    });

    $.get("/economicIndicatorServlet",{ opeType: "queryChartData" , refresh: timeStamp }, function(res,textStatus){
        if(textStatus!= "success") return errorHandler();
        res=res.data;
        var titleIndexObj = { "财政总收入" : 0 , "规模以上工业增加值" : 1 , "居民消费价格指数(上年同期为100)" : 2 };
        var dataArr = [{ "title" : "财政总收入" , "data" : [] } , { "title" : "规模以上工业增加值" , "data" : [] } , { "title" : "居民消费价格指数" , "data" : [] }];
        for(var k=0;k<res.length;k++){
            dataArr[titleIndexObj[res[k]["indicator"]]].data.push(res[k]);
        }
        createCharts(dataArr);///////构建图表
    },"json");

    createMap();/////构建地图
    
    $win.on("resize",function(){
        if(topImageSwiper) topImageSwiper.resizeFix();
        if(bottomImageSwiper){
            $("#statisticsFeatureSwiperContainer").css("width",$("#statisticsFeature").width()+"px");
            bottomImageSwiper.resizeFix();
        }
        if(subjectImageSwiper){
            $("#subjectSwiperContainer").css("width",($("#subjectWrap").width()-42)+"px");
            subjectImageSwiper.resizeFix();
        }
    });

    ////////////////////////////////////CSS兼容
    if(isSupportCss3("background-size")){
        $("body>div.wrap>div.content>div.notice").addClass("bgSize");
    }
});

//////////////////////////////////////////////////////////////////////////////////构建地图
function createMap(){
    $.getScript("http://webapi.amap.com/maps?v=1.3&key=43e024657a56670047982459d6f43d89").done(function(){
        if(AMap && AMap.Map && AMap.service){
            doCreateMap();
        }
        else{
            var waitInit = setInterval(function(){
                if(AMap && AMap.Map && AMap.service){
                    clearInterval(waitInit);
                    doCreateMap();
                }
            },200)
        }
    }).fail(function(){
        console.log("amap load fail");
    });
}

function doCreateMap(){
    ///地图
    var map = new AMap.Map('mapContainer',{
        zoom : 6.5,
        resizeEnable : true,
        center: [115.200278,25.85097]
    });
    var infoWin = $("#ganzhuMap>div.info");
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
        //bounds = ls("mapData_"+queryIndex);
        bounds = false;
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

//////////////////////////////////////////////////////////////////////////////////构建图表
function createCharts(dataArr){
    $.getScript("compressed/js/tools/echarts.js").done(function(){
        if(require){
            doCreateCharts(dataArr);
        }
        else{
            var waitChartsInit = setInterval(function(){
                if(require){
                    clearInterval(waitChartsInit);
                    doCreateCharts(dataArr);
                }
            },100);
        }
    }).fail(function(){
        console.log("echarts load fail");
    });
}

function doCreateCharts(dataArr){
    require.config({
        paths: {
            echarts: 'compressed/js/tools'
        }
    });

    /////构造option
    var i, j, optionObj, itemObj, month, v1, v2;
    var chartDataOptionArray=[];
    var chartShowCount = 0;
    for(i=0;i<3;i++){
        optionObj = {
            title: { text: dataArr[i]["title"], x: 'center', textStyle: { fontSize: 14, fontFamily: 'Microsoft Yahei', fontWeight: 'normal' } },
            tooltip: { trigger: 'axis', textStyle: { fontFamily: 'Microsoft Yahei' } },
            grid: { x: 45, y: 35, x2: 35, y2: 50 },
            legend: { x: "center", y: "bottom", data: [dataArr[i]["title"], '同比增长'], textStyle: { fontFamily: 'Microsoft Yahei' } },
            toolbox: { show: false },
            calculable: true,
            xAxis: [{ type: 'category', data: [] }],
            yAxis: [
                { type: 'value', name: (i==2 ? "单位：%" : "单位：亿元"), nameTextStyle: { fontFamily: 'Microsoft Yahei' } , splitNumber: 5 },
                { type: 'value', name: '%', nameTextStyle: { fontFamily: 'Microsoft Yahei' } , splitNumber: 5 }
            ],
            series: [
                { name: dataArr[i]["title"], type: 'bar', data: [] },
                { name: '同比增长', yAxisIndex: 1, type: 'line', data: [] }
            ],
            notMerger: true
        };
        //由获取的数据修改Option
        for (j = 0; j< dataArr[i]["data"].length; j++) {
            itemObj = dataArr[i]["data"][j];
            month = itemObj.yearmonth.substr(0, 4) + "/" + itemObj.yearmonth.substr(4, 2);
            v1 = parseFloat(itemObj.indicatorValue).toFixed(2);
            v2 = parseFloat(itemObj.indicatorGrowth).toFixed(2);
            optionObj.xAxis[0].data.push(month);
            optionObj.series[0].data.push(v1);
            optionObj.series[1].data.push(v2);
        }
        chartDataOptionArray.push(optionObj);
    }

    require([ 'echarts', 'echarts/chart/line', 'echarts/chart/bar' ],
        function (ec) {
            var thisChart = ec.init(document.getElementById('dataChart'));
            thisChart.setOption(chartDataOptionArray[0]);
            setInterval(function(){
                chartShowCount++;
                thisChart.setOption(chartDataOptionArray[chartShowCount % 3]);
            },5000);

            ////////////////////////////自适应
            $(window).on("resize",function(){
                setTimeout(function(){
                    thisChart.resize();
                },100);
            })
        })
}