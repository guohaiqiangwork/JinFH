/**
 * 网关配置
 */
 define(['jquery', 'widget/table_data', 'widget/dialog', 'route_config', 'widget/http', 'service/util_service','bootbox'],
   ($, table_data, dialog, route_config, http, util_service,bootbox) => {

    var page = {

        /**
         * 模块参数
         */
      params: {
        table_data: null, //数据表格引用
      },

      /**
       * 模块入口
       */
      initPage() {
        this.initData();
        //初始化数据表格
        this.params.table_data = table_data.show({
          view: {
                apiName: 'search_user', //本模块service.js中定义的apiName
                columns: this.columns,
                bts: this.bts,
              },
              callback: {
                callSearch() {
                    return page.callSearch();//返回true才会执行查询，可以进行查询前校验，比如日期大小等
                  }
                }
              });
        this.bindEvent();
      },
      callSearch() {
        return true;
      },
      //初始化表格数据
      initData(){
        var myTemplate = $.templates("#queryFormTmpl");

        var queryConditions = [
        {
          name: "userCode",
          showname:"userCode",
          placeholder: "用户代码"
        },
        {
          name: "userName",
          showname:"userName",
          placeholder: "用户名称"
        },
        ];
        var app = {
          title: "用户信息",
          queryConditions: queryConditions
        };
        myTemplate.link("#main-content", app);
      },

      /**
       * 事件绑定
       */
      bindEvent() {
          this.params.table_data._getTbody().on('click','i.setting',$.proxy(this.settingClick, this));
      },
      settingClick(event) {
        let $this = $(event.target),
        id = $this.data('id'),
        userCode = $this.data('usercode');
        dialog.page({
          title: '网关配置',
            stateParams: { pageType: 'update', id: id,userCode:userCode}, //传输给新页面的数据；pageType比传；update,add,view
            loadUrl: '/gateway/setting'
          });
      },
      bts: [],
      /**
       * table的模板
       */
      columns: [{
        data: "id",
          label: '<input id="checkAll" name="checkAll" type="checkbox" class="checkAll">&nbsp;&nbsp;用户Id', //table显示的标题 国际化内容：序号
          render(data, row, displayIndex) {
            return '&nbsp;&nbsp;<input name="checkCode" type="checkbox" value="' + data + '" data-id="'+data+'" />'+"&nbsp;"+data;
          }
        },{
          label: "用户代码",
          data: 'userCode'
        }, {
          label: "用户名称",
          data: 'userName'
        }, {
          label:"用户类型",
          data: 'userType',
          render(data, row) {
            if(data=='1'){
              return "普通用户";
            }
            else{
              return '渠道用户';
            }
          }
        },{
          label: "操作",
          data: 'id',
          render(data, row) {
            let str = '';
              str += '<a href="#" title="配置"> <i class="fa fa-wrench fa-lg setting" data-id="'+data+'" data-usercode="'+row.userCode+'"></i></a>&nbsp;';
              return str;
          }
      }],
    };

    return {
      initPage: $.proxy(page.initPage, page),
      search() {
        page && page.params && page.params.table_data && page.params.table_data._showPage(null, null, true);
      }
    };
  });
