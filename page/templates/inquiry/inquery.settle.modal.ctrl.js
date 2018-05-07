define(['app',
	'config',
	'codes',
    '/reins/page/templates/common/directives/currency.js',
    '/reins/page/templates/common/directives/percentage.js'
], function (app, config, codes) {
    app.registerController('InquerySettleModal', ['$scope', '$stateParams', 'ClaimService', 'CodeService', '$q',
    	'$modalInstance', 'certiNo', 'operations',
        function ($scope, $stateParams, claimService, codeService, $q
        	,$modalInstance, certiNo, operations) {
        
        	//查询字典
            var searchFlag = true;
            $scope.searchList = [];
            $scope.getCode = function(keywords,user,searcher){
                var temp = angular.copy({keywords:keywords,searcher:searcher});
                $scope.searchList.push(temp);
                if(searchFlag && $scope.searchList.length > 0){
                    ralSearch();
                }
            };
            $scope.getCodes = function(keywords, user){
	            var deffered = $q.defer();
	            codeService.getCodes(keywords, user).then(
	                function(data){
	                    deffered.resolve(angular.copy( data));
	                },
	                function(code){
	                    deffered.reject(code);
	                }
	            );
	            return deffered.promise;
	        };
            var ralSearch = function(user){
                if(searchFlag && $scope.searchList.length > 0){
                    searchFlag = false;
                    $scope.getCodes($scope.searchList[0].keywords,user).then(
                        function(data){
                            $scope[$scope.searchList[0].searcher] = data;
                            searchFlag = true;
                            $scope.searchList.splice(0,1);
                            ralSearch();
                        },
                        function(code){
                            console.log("error  "+code);
                            searchFlag = true;
                            if(angular.equals(code,"bussy")){
                                $scope.searchList.push($scope.searchList[0]);
                                $scope.searchList.splice(0,1);
                            }else{
                                $scope[$scope.searchList[0].searcher] = [];
                                $scope.searchList.splice(0,1);
                            }
                            ralSearch();
                        }
                    );
                }
            };
            $scope.getByReturn = function(aim,condition){
                var temp = aim+"";
                var keywords = {"id":aim,"value":condition, "holdFlag": false};
                return $scope.getCodes(keywords,{}).then(
                    function(data){
                        console.log(data);
                      return data;
                    },
                    function(code){
                    return [];
                    }
                );
            };
        
        
        
    		//查询理赔分摊列表
			$scope.queryComShare = function(certiNo,clmTms,certiType){
				claimService.queryComShare(certiNo, clmTms, certiType).then(
						function(data){
						    $scope.settles = data;
						},
						function(code){
							
						}
				);
			}
            var init = function () {
            
            	//数据字典差寻条件
		        $scope.codekeywords = {
		             "id":"",
		             "value":"",
		             "other1":""
		        };
            
            	//比例非比例币别
                var key = angular.copy($scope.codekeywords);
                key.id="currency";
                key.value="";
                $scope.getCode(key,{},"currencys");
            
            	
            	if(angular.isDefined(operations)){
            		console.log(operations + certiNo);
            		$scope.queryComShare(certiNo, "", "reinsClaimPay");
            	} 
            };
            init();

        }]);
});
