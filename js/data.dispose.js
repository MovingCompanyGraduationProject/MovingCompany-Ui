/**
 * 获取存到cookie中的用户登录信息。
 */
var cookie = window.sessionStorage.getItem("userjson");
if (cookie != null && cookie != '') {
	var mydata = $.parseJSON(cookie);
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
	if (mydata.user.companyMessage != null) {
		if (mydata.user.companyMessage.approvestate == "UNDER_REVIEW") {
			$("#rzbusinesslicence").removeAttr("onclick");
			$("#rzbusinesslicence").removeAttr("class");
			$("#rzbusinesslicence").html("审核中");
		} else if (mydata.user.companyMessage.approvestate == "AUTHENTICATED") {
			$("#rzbusinesslicenceimg").attr("src", "images/p13_pic02_1.png")
			$("#rzbusinesslicence").removeAttr("onclick");
			$("#rzbusinesslicence").removeAttr("class");
			$("#rzbusinesslicence").html("已认证");
		} else if (mydata.user.companyMessage.approvestate == "FAIL") {
			$("#rzbusinesslicencespan").html("认证失败！请在明亮地方认证，简单便捷、实时通过");
		}
	}
	if (mydata.user.companyMessage != null) {
		$("#addinfo").css("display", "none");
	} else {
		$("#addinfo").css("display", "");
	}
} else {
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
			if (myhref[2] == '资讯') {
				str += "<li class=\"head-bot-active\"><a href=\"zixun.html\">搬家资讯</a></li>";
			} else {
				str += "<li><a href=\"zixun.html\">搬家资讯</a></li>";
			}
			if (myhref[2] == '常识') {
				str += "<li class=\"head-bot-active\"><a href=\"changshi.html\">搬家常识</a></li>";
			} else {
				str += "<li><a href=\"changshi.html\">搬家常识</a></li>";
			}
			if (myhref[2] == '吉日') {
				str += "<li class=\"head-bot-active\"><a href=\"jiri.html\">搬家吉日</a></li>";
			} else {
				str += "<li><a href=\"jiri.html\">搬家吉日</a></li>";
			}
			if (myhref[2] == '问答') {
				str += "<li class=\"head-bot-active\"><a href=\"wenda.html\">搬家问答</a></li>";
			} else {
				str += "<li><a href=\"wenda.html\">搬家问答</a></li>";
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

function setCookie(key, value, t) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + t);
	document.cookie = key + "=" + value + "; expires=" + oDate.toDateString() + "; path=/";
}

/**
 * 获取cookie
 * @param {Object} name
 */
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

/**
 * 删除cookie
 * @param {Object} name
 */
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + "; path=/";
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
					// $.cookie("userjson", JSON.stringify(data), {
					// 	path: "/"
					// });
					window.sessionStorage.setItem("userjson", JSON.stringify(data));
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
					// $.cookie("userjson", JSON.stringify(json), {
					// 	path: "/"
					// });
					window.sessionStorage.setItem("userjson", JSON.stringify(json));
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
				var cookie = window.sessionStorage.getItem("userjson");
				if (cookie != null && cookie != '') {
					var mydata = $.parseJSON(cookie);
				}
				mydata.user['userphoto'] = $("#userphoto").attr("src");
				// $.cookie("userjson", JSON.stringify(mydata), {
				// 	path: "/"
				// });
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
				var cookie = window.sessionStorage.getItem("userjson");
				if (cookie != null && cookie != '') {
					var mydata = $.parseJSON(cookie);
				}
				mydata.user['approveState'] = "UNDER_REVIEW";
				// $.cookie("userjson", JSON.stringify(mydata), {
				// 	path: "/"
				// });
				window.sessionStorage.setItem("userjson", JSON.stringify(mydata));
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
	var my = window.sessionStorage.getItem("userjson");
	if (my != null && my != '') {
		var mydata = $.parseJSON(my);
		if (mydata.user.companyMessage != null && mydata.user.companyMessage != '') {
			var json = {};
			json['filePath'] = $("#businessLicense").attr("src");
			json['userid'] = mydata.user.userid;
			json['name'] = $("#yyname").val();
			json['number'] = $("#yynumber").val();
			json["time"] = 1000 * 60 * 5;
			var url = "checkBusinessLicense";
			MySubmitString(JSON.stringify(json), url, function(data) {
				if (data != null && data.msg == "ok") {
					var cookie = window.sessionStorage.getItem("userjson");
					if (cookie != null && cookie != '') {
						var mydata = $.parseJSON(cookie);
					}
					mydata.user.companyMessage['approvestate'] = "UNDER_REVIEW";
					window.sessionStorage.setItem("userjson", JSON.stringify(mydata));
					$("#rzbusinesslicence").removeAttr("onclick");
					$("#rzbusinesslicence").removeAttr("class");
					window.sessionStorage.setItem("myly", "提交成功！");
					window.sessionStorage.setItem("href", "auth.html");
					window.location.href = "success.html";
				} else {
					alert("提交失败！");
				}
			})
		} else {
			alert("你还没有搬家公司，先发布一个吧！");
			window.location.href = "addinfo.html";
		}
	} else {
		alert("请先登录！");
		window.location.href = "login.html";
	}
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
 * 查询渲染xiadan.html 服务类型
 */
