/**
 * 接口设置模块
 */
 define(['jquery', 'widget/dialog', 'route_config', 'widget/http','bootbox','../../service'],
   ($, dialog, route_config, http,bootbox,service) => {

    var page = {
        /**
         * 模块参数
         */
         params: {
          deferred: null,
          operateTemplate:null,
          instances:null,
          apiDetail:null,
          url:null,
          ips:[],
          serviceId:null
        },

        /**
         * 模块入口
         */
         initPage() {
          var stateParams = route_config.getStateParams();
          this.params.instances = route_config.getStateParams()['instances'];
          this.params.apiDetail = route_config.getStateParams()['apiDetail'];
          this.params.url = route_config.getStateParams()['url'];
          this.params.deferred = $.Deferred();
          this.params.ips=[];
          this.params.deferred.done(() => {
            this.initData();
            this.bindEvent();
          });
          this.render();
        },
        render(){
          let instances = this.params.instances;
          for(let instance in instances){
            let instanceInfo = instances[instance].instanceInfo;
            this.params.ips.push(instanceInfo.instanceId);
            this.params.serviceId = instanceInfo.app;
          }
          let apiDetail = this.params.apiDetail;
          let url = this.params.url;
          this.params.serviceTemplate = $.templates("#apiOperateTml");
          this.params.serviceTemplate.link("#apiOperate",{
            serviceId:this.params.serviceId,
            ips:this.params.ips,
            apiDetail:apiDetail,
            url:url
          });
          this.params.deferred.resolve('ok');
        },
        //初始化hystrix数据
        initData(){

        },

        /**
         * 事件绑定
         */
        bindEvent() {
          $("#rate").on("click",$.proxy(this.setting,this));
        },
        setting(event){
          let maxConcurrentRequests = document.getElementById("maxConcurrentRequests").value;
          let timeoutInMilliseconds = document.getElementById("timeoutInMilliseconds").value;
          let errorThresholdPercentage = document.getElementById("errorThresholdPercentage").value;
          let sleepWindowInMilliseconds = document.getElementById("sleepWindowInMilliseconds").value;
          let hystrixs=[];
          for(let ip in page.params.ips){
            let url = "http://"+page.params.ips[ip];
            hystrixs.push({
                ip:url,
                url:page.params.url,
                method:page.params.url,
                commandKey:page.params.url,
                hystrixPropsVoList:[
                  {
                    type:"Command",
                    key:"execution.isolation.semaphore.maxConcurrentRequests",
                    value:maxConcurrentRequests
                  },{
                    type:"Command",
                    key:"execution.isolation.thread.timeoutInMilliseconds",
                    value:timeoutInMilliseconds
                  },{
                    type:"Command",
                    key:"circuitBreaker.errorThresholdPercentage",
                    value:errorThresholdPercentage
                  },{
                    type:"Command",
                    key:"circuitBreaker.sleepWindowInMilliseconds",
                    value:sleepWindowInMilliseconds
                  }
                ]
              });
          }
          http.post({
              apiName: 'api_rate',
              data:JSON.stringify(hystrixs),
              headers: {
                  Authorization: "Arch6WithCloud "+localStorage.getItem("jwt")
              }, 
              success(data) {
                  if(data.statusText=='Success'){
                    bootbox.alert("设置成功！");
                  }
              }
            });
        }
      };
      return {
        initPage: $.proxy(page.initPage, page)
      };
    });
