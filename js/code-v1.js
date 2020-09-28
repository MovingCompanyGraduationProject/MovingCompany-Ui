/**
 * Created by bangying on 16-10-13.
 */
/*
 select drop list
 美化select控件，通过模拟下拉列表实现美化效果
 */
+function($) {
    'use strict';
    //drop list class define
    var basicdroplist = ".basic-select";
    var basicdroplisttoggle = ".basic-select-toggle";
    //clear drop list
    function clearDropList(e) {
        $(basicdroplist).removeClass("basic-s-open");
    }
    function dropListToggle(e) {
        if ($(e.target).parents(basicdroplist).length > 0) {
            return;
        }
        clearDropList();
    }

    function dropListOpen() {
        clearDropList();
        //这里有个性能问题，每次打开下拉列表，下拉列表项都重新加载，以后考虑优化
        var $this = $(this);
        if (!$this) {
            return;
        }
        var $select = $this.find("select");
        if (!$select || $select.length <= 0) return;
        var $ul = $this.find(".basic-select-list");
        if (!$ul || $ul.length <= 0) return;
        var options = $select.find("option");
        if (!options || options.length <= 0) return;
        $ul.empty();
        for (var i = 0; i < options.length; i++) {
            var v = $(options[i]).attr("value");
            var t = $(options[i]).text();
            $ul.append("<li data-value=\"" + v + "\">" + t + "</li>");
        }
        if ($this.hasClass("basic-s-open")) return;
        $this.addClass("basic-s-open");
        if ($this.outerWidth() > $ul.outerWidth()) {
            $ul.outerWidth($this.outerWidth());
        }
    }

    function dropListSelect() {
        var $this = $(this);
        var $parent = $this.parents(basicdroplist);
        var $toggle = $parent.find(basicdroplisttoggle);
        var $select = $parent.find("select");
        if (!$select || $select.length <= 0) return;
        if (!$this.is(basicdroplist + " ul li")) return;
        var v = $this.attr("data-value");
        var t = $this.text();
        $toggle.find("span").text(t);
        $parent.attr("data-value", v);
        $parent.addClass("selected");
        $select.val(v);
        $select.trigger("change");
        //强制关闭下拉列表
        clearDropList();
    }
	
    $(document).on("click.basic.droplist", dropListToggle)
        .on("click.basic.droplist", basicdroplist, dropListOpen)
        .on("click.basic.droplist", basicdroplist + " ul li", dropListSelect);
} (jQuery);

