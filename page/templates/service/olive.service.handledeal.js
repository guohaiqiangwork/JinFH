define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     *   手工处理管理
     ------------------------------------------*/

    angular.module('olive.service.handledeal', [])

        .constant('HandledealServiceConfig', {
            files:{
                countDeal: 'data/reinsurer/countDeal.json',
                claimCount: 'data/reinsurer/claimCount.json'
            },
            urls:{
                countDeal: config.backend.ip + config.backend.base + 'offLineCal/offLineHandCal.do',
                claimCount: config.backend.ip + config.backend.base + 'clm/calReplevy.do'
            }
        })
        .factory('HandledealService',['$http', '$q', 'HandledealServiceConfig', function ($http, $q, handledealServiceConfig) {
            return {
                /**
                 *  分保,分批计算  
                 * @param keywords  分保,分批计算  条件
                 * @param user  操作用户信息
                 */
                countDeal: function (keywords, user) {
                    var deffered = $q.defer();
                    console.log("_____ url is coming..");
                    console.log(keywords);
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: handledealServiceConfig[config.data.method].countDeal,
                        headers: {
                        },
                        data:{
                            keywords: keywords,
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
                 * 分摊计算
                 * @param keywords  分摊计算条件
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
                claimCount: function (keywords, user) {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: handledealServiceConfig[config.data.method].claimCount,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            keywords:keywords,
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
                }
            };
        }]);
});