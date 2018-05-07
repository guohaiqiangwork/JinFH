define(['app'
], function (app) {
    app.controller('RetentionDeleteCtrl', ['$scope', '$stateParams', 'RetentionService', '$location'
        , '$modalInstance', 'retentionList'
        , function ($scope,$stateParams, retentionService, $location, $modalInstance, retentionList) {

            $scope.retentionList = retentionList;

            //向后台传递删除列表的关键字
            var deleteRetention = function(keywords){
                retentionService.deleteRetentions(keywords,{}).then(
                    function(data){
                        console.log(data);
                    },
                    function(code){
                        throw(code);
                    }
                );
            };

            //删除列表
            $scope.deleteList = function(){
                //向后台发送的要删除的列表的每一条的idz
                var keywords = [];
                $.each($scope.retentionList,function(index,temp){
                    var keyword={};
                    keyword.acceptCode=temp.acceptCode;
                    keyword.acceptName=temp.acceptName;
                    keyword.acceptEnglishName=temp.acceptEnglishName;
                    keyword.acceptType=temp.acceptType;
                    keyword.domeOverFlag=temp.domeOverFlag;
                    keywords.push(keyword);
                });
                deleteRetention(keywords);
            };

            //关闭窗口
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };


            //初始化函数
            var init = function(){

            }

            init();
        }]);
});