/*autosearch*/
+function ($) {
    $.fn.autoSearch = function (ops) {
        var default_options = {
            maxLength: 10,
            fn_get: null,
            items: [],//由于存在disable属性，因此使用对象{v:"选项内容",disable:"disabled",data:""}
            selected: null
        };
        var options = $.extend(default_options, ops);
        return this.each(function () {
            var o = options;
            var $this = $(this);
            $this.focus(function () {
                $this.parents(".basic-search").addClass("on");
            });
            // $this.blur(function () {
            //     $this.parents(".basic-search").removeClass("on basic-search-on");
            // }); //失去焦点会导致列表项无法点击，使用全局click事件
            $this.bind("input propertychange", function () {
                $this.parents(".basic-search").find(".basic-search-list").empty();
                if (o.items && o.items.length > 0) {

                    for (var i = 0; i < o.items.length && i <= o.maxLength; i++) {
                        var ci = o.items[i];
                        if (ci.disable === "disabled") {
                            $this.parent().next().append("<li class='disabled' data-value=\""+ci.data+"\">" + ci.v + "</li>");
                        } else {
                        $this.parent().next().append("<li data-value=\"" + ci.data + "\">" + ci.v + "</li>");
                        }

                    }
                    $this.parents(".basic-search").addClass("basic-search-on");
                }
                else {
                    if (typeof o.fn_get === "function") {
                        var fn_items = o.fn_get();
                        if (fn_items && fn_items.length > 0) {
                            $this.parent().find(".basic-search-list").empty();
                            for (var i = 0; i < fn_items.length && i <= o.maxLength; i++) {
                                var ci = fn_items[i];
                                if (ci.disable === "disabled") {
                                    $this.parent().next().append("<li class='disabled' data-value=\"" + ci.data + "\">" + ci.v + "</li>");
                                } else {
                                $this.parent().next().append("<li data-value=\"" + ci.data  + "\">" + ci.v + "</li>");
                                }

                            }
                            $this.parents(".basic-search").addClass("basic-search-on");
                        }
                        else {
                            $this.parents(".basic-search").removeClass("basic-search-on");
                        }
                    }
                    else {
                        $this.parents(".basic-search").removeClass("basic-search-on");
                    }
                }
            });
            //键盘事件
            $this.keyup(function (e) {
                var $list = $this.parent().next();
                console.log(e.which);
                switch (e.which) {
                    case 13:
                        $(".basic-search").removeClass("on basic-search-on");
                        if (typeof o.selected === "function") {
                            o.selected();
                        }
                        return;
                    case 38://方向键向上
                        var items = $list.find("li");
                        if (items && items.length > 0) {
                            var cur_hover_li = $list.find("li.hover");
                            if (cur_hover_li && cur_hover_li.length > 0) {
                                //查找上一个非disabled对象
                                var last = $(cur_hover_li).prev(":not(.disabled)");
                                if (last && last.length > 0) {
                                    cur_hover_li.removeClass("hover");
                                    last.addClass("hover");
                                    //同时改变文本框内容
                                    $this.val(last.text()).attr("data-value", last.attr("data-value"));
                                }
                            }
                            else {
                                //最后一个非disabled对象
                                var lasted = $list.find("li:not(.disabled)").last();
                                if (lasted && lasted.length > 0) {
                                    lasted.addClass("hover");
                                    //同时改变文本框内容
                                    $this.val(lasted.text()).attr("data-value", last.attr("data-value"));
                                }
                            }
                        }
                        return;
                    case 40://方向键向下
                        var items = $list.find("li");
                        if (items && items.length > 0) {
                            var cur_hover_li = $list.find("li.hover");
                            if (cur_hover_li && cur_hover_li.length > 0) {
                                //查找下一个非disabled对象
                                var next = $(cur_hover_li).next(":not(.disabled)");
                                if (next && next.length > 0) {
                                    cur_hover_li.removeClass("hover");
                                    next.addClass("hover");
                                    //同时改变文本框内容
                                    $this.val(next.text()).attr("data-value", next.attr("data-value"));
                                }
                            }
                            else {
                                //第一个非disabled对象
                                var first = $list.find("li:not(.disabled)").first();
                                if (first && first.length > 0) {
                                    first.addClass("hover");
                                    //同时改变文本框内容
                                    $this.val(first.text()).attr("data-value", first.attr("data-value"));
                                }
                            }
                        }
                        return;
                    default:
                        return;
                }
            });
            //.basic-search-list hover
            $(document).on("mouseover.basic.autoSearch", ".basic-search-list li", function () {

                $(".basic-search-list li.hover").removeClass("hover");
                $(this).addClass("hover");
            })
            $(document).on("mouseout.basic.autoSearch", ".basic-search-list li", function () {

                $(this).removeClass("hover");
            });
            //选择事件
            $(document).on("click.basic.autoSearch", ".basic-search-list li", function () {
                var v = $(this).text();
                console.log("click")
                //同时改变文本框内容
                $this.val(v).attr("data-value", $(this).attr("data-value"));
                $(".basic-search").removeClass("on basic-search-on");
                if (typeof o.selected === "function") {
                    o.selected();
                }
            })
            $(document).on("click.basic.autoSearch", function (e) {
                if ($(e.target).parents(".basic-search").length > 0) {
                    return;
                }
                else {
                    $(".basic-search").removeClass("on basic-search-on");
                }
            })
        })

    }
}(jQuery);

