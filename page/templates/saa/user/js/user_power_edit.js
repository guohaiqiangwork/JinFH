define(['jquery','widget/dialog', 'widget/ajax_form', '../../service', 'service/util_service', 'route_config','bootbox','./user_power_config'], ($,dialog, ajax_form, service, util_service, route_config,bootbox,user_power_config) => {
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
            dataModel: null //数据表格引用
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
                this.params.$fm = $('#formUserPower');
                this.initAjaxEdit();
                this.bindEvent();
                //如果是查看页面，则readonly所有输入与域
                if (this.params.pageType == 'view') {
                    util_service._readonlyInput(this.params.$fm);
                } else { 
                    $('#btn-submit-userpower').show();
                }
            });
            if (this.params.pageType != 'add'&& this.params.pageType != undefined) { //如果此页面不是新增，则请求服务端数据
                var id = route_config.getStateParams()['id'];
                service.find_user_power_by_pk(id, $.proxy(this.render, this)); 
            } else { //如果页面是新增，则不请求服务端数据，立即执行延迟加载
                var userCode = route_config.getStateParams()['userCode'];
                this.render(userCode, true);
                this.params.deferred.resolve('ok');
            }
        },
        /**
         * 事件绑定
         */
        bindEvent() {
        	util_service._closeDialog($('#btn-close-userpower'), true); //绑定关闭按钮
        },
        ajaxSuccess() {
            dialog.confirm({
                content: '提交成功,确定要返回吗?',
                onSuerBefore() {
                    user_power_config.refreshPowerTable();
                    page.params.$fm.find('#btn-close-userpower').trigger('click');
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
                var myTemplate = $.templates("#userPowerEditTmpl");
                myTemplate.link("#user-power-edit",{userpower:{userCode:data}});
            }
            else{
                var myTemplate = $.templates("#userPowerEditTmpl");
                myTemplate.link("#user-power-edit",{ userpower: data});
           
            }
            this.params.deferred.resolve('ok');
        },
        /**
             * 初始化校验框架
             */
        initAjaxEdit() {
            let rules={
                userCode :"required",
                factorCode : "required",
                dataOper:"required",
                dataValue:"required"
            }
            let messages={
                userCode :"请输入用户代码",
                factorCode : "请输入权限代码",
                dataOper:"请输入权限操作符",
                dataValue:"请输入权限值"
            }
            ajax_form.init({
                $form: this.params.$fm,
                rules: rules,
                type: 'POST',
                apiName: this.params.pageType == 'add' || this.params.pageType==undefined ? 'create_user_power' : 'create_user_power',
                messages:messages,
                beforeSubmit:$.proxy(this.beforeSubmit, this),
                afterSuccess: $.proxy(this.ajaxSuccess, this)
            });
        },
        beforeSubmit() {

        },
    };

    return {
        initPage: $.proxy(page.initPage, page)
    };
});