/**
 * 获取存到cookie中的用户登录信息。
 */
var cookie = $.cookie("userjson");
if (cookie != null && cookie != '') {
	var mydata = $.parseJSON(cookie);
	window.sessionStorage.setItem("userjson", cookie);
	if(mydata.user.sex=="男"){
		$("#username").html(mydata.user.name + " 先生");
		$("#username1").html(mydata.user.name + " 先生");
	}
	else if(mydata.user.sex=="女"){
		$("#username").html(mydata.user.name + " 女士");
		$("#username1").html(mydata.user.name + " 女士");
	}
	else{
		$("#username").html(mydata.user.name + "");
		$("#username1").html(mydata.user.name + "");
	}
	$("#useremail").html(mydata.user.email);
	$(".loginregsiter").css('display','none');
}

/**
 * 查询渲染资讯/常识/吉日/问答页面
 * @param {Object} index 页数
 * @param {Object} pagsize 每页显示的个数
 */
function getMessage(url,index,pagSize){
	var star = 0;
	var psize = pagSize;
	if(index>1){
		star = (index-1)*psize;
	}
	$.getJSON(url, function (data) {
		var str = "<ul class=\"pl-0 mb-0\">";
		var all = 0 ;
		all = data.length;
		if(all % psize == 0) {
			all = parseInt(all / psize) ;
		}else {
			all = parseInt(all / psize) + 1 ;
		}
		psize+=star;
		if(psize>=data.length){
			psize = data.length;
		}
		for(var i=star;i<psize;i++){
			str+="<li class=\"d-flex align-items-center procontent py-3 border-bottom\"> " +
				"	<a href=\"javascript:void(0)\" onclick='queryMessageDetailSerialNumber(\""+url+"\","+(i+1)+")'>" + 
				"		<img src=\"images/qgarticlethumb.png\" alt class=\"pro-img\">" + 
				"	</a>" + 
				"	<div class=\"article-content\">" + 
				"		<a href=\"javascript:void(0)\" class=\"tit\" onclick='queryMessageDetailSerialNumber(\""+url+"\","+(i+1)+")'>"+data[i].title+"</a> " + 
				"		<a href=\"javascript:void(0)\" class=\"desc\" onclick='queryMessageDetailSerialNumber(\""+url+"\","+(i+1)+")'>"+data[i].describe+"</a>" + 
				"		<a href=\"javascript:void(0)\" class=\"text-muted\" onclick='queryMessageDetailSerialNumber(\""+url+"\","+(i+1)+")'>"+data[i].time+"</a>" + 
				"	</div>" + 
				"</li>";
		}
		str+="</ul>";
		$("#mymessage").html(str);
		var up = 0;
		var down = 0;
		str = "<ul class=\"pagination\">";
		if(index<=1){
			str+="<li class=\"disabled\"><span>&laquo;</span></li>";
		}
		else{
			up =index-1;
			str+="<li class=\"disabled\"><a href=\"javascript:void(0)\" onclick=\"getMessage('"+url+"',"+up+","+pagSize+")\"><span>&laquo;</span></a></li>";
		}
		for(var i=1;i<=all;i++){
			if(i==index){
				str+="<li class=\"active\"><span>"+i+"</span></li>";
			}
			else{
				str+="<li><a href=\"javascript:void(0)\" onclick=\"getMessage('"+url+"',"+i+","+pagSize+")\">"+i+"</a></li>";
			}
		}
		if(index>=all){
			str+="<li class=\"disabled\"><span>&raquo;</span></li>";
		}
		else{
			down = index+1;
			str+="<li class=\"disabled\"><a href=\"javascript:void(0)\" onclick=\"getMessage('"+url+"',"+down+","+pagSize+")\"><span>&raquo;</span></a></li>";
		}
		str+="</ul>";
		$("#mypage").html(str);
		var x = data.length-1;
		var y = 0;
		str="<ul class='pl-0 mb-0 right-qtr'>";
		for(var i = 0;i<10;i++){
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			str+="<li class=\"py-1\"><a href=\"javascript:void(0);\" onclick='queryMessageDetailSerialNumber(\""+url+"\","+(rand+1)+")' title=\""+data[rand].title+"\" class=\"text-dark\">"+data[rand].title+"</a></li>";
		}
		str+="</ul>";
		$("#rankinglist").html(str);//排行榜
		str="<ul class='pl-0 mb-0 right-qtr'>";
		for(var i = 0;i<10;i++){
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			str+="<li class=\"py-1\"><a href=\"javascript:void(0);\" onclick='queryMessageDetailSerialNumber(\""+url+"\","+(rand+1)+")' title=\""+data[rand].title+"\" class=\"text-dark\">"+data[rand].title+"</a></li>";
		}
		str+="</ul>";
		$("#hotpints").html(str);//热点聚焦
		str="<ul class='pl-0 mb-0 right-qtr'>";
		for(var i = 0;i<5;i++){
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			str+="<li class=\"py-1\"><a href=\"javascript:void(0);\" onclick='queryMessageDetailSerialNumber(\""+url+"\","+(rand+1)+")' title=\""+data[rand].title+"\" class=\"text-dark\">"+data[rand].title+"</a></li>";
		}
		str+="</ul>";
		$("#pagespeed").html(str);//相关推荐
	})
}

