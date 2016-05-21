//管理页面的js脚本

var thisUEditor = null;
var isEditorDestory = true;
var currOpeType="";
var CURR_PAGE=1;//当前的页码
var SKIN_TAG=false;

$(document).ready(function(){
	//显示当前时间
	var date=new Date();
	$("#dFootDateInfo").text("今天是"+formatDate(date,"YYYY年MM月DD日 星期W"));
	
	//获取登陆用户名
	$.post(APP_PATH+"/loginServlet",{opeType:"getUserName"},
	function(data,textStatus){
		if(textStatus == "success"){
			$("#adminUserInfo").text("欢迎，"+data.userName+"[网站管理员]");
		} 
	},"json");
	
	//点击退出系统
	$("#exitAdminLink").click(function(){
		var browserName=navigator.appName;
		if (browserName=="Netscape"){
			window.open('','_self','');
			window.close();
		}
		else{
			window.close();
		}
	});
	//修改密码
	$("#changePasswordLink").click(function(){
		$("#changePasswordModal").modal("show");
	});
	//管理主页
	$("#mainAdminLink").click(function(){
		if(thisUEditor != null && isEditorDestory == false){
			thisUEditor.destroy();
			isEditorDestory=true;
		}
		SKIN_TAG=false; 
		$("#mainContentDiv").load("mainAdmin.html",function(responseText,textStatus,XMLHttpRequest){
			if(textStatus == "success"){
				$("#currPosInfoDiv").text("当前您的位置：后台管理主页");
			}
		});
	});
		
	//监听修改密码模态窗口的关闭事件
	$('#changePasswordModal').on('hidden.bs.modal', function (e) {
		$("#oldPassword").val("");$("#newPassword").val("");$("#newPasswordConfirm").val("");
	});
		
	//监听用户模态窗口的关闭事件
	$('#userModal').on('hidden.bs.modal', function (e) {
		$("#um_UserName").val("");$("#um_RealName").val("");$("#um_UserRole").val("");
		$("#um_UserRemark").val("");$("#um_UserPassword").val("");
	});
		
	//监听角色模态窗口的关闭事件
	$('#roleModal').on('hidden.bs.modal', function (e) {
		$("#rm_RoleName").val("");$("#rm_RoleFunction").val("");
	});
	
	//上传专题图片按钮
	swfobject.embedSWF("../admin/flash/FileUpload.swf", "uploadSubjectImageDiv", "150", "35", "6.0.0", "expressInstall.swf", {buttonWidth:"90",buttonBgColor:"0x006699",textSize:"12",buttonLabel:"上传图片",summitFileName:APP_PATH+"/flexFileUploadServlet",fileType:"jpg,jpeg,png",objectPN:"SubjectImage",afterFun:"afterUploadSubjectImage"}, {menu:"false"}, {id:"SubjectImageUploadOfSUB",name:"SubjectImageUploadOfSUB"});
});

//校验信息显示
function showCheckInfoLabel(labelID,infoStr){
	$(labelID).text(infoStr);
	$(labelID).show();
	var timeOut=setTimeout(function(){$(labelID).hide();clearTimeout(timeOut);},1000);
}

function hideOrShowSysAdminPanel(hideOrShow){
	if(hideOrShow == false) {
		$("#UserRoleAdminPanel").hide();
		$("#IndexBlockAdminPanel").hide();
		$("#SubjectBlockAdminPanel").hide();
	}
	else{
		$("#UserRoleAdminPanel").show();
		$("#IndexBlockAdminPanel").show();
		$("#SubjectBlockAdminPanel").show();
	}
}

function hideOrShowIndexAdminPanel(hideOrShow){
	 
}

function hideOrShowModalAdminPanel(hideOrShow){
	if(hideOrShow == false){
		$("#EnterStatisticsAdminPanel").hide();
		$("#StatisticsDataAdminPanel").hide();
		$("#StatisticsJobAdminPanel").hide();
		$("#StatisticsAnalysisAdminPanel").hide();
		$("#StatisticsKnowledgeAdminPanel").hide();
		$("#EconomicNewsAdminPanel").hide();
		$("#InternetWorkAdminPanel").hide();
		$("#StatisticsServiceAdminPanel").hide();
		$("#StatisticsConstructAdminPanel").hide();
	}
	else{
		$("#EnterStatisticsAdminPanel").show();
		$("#StatisticsDataAdminPanel").show();
		$("#StatisticsJobAdminPanel").show();
		$("#StatisticsAnalysisAdminPanel").show();
		$("#StatisticsKnowledgeAdminPanel").show();
		$("#EconomicNewsAdminPanel").show();
		$("#InternetWorkAdminPanel").show();
		$("#StatisticsServiceAdminPanel").show();
		$("#StatisticsConstructAdminPanel").show();
	}
}

//顶部导航按钮
function onClickOfSysAdminLink(){
	if(!$("#sysAdminLink").hasClass("nav-Bar-Link-Clicked")){
		$("a.nav-Bar-Link-Clicked").removeClass("nav-Bar-Link-Clicked");
		$("#sysAdminLink").addClass("nav-Bar-Link-Clicked");
		$("#sysAdminLink").blur();
		hideOrShowIndexAdminPanel(false);
		hideOrShowModalAdminPanel(false);
		hideOrShowSysAdminPanel(true);
	}
}

function onClickOfIndexAdminLink(){
	if(!$("#indexAdminLink").hasClass("nav-Bar-Link-Clicked")){
		$("a.nav-Bar-Link-Clicked").removeClass("nav-Bar-Link-Clicked");
		$("#indexAdminLink").addClass("nav-Bar-Link-Clicked");
		$("#indexAdminLink").blur();
		hideOrShowModalAdminPanel(false);
		hideOrShowSysAdminPanel(false);
		hideOrShowIndexAdminPanel(true);
	}
}

function onClickOfModalAdminLink(){
	if(!$("#modalAdminLink").hasClass("nav-Bar-Link-Clicked")){
		$("a.nav-Bar-Link-Clicked").removeClass("nav-Bar-Link-Clicked");
		$("#modalAdminLink").addClass("nav-Bar-Link-Clicked");
		$("#modalAdminLink").blur();
		$("#OrgAdminPanel").show();
		hideOrShowSysAdminPanel(false);
		hideOrShowIndexAdminPanel(false);
		hideOrShowModalAdminPanel(true);
	}
}

//监听浏览器窗口大小的改变
$(window).resize(function(){
	if($("#edui1").length > 0 && thisUEditor != null){
		var editorHeight = $("#mainContentDiv")[0].offsetHeight-$("#operatorButtonDiv")[0].offsetHeight-$("#articleFormZoneDiv")[0].offsetHeight-127;
		thisUEditor.setHeight(editorHeight);
		//设置宽度
		$("#edui1").css("width",$("#articleFormZoneDiv")[0].offsetWidth+"px");
		$("#edui1_iframeholder").css("width",$("#articleFormZoneDiv")[0].offsetWidth+"px");
	}
})

//********************************************左侧导航链start***********************************

//用户管理
function onClickOfUserAdminLink(){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	SKIN_TAG=false; 
	$("#mainContentDiv").load("userAdmin.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：系统管理 >> 用户权限管理 >> 用户管理");
			afterLoadUserAdmin();
		}
	});
}
//角色管理
function onClickOfRoleAdminLink(){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	SKIN_TAG=false; 
	$("#mainContentDiv").load("roleAdmin.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：系统管理 >> 用户权限管理 >> 角色管理");
			afterLoadRoleAdmin();
		}
	});
}

//************************************首页模块 start*****************************************
//首页幻灯片管理
function onClickOfSlidePicAdminLink(){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	SKIN_TAG=false; 
	$("#mainContentDiv").load("imageEdit.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：系统管理 >> 首页模块管理 >> 幻灯片图片管理");
			
			swfobject.embedSWF("../admin/flash/ImageEdit.swf", "imageEditDiv", "100%", "100%", "6.0.0", "expressInstall.swf", {objectPN:"DemeanourImage",summitFileName:APP_PATH+"/flexFileUploadServlet",fileType:"png,jpg,jpeg",opeSummitFileName:APP_PATH+"/imageServlet",buttonWidth:"65",buttonHeight:"30",imageWidth:"300",imageHeight:"200",category:"1",buttonTextSize:"13"}, {menu:"false"}, {id:"ImageUpload",name:"ImageUpload"});
		}
	});
}

//头条
function onClickOfFirstNewsAdminLink2(){
	SKIN_TAG=false; 
	loadEditArticlePage("当前您的位置：系统管理 >> 首页模块管理 >> 首页头条","5","010300");
}

//失信企业公示管理
function onClickOfDisHonestyAdminLink(){
	var cssDisplay="none";
	if($("#disonestyNoticeAdmin1").css("display") == "none") cssDisplay="";
	$("#disonestyNoticeAdmin1").css("display",cssDisplay);
	$("#disonestyNoticeAdmin2").css("display",cssDisplay);
	$("#disonestyNoticeAdmin3").css("display",cssDisplay);
}

//1%人口调查专题管理
function onClickOfCensusSubjectAdminLink(){
	var cssDisplay="none";
	if($("#workNewsOfCensusAdmin").css("display") == "none") cssDisplay="";
	$("#workNewsOfCensusAdmin").css("display",cssDisplay);
	$("#workFilesOfCensusAdmin").css("display",cssDisplay);
	$("#workExchangeOfCensusAdmin").css("display",cssDisplay);
}

//失信企业公示专栏介绍
function onClickOfDisHonestyInfoAdminLink(){
	SKIN_TAG=false; 
	loadEditArticlePage("当前您的位置：系统管理 >> 首页模块管理 >> 失信企业公示管理 >> 专栏介绍","4");
}

//失信企业信息
function onClickOfDisHonestyComponyAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：系统管理 >> 首页模块管理 >> 失信企业公示管理 >> 失信企业信息");
			$("#articleCategory").val("010600"); 
			createArticleListDataTable();
		}
	});
}

//各地公示链接
function onClickOfDisHonestyNoticeLinkAdminLink(){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	SKIN_TAG=false; 
	$("#mainContentDiv").load("dishonestyList.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：系统管理 >> 首页模块管理 >> 失信企业公示管理 >> 各地公示链接");
			createDishonestyNoticeListDataTable();
		}
	});
}

//地区的下拉框改变
function selectDishonestyLinkType(type){
	if($.trim($("#dishonestyTypeBtn").text()) != type){
		$("#dishonestyTypeBtn").html(type+"&nbsp;<span class=\"caret\"/>");
		$("#listDishonestyLinkDataTable").DataTable().draw();
	}
	if(type =="国家统计局链接"){
		$("#addDishonestyButton").attr("disabled","disabled");
		$("#batchDelDishonestyButton").attr("disabled","disabled");
	}
	else{
		$("#addDishonestyButton").removeAttr("disabled");
		$("#batchDelDishonestyButton").removeAttr("disabled");
	}
}

function createDishonestyNoticeListDataTable(){
	$("#listDishonestyLinkDataTable").dataTable({ 
		"ajax": 
			{
				"url":APP_PATH+"/dishonestyNoticeServlet",
				"type":"POST",
				"data":function(param){
					param.opeType="queryByType";
					if( $.trim($("#dishonestyTypeBtn").text()) == "国家统计局链接"){
						param.type= 0;
					}
					else if( $.trim($("#dishonestyTypeBtn").text()) == "江西省内设区市"){
						param.type= 2;
					}
					else if( $.trim($("#dishonestyTypeBtn").text()) == "赣州各县(市、区)"){
						param.type= 3;
					}
				},
				"complete":function(){
					addCssOnDataTable("listDishonestyLinkDataTable");
					//链接列居左显示
					$("#listDishonestyLinkDataTable tbody").find("tr td").each(function(i){
						if(i%4 == 2){
							$(this).css("text-align","left");
							$(this).css("text-indent","8px");
						}
					});
				} 
			},
		"columns": [ 
			{ "data": "id" },
			{ "data": "seqNo" },
			{ "data": "placeName" },
			{ "data": "link" },
			{ "data": "type" },
			{ "data": "" }
		],
		 "columnDefs": [ 
            { "targets": [0],"visible":false},
			{ "targets": [4],"visible":false},
			{ "targets": [1],"width":"60","render":function(data,type,row){
				return "<input type=\"checkbox\" id=\"cb_"+row.id+"\" onClick='onClickArticleCheckBox();' style=\"margin-right:5px; margin-top:5px;\" class=\"cb\"/>"+row.seqNo;
			 }},
			{ "targets": [2],"width":"170"},
			{ "targets": [3],"render":function(data,type,row){
				return "<a target='_blank' href='"+row.link+"'>"+row.link+"</a>";
			}},
			{ "targets": [5],"width":"120","render":function(data,type,row){
				var linkStr="<a href='javascript:void(0);' onClick='onClickOfEditDishonestyLink(\""+row.id+"\",\""+row.type+"\",\""+row.placeName+"\",\""+row.link+"\");'>修改</a>";
				if(row.type != 0)
				linkStr+=" | <a href='javascript:void(0);' onClick='onClickDelDishonestyLink("+row.id+");'>删除</a>";
				return linkStr;
			}}
        ],
		"info":true,
		"searching":false,
		"paging":false,
		"destroy":true,
		"processing":true,
		"serverSide":true,
		"ordering":false,
		"lengthChange": false,
		"language": {
			"lengthMenu": "每页显示 _MENU_ 条记录",
			"zeroRecords": "没有查询到数据",
			"search": "查找： _INPUT_",
			"info":"共 _PAGES_ 页，_MAX_ 条记录，当前第 _PAGE_ 页",
			"infoEmpty": "",
			"processing": "正在加载数据..."
		}
	});
}

//删除失信企业链接
function onClickDelDishonestyLink(id){
	if(confirm("确实要删除该条记录吗？")){
		$.post(APP_PATH+"/dishonestyNoticeServlet",
		   {  
			  opeType:"delDisNotice",
			  disNoticeArr:id
			},
			function(data,textStatus){
			   if(textStatus == "success"){
				 if( data== "1"){
					$("#listDishonestyLinkDataTable").DataTable().draw();
				  }
			   } 
		});
	}
}

//批量删除失信企业链接
function onClickBatchDelDishonestyLink(){
	var delRecordArr=[];
	$(".cb").each(function(){
		if($(this)[0].checked==true){
			delRecordArr.push($(this)[0].id.substring(3));
		}
	});
	
	if(delRecordArr.length>0){
		if(confirm("确实要删除所选记录吗？")){
			$.post(APP_PATH+"/dishonestyNoticeServlet",
			{
				opeType:"delDisNotice",
				disNoticeArr:delRecordArr.join(",")
			},
			 function(data,textStatus){
				if(textStatus == "success"){ 
					if(data == "1"){//删除成功
						$("#listDishonestyLinkDataTable").DataTable().draw();
					}
				}
			});
		}
	}
}

//新增失信企业链接
function onClickAddNewDishonestyLink(){
	$("#dishonestyLinkModalLabel").text("新增公示链接");
	$("#dl_type").val($.trim($("#dishonestyTypeBtn").text()));
	$("#dl_id").val(""); 
	$("#dl_link").val("");
	$("#dl_placeName").val("");
	$("#dishonestyLinkModal").modal("show"); 
}

//修改失信企业链接
function onClickOfEditDishonestyLink(id,type,placeName,link){
	$("#dishonestyLinkModalLabel").text("修改公示链接");
	$("#dl_id").val(id);
	if(type == '0'){
		$("#dl_type").val("国家统计局链接");
	}
	else if(type == '2'){
		$("#dl_type").val("江西省内设区市");
	}
	else if(type == '3'){
		$("#dl_type").val("赣州各县(市、区)");
	}
	$("#dl_placeName").val(placeName);
	$("#dl_link").val(link);
	$("#dishonestyLinkModal").modal("show"); 
}

//校验失信企业链接
function checkDishonestyLinkForm(){
	if($.trim($("#dl_placeName").val()) == ""){
		$("#dl_placeName").focus();
		showCheckInfoLabel("#dishonestyLinkInfoLabel","请输入地区名称！");
		return false;
	}
	if($.trim($("#dl_link").val()) == ""){
		$("#dl_link").focus();
		showCheckInfoLabel("#dishonestyLinkInfoLabel","请输入链接地址！");
		return false;
	}
	return true;
}

//保存失信企业链接
function saveDishonestyLink(){
	if(checkDishonestyLinkForm() == false) return;
	var type;
	if($("#dl_type").val() == "国家统计局链接") type = 0;
	else if($("#dl_type").val() == "江西省内设区市") type = 2;
	else if($("#dl_type").val() == "赣州各县(市、区)") type = 3;
	currOpeType = ($.trim($("#dl_id").val()) == "" ? "addDisNotice" : "editDisNotice");
	$.post(APP_PATH+"/dishonestyNoticeServlet",
		   {  
			  opeType:currOpeType,
			  id:$("#dl_id").val(),
			  type:type,
			  placeName:$.trim($("#dl_placeName").val()),
			  link:$.trim($("#dl_link").val())
			},
			function(data,textStatus){
			   if(textStatus == "success"){
				 if( data== "1"){
					$("#listDishonestyLinkDataTable").DataTable().draw();
					
					if(currOpeType == "addDisNotice") $("#dishonestyLinkInfoLabel").text("添加链接成功！");
					else $("#dishonestyLinkInfoLabel").text("修改链接成功！");
		  			$("#dishonestyLinkInfoLabel").show();
		            var timeOut=setTimeout(function(){$("#dishonestyLinkInfoLabel").hide();clearTimeout(timeOut);$("#dishonestyLinkModal").modal("hide");},800);
					
				  }
			  }
		});
}

