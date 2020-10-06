/**
 * 获取存到cookie中的用户登录信息。
 */
var cookie = $.cookie("userjson");
if (cookie != null && cookie != '') {
	var mydata = $.parseJSON(cookie);
	window.sessionStorage.setItem("userjson", cookie);
	if (mydata.user.sex == "男") {
		$("#username").html(mydata.user.name + " 先生");
		$("#username1").html(mydata.user.name + " 先生");
	} else if (mydata.user.sex == "女") {
		$("#username").html(mydata.user.name + " 女士");
		$("#username1").html(mydata.user.name + " 女士");
	} else {
		$("#username").html(mydata.user.name + "");
		$("#username1").html(mydata.user.name + "");
	}
	$("#useremail").html(mydata.user.email);
	$(".loginregsiter").css('display', 'none');
	$(".loginregsiter1").css('display', 'black');
	if (mydata.user.userphoto != '') {
		$("#userphoto").attr("src", mydata.user.userphoto);
	}
	if (mydata.user.approvestate == "UNDER_REVIEW") {
		$("#rzidcard").removeAttr("onclick");
		$("#rzidcard").removeAttr("class");
		$("#rzidcard").html("审核中");
	} else if (mydata.user.approvestate == "AUTHENTICATED") {
		$("#rzidcardimg").attr("src", "images/p13_pic01.png")
		$("#rzidcard").removeAttr("onclick");
		$("#rzidcard").removeAttr("class");
		$("#rzidcard").html("已认证");
	} else if (mydata.user.approvestate == "FAIL") {
		$("#rzidcardspan").html("认证失败！请上传清晰的手持身份证照片并重新认证，审核将在3-5个工作日完成");
	}
}
else{
	$(".loginregsiter1").css('display', 'none');
}

/**
 * 查询渲染资讯/常识/吉日/问答页面
 * @param {Object} index 页数
 * @param {Object} pagsize 每页显示的个数
 */
function getMessage(url, index, pagSize) {
	var star = 0;
	var psize = pagSize;
	if (index > 1) {
		star = (index - 1) * psize;
	}
	$.getJSON(url, function(data) {
		var str = "<ul class=\"pl-0 mb-0\">";
		var all = 0;
		all = data.length;
		if (all % psize == 0) {
			all = parseInt(all / psize);
		} else {
			all = parseInt(all / psize) + 1;
		}
		psize += star;
		if (psize >= data.length) {
			psize = data.length;
		}
		for (var i = star; i < psize; i++) {
			str += "<li class=\"d-flex align-items-center procontent py-3 border-bottom\"> " +
				"	<a href=\"javascript:void(0)\" onclick='queryMessageDetailSerialNumber(\"" + url + "\"," + (i + 1) + ")'>" +
				"		<img src=\"images/qgarticlethumb.png\" alt class=\"pro-img\">" +
				"	</a>" +
				"	<div class=\"article-content\">" +
				"		<a href=\"javascript:void(0)\" class=\"tit\" onclick='queryMessageDetailSerialNumber(\"" + url + "\"," + (i +
					1) + ")'>" + data[i].title + "</a> " +
				"		<a href=\"javascript:void(0)\" class=\"desc\" onclick='queryMessageDetailSerialNumber(\"" + url + "\"," + (i +
					1) + ")'>" + data[i].describe + "</a>" +
				"		<a href=\"javascript:void(0)\" class=\"text-muted\" onclick='queryMessageDetailSerialNumber(\"" + url + "\"," +
				(i + 1) + ")'>" + data[i].time + "</a>" +
				"	</div>" +
				"</li>";
		}
		str += "</ul>";
		$("#mymessage").html(str);
		var up = 0;
		var down = 0;
		str = "<ul class=\"pagination\">";
		if (index <= 1) {
			str += "<li class=\"disabled\"><span>&laquo;</span></li>";
		} else {
			up = index - 1;
			str += "<li class=\"disabled\"><a href=\"javascript:void(0)\" onclick=\"getMessage('" + url + "'," + up + "," +
				pagSize + ")\"><span>&laquo;</span></a></li>";
		}
		for (var i = 1; i <= all; i++) {
			if (i == index) {
				str += "<li class=\"active\"><span>" + i + "</span></li>";
			} else {
				str += "<li><a href=\"javascript:void(0)\" onclick=\"getMessage('" + url + "'," + i + "," + pagSize + ")\">" + i +
					"</a></li>";
			}
		}
		if (index >= all) {
			str += "<li class=\"disabled\"><span>&raquo;</span></li>";
		} else {
			down = index + 1;
			str += "<li class=\"disabled\"><a href=\"javascript:void(0)\" onclick=\"getMessage('" + url + "'," + down + "," +
				pagSize + ")\"><span>&raquo;</span></a></li>";
		}
		str += "</ul>";
		$("#mypage").html(str);
		var x = data.length - 1;
		var y = 0;
		str = "<ul class='pl-0 mb-0 right-qtr'>";
		for (var i = 0; i < 10; i++) {
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			str += "<li class=\"py-1\"><a href=\"javascript:void(0);\" onclick='queryMessageDetailSerialNumber(\"" + url +
				"\"," + (rand + 1) + ")' title=\"" + data[rand].title + "\" class=\"text-dark\">" + data[rand].title +
				"</a></li>";
		}
		str += "</ul>";
		$("#rankinglist").html(str); //排行榜
		str = "<ul class='pl-0 mb-0 right-qtr'>";
		for (var i = 0; i < 10; i++) {
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			str += "<li class=\"py-1\"><a href=\"javascript:void(0);\" onclick='queryMessageDetailSerialNumber(\"" + url +
				"\"," + (rand + 1) + ")' title=\"" + data[rand].title + "\" class=\"text-dark\">" + data[rand].title +
				"</a></li>";
		}
		str += "</ul>";
		$("#hotpints").html(str); //热点聚焦
		str = "<ul class='pl-0 mb-0 right-qtr'>";
		for (var i = 0; i < 5; i++) {
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			str += "<li class=\"py-1\"><a href=\"javascript:void(0);\" onclick='queryMessageDetailSerialNumber(\"" + url +
				"\"," + (rand + 1) + ")' title=\"" + data[rand].title + "\" class=\"text-dark\">" + data[rand].title +
				"</a></li>";
		}
		str += "</ul>";
		$("#pagespeed").html(str); //相关推荐
	})
}