function getServiceTypeXiaDan() {
	var json = {};
	var url = "queryAllServiceType";
	MySubmitString(JSON.stringify(json), url, function(data) {
		var str = "";
		var array = data.serviceTypeList;
		$.each(array, function(index, element) {
			str += "<option id='ele'" + (index + 1) + " value='" + element['servicetypeid'] + "'>" + element['name'] +
				"</option>";
		})
		$("#serviceTypeSelect").html(str);
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
			json['serviceDescribe'] = UE.getEditor('content').getContent() + "|-|" + UE.getEditor('content').getContentTxt();
			var url = "insertMovingCompany";
			MySubmitString(JSON.stringify(json), url, function(data) {
				if (data != null && data.msg == 'ok') {
					window.sessionStorage.setItem("myly", "发布成功");
					window.sessionStorage.setItem("href", "addinfo.html");
					window.location.href = "success.html";
				} else {
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
	$.getJSON(url, function(data) {
		var json = {};
		json['title'] = $("#title").val();
		json['title_path'] = "";
		json['describe'] = UE.getEditor('content').getContentTxt();
		json['time'] = new Date().Format("yyyy-MM-dd");
		json['mainbody'] = "<div class=\"border-top article-content py-3 mt-3\">" + UE.getEditor('content').getContent() +
			"</div>";
		json['topic'] = "<h4 class=\"text-center\">" + $("#title").val() + "</h4>";
		json['releasetime'] = "<p class=\"p-2 text-muted\">发布时间：" + new Date().Format("yyyy-MM-dd") + "</p>";
		var x = 10000; //上限
		var y = 0; //下限
		var rand = parseInt(Math.random() * (x - y + 1) + y);
		json['viewcount'] = "<p class=\"p-2 text-muted\">浏览次数：" + rand + "</p>";
		json['articlesource'] =
			"<p class=\"p-2 text-muted\">文章来源：<a href=\"javascript:void(0);\" class=\"text-dark\">北京巧瓜搬家网</a></p>";
		data.push(json);
		var jsons = {};
		jsons['message'] = JSON.stringify(data);
		jsons['fileName'] = url;
		// console.log(JSON.stringify(json));
		url = "insertZiXun";
		MySubmitString(JSON.stringify(jsons), url, function(data) {
			if (data != null && data.msg == 'ok') {
				window.sessionStorage.setItem("myly", "发布成功");
				window.sessionStorage.setItem("href", "addinfoarticle.html");
				window.location.href = "success.html";
			} else {
				alert("发布失败！");
			}
		})
	})
}

/**
 * 查询条件效果改变
 * @param {Object} id
 */
function setQueryStatus(id) {
	var str = id.split("-");
	var old_id = $("." + str[0] + "-" + str[1]).attr("id");
	$("#" + old_id).removeAttr("class");
	$("#" + id).addClass("text-danger");
	$("#" + id).addClass(str[0] + "-" + str[1]);
	queryAllProduct();
}

/**
 * 查询符合条件的搬家公司
 */
function queryAllProduct() {
	var json = {};
	if ($(".service-type").html() != undefined) {
		json['serviceType'] = $(".service-type").html();
	} else {
		json['serviceType'] = "全部";
	}
	if ($(".service-region").html() != undefined) {
		json['region'] = $(".service-region").html();
	} else {
		json['region'] = "全部";
	}
	if ($(".money-region").data("value") != undefined) {
		json['money'] = $(".money-region").data("value");
	} else {
		json['money'] = "全部";
	}
	var url = "queryMovingCompany";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null && data.msg == 'ok') {
			window.sessionStorage.setItem("companyMessage", JSON.stringify(data));
			getAllProduct(1, 10);
		} else {
			alert("未查询到任何搬家公司信息！");
		}
	})
}

/**
 * 查询渲染所有搬家公司
 * @param {Object} index
 * @param {Object} pagSize
 */
function getAllProduct(index, pagSize) {
	var my = window.sessionStorage.getItem("companyMessage");
	if (my != null && my != '') {
		var mydata = $.parseJSON(my);
		var data = mydata.companyMessage;
		$("#totalnumber").html(data.length);
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
				"<a href=\"javascript:;\" onclick='queryProductById(" + (i + 1) + ")'><img src=\"" + data[i].companyphoto[0].path +
				"\" alt class=\"pro-img\"></a>" +
				"<div class=\"pro-content\">" +
				"	<h5><a href=\"javascript:;\" onclick='queryProductById(" + (i + 1) + ")' class=\"text-dark\">" + data[i].name +
				"</a></h5>" +
				"	<p class=\"font-size-14\">" + data[i].address + "</p>" +
				"	<p class=\"pro-desc\">" + data[i].serviceDescribe.contextnum.split("|-|")[1] + "</p>";
			if (data[i].approvestate == "AUTHENTICATED") {
				str += "	<p class=\"tags\"><span>企业认证</span> </p>";
			}
			str += "</div>" +
				"<a class=\"ml-4 \" href=\"javascript:;\" onclick='queryProductById(" + (i + 1) + ")'>" +
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
			str += "<li class=\"disabled\"><a href=\"javascript:void(0)\" onclick=\"getAllProduct(" + up + "," +
				pagSize + ")\"><span>&laquo;</span></a></li>";
		}
		for (var i = 1; i <= all; i++) {
			if (i == index) {
				str += "<li class=\"active\"><span>" + i + "</span></li>";
			} else {
				str += "<li><a href=\"javascript:void(0)\" onclick=\"getAllProduct(" + i + "," + pagSize + ")\">" + i +
					"</a></li>";
			}
		}
		if (index >= all) {
			str += "<li class=\"disabled\"><span>&raquo;</span></li>";
		} else {
			down = index + 1;
			str += "<li class=\"disabled\"><a href=\"javascript:void(0)\" onclick=\"getAllProduct(" + down + "," +
				pagSize + ")\"><span>&raquo;</span></a></li>";
		}
		str += "</ul>";
		$("#mypage").html(str);
	}
	var x = 0; //上限
	var y = 0; //下限
	$.getJSON('json/movingcompany.zixun.json', function(data) {
		x = data.length - 1;
		str = "<ul class='pl-0 mb-0 right-qtr'>";
		for (var i = 0; i < 10; i++) {
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			str += "<li class=\"py-1\"><a href=\"javascript:void(0);\" onclick='queryMessageDetailSerialNumber(\"" + url +
				"\"," + (rand + 1) + ")' title=\"" + data[rand].title + "\" class=\"text-dark\">" + data[rand].title +
				"</a></li>";
		}
		str += "</ul>";
		$("#rankinglist").html(str); //排行榜
	})

	x = data.length - 1;
	str = "<ul class='pl-0 mb-0 pro-right-rank right-qtr'>";
	if (x > 8) {
		psize = 8;
	} else {
		psize = data.length;
	}
	for (var i = 0; i < psize; i++) {
		var rand = parseInt(Math.random() * (x - y + 1) + y);
		str += "<li class='py-1'> <a class='text-dark'' href=\"javascript:;\" onclick='queryProductById(" + (i + 1) +
			")'><span>" + (i + 1) + "</span>" + data[i].name + "</a></li>";
	}
	str += "</ul>";
	$("#companylist").html(str);

	if (x > 4) {
		psize = 4;
	} else {
		psize = data.length;
	}
	str = "<ul class='pl-0 mb-0 right-qtr'>"
	for (var i = 0; i < psize; i++) {
		var rand = parseInt(Math.random() * (x - y + 1) + y);
		str += "<li class='py-1'> <a  href=\"javascript:;\" onclick='queryProductById(" + (i + 1) + ")' title='" + data[rand]
			.name + "'> <span>" + (i + 1) + "</span>" + data[i].name + "</a> </li>"
	}
	str += "</ul>";
	$("#otherlook").html(str);
}

/**
 * 渲染首页最新入驻
 */
function getCompanyRz() {
	queryAllProduct();
	var my = window.sessionStorage.getItem("companyMessage");
	if (my != null && my != '') {
		var mydata = $.parseJSON(my);
		var data = mydata.companyMessage;
		var str = "";
		for (var i = 0; i < data.length; i++) {
			str += "<li><img src='images/home_pic_25.png'><a href=\"javascript:;\" onclick='queryProductById(" + (i + 1) +
				")'> " + data[i].name + "</a></li>";
		}
		$("#companyrz").html(str);
	}
}

/**
 * 渲染首页公司推荐
 */
function getCompanyTj() {
	var my = window.sessionStorage.getItem("companyMessage");
	if (my != null && my != '') {
		var mydata = $.parseJSON(my);
		var data = mydata.companyMessage;
		var str = "";
		for (var i = 0; i < data.length; i++) {
			str += "<div class=\"con-txl position-relative border my-2\">" +
			"<a href=\"https://bj.qgbjvip.com/product/1431.html\" class=\"first\">" +
			"	<img src=\""+ data[i].companyphoto[0].path +"\" alt=\"" + data[i].name + "\">" +
			"</a>" +
			"<a href=\"https://bj.qgbjvip.com/product/1431.html\" class=\"p1-bjgs-list-tit\">" + data[i].name + "</a>" +
			"<p class=\"p1-bjgs-smtit two-rows\">" + data[i].serviceDescribe.contextnum.split("|-|")[1] + "</p>" +
			"<p class=\"p1-bjgs-img flex align-center\"> <img src=\"images/home_pic_20.png\" alt>北京 ";
			if(data[i].approvestate=="AUTHENTICATED"){
				str+="<span>|</span><img src=\"images/home_pic_21.png\" alt>企业认证";
			}
			str+=" </p>" +
			"</div>";
		}
		$("#hotProduct").html(str);
	}
}

/**
 * 将搬家公司编号存到sessionStorage中
 * @param {Object} id
 */
function queryProductById(id) {
	if (id != null && id != '') {
		window.sessionStorage.setItem("productId", id);
		window.location.href = "companydetail.html";
	}
}

/**
 * 处理时间
 * @param {Object} time
 */
function ChangeDateFormat(time) {
	var birthdayMilliseconds = parseInt(time);
	//实例化一个新的日期格式，使用1970 年 1 月 1 日至今的毫秒数为参数
	var datetime = new Date(birthdayMilliseconds);
	datetime.setTime(time);
	var year = datetime.getFullYear();
	var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
	var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
	var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
	var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
	var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
	// return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
	return year + "年" + month + "月" + date + "日";
}

/**
 * 查询渲染搬家公司详情
 */
function getProductById() {
	var id = window.sessionStorage.getItem("productId");
	var my = window.sessionStorage.getItem("companyMessage");
	if (my != null && my != '' && id != null && id != '') {
		var mydata = $.parseJSON(my);
		var data = mydata.companyMessage;
		$(".companyname").html(data[id - 1].name);
		$("#time").html(ChangeDateFormat(data[id - 1].createtime.time));
		var x = 10000; //上限
		var y = 0; //下限
		var rand = parseInt(Math.random() * (x - y + 1) + y);
		$("#looknumber").html(rand);
		$("#img1").attr("src", data[id - 1].companyphoto[0].path);
		var str = "";
		var str2 = "";
		for (var i = 0; i < data[id - 1].companyphoto.length; i++) {
			if (i > 2) {
				str2 += "<li url='" + data[id - 1].companyphoto[i].path + "'><img src='" + data[id - 1].companyphoto[i].path +
					"' alt ></li>";
			} else {
				str += "<li url='" + data[id - 1].companyphoto[i].path + "'><img src='" + data[id - 1].companyphoto[i].path +
					"' alt ></li>";
			}
		}
		$("#imgs").html(str);
		$("#imgs2").html(str2);
		$("#money").html("￥" + data[id - 1].money);
		$("#feature").html(data[id - 1].feature);
		$("#region").html(data[id - 1].region);
		$("#promise").html(data[id - 1].promise);
		$("#linkman").html(data[id - 1].linkman);
		$("#tel").attr("onclick", "show(this,'" + data[id - 1].tel + "');");
		$("#spanaddress").html(data[id - 1].address);
		str = "<p style='font-weight: 700;font-size: 22px;margin-top: 30px;'>" + data[id - 1].serviceDescribe.specialann +
			"</p>";
		$("#serviceDescribe").html(data[id - 1].serviceDescribe.contextnum.split("|-|")[0] + str);
		if (data[id - 1].approvestate == "AUTHENTICATED") {
			$("#shoperright").css("display", "block");
		}
		$("#companymessageid").attr("value", data[id - 1].companymessageid)
	}
}

/**
 * 用户评价
 */
function publishedReview() {
	var my = window.sessionStorage.getItem("userjson");
	if (my != null && my != '') {
		var mydata = $.parseJSON(my);
		var json = {};
		json['manner'] = $("input[name='taidu']").val();
		json['fiducialPoint'] = $("input[name='zhundian']").val();
		json['vehicleCondition'] = $("input[name='chekuang']").val();
		json['contextCode'] = $("textarea[name='content']").val();
		var sum = parseInt($("input[name='totalstar']").val()) + parseInt($("input[name='taidu']").val()) + parseInt($(
			"input[name='zhundian']").val()) + parseInt($("input[name='chekuang']").val());
		var num = sum / 4;
		if (num > 3.3) {
			json['appraiseType'] = "好评";
		} else if (num > 1.6 && num <= 3.3) {
			json['appraiseType'] = "中评";
		} else {
			json['appraiseType'] = "差评";
		}
		json['overallMerit'] = parseInt(num);
		json['CompanyMessageId'] = $("#companymessageid").val();
		json['userid'] = mydata.user.userid;
		var url = "insertMovingCompanyAppraise";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == 'ok') {
				alert("评价成功！");
			} else {
				alert("评价失败！");
			}
		})
	} else {
		alert("请先登录！");
		window.location.href = "login.html";
	}
}

