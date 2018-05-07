define(['app',
    'config',
    'ngCookies',
    '/reins/page/templates/contract/contract.nprop.list.ctrl.js',
    '/reins/page/templates/contract/contract.prop.list.ctrl.js',
    '/reins/page/templates/contract/editor/contract.list.operate.ctrl.js',
    '/reins/page/templates/contract/contract.new.modal.ctrl.js',
    '/reins/page/templates/bill/contract.bill.ctrl.js',
    '/reins/page/templates/contract/editor/contract.final.recepter.ctrl.js'
], function (app, config) {
    app.registerController('ContractListCtrl', ['$scope', '$q', '$location', '$stateParams', '$filter', 'CodeService','$cookies' , 'ContractService',
                                                '$modal',
            function ($scope, $q, $location, $stateParams, $filter,codeService, $cookies, contractService, $modal ) {

		//重置查询框中内容(prop)
         $scope.resetPropSearchBox = function(){
             $scope.keywords = {
            		 "uwYear":'',
            		 "treatyNo":'',
            		 "refNo":'',
            		 "startDate":'',
            		 "endDate":''
             };
             
             return $scope.keywords;
         };



		//重置查询框中内容(nprop)
         $scope.resetNpropSearchBox = function(){
             $scope.keywords = {
            		 "uwYear":'',
            		 "treatyNo":'',
            		 "refNo":'',
            		 "stateFlag":'',
            		 "stateFlagFlag":'',
            		 "uwYearFlag":'',
            		 "refNoFlag":'',
            		 "treatyNoFlag":'',
            		 "treatyTypeFlag":'',
            		 "treatyType":''
            			 
             };
             
             return $scope.keywords;
         };

        
        //新增合同类型选择框
        $scope.openNewContractModal = function (temp) {
            $modal.open({
                templateUrl: '/reins/page/templates/contract/contract.new.modal.tpl.html',
                controller: 'NewContractModalCtrl',
                windowClass: 'modal-big',
                resolve: {
                    contAttr : function(){
                        return $scope.contAttr ;    //操作类型
                    }
                }
            }).result.then(function (url) {
                    $location.path(url);
                });
        };

        //合同账单
        $scope.openContractBill = function(contract){
        	
            $modal.open({
                    templateUrl: '/reins/page/templates/bill/contract.bill.tpl.html',
                    controller: 'ContractBillCtrl',
                    windowClass: 'modal-big',
                    width: '1000px',
                    resolve: {
                        contract: function () {
                            return contract;
                        },
                        contAttr : function(){
                            return $scope.contAttr ;    //操作类型
                        },
                        config : function(){
                            return config ;    //操作类型
                        },
                        mode : function(){
                            return $scope.mode;
                        },
                        global: function() {
                            return $scope.global;
                        },
                        showBusy: function() {
                            return $scope.showBusy;
                        }

                    }
                }).result.then(function(url){
                    $location.path(url);
                });
        };

        //调用弹出框  为选中列表进行  删除、复制、续转、设置状态 操作
        $scope.operateContractList = function (temp,keywords,pagination) {
	    	  var contract = $filter('filter')($scope.contractList, {checked:true});
	    	  //add by zhx begin
	    	  if(contract.length == 0){
	    		  alert("请选择一条记录");
	    		  return;
	    	  }  
	    	  if(contract.length==1){
		    	  	 if(contract[0].stateFlag == "4"){
		    		  alert("已生效状态不能删除");
		    		  return;
		    	  } 
		    	   if(contract[0].stateFlag == "6"){
		    		  alert("已关闭状态不能删除");
		    		  return;
		    	  }   
	    	  }	  
	    	  //add by zhx end
            var url = changeUrl(temp);
            $modal.open({
                    templateUrl: url,
                    controller: 'listOperateCtrl',
                    windowClass: 'modal-big',
                    resolve: {
                        contractList: function () {
                            return   $filter('filter')($scope.contractList, {checked:true});
                        },
                        allList : function(){
                        	return $scope.contractList;
                        },
                        operateType : function(){
                            return temp ;    //操作类型
                        },
                        contractDistinguish:function(){
                            return $scope.contAttr;     //区别比例 / 非比例
                        },
                        global : function(){
                        	return $scope.global; //main控制器中loading控制方法
                        }
                    }
            }).result.then(function(data){
            	if(angular.isDefined(data)){
            		if(temp === "delete"){
            			pagination.pageIndex = 1;
            			console.log(data);
            			$scope.searchContract(data,keywords,pagination,{});
            		} else if(temp === "setState"){
            			//$scope.keywords = keywords;
            			//$scope.contAttr = data.contAttr;
            			$scope.setStateBack = true;
            			//$scope.pagination = pagination;
            			//$scope.contractList = data.lists;
            			console.log("setState---list.ctrl.js");
            			pagination.pageIndex = 1;
            			console.log(keywords);
            			if(data === 'prop'){
            				console.log("keywords.contStatus" + keywords.stateFlag);
            				keywords.contStatus = "";
            			} else {
            				console.log("keywords.stateFlag" + keywords.stateFlag);
            				keywords.stateFlag = "";
            			}
            			console.log(keywords);
            			$scope.searchContract(data,keywords,pagination,{});
            		} else if(temp === "copy"){
            			pagination.pageIndex = 1;
            			if(data === 'prop'){
            				console.log("keywords.contStatus" + keywords.stateFlag);
            				keywords.contStatus = "";
            				keywords.tmpContNo = "";
            			} else {
            				console.log("keywords.stateFlag" + keywords.stateFlag);
            				keywords.stateFlag = "";
            				//keywords.tmpTreatyNo = "";
            			}
            			$scope.searchContract(data,keywords,pagination,{});
            		}
            		
            	}
            });
        };

         //查询合同列表
        $scope.searchContract = function(contAttr, keywords, pagination, user) {
        	$scope.showBusy(true);
            contractService.searchContract(contAttr, keywords, pagination, user).then(
                function(data){
                	if(data.data.length > 0){
                		 $scope.contractList = data.data;
                		 console.log(data);
                         pagination.totalItems = data.total;
                         $scope.showBusy(false);
                	}else{
                		var hrefCount = (location.href).split("/");
                		$scope.showBusy(false);
                		if(hrefCount.length < 10)
                			$scope.contractList =[];
                			$scope.$emit('notification', {message:'未查找到相关信息', delay:3000, type:'error'});
                	}
                },
                function(code){
                    throw(code);
                	$scope.contractList =[];
                    $scope.$emit('notification', {message:'未查找到相关信息', delay:3000, type:'error'});
                    //alert(message);
                }
            );
        };

        //获得合同详情
        $scope.getContract = function(contAttr, contractNo,  user) {
            console.log('获取合同详情' + contractNo);
            var deffered = $q.defer();
            contractService.getContract(contAttr, contractNo, user).then(
                function(data){
                    deffered.resolve(data);
                },
                function(message){
                    deffered.reject(message);
                }
            );
            return deffered.promise;
        };

        //隐藏查询列表
        $scope.hideSearchList = function (){
            $scope.hideList = true;
            //$scope.searchTable.flag = false;
        };

        //查询、列表框显示
        $scope.showSearchList = function () {
            $scope.hideList = false;
            //$scope.searchTable.flag = true;
        };

        //修改弹出框 templateUrl
        var changeUrl = function(url){
            if(url === "renewal"){
                return "/reins/page/templates/contract/editor/contract.list.renewal.tpl.html";
            }else if(url === "copy"){
                return "/reins/page/templates/contract/editor/contract.list.copy.tpl.html";
            }else if(url === "setState"){
                return "/reins/page/templates/contract/editor/contract.list.setstate.tpl.html";
            }else if(url === "delete"){
                return "/reins/page/templates/contract/editor/contract.list.delete.tpl.html";
            }
        };

        var setTitle = function(contAttr, mode){
            switch(mode){
                case('1'):
                    $scope.title = '合同分出账务';
                    break;
                case('2'):
                    $scope.title = '合同分入账务';
                    break;
                case('admin'):
                    $scope.title = contAttr==='prop'? '比例': '非比例';
                    $scope.title += '合同管理';
                    break;
                case("bill"):
                	$scope.title = "超赔合同账务"; 
                	break;
            }

        };
        
        //合同类型（比例，非比例）
        $scope.contAttr = $stateParams.contAttr;
        $scope.mode = $stateParams.mode;
        var init = function () {

            $scope.$on('$stateChangeStart', function(event, next) {
                if(next.name === 'contracts' || next.name === 'admin.contract')
                    $scope.showSearchList();
                if(next.name === 'contract.operation' || next.name === 'admin.contract.operation')
                    $scope.hideSearchList();
            });

            //全选按钮设置为未选中状态（不初始化为false）
            $scope.checkAll = false;

            //被选中的按钮个数
            $scope.selectedCount = 0;
            
            $scope.contractList = [];

//            $scope.inoutMrk = angular.isUndefined($stateParams.inoutMrk)? '': $stateParams.inoutMrk;

            setTitle($scope.contAttr, $scope.mode);
            $scope.resetPropSearchBox();
            angular.isUndefined($scope.pagination)? '': $scope.searchContract($scope.contAttr,$scope.keywords,$scope.pagination,{});
            console.log($scope.mode);
        };

        init();
    }]);
});