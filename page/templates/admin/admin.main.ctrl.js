define(['app',
    '/reins/page/templates/admin/admin.dohref.modal.ctrl'
], function (app) {
    'use strict';

    app.registerController('AdminMainCtrl', ['$scope', '$modal', function ($scope, $modal) {

    	//openNewWindow
        $scope.openNewWindow = function (url) {
            $modal.open({
                templateUrl: '/reins/page/templates/admin/admin.dohref.modal.tpl.html',
                controller: 'AdminDoHrefModalCtrl',
                windowClass: 'modal-big',
                resolve: {
                   urldo:function(){
                       return url ;
                   }
                }
            });
        };
    

    }]);
});
