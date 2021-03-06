(function (d) {
    d.fn.lubo = function (b) {
        var g = {
            main: d(this),
            rlbtn: !0,
            Over: "mouseover",
            Out: "mouseout",
            Click: "click",
            Li: "li",
            _cirBox: ".lubo-box-btn",
            _cirOn: ".curr",
            luboTime: 4E3,
            switchTime: 400
        },
            a = d.extend(g, b);
        return this.each(function () {
                function b(a, b) {
                    d(a).css("z-index", b)
                }
                function g() {
                    f.append('<cite><a class="lubo-left"></a><a class="lubo-right"></a></cite>');
                    var e = f.find(".lubo-left"),
                        c = f.find(".lubo-right");
                    e.bind(a.Click, function () {
                            var c = d(a._cirBox),
                                e = d(a._cirOn).val();
                            f.children(a.Li).eq(e).stop(!1, !1).animate({
                                    opacity: 0
                                }, a.switchTime, function () {
                                    b(this, 0)
                                });
                            0 >= e && (e = h);
                            f.children(a.Li).eq(e - 1).stop(!1, !1).animate({
                                    opacity: 1
                                }, a.switchTime, function () {
                                    b(this, 1)
                                });
                            c.children(a.Li).eq(e - 1).addClass(a._cirOn.substring(1)).siblings().removeClass(a._cirOn.substring(1))
                        });
                    c.bind(a.Click, function () {
                            var e = d(a._cirBox),
                                c = d(a._cirOn).val();
                            f.children(a.Li).eq(c).stop(!1, !1).animate({
                                    opacity: 0
                                }, a.switchTime, function () {
                                    b(this, 0)
                                });
                            c == h - 1 && (c = -1);
                            f.children(a.Li).eq(c + 1).stop(!1, !1).animate({
                                    opacity: 1
                                }, a.switchTime, function () {
                                    b(this, 1)
                                });
                            e.children(a.Li).eq(c + 1).addClass(a._cirOn.substring(1)).siblings().removeClass(a._cirOn.substring(1))
                        })
                }
                function k() {
                    var e = a.main.find(a._cirBox),
                        c = e.find(a._cirOn).val();
                    f.children(a.Li).eq(c).stop(!1, !1).animate({
                            opacity: 0
                        }, a.switchTime, function () {
                            b(this, 0)
                        });
                    c == h - 1 && (c = -1);
                    f.children(a.Li).eq(c + 1).stop(!1, !1).animate({
                            opacity: 1
                        }, a.switchTime, function () {
                            b(this, 1)
                        });
                    e.children(a.Li).eq(c + 1).addClass(a._cirOn.substring(1)).siblings().removeClass(a._cirOn.substring(1))
                }
                var f =
                d("." + a.main.attr("class") + "-box"),
                    h = f.children(a.Li).length;
                    (function () {
                        a.main.append('<ul class="' + a._cirBox.substring(1) + '"></ul>');
                        for (var b = a.main.find(a._cirBox), c = 0; c < h; c++) b.append('<li style="" value="' + c + '"></li>');
                        c = b.width();
                        b.css({
                            left: "50%",
                            marginLeft: -c / 2,
                            bottom: "5%"
                        });
                        b.children(a.Li).eq(0).addClass(a._cirOn.substring(1))
                    })();
                a.rlbtn && g();
                int = setInterval(k, a.luboTime);
                a.main.bind(a.Over, function () {
                        clearTimeout(int)
                    });
                a.main.bind(a.Out, function () {
                        int = setInterval(k, a.luboTime)
                    });
                d(a._cirBox).children(a.Li).bind(a.Over, function () {
                        var e = d(this).index();
                        d(this).addClass(a._cirOn.substring(1)).siblings().removeClass(a._cirOn.substring(1));
                        f.children(a.Li).stop(!1, !1).animate({
                            opacity: 0
                        }, a.switchTime, function () {
                            b(this, 0)
                        });
                        f.children(a.Li).eq(e).stop(!1, !1).animate({
                            opacity: 1
                        }, a.switchTime, function () {
                            b(this, 1)
                        })
                    })
            })
    }
})($);
$(function () {
    $(".index-lubo").lubo();
    $(".index-blog-lubo").lubo();
});