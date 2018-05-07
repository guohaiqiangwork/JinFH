/**
 * 管理模块服务 
 */
define(['widget/http'], (http) => {
    var service = {};

    service.monitor_detail = function(ip,port,callBack) {
        http.get({
            apiName: 'monitor_detail',
            urlParams: {ip:ip,port:port},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    service.service_detail = function(callBack){
        http.get({
            apiName: 'service_detail',
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    service.api_detail = function(serviceId,callBack) {
        http.get({
            apiName: 'api_detail',
            urlParams: {serviceId:serviceId},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    //gateway设置
    service.gateway_setting = function(user_id,callBack) {
        http.get({
            apiName: 'gateway_setting',
            urlParams: {user_id:user_id},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    //方案查询
    service.rate_limit = function(type,callBack) {
        http.get({
            apiName: 'rate_limit',
            urlParams: {type:type},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    service.publish_plan = function(plan,callBack){
        http.post({
            apiName: 'publish_plan',
            data:JSON.stringify(plan),
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    service.disable_plan = function(plan,callBack){
        http.post({
            apiName: 'disable_plan',
            data:JSON.stringify(plan),
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };   
    return service;
});
