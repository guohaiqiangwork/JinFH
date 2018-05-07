define(['jquery','widget/dialog', 'widget/ajax_form', '../../service', 'service/util_service', 'route_config','bootbox','./role_edit'], ($,dialog, ajax_form, service, util_service, route_config,bootbox,role_edit) => {
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
            roleCode:null
        },

        /**
         * 模块入口
         */
        initPage() {
            this.params.deferred = $.Deferred();
                //获取页面传输参数
            var stateParams = route_config.getStateParams();
            this.params.pageType = route_config.getStateParams()['pageType'];
            this.params.roleCode = route_config.getStateParams()['roleCode'];
            this.params.deferred.done(() => { 
                this.params.$fm = $('#form-userrole');
                this.initAjaxEdit();
                this.bindEvent();
                //如果是查看页面，则readonly所有输入与域
                $(".form_date").datetimepicker({
                    //language:  'fr',
                    format: 'yyyy-mm-dd',
                    language:  'fr',
                    weekStart: 1,
                    todayBtn:  1,
                    autoclose: 1,
                    todayHighlight: 1,
                    startView: 2,
                    minView: 2,
                    forceParse: 0
                });
                if (this.params.pageType == 'view') {
                    util_service._readonlyInput(this.params.$fm);
                } else { 
                    $('#btn-userole-submit').show();
                }
            });
            if (this.params.pageType != 'add'&& this.params.pageType != undefined) { //如果此页面不是新增，则请求服务端数据
                var id = route_config.getStateParams()['id'];
                service.find_user_role(id, $.proxy(this.render, this)); 
            } else { //如果页面是新增，则不请求服务端数据，立即执行延迟加载
                this.render(null, true);
                this.params.deferred.resolve('ok');
            }
        },
        /**
         * 事件绑定
         */
        bindEvent() {
        	util_service._closeDialog($('#btn-close-userrole'), true); //绑定关闭按钮
        },
        ajaxSuccess() {
            dialog.confirm({
                content: '提交成功,确定要返回吗?',
                onSuerBefore() {
                    role_edit.refreshTable();
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
            if (flag) {
                var myTemplate = $.templates("#userRoleFormTmpl");
                myTemplate.link("#user-role-edit",{userRole:{roleCode:this.params.roleCode}});
            }
            else{
                var myTemplate = $.templates("#userRoleFormTmpl");
                myTemplate.link("#user-role-edit",{userRole:data});
           
            }
            this.params.deferred.resolve('ok');
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
        }
    };

    return {
        initPage: $.proxy(page.initPage, page)
    };
});