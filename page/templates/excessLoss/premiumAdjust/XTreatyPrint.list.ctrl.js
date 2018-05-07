define(['app',
	'config',
	'codes'
], function (app, config, codes) {
    app.registerController('XTreatyPrint', ['$scope', '$filter','$location','$stateParams','$modalInstance','accType','contractListr','accPeriod', 'excessLossService', 'CodeService', '$q',
        function ($scope,$filter,$location,$stateParams,$modalInstance,accType,contractListr,accPeriod, excessLossService, codeService, $q) {
	    	$scope.accType = accType;
	        $scope.treatyNo = contractListr;
	        
	        $scope.accPeriod = accPeriod;
    		$scope.preparePrintAcc = function() {
	    		excessLossService.preparePrintAcc($scope.treatyNo,$scope.accType,$scope.accPeriod,'','').then(
	    				function(data){
	                   		 $scope.contractListr = data;
	                   		$scope.contractListr.accType = $scope.accType;
	                   }
						
				);
	        };
	                
    		var init = function () {
            	$scope.treatyNo = $scope.treatyNo;
            	$scope.accType = $scope.accType;
            	$scope.accPeriod = $scope.accPeriod;
            	
                $scope.preparePrintAcc();
            };
            init();

        }]);
});
