define(['app', 'codes'], function (app, codes) {

    app.registerController('InquiryShareModalCtrl', ['$scope', '$modalInstance','certiType', 'certiNo', 'insrnCCde', 'user', 'operations', 'riskUnitNo', 'RiskunitService'
        , function ($scope, $modalInstance, certiType, certiNo, insrnCCde, user, operations, riskUnitNo, riskunitService) {
        
        
        $scope.certiType = certiType;
        $scope.certiNo = certiNo;
        $scope.user = user;
        $scope.insrnCCde = insrnCCde;
        $scope.riskUnitNo = riskUnitNo;
        $scope.operations = operations;
        
        //分组的公共方法
        var groupByReinsType = function(shares) {
	     	var result = {};
	     	if(angular.isUndefined(shares)){
	     	} else {
	     		$.each(shares, function(index, share){
		      		//console.log(share);
		      		
		      		if(!result[share.reinsType]){
			       		result[share.reinsType] = {
			      				reinsType: share.reinsType,
			       			PlyEdrComShares : []
			       		};
			       	}
		      		result[share.reinsType].PlyEdrComShares.push(share);
		      	});
	     	}
	     	
			return result;
		};
        
        //初始化count字段值
         var initCount = function(share){
         	console.log("initCount ...start");
         	console.log(share);
         	console.log("initCount ...end");
         	//如果没有查到分保试算则跳过，否则初始化count字段值
         	if(angular.isUndefined(share)){
         	
         	} else {
         		if($scope.certiType === '1'){
                  share.shareRateCount = 0;
                  share.amountCount =0;
                  share.premiumCount = 0;
                  share.exTaxPremiumCount = 0;
                  share.taxCount= 0;
              }else{
                  share.shareRateCount = 0;
                  share.amountCount =0;
                  share.premiumCount = 0; 
                  share.exTaxPremiumCount = 0;
                  share.taxCount= 0;
                  
                  share.chgAmountCount =0;
                  share.chgPremiumCount = 0;
                  share.chgExTaxPremiumCount = 0;
                  share.chgTaxCount = 0;
                  
                  share.oriPremiumCount = 0;
                  share.oriAmountCount = 0;
                  share.oriExTaxPremiumCount = 0;
                  share.oriTaxCount = 0;
                  
              }
              return share;
         	}
         };
         
         //计算分保试算合计 单行数据  index--要计算shares的下标
         var reinsShareCount = function(shares ){
         	//如果没有查到分保试算则跳过，否则计算分保试算合计 单行数据  index--要计算shares的下标
         	if(angular.isUndefined(shares)){
         	} else {
              $.each(shares.plyEdrComShares, function(index, r){
            	  if($scope.certiType === "1"){
                      shares.shareRateCount =  (parseFloat(shares.shareRateCount +"") +  parseFloat(r.shareRate+"")).toFixed(4);
                      shares.amountCount =   parseFloat(shares.amountCount ) +  (parseFloat(r.amount )) ;
                      shares.premiumCount =   parseFloat(shares.premiumCount ) +  (parseFloat(r.premium )) ;
                      shares.exTaxPremiumCount =  parseFloat(shares.exTaxPremiumCount ) +  (parseFloat(r.exTaxPremium )) ;
                      shares.taxCount= parseFloat(shares.taxCount ) +  (parseFloat(r.tax )) ;
                  }else{
                      shares.shareRateCount =  (parseFloat(shares.shareRateCount +"") +  parseFloat(r.shareRate+"")).toFixed(4);
                      shares.amountCount =   parseFloat(shares.amountCount ) +  (parseFloat(r.amount )) ;
                      shares.premiumCount =   parseFloat(shares.premiumCount ) +  (parseFloat(r.premium ));
                      shares.exTaxPremiumCount =  parseFloat(shares.exTaxPremiumCount ) +  (parseFloat(r.exTaxPremium )) ;
                      shares.taxCount= 			 parseFloat(shares.taxCount ) 		   +  (parseFloat(r.tax )) ;
                      
                      shares.oriAmountCount =   parseFloat(shares.oriAmountCount ) +  (parseFloat(r.oriAmount));                    
                      shares.oriPremiumCount =   parseFloat(shares.oriPremiumCount ) +  (parseFloat(r.oriPremium));
                      shares.oriExTaxPremiumCount = parseFloat(shares.oriExTaxPremiumCount ) +  (parseFloat(r.oriExTaxPremium));
                      shares.oriTaxCount = parseFloat(shares.oriTaxCount ) +  (parseFloat(r.oriTax));
                      
                      shares.chgAmountCount =   parseFloat(shares.chgAmountCount ) +  (parseFloat(r.chgAmount )) ;
                      shares.chgPremiumCount =   parseFloat(shares.chgPremiumCount ) +  (parseFloat(r.chgPremium));                    
                      shares.chgExTaxPremiumCount = parseFloat(shares.chgExTaxPremiumCount ) +  (parseFloat(r.chgExTaxPremium));
                      shares.chgTaxCount = parseFloat(shares.chgTaxCount ) +  (parseFloat(r.chgTax));
                      
                  }
              });
			
              return shares;
            }
         };
        
        
        /* 分保查看 */
        $scope.showReinsShare = function(certiType, certiNo, riskUnitNo, insrnCCde, user, lan){
            console.log("InquiryDetailModalCtrl getFacPlyInfo（临分意向） is coming ..");
            riskunitService.showReinsShare(certiType, certiNo,riskUnitNo, insrnCCde, user, lan).then(
                function(data){
                	 $scope.reinsShares = [];
                	 if(angular.isDefined(data) && angular.isUndefined(data.result)){
                	 	$.each(data, function(index, d){
                	 		if((riskUnitNo === d.riskUnitNo) || (riskUnitNo === 0 || riskUnitNo === "0")){
                	 			$scope.reinsShares.push(d);
                	 		}
                	 	});
                	 	//$scope.reinsShares = (data);
	                    $.each($scope.reinsShares, function(index , r){
	                         if(angular.isUndefined(r.shareRateCount)){
	                             $scope.reinsShares[index] = initCount( $scope.reinsShares[index]);
	                             $scope.reinsShares[index] = reinsShareCount( $scope.reinsShares[index]);
	                         }
	                     });
	                    $scope.reinsShares = angular.copy($scope.reinsShares);
	                    
	                    $.each($scope.reinsShares, function(index, unitrisk){
			        		unitrisk.groupped = groupByReinsType(unitrisk.plyEdrComShares);
			        	});
                	 	
                	 } else if(angular.isDefined(data.msg)){
                	 	alert(data.msg);
                	 }
                	 
                    console.log($scope.reinsShare);
                },
                function(code){
                    throw(code);
                    //alert(message);
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
        
            //$scope.reinsShare = reinsShare[0];
            
            console.log("certiType : " + $scope.certiType);
	        console.log("certiNo : " + $scope.certiNo);
	        console.log("user : " + $scope.user);
	        console.log("operations : " + $scope.operations);
	        $scope.operations = 0;
        
        	//certiType传值处理
//        	if($scope.certiType === "2"){
//        		$scope.certiType = "1";
//        	}
//        	
//        	if($scope.certiType === "4"){
//        		$scope.certiType = "3";
//        	}
           //分保信息
            $scope.showReinsShare($scope.certiType, $scope.certiNo, $scope.riskUnitNo, $scope.insrnCCde, $scope.user, {});
        };

        init();
    }]);
});