//1%人口抽样调查----------------------------------------
//工作要闻
function onClickOfCensusWorkNewsAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false;
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：系统管理 >> 专题文章管理 >> 1%人口抽样调查专题管理 >> 工作要闻");
			$("#articleCategory").val("080100");
			createArticleListDataTable();
		}
	});
}
//文件通知
function onClickOfCensusWorkFilesAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false;
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：系统管理 >> 专题文章管理 >> 1%人口抽样调查专题管理 >> 文件通知");
			$("#articleCategory").val("080101");
			createArticleListDataTable();
		}
	});
}
//各地交流
function onClickOfWorkExchangeAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false;
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：系统管理 >> 专题文章管理 >> 1%人口抽样调查专题管理 >> 各地交流");
			$("#articleCategory").val("080102");
			createArticleListDataTable();
		}
	});
}

//************************************首页模块 end*****************************************

//************************************走进统计 start*****************************************
//本局概况
function onClickOfBureauProfileAdminLink(){
	SKIN_TAG=false; 
	loadEditArticlePage("当前您的位置：栏目管理 >> 组织机构 >> 本局概况","0");
}
//领导介绍
function onClickOfLeaderProfileAdminLink(){
	SKIN_TAG=false; 
	loadEditArticlePage("当前您的位置：栏目管理 >> 组织机构 >> 领导介绍","1");
}
//机构设置
function onClickOfOrgSettingAdminLink(){
	SKIN_TAG=false; 
	loadEditArticlePage("当前您的位置：栏目管理 >> 组织机构 >> 机构设置","2");
}

//统计法规
function onClickOfStatisticsRuleAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计知识 >> 统计法规");
			$("#articleCategory").val("010400"); 
			createArticleListDataTable();
		}
	});
}
//************************************走进统计 end*****************************************

//************************************统计数据 start*****************************************

//全市主要经济指标
function onClickOfAllEconomicIndicatorAdminLink(){
	
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	SKIN_TAG=false; 
	$("#mainContentDiv").load("economicIndicatorAdmin.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计数据 >> 全市主要经济指标");
			$("#economicIndicatorPlaceBtn").val("赣州市");
			//设置初始年月：今年，上一个月；如果当前为1月，则初始年月设置为上一年的12月份
			var thisYear=(new Date()).getFullYear();
			var lastMonth=(new Date()).getMonth()+1;
			if(lastMonth==1){
				thisYear=thisYear-1;
				lastMonth=12;
			}
			$("#economicIndicatorYearBtn").html(thisYear+"年&nbsp;<span class=\"caret\"/>");
			$("#economicIndicatorMonthBtn").html("1-"+lastMonth+"月&nbsp;<span class=\"caret\"/>");
			 
			//导入按钮
			swfobject.embedSWF("../admin/flash/FileUpload.swf", "importEconomicIndicatorBtn", "150", "35", "6.0.0", "expressInstall.swf", {buttonWidth:"60",buttonBgColor:"0x006699",textSize:"12",buttonLabel:"导入",summitFileName:APP_PATH+"/flexFileUploadServlet",fileType:"xls,xlsx",objectPN:"EconomicIndicator",cancelFun:"cancelUploadExcelFileOfEconomicIndicator",beforeFun:"beforeUploadExcelFileOfEconomicIndicator",afterFun:"afterUploadExcelFileOfEconomicIndicator"}, {menu:"false"}, {id:"fileUploadOfEI",name:"fileUploadOfEI"});
			//创建查询数据列表
			createEconomicIndicatorListDataTable();
		}
	});
}

//查询数据列表
function onClickSearchEconomicIndicatorButton(){
	var table = $("#economicIndicatorDataTable").DataTable();
	table.draw();
}

//创建经济指标数据列表
function createEconomicIndicatorListDataTable(){
	$("#economicIndicatorDataTable").dataTable({ 
		"ajax": 
			{
				"url":APP_PATH+"/economicIndicatorServlet",
				"type":"POST",
				"data":function(param){
					param.opeType="queryAllByYearMonth";
					param.place=$("#economicIndicatorPlaceBtn").val();
					var monthStr=$.trim($("#economicIndicatorMonthBtn").text());
					monthStr=monthStr.substring(2,monthStr.length-1);
					if(monthStr.length ==1) monthStr="0"+monthStr;
					param.yearMonth=$("#economicIndicatorYearBtn").text().substr(0,4)+monthStr;
				},
				"complete":function(){
					//指标列居左显示
					$("#economicIndicatorDataTable tbody").find("tr td").each(function(i){
						if(i%6 == 1){
							$(this).css("text-align","left");
							$(this).css("text-indent","5px");
						}
					});
					addCssOnDataTable("economicIndicatorDataTable");
				} 
			},
		"columns": [ 
			{ "data": "id" },
			{ "data": "seqNo" },
			{ "data": "indicator" },
			{ "data": "unit" },
			{ "data": "indicatorValue" },
			{ "data": "indicatorGrowth" },
			{ "data": "" },
			{ "data": "place"}
		],
		 "columnDefs": [ 
            { "targets": [0],"visible":false},
			{ "targets": [7],"visible":false},
			{ "targets": [1],"width":"45"},
			{ "targets": [3],"width":"110"},
			{ "targets": [4],"width":"110","render":function(data,type,row){
				 //var str=parseFloat(row.indicatorValue).toFixed(2);
				 //if(str=="0.00") return ""; else return str;
				 return row.indicatorValue;
			}},
			{ "targets": [5],"width":"110","render":function(data,type,row){
				//var str=parseFloat(row.indicatorGrowth).toFixed(2);
				//if(str=="0.00") return ""; else return str;
				return row.indicatorGrowth;
			}},
			{ "targets": [6],"width":"100","render":function(data,type,row){
				var linkStr="<a href='javascript:void(0);' onClick='onClickOfEditEconomicIndicatorLink(\""+row.id+"\",\""+row.indicator+"\",\""+row.unit+"\",\""+row.indicatorValue+"\",\""+row.indicatorGrowth+"\");'>修改</a> | ";
				linkStr+="<a href='javascript:void(0);' onClick='onClickDelEconomicIndicatorLink("+row.id+");'>删除</a>";
				return linkStr;
			}}
        ],
		"info":true,
		"searching":false,
		"paging":false,
		"destroy":true,
		"processing":true,
		"serverSide":true,
		"ordering":false,
		"lengthChange": false,
		"language": {
			"lengthMenu": "每页显示 _MENU_ 条记录",
			"zeroRecords": "没有查询到数据",
			"search": "查找： _INPUT_",
			"info":"共 _PAGES_ 页，_MAX_ 条记录，当前第 _PAGE_ 页",
			"infoEmpty": "",
			"processing": "正在加载数据..."
		}
	});
}
//删除记录
function onClickDelEconomicIndicatorLink(id){
	if(confirm("确实要删除记录吗？")){
		$.post(APP_PATH+"/economicIndicatorServlet",
		   {  
			  opeType:"delEconomicIndicator",
			  recordID:id
			},
			function(data,textStatus){
			   if(textStatus == "success"){
				 if( data.result== "1"){
					var table = $("#economicIndicatorDataTable").DataTable();
					table.draw();
				  }
			   } 
		},"json");
	}
}

//修改记录
function onClickOfEditEconomicIndicatorLink(id,indicator,unit,indicatorValue,indicatorGrowth){
	//indicatorValue=parseFloat(indicatorValue).toFixed(2);
	//indicatorGrowth=parseFloat(indicatorGrowth).toFixed(2);
	
	//if(indicatorValue == "0.00") indicatorValue="";
	//if(indicatorGrowth == "0.00") indicatorGrowth="";
	
	var monthStr=$.trim($("#economicIndicatorMonthBtn").text());
	monthStr=monthStr.substring(2,monthStr.length-1);
	if(monthStr.length ==1) monthStr="0"+monthStr;
	$("#eim_yearMonth").val($("#economicIndicatorYearBtn").text().substr(0,4)+monthStr);
	$("#eim_yearMonth").attr("disabled","disabled");
	$("#eim_place").val($("#economicIndicatorPlaceBtn").val());
	$("#economicIndicatorModalLabel").text("修改"+$("#eim_place").val()+"经济指标");
	$("#eim_id").val(id);
	$("#eim_indicator").val(indicator);
	$("#eim_unit").val(unit);
	if(indicatorValue.toString()=="0") $("#eim_indicatorValue").val("");
	else $("#eim_indicatorValue").val(indicatorValue);
	if(indicatorGrowth.toString()=="0") $("#eim_indicatorGrowth").val("");
	else $("#eim_indicatorGrowth").val(indicatorGrowth);
	$("#eim_indicator").attr("disabled","disabled");
	$("#economicIndicatorModal").modal("show"); 
	currOpeType="editEconomicIndicator";
}

//增加记录
function onClickAddEconomicIndicatorButton(){
	$("#economicIndicatorModalLabel").text("添加经济指标");
	var monthStr=$.trim($("#economicIndicatorMonthBtn").text());
	monthStr=monthStr.substring(2,monthStr.length-1);
	if(monthStr.length ==1) monthStr="0"+monthStr;
	
	$("#eim_yearMonth").val($("#economicIndicatorYearBtn").text().substr(0,4)+monthStr);
	$("#eim_yearMonth").attr("disabled","disabled");
	$("#eim_indicator").removeAttr("disabled");
	$("#eim_place").val($("#economicIndicatorPlaceBtn").val());
	$("#eim_id").val("");
	$("#eim_indicator").val("");
	$("#eim_unit").val("");
	$("#eim_indicatorValue").val("");
	$("#eim_indicatorGrowth").val("");
	$("#economicIndicatorModal").modal("show"); 
	currOpeType="addEconomicIndicator";
}
//经济指标表单的校验
function checkEconomicIndicatorForm(){
	if($.trim($("#eim_indicator").val()) == ""){
		$("#eim_indicator").focus();
		showCheckInfoLabel("#checkEconomicIndicatorInfoLabel","请输入指标名称！");
		return false;
	}
	/* 
	var re = /^(-?\d+)(\.\d+)?$/;
	if($.trim($("#eim_indicatorValue").val()) != ""){
		if(!re.test($.trim($("#eim_indicatorValue").val()))){
			$("#eim_indicatorValue").val("");
			$("#eim_indicatorValue").focus();
			showCheckInfoLabel("#checkEconomicIndicatorInfoLabel","指标值请输入数值！");
			return false;
		}
	}
	if($.trim($("#eim_indicatorGrowth").val()) != ""){
		if(!re.test($.trim($("#eim_indicatorGrowth").val()))){
			$("#eim_indicatorGrowth").val("");
			$("#eim_indicatorGrowth").focus();
			showCheckInfoLabel("#checkEconomicIndicatorInfoLabel","同比±%值请输入数值！");
			return false;
		}
	}*/
	return true;
}
//保存
function saveEconomicIndicator(){
	if(checkEconomicIndicatorForm() == false) return;
	$.post(APP_PATH+"/economicIndicatorServlet",
		   {  
			  opeType:currOpeType,
			  id:$("#eim_id").val(),
			  place:$("#eim_place").val(),
			  yearMonth:$("#eim_yearMonth").val(),
			  indicator:$("#eim_indicator").val(),
			  unit:$("#eim_unit").val(),
			  indicatorValue:$("#eim_indicatorValue").val(),
			  indicatorGrowth:$("#eim_indicatorGrowth").val()
			},
			function(data,textStatus){
			   if(textStatus == "success"){
				 if( data.result== "1"){
					var table = $("#economicIndicatorDataTable").DataTable();
					table.draw();
					
					if(currOpeType == "addEconomicIndicator") $("#checkEconomicIndicatorInfoLabel").text("添加记录成功！");
					else $("#checkEconomicIndicatorInfoLabel").text("修改记录成功！");
		  			$("#checkEconomicIndicatorInfoLabel").show();
		            var timeOut=setTimeout(function(){$("#checkEconomicIndicatorInfoLabel").hide();clearTimeout(timeOut);$("#economicIndicatorModal").modal("hide");},800);
					
				  }
				  else if(data.result == "0"){//对于新增记录，返回0表示经济指标已存在
				   $("#eim_indicator").focus();
				   $("#eim_indicator").val("");
				   showCheckInfoLabel("#checkEconomicIndicatorInfoLabel","经济指标名称已存在！");
				  }
			  } 
			   
		},"json");
}

//选择年份
function selectEconomicIndicatorYear(selectYear){
	if($("#economicIndicatorYearBtn").text().substr(0,4) != selectYear.toString()){
		$("#economicIndicatorYearBtn").html(selectYear+"年&nbsp;<span class=\"caret\"/>");
		onClickSearchEconomicIndicatorButton();//触发查询
	}
}
//选择月份
function selectEconomicIndicatorMonth(selectMonth){
	if($("#economicIndicatorMonthBtn").text().substr(0,2) != selectMonth.toString()){
		$("#economicIndicatorMonthBtn").html("1-"+selectMonth+"月&nbsp;<span class=\"caret\"/>");
		onClickSearchEconomicIndicatorButton();//触发查询
	}
}
//文件取消上传
function cancelUploadExcelFileOfEconomicIndicator(){
	$("#addEconomicIndicatorButton").removeAttr("disabled");
	$("#economicIndicatorPlaceBtn").removeAttr("disabled");
	$("#economicIndicatorYearBtn").removeAttr("disabled");
	$("#economicIndicatorMonthBtn").removeAttr("disabled");
}
//文件上传之前
function beforeUploadExcelFileOfEconomicIndicator(){
	$("#addEconomicIndicatorButton").attr("disabled","disabled");
	$("#economicIndicatorYearBtn").attr("disabled","disabled");
	$("#economicIndicatorMonthBtn").attr("disabled","disabled");
}
//导入文件上传完毕之后
function afterUploadExcelFileOfEconomicIndicator(filePath,fileName){
	var yearStr=$("#economicIndicatorYearBtn").text().substr(0,4);
	if(fileName != undefined && fileName!= null && fileName.length>4){
		yearStr=fileName.substr(0,4);
	}
	$.post(APP_PATH+"/economicIndicatorServlet",//后台导入
	{  
		opeType:"importExcel",
		place:$("#economicIndicatorPlaceBtn").val(),
		yearMonth:yearStr,
		excelFilePath:filePath
	}, 
	function(data,textStatus){
		if(textStatus == "success"){
			if( data.result== "1"){
				alert("导入成功！");
				var table = $("#economicIndicatorDataTable").DataTable();
				table.draw();
			}
	     }
		 $("#addEconomicIndicatorButton").removeAttr("disabled");
		 $("#economicIndicatorPlaceBtn").removeAttr("disabled");
		 $("#economicIndicatorYearBtn").removeAttr("disabled");
		 $("#economicIndicatorMonthBtn").removeAttr("disabled");
	},"json");
}
//------------------------------------------------------------------------------------------
//各县市区主要经济指标
function onClickOfPlaceEconomicIndicatorAdminLink(){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	SKIN_TAG=false; 
	$("#mainContentDiv").load("economicIndicatorAdmin2.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计数据 >> 各县(市、区)主要经济指标");
			$("#economicIndicatorPlaceBtn2").val("各县");
			//设置初始年月：今年，上一个月；如果当前为1月，则初始年月设置为上一年的12月份
			var thisYear=(new Date()).getFullYear();
			var lastMonth=(new Date()).getMonth()+1;
			if(lastMonth==1){
				thisYear=thisYear-1;
				lastMonth=12;
			}
			if(thisYear>2013) $("#specThead").text("出口总额(万元)");
			
			$("#economicIndicatorYearBtn2").html(thisYear+"年&nbsp;<span class=\"caret\"/>");
			$("#economicIndicatorMonthBtn2").html("1-"+lastMonth+"月&nbsp;<span class=\"caret\"/>");
			
			//导入按钮
			swfobject.embedSWF("../admin/flash/FileUpload.swf", "importEconomicIndicatorBtn2", "150", "35", "6.0.0", "expressInstall.swf", {buttonWidth:"60",buttonBgColor:"0x006699",textSize:"12",buttonLabel:"导入",summitFileName:APP_PATH+"/flexFileUploadServlet",fileType:"xls,xlsx",objectPN:"EconomicIndicator",cancelFun:"cancelUploadExcelFileOfEconomicIndicator2",beforeFun:"beforeUploadExcelFileOfEconomicIndicator2",afterFun:"afterUploadExcelFileOfEconomicIndicator2"}, {menu:"false"}, {id:"fileUploadOfEIEach",name:"fileUploadOfEIEach"});
			
			/////////////////////////////////////////////////////////////////
			//创建查询数据列表
			createEconomicIndicatorListDataTable2();
		}
	});
}

//各县经济指标文件取消上传
function cancelUploadExcelFileOfEconomicIndicator2(){
	$("#addEconomicIndicatorButton2").removeAttr("disabled");
	$("#economicIndicatorYearBtn2").removeAttr("disabled");
	$("#economicIndicatorMonthBtn2").removeAttr("disabled");
}

//各县经济指标文件上传之前
function beforeUploadExcelFileOfEconomicIndicator2(){
	$("#addEconomicIndicatorButton2").attr("disabled","disabled");
	$("#economicIndicatorYearBtn2").attr("disabled","disabled");
	$("#economicIndicatorMonthBtn2").attr("disabled","disabled");
}