/**
 * 获取url和serialNumber并进行储存
 * @param {Object} url 对应的json路径
 * @param {Object} serialNumber 编码
 */
function queryMessageDetailSerialNumber(url, serialNumber) {
	if (url != '' && serialNumber != '') {
		window.sessionStorage.setItem("messageDetailNo", url + ";" + serialNumber);
		window.location.href = "messagedetail.html";
	}
}

/**
 * 查询渲染页面
 */
function getMessageDetail() {
	var message = window.sessionStorage.getItem("messageDetailNo").split(";");
	if (message != '') {
		var url = message[0];
		var serialNumber = message[1];
		$.getJSON(url, function(data) {
			var str = "";
			str = data[serialNumber - 1].releasetime + data[serialNumber - 1].viewcount + data[serialNumber - 1].articlesource;
			$("#mytitle").html(data[serialNumber - 1].topic);
			$("#mybasicInformation").html(str);
			$("#mymainbody").html(data[serialNumber - 1].mainbody);
			var myhref = url.split(".");
			if (myhref[1] == 'changshi') {
				myhref[2] = "常识";
			} else if (myhref[1] == 'jiri') {
				myhref[2] = "吉日";
			} else if (myhref[1] == 'wengda') {
				myhref[2] = "问答";
			} else {
				myhref[2] = "资讯";
			}
			str = "<a href=\"" + myhref[1] + ".html\" >北京搬家" + myhref[2] + "</a>&gt;<span>" + data[serialNumber - 1].title +
				"</span>";
				
			$("#navigation").html(str);
			str = "<li><a href=\"index.html\">首页</a></li>" + 
				"<li><a href=\"product.html \">搬家商家</a></li>";
				if(myhref[2]=='资讯')
				{
					str+="<li class=\"head-bot-active\"><a href=\"zixun.html\">搬家资讯</a></li>";
				}
				else{
					str+="<li><a href=\"zixun.html\">搬家资讯</a></li>";
				}
				if(myhref[2]=='常识')
				{
					str+="<li class=\"head-bot-active\"><a href=\"changshi.html\">搬家常识</a></li>";
				}
				else{
					str+="<li><a href=\"changshi.html\">搬家常识</a></li>";
				}
				if(myhref[2]=='吉日')
				{
					str+="<li class=\"head-bot-active\"><a href=\"jiri.html\">搬家吉日</a></li>";
				}
				else{
					str+="<li><a href=\"jiri.html\">搬家吉日</a></li>";
				}
				if(myhref[2]=='问答')
				{
					str+="<li class=\"head-bot-active\"><a href=\"wenda.html\">搬家问答</a></li>";
				}
				else{
					str+="<li><a href=\"wenda.html\">搬家问答</a></li>";
				}
			$("#headbotul").html(str);
			var x = data.length - 1;
			var y = 0;
			//排行榜
			str = "<ul class='pl-0 mb-0 right-qtr'>";
			for (var i = 0; i < 10; i++) {
				var rand = parseInt(Math.random() * (x - y + 1) + y);
				str += "<li class=\"py-1\"><a href=\"javascript:void(0);\" onclick='queryMessageDetailSerialNumber(\"" + url +
					"\"," + (rand + 1) + ")' title=\"" + data[rand].title + "\" class=\"text-dark\">" + data[rand].title +
					"</a></li>";
			}
			str += "</ul>";
			$("#rankinglist").html(str);
			//热点聚焦
			str = "<ul class='pl-0 mb-0 right-qtr'>";
			for (var i = 0; i < 10; i++) {
				var rand = parseInt(Math.random() * (x - y + 1) + y);
				str += "<li class=\"py-1\"><a href=\"javascript:void(0);\" onclick='queryMessageDetailSerialNumber(\"" + url +
					"\"," + (rand + 1) + ")' title=\"" + data[rand].title + "\" class=\"text-dark\">" + data[rand].title +
					"</a></li>";
			}
			str += "</ul>";
			$("#hotpints").html(str);
			//其他人浏览
			str = "<ul class='pl-0 mb-0 right-qtr'>";
			for (var i = 0; i < 4; i++) {
				var rand = parseInt(Math.random() * (x - y + 1) + y);
				str += "<li class=\"py-1\"> <a href=\"javascript:void(0);\" onclick='queryMessageDetailSerialNumber(\"" + url +
					"\"," + (rand + 1) + ")' title=\"" + data[rand].title + "\"> <span>" + (i + 1) + "</span>" + data[rand].title +
					"</a> </li>";
			}
			str += "</ul>";
			$("#otherbrowse").html(str);
			//相关资讯
			str = "<ul class='pl-0 mb-0 d-flex flex-wrap'>";
			for (var i = 0; i < 9; i++) {
				var rand = parseInt(Math.random() * (x - y + 1) + y);
				str += "<li> <a href=\"javascript:void(0);\" onclick='queryMessageDetailSerialNumber(\"" + url + "\"," + (rand +
					1) + ")' title=\"" + data[rand].title + "\">" + data[rand].title + "</a></li>";
			}
			str += "</ul>";
			$("#relatedconsulting").html(str);
		})
	} else {
		window.location.href = "index.html";
	}
}

