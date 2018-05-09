define(['app',
    'config',
    '/reins/page/templates/fromquery/fromquery.item.ctrl.js',
    '/reins/page/templates/inquiry/inquiry.detail.modal.ctrl.js'
], function (app,config) {
    app.registerController('FromQueryListCtrl', ['$scope', '$stateParams',  '$filter', '$modal', '$location','OutqueryService','CodeService'
        , function ($scope, $stateParams, $filter, $modal, $location,outqueryService,codeService) {

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
            
            //切换账单，重置条件框的内容
	        $scope.changeReset = function(keywords){
	            console.log("changeReset's is coming...");
	            if($scope.options.bizType == "1"){
	            	$scope.resetSearchBox();
	            }
	            if($scope.options.bizType == "2"){
	            	$scope.resetEdrSearchBox();
	            }
	            if($scope.options.bizType == "3"){
	            	$scope.resetClmSearchBox();
	            }
	            $location.path("/fromquerys/" +keywords);
	            //切换分保、分陪、分批时，重新查询一遍列表数据
	            $scope.searchFacPlyInfo_(keywords); 
	           // $scope.searchFacPlyInfo($scope.keywords, $scope.pagination, $scope.global.user, ""); 
	        };
	        
	        //临分询价-条件查询 searchFacPlyInfo
	        $scope.searchFacPlyInfo_ = function(){
	        	$scope.pagination.pageIndex = 1;
	        	$scope.searchPlyInfoList($scope.options.bizType, $scope.keywords, $scope.pagination, $scope.global.user, ""); 
	        }
	        
	        //重置查询框中内容---分保单
	        $scope.resetSearchBox = function(){
	            $scope.keywords = {
	            		 //分保
                   
	            		'comCodeFalg'    :'',
	            		'riskCodeFlag' :'',
	            		'insuredNameFlag' :'',
	            		'proposalNoFlag' :'',
	            		'dangerNoFlag' :'',
	            		'policyNoFlag' :'',
	            		'policyNo'   :'',// 保单号
                		'dangerNo'   :'',// 风险单位号
                		'proposalNo' :'', //  投保单号
                		'insuredName':'',// 被保险人
                		'riskCode'   :'',// 险种
                		'currency'   :'',// 保额币别
                		'currency1'   :'',// 保费币别
                		'startDate'  :'',//起保日期
                		'comCode'    :'',//业务所属公司代码
                		'endDate'    :'',//终止日期
                        	
	            }
	        }
	        
	        //add by chaiyuming 20150415 begin
	        //重置查询框中内容---分批单
	        $scope.resetEdrSearchBox = function(){
	            $scope.keywords = {
	            		 //分批
	            		'currencyFlag1' :'',
	            		'riskCodeFlag' :'',
	            		'currencyFlag' :'',
	            		'isuredNameFlag' :'',
	            		'riskUnitNoFlag' :'',
	            		'endorNoFlag' :'',
	            		'policyNoFlag' :'',
                        'policyNo':'',// 保单号
                        'endorNo':'',//批单号
                		'dangerNo':'',// 风险单位号
                		'proposalNo':'',// 投保单号
                		'insuredName':'',// 被保险人
                		'riskCode':'',// 险种
                		'currency1':'',// 保额币别
                		'currency':'',// 保费币别
                		'startDate':'',/// 保险起期
                		'endDate' :'',//终止日期
                		'treatyNo':'',
	            }
	        }
	        //add by chaiyuming 20150415 end
	        
	        //add by chaiyuming 20150420 begin
	        //重置查询框中内容---分赔案
	        $scope.resetClmSearchBox = function(){
	            $scope.keywords = {
	            		'policyNo':'',
	            		'damageStartDate':'',
                        'payNoFlag':'',//立案号标志位
                        'policyNoFlag':'',//保单号标志位
                        'dangerNoFlag':'',//危险单位号标志位
                        'damageReasonFlag':'',//出险原因标志位
                        'currencyFlag':'',//币别标志位
                        'insuredNameFlag':'',//被保险人标志位
                        'riskCodeFlag':'',//险种标志位
                        'comCodeFlag':'',//险种标志位
                        'payNo':'',//立案号
                        'repolicyNo':'',//保单号
                        'dangerNo':'',//危险单位号
                        'damageDate':'',//出险起期
                        'damageEndDate':'',
                        'startDate':'',//起保日期
                        'endDate':'',
                        'damageReason':'',//出险原因
                        'currency':'',//币别
                        'insuredName':'',//被保险人
                        'riskCode':'',//险种
                        //补全条件 begin
                        'bizYear':'',
                        'facPrmCur':'',
                        //补全条件 end
                        'comCode':'',
                        'diffFlag':'',
                        'claimInfoFlag':'',
                        'reinsType':'',
	            }
	        }
	        //add by chaiyuming 20150420 end
	        
	        //分出查询-分保单查询-条件查询
	        $scope.searchPlyInfo = function(){
	        	$scope.pagination.pageIndex = 1;
	        	
	        	$scope.searchPlyInfoList($scope.options.bizType, $scope.keywords, $scope.pagination, $scope.global.user, ""); 
	        }

	        //临分询价-查询接口 searchFacPlyInfo
	        $scope.searchPlyInfoList = function(interfaceFlag, keywords, pagination, user, lan) {
	            console.log("(分出查询-条件查询)searchPlyInfoDtl's is coming...");
	            outqueryService.searchPlyInfo(interfaceFlag, keywords, pagination, user, lan).then(
	                function(data){
	                	$scope.plyRiskUnitList = data.data;
	                	pagination.totalItems = data.total;
	                },
	                function(code){
	                    throw(code);
	                    //alert(message);
	                }
	            );
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
	        //add by chaiyuming 20150409 begin
	        //根据页号查询合同列表
	        $scope.onSelectPage = function(pageIndex){
	            $scope.pagination.pageIndex = pageIndex;
	            var _pagination = angular.copy($scope.pagination);
				$scope.searchPlyInfoList($scope.options.bizType, $scope.keywords, _pagination, $scope.global.user, ""); 
	        };
	        //add by chaiyuming 20150409 end

            var init = function(){
            	$scope.type = {
                		flag: ""
                	};
            	
                $scope.type.flag = '1';
                
              //获取币别
                $scope.keywords = {
                    id:'',
                    value:''
                }
                var key = angular.copy($scope.keywords);
                key.id="currency";
                key.value="";
                $scope.getCode(key,{},"currencys");
                
              //初始化条件查询对应的绑定字段
                $scope.keywords = {
                		
                		'comCodeFalg'    :'',
	            		'riskCodeFlag' :'',
	            		'insuredNameFlag' :'',
	            		'proposalNoFlag' :'',
	            		'dangerNoFlag' :'',
	            		'policyNoFlag' :'',
                        //分保、分批
                		'endorNo':'',//批单号
                		'policyNo'   :'',// 保单号
                		'dangerNo'   :'',// 风险单位号
                		'proposalNo' :'', //  投保单号
                		'insuredName':'',// 被保险人
                		'riskCode'   :'',// 险种
                		'currency'   :'',// 保额币别
                		'currency'   :'',// 保费币别
                		'startDate'  :'',//起保日期
                		'comCode'    :'',//业务所属公司代码
                		'endDate'    :'',//终止日期
                		
                		
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
                
                $scope.options = {
                		bizType : '1'
                }
                
                //add by chaiyuming 20150409 begin
                //条件查询列表按钮是否点击标志位
                $scope.searchClickFlag = false;
                
                //查询接口添加标志位
                $scope.searchPlyInfoList($scope.options.bizType, $scope.keywords, $scope.pagination, $scope.global.user, "");
                
              //为printIp取值提供依据
                $scope.config = config;
                //add by chaiyuming 20150409 end
                
            };

            init();
        }]);
});