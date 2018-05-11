define(['app'	
], function (app) {
    app.registerController('ReinsurerDeleteCtrl', ['$scope', '$stateParams', 'ReinsurerService', '$location'
        , '$modalInstance', 'reinsurerList','$state'
        , function ($scope,$stateParams, reinsurerService, $location, $modalInstance, reinsurerList,$state) {

            //向后台传递删除列表的关键字
            var deleteReinsurer = function(keywords){
                console.log(keywords);
                reinsurerService.deleteReinsurers(keywords,{}).then(
                    function(data){
                        //console.log(data);
                    	alert("删除成功！");
                    	/*$location.path("/reinsurers");*/
                   	 $state.go('reinsurer')
                    },
                    function(code){
                        throw(code);
                    }
                );
            };
           
            //删除列表
            $scope.deleteList = function(){
                console.log('遍历数据：');
                console.log($scope.reinsurerList);
                //向后台发送的要删除的列表的每一条的idz
                var keywords = [];
                $.each($scope.reinsurerList,function(index,temp){
                    var keyword={};
                    keyword.validStatus=temp.validStatus;
                    keyword.reinsCode=temp.reinsCode;
                    keyword.shortName=temp.shortName;
                    keywords.push(keyword);
                    console.log(temp.validStatus);
                    console.log(temp.reinsCode);
                    console.log(temp.shortName);
                });
                deleteReinsurer(keywords);
                $modalInstance.close("ok");
            };
            //关闭窗口
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };


            //初始化函数
            var init = function(){
                $scope.reinsurerList = reinsurerList;
            }          	
            init();
        }]);
});