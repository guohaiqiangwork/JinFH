define(['app',
	'codes']
, function (app, codes) {

    app.registerController('HandledealCtrl', ['$scope', 'HandledealService', function ($scope, handledealService) {

		//获得手工处理类型
		var getHandleCertiType = function(){
			return codes['handleCertiType'];
		}
		
		//获得手工处理赔款类型
		var getHandleClmassType = function(certiType){
			return codes['handleClmassType' + certiType];
		}

		//分保,分批计算接口
        $scope.countDeal = function(keywords, user) {
        	$scope.showBusy(true);
            handledealService.countDeal(keywords, user).then(
                function(data){
                	if(data.result==="success"){
                		  alert("处理成功!");
  	              	 }else
  	              		 alert("处理失败!");
  	                	$scope.showBusy(false);
                },
                function(code){
                    throw(code);
                    $scope.showBusy(false);
                    $scope.$emit('notification', {message:'未查找到相关信息', delay:3000, type:'error'});
                }
            );
        };
        
        //分摊计算接口
        $scope.claimCount = function(reinsurer, user) {
        	$scope.showBusy(true);
            handledealService.claimCount(reinsurer, user).then(
                function(data){
                	if(data.result==="success"){
              		  alert("处理成功!");
	              	 }else
	              		 alert("处理失败!");
	                	$scope.showBusy(false);
                },
                function(code){
                    throw(code);
                    $scope.showBusy(false);
                    $scope.$emit('notification', {message:'未查找到相关信息', delay:3000, type:'error'});
                }
            );
        };


		//分保,分批计算    
    	$scope.countDealClick = function(){
    		if(confirm("确认要做分保，分批计算吗？")){
	    		$scope.countDeal("","");
    		}
    	};
    	
    	//分摊计算
    	$scope.claimCountClick = function(keywords){
    		if(confirm("确认要做分摊计算吗？")){
    			$scope.claimCount(keywords,"");
   			}
    	};
    	
    	var init = function(){
    	
    		$scope.options = {
                certiTypes : getHandleCertiType(), //类型
    			clmassTypes : getHandleClmassType(1), //赔款类型
    			registerNo : '', //立案号
    			replevyRegistNo : '', //追偿立案号
    			sumClaimTime: '' //次数
            };
    	
    		//初始化查询列表
    		$scope.keywords = {
    			certiType : $scope.options.certiTypes[0].id, //类型
    			clmassType : $scope.options.clmassTypes[0].id, //赔款类型
    			registerNo : '', //立案号
    			replevyRegistNo : '', //追偿立案号
    			sumClaimTime: '' //次数
    		};
    		
    		$scope.$watch('keywords.certiType', function(){
	            $scope.options.clmassTypes = getHandleClmassType($scope.keywords.certiType);
	            if($scope.options.clmassTypes.length>0)
	                $scope.keywords.clmassType = $scope.options.clmassTypes[0].id;
	            else
	                $scope.keywords.clmassType = '';
	        });
    	};
    	
    	init();

    }]);
});