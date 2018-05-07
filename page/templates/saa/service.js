/**
 * 管理模块服务 
 */
define(['widget/http'], (http) => {
    var service = {};

    service.search_saa_task = function(id, callBack) {
        http.get({
            apiName: 'search_saa_task',
            urlParams: {value: id},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    }; 
    service.find_task = function(id, callBack) {
        http.get({
            apiName: 'saa_task_one',
            urlParams: {taskCode: id},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    //role
    service.find_role = function(id, callBack) {
        http.get({
            apiName: 'saa_role_one',
            urlParams: {roleCode: id},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    service.find_user_role = function(id, callBack) {
        http.get({
            apiName: 'user_role_one',
            urlParams: {id: id},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    service.find_role_all = function(callBack) {
        http.get({
            apiName: 'saa_role_all',
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    //factor
    service.find_factor = function(id, callBack) {
        http.get({
            apiName: 'saa_factor_one',
            urlParams: {factorCode: id},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    //userPower
    service.find_saa_user_power_by_userCode = function(userCode, callBack) {
        http.get({
            apiName: 'saa_user_power_by_userCode',
            urlParams: {userCode: userCode},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    service.find_user_power_by_pk = function(id, callBack) {
        http.get({
            apiName: 'user_power_one',
            urlParams: {id: id},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    service.find_user_power_role_all = function(userCode,callBack) {
        http.get({
            apiName: 'saa_user_power_role_all',
            urlParams: {userCode: userCode},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    service.find_user_list = function(callBack) {
        http.get({
            apiName: 'sys_user_list',
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    return service;
});
