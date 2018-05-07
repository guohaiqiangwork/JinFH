define(['app','codes','config',
], function (app,codes, config) {

    app.registerController('EventShareCtrl', ['$scope','$stateParams','EventService','BillService',
        function ($scope, $stateParams, eventService,billService) {

            $scope.prepareEventShare = function(eventCode, serialNo, user, lan){
                eventService.serarchContract(eventCode, serialNo, user, lan).then(
                    function(data){
                        $scope.claimShare = data;
                    },
                    function(code){
                    	alert('分摊失败!');
                    }
                );
            };

            //生成账单
            $scope.createEventBill = function(){
                alert("生成event账单。。。。");
                console.log($scope.claimShare);
                billService.createBill({}, {} ,{}, {}, {}, $scope.claimShare, {}, {}).then(
                    function(data){
                      console.log(data);
                        alert("create bill success!");
                    },
                    function(code){
                        console.log(code);
                        alert("create bill error!");
                    }
                );
            };

            var init = function(){
                $scope.event = {};
                
                $scope.hideSearchList();
                $scope.operation = $stateParams.operation;
                
                if($scope.operation ==='prepareEventShare'){
                	$scope.prepareEventShare ($scope.eventCodeParam,$scope.serialNoParam,{},{}) ;
                }
            };

            init();
        }]);
});