// 对Date的扩展，将 Date 转化为指定格式的String  
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
Date.prototype.Format = function(fmt) { //author: meizz   
	var o = {
		"M+": this.getMonth() + 1, //月份   
		"d+": this.getDate(), //日   
		"H+": this.getHours(), //小时   
		"m+": this.getMinutes(), //分   
		"s+": this.getSeconds(), //秒   
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度   
		"S": this.getMilliseconds() //毫秒   
	};

	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[
			k]).substr(("" + o[k]).length)));
	return fmt;
}

/**
 * 获取当前时间，并渲染到页面
 */
var week;
if (new Date().getDay() == 0) week = "星期日"
if (new Date().getDay() == 1) week = "星期一"
if (new Date().getDay() == 2) week = "星期二"
if (new Date().getDay() == 3) week = "星期三"
if (new Date().getDay() == 4) week = "星期四"
if (new Date().getDay() == 5) week = "星期五"
if (new Date().getDay() == 6) week = "星期六"
var time = new Date().Format("yyyy年MM月dd日 " + week);
$("#mytime").html(time);

/**
 * 查询渲染资讯/常识/吉日/问答模块
 */
function getIndexMessage() {
	var url = "";
	//资讯
	url = "json/movingcompany.zixun.json";
	$.getJSON(url, function(data) {
		var x = data.length - 1;
		var y = 0;
		str = "<ul class='index-news-ul pl-0'>";
		for (var i = 0; i < 5; i++) {
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			str += "<li class=\"py-2 border-top\">" +
				"<a href=\"javascript:void(0);\" title=\"" + data[rand].title + "\" onclick='queryMessageDetailSerialNumber(\"" +
				url + "\"," + (rand + 1) + ")' class=\"text-dark position-relative d-flex align-items-center pr-2\">" +
				"	<span></span> " + data[rand].title +
				"	<img src=\"images/home_right.png\" alt=\"" + data[rand].title +
				"\" class=\"index-news-ul-rightimg position-absolute\">" +
				"</a>" +
				"</li>";
		}
		str += "</ul>";
		$("#myzixun").html(str);
	})

	//常识
	url = "json/movingcompany.changshi.json";
	$.getJSON(url, function(data) {
		var x = data.length - 1;
		var y = 0;
		str = "<ul class='index-news-ul pl-0'>";
		for (var i = 0; i < 5; i++) {
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			str += "<li class=\"py-2 border-top\">" +
				"<a href=\"javascript:void(0);\" title=\"" + data[rand].title + "\" onclick='queryMessageDetailSerialNumber(\"" +
				url + "\"," + (rand + 1) + ")' class=\"text-dark position-relative d-flex align-items-center pr-2\">" +
				"	<span></span> " + data[rand].title +
				"	<img src=\"images/home_right.png\" alt=\"" + data[rand].title +
				"\" class=\"index-news-ul-rightimg position-absolute\">" +
				"</a>" +
				"</li>";
		}
		str += "</ul>";
		$("#mychangshi").html(str);
	})

	//吉日
	url = "json/movingcompany.jiri.json";
	$.getJSON(url, function(data) {
		var x = data.length - 1;
		var y = 0;
		str = "<ul class='index-news-ul pl-0'>";
		for (var i = 0; i < 5; i++) {
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			str += "<li class=\"py-2 border-top\">" +
				"<a href=\"javascript:void(0);\" title=\"" + data[rand].title + "\" onclick='queryMessageDetailSerialNumber(\"" +
				url + "\"," + (rand + 1) + ")' class=\"text-dark position-relative d-flex align-items-center pr-2\">" +
				"	<span></span> " + data[rand].title +
				"	<img src=\"images/home_right.png\" alt=\"" + data[rand].title +
				"\" class=\"index-news-ul-rightimg position-absolute\">" +
				"</a>" +
				"</li>";
		}
		str += "</ul>";
		$("#myjiri").html(str);
	})

	url = "json/movingcompany.wengda.json";
	$.getJSON(url, function(data) {
		var x = data.length - 1;
		var y = 0;
		str = "<ul class='index-news-ul pl-0'>";
		for (var i = 0; i < 5; i++) {
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			str += "<li class=\"py-2 border-top\">" +
				"<a href=\"javascript:void(0);\" title=\"" + data[rand].title + "\" onclick='queryMessageDetailSerialNumber(\"" +
				url + "\"," + (rand + 1) + ")' class=\"text-dark position-relative d-flex align-items-center pr-2\">" +
				"	<span></span> " + data[rand].title +
				"	<img src=\"images/home_right.png\" alt=\"" + data[rand].title +
				"\" class=\"index-news-ul-rightimg position-absolute\">" +
				"</a>" +
				"</li>";
		}
		str += "</ul>";
		$("#mywenda").html(str);
	})
}

