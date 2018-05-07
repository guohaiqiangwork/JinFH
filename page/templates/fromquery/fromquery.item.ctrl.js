define(['app', 
	'codes',
    '/reins/page/templates/common/directives/currency.js',
    '/reins/page/templates/common/directives/percentage.js',
    '/reins/page/templates/common/directives/year.js',
], function (app, codes) {

    app.registerController('FromQueryItemCtrl', ['$scope', '$stateParams', '$modalInstance', 'repolicyNo', 'dangerNo', 'user', 'OutqueryService'
    	,'CodeService', '$q'
        	, function ($scope, $stateParams, $modalInstance, repolicyNo, dangerNo, user, outqueryService,
        		 codeService, $q) {
        $scope.repolicyNo          = repolicyNo         ;
        $scope.dangerNo = dangerNo;
        $scope.user = user;
            

       //初始化isBusy:false 
       $scope.global = {
            isBusy:false
        };  
        //控制旋转图片显示
        $scope.showBusy = function (_busy) {
            $scope.global.isBusy = _busy;
        };
        
        $scope.ok = function () {
        	console.log("关闭当前窗口");
            $modalInstance.close();
        };
        
        //add by chaiyuming 20150402 begin
        //初始化count字段值
        $scope.initCount = function(share){
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
                 
                 share.oriAmountCount = 0;                 
                 share.oriPremiumCount = 0;
                 
                 share.chgAmountCount =0;
                 share.chgPremiumCount = 0;
                 share.chgExTaxPremiumCount = 0;
                 share.chgTaxCount = 0;
             
             }
             return share;
        	}
        };
        
        /*分保单详细信息查看*/
        $scope.getPlyDtlInfo = function(repolicyNo, dangerNo, user, lan) {
            console.log("getPlyDtlInfo is coming ..");
            $scope.showBusy(true);
            outqueryService.searchPlyDtlInfo(repolicyNo, dangerNo, user, lan).then(
            function(data){
                if(angular.isUndefined(data.result)){
                	$scope.plyRiskUnit = (data);
                	console.log("plyRiskUnit---"+$scope.plyRiskUnit );
                	
                	//add by chaiyuming 20150402 begin
                	$scope.reinsShares = [];
                	$scope.plyEdrComShareInfoVoList = $scope.plyRiskUnit.plyEdrComShareInfoVoList;
                	$.each($scope.plyEdrComShareInfoVoList, function(index, d){
                		$scope.reinsShares.push(d);
                	});
                	$.each($scope.reinsShares, function(index , r){
	                    if(angular.isUndefined(r.shareRateCount)){
	                    	$scope.reinsShares[index] = $scope.initCount( $scope.reinsShares[index]);
	                    	$scope.reinsShares[index] = $scope.reinsShareCount($scope.reinsShares[index]);
	                    }
                	});
                	$scope.reinsShares = angular.copy($scope.reinsShares);
	                    
                	$.each($scope.reinsShares, function(index, unitrisk){
                		unitrisk.groupped = groupByReinsType(unitrisk.plyEdrComShares);
                	});
                	
                	console.log($scope.reinsShare);
                	//add by chaiyuming 20150402 end
                	
                	//add by chaiyuming 20150403 begin
                	$scope.riskunitsFacPlyInfo = $scope.plyRiskUnit.facPlyInfoVo;
                	//处理缴费信息
                	$scope.dealGetFacPayment();
                	//处理差异分保信息
                	$scope.dealDifReinsAbcToBoolean();
                	//add by chaiyuming 20150403 end
                    //处理缴费信息
                    //$scope.dealGetFacPayment();
                   	//处理差异分保信息
                    //$scope.dealDifReinsAbcToBoolean();

                } else {
                	$scope.plyRiskUnit = (data);
                	alert("查询失败: " + data.msg);
                }
                $scope.showBusy(false);
            },
            function(code){
                throw(code);
                //alert(message);
            }
          );
        };
        
      //计算分保试算合计 单行数据  index--要计算shares的下标
        $scope.reinsShareCount = function(shares ){
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
                     
                     shares.chgAmountCount =   parseFloat(shares.chgAmountCount ) +  (parseFloat(r.chgAmount )) ;
                     shares.chgPremiumCount =   parseFloat(shares.chgPremiumCount ) +  (parseFloat(r.chgPremium));                    
                     shares.chgExTaxPremiumCount = parseFloat(shares.chgExTaxPremiumCount ) +  (parseFloat(r.chgExTaxPremium));
                     shares.chgTaxCount = parseFloat(shares.chgTaxCount ) +  (parseFloat(r.chgTax));
                     
                     
                     
                 }
             });
			
             return shares;
           }
        };
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
		//预处理比例接收人中的差异分包
	       $scope.dealDifReinsAbcToBoolean = function(){
	          if($scope.riskunitsFacPlyInfo.facPlyComShareVos.length>0){
	          	$.each($scope.riskunitsFacPlyInfo.facPlyComShareVos, function(index, fac){
	           	if(fac.deductible ==="" || fac.deductibleRate ==="" || fac.deductible ===null || fac.deductibleRate ===null){
	           		console.log("免赔内容为空");
	           		fac.difReins = 0;
	           	} else {
	           		fac.difReins = 1;
	           	}
	           	if(fac.specialEngage ==="" || fac.specialEngage ===null){
	           		console.log("责任内容为空");
	           		fac.abc = 0;
	           	} else {
	           		fac.abc = 1;
	           	}
	           });
	           console.log($scope.riskunitsFacPlyInfo.facPlyComShareVos);
	          }	
	       }
        //add by chaiyuming 20150402 end
		
		//add by chaiyuming 20150403 begin
		//预处理临分意向的缴费信息
        $scope.dealGetFacPayment = function(){
        	//初始化比例超赔的缴费计划变量
        	$scope.facPlyComShareVosProp = {
                facPlyComShareVos : []
        	};

            $scope.LayersNprop = {
                feoXLayerVos: []
            };

        	//初始化超赔的缴费计划信息
        	if($scope.riskunitsFacPlyInfo.feoXLayerVos.length>0){
       			$.each($scope.riskunitsFacPlyInfo.feoXLayerVos, function(index, layer){
                    $scope.LayersNprop.feoXLayerVos.push(layer);
       			});

                $scope.tabsNprop = $scope.LayersNprop.feoXLayerVos;
         	};

         	//初始化比例的缴费计划信息
         	if($scope.riskunitsFacPlyInfo.facPlyComShareVos.length>0) {
         	if($scope.riskunitsFacPlyInfo.facPlyComShareVos.length>0){
        			$.each($scope.riskunitsFacPlyInfo.facPlyComShareVos, function(index, feo){
                        $scope.facPlyComShareVosProp.facPlyComShareVos.push(feo);
        			});
         	}
                $scope.tabs = $scope.facPlyComShareVosProp.facPlyComShareVos;
         	}
         	
        }
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
                             ralSearch();
                         },
                         function(code){
//                             console.log("error  "+code);
                             searchFlag = true;
                             if(angular.equals(code,"bussy")){
                                 $scope.searchList.push($scope.searchList[0]);
                                 $scope.searchList.splice(0,1);
                             }else{
                                 $scope[$scope.searchList[0].searcher] = [];
                                 $scope.searchList.splice(0,1);
                             }
                             ralSearch();
                         }
                     )
            }
         };
         $scope.getCodes = function(keywords, user){
             var deffered = $q.defer();
             codeService.getCodes(keywords, user).then(
                 function(data){
                     deffered.resolve(angular.copy( data));
                 },
                 function(code){
                     deffered.reject(code);
                 }
             );
             return deffered.promise;
         };
		//add by chaiyuming 20150403 end
        
        
	
        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        var init = function(){
        	//add by chaiyuming 20150403 begin
        	//获取币别
            $scope.keywords = {
                id:'',
                value:''
            }
            var key = angular.copy($scope.keywords);
            key.id="currency";
            key.value="";
            $scope.getCode(key,{},"currencys");
            //设置业务类型为保单
            $scope.certiType = '2';
	        console.log("certiType : " + $scope.certiType);
	        console.log("repayNo : " + $scope.repayNo);
	        console.log("user : " + $scope.user);
	        console.log("operations : " + $scope.operations);
	        $scope.operations = 0;
	        
	        //初始化临分页面编辑与否标志位
	        if(angular.isUndefined($scope.editType)){
	        	$scope.editType = "0";
	        }
	        $scope.pageFlag = ($scope.operations === 0) || ($scope.operations === '0') || ($scope.editType === 0) || ($scope.editType === '0');
        
            if($scope.certiType === '2'){
        		$scope.certiType = '1';
        	} else if($scope.certiType === '4'){
        		$scope.certiType = '3';
        	}
                       
        	//add by chaiyuming 20150403 end
            //获取详情
//            $scope.getFacPlyInfo($scope.certiType, $scope.repayNo, "", $scope.user, {});
            console.log("$scope.dangerNo:"+$scope.dangerNo);
            $scope.getPlyDtlInfo($scope.repolicyNo, $scope.dangerNo, $scope.user, {});
        };

        init();
    }]);
    
    app.registerController('FromQueryItemEdrCtrl', 
    		['$scope', '$stateParams', '$modalInstance', 'endorNo','dangerNo', 'user', 'OutqueryService'
    		 ,'CodeService', '$q'
    		 , function ($scope, $stateParams, $modalInstance, endorNo, dangerNo, user, outqueryService,
    				 codeService, $q) {
    	
    	$scope.endorNo = endorNo;
        $scope.dangerNo = dangerNo;
        $scope.user = user;
        //初始化isBusy:false 
        $scope.global = {
             isBusy:false
         };
        
        //控制旋转图片显示
        $scope.showBusy = function (_busy) {
            $scope.global.isBusy = _busy;
        };
        
        $scope.ok = function () {
        	console.log("关闭当前窗口");
            $modalInstance.close();
        };
        
      //初始化count字段值
        $scope.initCount = function(share){
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
                 
                 share.oriAmountCount = 0;                 
                 share.oriPremiumCount = 0;
                 
                 share.chgAmountCount =0;
                 share.chgPremiumCount = 0;
                 share.chgExTaxPremiumCount = 0;
                 share.chgTaxCount = 0;
             
             }
             return share;
        	}
        };
        
      //计算分保试算合计 单行数据  index--要计算shares的下标
        $scope.reinsShareCount = function(shares ){
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
                     
                     shares.chgAmountCount =   parseFloat(shares.chgAmountCount ) +  (parseFloat(r.chgAmount )) ;
                     shares.chgPremiumCount =   parseFloat(shares.chgPremiumCount ) +  (parseFloat(r.chgPremium));                    
                     shares.chgExTaxPremiumCount = parseFloat(shares.chgExTaxPremiumCount ) +  (parseFloat(r.chgExTaxPremium));
                     shares.chgTaxCount = parseFloat(shares.chgTaxCount ) +  (parseFloat(r.chgTax));
                 }
             });
			
             return shares;
           }
        };
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
                
        
        //预处理临分意向的缴费信息
        $scope.dealGetFacPayment = function(){
        	//初始化比例超赔的缴费计划变量
        	$scope.facPlyComShareVosProp = {
                facPlyComShareVos : []
        	};

            $scope.LayersNprop = {
                feoXLayerVos: []
            };

        	//初始化超赔的缴费计划信息
        	if($scope.riskunitsFacPlyInfo.feoXLayerVos.length>0){
       			$.each($scope.riskunitsFacPlyInfo.feoXLayerVos, function(index, layer){
                    $scope.LayersNprop.feoXLayerVos.push(layer);
       			});

                $scope.tabsNprop = $scope.LayersNprop.feoXLayerVos;
         	};

         	//初始化比例的缴费计划信息
         	if($scope.riskunitsFacPlyInfo.facPlyComShareVos.length>0) {
         	if($scope.riskunitsFacPlyInfo.facPlyComShareVos.length>0){
        			$.each($scope.riskunitsFacPlyInfo.facPlyComShareVos, function(index, feo){
                        $scope.facPlyComShareVosProp.facPlyComShareVos.push(feo);
        			});
         	}
                $scope.tabs = $scope.facPlyComShareVosProp.facPlyComShareVos;
         	}
         	
        }
        
        //预处理比例接收人中的差异分包
	    $scope.dealDifReinsAbcToBoolean = function(){
	    	if($scope.riskunitsFacPlyInfo.facPlyComShareVos.length>0){
	    		$.each($scope.riskunitsFacPlyInfo.facPlyComShareVos, function(index, fac){
	    		if(fac.deductible ==="" || fac.deductibleRate ==="" || fac.deductible ===null || fac.deductibleRate ===null){
	           		console.log("免赔内容为空");
	           		fac.difReins = 0;
	           	} else {
	           		fac.difReins = 1;
	           	}
	           	if(fac.specialEngage ==="" || fac.specialEngage ===null){
	           		console.log("责任内容为空");
	           		fac.abc = 0;
	           	} else {
	           		fac.abc = 1;
	           	}
	           });
	           console.log($scope.riskunitsFacPlyInfo.facPlyComShareVos);
	    	}	
	    }	
        
        /*分批单详细信息查看*/
        $scope.getEdrDtlInfo = function(endorNo, dangerNo, user, lan) {
            console.log("getEdrDtlInfo is coming ..");
            console.log("endorNo:"+endorNo);
            console.log("dangerNo:"+dangerNo);
            $scope.showBusy(true);
            outqueryService.searchEdrDtlInfo(endorNo, dangerNo, user, lan).then(
            function(data){
                if(angular.isUndefined(data.result)){
                	$scope.plyRiskUnit = (data);
                	console.log("plyRiskUnit---"+$scope.plyRiskUnit );
                	
                	//分保试算
                	$scope.reinsShares = [];
                	$scope.plyEdrComShareInfoVoList = $scope.plyRiskUnit.plyEdrComShareInfoVoList;
                	$.each($scope.plyEdrComShareInfoVoList, function(index, d){
                		$scope.reinsShares.push(d);
                	});
                	$.each($scope.reinsShares, function(index , r){
	                    if(angular.isUndefined(r.shareRateCount)){
	                    	$scope.reinsShares[index] = $scope.initCount( $scope.reinsShares[index]);
	                    	$scope.reinsShares[index] = $scope.reinsShareCount($scope.reinsShares[index]);
	                    }
                	});
                	$scope.reinsShares = angular.copy($scope.reinsShares);
	                    
                	$.each($scope.reinsShares, function(index, unitrisk){
                		unitrisk.groupped = groupByReinsType(unitrisk.plyEdrComShares);
                	});
                	
                	console.log($scope.reinsShare);
                	
//                	//add by chaiyuming 20150403 begin
                	$scope.riskunitsFacPlyInfo = $scope.plyRiskUnit.facPlyInfoVo;
//                	//处理缴费信息
                	$scope.dealGetFacPayment();
//                	//处理差异分保信息
                	$scope.dealDifReinsAbcToBoolean();
//                	//add by chaiyuming 20150403 end
                    //处理缴费信息
                    //$scope.dealGetFacPayment();
                   	//处理差异分保信息
                    //$scope.dealDifReinsAbcToBoolean();
                	

                } else {
                	$scope.plyRiskUnit = (data);
                	alert("查询失败: " + data.msg);
                }
                $scope.showBusy(false);
            },
            function(code){
                throw(code);
                alert(message);
            }
          );
        }
        var init = function(){
        	console.log("分批单详细信息");
        	$scope.getEdrDtlInfo($scope.endorNo, $scope.dangerNo, $scope.user, {});
        };

        init();
    }]);
    
    app.registerController('FromQueryItemClmCtrl', 
    		['$scope', '$stateParams', '$modalInstance', 'repayNo','dangerNo', 'user', 'OutqueryService'
    		 ,'CodeService', '$q'
    		 , function ($scope, $stateParams, $modalInstance, repayNo, dangerNo, user, outqueryService,
    				 codeService, $q) {
    	
    	$scope.repayNo = repayNo;
        $scope.dangerNo = dangerNo;
        $scope.user = user;
        
        //初始化isBusy:false 
        $scope.global = {
             isBusy:false
         };
        
        //控制旋转图片显示
        $scope.showBusy = function (_busy) {
            $scope.global.isBusy = _busy;
        };
        
        $scope.ok = function () {
        	console.log("关闭当前窗口");
            $modalInstance.close();
        };
        
        /*分赔案详细信息查看*/
        $scope.getClmDtlInfo = function(repayNo, dangerNo, user, lan) {
            console.log("getClmDtlInfo is coming ..");
            $scope.showBusy(true);
            outqueryService.searchClmDtlInfo(repayNo, dangerNo, user, lan).then(
            function(data){
                if(angular.isUndefined(data.result)){
                	$scope.plyRiskUnit = (data);
                	console.log("plyRiskUnit---"+$scope.plyRiskUnit );
                } else {
                	$scope.plyRiskUnit = (data);
                	alert("查询失败: " + data.msg);
                }
                $scope.showBusy(false);
            },
            function(code){
                throw(code);
                alert(message);
            }
          );
        }
        var init = function(){
        	console.log("分赔案详细信息");
        	$scope.getClmDtlInfo($scope.repayNo, $scope.proposalNo, $scope.user, {});
        };

        init();
    }]);
});