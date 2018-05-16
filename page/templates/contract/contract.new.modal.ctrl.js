define(['app', 'codes'], function (app, codes) {

    app.registerController('NewContractModalCtrl', ['$scope', '$stateParams', '$modalInstance', 'contAttr'
        , function ($scope, $stateParams, $modalInstance, contAttr) {

        $scope.ok = function () {
            var url = "";
            if($scope.options.contAttr === 'prop'){
            	debugger
            	console.log($stateParams)
                url = "/contracts/" + $scope.options.contAttr + "/" + $scope.options.optType + "/" + $scope.options.treatyType + "/new/admin";
            } else {
                url = "/contracts/" + $scope.options.contAttr + "/" + $scope.options.inoutMrk + "/" + $scope.options.treatyType + "/new/admin";
            }
            $modalInstance.close(url);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        var init = function(){
            $scope.options = {
                contAttr: contAttr,
                inoutMrk: '0',
                contOutTyp: 'B',
                bsnsTyp: '0',
                treatyType:'U'
            };

            //获取翻译对象
            $scope.codes = codes;
        };

        init();
    }]);
});