/**
 * 用户通过用户名和密码进行登录
 */
function userlogin() {
	if ($("#txtUserName").val() != "" && $("#txtPwd").val() != "" && $("#message_code").val() != "") {
		if ($('#canvas').attr('data-code') == $("#message_code").val().toLowerCase()) {
			var json = {};
			json['username'] = $("#txtUserName").val();
			json['password'] = $("#txtPwd").val();
			url = "userlogin";
			MySubmitString(JSON.stringify(json), url, function(data) {
				if (data != null && data.msg == "ok") {
					$.cookie("userjson", JSON.stringify(data), {
path: "/"
					});
					window.location.href = "index.html";
				} else {
					alert("用户名或密码错误！");
				}
			})
		} else {
			alert("验证码错误！");
		}
	}
}

/**
 * 用户通过邮箱进行登录
 */
function userloginbyemail() {
	if ($("#email").val() != null && $("#email").val() != '' && $("#txtCode").val() != null && $("#txtCode").val() != '') {
		var my = window.sessionStorage.getItem("appEmailVerifyCode");
		if (my != null && my != '') {
			var mydata = $.parseJSON(my);
			if (mydata.msg == "ok") {
				if (mydata.email == $("#email").val()) {
					var json = {};
					json['user'] = mydata.user;
					$.cookie("userjson", JSON.stringify(json), {
path: "/"
					});
					window.location.href = "index.html";
				} else {
					var json = {};
					json['msg'] = "no";
					window.sessionStorage.setItem("appEmailVerifyCode", JSON.stringify(json));
					alert("您的邮箱已发生改变，请重新获取验证码!");
				}
			} else if (mydata.msg == "no_11") {
				alert("该邮箱尚未注册！");
			} else {
				alert("验证码失效，请重新获取！");
			}
		} else {
			alert("请填入您的邮箱并获取验证码！");
		}
	}
}

/**
 * 跳转个人页面
 */
$(".mybtn").click(function() {
	if ($("#username").html() != '') {
		window.location.href = "gerenzhongxin.html";
	}
})

