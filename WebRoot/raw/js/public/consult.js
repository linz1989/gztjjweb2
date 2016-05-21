$(function () {
    var paramObj = getParam();
    if(paramObj.id == undefined){
        location.href = "error.html";
        return;
    }
    $.get("/noteBookServlet",{ opeType: "query" , id : paramObj.id , refresh : (new Date()).getTime() },function(res,textStatus){
        if(textStatus == "success"){
            $("#consult>h3").html("主题："+res.noteTitle);
            $("#consult>div>span").html(res.noteContent);
            $("#consult>div>div").html(res.name+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+res.createTime.slice(0,-3));
            $("#reply>div>span").html(res.noteReplay);
            $("#reply>div>div").html(res.noteReplayUser+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+res.replayTime.slice(0,-3));
        }
    },"json");
});