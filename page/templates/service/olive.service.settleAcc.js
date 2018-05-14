/**
 * Created by fuxy on 14-2-25.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     *   结算单管理
     ------------------------------------------*/

    angular.module('olive.service.settleAcc', [])

        .constant('SettleAccServiceConfig', {
            files:{
                searchSettleAcc: 'data/settleAcc/settleAcc.list.json',
                querySettleAcc: 'data/settleAcc.detail.json',                
                deleteSettleAcc: ''
            },
            urls:{
            	searchSettleAcc: config.backend.ip + config.backend.base + 'accSettle.do?operateType=show',
            	deleteSettleAcc: config.backend.ip + config.backend.base + 'accSettle.do?operateType=delete', 
            	querySettleAcc:  config.backend.ip + config.backend.base + 'accSettle.do?operateType=query',                
            	queryPlanMain:   config.backend.ip + config.backend.base + 'accSettle.do?operateType=plan',
            	queryAcc:        config.backend.ip + config.backend.base + 'accSettle.do?operateType=view',
                
            }
        })
        .factory('SettleAccService',['$http', '$q', 'SettleAccServiceConfig', function ($http, $q, settleAccServiceConfig) {
            return {
                /**
                 *  条件查询
                 * @param keywords  在保人条件数据
                 * @param pagination 分页信息
                 * @param user  操作用户信息
                 */
                searchSettleAcc: function (keywords, pagination, user) {
                    var deffered = $q.defer();
                    console.log("_____ url is coming..");
                    console.log(keywords);
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: settleAccServiceConfig[config.data.method].searchSettleAcc,                        
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
                 
                
                
                
                queryPlanMain: function (settleNo) {
                    var deffered = $q.defer();
                    console.log("_____ url is coming..");
                    console.log(settleNo);
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: settleAccServiceConfig[config.data.method].queryPlanMain,                        
                        headers: {
                        },
                        data:{
                            settleNo:settleNo
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
                
                
                queryAcc: function (accNo) {
                    var deffered = $q.defer();
                    console.log("_____ url is coming..");
                    console.log("accNo98989898989:"+accNo);
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: settleAccServiceConfig[config.data.method].queryAcc,                        
                        headers: {
                        },
                        data:{
                        	accNo:accNo
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
                 * 新增再保人管理
                 * @param reinsurer  新增在保人数据
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
//                createReinsurer: function (reinsurer, user) {
//                    var deffered = $q.defer();
//                    $http({
//                        method:config.data.method==='files'? 'GET':'POST',
//                        url: reinsurerServiceConfig[config.data.method].createReinsurer,
//                        headers: {
//                            //PICC__RequestVerificationToken: user.verificationToken
//                        },
//                        data:{
//                            reinsurer:reinsurer,
//                            user:user
//                        },
//                        timeout:  config.backend.timeout
//                    })
//                        .success(function(data){
//                            deffered.resolve(data);
//                        })
//                        .error(function(e, code){
//                            deffered.reject(code);
//                        });
//                    return deffered.promise;
//                },

                /**
                 * 再保人详细
                 * @param reinsurerNo  主键
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
                querySettleAcc: function (settleNo) {
                    var deffered = $q.defer();
                    console.log("aaa******");
                    console.log("settleNo:"+settleNo);
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: settleAccServiceConfig[config.data.method].querySettleAcc,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                        	settleNo:settleNo,
                            
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
                 * 删除
                 * @param settleNo 主键
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
                deleteSettleAcc: function (settleNo) {
                    var deffered = $q.defer();
                    console.log("bbb******");
                    console.log("settleNo:"+settleNo);
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: settleAccServiceConfig[config.data.method].deleteSettleAcc,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                        	settleNo:settleNo
                            
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