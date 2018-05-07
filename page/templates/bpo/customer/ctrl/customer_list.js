/**
 * Echo数据表格模块
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
                    apiName: 'customer_search',
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
                    name: "customerCode",
                    showname:"customerCode",
                    placeholder: "客户代码"
                },
                {
                    name: "customerName",
                    showname:"customerName",
                    placeholder: "客户名称"
                },
            ];
            var queryResultTitles = [
                {
                    label: "客户代码",
                    additionHtml: ' <input name="checkAll" type="checkbox" class="checkAll">'
                }, {
                    label: "客户名称"
                },
                {
                    label:"地址"
                },
                {
                    label:"邮编"
                }, 
                {
                    label:"传真"
                },
                { label: "联系人" },
                { label: "联系电话" },
                { label: "商务联系人" },
                { label: "商务联系电话" },
                {label: "操作"}
            ];

            var app = {
                title: "客户信息",
                queryConditions: queryConditions,
                queryResultTitles: queryResultTitles
            };
            myTemplate.link("#main-content", app);
        },

        /**
         * 事件绑定
         */
        bindEvent() {
            this.params.table_data._getTbody().on('click','i.view',$.proxy(this.viewClick, this));
            this.params.table_data._getTbody().on('click','i.delete',$.proxy(this.deletesClick, this));
            this.params.table_data._getTbody().on('click','i.setting',$.proxy(this.settingClick, this));
            this.params.table_data._getTbody().on('click','i.select',$.proxy(this.selectClick, this));
        },
        viewClick(event) {
                let $this = $(event.target),
                id = $this.data('id');
                /*route_config.go('/customer/add', { pageType: 'add', id: id }, {
                    $container: $.main_content, //指定的容器；$.main_content已保存在全局变量，可以参考global_param.js
                    isInitPage: true
                });*/
                //打开一个新页面
                dialog.page({
                    title: '查看',
                    stateParams: { pageType: 'view', id: id }, //传输给新页面的数据；pageType比传；update,add,view
                    loadUrl: '/bpo/customer/add'
                });
        },
        deletesClick(event) {
            let $this = $(event.target),
                id = $this.data('id');
            dialog.confirm({
                content: '确定删除吗?',
                onSuerBefore() {
                    http.post({
                        apiName: 'customer_delete',
                        isMask: true,
                        urlParams: { ids: id },
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
                    loadUrl: '/bpo/customer/setting'
                });
        },
        selectClick(event) {
            let $this = $(event.target),id = $this.data('id');
                //打开一个新页面
            bootbox.confirm({
                buttons: {  
                    confirm: {  
                        label: '确认'   
                    },  
                    cancel: {  
                        label: '取消' 
                    }  
                },  
                message: '确认使用模板'+id+'吗？',  
                callback: function(result) {  
                    if(result) {  
                        localStorage.setItem('customerCode',id);
                        page.params.table_data._showPage(null, null, true)
                    } else {  
                        return; 
                    }  
                }, 
            });
        },
        bts: [],
        /**
         * table的模板
         */
        columns: [{
            label: "客户代码",
            data: 'customerCode'
        }, {
            label: "客户名称",
            data: 'customerName'
        }, {
            label:"地址",
            data: 'address'
        }, {
            label:"邮编",
            data: 'postCode'
        }, {
            label:"传真",
            data: 'faxCode'
        }, {
            label: "联系人" ,
            data: 'contactMan'
        },{
            label: "联系电话",
            data: 'phone'
        },{
            label: "商务联系人",
            data: 'bussinessMan'
        },{
            label: "商务联系电话",
            data: 'bussinessPhone'
        },{
            label: "操作",
            data: 'customerCode',
            render(data, row) {
                var customerCode = localStorage.getItem('customerCode');
                let str = '<a href="#" title="查看"> <i class="fa fa-pencil-square-o fa-lg view" data-id="'+data+'"></i></a>&nbsp;';
                str += '<a href="#" title="删除" ><i class="fa fa-trash-o fa-lg delete" data-id="'+data+'"></i></a>&nbsp;';
                str+= '<a href="#" title="模板配置" ><i class="fa fa fa-cogs fa-lg setting" data-id="'+data+'"></i></a>&nbsp;'
                if(customerCode==row.customerCode){
                    str+= '<a href="#" title="选择模板" ><i class="fa fa-flag fa-lg select" data-id="'+data+'"></i></a>&nbsp;'
                }
                else{
                    str+= '<a href="#" title="选择模板" ><i class="fa fa-flag-o fa-lg select" data-id="'+data+'"></i></a>&nbsp;'
                }
                str+= '<a href="#" title="模板导出" ><i class="fa fa fa-cloud-download fa-lg setting" data-id="'+data+'"></i></a>&nbsp;'
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