/**
 * 关闭指定提示框
 * @param {Object} str
 */
function closebox(str) {
	$("#" + str).css("display", "none");
}

/**
 * 打开消息提示框
 * @param {Object} str
 */
function showbox(str) {
	$("#" + str).css("display", "block");
}

/**
 * 忘记密码 校验邮箱是否已注册
 */
$("#email").change(function() {
	if ($("#email").val() != '') {
		var json = {};
		json['email'] = $("#email").val();
		url = "checkEmeil";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg != 'ok') {
				$("#email-tab").css("display", "block");
				$("#email-text").html("该邮箱尚未注册！");
			} else {
				$("#email-tab").css("display", "none");
				$("#email-text").html("");
			}
		})
	} else {
		$("#email-tab").css("display", "none");
		$("#email-text").html("");
	}
})

/**
 * 注册 校验邮箱是否已注册
 */
$("#myemail").change(function() {
	if ($("#myemail").val() != '') {
		var json = {};
		json['email'] = $("#myemail").val();
		url = "checkEmeil";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == 'ok') {
				$("#email-tab").css("display", "block");
				$("#email-text").html("该邮箱已被注册，请直接登录");
			} else {
				$("#email-tab").css("display", "none");
				$("#email-text").html("");
			}
		})
	} else {
		$("#email-tab").css("display", "none");
		$("#email-text").html("");
	}
})

/**
 * 注册 校验用户名是否已存在
 */
$("#txtUserName").change(function() {
	if ($("#txtUserName").val() != '') {
		var json = {};
		json['username'] = $("#txtUserName").val();
		url = "checkUserName";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == 'ok') {
				$("#username-tab").css("display", "block");
				$("#username-text").html("该用户名已存在");
			} else {
				$("#username-tab").css("display", "none");
				$("#username-text").html("");
			}
		})
	} else {
		$("#username-tab").css("display", "none");
		$("#username-text").html("");
	}
})

/**
 * 查询渲染搬家类型 appointment.html
 */
function getServiceType() {
	var json = {};
	var url = "queryAllServiceType";
	MySubmitString(JSON.stringify(json), url, function(data) {
		var str =
			"<select id='yylx' required='required' style='line-height: 26px;border:none;font-size: 22px;outline: none;padding: 20px;background: #fff;margin-left: -5px;width: 68%;'>";
		str += "<option value=''>请选择</option>";
		var array = data.serviceTypeList;
		$.each(array, function(index, element) {
			str += "<option value='" + element['servicetypeid'] + "'>" + element['name'] + "</option>";
		})
		str += "</select>";
		$("#serviceType").append(str);
	})
}

/**
 * 查询渲染首页全部服务分类
 */
var json = {};
var url = "queryAllServiceType";
MySubmitString(JSON.stringify(json), url, function(data) {
	var str = "<ul class=\"fl-hidebox position-absolute flex-wrap mb-0 pl-0\">";
	var array = data.serviceTypeList;
	$.each(array, function(index, element) {
		str += "<li> <a href=\"product.html\" data-id=\"" + element['servicetypeid'] + "\">" +
			"	<div class=\"text-center px-4 py-z12\"> <img src=\"" + element['path'] + "\" alt=\"" + element['name'] + "\">" +
			"		<p class=\"mt-z8\">" + element['name'] + "</p>" +
			"	</div>" +
			"</a></li>";
	})
	str += "</ul>";
	$("#indexServiceType").append(str);
})

/**
 * 设置用户头像路径
 */
function setUserPhotoPath() {
	var my = window.sessionStorage.getItem("userjson");
	if (my != null && my != '') {
		var mydata = $.parseJSON(my);
		var json = {};
		json['userphoto'] = $("#userphoto").attr("src");
		json['userid'] = mydata.user.userid;
		var url = "setUserPhotoPath";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == "ok") {
				var cookie = $.cookie("userjson");
				if (cookie != null && cookie != '') {
					var mydata = $.parseJSON(cookie);
				}
				mydata.user['userphoto'] = $("#userphoto").attr("src");
				$.cookie("userjson", JSON.stringify(mydata), {
					path: "/"
				});
				window.sessionStorage.setItem("userjson", JSON.stringify(mydata))
				alert("头像设置成功");
			} else {
				alert("头像设置失败");
			}
		})
	} else {
		alert("请先登录！");
		window.location.href = "login.html";
	}
}

/**
 * 认证身份证
 */
