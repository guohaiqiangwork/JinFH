/**
 * Created by fuxy on 14-2-25.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     *   再保人管理
     ------------------------------------------*/

    angular.module('olive.service.reinsurer', [])

        .constant('ReinsurerServiceConfig', {
            files:{
                searchReinsurer: 'data/reinsurer/reinsurer.list.json',
                queryReinsurer: 'data/reinsurer.detail.json',
                createReinsurer: '',
                updateReinsurer: '',
                deleteReinsurers: '',
                prpDReinsEditRecord:''
            },
            urls:{
            	searchReinsurer: config.backend.ip + config.backend.base + 'prpdReinsQuery.do',
                queryReinsurer: config.backend.ip + config.backend.base + 'getReinsCode.do?actionType=show',                
                createReinsurer: config.backend.ip + config.backend.base + 'prpdReinsEdit.do?actionType=add',
                updateReinsurer: config.backend.ip + config.backend.base + 'prpdReinsEdit.do?actionType=edit',
                deleteReinsurers: config.backend.ip + config.backend.base + 'ReinsDelete.do?actionType=delete',
                prpDReinsEditRecord: config.backend.ip + config.backend.base + 'prpDReinsEditRecord.do',
                prpDReinsEditMessage: config.backend.ip + config.backend.base + 'prpDReinsEditInfo.do'
            }
        })
        .factory('ReinsurerService',['$http', '$q', 'ReinsurerServiceConfig', function ($http, $q, reinsurerServiceConfig) {
            return {
                /**
                 *  条件查询
                 * @param keywords  在保人条件数据
                 * @param pagination 分页信息
                 * @param user  操作用户信息
                 */
                searchReinsurer: function (keywords, pagination, user) {
                    var deffered = $q.defer();
                    console.log("_____ url is coming..");
                    console.log(keywords);
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: reinsurerServiceConfig[config.data.method].searchReinsurer,                        
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
                 *  条件查询
                 * @param reinscode  再保人修改轨迹数据
                 * @param pagination 分页信息
                 */
                prpDReinsEditRecord: function (reinsCode, pagination) {
                    var deffered = $q.defer();
                    console.log("_____ url is coming..");
                    console.log('获取再保人修改轨迹service:'+reinsCode);
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: reinsurerServiceConfig[config.data.method].prpDReinsEditRecord,                        
                        headers: {
                        },
                        data:{
                        	reinsCode: reinsCode,
                            pagination: pagination
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
                 * 再保人修改记录详情
                 * @param reinscode  主键
                 * @returns {Function|promise|promise|promise}
                 */
                prpDReinsEditMessage: function (reinsCode, changeTimes) {
                    var deffered = $q.defer();
                    console.log("aaa******");
                    console.log("ServiceReinsCode:"+reinsCode + "+" + changeTimes);
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: reinsurerServiceConfig[config.data.method].prpDReinsEditMessage,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                        	reinsCode:reinsCode,
                        	changeTimes:changeTimes
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
                createReinsurer: function (reinsurer, user) {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: reinsurerServiceConfig[config.data.method].createReinsurer,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            reinsurer:reinsurer,
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
                 * 再保人详细
                 * @param reinsurerNo  主键
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
                queryReinsurer: function (reinsurerNo, user) {
                    var deffered = $q.defer();
                    console.log("aaa******");
                    console.log("reinsurerNo:"+reinsurerNo);
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: reinsurerServiceConfig[config.data.method].queryReinsurer,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            reinsurerNo:reinsurerNo,
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
                 * 编辑再保人
                 * @param reinsurer   再保人数据
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
                updateReinsurer: function (reinsurer, user) {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: reinsurerServiceConfig[config.data.method].updateReinsurer,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            reinsurer:reinsurer,
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
                 * 删除再保人
                 * @param reinsurerNo 主键
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
                deleteReinsurers: function (reinsurerNo,user) {
                    var deffered = $q.defer();
                    console.log("bbb******");
                    console.log("reinsurerNo:"+reinsurerNo);
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: reinsurerServiceConfig[config.data.method].deleteReinsurers,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            reinsurerNo:reinsurerNo,
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