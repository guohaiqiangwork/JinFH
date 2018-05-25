define(['app',
    'config'
], function (app,config) {
    app.registerController('permissionCtrl', ['$scope','$modal','PostCodesService',
        function ($scope,$modal,PostCodesService) {
            $scope.searchTable ={
                flag:false
            };
            //打开查询面板
            $scope.openSearch = function () {
                $scope.searchTable.flag=true;
            };
            //关闭查询面板
            $scope.closeSearch = function () {
                $scope.searchTable.flag=false;
            };

            //查询员工信息
            $scope.searchPermissionList = function (keywords) {
                PostCodesService.searchPermission(keywords,$scope.pagination).then(
                    function(data){
                        $scope.personList = data.data;
                        $scope.pagination.totalItems = data.total;
                    },function(code){
                        throw(code);
                    }
                );
            };
            //员工配置
            $scope.permissionDeploy = function (person) {
                $modal.open({
                    backdrop: 'true',
                    animation: true,
                    windowClass: 'modal-big',
                    templateUrl:'/reins/page/templates/authoritys/modal/permission.deploy.modal.tpl.html',
                    resolve: {
                    },
                    controller: function ($scope, $modalInstance) {
                        $scope.onePerson = person;
                        //初始化配置
                        PostCodesService.permissionDeploy().then(
                            function(data){
                                $scope.permissionDeployList = data.data;
                                $.each($scope.permissionDeployList, function (index, permissionDeploy) {
                                    permissionDeploy.checkedDeploy = false;
                                });
                            },function(code){
                                throw(code);
                            }
                        );
                        //选中
                        $scope.checkedDeploy = function (deploy) {
                            $.each($scope.permissionDeployList,function (index,permissionDeploy) {
                                if(deploy.id !== permissionDeploy.id){
                                    permissionDeploy.checkedDeploy = false;
                                }
                            });
                        };
                        //保存
                        $scope.savePermissionDeploy = function () {
                            var keywords='';
                            $.each($scope.permissionDeployList,function (index,permissionDeploy) {
                                    if(permissionDeploy.checkedDeploy){
                                        keywords = permissionDeploy;
                                    }
                            });
                            if(!keywords){
                                alert('请选择岗位');
                                return false;
                            }
                            PostCodesService.savePermissionDeploy(keywords,person.userCode).then(
                                function(data){
                                    if(data.result==="susses"){
                                        alert('保存成功！！');
                                        $modalInstance.close(data.result);
                                    }
                                    console.log(data.result);
                                },function(code){
                                    throw(code);
                                }
                            );
                        };
                        $scope.close = function () {
                            $modalInstance.dismiss();
                        };
                    }
                }).result.then(function (data) {
                    if(data==='susses'){
                        $scope.searchPermissionList($scope.keywords);
                    }
                });
            };
            //员工重置
            $scope.permissionReset = function (keywords) {
                PostCodesService.permissionReset(keywords).then(
                    function(data){
                        if(data.result==="susses"){
                            $scope.searchPermissionList($scope.keywords);
                            alert('重置成功！！');
                        }
                        console.log(data.result);
                    },function(code){
                        throw(code);
                    }
                );
            };
            //密码管理
            $scope.passwordManager = function (person) {
                $modal.open({
                    backdrop: 'true',
                    animation: true,
                    windowClass: 'modal-big',
                    templateUrl:'/reins/page/templates/authoritys/modal/passwordManager.modal.tpl.html',
                    resolve: {
                    },
                    controller: function ($scope, $modalInstance) {

                        $scope.person=person;


                        $scope.person.newPassword = '';
                        $scope.person.secondPassword = '';
                        $scope.savePassword = function (keywords) {
                            if(!keywords.oldPassword){
                                alert('请输入旧密码');
                                return false;
                            }
                            if(!keywords.newPassword){
                                alert('请输入新密码');
                                return false;
                            }
                            if(!keywords.secondPassword){
                                alert('请输入重复密码');
                                return false;
                            }
                            if(keywords.newPassword !==keywords.secondPassword){
                                alert('新密码与重复密码不一致，请重新输入');
                                return false;
                            }
                            PostCodesService.passwordManager(keywords).then(
                                function(data){
                                    if(data.result==="success"){
                                        alert('修改成功！！');
                                        $modalInstance.close(data.result);
                                    }else  if(data.result==="error"){
                                        alert('旧密码输入错误！！');
                                    }
                                },function(code){
                                    throw(code);
                                }
                            );
                        };

                        $scope.close = function () {
                            $modalInstance.dismiss();
                        };
                    }
                }).result.then(function (data) {
                    if(data==='susses'){
                        $scope.searchPermissionList($scope.keywords);
                    }
                });
            };
            //根据页号查询合同列表
            $scope.onSelectPage = function(pageIndex){
                $scope.pagination.pageIndex = pageIndex;
                var _pagination = angular.copy($scope.pagination);
                PostCodesService.searchPermission($scope.keywords,_pagination).then(
                    function(data){
                        $scope.personList = data.data;
                        $scope.pagination.totalItems = data.total;
                    },function(code){
                        throw(code);
                    }
                );
            };


          //重置查询框中内容
            $scope.resetSearchBox = function(){
                $scope.keywords = {
                		  userCodeTag:'=',
                          userCode:'',
                          comCodeTag:'=',
                          comCode:'',
                          userNameTag:'=',
                          userName:''
                };
                $scope.searchPermissionList($scope.keywords);
            };
            $scope.searchRiskCode = function(id){
                $scope.keys = {
                    "id":"",
                    "value":"",
                    "other1":""
                };
                $scope.keywords.id = $scope.classCode;
                var key = angular.copy($scope.keys);
                key.id = id;
                key.value = '';
                $scope.getCode(key, {}, id);
            };
            //查询字典
            var searchFlag = true;
            $scope.searchList = [];
            $scope.getCode = function(key,user,searcher){
                var temp = angular.copy({keywords:key,searcher:searcher});
                $scope.searchList.push(temp);
                if(searchFlag && $scope.searchList.length > 0){
                    ralSearch(user);
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
            
            var init = function(){
                //分页信息
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
                $scope.keywords = {
                    userCodeTag:'=',
                    userCode:'',
                    comCodeTag:'=',
                    comCode:'',
                    userNameTag:'=',
                    userName:''
                    	
                };
                //初始化查询
                PostCodesService.searchPermission($scope.keywords,$scope.pagination).then(
                    function(data){
                        $scope.personList = data.data;
                        $scope.pagination.totalItems = data.total;
                    },function(code){
                        throw(code);
                    }
                );
                $scope.searchRiskCode('userCode');
                $scope.searchRiskCode('comCode');
            };
            init();

        }]);

});