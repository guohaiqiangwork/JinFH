define(['app',
	'codes']
, function (app, codes) {
    app.registerController('ExportCtrl', ['$scope','CodeService','ExportService', 
                                         function ($scope,codeService,exportService) {
    	$scope.cur = false;
    	
    	//打印
        $scope.genPrint = function(){
        	$scope.exportOut($scope.keywords, $scope.global.user, $scope.bus, "");
        };
        
     
        //重置
        $scope.reset = function(){
        	var now = new Date();
            var month = (now.getMonth() + 1);               
            if(month < 10) 
                month = "0" + month;
            var today = now.getFullYear() + "-" + month + "M";
            
            $scope.keywords = {
                    '"billState"':'0',
                    'buNo':'0',
                    'adjustFlag':'01',
                    'billPeriod':today
            };
            /*var now = new Date();
            var month = (now.getMonth() + 1);               
            if(month < 10) 
                month = "0" + month;
            var today = now.getFullYear() + '-' + month;
            $('#rePeriod').val(today);*/
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
    	
    	var init = function(){
    	
    		console.log("单证打印");
    		
    		//获取币别
            $scope.keywords = {
                id:'',
                value:''
            };
            var Key = angular.copy($scope.keywords);
            Key.id="currency";
            Key.value="";
            $scope.getCode(Key,{},"currencys");
            //获取BU
            $scope.bus = {
                    id:'',
                    value:''
                };
            var Keys = angular.copy( $scope.bus);
            Keys.id="buNo";
            Keys.value="";
            $scope.getCode(Keys,{},"prpdcompanys");
            
            
            $scope.reset();
    	};
    	
    	init();

    }]);
});