/**
 * 查询渲染用户评伦
 */
function getPublishedReview() {
	var pinjia = window.sessionStorage.getItem("pjia");
	var id = window.sessionStorage.getItem("productId");
	var my = window.sessionStorage.getItem("companyMessage");
	if (my != null && my != '' && id != null && id != '') {
		var mydata = $.parseJSON(my);
		var data = mydata.companyMessage[id - 1].appraises;
		var str = "";
		var hao = 0;
		var cha = 0;
		var zhong = 0;
		for (var i = 0; i < data.length; i++) {
			if (data[i].appraisetype == '好评') {
				hao += 1;
			}
			if (data[i].appraisetype == '中评') {
				zhong += 1;
			}
			if (data[i].appraisetype == '差评') {
				cha += 0;
			}
			if (pinjia == "" || pinjia == "全部") {
				str += "<li class=\"media mt-4\">";
				if (data[i].user.userphoto != '') {
					str += "<img class=\"mr-3\" width=\"60\" height=\"60\" src=\"" + data[i].user.userphoto + "\">";
				} else {
					str += "<img class=\"mr-3\" width=\"60\" height=\"60\" src=\"images/8de62b3ebbc15c26fc9e7e0a66437927.jpeg\">";
				}
				str += "<div class=\"media-body\">" +
					"	<p class=\"mt-0 mb-1 font-size-14\">" + data[i].user.name + "</p><p>";
				if (data[i].overallmerit != '') {
					var num = parseInt(data[i].overallmerit);
					for (var j = 0; j < num; j++) {
						str += "<img width=\"14\" height=\"14\" src=\"images/p6_star_yes.png\" alt>";
					}
				}
				str += "	</p>" +
					"	<p>" + data[i].contextcode + "</p>" +
					"	<p class=\"text-right\" style=\"cursor: pointer\" onclick=\"zan('27')\"><img class=\"margin-right-sm\" width=\"12\"" +
					"		 height=\"16\" src=\"images/p6_pic_13.png\" alt>" + data[i].likenum + "</p>" +
					"</div>" +
					"</li>";
			} else {
				if (data[i].appraisetype == pinjia) {
					str += "<li class=\"media mt-4\">";
					if (data[i].user.userphoto != '') {
						str += "<img class=\"mr-3\" width=\"60\" height=\"60\" src=\"" + data[i].user.userphoto + "\">";
					} else {
						str += "<img class=\"mr-3\" width=\"60\" height=\"60\" src=\"images/8de62b3ebbc15c26fc9e7e0a66437927.jpeg\">";
					}
					str += "<div class=\"media-body\">" +
						"	<p class=\"mt-0 mb-1 font-size-14\">" + data[i].user.name + "</p><p>";
					if (data[i].overallmerit != '') {
						var num = parseInt(data[i].overallmerit);
						for (var j = 0; j < num; j++) {
							str += "<img width=\"14\" height=\"14\" src=\"images/p6_star_yes.png\" alt>";
						}
					}
					str += "	</p>" +
						"	<p>" + data[i].contextcode + "</p>" +
						"	<p class=\"text-right\" style=\"cursor: pointer\" onclick=\"zan('27')\"><img class=\"margin-right-sm\" width=\"12\"" +
						"		 height=\"16\" src=\"images/p6_pic_13.png\" alt>" + data[i].likenum + "</p>" +
						"</div>" +
						"</li>";
				}
			}
		}
		$(".chap").html(cha);
		$("#haop").html(hao);
		var p = ((hao / (cha + hao + zhong)) * 100)
		if (p > 0) {
			$("#haopd").html(p.toFixed(2) + "%");
		}
		$("#zhongp").html(zhong);
		$("#userPublishedReview").html(str);
	}
}

