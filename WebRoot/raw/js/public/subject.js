$(function () {
    var $win = $(window),
        paramObj = getParam();
    ///////////////////////////////////////////////////////////
    if(paramObj.id == undefined || !paramObj.name){
        location.href = "error.html";
        return;
    }

    var pageNum = 20,
        i,
        $listDiv = $("#listContainer"),
        $listPageInfoDiv = $("#listContainer>div.foot"),
        pageObj = {
            category : "",
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

    paramObj.name = decodeURIComponent(paramObj.name);
    $("div.currPos>a.curr")[0].innerHTML += paramObj.name;
    queryOnePageData(0,1,pageObj);

    ///查询一页数据 根据category查询已发布文章列表
    function queryOnePageData(startPos, queryPageNo, itemObj) {
        $.get("/articleServlet", {
                opeType: "queryArticleListByCategory",
                category: "zt"+paramObj.id,
                searchKeyWords: "",
                start: startPos,
                length: pageNum,
                lineWordsNum:400,
                isPublic: "1",
                refresh:(new Date()).getTime()
            },
            function (data, textStatus) {
                if (textStatus == "success") {
                    var listHTML = "";
                    for (var i = 0; i < data.data.length; i++) {
                        listHTML += "<li><a href=\"article.html?id=" + data.data[i].id +"&sid="+paramObj.id+"&sname="+encodeURIComponent(paramObj.name)+ "\" title=\""+data.data[i].title+"\">" + data.data[i].title + "</a><span>"+data.data[i].publishTime.slice(0,-3)+"</span></li>";
                    }
                    if(listHTML == ""){
                        listHTML = "<li style='text-align: left'>没有查询到记录！</li>";
                        $("#listContainer>div.foot").hide();
                    }
                    itemObj.listContainer.html(listHTML);
                    //********************************************页脚信息
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
            }, "json");
    }

    //跳转到首页
    $("#listContainer>div>a.first").click(function(){
        var currPageNo = pageObj.currPageInput.val()-0;
        if (currPageNo > 1) {
            queryOnePageData(0, 1, pageObj);
        }
    });

    //跳转上一页
    $("#listContainer>div>a.prev").click(function(){
        var currPageNo = pageObj.currPageInput.val() - 0 , pageNum = pageObj.currPageNumInput.val() - 0;
        if (currPageNo > 1) {
            queryOnePageData((currPageNo - 2) * pageNum, currPageNo - 1 , pageObj)
        }
    });

    //跳转下一页
    $("#listContainer>div>a.next").click(function(){
        var currPageNo = pageObj.currPageInput.val()-0,
                totalPage = pageObj.totalPageInput.val()-0,
                pageNum = pageObj.currPageNumInput.val()-0;
        if (currPageNo < totalPage) {
            queryOnePageData(currPageNo * pageNum, currPageNo + 1 , pageObj);
        }
    });

    //跳转到尾页
    $("#listContainer>div>a.last").click(function(){
        var currPageNo = pageObj.currPageInput.val() - 0,
            totalPage = pageObj.totalPageInput.val() - 0,
            pageNum = pageObj.currPageNumInput.val() - 0;
        if (currPageNo < totalPage) {
            queryOnePageData((totalPage - 1) * pageNum, totalPage, pageObj);
        }
    });
});