//各县经济指标文件上传之后
function afterUploadExcelFileOfEconomicIndicator2(filePath,fileName){
	var yearStr=$("#economicIndicatorYearBtn2").text().substr(0,4);
	if(fileName != undefined && fileName!= null && fileName.length>4){
		yearStr=fileName.substr(0,4);
	}
	$("#specThead").text(parseInt(yearStr,10)>2013 ? "出口总额(万元)" : "出口总额(万美元)");
	$.post(APP_PATH+"/economicIndicatorServlet2",//后台导入
	{  
		opeType:"importExcel",
		yearMonth:yearStr,
		excelFilePath:filePath
	}, 
	function(data,textStatus){
		if(textStatus == "success"){
			if( data.result== "1"){
				alert("数据导入成功！");
				var table = $("#economicIndicatorDataTable2").DataTable();
				table.draw();
			}
	     }
		 $("#economicIndicatorPlaceBtn2").removeAttr("disabled");
		 $("#economicIndicatorYearBtn2").removeAttr("disabled");
		 $("#economicIndicatorMonthBtn2").removeAttr("disabled");
	},"json");
}

//增加记录 --各县经济指标
function onClickAddEconomicIndicatorButton2(){
	$("#economicIndicatorModalLabel2").text("添加经济指标");
	var monthStr=$.trim($("#economicIndicatorMonthBtn2").text());
	monthStr=monthStr.substring(2,monthStr.length-1);
	if(monthStr.length ==1) monthStr="0"+monthStr;

    var yearStr = $("#economicIndicatorYearBtn2").text().substr(0,4);
    if(parseInt(yearStr,10)>2013 && (monthStr == "03" || monthStr == "06" || monthStr == "09" || monthStr == "12")){
        $("#form_xe").text("社会消费品零售总额(亿元)");
    }
    else{
        $("#form_xe").text("限额以上消费品零售额(亿元)");
    }
	
	$("#eim2_yearMonth").val(yearStr+monthStr);
	$("#eim2_yearMonth").attr("disabled","disabled");
	$("#eim2_place").removeAttr("disabled");
	
	$("#eim2_id").val("");
	$("#eim2_place").val("");
	$("#eim2_scV").val("");$("#eim2_scP").val("");
	$("#eim2_czV").val("");$("#eim2_czP").val("");
	$("#eim2_ggV").val("");$("#eim2_ggP").val("");
	$("#eim2_gmV").val("");$("#eim2_gmP").val("");
	$("#eim2_gdV").val("");$("#eim2_gdP").val("");
	$("#eim2_xeV").val("");$("#eim2_xeP").val("");
	$("#eim2_sjV").val("");$("#eim2_sjP").val("");
	$("#eim2_ckV").val("");$("#eim2_ckP").val("");
	
	$("#economicIndicatorModal2").modal("show"); 
	currOpeType="addEachEconomicIndicator";
}

function checkSingleItem(re,formName,infoStr){
	if($.trim($("#"+formName).val()) != ""){
		if(!re.test($.trim($("#"+formName).val()))){
			$("#"+formName).val("");
			$("#"+formName).focus();
			showCheckInfoLabel("#checkEconomicIndicatorInfoLabel2",infoStr);
			return false;
		}
	}
	return true;
}
//各县经济指标表单校验
function checkEconomicIndicatorForm2(){
	var re = /^(-?\d+)(\.\d+)?$/;
	if(!checkSingleItem(re,"eim2_scV","指标值请输入数值！")) return false;
	if(!checkSingleItem(re,"eim2_scP","指标增长值请输入数值！")) return false;
	if(!checkSingleItem(re,"eim2_czV","指标值请输入数值！")) return false;
	if(!checkSingleItem(re,"eim2_czP","指标增长值请输入数值！")) return false;
	if(!checkSingleItem(re,"eim2_ggV","指标值请输入数值！")) return false;
	if(!checkSingleItem(re,"eim2_ggP","指标增长值请输入数值！")) return false;
	if(!checkSingleItem(re,"eim2_gmV","指标值请输入数值！")) return false;
	if(!checkSingleItem(re,"eim2_gmP","指标增长值请输入数值！")) return false;
	if(!checkSingleItem(re,"eim2_gdV","指标值请输入数值！")) return false;
	if(!checkSingleItem(re,"eim2_gdP","指标增长值请输入数值！")) return false;
	if(!checkSingleItem(re,"eim2_xeV","指标值请输入数值！")) return false;
	if(!checkSingleItem(re,"eim2_xeP","指标增长值请输入数值！")) return false;
	if(!checkSingleItem(re,"eim2_sjV","指标值请输入数值！")) return false;
	if(!checkSingleItem(re,"eim2_sjP","指标增长值请输入数值！")) return false;
	if(!checkSingleItem(re,"eim2_ckV","指标值请输入数值！")) return false;
	if(!checkSingleItem(re,"eim2_ckP","指标增长值请输入数值！")) return false;
	return true;
}
//保存各县经济指标
function saveEconomicIndicator2(){
	if(checkEconomicIndicatorForm2() == false) return;
	$.post(APP_PATH+"/economicIndicatorServlet2",
		   {  
			  opeType:currOpeType,
			  id:$("#eim2_id").val(),
			  place:$("#eim2_place").val(),
			  yearMonth:$("#eim2_yearMonth").val(),
			  scV:$("#eim2_scV").val(),
			  scP:$("#eim2_scP").val(),
			  czV:$("#eim2_czV").val(),
			  czP:$("#eim2_czP").val(),
			  ggV:$("#eim2_ggV").val(),
			  ggP:$("#eim2_ggP").val(),
			  gmV:$("#eim2_gmV").val(),
			  gmP:$("#eim2_gmP").val(),
			  gdV:$("#eim2_gdV").val(),
			  gdP:$("#eim2_gdP").val(),
			  xeV:$("#eim2_xeV").val(),
			  xeP:$("#eim2_xeP").val(),
			  sjV:$("#eim2_sjV").val(),
			  sjP:$("#eim2_sjP").val(),
			  ckV:$("#eim2_ckV").val(),
			  ckP:$("#eim2_ckP").val()
			},
			function(data,textStatus){
			   if(textStatus == "success"){
				 if( data.result== "1"){
					var table = $("#economicIndicatorDataTable2").DataTable();
					table.draw();
					if(currOpeType == "addEachEconomicIndicator") $("#checkEconomicIndicatorInfoLabel2").text("添加记录成功！");
					else $("#checkEconomicIndicatorInfoLabel2").text("修改记录成功！");
		  			$("#checkEconomicIndicatorInfoLabel2").show();
		            var timeOut=setTimeout(function(){$("#checkEconomicIndicatorInfoLabel2").hide();clearTimeout(timeOut);$("#economicIndicatorModal2").modal("hide");},800);
					
				  }
				  else if(data.result == "0"){//对于新增记录，返回0表示经济指标已存在
				    showCheckInfoLabel("#checkEconomicIndicatorInfoLabel2","该县市的经济指标已存在！");
				  }
			  }
		},"json");
}

//修改各县经济指标
function onClickOfEditEconomicIndicatorLink2(id,place,scV,scP,czV,czP,ggV,ggP,gmV,gmP,gdV,gdP,xeV,xeP,sjV,sjP,ckV,ckP){
	scV=parseFloat(scV).toFixed(2); if(scV == "0.00") scV="";
	scP=parseFloat(scP).toFixed(2); if(scP == "0.00") scP="";
	czV=parseFloat(czV).toFixed(2); if(czV == "0.00") czV="";
	czP=parseFloat(czP).toFixed(2); if(czP == "0.00") czP="";
	ggV=parseFloat(ggV).toFixed(2); if(ggV == "0.00") ggV="";
	ggP=parseFloat(ggP).toFixed(2); if(ggP == "0.00") ggP="";
	gmV=parseFloat(gmV).toFixed(2); if(gmV == "0.00") gmV="";
	gmP=parseFloat(gmP).toFixed(2); if(gmP == "0.00") gmP="";
	gdV=parseFloat(gdV).toFixed(2); if(gdV == "0.00") gdV="";
	gdP=parseFloat(gdP).toFixed(2); if(gdP == "0.00") gdP="";
	xeV=parseFloat(xeV).toFixed(2); if(xeV == "0.00") xeV="";
	xeP=parseFloat(xeP).toFixed(2); if(xeP == "0.00") xeP="";
	sjV=parseFloat(sjV).toFixed(2); if(sjV == "0.00") sjV="";
	sjP=parseFloat(sjP).toFixed(2); if(sjP == "0.00") sjP="";
	ckV=parseFloat(ckV).toFixed(2); if(ckV == "0.00") ckV="";
	ckP=parseFloat(ckP).toFixed(2); if(ckP == "0.00") ckP="";
	
	var monthStr=$.trim($("#economicIndicatorMonthBtn2").text());
	monthStr=monthStr.substring(2,monthStr.length-1);
	if(monthStr.length ==1) monthStr="0"+monthStr;
    var yearStr = $("#economicIndicatorYearBtn2").text().substr(0,4);
    if(parseInt(yearStr,10)>2013 && (monthStr == "03" || monthStr == "06" || monthStr == "09" || monthStr == "12")){
        $("#form_xe").text("社会消费品零售总额(亿元)");
    }
    else{
        $("#form_xe").text("限额以上消费品零售额(亿元)");
    }

	$("#eim2_yearMonth").val(yearStr+monthStr);
	$("#eim2_yearMonth").attr("disabled","disabled");
	$("#eim2_place").attr("disabled","disabled");
	$("#eim2_place").val(place);
	$("#economicIndicatorModalLabel2").text("修改经济指标"); 
	$("#eim2_id").val(id);
	
	if(scV.toString()=="0") $("#eim2_scV").val("");
	else $("#eim2_scV").val(scV);
	if(scP.toString()=="0") $("#eim2_scP").val("");
	else $("#eim2_scP").val(scP);
	
	if(czV.toString()=="0") $("#eim2_czV").val("");
	else $("#eim2_czV").val(czV);
	if(czP.toString()=="0") $("#eim2_czP").val("");
	else $("#eim2_czP").val(czP);
	
	if(ggV.toString()=="0") $("#eim2_ggV").val(""); 
	else $("#eim2_ggV").val(ggV);
	if(ggP.toString()=="0") $("#eim2_ggP").val("");
	else $("#eim2_ggP").val(ggP);
	
	if(gmV.toString()=="0") $("#eim2_gmV").val("");
	else $("#eim2_gmV").val(gmV);
	if(gmP.toString()=="0") $("#eim2_gmP").val("");
	else $("#eim2_gmP").val(gmP);
	
	if(gdV.toString()=="0") $("#eim2_gdV").val("");
	else $("#eim2_gdV").val(gdV);
	if(gdP.toString()=="0") $("#eim2_gdP").val("");
	else $("#eim2_gdP").val(gdP);
	
	if(xeV.toString()=="0") $("#eim2_xeV").val("");
	else $("#eim2_xeV").val(xeV);
	if(xeP.toString()=="0") $("#eim2_xeP").val("");
	else $("#eim2_xeP").val(xeP);
	
	if(sjV.toString()=="0") $("#eim2_sjV").val("");
	else $("#eim2_sjV").val(sjV);
	if(sjP.toString()=="0") $("#eim2_sjP").val("");
	else $("#eim2_sjP").val(sjP);
	
	if(ckV.toString()=="0") $("#eim2_ckV").val("");
	else $("#eim2_ckV").val(ckV);
	if(ckP.toString()=="0") $("#eim2_ckP").val("");
	else $("#eim2_ckP").val(ckP);
	
	$("#economicIndicatorModal2").modal("show"); 
	currOpeType="editEachEconomicIndicator";
}

//删除记录--各县经济指标
function onClickDelEconomicIndicatorLink2(id){
	if(confirm("确实要删除记录吗？")){
		$.post(APP_PATH+"/economicIndicatorServlet2",
		   {  
			  opeType:"delEachEconomicIndicator",
			  recordID:id
			},
			function(data,textStatus){
			   if(textStatus == "success"){
				 if( data.result== "1"){
					var table = $("#economicIndicatorDataTable2").DataTable();
					table.draw();
				  }
			   } 
		},"json");
	}
}

//选择年份
function selectEconomicIndicatorYear2(selectYear){
	if($("#economicIndicatorYearBtn2").text().substr(0,4) != selectYear.toString()){
		$("#economicIndicatorYearBtn2").html(selectYear+"年&nbsp;<span class=\"caret\"/>");
		onClickSearchEconomicIndicatorButton2();//触发查询
	}
}
//选择月份
function selectEconomicIndicatorMonth2(selectMonth){
	if($("#economicIndicatorMonthBtn2").text().substr(0,2) != selectMonth.toString()){
		$("#economicIndicatorMonthBtn2").html("1-"+selectMonth+"月&nbsp;<span class=\"caret\"/>");
		onClickSearchEconomicIndicatorButton2();//触发查询
	}
}
//查询数据列表2
function onClickSearchEconomicIndicatorButton2(){
	var table = $("#economicIndicatorDataTable2").DataTable();
	table.draw();
}
//创建各县经济指标
function createEconomicIndicatorListDataTable2(){
	$("#economicIndicatorDataTable2").dataTable({ 
		"ajax": 
			{
				"url":APP_PATH+"/economicIndicatorServlet2",
				"type":"POST",
				"data":function(param){
					param.opeType="queryAllByYearMonth";
					param.place=$("#economicIndicatorPlaceBtn2").val();
					var monthStr=$.trim($("#economicIndicatorMonthBtn2").text());
					monthStr=monthStr.substring(2,monthStr.length-1);
					if(monthStr.length ==1) monthStr="0"+monthStr;
                    var yearStr=$("#economicIndicatorYearBtn2").text().substr(0,4);
					param.yearMonth=yearStr+monthStr;
					$("#specThead").text(parseInt(yearStr,10)>2013 ? "出口总额(万元)" : "出口总额(万美元)");
                    if(parseInt(yearStr,10)>2013 && (monthStr == "03" || monthStr == "06" || monthStr == "09" || monthStr == "12")){
                        $("#xeth").text("社会消费品零售总额(亿元)");
                    }
                    else{
                        $("#xeth").text("限额以上消费品零售额(亿元)");
                    }
				},
				"complete":function(){
					 addCssOnDataTable("economicIndicatorDataTable2");
				} 
			},
		"columns": [ 
			{ "data": "place" },
			{ "data": "scV" },
			{ "data": "scP" },
			{ "data": "czV" },
			{ "data": "czP" },
			{ "data": "ggV" },
			{ "data": "ggP" },
			{ "data": "gmV" },
			{ "data": "gmP" },
			{ "data": "gdV" },
			{ "data": "gdP" },
			{ "data": "xeV" },
			{ "data": "xeP" },
			{ "data": "sjV" },
			{ "data": "sjP" },
			{ "data": "ckV" },
			{ "data": "ckP" },
			{ "data": "id" },
			{ "data": "" }
		],
		 "columnDefs": [ 
            { "targets": [0],"width":"110"},
			{ "targets": [1],"render":function(data,type,row){
				 return numFormat(row.scV);
			}},
			{ "targets": [2],"render":function(data,type,row){
				 return numFormat(row.scP);
			}},
			{ "targets": [3],"render":function(data,type,row){
				 return numFormat(row.czV);
			}},
			{ "targets": [4],"render":function(data,type,row){
				 return numFormat(row.czP);
			}},
			{ "targets": [5],"render":function(data,type,row){
				 return numFormat(row.ggV);
			}},
			{ "targets": [6],"render":function(data,type,row){
				 return numFormat(row.ggP);
			}},
			{ "targets": [7],"render":function(data,type,row){
				 return numFormat(row.gmV);
			}},
			{ "targets": [8],"render":function(data,type,row){
				 return numFormat(row.gmP);
			}},
			{ "targets": [9],"render":function(data,type,row){
				 return numFormat(row.gdV);
			}},
			{ "targets": [10],"render":function(data,type,row){
				 return numFormat(row.gdP);
			}},
			{ "targets": [11],"render":function(data,type,row){
				 return numFormat(row.xeV);
			}},
			{ "targets": [12],"render":function(data,type,row){
				 return numFormat(row.xeP);
			}},
			{ "targets": [13],"render":function(data,type,row){
				 return numFormat(row.sjV);
			}},
			{ "targets": [14],"render":function(data,type,row){
				 return numFormat(row.sjP);
			}},
			{ "targets": [15],"render":function(data,type,row){
				 return numFormat(row.ckV);
			}},
			{ "targets": [16],"render":function(data,type,row){
				 return numFormat(row.ckP);
			}},
			{ "targets": [17],"visible":false },
			{ "targets": [18],"width":"200","render":function(data,type,row){
				
				var linkStr="<a href='javascript:void(0);' onClick='onClickOfEditEconomicIndicatorLink2(\""+row.id+"\",\""+row.place+"\",\""+row.scV+"\",\""+row.scP+"\",\""+row.czV+"\",\""+row.czP+"\",\""+row.ggV+"\",\""+row.ggP+"\",\""+row.gmV+"\",\""+row.gmP+"\",\""+row.gdV+"\",\""+row.gdP+"\",\""+row.xeV+"\",\""+row.xeP+"\",\""+row.sjV+"\",\""+row.sjP+"\",\""+row.ckV+"\",\""+row.ckP+"\");'>修改</a> | ";
				
				linkStr+="<a href='javascript:void(0);' onClick='onClickDelEconomicIndicatorLink2("+row.id+");'>删除</a>";
				return linkStr;
			}}
        ],
		"info":true,
		"searching":false,
		"paging":false,
		"destroy":true,
		"processing":true,
		"serverSide":true,
		"ordering":false,
		"lengthChange": false,
		"language": {
			"lengthMenu": "每页显示 _MENU_ 条记录",
			"zeroRecords": "没有查询到数据",
			"search": "查找： _INPUT_",
			"info":"共 _PAGES_ 页，_MAX_ 条记录，当前第 _PAGE_ 页",
			"infoEmpty": "",
			"processing": "正在加载数据..."
		}
	});
}

