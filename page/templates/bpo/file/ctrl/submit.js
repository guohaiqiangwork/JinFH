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
                $("#submitSelected").select2();
                //如果是查看页面，则readonly所有输入与域
            });
            this.render(null, true);
            this.params.deferred.resolve('ok');
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
                    var table_data = route_config.getStateParams()['table_data'];
                    table_data._showPage(0);
                }
            });
        },
        /**
        * 模板渲染
        */
        render(data, flag){
            let customerCode = localStorage.getItem('customerCode');
            let userCode = localStorage.getItem('userCode');
            if (!data && !flag)
                    return;
            if (flag) {
                var myTemplate = $.templates("#queryFormTmpl");
                let options = [
                    {key:'02',value:'待移交'},
                    
                    {key:'03',value:'待邮寄'},
                    {key:'01',value:'待审核'}
                ];
                if(this.params.pageType=='judge'){
                    myTemplate.link("#submit",{option:options,customerCode:customerCode,userCode:userCode,barCode:route_config.getStateParams()['id']});
                }
                else if(this.params.pageType=='deliver'){
                    options = [
                        {key:'03',value:'待邮寄'},
                        {key:'01',value:'待审核'},
                        {key:'02',value:'待移交'}
                    ];
                }
                
            }
            else{
                var myTemplate = $.templates("#queryFormTmpl");
                myTemplate.link("#main-content",{filecfg: data.filecfg,filefolder:data.filefolder,customerCode:customerCode});
            }
            this.params.deferred.resolve('ok');
        },
        /**
             * 初始化校验框架
             */
        initAjaxEdit() {
            ajax_form.init({
                $fm: this.params.$fm,
                type: 'POST',
                apiName: 'submit',
                afterSuccess: $.proxy(this.ajaxSuccess, this)
            });
        }
    };

    return {
        initPage: $.proxy(page.initPage, page)
    };
});