
define(['app',
    'config',
    'codes',
    '/reins/page/templates/contract/editor/contract.list.operate.ctrl.js'
    ], function (app, config,codes) {
    app.registerController('ContractNpropListCtrl', ['$scope', '$filter', '$modal', '$stateParams',
        function ($scope, $filter, $modal, $stateParams) {

            //点击全部选中时设置控制的单选按钮状态
            $scope.checkAllContracts = function (){
                $scope.checkAll = !$scope.checkAll;
                $.each($scope.contractList, function(index, contract){
                    contract.checked = $scope.checkAll;
                });
            };

            //监视contractList中是否有元素被改变状态
            $scope.$watch('contractList', function(){
                //监测是否有元素被选中
                var _temp = $filter('filter')($scope.contractList, {checked: true});
                if(angular.isDefined(_temp)){
                	$scope.selectedCount = _temp.length;
	                if(_temp.length === $scope.contractList.length)
	                    $scope.checkAll = true;
	                else
	                    $scope.checkAll = false;
                }
            },true);

            //根据页号查询合同列表
            $scope.onSelectPage = function(pageIndex){
            	if($scope.keywords.uwYear === null){
            		$scope.keywords.uwYear = "";
            	}
            	
                $scope.pagination.pageIndex = pageIndex;
                var _pagination = angular.copy($scope.pagination);
                $scope.searchContract($scope.contAttr, $scope.keywords, $scope.pagination, {});
            };

            //是否显示条件查询
            $scope.toggleSearch = function(){
                $scope.searchTableFlag = !$scope.searchTableFlag;
            };

            //条件查询
            $scope.searchContracts = function(){
            	if($scope.keywords.uwYear === null){
            		$scope.keywords.uwYear = "";
            	}
//            	add by zhx begin
            	if($scope.keywords.treatyType === null){
            		$scope.keywords.treatyType = "";
            	}
            	if($scope.keywords.stateFlag === null){
            		$scope.keywords.stateFlag = "";
            	}
                $scope.pagination.pageIndex = 1;
                $scope.searchContract($scope.contAttr, $scope.keywords, $scope.pagination, {});
            };
            //是否可以重置查询框
            var  formFlag = false;
            //重置查询框中内容
            $scope.resetSearchBox = function(){
                $scope.keywords = {
                	"uwYear":'',
               		 "treatyNo":'',
               		 "refNo":'',
               		 "startDate":'',
               		 "endDate":'',
//            		add by zhx
               		 "treatyType":'',
            		 "stateFlag":'',
            		 "treatyName":'',
            		 "optType":"",
            		 "contNoFlag":"",
            		 "refNmeFlag":"",
            		 "contNmeFlag":"",
            		 "contYearFlag":""
               		
                };
                if(formFlag)
                    searchForm.reset();
                    formFlag = true;
            };

            //初始化方法与变量
            var init = function () {

                //全选按钮设置为未选中状态（不初始化为false）
                $scope.checkAll = false;
                //合同类型
                $scope.treatyTypes = codes["nprop.treatyType"];
                //合同状态
                $scope.stateFlags = codes["nprop.stateFlag"];
                //被选中的按钮个数
                $scope.selectedCount = 0;
                $scope.operation = $stateParams.operation;
                console.log("nprop list ctrl 0606 start " + $scope.operation);
                if($scope.setStateBack != true){
	                //分页对象
	                $scope.pagination = {
	                    totalItems:0,
	                    pageIndex:1,
	                    pageSize:10,
	                    maxSize:8,
	                    numPages:4,
	                    previousText: config.pagination.previousText,
	                    nextText: config.pagination.nextText,
	                    firstText:config.pagination.firstText,
	                    lastText: config.pagination.lastText
	                };
	
	                //重置条件查询框
	                $scope.resetSearchBox();
	                if(!($scope.operation === "new" || $scope.operation === "view" || $scope.operation === "edit")){
		                //查询合同列表
		                $scope.searchContract($scope.contAttr, $scope.keywords, $scope.pagination, {});
	                }
                }else{
                	$scope.setStateBack = null;
                	console.log($scope.contractList)
                }
               
            };

            init();
    } ]);
});



