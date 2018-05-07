/**
 * 示例
 */
define(['jquery', 'bootstrapui'  ,'widget/http','widget/dialog'], ($, bootstrapui,http,dialog) => {

    var page = {

        /**
         * 模块参数
         */
        params: {
            customMenusData:null,
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
            page.params.customMenusData = data.customMenusData;
            var numitem = page.params.customMenusData.length;
            if(numitem < 9){
                // for(var i = 0 ; i < 9-numitem ; i++){
                page.params.customMenusData.push({
                    id:'addshortcut',
                    menuCname:'',
                    actionUrl:'#',
                    image:'fa-plus color-lightgray',
                    newpage:true
                });
                // }
            }
            $.templates({
                navMenusTmpl: "#customMenusTml"
            });
            $.templates.navMenusTmpl.link("#customMenus",{usermenus:page.params.customMenusData});
        },
        /**
         * 事件绑定
         */
        bindEvent() {
            $('.addshortcut').on('click',function(){
                var pagewidth = (parseInt(document.body.clientWidth)-950)/2;
                dialog.page({
                    title: '快捷功能选择',
                    stateParams: { pageType: 'add'},
                    type: 'GET',
                    loadUrl: '/shortcutmenu_select'
                });
                return false;
            }); 
        }
    };
    var service = {
        _queryAllTask(callBack){
            http.get({
                apiName: 'queryshortcutmenu',
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
                    $("#customMenus").empty();
                    $("#customMenus").html('<div class="row"><img src="/img/wait.png" width="50%" height="50%"/>服务暂不可用</div>');
                }
            })
        }
    };
    return {
        initPage: $.proxy(page.initPage, page)
    };
});
