define(['jquery','widget/table_data','widget/http','widget/dialog','widget/ajax_form', '../../bpo_service', 'service/util_service', 'route_config','bootbox','select2'], ($,table_data,http,dialog,ajax_form, bpo_service, util_service, route_config,bootbox,select2) => {
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
                    bpo_service.getFile(id, $.proxy(this.render, this));
            } else { //如果页面是新增，则不请求服务 端数据，立即执行延迟加载
                let customerCode=localStorage.getItem('customerCode');
                bpo_service.getFileMeta(customerCode, $.proxy(this.render,this));
                //this.params.deferred.resolve('ok');
            }
        },
        /**
         * 事件绑定
         */
        bindEvent() {
        	util_service._closeDialog($('#btn-close'), true); //绑定关闭按钮
            $("#image-data").on('click','i.view',$.proxy(this.viewImageClick, this));
            $("#imagetoolbar").on('click','#addImage',$.proxy(this.addImageClick, this));
        },
        viewImageClick(event){
            let $this = $(event.target);
            let id = $this.data('id');
            var viewDeferred = $.Deferred();
            viewDeferred.done(() => {

            });
            http.get({
                    apiName:'img_view',
                    urlParams: {id:id},
                    success(img) {
                        var data = "data:image/jpg;base64,"+img.data;
                        var dialog = bootbox.dialog({
                            title:'查看',
                            message: '<p><i class="fa fa-spin fa-spinner"></i> 加载中...</p>'
                        });
                        dialog.init(function(){
                            setTimeout(function(){
                                dialog.find('.bootbox-body').html('<image src="'+data+'" class="img-rounded img-responsive center-block"/>');
                            }, 1000);
                        });
                    }
            });
        },
        addImageClick(event){
            dialog.page({
                title: '上传',
                modal_width: '600',
                stateParams: {businessNo:route_config.getStateParams()['id']}, //传输给新页面的数据；pageType比传；update,add,view
                loadUrl: '/file/upload'
            });
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
                var folders = data.file.selectedFolder.split(",");
                var queryResultTitles=[
                        {
                            label: "文件名"
                        },
                        {
                            label: "类型"
                        },
                        {
                            label: "操作"
                        }
                    ];
                myTemplate.link("#file-edit",{customerCode:customerCode,file:data.file,queryResultTitles:queryResultTitles,folders:folders,images:data.images});
                
            }else{
                myTemplate.link("#main-content",{filecfg: data.filecfg,filefolder:data.filefolder,customerCode:customerCode});
            }
           
            this.params.deferred.resolve('ok');
        },
        /**
             * 初始化校验框架
             */
        initAjaxEdit() {
            $("#selectedFolder").select2({
                separator: ","
            });
            ajax_form.init({
                $fm: this.params.$fm,
                type: 'POST',
                apiName: this.params.pageType == 'add' || this.params.pageType==undefined ? 'file_new' : 'file_update',
                afterSuccess: $.proxy(this.ajaxSuccess, this)
            });
        }
    };

    return {
        initPage: $.proxy(page.initPage, page)
    };
});