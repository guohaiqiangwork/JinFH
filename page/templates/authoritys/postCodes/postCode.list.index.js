define(['app',
	'config',
	'codes'
], function (app, config, codes) {
    app.registerController('postCodeIndex', ['$scope', '$filter','$location','$stateParams', 'excessLossService', 'PostCodesService', '$q',
    	'$modal','$state',
        function ($scope,$filter,$location,$stateParams, excessLossService, postCodesService, $q, $modal,$state ) {
    		//打印对内（外）账单
    		/*$scope.preparePrintAcc = function(accType,contractListr,accPeriod){
    			var treatyNo = contractListr.treatyNo;
    			var url = "/XYufuFeiAccss_print/"+treatyNo +"/"+accType+"/"+accPeriod;
                $location.path(url);
    			
    		};*/
	    	//新增合同类型选择框
	        $scope.preparePrintAcc = function (accType,contractListr,accPeriod) {
	        	
	            $modal.open({
	                templateUrl: '/reins/page/templates/excessLoss/premiumAdjust/XTreatyPrint.list.ctrl.html',
	                controller: 'XTreatyPrint',
	                windowClass: 'modal-big',
	                resolve: {
	                	contractListr : function(){
	                        return contractListr ;    //操作类型
	                    },
	                    accType : function(){
                            return accType ;    //操作类型
                        },
                        accPeriod : function(){
                            return accPeriod ;    //操作类型
                        },
		                user : function(){
	                        return $scope.global.user;
	                    }
	                }
	            }).result.then(function (url) {
	                    $location.path(url);
	                });
	        };
    		//删除对内（外）帐单
    		$scope.deleteAcc = function(accType,contractListr,accPeriod){
    			var treatyNo = contractListr.treatyNo;
    			excessLossService.deleteAcc($scope.operation,$scope.pagination,accType,treatyNo,accPeriod,'','').then(
						function(data){
	                    	alert("删除成功！");
	                    	$scope.searchAccNo(contractListr,accPeriod);
	                    },
	                    function(code){
	                    	alert("删除失败！");
	                    } 
						
				);
    		};
    		//生成对外账单
    		$scope.genAcc = function(acctype,accKind,contractListr,accPeriod){
    			var treatyNo = contractListr.treatyNo;
    			excessLossService.genAcc($scope.operation,$scope.pagination,acctype,accKind,treatyNo,accPeriod,'','').then(
    					function(data){
	                    	alert("合约号 ："+treatyNo+"对外账单生成成功！");
	                    	$scope.searchAccNo(contractListr,accPeriod);
	                    },
	                    function(code){
	                    	alert("合约号 ："+treatyNo+"对外账单生成失败！");
	                    } 
				);
    		}
	    	//生成对内账单
    		$scope.prepareGenAcc = function(contractListr,accPeriod){
    			//留最后做
    			alert("我先做的别的，这个最后做");
    			
    		};
    		//显示账单
			 $scope.searchAccNo = function(contractListr,accPeriod){
				var treatyNo = contractListr.treatyNo;
				excessLossService.searchAccNo($scope.operation,$scope.pagination,treatyNo,accPeriod,'','').then(
						function(data){
							if(angular.isUndefined(data) ){
                     			data = {"data":[],"total":0};
                     		}
							$scope.fzXBAccList = data.fzXBAccList;
							$scope.fzXRAccList = data.fzXRAccList;
							$scope.pagination.totalItems = data.total;   
						}
				);
			 };
    		//查询账单期
    		 $scope.searchAccperiod = function(index){
    			var treatyNo =  $scope.contractList[index].treatyNo;
    			excessLossService.searchAccperiod($scope.operation,$scope.pagination,treatyNo,'','').then(
    					function(data){
    						/*$scope.billDates = data.accPeriodList;
    						$scope.treatyNo = data.treatyNo;*/
    						$scope.contractListr = data;
    						$scope.pagination.totalItems = data.total;   
    					}
    			);
    		 };
    		//初始查询
    		$scope.searchQueryXTesty = function() {
    			excessLossService.searchXTreaty($scope.operation,$scope.pagination,$scope.keywords,'','').then(
    					function(data){
    						$scope.contractList = data.data;
    						$scope.pagination.totalItems = data.total;   
    					}
    			);
    		};
    		 //条件查询
            $scope.searchContracts = function(){
                $scope.pagination.pageIndex = 1;
                $scope.searchPostCodes($scope.keywords, $scope.pagination, {});
            };
	    	 //重置查询框中内容
	        $scope.resetSearchBox = function(){
	            $scope.keywords = {
	            		"gradeCName":'',
		            	"validStatus":''
	            };
	            
	        };
	        
	        
	        //初始化数据显示信息
	        $scope.searchPostCodes = function(keywords, pagination, user){
	            //$scope.pagination.pageIndex = 1;
	        	postCodesService.searchPostCodes(keywords, pagination, user).then(
	                function(data){
	                    $scope.saaGradeList = data.data;
	                    pagination.totalItems = data.total;
	                },
	                function(message){
	                    console.log("-----------------searchRelationship   error : "+message);
	                }
	            );
	        };
	        
	        // 搜索条件
	        $scope.resetSearchBox = function(){
	            $scope.keywords = {
	            		"gradeCNameFlag":'',
	            		"gradeCName":'',
		            	"validStatus":''
	            };
	        };
	        
	        //跳转新增页面
	        $scope.localhref = function(){
	        	debugger
	        	$state.go('postCodesnew',{operation:'new'});
//	        	  var url = "/postCodek/new";
//	        	  alert("ooo");
//	              $location.path(url);
	        	
	        }
	        
	        
            var init = function () {
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
//                $scope.getParameter();
                //初始化查询框
                $scope.resetSearchBox();

                //初始化关系列表
                $scope.searchPostCodes($scope.keywords, $scope.pagination, {});
               
            };
            init();

        }]);
});
