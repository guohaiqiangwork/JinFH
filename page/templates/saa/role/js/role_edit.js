define(['jquery','widget/dialog', 'widget/ajax_form','widget/http','../../service', 'service/util_service', 'route_config','bootbox','zTree','widget/ajax_table'], ($,dialog, ajax_form,http,service, util_service,route_config,bootbox,zTree,ajax_table) => {
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
            dataModel: null,
            zTreeObj: null,
            setting : null,
            zNodes : null,
            curStatus :'init',
            curAsyncCount :'0',
            goAsync:'false',
            checkTasks:'',
            fmObject:null,
            ajax_table: null
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
                this.params.$fm = $('#form');
                this.initAjaxEdit();
                this.bindEvent();
                //如果是查看页面，则readonly所有输入与域
                if (this.params.pageType == 'view') {
                    util_service._readonlyInput(this.params.$fm);
                } else { 
                    $('#btn-submit').show();
                }
            });
            if (this.params.pageType != 'add'&& this.params.pageType != undefined) { //如果此页面不是新增，则请求服务端数据
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
                    async : {
                        enable : true,
                        url : this.getAsyncUrl,
                        autoParam : [ "id=pId" ],
                        dataFilter : this.filter,
                        type:"get"
                    },
                    data : {
                        /*
                         * keep: { parent:true, leaf:true },
                         */
                        simpleData : {
                            enable : true
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
                        beforeSend:this.beforeSend,
                        beforeAsync: this.beforeAsync,  
                        onAsyncSuccess: this.onAsyncSuccess  
                    }
                };
                var id = route_config.getStateParams()['id'];
                service.find_role(id, $.proxy(this.render, this)); 
            } else { //如果页面是新增，则不请求服务端数据，立即执行延迟加载
                this.render(null, true);
                this.params.deferred.resolve('ok');
            }
        },
        /**
         * 事件绑定
         */
        bindEvent() {
        	util_service._closeDialog($('#btn-close'), true); //绑定关闭按钮
            if(page.params.ajax_table!=null){
                $("#addRoleUser").on('click',$.proxy(this.addRoleUser, this));
                var table = $("#list-table");
                table.find('tbody').on('click','i.delete',$.proxy(this.deleteUserRoleClick, this));
                table.find('tbody').on('click','i.update',$.proxy(this.editUserRoleClick, this));
            }
        },
        /**
        * 模板渲染
        */
        render(data, flag){
            if (!data && !flag)
                    return;
            if (flag) {
                var myTemplate = $.templates("#roleFormTmpl");
                myTemplate.link("#role-edit",{role:{},pageType:this.params.pageType});
                this.params.deferred.resolve('ok');
            }
            else{
                var myTemplate = $.templates("#roleFormTmpl");
                myTemplate.link("#role-edit",{role: data.saaRole,pageType:this.params.pageType});
                this.params.checkTasks = data.taskCodes;
                var rootTaskCode = localStorage.getItem("systemCode");
                if(rootTaskCode==""||rootTaskCode==null){
                    bootbox.alert("请选择配置的系统功能代码");
                }else{
                   http.get({
                        apiName:'saa_task_set_node',
                        urlParams: {systemCode:rootTaskCode},
                        success(data) {
                            page.params.zNodes = data.data;
                            page.params.zTreeObj = $.fn.zTree.init($("#taskTree"), page.params.setting,page.params.zNodes);
                            page.expandAll();
                            var taskNodes = page.params.zTreeObj.getNodes();
                            var tasks = page.params.checkTasks;
                            for (var i = 0; i < taskNodes.length; i++) {
                                for (var j = 0; j < tasks.length; j++) {
                                    if (taskNodes[i].id == tasks[j].trim()) {
                                        taskNodes[i].checked = true;
                                    }
                                }
                            }
                        }
                    });
                    http.get({
                        apiName:'saa_role_roleuser',
                        urlParams: {roleCode:data.saaRole.roleCode},
                        success(data) {
                            var table = $("#list-table");
                            page.params.ajax_table = ajax_table._showTable(table,data.data.userRoles,page.columns,page.rowCallback);
                            page.params.deferred.resolve('ok');
                        }
                    }); 
                }
            }
        },
        columns: [{
            title: "用户代码",
            width: "30%",
            data: 'userCode'
        }, {
            title:"生效时间",
            width: "30%",
            data: 'startDate',
            render(data) {
                return new Date(data).Format("yyyy-MM-dd");
            }
        }, {
            title:"失效时间",
            width: "30%",
            data: 'endDate',
            render(data) {
                return new Date(data).Format("yyyy-MM-dd");
            }
        },{
            title: "操作",
            width: "10%",
            data: 'id',
            render(data, row) {
                let str = '';
                str += '<a href="#" title="修改"> <i class="fa fa-pencil-square-o fa-lg update" data-id="'+data+'"></i></a>&nbsp;';
                str += '<a href="#" title="删除" ><i class="fa fa-trash-o fa-lg delete" data-id="'+data+'"></i></a>&nbsp;';
                return str;
            }
        }],
        rowCallback(row, data, displayIndex, displayIndexFull) {

        },
        addRoleUser(){
            let $this = $(event.target),
                roleCode = $("#roleCode").val();
            //alert(roleCode);
            dialog.page({
                title: '用户角色编辑',
                stateParams: { pageType: 'add',roleCode:roleCode}, //传输给新页面的数据；pageType比传；update,add,view
                loadUrl: '/saa/userrole/edit'
            });
        },
        deleteUserRoleClick(event){
            let $this = $(event.target),
                userRoleId = $this.data('id');
            dialog.confirm({
                content: '确定移除吗?',
                onSuerBefore() {
                    http.post({
                       apiName:'delete_user_role',
                       urlParams:{id:userRoleId},
                       success(data) {
                            dialog.alert({
                                content: '移除成功。'
                            });
                            //删除成功后继续查找第一页
                            page.params.ajax_table
                                .row($this.parents('tr'))
                                .remove()
                                .draw();
                        }
                    });
                }
            });
        },
        editUserRoleClick(event){
            let $this = $(event.target),
                userRoleId = $this.data('id'),
                roleCode = $("#roleCode").val();
            //alert(roleCode);
            dialog.page({
                title: '用户角色编辑',
                stateParams: { pageType: 'edit', id: userRoleId,roleCode:roleCode}, //传输给新页面的数据；pageType比传；update,add,view
                loadUrl: '/saa/userrole/edit'
            });
        },
        /**
             * 初始化校验框架
             */
        initAjaxEdit() {
            let rules={
                roleCode :"required",
                roleCName : "required",
                comCode:"required"
            }
            let messages={
                roleCode :"请输入角色代码",
                roleCName :"请输入角色名称",
                comCode:"请输入机构代码"
            }
            fmObject = ajax_form.init({
                $form: this.params.$fm,
                rules: rules,
                type: 'POST',
                apiName: this.params.pageType == 'add' || this.params.pageType==undefined ? 'add_saa_role' : 'add_saa_role',
                messages:messages,
                beforeSubmit:$.proxy(this.beforeSubmit, this),
                afterSuccess: $.proxy(this.ajaxSuccess, this)
            });
        },
        beforeSubmit() {
            if(page.params.zTreeObj!=null){
                var checkedNodes = page.params.zTreeObj.getCheckedNodes();
                var selectTasks = "";
                for(var i in checkedNodes){
                    selectTasks = selectTasks + checkedNodes[i].id + ",";
                }
                if (selectTasks != "") {
                    selectTasks = selectTasks.substr(0, selectTasks.length - 1);
                }
                $("#saaRoleTaskCodes").val(selectTasks); 
            }
        },
        ajaxSuccess() {
            dialog.confirm({
                content: '提交成功,确定要返回吗?',
                onSuerBefore() {
                    page.params.$fm.find('button.btn-close').trigger('click');
                    /*customer_list && customer_list.search();*/
                }
            });
        },
        //*************************树操作方法****************
        getAsyncUrl(treeId, treeNode) {
            return  "/api/misc/saa/task/show/"+treeNode.id;
        },
        filter(treeId, parentNode, childNodes) {
            var tasks = page.params.checkTasks;
            if (!childNodes)
                return null;
            for (var i = 0; i < childNodes.length; i++) {
                for (var j = 0; j < tasks.length; j++) {
                    if (childNodes[i].id == tasks[j].trim()) {
                        childNodes[i].checked = true;
                    }
                }
            }
            return childNodes;
        },
        beforeSend(request){
            localStorage.getItem("JSESSIONID");
            request.setRequestHeader("Authorization", "Arch6WithCloud "+localStorage.getItem("JSESSIONID"));  
        },
        beforeAsync() {  
            page.params.curAsyncCount++;  
        },
        onAsyncSuccess(event, treeId, treeNode, msg) {  
            page.params.curAsyncCount--;  
            if (page.params.curStatus == "expand") {  
                page.expandNodes(treeNode.children);  
            } else if (this.params.curStatus == "async") {  
                asyncNodes(treeNode.children);  
            }  
  
            if (page.params.curAsyncCount <= 0) {  
                page.params.curStatus = "";  
            }  
        }, 
        expandAll() {  
            if (!this.check()) {  
                return;  
            }  
            var zTree = page.params.zTreeObj;  
            this.expandNodes(zTree.getNodes());  
            if (!this.params.goAsync) {  
                this.params.curStatus = "";  
            }  
        },
        expandNodes(nodes) {  
            if (!nodes) return;  
            this.params.curStatus = "expand";  
            var zTree = page.params.zTreeObj;  
            for (var i=0, l=nodes.length; i<l; i++) {  
                zTree.expandNode(nodes[i], true, false, false);//展开节点就会调用后台查询子节点  
                if (nodes[i].isParent && nodes[i].zAsync) {  
                    expandNodes(nodes[i].children);//递归  
                } else {  
                    this.params.goAsync = true;  
                }  
            }  
        },
        check() {  
            if (this.params.curAsyncCount > 0) {  
                return false;  
            }  
            return true;  
        },
        ajaxTable(){
            var roleCode = $("#roleCode").val();
            http.get({
                apiName:'saa_role_roleuser',
                urlParams: {roleCode:roleCode},
                success(data) {
                    var table = $("#list-table");
                    page.params.ajax_table = ajax_table._showTable(table,data.data.userRoles,page.columns,page.rowCallback);
                    //page.bindEvent();
                }
            });
        }   
    };

    return {
        refreshTable:$.proxy(page.ajaxTable, page),
        initPage: $.proxy(page.initPage, page)
    };
});