function checkIdCard() {
	var my = window.sessionStorage.getItem("userjson");
	if (my != null && my != '') {
		var mydata = $.parseJSON(my);
		var json = {};
		json['idCardSide'] = "front";
		json['idcardz'] = $("#idcardz").attr("src");
		json['idcardf'] = $("#idcardf").attr("src");
		json['time'] = 1000 * 60 * 5;
		json['userid'] = mydata.user.userid;
		json['name'] = $("#name").val();
		json['numberid'] = $("#number").val();
		var url = "checkIdCard";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == "ok") {
				var cookie = $.cookie("userjson");
				if (cookie != null && cookie != '') {
					var mydata = $.parseJSON(cookie);
				}
				mydata.user['approveState'] = "UNDER_REVIEW";
				$.cookie("userjson", JSON.stringify(mydata), {
					path: "/"
				});
				$("#rzidcard").removeAttr("onclick");
				$("#rzidcard").removeAttr("class");
				window.sessionStorage.setItem("userjson", JSON.stringify(mydata));
				window.sessionStorage.setItem("myly", "提交成功！");
				window.sessionStorage.setItem("href", "auth.html");
				window.location.href = "success.html";
			} else {
				alert("提交失败！")
			}
		})
	} else {
		alert("请先登录！");
		window.location.href = "login.html";
	}
}

/**
 * 认证营业执照
 */
function CheckBusinessLicense() {
	var json = {};
	var url = "test";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null && data.msg == "ok") {
			alert("成功！");
		} else {
			alert("失败！");
		}
	})
}

/**
 * 修改密码
 */
function updateUserPassword() {
	if ($("#nowpassword").val() != '' && $("#password").val() != '' && $("#password2").val() != '') {
		var my = window.sessionStorage.getItem("userjson");
		if (my != null && my != '') {
			var mydata = $.parseJSON(my);
			if ($.md5($("#nowpassword").val()) == mydata.user.password) {
				if ($("#password").val() == $("#password2").val()) {
					json['email'] = mydata.user.email;
					json['password'] = $("#password").val();
					var url = "updatePassword";
					MySubmitString(JSON.stringify(json), url, function(data) {
if (data != null && data.msg == "ok") {
	window.sessionStorage.setItem("myly", "密码修改成功,请重新登录");
	window.sessionStorage.setItem("href", "login.html");
	window.location.href = "success.html";
} else {
	alert("密码修改失败！");
}
					})
				} else {
					alert("两次密码不一致！");
				}
			} else {
				alert("旧密码错误！")
			}
		} else {
			alert("请先登录！");
			window.location.href = "login.html";
		}
	}
}

/**
 * 省市区初始化
 */
function initializeAddress() {
	var json = {};
	url = "initializeAddress";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null && data.msg == "ok") {
			$("#myaddress").html("");
			var str = "";
			var array_pro = data.pro;
			var proSelect = document.createElement("select");
			proSelect.id = "privince";
			proSelect.className = "p11-s-input";
			$.each(array_pro, function(index, element) {
				proSelect.options.add(new Option(element['proname'], element['proid'])); //这个兼容IE与firefox
			})
			var citSelect = document.createElement("select");
			citSelect.id = "city";
			citSelect.className = "p11-s-input";
			var array_cit = data.city;
			$.each(array_cit, function(index, element) {
				citSelect.options.add(new Option(element['citname'], element['citid'])); //这个兼容IE与firefo
			})
			var disSelect = document.createElement("select");
			disSelect.id = "district";
			disSelect.className = "p11-s-input";
			var array_dis = data.dis;
			$.each(array_dis, function(index, element) {
				disSelect.options.add(new Option(element['disname'], element['disid'])); //这个兼容IE与firefo
			})
			$("#myaddress").append(proSelect);
			$("#myaddress").append(citSelect);
			$("#myaddress").append(disSelect);
		} else {
			alert("省市区初始化失败!");
		}
	})

}

/**
 * 根据省id更新市区信息
 */
$('body').on('change', '#privince', function() {
	var json = {};
	json['proid'] = $("#privince").val();
	url = "queryAddressByProId";
	// alert(JSON.stringify(json));
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null && data.msg == "ok") {
			var array_cit = data.city;
			document.getElementById("city").length = 0;
			$.each(array_cit, function(index, element) {
				// $("#city").options.add(new Option(element['citname'],element['citid'])); //这个兼容IE与firefo
				document.getElementById("city").options.add(new Option(element['citname'], element['citid'])); //这个兼容IE与firefo
			})
			document.getElementById("district").length = 0;
			var array_dis = data.dis;
			$.each(array_dis, function(index, element) {
				// $("#district").options.add(new Option(element['disname'],element['disid'])); //这个兼容IE与firefo
				document.getElementById("district").options.add(new Option(element['disname'], element['disid'])); //这个兼容IE与firefo
			})
		} else {
			alert("省市区渲染失败!");
		}
	})
})