function numFormat(v){
	var str=parseFloat(v).toFixed(2);
	if(str=="0.00") return ""; 
	else if(str.substr(str.length-1,1) == "0"){
		str=str.substring(0,str.length-1);
		if(str.substr(str.length-1,1) == "0") return str.substr(0,str.length-2);
		else return str;
	} 
	else return str;
}

//////////////////////////专题聚焦
function openSubjectArticleList(subjectName,subjectID,tag){
 if(thisUEditor != null && isEditorDestory == false){
	thisUEditor.destroy();
	isEditorDestory=true;
 }
 if(tag != 1) SKIN_TAG=false; 
 $("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
	if(textStatus == "success"){
		$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计业务 >> 专题聚焦 >> "+subjectName);
		$("#articleCategory").val("zt"+subjectID);
		$("#articleSubjectName").val(subjectName);
		$("#articleSubjectId").val(subjectID);
		$("#backSubjectListButton").css("display","");
		createArticleListDataTable();
	}
 });
}
function onClickOfSubjectAdminLink(){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	$("#mainContentDiv").load("subjectList.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计业务 >> 专题聚焦");
			createSubjectListDataTable();
		}
	});
}

function createSubjectListDataTable(){
	$('#listSubjectDataTable').dataTable({
		"ajax": 
		{
			"url":APP_PATH+"/subjectServlet",
			"type":"get",
			"data":function(param){
					param.opeType="queryAll";
				},
			"complete":function(){
					addCssOnDataTable("listSubjectDataTable");
					//链接列居左显示
					$("#listSubjectDataTable tbody").find("tr td").each(function(i){
						if(i%6 == 1){
							$(this).css("text-align","left");
							$(this).css("text-indent","8px");
						}
					});
				}  
		},
		"columns": [
			{ "data": "id" },
			{ "data": "sqeNo" },
			{ "data": "subjectName" },
			{ "data": "imagePath" },
			{ "data": "isMain" },
			{ "data": "isOutLink" },
			{ "data": ""}
		],
		"info":false,
		"searching":false,
		"paging":false,
		"destroy":true,
		"ordering":false,
		"serverSide":true,
		"language": {
			"lengthMenu": "每页显示 _MENU_ 条记录",
			"zeroRecords": "没有查询到数据",
			"search": "查找： _INPUT_",
			"paginate": {"previous": "<<","next":">>"}
		},
		"columnDefs": [
			{ "targets": [0],"visible":false },
			{ "targets": [1],"width":"80" },
			{ "targets": [2],"render":function(data,type,row){
				var mapLink="";
				if(row.isOutLink == "1"){
					mapLink="<a href='"+row.outLink+"' target='_blank'>"+row.subjectName+"</a>";
				}
				else{
				 mapLink="<a href='javascript:void(0)' onClick='openSubjectArticleList(\""+row.subjectName+"\",\""+row.id+"\");'>"+row.subjectName+"</a>";
				}
				 return mapLink;
			}},
			{ "targets": [3],"width":"220","render":function(data,type,row){
				 var mapLink="<a href='../"+row.imagePath+"' target='_blank'>"+"专题图片"+"</a>";
				 return mapLink;
			}},
			{ "targets": [4],"width":"90","render":function(data,type,row){
				if(row.isMain == "0") return "否";
				else return "是"; 
			}},
			{ "targets": [5],"width":"90","render":function(data,type,row){
				if(row.isOutLink == "1") return "是";
				else return "否"; 
			}},
			{ "targets": [6],"width":"110","render":function(data,type,row){
				var linkStr="<a href='javascript:void(0);' onClick='onClickEditSubjectLink(\""+row.id+"\",\""+row.subjectName+"\",\""+row.imagePath+"\",\""+row.isMain+"\",\""+row.isOutLink+"\",\""+row.outLink+"\");'>修改</a> | ";
				linkStr+="<a href='javascript:void(0);' onClick='onClickDelSubjectLink(\""+row.id+"\");'>删除</a>";
				return linkStr;
			}}
		]
	}); 
}

//上传专题图片完毕之后
function afterUploadSubjectImage(filePath,fileName){
	$("#sub_imagePath").val(filePath);
}
//修改专题
function onClickEditSubjectLink(id,subjectName,imagePath,isMain,isOutLink,outLink){
	$("#subjectModalLabel").text("修改专题");
	$("#sub_id").val(id);
	$("#sub_subjectName").val(subjectName);
	$("#sub_imagePath").val(imagePath);
	if(isMain == "0") $("#sub_isMain")[0].checked=false;
	else $("#sub_isMain")[0].checked=true; 
	if(isOutLink == "1"){
		$("#sub_isOutLink")[0].checked = true;
		$("#sub_outLink").removeAttr("disabled");
		$("#sub_outLink").val(outLink);
	}
	else{
		$("#sub_isOutLink")[0].checked = false;
		$("#sub_outLink").attr("disabled","disabled");
		$("#sub_outLink").val("");
	}
	$("#subjectModal").modal("show");
}

function enableOutLinkInputOfSubject(){
	if($("#sub_isOutLink")[0].checked == true){
		$("#sub_outLink").removeAttr("disabled");
	}
	else{
		$("#sub_outLink").attr("disabled","disabled");
	}
}
//删除专题
function onClickDelSubjectLink(id){
	if(confirm("确实要删除记录吗？")){
		$.post(APP_PATH+"/subjectServlet",
		   {  
			  opeType:"delSubject",
			  id:id
			},
			function(data,textStatus){
			   if(textStatus == "success"){
				 if( data== "1"){
					var table = $("#listSubjectDataTable").DataTable();
					table.draw();
				  }
			   }  
		});
	}
}
//添加新专题
function onClickAddNewSubject(){
	$("#subjectModalLabel").text("添加新专题");
	$("#sub_id").val("");
	$("#sub_subjectName").val("");
	$("#sub_imagePath").val("");
	$("#sub_isMain")[0].checked=false;
	$("#sub_isOutLink")[0].checked=false;
	$("#sub_outLink").attr("disabled","disabled");
	$("#sub_outLink").val("");
	$("#subjectModal").modal("show"); 
}
//保存专题
function saveSubjectData(){
	if($.trim($("#sub_id").val()) == "") currOpeType="saveSubject";
	else currOpeType="editSubject";
	
	var isMain=0;
	if($("#sub_isMain")[0].checked == true) isMain=1;
	var isOutLink=0;
	var outLink="";
	if($("#sub_isOutLink")[0].checked == true) {
		isOutLink=1;
		outLink=$.trim($("#sub_outLink").val());
	}
	
	if(checkSubjectData()){
		 $.post(APP_PATH+"/subjectServlet",
			{  opeType:currOpeType,
			   id:$("#sub_id").val(),
			   subjectName:$.trim($("#sub_subjectName").val()),
			   imagePath:$("#sub_imagePath").val(),
			   isMain:isMain,
			   isOutLink:isOutLink,
			   outLink:outLink 
			},
			function(data,textStatus){
			   if(textStatus == "success"){
				 if(data == "1"){
					var table = $("#listSubjectDataTable").DataTable();
					table.draw();
					
					if(currOpeType == "saveSubject") $("#subjectInfoLabel").text("添加专题成功！");
					else $("#subjectInfoLabel").text("修改专题成功！");
		  			$("#subjectInfoLabel").show();
		            var timeOut=setTimeout(function(){$("#subjectInfoLabel").hide();clearTimeout(timeOut);$("#subjectModal").modal("hide");},800);
					}
					else if(data == "0"){
					   showCheckInfoLabel("#subjectInfoLabel","保存失败！");
					}
				}
		});
	 }
}
//校验专题表单
function checkSubjectData(){
	if($.trim($("#sub_subjectName").val()) == "" ){
		$("#sub_subjectName")[0].focus();
		showCheckInfoLabel("#subjectInfoLabel","请输入专题名！");
		return false;
	}
	if($.trim($("#sub_imagePath").val()) == "" ){
		$("#sub_imagePath")[0].focus();
		showCheckInfoLabel("#subjectInfoLabel","需要上传专题图片！");
		return false;
	}
	return true;
}
////////////////图说赣州
function onClickOfGanzhouMapDataAdminLink(){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	SKIN_TAG=false; 
	$("#mainContentDiv").load("mapData.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计数据 >> 图说赣州");
			createMapDataListDataTable();
		}
	});
}
function createMapDataListDataTable(){
	$('#listMapDataTable').dataTable({
		"ajax": 
		{
			"url":APP_PATH+"/ganzhouInfoServlet",
			"type":"POST",
			"data":function(param){
					param.opeType="queryAll";
				},
			"complete":function(){
					addCssOnDataTable("listMapDataTable");
					 //链接列居左显示
					$("#listMapDataTable tbody").find("tr td").each(function(i){
						if(i%3 == 1){
							$(this).css("text-align","left");
							$(this).css("text-indent","8px");
						}
					});
				}  
		},
		"columns": [
			{ "data": "place" },
			{ "data": "placePy" },
			{ "data": "placeLink" },
			{ "data": ""}
		],
		"info":false,
		"searching":false,
		"paging":false,
		"destroy":true,
		"ordering":false,
		"serverSide":true,
		"language": {
			"lengthMenu": "每页显示 _MENU_ 条记录",
			"zeroRecords": "没有查询到数据",
			"search": "查找： _INPUT_",
			"paginate": {"previous": "<<","next":">>"}
		},
		"columnDefs": [
			{ "targets": [0],"width":"180"},
			{ "targets": [1],"visible":false},
			{ "targets": [2],"render":function(data,type,row){
				var placeLink="<a href='"+row.placeLink+"' target='_blank'>"+row.placeLink+"</a>";
				return placeLink;
			}},
			{ "targets": [3],"width":"110","render":function(data,type,row){
				var linkStr="<a href='javascript:void(0);' onClick='onClickEditMapDataLink(\""+row.place+"\",\""+row.placePy+"\",\""+row.placeLink+"\");'>修改</a>";
				return linkStr;
			}}
		]
		
	}); 
}

function onClickEditMapDataLink(place,placePy,placeLink){
	$("#mp_place").val(place);
	$("#mp_placePy").val(placePy);
	$("#mp_placeLink").val(placeLink);
	$("#mapDataModal").modal("show"); 
}
function saveMapData(){
	$.post(APP_PATH+"/ganzhouInfoServlet",
	{  
		opeType:"editGanzhouInfo",
		place:$("#mp_place").val(),
		placePy:$("#mp_placePy").val(),
		placeLink:$("#mp_placeLink").val()
	},
	function(data,textStatus){
		if(textStatus == "success"){
		   if( data == "1"){
				var table = $("#listMapDataTable").DataTable();
				table.draw();
				$("#mapDataInfoLabel").text("修改成功！");
		  		$("#mapDataInfoLabel").show();
		        var timeOut=setTimeout(function(){$("#mapDataInfoLabel").hide();clearTimeout(timeOut);$("#mapDataModal").modal("hide");},800);
			}
		 } 
	});
}
///////////////年度公报(全市)
function onClickOfYearBulletinAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计数据 >> 年度公报(全市)");
			$("#articleCategory").val("020100"); 
			createArticleListDataTable();
		}
	});
}

///////////////年度公报(各县)
function onClickOfYearBulletin2AdminLink(cityName,tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计数据 >> 年度公报(各县)");
			$("#articleCategory").val("020101"); 
			if(cityName != undefined && cityName !=""){
				$("#ganzhouCityBtn").html(cityName+"&nbsp;<span class=\"caret\"></span>");
			} 
			createArticleListDataTable();
		}
	});
}

///////////////普查公报
function onClickOfGeneralSurveyBulletinAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计数据 >> 普查公报");
			$("#articleCategory").val("020200"); 
			createArticleListDataTable();
			addCssOnDataTable("listArticleDataTable");
		}
	});
}

//************************************统计数据 end*****************************************

//************************************统计业务 start*****************************************
//市级工作动态
function onClickOfWorkStateAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计业务 >> 市级工作动态");
			$("#articleCategory").val("030100"); 
			createArticleListDataTable();
		}
	});
}
//县级工作动态
function onClickOfWorkStateAdminLink2(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false;
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计业务 >> 县级工作动态");
			$("#articleCategory").val("030101");
			createArticleListDataTable();
		}
	});
}

//公告通知
function onClickOfPublicNoticeAdminLink(tag){
	
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计业务 >> 公告通知");
			$("#articleCategory").val("030300"); 
			createArticleListDataTable();
		}
	});
}

//领导讲话
function onClickOfLeaderSpeakAdminLink(tag){
	
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计业务 >> 领导讲话");
			$("#articleCategory").val("030400"); 
			createArticleListDataTable();
		}
	});
}

//工作交流
function onClickOfWorkCommunicateAdminLink(tag){
	
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计业务 >> 工作交流");
			$("#articleCategory").val("030500"); 
			createArticleListDataTable();
		}
	});
}

//统计风采文章
function onClickOfStatisticsMienAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计业务 >> 统计风采");
			$("#articleCategory").val("030700"); 
			createArticleListDataTable();
		}
	});
}

//统计风采图片
function onClickOfDemeanourImageAdminLink(){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	SKIN_TAG=false; 
	$("#mainContentDiv").load("imageEdit.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 首页模块管理 >> 风采图片管理");
			
			swfobject.embedSWF("../admin/flash/ImageEdit.swf", "imageEditDiv", "100%", "100%", "6.0.0", "expressInstall.swf", {objectPN:"DemeanourImage",summitFileName:APP_PATH+"/flexFileUploadServlet",fileType:"png,jpg,jpeg",opeSummitFileName:APP_PATH+"/imageServlet",buttonWidth:"65",buttonHeight:"30",imageWidth:"300",imageHeight:"200",category:"0",buttonTextSize:"13"}, {menu:"false"}, {id:"ImageUpload",name:"ImageUpload"});
		}
	});
}

//党建工作
function onClickOfPartBuildingAdminLink(tag){
	
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计建设 >> 党建工作");
			$("#articleCategory").val("030800"); 
			createArticleListDataTable();
		}
	});
}

//纪检监察
function onClickOfInspectionWorkAdminLink(tag){
	
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计建设 >> 纪检监察");
			$("#articleCategory").val("030900"); 
			createArticleListDataTable();
		}
	});
}

//教育培训
function onClickOfEducationTrainAdminLink(tag){
	
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true; 
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计建设 >> 教育培训");
			$("#articleCategory").val("031000"); 
			createArticleListDataTable();
		}
	});
}
//************************************统计业务 end*****************************************

//************************************统计分析 start*****************************************
//市级简要信息
function onClickOfBriefInfoAdminLink(tag){
	
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计分析 >> 市级简要信息");
			$("#articleCategory").val("040100"); 
			createArticleListDataTable();
		}
	});
}
//县级简要信息
function onClickOfBriefInfoAdminLink2(tag){

	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false;
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计分析 >> 县级简要信息");
			$("#articleCategory").val("040101");
			createArticleListDataTable();
		}
	});
}

//市级运行分析
function onClickOfRunningAnalysisAdminLink(tag){

	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false;
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计分析 >> 市级运行分析");
			$("#articleCategory").val("040200");
			createArticleListDataTable();
		}
	});
}
//县级运行分析
function onClickOfRunningAnalysisAdminLink2(tag){

	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false;
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计分析 >> 市县级运行分析");
			$("#articleCategory").val("040201");
			createArticleListDataTable();
		}
	});
}

//综合调研
function onClickOfSynthesizeSurveyAdminLink(tag){
	
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计分析 >> 综合调研");
			$("#articleCategory").val("040300"); 
			createArticleListDataTable();
		}
	});
}
//经济观点
function onClickOfEconomyViewpointAdminLink(tag){
	
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计分析 >> 经济观点");
			$("#articleCategory").val("040400"); 
			createArticleListDataTable();
		}
	});
}
//************************************统计分析 end*****************************************

//************************************统计知识 start***************************************
//统计制度
function onClickOfStatisticsSystemAdminLink1(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计知识 >> 统计制度");
			$("#articleCategory").val("050100"); 
			createArticleListDataTable();
		}
	});
}

//统计标准
function onClickOfStatisticsStandardAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计知识 >> 统计标准");
			$("#articleCategory").val("050200"); 
			createArticleListDataTable();
		}
	});
}
//统计指标
function onClickOfStatisticsIndexdAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计知识 >> 统计指标");
			$("#articleCategory").val("050300"); 
			createArticleListDataTable();
		}
	});
}
//统计科普
function onClickOfStatisticsPopulardAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计知识 >> 统计科普");
			$("#articleCategory").val("050400"); 
			createArticleListDataTable();
		}
	});
}
//统计知识
function onClickOfStatisticsKnowledgeAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计知识 >> 统计知识");
			$("#articleCategory").val("050500"); 
			createArticleListDataTable();
		}
	});
}
//************************************统计知识 end*****************************************

