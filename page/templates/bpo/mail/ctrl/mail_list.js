/**
 * Echo数据表格模块
 */
define(['jquery', '../../bpo_service','widget/table_data', 'widget/dialog', 'route_config', 'widget/http', 'service/util_service','bootbox'], ($,bpo_service,table_data, dialog, route_config, http, util_service,bootbox) => {

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
                    apiName: 'task_search',
                    columns: this.columns
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
        /**
         * 事件绑定
         */
        bindEvent() {
            this.params.table_data._getTbody().on('click','i.deliver',$.proxy(this.deliverClick, this));
        },
        render(data){

        },
        //初始化表格数据
        initData(){
            var myTemplate = $.templates("#queryFormTmpl");

            var queryConditions = [
                {
                    name: "taskId",
                    showname:"taskId",
                    placeholder: "邮寄单号"
                },
                {
                    name: "transportId",
                    showname:"transportId",
                    placeholder: "邮寄批次号"
                },
            ];
            var app = {
                title: "任务",
                queryConditions: queryConditions
            };
            myTemplate.link("#main-content", app);
        },
        deliverClick(event){
            let $this = $(event.target),
                taskId = $this.data('id'),
                id = localStorage.getItem('customerCode');
            dialog.page({
                title: '详细信息',
                stateParams: { pageType: 'deliver', id: id,taskId:taskId,table_data:this.params.table_data}, //传输给新页面的数据；pageType比传；update,add,view
                loadUrl: '/bpo/mail/detail'
            });
        },
        /**
         * table的模板
         */
        columns: [{
            data: 'taskId',
            style: 'min-width:80px;', //th样式
            label: '<input name="checkAll" type="checkbox" class="checkAll">&nbsp;&nbsp;' + '邮寄单号', //table显示的标题 国际化内容：序号
            render(data, row, displayIndex) {
                return '&nbsp;&nbsp;<input name="checkCode" type="checkbox" value="' + data + '" />&nbsp;&nbsp;' + data;
            }
        },
        {   label: "邮寄批次",
            data: 'transportId'
        }, 
        {   label: "物流类型",
            data: 'mailType',
            render(data,row) {
                switch(data){
                    case '01':
                        return '第三方物流';
                        break;
                    case '02':
                        return '天信致远物流';
                        break;
                    case '03':
                        return '自送';
                        break;
                }
            }
        },
        {   label: "邮寄地址",
            data: 'mailAddress'
        }, 
        {   label: "邮寄时间",
            data: 'mailTime',
            render(data) {
                return new Date(data).Format("yyyy-MM-dd");
            }
        },
        {   label: "状态",
            data: 'status',
            render(data,row) {
                switch(data){
                    case '01':
                        return '待处理';
                        break;
                    case '02':
                        return '已完成';
                        break;
                }
            }
        },{   
            label: "操作",
            data:'taskId',
            render(data,row) {
                let str = '';
                str += '<a href="#" title="邮寄"> <i class="fa fa-envelope-o fa-lg deliver" data-id="'+data+'"></i></a>&nbsp;';
                return str;
            }
        }]
    };

    return {
        initPage: $.proxy(page.initPage, page),
        search() {
            page && page.params && page.params.table_data && page.params.table_data._showPage(null, null, true);
        }
    };
});
