define(['app',
    'config',
    'retention/editor/retention.list.delete.ctrl'
], function (app, config) {
    app.registerController('RetentionListCtrl', ['$scope', '$stateParams', '$filter', 'RetentionService', '$q', '$modal', '$location',
        function ($scope, $stateParams, $filter, retentionService, $q, $modal, $location) {

            //删除选中条目
            $scope.deleteRetention = function(){
                $modal.open({
                    templateUrl: 'retention/editor/retention.list.delete.tpl.html',
                    controller: 'RetentionDeleteCtrl',
                    //windowClass: 'modal-big',
                    resolve: {
                        retentionList : function () {
                            return   $filter('filter')($scope.retentionList, {checked:true});
                        }
                    }
                });
            };
            
            //日期格式化yyyy-MM-dd
			$scope.fomatTimeYNR = function(time){ 
				//var oldTime = (new Date("2011/11/11 20:10:10")).getTime(); //得到毫秒数  
				console.log("init time is : " + time);
				var now = new Date(time); //就得到普通的时间了 
				//var now = time;
				var year = now.getFullYear();       //年
				var month = now.getMonth() + 1;     //月
				var day = now.getDate();            //日
				var clock = year + "-";
				if(month < 10)
					clock += "0";
				clock += month + "-";
				if(day < 10)
					clock += "0";
				clock += day;
				
				console.log("time is : " + clock);
				return(clock); 
			}
            
            //获得自留额详情
            $scope.getDetail = function(retention){
            	$scope.retentionKeyword = {
			            	"id": {
			                        "riskLevel":"",
			                        "riskCode":"",
			                        "effcTm":"",
			                        "riskClass":""
			                    },
			                "expdTm" : ""    
                };
                
                $scope.retentionKeyword.id.riskLevel = retention.id.riskLevel;
                $scope.retentionKeyword.id.riskCode = retention.id.riskCode;
                $scope.retentionKeyword.id.effcTm = $scope.fomatTimeYNR(retention.id.effcTm.time);
                $scope.retentionKeyword.expdTm = $scope.fomatTimeYNR(retention.expdTm.time);
                $scope.retentionKeyword.id.riskClass = retention.id.riskClass;
            	//$scope.queryRetention(retentionKeyword,  $scope.global.user);
            	$location.path("/admin/retentions/view");
            }

            //显示查询列表框
            $scope.showSearchList = function(){
                $scope.hideList = false;
				//$scope.showSearch = false;
            }

            //隐藏查询列表框
            $scope.hideSearchList = function(){
                $scope.hideList = true;
                //$scope.showSearch = true;
            }

            //根据页号查询自留额列表
            $scope.onSelectPage = function(pageIndex){
            
//            	$scope.pagination.pageIndex = pageIndex;
//                var _pagination = angular.copy($scope.pagination);
//                $scope.searchRetention($scope.keywords, $scope.pagination, {});
            
            	//点下一页查询结果由返回第一页异常处理
                $scope.pagination.pageIndex = pageIndex;
                var _pagination = angular.copy($scope.pagination);
                $scope.searchRetention($scope.keywords, _pagination, {});
            };

            //显示最左侧合约在结果中排号
            $scope.getIndex = function (_index){
                return _index + 1 + ($scope.pagination.pageIndex-1) * $scope.pagination.pageSize;
            };

            //条件查询
            $scope.search = function(){
                $scope.searchRetention($scope.keywords,$scope.pagination,{});
            }

            //查询自留额
            $scope.searchRetention = function(keywords, pagination, user){
                retentionService.searchRetention(keywords, pagination, user).then(
                    function(data){
                    	if(angular.isUndefined(data.result)){
	                        console.log(data.data);
	                        $scope.retentionList = data.data;
	                        pagination.totalItems = data.total;
                    	} else if(data.result === "error"){
                    		alert("查询失败！ " + data.msg);
                    	}
                        //console.log("retentionList's value is : " + $scope.retentionList);
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
            $scope.checkAllRetentions = function (){
                $scope.checkAll = !$scope.checkAll;
                $.each($scope.retentionList, function(index, retention){
                    retention.checked = $scope.checkAll;
                });
            };

            //监视retentionList中是否有元素被改变状态
            $scope.$watch('retentionList', function(){
                //监测是否有元素被选中
                if(angular.isUndefined($scope.retentionList))
                    return false;
                var _temp = $filter('filter')($scope.retentionList, {checked:true});
                //console.log(_temp.length);
                $scope.selectedCount = _temp.length;
                if(_temp.length === $scope.retentionList.length)
                    $scope.checkAll = true;
                else
                    $scope.checkAll = false;
            },true);

            //初始化查询条件
            $scope.initKeywords = function(){
                $scope.keywords = {
                    "id": {
                        "riskLevel":"",
                        "riskCode":"",
                        "effcTm":"",
                        "riskClass":""
                    },
                    "expdTm" : ""
                };
            }

            //重置查询条件
            $scope.resetSearchBox = function(){
                $scope.initKeywords();
            }

            var init = function () {

                $scope.initKeywords();//初始化查询条件

                $scope.$on('$stateChangeStart', function(event, next) {
                    if(next.name === 'admin.retention')
                        $scope.showSearchList();
                    if(next.name === 'admin.retention.operation' ||  next.name === 'admin.retention.new')
                        $scope.hideSearchList();
                });
				
                $scope.Retentions = [];

                //分页变量初始化
                $scope.pagination = {
                    totalItems:0,
                    pageIndex:1,
                    pageSize:10,
                    maxSize:8,
                    numPages:4,
                    previousText: config.pagination.previousText,
                    nextText: config.pagination.nextText,
                    firstText: config.pagination.firstText,
                    lastText: config.pagination.lastText
                };

                $scope.searchRetention($scope.keywords, $scope.pagination, {});
            };

            init();

        }]);
});
