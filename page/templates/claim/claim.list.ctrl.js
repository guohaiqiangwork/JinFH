define(['app',
    'config',
    'codes',
    'claim/editor/claim.insurance.ctrl',
    'claim/editor/claim.eventPag.ctrl'
], function (app, config, codes) {

    app.registerController('ClaimListCtrl', ['$scope', '$stateParams', '$filter', '$modal', '$location', 'ClaimService',
        function ($scope, $stateParams, $filter, $modal, $location, claimService) {


            //查询赔案
            $scope.searchClaim = function(keywords, orderByWords, pagination, user, lan) {
                console.log("(查询赔案)searchClaim's is coming..");
                claimService.searchClaim(keywords, orderByWords, pagination, user, lan).then(
                    function(data){
                        $scope.claimList = data.data;
                        pagination.totalItems = data.total;
                    },
                    function(code){
                        throw(code);
                        //alert(message);
                    }
                );
            };

            //生成待摊信息
            $scope.createFxoPayP = function(claimList) {
                var claim =  $filter('filter')(claimList, {checked:true});
                $scope.claimParam = claim;
                console.log("生成待摊事件");
                console.log(claim);
                console.log($scope.global.user);
                $scope.createFxoPay(claim, "", $scope.global.user, "");
            }

            //生成待摊信息接口
            $scope.createFxoPay = function(claimNo, riskUnitNo, user, lan) {
                claimService.createFxoPay(claimNo, riskUnitNo, user, lan).then(
                    function(data){
                        console.log("生成待摊信息接口");
                        if(angular.isDefined(data)){
                        	if(data.result==="success"){
								alert("生成成功！");
	                        	$scope.prepageFlag = false;
	                        	$location.path("/claims/createInsurance");
                        	} else {
                        		alert("生成失败! " + data.msg);
                        	}
                        }
                    },
                    function(code){
                        throw(code);
                        //alert(message);
                    }
                );
            };
            
           //险类分摊
            $scope.prepareRiskShare_pre = function(fxoPayList) {
            	var selectedFxoPayList =  $filter('filter')(fxoPayList, {checked:true});
               // $scope.fxoPayParam = fxoPay;
            	$scope.fxoPayListParam = selectedFxoPayList;
                console.log("生成待摊事件");
                if($scope.checkNoRepeat(selectedFxoPayList)){
                	$location.path("/claims/prepareRiskShare");
                }
            };
            
            $scope.checkNoRepeat = function(fxoPayList){
            	var claimNoTmp = fxoPayList[0].claimNo;

            	$.each(fxoPayList, function(index, temp){
            		if( !(temp.claimNo === claimNoTmp)){
            			alert("参与分摊的赔案必须属于同一立案！");
            			return false;
            		}
            	});
            	return true;
            };
            
            //修改待摊金额前，需要先查下目前的待摊信息
            $scope.editFxoPay_pre = function(fxoPayList) {
            	var fxoPay =  $filter('filter')(fxoPayList, {checked:true});
             	$scope.fxoPayParam = fxoPay;
                console.log("生成待摊事件");
                $location.path("/claims/editFxoPay");
            };
            

            //修改待摊金额
            $scope.modifyFxoPay = function(claimNo, riskUnitNo, user, lan) {
                console.log("(修改待摊金额)modifyFxoPay's is coming..");
                claimService.modifyFxoPay(claimNo, riskUnitNo, user, lan).then(
                    function(data){
                        console.log($scope.claimList);
                    },
                    function(code){
                        throw(code);
                        //alert(message);
                    }
                );
            };

            //查询字典
            $scope.getCode = function(keywords, user ,searcher){
                $scope.getCodes(keywords, user).then(
                    function(data){
                        $scope[searcher] = angular.copy(data);
                        console.log($scope.ricomCdes);
                    },
                    function(code){
                        $scope[searcher] = [];
                    }
                );
            };
            
            //条件查询赔案摊回信息
            $scope.searchClaims = function(){
                $scope.pagination.pageIndex = 1;
                $scope.searchClaim($scope.keywords, "asc", $scope.pagination, {}, {});
            };
            
            //按页码查询超赔摊回信息
            $scope.onSelectPage = function(pageIndex){
                $scope.pagination.pageIndex = pageIndex;
                var _pagination = angular.copy($scope.pagination);
                $scope.searchClaim($scope.keywords, "asc", _pagination, {}, {});
            };
            

            //赔案摊回结果列表全选按钮事件
            $scope.toggleAllCheck = function(){
                $scope.factor.checkAll = !$scope.factor.checkAll;
                $.each($scope.claimList, function(index, claim){
                    claim.checked = $scope.factor.checkAll;
                });
            };
            
            //监听列表是否全部被选中
            $scope.$watch('claimList', function(){
                if(angular.isDefined($scope.claimList)){
                    var _temp = $filter('filter')($scope.claimList, {checked:true});
                    $scope.selectedCount = _temp.length;
                    if(_temp.length === $scope.claimList.length)
                        $scope.factor.checkAll = true;
                    else
                        $scope.factor.checkAll = false;
                }
            },true);
            
            //事故打包按钮操作支持-------------------start   ---------------------------------

            //事故打包
            $scope.createEventPag_pre = function(fxoPayList) {
            	var selectedFxoPayList =  $filter('filter')(fxoPayList, {checked:true});
            	//$scope.createEventPagPrepare (selectedFxoPayList);
            	$scope.fxoPayListParam = selectedFxoPayList;
                console.log("createEventPag_pre==");
                $location.path("/claims/preEncodeEvent");
            };

            //向事故包中添加新事故
            var addToEventBox = function(events){

            };

            //从事故包中删除事故
            var delFormEventBox = function(events){

            };

            //同步状态(页面包含事故包中的内容时，设置成被选中状态----仅页面跳转,添加新事故时调用)
            var setEventStates = function(){

            };

//            //判断事故打包按钮是否失效
//            $scope.setEventPagFlag = function(){
//                console.log($scope.fxoPayLists);
//                var temp = $filter('filter')($scope.fxoPayLists, {checked:true});
//                console.log(temp);
//                var _temp = $filter('filter')($scope.fxoPayLists,{checked:true});
//                console.log(_temp);
//                var _flag = true;
//                $.each(_temp,function(index, e){
//                    if(e.eventCode === ""){
//                        _flag = false;
//                        return ;
//                    }
//                });
//                    alert(_flag);
//                $scope.factor.eventPagFlag = _flag;
//            };

            //事故打包按钮操作-------------------end  ---------------------------------
            //重置超赔摊回查询条件
            $scope.resetSearchBox = function(){
                $scope.keywords = {
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
                };
            };
            
            //隐藏查询列表
            $scope.hideSearchList = function (){
                $scope.hideList = true;
            };

            //查询、列表框显示
            $scope.showSearchList = function () {
                $scope.hideList = false;
            };

            var init = function(){

                //用来定义各种条件与临时变量
                $scope.factor = {
                    checkAll:false,    //赔案摊回结果列表全选按钮默认为false
                    eventPagBag :[],   //已选事故袋
                    eventPagFlag : true   //事故打包 是否失效
                };

                //选中的赔案摊回结果条数
                $scope.selectedCount = 0;

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
                //初始化查询框查询条件
                $scope.resetSearchBox();

                $scope.$on('$stateChangeStart', function(event, next) {
                    if(next.name === 'claim')
                        $scope.showSearchList();
                    if(next.name === 'claim.operation')
                        $scope.hideSearchList();
                });


                //接受人部分输入查询
             /*   $scope.keywords.id = "";
                $scope.keywords.value="reinsCode";
                $scope.getCode($scope.keywords,"asc","ricomCdes");*/

                //查询赔案摊回列表
                $scope.searchClaim($scope.keywords, "asc", $scope.pagination, {}, {});
                
                //生成待摊按钮和待摊处理按钮入口标志位
                $scope.prepageFlag = true;
                
                //查询待摊列表条件初始化
                $scope.claimParam = [];

            };

            init();
        }]);
});