/**
 * 用户收藏
 */
function insertUserCollect() {
	var id = window.sessionStorage.getItem("productId");
	var my = window.sessionStorage.getItem("userjson");
	var companyMessage = window.sessionStorage.getItem("companyMessage");
	if (my != null && my != '' && id != null && id != '' && companyMessage != null && companyMessage != '') {
		var mydata = $.parseJSON(my);
		var data = $.parseJSON(companyMessage);
		var json = {};
		json['userid'] = mydata.user.userid;
		json['companymessageid'] = data.companyMessage[id - 1].companymessageid;
		var url = "insertUserCollect";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == 'ok') {
				alert("收藏成功！")
			} else {
				alert("收藏失败！");
			}
		})
	} else {
		alert("请先登录！");
		window.location.href = "login.html";
	}
}

/**
 * 在留言页面渲染搬家公司名称！
 */
function getOneLiuYan() {
	var id = window.sessionStorage.getItem("productId");
	var companyMessage = window.sessionStorage.getItem("companyMessage");
	if (id != null && id != '' && companyMessage != null && companyMessage != '') {
		var data = $.parseJSON(companyMessage);
		$("#shangjia").attr("value", data.companyMessage[id - 1].name);
	}
}

/**
 * 添加留言
 */
function insertLiuYan() {
	if ($("input[name='name']").val() != '' && $("input[name='tel']").val() != '' && $("textarea[name='content']").val() !=
		'') {
		var id = window.sessionStorage.getItem("productId");
		var companyMessage = window.sessionStorage.getItem("companyMessage");
		if (id != null && id != '' && companyMessage != null && companyMessage != '') {
			var data = $.parseJSON(companyMessage);
			var json = {};
			json['name'] = $("input[name='name']").val();
			json['tel'] = $("input[name='tel']").val();
			json['contextNum'] = $("textarea[name='content']").val();
			json['companymessageid'] = data.companyMessage[id - 1].companymessageid;
			var url = "insertInform";
			MySubmitString(JSON.stringify(json), url, function(data) {
				if (data != null && data.msg == 'ok') {
					window.sessionStorage.setItem("myly", "留言成功！");
					window.sessionStorage.setItem("href", "companydetail.html");
					window.location.href = "success.html";
				} else {
					alert("留言失败！");
				}
			})
		}
	}
}

