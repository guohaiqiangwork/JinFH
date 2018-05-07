define(['app'
], function (app) {

    app.controller('FacingIntentionCtrl', ['$scope','$stateParams','$modalInstance', 'dangerUnitFacEnquiry','RiskunitService',
        function ($scope, $stateParams, $modalInstance, dangerUnitFacEnquiry, riskunitService) {

            //临分意向--保存
            $scope.saveFacPlyInfo = function(certiType, facPlyInfo, user, lan) {
                alert("(临分意向--保存)saveFacPlyInfo's is coming...");
                /*riskunitService.saveFacPlyInfo(certiType, facPlyInfo, user, lan).then(
                    function(data){
                        //$scope.showReinsShareList = data.data;
                        //pagination.totalItems = data.total;
                    },
                    function(code){
                        throw(code);
                        //alert(message);
                    }
                );*/
            };

            //临分意向--确定
            $scope.getFacPayment = function(contAttr, certiType, facPlyInfo, user, lan) {
                alert("(临分意向--确定)getFacPayment's is coming...");
                riskunitService.getFacPayment(contAttr, certiType, facPlyInfo, user, lan).then(
                    function(data){
                        //$scope.showReinsShareList = data.data;
                        //pagination.totalItems = data.total;
                    },
                    function(code){
                        throw(code);
                        //alert(message);
                    }
                );
            };



            var init = function(){

                $scope.dangerUnitFacEnquiry = dangerUnitFacEnquiry;
            };

            init();
        }]);
});
