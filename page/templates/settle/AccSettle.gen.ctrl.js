define(['app'], function (app) {
    app.registerController( 'SettleGenCtrl', ['$scope','$filter','$location', '$modal','$modalInstance', 'SettleService'
        , function ($scope,$filter, $location, $modal, $modalInstance, settleService) {

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            
            	$scope.prepareSettle = function(){
	        	$scope.showExtra = "prepareSettle" ;
	        	var settleList = $filter('filter')($scope.settleList, {checked:true});
	        	if(settleList.length == 0){
	        		alert("请选择一条记录");
	        		return;
	        	}
	        	$scope.accSettleList = settleList ;
	        	$scope.settleMain = {};
	        	$scope.settleMain.payCode=$scope.accSettleList[0].payCode;
	        	$scope.settleMain.payName=$scope.accSettleList[0].payName;
	        	$scope.settleMain.accNo=$scope.accSettleList[0].accNo;
	        	$scope.settleMain.accCurrency=$scope.accSettleList[0].accCurrency;
	        	$scope.settleMain.settleDate=$scope.accSettleList[0].settleDate;
	        	$scope.settleMain.noPaidValue=$scope.accSettleList[0].noPaidValue;
	        	settleService.searchSettleS($scope.settleMain.payCode,$scope.settleMain.accNo);
	        	var url = "/prepareSettles/"+ $scope.settleMain.payCode +"/"+ $scope.settleMain.accNo +"/prepareSettle";
	            $location.path(url);
            };
            $scope.searchSettleS = function(reinsCode, accNo) {
	        	$scope.showBusy(true);
	            settleService.searchSettleS(reinsCode, accNo).then(
	                function(data){
	                	if(data.data.length > 0){
	                		 $scope.prpDreins = data.data;
	                         $scope.showBusy(false);
	                	}else{
	                		var hrefCount = (location.href).split("/");
	                		$scope.showBusy(false);
	                		if(hrefCount.length < 10)
	                			$scope.prpDreins =[];
	                			$scope.$emit('notification', {message:'未查找到相关信息', delay:3000, type:'error'});
	                	}
	                },
	                function(code){
	                    throw(code);
	                	$scope.prpDreins =[];
	                    $scope.$emit('notification', {message:'未查找到相关信息', delay:3000, type:'error'});
	                    //alert(message);
	                }
	            );
	        };
            
            var init  = function (){
            	$scope.searchTableFlag = false;
                //全选按钮设置为未选中状态（不初始化为false）
                $scope.checkAll = false;
                $scope.resetSearchBox();
                
                $scope.showExtra = "no" ;
                
                $scope.searchSettleS($scope.reinsCode,$scope.accNo);
            };
            init();
            
        }]);
});