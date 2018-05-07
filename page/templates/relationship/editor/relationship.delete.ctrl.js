define(['app','templates/service/olive.service.relationship'], function (app) {
    app.registerController( 'deleteRelationshipCtrl', ['$scope','$location', '$modal','$modalInstance','relationshipList', 'RelationshipService'
        , function ($scope, $location, $modal, $modalInstance, relationshipList, relationshipService) {

            //向后台传递删除列表
            var deleteRelationship = function(keywords){
                relationshipService.deleteRelationships(keywords,{}).then(
                    function(data){
                    	alert("删除成功！");
                    	$location.path("/relationships");
                       // console.log("---------------------------delete relationshipList result :");
                       // console.log(data);
                    },
                    function(code){
                    	alert("删除失败！");
                        // console.log("=============================relationshipService  error : "+code);
                    }
                );
            };
            //删除列表
            $scope.deleteList = function(){
                //向后台发送的要删除的列表的每一条的idz
                var keywords = [];
                $.each($scope.relationshipList,function(index,temp){
                    var keyword={};
                    keyword.uwYear=temp.uwYear;
                    keyword.treatyNo=temp.treatyNo;
                    keywords.push(keyword);
                });
                deleteRelationship(keywords);
                $modalInstance.close("ok");
            };
            //关闭窗口
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            var init  = function (){
                $scope.relationshipList = relationshipList ;
            };
            init();

        }]);
});