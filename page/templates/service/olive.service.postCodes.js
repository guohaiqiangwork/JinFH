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
                checked    :        config.backend.ip + config.backend.base + 'processFhPriority.do?actionType=checked',
                //人员权限
                searchPermission: config.backend.ip + config.backend.base + 'userGrade.do?actionType=query',//查询列表
                permissionDeploy:config.backend.ip + config.backend.base + 'userGrade.do?actionType=queryTask',//配置
                savePermissionDeploy:config.backend.ip + config.backend.base + 'userGrade.do?actionType=insert',//配置保存
                permissionReset:config.backend.ip + config.backend.base + 'userGrade.do?actionType=deleteTask',//重置
                passwordManager:config.backend.ip + config.backend.base + 'changePassword.do',//密码修改
                //岗位代码
                viewPostCodeDetails:config.backend.ip + config.backend.base + 'permission.do?actionType=view',//岗位代码查看详情
                addPostCodeDetails:config.backend.ip + config.backend.base + 'permission.do?actionType=prepareInsert',//岗位代码新增
                editPostCodeDetails:config.backend.ip + config.backend.base + 'permission.do?actionType=prepareUpdate',//岗位代码编辑

                saveAddPostCodeDetails:config.backend.ip + config.backend.base + 'permission.do?actionType=insert',//新增保存
                saveEditPostCodeDetails:config.backend.ip + config.backend.base + 'permission.do?actionType=update'//编辑保存
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
                },
                /**
                 * 人员信息列表查询
                 * @param keywords
                 */
                searchPermission:function (keywords,pagination) {
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? postCodesServiceConfig.files.searchPermission : postCodesServiceConfig.urls.searchPermission;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords,
                            pagination:pagination
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
                 * 重置
                 * @param keywords
                 */
                permissionReset:function (keywords) {
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? postCodesServiceConfig.files.permissionReset : postCodesServiceConfig.urls.permissionReset;
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
                 * 密码修改
                 * @param keywords
                 */
                passwordManager:function (keywords) {
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? postCodesServiceConfig.files.passwordManager : postCodesServiceConfig.urls.passwordManager;
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
                 * 配置
                 * @param keywords
                 */
                permissionDeploy:function () {
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? postCodesServiceConfig.files.permissionDeploy : postCodesServiceConfig.urls.permissionDeploy;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:'',
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
                 * 配置保存
                 * @param keywords
                 */
                savePermissionDeploy:function (keywords,userCode) {
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? postCodesServiceConfig.files.savePermissionDeploy : postCodesServiceConfig.urls.savePermissionDeploy;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                            userCode:userCode,
                            keywords:keywords
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
                 * 岗位代码查看详情
                 * @param keywords
                 */
                viewPostCodeDetails:function (keywords) {
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? postCodesServiceConfig.files.viewPostCodeDetails : postCodesServiceConfig.urls.viewPostCodeDetails;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                            id:keywords
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
                 * 岗位代码新增
                 * @param keywords
                 */
                addPostCodeDetails:function (keywords) {
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? postCodesServiceConfig.files.addPostCodeDetails : postCodesServiceConfig.urls.addPostCodeDetails;
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
                 * 岗位代码编辑
                 * @param keywords
                 */
                editPostCodeDetails:function (keywords) {
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? postCodesServiceConfig.files.editPostCodeDetails : postCodesServiceConfig.urls.editPostCodeDetails;
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
                 * 新增保存
                 * @param checked
                 * @param data
                 */
                saveAddPostCodeDetails:function (checked,data) {
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? postCodesServiceConfig.files.saveAddPostCodeDetails : postCodesServiceConfig.urls.saveAddPostCodeDetails;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                            saaGrade:data,
                            saaGradetaskList:checked
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
                 * 编辑保存
                 * @param checked
                 * @param data
                 */
                saveEditPostCodeDetails:function (checked,data) {
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? postCodesServiceConfig.files.saveEditPostCodeDetails : postCodesServiceConfig.urls.saveEditPostCodeDetails;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                            saaGrade:data,
                            taskCode:checked
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