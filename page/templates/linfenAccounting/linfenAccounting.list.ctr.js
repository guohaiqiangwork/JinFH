define(['app',
    'config','constants'
], function (app,config,constants) {
    app.registerController('AccountingFromQueryListCtrl', ['$scope', '$stateParams',  '$filter', '$modal', '$location',
        'OutqueryService','CodeService','facultativeService','$q',
         function ($scope, $stateParams, $filter, $modal, $location,outqueryService,codeService,facultativeService,$q) {

			$scope.prompt =constants.prompt;//页面常量配置
			 //确认是否生成账单
            $scope.QueryAcc = function (rePolicyNo) {
                var queryAcc ={
                    biztype:"P",
                    flag3:"F",
                    operateType:"Gen",
                    recertifyNo:rePolicyNo,
                    acctype:'reinsOutType',
                    pagination:$scope.pagination
                }
                facultativeService.checkQueryAcc(queryAcc).then(
                    function(data){
                        $scope.plyRiskUnitList = data.data;
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
            	console.log("openClmFromQuery---"+repayNo);
               	console.log("openClmFromQuery---"+dangerNo);
                $modal.open({
                    templateUrl: '/reins/page/templates/fromquery/fromquery.item.clm.tpl.html',
                    controller: 'FromQueryItemClmCtrl',
                    windowClass: 'modal-big',
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
                    }
                });
            };
            
            //切换账单，重置条件框的内容，初始化查询
	        $scope.changeReset = function(keywords,bizType){
	            // if($scope.options.bizType === "P"){
	            // 	// $scope.resetSearchBox();
	            // }
	            if($scope.options.bizType === "E"){
	            	// $scope.resetEdrSearchBox();
                    $scope.searchPlyInfoList(bizType);
	            }
	            if($scope.options.bizType === "C"){
	            	// $scope.resetClmSearchBox();
                    $scope.searchPlyInfoList(bizType);
	            }

	        };
	        
	        //临分询价-条件查询 searchFacPlyInfo
	        $scope.searchFacPlyInfo_ = function(){
	        	$scope.pagination.pageIndex = 1;
	        	$scope.searchPlyInfoList($scope.options.bizType, $scope.keywords, $scope.pagination, $scope.global.user, "");
	        }
	        
	        //重置查询框中内容---分保单
	        // $scope.resetSearchBox = function(){
	        //     $scope.keywords = {
	        //     		 //分保
             //          /*'plyNoFlag':'=',
             //            'riskUnitNoFlag':'=',
             //            'plyAppNoFlag':'=',
             //            'insNameFlag':'=',
             //            'insrnCCdeFlag':'=',
             //            'policyNo         ':'',//保单号
             //            'dangerNo':'',//风险单位号
             //            'plyAppNo':'',//投保单号
             //            'insuredName':'',//被保险人
             //            'insrnCCde':'',//险种
             //            'amtCur':"",//保额币别
             //            'prmCur':"",//保费币别
             //            'startDate':"",///保险起期
             //            'startDate1':"",//保险止期
             //            'includeSubDept':"1",//是否包含下级机构
             //            'deptCdeFlag':"",//归属部门标志位
             //            'deptCde':""//归属部门*/
	        //     		'policyNo'   :'',// 保单号
             //    		'dangerNo'   :'',// 风险单位号
             //    		'proposalNo' :'', //  投保单号
             //    		'insuredName':'',// 被保险人
             //    		'riskCode'   :'',// 险种
             //    		'currency'   :'',// 保额币别
             //    		'startDate'  :'',//起保日期
             //    		'comCode'    :'',//业务所属公司代码
             //    		'endDate'    :''//终止日期
             //
	        //     };
	        // }
            //
	        // //重置查询框中内容---分批单
	        // $scope.resetEdrSearchBox = function(){
	        //     $scope.keywords = {
	        //     		 //分批
             //            /*'plyNoFlag':'=',
             //            'edrNoFlag':'=',
             //            'riskUnitNoFlag':'=',
             //            'insNameFlag':'=',
             //            'busiyearFlag':'=',
             //            'keywords.insrnCCdeFlag':'=',
             //            'deptCdeFlag':"",//归属部门标志位
             //            'amtCurFlag':'=',
             //            'prmCurFlag':'=',
             //            'policyNo         ':'',//保单号
             //            'endorNo':'',//批单号
             //            'dangerNo':'',//危险单位号
             //            'insuredName':'',//被保险人
             //            'busiyear':'',//业务年度
             //            'deptCde':"",//归属部门
             //            'startDate':"",///保险起期
             //            'startDate1':"",///保险起期
             //            'insrnCCde':'',//险种
             //            'amtCur':"",//保额币别
             //            'prmCur':"",//保费币别
             //            'includeSubDept':"1",//是否包含下级机构*/
	        //     		'plyNoFlag':'=',
             //            'riskUnitNoFlag':'=',
             //            'plyAppNoFlag':'=',
             //            'insNameFlag':'=',
             //            'insrnCCdeFlag':'=',
             //            'policyNo':'',// 保单号
             //            'endorNo':'',//批单号
             //    		'dangerNo':'',// 风险单位号
             //    		'proposalNo':'',// 投保单号
             //    		'insuredName':'',// 被保险人
             //    		'riskCode':'',// 险种
             //    		'currency':'',// 保额币别
             //    		'startDate':'',/// 保险起期
             //    		'endDate' :'',//终止日期
             //    		'treatyNo':'',
	        //     };
	        // }
	        // //重置查询框中内容---分赔案
	        // $scope.resetClmSearchBox = function(){
	        //     $scope.keywords = {
	        //     		'policyNo':'',
	        //     		'damageStartDate':'',
             //            'payNoFlag':'=',//立案号标志位
             //            'policyNoFlag':'=',//保单号标志位
             //            'dangerNoFlag':'=',//危险单位号标志位
             //            'damageReasonFlag':'=',//出险原因标志位
             //            'currencyFlag':'=',//币别标志位
             //            'insuredNameFlag':'=',//被保险人标志位
             //            'riskCodeFlag':'=',//险种标志位
             //            'comCodeFlag':'=',//险种标志位
             //            'payNo':'',//立案号
             //            'repolicyNo':'',//保单号
             //            'dangerNo':'',//危险单位号
             //            'damageDate':'',//出险起期
             //            'damageEndDate':'',
             //            'startDate':'',//起保日期
             //            'endDate':'',
             //            'damageReason':'',//出险原因
             //            'currency':'',//币别
             //            'insuredName':'',//被保险人
             //            'riskCode':'',//险种
             //            //补全条件 begin
             //            'bizYear':'',
             //            'facPrmCur':'',
             //            //补全条件 end
             //            'comCode':'',
             //            'diffFlag':'',
             //            'claimInfoFlag':'',
             //            'reinsType':'',
	        //     };
	        // }
	        //分出查询-分保单查询-条件查询
	        // $scope.searchPlyInfo = function(){
	        // 	$scope.pagination.pageIndex = 1;
	        //
	        // 	$scope.searchPlyInfoList($scope.options.bizType, $scope.keywords, $scope.pagination, $scope.global.user, "");
	        // }
	        //临分询价-查询接口 searchFacPlyInfo
	        $scope.searchPlyInfoList = function(bizType) {
                $scope.keywords.biztype=bizType;
                $scope.keywords.operateType='Gen';
                $scope.keywords.opt='facOut';
                $scope.keywords.reinsOutType='';
                facultativeService.checkFacultative($scope.operation,$scope.keywords,$scope.pagination,'','').then(
                    function(data){
                        $scope.plyRiskUnitList = data.data;
                        $scope.pagination.totalItems=data.total;
                    },function(code){
                        throw(code);
                    }
                );
	            // outqueryService.searchPlyInfo(interfaceFlag, keywords, pagination, user, lan).then(
	            //     function(data){
	            //     	$scope.plyRiskUnitList = data.data;
	            //     	pagination.totalItems = data.total;
	            //     },
	            //     function(code){
	            //         throw(code);
	            //     }
	            // );
	        };
	        
	      //查询字典
	        $scope.getCode = function(keywords, user ,searcher){
	        	
	            codeService.getCodes(keywords, user).then(
	                function(data){
	                	
	                    $scope[searcher] = angular.copy(data);
	                  
	                },
	                function(code){
	                	$scope[searcher] = [];
	                }
	            );
	        };
	        //根据页号查询合同列表
	        $scope.onSelectPage = function(pageIndex){
	            $scope.pagination.pageIndex = pageIndex;
	            var _pagination = angular.copy($scope.pagination);
				$scope.searchPlyInfoList($scope.options.bizType, $scope.keywords, _pagination, $scope.global.user, ""); 
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
                // if(!$scope.options.bizType){
                //     $scope.options.bizType='P';
                // }

                //查询列表信息
                if($scope.options.bizType!=='E' && $scope.options.bizType!=='C'&& !$scope.options.bizType){
                    $scope.options.bizType='P';
                    $scope.keywords.biztype='P';
                    facultativeService.checkFacultative($scope.operation,$scope.keywords,$scope.pagination,'','').then(
                        function(data){
                            $scope.plyRiskUnitList = data.data;
                            $scope.pagination.totalItems=data.total;
                        },function(code){
                            throw(code);
                        }
                    );
                }
            };

             $scope.operation = $stateParams.operation;
            init();
        }]);
});