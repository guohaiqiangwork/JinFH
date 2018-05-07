define(['jquery','widget/http','widget/dialog', 'widget/ajax_form', '../../service', 'service/util_service', 'route_config','bootbox','widget/ajax_table'], ($,http,dialog, ajax_form, service, util_service, route_config,bootbox,ajax_table) => {
    var page = {

        /**
         * 模块参数
         */
        params: {
              /**
             * 模块参数
             */
            deferred: null,
            $fmPower: null,
            pageType: 'add', //默认新增
            dataModel: null, //数据表格引用
            userData:null,
            role_table: null,//数据表格引用
            user_power_table:null,
            userCode:null,
            userRoles:null
        },

        /**
         * 模块入口
         */
        initPage() {
            this.params.deferred = $.Deferred();
                //获取页面传输参数
            var stateParams = route_config.getStateParams();
            this.params.pageType = route_config.getStateParams()['pageType'];
            this.params.userData = route_config.getStateParams()['userData'];
            this.params.deferred.done(() => { 
                this.params.$fmPower = $('#form');
                this.initAjaxEdit();
                this.bindEvent();
                $('#btn-submit').show();
                $("#checkAll").click(function() {
                    $('input[name="checkCode"]').prop("checked",this.checked); 
                });
            });
            this.render();
            this.params.userCode = $("#userCode").val();
            service.find_user_power_role_all(this.params.userCode,$.proxy(this.renderRoleData, this));
            service.find_saa_user_power_by_userCode(this.params.userCode,$.proxy(this.renderUserPowerData, this));
        },
        /**
         * 事件绑定
         */
        bindEvent() {
            util_service._closeDialog($('#btn-close'), true); //绑定关闭按钮
            var userPowerTable = $("#user-power-table");
            userPowerTable.find('tbody').on('click','i.delete',$.proxy(this.deleteUserPowerClick, this));
            userPowerTable.find('tbody').on('click','i.update',$.proxy(this.updateUserPowerClick, this));
            $("#toolbarUserPower").on('click','#addUserPower',$.proxy(this.addUserPowerClick, this));
            $("#btn-submit").on('click',$.proxy(this.saveUserRole, this));
        },
        saveUserRole(event){
            let obj = $('input[name="checkCode"]:checked');
            let saaRoles ='[';
            obj.each(function(i){
                saaRoles+='{';
                saaRoles+='"roleCode":"';
                saaRoles+=obj[i].value;
                saaRoles+='"}';
                saaRoles+=',';
            });
            if(saaRoles.length!=1){
                saaRoles = saaRoles.substring(0,saaRoles.length-1);
            }
            saaRoles+=']';
            let saaRolesVos = JSON.parse(saaRoles);
            http.post({
                apiName: 'update_user_role',
                data: {userCode:page.params.userCode,saaRoles:saaRolesVos},
                success(data) {
                    bootbox.alert("保存成功");
                }
            });
        },
        addUserPowerClick(event){
            let $this = $(event.target);
            dialog.page({
                title: '用户权限修改',
                stateParams: { pageType: 'add',id:null,userCode:page.params.userCode}, //传输给新页面的数据；pageType比传；update,add,view
                loadUrl: '/saa/user/power/edit'
            });
        },
        updateUserPowerClick(event){
            let $this = $(event.target),
                userPowerId = $this.data('id');
            dialog.page({
                title: '用户权限修改',
                stateParams: { pageType: 'update',id:userPowerId}, //传输给新页面的数据；pageType比传；update,add,view
                loadUrl: '/saa/user/power/edit'
            });
        },
        deleteUserPowerClick(event){
            let $this = $(event.target),
                userPowerId = $this.data('id');
            dialog.confirm({
                content: '确定移除吗?',
                onSuerBefore() {
                    http.post({
                       apiName:'delete_saa_user_power',
                       urlParams:{ids:userPowerId},
                       success(data) {
                            dialog.alert({
                                content: '移除成功。'
                            });
                            //删除成功后继续查找第一页
                            page.params.user_power_table
                                .row($this.parents('tr'))
                                .remove()
                                .draw();
                        }
                    });
                }
            });
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
        /**
        * 模板渲染
        */
        render(){
            let data = this.params.userData;
            let keys = data.keys();
            let user ='{';
            for(let key of keys){
                let id = key;
                let userCode=data.get(key);
                user+='"id":"'+id+'",';
                user+='"userCode":"'+userCode+'"';
            }
            user+='}';
            let userJSON = JSON.parse(user);
            if (!data && !flag)
                    return;
            var myTemplate = $.templates("#userPowerConfigTmpl");
            myTemplate.link("#main-content",{user:userJSON});
        },
        renderRoleData(roleData, flag){
            let roleTable = $("#role-table");
            this.params.userRoles = roleData.userRoles;
            this.params.role_table = ajax_table._showTable(roleTable,roleData.roles,page.roleColumns,page.rowCallback);
        },
        renderUserPowerData(userPowers, flag){
            let userPowerTable = $("#user-power-table");
            this.params.user_power_table = ajax_table._showTable(userPowerTable,userPowers,page.userPowerColumns,page.rowCallback);
            this.params.deferred.resolve('ok');
        },
        /**
             * 初始化校验框架
             */
        initAjaxEdit() {
           
        },
        roleColumns: [
        {
            data: "roleCode",
            title: '<input id="checkAll" name="checkAll" type="checkbox" class="checkAll">&nbsp;&nbsp;' + UtilMsg.tableNumber, //table显示的标题 国际化内容：序号
            render(data, type, row) {
                let userRoles = page.params.userRoles;
                for(let i in userRoles){
                    if(userRoles[i].roleCode==row.roleCode){
                        return '&nbsp;&nbsp;<input name="checkCode" type="checkbox" value="' + row.roleCode+ '" checked="true" />';
                    }
                }
                return '&nbsp;&nbsp;<input name="checkCode" type="checkbox" value="' + row.roleCode+ '" />';
            }
        },{
            title: "角色代码",
            width: "30%",
            data: 'roleCode'
        }, {
            title:"角色名称",
            width: "30%",
            data: 'roleCName'
        }],
        userPowerColumns: [
        {
            title: "数据权限代码",
            width: "30%",
            data: 'factorCode'
        }, {
            title:"操作符",
            width: "30%",
            data: 'dataOper'
        }, {
            title:"数据值",
            width: "30%",
            data: 'dataValue'
        },{
            title: "操作",
            width: "10%",
            data: 'id',
            render(data, row) {
                let str = '';
                str += '<a href="#" title="编辑" ><i class="fa fa-pencil-square-o fa-lg update" data-id="'+data+'"></i></a>&nbsp;';
                str += '<a href="#" title="删除" ><i class="fa fa-trash-o fa-lg delete" data-id="'+data+'"></i></a>&nbsp;';
                return str;
            }
        }],
        refreshPowerTable(){
            this.params.userCode = $("#userCode").val();
            service.find_saa_user_power_by_userCode(this.params.userCode,$.proxy(this.renderUserPowerData, this));
        }
    };

    return {
        refreshPowerTable:$.proxy(page.refreshPowerTable, page),
        initPage: $.proxy(page.initPage, page)
    };
});