/**
 * 根据市id更新区信息
 */
$('body').on('change', '#city', function() {
	var json = {};
	json['citid'] = $("#city").val();
	url = "queryAddressByCitId";
	// alert(JSON.stringify(json));
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null && data.msg == "ok") {
			var array_dis = data.dis;
			document.getElementById("district").length = 0;
			$.each(array_dis, function(index, element) {
				// $("#district").options.add(new Option(element['disname'],element['disid'])); //这个兼容IE与firefo
				document.getElementById("district").options.add(new Option(element['disname'], element['disid'])); //这个兼容IE与firefo
			})
		} else {
			alert("省市区渲染失败!");
		}
	})
})

/**
 * 查询渲染addinfo.html 服务类别
 */
function getServiceTypeAddInfo() {
	var json = {};
	var url = "queryAllServiceType";
	MySubmitString(JSON.stringify(json), url, function(data) {
		var str = "";
		var array = data.serviceTypeList;
		$.each(array, function(index, element) {
			str += "<li num='1' data-id='" + element['servicetypeid'] + "'>" +
				"<img class='margin-right-xs' width='16' height='16' src='images/p3_select2.png' alt=''> " + element['name'] +
				" </li>";
		})
		$("#serviceTypeUl").html(str);
	})
}

/**
 * 发布搬家公司
 */
function releaseCompanyMessage() {
	document.getElementById('sub').click();
	var jsontypes = [];
	var flagtype = 0;
	$.each($("input[name='type[]']"), function() { //服务内容
		flagtype += 1;
		jsontypes.push($(this).val());
	});
	if (flagtype <= 0) {
		alert("请选择您的服务内容！");
	}
	var jsonchengnuos = [];
	var flagchengnuo = 0;
	$.each($("input[name='chengnuo[]']"), function() { //服务承诺
		flagchengnuo += 1;
		jsonchengnuos.push($(this).val());
	});
	if (flagchengnuo <= 0) {
		alert("请选择您的服务承诺！");
	}
	var jsonimages = [];
	var flagimage = 0;
	$.each($("input[name='images[]']"), function() { //照片展示
		flagimage += 1;
		jsonimages.push($(this).val());
	});
	if (flagimage <= 0) {
		alert("请上传您公司的图片！");
	}
	if (UE.getEditor('content').getContent() == '') {
		alert("请描述一下您公司！");
	}
	if ($("#district").val() != '' && $("#title").val() != '' && $("#price").val() != '' && flagtype > 0 &&
		$("#tese").val() != '' && $("#quyu").val() != '' && flagchengnuo > 0 && $("#contacts").val() != '' &&
		$("#phone").val() != '' && flagimage > 0 && UE.getEditor('content').getContent() != '') {
		var my = window.sessionStorage.getItem("userjson");
		if (my != null && my != '') {
			var mydata = $.parseJSON(my);
			var json = {};
			json['disId'] = $("#district").val();
			json['name'] = $("#title").val();
			json['money'] = $("#price").val();
			json['servicecontext'] = jsontypes;
			json['feature'] = $("#tese").val();
			json['region'] = $("#quyu").val();
			json['promise'] = jsonchengnuos;
			json['linkman'] = $("#contacts").val();
			json['tel'] = $("#phone").val();
			json['address'] = $("#useraddress").val();
			json['userid'] = mydata.user.userid;
			json['photopaths'] = jsonimages;
			json['serviceDescribe'] = UE.getEditor('content').getContent();
			var url = "insertMovingCompany";
			MySubmitString(JSON.stringify(json), url, function(data) {
				if(data!=null&&data.msg=='ok'){
					window.sessionStorage.setItem("myly", "发布成功");
					window.sessionStorage.setItem("href", "addinfo.html");
					window.location.href = "success.html";
				}
				else{
					alert("发布失败！");
				}
			})
		} else {
			alert("请先登录！");
			window.location.href = "login.html";
		}
	}
}

/**
 * 发布咨询
 */
