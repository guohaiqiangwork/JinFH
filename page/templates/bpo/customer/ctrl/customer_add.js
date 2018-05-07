define(['jquery','widget/dialog', 'widget/ajax_form', './customer_list', '../../bpo_service', 'service/util_service', 'route_config','bootbox'], ($,dialog, ajax_form, customer_list, bpo_service, util_service, route_config,bootbox) => {
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
                let b = false;//如果是修改和查看页面，则注入测试数据
                this.initAjaxEdit();
                this.bindEvent();
                this.params.$fm = $('#form');
                //如果是查看页面，则readonly所有输入与域
                if (this.params.pageType == 'view') {
                    util_service._readonlyInput(this.params.$fm);
                } else {
                    b = true;
                    $('#btn-submit').show();
                }
            });
            if (this.params.pageType != 'add'&& this.params.pageType != undefined) { //如果此页面不是新增，则请求服务 端数据
                    var id = route_config.getStateParams()['id'];
                    bpo_service.getCustomer(id, $.proxy(this.render, this));
            } else { //如果页面是新增，则不请求服务 端数据，立即执行延迟加载
                this.render(null, true);
                this.params.deferred.resolve('ok');
            }
        },
        /**
         * 事件绑定
         */
        bindEvent() {
        	util_service._closeDialog($('#btn-close'), true); //绑定关闭按钮
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
                var myTemplate = $.templates("#queryFormTmpl");
                myTemplate.link("#main-content",{customer:{customerCode:""}});
            }
            else{
                var myTemplate = $.templates("#queryFormTmpl");
                myTemplate.link("#customer-edit",{ customer: data});
           
            }
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
            ajax_form.init({
                $fm: this.params.$fm,
                rules: rules,
                type: 'POST',
                apiName: this.params.pageType == 'add' || this.params.pageType==undefined ? 'customer_new' : 'customer_update',
                messages:messages,
                afterSuccess: $.proxy(this.ajaxSuccess, this)
            });
        }
    };

    return {
        initPage: $.proxy(page.initPage, page)
    };
});