/**
 * 管理模块服务 
 */
define(['widget/http'], (http) => {
    var service = {};
    service.search_sdd_type = function(id, callBack) {
        http.get({
            apiName: 'search_sdd_type',
            urlParams: {value: id},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    }; 
    service.find_type = function(id, callBack) {
        http.get({
            apiName: 'sdd_type_one',
            urlParams: {id: id},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    service.find_code_type = function(id, callBack) {
        http.get({
            apiName: 'code_type_one',
            urlParams: {id: id},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    return service;
});
