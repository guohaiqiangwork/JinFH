/**
 * 管理模块服务 
 */
define(['widget/http'], (http) => {
    var service = {};

    service.search_user = function(id, callBack) {
        http.get({
            apiName: 'search_user',
            urlParams: {value: id},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    }; 
    service.select_user = (id, callBack) => {
        http.get({
            apiName: 'select_user',
            urlParams: {id: id},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    }; 
 
    return service;
});