//************************************经济要闻 start***************************************
//国际要闻
function onClickOfInternationalNewsAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 经济要闻 >> 国际要闻");
			$("#articleCategory").val("060100"); 
			createArticleListDataTable();
		}
	});
}
//国内要闻
function onClickOfCivilNewsAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 经济要闻 >> 国内要闻");
			$("#articleCategory").val("060200"); 
			createArticleListDataTable();
		}
	});
}
//观点荟萃
function onClickOfViewpointAssembleAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 经济要闻 >> 观点荟萃");
			$("#articleCategory").val("060300"); 
			createArticleListDataTable();
		}
	});
}
//************************************经济要闻 end*****************************************

//************************************统计服务 start***************************************
function onClickOfQualificationTestAdminLink(){
	var cssDisplay="none";
	if($("#OnlineWorkingAdmin11").css("display") == "none") cssDisplay="";
	
	$("#OnlineWorkingAdmin11").css("display",cssDisplay);
	$("#OnlineWorkingAdmin12").css("display",cssDisplay);
	$("#OnlineWorkingAdmin13").css("display",cssDisplay);
	$("#OnlineWorkingAdmin14").css("display",cssDisplay);
}

//地方统计项目管理
function onClickOfPlaceStatisticsProjectAdminLink(){
	var cssDisplay="none";
	if($("#projectAdmin1").css("display") == "none") cssDisplay="";
	$("#projectAdmin1").css("display",cssDisplay);
	$("#projectAdmin2").css("display",cssDisplay);
}

//意见征集
function onClickOfOpinionCollect(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false;
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计服务 >> 意见征集");
			$("#articleCategory").val("070600");
			$("#listArticleDataTable>thead>tr>th:eq(3)").text("查看意见");
			createArticleListDataTable();
		}
	});
}

//地方统计项目管理-办事程序
function onClickOfProjectProcedureAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false;
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计服务 >> 地方统计调查项目管理 >> 办事程序");
			$("#articleCategory").val("070701");
			createArticleListDataTable();
		}
	});
}

//地方统计项目管理-表格下载
function onClickOfProjectTableDownloadAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false;
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计服务 >> 地方统计调查项目管理 >> 表格下载");
			$("#articleCategory").val("070702");
			createArticleListDataTable();
		}
	});
}

//考试动态
function onClickOfQualificationTestDynamicAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计服务 >> 统计从业资格考试 >> 考试动态");
			$("#articleCategory").val("070500"); 
			createArticleListDataTable();
		}
	});
}

//考试文件
function onClickOfQualificationTestInfoAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计服务 >> 统计从业资格考试 >> 考试文件");
			$("#articleCategory").val("070100"); 
			createArticleListDataTable();
		}
	});
}
//表格下载
function onClickOfQualificationTestTableAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计服务 >> 统计从业资格考试 >> 表格下载");
			$("#articleCategory").val("070200"); 
			createArticleListDataTable();
		}
	});
}
//成绩查询
var isExamScoreDataTableCreated=false;

function onClickOfExamScoreAdminLink(){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	SKIN_TAG=false; 
	isExamScoreDataTableCreated=false;
	$("#mainContentDiv").load("examScore.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计服务 >> 统计从业资格考试 >> 成绩查询");
			//导入按钮
			swfobject.embedSWF("../admin/flash/FileUpload.swf", "importExamScoreBtn", "80", "35", "6.0.0", "expressInstall.swf", {buttonWidth:"60",buttonBgColor:"0x006699",textSize:"12",buttonLabel:"导入",summitFileName:APP_PATH+"/flexFileUploadServlet",fileType:"xls,xlsx",objectPN:"ExamScore",cancelFun:"cancelUploadExcelFileOfExamScore",beforeFun:"beforeUploadExcelFileOfExamScore",afterFun:"afterUploadExcelFileOfExamScore"}, {menu:"false"}, {id:"fileUploadOfES",name:"fileUploadOfES"});
			//查询年月
			queryYearMonthOfExamScore();
			
			//下拉选择框绑定改变事件
			$('#examScoreYearMonthSelect').change(function(){
				var table = $("#examScoreDataTable").DataTable();
				table.draw();
			});
		}
	});
}
//文件取消上传
function cancelUploadExcelFileOfExamScore(){
	$("#addExamScoreButton").removeAttr("disabled");
	$("#examScoreYearMonthSelect").removeAttr("disabled");
	$("#searchEconIndiButton").removeAttr("disabled");
}
//文件上传之前
function beforeUploadExcelFileOfExamScore(){
	$("#addExamScoreButton").attr("disabled","disabled");
	$("#examScoreYearMonthSelect").attr("disabled","disabled");
	$("#searchEconIndiButton").attr("disabled","disabled");
}
//导入文件上传完毕之后
function afterUploadExcelFileOfExamScore(filePath,fileName){
	
	var yearMonthStr="";
	var options=$("#examScoreYearMonthSelect option:selected"); //获取选中的项 
	if(options){
		yearMonthStr=options.val();
	}
	 
	if(fileName.indexOf("月")>0 && fileName.indexOf("年")>0){
		var year=fileName.substring(0,fileName.indexOf("年"));
		var month=fileName.substring(fileName.indexOf("年")+1,fileName.indexOf("月"));
		if(!isNaN(year) && !isNaN(month)){
			if(month.length == 1) month="0"+month;
			yearMonthStr=year+month;
		}
	}
	 
	$.post(APP_PATH+"/examScoreServlet",//后台导入
	{  
		opeType:"importExcel",
		yearMonth:yearMonthStr,
		excelFilePath:filePath
	}, 
	function(data,textStatus){
		if(textStatus == "success"){
			if( data.result== "1"){
				alert("导入成功！");
				queryYearMonthOfExamScore();
			}
	     }
		 $("#addExamScoreButton").removeAttr("disabled");
		 $("#examScoreYearMonthSelect").removeAttr("disabled");
		 $("#searchEconIndiButton").removeAttr("disabled");
	},"json");
}

//查询年月
function queryYearMonthOfExamScore(){
	$.post(APP_PATH+"/examScoreServlet",
	{  
		opeType:"queryYearMonth"
	},
	function(data,textStatus){
		if(textStatus == "success"){
			if(data.length > 0){
				$("#examScoreYearMonthSelect").show();
				var yearMonthHTML="";
				for(var i=0;i<data.length;i++){
					yearMonthHTML+="<option value='"+data[i]+"'>"+data[i].substr(0,4)+"年"+data[i].substr(data[i].length-2,2)+"月</option>"; 
				}
				$("#examScoreYearMonthSelect").html(yearMonthHTML);
			}
			else{
				$("#examScoreYearMonthSelect").hide();
			}
			if(isExamScoreDataTableCreated == false){
				createExamScoreListDataTable();//依据年月派发数据请求
			}
			else{
				var table = $("#examScoreDataTable").DataTable();
				table.page(table.page()).draw(false); 
			}
		 } 
	},"json");
}
function onKeyPressSearchExamStudentInput(event){
	onClickSearchExamScoreButton();
}
//点击查询按钮的事件处理
function onClickSearchExamScoreButton(){
	var table = $("#examScoreDataTable").DataTable();
	table.draw();
}

//创建考生成绩列表
function createExamScoreListDataTable(){	
	isExamScoreDataTableCreated=true;
	$("#examScoreDataTable").dataTable({ 
		"ajax": 
			{
				"url":APP_PATH+"/examScoreServlet",
				"type":"POST",
				"data":function(param){
					param.opeType="queryDataByYearMonth";
					var options=$("#examScoreYearMonthSelect option:selected"); //获取选中的项 
	 				if(options){
						param.yearMonth=options.val();
					}
					else{
						param.yearMonth="";
					}
					param.name=$.trim($("#searchExamStuentKey").val());
				},
				"complete":function(){
					addCssOnDataTable("examScoreDataTable");
					 
					$("#examScoreDataTable tbody").find("tr td").each(function(i){
						if(i%7 == 0){
							$(this).css("text-align","left");
							$(this).css("text-indent","5px");
						}
					});
					
					if($("#examScoreDataTable tbody tr td").length == 1){//没有查询到记录，隐藏搜索框
						$("#examScoreDataTable_paginate").hide();
					}
					else{
						$("#examScoreDataTable_paginate").show();
					}
					$("#CheckBoxAllOfScore")[0].checked=false;
				} 
			},
		"columns": [ 
			{ "data": "id" },
			{ "data": "seqNo" },
			{ "data": "name" },
			{ "data": "idCardNumber" },
			{ "data": "examCardNumber" },
			{ "data": "amScore" },
			{ "data": "pmScore" },
			{ "data": "" },
			{ "data": "examYearMonth" }
		],
		 "columnDefs": [ 
            { "targets": [0],"visible":false},
			{ "targets": [1],"width":"50","render":function(data,type,row){
				return "<input type=\"checkbox\" id=\"cb_"+row.id+"\" onClick='onClickScoreCheckBox();' style=\"margin-right:5px; margin-top:5px;\" class=\"cb\"/>"+row.seqNo;
			 }},
			{ "targets": [2],"width":"140"},
			{ "targets": [4],"width":"210"},
			{ "targets": [5],"width":"105"},
			{ "targets": [6],"width":"105"},
			{ "targets": [8],"visible":false},
			{ "targets": [7],"width":"125","render":function(data,type,row){
				var linkStr="<a href='javascript:void(0);' onClick='onClickEditExamScoreLink(\""+row.id+"\",\""+row.examYearMonth+"\",\""+row.name+"\",\""+row.idCardNumber+"\",\""+row.examCardNumber+"\",\""+row.amScore+"\",\""+row.pmScore+"\");'>修改</a> | ";
				linkStr+="<a href='javascript:void(0);' onClick='onClickDelExamScoreLink("+row.id+");'>删除</a>";
				return linkStr;
			}}
        ],
		"info":true,
		"searching":false,
		"paging":true,
		"destroy":true,
		"processing":true,
		"serverSide":true,
		"ordering":false,
		"displayLength":12,
		"lengthChange": false,
		"order": [[0, "desc" ]], //
		"language": {
			"lengthMenu": "每页显示 _MENU_ 条记录",
			"zeroRecords": "没有查询到数据",
			"search": "查找： _INPUT_",
			"info":"共 _PAGES_ 页，_MAX_ 条记录，当前第 _PAGE_ 页",
			"infoEmpty": "",
			"processing": "正在加载数据...", 
			"paginate": {"previous": "<<","next":">>"}
		}
	});
}

//勾选
function onClickScoreCheckBox(){
	for(var i=0;i<$(".cb").length;i++){
		if($(".cb")[i].checked == false){
			$("#CheckBoxAllOfScore")[0].checked=false;
			return;
		}
	}
	$("#CheckBoxAllOfScore")[0].checked=true;
}

//全选按钮
function onClickCheckAllBoxOfScore(){
	$(".cb").each(function(){
		$(this)[0].checked=$("#CheckBoxAllOfScore")[0].checked;
	});
}

//批量删除
function onClickBatchDelScoreButton(){
	var idsArr=[];
	var cbArr=$(".cb");
	for(var i=0;i<cbArr.length;i++){
		if(cbArr[i].checked == true){
			idsArr.push(cbArr[i].id.substring(3));
		}
	}
	if(idsArr.length>0){
		if(confirm("确实要删除所选考生成绩吗？")){
		$.post(APP_PATH+"/examScoreServlet",
		   {  
			  opeType:"batchDelExamScore",
			  ids:idsArr.join("-")
			},
			function(data,textStatus){
			   if(textStatus == "success"){
				 if( data== "1"){
					var table = $("#examScoreDataTable").DataTable();
					var currPage = table.page();
					if(idsArr.length == $(".cb").length) currPage--;
					if(currPage<0) currPage=0;
					table.page(currPage).draw(false); 
				  }
			   }  
		});
	  }
	}
}

//点击删除的处理
function onClickDelExamScoreLink(id){
	if(confirm("确实要删除考生成绩吗？")){
		$.post(APP_PATH+"/examScoreServlet",
		   {  
			  opeType:"delExamScore",
			  id:id
			},
			function(data,textStatus){
			   if(textStatus == "success"){
				 if( data== "1"){
					var table = $("#examScoreDataTable").DataTable();
					var currPage = table.page();
					if($("#examScoreDataTable tbody tr").length == 1) currPage--;
					if(currPage<0) currPage=0;
					table.page(currPage).draw(false); 
				  }
			   }  
		});
	}
}

//新增 考生成绩
function onClickAddExamScoreButton(){
	$("#examScoreModalLabel").text("新增考生考试成绩");
	var options=$("#examScoreYearMonthSelect option:selected"); //获取选中的项 
	var yearMonth="";
	if(options){
		yearMonth=options.val();
	}
	$("#es_yearMonth").removeAttr("disabled");
	if(yearMonth != "") $("#es_yearMonth").val(yearMonth);
	else $("#es_yearMonth").attr("placeholder","格式：YYYYMM");
	$("#es_name").val("");
	$("#es_idCardNumber").val("");
	$("#es_examCardNumber").val("");
	$("#es_amScore").val("");
	$("#es_pmScore").val("");
	$("#es_id").val("");
	$("#ExamScoreModal").modal("show");
}

//修改考生成绩
function onClickEditExamScoreLink(id,yearMonth,name,idCardNumber,examCardNumber,amScore,pmScore){
	$("#examScoreModalLabel").text("修改考生考试成绩");
	$("#es_id").val(id);
	$("#es_yearMonth").attr("disabled","disabled");
	$("#es_yearMonth").val(yearMonth);
	$("#es_name").val(name);
	$("#es_idCardNumber").val(idCardNumber);
	$("#es_examCardNumber").val(examCardNumber);
	$("#es_amScore").val(amScore);
	$("#es_pmScore").val(pmScore);
	$("#ExamScoreModal").modal("show");
}

//考生成绩表单的校验
function checkExamScoreData(){
	var dateTest = /^(\d{4})(\d{2})$/;
	if(!dateTest.test($("#es_yearMonth").val())){
		$("#es_yearMonth")[0].focus();
		showCheckInfoLabel("#examScoreInfoLabel","年月格式为YYYYMM，请重新输入！");
		return false;
	}
	if($.trim($("#es_name").val())==""){
		$("#es_name")[0].focus();
		showCheckInfoLabel("#examScoreInfoLabel","请输入考生姓名！");
		return false;
	}
	if($.trim($("#es_idCardNumber").val())==""){
		$("#es_idCardNumber")[0].focus();
		showCheckInfoLabel("#examScoreInfoLabel","请输入考生身份证号码！");
		return false;
	}
	else if($.trim($("#es_idCardNumber").val()).length != 18){
		$("#es_idCardNumber")[0].focus();
		showCheckInfoLabel("#examScoreInfoLabel","身份证号码为18位！");
		return false;
	}
	if($.trim($("#es_examCardNumber").val())==""){
		$("#es_examCardNumber")[0].focus();
		showCheckInfoLabel("#examScoreInfoLabel","请输入考生准考证号码！");
		return false;
	}
	if($.trim($("#es_amScore").val()) != "" && isNaN($.trim($("#es_amScore").val()))){
		$("#es_amScore")[0].focus();
		showCheckInfoLabel("#examScoreInfoLabel","成绩请输入数字！");
		return false;
	}
	if($.trim($("#es_pmScore").val()) != "" && isNaN($.trim($("#es_pmScore").val()))){
		$("#es_pmScore")[0].focus();
		showCheckInfoLabel("#examScoreInfoLabel","成绩请输入数字！");
		return false;
	}

	return true;
}

//考生成绩表单的保存
function saveExamScore(){
	if($.trim($("#es_id").val()) == "") currOpeType="saveExamScore";
	else currOpeType="editExamScore";
	
	 if(checkExamScoreData()){
		 $.post(APP_PATH+"/examScoreServlet",
			{  opeType:currOpeType,
			   id:$("#es_id").val(),
			   yearMonth:$.trim($("#es_yearMonth").val()),
			   name:$.trim($("#es_name").val()),
			   idCardNumber:$.trim($("#es_idCardNumber").val()),
	           examCardNumber:$.trim($("#es_examCardNumber").val()),
			   amScore:$.trim($("#es_amScore").val()),
			   pmScore:$.trim($("#es_pmScore").val())
			},
			function(data,textStatus){
			   if(textStatus == "success"){
				 if(data == "1"){
					var table = $("#examScoreDataTable").DataTable();
					table.draw();
					
					if(currOpeType == "saveExamScore") $("#examScoreInfoLabel").text("添加考生成绩成功！");
					else $("#examScoreInfoLabel").text("修改考生成绩成功！");
		  			$("#examScoreInfoLabel").show();
		            var timeOut=setTimeout(function(){$("#examScoreInfoLabel").hide();clearTimeout(timeOut);$("#ExamScoreModal").modal("hide");},800);
					}
					else if(data == "0"){
					   showCheckInfoLabel("#examScoreInfoLabel","保存失败！");
					}
				}
		});
	 }
}

//统计咨询
function onClickOfNoteBookAdminLink(){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	SKIN_TAG=false; 
	$("#mainContentDiv").load("noteBookAdmin.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){ 
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计服务 >> 统计咨询");
			createNoteBookListDataTable();
			
			//下拉选择框绑定改变事件
			$('#noteBookTypeSelect').change(function(){
				var table = $("#noteBookDataTable").DataTable();
				table.draw();
			});
		}
	});
}

