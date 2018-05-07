define(['app',
    	'config',
    	'codes',
    	'/reins/page/templates/common/directives/currency.js',
    	'/reins/page/templates/service/olive.service.settleInvoice.js'
], function (app, config, codes) {
    app.registerController('SettleInvoiceEditCtrl', ['$scope', '$stateParams','$location', '$filter','SettleInvoiceService', 
        function ($scope, $stateParams,$location, $filter,settleInvoiceService) {
        	
        	$scope.getInvoiceListImp = function() {
           	  settleInvoiceService.getInvoiceList($scope.pkgNo,$scope.freinsCode,'', '').then(
                     function(data){
                     		 $scope.chargeOffPkg = data;
                     }
                );
            };
                       
            $scope.saveInvoiceList = function() {
             	  settleInvoiceService.saveInvoiceList($scope.operation,$scope.chargeOffPkg,'', '').then(
                       function(data){
                           if(data.result==="success"){
                        	   var pkgNo = data.msg;
                        	   $scope.keywords = {
                                      "chargeoffPkgNoFlag":"=",
                                      "chargeoffPkgNo":pkgNo               
                                };
                                $location.path("/settleinvoice");
                           }else{
                             	alert("保存失败！"+data.msg);
                           }
                       }
                  );
              };
              
            $scope.editInvoiceImpl = function() {
           	    settleInvoiceService.editInvoice($scope.pkgNo,'', '').then(
                     function(data){
                     		 $scope.chargeOffPkg = data;
                     }
                );
            };
            
            $scope.exportInvoiceImpl = function() {
           	    settleInvoiceService.exportInvoiceList($scope.pkgNo,'', '').then(
                     function(data){
                     		 $scope.chargeOffPkg = data;
                     }
                );
            };
            
            /**
             * 发票税及保费金额汇总
             */
            $scope.calSumInvoice = function(methodName,fjInvoice) {
            	var sumVat = parseFloat(0).toFixed(2);
            	var sumExPrem = parseFloat(0).toFixed(2);
            	var sumPrem = parseFloat(0).toFixed(2);
            	var fjInvoiceDetailList = fjInvoice.fjInvoiceDetailList;
            	 $.each(fjInvoiceDetailList, function(index, fjInvoiceDetail){
            		 if("vat" === methodName){
            			 sumVat = (parseFloat(sumVat*1 + fjInvoiceDetail.vat*1).toFixed(2));;
            		 }
            		 if("invAmount" === methodName){
            			 sumExPrem = (parseFloat(sumExPrem*1 + fjInvoiceDetail.invAmount*1).toFixed(2));
            		 }
            		 
            		 sumPrem = (parseFloat(sumPrem*1 +fjInvoiceDetail.vat*1 + fjInvoiceDetail.invAmount*1).toFixed(2));
                 });
            	 if("invAmount" === methodName){
            		 fjInvoice.invAmount = parseFloat(sumExPrem).toFixed(2);
        		 }
            	 
            	 fjInvoice.sumPrem = parseFloat(sumPrem).toFixed(2);
            	 if("vat" === methodName){
            		 fjInvoice.vat = parseFloat(sumVat).toFixed(2);
            		 fjInvoice.marginVat = parseFloat(sumVat*1-fjInvoice.oriVat*1).toFixed(2);
            	 }
            	 //marginVat
            };
            
            /**
             * 发票录入审核的确认复核
             */
            $scope.confirmInvoiceCheck = function() {
            	var chargeoffPkgNo = $scope.chargeOffPkg.chargeoffPkgNo;
        		settleInvoiceService.confirmInvoiceCheck(chargeoffPkgNo,'', '').then(
                    function(data){
                        if(data.result==="success"){
                        	alert("确认成功！");
                        	$location.path("/entry/invoicecheck");
                        }else{
                          	alert("确认失败！"+data.msg);
                        }
                    }
               );
            };
            
          //附件上传成功 
            $scope.onFileUploadDone = function(data){
            	if(data.result === "success"){
            		$scope.pkgNo = data.msg;
            		$scope.editInvoiceImpl();
    	            alert('导入成功');
    	            $scope.errMsg = "";
                } else {
                	alert('导入失败 ' + data.msg);
                	$scope.errMsg = data.msg;
                }
            };

    		//附件上传失败
            $scope.onFileUploadFail = function(){
                alert('失败');
            };
           
            $scope.addFjInvoiceDetail = function(fjInvoice){
                var _Detail = {
                    "payCode":fjInvoice.payCode,
                    "payName":fjInvoice.payName,
                    "invCode":"",
                    "invNo":"",
                    "invDate":"",
                    "invAmount":0,
                    "vat":0
                };
                var temp = angular.copy(fjInvoice.fjInvoiceDetailList[fjInvoice.fjInvoiceDetailList.length-1]);
                
                if(angular.isUndefined(temp)){
                	fjInvoice.fjInvoiceDetailList.push(_Detail);
                }else{
                	temp.invAmount = 0;
                	temp.vat = 0;
                	fjInvoice.fjInvoiceDetailList.push(temp);
                    
                }
            };
            
            //删除当前发票明细行信息
            $scope.removeFjInvoiceDetail = function(fjInvoiceDetailList,invoiceDetailCurr){
                if(confirm("确定要删除?")){
                    $.each(fjInvoiceDetailList, function(index, fjInvoiceDetail){
                        if(fjInvoiceDetail === invoiceDetailCurr){
                        	fjInvoiceDetailList.splice(index, 1);
                        }
                    });
                }
            };
            var init = function () {
            	$scope.pkgNo = $stateParams.chargeoffPkgNo;
            	$scope.freinsCode = $stateParams.freinsCode;
            	$scope.operation = angular.isUndefined($stateParams.operation)? 'new': $stateParams.operation;
                //$scope.menuflag = angular.isUndefined($stateParams.menuflag)? 'invoice': $stateParams.menuflag;
            	//编辑，查看 
                if( $scope.operation === 'edit' ||  $scope.operation === 'view' || $scope.operation === 'invoicecheckList') {
                	$scope.editInvoiceImpl();
                }else if( $scope.operation === 'new') {
                	$scope.getInvoiceListImp();
                }else if(   $scope.operation === 'export') {
                	$scope.exportInvoiceImpl();
                }
            };
            init();

        }]);
});

