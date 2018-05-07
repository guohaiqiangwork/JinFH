define(['app',
	'codes',	
	'/reins/page/templates/settle/editor/reinsAcc.editor.ctrl.js'
	        
], function (app,codes) {

    app.registerController('SettleAccEditorCtrl', ['$scope', 'SettleAccService', '$stateParams', '$location','$q','$modal','$filter'
        , function ($scope, settleAccService, $stateParams, $location,$q,$modal,$filter) {

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

            //切换编辑器模式
            $scope.toggleMode = function (_mode) {
            	
                $scope.operation = _mode;
            };

            //返回查询结算单
            $scope.closeSettleAcc = function () {
                var url = "/settleAccs";
                $location.path(url);
            };
            
//            .controller('SettleAccEditorCtrl',function($scope,$state){
//            	$scope.findAcc=function(accNo){
//            		$state.go('AddCtrl',{accNo:accNo});
//            	};
//            });
            $scope.findAcc = function(accNo){
            	console.log('accNo1992:'+accNo);
            	$scope.accNo1=accNo;
                $modal.open({
                    templateUrl: '/reins/page/templates/settle/editor/reinsSettleAcc.new.tpl.html',
                    controller: 'AddCtrl',
//                    windowClass: 'modal-big',
                    resolve: {
                    	planMain : function () {
                            return   $filter('filter')($scope.planMain, {checked:true});
                        }
                    	
                    }
                }).result.then(function (url) {
                    $location.path(url);
                    console.log($location.path(url));
                    $scope.queryAcc(accNo1);
                });
            };
           

          
          //获取主表信息 add by renshuai 
            $scope.queryPlanMain = function(settleNo) {
                console.log('获取主表信息' + settleNo);
                var deffered = $q.defer();   	
                settleAccService.queryPlanMain(settleNo).then(
                    function(data){
                    	console.log("date:"+data);
                    	
                        deffered.resolve(data);
                    },
                    function(message){
                        deffered.reject(message);
                    }
                );
                return deffered.promise;
            };

            //add by renshuai 
//            $scope.queryAcc = function(accNo){
//            	var deffered = $q.defer(); 
//                settleAccService.queryAcc(accNo).then(
//                	function(data){                 		   
////                             deffered.resolve(data);
//                		     
//                             $scope.Accs=data;
//                             console.log($scope.Accs);
//                  	   },
//                  	 function(message){
////                         deffered.reject(message);
//                     }
//                );
//            };
        
           
            //初始化函数
            var init = function(){
                //默认隐藏条件框
                $scope.hideSearchList();

                //默认对象初始化
//                $scope.initReinsurer();

                //数据字典初始化
                $scope.keywords = {
                    "id":"",
                    "value":"",
                	"reinsCode":""
                };

              
                
                
                $scope.operation = angular.isUndefined($stateParams.operation)? 'new': $stateParams.operation;
                $scope.settleNo  = angular.isUndefined($stateParams.settleNo)? '': $stateParams.settleNo;
                $scope.accNo     = angular.isUndefined($stateParams.accNo)? '': $stateParams.planMain.accNo;
                console.log("111**** : " + $scope.operation); 
                
                //编辑，查看
                if( $scope.operation === 'view') {
                    console.log("-------------------");
                    console.log("000000:"+ $scope.settleNo);
                    $scope.querySettleAcc($scope.settleNo)
                        .then(
                        function(data){
                        	console.log("后台--前台");
                            $scope.settleAcc = data;
                           
                        	console.log(data);
                        	
                            console.log("$scope.getSettleAcc's value is :"+$scope.settleAcc);
                        }
                        
                    );
                    $scope.queryPlanMain($scope.settleNo)
                    .then(
                  		function(data){
                  			console.log("查询PlanMain////////");
                  			console.log(data);
                  			$scope.planMain=data;
                  			console.log("$scope.getSettleAcc's value is :"+$scope.planMain);
                  		}  );
                   
                    //add by renshuai 
                    
                }
                if($scope.operation === 'new'){
                	console.log("renshuai*********:"+$scope.accNo);
                	$scope.queryAcc($scope.accNo)
//                	.then(
//	                		function(data){
//	                			console.log("后台传递参数");
//	                			$scope.Acc=data;
//	                		}		
//                	);
                	
                } 
             
               
               
            };
           
            init();
        }]);
});