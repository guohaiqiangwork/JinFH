define(['app',
    'config',
    '/reins/page/templates/relationship/editor/relationship.delete.ctrl.js',
//    '/reins/page/templates/relationship/editor/relationship.editor.ctrl.js'
], function (app,config) {
    app.registerController('RelationshipListCtrl', ['$scope', '$filter', '$modal', '$location', 'RelationshipService'
        , function ($scope, $filter, $modal, $location, relationshipService) {

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

        //根据页号查询合同列表
        $scope.onSelectPage = function(pageIndex){
       //     $scope.pagination.pageIndex = pageIndex;
       		//点下一页查询结果由返回第一页异常处理
            $scope.pagination.pageIndex = pageIndex;
            var _pagination = angular.copy($scope.pagination);
            $scope.searchRelationship($scope.keywords, _pagination, {});
       
       
//            var page = angular.copy($scope.pagination);
//            page.pageIndex = pageIndex;
//            $scope.pagination = page;
//            $scope.searchRelationship($scope.keywords, $scope.pagination, {});
        };

        //显示最左侧合同在结果中排号
        $scope.getIndex = function (_index){
            return _index + 1 + ($scope.pagination.pageIndex-1) * $scope.pagination.pageSize;
        };

        //查询合同关系
        $scope.searchRelationship = function(keywords, pagination, user){
        	$scope.showSearch = false;
            //$scope.pagination.pageIndex = 1;
            relationshipService.searchRelationship(keywords, pagination, user).then(
                function(data){
                    $scope.relationshipList = data.data;
                    pagination.totalItems = data.total;
                },
                function(message){
                    console.log("-----------------searchRelationship   error : "+message);
                }
            );
        };

        // 合同关系管理--重置
        $scope.resetSearchBox = function(){
            $scope.keywords = {
            		"uwYear":'',
	            	"treatyNo":''
            };
        };
        
        //删除选中条目
        
        $scope.deleteRelationships = function(){
        	 var relationList = $filter('filter')($scope.relationshipList, {checked:true});
        	 if(relationList.length == 0){
       		  alert("请选择一条记录");
       		  return;
       	  }
            $modal.open({
                templateUrl: '/reins/page/templates/relationship/editor/relationship.delete.tpl.html',
                controller: 'deleteRelationshipCtrl',
                //windowClass: 'modal-big',
                resolve: {
                    relationshipList : function () {
                        return   $filter('filter')($scope.relationshipList, {checked:true});
                    }
                }
            }).result.then(function (url) {
                    $location.path(url);
                    console.log($location.path(url));
                    $scope.searchRelationship($scope.keywords, $scope.pagination, {});
                });
        };

        //全选按钮设置为未选中状态（不初始化为false）
        $scope.checkAll = false;

        //被选中的按钮个数
        $scope.selectedCount = 0;

        //点击全部选中时设置控制的单选按钮状态
        $scope.checkAllRelationships = function (){
            $scope.checkAll = !$scope.checkAll;
            $.each($scope.relationshipList, function(index, relationship){
                relationship.checked = $scope.checkAll;
            });
        };
        
        
        

        //监视relationshipList中是否有元素被改变状态
        $scope.$watch('relationshipList', function(){
            if(angular.isUndefined($scope.relationshipList))
                return false;
            //监测是否有元素被选中
            var _temp = $filter('filter')($scope.relationshipList, {checked:true});
            $scope.selectedCount = _temp.length;
            if(_temp.length === $scope.relationshipList.length)
                $scope.checkAll = true;
            else
                $scope.checkAll = false;
        },true);
        
        var init = function () {
        	
        	console.log("relationship--init----");
        	$scope.showSearch = false;
            $scope.$on('$stateChangeStart', function(event, next) {
                if(next.name === 'admin.relationship')
                    $scope.showSearchList();
                if(next.name === 'admin.relationship.operation' ||  next.name === 'admin.relationship.new')
                    $scope.hideSearchList();
            });


            $scope.relationships = [];

            console.log(config);

            //分页对象
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
            //add by renshuai
//            $scope.getParameter();
            //初始化查询框
            $scope.resetSearchBox();

            //初始化关系列表
            $scope.searchRelationship($scope.keywords, $scope.pagination, {});
        };
        init();
    }]);
});