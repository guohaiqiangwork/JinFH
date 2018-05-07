define(['app',
    'config',
    'accounting/accounting.bill.modal.ctrl'
], function (app, config) {
    app.registerController('AccountingListCtrl', ['$scope', '$stateParams', '$modal', '$filter', '$location', 'FacingService', 'BillService'
        , function ($scope, $stateParams, $modal, $filter, $location, facingService, billService) {

            //显示账单
            $scope.searchBill = function (contAttr, contFacMrk, inOutMrk, inExMrk, billType, keywords, pagination, user, lan) {
                console.log("(显示账单accounting)searchBill's is coming...");
                $scope.showBusy(true);
                billService.searchBill(contAttr, contFacMrk, inOutMrk, inExMrk, billType, keywords, pagination, user, lan).then(
                    function (data) {
                        $scope.billList = data;
                        console.log($scope.billList);
                        $scope.showBusy(false);
                    },
                    function (code) {
                        throw(code);
                        //alert(message);
                    }
                );
            };

            //临分分入业务--分保单查询功能
            $scope.showReinsShareList = function (certiType,pageIndex) {
//            	if(certiType === '1'){
//            		certiType = 'p';
//            	}
//            	else if(certiType === '2'){
//            		certiType = 'e';
//            	}
//            	else {
//            		certiType = 'c';
//            	}
            	 $scope.pagination.pageIndex = pageIndex;
            	 $scope.viewRecertiDetaill(certiType, $scope.keywords, $scope.pagination, $scope.global.user, "");
            };

            /*//临分询价-条件查询 searchFacPlyInfo
             $scope.searchFacPlyInfo = function(keywords, pagination, user, lan) {
             alert("(临分询价-条件查询)searchFacPlyInfo's is coming...");
             facingService.searchFacPlyInfo(keywords, pagination, user, lan).then(
             function(data){

             },
             function(code){
             throw(code);
             //alert(message);
             }
             );
             };*/

            //分保单信息查看，分保单查询详细 viewRecertiDetail
            $scope.viewRecertiDetaill = function (certiType, keywords, pagination, user, lan) {
            	$scope.showBusy(true);
            	if(keywords.bizStartYear === null){
            		keywords.bizStartYear = "";
            	}
                console.log("(分保单信息查看，分保单查询详细)viewRecertiDetail's is coming...");
                facingService.viewRecertiDetail(certiType, keywords, pagination, user, lan).then(
                    function (data) {
                    	$scope.keywordsAll = data.data;
                    	 pagination.totalItems = data.total;
                    	 $scope.showBusy(false);
                    },
                    function (code) {
//                        throw(code);
                        //alert(message);
                    }
                );
            };

            //根据页号查询合同列表
            $scope.onSelectPage = function (pageIndex) {
//            	if($scope.options.bizType === '1'){
//            		var certiType = 'p';
//            	}
//            	else if($scope.options.bizType === '2'){
//            		var certiType = 'e';
//            	}
//            	else {
//            		var certiType = 'c';
//            	}
                $scope.pagination.pageIndex = pageIndex;
               var _pagination = angular.copy($scope.pagination);
               $scope.viewRecertiDetaill($scope.options.bizType, $scope.keywords, _pagination, $scope.global.user, "");
            };

			//账单查询
            $scope.getFacPlyInfo = function (_keyword) {
            	console.log(_keyword);
            	var _certiType = '';
            	var _record = '';
            	if($scope.options.bizType === '1'){
            		if(_keyword.edrAppNo === '' || _keyword.edrAppNo === null){
                		_certiType = '1';
                		_record = _keyword.plyNo;
                	}else{
                		_certiType = '2';
                		_record = _keyword.edrNo;
                	}
            	}else {
            		_certiType = '3';
            		_record = _keyword.certiNo;
            	}
            	
                $modal.open({
                    templateUrl: 'accounting/accounting.bill.modal.tpl.html',
                    controller: 'AccountingBillModalCtrl',
                    windowClass: 'modal-big',
                    resolve: {
                        certiType : function(){
                        	return _certiType;
	                    },
	                    certiNo : function(){
	                        return _record;
	                    },
	                    user : function(){
	                        return $scope.global.user;
	                    },
	                    operations : function(){
	                    	return $scope.operations;
	                    },
	                    pagination : function(){
	                    	return $scope.pagination;
	                    }
                    }
                });
            };



            //切换账单，重置条件框的内容
            $scope.changeReset = function(){
            	$scope.resetSearchBox();
            	$scope.showReinsShareList ($scope.options.bizType,"1");
            }

            //重置查询框中内容
            $scope.resetSearchBox = function(){
                $scope.keywords = {
                    //分保、
                    "plyNoFlag": "=",
                    "plyNo": "",//保单号
                    "damageNoFlag": '=',
                    "damageNo": "",//风险单位
                    "plyAppNoFlag": "=",
                    "plyAppNo": "",//投保单号
                    "insrnCCdeFlag": "=",
                    "insrnCCde": "",//险种代码
                    "bizStartYear": ""+"",//业务年度
                    "startDate": "",//保险起期
                    "endDate": "",//保险止期
                    "insNameFlag": "=",
                    "insName": "",//被保险人名称
                    "deptCodeFlag": "=",
                    "deptCode": "",//归属部门
                    //分批
                    "edrNoFlag": "=",
                    "edrNo": "",//批单号
                    //分赔
                    "registerNoFlag": "=",
                    "registerNo": "",//立案号
                    "damageStartDate":"",//出险日期
                    "damageEndDate":""
                 
                }
            }


            var init = function () {

                //初始化查询条件
                $scope.keywords = {
                    //分保、
                    "plyNoFlag": "=",
                    "plyNo": "",//保单号
                    "damageNoFlag": '=',
                    "damageNo": "",//风险单位号
                    "plyAppNoFlag": "=",
                    "plyAppNo": "",//投保单号
                    "insrnCCdeFlag": "=",
                    "insrnCCde": "",//险种代码
                    "bizStartYear": ""+"",//业务年度
                    "startDate": "",//保险起期
                    "endDate": "",//保险止期
                    "insNameFlag": "=",
                    "insName": "",//被保险人名称
                    "deptCodeFlag": "=",
                    "deptCode": "",//归属部门
                    //分批
                    "edrNoFlag": "=",
                    "edrNo": "",//批单号
                    //分赔
                    "registerNoFlag": "=",
                    "registerNo": ""//立案号
	               
                }

                $scope.options = {
                    bizType: '1'
                };

                $scope.bizType = $stateParams.bizType;
                $scope.accounting = {
                    records: []
                };
                //区别当前页面在路由中位置
                $scope.pageName = {
                		"1":"临分分入账务",
                		"2":"超赔临分账务"
                };
                //分页对象
                $scope.pagination = {
                    totalItems: 0, 
                    pageIndex: 1,
                    pageSize: 10,
                    maxSize: 8,
                    numPages: 4,
                    previousText: config.pagination.previousText,
                    nextText: config.pagination.nextText,
                    firstText: config.pagination.firstText,
                    lastText: config.pagination.lastText
                };


                $scope.searchTableFlag = false;

//                $scope.showReinsShareList("", "", "", "");

                $scope.viewRecertiDetaill($scope.options.bizType, $scope.keywords, $scope.pagination, $scope.global.user, "");
                console.log($scope.global.user);
            };
            //关闭查询窗口
            $scope.searchTableFlagclose = function(){
            	
            	$scope.searchTableFlag = !$scope.searchTableFlag
            }
            init();
        }]);
});