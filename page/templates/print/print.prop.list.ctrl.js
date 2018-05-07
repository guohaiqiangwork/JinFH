define(['app',
    'config',
    '/reins/page/templates/contract/contract.prop.list.ctrl.js',
    '/reins/page/templates/print/print.ctrl.js'
], function (app, config) {
    app.registerController('PrintListCtrl', ['$scope', '$q', '$location', '$stateParams', '$filter', 'CodeService', 'ContractService',
                                                '$modal',
            function ($scope, $q, $location, $stateParams, $filter,codeService,  contractService, $modal ) {

    	
    	
    	 //******条件查询
        $scope.searchContracts = function(){
            $scope.pagination.pageIndex = 1;
            $scope.searchContract($scope.contAttr, $scope.keywords, $scope.pagination, {});
        };
    	
		//***********重置查询框中内容(prop)
         $scope.resetPropSearchBox = function(){
             $scope.keywords = {
            		 "treatyType":'',
            		 "treatyNo":'',
            		 "refNo":'',
            		 "treatyName":'',
            		 "uwYear":''
             };
             
             return $scope.keywords;
         };



		//重置查询框中内容(nprop)
         $scope.resetNpropSearchBox = function(){
             $scope.keywords = {
            		 "uwYear":'',
            		 "treatyNo":'',
            		 "refNo":'',
            		 "startDate":'',
            		 "endDate":'',
            		 "treatyName":''
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
        $scope.openContractReports = function(contract){
            $modal.open({
            		templateUrl: '/reins/page/templates/print/print.list.tpl.ply.html',
            		controller: 'PrintCtrl',
                    
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
        
        $scope.openContractBill1 = function(contract){
            $modal.open({
            		templateUrl: '/reins/page/templates/print/print.list.tpl.ClmClosed.html',
            		controller: 'PrintCtrl',
                    windowClass: 'modal-big',
                    width: '1000px',
                    resolve: {
                        contract: function () {
                            return contract;
                        }

                    }
                }).result.then(function(url){
                });   
        };
        
        $scope.openContractBill2 = function(contract){
            $modal.open({
            		templateUrl: '/reins/page/templates/print/print.list.tpl.ClmOpened.html',
            		controller: 'PrintCtrl',
                    
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
            				console.log("keywords.contStatus" + keywords.contStatus);
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
            				console.log("keywords.contStatus" + keywords.contStatus);
            				keywords.contStatus = "";
            				keywords.tmpContNo = "";
            			} else {
            				console.log("keywords.stateFlag" + keywords.stateFlag);
            				keywords.stateFlag = "";
            				keywords.tmpTreatyNo = "";
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
        $scope.contAttr = "prop";
        $scope.mode = "1";
        
        
        
        
        
        var init = function () {
        	
        	
        	//********初始化条件查询绑定对应的字段
        	$scope.keywords = {
        			 'treatyType':'',//合约类型
            		 'treatyNo':'',//合约编号
            		 'refNo':'',//合约简称
            		 'treatyName':'',//合约全称
            		 'uwYear':'',//业务年度
            }
        	
        	//****************分页对象
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
        	
            /*$scope.$on('$stateChangeStart', function(event, next) {
                if(next.name === 'contracts' || next.name === 'admin.contract')
                    $scope.showSearchList();
                if(next.name === 'contract.operation' || next.name === 'admin.contract.operation')
                    $scope.hideSearchList();
            });*/
            $scope.$on('$stateChangeStart', function(event, next) {
                if(next.name === 'admin.print')
                    $scope.showSearchList();
                if(next.name === 'admin.print.operation' ||  next.name === 'admin.print.new')
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
            $scope.searchContract($scope.contAttr,$scope.keywords,$scope.pagination,{});
            console.log($scope.mode);
        };

        init();
    }]);
});