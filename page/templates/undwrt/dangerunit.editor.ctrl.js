define(['app',
	'codes',
    '/reins/page/templates/common/directives/currency.js', //日期
    '/reins/page/templates/common/directives/percentage.js', //百分比
    '/reins/page/templates/common/directives/year.js', //年份
    '/reins/page/templates/common/directives/percentage1.js' //百分比后面的小数位数是10位
], function (app,codes) {

    app.controller('RiskUnitEditorCtrl', ['$scope','$stateParams','RiskunitService','ContractService',
        function ($scope, $stateParams, riskunitService, contractService) {
        
        
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
                            console.log("error  "+code);
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
                    );
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
            //临分意向--保存
            $scope.saveFacPly = function(facPlyPays){
            
            	console.log("saveFacPly's value is coming ...");
            	console.log(facPlyPays);
            	$scope.saveFacPlyInfo($scope.certiType, facPlyPays, "", "");
            
            }

            //临分意向--保存接口
            $scope.saveFacPlyInfo = function(certiType, facPlyInfo, user, lan) {
                riskunitService.saveFacPlyInfo(certiType, facPlyInfo, user, lan).then(
                    function(data){
                        //$scope.showReinsShareList = data.data;
                        //pagination.totalItems = data.total;
                    },
                    function(code){
                        throw(code);
                        //alert(message);
                    }
                );
            };

            //增加层
            $scope.addLayer = function(riskunit) {
            	console.log("addLayer ...");
                var _section = angular.copy(contractService.getElement("intention"));
            	console.log(_section);
            	console.log(riskunit);
                riskunit.push(_section);
            }

            //删除层
            $scope.removeLayer = function(risiunit,$layer){
                if (confirm('删除层' + $layer.layerNo + "吗？")) {
                    $.each(risiunit, function (index, layer) {
                        if ($layer === layer)
                            risiunit.splice(index, 1);
                    });
                }

            }

            //增加接收人(比例)
            $scope.addRecepterProp = function(facPlyComShareVos,facComAmt,riskUnitAmt,facComProp,rate,facComAmt,facComPrm,prm) {
                var _section = angular.copy(contractService.getElement("intentionRecepterProp"));
                console.log(_section);
                console.log(facPlyComShareVos);
                facPlyComShareVos.push(_section);
				//$scope.chushihua1(facComAmt,riskUnitAmt,facComProp);
				//$scope.chushihua2(rate,facComAmt,facComPrm,prm,facComProp);
            }

            //删除接收人（比例）
            $scope.removeRecepterProp = function(facPlyComShareVoList,facPlyComShareVo){
                if(confirm("确定要删除接收人?")){
                    $.each(facPlyComShareVoList, function(index, fac){
                        if(fac === facPlyComShareVo){
                            facPlyComShareVoList.splice(index, 1);
                        }
                    });
                }
            }

            //增加最终接收人(比例)
            $scope.addFinalRecepterProp = function(facP) {
            	console.log("addFinalRecepterProp");
                var _section = angular.copy(contractService.getElement("intentionFinalRecepterProp"));
                facP.facPlyFComShareVos.push(_section);
				$scope.checkRecepterDetail("prop", facP);
            }
            
            
            
            //输入时检查接受人最终接收人
            $scope.checkRecepterDetail = function(contAttr,recepter){
            	var sum = 0.0;
            	console.log(contAttr);
            	console.log("---start---");
            	console.log(recepter);
            	console.log(recepter.feoXFReinsVos);
            	console.log("---end-----");
            	
            	if(contAttr === 'prop' && recepter.brokeFlag && recepter.facPlyFComShareVos.length > 0){
            		$.each(recepter.facPlyFComShareVos, function(index, r){
            			sum += r.facFComShareRate;
            		});
            		console.log(sum);
            		console.log(sum===recepter.facComProp);
            		if(sum === recepter.facComProp){
            			recepter.warning = false;
            		}else{
            			recepter.warning = true;
            		}
            	} else if( contAttr === 'nprop' && recepter.brokerFlag && recepter.feoXFReinsVos.length > 0){
            		$.each(recepter.feoXFReinsVos, function(index, r){
            			sum += r.shareRate;
            		});
            		console.log(sum);
            		console.log(recepter.shareRate);
            		if(sum === recepter.shareRate){
            			recepter.warning = false;
            		}else{
            			recepter.warning = true;
            		}
            	}
            };
            
            
            

            //删除最终接收人（比例）
            $scope.removeFinalRecepterProp = function(facP,facvo){
                if(confirm("确定要删除最终接收人?")){
                    $.each(facP, function(index, fac){
                        if(fac === facvo){
                            facP.splice(index, 1);
                        }
                    });
                }
            }

            //生成缴费计划（比例）
            $scope.addPlanProp = function(facPlyPays){
            
            	console.log("addPlanProp");
                console.log($scope.certiType);
                console.log(facPlyPays);
                $scope.getFacPayment("prop", $scope.certiType, facPlyPays, "", "");
            }

            //增加接收人(非比例)
            $scope.addRecepterNprop = function(layer,facComAmt,riskUnitAmt,faccomSharerate,rate,facComAmt,facComPrm,prm) {
                var _section = angular.copy(contractService.getElement("intentionRecepterNprop"));
                layer.feoXReinss.push(_section);
                //$scope.chushihua1(facComAmt,riskUnitAmt,faccomSharerate);
				//$scope.chushihua2(rate,facComAmt,facComPrm,prm,faccomSharerate);
            }

            //删除接收人（非比例）
            $scope.removeRecepterNprop = function(facP,facvo){
                if(confirm("确定要删除接收人?")){
                    $.each(facP, function(index, fac){
                        if(fac === facvo){
                            facP.splice(index, 1);
                        }
                    });
                }
            }

            //增加最终接收人(非比例)
            $scope.addFinalRecepterNprop = function(recepter) {
                var _section = angular.copy(contractService.getElement("intentionFinalRecepterNprop"));
                recepter.feoXFReinsVos.push(_section);
                $scope.checkRecepterDetail("nprop", recepter);
            }

            //删除最终接收人（非比例）
            $scope.removeFinalRecepterNprop = function(facP, facvo){
                if(confirm("确定要删除最终接收人?")){
                    $.each(facP, function(index, fac){
                        if(fac === facvo){
                            facP.splice(index, 1);
                        }
                    });
                }
            }

            //生成缴费计划（非比例）
            $scope.addPlanNprop = function(facPlyPays){
                console.log("addPlanNprop");
                console.log($scope.certiType);
                //console.log(facPlyPays.feoXPlans);
                
                $scope.getFacPayment("nprop", $scope.certiType, facPlyPays, "", "");
            }

            //临分意向--生成缴费计划
            $scope.getFacPayment = function(contAttr, certiType, facPlyInfo, user, lan) {
                riskunitService.getFacPayment(contAttr, certiType, facPlyInfo, user, lan).then(
                    function(data){
                    	console.log("---riskunit.editor.ctrl-生成缴费计划 --start--");
                    	console.log(data);
                    	if(contAttr === "nprop"){
	                    	facPlyInfo.feoXPlans = [];
	                    	$.each(data, function(index,r){
	                    		facPlyInfo.feoXPlans.push(r);
	                    	});
                    	} else {
                    		$.each(facPlyInfo.facPlyComShareVos, function(index, comShareVos){
                    			comShareVos.facPlyPays = [];
                    			$.each(data, function(index,r){
                    				console.log("---riskunit.editor.ctrl-生成缴费计划 --返回的缴费计划数据---"+r);
	                    			comShareVos.facPlyPays.push(r);
                    			});
	                    	});
                    		
                    		
                    	}
                        //$scope.showReinsShareList = data.data;
                        //pagination.totalItems = data.total;
                    },
                    function(code){
                        throw(code);
                        //alert(message);
                    }
                );
            };

            var init = function(){
                //过滤条件
                $scope.key ={
                    "riskUnitNme":''
                };
                $scope.hideSearchList();

                $scope.certiType = $stateParams.certiType;
                $scope.editType = $stateParams.editType;
                $scope.certiNo = $stateParams.certiNo;
                $scope.params = $stateParams.params;
                $scope.operation = $stateParams.operation;
                $scope.riskunit = $stateParams.params;
                console.log("--------start----");
                $scope.riskunit_ = eval('('+ $scope.riskunit +')');
                console.log($scope.riskunit_.riskUnitNo);  //风险单位号 riskUnitNo
                console.log($scope.riskunit_.riskUnitAmt);//保额 riskUnitAmt
                console.log($scope.riskunit_.prm); //保费 prm
                console.log($scope.riskunit_.rate); //费率 rate
                console.log($scope.riskunit_.coinsRate); //共保比例 coinsRate
                if($scope.riskunit_.coinsRate === null){
	                $scope.riskunit_.coinsRate = 1;
                }
                
                //$scope.chushihua1(facComAmt,$scope.riskunit_.riskUnitAmt,faccomSharerate);

                /*临分意向*/
                $scope.getFacPlyInfo($scope.certiType, $scope.certiNo, $scope.editType, $scope.global.user, {});
                //$scope.showRiskPool($scope.certiType, "1", "0", {}, {});
            };

            init();
        }]);
});
