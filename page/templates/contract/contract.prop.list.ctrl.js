define(['app', 'config','codes'], function (app, config, codes) {
    app.registerController('ContractPropListCtrl', ['$scope', '$filter', '$stateParams',
        function ($scope, $filter, $stateParams) {

            //根据页码查询
            $scope.onSelectPage = function(pageIndex){
            	if($scope.keywords.contYear === null){
            		$scope.keywords.contYear = "";
            	}
                $scope.pagination.pageIndex = pageIndex;
                var _pagination = angular.copy($scope.pagination);
                $scope.searchContract($scope.contAttr, $scope.keywords, $scope.pagination, {});
            };

            //条件查询是否显示
            $scope.toggleSearch = function(){
                $scope.searchTableFlag = !$scope.searchTableFlag;
            };
            //条件查询
            $scope.searchContracts = function(){
            	if($scope.keywords.contYear === null){
            		$scope.keywords.contYear = "";
            	}
//            	add by zhx begin
            	if($scope.keywords.treatyType === null){
            		$scope.keywords.treatyType = "";
            	}
            	if($scope.keywords.stateFlag === null){
            		$scope.keywords.stateFlag = "";
            	}
            	if($scope.keywords.optType === null){
            		$scope.keywords.optType = "";
            	}
                $scope.pagination.pageIndex = 1;
                $scope.searchContract($scope.contAttr, $scope.keywords, $scope.pagination, {});
            };
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
                var _temp = $filter('filter')($scope.contractList, {checked:true});
                $scope.selectedCount = _temp.length;
                if(_temp.length === $scope.contractList.length)
                    $scope.checkAll = true;
                else
                    $scope.checkAll = false;
            },true);
            //能否进行form的reset
            var formFlag = false;
            var inoutMrk = !isNaN(parseInt($scope.mode))? (2 - parseInt($scope.mode)) : "";
            var contStatus = $scope.mode ==="admin"? "":"3,6";
            //比例的业务类型
            $scope.inoutMrks = codes["prop.inoutMrk"];
            //重置查询框中内容
            $scope.resetSearchBox = function(){
                $scope.keywords = {
                	 "uwYear":'',
               		 "treatyNo":'',
               		 "refNo":'',
               		 "startDate":'',
               		 "endDate":'',
//             		add by zhx
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

            var init = function () {

                //初始化合同类型下拉菜单
                $scope.contGrpTypCdes = codes["prop.treatyType" ];
                //初始化合同状态下拉菜单
                $scope.contStatus = codes["prop.stateFlag"];
               //初始化业务类型下拉菜单 add by zhx
                $scope.inoutMrks = codes["prop.optType"];
                

                $scope.searchTableFlag = false;

                //全选按钮设置为未选中状态（不初始化为false）
                $scope.checkAll = false;

                //被选中的按钮个数
                $scope.selectedCount = 0;
                $scope.operation = $stateParams.operation;
                console.log("prop list ctrl 0606 start " + $scope.operation);
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
	                    firstText: config.pagination.firstText,
	                    lastText: config.pagination.lastText
	                };
	
	                //重置条件查询框
	                $scope.resetSearchBox();
	                if(!($scope.operation === "new" || $scope.operation === "view" || $scope.operation === "edit")){
		                //查询列表框
	                	//$scope.keywords.inoutMrk:业务类型
	                	if($scope.mode === '1'){
	                		 $scope.keywords.inoutMrk = '1';
	                	}
	                    else if($scope.mode === '2'){
	                		 $scope.keywords.inoutMrk = '0,2';
	                	}
		                $scope.searchContract($scope.contAttr, $scope.keywords, $scope.pagination, {});
	                }
                }else{
                	$scope.setStateBack = null;
                }
               
            };

            init();
    }]);
});