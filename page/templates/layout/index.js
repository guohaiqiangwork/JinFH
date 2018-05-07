var _international = null;
Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "h+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/ ) {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0)
            from += len;
        for (; from < len; from++) {
            if (from in this && this[from] === elt)
                return from;
        }
        return -1;
    };
}
!window.console && (window.console = {
    log() {

    },

    info() {

    }
});
window.system = {
		println(msg, mou) { 
        console.info(mou + ':', msg);
    }
};


(function($) {
    
   /* function getCookie(key) {
        var _cookie = document.cookie,
            items = _cookie.split(";"),
            item = [];
        for (var i = 0, size = items.length; i < size; i++) {
            item = items[i].split("=");
            if (key == item[0].replace(/(^\s*)|(\s*$)/g, "") && item.length == 2) {
                return decodeURIComponent(item[1]);
            }
        }
        return '';
    }
    _international = getCookie('international');
    if (_international == '' || !_international)
        _international = 'zh';
    // obtain requirejs config
    require(['require', './page/require_config'], function(require, config) {

        // set cache beater
        config.urlArgs = "v=1.0.0";

        // update global require config
        window.require.config(config);

        // load app
        require(['./page/bootstrap.js']);
    });*/
   
	
})();
