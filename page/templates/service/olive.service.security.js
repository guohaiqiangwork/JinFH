define(['angular', 'config', 'menus'], function (angular, config, menus) {
    /*-----------------------------------------
     *  登录安全
     ------------------------------------------*/
    angular.module('olive.service.security', [])

        .constant('SecurityServiceConfig', {
            files:{
                login: 'data/security/user.login.success.json',
                getUserMenu: 'data/security/user.menu.json',
                logout:'',
                updatePWD:''
            },
            urls:{
                login: config.backend.ip + config.backend.base + 'login.do',
                getUserMenu: config.backend.ip + config.backend.base + 'showMenu.do?actionType=showMenu',
                logout:config.backend.ip + config.backend.base +'user/logout.do',
                updatePWD:config.backend.ip + config.backend.base + 'user/updatePWD.do'
            }
        })
        .factory('SecurityService',['$http', '$q', 'SecurityServiceConfig', function ($http, $q, $securityServiceConfig) {

            var parseUserMenu = function(_bigMenu, _userMenu) {

                _bigMenu.menu = filterUserMenu(_bigMenu.menu, _userMenu);

                return _bigMenu;
            };

            var filterUserMenuId = function(_bigMenuId, _userMenu) {
				 var result = _bigMenuId;
               $.each(result, function(index, menu){
                    if ($.inArray(menu.id, _userMenu) === -1){
                    	menu.hide = true;
                   }
               });

               return result;
           };

            var filterUserMenu = function (_bigMenu, _userMenu) {

                var result = _bigMenu;

                $.each(result, function(index, menu){
                	if ($.inArray(menu.id, _userMenu) === -1){
                    	menu.hide = true;
                   }
                    if(angular.isDefined(menu.menus)){
                        filterUserMenuId(menu.menus, _userMenu);
                    }
                });

                if(angular.isDefined(result.menus))
                    return false;

                return result;
            };

            return {
                /**
                 * 用户登录
                 * @param user  用户信息
                 */
//                login: function (user) {
//
//                    var deffered = $q.defer();
//                    $http({
//                        method: config.data.method==='files'? 'GET':'POST',
//                        url: $securityServiceConfig[config.data.method].login,
//                        headers: {
//                        },
//                        data:{
//                            user: user
//                        },
//                        timeout: config.backend.timeout
//                    })
//                    .success(function(data){
//                        deffered.resolve(data);
//                    })
//                    .error(function(e, code){
//                        deffered.reject(code);
//                    });
//                    return deffered.promise;
//                },
//
                logout: function () {
	            	 var deffered = $q.defer();
	                 $http({
	                     method: config.data.method==='files'? 'GET':'POST',
	                     url: $securityServiceConfig[config.data.method].logout,
	                     headers: {
	                     },
	                     data:{
	                     },
	                     timeout: config.backend.timeout
	                 })
	                 .success(function(data){
	                     deffered.resolve(data);
	                 })
	                 .error(function(e, code){
	                     deffered.reject(code);
	                 });
	
	                 return deffered.promise;
                },

                getUserMenu: function (user) {
                    var deffered = $q.defer();
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: $securityServiceConfig[config.data.method].getUserMenu,
                        headers: {
                        },
                        data:{
                            user: user
                        },
                        timeout: config.backend.timeout
                    })
                    .success(function(data){
                        deffered.resolve(parseUserMenu(menus, data));
                    })
                    .error(function(e, code){
                        deffered.reject(code);
                    });

                    return deffered.promise;
                },
                /**
                 * 修改密码
                 * @param keyword:[oldpwd,newpwd]  新旧密码
                 * @param user    用户信息
                 * @param lan     语言
                 */
                updatePWD : function (keywords, user, lan) {
                    var deffered = $q.defer();
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: $securityServiceConfig[config.data.method].updatePWD,
                        headers: {
                        },
                        data:{
                        	keywords : keywords,
                            user : user,
                            lan : lan
                        },
                        timeout: config.backend.timeout
                    })
                    .success(function(data){
                        deffered.resolve(data);
                    })
                    .error(function(e, code){
                        deffered.reject(code);
                    });
                    return deffered.promise;
                }
            };
        }]);
});