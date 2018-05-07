/**
 * ¹ÜÀíÄ£¿é·þÎñ 
 * @author
 * @time 
 */
define(['widget/http'], (http) => {
    var service = {};

    service.getCustomer = function(id, callBack) {
        http.get({
            apiName: 'customer_one',
            urlParams: {customerCode: id},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    service.getFileCfg = function(id,callBack){
        http.get({
            apiName: 'filecfg_customerCode',
            urlParams: {customerCode: id},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        })
    };
    service.getFileFolder = function(id,callBack){
        http.get({
            apiName: 'filefolder_customerCode',
            urlParams: {customerCode: id},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        });
    };
    service.getFileMeta = function(id,callBack){
        http.get({
            apiName: 'file_meta',
            urlParams: {customerCode: id},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        });
    };
    service.getFile = function(id,callBack){
        http.get({
            apiName: 'file_one',
            urlParams: {barCode: id},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        });
    };
    service.getFileByStatus = function(customerCode,status,callBack){
        http.get({
            apiName: 'file_staus',
            urlParams: {customerCode:customerCode,status:status},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        });
    };
    //**********************************task操作************************************************//
    service.getTask = function(id,callBack){
        http.get({
            apiName: 'task_one',
            urlParams: {id: id},
            success(data) {
                callBack && typeof (callBack) == 'function' && callBack(data.data);
            }
        });
    };
    return service;
});
