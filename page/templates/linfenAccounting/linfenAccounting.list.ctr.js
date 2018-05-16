define(['app',
    'config','constants'
], function (app,config,constants) {
    app.registerController('AccountingFromQueryListCtrl', ['$scope', '$stateParams',  '$filter', '$modal', '$location',
        'OutqueryService','CodeService','facultativeService','$q',
         function ($scope, $stateParams, $filter, $modal, $location,outqueryService,codeService,facultativeService,$q) {
             $scope.searchTable={
                 flag: false//查询条件是否展示判断
             };
             //关闭查询条件
             $scope.closeSearchTableFlag = function () {
                 $scope.searchTable.flag = false;
             };
             $scope.openSearchTableFlag = function () {
                 $scope.searchTable.flag = true;
             };
             $scope.isSelect=false;
			 //确认是否生成账单
            $scope.QueryAcc = function (rePolicyNo,biztype) {
                $scope.isSelect=true;
                $scope.fzBAccList = [];
                $scope.fzRAccList = [];
                $.each($scope.plyRiskUnitList,function (index,plyRiskUnit) {
                    if (biztype === 'P')
                        if (plyRiskUnit.rePolicyNo !== rePolicyNo) {
                            plyRiskUnit.checkedBill = false;
                        }
                    if (biztype === 'E')
                        if (plyRiskUnit.reendorNo !== rePolicyNo) {
                            plyRiskUnit.checkedBill = false;
                        }
                    if (biztype === 'C')
                        if (plyRiskUnit.repayNo !== rePolicyNo) {
                            plyRiskUnit.checkedBill = false;
                        }
                });
                var queryAcc ={
                    biztype:biztype,
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
                if($scope.fzBAccList && $scope.fzRAccList){
                    if($scope.fzBAccList.length>0 || $scope.fzRAccList.length>0){
                        alert('此单号已生成账单');
                        return false;
                    }
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
                            biztype:biztype,
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
                if(!$scope.fzBAccList && !$scope.fzRAccList){
                    alert('此单号未生成账单');
                    return false;
                }
                if($scope.fzBAccList && $scope.fzRAccList){
                    if($scope.fzBAccList.length===0 || $scope.fzRAccList.length===0){
                        alert('此单号未生成账单');
                        return false;
                    }
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
                            $scope.fzBAccList = [];
                            $scope.fzRAccList = [];
                            alert('删除成功！！');
                        }
                        console.log(data);
                    },function(code){
                        throw(code);
                    }
                );
            };
             $scope.showTwoInput = false;
             $scope.showTwoInput1 = false;
            $scope.changeTerm = function (term) {
                if(term===':'){
                    $scope.showTwoInput = true;
                }else{
                    $scope.showTwoInput = false;
                }
            }
             $scope.changeTerm1 = function (term) {
                 if(term===':'){
                     $scope.showTwoInput1 = true;
                 }else{
                     $scope.showTwoInput1 = false;
                 }
             }

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
	            if($scope.options.bizType === "P") {
                    $scope.searchPlyInfoList(bizType, $scope.pagination);
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
                        $.each($scope.plyRiskUnitList,function (index,plyRiskUnit) {
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

             $scope.searchRiskCode = function(id){
                 $scope.keys = {
                     "id":"",
                     "value":"",
                     "other1":""
                 };
                 $scope.keywords.id = $scope.classCode;
                 var key = angular.copy($scope.keys);
                 key.id = id;
                 key.value = '';
                 $scope.getCode(key, {}, id);
             };
             //查询字典
             var searchFlag = true;
             $scope.searchList = [];
             $scope.getCode = function(key,user,searcher){
                 var temp = angular.copy({keywords:key,searcher:searcher});
                 $scope.searchList.push(temp);
                 if(searchFlag && $scope.searchList.length > 0){
                     ralSearch(user);
                 }
             };
             var ralSearch = function(user){
                 if(searchFlag && $scope.searchList.length > 0){
                     searchFlag = false;
                     $scope.getCodes($scope.searchList[0].keywords,user).then(
                         function(data){
                             $scope[$scope.searchList[0].searcher] = data;
                             searchFlag = true;
                             $scope.searchList.splice(0,1);
                             ralSearch();
                         },
                         function(code){
                             console.log("error  "+code);
                             searchFlag = true;
                             if(angular.equals(code,"bussy")){
                                 $scope.searchList.push($scope.searchList[0]);
                                 $scope.searchList.splice(0,1);
                             }else{
                                 $scope[$scope.searchList[0].searcher] = [];
                                 $scope.searchList.splice(0,1);
                             }
                             ralSearch();
                         }
                     );
                 }
             };
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
                    reinsType:'0',
                    insuredNameTag:'=',
                    insuredName:'',
                    accType:'0',
                    biztype:'',
                    operateType:'Gen',
                    opt:'facOut',
                    reinsOutType:'',
                    endorNoTag:'=',
                    endorNo:'',
                    proposalNoTag:'=',
                    proposalNo:'',
                    enquiryNoTag:'=',
                    enquiryNo:'',
                    comCodeTag:'=',
                    comCode:'',
                    classCodeTag:'=',
                    classCode:'',
                    currencyTag:'=',
                    currency:'',
                    endorTypeTag:'=',
                    endorType:'',
                    endorDateTag:'=',
                    endorDate:'',
                    riskCodeTag:'=',
                    riskCode:'',
                    damageReasonTag:'=',
                    damageReason:'',
                    damageCode:'',
                    damageCodeTag:'='
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
                    $scope.searchRiskCode('comCode');//出单公司
                    $scope.searchRiskCode('classCode');//险类
                    $scope.searchRiskCode('riskCode');//险种
                    $scope.searchRiskCode('currency');//币种
                    $scope.searchRiskCode('endorType');//批改方式
                    $scope.searchRiskCode('damageCode');//出险原因
                }
                $scope.prompt =constants.prompt;//页面常量配置

            };

             $scope.operation = $stateParams.operation;
            init();

        }]);
});