//统计咨询记录列表
function createNoteBookListDataTable(){	
	$("#noteBookDataTable").dataTable({ 
		"ajax": 
			{
				"url":APP_PATH+"/noteBookServlet",
				"type":"POST",
				"data":function(param){
					param.opeType="queryAll";
					//获取咨询类别
					var options=$("#noteBookTypeSelect option:selected"); 
	 				param.isPublish=options.val();
					param.keyWords=$.trim($("#searchNoteBookTitleKey").val());
				},
				"complete":function(){
					addCssOnDataTable("noteBookDataTable");
					$("#CheckBoxAllOfNoteBook")[0].checked = false;
					
					//标题列居左显示
					$("#noteBookDataTable tbody").find("tr td").each(function(i){
						if(i%6 == 1 || i%6 == 0){
							$(this).css("text-align","left");
							$(this).css("text-indent","5px");
						}
					});
					
					if($("#noteBookDataTable tbody tr td").length == 1){//没有查询到记录，隐藏搜索框
						$("#noteBookDataTable_paginate").hide();
					}
					else{
						$("#noteBookDataTable_paginate").show();
					}
				} 
			},
		"columns": [ 
			{ "data": "id" },
			{ "data": "seqNo" },
			{ "data": "noteTitle" },
			{ "data": "name" },
			{ "data": "createTime" },
			{ "data": "replayTime" },
			{ "data": "" },
			{ "data": "email" },
			{ "data": "sex" }, 
			{ "data": "noteContent" },
			{ "data": "noteReplay" },
			{ "data": "noteReplayUser" },
			{ "data": "isPublish" }
		],
		 "columnDefs": [ 
            { "targets": [0],"visible":false},
			{ "targets": [1],"width":"50","render":function(data,type,row){
				return "<input type=\"checkbox\" id=\"cb_"+row.id+"\" onClick='onClickNoteBookCheckBox();' style=\"margin-right:5px; margin-top:5px;\" class=\"cb\"/>"+row.seqNo;
			 }},
			{ "targets": [2],"render":function(data,type,row){
				 var linkStr="<a href='javascript:void(0);' onClick='onClickReplyNoteBookLink(\""+row.id+"\",\""+row.isPublish+"\");'>"+row.noteTitle+"</a>";
				 return linkStr;
			}},
			
			{ "targets": [3],"width":"100"},
			{ "targets": [4],"width":"150"},
			{ "targets": [5],"width":"150"},
			{ "targets": [6],"width":"100","render":function(data,type,row){
				var linkStr = "";
				if(row.isPublish == 0){
				linkStr="<a href='javascript:void(0);' onClick='onClickReplyNoteBookLink(\""+row.id+"\",\""+row.isPublish+"\");'>回复</a> | ";
				}
				else {
				linkStr="<a href='javascript:void(0);' onClick='onClickReplyNoteBookLink(\""+row.id+"\",\""+row.isPublish+"\");'>查看</a> | ";
				}
				linkStr+="<a href='javascript:void(0);' onClick='onClickDelNoteBookLink("+row.id+");'>删除</a>";
				return linkStr;
			}},
			{ "targets": [7],"visible":false },
			{ "targets": [8],"visible":false },
			{ "targets": [9],"visible":false },
			{ "targets": [10],"visible":false },
			{ "targets": [11],"visible":false },
			{ "targets": [12],"visible":false }
        ],
		"info":true,
		"searching":false,
		"paging":true,
		"destroy":true,
		"processing":true,
		"serverSide":true,
		"ordering":false,
		"displayLength":12,
		"lengthChange": false,
		"order": [[4, "asc" ]],
		"language": {
			"lengthMenu": "每页显示 _MENU_ 条记录",
			"zeroRecords": "没有查询到数据",
			"search": "查找： _INPUT_",
			"info":"共 _PAGES_ 页，_MAX_ 条记录，当前第 _PAGE_ 页",
			"infoEmpty": "",
			"processing": "正在加载数据...", 
			"paginate": {"previous": "<<","next":">>"}
		}
	});
}
//回复/查看操作
function onClickReplyNoteBookLink(id,isPublish){
	$.post(APP_PATH+"/noteBookServlet",
	{  opeType:"query",id:id  },
	function(data,textStatus){
		if(textStatus == "success" && data.id != undefined){
			$("#nb_id").val(data.id);
			$("#nb_name").val(data.name);
			$("#nb_sex").val(data.sex);
			$("#nb_email").val(data.email);
			$("#nb_noteTitle").val(data.noteTitle);
			$("#nb_noteContent").val(data.noteContent);
			
			if(isPublish == 1){
				$("#nb_noteReplayUser").val(data.noteReplayUser);
				$("#nb_noteReplay").val(data.noteReplay);
				$("#noteBookModalLabel").text("留言详情");
				$("#nb_noteReplayUser").attr("disabled","disabled");
				$("#nb_noteReplay").attr("disabled","disabled");
				$("#replayNoteBookBtn").hide();
			}
			else{
				$("#nb_noteReplayUser").val("工作人员");
				$("#nb_noteReplay").val("");
				$("#noteBookModalLabel").text("回复留言");
				$("#nb_noteReplayUser").removeAttr("disabled");
				$("#nb_noteReplay").removeAttr("disabled");
				$("#replayNoteBookBtn").show();
			}
			$("#NoteBookModal").modal("show");
	    }
	},"json");
}
//删除操作
function onClickDelNoteBookLink(id){
	if(confirm("确实要删除这条留言吗？")){
		$.post(APP_PATH+"/noteBookServlet",
		   {  
			  opeType:"delNoteBook",
			  id:id
			},
			function(data,textStatus){
			   if(textStatus == "success"){
				 if( data== "1"){
					var table = $("#noteBookDataTable").DataTable();
					var currPage = table.page();
					if($("#noteBookDataTable tbody tr").length == 1) currPage--;
					if(currPage<0) currPage=0;
					table.page(currPage).draw(false); 
				  }
			   }  
		});
	}
}

//全选
function onClickCheckAllBoxOfNoteBook(){
	$(".cb").each(function(){
		$(this)[0].checked=$("#CheckBoxAllOfNoteBook")[0].checked;
	});
}
//勾选
function onClickNoteBookCheckBox(){
	for(var i=0;i<$(".cb").length;i++){
		if($(".cb")[i].checked == false){
			$("#CheckBoxAllOfNoteBook")[0].checked=false;
			return;
		}
	}
	$("#CheckBoxAllOfNoteBook")[0].checked=true;
}
//批量删除留言按钮
function onClickBatchDelNoteBookButton(){
	var idsArr=[];
	var cbArr=$(".cb");
	for(var i=0;i<cbArr.length;i++){
		if(cbArr[i].checked == true){
			idsArr.push(cbArr[i].id.substring(3));
		}
	}
	if(idsArr.length>0){
		if(confirm("确实要删除所选留言吗？")){
		$.post(APP_PATH+"/noteBookServlet",
		   {  
			  opeType:"batchDelNoteBook",
			  ids:idsArr.join("-")
			},
			function(data,textStatus){
			   if(textStatus == "success"){
				 if( data== "1"){
					var table = $("#noteBookDataTable").DataTable();
					var currPage = table.page();
					if(idsArr.length == $(".cb").length) currPage--;
					if(currPage<0) currPage=0;
					table.page(currPage).draw(false); 
				  }
			   }  
		});
	  }
	}
}
//回复留言
function replayNoteBook(){
	if(checkReplyNoteBook()){
		$.post(APP_PATH+"/noteBookServlet",
		{
			opeType:"replyNoteBook",
			id:$("#nb_id").val(),
			noteReplayUser:$.trim($("#nb_noteReplayUser").val()),
			noteReplay:$("#nb_noteReplay").val()
		},
		function(data,textStatus){
			if(textStatus == "success"){
				if(data == "1"){ 
					var table = $("#noteBookDataTable").DataTable();
					var currPage = table.page();
					if($("#noteBookDataTable tbody tr").length == 1) currPage--;
					if(currPage<0) currPage=0;
					table.page(currPage).draw(false); 
					
					$("#noteBookReplyLabel").text("留言回复成功！");
		  			$("#noteBookReplyLabel").show();
		            var timeOut=setTimeout(function(){$("#noteBookReplyLabel").hide();clearTimeout(timeOut);$("#NoteBookModal").modal("hide");},800);
					}
					else if(data == "0"){
					   showCheckInfoLabel("#noteBookReplyLabel","留言回复失败！");
					}
			}  
		});
	}
}

function checkReplyNoteBook(){
	if($.trim($("#nb_noteReplayUser").val())==""){
		$("#nb_noteReplayUser")[0].focus();
		showCheckInfoLabel("#noteBookReplyLabel","请输入回复人！");
		return false;
	}
	if($.trim($("#nb_noteReplay").val())==""){
		$("#nb_noteReplay")[0].focus();
		showCheckInfoLabel("#noteBookReplyLabel","请输入回复内容！");
		return false;
	}
	return true;
}
function onKeyPressSearchNoteBookInput(event){
	onClickSearchNoteBookButton();
}
//点击查询按钮的事件处理
function onClickSearchNoteBookButton(){
	var table = $("#noteBookDataTable").DataTable();
	table.draw(); 
}

//统计行政许可
function onClickOfAdministratortiveLicenAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计服务 >> 网上办事 >> 统计行政许可");
			$("#articleCategory").val("070300"); 
			createArticleListDataTable();
		}
	});
}
//资料下载
function onClickOfDataDownloadAdminLink(tag){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(tag != 1) SKIN_TAG=false; 
	$("#mainContentDiv").load("listArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：栏目管理 >> 统计服务 >> 网上办事 >> 资料下载");
			$("#articleCategory").val("070400"); 
			createArticleListDataTable();
		}
	});
}

//************************************统计服务 end***************************************

//************************************信息公开 end*****************************************
/*
//信息公开指南
function onClickOfInfomationPublicGuideAdminLink(){
	loadEditArticlePage("当前您的位置：栏目管理 >> 信息公开 >> 信息公开指南","4");
}
//依申请公开
function onClickOfPublicOnApplyAdminLink(){
	loadEditArticlePage("当前您的位置：栏目管理 >> 信息公开 >> 依申请公开","5");
}*/

//********************************************左侧导航链接 end************************************** 

//*********************************************修改密码 start *****************************************
function saveNewPassword(){ //修改密码的保存按钮点击事件
	if(checkChangePasswordForm() == true){
		$.post(APP_PATH+"/loginServlet",
			 {opeType:"changePassword",oldPassword:hex_md5($("#oldPassword").val()),newPassword:hex_md5($("#newPassword").val())},
			 function(data,textStatus){
				  if(textStatus == "success"){
					  if(data == "0"){ //修改成功
						  $("#checkPasswordInfoLabel").text("修改成功！");
		  				  $("#checkPasswordInfoLabel").show();
		                  var timeOut=setTimeout(function(){$("#checkPasswordInfoLabel").hide();clearTimeout(timeOut);$("#changePasswordModal").modal("hide");},800);
					  }
					  else{
						  $("#oldPassword").val("");
						  $("#oldPassword")[0].focus();
						  showCheckInfoLabel("#checkPasswordInfoLabel","旧密码输入错误！");
					  }
				  }
			  });
		}
}

//修改密码表单校验
function checkChangePasswordForm(){
		if($("#oldPassword").val() == ""){
		  $("#oldPassword")[0].focus();
		  showCheckInfoLabel("#checkPasswordInfoLabel","请输入旧密码！");
		  return false;
	  }
	  
	  if($("#newPassword").val() == ""){
		  $("#newPassword")[0].focus();
		  showCheckInfoLabel("#checkPasswordInfoLabel","请输入新密码！");
		  return false;
	  }
	  
	  if($("#newPasswordConfirm").val() == ""){
		  $("#newPasswordConfirm")[0].focus();
		  showCheckInfoLabel("#checkPasswordInfoLabel","请再输入新密码！");
		  return false;
	  }
	  
	  if($("#newPassword").val() != $("#newPasswordConfirm").val()){
		  $("#newPasswordConfirm").val("");
		  $("#newPasswordConfirm")[0].focus();
		  showCheckInfoLabel("#checkPasswordInfoLabel","新密码确认不一致！");
		  return false;
	  }
	  return true;
}
//*********************************************修改密码 end *****************************************

//*********************************************用户管理页面 start ***********************************
//表单校验
function checkUserForm(){
	if($("#um_UserName").val() == ""){
		$("#um_UserName")[0].focus();
		showCheckInfoLabel("#checkUserInfoLabel","请输入用户名！");
		return false;
	}
	  
	if($("#um_UserPassword").val() == ""){
		$("#um_UserPassword")[0].focus();
		showCheckInfoLabel("#checkUserInfoLabel","请输入用户密码！");
		return false;
	}
	return true;
}

//保存用户的函数
function saveUser(){
	if(checkUserForm() == true){
		var realName = $("#um_RealName").val();
		var userRole = $("#um_UserRole").val();
		var userRemark = $("#um_UserRemark").val();
			
		$.post(APP_PATH+"/userAdminServlet",
			{  opeType:currOpeType,
			   userName:$("#um_UserName").val(),
			   realName:realName,
			   userRole:userRole,
			   password:hex_md5($("#um_UserPassword").val()),
			   userRemark:userRemark
			},
			function(data,textStatus){
			   if(textStatus == "success"){
				 if(data == "1"){
					var table = $("#userAdminDataTable").DataTable();
					table.draw();
					
					if(currOpeType == "addUser") $("#checkUserInfoLabel").text("添加用户成功！");
					else $("#checkUserInfoLabel").text("修改用户成功！");
		  			$("#checkUserInfoLabel").show();
		            var timeOut=setTimeout(function(){$("#checkUserInfoLabel").hide();clearTimeout(timeOut);$("#userModal").modal("hide");},800);
					  }
					else if(data == "0"){
					   $("#um_UserName").val("");
					   $("#um_UserName")[0].focus();
					   showCheckInfoLabel("#checkUserInfoLabel","用户名已经存在！");
					}
				}
		});
	}
}

//重置密码
function resetPassword(){
	$("#resetPasswordButton").attr("disabled","disabled");
	$.post(APP_PATH+"/userAdminServlet",
		{opeType:"resetUserPassword",userName:$("#um_UserName").val(),password:hex_md5("12345")},
		function(data,textStatus){
			if(textStatus == "success"){
				$("#resetPasswordButton").removeAttr("disabled");
					if(data == "1"){
						showCheckInfoLabel("#checkUserInfoLabel","密码重置成功！");
					}
					else{
						showCheckInfoLabel("#checkUserInfoLabel","密码重置失败！");
			}}});
}
//创建用户列表
function createUserDataTable(){
	$("#userAdminDataTable").dataTable({
		"ajax": 
		{
			"url":APP_PATH+"/userAdminServlet",
			"type":"POST"
		},
		"columns": [
			{ "data": "seqNo" },
			{ "data": "userName" },
			{ "data": "roleName" },
			{ "data": "realName" },
			{ "data": "passWord" },
			{ "data": "createTime" },
			{ "data": "lastLoginTime" },
			{ "data": "remark"},
			{ "data": ""}
		],
		"info":false,
		"searching":false,
		"paging":false,
		"destroy":true,
		"ordering":false,
		"serverSide":true,
		"language": {
			"lengthMenu": "每页显示 _MENU_ 条记录",
			"zeroRecords": "没有查询到数据",
			"search": "查找： _INPUT_",
			"infoEmpty": "",
			"processing": "正在加载数据...",
			"paginate": {"previous": "<<","next":">>"}
		},
		"columnDefs": [
			{ "targets": [0],"width":"45"},
			{ "targets": [1],"width":"110"},
			{ "targets": [2],"width":"110"},
			{ "targets": [3],"width":"110"},
			{ "targets": 4,"visible": false},
			{ "targets": [5],"width":"160"},
			{ "targets": [6],"width":"160"},
			{ "targets": [8],"width":"110","render":function(data,type,row){
				var linkStr="<a href='javascript:void(0);' onClick='onClickEditUserLink(\""+row.userName+"\",\""+row.roleName+"\",\""+row.realName+"\",\""+row.remark+"\");'>修改</a> | ";
				linkStr+="<a href='javascript:void(0);' onClick='onClickDelUserLink(\""+row.userName+"\");'>删除</a>";
				return linkStr;
			}}
		]
	}); 
}

//点击添加用户按钮的事件处理
function onClickAddUserButton(){
	currOpeType="addUser";
	$("#userModalLabel").text("添加用户");
	$("#um_UserName").removeAttr("disabled");
	$("#passwordGroup").show();
	$("#resetPasswordButton").hide();
	$("#userModal").modal("show");
}

//点击编辑用户按钮的事件处理
function onClickEditUserLink(userName,userRole,realName,userRemark){
	currOpeType="editUser";
	$("#userModalLabel").text("修改用户");
	$("#um_UserName").attr("disabled","disabled");
	$("#passwordGroup").hide();
	$("#resetPasswordButton").show();
	$("#um_UserName").val(userName);
	$("#um_UserRole").val(userRole);
	$("#um_RealName").val(realName);
	$("#um_UserPassword").val("12345");
	$("#um_UserRemark").val(userRemark);
	$("#userModal").modal("show");
}

//点击删除用户按钮的事件处理
function onClickDelUserLink(userName){
	if(userName=="superadmin"){ alert("超级管理员不允许删除！");return; }
	if(confirm("确实要删除用户\""+userName+"\"吗？")){
		var delArr = [];
		delArr.push(userName);
		$.post(APP_PATH+"/userAdminServlet",
		{opeType:"del",userNameArr:delArr.join(",")},
			function(data,textStatus){
				if(textStatus == "success"){
					if(data == "1"){
						//刷新用户列表
						var table = $("#userAdminDataTable").DataTable();
						table.draw();
					}
				}
		});
	}
}

