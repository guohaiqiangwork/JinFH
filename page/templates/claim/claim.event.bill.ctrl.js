define(['app', 
	'codes',
    'common/directives/currency',
    'common/directives/percentage',
    'common/directives/year'
], function (app, codes) {

    app.registerController('FxoBillCtrl', ['$scope', '$modalInstance', 'claimNo','eventCode','billType','billList', 'EventService'
        , function ($scope, $modalInstance, claimNo,eventCode,billType,billList, eventService) {
        
        
        //查询险位、事故账单
        $scope.searchBill = function(claimNo,eventCode,billType){
            console.log("searchBill fac ...");
            eventService.searchBill(claimNo,eventCode,billType).then(
                function(data){
                	if(angular.isUndefined(data.result)){
	                    $scope.billList = (data);
	                    console.log($scope.billList);
                	} else if(data.data.length <= 0){
                		$scope.billList = [];
                	} else {
                		alert(data.msg);
                	}
                },
                function(code){
                    throw(code);
                }
            );
        };
        //账单确认
        $scope.confirmBill = function() {
        	var drcertifyNo ="";
        	if(billType==="1"){//billType 账单类型:1险位超赔,0事故超赔
        		drcertifyNo = claimNo;
        	}else{
        		drcertifyNo = eventCode;
        	}
            eventService.confirmBill(drcertifyNo,billType).then(
                function(data){
                    if(data.result ==="error"){
             		alert("确认失败！"+data.msg);
             	} else{
                     alert("确认成功！");
            		}
                },
                function(code){
                    alert(code);
                }
            );
        };

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        var init = function(){
            //获取后台的账单数据
            $scope.billList = billList;
            $scope.claimNo = claimNo;
            $scope.eventCode = eventCode;
            $scope.billType = billType;
            $scope.searchBill($scope.claimNo,$scope.eventCode,$scope.billType);
        };

        init();
    }]);
});