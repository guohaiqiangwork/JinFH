/**
 * 网关配置
 */
 define(['jquery', 'bootstrap-table', 'widget/dialog', 'route_config', 'widget/http', 'service/util_service','bootbox','../../service'],
   ($, table, dialog, route_config, http, util_service,bootbox,service) => {

    var page = {

        /**
         * 模块参数
         */
      params: {
        table: null, //数据表格引用
        deferred: null,
        deferred1: null,
        deferred2: null,
        user_id:null,
        apiData:null,
        rateLimit:null,
        timeLimit:null,
        user:null,
        relations:null
      },

      /**
       * 模块入口
       */
      initPage() {
        var stateParams = route_config.getStateParams();
        this.params.user_id = route_config.getStateParams()['id'];
        this.params.deferred = $.Deferred();
        this.params.deferred1 = $.Deferred();
        this.params.deferred2 = $.Deferred();
        this.params.deferred.done(() => {
          this.params.table = $('#apis').bootstrapTable({
              search: true,
              showRefresh:true,
              columns:this.columns,
              data: this.params.apiData
          });
          this.bindEvent();
        });
        service.rate_limit('1',$.proxy(this.rate_limit, this,'1'));
        this.params.deferred1.done(() => {
          service.rate_limit('2',$.proxy(this.rate_limit, this,'2'));
        });
        this.params.deferred2.done(() => {
          service.gateway_setting(this.params.user_id,$.proxy(this.render, this));
        });  
        
      },
      //初始化表格数据
      render(data){
        var myTemplate = $.templates("#gatewayTmpl");
        myTemplate.link("#gateway",data);
        this.params.apiData = data.gateways;
        this.params.user = data.user;
        this.params.relations = data.relations;
        this.params.deferred.resolve('ok');
      },
      rate_limit(type,data){
        if(type=='1'){
          this.params.rateLimit = data.zuulRateLimits;
          this.params.deferred1.resolve('ok');
        }
        else{
          this.params.timeLimit = data.zuulRateLimits;
          this.params.deferred2.resolve('ok');
        }
      },

      columns: [
      {
        field: 'id',
        title: '接口ID'
      },{
        field: 'path',
        title: '接口路径'
      },{
        field: 'apiName',
        title: '接口名称'
      },{
        field: 'rateLimitId',
        title: '限流',
        formatter:function(value, row, index) {
          let rateLimit = page.params.rateLimit;
          let relations = page.params.relations;
          let options='<option value="null">不限流</option>';
          var rateLimitId = "";
          var rateLimitName = "";
          for(let j in relations){
            if(row.id==relations[j].zuulGatewayVo.id){
              rateLimitId = relations[j].rateLimitVo.id;
              rateLimitName = relations[j].rateLimitVo.name;
            }
          }
          for(let i in rateLimit){
            let option = "";
            if(rateLimit[i].id==rateLimitId){
               option = '<option value="'+rateLimit[i].id+'" selected>'+rateLimit[i].name+'</option>';
            }
            else{
              option = '<option value="'+rateLimit[i].id+'">'+rateLimit[i].name+'</option>';
            }
            options+=option;
          }
          return '<select id="rateLimit'+index+'" name="rateLimit'+index+'" class="form-control">'+options+'</select>';
        }
      },{
        field: 'timeLimitId',
        title: '配额',
        formatter:function(value, row, index) {
          let timeLimit = page.params.timeLimit;
          let relations = page.params.relations;
          let options='<option value="null">不配额</option>';
          var timeLimitId = "";
          var timeLimitName = "";
          for(let j in relations){
            if(row.id==relations[j].zuulGatewayVo.id){
              timeLimitId = relations[j].timeLimitVo.id;
              timeLimitName = relations[j].timeLimitVo.name;
            }
          }
          for(let i in timeLimit){
            let option = "";
            if(timeLimit[i].id==timeLimitId){
               option = '<option value="'+timeLimit[i].id+'" selected>'+timeLimit[i].name+'</option>';
            }
            else{
              option = '<option value="'+timeLimit[i].id+'">'+timeLimit[i].name+'</option>';
            }
            options+=option;
          }
          return '<select id="timeLimit'+index+'" name="timeLimit'+index+'" class="form-control">'+options+'</select>';
        }
      },{
        field: 'operate',
        title: '操作',
        formatter:function(value, row, index) {
          var opt = "";
          let relations = page.params.relations;
          if(relations.length==0){
            opt +='<a href="#" title="发布"><i class="fa fa-microphone fa-lg publish" data-index="'+index+'" aria-hidden="true"></i></a>&nbsp;&nbsp;';
          }
          else{
            for(let j in relations){
              if(row.id==relations[j].zuulGatewayVo.id){
                opt += '<a href="#" title="禁用"><i class="fa fa-ban fa-lg forbidden" data-index="'+index+'" aria-hidden="true"></i></a>';
              }
            }
            if(opt==""){
              opt +='<a href="#" title="发布"><i class="fa fa-microphone fa-lg publish" data-index="'+index+'" aria-hidden="true"></i></a>&nbsp;&nbsp;';
            }
          }
          return opt;
        }
      }],
      /**
       * 事件绑定
       */
      bindEvent() {
        this.params.table.on('click','tbody i.publish',$.proxy(this.publish, this));
        this.params.table.on('click','tbody i.forbidden',$.proxy(this.forbidden, this));
      },
      publish(event){
        let $this = $(event.target),
            index = $this.data('index');
        let data = $('#apis').bootstrapTable('getData')[index];
        let selectRateId = "#rateLimit"+index;
        let selectTimeId = "#timeLimit"+index;
        let rateLimitId = $(selectRateId).find("option:selected").val();
        let timeLimitId = $(selectTimeId).find("option:selected").val();
        if(rateLimitId=="null"&&timeLimitId=="null"){
          bootbox.alert("请至少选择一种方案！");
        }
        else{
          data.rateLimitId = rateLimitId;
          data.timeLimitId = timeLimitId;
          data.userId = this.params.user.userCode;
          service.publish_plan(data,$.proxy(this.publishRender, this));
        }
        
      },
      publishRender(data){
          bootbox.alert("发布成功");
          page.initPage();
      },
      forbidden(event){
        let $this = $(event.target),
            index = $this.data('index');
        let data = $('#apis').bootstrapTable('getData')[index];
        let selectRateId = "#rateLimit"+index;
        let selectTimeId = "#timeLimit"+index;
        let rateLimitId = $(selectRateId).find("option:selected").val();
        let timeLimitId = $(selectTimeId).find("option:selected").val();
        data.rateLimitId = rateLimitId;
        data.timeLimitId = timeLimitId;
        data.userId = this.params.user.userCode;
        service.disable_plan(data,$.proxy(this.disableRender, this));
      },
      disableRender(data){
          bootbox.alert("禁用成功");
          page.initPage();
      },
    };

    return {
      initPage: $.proxy(page.initPage, page)
    };
  });
