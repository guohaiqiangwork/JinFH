define(['app'
], function (app) {
    app.registerController('RetentionEditorCtrl', ['$scope', '$stateParams', 'RetentionService', '$location'
        , function ($scope,$stateParams, retentionService, $location) {

        //查询字典
        $scope.getCode = function(keywords, user ,searcher){
            console.log(searcher+"查询字典条件======");
            console.log(keywords);
            $scope.getCodes(keywords, user).then(
                function(data){
                    $scope[searcher] = angular.copy(data);
                },
                function(code){
                    $scope[searcher] = [];
                }
            );
        };

            //保存(新增（new），编辑（update）)
            $scope.saveRetention = function(){
                if($scope.operation === 'new') {
                    retentionService.createRetention($scope.retention,{}).then(
                        function(data){
                            console.log($scope.retention);
                            alert("save new success!");
                        },
                        function(code){
                            throw(code);
                        }
                    )
                } else if($scope.operation === 'edit'){
                    retentionService.updateRetention($scope.retention,{}).then(
                        function(data){
                            console.log($scope.retention);
                            alert("save edit success!");
                        },
                        function(code){
                            throw(code);
                        }
                    )
                }
            }

        //切换编辑器模式
        $scope.toggleMode = function (_mode) {
            $scope.operation = _mode;
        };

        //返回
        $scope.closeRetention = function () {
            var url = "/admin/retentions";
            $scope.showSearchList();
            $location.path(url);
        };

        var init = function(){
        
        	//币种后台获取
            $scope.keywords = {
                "id":"",
                "value":""
            };
            $scope.keywords.value="currency";
            $scope.keywords.id="";
            $scope.getCode($scope.keywords,{},"currencys");

            //默认隐藏条件框
            $scope.hideSearchList();

            //初始化自留额列表
            $scope.retention = {
                "id":{
                    "uwYear":"",
                    "riskClass":"",
                    "riskCode":"",
                    "riskLevel":""
                },
                "riskClassDesc":"",
                "riskLevelDesc":"",
                "currency":"CNY",
                "retentionValue":null,
                "reMarks":null,
                "flag":null
            };

			console.log("retentionKeyword ...start");
			console.log($scope.retentionKeyword);
			console.log("retentionKeyword ...end");
            $scope.operation = angular.isUndefined($stateParams.operation)?"new":$stateParams.operation;
            $scope.retentionNo = angular.isUndefined($stateParams.retentionNo)? '': $stateParams.retentionNo;
            console.log("retention editor's operation's value is : " + $scope.operation);
            console.log("$scope.reinsurerNo value is : " + $scope.retentionNo);
            if($scope.operation ==='edit' || $scope.operation === 'view'){
                    retentionService.queryRetention($scope.retentionKeyword, {}).then(
                        function(data){
                            $scope.retention = data;
                            console.log("retention detail is coming ..."+ $scope.retention);
                        },
                        function(code){
                            throw(code);
                        }
                    )
            }

        }

        init();
    }]);

});
