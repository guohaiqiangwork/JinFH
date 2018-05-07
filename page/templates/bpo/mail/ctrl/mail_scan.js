/**
 * 修改模块
 */
define(['jquery','widget/table_data','widget/http','widget/dialog', '../../bpo_service', 'service/util_service', 'route_config','bootstrap-table','bootstrap-editable','bootstrap-table-editable','bootbox'],
    ($,table_data,http,dialog,bpo_service, util_service, route_config,bootstrapTable,editable,bootbox) => {

        var pageScan = {

        /**
         * 模块参数
         */
        params: {
              /**
             * 模块参数
             */
            deferred: null,
            $fm: null,
            pageType: 'setting', //默认新增
            dataModel: null, //数据表格引用
            table_data: null
        },
        /**
         * 模块入口
         */
        initPage() {
            this.columnsScan=[{
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
                    return '<a href="#" data-id="'+data+'">'+data+'</a>';
                }
            }];
            this.params.deferred = $.Deferred();
                //获取页面传输参数
            var stateParams = route_config.getStateParams();
            this.params.pageType = route_config.getStateParams()['pageType'];
            this.params.deferred.done(() => {
                let b = false;//如果是修改和查看页面，则注入测试数据
                this.initAjaxEdit();
                this.params.table_data = table_data.show({
                    view: {
                        apiName: 'file_search',
                        columns: this.columnsScan
                    },
                    jq_object: {
                        $pan: $('#scan-panel')
                    },
                    callback: {
                        callSearch() {
                            return pageScan.callSearch();//返回true才会执行查询，可以进行查询前校验，比如日期大小等
                        }
                    }
                });
                pageScan.params.table_data._showPage(0);
                //如果是查看页面，则readonly所有输入与域
                this.bindEvent();
            });
            var id = route_config.getStateParams()['taskId'];
            this.render(null,this);

        },
        /**
         * 事件绑定
         */
        bindEvent() {

        },
        /*********************filefolder**************/
        ajaxSuccess() {
            dialog.confirm({
                content: '提交成功,确定要返回吗?',
                onSuerBefore() {
                    page.params.$fm.find('button.btn-close').trigger('click');
                    customer_list && customer_list.search();
                }
            });
        },
        /**
        * 模板渲染
        */
        render(data, flag){
            if (!data && !flag)
                    return;
            let customerCode = localStorage.getItem('customerCode');
            var myTemplate = $.templates("#scanFormTmpl");
            myTemplate.link("#scan-deliver",{});
            this.params.deferred.resolve('ok');
        },
        /**
             * 初始化校验框架
             */
        initAjaxEdit() {
             let rules={
                customerCode :"required",
                customerName : "required"
            }
            let messages={
                customerCode :"请输入客户代码",
                customerName :"请输入客户名称"
            }
            let customerCode = localStorage.getItem('customerCode');
            bpo_service.getFileByStatus(customerCode,'03',$.proxy(this.initSearch, this));
        },
        initSearch(data){
             var dataList={
                messages:"",
                value:[

                ]
             };
             var files = data.files;
             for(var i in files){
                let file={
                    barCode:files[i].barCode,
                    fileField1:files[i].fileField1,
                    fileField2:files[i].fileField2,
                    fileField3:files[i].fileField3,
                    fileField3:files[i].fileField4
                }
                dataList.value.push(file);
             }
             $('#search-input').bsSuggest({
                data:dataList,
                effectiveFieldsAlias:{barCode: "条码"},
                ignorecase: true,
                showHeader: true,
                showBtn: true,     //不显示下拉按钮
                delayUntilKeyup: true, //获取数据的方式为 firstByUrl 时，延迟到有输入/获取到焦点时才请求数据
                idField: "barCode",
                keyField: "barCode",
                clearable: true
            }).on('onDataRequestSuccess', function (e, result) {
                console.log('onDataRequestSuccess: ', result);
            }).on('onSetSelectValue', function (e, keyword, data) {
                http.post({
                    apiName:'file_new',
                    data:{barCode:data.barCode,customerCode:localStorage.getItem('customerCode'),youjiTaskId:route_config.getStateParams()['taskId'],status:'04',youjiMan:localStorage.getItem('userCode')},
                    success(result) {
                         //alert(data);
                         $('#search-input').val("");
                         let input = $('#selectArea');
                         input.val(input.val()+data.barCode+"邮寄成功!"+"\n");
                         $('#search-input').bsSuggest("destroy");
                         pageScan.initAjaxEdit();
                    }
                });
               
            }).on('onUnsetSelectValue', function () {
                console.log('onUnsetSelectValue');
            });
        },
        columnsScan: [{
            label: "条码",
            data: 'barCode'
        }],
        queryResultTitles :[
                {
                    label: "条码",
                    additionHtml: ' <input name="checkAll" type="checkbox" class="checkAll">'
                }
        ]
    };

    return {
        initPage: $.proxy(pageScan.initPage, pageScan),
        search() {
            pageScan && pageScan.params && pageScan.params.table_data && pageScan.params.table_data._showPage(null, null, true);
        }
    };
});
