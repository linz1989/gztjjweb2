function createMap(){$.getScript("http://webapi.amap.com/maps?v=1.3&key=43e024657a56670047982459d6f43d89").done(function(){if(AMap&&AMap.Map&&AMap.service)doCreateMap();else var e=setInterval(function(){AMap&&AMap.Map&&AMap.service&&(clearInterval(e),doCreateMap())},200)}).fail(function(){console.log("amap load fail")})}function doCreateMap(){function e(){a=!1,a?t(JSON.parse(a)):i.search(o[l].name,function(e,i){"complete"==e&&(a=i.districtList[0].boundaries,a&&ls("mapData_"+l,JSON.stringify(a)),t(a))})}function t(t){n=new AMap.Polygon({map:r,strokeWeight:.5,path:t,fillOpacity:.1,fillColor:"#000000",strokeColor:"#428bca",strokeOpacity:.5,extData:{name:o[l].name,link:o[l].link}}),AMap.event.addListener(n,"click",function(){window.open(this.getExtData().link)}),AMap.event.addListener(n,"mouseover",function(e){this.setOptions({strokeColor:"#17579d",fillOpacity:.3}),s.text(this.getExtData().name).show()}),AMap.event.addListener(n,"mouseout",function(e){this.setOptions({strokeColor:"#428bca",fillOpacity:.1}),s.hide()}),l++,l<o.length?e():r.setZoom(7.5)}var i,a,n,r=new AMap.Map("mapContainer",{zoom:6.5,resizeEnable:!0,center:[115.200278,25.85097]}),s=$("#ganzhuMap>div.info"),o=[{name:"章贡区",link:"http://xxgk.zgq.gov.cn/bmgkxx/tjj"},{name:"赣县",link:"http://xxgk.ganxian.gov.cn/bmgkxx/tjj"},{name:"信丰县",link:"http://xxgk.jxxf.gov.cn/bmgkxx/zhbm/xtjj"},{name:"大余县",link:"http://xxgk.jxdy.gov.cn/cms/admin/common/testcontent4.action?channelId=9472"},{name:"南康区",link:"http://xxgk.nkjx.gov.cn/bmgkxx/tjj"},{name:"上犹县",link:"http://xxgk.shangyou.gov.cn/bmgkxx/tjj"},{name:"崇义县",link:"http://xxgk.chongyi.gov.cn/bmgkxx/tjj"},{name:"安远县",link:"http://xxgk.ay.gov.cn/bmgkxx/tjj"},{name:"龙南县",link:"http://xxgk.jxln.gov.cn/bmgkxx/tjj"},{name:"定南县",link:"http://xxgk.dingnan.gov.cn/bmgkxx/tjj"},{name:"全南县",link:"http://xxgk.quannan.gov.cn/bmgkxx/tjj"},{name:"宁都县",link:"http://xxgk.ningdu.gov.cn/bmgkxx/xtjj"},{name:"于都县",link:"http://xxgk.yudu.gov.cn/bmgkxx/xtjj"},{name:"兴国县",link:"http://xxgk.xingguo.gov.cn/bmgkxx/tjj"},{name:"会昌县",link:"http://xxgk.huichang.gov.cn/bmgkxx/xtjj"},{name:"寻乌县",link:"http://xxgk.xunwu.gov.cn/bmgkxx/xtjj/gkxx/jgzn"},{name:"石城县",link:"http://xxgk.shicheng.gov.cn/bmgkxx/xtjj"},{name:"瑞金市",link:"http://xxgk.ruijin.gov.cn/bmgkxx/tjj"}],l=0;AMap.service("AMap.DistrictSearch",function(){i=new AMap.DistrictSearch({level:"district",extensions:"all",subdistrict:0}),e()})}function createCharts(e){$.getScript("compressed/js/tools/echarts.js").done(function(){if(require)doCreateCharts(e);else var t=setInterval(function(){require&&(clearInterval(t),doCreateCharts(e))},100)}).fail(function(){console.log("echarts load fail")})}function doCreateCharts(e){require.config({paths:{echarts:"compressed/js/tools"}});var t,i,a,n,r,s,o,l=[],c=0;for(t=0;3>t;t++){for(a={title:{text:e[t].title,x:"center",textStyle:{fontSize:14,fontFamily:"Microsoft Yahei",fontWeight:"normal"}},tooltip:{trigger:"axis",textStyle:{fontFamily:"Microsoft Yahei"}},grid:{x:45,y:35,x2:35,y2:50},legend:{x:"center",y:"bottom",data:[e[t].title,"同比增长"],textStyle:{fontFamily:"Microsoft Yahei"}},toolbox:{show:!1},calculable:!0,xAxis:[{type:"category",data:[]}],yAxis:[{type:"value",name:2==t?"单位：%":"单位：亿元",nameTextStyle:{fontFamily:"Microsoft Yahei"},splitNumber:5},{type:"value",name:"%",nameTextStyle:{fontFamily:"Microsoft Yahei"},splitNumber:5}],series:[{name:e[t].title,type:"bar",data:[]},{name:"同比增长",yAxisIndex:1,type:"line",data:[]}],notMerger:!0},i=0;i<e[t].data.length;i++)n=e[t].data[i],r=n.yearmonth.substr(0,4)+"/"+n.yearmonth.substr(4,2),s=parseFloat(n.indicatorValue).toFixed(2),o=parseFloat(n.indicatorGrowth).toFixed(2),a.xAxis[0].data.push(r),a.series[0].data.push(s),a.series[1].data.push(o);l.push(a)}require(["echarts","echarts/chart/line","echarts/chart/bar"],function(e){var t=e.init(document.getElementById("dataChart"));t.setOption(l[0]),setInterval(function(){c++,t.setOption(l[c%3])},5e3),$(window).on("resize",function(){setTimeout(function(){t.resize()},100)})})}!function(e){e.fn.Tab=function(){function t(t){var i=r.index(e(t));"active"!=t.className&&(r.removeClass(),s.removeClass("active"),t.className="active",s[i].className="tab active",n.css("left",o*i+"%"))}var i=e(this),a=i.find("div.header"),n=a.find("div"),r=a.find("ul").find("li"),s=i.find("ul.tab"),o=100/r.length;"ontouchend"in document?(r.find("a").attr("href","javascript:void(0)"),r.click(function(){t(this)})):r.hover(function(){t(this)})}}(jQuery),$(function(){function e(e){if("active"!=e.className){var t=u.index($(e));u.removeClass(),e.className="active",m.css("left",50*t+"%")}}var t,i,a,n,r,s=$(window),o=(new Date).getTime(),l="ontouchend"in document,c={};$.get("/articleServlet",{opeType:"queryHomeArticleData",refresh:o},function(e,s){if("success"!=s||0==e.length)return errorHandler();for(t=0;t<e.length;t++)c[e[t].category]||(c[e[t].category]=[]),c[e[t].category].push(e[t]);for(n=c["010300"],n&&n.length>0&&$("#headline>a").attr("href","article.html?id="+n[0].id).text(n[0].title),r=["030100","030101","030300"],i=0;3>i;i++)if(a="",n=c[r[i]],n&&n.length>0){for(t=0;t<n.length&&8>t;t++)a+="<li><a href='article.html?id="+n[t].id+"' title='"+n[t].title+"'>"+n[t].title+"</a><span>"+n[t].publishTime.slice(0,-3)+"</span><i></i></li>";$("#workTab>ul:eq("+i+")").html(a)}for(r=["040100","040101","040200"],i=0;3>i;i++)if(a="",n=c[r[i]],n&&n.length>0){for(t=0;t<n.length&&6>t;t++)a+="<li><a href='article.html?id="+n[t].id+"' title='"+n[t].title+"'>"+n[t].title+"</a><span>"+n[t].publishTime.slice(0,-3)+"</span><i></i></li>";$("#statisticsAnalysisTab-1>ul:eq("+i+")").html(a)}for(r=["040201","040300","040400"],i=0;3>i;i++)if(a="",n=c[r[i]],n&&n.length>0){for(t=0;t<n.length&&6>t;t++)a+="<li><a href='article.html?id="+n[t].id+"' title='"+n[t].title+"'>"+n[t].title+"</a><span>"+n[t].publishTime.slice(0,-3)+"</span><i></i></li>";$("#statisticsAnalysisTab-2>ul:eq("+i+")").html(a)}for(r=["060100","060200","060300"],i=0;3>i;i++)if(a="",n=c[r[i]],n&&n.length>0){for(t=0;t<n.length&&6>t;t++)a+="<li><a href='article.html?id="+n[t].id+"' title='"+n[t].title+"'>"+n[t].title+"</a><span>"+n[t].publishTime.slice(0,-3)+"</span><i></i></li>";$("#economicNewsTab>ul:eq("+i+")").html(a)}for(r=["020100","020101"],i=0;2>i;i++)if(a="",n=c[r[i]],n&&n.length>0){for(t=0;t<n.length&&6>t;t++)a+="<li><a href='article.html?id="+n[t].id+"' title='"+n[t].title+"'>"+n[t].title+"</a><span>"+n[t].publishTime.slice(0,-3)+"</span><i></i></li>";$("#yearBulletinTab>ul:eq("+i+")").html(a)}},"json");var d,h;$.get("/imageServlet",{opeType:"query",category:"all",refresh:o},function(e,t){if("success"!=t||0==e.length)return errorHandler();var i,a="",n="",r=1,s="";for(i=0;i<e.length;i++)1==e[i].category?(a+="<div class='swiper-slide' data-swiper-slide-index='"+r+"'><a ",-1==e[i].articleId?a+="href='javascript:void(0)'":(a+="href='article.html?id="+e[i].articleId,e[i].subjectID&&(a+="&sid="+e[i].subjectID+"&sname="+encodeURIComponent(e[i].subjectName)),a+="'"),a+="><img alt='"+e[i].imageDescribe+"' data-src='"+e[i].imagePath+"'/></a></div>",1==r?(n="<a class='cur'>1</a>",$("#imgSlide>div.imgTip").html(e[i].imageDescribe)):n+="<a title='"+e[i].imageDescribe+"'>"+r+"</a>",r++):s+="<div class='swiper-slide'><a><img title='"+e[i].imageDescribe+"' alt='"+e[i].imageDescribe+"' data-src='"+e[i].imagePath+"'/>"+e[i].imageDescribe+"</a></div>";$("#imgSlide>div.swiper-wrapper").html(a),$("#imgSlide>div.switcher").html(n);var o,l=$("#imgSlide>div.switcher>a");d=new Swiper("#imgSlide",{autoplay:3500,loop:!0,autoplayDisableOnInteraction:!1,slideToClickedSlide:!0,onSlideChangeStart:function(){o=$("#imgSlide>div.swiper-wrapper>div.swiper-slide-active"),$("#imgSlide>div.imgTip").html(o.find("a>img").attr("alt")),l.removeClass("cur"),l[o.attr("data-swiper-slide-index")-1].className="cur"}}),l.click(function(){"cur"!=this.className&&(d.swipeTo(parseInt(this.innerHTML),500,!1),l.removeClass("cur"),this.className="cur",$("#imgSlide>div.imgTip").html(this.getAttribute("title")))}),$("div#statisticsFeatureSwiperContainer>div.swiper-wrapper").html(s),h=new Swiper("#statisticsFeatureSwiperContainer",{autoplay:3500,loop:!0,autoplayDisableOnInteraction:!1,slidesPerView:"auto",loopedSlides:l.length,spaceBetween:15,onInit:function(){setTimeout(function(){$("div#statisticsFeatureSwiperContainer").css("width",$("#statisticsFeature").width()+"px")},1e3)}});var c=$("#imgSlide>div.swiper-wrapper>div.swiper-slide>a>img");for(i=0;i<c.length;i++)c[i].src=c[i].getAttribute("data-src");for(c=$("#statisticsFeatureSwiperContainer>div.swiper-wrapper>div>a>img"),i=0;i<c.length;i++)c[i].src=c[i].getAttribute("data-src")},"json");var p;$.get("/noteBookServlet",{opeType:"queryAll",start:0,length:10,isPublish:1,andQuerySubject:1,refresh:o},function(e,t){if("success"!=t)return errorHandler();var i,a="";for(i=0;i<e.subject.length;i++)1!=e.subject[i].isMain&&(a+="<div class='swiper-slide'>",a+=1==e.subject[i].isOutLink?"<a href='"+e.subject[i].outLink+"'>":"<a href='subject.html?id="+e.subject[i].id+"&name="+encodeURIComponent(e.subject[i].subjectName)+"'>",a+="<img data-src='"+e.subject[i].imagePath+"'/></a></div>");$("#subjectSwiperContainer>div.swiper-wrapper").html(a),p=new Swiper("#subjectSwiperContainer",{autoplay:3500,loop:!0,autoplayDisableOnInteraction:!1,slidesPerView:"auto",loopedSlides:e.subject.length,spaceBetween:15,onInit:function(){setTimeout(function(){$("div#subjectSwiperContainer").css("width",$("#subjectWrap").width()+"px")},1e3)}});var n="";for(i=0;i<e.noteBook.length;i++)n+="<li><i></i><a href='consult.html?id="+e.noteBook[i].id+"' title='"+e.noteBook[i].noteTitle+"'>"+e.noteBook[i].noteTitle+"</a><span>"+e.noteBook[i].createTime.slice(0,-3)+"</span></li>";$("#statisticsConsult>div.panelContent>ul").html(n);var r=$("#subjectSwiperContainer>div.swiper-wrapper>div>a>img");for(i=0;i<r.length;i++)r[i].src=r[i].getAttribute("data-src")},"json"),$("#workTab").Tab();var m=$("#indicatorTab>div.header>div"),u=$("#indicatorTab>div.header>ul>li");l?(u.find("a").attr("href","javascript:void(0)"),u.click(function(){e(this)})):u.hover(function(){e(this)}),$("#statisticsAnalysisTab-1").Tab(),$("#statisticsAnalysisTab-2").Tab(),$("#economicNewsTab").Tab(),$("#yearBulletinTab").Tab();var g=$("#indicatorTab>div.header>ul>li:eq(0)");$("#indicatorTab>div.date").on("click","li",function(){var e=$(this);"01"!=e.html()&&(location.href=(g.hasClass("active")?"cityEconomicIndexDetail.html":"countyEconomicIndexDetail.html")+"?time="+e.parent().attr("data-year")+e.html())}),$.get("/economicIndicatorServlet",{opeType:"queryChartData",refresh:o},function(e,t){if("success"!=t)return errorHandler();e=e.data;for(var i={"财政总收入":0,"规模以上工业增加值":1,"居民消费价格指数(上年同期为100)":2},a=[{title:"财政总收入",data:[]},{title:"规模以上工业增加值",data:[]},{title:"居民消费价格指数",data:[]}],n=0;n<e.length;n++)a[i[e[n].indicator]].data.push(e[n]);createCharts(a)},"json"),createMap(),s.on("resize",function(){d&&d.resizeFix(),h&&($("#statisticsFeatureSwiperContainer").css("width",$("#statisticsFeature").width()+"px"),h.resizeFix()),p&&($("#subjectSwiperContainer").css("width",$("#subjectWrap").width()-42+"px"),p.resizeFix())}),isSupportCss3("background-size")&&$("body>div.wrap>div.content>div.notice").addClass("bgSize")});