define(['app',
	'config',
	'/reins/page/templates/service/olive.service.relationship.js'
], function (app,config) {

    app.registerController('PrintEditorCtrl', ['$scope', '$stateParams','$location', 'RelationshipService','$location',
         function ($scope, $stateParams ,$location,relationshipService,$location) {
         
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
                		var msg = data.msg.split(",");
                		var treatyNo = (msg[0].split(":"))[1];
                		var uwYear = ((msg[1].split(":"))[1]).substring(0, ((msg[1].split(":"))[1]).length -1);
                		alert("保存成功！业务年度为："+uwYear+" 合同编号为："+treatyNo);
                        $location.path("/relationships/" + uwYear + treatyNo +"/view");
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

        //更新合同关系
        var updateRelationship = function(){
            relationshipService.updateRelationship($scope.relationship,{}).then(
            		 function(data){
                     	if(data.result === "success"){
                     		var msg = data.msg.split(",");
                     		var treatyNo = (msg[0].split(":"))[1];
                     		var uwYear = ((msg[1].split(":"))[1]).substring(0, ((msg[1].split(":"))[1]).length -1);
                     		alert("更新成功！业务年度为："+uwYear+" 合同编号为："+treatyNo);
                     		$scope.operation = "view";
                     	}else{
                     		alert("更新失败！"+data.msg);
                     	}
                        
                     },
                     function(code){
                         alert("网络错误！更新失败!");
                         
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
        $scope.saveRelationship = function(){
            if($scope.operation === "new"){
                createRelationship();
            }else if($scope.operation === "edit"){
                updateRelationship();
            }
        };

        //获取合同关系详情 方法
        var getRelationship = function(keywords, user){
            relationshipService.queryRelationship(keywords, user).then(
                function(data){
                    console.log(data);
                    $scope.relationship = data;
                },
                function(code){
                    alert("获取合同关系数据失败！");
                    //console.log("-----------get relationship      error  "+code);
                }
            )
        };
        
        var init = function(){

            //默认隐藏条件框
            $scope.hideSearchList();

            $scope.relationship={
            	"uwYear":'',
                "treatyNo":'',
                "priorityNo": '',
                "treatyName": ''
            };
            
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
                getRelationship($scope.relationship,{});
            }
        };

        init();

    }]);

});