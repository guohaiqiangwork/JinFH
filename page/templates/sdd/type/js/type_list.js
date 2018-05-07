/**
 * 功能管理模块
 */
define(['jquery', 'widget/table_data', 'widget/dialog', 'route_config', 'widget/http', 'service/util_service','bootbox'],
 ($, table_data, dialog, route_config, http, util_service,bootbox) => {

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
            this.initData();
            //初始化数据表格
            this.params.table_data = table_data.show({
                view: {
                    apiName: 'search_sdd_type',
                    columns: this.columns,
                    bts: this.bts,
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
        //初始化表格数据
        initData(){
            var myTemplate = $.templates("#queryFormTmpl");

            var queryConditions = [
                {
                    name: "type",
                    showname:"type",
                    placeholder: "类型"
                },{
                    name: "typeDesc",
                    showname:"typeDesc",
                    placeholder: "类型描述"
                }
            ];
            var app = {
                title: "数据类型",
                queryConditions: queryConditions,
            };
            myTemplate.link("#main-content", app);
        },

        /**
         * 事件绑定
         */
        bindEvent() {
            this.params.table_data._getTbody().on('click','i.delete',$.proxy(this.deletesClick, this));
            this.params.table_data._getTbody().on('click','i.setting',$.proxy(this.settingClick, this));
        },
        deletesClick(event) {
            let $this = $(event.target),
            id = $this.data('id');
            dialog.confirm({
                content: '确定删除吗?',
                onSuerBefore() {
                    http.post({
                        apiName: 'delete_sdd_type',
                        isMask: true,
                        urlParams: {ids: id },
                        success(data) {
                            dialog.alert({
                                content: '删除成功。'
                            });
                            //删除成功后继续查找第一页
                            page.params.table_data._showPage(0);
                        }
                    });
                }
            });
        },
        settingClick(event) {
             let $this = $(event.target),
                id = $this.data('id');
                /*route_config.go('/customer/add', { pageType: 'add', id: id }, {
                    $container: $.main_content, //指定的容器；$.main_content已保存在全局变量，可以参考global_param.js
                    isInitPage: true
                });*/
                //打开一个新页面
                dialog.page({
                    title: '配置',
                    stateParams: { pageType: 'setting', id: id }, //传输给新页面的数据；pageType比传；update,add,view
                    loadUrl: '/sdd/type/edit'
                });
        },
        bts: [{
            dataRouter: "/sdd/type/edit", //跳转路由
            dataType: "create", //按钮类型
            label: UtilMsg.btCreate, //按钮标题:新增
            isSelect: false, //是否选中才允许点击；
            isCustom: false //是否自定义按钮
        }],
        /**
         * table的模板
         */
        columns: [{
            label: "ID",
            data: 'id'
        }, {
            label: "类型",
            data: 'type'
        }, {
            label:"类型描述",
            data: 'typeDesc'
        },{
            label:"状态",
            data: 'validStatus'
        },{
            label: "创建时间",
            data: 'insertTimeForHis',
            render(data) {
                return new Date(data).Format("yyyy-MM-dd");
            }
        },{
            label: "操作",
            data: 'id',
            render(data, row) {
                var systemCode = localStorage.getItem('systemCode');
                let str =""
                str+= '<a href="#" title="模板配置" ><i class="fa fa fa-cogs fa-lg setting" data-id="'+data+'"></i></a>&nbsp;'
                str += '<a href="#" title="删除" ><i class="fa fa-trash-o fa-lg delete" data-id="'+data+'"></i></a>&nbsp;';
                return str;
            }
        }],
    };

    return {
        initPage: $.proxy(page.initPage, page),
        search() {
            page && page.params && page.params.table_data && page.params.table_data._showPage(null, null, true);
        }
    };
});
