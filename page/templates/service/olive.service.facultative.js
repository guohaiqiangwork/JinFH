define(['angular', 'config'], function (angular, config) {
    angular.module('olive.service.facultative', [])

        .constant('facultativeServiceConfig', {
            files:{

            },
            urls:{
                searchFacultative: config.backend.ip + config.backend.base + 'recertifyQuery.do?querytype=query',
                checkQueryAcc: config.backend.ip + config.backend.base + 'fzAccQuery.do?queryType=query',
                generatingBill: config.backend.ip + config.backend.base + 'genAcc.do?queryType=doBill',
                deleBill:config.backend.ip + config.backend.base + 'getAcc.do?type=Delete',
                checkDetails:config.backend.ip + config.backend.base+'repay.do?operateType=View',
                billPayment:config.backend.ip + config.backend.base+'paymentQuery.do'
            }
        })
        .factory('facultativeService',['$http', '$q', '$filter', 'facultativeServiceConfig', function ($http, $q, $filter, facultativeServiceConfig) {
            return {
                /**
                 **临汾查询
                 */
                checkFacultative: function (operation,keywords,pagination,bizType, user, lan) {

                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? facultativeServiceConfig.files.searchFacultative : facultativeServiceConfig.urls.searchFacultative;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                            operation:operation,
                            keywords:keywords,
                            pagination:pagination,
                            bizType:bizType,
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
                 * 确认是否生成账单
                 * @param keywords
                 */
                checkQueryAcc: function (keywords) {

                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? facultativeServiceConfig.files.checkQueryAcc : facultativeServiceConfig.urls.checkQueryAcc;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
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
                 * 生成账单
                 * @param keywords
                 */
                generatingBill: function (keywords) {

                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? facultativeServiceConfig.files.generatingBill : facultativeServiceConfig.urls.generatingBill;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
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
                 * 删除账单
                 * @param keywords
                 */
                deleBill: function (keywords,biztype) {

                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? facultativeServiceConfig.files.deleBill : facultativeServiceConfig.urls.deleBill;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                            plyRiskUnit:keywords,
                            biztype:biztype
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
                 * 查看分赔详情
                 * @param keywords
                 */
                checkDetails: function (keywords) {

                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? facultativeServiceConfig.files.checkDetails : facultativeServiceConfig.urls.checkDetails;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
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

                billTernPayment:function (keywords) {

                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? facultativeServiceConfig.files.billPayment : facultativeServiceConfig.urls.billPayment;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
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