window.onscroll=function(){
    var topScroll = get_scrollTop_of_body();
    var bignav = document.getElementById("txlposition");
    if(topScroll > 105){
        bignav.style.position = 'fixed';
        bignav.style.top = '0';
        bignav.style.zIndex = '9999';
        bignav.style.width = '100%';
        bignav.style.background = '#fff';
    }else{
        bignav.style.position = 'static';
    }
}
/*解决浏览器兼容问题*/
function get_scrollTop_of_body(){
    var scrollTop;
    if(typeof window.pageYOffset != 'undefined'){
        scrollTop = window.pageYOffset;
    }else if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat')        {
        scrollTop = document.documentElement.scrollTop;
    }else if(typeof document.body != 'undefined'){
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}
