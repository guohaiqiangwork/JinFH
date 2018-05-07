define(['app',
    	'config',
    	'codes'
], function (app, config, codes) {
    app.registerController('PrintInvoiceEditCtrl', ['$scope', '$stateParams','$location', '$timeout', '$filter','PrintInvoiceService', 
        function ($scope, $stateParams,$location,$timeout,  $filter,printInvoiceService) {
        	
        	$scope.getInvoiceListImpl = function() {
         	 printInvoiceService.getInvoiceList($scope.pkgNo,$scope.payCode,'', '1').then(
                     function(data){
                     		 $scope.chargeOffPkg = data;
                     		 $scope.payCodes = data.payCodeList;
                     }
                );
            };
            
            $scope.saveInvoiceList = function() {
            	printInvoiceService.saveInvoiceList($scope.operation,$scope.chargeOffPkg,'', '').then(
                       function(data){
                           if(data.result==="success"){
                        	   var pkgNo = data.msg;
                        	   $scope.keywords = {
                                      "chargeoffPkgNoFlag":"=",
                                      "chargeoffPkgNo":pkgNo               
                                };
                                $location.path("/print/invoice");
                           }else{
                             	alert("保存失败！"+data.msg);
                           }
                       }
                  );
              };
              
            $scope.editInvoiceImpl = function() {
            	printInvoiceService.editInvoice($scope.pkgNo,'', '').then(
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
             * 开票审核的确认复核
             */
            $scope.confirmInvoiceCheck = function() {
            	alert("发票夸平台上传比较慢，请耐心等待！请勿重复点击【确认送平台】按钮！");
            	$scope.showBusy(true);//loading图片显示
                $scope.invoiceCheckFlag = true;//设置开票不能点击---在2分钟内不能重复点击
                var invoiceCheckFlagTime = $timeout(function(){
                	$scope.invoiceCheckFlag = false;
                },60000);                               
            	var chargeoffPkgNo = $scope.chargeOffPkg.chargeoffPkgNo;
            	printInvoiceService.confirmInvoiceCheck(chargeoffPkgNo,'', '').then(
                    function(data){
                        if(data.result==="success"){
                        	alert("此核销包开票审核确认成功！");
                        	$location.path("/print/invoicecheck");
                        }else if(data.result==="part"){
                        	alert("注意：此核销包部分分公司未开票成功！");
                        	$location.path("/print/invoicecheck");
                        }else{
                          	alert("审核中有错误！"+data.msg);
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
              //适用险种一级下拉菜单
                
                var key = angular.copy($scope.keywords);
                key.id="payCode";
                key.value = fjInvoice.freinsCode;
                $scope.getCode(key,{},"payCodes");
             
              
            };
            $scope.keywords = {
                    "id":"",
                    "value":"",
                    "other1":"",
                    "reinsCode":"",
                	"comlevel2no":"",
                	"taxpayerstatus":"",
                	"taxPayerName":"",
                	"taxPayerId":"",
                	"invoiceAddr":"",
                	"taxPhone":"",
                	"invoiceBank":"",
                	"invoiceAccount":""
                };
          //查询字典
            var searchFlag = true;
            $scope.searchList = [];
            $scope.getCode = function(keywords,user,searcher){
                var temp = angular.copy({keywords:keywords,searcher:searcher});
                $scope.searchList.push(temp);
                if(searchFlag && $scope.searchList.length > 0){
                    ralSearch(user);
                }
            };
            var ralSearch = function(user){
                if(searchFlag && $scope.searchList.length > 0){
                    searchFlag = false;
                    $scope.getCodes($scope.searchList[0].keywords,user).then(
                        function(data){
                            $scope[$scope.searchList[0].searcher] = data;
                            searchFlag = true;
                            $scope.searchList.splice(0,1);
                            ralSearch();
                        },
                        function(code){
                            console.log("error  "+code);
                            searchFlag = true;
                            if(angular.equals(code,"bussy")){
                                $scope.searchList.push($scope.searchList[0]);
                                $scope.searchList.splice(0,1);
                            }else{
                                $scope[$scope.searchList[0].searcher] = [];
                                $scope.searchList.splice(0,1);
                            }
                            ralSearch();
                        }
                    );
                }
            };
      
           /* $scope.showPrpDreinsVat = function(fjInvoiceDetail,id){
            	alert("dasfdasd");
            	fjInvoiceDetail = id;
            	alert("asdaf");
            }*/
          //查询适用险种的二级列表
            $scope.searchRiskCode = function(fjInvoiceDetail,classCode,id){
            	fjInvoiceDetail[id].payCode = classCode.comlevel2no;
            	fjInvoiceDetail[id].taxpayername = classCode.taxPayerName;
            	fjInvoiceDetail[id].taxPayerNo = classCode.taxPayerId;
            	fjInvoiceDetail[id].address = classCode.invoiceAddr;
            	fjInvoiceDetail[id].telphone = classCode.taxPhone;
            	fjInvoiceDetail[id].bank = classCode.invoiceBank;
            	fjInvoiceDetail[id].account = classCode.invoiceAccount;
            	/*fjInvoiceDetail[id].taxpayername = classCode.comlevel2no;
            	fjInvoiceDetail[id].taxpayername = classCode.taxpayername;
            	fjInvoiceDetail[id].taxpayername = classCode.taxPayerNo;
            	fjInvoiceDetail[id].taxpayername = classCode.address;
            	fjInvoiceDetail[id].taxpayername = classCode.telphone;
            	fjInvoiceDetail[id].taxpayername = classCode.bank;
            	fjInvoiceDetail[id].taxpayername = classCode.account;*/
            	
            	
                //$scope.keywords.id = $scope.classCode;
//                var key = angular.copy($scope.keywords);
//                key.id = "payCodeByClass";
//                key.value = fjInvoice.freinsCode;
//                key.other1 = id;
//                $scope.getCode(key, {}, "payCodeByClasss");
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
            	$scope.pkgNo = $stateParams.pkgNo;
            	$scope.payCode = $stateParams.payCode;
            	$scope.operation = angular.isUndefined($stateParams.operation)? 'new': $stateParams.operation;
            	//编辑，查看 
                if( $scope.operation === 'edit' ||  $scope.operation === 'view' || $scope.operation === 'invoicecheckList') {
                	$scope.editInvoiceImpl();
                }else if( $scope.operation === 'new') {
                	$scope.getInvoiceListImpl();
                	
                }
                
                $scope.invoiceCheckFlag = false;//设置开票送平台不能点击----在2分钟内不能重复点击
            };
            init();
        }]);
});

