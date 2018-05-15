define(['app',
    'config','constants'
], function (app,config,constants) {
    app.registerController('AccountingFromQueryListCtrl', ['$scope', '$stateParams',  '$filter', '$modal', '$location',
        'OutqueryService','CodeService','facultativeService','$q',
         function ($scope, $stateParams, $filter, $modal, $location,outqueryService,codeService,facultativeService,$q) {

             $scope.isSelect=false;
			 //确认是否生成账单
            $scope.QueryAcc = function (rePolicyNo) {
                $scope.isSelect=true;
                $scope.fzBAccList = '';
                $scope.fzRAccList = '';
                $.each($scope.plyRiskUnitList,function (index,plyRiskUnit) {
                    if(plyRiskUnit.rePolicyNo!==rePolicyNo){
                        plyRiskUnit.checkedBill = false;
                    }
                });
                var queryAcc ={
                    biztype:"P",
                    flag3:"F",
                    operateType:"Gen",
                    recertifyNo:rePolicyNo,
                    acctype:'reinsOutType',
                    pagination:$scope.pagination
                };
                facultativeService.checkQueryAcc(queryAcc).then(
                    function(data){
                        $scope.fzBAccList = data.fzBAccList;
                        $scope.fzRAccList = data.fzRAccList;
                    },function(code){
                        throw(code);
                    }
                );
            };
            //生成账单
            $scope.genAcc = function(accType,biztype){
                if(!$scope.isSelect){
                   alert('请选择单号');
                    return false;
                }
                if($scope.fzBAccList.length>0 || $scope.fzRAccList.length>0){
                    alert('此单号已生成账单');
                    return false;
                }
                var plyRiskUnit='';
                for(var i=0;i<$scope.plyRiskUnitList.length;i++){
                    if($scope.plyRiskUnitList[i].checkedBill){
                        plyRiskUnit=$scope.plyRiskUnitList[i];
                       break;
                    }}

                var keywords={
                    accType:accType,
                    biztype:biztype,
                    plyRiskUnit:plyRiskUnit
                };
                facultativeService.generatingBill(keywords).then(
                    function(data){
                     console.log(data);
                        var queryAcc ={
                            biztype:"P",
                            flag3:"F",
                            operateType:"Gen",
                            recertifyNo:plyRiskUnit.rePolicyNo,
                            acctype:'reinsOutType',
                            pagination:$scope.pagination
                        };
                        facultativeService.checkQueryAcc(queryAcc).then(
                            function(data){
                                $scope.fzBAccList = data.fzBAccList;
                                $scope.fzRAccList = data.fzRAccList;
                            },function(code){
                                throw(code);
                            }
                        );

                    },function(code){
                        throw(code);
                    }
                );
            };
            //删除账单
            $scope.delAcc =function(){
                if(!$scope.isSelect){
                    alert('请选择单号');
                    return false;
                }
                if($scope.fzBAccList.length===0 || $scope.fzRAccList.length===0){
                    alert('此单号未生成账单');
                    return false;
                }
                var plyRiskUnit='';
                for(var i=0;i<$scope.plyRiskUnitList.length;i++){
                    if($scope.plyRiskUnitList[i].checkedBill){
                        plyRiskUnit=$scope.plyRiskUnitList[i];
                        break;
                    }}
                facultativeService.deleBill(plyRiskUnit).then(
                    function(data){
                        if(data.result==='success'){
                            alert('删除成功！！');
                        }
                        console.log(data);
                    },function(code){
                        throw(code);
                    }
                );
            };


            //分保单详情
            $scope.openPlyFromQuery = function (repolicyNo,dangerNo) {
            	console.log("openPlyFromQuery---"+repolicyNo);
               	console.log("openPlyFromQuery---"+dangerNo);
                $modal.open({
                    templateUrl: '/reins/page/templates/fromquery/fromquery.item.ply.tpl.html',
                    controller: 'FromQueryItemCtrl',
                    windowClass: 'modal-big',
                    resolve: {
                    	repolicyNo          : function(){
		                    return repolicyNo         ;
		                },
		                dangerNo : function(){
		                    return dangerNo;
		                },
		                user : function(){
	                        return $scope.global.user;
	                    }
                    }
                });
            };
            //分批单详情
            $scope.openEdrFromQuery = function (endorNo,dangerNo) {
            	console.log("openEdrFromQuery---"+endorNo);
               	console.log("openEdrFromQuery---"+dangerNo);
                $modal.open({
                    templateUrl: '/reins/page/templates/fromquery/fromquery.item.edr.tpl.html',
                    controller: 'FromQueryItemEdrCtrl',
                    windowClass: 'modal-big',
                    resolve: {
                		endorNo : function(){
		                    return endorNo;
		                },
		                dangerNo : function(){
		                    return dangerNo;
		                },
		                user : function(){
	                        return $scope.global.user;
	                    }
                    }
                });
            };
            //分赔案详情
            $scope.openClmFromQuery = function (repayNo,dangerNo) {
                $modal.open({
                    backdrop: 'static',
                    animation: true,
                    windowClass: 'modal-big',
                    templateUrl:'/reins/page/templates/fromquery/fromquery.item.clml.tpl.html',
                    resolve: {
                        repayNo : function(){
                            return repayNo;
                        },
                        dangerNo : function(){
                            return dangerNo;
                        },
                        user : function(){
                            return $scope.global.user;
                        }
                    },
                    controller: function ($scope, $modalInstance) {
                        var queryAcc ={
                            biztype:"P",
                            flag3:"F",
                            operateType:"Gen",
                            recertifyNo:'',
                            acctype:'reinsOutType',
                            pagination:$scope.pagination
                        };
                        facultativeService.checkDetails(queryAcc).then(
                            function(data){
                                console.log('000000');
                            },function(code){
                                throw(code);
                            }
                        );

                        $scope.close = function () {
                            $modalInstance.dismiss();
                        };
                    }
                });
            };
            
            //切换账单,初始化查询
	        $scope.changeReset = function(keywords,bizType){
	            if($scope.options.bizType === "P"){
                    $scope.searchPlyInfoList(bizType,$scope.pagination);
	            }
	            if($scope.options.bizType === "E"){
                    $scope.searchPlyInfoList(bizType,$scope.pagination);
	            }
	            if($scope.options.bizType === "C"){
                    $scope.searchPlyInfoList(bizType,$scope.pagination);
	            }

	        };


	        $scope.searchPlyInfoList = function(bizType,pagination) {
                $scope.keywords.biztype=bizType;
                $scope.keywords.operateType='Gen';
                $scope.keywords.opt='facOut';
                $scope.keywords.reinsOutType='';
                $scope.plyRiskUnitList='';
                facultativeService.checkFacultative($scope.operation,$scope.keywords,pagination,'','').then(
                    function(data){
                        $scope.plyRiskUnitList = data.data;
                        $.each( $scope.plyRiskUnitList,function (index,plyRiskUnit) {
                            plyRiskUnit.checkedBill = false;
                        });
                        $scope.pagination.totalItems=data.total;
                    },function(code){
                        throw(code);
                    }
                );
	        };
	        //根据页号查询合同列表
	        $scope.onSelectPage = function(pageIndex){
	            $scope.pagination.pageIndex = pageIndex;
	            var _pagination = angular.copy($scope.pagination);
				$scope.searchPlyInfoList($scope.options.bizType,_pagination, $scope.global.user, "");
	        };
	        if(!$scope.options){
                $scope.options={
                    bizType:''
                };
            }
            var init = function(){
                $scope.keywords={
                    recertifyNoTag:'=',
                    recertifyNo:'',
                    policyNoTag:'=',
                    policyNo:'',
                    dangerNoTag:'=',
                    dangerNo:'',
                    payNoTag:'=',
                    payNo:'',
                    uwYearTag:'=',
                    uwYear:'',
                    damageDateTag:'=',
                    damageDate:'',
                    startDateTag:'=',
                    startDate:'',
                    compensateNoTag:'=',
                    compensateNo:'',
                    repolicyNoTag:'=',
                    repolicyNo:'',
                    approve:'1',
                    reinsType:'',
                    insuredNameTag:'=',
                    insuredName:'',
                    accType:'',
                    biztype:'',
                    operateType:'Gen',
                    opt:'facOut',
                    reinsOutType:'',
                    endorNoTag:'',
                    endorNo:'',
                    proposalNoTag:'',
                    proposalNo:'',
                    enquiryNoTag:'',
                    enquiryNo:''

                };

                //查询列表信息
                if($scope.options.bizType!=='E' && $scope.options.bizType!=='C'&& !$scope.options.bizType){
                    $scope.options.bizType='P';
                    $scope.keywords.biztype='P';
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
                    $scope.plyRiskUnitList='';
                    facultativeService.checkFacultative($scope.operation,$scope.keywords,$scope.pagination,'','').then(
                        function(data){
                            $scope.plyRiskUnitList = data.data;
                            $.each( $scope.plyRiskUnitList,function (index,plyRiskUnit) {
                                plyRiskUnit.checkedBill = false;
                            });
                            $scope.pagination.totalItems=data.total;
                        },function(code){
                            throw(code);
                        }
                    );
                }
                $scope.prompt =constants.prompt;//页面常量配置
            };

             $scope.operation = $stateParams.operation;
            init();
        }]);
});