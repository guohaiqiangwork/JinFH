define(['app',
	'config',
	'codes' ]
, function (app, codes,config) {
    app.registerController('PrintCtrl', ['$scope','$filter','CodeService','PrintService','contract','BillService',
    	'$q',
       function ($scope,$filter,CodeService,printService,contract,billService,$q) {
    	$scope.cur = false;
    	
    	//打印
        $scope.genPrint = function(){
        	$scope.print($scope.keywords, $scope.global.user, "");
        }
        
        //打印add by xjy
        
        $scope.getCodes = function(keywords, user){
            var deffered = $q.defer();
            CodeService.getCodes(keywords, user).then(
                function(data){
                    deffered.resolve(angular.copy( data));
                },
                function(code){
                    deffered.reject(code);
                }
            );
            return deffered.promise;
        };
        //end
        
        //重置
        $scope.reset = function(){
            $scope.keywords = {
                    'treatyNo':'',
                    'treatyName':'',
            		'riskCode':'',//险种
                    'reportType':'XLS',
                    'braCom':'',
                    'month':'',
                    "startDate":'',
           		 	"endDate":'',
                    'accPeriod':''
            }
            var now = new Date();
            var month = (now.getMonth() + 1);               
            if(month < 10) 
                month = "0" + month;
            var today = now.getFullYear() + '-' + month;
            $('#rePeriod').val(today);
        }
        
        //变化单选框状态
        $scope.showCur = function(){
        	$scope.cur = true;
        }
        $scope.hideCur = function(){
        	$scope.cur = !$scope.cur;
        }
        
        //判断合约编号是否是数字
        $scope.checkPlyNo = function(value){
        	if(value!=""){
        		if (isNaN(value)) {
            		alert("请输入数字");
            		frmSearch1.plyNo.value = "";
            		return false;
            	}
        	}
        }
        
        //判断险种A是否是数字
        $scope.checkRiskCodeStartNo = function(value){
        	if(value!=""){
        		if (isNaN(value)) {
            		alert("请输入数字");
            		frmSearch1.riskCodeStart.value = "";
            		return false;
            	}
        	}
        }
        
        //判断险种B是否是数字
        $scope.checkRiskCodeEndNo = function(value){
        	if(value!=""){
        		if (isNaN(value)) {
            		alert("请输入数字");
            		frmSearch1.riskCodeEnd.value = "";
            		return false;
            	}
        	}
        }
        
        //变化赔款类型是否显示
        $scope.showClmType = function(){
        	$scope.clmType = true;
        }
        $scope.hideClmType = function(){
        	$scope.clmType = !$scope.clmType;
        }
    	
    	//查询字典
        var searchFlag = true;
        $scope.searchList = [];
        $scope.getCode = function(keywords,user,searcher){
            var temp = angular.copy({keywords:keywords,searcher:searcher});
            $scope.searchList.push(temp);
            if(searchFlag && $scope.searchList.length > 0){
                ralSearch(user);
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
        
        $scope.getByReturn = function(aim,condition){
            var temp = aim+"";
            var keywords = {"id":aim,"value":condition, "holdFlag": false};
            return $scope.getCodes(keywords,{}).then(
                function(data){
                    console.log(data);
                  return data;
                },
                function(code){
                return [];
                }
            );
        };

        //根据月份算出对应季度  add by zhx
        $scope.countMonthToQuarter = function(){
        	var myDate = new Date();
            $scope.fullYear = ""+myDate.getFullYear(); 
            if((myDate.getMonth() + 1) < 10){
                $scope.month = "0"+(myDate.getMonth() + 1);
            } else {
            	$scope.month = ""+(myDate.getMonth() + 1);
            }
            $scope.monthCompare = $scope.fullYear + "-" + $scope.month + "M";
            $scope.billYear = $scope.billData.accPeriodQ[0].substring(0,4);
            if($scope.billYear === $scope.fullYear){
            	$.each($scope.billData.accPeriodQ, function(index, accP){
            		$scope.billMonth = countBillDates(accP);
            		$.each($scope.billMonth, function(index, month){
            			if($scope.exitFlag.length<=0){
                			if(month === $scope.monthCompare){
                				$scope.keywords.accperiod = accP;
                				$scope.keywords.billDate = $scope.monthCompare;
                				$scope.exitFlag.push(true);
                			}
            			}
            		});
            	});
            }
        }
        /**
         * 获取账单期
         * @param contractNo  暂存编号
         */
        $scope.getBillDate = function (contAttr, contractNo, user, lan) {
            billService.getBillDate("prop", $scope.contract.treatyNo, user, lan).then(
                function(data){
                    $scope.billData = data;
                    //根据月份算出对应季度  add by zhx
                    $scope.countMonthToQuarter();
                    if($scope.exitFlag.length<=0){
                       	if(angular.isDefined($scope.billData.accPeriodQ)){
                        	$scope.keywords.accperiod = $scope.billData.accPeriodQ[0];
                       	} else {
                       		$scope.keywords.accperiod = "";
                       	}
                   	}
//
                    /*if($scope.billData.sectionNos.length>1){
                    	$scope.noDate.sectionNos = $scope.billData.sectionNos[0];
                   	//加载页面时查一遍是否有对应账单期数据
            			$scope.changeDate($scope.keywords);
                    }*/
                    if($scope.contAttr ==="nprop" || $scope.keywords.billType==="02")
                    $scope.keywords.sectionNos = $scope.billData.sectionNos[0];
//
                },
                function(code){
                    //throw(code);
                    alert(code);
                    $scope.showBusy(false);
                }
            );
        };
        //根据合同账单期计算账单期  add by zhx
        var countBillDates = function(accperiod){
        	//$scope.keywords.aaa = aaa;
        	$scope.back = [];
        	if(angular.isDefined(accperiod)){
        	     var temp = accperiod[accperiod.length - 1]; 
        	     var month = accperiod[accperiod.length - 2]; 
                 var head = (accperiod).substring(0,4);
                 if(temp === "Q"){
                	 for(var i = 1 ; i <= 3; i++){
                		 var num = ((parseInt(month)-1)*3 +i);
                		 var a ;
                		 if(num < 10){
                			 a = "0"+num;
                		 }else{
                			 a = ""+num;
                		 }
                		 var t = head + "-" + a +"M";
                		 $scope.back.push(t);
                	 }
                 }else if(temp === "M"){
                	 $scope.back.push(accperiod);
                 }
        	}
        	//预处理月份账单期  
        	$scope.dealmonthBill();
       		return $scope.back;
       
        };
        
      //预处理月份账单期 add by zhx
        $scope.dealmonthBill = function(){
        	$scope.backCopy = [];
        	var temp = "";
        	$.each($scope.back, function(index, month){
        		if($scope.monthCompare.length>0){
            		if((index !=0) && (month === $scope.monthCompare)){
            			temp = $scope.back[0]; 
            			$scope.back[index] = temp;
            			$scope.back[0] = month;
            		}
        		}
        	});
        };
    	var init = function(){
    		//根据月份算出对应季度
            
    		console.log("单证打印");
    		 //数据字典差寻条件
            $scope.keywords = {
                "id":"",
                "value":"",
                'riskCode':'',//险种
                "other1":"",
                "treatyNo":"",
                "refNo":"",
                "startDate":"",
                "endDate":"",
                "billDate": ''
            };
    		 $scope.contract = contract;

            
            $scope.options = {
            	bizType : '1',
            	billDates: []
            }
            $scope.reset();
            
            $scope.keywords.other1 = contract.treatyNo;
            $scope.keywords.refNo = contract.refNo;
            $scope.keywords.startDate=contract.startDate.time;
            $scope.keywords.endDate=contract.endDate.time;
         
            
          //适用险种一级下拉菜单 add by xjy2018-03-29
            var key = angular.copy($scope.keywords);
            key.id="riskCode";
            key.value = "";
            $scope.getCode(key,{},"riskCodes");
            $scope.exitFlag = [];
            //用于月账单期add by zhx
            $scope.$watch('keywords.accperiod', function(){
            	$scope.options.billDates = countBillDates($scope.keywords.accperiod);
                if($scope.options.billDates.length>0)
                    $scope.keywords.billDate = $scope.options.billDates[0];

                $scope.options.ready = false;

            });

//           $scope.getBillDate(contAttr, contractNo, "", "");
    
            //适用险种二级下拉菜单初始化
           /* var watch = $scope.$watch("classCodes", function(){
                if(angular.isDefined( $scope.classCodes )&& $scope.classCodes.length > 0){
                    //一级下拉菜单默认选项
                    if(angular.isUndefined ( $scope.risk.classCode) ){
                        $scope.risk.classCode = $scope.classCodes[0].id;

                    }
                    if(angular.isUndefined( $scope.riskCodes )){
                        var key = angular.copy($scope.keywords);
                        key.id="riskCodeByClass";
                        key.value = $scope.risk.classCode;
                        $scope.getCode(key,{},"riskCodes");
                        //注销watch
                        watch();
                    }
                }
            });*/

    	};
    	
    	init();

    }]);
});