function afterLoadUserAdmin(){
	createUserDataTable();
	$("#userAdminDataTable").css("text-align","center");
	$("#userAdminDataTable thead tr th").css("text-align","center");
		
	$("#userAdminDataTable tbody").on( "mouseover", "tr", function(){
			$(this).addClass("dataTable-Tr-Hover");
			$(this).children("td").addClass("dataTable-Tr-Hover");
    } );
		
	$("#userAdminDataTable tbody").on( "mouseout", "tr", function(){
			 $(this).removeClass("dataTable-Tr-Hover");
			 $(this).children("td").removeClass("dataTable-Tr-Hover");
    } );
}
//*********************************************用户管理页面 end ***********************************


//*********************************************角色管理页面 start *********************************

//表单校验
function checkRoleForm(){
	if($("#rm_RoleName").val() == ""){
		$("#rm_RoleName")[0].focus();
		showCheckInfoLabel("#checkRoleInfoLabel","请输入角色名！");
		return false;
	}
	  
	if($("#rm_RoleFunction").val() == ""){
		$("#rm_RoleFunction")[0].focus();
		showCheckInfoLabel("#checkRoleInfoLabel","请勾选功能！");
		return false;
	}
	return true;
}

//保存角色的函数
function saveRole(){
	if(checkRoleForm() == true){	
		$.post(APP_PATH+"/roleAdminServlet",
			{  opeType:currOpeType,
			   roleName:$("#rm_RoleName").val(),
			   roleFunction:$("#rm_RoleFunction").val()
			},
			function(data,textStatus){
			   if(textStatus == "success"){
				 if(data == "1"){
					//刷新表格
					var table = $("#roleAdminDataTable").DataTable();
					table.draw();
					if(currOpeType == "addRole") $("#checkRoleInfoLabel").text("添加角色成功！");
					else $("#checkRoleInfoLabel").text("修改角色成功！");
		  			$("#checkRoleInfoLabel").show();
		            var timeOut=setTimeout(function(){$("#checkRoleInfoLabel").hide();clearTimeout(timeOut);$("#roleModal").modal("hide");},800);
					  }
					else if(data == "0"){
					   $("#rm_RoleName").val("");
					   $("#rm_RoleName")[0].focus();
					   showCheckInfoLabel("#checkRoleInfoLabel","角色名已经存在！");
					}
				}
		});
	}
}

//点击添加角色按钮的事件处理
function onClickAddRoleButton(){
	currOpeType="addRole";
	$("#roleModalLabel").text("添加角色");
	$("#rm_RoleName").removeAttr("disabled");
	$("#roleModal").modal("show");
}

//点击编辑角色按钮的事件处理
function onClickEditRoleLink(roleName,roleFun){
	currOpeType="editRole";
	$("#roleModalLabel").text("修改角色");
	$("#rm_RoleName").attr("disabled","disabled");
	 
	$("#rm_RoleName").val(roleName);
	$("#rm_RoleFunction").val(roleFun);
	$("#roleModal").modal("show");
}

//点击删除角色按钮的事件处理
function onClickDelRoleLink(roleName){
	if(roleName=="超级管理员"){ alert("超级管理员不允许删除！");return; }
	if(confirm("确实要删除角色\""+roleName+"\"吗？")){
		var delArr = [];
		delArr.push(roleName);
			 
		$.post(APP_PATH+"/roleAdminServlet",
		{opeType:"delRole",roleNameArr:delArr.join(",")},
			function(data,textStatus){
				if(textStatus == "success"){
					if(data == "1"){
						//刷新表格
						var table = $("#roleAdminDataTable").DataTable();
						table.draw();
					}
				}
		});
	}
}

//创建角色列表
function createRoleDataTable(){
	$('#roleAdminDataTable').dataTable({
		"ajax": APP_PATH+"/roleAdminServlet",
		"columns": [
			{ "data": "seqNo" },
			{ "data": "roleName" },
			{ "data": "roleFunction" },
			{ "data": "createUser" },
			{ "data": "createTime" },
			{ "data": ""}
		],
		"info":false,
		"searching":false,
		"paging":false,
		"destroy":true,
		"ordering":false,
		"serverSide":true,
		"language": {
			"lengthMenu": "每页显示 _MENU_ 条记录",
			"zeroRecords": "没有查询到数据",
			"search": "查找： _INPUT_",
			"paginate": {"previous": "<<","next":">>"}
		},
		"columnDefs": [
			{ "targets": [0],"width":"45"},
			{ "targets": [1],"width":"120"},
			{ "targets": [3],"width":"120"},
			{ "targets": [4],"width":"160"},
			{ "targets": [5],"width":"110","render":function(data,type,row){
				var linkStr="<a href='javascript:void(0);' onClick='onClickEditRoleLink(\""+row.roleName+"\",\""+row.roleFunction+"\");'>修改</a> | ";
				linkStr+="<a href='javascript:void(0);' onClick='onClickDelRoleLink(\""+row.roleName+"\");'>删除</a>";
				return linkStr;
			}}
		]
	}); 
}

//加载角色管理页面之后的处理
function afterLoadRoleAdmin(){
	createRoleDataTable();
	$("#roleAdminDataTable").css("text-align","center");
	$("#roleAdminDataTable thead tr th").css("text-align","center");
			
	$("#roleAdminDataTable tbody").on( "mouseover", "tr", function(){
			$(this).addClass("dataTable-Tr-Hover");
			$(this).children("td").addClass("dataTable-Tr-Hover");
    } );
		
	$("#roleAdminDataTable tbody").on( "mouseout", "tr", function(){
			 $(this).removeClass("dataTable-Tr-Hover");
			 $(this).children("td").removeClass("dataTable-Tr-Hover");
    } );
}

//*********************************************角色管理页面 end ***********************************
 
//*********************************************文章的管理 start ***********************************
//创建文章列表
function createArticleListDataTable(){
	
	$("#listArticleDataTable").dataTable({ 
		"ajax": 
			{
				"url":APP_PATH+"/articleServlet",
				"type":"POST",
				"data":function(param){
					param.opeType="queryArticleListByCategory";
					param.category=$("#articleCategory").val();
					if(param.category != "020101") param.searchKeyWords=$("#searchArticleKey").val();
					else {
						param.searchKeyWords=$.trim($("#ganzhouCityBtn").text()).substr(0,2);
					}
				},
				"complete":function(){
					addCssOnDataTable("listArticleDataTable");
					//文章标题列居左显示
					$("#listArticleDataTable tbody").find("tr td").each(function(i){
						if(i%8 == 1 || i%8 == 0){
							$(this).css("text-align","left");
							$(this).css("text-indent","5px");
						}
					});
					
					if($("#listArticleDataTable tbody tr td").length == 1){//没有查询到记录，隐藏搜索框
						$("#listArticleDataTable_paginate").hide();
					}
					else{
						$("#listArticleDataTable_paginate").show();
					}
					//年度公报 隐藏搜索框
					if($("#articleCategory").val() == "020100"){
						$("#articleTabTd2").hide();$("#articleTabTd3").hide();
					}
					else if($("#articleCategory").val() == "020101"){
						$("#articleTabTd2").hide();
						$("#articleTabTd4").show();
					}
					$("#CheckBoxAll")[0].checked=false;
					if(SKIN_TAG == false){
						var pageInfoStr=$("#listArticleDataTable_info").text();
						CURR_PAGE=parseInt((pageInfoStr.substring(pageInfoStr.indexOf("第")+1,pageInfoStr.length-1)),10);
					}
					else{ //跳转 
						if(CURR_PAGE-1 > 0){
							var table = $('#listArticleDataTable').DataTable();
							table.page( CURR_PAGE-1 ).draw( false );
						}
						SKIN_TAG=false;
					}
				} 
			},
		"columns": [ 
			{ "data": "id" },
			{ "data": "seqNo" },
			{ "data": "title" },
			{ "data": "origin" },
			{ "data": "author" },
			{ "data": "browseCount" },
			{ "data": "isPublished" },
			{ "data": "publishTime" },
			{ "data": "" },
			{ "data": "addUser" },
			{ "data": "addTime" },
			{ "data": "keyWords" },
			{ "data": "category" }
		],
		 "columnDefs": [ 
            { "targets": [0],"visible":false},
			{ "targets": [1],"width":"50","render":function(data,type,row){
				return "<input type=\"checkbox\" id=\"cb_"+row.id+"\" onClick='onClickArticleCheckBox();' style=\"margin-right:5px; margin-top:5px;\" class=\"cb\"/>"+row.seqNo;
			 }},
			{ "targets": [3],"width":"115","render":function(data,type,row){
				if($("#articleCategory").val() == "070600"){
					return "<a href='javascript:void(0)' onClick='onClickOfShowOpinions("+row.id+",\""+encodeURIComponent(row.title)+"\")'>"+"查看意见"+"</a>";
				}
				else{
					return row.origin;
				}
			}},
			{ "targets": [4],"width":"85"},
			{ "targets": [5],"width":"68"},
			{ "targets": [7],"width":"155"},
			{ "targets": [8],"width":"150","render":function(data,type,row){
				var linkStr="<a href='javascript:void(0);' onClick='onClickOfArticleTitleLink("+row.id+");'>修改</a> | ";
				linkStr+="<a href='javascript:void(0);' onClick='onClickDelArticleLink("+row.id+");'>删除</a> | ";
				linkStr+="<a href='javascript:void(0);' onClick='onClickMoveArticleLink("+row.id+",\""+row.category+"\");'>移动</a> | ";
				if(row.isPublished == "0") linkStr+="<a href='javascript:void(0);' onClick='onClickPublishArticleLink("+row.id+")'>发布</a>";
				else linkStr+="<a disabled='disabled' style='color:#cccccc;'>发布</a>";
				return linkStr;
			}},
            { "targets": [9],"visible": false,"searchable": false},
			{ "targets": [10],"visible": false,"searchable": false},
			{ "targets": [11],"visible": false,"searchable": false},
			{ "targets": [12],"visible": false,"searchable": false},
			{ "targets": [6],"width":"77","render": function(data,type,row){ 
			 if(data == "1") return "是";else return "否";
			 }},
			{ "targets": [2],"render":function(data,type,row){
				return "<a class='article-Title-Link' href='javascript:void(0);' onClick='onClickOfArticleTitleLink2("+row.id+","+row.isPublished+");'>"+data+"</a><input type='hidden' value='"+row.id+"'></input>"; 
			}}
        ],
		"info":true,
		"searching":false,
		"paging":true,
		"destroy":true,
		"processing":true,
		"serverSide":true,
		"ordering":false,
		"displayLength":12,
		"lengthChange": false,
		"order": [[10, "desc" ]], //按照文章创建的时间排序
		"language": {
			"lengthMenu": "每页显示 _MENU_ 条记录",
			"zeroRecords": "没有查询到数据",
			"search": "查找： _INPUT_",
			"info":"共 _PAGES_ 页，_MAX_ 条记录，当前第 _PAGE_ 页",
			"infoEmpty": "",
			"processing": "正在加载数据...", 
			"paginate": {"previous": "<<","next":">>"}
		}
	});
}

//移动文章到另外一个模块
function onClickMoveArticleLink(articleID,articleCategory){
	$("#moveArticleModal").modal("show"); 
	selectMainCategory(getCategoryTextByVal(articleCategory));
	$("#moveArticleID").val(articleID);
	$("#unmoveArticleCategory").val(articleCategory);
}

//移动文章
function moveArticle(){
	if($("#unmoveArticleCategory").val()!=$("#moveArticleCategory").val()){
		$.post(APP_PATH+"/articleServlet",
			{
				opeType:"editArticle",
				id:$("#moveArticleID").val(),
				category:$("#moveArticleCategory").val()
			},
			 function(data,textStatus){
				if(textStatus == "success"){
					if(data.result == "1"){
						$("#moveArticleModal").modal("hide");
						onClickSearchArticleButton();
					}
				}
		},"json");
	}
	else $("#moveArticleModal").modal("hide"); 
}

var categoryObj={
	"统计业务" : [
		{n : "市级工作动态",v : "030100"},
		{n : "县级工作动态",v : "030101"},
		{n : "公告通知",v : "030300"},
		{n : "领导讲话",v : "030400"},
		{n : "工作交流",v : "030500"},
		{n : "统计风采",v : "030700"}
	],
	"统计数据" : [
		{n : "全市年度公报",v : "020100"},
		{n : "各县年度公报",v : "020101"},
		{n : "普查公报",v : "020200"}
	],
	"统计分析" : [
		{n : "市级简要信息",v : "040100"},
		{n : "县级简要信息",v : "040101"},
		{n : "市级运行分析",v : "040200"},
		{n : "县级运行分析",v : "040201"},
		{n : "综合调研",v : "040300"},
		{n : "经济观点",v : "040400"}
	],
	"统计建设" : [
		{n : "党建工作",v : "030800"},
		{n : "纪检监察",v : "030900"},
		{n : "教育培训",v : "031000"}
	],
	"统计知识" : [
		{n : "统计制度",v : "050100"},
		{n : "统计标准",v : "050200"},
		{n : "统计指标",v : "050300"},
		{n : "统计科普",v : "050400"},
		{n : "统计知识",v : "050500"}
	],
	"经济要闻" : [
		{n : "国际要闻",v : "060100"},
		{n : "国内要闻",v : "060200"},
		{n : "观点荟萃",v : "060300"}
	],
	"统计服务" : [
		{n : "考试动态",v : "070500"},
		{n : "考试文件",v : "070100"},
		{n : "表格下载",v : "070200"},
		{n : "统计行政许可",v : "070300"},
		{n : "软件下载",v : "070400"},
		{n : "意见征集",v : "070600"}
	],
	"1%人口抽样调查" : [
		{n : "工作要闻",v : "080100"},
		{n : "文件通知",v : "080101"},
		{n : "各地交流",v : "080102"}
	]
};

function getCategoryTextByVal(val){
	var fix = val.substr(0,2);
	switch(fix){
		case "07" : return "统计服务";
		case "06" : return "经济要闻";
		case "05" : return "统计知识";
		case "04" : return "统计分析";
		case "02" : return "统计数据";
		case "08" : return "1%人口抽样调查";
		case "03" : {
			if(val>"0308") return "统计建设";
			else return "统计业务";
		}
	}
}
	
function selectMainCategory(text){
	if(text != $.trim($("#selectMainCategoryBtn").text())){
		$("#selectMainCategoryBtn").html(text+"&nbsp;<span class='caret'>");
		var htmlStr = "";
		for(var i=0;i<categoryObj[text].length;i++){
			htmlStr +="<li><a href=\"javascript:void(0);\" onclick=\"selectCategoryValue('"+categoryObj[text][i].v+"','"+categoryObj[text][i].n+"');\">"+categoryObj[text][i].n+"</a></li>";
		}
		$("#subCategoryUl").html(htmlStr);
		selectCategoryValue(categoryObj[text][0].v,categoryObj[text][0].n);
	}
}

function selectCategoryValue(val,name){
	$("#selectSubCategoryBtn").html(name+"&nbsp;<span class='caret'>");
	$("#moveArticleCategory").val(val);
}

function onClickOfArticleTitleLink2(articleID,isPublished){
	 if(parseInt(isPublished) == 1){
		 window.open("../article.html?id="+articleID,"_blank");
	 }
	 else{ 
		 onClickOfArticleTitleLink(articleID);
	 }
}

//datatables组件加载完之后添加样式
function addCssOnDataTable(dataTableID){
	$("#"+dataTableID).css("text-align","center");
	$("#"+dataTableID+" thead tr th").css("text-align","center");
	 
	$("#"+dataTableID+" thead tr th").css("vertical-align","middle");
	$("#"+dataTableID+" tbody tr td").addClass("dataTable-td-valign");
		
	$("#"+dataTableID+" tbody").on( "mouseover", "tr", function(){
		$(this).addClass("dataTable-Tr-Hover");
		$(this).children("td").addClass("dataTable-Tr-Hover");
    } );
		
	$("#"+dataTableID+" tbody").on( "mouseout", "tr", function(){
		$(this).removeClass("dataTable-Tr-Hover");
		$(this).children("td").removeClass("dataTable-Tr-Hover");
    } );
}

//搜索文本框按下回车键的处理
function onKeyPressSearchArticleInput(event){
	if(event.keyCode == 13){//按下回车键，启动搜索
		 onClickSearchArticleButton();
	}
}

//年度公报--各县选择县市区
function selectGanZhouCity(city){
	if($.trim($("#ganzhouCityBtn").text()) != city){
		$("#ganzhouCityBtn").html(city+"&nbsp;<span class=\"caret\"/>");
		onClickSearchArticleButton();
	}
}

//点击搜索按钮时的处理函数
function onClickSearchArticleButton(){
	var table = $('#listArticleDataTable').DataTable();
	if(table != undefined && table != null) table.draw();
}

//全选 checkBox
function onClickCheckAllBox(){
	var b=$("#CheckBoxAll")[0].checked;
	$(".cb").each(function(){
		$(this)[0].checked=b;
	});
}

//每行的checkBox
function onClickArticleCheckBox(){
	for(var i=0;i<$(".cb").length;i++){
		if($(".cb")[i].checked == false){
			$("#CheckBoxAll")[0].checked=false;
			return;
		}
	}
	$("#CheckBoxAll")[0].checked=true;
}

