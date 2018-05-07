define(['app',
    'codes',
    'config',
    'claim/claim.event.bill.ctrl'
], function (app, codes, config) {
    app.registerController('FxoBillListCtrl', ['$scope',
        '$stateParams','$modal','$filter','$location','EventService',
        function ($scope, $stateParams, $modal, $filter,$location, eventService) {
        
         //查询事故列表
          $scope.searchEventOrRisk = function(keywords, pagination, user, lan){
          	//$scope.pagination.pageIndex = 1;
          	if($scope.keywords.billType === '0'){
          		$scope.keywords.billType = '1';
          	}else{
          		$scope.keywords.billType = '0';
          	}
             $scope.searchEvent($scope.keywords, $scope.pagination, {}, {});
            };
            
            //查询事故列表
          $scope.searchEvent = function(keywords, pagination, user, lan){
          	//$scope.pagination.pageIndex = 1;
              eventService.searchFxoBill($scope.keywords, $scope.pagination, user, lan).then(
                  function(data){
                      $scope.pagination.totalItems = data.total;
                      $scope.eventLists = data.data;
                  },
                  function(code){
                      //console.log(code);
                  }
              );
            };

            //隐藏查询列表
            $scope.hideSearchList = function (){
                $scope.hideList = true;
            };

            //查询、列表框显示
            $scope.showSearchList = function () {
                $scope.hideList = false;
            };

            //重置条件查询
            $scope.resetSearchBox = function(){
                initKeywords();
            };

             //点击全部选中时设置控制的单选按钮状态
            $scope.checkAllEvents = function (){
                $scope.checkAll = !$scope.checkAll;
                $.each($scope.events, function(index, event){
                    event.checked = $scope.checkAll;
                });
            };
            
            //显示账单
	        $scope.showBill = function (claimNo,eventCode,billType) {
	            $modal.open({
	                templateUrl: 'claim/claim.event.bill.tpl.html',
	                controller: 'FxoBillCtrl',
	                windowClass: 'modal-big',
	                resolve: {
	                	claimNo:  function(){
                    		return claimNo;
                    	},
                    	eventCode:  function(){
                    		return eventCode;
                    	},
                    	billType:  function(){
                    		return billType;
                    	},
	                	billList : function(){
	                        return $scope.billList ;
	                    }
	                }
	            });
	        };

            //初始化查询条件、
            var initKeywords = function(){
                //初始化查询条件
                $scope.keywords = {
                	billType:"1",
                    eventCode:"",
                    eventCodeType:"",
                    serialNoType:"",
                    serialNo:"",
                    cataCodeType:"",
                    cataCode:"",
                    cataNameType:"",
                    cataName:"",
                    claimNo:"",
                    claimNoType:"",
                    flag:""
                };
            };

            var init = function(){

                $scope.$on('$stateChangeStart', function(event, next) {
                    if(next.name === 'fxoBill')
                        $scope.showSearchList();
                });
                //初始化查询条件
                initKeywords();
                
                $scope.opeFlag = "queryEvent";

                //被选中的按钮个数
                $scope.selectedCount = 0;

                //分页对象
                $scope.pagination = {
                    totalItems:50,
                    pageIndex:1,
                    pageSize:10,
                    maxSize:8,
                    numPages:4,
                    previousText: config.pagination.previousText,
                    nextText: config.pagination.nextText,
                    firstText: config.pagination.firstText,
                    lastText: config.pagination.lastText
                };
                $scope.searchEvent($scope.keywords, $scope.pagination, {}, {});
            };

            init();
        }]);
});
