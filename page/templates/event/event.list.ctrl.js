define(['app',
    'codes',
    'config',
    'event/editor/event.list.delete.ctrl',
    'event/editor/event.share.ctrl'
], function (app, codes, config) {

    app.registerController('EventListCtrl', ['$scope',
        '$stateParams','$modal','$filter','$location','EventService',
        function ($scope, $stateParams, $modal, $filter,$location, eventService) {

            //$scope.temp = [{"id":"100000001","value":"测试"},{"id":"200000002"},{"id":"3000000003"}];
            //隐藏查询列表
            $scope.hideSearchList = function (){
                $scope.hideList = true;
            };

            //查询、列表框显示
            $scope.showSearchList = function () {
                $scope.hideList = false;
            };

             //查询事故列表
            $scope.searchEvent = function(keywords, pagination, user, lan){
            	//$scope.pagination.pageIndex = 1;
                eventService.searchEvent($scope.keywords, $scope.pagination, user, lan).then(
                    function(data){
                        $scope.pagination.totalItems = data.total;
                        $scope.eventLists = data.data;
                    },
                    function(code){
                        //console.log(code);
                    }
                );
            };

            //重置条件查询
            $scope.reset = function(){
                initKeywords();
            };

             //点击全部选中时设置控制的单选按钮状态
            $scope.checkAllEvents = function (){
                $scope.checkAll = !$scope.checkAll;
                $.each($scope.events, function(index, event){
                    event.checked = $scope.checkAll;
                });
            };

             //监视contractList中是否有元素被改变状态
             $scope.$watch('events', function(){
//                 //监测是否有元素被选中
//                 var _temp = $filter('filter')($scope.events, {checked : true});
//                 $scope.selectedCount = _temp.length;
//                 if(_temp.length === $scope.events.length)
//                     $scope.checkAll = true;
//                 else
//                     $scope.checkAll = false;
             },true);
             
             
             $scope.prepareEventShare_pre = function(eventCode,serialNo) {
             	/*$scope.eventCodeParam = eventCode;
             	$scope.serialNoParam = serialNo;
                $location.path("/events/prepareEventShare");*/
            	$scope.opeFlag = "prepareEventShare";
                eventService.serarchContract(eventCode, serialNo, "", "").then(
	                function(data){
	                    $scope.claimShare = data;
	                },
	                function(code){
	                	alert('分摊失败!');
	                }
                );
             };
             
             /**
              * 生成超赔事故分摊账单
              */
             $scope.genEventShare = function(claimShare){
                 var fhxLayerVoList =  $filter('filter')(claimShare.fhxLayerVoList, {checked:true});
                 
                 eventService.genEventShare(claimShare, fhxLayerVoList, {}, {}).then(
                     function(data){
                     	if(data.result==="success"){
                     		alert("create bill success!");
                     	}else{
                     		alert('create bill error!' + data.msg);
                     	}
                     },
                     function(code){
                         alert('create bill error!' + code.msg);
                     }
                 );
             };

             //删除事故
            $scope.delEvent = function (eventCode,serialNo) {
                if(confirm("确认删除吗？")){
                    eventService.deleteEvent(eventCode,serialNo,{}, {}).then(
                        function(data){
                            console.log("delete success");
                            //console.log(data);
                        },
                        function(code){
                            throw(code);
                        }
                    );
                }
             };

             //根据页码查询
            $scope.onSelectPage = function(pageIndex){
                $scope.pagination.pageIndex = pageIndex;
                var _pagination = angular.copy($scope.pagination);
                $scope.getEvents($scope.keywords, $scope.pagination, {}, {});
            };

            //初始化查询条件、
            var initKeywords = function(){
                //初始化查询条件
                $scope.keywords = {
                    eventCode:"",
                    serialNo:"",
                    cataCode:"",
                    cataName:"",
                    flag:""
                };
            };

            var init = function(){

                $scope.$on('$stateChangeStart', function(event, next) {
                    if(next.name === 'event')
                        $scope.showSearchList();
                    if(next.name === 'event.operation')
                        $scope.hideSearchList();
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