+function ($) {
    $.fn.basictips = function (opts) {
        var default_options = {
            mode: "top",//提示框模式，上、下、左、右,top,bottom,left,right
            content: "",
            width: 200,
			sposition:"",
            times: 0
        };
        var options = $.extend(default_options, opts);
        var tips_class = "basic-tips-top";
		var sp_class="";
		switch (options.sposition) {
            case "left":
               sp_class="basic-sp-left";
                break;
            default:
               sp_class="";
                break;
        }
        switch (options.mode) {
            case "top":
                tips_class = "basic-tips-top "+sp_class;
				//console.log(tips_class);
                break;
            case "left":
                tips_class = "basic-tips-left";
                break;
            case "right":
                tips_class = "basic-tips-right";
                break;
            case "bottom":
                tips_class = "basic-tips-bottom";
                break;
            default:
                tips_class = "basic-tips-top";
                break;
        }
        var tips_win = "<div class=\"basic-tips-default on " + tips_class + "\" style=\"width:" + options.width + "px\"><i class=\"basic-tips-tri-big\"><i class=\"basic-tips-tri-sm\"></i></i>" + options.content + "</div>";
        $("body").append(tips_win);
        //根据mode确定tips位置
        var $this = $(this);
        var top = 0;
        var left = 0;
        var size = 10;
		  if (tips_class == "basic-tips-top ") {
            top = $this.offset().top - $(".basic-tips-default").outerHeight() - size;
			left = $this.offset().left - ($(".basic-tips-default").outerWidth()-3*size);
        }
		if (tips_class == "basic-tips-top basic-sp-left") {
            top = $this.offset().top - $(".basic-tips-default").outerHeight() - size;
            left = $this.offset().left;
        }
        if (tips_class == "basic-tips-left") {
            top = $this.offset().top - size / 2;
            left = $this.offset().left - ($(".basic-tips-default").outerWidth() + size);
        }
        if (tips_class == "basic-tips-right") {
            top = $this.offset().top - size / 2;
            left = $this.offset().left + ($this.outerWidth() + size);
        }
        if (tips_class == "basic-tips-bottom") {
            top = $this.offset().top + $this.outerHeight() + size;
            left = $this.offset().left;
        }
        $(".basic-tips-default").css({left: left + 'px', top: top + 'px'});
        if (options.times > 0) {
            setTimeout("$.basictipsClear()", options.times);
        }
    }
    $.basictipsClear = function () {
        $(".basic-tips-default").remove();
    }
}(jQuery);
/*title:标题
subtitle:子标题
content:内容
cstyle:仅支持{lg: false} 是否大字
icon:图表  仅支持1,2
*/
+function ($) {
    $.basicLayer = function (options) {
        var default_options = {
            title: "",
            subtitle: "",
            content: "",
          //  cstyle: {lg: false},
            //icon: 0,
			addclass:"",
           // btns: [{title: "确定", style: "ok", url: "", onclick: null}, {
//                title: "取消",
//                style: "cancel",
//                url: "",
//               aclick: null
//            }]
        };
        var opts = $.extend(default_options, options);
        //var opts = $.extend(options||{});
         var l_win = "<div class='basic-layer " +opts.addclass + "'>";
        if (opts.title && opts.title != "") {
            l_win += "<div class='basic-layer-title basic-layer-title-v'>" + opts.title + " <i class='iconfont basic-layer-close'>&#xe610;</i></div>";
        }
        else {
            l_win += "<div class='basic-layer-title '> <i class='iconfont basic-layer-close'>&#xe610;</i></div>";
        }
		 l_win += "<div class='basic-layer-main'>" + opts.content + "</div>";
       // l_win += "<div class='basic-layer-info'>";
//        var m_class = "";
//        if (opts.subtitle && opts.subtitle != "") {
//            l_win += "<h2>" + opts.subtitle + "</h2>";
//            m_class += " basic-layer-main-h";
//        }
//        if (opts.icon > 0) {
//            l_win += "<div class='basic-layer-icon layer-icon-" + opts.icon + "'><i></i></div>";
//            m_class += " basic-layer-main-icon";
//        }
//        if (opts.cstyle.lg) {
//            l_win += "<div class='basic-layer-main basic-layer-main-lg " + m_class + "'><p>" + opts.content + "</p></div>";
//        }
//        else {
//            l_win += "<div class='basic-layer-main " + m_class + "'><p>" + opts.content + "</p></div>";
//        }
        //按钮
        if (opts.btns && opts.btns.length > 0) {
            l_win += "<div class='basic-layer-btns'>";
            for (var i = 0; i < opts.btns.length; i++) {
			(function(i){  
                var b = opts.btns[i];
                if (b.url && b.url != "") {
                    l_win += "<a href='" + b.url + "' class='basic-layer-btn layer-btn-" + b.style + " layer-btn-sort-" + i + "'id='layer-btn-order" + i + "'>" + b.title + "</a>";
				}
                else {
                    l_win += "<a href='javascript:' class='basic-layer-btn layer-btn-" + b.style + " layer-btn-sort-" + i + "'id='layer-btn-order" + i + "'>" + b.title + "</a>";
                   if (typeof b.onclick === "function") {
					         $(document).off("click","#layer-btn-order" + i);//去除click事件
							 $(document).on("click", "#layer-btn-order" + i, function () { 
								b.onclick();
									
                           });
                    }
                    else {
						  $(document).off("click","#layer-btn-order" + i);
						 $(document).on("click", "#layer-btn-order" + i, function () {
                            $.basicLayer.close();
                        });
                    }
                }
				 })(i); 					
            }
            l_win += "</div>";
        }
       // l_win += "</div>"
//        l_win += "</div>";
        $("body").append("<div class='basic-layer-shadow'></div>");
        $("body").append(l_win);
        $("body").addClass("body-mode");
        $(document).on("click", ".basic-layer-close", function () {
            $.basicLayer.close();
        });
		isGoogle();
		tipShow();
    }
    $.basicLayer.close = function () {
        $(".basic-layer-shadow").remove();
        $(".basic-layer").remove();
        $("body").removeClass("body-mode");	
    }
	function isGoogle() {
	var userAgent = navigator.userAgent; 
	  var isChrome =userAgent.indexOf("Chrome") !== -1;
	     if (isChrome)  {
         $(".basic-select .iconfont,.basic-select-togglenew .iconfont").css({"-webkit-transform":"scale(0.6)"});
        } 
	}
	function tipShow(){
		$form=$(".basic-form-group");
		 $form.each(function() {
		  var k= $(this).find(".form-control").val();
		   
		  if($.trim(k) == ""){
				$(this).find(".input-notice").show();
		   }else{
                                        $(this).find(".form-control").addClass("basic-has-text");
					$(this).find(".input-notice").hide(); 
				}
		   });
	}
}(jQuery);
//表单输入框模拟的placeholder的效果
+function ($) {
     var $form=$(".basic-form-group");
	  $form.each(function() {
		  var k= $(this).find(".form-control").val();
		   
		  if($.trim(k) == ""){
				$(this).find(".input-notice").show();
		   }else{
			        $(this).find(".form-control").addClass("basic-has-text");
					$(this).find(".input-notice").hide(); 
				}
		});
	 $(document).on("click",".input-notice",function(){
		  $(this).siblings(".form-control").focus();
		 });
	$(document).on("focus",".form-control",function(){
		  var key = $(this).val();
            if ($.trim(key) == "") {
               // $(this).siblings(".input-notice").addClass("input-notice-on");
				$(this).removeClass("basic-has-text");
            }else{
				 $(this).addClass("basic-has-text");
				 $(this).siblings(".input-notice").hide();
				}
		 });
	$(document).on("blur",".form-control",function(){
		   var key = $(this).val();
            if ($.trim(key) == "") {
                // $(this).siblings(".input-notice").removeClass("input-notice-on");
				$(this).removeClass("basic-has-text");
            }else{
				 $(this).addClass("basic-has-text");
				 $(this).siblings(".input-notice").hide();
				}
		 });
	$(document).on("input propertychange keyup keydown",".form-control",function(){
		  var key = $(this).val();
            if ($.trim(key) == "") {
                 $(this).siblings(".input-notice").show();
            }
            else {
                $(this).siblings(".input-notice").hide();
            }
			//已经输入框已经有错误提示后再次输入时提示框消失
		     var $basicForm=$(this).parents(".basic-form-group");
			 var $basicInput=$(this).parent(".basic-input")
			var Isfalse=$basicForm.hasClass("basic-has-error");
			var Ishas=$basicInput.hasClass("basic-has-error");
			if(Isfalse||Ishas){
				$(".errText").empty();
				$basicForm.removeClass("basic-has-error");
				$basicInput.removeClass("basic-has-error");
				$basicForm.siblings(".errorText").empty();
				$basicForm.find(".errorText").empty();
				//$basicForm.find(".form-control").addClass(".plr-input");
				}
			
		});
}(jQuery);

