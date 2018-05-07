/**
 * Created by Administrator on 14-3-27.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     *  发票录入
     ------------------------------------------*/
    angular.module('olive.service.settleInvoice', [])
        .constant('SettleInvoiceServiceConfig', {
            files:{
            	searchInvoiceEntry:''
            },
            urls:{
            	searchInvoiceEntry: config.backend.ip + config.backend.base + 'accSettle.do?operateType=Invoice&type=Invoice',
            	getInvoiceList: config.backend.ip + config.backend.base + 'accSettle.do?operateType=invoiceAddWithDetail',
            	/*getInvoiceList: config.backend.ip + config.backend.base + 'accSettle.do?operateType=getInvoiceList',*/
            	saveInvoiceList :config.backend.ip + config.backend.base + 'accSettle.do?operateType=saveInvoiceList',
            	editInvoiceList :config.backend.ip + config.backend.base + 'accSettle.do?operateType=invoiceEditWithDetail',
            	exportInvoiceList :config.backend.ip + config.backend.base + 'invoiceEntry/exportInvoiceList.do',
            	confirmInvoiceCheck :config.backend.ip + config.backend.base + 'invoiceEntry/confirmInvoiceCheck.do',
            	batchConfirmInvoiceCheck :config.backend.ip + config.backend.base + 'invoiceEntry/batchConfirmInvoiceCheck.do'
            }
        })
        .factory('SettleInvoiceService',['$http', '$q', 'SettleInvoiceServiceConfig', function ($http, $q, settleInvoiceServiceConfig) {
            return {
             
                /**
                 * 发票查询
                 * 
                 */
                searchInvoiceEntry : function(operation,pagination,keywords, user, lan){
                  /*  console.log("service's searchInvoiceEntry is coming ..");*/
                    var deffered = $q.defer();     
                    var _url = config.data.method==='files'? settleInvoiceServiceConfig.files.searchInvoiceEntry : settleInvoiceServiceConfig.urls.searchInvoiceEntry;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	operation:operation,
                            pagination:pagination,
                            keywords:keywords,
                            user:user,
                            lan:lan
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                
                /** 发票详细信息**/
                getInvoiceList : function(chargeOffPkgNo,freinsCode,user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? settleInvoiceServiceConfig.files.getInvoiceList : settleInvoiceServiceConfig.urls.getInvoiceList;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	chargeOffPkgNo:chargeOffPkgNo,
                        	freinsCode:freinsCode,
                            user:user,
                            lan:lan
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                
                /** 导出开票信息 **/
                exportInvoiceList : function(chargeOffPkg,user, lan){
                	var deffered = $q.defer();     
                    var _url = config.data.method==='files'? settleInvoiceServiceConfig.files.exportInvoiceList : settleInvoiceServiceConfig.urls.exportInvoiceList;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	chargeOffPkgNo:chargeOffPkg,
                            user:user,
                            lan:lan
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                
                
                
                /** 保存发票信息**/
                saveInvoiceList : function(operation,chargeOffPkg,user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? settleInvoiceServiceConfig.files.saveInvoiceList : settleInvoiceServiceConfig.urls.saveInvoiceList;
                    
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	chargeoffPgeMa:chargeOffPkg,
                        	operation:operation,
                            user:user,
                            lan:lan
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                
                /** 发票详细信息**/
                editInvoice : function(chargeOffPkgNo,user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? settleInvoiceServiceConfig.files.editInvoiceList : settleInvoiceServiceConfig.urls.editInvoiceList;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	chargeOffPkgNo:chargeOffPkgNo,
                            user:user,
                            lan:lan
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                /** 发票审核菜单的确认发票**/
                confirmInvoiceCheck : function(chargeOffPkgNo,user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? settleInvoiceServiceConfig.files.confirmInvoiceCheck : settleInvoiceServiceConfig.urls.confirmInvoiceCheck;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	chargeOffPkgNo:chargeOffPkgNo,
                            user:user,
                            lan:lan
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                /** 发票审核菜单的确认发票**/
                batchConfirmInvoiceCheck : function(chargeOffPkgNos,user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? settleInvoiceServiceConfig.files.batchConfirmInvoiceCheck : settleInvoiceServiceConfig.urls.batchConfirmInvoiceCheck;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	chargeOffPkgNo:chargeOffPkgNos,
                            user:user,
                            lan:lan
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                }
              
            };
        }]);

});