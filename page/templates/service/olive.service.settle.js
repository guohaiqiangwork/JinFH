define(['angular', 'config'], function (angular, config) {
    angular.module('olive.service.settle', [])

        .constant('SettleServiceConfig', {
            files:{
            	
            },
            urls:{
            	searchSettle:  config.backend.ip + config.backend.base + 'accSettle.do?operateType=getAccList',
            	searchSettleS: config.backend.ip + config.backend.base + 'accSettle.do?operateType=prepareSettle',
            	genSettleAcc:  config.backend.ip + config.backend.base + 'accSettle.do?operateType=saveSettle',
            	getExchRates: config.backend.ip + config.backend.base + 'accSettle.do?operateType=currency',
            	//getCode:       config.backend.ip + config.backend.base + 'processCodeSelect.do?types=reinsCode',
            }
        })
        .factory('SettleService',['$http', '$q', '$filter', 'SettleServiceConfig', function ($http, $q, $filter, settleServiceConfig) {
            //清除合同的多余字段
            return {
            	/**
                 * 查询账单
                 * @param keywords  查询数据
                 * @param pagination 分页信息
                 * @param user  操作用户信息
                 */
            	
                searchSettle: function (keywords, pagination, user) {
                	console.log(1);
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? settleServiceConfig.files.searchSettle[contAttr] : settleServiceConfig.urls.searchSettle;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords,
                            pagination:pagination,
                            user:user
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
            	
                
                /**
                 * 准备生成结算单
                 * @param keywords  查询数据
                 */
                searchSettleS: function (reinsCode, accNo) {
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? settleServiceConfig.files.searchSettleS[contAttr] : settleServiceConfig.urls.searchSettleS;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	reinsCode:reinsCode,
                        	accNo:accNo,
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
                
                /**
                 * 结算单生成
                 * */
                genSettleAcc: function (keywords) {
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? settleServiceConfig.files.genSettleAcc[contAttr] : settleServiceConfig.urls.genSettleAcc;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	keywords:keywords,
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
                /**
                 * 查询兑换率
                 */
                getExchRates: function (keywords, pagination, user) {
                	console.log(1);
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? settleServiceConfig.files.getExchRates[contAttr] : settleServiceConfig.urls.getExchRates;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords,
                            pagination:pagination,
                            user:user
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
            	
            };
        }]);

});