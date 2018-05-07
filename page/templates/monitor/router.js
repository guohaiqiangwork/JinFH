/**
 * 管理模块路由
 * @author
 * @time 
 */
define(["route_config"], (route_config) => {
    //设置api
    route_config.api({
        //查询监控状态
        monitor_detail: '/gateway/monitor/metrics/{ip}/{port}',
        service_detail: '/gateway/zuul-way/serviceDetail',
        api_detail: '/gateway/zuul-way/apiDetail/{serviceId}',
        api_rate:'/gateway/zuul-way/rate',
        gateway_setting:'/gateway/gateway/prepare/setting/{user_id}',
        rate_limit:'/gateway/gateway/ratelimit/{type}',
        publish_plan:'/gateway/gateway/publishRateLimitPlan',
        disable_plan:'/gateway/gateway/disableRateLimitPlan'
    });
    //配置路由函数
    route_config.state({
        name: 'admin_detail',
        path: '/monitor/admin/detail',
        viewNode: 'main-content',
        templateUrl: '../page/templates/monitor/admin/detail.html',
        component: '../page/templates/monitor/admin/js/detail'
    }).state({
        name: 'service_detail',
        path: '/monitor/zuul/service',
        viewNode: 'main-content',
        templateUrl: '../page/templates/monitor/zuul/service.html',
        component: '../page/templates/monitor/zuul/js/service'
    }).state({
        name: 'api_detail',
        path: '/monitor/zuul/api',
        viewNode: 'main-content',
        templateUrl: '../page/templates/monitor/zuul/api.html',
        component: '../page/templates/monitor/zuul/js/api'
    }).state({
        name: 'api_operate',
        path: '/monitor/zuul/api/operate',
        viewNode: 'main-content',
        templateUrl: '../page/templates/monitor/zuul/api_operate.html',
        component: '../page/templates/monitor/zuul/js/api_operate'
    }).state({
        name: 'zipkin',
        path: '/zipkin',
        viewNode: 'main-content',
        templateUrl: '../page/templates/monitor/zipkin/zipkin.html',
        component: '../page/templates/monitor/zipkin/js/zipkin'
    }).state({
        name: 'gateway',
        path: '/gateway/user-list',
        viewNode: 'main-content',
        templateUrl: '../page/templates/monitor/gateway/user_list.html',
        component: '../page/templates/monitor/gateway/js/user_list'
    }).state({
        name: 'gateway_setting',
        path: '/gateway/setting',
        viewNode: 'main-content',
        templateUrl: '../page/templates/monitor/gateway/gateway_setting.html',
        component: '../page/templates/monitor/gateway/js/gateway_setting'
    })
});