//点击删除按钮
function onClickBatchDelArticle(){
	var delRecordArr=[];
	$(".cb").each(function(){
		if($(this)[0].checked==true){
			delRecordArr.push($(this)[0].id.substring(3));
		}
	});
	
	if(delRecordArr.length>0){
		currOpeType="batchDel";
		if(confirm("确实要删除所选文章吗？")){
			$.post(APP_PATH+"/articleServlet",
			{
				opeType:currOpeType,
				ids:delRecordArr.join("-")
			},
			 function(data,textStatus){
				if(textStatus == "success"){ 
					if(data.result == "1"){//删除成功
						//获取当前记录数 
						if($(".cb").length == delRecordArr.length) CURR_PAGE = CURR_PAGE-1;
						if(CURR_PAGE<1) CURR_PAGE=1;
						var table = $('#listArticleDataTable').DataTable();
						table.page(CURR_PAGE-1).draw(false);
						SKIN_TAG = false;
					}
				}
			},"json");//post
		}//if confirm
	}
}

//点击删除链接的处理函数
function onClickDelArticleLink(articleID){
	if(articleID != undefined && articleID != null){
		currOpeType="delArticle";
		if(confirm("确实要删除这篇文章吗？")){
			$.post(APP_PATH+"/articleServlet",
			{
				opeType:currOpeType,
				id:articleID
			},
			 function(data,textStatus){
				if(textStatus == "success"){ 
					if(data.result == "1"){//删除成功
						//获取当前记录数
						var currRecordNum = $("#listArticleDataTable tbody tr").length;
						if(currRecordNum == 1) CURR_PAGE = CURR_PAGE-1;
						if(CURR_PAGE<1) CURR_PAGE=1;
						var table = $('#listArticleDataTable').DataTable();
						table.page(CURR_PAGE-1).draw(false);
						SKIN_TAG = false;
					}
				}
			},"json");//post
		}//if confirm
	}
}

//点击文章标题时的处理函数
function onClickOfArticleTitleLink(articleID){
	if(articleID != undefined && articleID != null){
		loadEditArticlePage($("#currPosInfoDiv").text()+" >> 修改文章",articleID,$("#articleCategory").val(),$("#articleSubjectName").val(),$("#articleSubjectId").val(),$.trim($("#ganzhouCityBtn").text()));
	}
}

//点击发布文章链接时的处理函数
function onClickPublishArticleLink(articleID){
	if(articleID != undefined && articleID != null){
		currOpeType="publishArticle";
		if(confirm("确实要发布这篇文章吗？")){
			$.post(APP_PATH+"/articleServlet",
			{ 
				opeType:currOpeType,
				id:articleID,
			},
			 function(data,textStatus){
				if(textStatus == "success"){
					if(data.result == "1"){//发布成功
						alert("发布成功！");
						var table = $('#listArticleDataTable').DataTable();
						table.page(CURR_PAGE-1).draw(false);
						SKIN_TAG = false;  
					}
				}
			},"json");
		}
	}
}

//点击添加文章时的处理函数
function onClickAddNewArticle(){
	loadEditArticlePage($("#currPosInfoDiv").text()+" >> 添加文章","",$("#articleCategory").val(),$("#articleSubjectName").val(),$("#articleSubjectId").val(),$.trim($("#ganzhouCityBtn").text()));
}

//保存文章
function saveArticle(){
	if(checkArticleForm() == false) return;
	if($("#articleId").val() !=""){//编辑的状态
		$.post(APP_PATH+"/articleServlet",
			{
				opeType:"editArticle",
				id:$("#articleId").val(),
				title:$.trim($("#articleTitle").val()),
				origin:$.trim($("#articleOrigin").val()),
				author:$.trim($("#articleAuthor").val()),
				content:thisUEditor.getContent()
			},
			 function(data,textStatus){
				if(textStatus == "success"){
					if(data.result == "1"){
						alert("保存成功！");
						if($("#articleCategory").val()!=""){
							backArticleListPage();//返回文章列表
						}
					}
				}
		},"json");
	}
	else{//保存新的文章
		$.post(APP_PATH+"/articleServlet",
			{
				opeType:"addNewArticle",
				category:$("#articleCategory").val(),
				title:$.trim($("#articleTitle").val()),
				origin:$.trim($("#articleOrigin").val()),
				author:$.trim($("#articleAuthor").val()),
				content:thisUEditor.getContent()
			},
			 function(data,textStatus){
				if(textStatus == "success"){
					if(data.result == "1"){
						alert("保存成功！");
						if($("#articleCategory").val()!=""){
							backArticleListPage();//返回文章列表
						}
					}
				}
		},"json");
	}
}

//文章页面保存之前的校验
function checkArticleForm(){
	if($("#articleFormZoneDiv").css("display") =="none") return true;//不做校验
	if($.trim($("#articleTitle").val())==""){//文章标题一定要有
		alert("请输入文章标题！");
		$("#articleTitle")[0].focus();
		return false;
	}
	if($.trim($("#articleOrigin").val())==""){//文章来源一定要有
		alert("请输入文章来源！");
		$("#articleOrigin")[0].focus();
		return false;
	}
	if($.trim(thisUEditor.getContent())==""){//文章内容要有
		alert("请输入文章内容！");
		thisUEditor.focus();
		return false;
	}
	return true;
}

//修改文章页面点击返回文章列表时按钮的处理函数
function backArticleListPage(){
	var articleCategory=$("#articleCategory").val();
	SKIN_TAG = true;
	if(articleCategory != null && articleCategory !=""){
		
		if($("#articleSubjectName").length>0 && $("#articleSubjectName").val() !="" && $("#articleSubjectId").length>0 && $("#articleSubjectId").val() != ""){
			openSubjectArticleList($("#articleSubjectName").val(),$("#articleSubjectId").val(),1);
		}
		else{
		  switch(articleCategory){
			//走进统计
			case "010400":onClickOfStatisticsRuleAdminLink(1);break;//统计法规
			//失信企业信息管理
			case "010600":onClickOfDisHonestyComponyAdminLink(1);break;
			//统计数据
			case "020100":onClickOfYearBulletinAdminLink(1);break;//年度公报(全市)
			case "020101":onClickOfYearBulletin2AdminLink($("#articleCityName").val(),1);break;//年度公报(各县)
			case "020200":onClickOfGeneralSurveyBulletinAdminLink(1);break;//普查公报
			//统计业务
			case "030100":onClickOfWorkStateAdminLink(1);break;//市级工作动态
			  case "030101":onClickOfWorkStateAdminLink2(1);break;//县级工作动态
			case "030300":onClickOfPublicNoticeAdminLink(1);break;//公告通知
			case "030400":onClickOfLeaderSpeakAdminLink(1);break;//领导讲话
			case "030500":onClickOfWorkCommunicateAdminLink(1);break;//工作交流
			case "030700":onClickOfStatisticsMienAdminLink(1);break;//统计风采
			case "030800":onClickOfPartBuildingAdminLink(1);break;//党建工作
			case "030900":onClickOfInspectionWorkAdminLink(1);break;//纪检监察
			case "031000":onClickOfEducationTrainAdminLink(1);break;//教育培训
			//统计分析
			case "040100":onClickOfBriefInfoAdminLink(1);break;//市级简要信息
			case "040101":onClickOfBriefInfoAdminLink2(1);break;//县级简要信息
			case "040200":onClickOfRunningAnalysisAdminLink(1);break;//市级运行分析
			  case "040201":onClickOfRunningAnalysisAdminLink2(1);break;//县级运行分析
			case "040300":onClickOfSynthesizeSurveyAdminLink(1);break;//综合调研
			case "040400":onClickOfEconomyViewpointAdminLink(1);break;//经济观点
			//统计知识
			case "050100":onClickOfStatisticsSystemAdminLink1(1);break;//统计制度
			
			case "050200":onClickOfStatisticsStandardAdminLink(1);break;//统计标准
			case "050300":onClickOfStatisticsIndexdAdminLink(1);break;//统计指标
			case "050400":onClickOfStatisticsPopulardAdminLink(1);break;//统计科普
			case "050500":onClickOfStatisticsKnowledgeAdminLink(1);break;//统计知识
			//经济要闻
			case "060100":onClickOfInternationalNewsAdminLink(1);break;//国际要闻
			case "060200":onClickOfCivilNewsAdminLink(1);break;//国内要闻
			case "060300":onClickOfViewpointAssembleAdminLink(1);break;//观点荟萃
			
			//统计服务
			case "070100":onClickOfQualificationTestInfoAdminLink(1);break;//考试文件
			case "070200":onClickOfQualificationTestTableAdminLink(1);break;//表格下载
			case "070300":onClickOfAdministratortiveLicenAdminLink(1);break;//统计行政许可
			case "070400":onClickOfDataDownloadAdminLink(1);break;//资料下载
			case "070500":onClickOfQualificationTestDynamicAdminLink(1);break;//考试动态
			 case "070600":onClickOfOpinionCollect(1);break;//意见征集
			  case "070701":onClickOfProjectProcedureAdminLink(1);break;//地方统计调查项目管理-办事程序
			  case "070702":onClickOfProjectTableDownloadAdminLink(1);break;//地方统计调查项目管理-表格下载

			  //1%人口抽样调查专题
			  case "080100":onClickOfCensusWorkNewsAdminLink(1);break;//工作要闻
			  case "080101":onClickOfCensusWorkFilesAdminLink(1);break;//文件通知
			  case "080102":onClickOfWorkExchangeAdminLink(1);break;//各地交流
		  }
		}
	}
}

//加载编辑文章的页面
function loadEditArticlePage(currPosInfo,articleId,articleCategory,subjectName,subjectId,cityName){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	if(isEditorDestory == false) return;
	$("#mainContentDiv").load("editArticle.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text(currPosInfo);
			if(articleCategory != undefined){
				$("#articleCategory").val(articleCategory);
				if(articleCategory !="010300") $("#backArticleListButton").show();
				$("#articleFormZoneDiv").show();
				
				if(subjectName != undefined && subjectName !="") 
					$("#articleSubjectName").val(subjectName);
				if(subjectId != undefined && subjectId !="") 
					$("#articleSubjectId").val(subjectId);
				if(cityName != undefined && cityName !="") 
					$("#articleCityName").val(cityName);
			}
			else{
				$("#articleCategory").val("");
				$("#intervalDivZone").show();
			}
			
			$("#articleTitle")[0].focus();//文章标题文本框获取焦点
			
			var initHeightObj={};
			initHeightObj.initialFrameHeight = $("#mainContentDiv")[0].offsetHeight-$("#operatorButtonDiv")[0].offsetHeight-$("#articleFormZoneDiv")[0].offsetHeight-127;
			thisUEditor = UE.getEditor("UEditorContainer",initHeightObj);
			 
			thisUEditor.ready(function(){ 
				isEditorDestory=false;
				
				if(articleId != ""){ //修改文章的页面
					$("#articleId").val(articleId);
					//ajax请求，获取文章 start*****************************************
					$.post(APP_PATH+"/articleServlet",
					{
						opeType:"queryArticleById",
						id:$("#articleId").val()
					},
			 		function(data,textStatus){
						if(textStatus == "success"){ 
						 	$("#articleId").val(data.id);
						 	$("#articleTitle").val(data.title);
						 	$("#articleOrigin").val(data.origin);
						 	$("#articleAuthor").val(data.author);
						 	thisUEditor.setContent(data.content);
						 	var articleInfo="创建人："+data.addUser+"&nbsp;&nbsp;&nbsp;&nbsp;创建时间："+data.addTime;
						 	if(data.isPublished == "1"){//已发布
							 	articleInfo+="&nbsp;&nbsp;&nbsp;&nbsp;发布时间："+data.publishTime+"&nbsp;&nbsp;&nbsp;&nbsp;浏览次数："+data.browseCount;
						 	}
						 	else{
							 	articleInfo+="&nbsp;&nbsp;&nbsp;&nbsp;尚未发布";
						 	}
						 	$("#articleInfoText").html(articleInfo);
						}
					},"json");
				//ajax请求，获取文章 end********************************************
				}
				else{//新添加文章的页面
					$("#articleInfoText").hide();
				} 
			}); 
		}
	});
}

//*********************************************文章的管理 end  ************************************

//意见征集
function onClickOfShowOpinions(articleId,articleTitle){
	if(thisUEditor != null && isEditorDestory == false){
		thisUEditor.destroy();
		isEditorDestory=true;
	}
	SKIN_TAG=false;
	$("#mainContentDiv").load("listOpinions.html",function(responseText,textStatus,XMLHttpRequest){
		if(textStatus == "success"){
			$("#currPosInfoDiv").text("当前您的位置：系统管理 >> 栏目管理 >> 统计服务 >> 意见征集 >> 查看意见");
			$("#opinionSubjectName").text("网友对：\""+decodeURIComponent(articleTitle)+"\"提交的意见：");
			$("#opinionsArticleId").val(articleId);
			createOpinionsListDataTable();
		}
	});
}

function createOpinionsListDataTable(){
	$("#listOpinionsDataTable").dataTable({
		"ajax":
		{
			"url":APP_PATH+"/opinionsServlet",
			"type":"post",
			"data":function(param){
				param.opeType="queryAll";
				param.isPublic = "1";
				param.articleId=$("#opinionsArticleId").val();
			},
			"complete":function(){
				//指标列居左显示
				$("#listOpinionsDataTable tbody").find("tr td").each(function(i){
					if(i%6 == 1){
						$(this).css("text-align","left");
						$(this).css("text-indent","5px");
					}
				});
				addCssOnDataTable("listOpinionsDataTable");
			}
		},
		"columns": [
			{ "data": "id" },
			{ "data": "" },
			{ "data": "subject" },
			{ "data": "nickName" },
			{ "data": "email" },
			{ "data": "tel" },
			{ "data": "address" },
			{ "data": "createTime" },
			{ "data": ""},
			{ "data": "content"}
		],
		"columnDefs": [
			{ "targets": [0],"visible":false},
			{ "targets": [1],"width":"50","render":function(data,type,row){
				return "<input type=\"checkbox\" id=\"cb_"+row.id+"\" onClick='onClickArticleCheckBox();' style=\"margin-right:5px; margin-top:5px;\" class=\"cb\"/>"+row.seqNo;
			}},
			{ "targets": [3],"width":"90"},
			{ "targets": [4],"width":"90"},
			{ "targets": [5],"width":"90"},
			{ "targets": [7],"width":"120"},
			{ "targets": [8],"width":"80","render":function(data,type,row){
				var linkStr="<a href='javascript:void(0);' onClick='onClickOfViewOpinionsLink(this)'>查看</a> | ";
				linkStr+="<a href='javascript:void(0);' onClick='onClickDelOpinionsLink("+row.id+");'>删除</a>";
				linkStr +="<input type='hidden' value='"+row.content+"'/>";
				return linkStr;
			}},
			{ "targets": [9],"visible":false}
		],
		"info":true,
		"searching":false,
		"paging":true,
		"destroy":true,
		"processing":true,
		"serverSide":true,
		"ordering":false,
		"displayLength":12,
		"lengthChange": false,
		"order": [[7, "desc" ]], //按照文章创建的时间排序
		"language": {
			"lengthMenu": "每页显示 _MENU_ 条记录",
			"zeroRecords": "没有查询到数据",
			"search": "查找： _INPUT_",
			"info":"共 _PAGES_ 页，_MAX_ 条记录，当前第 _PAGE_ 页",
			"infoEmpty": "",
			"processing": "正在加载数据...",
			"paginate": {"previous": "<<","next":">>"}
		}
	});
}

function onClickDelOpinionsLink(id){
	if(id != undefined && id != null){
		currOpeType="delOpinions";
		if(confirm("确实要删除这条意见吗？")){
			$.post(APP_PATH+"/opinionsServlet",
				{
					opeType:"delOpinions",
					id:id
				},
				function(data,textStatus){
					if(textStatus == "success"){
						if(data.result == "1"){//删除成功
							//获取当前记录数
							var currRecordNum = $("#listOpinionsDataTable tbody tr").length;
							if(currRecordNum == 1) CURR_PAGE = CURR_PAGE-1;
							if(CURR_PAGE<1) CURR_PAGE=1;
							var table = $('#listOpinionsDataTable').DataTable();
							table.page(CURR_PAGE-1).draw(false);
							SKIN_TAG = false;
						}
					}
				},"json");//post
		}//if confirm
	}
}

//点击删除按钮
function onClickBatchDelOpinions(){
	var delRecordArr=[];
	$(".cb").each(function(){
		if($(this)[0].checked==true){
			delRecordArr.push($(this)[0].id.substring(3));
		}
	});

	if(delRecordArr.length>0){
		currOpeType="batchDelOpinions";
		if(confirm("确实要删除所选意见吗？")){
			$.post(APP_PATH+"/opinionsServlet",
				{
					opeType:currOpeType,
					ids:delRecordArr.join("-")
				},
				function(data,textStatus){
					if(textStatus == "success"){
						if(data.result == "1"){//删除成功
							//获取当前记录数
							if($(".cb").length == delRecordArr.length) CURR_PAGE = CURR_PAGE-1;
							if(CURR_PAGE<1) CURR_PAGE=1;
							var table = $('#listOpinionsDataTable').DataTable();
							table.page(CURR_PAGE-1).draw(false);
							SKIN_TAG = false;
						}
					}
				},"json");//post
		}//if confirm
	}
}

function onClickOfViewOpinionsLink(e){
	var content = $(e).siblings("input").val();
	$("#opinionsTextArea").val(content);
	$("#OpinionsModal").modal("show");
}