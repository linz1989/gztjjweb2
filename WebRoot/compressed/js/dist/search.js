function isSupportCss3(e){var t,a=["webkit","Moz","ms","o"],i=[],n=document.documentElement.style,r=function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})};for(t in a)i.push(r(a[t]+"-"+e));i.push(r(e));for(t in i)if(i[t]in n)return!0;return!1}function ls(e,t){if(localStorage)if(t){if(localStorage.setItem)return localStorage.setItem(e,t)}else if(localStorage.getItem)return localStorage.getItem(e);return!1}function getParam(){var e,t,a={},i=[],n=location.href.split("?")[1];if(n)for(i=n.split("&"),e=0;e<i.length;e++)t=i[e].split("="),2==t.length&&(a[t[0]]=t[1]);return a}"Microsoft Internet Explorer"==navigator.appName&&/(MSIE6.0|MSIE7.0)/.test(navigator.appVersion.split(";")[1].replace(/[ ]/g,""))&&(location.href="tip.html");var _hmt=_hmt||[],tipShow=function(e){$("body>div.tipShow>span").text(e);var t=$("body>div.tipShow");t.css({"line-height":$(window).height()+"px"}).addClass("active"),setTimeout(function(){t.removeClass("active")},3e3)};$(function(){function e(e){"active"!=e.className?(i.removeClass("active"),e.className="active"):e.className=""}var t=$(window),a="ontouchend"in document,i=$("div.wrap>div.menu>ul>li");i[a?"click":"hover"](function(t){e(this),t.stopPropagation()});var n=new Date,r=n.getMonth()+1,o=n.getDate(),l=["日","一","二","三","四","五","六"],s=$("body>div.search>i.search");$("body>div.search>span:eq(1)").text(n.getFullYear()+"年"+(r>9?r:"0"+r)+"月"+(o>9?o:"0"+o)+"日 星期"+l[n.getDay()]),$("#search-input").on("input",function(){this.value.length>20&&(this.value=this.value.substr(0,20))}).on("keypress",function(e){13==e.keyCode&&s.click()}),s.click(function(){var e=$("#search-input")[0].value;e&&e.length>0&&(location.href="search.html?key="+encodeURIComponent(e))}),$("body>div.search>span:eq(0)").click(function(){try{window.external.addFavorite(window.location,document.title)}catch(e){try{window.sidebar.addPanel(window.location,document.title,"")}catch(e){tipShow("请尝试按键Ctrl+D！")}}}),$("body>div.search>span:eq(2)").click(function(){if(document.all)document.body.style.behavior="url(#default#homepage)",document.body.setHomePage(location.href);else if(window.sidebar){if(window.netscape)try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")}catch(e){tipShow("您的浏览器不支持自动设置，请您手动设置！")}var t=Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);t.setCharPref("browser.startup.homepage",location.href)}else tipShow("您的浏览器不支持自动设置，请您手动设置！")});var c=$("#friendlyLink>li>i"),d=$("#friendlyLink>li>ul");c.click(function(e){e.stopPropagation();var t=c.index(this);"active"==d[t].className?d[t].className="":(d.removeClass("active"),d[t].className="active")}),$("body").click(function(){d.removeClass("active"),i.removeClass("active")});var u=$("body>div.wrap>div.menu"),p=$("body>ul.sideBar"),v=$("body>div.wrap>div.content"),g=$("body>div.wrap>div.content>div.listContent>div.leftMenu");t.scroll(function(){var e=t.scrollTop();e>286&&t.width()>=1e3?u.hasClass("fixed")||u.addClass("fixed"):u.hasClass("fixed")&&u.removeClass("fixed"),e>441?(g.addClass("fixed"),g.css("left",v.offset().left+16+"px"),t.height()-70-g.height()<190?g.addClass("bottomFixed"):g.removeClass("bottomFixed")):(g.removeClass("fixed"),g.css("left","0px")),e>t.height()?p.hasClass("active")||p.addClass("active"):p.hasClass("active")&&p.removeClass("active")}),t.scrollTop()>286&&u.addClass("fixed"),t.scrollTop()>t.height()&&p.addClass("active");var h=$("body>ul.sideBar>li");h[1].onclick=function(){window.open("http://t.qq.com/ganzhoutongji")},h[4].onclick=function(){$("html,body").animate({scrollTop:0},800)},$("body>div.wrap").css("background-image","url(img/public/common/bg.jpg)"),$("body>div.wrap>div.title>div.logo").css("background-image","url(img/public/common/title.png)"),$("body>div.wrap>div.title>div.txt").css("background-image","url(img/public/common/title-txt.png)"),isSupportCss3("background-size")&&$("body>div.wrap").addClass("bgSize"),isSupportCss3("transform")||$("body>div.wrap>div.menu,body>div.wrap>div.footer").addClass("compatible"),function(){var e=document.createElement("script");e.src="//hm.baidu.com/hm.js?811035e8ded4c8bc44ced6f7aa336357";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}()}),$(function(){function e(e,i,n){$.get("/articleServlet",{opeType:"queryArticleListByCategory",category:"",searchKeyWords:t.key,start:e,length:a,lineWordsNum:400,isPublic:"1",refresh:(new Date).getTime()},function(e,r){if("success"==r){for(var o="",l=0;l<e.data.length;l++)o+='<li><a href="article.html?id='+e.data[l].id+'" title="'+e.data[l].title+'">'+e.data[l].title.replace(new RegExp(t.key,"g"),"<span class='key'>"+t.key+"</span>")+"</a><span>"+e.data[l].publishTime.slice(0,-3)+"</span></li>";""==o&&(o="<li style='text-align: left'>没有查询到记录！</li>",$("#listContainer>div.foot").hide()),n.listContainer.html(o);var s=parseInt(e.recordsTotal/a,10);e.recordsTotal%a!=0&&(s+=1),n.totalPageInput.val(s),n.currPageInput.val(i),n.currPageNumInput.val(e.data.length),0==e.recordsTotal?(n.firstPageLink.hide(),n.prevPageLink.hide(),n.nextPageLink.hide(),n.lastPageLink.hide()):(n.totalPageSpan.text(s),n.totalRecordSpan.text(e.recordsTotal),n.currPageSpan.text(i),1==i?(n.firstPageLink.hide(),n.prevPageLink.hide()):(n.firstPageLink.show(),n.prevPageLink.show()),i==s?(n.nextPageLink.hide(),n.lastPageLink.hide()):(n.nextPageLink.show(),n.lastPageLink.show()))}},"json")}var t=($(window),getParam());if(void 0==t.key||""==t.key)return void(location.href="error.html");var a=20,i=$("#listContainer"),n=$("#listContainer>div.foot"),r={category:"",listContainer:i.children("ul"),totalPageInput:n.children("input.totalPage"),currPageInput:n.children("input.currPage"),currPageNumInput:n.children("input.currPageNum"),totalPageSpan:n.children("span").children("span.totalPage"),totalRecordSpan:n.children("span").children("span.totalRecord"),currPageSpan:n.children("span").children("span.currPage"),firstPageLink:n.children("a.first"),prevPageLink:n.children("a.prev"),nextPageLink:n.children("a.next"),lastPageLink:n.children("a.last")};t.key=decodeURIComponent(t.key),$("div.currPos>a.curr")[0].innerHTML+=t.key,e(0,1,r),$("#listContainer>div>a.first").click(function(){var t=r.currPageInput.val()-0;t>1&&e(0,1,r)}),$("#listContainer>div>a.prev").click(function(){var t=r.currPageInput.val()-0,a=r.currPageNumInput.val()-0;t>1&&e((t-2)*a,t-1,r)}),$("#listContainer>div>a.next").click(function(){var t=r.currPageInput.val()-0,a=r.totalPageInput.val()-0,i=r.currPageNumInput.val()-0;a>t&&e(t*i,t+1,r)}),$("#listContainer>div>a.last").click(function(){var t=r.currPageInput.val()-0,a=r.totalPageInput.val()-0,i=r.currPageNumInput.val()-0;a>t&&e((a-1)*i,a,r)})});