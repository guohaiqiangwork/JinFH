define(['app', 'codes'], function (app, codes) {

    app.controller('NewFinalRecepterCtrl', ['$scope', '$stateParams', '$modalInstance', 'contAttr'
        , function ($scope, $stateParams, $modalInstance, contAttr) {

        $scope.contAttr = contAttr;

        $scope.ok = function () {

            $modalInstance.close(url);
        };


        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        var init = function(){
            $scope.abc = {
                fhxFinalReinsList:{
                    
                        "layerNo": "",
                        "reinsCode": "",
                        "freinsCode": "",
                    "treatyNo": "",
                    "reinsName": "",
                    "freinsName": "",
                    "payCode": "",
                    "payName": "",
                    "shareRate": ""
                }
            };

            //获取翻译对象
            $scope.codes = codes;
        };

        init();
    }]);
});