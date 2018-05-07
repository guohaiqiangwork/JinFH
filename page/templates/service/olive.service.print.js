/**
 * Created  on 2015-3-17.
 */
define(['angular', 'config'], function (angular, config) {
	angular.module('olive.service.print', [])
		.constant('PrintServiceConfig', {
			files:{
				searchPrintInfo:'data/riskunit/queryPlyAppRiskUnit.json'
            },
            urls:{
            	printPly:config.backend.ip + config.backend.base +  'reportPrint.do'
            }
		})
		
		.factory('PrintService',['$http', '$q', 'PrintServiceConfig', function ($http, $q, printServiceConfig) {
            return {
            	
            	print: function (keywords, user, lan) {
                    var deffered = $q.defer();
                    console.log(keywords);
                    $http({
                    	method:config.data.method==='files'? 'GET':'POST',
                        url: printServiceConfig[config.data.method].printPly,
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