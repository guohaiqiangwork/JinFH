define(['app',	
], function (app,codes) {

    app.registerController('AddCtrl', ['$scope', '$filter','SettleAccService','planMain','$stateParams', '$location','$q'
        , function ($scope, $filter,settleAccService,planMain,$stateParams, $location,$q) {

            //查询字典
//            var searchFlag = true;
//            $scope.searchList = [];
//            $scope.getCode = function(keywords,user,searcher){
//                var temp = angular.copy({keywords:keywords,searcher:searcher});
//                $scope.searchList.push(temp);
//                if(searchFlag && $scope.searchList.length > 0){
//                    ralSearch();
//                }
//            };
//            var ralSearch = function(user){
//                if(searchFlag && $scope.searchList.length > 0){
//                    searchFlag = false;
//                    $scope.getCodes($scope.searchList[0].keywords,user).then(
//                        function(data){
//                            $scope[$scope.searchList[0].searcher] = data;
//                            searchFlag = true;
//                            $scope.searchList.splice(0,1);
//                            ralSearch();
//                        },
//                        function(code){
//                            console.log("error  "+code);
//                            searchFlag = true;
//                            if(angular.equals(code,"bussy")){
//                                $scope.searchList.push($scope.searchList[0]);
//                                $scope.searchList.splice(0,1);
//                            }else{
//                                $scope[$scope.searchList[0].searcher] = [];
//                                $scope.searchList.splice(0,1);
//                            }
//                            ralSearch();
//                        }
//                    );
//                }
//            };

            //切换编辑器模式
            $scope.toggleMode = function (_mode) {
            	
                $scope.operation = _mode;
            };

            //返回查询结算单
            $scope.closeSettleAcc = function () {
                var url = "/settleAccs";
                $location.path(url);
            };       
          
            
            $scope.findAcc1 = function(accNo){
//            	var deffered = $q.defer(); 
                settleAccService.queryAcc(accNo).then(
                	function(data){                 		                      		     
                             $scope.Accs=data;
                            //add by slh
                             if(data.fzAcc.accType==="00"){
                            	 data.fzAcc.accType="对内临分账单"
                             }
                             if(data.fzAcc.accType==="01"){
                            	 data.fzAcc.accType="对内合同账单"
                             }
                             if(data.fzAcc.accType==="10"){
                            	 data.fzAcc.accType="对外临分账单"
                             }
                             if(data.fzAcc.accType==="11"){
                            	 data.fzAcc.accType="对外合同账单"
                             }
                            //end by slh
                            //add by slh  把毫秒数转化为时间
                            var newTime = new Date( data.fzAcc.accDate);
                            var date="";
                            with(newTime){
                            	date = date+(getFullYear())+"-";
                            	date = date+(getMonth()+1)+"-";
                            	date = date+(getDate());
                            }
                            //data.fzAcc.accDate= newTime.toLocaleString();
                            data.fzAcc.accDate=date;
                            //slh end
                             console.log($scope.planMain);
                  	   },
                  	 function(message){

                     }
                );
            };
            //add by renshuai 
//            var queryAcc=function(accNo){
//            	console.log("两表联查"+accNo);
//            	var deffered =$q.defer();
//            	settleAccService.queryAcc(accNo).then(
//            	   function(data){
//            		   console.log("date****:"+data);
//                       deffered.resolve(data);
//            	   },
//            	   function(message){
//                       deffered.reject(message);
//                   }
//            	);
//            }
                    
            //初始化函数
            var init = function(){
                //默认隐藏条件框
//                $scope.hideSearchList();

                //默认对象初始化
//                $scope.initReinsurer();

                //数据字典初始化
//                $scope.keywords = {
//                    "id":"",
//                    "value":"",
//                	"reinsCode":""
//                };              
                
//                $scope.operation = angular.isUndefined($stateParams.operation)? 'new': $stateParams.operation;
//                $scope.settleNo  = angular.isUndefined($stateParams.settleNo)? '': $stateParams.settleNo;
            	$scope.planMain=planMain;
            	$scope.findAcc1($scope.planMain.accNo);
                
             
               
               
            };
           
            init();
        }]);
});