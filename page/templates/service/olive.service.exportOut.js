/**
 * Created  on 2015-3-17.
 */
define(['angular', 'config'], function (angular, config) {
	angular.module('olive.service.exportOut', [])
		.constant('ExportServiceConfig', {
			files:{
				searchPrintInfo:'data/riskunit/queryPlyAppRiskUnit.json'
            },
            urls:{
            	printIfaceCont:config.backend.ip + config.backend.base +  'reinsPrint/printIfaceCont.do'
            }
		})
		
		.factory('ExportService',['$http', '$q', 'ExportServiceConfig', function ($http, $q, exportServiceConfig) {
            return {
            	
            	exportOut: function (keywords, user, lan) {
                    var deffered = $q.defer();
                    console.log("月度查询......");
                    console.log(keywords);
                    $http({
                    	method:config.data.method==='files'? 'GET':'POST',
                        url: exportServiceConfig[config.data.method].printIfaceCont,
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
                }
            };
        }]);
});