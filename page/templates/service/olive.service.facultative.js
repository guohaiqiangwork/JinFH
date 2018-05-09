define(['angular', 'config'], function (angular, config) {
    angular.module('olive.service.facultative', [])

        .constant('facultativeServiceConfig', {
            files:{

            },
            urls:{
                searchFacultative: config.backend.ip + config.backend.base + 'recertifyQuery.do'
            }
        })
        .factory('facultativeService',['$http', '$q', '$filter', 'facultativeServiceConfig', function ($http, $q, $filter, facultativeServiceConfig) {
            return {
                /**
                 **临汾查询
                 */
                checkFacultative: function (operation,recertify,pagination,bizType, user, lan) {

                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? facultativeServiceConfig.files.searchFacultative : facultativeServiceConfig.urls.searchFacultative;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                            operation:operation,
                            keywords:recertify,
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


            };
        }]);

});