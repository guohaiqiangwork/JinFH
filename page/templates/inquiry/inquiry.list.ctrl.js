define(['app',
    'config',
    'codes',
    '/reins/page/templates/inquiry/inquiry.detail.modal.ctrl.js',
    '/reins/page/templates/inquiry/inquiry.bill.modal.ctrl.js',
    '/reins/page/templates/inquiry/inquiry.share.modal.ctrl.js',
    '/reins/page/templates/inquiry/inquery.settle.modal.ctrl.js'
], function (app,config,codes) {
    app.registerController('InquiryListCtrl', ['$scope', '$filter', '$stateParams', '$modal', '$location', 'FacingService','BillService', 'RiskunitService','CodeService'
        , function ($scope, $filter, $stateParams, $modal, $location, facingService,billService, riskunitService,codeService) {
        
        //显示账单
        $scope.searchBill = function(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, pagination, user, lan) {
            console.log("(显示账单accounting)searchBill's is coming...");
            billService.searchBill(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, pagination, user, lan).then(
                function(data){
                    $scope.billList = data;
                    console.log($scope.billList);
                },
                function(code){
                    throw(code);
                    //alert(message);
                }
            );
        };
        
        //账单打印
        $scope.facBillPrint = function(plyedrno, billNo ,flag, user, lan) {
            facingService.facBillPrint(plyedrno, billNo ,flag, user, lan).then(
                function(data){
                    //$scope.billList = data;
                    //console.log($scope.billList);
                },
                function(code){
                    throw(code);
                    //alert(message);
                }
            );
        };

        //临分分入业务--分保单查询
        $scope.showReinsShareList = function(certiType, certiNo, riskUnitNo, user, lan) {
            console.log("(临分分入业务--分保单查询)showReinsShare's is coming...");
            facingService.showReinsShare(certiType, certiNo, riskUnitNo, user, lan).then(
                function(data){
                    console.log("showreinsShareList");
                    $scope.reinsShare = data;
                    //pagination.totalItems = data.total;
                },
                function(code){
                    throw(code);
                    //alert(message);
                }
            );
        };
        
        //临分询价-条件查询 searchFacPlyInfo
        $scope.searchFacPlyInfo_ = function(){
        	$scope.pagination.pageIndex = 1;
        	$scope.searchFacPlyInfo($scope.options.bizType, $scope.keywords, $scope.pagination, $scope.global.user, ""); 
        }

        //临分询价-查询接口 searchFacPlyInfo
        $scope.searchFacPlyInfo = function(interfaceFlag, keywords, pagination, user, lan) {
            console.log("(临分询价-条件查询)searchFacPlyInfo's is coming...");
            facingService.searchFacPlyInfo(interfaceFlag, keywords, pagination, user, lan).then(
                function(data){
                	$scope.inquiry = data.data;
                	pagination.totalItems = data.total;
                },
                function(code){
                    throw(code);
                    //alert(message);
                }
            );
        };

        //临分---详情 getFacPlyDetail
        $scope.getFacPlyDetail = function(facNo,user,lan) {
            console.log("(临分---详情)getFacPlyDetail's is coming...");
            facingService.getFacPlyDetail(facNo,user,lan).then(
                function(data){
                    $scope.riskunitsFacPlyInfo = data;
                },
                function(code){
                    throw(code);
                    //alert(message);
                }
            );
        };


        //根据页号查询合同列表
        $scope.onSelectPage = function(pageIndex){
            $scope.pagination.pageIndex = pageIndex;
            var _pagination = angular.copy($scope.pagination);
			$scope.searchFacPlyInfo($scope.options.bizType,$scope.keywords, _pagination, $scope.global.user, ""); 
        };


        //详情
        $scope.getFacPlyInfo_ = function (certiType, certiNo,dangerNo) {
            $modal.open({
                templateUrl: '/reins/page/templates/inquiry/inquiry.detail.modal.tpl.html',
                controller: 'InquiryDetailModalCtrl',
                windowClass: 'modal-big',
                resolve: {
                	  certiType : function(){
                          return certiType;
                      },
                      certiNo : function(){
                          return certiNo;
                      },
                      dangerNo : function(){
                          return dangerNo;
                      },
                      user : function(){
                          return $scope.global.user;
                      },
                    operations : function(){
                    	return $scope.operations;
                    }
                }
            });
        };
        
        //编辑
        $scope.editorFacPlyInfo = function (certiType, certiNo,dangerNo,editor) {
            $modal.open({
                templateUrl: '/reins/page/templates/inquiry/inquiry.detail.editor.tpl.html',
                controller: 'InquiryDetailModalCtrl',
                windowClass: 'modal-big',
                resolve: {
                	  certiType : function(){
                          return certiType;
                      },
                      certiNo : function(){
                          return certiNo;
                      },
                      dangerNo : function(){
                          return dangerNo;
                      },
                      user : function(){
                          return $scope.global.user;
                      },
                    operations : function(){
                    	return $scope.operations;
                    }
                }
            });
        };
        
        //显示账单
        $scope.showBill = function (_record, bizType, certiType, certiNo) {
        
        	console.log(_record);
            $modal.open({
                templateUrl: '/reins/page/templates/inquiry/inquiry.bill.modal.tpl.html',
                controller: 'InquiryBillModalCtrl',
                windowClass: 'modal-big',
                resolve: {
                	certiType : function(){
                        return _record.certiType;
                    },
                    certiNo : function(){
                        return certiNo;
                    },
                    user : function(){
                        return $scope.global.user;
                    },
                    operations : function(){
                    	return $scope.operations;
                    },
                    billList : function(){
                        return $scope.billList ;
                    },
                    _record : function(){
                    	return _record;
                    },
                    bizType : function(){
                    	return bizType;
                    },
                    pagination : function(){
                    	return $scope.pagination;
                    }
                }
            });
        };
        
        //分摊信息
        $scope.showReinsShareSettle_ = function (certiNo) {
        		
        	if(certiNo === null){
           		certiNo = 1;
           	}
           
            $modal.open({
                templateUrl: '/reins/page/templates/settle/settles.list.tpl.html',
                controller: 'InquerySettleModal',
                windowClass: 'modal-big',
                resolve: {
                    certiNo : function(){
                        return certiNo;
                    },
                    user : function(){
                        return $scope.global.user;
                    },
                    operations : function(){
                    	return $scope.operations;
                    }
                }
            });
        };
        
        

        //分保信息
        $scope.showReinsShare_ = function (certiType, certiNo, riskUnitNo, insrnCCde) {
        		
        	if(certiNo === null){
           		certiNo = 1;
           	}
           	if(riskUnitNo === null){
           		riskUnitNo = 1;
           	}
           	console.log(certiType);
           	console.log(certiNo);
           	console.log(riskUnitNo);
            $modal.open({
                templateUrl: '/reins/page/templates/inquiry/inquiry.share.modal.tpl.html',
                controller: 'InquiryShareModalCtrl',
                windowClass: 'modal-big',
                resolve: {
                    certiType : function(){
                        return certiType;
                    },
                    certiNo : function(){
                        return certiNo;
                    },
                    riskUnitNo : function(){
                        return riskUnitNo;
                    },
                    insrnCCde : function(){
                        return insrnCCde;
                    },
                    user : function(){
                        return $scope.global.user;
                    },
                    operations : function(){
                    	return $scope.operations;
                    }
                }
            });
        };

        //切换账单，重置条件框的内容
        $scope.changeReset = function(keywords){
            console.log("changeReset's is coming...");
            $scope.resetSearchBox();
            
            //切换分保，分赔时，重新查询一遍列表数据
            $scope.searchFacPlyInfo_(keywords);
            //$scope.searchFacPlyInfo($scope.keywords, $scope.pagination, $scope.global.user, ""); 
        }

        //重置查询框中内容
        $scope.resetSearchBox = function(){
            $scope.keywords = {
                /*//分保、分批
                'facNoFlag':'=',
                'plyAppNoFlag':'=',
                'edrNoFlag':'=',
                'plyNoFlag':'=',
                'insCodeFlag':'=',
                'facAmtCurFlag':'=',
                'insNameFlag':'=',
                "facNo":"",//询价单号
                "plyAppNo":"",//投保单号
                "edrNo":"",//批单号
                "plyNo":"",//保单号
                "insCode":"",//险种代码
                "facAmtCur":"",//币别
                "insName":"",//被保险人名称
                "startDate":"",//保险起期
                "endDate":"",//保险止期
                //分赔
                'registerNoFlag':'=',
                "registerNo":"",//立案号
                //"plyNo":"002",//保单号
                'claimNoFlag':'=',
                "claimNo":"",//赔案号
                //"insCode":"",//险种代码
                'bizYearFlag':'=',
                "bizYear":"",//业务年度
                'facPrmCurFlag':'=',
                "facPrmCur":"",//币别
                //"insName":"张三",//被保险人
                'damageReasonFlag':'=',
                "damageReason":"",//出险原因
                //"startDate":"",//起保起期
                //"endDate":"",//起保止期
                "damageStartDate":"",//出险起期
                "damageEndDate":""//出险止期*/
            	
        		 "enquiryNoFlag":"",
                 "enquiryNo":"",
                 "proposalNoFlag":"",
                 "proposalNo":"",
                 "endorseNoFlag":"",
                 "endorseNo":"",
                 "policyNoFlag":"",
                 "policyNo":"",
                 "currency":"",
                 "makeComTag":"",
                 "makeCom":"",
                 "verifyFlag":""	
            		
            }
        }

      //查询字典  add by zhx begin
        var searchFlag = true;
        $scope.searchList = [];
        $scope.getCode = function(keywords,user,searcher){
            var temp = angular.copy({keywords:keywords,searcher:searcher});
            $scope.searchList.push(temp);
            if(searchFlag && $scope.searchList.length > 0){
                ralSearch();
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
      // add by zhx end
        
        /*        //查询字典
         * $scope.getCode = function(keywords, user ,searcher){
        	
            codeService.getCodes(keywords, user).then(
                function(data){
                	
                    $scope[searcher] = angular.copy(data);
                  
                },
                function(code){
                	$scope[searcher] = [];
                }
            );
        };*/

        var init = function () {
        
        	
        	$scope.operations = $stateParams.operations;
        	
        	//获取币别
            $scope.keywords = {
                id:'',
                value:''
            }
            var key = angular.copy($scope.keywords);
            key.id="currency";
            key.value="";
            $scope.getCode(key,{},"currencys");
            
            var keys = angular.copy($scope.keywords);
            keys.id="makeCom";
            keys.value="";
            $scope.getCode(keys,{},"makeComCode");
           
            //初始化条件查询对应的绑定字段
            $scope.keywords = {
                    "enquiryNoFlag":"",
                    "enquiryNo":"",
                    "proposalNoFlag":"",
                    "proposalNo":"",
                    "endorseNoFlag":"",
                    "endorseNo":"",
                    "policyNoFlag":"",
                    "policyNo":"",
                    "currency":"",
                    "makeCom":"",
                    "verifyFlag":""
                    	
            }

            $scope.options = {
               bizType : '2'
            }
            
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
            
            //条件查询列表按钮是否点击标志位
            $scope.searchClickFlag = false;


			//查询接口添加分保，分配标志位
            $scope.searchFacPlyInfo($scope.options.bizType,$scope.keywords, $scope.pagination, $scope.global.user, ""); 

            //$scope.showReinsShareList("", "", "", "", "");

            //$scope.getFacPlyDetail("","","");
            //$scope.searchBill("", "" ,"", "", "02", "", $scope.pagination, "", "");
            
            //为printIp取值提供依据
            $scope.config = config;
            
        };

        init();
    }]);
});