/**
 * Echo数据表格模块
 */
define(['jquery','widget/table_data', 'widget/dialog', 'route_config', 'widget/http', 'service/util_service','bootbox'],
 ($,table_data, dialog, route_config, http, util_service,bootbox) => {

    var page = {

        /**
         * 模块参数
         */
        params: {
            table_data: null, //数据表格引用
        },

        /**
         * 模块入口
         */
        initPage() {
            this.columns=[
            {
                label: "序号",
                data: 'id',
                render(data, row, displayIndex) {
                    return data;
                }
            },
            {
                label: "标题",
                data: 'title',
                render(data, row, displayIndex) {
                    return '<a class="title" href="#" data-id="'+row.id+'">'+data+'</a>';
                }
            }];
            this.render();
            this.params.table_data = table_data.show({
                view: {
                    apiName: 'queryAllMsg',
                    columns: this.columns,
                    isAuto:true,
                    isRightAway:true
                },
                callback: {
                    callSearch() {
                        return page.callSearch();//返回true才会执行查询，可以进行查询前校验，比如日期大小等
                    }
                }
            });
            this.bindEvent();
        },
        callSearch() {
            return true;
        },
        render(){
            var myTemplate = $.templates("#messageListTmpl");       
            var app = {
                title: "消息",
            };
            myTemplate.link("#main-content", app);
        },
        //初始化表格数据
        /**
         * 事件绑定
         */
        bindEvent() {
            this.params.table_data._getTbody().on('click','a.title',$.proxy(this.viewClick, this));
        },
        viewClick(event){
            let $this = $(event.target),
                id = $this.data('id');
            dialog.page({
                title: '消息查看',
                stateParams: { pageType: 'view', id: id}, //传输给新页面的数据；pageType比传；update,add,view
                loadUrl: '/msg/view'
            });
        },
        /**
         * table的模板
         */
        columns: []
    };
    var service = {
        _queryAllMsg(callBack){
            http.get({
                apiName: 'queryAllMsg',
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
                }
            })
        }
    };
    return {
        initPage: $.proxy(page.initPage, page),
        search() {
            page && page.params && page.params.table_data && page.params.table_data._showPage(null, null, true);
        }
    };
});
