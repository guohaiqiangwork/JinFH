define(['app',
    'config',
    '/reins/page/templates/reinsurer/editor/reinsurer.list.delete.ctrl.js'
    
], function (app, config) {
    app.registerController('ReinsurerListCtrl', ['$scope', '$filter', '$q', '$modal', '$location', 'ReinsurerService',
                        function ($scope, $filter, $q, $modal, $location, reinsurerService) {

        //删除选中条目
        $scope.deleteReinsurer = function(){
 
        	var reinsurerList = $filter('filter')($scope.reinsurerList, {checked:true});
        	if(reinsurerList.length == 0){
        		alert("请选择一条记录");
        		return;
        	}
            $modal.open({
                templateUrl: '/reins/page/templates/reinsurer/editor/reinsurer.list.delete.tpl.html',
                controller: 'ReinsurerDeleteCtrl',
                //windowClass: 'modal-big',
                resolve: {
                    reinsurerList : function () {
                        return   $filter('filter')($scope.reinsurerList, {checked:true});
                    }
                }
            }).result.then(function (url) {
                $location.path(url);
                console.log($location.path(url));
                $scope.searchReinsurer($scope.keywords, $scope.pagination, {});
            });
        };                   

        //获得再保人详情
        $scope.queryReinsurer = function(reinsurerNo,  user) {
            console.log('获取再保人详情' + reinsurerNo);
            var deffered = $q.defer();
            reinsurerService.queryReinsurer(reinsurerNo, user).then(
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

        //根据页号查询再保人列表
        $scope.onSelectPage = function(pageIndex){
            $scope.pagination.pageIndex = pageIndex;
            var _pagination = angular.copy($scope.pagination);
            $scope.searchReinsurer($scope.keywords,_pagination, $scope.global.user);
        };

		//查询事件
        $scope.search = function(){
        	$scope.searchTable.flag = ! $scope.searchTable.flag
            $scope.searchReinsurer($scope.keywords, $scope.pagination, $scope.global.user);
        };
        
        //显示最左侧合同在结果中排号
        $scope.getIndex = function (_index){
            return _index + 1 + ($scope.pagination.pageIndex-1) * $scope.pagination.pageSize;
        };
        
        //查询再保人
        $scope.searchReinsurer = function(keywords, pagination, user){
            reinsurerService.searchReinsurer(keywords, pagination, user).then(
                function(data){
                    console.log("返回数据"+data.data);
                    $scope.reinsurerList = data.data;
                    pagination.totalItems = data.total;
                    console.log("reinsurerList's value is : " + $scope.reinsurerList);
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
        $scope.checkAllReinsurers = function (){
            $scope.checkAll = !$scope.checkAll;
            $.each($scope.reinsurerList, function(index, reinsurer){
                reinsurer.checked = $scope.checkAll;
            });
        };

        //监视reinsurerList中是否有元素被改变状态
        $scope.$watch('reinsurerList', function(){
            if(angular.isUndefined($scope.reinsurerList))
                return false;
            //监测是否有元素被选中
            var _temp = $filter('filter')($scope.reinsurerList, {checked:true});
            //console.log(_temp.length);
            $scope.selectedCount = _temp.length;
            if(_temp.length === $scope.reinsurerList.length)
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
                "reinsCode":'',
                "reinsCodeFlag":'=',
                "longName":'',
                "longNameFlag":'=',
                'shortName':'',
                "shortNameFlag":'=',
                "reinsType":'',
                "reinsTypeFlag":'',
                "validStatus":'',
            };
        };
        //重置查询条件
        $scope.resetSearchTable = function(){
            $scope.initKeywords();
        };

        var init = function () {
        
            $scope.initKeywords();//初始化条件查询页面
            $scope.searchTable = {
            	flag : ""
            };
            $scope.$on('$stateChangeStart', function(event, next) {
                if(next.name === 'reinsurer')
                    $scope.showSearchList();
                if(next.name === 'reinsuer.operation' ||  next.name === '.reinsurer.new')
                    $scope.hideSearchList();
            });

            $scope.Reinsurers = [];

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
            
            //查询再保人
            $scope.searchReinsurer($scope.keywords, $scope.pagination, $scope.global.user);

        };

        init();

    }]);
});