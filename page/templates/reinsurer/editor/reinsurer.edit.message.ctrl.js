define(['app',
    'config'   
], function (app, config) {
    app.registerController('ReinsurerEditMessageCtrl', ['$scope', '$filter', '$q', '$modal', '$stateParams','$location', 'ReinsurerService',
                        function ($scope, $filter, $q, $modal, $stateParams, $location, reinsurerService) {
    	     
      //修改记录查询
        $scope.prpDReinsEditMessage = function(reinsCode,changeTimes){
        	console.log('获取再保人修改轨迹message:' + reinsCode + "+" + changeTimes);
            reinsurerService.prpDReinsEditMessage(reinsCode,changeTimes).then(
        			function(data){
                        console.log("返回数据"+data);
                        $scope.reinsurer = data;
                        console.log("reinsurer's value is : " + $scope.reinsurer);
                    },
                    function(message){
                    }  
                ); 
        };


        var init = function () {                
        	console.log('获取再保人修改轨迹message:');
        	
        	$scope.reinsCode = angular.isUndefined($stateParams.reinsCode)? '': $stateParams.reinsCode;
        	$scope.changeTimes = angular.isUndefined($stateParams.changeTimes)? '': $stateParams.changeTimes;
            
        	//查询修改记录详情
            $scope.prpDReinsEditMessage($scope.reinsCode, $scope.changeTimes);

        };

        init();

    }]);
});