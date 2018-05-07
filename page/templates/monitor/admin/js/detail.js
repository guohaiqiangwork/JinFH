/**
 * 用户查询模块
 */
 define(['jquery', 'widget/dialog', 'route_config', 'widget/http','bootbox','../../service','echarts','echarts-gl'],
   ($, dialog, route_config, http,bootbox,service,echarts) => {

    var page = {
        /**
         * 模块参数
         */
         params: {
          metrics: null,
          deferred: null,
          diskCharts:null,
          memoryCharts:null,
          heapMemoryCharts:null,
          nonHeapMemoryCharts:null,
          uptime:null,
          monitorData:null,
          monitorTemplate:null,
          eventSource:null,
          hystrixData:null
        },

        /**
         * 模块入口
         */
        initPage() {
          $.views.converters("time", function(val) {
            var mss = parseFloat(val);
            var days = Math.floor(mss / (1000 * 60 * 60 * 24));
            var hours = Math.floor((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((mss % (1000 * 60)) / 1000);
            return days + ":" + hours + ":" + minutes + ":"
            + seconds + " (d:h:m:s)";
          });
          $.views.converters("trim", function(val) {
            return val;
          });
          this.params.deferred = $.Deferred();
          this.params.diskUse=["OEE",45];
          this.params.deferred.done(() => {
            //this.initData();
            //this.bindEvent();
            var timer = setInterval(function(){       
              page.time(page.params.uptime);
              page.params.uptime+=1000;
            },1000);
          });
          var url = route_config.getStateParams()['url'];
          var ip = url.split(":")[0];
          var port = url.split(":")[1];
          service.monitor_detail(ip,port,$.proxy(this.render, this));
        },
        callSearch() {
          return true;
        },
        render(data){
          this.params.monitorTemplate = $.templates("#detailTmpl");
          var url = route_config.getStateParams()['url'];
          let hystrixUrl = '/api/hystrix/monitor?stream='+encodeURIComponent('http://'+url+'/hystrix.stream');
          this.params.monitorData = {
            info:data.info,
            health:data.health,
            metrics:data.metrics,
            systemload:data.metrics['systemload.average'],
            classes:{totalLoad:data.metrics['classes.loaded'],currentLoad:data.metrics['classes'],unloaded:data.metrics['classes.unloaded']},
            threads:{current:data.metrics['threads'],totalStarted:data.metrics['threads.totalStarted'],daemon:data.metrics['threads.daemon'],peak:data.metrics['threads.peak']},
            gc:{ps_scavenge_count:data.metrics['gc.ps_scavenge.count'],ps_scavenge_time:data.metrics['gc.ps_scavenge.time'],ps_marksweep_count:data.metrics['gc.ps_marksweep.count'],ps_marksweep_time:data.metrics['gc.ps_marksweep.time']},
            env:data.env,
            dump:data.dump,
            hystrix:hystrixUrl
          };
          this.params.hystrixData=[];
          this.params.monitorTemplate.link("#detail",this.params.monitorData);
          /*********磁盘信息***********/
          this.params.diskCharts = echarts.init(document.getElementById('diskSpace'));
          this.params.diskCharts.setOption(this.getDiskUseChartOption(data.health.diskSpace));
          /*********内存信息***********/
          this.params.memoryCharts = echarts.init(document.getElementById('memory'));
          this.params.memoryCharts.setOption(this.getMemoryCharts(data.metrics));
          /*********堆内存信息***********/
          this.params.heapMemoryCharts = echarts.init(document.getElementById('heapMemory'));
          this.params.heapMemoryCharts.setOption(this.getHeapMemoryCharts(data.metrics));
          /*********堆内存信息***********/
          this.params.nonHeapMemoryCharts = echarts.init(document.getElementById('nonHeapMemory'));
          this.params.nonHeapMemoryCharts.setOption(this.getNonHeapMemoryCharts(data.metrics));
          this.params.uptime = data.metrics.uptime;
          this.params.deferred.resolve('ok'); 
        },
        //初始化hystrix数据
        initData(){
          var url = route_config.getStateParams()['url'];
          this.params.eventSource=new EventSource("http://"+url+"/hystrix.stream");
          this.params.eventSource.onopen = function(){
            console.log("连接打开。。。。。。");
          }
          this.params.eventSource.onerror= function(e) {
            console.log('error');
          };
          this.params.eventSource.onmessage=function(event) {
            let data = JSON.parse(event.data);
            if(data.type=='HystrixCommand'){
              let hystrixTemp = page.params.monitorData.hystrix;
              let has = false;
              let key = data.name+data.group;
              for(let i in hystrixTemp){
                if(hystrixTemp[i].name==data.name&&hystrixTemp[i].group==data.group){
                  has=true;
                  $.observable(page.params.monitorData.hystrix).remove(i,1);
                  $.observable(page.params.monitorData.hystrix).insert(data);
                  page.params.hystrixData[i].values.push({
                    time:data.currentTime,
                    value:data.rollingCountSuccess
                  });
                  let c = page.params.hystrixData[i].chart;
                  c.setOption(
                      {
                        series: [{
                          data: page.params.hystrixData[i].values
                        }]
                      }
                    );
                  break;
                }
              }
              if(!has){
                $.observable(page.params.monitorData.hystrix).insert(data);
                let hystrixCharts = echarts.init(document.getElementById(key));
                page.params.hystrixData.push({
                  name:key,
                  chart:hystrixCharts,
                  values:[{
                    time:data.currentTime,
                    value:data.rollingCountSuccess
                  }
                  ]
                });
                hystrixCharts.setOption(page.getHystrixChartOption(page.params.hystrixData[0].values));
              }
            }
          };
        },

        /**
         * 事件绑定
         */
        bindEvent() {
          $("button.close").on("click",$.proxy(this.closeEvent, this));
        },
        closeEvent(event){
          this.params.eventSource.close();
          console.log('连接关闭。。。。。。');
        },
        time(val) {
          var mss = parseFloat(val);
          var days = Math.floor(mss / (1000 * 60 * 60 * 24));
          var hours = Math.floor((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((mss % (1000 * 60)) / 1000);
          $("#uptime").html(days + ":" + hours + ":" + minutes + ":"+ seconds + " (d:h:m:s)");
        },
        getMemoryCharts(metrics){
          var total = Math.round(parseFloat(metrics.mem)/(1024));
          var use = Math.round((parseFloat(metrics.mem)-parseFloat(metrics['mem.free']))/(1024));
          var percent = Math.round((use/total)*100);
          return{
            title :{
              text: "内存: "+use+"M / "+total+"M",
              borderWidth: 1,
              textStyle: {
                fontSize: 14
              },
              left: '30%',
              top: '80%'
            },
            tooltip : {
              formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {

            },
            series: [
            {
              name: '内存',
              type: 'gauge',
              detail: {formatter:'{value}%'},
              data: [{value:percent, name: '内存'}]
            }
            ]
          }
        },
        getHeapMemoryCharts(metrics){
          var total = Math.round(parseFloat(metrics['heap.committed'])/(1024));
          var use = Math.round(parseFloat(metrics['heap.used'])/(1024));
          var init = Math.round(parseFloat(metrics['heap.init'])/(1024));
          var max = Math.round(parseFloat(metrics['heap'])/(1024));
          var percent = Math.round((use/total)*100);
          return{
            title :{
              text: '堆内存: '+use+'M / '+total+'M'+'\n'+"初始大小:"+init+"M"+'\n'+"最大值:"+max+'M',
              borderWidth: 1,
              textStyle: {
                fontSize: 14
              },
              left: '30%',
              top: '80%'
            },
            tooltip : {
              formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {

            },
            series: [
            {
              name: '堆内存',
              type: 'gauge',
              detail: {formatter:'{value}%'},
              data: [{value:percent, name: '堆内存'}]
            }
            ]
          }
        },
        getNonHeapMemoryCharts(metrics){
          var total = Math.round(parseFloat(metrics['nonheap.committed'])/(1024));
          var use = Math.round(parseFloat(metrics['nonheap.used'])/(1024));
          var init = Math.round(parseFloat(metrics['nonheap.init'])/(1024));
          var max = Math.round(parseFloat(metrics['nonheap'])/(1024));
          var percent = Math.round((use/total)*100);
          return{
            title :{
              text: '非堆内存: '+use+'M / '+total+'M'+'\n'+"初始大小:"+init+"M"+'\n'+"最大值:"+max+'M',
              borderWidth: 1,
              textStyle: {
                fontSize: 14
              },
              left: '25%',
              top: '80%'
            },
            tooltip : {
              formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {

            },
            series: [
            {
              name: '非堆内存',
              type: 'gauge',
              detail: {formatter:'{value}%'},
              data: [{value:percent, name: '非堆内存'}]
            }
            ]
          }
        },
        getDiskUseChartOption(diskSpace){
          return {
            title : {

            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {

            },
            series : [
            {
              name: '磁盘容量',
              type: 'pie',
                        //radius : '55%',
                        //center: ['50%', '60%'],
                data:[
                {
                  value:Math.round((parseInt(diskSpace.total)-parseInt(diskSpace.free))/(1024*1024*1024)), 
                  name:'已使用(G)'
                },
                {
                  value:Math.round((parseInt(diskSpace.free))/(1024*1024*1024)), 
                  name:'剩余磁盘(G)',
                  itemStyle: {
                    normal: {
                      color: '#5eb95e'
                    }
                  }
                }
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
        },
        getHystrixChartOption(hystrix){
          return {
            title: {
                text: '动态数据 + 时间坐标轴'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    params = params[0];
                    var date = new Date(params.name);
                    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: hystrix
            }]
          };
        }
      };
      return {
        initPage: $.proxy(page.initPage, page),
        search() {
          page && page.params && page.params.table_data && page.params.table_data._showPage(null, null, true);
        }
      };
});