/**
 * 获取url和serialNumber并进行储存
 * @param {Object} url 对应的json路径
 * @param {Object} serialNumber 编码
 */
function queryMessageDetailSerialNumber(url,serialNumber){
	if(url!=''&&serialNumber!=''){
		window.sessionStorage.setItem("messageDetailNo",url+";"+serialNumber);
		window.location.href = "messagedetail.html";
	}
}

/**
 * 查询渲染页面
 */
function getMessageDetail(){
	var message = window.sessionStorage.getItem("messageDetailNo").split(";");
	if(message!=''){
		var url = message[0];
		var serialNumber = message[1];
		$.getJSON(url, function (data) {
			var str = "";
			str = data[serialNumber-1].releasetime+data[serialNumber-1].viewcount+data[serialNumber-1].articlesource;
			$("#mytitle").html(data[serialNumber-1].topic);
			$("#mybasicInformation").html(str);
			$("#mymainbody").html(data[serialNumber-1].mainbody);
			var myhref = url.split(".");
			if(myhref[1]=='changshi'){
				myhref[2] = "常识";
			}
			else if(myhref[1]=='jiri'){
				myhref[2] = "吉日";
			}
			else if(myhref[1]=='wengda'){
				myhref[2] = "问答";
			}
			else{
				myhref[2] = "资讯";
			}
			str="<a href=\""+myhref[1]+".html\" >北京搬家"+myhref[2]+"</a>&gt;<span>"+data[serialNumber-1].title+"</span>";
			$("#navigation").html(str);
			var x = data.length-1;
			var y = 0;
			//排行榜
			str="<ul class='pl-0 mb-0 right-qtr'>";
			for(var i = 0;i<10;i++){
				var rand = parseInt(Math.random() * (x - y + 1) + y);
				str+="<li class=\"py-1\"><a href=\"javascript:void(0);\" onclick='queryMessageDetailSerialNumber(\""+url+"\","+(rand+1)+")' title=\""+data[rand].title+"\" class=\"text-dark\">"+data[rand].title+"</a></li>";
			}
			str+="</ul>";
			$("#rankinglist").html(str);
			//热点聚焦
			str="<ul class='pl-0 mb-0 right-qtr'>";
			for(var i = 0;i<10;i++){
				var rand = parseInt(Math.random() * (x - y + 1) + y);
				str+="<li class=\"py-1\"><a href=\"javascript:void(0);\" onclick='queryMessageDetailSerialNumber(\""+url+"\","+(rand+1)+")' title=\""+data[rand].title+"\" class=\"text-dark\">"+data[rand].title+"</a></li>";
			}
			str+="</ul>";
			$("#hotpints").html(str);
			//其他人浏览
			str="<ul class='pl-0 mb-0 right-qtr'>";
			for(var i = 0;i<4;i++){
				var rand = parseInt(Math.random() * (x - y + 1) + y);
				str+="<li class=\"py-1\"> <a href=\"javascript:void(0);\" onclick='queryMessageDetailSerialNumber(\""+url+"\","+(rand+1)+")' title=\""+data[rand].title+"\"> <span>"+(i+1)+"</span>"+data[rand].title+"</a> </li>";
			}
			str+="</ul>";
			$("#otherbrowse").html(str);
			//相关资讯
			str="<ul class='pl-0 mb-0 d-flex flex-wrap'>";
			for(var i = 0;i<9;i++){
				var rand = parseInt(Math.random() * (x - y + 1) + y);
				str+="<li> <a href=\"javascript:void(0);\" onclick='queryMessageDetailSerialNumber(\""+url+"\","+(rand+1)+")' title=\""+data[rand].title+"\">"+data[rand].title+"</a></li>";
			}
			str+="</ul>";
			$("#relatedconsulting").html(str);
		})
	}
	else{
		window.location.href="index.html";
	}
}