/**
 * 时间格式转换
 * @param {Object} date
 */
function renderTime(date) {
	var dateee = new Date(date).toJSON();
	return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

/**
 * 下单 将顶单信息存到sessionStorage里
 */
function xiaDan() {
	if ($("#begin").val() != '' && $("#end").val() != '' && $("#name").val() != '' && $("#tel").val() != '' && $("#date").val() !=
		'') {
		var id = window.sessionStorage.getItem("productId");
		var companyMessage = window.sessionStorage.getItem("companyMessage");
		var my = window.sessionStorage.getItem("userjson");
		if (id != null && id != '' && companyMessage != null && companyMessage != '' && my != null && my != '') {
			var data = $.parseJSON(companyMessage);
			var mydata = $.parseJSON(my);
			var json = {};
			json['companymessageid'] = data.companyMessage[id - 1].companymessageid;
			json['userid'] = mydata.user.userid;
			json['startsite'] = $("#begin").val();
			json['endsite'] = $("#end").val();
			json['name'] = $("#name").val();
			json['tel'] = $("#tel").val();
			json['remark'] = $("#serviceTypeSelect").val() + ";" + $("#remark").val();
			json['servicetype'] = $("#serviceTypeSelect").find("option:selected").text();
			json['movingtime'] = renderTime($("#date").val());
			window.sessionStorage.setItem("userOrder", JSON.stringify(json));
			window.location.href = "order.html";
		}
	}
}



/**
 * 查询渲染订单
 */
function getOrderForm() {
	var my = window.sessionStorage.getItem("userOrder");
	if (my != null && my != '') {
		var mydata = $.parseJSON(my);
		$("#servicetype").html(mydata.servicetype);
		$("#startsite").html(mydata.startsite);
		$("#endsite").html(mydata.endsite);
		$("#name").html(mydata.name);
		$("#tel").html(mydata.tel);
		$("#movingtime").html(mydata.movingtime);
		$("#remark").html(mydata.remark.split(";")[1]);
	}
}

/**
 * 提交订单
 */
function submitOrderForm() {
	var my = window.sessionStorage.getItem("userOrder");
	if (my != null && my != '') {
		var json = $.parseJSON(my);
		var url = "insertOrderForm";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == 'ok') {
				window.sessionStorage.setItem("myly", "订单提交成功");
				window.sessionStorage.setItem("href", "xiadan.html");
				window.location.href = "success.html";
			} else {
				alert("订单提交失败！");
			}
		})
	}
}
