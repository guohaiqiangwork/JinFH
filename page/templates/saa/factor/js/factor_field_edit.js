define(['jquery','widget/http','widget/dialog', '../../service', 'service/util_service', 'route_config','bootbox','./factor_edit',"zTree",'widget/ajax_table'], ($,http,dialog, service, util_service, route_config,bootbox,factor_edit,zTree,ajax_table) => {
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
            pageType: 'add', //默认新增
            factorCode:null,
            zTreeObj: null,
            setting : null,
            zNodes : null,
            ajax_table: null,//数据表格引用
            added_factor_fields:null,
            selected_factor_fields:null,
            callback:false
        },

        /**
         * 模块入口
         */
        initPage() {
            this.params.deferred = $.Deferred();
                //获取页面传输参数
            var stateParams = route_config.getStateParams();
            this.params.pageType = route_config.getStateParams()['pageType'];
            this.params.factorCode = route_config.getStateParams()['factorCode'];
            this.params.deferred.done(() => {
                this.bindEvent();
            });
            this.params.setting={
                edit : {
                    enable : true,
                    isMove : true,
                    showRemoveBtn : false,
                    showRenameBtn : false,
                    // removeTitle:"删除",
                    // renameTitle:"重命名",
                    editNameSelectAll : true,

                },
                view : {
                    selectedMulti : false
                },
                data : {
                    /*
                     * keep: { parent:true, leaf:true },
                     */
                    simpleData : {
                        enable: true,
                        idKey: "id",
                        pIdKey: "pid",
                        rootPId: "0"
                    }
                },
                check : {
                    enable : true,
                    chkboxType : {
                        "Y" : "s",
                        "N" : "s"
                    }
                },
                callback : {
                }
            };
            service.find_factor(this.params.factorCode, $.proxy(this.render, this));
        },
        /**
         * 事件绑定
         */
        bindEvent() {
        	util_service._closeDialog($('#btn-close-userrole'), true); //绑定关闭按钮
            $("#remove-field").on('click',$.proxy(this.removeFactorField, this));
            $("#add-field").on('click',$.proxy(this.addFactorField, this));
            $("#save-field").on('click',$.proxy(this.saveFactorField, this));
            $("#checkAll").click(function() {
                $('input[name="checkCode"]').prop("checked",this.checked); 
            });
        },
        ajaxSuccess() {
            dialog.confirm({
                content: '提交成功,确定要返回吗?',
                onSuerBefore() {
                    factor_edit.refreshTable();
                    page.params.$fm.find('button.btn-close').trigger('click');
                    /*customer_list && customer_list.search();*/
                }
            });
        },
        /**
        * 模板渲染
        */
        render(data, flag){
            if (!data && !flag)
                    return;
            var myTemplate = $.templates("#factorFieldFormTmpl");
            myTemplate.link("#factor-field-edit",{factorCode:this.params.factorCode});
            http.get({
                apiName: 'saa_factorfield_set_node',
                urlParams: {factorCode: this.params.factorCode},
                success(data) {
                    page.params.zNodes = data.data;
                    page.params.zTreeObj = $.fn.zTree.init($("#factorFieldTree"), page.params.setting,page.params.zNodes);
                    page.params.deferred.resolve('ok');
                }
            });
            let saaFactorFiledVoList = data.saaFactor.saaFactorFiledVoList;
            var table = $("#list-table2");
            this.params.ajax_table = ajax_table._showTable(table,saaFactorFiledVoList,page.columns,page.rowCallback);
            this.params.added_factor_fields= new Map();
            for(var i in saaFactorFiledVoList){
                this.params.added_factor_fields.set(saaFactorFiledVoList[i].entityCode+"."+saaFactorFiledVoList[i].fieldCode,saaFactorFiledVoList[i].fieldCode);
            } 
        },
        columns: [
        {
            data: "id",
            title: '<input id="checkAll" name="checkAll" type="checkbox" class="checkAll">&nbsp;&nbsp;' + UtilMsg.tableNumber, //table显示的标题 国际化内容：序号
            render(data, type, row) {
                return '&nbsp;&nbsp;<input name="checkCode" type="checkbox" value="' + row.entityCode+"."+row.fieldCode + '" />';
            }
        },{
            title: "字段名称",
            width: "30%",
            data: 'fieldCode'
        }, {
            title:"归属表",
            width: "30%",
            data: 'entityCode'
        }],
        rowCallback(row, data, displayIndex, displayIndexFull) {

        },
        /**
             * 初始化校验框架
             */
        initAjaxEdit() {
            let rules={
                roleCode :"required",
                userCode : "required",
                startDate:"required",
                endDate:"required"
            }
            let messages={
                roleCode :"请输入代码",
                userCode :"请输入名称",
                startDate:"请选择密码失效时间",
                endDate:"请选择密码生效时间"
            }
            ajax_form.init({
                $form: this.params.$fm,
                rules: rules,
                type: 'POST',
                apiName: this.params.pageType == 'add' || this.params.pageType==undefined ? 'add_user_role' : 'add_user_role',
                messages:messages,
                afterSuccess: $.proxy(this.ajaxSuccess, this)
            });
        },
        removeFactorField(event){
            let obj = $('input[name="checkCode"]:checked');
            obj.each(function(i){
                page.params.added_factor_fields.delete(obj[i].value);
                page.params.ajax_table.row(obj[i].parentNode.parentNode).remove().draw();
            });
        },
        addFactorField(event){
            var nodes = this.params.zTreeObj.getCheckedNodes(true);
            for(let i in nodes){
                if(nodes[i].level=='1'){
                    let key = nodes[i].pid+"."+nodes[i].id;
                    let field = this.params.added_factor_fields.get(key);
                    if(field==undefined){
                        this.params.added_factor_fields.set(key,nodes[i].id);
                        this.params.ajax_table.row.add({"fieldCode":nodes[i].id,"entityCode":nodes[i].pid}).draw();
                    }
                }
            }
        },
        saveFactorField(event){
            let data = this.params.added_factor_fields;
            let keys = data.keys();
            let saaFactorFiledVoList ='[';
            for(let key of keys){
                saaFactorFiledVoList+='{';
                let entityAndField = key.split(".");
                let entityCode = entityAndField[0];
                let fieldCode=entityAndField[1];
                saaFactorFiledVoList+='"entityCode":"'+entityCode+'",';
                saaFactorFiledVoList+='"fieldCode":"'+fieldCode+'"},';
            }
            if(saaFactorFiledVoList.length!=1){
                saaFactorFiledVoList = saaFactorFiledVoList.substring(0,saaFactorFiledVoList.length-1);
            }
            saaFactorFiledVoList+=']';
            let fieldList = JSON.parse(saaFactorFiledVoList);
            let factorCode = this.params.factorCode;
            http.post({
                apiName: 'add_saa_factor_field',
                data: {factorCode: factorCode,saaFactorFiledVoList:fieldList},
                success(data) {
                    factor_edit.refreshTable();
                    bootbox.alert("保存成功");
                }
            });
        }
    };

    return {
        initPage: $.proxy(page.initPage, page)
    };
});