define(['app'
], function (app) {

    app.registerController('EventPagCtrl', ['$scope', '$stateParams','ricomCdes',  'EventService','$modalInstance',
        function ($scope,  $stateParams, ricomCdes, fxoPayList, eventService,$modalInstance) {

            $scope.selectCurrry =  function(abc,def){
                $scope.treatyNo_sectionNo = abc;
                $.each(def,function(index,x){
                    if(!angular.isUndefined( x.certiNo )){
                    /*if(x.certiNo != "undefined"){*/
                        $scope.xyz = x.certiNo + "," + $scope.xyz;
                    }
                });
                $scope.certiNos = $scope.xyz.split(",");

                eventService.setEventExchRate($scope.treatyNo_sectionNo, $scope.certiNos).then(
                    function(data){
                        $scope.setEventExchRate = data;
                        console.log("--------start");
                        console.log($scope.setEventExchRate);
                        console.log("--------end");
                    },
                    function(code){
                        throw(code);
                        //alert(message);
                    }
                );

                console.log($scope.treatyNo_sectionNo);
                console.log($scope.certiNos);
            }


            //关闭事故打包窗口
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            //事故打包
            /*$scope.createEventPagPrepare = function(fxoPayList){
                eventService.createEvent(fxoPayList, {}, {}).then(
                    function(data){
                        console.log(data);
                        alert("pagEvent success!");
                    },
                    function(code){
                        console.log(code);
                    }
                );
            };*/
            
            

            //事故追加
            /**
             * @param keywords  【claimNo, riskUnitNo】
             * @param user     用户
             * @param lan    语言
             */
            $scope.updateEvent = function(){
                console.log($scope.keywords);
                eventService.updateEvent($scope.keyword, {}, {}).then(
                    function(data){
                        alert("update event success");
                        console.log(data);
                    },
                    function(code){
                        console.log(code);
                    }
                );
            };

            var init = function(){
                $scope.ricomCdes = ricomCdes;
            };

            init();
        }]);
});