//textarea模拟的placeholder的效果
+function ($) {
     var $form=$(".basic-textarea-box ");
	  $form.each(function() {
		  var k= $(this).find(".basic-textarea").val();
		  if($.trim(k) == ""){
				$(this).find(".basic-textarea-span").show();
		   }else{
					$(this).find(".basic-textarea-span").hide(); 
				}
		});
	 $(document).on("click",".basic-textarea-span",function(){
		  $(this).siblings(".basic-textarea").focus();
		 });
	$(document).on("focus",".basic-textarea",function(){
		  var key = $(this).val();
            if ($.trim(key) == "") {
               // $(this).siblings(".basic-textarea-span").addClass("basic-textarea-on");
            }else{
				 $(this).siblings(".basic-textarea-span").hide();
				}
		 });
	$(document).on("blur",".basic-textarea",function(){
		   var key = $(this).val();
            if ($.trim(key) == "") {
               //  $(this).siblings(".basic-textarea-span").removeClass("basic-textarea-on");
            }else{
				 $(this).siblings(".basic-textarea-span").hide();
				}
		 });
	$(document).on("input propertychange keyup keydown",".basic-textarea",function(){
		  var key = $(this).val();
            if ($.trim(key) == "") {
                 $(this).siblings(".basic-textarea-span").show();
            }
            else {
                $(this).siblings(".basic-textarea-span").hide();
            }
			
		});
	//鼠标滑过提示语的效果
	$(document).on("mouseenter",".input-notice",function(){
		  $(this).siblings(".form-control").mouseenter();
	 });
	$(document).on("mouseleave",".input-notice",function(){
		  $(this).siblings(".form-control").mouseleave();
	 });
	$(document).on("mouseenter",".form-control",function(){
		 $(this).addClass("border-bbb");
	 });
	 $(document).on("mouseleave",".form-control",function(){
		  $(this).removeClass("border-bbb");
	 });
}(jQuery);

