/**
 * service展示模块
 */
 define(['jquery', 'widget/dialog', 'route_config', 'widget/http','bootbox','../../service','echarts','echarts-gl'],
   ($, dialog, route_config, http,bootbox,service,echarts) => {

    var page = {
        /**
         * 模块参数
         */
         params: {
          deferred: null,
          serviceTemplate:null
        },

        /**
         * 模块入口
         */
         initPage() {
          this.params.deferred = $.Deferred();
          this.params.deferred.done(() => {
            this.initData();
            this.bindEvent();
          });
          service.service_detail($.proxy(this.render, this));
        },
        callSearch() {
          return true;
        },
        render(data){
          this.params.serviceTemplate = $.templates("#serviceInfoTml");
          this.params.serviceTemplate.link("#main-content",{instances:data});
          this.params.deferred.resolve('ok');
        },
        //初始化hystrix数据
        initData(){

        },

        /**
         * 事件绑定
         */
        bindEvent() {
          $("table").on("click","i.setting",$.proxy(this.settingClick, this));
        },
        settingClick(event){
          let $this = $(event.target),
              serviceId = $this.data('id');
          route_config.go('/monitor/zuul/api', {serviceId: serviceId}, {
            $container: $.main_content, //指定的容器；$.main_content已保存在全局变量，可以参考global_param.js
            isInitPage: true
          });
        }
      };
      return {
        initPage: $.proxy(page.initPage, page),
        search() {
          page && page.params && page.params.table_data && page.params.table_data._showPage(null, null, true);
        }
      };
    });
