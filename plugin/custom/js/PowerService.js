/**
 * 
 */
/***
 * 权限控制服务
 */
(function () {
    'use strict';
    angular
        .module('mes')
        .service('PowerService', PowerService);
    PowerService.$inject = ['$rootScope','$http','$q','$window','Notify','ngDialog'];
    function PowerService($rootScope,$http,$q,$window,Notify,ngDialog) {
    	  var userPower=null;
    	  var userTask=null;
    	  var userGrade=null;

    	  Activate();
     	  function Activate(){
     		 initUserPower;
    	  }
     	  
     	  function initUserPower(){
     		 var deferred = $q.defer();
             var promise = deferred.promise;
             
             //debugger;
             if($rootScope.loginUser!=null&&userPower!=null){
            	 deferred.resolve(userPower);
            	 return promise;
             }
             
     		  
       	   	$http.get("saa/user/getSessionUser.do",{params:{screenHeight:angular.element($window).height()}})
              .success(function (jsonData) {
                  $rootScope.loginUser = jsonData.loginUser;
                  
                  var firstFlag = jsonData.firstFlag;
                  if(firstFlag==true){
                	  Notify.alert("首次登录，请修改密码！", {status: 'warning'});
                	  ngDialog.open({
                          template: 'modules/bd/user/user-edit-dialog.html',
                          className: 'ngdialog-theme-default',
                          controller: 'UserInfoEditController',
                          width: 500,
                          // overlay: false,
                          showClose: false
                      });
                  }
                  //将用户权限放到权限控制变量，后续权限判断从这些变量中读取权限
                  $rootScope.userPower=jsonData.userPower;
                  userPower=jsonData.userPower;
                  userTask=userPower.taskMap;
            	  userGrade=userPower.gradeMap;
            	 
            	  deferred.resolve(userPower);
              })
              .error(function (errResponse) {
            	  deferred.reject(errResponse);
                  console.error('PowerService.getSessionUser Error : ' + errResponse);
              });
       	   
       	   	return promise;
     	  };
     	 this.initUserPower=initUserPower;
     	  //判断当前用户有没有taskCodes中任何一个任务代码
    	  this.hasTask = function (taskCodes) {
    		  if(taskCodes==null)return false;
    		  for(var i=0;i<taskCodes.length;i++){
    			  if(userTask[taskCodes[i]]!=null) return true;
    		  }
              return false;
          };
     	  //判断当前用户有没有gradeCodes中任何一个岗位代码
          this.hasGrade = function (gradeCodes) {
        	  if(gradeCodes==null)return false;
        	  for(var i=0;i<gradeCodes.length;i++){
    			  if(userGrade[gradeCodes[i]]!=null) return true;
    		  }
              return false;
          };
          //同时根据gradeCode和TaskCode判断有没有权限
          this.hasPower = function (gradeOrTaskCodes) {
        	  if(hasGrade[gradeOrTaskCodes]!=null) return true;
              if(hasTask[gradeOrTaskCodes]!=null) return true;
              return false;
          };

          this.hasButtonTask = function (buttonTaskMap,type) {

              //按钮权限功能放开
              return true;

              var validFlag = false;
              validFlag = buttonTaskMap[type];
              // angular.forEach(buttonTaskMap, function(value, key) {
              //     if(key.indexOf(type)>0){
              //         validFlag = true;
              //     }
              // });
              return validFlag;

          };
    
          this.getLoginUser=function(){
        	  return $rootScope.loginUser;
          };
    	
    };
})();