//new select
+function ($) {
	//模拟select效果，点击不是菜单区域，菜单隐藏
	$(document).on("click",function(e){
		 if($(e.target).closest(".basic-select-new").length == 0){
			 $(".select-cont-list").hide();
			 $(".basic-select-togglenew .iconfont").html("&#xe63c;");
            }
		});
	//点击下拉框的下拉效果
	$(document).on("click",".basic-select-togglenew",function(){
		    $(".basic-select-togglenew .iconfont").html("&#xe63c;");
			$(this).find(".iconfont").html("&#xe642;");
			$(".select-cont-list").hide();
			var len=$(this).siblings(".select-cont-list").find("li").length;
			if(len>0){
				$(this).siblings(".select-cont-list").show();
			}else{$(this).siblings(".select-cont-list").hide();}
		});
	//点击下拉框中选项后的效果
	$(document).on("click",".basic-cont-list li",function(){
			var $parent=$(this).parents(".basic-select-new");
			var $toggle=$parent.find(".basic-select-togglenew");
			var t=$(this).text();
			$toggle.find("span").text(t);
			$(this).parents(".select-cont-list").hide();
			$toggle.find(".iconfont").html("&#xe63c;");
			$parent.addClass("selected");
	  });
}(jQuery);
//about new hot city ,surround city,friend link
+function ($) {
	$(function(){
			//判断显示更多按钮是否显示
		isBtnShow();
    		//导航切换
	    	$(".basic-fnav li").hover(function(){
	    		var index=$(this).index();
		    	$(this).addClass("on").siblings().removeClass("on");
		    	$(".basic-fcont dl").eq(index).show().siblings().hide();
	    	});
	    	//点击显示更多，热门城市、周边城市、友情链接
	    	$(".basic-togglebtn").click(function(){
		    	var  $icon=$(this).find(".iconfont"),
			    	$par=$(this).parent("dl"),
			    	 isHas=$par.hasClass("basic-ishide");
		    	if(isHas){
		    	  $par.removeClass("basic-ishide");
		    		$icon.html("&#xe757;");
		    		
		    	}else{
		    		$par.addClass("basic-ishide");
		    		$icon.html("&#xe756;");
		    	}
	    	});
	});
	    	//判断显示更多按钮是否存在
	    	function isBtnShow(){
	    	$(".basic-fcont dl").each(function(){
	    		var h=$(this).outerHeight(),
	    		mh=parseInt($(".basic-ishide").css("max-height"));
	    		len=$(this).find("dd").length;
	    		if(mh>h){
	    			$(this).find(".basic-togglebtn").hide();
	    		}else{
	    			if(len>30){
	    			   $(this).find(".basic-togglebtn").show();	
	    			}else{
	    			  $(this).find(".basic-togglebtn").hide();
	    			}
	    		}
	    	});
	    }
}(jQuery);