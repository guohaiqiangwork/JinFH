/**
 * Created  on 2015-3-17.
 */
define(['angular', 'config'], function (angular, config) {
	angular.module('olive.service.outquery', [])
		.constant('OutqueryServiceConfig', {
			files:{
				searchPlyInfo:'data/riskunit/queryPlyAppRiskUnit.json'
            },
            urls:{
            	searchPlyInfo:{
            		'1':config.backend.ip + config.backend.base + 'fcoRepolicyQuery.do?operateType=query',
            		'2':config.backend.ip + config.backend.base + 'fpoReendorQuery.do?operateType=query',
            		'3':config.backend.ip + config.backend.base + 'repay.do?operateType=query'
            	},
            	showPlyDtlInfo:config.backend.ip + config.backend.base +  'fcoRepolicyQuery.do?operateType=detail', //分保单信息查询
            	showEdrDtlInfo:config.backend.ip + config.backend.base +  'fpoReendorQuery.do?operateType=detail', //分批单信息查询
            	showClmDtlInfo:config.backend.ip + config.backend.base +  'repay.do?operateType=detail', //分赔案信息查询
            }
		})
		
		.factory('OutqueryService',['$http', '$q', 'OutqueryServiceConfig', function ($http, $q, outqueryServiceConfig) {
            return {
            	
            	 /**
                 *  条件查询
                 * @param keywords  分保单条件数据
                 * @param pagination 分页信息
                 * @param user  操作用户信息
                 */
            	searchPlyInfo: function (interfaceFlag, keywords, pagination, user) {
                    var deffered = $q.defer();
                    console.log("____分出查询_条件_ url is coming..");
                    console.log(keywords);
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: outqueryServiceConfig[config.data.method].searchPlyInfo[interfaceFlag],
                        headers: {
                        },
                        data:{
                            keywords: keywords,
                            pagination: pagination,
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
                 *  分保单详细信息查询
                 * @param plyNo 保单号 
                 * @param user  操作用户信息
                 */
            	searchPlyDtlInfo: function (repolicyNo, dangerNo, user,lan) {
                	console.log("repolicyNo:"+repolicyNo);
                    var deffered = $q.defer();
                    console.log("____分出查询_ url is coming..");
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: outqueryServiceConfig[config.data.method].showPlyDtlInfo,
                        headers: {
                        },
                        data:{
                        	repolicyNo:repolicyNo,
                        	dangerNo:dangerNo,
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
                 *  分批单详细信息查询
                 * @param plyNo 保单号 
                 * @param user  操作用户信息
                 */
            	searchEdrDtlInfo: function (endorNo, dangerNo, user,lan) {
                    var deffered = $q.defer();
                    console.log("____分出查询_ url is coming..");
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: outqueryServiceConfig[config.data.method].showEdrDtlInfo,
                        headers: {
                        },
                        data:{
                        	endorNo:endorNo,
                        	dangerNo:dangerNo,
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
                 *  分赔案详细信息查询
                 * @param plyNo 保单号 
                 * @param user  操作用户信息
                 */
                searchClmDtlInfo: function (repayNo, dangerNo, user,lan) {
                    var deffered = $q.defer();
                    console.log("____分出查询_ url is coming..");
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: outqueryServiceConfig[config.data.method].showClmDtlInfo,
                        headers: {
                        },
                        data:{
                        	repayNo:repayNo,
                        	dangerNo:dangerNo,
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