// 对Date的扩展，将 Date 转化为指定格式的String  
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
Date.prototype.Format = function (fmt) { //author: meizz   
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
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
    return fmt;  
}  

/**
 * 获取当前时间，并渲染到页面
 */
var week; 
if(new Date().getDay()==0) week="星期日"
if(new Date().getDay()==1) week="星期一"
if(new Date().getDay()==2) week="星期二" 
if(new Date().getDay()==3) week="星期三"
if(new Date().getDay()==4) week="星期四"
if(new Date().getDay()==5) week="星期五"
if(new Date().getDay()==6) week="星期六"
var time = new Date().Format("yyyy年MM月dd日 "+week);
$("#mytime").html(time);

/**
 * 查询渲染资讯/常识/吉日/问答模块
 */
function getIndexMessage(){
	var url = "";
	//资讯
	url="json/movingcompany.zixun.json";
	$.getJSON(url, function (data) {
		var x = data.length-1;
		var y = 0;
		str="<ul class='index-news-ul pl-0'>";
		for(var i = 0;i<5;i++){
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			str+="<li class=\"py-2 border-top\">" + 
    			"<a href=\"javascript:void(0);\" title=\""+data[rand].title+"\" onclick='queryMessageDetailSerialNumber(\""+url+"\","+(rand+1)+")' class=\"text-dark position-relative d-flex align-items-center pr-2\">" + 
    			"	<span></span> "+data[rand].title + 
    			"	<img src=\"images/home_right.png\" alt=\""+data[rand].title+"\" class=\"index-news-ul-rightimg position-absolute\">" + 
    			"</a>" + 
    			"</li>";
		}
		str+="</ul>";
		$("#myzixun").html(str);
	})
	
	//常识
	url = "json/movingcompany.changshi.json";
	$.getJSON(url, function (data) {
		var x = data.length-1;
		var y = 0;
		str="<ul class='index-news-ul pl-0'>";
		for(var i = 0;i<5;i++){
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			str+="<li class=\"py-2 border-top\">" + 
				"<a href=\"javascript:void(0);\" title=\""+data[rand].title+"\" onclick='queryMessageDetailSerialNumber(\""+url+"\","+(rand+1)+")' class=\"text-dark position-relative d-flex align-items-center pr-2\">" + 
				"	<span></span> "+data[rand].title + 
				"	<img src=\"images/home_right.png\" alt=\""+data[rand].title+"\" class=\"index-news-ul-rightimg position-absolute\">" + 
				"</a>" + 
				"</li>";
		}
		str+="</ul>";
		$("#mychangshi").html(str);
	})
	
	//吉日
	url = "json/movingcompany.jiri.json";
	$.getJSON(url, function (data) {
		var x = data.length-1;
		var y = 0;
		str="<ul class='index-news-ul pl-0'>";
		for(var i = 0;i<5;i++){
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			str+="<li class=\"py-2 border-top\">" + 
				"<a href=\"javascript:void(0);\" title=\""+data[rand].title+"\" onclick='queryMessageDetailSerialNumber(\""+url+"\","+(rand+1)+")' class=\"text-dark position-relative d-flex align-items-center pr-2\">" + 
				"	<span></span> "+data[rand].title + 
				"	<img src=\"images/home_right.png\" alt=\""+data[rand].title+"\" class=\"index-news-ul-rightimg position-absolute\">" + 
				"</a>" + 
				"</li>";
		}
		str+="</ul>";
		$("#myjiri").html(str);
	})
	
	url = "json/movingcompany.wengda.json";
	$.getJSON(url, function (data) {
		var x = data.length-1;
		var y = 0;
		str="<ul class='index-news-ul pl-0'>";
		for(var i = 0;i<5;i++){
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			str+="<li class=\"py-2 border-top\">" + 
				"<a href=\"javascript:void(0);\" title=\""+data[rand].title+"\" onclick='queryMessageDetailSerialNumber(\""+url+"\","+(rand+1)+")' class=\"text-dark position-relative d-flex align-items-center pr-2\">" + 
				"	<span></span> "+data[rand].title + 
				"	<img src=\"images/home_right.png\" alt=\""+data[rand].title+"\" class=\"index-news-ul-rightimg position-absolute\">" + 
				"</a>" + 
				"</li>";
		}
		str+="</ul>";
		$("#mywenda").html(str);
	})
}

