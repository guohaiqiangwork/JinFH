define(['app', 'codes','config'], function (app, codes, config) {

    app.controller('EventListDelete', ['$scope', '$modalInstance', 'eventList', 'pagination',
         function ($scope,$modalInstance, eventList, pagination) {


             //批量删除列表-----close 传值决定页面是否留在当前页面
             $scope.deleteList = function(){
                if($scope.events.length >= (pagination.totalItems - pagination.pageIndex * pagination.pageSize)){
                    $modalInstance.dismiss(1);
                }
             };

             //关闭窗口
             $scope.cancel = function () {
                 $modalInstance.dismiss();
             };
            var init = function(){

                $scope.events = eventList;

            };

            init();
        }]);
});
