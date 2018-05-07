define(['app', 'codes', 'config'], function (app, codes, config) {

    app.registerController('ClaimEditorCtrl', ['$scope', '$stateParams', '$location', '$filter', '$modal',  'ClaimService',
        'ContractService','BillService', 'EventService', function ($scope, $stateParams, $location, $filter, $modal, claimService, contractService,billService,eventService) {



			//删除待摊信息
            $scope.deleteFxoPay = function(fxoPayLists) {
            
            	var claim =  $filter('filter')(fxoPayLists, {checked:true});
                console.log("(删除待摊信息)deleteFxoPay's is coming..");
                claimService.deleteFxoPay(claim, {}, $scope.global.user, {}).then(
                    function(data){
                        //处理成功后操作
                        if(angular.isDefined(data)){
                        	if(data.result==="success"){
								alert("删除成功！");
	                        	$scope.searchFxoPay($scope.keywords, "asc", $scope.pagination, {}, {});
                        	} else {
                        		alert("删除失败! " + data.msg);
                        	}
                        }
                    },
                    function(code){
                        throw(code);
                        //alert(message);
                    }
                );
            };
            
            //修改待摊信息
            $scope.modifyFxoPay = function(fxoPay){
            	claimService.modifyFxoPay(fxoPay, {}, {}).then(
                    function(data){
                      alert("修改成功!");
                    },
                    function(data){
                        alert('修改失败!' + data.msg);
                    }
                );
            };
            
            
            /**
             * 查看待摊详细信息
             */
            $scope.queryFxoPayDtl = function(fxoPay){
            	var certiNo = fxoPay[0].certiNo ;
            	claimService.queryFxoPayDtl(certiNo,{},{}).then(
        			function(data){
                         if(angular.isDefined(data)){
 	                        $scope.fxoPay = data;
                         } else {
                         	alert("查询失败! " + data.msg);
                         }
                     },
                     function(code){
 						throw(code);
                     }
            	);
            };
            

            /**
             * 生成险位分摊账单
             */
            $scope.genRiskShare = function(claimShare){
                var fhxLayerVoList =  $filter('filter')(claimShare.fhxLayerVoList, {checked:true});
                
                claimService.genRiskShare(claimShare, fhxLayerVoList, {}, {}).then(
                    function(data){
                    	if(data.result==="success"){
                    		alert("create bill success!");
                    	}else{
                    		alert('create bill error!' + data.msg);
                    	}
                    },
                    function(code){
                        alert('create bill error!' + code.msg);
                    }
                );
            };

            
            $scope.prepareRiskShare = function(fxoPayList) {
            	var fxoPay =  $filter('filter')(fxoPayList, {checked:true});
                console.log("生成待摊事件");
                claimService.serarchContract(fxoPay, {}, {}).then(
                        function(data){
                            $scope.claimShare = data;
                        },
                        function(data){
                            alert('修改失败!' + data.msg);
                        }
                    );
            };

            //查询超赔待摊信息
            $scope.searchFxoPay = function(keywords, orderByWords, pagination, user, lan){
                claimService.searchFxoPay(keywords, orderByWords, pagination, user, lan).then(
                    function(data){
                        //$scope.fxoPayLists = data.data;
                        if(angular.isDefined(data)){
	                        $scope.fxoPayLists = data.data;
							pagination.totalItems = data.total;
							console.log("fxoPayLists==="+$scope.fxoPayLists );
                        } else {
                        	alert("查询失败! " + data.msg);
                        }
                        console.log("查询待摊！");
                    },
                    function(code){
						throw(code);
                    }
                );
            };
            
            //查询超赔待摊信息(生成待摊按钮入口过来)
            $scope.genQueryFxoPay = function(keywords, orderByWords, pagination, user, lan){
                claimService.genQueryFxoPay(keywords, orderByWords, pagination, user, lan).then(
                    function(data){
                        //$scope.fxoPayLists = data.data;
                        if(angular.isDefined(data)){
	                        $scope.fxoPayLists = data.data;
							pagination.totalItems = data.total;
                        } else {
                        	alert("查询失败! " + data.msg);
                        }
                        console.log("查询待摊！");
                    },
                    function(code){
						throw(code);
                    }
                );
            };
            
            /**eventEncode
             * @param keywords  【claimNo, riskUnitNo】
             * @param user     用户
             * @param lan    语言
             */
            $scope.eventEncode = function(event){
            	console.log($scope.fxoPayListParam);
                eventService.createEvent(event,$scope.fxoPayListParam, {}, {}).then(
                    function(data){
                    	if(data.result === 'success'){
                    		alert("create event success");
                    	}else{
                    		alert("create event failure!----"+data.msg);
                    	}
                    },
                    function(code){
                        console.log(code);
                    }
                );
            };

			//险类分摊
            $scope.serarchContract = function(keywords, orderByWords, pagination, user, lan){
            	console.log("---险类分摊---start serarchContract ....");
                claimService.serarchContract(keywords, orderByWords, pagination, user, lan).then(
                    function(data){
                        $scope.claimShare = data;
                    },
                    function(code){

                    }
                );
            };

            //事故打包
            $scope.createEventPag = function () {
                $modal.open({
                    templateUrl: 'claim/editor/claim.eventPag.tpl.html',
                    controller:'EventPagCtrl',
                    windowClass: 'modal-big',
                    resolve: {
                        fxoPayList:function(){
                            return  $filter('filter')($scope.fxoPayLists,{checked : true});
                        },
                        ricomCdes:function(){
                            return  $scope.ricomCdes;
                        }
                    }
                }).result.then(function (url) {
                        $location.path(url);
                    });
            };

            //条件查询赔案摊回信息
            $scope.searchClaims = function(){
                $scope.pagination.pageIndex = 1;
                $scope.searchFxoPay($scope.keywords, "asc", $scope.pagination, {}, {});
            };
            
            $scope.getCodeCode = function(code,condition){
                var keywords = {"id":code,"value":condition, "holdFlag": false};
                return $scope.getCodes(keywords,{}).then(
                    function(data){
                        console.log("code======"+data);
                      return data;
                    },
                    function(code){
                    return [];
                    }
                );
            };
            
            //按页码查询超赔摊回信息
            $scope.onSelectPage = function(pageIndex){
                $scope.pagination.pageIndex = pageIndex;
                var _pagination = angular.copy($scope.pagination);
                $scope.searchFxoPay($scope.keywords, "asc", _pagination, {}, {});
            };
            
            //赔案摊回结果列表全选按钮事件
            $scope.toggleAllCheck = function(){
            	$scope.checkAll = !$scope.checkAll;
                $.each($scope.fxoPayLists, function(index, claim){
                    claim.checked = $scope.checkAll;
                });
            };

            //监听列表是否全部被选中
            $scope.$watch('fxoPayLists', function(){
                if(angular.isDefined($scope.fxoPayLists)){
                    var _temp = $filter('filter')($scope.fxoPayLists, {checked:true});
                    $scope.selectCount = _temp.length;
                    if(_temp.length === $scope.fxoPayLists.length)
                        $scope.checkAll = true;
                    else
                        $scope.checkAll = false;
                }
            },true);

            //返回
            $scope.closeClaim = function () {
                var url = "/claims";
                $location.path(url);
            };
            //重置条件查询框（list2）
            $scope.resetSearchBox = function(){
                $scope.keywords={
                    "id":"",
                    "value":"",
                    "claimNo": "",
                    "productNodeCode":"",
                    "riskUnitNo":"",
                    "damageDateBeg": "",
                    "damageDateEnd":"",
                    "damageReason":"",
                    "cataType": "",
                    "cataName": "",
                    "claimNoType":"=",
                    "productNodeCodeType":"=",
                    "riskUnitNoType": "=",
                    "damageReasonType": "=",
                    "cataTypeType":"=",
                    "cataNameType":"="
                }
            };
            var init = function(){

                //全选按钮设置为未选中状态（不初始化为false）
                $scope.checkAll = false;

                //被选中的按钮个数
                $scope.selectedCount = 0;


                //初始化条件查询框（list2）
                $scope.resetSearchBox();

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

                //默认隐藏条件框
                $scope.hideSearchList();

                $scope.operation = $stateParams.operation;
                if($scope.operation ==='prepareRiskShare'){
                	$scope.prepareRiskShare ($scope.fxoPayListParam) ;
                }else if($scope.operation ==='createInsurance'){
                	//初始化超赔待摊列表
                    if(!($scope.prepageFlag===false)){
    	                $scope.searchFxoPay($scope.keywords, "asc", $scope.pagination, {}, {});
                    } else {
                    	$scope.genQueryFxoPay($scope.claimParam, "asc", $scope.pagination, {}, {});
                    }
                }else  if($scope.operation ==='editFxoPay'){
                	$scope.queryFxoPayDtl ($scope.fxoPayParam) ;
                }
                
                //将从超赔摊回页面生成待摊之后的条件框默认不显示
                $scope.searchTableFlag = false;
                //险位分摊
                //$scope.serarchContract($scope.keywords, "asc", $scope.pagination, {}, {});
                //$scope.serarchContract2($scope.keywords, "asc", $scope.pagination, {}, {});
                //$scope.fxoPayListParam = [];
            };

            init();
        }]);
});
