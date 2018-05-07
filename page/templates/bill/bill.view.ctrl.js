define(['app',
    'codes'
], function (app, codes) {

    app.registerController('ContractViewCtrl', ['$scope','BillService','$stateParams',
         function ($scope,billService,stateParams) {
         
         $scope._keywords = {
             "tmpTreatyNo" : "",
             "billType" : "",
             "billDate" : ""
         };
         
         //预处理季度账单详细信息数据
         $scope.dealBillData = function(){
         
         	//数据初始化
         	$scope.bfJ = "";
         	$scope.bfD = "";
         	$scope.fhbfcbjJ = "";
         	$scope.fhbfcbjD = "";
         	$scope.lxJ = "";
         	$scope.lxD = "";
         	$scope.txjpkJ = "";
         	$scope.txjpkD = "";
         	$scope.sxfJ = "";
         	$scope.sxfD = "";
         	$scope.pkJ = "";
         	$scope.pkD = "";
         	$scope.tqbfzbjJ = "";
         	$scope.tqbfzbjD = "";
         	$scope.sjJ = "";
         	$scope.sjD = "";
         	$scope.jjfJ = "";
         	$scope.jjfD = "";
         	$scope.yeJ = "";
         	$scope.yeD = "";
         	$scope.wjpkJ = "";
         	$scope.wjpkD = "";
         	$.each($scope.billList.billItems, function(index, bill){
         		if(bill.feeCde === "C1" && bill.feeFlag === "D"){
         			$scope.bfJ = bill.feeValue;
         		}
         		if(bill.feeCde === "C1" && bill.feeFlag === "C"){
         			$scope.bfD = bill.feeValue;
         		}
         		if(bill.feeCde === "C2" && bill.feeFlag === "D"){
         			$scope.fhbfcbjJ = bill.feeValue;
         		}
         		if(bill.feeCde === "C2" && bill.feeFlag === "C"){
         			$scope.fhbfcbjD = bill.feeValue;
         		}
         		if(bill.feeCde === "C3" && bill.feeFlag === "D"){
         			$scope.lxJ = bill.feeValue;
         		}
         		if(bill.feeCde === "C3" && bill.feeFlag === "C"){
         			$scope.lxD = bill.feeValue;
         		}
         		if(bill.feeCde === "C4" && bill.feeFlag === "D"){
         			$scope.txjpkJ = bill.feeValue;
         		}
         		if(bill.feeCde === "C4" && bill.feeFlag === "C"){
         			$scope.txjpkD = bill.feeValue;
         		}
         		if(bill.feeCde === "D1" && bill.feeFlag === "D"){
         			$scope.sxfJ = bill.feeValue;
         		}
         		if(bill.feeCde === "D1" && bill.feeFlag === "C"){
         			$scope.sxfD = bill.feeValue;
         		}
         		if(bill.feeCde === "D2" && bill.feeFlag === "D"){
         			$scope.pkJ = bill.feeValue;
         		}
         		if(bill.feeCde === "D2" && bill.feeFlag === "C"){
         			$scope.pkD = bill.feeValue;
         		}
         		if(bill.feeCde === "D3" && bill.feeFlag === "D"){
         			$scope.tqbfzbjJ = bill.feeValue;
         		}
         		if(bill.feeCde === "D3" && bill.feeFlag === "C"){
         			$scope.tqbfzbjD = bill.feeValue;
         		}
         		if(bill.feeCde === "DB" && bill.feeFlag === "D"){
         			$scope.sjJ = bill.feeValue;
         		}
         		if(bill.feeCde === "DB" && bill.feeFlag === "C"){
         			$scope.sjD = bill.feeValue;
         		}
         		if(bill.feeCde === "DD" && bill.feeFlag === "D"){
         			$scope.jjfJ = bill.feeValue;
         		}
         		if(bill.feeCde === "DD" && bill.feeFlag === "C"){
         			$scope.jjfD = bill.feeValue;
         		}
         		if(bill.feeCde === "BAL" && bill.feeFlag === "D"){
         			$scope.yeJ = bill.feeValue;
         		}
         		if(bill.feeCde === "BAL" && bill.feeFlag === "C"){
         			$scope.yeD = bill.feeValue;
         		}
         		if(bill.feeCde === "D9" && bill.feeFlag === "D"){
         			$scope.wjpkJ = bill.feeValue;
         		}
         		if(bill.feeCde === "D9" && bill.feeFlag === "C"){
         			$scope.wjpkD = bill.feeValue;
         		}
         	});
         }
         
         //计算借贷方合计值
         $scope.contDJ = function(){
         	$scope.countD = 0;
         	$scope.countJ = 0;
         	//计算贷方合计值
         	if($scope.bfJ != ""){
         		$scope.countJ += $scope.bfJ*1;
         	}
         	if($scope.fhbfcbjJ != ""){
         		$scope.countJ += $scope.fhbfcbjJ*1;
         	}
         	if($scope.lxJ != ""){
         		$scope.countJ += $scope.lxJ*1;
         	}
         	if($scope.txjpkJ != ""){
         		$scope.countJ += $scope.txjpkJ*1;
         	}
         	if($scope.sxfJ != ""){
         		$scope.countJ += $scope.sxfJ*1;
         	}
         	if($scope.pkJ != ""){
         		$scope.countJ += $scope.pkJ*1;
         	}
         	if($scope.tqbfzbjJ != ""){
         		$scope.countJ += $scope.tqbfzbjJ*1;
         	}
         	if($scope.sjJ != ""){
         		$scope.countJ += $scope.sjJ*1;
         	}
         	if($scope.jjfJ != ""){
         		$scope.countJ += $scope.jjfJ*1;
         	}
         	if($scope.yeJ != ""){
         		$scope.countJ += $scope.yeJ*1;
         	}
         	
         	//计算借方合计值
         	if($scope.bfD != ""){
         		$scope.countD += $scope.bfD*1;
         	}
         	if($scope.fhbfcbjD != ""){
         		$scope.countD += $scope.fhbfcbjD*1;
         	}
         	if($scope.lxD != ""){
         		$scope.countD += $scope.lxD*1;
         	}
         	if($scope.txjpkD != ""){
         		$scope.countD += $scope.txjpkD*1;
         	}
         	if($scope.sxfD != ""){
         		$scope.countD += $scope.sxfD*1;
         	}
         	if($scope.pkD != ""){
         		$scope.countD += $scope.pkD*1;
         	}
         	if($scope.tqbfzbjD != ""){
         		$scope.countD += $scope.tqbfzbjD*1;
         	}
         	if($scope.sjD != ""){
         		$scope.countD += $scope.sjD*1;
         	}
         	if($scope.jjfD != ""){
         		$scope.countD += $scope.jjfD*1;
         	}
         	if($scope.yeD != ""){
         		$scope.countD += $scope.yeD*1;
         	}
         }
         
         /**
          * 查询季度账单详细信息
          * @billType   账单类型
          * @tmpContNo  账单号
          */
         $scope.searchBillDetail = function(billType, tmpBillNo , user, lan) {
            	$scope.showBusy(true);
                billService.searchBillDetail(billType, tmpBillNo , user, lan).then(
                    function(data){
                    	$scope.billList = data;
                   		console.log("searchBillDetail : " + data);
                   		$scope.showBusy(false);
                   		$scope.dealBillData();
                   		$scope.contDJ();
                    },
                    function(code){
                    	$scope.billList = [];
                    	//pagination.totalItems = 0;
                        throw(code);
                        alert("查询失败!");
                    }
                );
            };

        //返回
        $scope.closeBillP = function(contAttr){
            $scope.closeBill(contAttr);
        };

        
        //返回
        $scope.toggle = function(){
            $scope.options.ready = false;
        }

        //暂存号和月份账单期集合
        $scope.noDate = {
            "treatyNo" : "",
            "billDate" : ""
        };


        //初始化
        var init = function(){
        
            //上传文件
            $scope.uploads=[];
            
            $scope.tmpBillNo = stateParams.tmpBillNo;
            $scope.operation = stateParams.operation;
            
            //获取数据
            $scope.searchBillDetail($scope.tmpBillNo,$scope.operation,"","");

            
        }
        init();
    }]);
});
