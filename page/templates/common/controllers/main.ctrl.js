define(['app', 'config'], function (app, config) {

    app.controller('MainCtrl', ['$scope', '$translate', '$timeout', '$interval', '$cookies', 'CodeService', 'SecurityService', '$q',
        function ($scope, $translate, $timeout, $interval, $cookies, codeService, securityService, $q) {

            $scope.getCodes = function(keywords, user){
                var deffered = $q.defer();
                codeService.getCodes(keywords, user).then(
                    function(data){
                        deffered.resolve(angular.copy( data));
                    },
                    function(code){
                        deffered.reject(code);
                    }
                );
                return deffered.promise;
            };
            //所有百分比input框进行格式化时选用
            $scope.formatPercent = function(input){
                var t = /^(((([0-9]{1,2})(\.[0-9]{1,6})?)|100(\.[0]{1,6})?))$/;
                if(t.test(input)){
                    var temp = (input+"").split(".");
                    var result = "";
                    if(temp.length>1){
                        for(var i = temp[1].length; i < 6; i++){
                            temp[1] = temp[1]+""+0;
                        }
                        result = temp[0]+"."+temp[1];
                        return (result);

                    }else{
                        return   (input +".000000");
                    }
                }else{
                    return input;
                }
            };
//        //-----------------------------------------------
            $scope.config = config;

            $scope.menus = {};

            $scope.global = {
                app: {
                    status: 'ready'
                },
                lang: config.app.lang || 'zh-cn',
                window: {
                    width: $(window).width(),
                    height: $(window).height()
                },
                viewType: 'table',
                notification: {},
                user: {},
                isBusy:false
            };

            //控制旋转图片显示
            $scope.showBusy = function (_busy) {
                $scope.global.isBusy = _busy;
            };

            //计算分页列表的序号
            $scope.getListIndex = function (_index, _pagination) {
                return _index + 1 + (_pagination.pageIndex-1) * _pagination.pageSize;
            };


            //响应浏览器窗口大小的变化
            $(window).on('resize', function () {
                $scope.global.window.width = $(window).width();
                $scope.global.window.height = $(window).height();
                $scope.$apply();
            });

            var notification_timeout;

            $scope.$on('notification', function(event, notification){

                $scope.global.notification = notification;

                var delay = angular.isNumber(notification.delay)? notification.delay: 2000;

                //延时关闭提示消息
                if(notification_timeout)
                    $timeout.cancel(notification_timeout);

                notification_timeout = $timeout(function(){
                    $scope.closeNotification();
                }, delay);
            });

            $scope.closeNotification = function(){
                $scope.global.notification = {};
            };
            
            var UrlDecode=function(utftext) {
            	var string = "";  
                var i = 0;  
                var c = c1 = c2 = 0;  
           
                while ( i < utftext.length ) {  
           
                    c = utftext.charCodeAt(i);  
           
                    if (c < 128) {  
                        string += String.fromCharCode(c);  
                        i++;  
                    }  
                    else if((c > 191) && (c < 224)) {  
                        c2 = utftext.charCodeAt(i+1);  
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
                        i += 2;  
                    }  
                    else {  
                        c2 = utftext.charCodeAt(i+1);  
                        c3 = utftext.charCodeAt(i+2);  
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
                        i += 3;  
                    }  
                }  
                return string;       
            };
            
            var userData ={
    	        user: {
    	        	usercode: 'admin',
    	            img: '../plugin/images/4.png',
    	            username: '',
    	            nickname: ''
    	        }
    	    } ;
            
            var readUserFromLocal = function () {
                var JSESSIONID = localStorage.getItem("JSESSIONID");
                if(JSESSIONID!=null){
                	 $scope.global.user.usercode = localStorage.getItem("usercode");
                	 $scope.global.user.username = localStorage.getItem("username");
                	 $scope.global.user.nickname = localStorage.getItem("nickname");
                }  

            	return true;
            };

            var getUserMenu = function() {
                securityService.getUserMenu($scope.global.user)
                    .then(
                    function(data){
                        $scope.menus = data;
                    },
                    function(){

                    }
                );
            };
            
            
            var init = function () {
            	if(readUserFromLocal()) {
                    getUserMenu();
                    startTimer();
            	}else{
                    window.location.href = '../login.html';
                }


            };

            //计时退出ngidle.
            var startTimer  = function(){
            	
                 $scope.$on('$idleTimeout', function() {
                     $scope.logout();
                 });
            }
           
            init();

        }])
        .config(function($idleProvider, $keepaliveProvider) {
            $idleProvider.idleDuration(1);
            $idleProvider.warningDuration(75600);
            $keepaliveProvider.interval(10);
        })
        .run(function($rootScope, $idle, $log, $keepalive){
            $idle.watch();
            $log.debug('app started.');
        });
});