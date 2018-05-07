define(['app', 'codes'], function (app, codes) {

    app.registerController('AdminDoHrefModalCtrl', ['$scope', '$stateParams', '$modalInstance', 'urldo'
        , function ($scope, $stateParams, $modalInstance, _urldo) {

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            $scope.urldo = _urldo;
           console.log($scope.urldo);
        }]);
});