function releaseZiXun() {
	document.getElementById('sub').click();
	var url = "json/movingcompany.zixun.json";
	$.getJSON(url, function (data) {
		var json = {};
		json['title'] = $("#title").val();
		json['title_path'] = "";
		json['describe'] = UE.getEditor('content').getContentTxt();
		json['time'] = new Date().Format("yyyy-MM-dd");
		json['mainbody'] = "<div class=\"border-top article-content py-3 mt-3\">"+UE.getEditor('content').getContent()+"</div>";
		json['topic'] = "<h4 class=\"text-center\">"+$("#title").val()+"</h4>";
		json['releasetime'] = "<p class=\"p-2 text-muted\">发布时间："+new Date().Format("yyyy-MM-dd")+"</p>";
		var x = 10000;//上限
		var y = 0;//下限
		var rand = parseInt(Math.random() * (x - y + 1) + y);
		json['viewcount'] = "<p class=\"p-2 text-muted\">浏览次数："+rand+"</p>";
		json['articlesource'] = "<p class=\"p-2 text-muted\">文章来源：<a href=\"javascript:void(0);\" class=\"text-dark\">北京巧瓜搬家网</a></p>";
		data.push(json);
		var jsons = {};
		jsons['message'] = JSON.stringify(data);
		jsons['fileName'] = url;
		// console.log(JSON.stringify(json));
		url = "insertZiXun";
		MySubmitString(JSON.stringify(jsons), url, function(data) {
			if(data!=null&&data.msg=='ok'){
				window.sessionStorage.setItem("myly", "发布成功");
				window.sessionStorage.setItem("href", "addinfoarticle.html");
				window.location.href = "success.html";
			}
			else{
				alert("发布失败！");
			}
		})
	})
}

function queryAllProduct(){
	var json = {};
	json['serviceType'] = $(".text-danger").val();
	json['region'] = 
	json['money'] = 
}

/**
 * 查询渲染所有搬家公司
 * @param {Object} index
 * @param {Object} pagSize
 */
function getAllProduct(index, pagSize){
	var star = 0;
	var psize = pagSize;
	if (index > 1) {
		star = (index - 1) * psize;
	}
	var str = "<ul class=\"pl-0 mb-0\">";
	var all = 0;
	all = data.length;
	if (all % psize == 0) {
		all = parseInt(all / psize);
	} else {
		all = parseInt(all / psize) + 1;
	}
	psize += star;
	if (psize >= data.length) {
		psize = data.length;
	}
	for (var i = star; i < psize; i++) {
		str += "<li class=\"d-flex align-items-center procontent py-3 border-bottom\">" + 
				"<a href=\"jishipei.html\"><img src=\"images/0e6aec8424f138014e69ec57b9e024b5.jpeg\" alt class=\"pro-img\"></a>" + 
				"<div class=\"pro-content\">" + 
				"	<h5><a href=\"jishipei.html\" class=\"text-dark\">北京计时配搬家公司</a></h5>" + 
				"	<p class=\"font-size-14\">北京-北京-顺义 </p>" + 
				"	<p class=\"pro-desc\">北京计时配搬家介绍：服务是一家正规的搬家公司，首先北京记时配拥有专业的搬家货运团队和丰富的搬家操作经验，我们主要服务北京全城；其次北京计时配目前有600余辆车，15种车型，1000余名专业人员，实力证明一切，用服务说话，北京记时配实现专人专车专配，保障货物安全无忧，是北京每一位搬家朋友选择正规搬家公...</p>" + 
				"	<p class=\"tags\"> <span>会员1年</span><span>企业认证</span> </p>" + 
				"</div>" + 
				"<a class=\"ml-4 \" href=\"jishipei.html\">" + 
				"	<img src=\"images/p5_tel.png\" class=\"pro-telimg \" style=\"width: 100px\">" + 
				"</a>" + 
				"</li>";
	}
	str += "</ul>";
	$("#mymessage").html(str);
	var up = 0;
	var down = 0;
	str = "<ul class=\"pagination\">";
	if (index <= 1) {
		str += "<li class=\"disabled\"><span>&laquo;</span></li>";
	} else {
		up = index - 1;
		str += "<li class=\"disabled\"><a href=\"javascript:void(0)\" onclick=\"getMessage('" + url + "'," + up + "," +
			pagSize + ")\"><span>&laquo;</span></a></li>";
	}
	for (var i = 1; i <= all; i++) {
		if (i == index) {
			str += "<li class=\"active\"><span>" + i + "</span></li>";
		} else {
			str += "<li><a href=\"javascript:void(0)\" onclick=\"getMessage('" + url + "'," + i + "," + pagSize + ")\">" + i +
				"</a></li>";
		}
	}
	if (index >= all) {
		str += "<li class=\"disabled\"><span>&raquo;</span></li>";
	} else {
		down = index + 1;
		str += "<li class=\"disabled\"><a href=\"javascript:void(0)\" onclick=\"getMessage('" + url + "'," + down + "," +
			pagSize + ")\"><span>&raquo;</span></a></li>";
	}
	str += "</ul>";
	$("#mypage").html(str);
}
