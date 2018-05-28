define(['app',
    'config',
    '/reins/page/templates/settle/reinsSettleAcc.list.delete.ctrl.js'
], function (app, config) {
    app.registerController('SettleAccCtrl', ['$scope', '$filter', '$q', '$modal', '$location', 'SettleAccService',
                        function ($scope, $filter, $q, $modal, $location, settleAccService) {
    	
    	//add by zhx 后台查询币种 begin
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
      //add by zhx 后台查询币种 end
        
       
    	
    	//删除选中条目
        $scope.deleteSettleAcc = function(){
        	console.log('删除');
            $modal.open({
                templateUrl: '/reins/page/templates/settle/reinsSettleAcc.list.delete.tpl.html',
                controller: 'SettleAccDeleteCtrl',
                //windowClass: 'modal-big',
                resolve: {
                    settleAccList : function () {
                        return   $filter('filter')($scope.settleAccList, {checked:true});
                    }
                }
            }).result.then(function (url) {
                $location.path(url);
                console.log($location.path(url));
                $scope.searchSettleAcc($scope.keywords, $scope.pagination, {});
            });
        };
             

//        //获得结算单详情
        $scope.querySettleAcc = function(settleNo,  user) {
            console.log('获取结算单详情' + settleNo);
           
            var deffered = $q.defer();   	
            settleAccService.querySettleAcc(settleNo, user).then(
                function(data){
                	console.log("date:"+data);
                	if(data.settleFlag==="0"){
                		data.settleFlag="付款"
                	}else{
                		data.settleFlag="收款"
                	}
                    deffered.resolve(data);
                },
                function(message){
                    deffered.reject(message);
                }
            );
            return deffered.promise;
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
     

        //根据页号查询列表
        $scope.onSelectPage = function(pageIndex){
            $scope.pagination.pageIndex = pageIndex;
            var _pagination = angular.copy($scope.pagination);
            $scope.searchReinsurer($scope.keywords,_pagination, $scope.global.user);
        };

		//查询事件
        $scope.search = function(){
        	$scope.searchTable.flag = ! $scope.searchTable.flag
        	//add by zhx
//         	if($scope.keywords.settleConfFlag === null){
//         		$scope.keywords.settleConfFlag = "";
//         	}
        	if($scope.keywords.sendFlag === null){
         		$scope.keywords.sendFlag = "";
         	}
             $scope.pagination.pageIndex = 1;

            $scope.searchSettleAcc($scope.keywords, $scope.pagination, $scope.global.user);
        };
        
        
        
        
        //add by renshuai
        $scope.getIndex = function (_index){
            return _index + 1 + ($scope.pagination.pageIndex-1) * $scope.pagination.pageSize;
        };
        //根据页号查询合同列表 add by renshuai
        $scope.onSelectPage = function(pageIndex){   
            $scope.pagination.pageIndex = pageIndex;
            var _pagination = angular.copy($scope.pagination);
            $scope.searchSettleAcc($scope.keywords, _pagination, {});
        };
        
        
        
        
        
        
        //查询账单
        $scope.searchSettleAcc= function(keywords, pagination, user){
            settleAccService.searchSettleAcc(keywords, pagination, user).then(
                function(data){
                
                    $scope.settleAccList = data.data;
                    pagination.totalItems = data.total;
                    
                },
                function(message){
                    //alert(message);
                }
            );
        };

        //全选按钮设置为未选中状态（不初始化为false）
        $scope.checkAll = false;

        //被选中的按钮个数
        $scope.selectedCount = 0;

        //点击全部选中时设置控制的单选按钮状态
        $scope.checkAllSettleAcc = function (){
            $scope.checkAll = !$scope.checkAll;
            $.each($scope.settleAccList, function(index, settleAcc){
            	settleAcc.checked = $scope.checkAll;
            });
        };

        //监视settleAccList中是否有元素被改变状态
        $scope.$watch('settleAccList', function(){
            if(angular.isUndefined($scope.settleAccList))
                return false;
            //监测是否有元素被选中
            var _temp = $filter('filter')($scope.settleAccList, {checked:true});
            //console.log(_temp.length);
            $scope.selectedCount = _temp.length;
            if(_temp.length === $scope.settleAccList.length)
                $scope.checkAll = true;
            else
                $scope.checkAll = false;
        },true);

        //隐藏查询列表
        $scope.hideSearchList = function (){
            $scope.hideList = true;
            //$scope.searchTable.flag = true;
        };

        //查询、列表框显示
        $scope.showSearchList = function () {
            $scope.hideList = false;
            //$scope.searchTable.flag = false;
        };
        //初始化查询条件
        $scope.initKeywords = function (){
            $scope.keywords = {
                "settleNo":'',
                "settleNoFlag":'=',
                "payCode":'',
                "payCodeFlag":'=',
                'currency':'',
                "currencyFlag":'=',
                "settleConf":"",
               // "settleConfFlag":"=",
                "sendFlag":"=",
                "operateDate":"",
                "operateDateFlag":"="
               
            };
            return $scope.keywords;
        };
        //重置查询条件
        $scope.resetSearchTable = function(){
            $scope.initKeywords();
        };

        var init = function () {
        
            $scope.initKeywords();//初始化条件查询页面
          

            //数据字典差寻条件 add by zhx
            $scope.keywords = {
                "id":"",
                "value":"",
                "other1":"",
                "settleNo":'',
                "settleNoFlag":'=',
                "payCode":'',
                "payCodeFlag":'=',
                'currency':'',
                "currencyFlag":'=',
                "settleConf":"",
                //"settleConfFlag":"",
                "sendFlag":"",
                "operateDate":"",
                "operateDateFlag":"="
            };
          // add by zhx 查询币种
            var key = angular.copy($scope.keywords);
            key.id="currency";
            key.value="";
            $scope.getCode(key,{},"currencys");
            
            //分页初始化
            $scope.pagination = {
                totalItems:0,
                pageIndex:1,
                pageSize:10,
                maxSize:4,
                numPages:4,
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };
            
            
            $scope.searchSettleAcc($scope.keywords, $scope.pagination, {});

        };

        init();

    }]);
});