/**
 * 修改模块
 */
define(['jquery','bootbox','widget/ajax_form','widget/http','widget/dialog', '../../bpo_service', 'service/util_service', 'route_config'],
    ($,bootbox,ajax_form,http,dialog,bpo_service, util_service, route_config) => {

        var pageUpload = {

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
            dataModel: null, //数据表格引用s
        },
        /**
         * 模块入口
         */
        initPage() {
            this.initAjaxEdit();
            this.render(null,this);
            this.params.$fm = $('#formUpload');
            this.bindEvent();
        },
        /**
         * 事件绑定
         */
        bindEvent() {
            $("#btn-submit").on('click',$.proxy(this.upload,this));
        },
        upload(event){
            var data = this.params.$fm.serialize();
            //alert(data);
            http.submit({
                apiName:'img_upload',
                type: 'POST',
                contentType:'application/x-www-form-urlencoded',
                $form:this.params.$fm,
                success(result) {
                    bootbox.alert("上传成功");
                }
            });
        },
        /***********************************/
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
            var businessNo = route_config.getStateParams()['businessNo'];
            var customerCode = localStorage.getItem('customerCode');
            var myTemplate = $.templates("#uploadFormTmpl");
            myTemplate.link("#upload-files",{businessNo:businessNo,customerCode:customerCode});
        },
        /**
             * 初始化校验框架
             */
        initAjaxEdit() {
            let rules={
                name :"required",
                type : "required",
                path : "required"
            }
            $("#file").fileinput({
                'showPreview': false,
                'allowedFileExtensions': ['jpg', 'png', 'gif'],
                'elErrorContainer': '#errorBlock'
            });
        }
    };

    return {
        initPage: $.proxy(pageUpload.initPage, pageUpload)
    };
});
