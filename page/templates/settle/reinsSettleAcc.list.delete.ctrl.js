define(['app'	
], function (app) {
    app.registerController('SettleAccDeleteCtrl', ['$scope', '$stateParams', 'SettleAccService', '$location'
        , '$modalInstance', 'settleAccList'
        , function ($scope,$stateParams, settleAccService, $location, $modalInstance, settleAccList) {

    	  
            //向后台传递删除列表的关键字
            var deleteSettleAcc = function(settleNo){
                
                settleAccService.deleteSettleAcc(settleNo).then(
                    function(data){
                        //console.log(data);
                    	alert("删除成功！");
                    	$location.path("/settleAccs");
                    },
                    function(code){
                        throw(code);
                    }
                );
            };
//           
            //删除列表
            $scope.deleteList = function(){
                
          
                //向后台发送的要删除的列表的每一条的idz
                var keywords = [];
                var keyword={};
                $.each($scope.settleAccList,function(index,temp){
                    /**
                     * <td>{{settleAcc.settleNo}}</td>
		            <td>{{settleAcc.payCode}}</td>
		            <td>{{settleAcc.payName}}</td>
		            <td>{{settleAcc.currency}}</td>
		            <td>{{settleAcc.settleValue}}</td>
		            <td>{{settleAcc.operatorCode}}</td>
		            <td>{{settleAcc.operateDate.time | date : config.display.dateFormat}}</td>
		            <td>{{settleAcc.sendDate.time | date : config.display.dateFormat}}</td>
		            <td>{{settleAcc.sendFlag}}</td>
                     */
                    keyword.settleNo=temp.settleNo;
                    keyword.payCode=temp.payCode;
                    keyword.payName=temp.payName;
                    keyword.currency=temp.currency;
                    keyword.settleValue=temp.settleValue;
                    keyword.operatorCode=temp.operatorCode;
                    keyword.operateDate=temp.operateDate;
                    keyword.sendDate=temp.sendDate;
                    keyword.sendFlag=temp.sendFlag;
                    keywords.push(keyword);
                  
                   
                    console.log(temp.payCode);
                    console.log(temp.shortName);
                    // add by renshuai 
                    
//                    settleAccService.deleteSettleAcc(keyword.settleNo).then(
//                            function(data){
//                                //console.log(data);
//                            	alert("删除成功！");
//                            	$location.path("/settleAccs");
//                            },
//                            function(code){
//                                throw(code);
//                            }
//                        );
                    //
                });
                deleteSettleAcc(keyword.settleNo);
                $modalInstance.close("ok");
            };
            //关闭窗口
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };


            //初始化函数
            var init = function(){
                $scope.settleAccList = settleAccList;
            }          	
            init();
        }]);
});