define(['app',
    'config'   
], function (app, config) {
    app.registerController('ReinsurerEditRecordCtrl', ['$scope', '$filter', '$q', '$modal', '$stateParams','$location', 'ReinsurerService',
                        function ($scope, $filter, $q, $modal, $stateParams, $location, reinsurerService) {
    	     
      //修改记录查询
        $scope.prpDReinsEditRecord = function(reinsurerNo,pagination){
        	console.log('获取再保人修改轨迹reinsCode:' + reinsurerNo);
            reinsurerService.prpDReinsEditRecord(reinsurerNo,pagination).then(
        			function(data){
                        console.log("返回数据"+data.data);
                        $scope.reinsurerList = data.data;
                        pagination.totalItems = data.total;
                        console.log("reinsurerList's value is : " + $scope.reinsurerList);
                    },
                    function(message){
                    }  
                ); 
        };


        var init = function () {                
        	console.log('获取再保人修改轨迹reinsCode:');
        	
        	$scope.reinsurerNo = angular.isUndefined($stateParams.reinsurerNo)? '': $stateParams.reinsurerNo;

            //分页初始化
            $scope.pagination = {
                totalItems:0,
                pageIndex:1,
                pageSize:10,
                maxSize:4,
                numPages:4,
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };
            
            //查询再保人修改记录
            $scope.prpDReinsEditRecord($scope.reinsurerNo, $scope.pagination);

        };

        init();

    }]);
});