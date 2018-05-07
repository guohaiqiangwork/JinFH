define(['app', 
	'codes',
    '/reins/page/templates/common/directives/currency.js',
    '/reins/page/templates/common/directives/percentage.js',
    '/reins/page/templates/common/directives/year.js'
], function (app, codes) {

    app.registerController('InquiryBillModalCtrl', ['$scope', '$modalInstance', 'bizType', '_record', 'pagination', 'certiType', 'certiNo', 'user', 'operations', 'billList', 'BillService'
        , function ($scope, $modalInstance, bizType, _record, pagination, certiType, certiNo, user, operations, billList, billService) {
        
        
        /**
          * 显示账单
          * @param contAttr   比例【P】 /非比例 【PS】
          * @param contFacMrk   合同【0】/临分【1】
          * @param inOutMrk   分入【1】/分出【0】
          * @param inExMrk   对内【0】/对外【1】
          * @param billType    账单类型 [0]:预付保费  [1]:调整保费
          * @param keywords     数据  [合约编号，账单期]
          * @param pagination  分页
          * @param user       操作用户
          * @param lan       语言
          * @returns {Function|promise|promise|promise}
          */
        $scope.searchBill = function(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, pagination, user, lan){
            console.log("searchBill fac ...");
            billService.searchBill(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, pagination, user, lan).then(
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
        

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        var init = function(){

            //获取后台的账单数据
            $scope.billList = billList;
            
            $scope.certiType = certiType;
	        $scope.certiNo = certiNo;
	        $scope.user = user;
	        $scope.operations = operations;
	        $scope.pagination = pagination;
	        $scope._record = _record;
	        $scope.bizType = bizType;
            
            //查询账单
            $scope.keywords = {
            	certiType : "",
            	certiNo : ""
            }
            
           	$scope.keywords.certiType = $scope.bizType;
           	$scope.keywords.certiNo = $scope._record.facNo;
            if($scope.bizType === "2"){
	           	$scope.billType = "11";
            }
            if($scope.bizType === "3"){
	           	$scope.billType = "13";
	           	$scope.keywords.certiNo = $scope.certiNo;
            }
            
            $scope.searchBill("prop", "fac" ,"0", "2", $scope.billType, $scope.keywords, $scope.pagination, $scope.user, "");
            
        };

        init();
    }]);
});