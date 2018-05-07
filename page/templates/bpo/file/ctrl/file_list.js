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
                data: 'barCode',
                render(data, row, displayIndex) {
                    return '<a class="barCode" href="#" data-id="'+data+'">'+data+'</a>';
                }
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
                },{
                    name:"status",
                    showname: "status",
                    placeholder: "状态"
                }];
            var queryResultTitles = [
                {
                    label: "条码",
                    additionHtml: ' <input name="checkAll" type="checkbox" class="checkAll">'
                }
            ];
            for(var i in filecfg){
                var queryCondition = {
                    name: filecfg[i].fileField,
                    showname: filecfg[i].fileField,
                    placeholder: filecfg[i].fileFieldName
                };
                queryConditions.push(queryCondition);
                var queryResultTitle = {
                    label:filecfg[i].fileFieldName
                };
                queryResultTitles.push(queryResultTitle);
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
                          return '新增';
                          break;
                        case '02':
                          return '已审核';
                          break;
                        case '03':
                          return '已交接';
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
                    let str="";
                    str += '<a href="#" title="查看"> <i class="fa fa-eye fa-lg view" data-id="'+data+'"></i></a>&nbsp;';
                    str += '<a href="#" title="删除" ><i class="fa fa-trash-o fa-lg delete" data-id="'+data+'"></i></a>&nbsp;';
                    str += '<a href="#" title="设置" ><i class="fa fa-cog fa-lg setting" data-id="'+data+'"></i></a>&nbsp;';
                    return str;
                }
            });
            queryResultTitles.push({
                label: "状态"
            });
            queryResultTitles.push({
                label: "操作"
            });            
            var app = {
                title: "客户信息",
                queryConditions: queryConditions,
                queryResultTitles: queryResultTitles,
                customerCode:localStorage.getItem('customerCode')
            };
            myTemplate.link("#main-content", app);
            this.params.deferred.resolve('ok');
        },

        /**
         * 事件绑定
         */
        bindEvent() {
            this.params.table_data._getTbody().on('click','i.view',$.proxy(this.viewClick, this));
            this.params.table_data._getTbody().on('click','i.delete',$.proxy(this.deletesClick, this));
            this.params.table_data._getTbody().on('click','i.setting',$.proxy(this.settingClick, this));
            $("#toolbar").on('click','#batch_delete',$.proxy(this.batch_delete, this));
            this.params.table_data._getTbody().on('click','a.barCode',$.proxy(this.viewClick, this));
        },
        batch_delete(event){
            var chk_value =[]; 
            $('input[name="checkCode"]:checked').each(function(){ 
                chk_value.push($(this).val()); 
            });
            if(chk_value.length==0){
                bootbox.alert("至少选择一条记录");
            }else{
                alert(chk_value);
                dialog.confirm({
                    content: '确定删除吗?',
                    onSuerBefore() {
                        http.post({
                            apiName: 'file_delete',
                            isMask: true,
                            data: chk_value.join(','),
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
            }
           
        },
        viewClick(event) {
                let $this = $(event.target),
                id = $this.data('id');
                //打开一个新页面
                route_config.go('/bpo/file/view',{ pageType: 'view', id: id },
                    {
                    $container: $.main_content, //指定的容器；$.main_content已保存在全局变量，可以参考global_param.js
                    isInitPage: true
                });
        },
        settingClick(event){
            let $this = $(event.target),
                id = $this.data('id');
                //打开一个新页面
               dialog.page({
                    title: '提交',
                    modal_width: '600',
                    stateParams: { pageType: 'judge', id: id,table_data:this.params.table_data}, //传输给新页面的数据；pageType比传；update,add,view
                    loadUrl: '/submit'
                });
        },
        deletesClick(event) {
            let $this = $(event.target),
                id = $this.data('id');
            id = id+",";
            dialog.confirm({
                content: '确定删除吗?',
                onSuerBefore() {
                    http.post({
                        apiName: 'file_delete',
                        isMask: true,
                        data: id,
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
        bts: [],
        /**
         * table的模板
         */
        columns: [{
            label: "条码",
            data: 'barCode'
        }],
    };

    return {
        initPage: $.proxy(page.initPage, page),
        search() {
            page && page.params && page.params.table_data && page.params.table_data._showPage(null, null, true);
        }
    };
});
