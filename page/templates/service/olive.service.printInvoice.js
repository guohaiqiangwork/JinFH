/**
 * Created by Administrator on 14-3-27.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     *  开票录入
     ------------------------------------------*/
    angular.module('olive.service.printInvoice', [])
        .constant('PrintInvoiceServiceConfig', {
            files:{
            	searchInvoicePrint:''
            },
            urls:{           	
            	searchInvoicePrint: config.backend.ip + config.backend.base + 'accSettle.do?operateType=Invoice&type=Billing',
            	getInvoiceList: config.backend.ip + config.backend.base + 'accSettle.do?operateType=BillingWithDetail',
            	saveInvoiceList :config.backend.ip + config.backend.base + 'accSettle.do?operateType=saveInvoiceList',
            	editInvoiceList :config.backend.ip + config.backend.base + 'accSettle.do?operateType=BillingEditWithDetail',
            	confirmInvoiceCheck :config.backend.ip + config.backend.base + 'invoicePrint/confirmInvoiceCheck.do',
            	batchConfirmInvoiceCheck :config.backend.ip + config.backend.base + 'invoicePrint/batchConfirmInvoiceCheck.do'
            }
        })
        .factory('PrintInvoiceService',['$http', '$q', 'PrintInvoiceServiceConfig', function ($http, $q, printInvoiceServiceConfig) {
            return {
             
                /**
                 * 开票查询
                 * 
                 */
            	searchInvoicePrint : function(operation,pagination,keywords, user, lan){
                    var deffered = $q.defer();     
                    var _url = config.data.method==='files'? printInvoiceServiceConfig.files.searchInvoicePrint : printInvoiceServiceConfig.urls.searchInvoicePrint;
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
                } ,
                
                /** 开票详细信息**/
                getInvoiceList : function(chargeOffPkgNo,payCode,user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? printInvoiceServiceConfig.files.getInvoiceList : printInvoiceServiceConfig.urls.getInvoiceList;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	chargeOffPkgNo:chargeOffPkgNo,
                        	payCode:payCode,
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
                    var _url = config.data.method==='files'? printInvoiceServiceConfig.files.saveInvoiceList : printInvoiceServiceConfig.urls.saveInvoiceList;
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
                    var _url = config.data.method==='files'? printInvoiceServiceConfig.files.editInvoiceList : printInvoiceServiceConfig.urls.editInvoiceList;
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
                    var _url = config.data.method==='files'? printInvoiceServiceConfig.files.confirmInvoiceCheck : printInvoiceServiceConfig.urls.confirmInvoiceCheck;
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
                    var _url = config.data.method==='files'? printInvoiceServiceConfig.files.batchConfirmInvoiceCheck : printInvoiceServiceConfig.urls.batchConfirmInvoiceCheck;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	chargeOffPkgNos:chargeOffPkgNos,
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