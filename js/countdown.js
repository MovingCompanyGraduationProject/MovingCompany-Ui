/**
 * 获取验证码倒计时
 */
$(function(){
	/**
	 * 个人界面验证邮箱
	 */
	$(".captchaBtn").html('获取验证码').on("click", function(){
		if($("#email").val()!=null&&$("#email").val()!=''){
			var userjson = window.sessionStorage.getItem("userjson");
			if(userjson!=null){
				var mydata = $.parseJSON(userjson);
				if($("#email").val()!=mydata.user.email){
					var json = {};
					json['email'] = $("#email").val();
					var url="sendVisCode";
					MySubmitString(JSON.stringify(json), url, function(data) {
						data['email'] = $("#email").val();
						window.sessionStorage.setItem("appEmailVerifyCode",JSON.stringify(data));
						if(data.msg=="ok"){
							var that = $(".captchaBtn");
							var seconds = 60;
							that.attr("disabled", true);
							that.html(seconds+'秒');
							let promise = new Promise((resolve, reject) => {
							let setTimer = setInterval(
							() => {
							  seconds -= 1;
							  console.info('倒计时:' + seconds);
							  $(".captchaBtn").attr("value","重新发送("+seconds+"秒)");
							  that.html(seconds+'秒');
							  if (seconds <= 0) {
								  $(".captchaBtn").attr("value","重新发送");
								that.html('获取验证码');
								resolve(setTimer)
							  }
							}
							, 1000)
							})
							promise.then((setTimer) => {
							// console.info('清除');
							clearInterval(setTimer);
							that.attr("disabled", false);
							})
						}
						else{
							alert("验证码发送失败！");
						}
					})
				}
				else{
					alert("邮箱地址未改变，无需验证！");
				}
				
			}
			else{
				alert("请先登录!");
				window.location.href ="login.html";
			}
		}
	})
	
	/**
	 * 忘记密码验证邮箱
	 */
	$(".forgetBtn").html('获取验证码').on("click", function(){
		if($("#email").val()!=null&&$("#email").val()!=''){
			var json = {};
			json['email'] = $("#email").val();
			var url="sendVisCodeForget";
			MySubmitString(JSON.stringify(json), url, function(data) {
				data['email'] = $("#email").val();
				window.sessionStorage.setItem("appEmailVerifyCode",JSON.stringify(data));
				if(data.msg=="ok"){
					var that = $(this);
					var seconds = 60;
					that.attr("disabled", true);
					that.html(seconds+'秒');
					let promise = new Promise((resolve, reject) => {
					let setTimer = setInterval(
					() => {
					  seconds -= 1;
					  console.info('倒计时:' + seconds);
					  $(".forgetBtn").attr("value","重新发送("+seconds+"秒)");
					  that.html(seconds+'秒');
					  if (seconds <= 0) {
						  $(".forgetBtn").attr("value","重新发送");
						that.html('获取验证码');
						resolve(setTimer)
					  }
					}
					, 1000)
					})
					promise.then((setTimer) => {
					// console.info('清除');
					clearInterval(setTimer);
					that.attr("disabled", false);
					})
				}
				else if(data.msg=="no_11"){
					alert("该邮箱尚未注册！");
				}
				else{
					alert("验证码发送失败！");
				}
			})
		}
	})
	
	/**
	 * 用户注册界面验证邮箱
	 */
	$(".registerBtn").html('获取验证码').on("click", function(){
		if($("#email").val()!=null&&$("#email").val()!=''){
			var json = {};
			json['email'] = $("#email").val();
			var url="sendVisCode";
			MySubmitString(JSON.stringify(json), url, function(data) {
				data['email'] = $("#email").val();
				window.sessionStorage.setItem("appEmailVerifyCode",JSON.stringify(data));
				if(data.msg=="ok"){
					var that = $(".registerBtn");
					var seconds = 60;
					that.attr("disabled", true);
					that.html(seconds+'秒');
					let promise = new Promise((resolve, reject) => {
					let setTimer = setInterval(
					() => {
					  seconds -= 1;
					  console.info('倒计时:' + seconds);
					  $(".registerBtn").attr("value","重新发送("+seconds+"秒)");
					  that.html(seconds+'秒');
					  if (seconds <= 0) {
						  $(".registerBtn").attr("value","重新发送");
						that.html('获取验证码');
						resolve(setTimer)
					  }
					}
					, 1000)
					})
					promise.then((setTimer) => {
					// console.info('清除');
					clearInterval(setTimer);
					that.attr("disabled", false);
					})
				}
				else{
					alert("验证码发送失败！");
				}
			})
		}
	})
});