$(function(){var e=getParam();return void 0==e.id?void(location.href="error.html"):void $.get("/noteBookServlet",{opeType:"query",id:e.id,refresh:(new Date).getTime()},function(e,n){"success"==n&&($("#consult>h3").html("主题："+e.noteTitle),$("#consult>div>span").html(e.noteContent),$("#consult>div>div").html(e.name+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+e.createTime.slice(0,-3)),$("#reply>div>span").html(e.noteReplay),$("#reply>div>div").html(e.noteReplayUser+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+e.replayTime.slice(0,-3)))},"json")});