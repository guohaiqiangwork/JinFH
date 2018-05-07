define(['app', 'codes'], function (app, codes) {

    app.registerController('AccountingBillModalCtrl', ['$scope', '$modalInstance', 'certiType', 'certiNo', 'BillService', 'pagination', 'user'
        , function ($scope, $modalInstance, certiType, certiNo, billService,  pagination, user) {
		
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
                    $scope.billList = (data);
                    console.log($scope.billList);
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

            //假数据
           /* $scope.bills=[
                {
                    "billStatus":"3",
                    "treatyNo         ":"03",
                    "deptCode":"泰康",
                    "reinsCode":"R002",
                    "reinsName":"大地",
                    "currency":"CNY",
                    "balance":30
                },
                {
                    "billStatus":"3",
                    "treatyNo         ":"03",
                    "deptCode":"泰",
                    "reinsCode":"R003",
                    "reinsName":"天空",
                    "currency":"CNY",
                    "balance":30
                }
            ]*/
            
            $scope.certiType = certiType;
	        $scope.certiNo = certiNo;
	        $scope.user = user;
	        $scope.pagination = pagination;
	        
	        //查询账单
            $scope.keywords = {
            	certiType : "",
            	poliEndoNo : ""
            }
            
           	$scope.keywords.poliEndoNo = $scope.certiNo;
           	$scope.keywords.certiType = $scope.certiType;
            
            $scope.searchBill("prop", "acc" ,"0", "2", $scope.certiType, $scope.keywords, $scope.pagination, $scope.user, "");
        };

        init();
    }]);
});