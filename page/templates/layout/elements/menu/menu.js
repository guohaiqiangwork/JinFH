/**
 * 示例
 */
define(['jquery','widget/http'], ($,http) => {

    var page = {

        /**
         * 模块参数
         */
        params: {
            navMenusData:null,
            deferred: null
        },

        /**
         * 模块入口
         */
        initPage() {
            this.params.deferred = $.Deferred();
            this.params.deferred.done(() => {
                this.bindEvent();
            })
            //通过获取的数据请求页面的基本信息
            service._queryAllTask($.proxy(this.render,this));
            this.params.deferred.resolve('ok');
        },
        render(data){
            page.params.navMenusData = JSON.parse(data.navMenusData);
            $.templates({
                navMenusTmpl: "#navMenusTml"
            });
            $.templates.navMenusTmpl.link("#moreMenu",page.params.navMenusData);
        },
        /**
         * 事件绑定
         */
        bindEvent() {
            $('.js-activated').dropdownHover().dropdown();
        }
    };
    var service = {
        _queryAllTask(callBack){
            http.get({
                apiName: 'queryallmenu',
                cache:false,
                async:false,
                type: 'get',
                headers: {
                    Authorization: "Arch6WithCloud "+localStorage.getItem("jwt")
                }, 
                xhrFields: {
                    withCredentials: true
                },
                success(data) {
                    callBack && typeof (callBack) == 'function' && callBack(data.data);
                },
                error(data){
                    $("#moreMenu").empty();
                    $("#moreMenu").html("");
                }
            })
        }
    };
    return {
        initPage: $.proxy(page.initPage, page)
    };
});
