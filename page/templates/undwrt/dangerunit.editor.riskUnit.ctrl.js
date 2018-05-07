define(['app',
		'codes',
], function (app,codes) {
    app.registerController('JumpRiskUnitListCtrl', ['$scope', '$stateParams', '$modalInstance', '$window', 'certiNo', 'user', 'dangerUnitList', 'RiskunitService', 'ContractService', '$q'
        , function ($scope, $stateParams, $modalInstance, $window, certiNo, user, dangerUnitList, RiskunitService, ContractService, $q) {
    	$scope.certiNo = certiNo;
    	$scope.user = user;
    	$scope.dangerUnitList = dangerUnitList;
    	
    	//关闭按钮
    	$scope.close = function () {
        	console.log("关闭当前窗口");
            $modalInstance.close();
        };
        
        //确定按钮
        $scope.editRiskUnitSplit = function() {
        	dangerNumber = document.getElementById("dangerNumber").value;
        	if(dangerNumber == ''){
        		alert("不能为空，请输入正整数数字!");
        		return false;
        	}
        	if(isNaN(dangerNumber)){
        		alert("请输入数字!");
        		return false;
        	} else if(dangerNumber <0||!(/(^[1-9]\d*$)/.test(dangerNumber))) {
        		alert("请输入正整数数字");
        		return false;
        	}
            RiskunitService.splitRiskUnit(dangerNumber, $scope.certiNo, $scope.user, {}).then(
            		function(response){
            			console.log("reFresh---------"+response);
            			var reFresh = response;
            			console.log("wo shi ce shi :" + reFresh);
            			alert("wo shi ce shi :" + reFresh);
            			if(reFresh == "1"){
                        	$window.location.reload();
                        }else{
                        	alert("手工拆分失败，请取消并联系管理员");
                        	return false;
                        }
            		},
                    function(code){
                        throw(code);
                    }
            )
    	};
        }]);
});