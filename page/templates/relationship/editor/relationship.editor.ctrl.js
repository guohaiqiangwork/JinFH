define(['app',
	'config',
	'/reins/page/templates/service/olive.service.relationship.js'
], function (app,config) {

    app.registerController('RelationshipEditorCtrl', ['$scope','$stateParams','$location', 'RelationshipService',
         function ($scope, $stateParams ,$location,relationshipService) {
         
    	$scope.searchTreaytNo=function(relationship,treatyNo){
    		relationship.treatyNo=treatyNo.id;
    		relationship.treatyName=treatyNo.value;
    	}
       //返回  
       $scope.comeBack = function(){
    	
   			 
   			 $location.path("/relationships");
   			 //初始化关系列表
   			 $scope.searchRelationship($scope.keywords, $scope.pagination, {});
   		
  		   
       }
    
       
       
        //新建合同关系
        var createRelationship = function(){
       			relationshipService.createRelationship($scope.relationship,{}).then(
        					function(data){
        						if(data.result === "success"){
//                		var msg = data.msg.split(",");
//                		var treatyNo = (msg[0].split(":"))[1];
//                		var uwYear = ((msg[1].split(":"))[1]).substring(0, ((msg[1].split(":"))[1]).length -1);
        							var treatyNo = data.msg.treatyNo;
        							var uwYear = data.msg.uwYear;
        							alert("保存成功！业务年度为："+uwYear+" 合同编号为："+treatyNo);
        							var url="/relationships";
        							$location.path(url);
//                        $location.path("/relationships/" + uwYear + treatyNo +"/view");
        						}else{
        							alert("保存失败！"+data.msg);
        						}
        						
        					},
        					function(code){
        						alert("网络错误！保存失败!");
        						
        						//  console.log("---------save relationship  error reason " + code);
        					}
        			);
        	
        };
		 //add by renshuai 校验
		        
				var check =function(treatyNo,priorityNo){                   
					  relationshipService.checked(treatyNo,priorityNo).then(
				                function(data){				               
				                if(data.result === "success"){				                	
				                	alert("该合同已存在！");
				                	$location.path("/relationships");			                		
				                }else{				                	
				                	createRelationship();
				                }
				                
				                }				               				                
				           );					  				 
				  } 
         
        //更新合同关系
        var updateRelationship = function(){
            relationshipService.updateRelationship($scope.relationship,{}).then(
                    function(data){
                    	if(data.result === "success"){
                    		var treatyNo = data.msg.treatyNo;
                    		var uwYear = data.msg.uwYear;
                    		alert("保存成功！业务年度为："+uwYear+" 合同编号为："+treatyNo);
                    	    $location.path("/relationships");                  		
//                       $location.path("/relationships/" + uwYear + treatyNo +"/view");
                    		
                    	}else{
                    		alert("保存失败！"+data.msg);
                    	}
                       
                    },
                    function(code){
                        alert("网络错误！保存失败!");
                        
                      //  console.log("---------save relationship  error reason " + code);
                    }
                );
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
        //查询时需要返回值 
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
        //查看页面进行编辑
        $scope.toggleOperation = function(op){
        	$scope.operation = op;
        };
        //点击保存按钮后判断操作
        $scope.saveRelationship = function(operation){
            if($scope.operation === "new"){   
            	console.log("$scope.relationship.treatyNo:**"+$scope.relationship.treatyNo);
            	check($scope.relationship.treatyNo,$scope.relationship.priorityNo);           	
            }else if($scope.operation === "edit"){
                updateRelationship();
            }
        };

        //获取合同关系详情 方法
        var getRelationship = function(keywords, user){
            relationshipService.queryRelationship(keywords, user).then(
                function(data){
                    console.log(data);
                    $scope.relationshipList = data;
                    
                },
                function(code){
                    alert("获取合同关系数据失败！");
                    //console.log("-----------get relationship      error  "+code);
                }
            )
        };
        //add by renshuai
        $scope.ship = function(treatyNo,uwYear){
            relationshipService.getRelation(treatyNo,uwYear).then(
                function(data){
                    $scope.relationship = data;
                  
                },
                function(message){
                    
                }
            );
        };
        
      
        
        var init = function(){
//            $scope.relationshipList=relationshipList;
            //默认隐藏条件框
            $scope.hideSearchList();

            $scope.relationship={
            	"uwYear":'',
                "treatyNo":'',
                "priorityNo": '',
                "treatyName": ''
            };
            
          //适用于合同编号一级下拉菜单 add by zhx begin
            var key = angular.copy($scope.keywords);
            key.id="treatyNo";
            key.value = "";
            $scope.getCode(key,{},"treatyNos");
          //适用于合同编号一级下拉菜单 add by zhx end
            
            //初始化查询框
            $scope.resetSearchBox();

            //接收要进行的操作类型
            $scope.operation = $stateParams.operation;
           /* $scope.title ={
                "edit":"编辑",
                "new" : "新建",
                "view" : "查看"
            };*/
            //如果不是新建，则获取详情
           
            if($scope.operation != "new"){
                //接收要显示的关系的主键
                console.log($stateParams.relationshipNo);
                $scope.relationship.uwYear = $stateParams.relationshipNo.substring(0,4);
                $scope.relationship.treatyNo = $stateParams.relationshipNo.substring(4,$stateParams.relationshipNo.length);
                
                //add by renshuai
                $scope.ship($scope.relationship.treatyNo,$scope.relationship.uwYear);
                getRelationship($scope.relationship,{});
            }
        };
        
        init();

    }]);

});