/**
 * 修改模块
 */
define(['jquery','widget/http','widget/dialog', 'widget/ajax_form', './customer_list', '../../bpo_service', 'service/util_service', 'route_config','bootstrap-table','bootstrap-editable','bootstrap-table-editable'],
    ($,http,dialog, ajax_form, customer_list, bpo_service, util_service, route_config,bootstrapTable,editable) => {

        var page = {

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
            filecfgMap:null,
            foldersMap:null
        },
        /**
         * 模块入口
         */
        initPage() {
            this.params.deferred = $.Deferred();
                //获取页面传输参数
            var stateParams = route_config.getStateParams();
            this.params.pageType = route_config.getStateParams()['pageType'];

            this.params.deferred.done(() => {
                let b = false;//如果是修改和查看页面，则注入测试数据
                this.initAjaxEdit();
                this.getFilecfgs();
                this.getFileFolders();
                this.bindEvent();
                this.params.$fm = $('#form');
                //如果是查看页面，则readonly所有输入与域
            });
            var id = route_config.getStateParams()['id'];
            bpo_service.getCustomer(id, $.proxy(this.render, this));
        },
        /**
         * 事件绑定
         */
        bindEvent() {
            util_service._closeDialog($('#btn-close'), true); //绑定关闭按钮
            $("#btn_add").on('click',$.proxy(this.addRow, this));
            $("#btn_delete").on('click',$.proxy(this.deleteRow, this))
            $("#folder_add").on('click',$.proxy(this.addFolderRow, this));
            $("#folder_delete").on('click',$.proxy(this.deleteFolderRow, this))
        },
        //****filecfg**********************/
        addRow(event){
            let curRow = {};
            var index = $("#cfg").bootstrapTable('getData').length;
            var params = {index:index, row:{fileFieldName:'',fileField:'',displayNo:''}};
            $("#cfg").bootstrapTable('insertRow',params);
        },
        deleteRow(event){
            let $this = $(event.target);
            var table = $("#cfg");
            var selected = table.bootstrapTable('getSelections',
                     function (row) {
                        return row.id
            });
            var fileFields = table.bootstrapTable('getSelections',
                function (row) {
                    return row.fileField;
                }
            );
            var ids = "";
            for(var o in selected){
                ids+=selected[o].id;
                ids+=",";
            }
            if(ids!=""){
                for(var i in fileFields){
                    page.params.filecfgMap.delete(fileFields[i].fileField);
                }
                http.post({
                    apiName: 'filecfg_delete',
                    data:ids,
                    dataType:'JSON',
                    success(data) {
                        alert('删除成功！');
                        http.get({
                            apiName: 'filecfg_customerCode',
                            urlParams: {customerCode: route_config.getStateParams()['id']},
                            success(data) {
                                let cfgs = data.data;
                                $("#cfg").bootstrapTable('load',cfgs);
                            }
                        });
                    }
                });
            }   
        },
        /*********************filefolder**************/
         addFolderRow(event){
            let curRow = {};
            var index = $("#folders").bootstrapTable('getData').length;
            var params = {index:index, row:{folderName:'',displayNo:''}};
            $("#folders").bootstrapTable('insertRow',params);
        },
        deleteFolderRow(event){
            var table = $("#folders");
            var selected = table.bootstrapTable('getSelections',
                function (row) {
                    return row.id
                }
            );
            var folderNames = table.bootstrapTable('getSelections',
                function (row) {
                    return row.folderName;
                }
            );
            var ids = "";
            for(var o in selected){
                ids+=selected[o].id;
                ids+=",";
            }
            if(ids!=""){
                for(var i in folderNames){
                    page.params.foldersMap.delete(folderNames[i].folderName);
                }
                http.post({
                    apiName: 'filefolder_delete',
                    data:ids,
                    dataType:'JSON',
                    success(data) {
                        alert('删除成功！');
                        http.get({
                            apiName: 'filefolder_customerCode',
                            urlParams: {customerCode: route_config.getStateParams()['id']},
                            success(data) {
                                let folders = data.data;
                                $("#folders").bootstrapTable('load',folders);
                            }
                        });
                    }
                });
            }   
        },
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
            if (flag) {
                var myTemplate = $.templates("#settingTmpl");
                myTemplate.link("#main-content",{customer:{customerCode:""}});
            }
            else{
                var myTemplate = $.templates("#settingTmpl");
                myTemplate.link("#customer-setting",{customer: data});
            }
            this.params.deferred.resolve('ok');
        },
        getFilecfgs(){
            page.params.filecfgMap = new Map();
            http.get({
                apiName: 'filecfg_customerCode',
                urlParams: {customerCode: route_config.getStateParams()['id']},
                success(data) {
                    let curRow = {};
                    let cfgs = data.data;
                    for(var i in cfgs){
                        page.params.filecfgMap.set(cfgs[i].fileField,cfgs[i].fileFieldName);
                    }
                    $("#cfg").bootstrapTable({
                        toolbar: "#toolbar",
                        idField: "Id",
                        pagination: false,
                        showRefresh: false,
                        search: false,
                        clickToSelect: true,
                        queryParams: function (param) {
                            return {};
                        },
                        data:cfgs,
                        columns: [{
                            checkbox: true
                        }, {
                            field: "fileFieldName",
                            title: "档案信息",
                            editable: {
                                type: 'text',
                                title: '档案信息',
                                validate: function (v) {
                                    if (!v) return '用户名不能为空';

                                }
                            }
                        },{
                            field: "fileField",
                            title: "对应字段",
                            editable: {
                                type: 'select',
                                title: '对应字段',
                                source: [
                                    { value: "fileField1", text: "字段1" }, 
                                    { value: "fileField2", text: "字段2" },
                                    { value: "fileField3", text: "字段3" },
                                    { value: "fileField4", text: "字段4" },
                                    { value: "fileField5", text: "字段5" },
                                    { value: "fileField6", text: "字段6" },
                                    { value: "fileField7", text: "字段7" },
                                    { value: "fileField8", text: "字段8" }

                                ],
                                validate: function (v) {
                                    if (!v) return '字段不能为空';
                                }
                            }
                        },{
                            field: "displayNo",
                            title: "显示顺序",
                            editable: {
                                type: 'text',
                                title: '显示顺序',
                                validate: function (v) {
                                    if (!v) return '字段不能为空';

                                }
                            }
                        }],
                        onClickRow: function (row, $element) {
                            curRow = row;
                        },
                        onLoadSuccess: function (data) {
                            alert(aa);
                        },
                        onEditableSave: function (field, row, oldValue, $el) {
                            curRow["customerCode"] = route_config.getStateParams()['id'];
                            if(field=="fileField"){
                                var fileFieldName = page.params.filecfgMap.get(row.fileField);
                                if(fileFieldName!=null){
                                    dialog.alert({content:"字段已添加！"});
                                    return;
                                }
                                else{
                                    page.params.filecfgMap.set(row.fileField,row.fileFieldName);
                                    http.post({
                                        apiName: 'filecfg_add',
                                        data: row,
                                        dataType:'JSON',
                                        success(data) {
                                            //alert('保存成功！');
                                            http.get({
                                                apiName: 'filecfg_customerCode',
                                                urlParams: {customerCode: route_config.getStateParams()['id']},
                                                success(data) {
                                                    let cfgs = data.data;
                                                    $("#cfg").bootstrapTable('load',cfgs);
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                            else{
                                http.post({
                                    apiName: 'filecfg_add',
                                    data: row,
                                    dataType:'JSON',
                                    success(data) {
                                        //alert('保存成功！');
                                        http.get({
                                            apiName: 'filecfg_customerCode',
                                            urlParams: {customerCode: route_config.getStateParams()['id']},
                                            success(data) {
                                                let cfgs = data.data;
                                                $("#cfg").bootstrapTable('load',cfgs);
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            });
        },
        getFileFolders(){
            page.params.foldersMap = new Map();
            http.get({
                apiName: 'filefolder_customerCode',
                urlParams: {customerCode: route_config.getStateParams()['id']},
                success(data) {
                    let curRow = {};
                    let folders = data.data;
                    for(var i in folders){
                        page.params.foldersMap.set(folders[i].folderName,folders[i].folderName);
                    }
                    $("#folders").bootstrapTable({
                        toolbar: "#toolbarFolder",
                        idField: "Id",
                        pagination: false,
                        showRefresh: false,
                        search: false,
                        clickToSelect: true,
                        queryParams: function (param) {
                            return {};
                        },
                        data:folders,
                        columns: [{
                            checkbox: true
                        }, {
                            field: "folderName",
                            title: "目录名称",
                            editable: {
                                type: 'text',
                                title: '目录名称',
                                validate: function (v) {
                                    if (!v) return '用户名不能为空';

                                }
                            }
                        },{
                            field: "displayNo",
                            title: "显示顺序",
                            editable: {
                                type: 'text',
                                title: '显示顺序',
                                validate: function (v) {
                                    if (!v) return '字段不能为空';

                                }
                            }
                        }],
                        onClickRow: function (row, $element) {
                            curRow = row;
                        },
                        onLoadSuccess: function (data) {
                            alert(aa);
                        },
                        onEditableSave: function (field, row, oldValue, $el) {
                            curRow["customerCode"] = route_config.getStateParams()['id'];
                            if(field=="folderName"){
                                var folderName = page.params.foldersMap.get(row.folderName);
                                if(folderName!=null){
                                    dialog.alert({content:"目录已添加！"});
                                    return;
                                }
                                else{
                                    page.params.foldersMap.set(row.folderName,row.folderName);
                                    http.post({
                                        apiName: 'filefolder_add',
                                        data: row,
                                        dataType:'JSON',
                                        success(data) {
                                            //alert('保存成功！');
                                            http.get({
                                                apiName: 'filefolder_customerCode',
                                                urlParams: {customerCode: route_config.getStateParams()['id']},
                                                success(data) {
                                                    let folders = data.data;
                                                    $("#folders").bootstrapTable('load',folders);
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                            else{
                                http.post({
                                    apiName: 'filefolder_add',
                                    data: row,
                                    dataType:'JSON',
                                    success(data) {
                                        //alert('保存成功！');
                                        http.get({
                                            apiName: 'filefolder_customerCode',
                                            urlParams: {customerCode: route_config.getStateParams()['id']},
                                            success(data) {
                                                let folders = data.data;
                                                $("#folders").bootstrapTable('load',folders);
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            });
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
        }
    };

    return {
        initPage: $.proxy(page.initPage, page)
    };
});
