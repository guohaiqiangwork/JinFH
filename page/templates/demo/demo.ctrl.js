define(['app',
    'config'
], function (app,config) {
    app.registerController('demoCtrl', ['$scope','growl',
        function ($scope,growl) {

            $scope.showGrowl = function (flag) {
                if(flag==='success'){
                    growl.addSuccessMessage('成功了！！');
                }
                if(flag==='error'){
                    growl.addErrorMessage('失败了');
                }
                if(flag==='Info'){
                    growl.addInfoMessage('文本信息');
                }
                if(flag==='warn'){
                    growl.addWarnMessage('警告');
                }
            };
        }]);
});