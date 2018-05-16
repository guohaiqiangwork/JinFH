define(['app',
    'codes',
    '/reins/page/templates/service/olive.service.contract.js'
], function (app, codes) {

    app.registerController('exclusionCtrl', ['$scope', '$filter', '$modalInstance', 'ContractService', 'contAttr','risk' 
                                             , 'CodeService', '$timeout', 'operation', 'effected'
        , function ($scope, $filter, $modalInstance ,contractService, contAttr, risk ,codeService, 
        		$timeout, operation, effected) {

    		//全选左侧列表
    		$scope.checkAllLeft = function(){
    			$timeout(function(){
	    			$.each($scope.leftExclusions, function(index, e){
	    				e.check = $scope.check.leftCheckAll;
	    			});
    			},5);
    		};
    		//子按钮控制左全选按钮的是否选中
    		$scope.checkLeft = function(l){
    			$timeout(function(){
    				if(angular.isDefined(l) && !l.check){
    					$scope.check.leftCheckAll = false;
    				}else{
    					var count = 0;
    					$.each($scope.leftExclusions, function(index, e){
    						if(e.check)
    	    					count ++;
    	    			});
    					if(count === $scope.leftExclusions.length)
    						$scope.check.leftCheckAll = true;
    					else
    						$scope.check.leftCheckAll = false;
    				}
    			});
    		};
    		//全选右侧列表
    		$scope.checkAllRight = function(){
    			$timeout(function(){
    				$.each($scope.rightExclusions, function(index, e){
    					e.check = $scope.check.rightCheckAll;  
    				});
    			},5);
    		};
    		//子按钮控制右全选按钮的是否选中
    		$scope.checkRight = function(r){
    			$timeout(function(){
    				if(angular.isDefined(r) && !r.check){
    					$scope.check.rightCheckAll = false;
    				}else{
    					var count = 0;
    					$.each($scope.rightExclusions, function(index, e){
    						if(e.check)
    	    					count ++;
    	    			});
    					if(count === $scope.rightExclusions.length)
    						$scope.check.rightCheckAll = true;
    					else
    						$scope.check.rightCheckAll = false;
    				}
    			});
    		};
            //向除外责任右侧列表添加选中数据
            $scope.addExclusion = function(){
                 var temp = $filter('filter')($scope.leftExclusions,{check : true});
                /*$.each(temp,function(index, r){
                    exclusion.check = false;
                    $scope.rightExclusions.push(r);
                });*/
                 if(temp.length==0){
                	 alert("您没有选择任何除外责任，请选择！");
                	 return ;
                 }
                 if($scope.rightExclusions!=undefined){
                	 for(var i=0;i<temp.length;i++){
                		 $scope.rightExclusions[$scope.rightExclusions.length]=temp[i];
                	 }
                 }else{
                	 $scope.rightExclusions=temp;
                 }
                
                $scope.leftExclusions = dropGiven($scope.leftExclusions,temp);
                $scope.checkRight();
                $scope.checkLeft();
            };

            /*
             *从已有数据中删除给定的数据
             *preExclusions  已有数据
             * given        待删除数据
             */
            var dropGiven = function(preExclusions, given){
                $.each(given, function(index, exclusion){
                    exclusion.check = false;
                    $.each(preExclusions, function(num, hold){
                        if(angular.isDefined(hold) && hold.id === exclusion.id){
                            preExclusions.splice(num,1);
                        }
                    });
                });
                return preExclusions;
            };

            //删除右侧列表选中数据
            $scope.delExclusion = function(){
                var temp = $filter('filter')($scope.rightExclusions,{check : true});
                if(temp.length==0){
               	 alert("您没有选择任何除外责任，请选择！");
               	 return ;
                }
                $.each(temp,function(index, exclusion){
                    exclusion.check = false;
                    $scope.leftExclusions.push(exclusion);
                });
                $scope.rightExclusions = dropGiven($scope.rightExclusions,temp);
                $scope.checkRight();
                $scope.checkLeft();
            };

            //保存右侧的列表
            $scope.saveExclusion = function(sectionNo){
                var exclusions =[];
                var element ={};
                $.each($scope.rightExclusions, function(index, exclusion){
                    if(contAttr === "prop"){
                        element = angular.copy(contractService.getElement("propExclusion"));
                        element.itemKind = exclusion.id;
                        element.itemKindDesc = exclusion.value;
//                        element.tmpContNo = risk.tmpContNo;
//                        element.contNo = risk.contNo;
                        exclusions.push(element);
                    }else{
                        element = angular.copy(contractService.getElement("npropExclusion"));
                        element.id.itemKind = exclusion.id;
                        exclusions.push(element);
                    }
                });
                if($scope.contAttr === 'prop'){
                	console.log(risk.fhSectionList.length);
                	for(var i= 0;i<risk.fhSectionList.length;i++){
                		if(risk.fhSectionList[i].sectionNo==sectionNo){
                			console.log(i+":"+risk.fhSectionList[i]);
                			risk.fhSectionList[i].fhExItemKindList = angular.copy(exclusions);
                			/*if(!risk.fhSectionList[i].fhExItemKindList){
                				risk.fhSectionList[i].fhExItemKindList = angular.copy(exclusions);
                			}else{
                				risk.fhSectionList[i].fhExItemKindList.splice( 0, risk.fhSectionList[i].fhExItemKindList.length);
                				
                			}*/
                			
                            
                		}
                	}
                	
                   
                }else{
                    risk.fhxExItemKindList.splice( 0, risk.fhxExItemKindList.length);
                    risk.fhxExItemKindList = angular.copy(exclusions);
                }

                $modalInstance.close(risk);
                console.log(risk);
            };

            //关闭选择框
            $scope.cancel = function(){
                $modalInstance.close();
            };
            //格式化工具
            var format= function(exclusions){

                var right = [];
                if($scope.contAttr === "prop"){
                    $.each(exclusions.fhExItemKindList, function(index, tmp){
                        $.each($scope.allExclusions,function(num, all){
                            if(all.id === tmp.objTypeCde){
                                var temp = {"id":"","value":"", "check": false};
                                temp.id = all.id;
                                temp.value = all.value;
                                right.push(temp);
                            }
                        });
                    });
                }else if($scope.contAttr === "nprop"){
                    $.each(exclusions.fhxExItemKindList, function(index, tmp){
                        $.each($scope.allExclusions,function(num, all){
                            if(all.id === tmp.id.itemKind){
                                var temp = {"id":"","value":"", "check": false};
                                temp.id = all.id;
                                temp.value = all.value;
                                right.push(temp);
                            }
                        });
                        }
                    );
                };
                return right;
            };
            //查询字典
            $scope.getCode = function(keywords, user ,searcher){
                codeService.getCodes(keywords, user).then(
                    function(data){
                        $scope[searcher] = angular.copy(data);
                    },
                    function(code){
                        $scope[searcher] = [];
                    }
                );
            };
            var init = function(){
                //初始化合同类型
                $scope.contAttr = contAttr;
                $scope.operation = operation;
                //是否是生效合同标志
                $scope.effected = effected;
                
                $scope.keywords={
                    "id" : "",
                    "value":""
                };
                //控制左右全选按钮
                $scope.check={};
                //除外责任所有值
                $scope.keywords.value = "";
                $scope.keywords.id ="objType";
                $scope.getCode($scope.keywords, {},"allExclusions");



                //初始化除外责任两侧列表
                var watchFull = $scope.$watch("allExclusions", function(){
                    if(angular.isDefined($scope.allExclusions)){
                        //除外责任左侧列表所有可能值
                        $scope.leftExclusions =angular.copy($scope.allExclusions);
                        $.each($scope.leftExclusions,function(index, t){
                            t.check = false;
                        });
                        //除外责任右侧列表
                        $scope.rightExclusions = format(risk);
                        //除外责任左侧列表初始化
                        $scope.leftExclusions = dropGiven($scope.leftExclusions,$scope.rightExclusions);
                        //注销监视
                        watchFull = null;
                    }
                });



            };
            init();
    }]);
});