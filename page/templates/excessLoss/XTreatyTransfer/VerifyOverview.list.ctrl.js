define(['app',
	'config',
	'codes'
], function (app, config, codes) {
    app.registerController('queryXTreatyBill', ['$scope', '$filter','$location','$stateParams', 'excessLossService', 'CodeService', '$q',
        function ($scope,$filter,$location,$stateParams, excessLossService, codeService, $q) {
    		$scope.settle = function(settleType,contractListr){
    			var treatyNo = contractListr.treatyNo;
    			if(accType=="Y")
    	      	{
    	            if(settleType == "TB")
    	            {
    	              	fm.action="/reins/VerifyXAcc.do?actionType=getAccPeriod";
    	            }
    	            if(settleType == "TR")
    	            {
    	                fm.action="/reins/VerifyXAcc.do?actionType=getPayTimes";
    	            }  	    
    	      	}

    	      	if(accType=="R")
    	      	{
    	      	   if(settleType == "TR")
    	      	   {
    	      	       fm.action="/reins/VerifyXAcc.do?treatyNo="+treatyNo+"&actionType=CheckAdjustXAcc&accType=TR";
    	      	   }
    	      	   if(settleType == "TB")
    	      	   {
    	      	       fm.action="/reins/VerifyXAcc.do?treatyNo="+treatyNo+"&actionType=CheckAdjustXAcc&accType=TB";
    	      	   }
    	      	    
    	      	}

    	      	if(accType=="T")
    	      	{
    	      	   if(settleType == "TR")
    	      	   {
    	      	       fm.action="/reins/VerifyXAcc.do?treatyNo="+treatyNo+"&actionType=CheckReinstXAcc&accType=TR";
    	      	   }
    	      	   if(settleType == "TB")
    	      	   {
    	      	       fm.action="/reins/VerifyXAcc.do?treatyNo="+treatyNo+"&actionType=CheckReinstXAcc&accType=TB";
    	      	   }
    	      	    
    	      	}
    		};
    		//显示账单
			 $scope.searchAccNo = function(contractListr,accType){
				var treatyNo = contractListr.treatyNo;
				excessLossService.searchAccNoAcc($scope.operation,$scope.pagination,treatyNo,accType,'','').then(
						function(data){
							if(angular.isUndefined(data) ){
                     			data = {"data":[],"total":0};
                     		}
							$scope.fzXBAccList = data.fzXBAccList;
							$scope.fzXRAccList = data.fzXRAccList;
							$scope.pagination.totalItems = data.total;    
						}
				);
			 };
    		//查询账单期
    		 $scope.searchAccperiod = function(index){
    			 $scope.contractListr  =  $scope.contractList[index];
    		 };
    		//初始查询
    		$scope.searchQueryXTesty = function() {
    			excessLossService.searchXTreatyAcc($scope.operation,$scope.pagination,$scope.keywords,'','').then(
    					function(data){
    						$scope.contractList = data.data;
    						$scope.pagination.totalItems = data.total;   
    					}
    			);
    		};
    		 //条件查询
            $scope.searchContracts = function(){
            	if($scope.keywords.contYear === null){
            		$scope.keywords.contYear = "";
            	}
                $scope.pagination.pageIndex = 1;
                $scope.searchQueryXTesty($scope.keywords, $scope.pagination, {});
            };
	    	 //重置查询框中内容
	        $scope.resetSearchBox = function(){
	            $scope.keywords = {
	            	"treatyNo":'',
	            	"refNo":'',
	            	"uwYear":'',
	            	"treatyType":'',
	            	'contNoFlag':'=',
	            	'contYearFlag':'=',
	            	'refNmeFlag':'='
	            };
	            
	        };
            var init = function () {
//            	 $scope.searchQueryXTreaty();
            	$scope.searchTableFlag = false;
                //全选按钮设置为未选中状态（不初始化为false）
                $scope.checkAll = false;

                //被选中的按钮个数
                $scope.selectedCount = 0;
                $scope.operation = $stateParams.operation;
                if($scope.setStateBack != true){
               
	                //分页对象
	                $scope.pagination = {
	                    totalItems:0,
	                    pageIndex:1,
	                    pageSize:10,
	                    maxSize:8,
	                    numPages:4,
	                    previousText: config.pagination.previousText,
	                    nextText: config.pagination.nextText,
	                    firstText: config.pagination.firstText,
	                    lastText: config.pagination.lastText
	                };
	
	                //重置条件查询框
	                $scope.resetSearchBox();
	                $scope.searchQueryXTesty();
                }else{
                	$scope.setStateBack = null;
                }
               
            };
            init();

        }]);
});
