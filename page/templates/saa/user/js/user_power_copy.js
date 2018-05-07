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
            user_list_table:null,
            userCode:null
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
                this.params.$fmPower = $('#formUserList');
                this.initAjaxEdit();
                this.bindEvent();
                $('#btn-submit-user-list').show();
                $("#checkAll").click(function() {
                    $('input[name="checkCode"]').prop("checked",this.checked); 
                });
            });
            this.render();
            this.params.userCode = $("#userCode").val();
            service.find_user_list($.proxy(this.renderAllUser, this));
        },
        /**
         * 事件绑定
         */
        bindEvent() {
            util_service._closeDialog($('#btn-close-user-list'), true); //绑定关闭按钮
            $("#btn-submit-user-list").on('click',$.proxy(this.saveCopyUserPower, this));
        },
        saveCopyUserPower(event){
            let obj = $('input[name="checkCode"]:checked');
            let users ='';
            obj.each(function(i){
                users+=obj[i].value;
                users+=',';
            });
            http.post({
                apiName: 'copy_user_powers',
                data: {userCodeFrom:page.params.userCode,userCodeTo:users},
                success(data) {
                    bootbox.alert("保存成功");
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
        renderAllUser(userList, flag){
            let userListTable = $("#user-list-table");
            this.params.user_list_table = ajax_table._showTable(userListTable,userList,page.columns,page.rowCallback);
            this.params.deferred.resolve('ok');
        },
        /**
             * 初始化校验框架
             */
        initAjaxEdit() {
           
        },
        columns: [
        {
            data: "userCode",
            title: '<input id="checkAll" name="checkAll" type="checkbox" class="checkAll">&nbsp;&nbsp;' + UtilMsg.tableNumber, //table显示的标题 国际化内容：序号
            render(data, type, row) {
                return '&nbsp;&nbsp;<input name="checkCode" type="checkbox" value="' + row.userCode+ '" />';
            }
        },{
            title: "用户代码",
            width: "30%",
            data: 'userCode'
        }, {
            title:"用户名称",
            width: "30%",
            data: 'userName'
        }]
    };

    return {
        initPage: $.proxy(page.initPage, page)
    };
});