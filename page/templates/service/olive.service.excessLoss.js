define(['angular', 'config'], function (angular, config) {
    angular.module('olive.service.excessLoss', [])

        .constant('excessLossServiceConfig', {
            files:{

            },
            urls:{
            	searchXTreaty: config.backend.ip + config.backend.base + 'XAcc.do?actionType=treatyQuery',
            	searchAccperiod: config.backend.ip + config.backend.base + 'XAcc.do?actionType=queryAccPeriod',
            	searchAccNo: config.backend.ip + config.backend.base + 'XAcc.do?actionType=ShowAccList',
            	deleteAcc: config.backend.ip + config.backend.base + 'XAcc.do?actionType=deleteAccList',
            	searchXTreatyAcc: config.backend.ip + config.backend.base + 'VerifyXAcc.do?actionType=queryTreaty',
            	searchAccNoAcc: config.backend.ip + config.backend.base + 'VerifyXAcc.do?actionType=ShowAccList',
            	genAcc: config.backend.ip + config.backend.base + 'XAcc.do?actionType=GenAcc',
            	preparePrintAcc: config.backend.ip + config.backend.base + 'XAcc.do?actionType=preparePrintAcc'
            }
        })
        .factory('excessLossService',['$http', '$q', '$filter', 'excessLossServiceConfig', function ($http, $q, $filter, excessLossServiceConfig) {
        	return {
        		/**
        		 * 预付费显示账单
        		 */
        		preparePrintAcc: function (treatyNo,accType,accPeriod, user, lan) {
                    
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? excessLossServiceConfig.files.preparePrintAcc : excessLossServiceConfig.urls.preparePrintAcc;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	treatyNo:treatyNo,
                        	accType:accType,
                        	accPeriod:accPeriod,
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
        		/**
        		 * 生成对外账单外账单
        		 */
        		genAcc: function (operation, pagination,acctype,accKind, treatyNo,accPeriod, user, lan) {
                    
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? excessLossServiceConfig.files.genAcc : excessLossServiceConfig.urls.genAcc;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	operation:operation,
                            pagination:pagination,
                            treatyNo:treatyNo,
                            accPeriod:accPeriod,
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
        		/**
        		 * 删除对内（外）账单
        		 */
        		deleteAcc: function (operation, pagination, accType,treatyNo,accPeriod, user, lan) {
                    
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? excessLossServiceConfig.files.deleteAcc : excessLossServiceConfig.urls.deleteAcc;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	operation:operation,
                            pagination:pagination,
                            accType:accType,
                            treatyNo:treatyNo,
                            accPeriod:accPeriod,
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
        		/**
        		 * 预付费显示账单
        		 */
        		searchAccNo: function (operation, pagination, treatyNo,accPeriod, user, lan) {
                    
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? excessLossServiceConfig.files.searchAccNo : excessLossServiceConfig.urls.searchAccNo;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	operation:operation,
                            pagination:pagination,
                            treatyNo:treatyNo,
                            accPeriod:accPeriod,
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
                /**
        		 * 账单转收付显示账单
        		 */
        		searchAccNoAcc: function (operation, pagination, treatyNo,accType, user, lan) {
                    
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? excessLossServiceConfig.files.searchAccNoAcc : excessLossServiceConfig.urls.searchAccNoAcc;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	operation:operation,
                            pagination:pagination,
                            treatyNo:treatyNo,
                            accType:accType,
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
        		/**
                 *  预付费条件查看
                 * @param keywords  查询数据
                 * @param pagination 分页信息
                 * @param user  操作用户信息
                 */
        		searchXTreaty: function (operation, pagination, keywords, user, lan) {
                    
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? excessLossServiceConfig.files.searchXTreaty : excessLossServiceConfig.urls.searchXTreaty;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	operation:operation,
                            keywords:keywords,
                            pagination:pagination,
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
                /**
                 *  预付费条件查看
                 * @param keywords  查询数据
                 * @param pagination 分页信息
                 * @param user  操作用户信息
                 */
        		searchXTreatyAcc: function (operation, pagination, keywords, user, lan) {
                    
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? excessLossServiceConfig.files.searchXTreatyAcc : excessLossServiceConfig.urls.searchXTreatyAcc;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	operation:operation,
                            keywords:keywords,
                            pagination:pagination,
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
                /**
                 * 查询账单期
                 * @param keywords  查询数据
                 * @param pagination 分页信息
                 * @param user  操作用户信息
                 */
        		searchAccperiod: function (operation, pagination, treatyNo, user, lan) {
	                
	                var deffered = $q.defer();
	
	                var _url = config.data.method==='files'? excessLossServiceConfig.files.searchAccperiod : excessLossServiceConfig.urls.searchAccperiod;
	                $http({
	                    method: config.data.method==='files'? 'GET':'POST',
	                    url: _url,
	                    headers: {
	                    },
	                    data:{
	                    	operation:operation,
	                        treatyNo:treatyNo,
	                        pagination:pagination,
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