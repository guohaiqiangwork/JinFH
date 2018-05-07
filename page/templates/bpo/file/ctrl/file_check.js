/**
 * Echo数据表格模块
 */
define(['jquery', '../../bpo_service','widget/table_data', 'widget/dialog', 'route_config', 'widget/http', 'service/util_service','bootbox'],
 ($,bpo_service,table_data, dialog, route_config, http, util_service,bootbox) => {

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
            let customerCode = localStorage.getItem('customerCode');
            this.columns=[{
                data: 'barCode',
                style: 'min-width:80px;', //th样式
                label: '<input name="checkAll" type="checkbox" class="checkAll">&nbsp;&nbsp;' + UtilMsg.tableNumber, //table显示的标题 国际化内容：序号
                render(data, row, displayIndex) {
                    return '&nbsp;&nbsp;<input name="checkCode" type="checkbox" value="' + data + '" />&nbsp;&nbsp;' + (displayIndex + 1);
                }
            },{
                label: "条码",
                data: 'barCode'
            }];
            bpo_service.getFileMeta(customerCode,$.proxy(this.render,this));
            this.params.deferred = $.Deferred();
            //初始化数据表格
            this.params.deferred.done(() => {
                this.params.table_data = table_data.show({
                    view: {
                        apiName: 'file_search',
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
            });
        },
        callSearch() {
            return true;
        },
        render(data){
            let filecfg = data.filecfg;
            let filefolder = data.filefolder;
            this.initData(filecfg,filefolder);
        },
        //初始化表格数据
        initData(filecfg,filefolder){
            var myTemplate = $.templates("#queryFormTmpl");
            var queryConditions = [{
                    name:"barCode",
                    showname: "barCode",
                    placeholder: "条码"
                }];
            for(var i in filecfg){
                var queryCondition = {
                    name: filecfg[i].fileField,
                    showname: filecfg[i].fileField,
                    placeholder: filecfg[i].fileFieldName
                };
                queryConditions.push(queryCondition);
                var column={
                    label: filecfg[i].fileFieldName,
                    data: filecfg[i].fileField
                };
                this.columns.push(column);
            }
            this.columns.push({
                label: "目录",
                data: 'selectedFolder'
            });
            this.columns.push({
                label: "状态",
                data:'status',
                render(data, row) {
                    switch(data)
                    {
                        case '01':
                          return '待审核';
                          break;
                        case '02':
                          return '待交接';
                          break;
                        case '03':
                          return '待邮寄';
                          break;
                        case '04':
                          return '配送中';
                          break;
                        case '05':
                          return '签收';
                          break;
                    }
                }
            });
            this.columns.push({
                label: "操作",
                data: 'barCode',
                render(data, row) {
                    var customerCode = localStorage.getItem('customerCode');
                    let str = '<a href="#" title="审核"> <i class="fa fa-gavel fa-lg judge" data-id="'+data+'"></i></a>&nbsp;';
                    return str;
                }
            });        
            var app = {
                title: "客户信息",
                queryConditions: queryConditions,
                customerCode:localStorage.getItem('customerCode'),
                status:'01'
            };
            myTemplate.link("#main-content", app);
            this.params.deferred.resolve('ok');
        },

        /**
         * 事件绑定
         */
        bindEvent() {
            this.params.table_data._getTbody().on('click','i.judge',$.proxy(this.viewClick, this));
            $("#toolbar").on('click','#batch_check',$.proxy(this.batch_check, this));
        },
        batch_check(event){
            var chk_value =[]; 
            $('input[name="checkCode"]:checked').each(function(){ 
                chk_value.push($(this).val()); 
            });
            if(chk_value.length==0){
                bootbox.alert("至少选择一条记录");
            }else{
                 dialog.page({
                    title: '提交',
                    modal_width: '600',
                    stateParams: { pageType: 'judge', id:chk_value,table_data:this.params.table_data}, //传输给新页面的数据；pageType比传；update,add,view
                    loadUrl: '/submit'
                });
            }
           
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
                    title: '提交',
                    modal_width: '600',
                    stateParams: { pageType: 'judge', id: id,table_data:this.params.table_data}, //传输给新页面的数据；pageType比传；update,add,view
                    loadUrl: '/submit'
                });
        },
        bts: [],
        /**
         * table的模板
         */
        columns: [],
    };

    return {
        initPage: $.proxy(page.initPage, page),
        search() {
            page && page.params && page.params.table_data && page.params.table_data._showPage(null, null, true);
        }
    };
});
