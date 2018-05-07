/**
 * 修改模块
 */
define(['jquery','widget/table_data','widget/http','widget/dialog', '../../bpo_service', 'service/util_service', 'route_config','bootstrap-table','bootstrap-editable','bootstrap-table-editable','bootbox'],
    ($,table_data,http,dialog,bpo_service, util_service, route_config,bootstrapTable,editable,bootbox) => {

        var pageModel = {

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
            dataModel: null, //数据表格引用
            table_data: null,
            getData :null
        },
        /**
         * 模块入口
         */
        initPage() {
            this.columns1=[{
                data: 'barCode',
                style: 'min-width:80px;', //th样式
                label: '<input name="checkAll" type="checkbox" class="checkAll">&nbsp;&nbsp;' + UtilMsg.tableNumber, //table显示的标题 国际化内容：序号
                render(data, row, displayIndex) {
                    return '&nbsp;&nbsp;<input name="checkCode" type="checkbox" value="' + data + '" />&nbsp;&nbsp;' + (displayIndex + 1);
                }
            },{
                label: "条码",
                data: 'barCode',
                render(data, row, displayIndex) {
                    return '<a href="#" data-id="'+data+'">'+data+'</a>';
                }
            }];
            this.params.deferred = $.Deferred();
                //获取页面传输参数
            var stateParams = route_config.getStateParams();
            this.params.pageType = route_config.getStateParams()['pageType'];
            this.params.deferred.done(() => {
                let b = false;//如果是修改和查看页面，则注入测试数据
                this.initAjaxEdit();
                this.params.table_data = table_data.show({
                    view: {
                        apiName: 'file_search',
                        columns: this.columns1
                    },
                    jq_object: {
                        $pan: $('#deliver-panel')
                    },
                    callback: {
                        callSearch() {
                            return pageModel.callSearch();//返回true才会执行查询，可以进行查询前校验，比如日期大小等
                        }
                    }
                });
                pageModel.params.table_data._showPage(0);
                //如果是查看页面，则readonly所有输入与域
                this.bindEvent();
            });
            var id = route_config.getStateParams()['taskId'];
            bpo_service.getTask(id, $.proxy(this.render, this));
        },
        /**
         * 事件绑定
         */
        bindEvent() {
            $("#update").on('click',$.proxy(this.update, this));
            this.params.table_data._getTbody().on('click','i.delete',$.proxy(this.deleteClick, this));
            //toolbar
            $("#toolbar").on('click','#add',$.proxy(this.add, this));
            $("#toolbar").on('click','#remove',$.proxy(this.batch_delete, this));

        },
        add(event){
           let $this = $(event.target),
                taskId = route_config.getStateParams()['taskId'];
            dialog.page({
                title: '扫描',
                stateParams: { pageType: 'scan',taskId:taskId,table_data:this.params.table_data}, //传输给新页面的数据；pageType比传；update,add,view
                loadUrl: '/bpo/mail/scan'
            });
        },
        deleteClick(event){
            let $this = $(event.target),
                barCode = $this.data('id');
            dialog.confirm({
                content: '确定移除吗?',
                onSuerBefore() {
                    http.post({
                       apiName:'file_new',
                       data:{barCode:barCode,customerCode:localStorage.getItem('customerCode'),youjiTaskId:"",status:'03'},
                        success(data) {
                            dialog.alert({
                                content: '移除成功。'
                            });
                            //删除成功后继续查找第一页
                            pageModel.params.table_data._showPage(0);
                        }
                    });
                }
            });
        },
        batch_delete(event){

        },
        update(event){
            var data={};
            var taskId=null;
            $(".form").each(function(index,element){
                taskId = $(this).data('id');
                let name = element.id;
                let txt = element.text.trim();
                if(name=='mailType'){
                    if(txt=='第三方物流'){
                       txt='01'; 
                    }
                    if(txt=='天信致远物流'){
                        txt='02'; 
                    }
                    if(txt=='自送'){
                        txt='03'; 
                    }
                }
                data[name] = txt;
            });
            data['taskId']=taskId;
            http.post({
                apiName:'task_add',
                data:data,
                success(data) {
                    alert("success");
                }
            });
        },
        /*********************filefolder**************/
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
            var mailTime = new Date(data.mailTime).Format("yyyy-MM-dd");
            data.mailTime = mailTime;
            let customerCode = localStorage.getItem('customerCode');
            bpo_service.getFileMeta(customerCode,$.proxy(this.getFileMeta,this));
            this.params.getData = $.Deferred();
            this.params.getData.done(() => {
                var myTemplate = $.templates("#settingTmpl");
                myTemplate.link("#task-deliver",{task: data,queryResultTitles:this.queryResultTitles});
                this.params.deferred.resolve('ok');
            });


        },
        getFileMeta(data){
            let filecfg = data.filecfg;
            for(var i in filecfg){
                var queryResultTitle = {
                    label:filecfg[i].fileFieldName
                };
                this.queryResultTitles.push(queryResultTitle);
                var column={
                    label: filecfg[i].fileFieldName,
                    data: filecfg[i].fileField
                };
                this.columns1.push(column);
            }
            this.columns1.push({
                label: "目录",
                data: 'selectedFolder'
            });
            this.columns1.push({
                label: "状态",
                data:'status',
                render(data, row) {
                    switch(data)
                    {
                        case '01':
                          return '待审核';
                          break;
                        case '02':
                          return '待交接';
                          break;
                        case '03':
                          return '待邮寄';
                          break;
                        case '04':
                          return '配送中';
                          break;
                        case '05':
                          return '签收';
                          break;
                    }
                }
            });
            this.columns1.push({
                label: "操作",
                data: 'barCode',
                render(data, row) {
                    var customerCode = localStorage.getItem('customerCode');
                    let str="";
                    str += '<a href="#" title="移除" ><i class="fa fa-trash-o fa-lg delete" data-id="'+data+'"></i></a>&nbsp;';
                    return str;
                }
            });
            this.queryResultTitles.push({
                label: "状态"
            });
            this.queryResultTitles.push({
                label: "操作"
            });    
            this.params.getData.resolve('ok');
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
            $("#mailType").editable({
                type:"select",
                autotext:'auto'
            });
            $("#mailAddress").editable();
            $("#mailTime").editable({
                type:'date',
                placement:'bottom'
            });
            $("#transportId").editable();
        },
        columns1: [{
            label: "条码",
            data: 'barCode'
        }],
        queryResultTitles :[
                {
                    label: "条码",
                    additionHtml: ' <input name="checkAll" type="checkbox" class="checkAll">'
                }
        ]
    };

    return {
        initPage: $.proxy(pageModel.initPage, pageModel),
        search() {
            pageModel && pageModel.params && pageModel.params.table_data && pageModel.params.table_data._showPage(null, null, true);
        }
    };
});
