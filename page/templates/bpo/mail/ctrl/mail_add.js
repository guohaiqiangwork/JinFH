define(['jquery','widget/http','widget/dialog','widget/ajax_form', '../../bpo_service', 'service/util_service', 'route_config','bootbox','select2'], ($,http,dialog,ajax_form, bpo_service, util_service, route_config,bootbox,select2) => {
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
            dataModel: null,//数据表格引用
            folders:null
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
                $(".form_date").datetimepicker({
                    //language:  'fr',
                    language:  'fr',
                    weekStart: 1,
                    todayBtn:  1,
                    autoclose: 1,
                    todayHighlight: 1,
                    startView: 2,
                    minView: 2,
                    forceParse: 0
                });
                //如果是查看页面，则readonly所有输入与域
                if (this.params.pageType == 'view') {
                    //util_service._readonlyInput(this.params.$fm);
                } else {
                    b = true;
                    $('#btn-submit').show();
                }
            });
            if (this.params.pageType != 'add'&& this.params.pageType != undefined) { //如果此页面不是新增，则请求服务 端数据
                    var id = route_config.getStateParams()['id'];
                    //bpo_service.getFile(id, $.proxy(this.render, this));
            } else { //如果页面是新增，则不请求服务 端数据，立即执行延迟加载
                //let customerCode=localStorage.getItem('customerCode')
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
                }
            });
        },
        /**
        * 模板渲染
        */
        render(data, flag){
            if (!data && !flag)
                    return;
            var myTemplate = $.templates("#queryFormTmpl");
            let customerCode = localStorage.getItem('customerCode');
            if(this.params.pageType=='view'){
                myTemplate.link("#file-edit",{customerCode:customerCode,file:data.file})
            }else{
                myTemplate.link("#main-content",{customerCode:customerCode});
            }
            this.params.deferred.resolve('ok');
        },
        /**
             * 初始化校验框架
             */
        initAjaxEdit() {
            var now = new Date().Format("yyyyMMddhhmmss");
            $("#taskId").val("TM-"+now);
            let rules={
                taskId :"required",
                mailTime : "required"
            }
            let messages={
                taskId :"请输入邮寄单号",
                mailTime :"请输入邮寄时间"
            }
            $("#type").select2({
                separator: ","
            });
            ajax_form.init({
                $fm: this.params.$fm,
                type: 'POST',
                rules: rules,
                messages:messages,
                apiName: this.params.pageType == 'add' || this.params.pageType==undefined ? 'task_add' : 'task_update',
                afterSuccess: $.proxy(this.ajaxSuccess, this)
            });
        }
    };

    return {
        initPage: $.proxy(page.initPage, page)
    };
});