/**
 * 用户通过用户名和密码进行登录
 */
function userlogin(){
	if($("#txtUserName").val()!=""&&$("#txtPwd").val()!=""&&$("#message_code").val()!=""){
		if($('#canvas').attr('data-code')==$("#message_code").val().toLowerCase()){
			var json = {};
			json['username'] = $("#txtUserName").val();
			json['password'] = $("#txtPwd").val();
			url = "userlogin";
			MySubmitString(JSON.stringify(json), url, function(data) {
				if(data!=null&&data.msg=="ok"){
					$.cookie("userjson", JSON.stringify(data), { path : "/" });
					window.location.href = "index.html";
				}
				else{
					alert("用户名或密码错误！");
				}
			})
		}
		else{
			alert("验证码错误！");
		}
	}
}

/**
 * 用户通过邮箱进行登录
 */
function userloginbyemail(){
	if($("#email").val()!=null&&$("#email").val()!=''&&$("#txtCode").val()!=null&&$("#txtCode").val()!=''){
		var my = window.sessionStorage.getItem("appEmailVerifyCode");
		if(my!=null&&my!=''){
			var mydata = $.parseJSON(my);
			if(mydata.msg=="ok"){
				if(mydata.email==$("#email").val()){
					var json = {};
					json['user'] = mydata.user;
					$.cookie("userjson", JSON.stringify(json), { path : "/" });
					window.location.href="index.html";
				}
				else{
					var json = {};
					json['msg'] = "no";
					window.sessionStorage.setItem("appEmailVerifyCode",JSON.stringify(json));
					alert("您的邮箱已发生改变，请重新获取验证码!");
				}
			}
			else if(mydata.msg=="no_11"){
				alert("该邮箱尚未注册！");
			}
			else{
				alert("验证码失效，请重新获取！");
			}
		}
		else{
			alert("请填入您的邮箱并获取验证码！");
		}
	}
}

$(".mybtn").click(function(){
	if($("#username").html()!=''){
		window.location.href="gerenzhongxin.html";
	}
})

function closebox(str){
	$("#"+str).css("display","none");
}

function showbox(str){
	$("#"+str).css("display","block");
}