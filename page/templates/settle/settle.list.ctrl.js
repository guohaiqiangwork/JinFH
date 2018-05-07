define(['app',
	'config',
	'codes'
], function (app, config, codes) {
    app.registerController('SettleListCtrl', ['$scope', '$filter','$location','$stateParams', 'SettleService', 'CodeService', '$q',
        function ($scope,$filter,$location,$stateParams, settleService, codeService, $q) {
    	
    	 //隐藏查询列表
        $scope.hideSearchList = function (){
            $scope.hideList = true;
        };

        //查询、列表框显示
        $scope.showSearchList = function () {
            $scope.hideList = false;
        };
        
        
        //点击全部选中时设置控制的单选按钮状态
        $scope.checkAllRelationships = function (){
            $scope.checkAll = !$scope.checkAll;
            $.each($scope.settleList, function(index, accSettle){
            	accSettle.checked = $scope.checkAll;
            });
        };
        
      //监视settleList中是否有元素被改变状态
       $scope.$watch('settleList', function(){
            if(angular.isUndefined($scope.settleList))
                return false;
            //监测是否有元素被选中
            var _temp = $filter('filter')($scope.settleList, {checked:true});
            $scope.selectedCount = _temp.length;
            if(_temp.length === $scope.settleList.length)
                $scope.checkAll = true;
            else
                $scope.checkAll = false;
        },true);
        
        //数据字典差寻条件
        $scope.keywords = {
            "id":"",
            "value":"",
            "other1":""
        };
        
        
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
	    var ralSearch = function(user){
	        if(searchFlag && $scope.searchList.length > 0){
	            searchFlag = false;
	            $scope.getCodes($scope.searchList[0].keywords,user).then(
	                function(data){
	                    $scope[$scope.searchList[0].searcher] = data;
	                    searchFlag = true;
	                    $scope.searchList.splice(0,1);
//	                    ralSearch();
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
//	                    ralSearch();
	                }
	            )
	        }
	    };
	    
	  //用于选择币别 
	    
        var key = angular.copy($scope.keywords);
        key.id="currency";
        key.value="";
        $scope.getCode(key,{},"currencys");	
		
        //选择结算人编号
        var key = angular.copy($scope.keywords);
        key.id="reinsCode";
        key.value="";
        $scope.getCode(key,{},"reinsCodes");	
	   
	    
	  
        
			//add by wl 20180313 增加查询账单 begin
          
	        $scope.searchSettle = function(searchWords, pagination, user) {
	        	
	        	$scope.showBusy(true);
	        	
	            settleService.searchSettle(searchWords, pagination, user).then(
	                function(data){	                	
	                	if(data.data.length > 0){
	                		 $scope.settleList = data.data;
	                         $scope.showBusy(false);
	                	}else{
	                		var hrefCount = (location.href).split("/");
	                		$scope.showBusy(false);
	                		if(hrefCount.length < 10)
	                			$scope.settleList =[];
	                			$scope.$emit('notification', {message:'未查找到相关信息', delay:3000, type:'error'});
	                	}
	                },
	                function(code){
	                    throw(code);
	                	$scope.settleList =[];
	                    $scope.$emit('notification', {message:'未查找到相关信息', delay:3000, type:'error'});
	                    //alert(message);
	                }
	            );
	        };
	         //add by wl 20180313 增加查询账单 end
	        
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
	        	$scope.settleMain.currency=$scope.accSettleList[0].currency;	        	
	        	$scope.settleMain.settleDate= $scope.accSettleList[0].settleDate;
	        	$scope.settleMain.noPaidValue=$scope.accSettleList[0].noPaidValue;
	        	$scope.settleMain.totalSettleBalanceS=$scope.accSettleList[0].totalSettleBalanceS;
	        	
            };
	        //-------------------------联动修改-----------------------------------------------
            
            
            //用于 选择币别时 获取对应的兑换率
//            var watch = $scope.$watch("currencys", function(){
//                if(angular.isDefined( $scope.currencys )&& $scope.currencys.length > 0){
//                	console.log($scope.currencys)
//                	console.log("$scope.exchRates***:"+$scope.exchRates);
//                    //一级下拉菜单默认选项
//                    if(angular.isUndefined ( $scope.exchRate.currency) ){
//                    	console.log("$scope.exchRate:"+$scope.exchRate);
//                        $scope.exchRate.currency = $scope.currencys[0].id;
//                    }
//                    if(angular.isUndefined( $scope.currencys )){
//                        var key = angular.copy($scope.keywords);
//                        key.id="exchRateBycurrency";
//                        key.value = $scope.exchRate.currency;
//                        $scope.getCode(key,{},"exchRates");
//                        //注销watch
//                        watch();
//                    }
//                }
//            });
            
          //查询适用险种的二级列表
//            $scope.searchExchRate = function(){
//                var key = angular.copy($scope.keywords);
//                key.id = "exchRateBycurrency";
//                key.value = $scope.settleMain.currency;
//                $scope.getCode(key, {}, "exchRates");
//            };
            $scope.searchExchRate = function(settleMain,currencyS,accSettleList){
            	var length = accSettleList.length;
            	var currency = new Array(length);
                for(i=0;i<length;i++) {
            	    currency[i]=accSettleList[i].currency;
            	}
            	settleService.getExchRates(currency,currencyS, '').then(
                        function(data){
                        	var array = data;
                        	settleMain.totalSettleBalanceS = 0 ;
                        	for(i=0;i<length;i++) {
                        		  var noPaidValue = accSettleList[i].noPaidValue;
                      			  var exchRate = array[i];
                      			accSettleList[i].exchRate = exchRate;
                      			accSettleList[i].settleBalanceS = noPaidValue*exchRate;
                        	}
                        	for(i=0;i<length;i++){
                        		var settleBalanceS = accSettleList[i].settleBalanceS;
                        		settleMain.totalSettleBalanceS = settleMain.totalSettleBalanceS + settleBalanceS;
                        	}
                        	
                        }
                   );
            }
            //控制适用险种二级下拉菜单默认选中第一项
            $scope.$watch("exchRates",function(){
                if(angular.isDefined( $scope.exchRates ) && $scope.exchRates.length > 0){
                    $scope.exch.exchRate = $scope.exchRates[0].id;
                }
            });
	        
            
            
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
            
            
            
            
            
            //---------------------------------------------联动修改--------------------------------------------
	        $scope.genSettle = function() {
                var accSettleList1 = $filter('filter')($scope.accSettleList, {checked:true});

	        	if(accSettleList1.length == 0){
	        		alert("请选择一条记录");
	        		return;
	        	}
	        	var keywords = [];
	        	$.each(accSettleList1,function(index,temp){
                    var keyword={};
                    keyword.accNo               =  temp.accNo;
                    keyword.payCode             =  temp.payCode;
                    keyword.payName             =  temp.payName;
                    keyword.currency            =  temp.currency;
                    keyword.settleDate          =  temp.settleDate;
                    keyword.noPaidValue         =  temp.noPaidValue;
                    keyword.settleBalanceS      =  temp.settleBalanceS;
                    keyword.exchRate            =  temp.exchRate;
                    keyword.reinsCode           =  temp.reinsCode;
//                    keyword.fReinsCode          =  temp.fReinsCode;
                    keywords.push(keyword);
                });
	        	
	        	settleService.genSettleAcc(keywords).then(
		                function(data){
		                	alert("结算单生成成功！");
		                },
		                function(code){
	                    	alert("结算单生成失败！");
	                    }
	        	);
	        };
	        
	         $scope.resetSearchBox = function(){
	        	//数据字典差寻条件
		        $scope.searchWords = {
		             "payCode":"",
		             "payCodeTag":"",
		             "currency":"",
		             "currencyTag":"",
		             "accNo":"",
		             "accNoTag":"",
		             "comCode":"",
		             "comCodeTag":"",
		             "drCertifyNo":"",
		             "drCertifyNoTag":"",
		             "reCertifyNo":"",
		             "reCertifyNoTag":"",
		             "treatyNo":"",
		             "treatyNoTag":"",
		             "sectionNo":"",
		             "sectionNoTag":"",
		             "startAccPeriod":"",
		             "startAccPeriodTag":"",
		             "endAccPeriod":"",
		             "endAccPeriodTag":"",
		             "uwYear":"",
		             "uwYearTag":"",
		             "classCode":"",
		             "classCodeTag":"",
		             "riskCode":"",
		             "riskCodeTag":"",
		             "insuredName":"",
		             "insuredNameTag":"",
		             "yourRef":"",
		             "yourRefTag":"",
		             "comCodeIn":"",
		             "comCodeInTag":"",
		             "reinsType":"",
		             "accKind":"",
		             "settleStatus":"",
		             "optType":"",
		             "settleDate":"",
		             "settleDateTag":""
		        };
	         };
	      
			
            var init = function () {
            	$scope.searchTableFlag = false;
                //全选按钮设置为未选中状态（不初始化为false）
                $scope.checkAll = false;
                $scope.resetSearchBox();
                
                $scope.showExtra = "no" ;
                
                $scope.searchSettle($scope.searchWords,{},{});
                
              
            };
            init();

        }]);
});
