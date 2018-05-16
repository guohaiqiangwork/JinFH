/**
 * Created by fuxy on 14-2-26.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     *  合同关系管理
     ------------------------------------------*/

    angular.module('olive.service.postCodes', [])

        .constant('PostCodesServiceConfig', {
            files:{
            	searchPostCodes: 'data/relationship/relationship.list.json',
                queryRelationship: 'data/relationship/relationship.detail.json',
                createRelationship: '',
                updateRelationship: 'data/relationship/relationship.detail.json',
                deleteRelationships: 'data/relationship/relationship.detail.json'
            },
            urls:{
                searchPostCodes: config.backend.ip + config.backend.base + 'permission.do?actionType=query',
                queryRelationship: config.backend.ip + config.backend.base + 'processFhPriority.do?actionType=prepareQuery',
                createRelationship: config.backend.ip + config.backend.base + 'processFhPriority.do?actionType=insert',
                updateRelationship: config.backend.ip + config.backend.base + 'processFhPriority.do?actionType=update',
                deleteRelationships: config.backend.ip + config.backend.base + 'processFhPriority.do?actionType=delete',
                getRelation:        config.backend.ip + config.backend.base + 'processFhPriority.do?actionType=data',
                checked    :        config.backend.ip + config.backend.base + 'processFhPriority.do?actionType=checked'
            }
        })
        .factory('PostCodesService',['$http', '$q', 'PostCodesServiceConfig', function ($http, $q, postCodesServiceConfig) {

            return {
                /**
                 *  条件查看关系管理
                 * @param keywords  查询数据
                 * @param pagination 分页信息
                 * @param user  操作用户信息
                 */
            	searchPostCodes: function (keywords, pagination, user) {
                    var deffered = $q.defer();
                    console.log("_____ url is coming..");
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: postCodesServiceConfig[config.data.method].searchPostCodes,
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
                 * 新增合约关系
                 * @param relationship
                 * @param user
                 */
                createRelationship: function (relationship, user) {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: relationshipServiceConfig[config.data.method].createRelationship,
                        headers: {
                        },
                        data:{
                            relationship:relationship,
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
                 * 查看详细
                 * @param relationshipNo  主键
                 * @param user
                 */
                queryRelationship: function (relationshipNo, user) {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: relationshipServiceConfig[config.data.method].queryRelationship,
                        headers: {
                        },
                        data:{
                            relationshipNo:relationshipNo,
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
                 * 修改合约关系
                 * @param relationship   合约关系
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
                updateRelationship: function (relationship, user) {

                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: relationshipServiceConfig[config.data.method].updateRelationship,
                        headers: {
                        },
                        data:{
                            relationship:relationship,
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
                
                	
                	
                	/*
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: relationshipServiceConfig[config.data.method].updateRelationship,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            relationship:relationship,
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
                */},
                
                //add by renshuai
                getRelation: function (treatyNo,uwYear) {
                	
                    var deffered = $q.defer();
                    console.log("_____ url is coming..");
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: relationshipServiceConfig[config.data.method].getRelation,
                        headers: {
                        },
                        data:{
                        	treatyNo:treatyNo,
                        	uwYear:uwYear
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
                //add by renshuai 增加校验方法
                checked: function (treatyNo,priorityNo) {
                	
                    var deffered = $q.defer();
                    console.log("_____ url is coming..");
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: relationshipServiceConfig[config.data.method].checked,
                        headers: {
                        },
                        data:{
                        	treatyNo:treatyNo,
                        	priorityNo:priorityNo
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
                 * 批量删除
                 * @param relationshipNo   主键
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
                deleteRelationships: function (relationshipNo, user) {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: relationshipServiceConfig[config.data.method].deleteRelationships,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            relationshipNo:relationshipNo,
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