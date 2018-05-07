/**
 * Created by Administrator on 14-3-20.
 */
define(['angular', 'config'], function (angular, config) {

    angular.module('olive.service.event', [])
    /**
     * 事故打包接口
     */
        .constant('EventServiceConfig', {
            files:{
                searchEvent: 'data/event/event.list.json',
                searchFxoBill: 'data/event/event.list.json',
                searchBill: 'data/event/event.list.json',
                confirmBill: 'data/event/event.list.json',
                setEventExchRate: 'data/event/event.setEventExchRate.json',
                serarchContract: 'data/event/event.list3.json',
                createEvent:'',
                updateEvent:'',
                deleteEvent:''
            },
            urls:{
                searchEvent: config.backend.ip + config.backend.base + 'claim/queryEvent.do',
                searchFxoBill: config.backend.ip + config.backend.base + 'claim/queryFxoBill.do',
                searchBill: config.backend.ip + config.backend.base + 'claim/showFxoDetailBill.do',//超赔险位、事故明细
                confirmBill: config.backend.ip + config.backend.base + 'claim/confirmBill.do',//超赔险位、事故账单确认
                setEventExchRate: config.backend.ip + config.backend.base + 'claim/setEventExchRate.do',
                createEvent:config.backend.ip + config.backend.base + 'claim/createEvent.do',
                updateEvent:config.backend.ip + config.backend.base + '',
                deleteEvent:config.backend.ip + config.backend.base + 'claim/deleteEvent.do',
                serarchContract:config.backend.ip + config.backend.base + 'claim/prepareEventShare.do',
                genEventShare:config.backend.ip + config.backend.base + 'claim/generateFxoEventShare.do',
            }
        })
        .factory('EventService',['$http', '$q', 'EventServiceConfig', function ($http, $q, eventServiceConfig) {
            return {

                serarchContract : function(eventCode, serialNo, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? eventServiceConfig.files.serarchContract : eventServiceConfig.urls.serarchContract;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	eventCode:eventCode,
                        	serialNo:serialNo,
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

                setEventExchRate : function(treatyNo_sectionNo, certiNos){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? eventServiceConfig.files.setEventExchRate : eventServiceConfig.urls.setEventExchRate;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            treatyNo_sectionNo:treatyNo_sectionNo,
                            certiNos:certiNos
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
                 * 生成险位分摊账单
                 * @param claimNo   立案号
                 * @param riskUnitNo    风险单位号
                 * @param user       用户
                 * @param lan      语言
                 * @returns {Function|promise|promise|promise}
                 */
                genEventShare : function(claimShare, fhxLayerVoList, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? eventServiceConfig.files.genEventShare : eventServiceConfig.urls.genEventShare;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	claimShare:claimShare,
                        	fhxLayerVoList:fhxLayerVoList,
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
                 * 事故 查询
                 * @param keywords
                 * @param pagination
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                searchEvent : function(keywords, pagination, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? eventServiceConfig.files.searchEvent : eventServiceConfig.urls.searchEvent;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
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
                 * 险位账单查询 yanliming
                 * @param keywords @param pagination @param user @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                searchFxoBill : function(keywords, pagination, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? eventServiceConfig.files.searchFxoBill : eventServiceConfig.urls.searchFxoBill;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
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
                 * 险位、事故账单明细 yanliming
                 * @param keywords @param pagination @param user @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                searchBill : function(claimNo,eventCode,billType){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? eventServiceConfig.files.searchBill : eventServiceConfig.urls.searchBill;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	claimNo:claimNo,
                        	eventCode:eventCode,
                        	billType:billType
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
                 * 险位、事故账单确认 yanliming
                 * @param keywords @param pagination @param user @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                confirmBill : function(drcertifyNo,billType){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? eventServiceConfig.files.confirmBill : eventServiceConfig.urls.confirmBill;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	drcertifyNo:drcertifyNo,
                        	billType:billType
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
                 * 事故打包
                 * @param keywords  条件【claimNo,riskUnitNo】
                 * @param user    用户
                 * @param lan   语言
                 * @returns {Function|promise|promise|promise}
                 */
                createEvent : function(event,fxoPayList, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? eventServiceConfig.files.createEvent : eventServiceConfig.urls.createEvent;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	event:event,
                        	fxoPayList:fxoPayList,
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
                 * 事故追加
                 * @param keywords  【claimNo, riskUnitNo】
                 * @param user     用户
                 * @param lan    语言
                 * @returns {Function|promise|promise|promise}
                 */
                updateEvent : function(keywords, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? eventServiceConfig.files.updateEvent : eventServiceConfig.urls.updateEvent;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
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
                },
                /**
                 * 删除事故
                 * @param EventCode  事故号
                 * @param user      用户
                 * @param lan     语言
                 * @returns {Function|promise|promise|promise}
                 */
                deleteEvent : function(eventCode,serialNo, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? eventServiceConfig.files.deleteEvent : eventServiceConfig.urls.deleteEvent;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	eventCode:eventCode,
                        	serialNo:serialNo,
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