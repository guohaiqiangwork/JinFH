define(['app',
    'codes'
]
    , function (app, codes) {

        app.registerController('AccountEditCtrl', ['$scope', '$stateParams', 'SecurityService',
                                                   function ($scope , $stateParams, securityService) {

            
        	//修改密码
        	$scope.editPasswordService = function(keywords, user, lan){
        		
        		securityService.updatePWD(keywords, user, lan).then(
                         function (data) {
                        	 
                        	 //判断后台返回数据data.result, 成功，提示修改成功，否则提示修改失败
                        	 if(angular.isDefined(data.result)){
                        	 
                        	 	if(data.result === "success"){
                        	 		alert("修改成功！");
                        	 		//成功之后清空之前录入的数据
                        	 		$scope.keywords.oldpwd = "";
                        	 		$scope.keywords.newpwd = "";
                        	 		$scope.againpassword = "";
                        	 	} else {
                        	 		alert("修改失败！" + data.msg);
                        	 	}
                        	 
                        	 } else {
                        	 	alert("修改失败！");
                        	 }
                         },
                         function (code) {
                             throw(code);
                             alert("修改失败！");
                             //alert(message);
                         }
                     );
        	}
        	
        	
        	
        	//隐藏查询列表
            var init = function(){

            };

            init();
            $scope.editPassword=function()
            {
            		
            	//验证新密码与再次输入是否一致，如果一致则调用后台请求，否则弹出不一致的失败信息
            	if($scope.keywords.newpwd===$scope.againpassword){
            		//向后台请求数据
            		$scope.editPasswordService($scope.keywords, $scope.global.user, '');
            	} else {
            		alert("两次输入不一致!");
            	}
            			
            			
            }

        }]);
    });