define(['app',
    'codes',
    'config',
    'filters',
    '/reins/page/templates/service/olive.service.code.js'
], function (app,codes,config) {

    app.registerController('listOperateCtrl', ['$scope','$filter', 'operateType',
        '$location', '$modalInstance', 'contractList', 'contractDistinguish', 'global',
        'ContractService', 'allList',
        function ($scope, $filter, operateType, $location, $modalInstance, contractList, contractDistinguish, global,
        		contractService, allList) {
        		
        	//设置状态后的合同编号显示标志位	
     		$scope.fittingFlag=false;
        		
       		//ctrl控制器的global对象声明
       		$scope.global = global;
        	
        	//控制旋转图片显示
            $scope.showBusy = function (_busy) {
                $scope.global.isBusy = _busy;
            };

            //显示那个类型合同列表
            $scope.tableShow = (contractDistinguish === 'nprop' ? true :false);
            $scope.contAttr = contractDistinguish;
            //type-->  -删除，-续转，-复制，-设置状态
            $scope.operateType = operateType;

            //选中的合同列表
            $scope.contractList = contractList;
            var contractListBack = contractList;
            var a = contractListBack;

            //获取列表的暂存号
            var getTmpContractNoList = function(){
                var tmpList = [];
                var contractNo ="";
                if($scope.operateType === "delete"){
                	var nodelete = [];
                	var data = {};
                	$.each($scope.contractList, function(index, contract){
                        if($scope.contAttr === "nprop" && contract.stateFlag === "0"){
                            tmpList.push(contract.treatyNo);
                        }else if($scope.contAttr === "nprop" && contract.stateFlag != "0"){
                        	nodelete.push(contract.treatyNo); 
                        }else if($scope.contAttr === "prop" && contract.stateFlag === "0"){
                            tmpList.push(contract.treatyNo);
                        }else if($scope.contAttr === "prop" && contract.stateFlag != "0"){
                        	nodelete.push(contract.treatyNo); 
                        }
                    });
                	data.tmpList = tmpList;
                	data.nodelete = nodelete;
                	console.log("data.tmpList's value is : " +data.tmpList);
                	return data;
                }else{
                	$.each($scope.contractList, function(index, contract){
                        if(contractDistinguish === "nprop"){
                            tmpList.push(contract.treatyNo);
                        }else{
                            tmpList.push(contract.treatyNo);
                        }
                    });
                }
                return tmpList;
            };
            
            //批量删除列表
            $scope.delet = function(){
            	var data = getTmpContractNoList();
            	if(data.tmpList.length > 0){
            		if(data.nodelete.length > 0){
                		if(!confirm("所选合同中包含非暂存类型的合同，继续将只删除暂存类型的合同！！")){
                			return null;
                		}
                	}
            		contractService.deleteContracts(contractDistinguish,data.tmpList,{}).then(
                            function(data){
                            	if(angular.isDefined(data.msg)){
                            		 alert("删除成功!");
                            		 
                            		 $modalInstance.close(contractDistinguish);
                            	}else{
                            		alert("success_删除失败!");
                            	}
                            },
                            function(code){
                                //处理失败后操作
                                alert("删除失败!");
                            }
                        );
            	}else{
            		alert("没有暂存状态的合同，删除失败！！");
            		$modalInstance.close(contractDistinguish);
            	}
                
            };
            var backStates = function(allList, tmpList){
            	var contEle = contractDistinguish === "nprop"? "tmpTreatyNo":"treatyNo";
            	var state = contractDistinguish === "nprop"? "stateFlag" : "stateFlag";
            	$.each(tmpList, function(inde, after){
            		$.each(allList, function(index , pre){
            			if(pre[contEle] === after.contractNo){
            				pre[state] = after.state;
            			}
            		});
            	});
            	return allList;
            };
            //续转
            $scope.renewal = function(){
            	$scope.renew=true;
                contractService.transferContracts(contractDistinguish,getTmpContractNoList(),{}).then(
                    function(data){
                    	if(angular.isDefined(data.msg)){
                    		alert("续转成功!续转合同暂存编号："+data.msg);
                    		 $scope.cancel();
                    		 $location.path("/contracts/"+ $scope.contAttr +"/admin");
                    		 location.reload()
//                        	$location.path("/contracts/"+ $scope.contAttr +"/"+ data.msg +"/view");
                        	
//                    		alert("续传成功!");
                    	}else{
                    		alert("续传失败!");
                    	}
                    },
                    function(code){
                        //处理失败后操作
                        alert("续传失败!");
                    }
                );
            };

            //复制
            $scope.copy = function(contractList){
            	var tmpNo = [];
            	var tmpContractNo = [];
            	if($scope.contAttr === "prop"){
            		$.each(contractList, function(index, contract){
	            		tmpNo.push(contract.treatyNo);
            		});
            	} else {
            		$.each(contractList, function(index, contract){
	            		tmpNo.push(contract.treatyNo);
            		});
            	}
                contractService.copyContracts(contractDistinguish,getTmpContractNoList(),{}).then(
                    function(data){
                    
                    	if(data.result === "success"){
                    	
                    		//遍历重组复制后生成的暂存编号
	                    	$.each(data,function(index3, data){
	                    		tmpContractNo.push(data.msg);
	                    	});
	                    	
                    		if(tmpNo.length>1){
	                            alert("合约号为: " + tmpNo +"的合约复制成功，复制后生成的新合约号分别为： " + data.msg);	                            
                    		} else {
                    			alert("合约号为" + tmpNo +"的合约复制成功，复制后生成的新合约号为" + data.msg);
    		}
                            fitting(data.msg);
                            $modalInstance.close(contractDistinguish);
                            //查询合同列表
	                		$scope.searchContract($scope.contAttr, $scope.keywords, $scope.pagination, {});
                            //$modalInstance.close(contractDistinguish);
                            
                    	}else{
                    		var reason = "未知错误！";
                    		if(data.result === "error"){
                    			reason = data.msg;
                    		}
                    		alert("暂存号为: " + tmpNo +"的记录，复制失败!原因为："+reason);
                    		$modalInstance.close(contractDistinguish);
                    	}
                    },
                    function(code){
                        //处理失败后操作
                        alert("暂存号为: " + tmpNo +"的记录，复制失败");
                    }
                );
            };
            //页面跳转
            $scope.pageJump = function(treatyNo){
            	$location.path("/contracts/"+ $scope.contAttr +"/"+ treatyNo +"/edit");

            	  $scope.cancel();
            };
            
            $scope.pageBackJump = function(){
            	$modalInstance.close(contractDistinguish);
            };
            
            //装配复制后的暂存编号
            var fitting = function(data){
            	var aim =  $scope.contAttr === "nprop" ? "tmpTreatyNo":"treatyNo";

            		$.each($scope.contractList, function(index2, list){
            			if(angular.isDefined(data[list[aim]])){
            				list.tmpContractNo = data[list[aim]];
            			}
            		});
            };
            
            //装配设置状态后的合同编号
            var fittingContractNo = function(data){
            	console.log($scope.contAttr);
            	//非比例暂存号
            	var tmpTreatyNo = [];
            	//比例暂存号
            	var tmpContNo = [];
            	//合同号
            	var tmpContractNo = [];
            	console.log(data);
           		$.each($scope.contractList, function(index2, list){
   					$.each(data, function(index, d){
   						list.tmpContractNo = d;
   						$scope.fittingFlag=true;
   					});
           		});
           		$.each(data, function(index, d){
					tmpContractNo.push(d);
				});
				console.log("init tmpContractNo is : " + tmpContractNo);
				if(tmpContractNo != ""){
	           		alert("设置状态成功! 设置状态后的暂存号对应的合同编号为： " + tmpContractNo);
				} else {
					alert("设置状态成功!");
				}
           		console.log("-----fittingContractNo");
           		console.log($scope.contractList);
            };
            
            //设置状态
            $scope.setState = function(){
                var changedContractList = [];
                $.each($scope.contractList, function(index, contract){
                    var tempContract ={};
                    if(contractDistinguish === "nprop"){
                        tempContract.contractNo = contract.treatyNo;
                        tempContract.state = contract.npropStateFlag;
                    }else{
                        tempContract.contractNo = contract.treatyNo;
                        tempContract.state = contract.propStateFlag;                        
                    }
                    changedContractList.push(tempContract);
                });
                contractService.updateContractsState(contractDistinguish,changedContractList,{}).then(
                    function(data){
                        //处理成功后操作
                        var back = backStates(allList,changedContractList);
                        //关闭窗口
                        var msg = {contAttr:contractDistinguish, lists:back};
                        fittingContractNo(data.msg);
                        $modalInstance.close(contractDistinguish);
                      //  $scope.cancel(); 
                    },
                    function(code){
                        //处理失败后操作
                        alert("设置状态失败");
                        $modalInstance.close();
                    }
                );
            };
            //根据当前的状态获取可以修改的状态
            $scope. getPropertyStates = function(input){
            	var temp = [];
            	if(input === "3"||input === "4"){
    				$.each($scope.stateFlags, function(index, t){

    					if(t.id === input || t.id === "1" || t.id === "6"){
    						temp.push(t);
    					}
    				});
    			}else{
    				$.each($scope.stateFlags, function(index, t){
    					if(parseInt(t.id) >= parseInt(input)){
    						temp.push(t);
    					}
    				});
    			}
            	return temp;
            };
            $scope.propertyStates =function(input){
                var temp = [];
                if(input === '0'){
                    $.each($scope.stateFlags, function(index, t){
                        if( t.id === "4" || t.id === "6" ||t.id === "1" || t.id === "2"){
                            temp.push(t);
                        }
                    });
                }
                if(input === "4"||input === "1"){
                    $.each($scope.stateFlags, function(index, t){
                        if(t.id === "6"||t.id === "2"){
                            temp.push(t);
                        }
                    });
                }
                return temp;
			}
            //关闭窗口
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            var setWarnings = function(){
            	$.each($scope.contractList, function(index, c){
            		if(($scope.contAttr === "nprop" && c.stateFlag != "0")||
            				($scope.contAttr ==="prop" && c.stateFlag != "0")){
            			c.warning = true;
            		}else{
            			c.warning = false;
            		}
            	});
            };
            
            
            var init = function(){
                //如果进入设置状态页面，则获取状态列表
                if($scope.operateType === "setState" ){
                    if(contractDistinguish === "nprop"){
                        $scope.stateFlags = codes["nprop.stateFlag"];
                    }else{
                        $scope.stateFlags = codes["prop.stateFlag"];
                    }
                }else if($scope.operateType ==="delete"){
                	setWarnings();
                }
                
            };

            init();
        }]);
});