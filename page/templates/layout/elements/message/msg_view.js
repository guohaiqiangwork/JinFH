define(['jquery','widget/http','widget/dialog','widget/ajax_form', 'service/util_service', 'route_config','bootbox','select2'], ($,http,dialog,ajax_form,util_service, route_config,bootbox,select2) => {
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
            });
            let id = route_config.getStateParams()['id'];
            if(this.params.pageType != 'add'&& this.params.pageType != undefined){
                service._findMsgById(id,$.proxy(this.render,this));
            }
            else{
                let userCode = localStorage.getItem('userCode');
                var myTemplate = $.templates("#msgAddTmpl");
                myTemplate.link("#main-content",{userCode:userCode});
                this.params.deferred.resolve('ok');
            }
            
        },
        /**
         * 事件绑定
         */
        bindEvent() {
            util_service._closeDialog($('.btn-float-box-close'), true); //绑定关闭按钮
        },
        ajaxSuccess() {
            dialog.confirm({
                content: '提交成功,确定要返回吗?',
                onSuerBefore() {
                    window.location.href="/index.html";
                }
            });
        },
        /**
        * 模板渲染
        */
        render(data){
            let userCode = localStorage.getItem('userCode');
            if (!data)
                    return;
            $.views.converters("publishTime", function(val) {  
                    return new Date(val).Format("yyyy-MM-dd hh:mm:ss");  
            }); 
            var myTemplate = $.templates("#message-view-temp");
            myTemplate.link("#message-view-body",{userCode:userCode,message:data});
            this.params.deferred.resolve('ok');
        },
        /**
             * 初始化校验框架
             */
        initAjaxEdit() {
            ajax_form.init({
                $fm: this.params.$fm,
                type: 'POST',
                apiName: 'msgpublish',
                afterSuccess: $.proxy(this.ajaxSuccess, this)
            });
        }
    };
    var service = {
        _findMsgById(id,callBack){
            http.get({
                apiName: 'findMsgById',
                urlParams: {id: id},
                success(data) {
                    callBack && typeof (callBack) == 'function' && callBack(data.data);
                }
            })
        }
    };
    return {
        initPage: $.proxy(page.initPage, page)
    };
});