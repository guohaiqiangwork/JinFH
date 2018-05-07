define(
		['app', 'config','codes',
			'/reins/page/templates/settleInvoice/editor/enterInvoice.edit.ctrl.js',
		 ],
		function (app, config, codes) {
			app.registerController('SettleInvoiceListCtrl', ['$scope', '$stateParams', '$filter','$location', 'SettleInvoiceService',
				'$modal',
        function ($scope, $stateParams ,$filter,$location,settleInvoiceService,$modal) {
    	//发票查询
         $scope.searchInvoiceEntry = function() {
        	/*$scope.pagination.pageIndex = 1;*/
        	settleInvoiceService.searchInvoiceEntry($scope.operation,$scope.pagination,$scope.keywords ,'', '').then(
                  function(data){
                  		 $scope.settleInvoiceList = data.data;
                  		 $scope.pagination.totalItems = data.total;          
                  }
              );
          };
          
         
          //根据页码查询
          $scope.onSelectPage = function(pageIndex){
              $scope.pagination.pageIndex = pageIndex;
              var _pagination = angular.copy($scope.pagination);
              $scope.searchInvoiceEntry();
          };
          
         /* //新增合同类型选择框
          $scope.getInvoiceLists = function (temp) {
              $modal.open({
                  templateUrl: '/reins/page/templates/settleInvoice/editor/reinsEnterInvoice.input.html',
                  controller: 'SettleInvoiceEditCtrl',
                  windowClass: 'modal-big',
                  resolve: {
                	  chargeoffPkgNo : function(){
                		  var invoiceList = $filter('filter')($scope.settleInvoiceList, {checked:true});
                		  if(invoiceList.length == 0){
                    		  alert("请选择一条记录");
                    		  return;
                    	  }
                    	  if(invoiceList.length>1){
                    		  if($scope.operation ==='invoice'){
                    			  alert("只能选择一个结算单进行操作");
                        		  return;
                    		  }
                    		  if($scope.operation ==='invoicecheck'){
                    			  alert("只能选择一条记录进行审核");
                        		  return;
                    		  }
                    	  }
                          var chargeoffPkgNo = invoiceList[0].settleNo;
                          var invoiceFlag = invoiceList[0].invoiceFlag;
                          if($scope.operation ==='invoice'){
                        	  if(invoiceFlag==='1'){
                            	  alert("已选择结算单为已录入发票，请点击【修改发票信息】按钮进行发票信息修改!");
                            	  return;
                              }
                          }else if($scope.operation ==='invoicecheck'){
                        	  if(invUndwrtFlag==='4'){
                            	  alert("已经审核通过的发票，不能再进行审核!");
                            	  return;
                              }
                          }
                          return chargeoffPkgNo ;    //操作类型
                      }
                  }
              }).result.then(function (url) {
                      $location.path(url);
                  });
          };*/
          
          $scope.getInvoiceLists = function() {
        	  var invoiceList = $filter('filter')($scope.settleInvoiceList, {checked:true});
        	  if(invoiceList.length == 0){
        		  alert("请选择一条记录");
        		  return;
        	  }
        	  if(invoiceList.length>1){
        		  if($scope.operation ==='invoice'){
        			  alert("只能选择一个结算单进行操作");
            		  return;
        		  }
        		  if($scope.operation ==='invoicecheck'){
        			  alert("只能选择一条记录进行审核");
            		  return;
        		  }
        	  }
              var chargeoffPkgNo = invoiceList[0].settleNo;
              var freinsCode = invoiceList[0].freinsCode;
              var invUndwrtFlag = invoiceList[0].invUndwrtFlag;
              if($scope.operation ==='invoice'){
            	  if(invUndwrtFlag==='1'){
                	  alert("已选择结算单为已录入发票，请点击【修改发票信息】按钮进行发票信息修改!");
                	  return;
                  }
              }else if($scope.operation ==='invoicecheck'){
            	  if(invUndwrtFlag==='4'){
                	  alert("已经审核通过的发票，不能再进行审核!");
                	  return;
                  }
              }
              
              var url = "/invoiceEdit/"+chargeoffPkgNo +"/"+freinsCode+"/new";
        	  if($scope.operation==='invoicecheck'){
        		  url = "/invoiceEdit/"+chargeoffPkgNo +"/invoicecheckList";
        	  } 
              $location.path(url);
              
          };
          
          $scope.editInvoice = function() {
        	  var invoiceList = $filter('filter')($scope.settleInvoiceList, {checked:true});
        	  if(invoiceList.length == 0){
        		  alert("请选择一条记录");
        		  return;
        	  }
        	  if(invoiceList.length>1){
        		  alert("只能选择一个核销包进行打包");
        		  return;
        	  }
          
              var chargeoffPkgNo = invoiceList[0].settleNo;
              var invUndwrtFlag = invoiceList[0].invUndwrtFlag;
              if(invUndwrtFlag==='0'){
            	  alert("已选择核销包还未录入发票，请点击【录入发票】按钮进行发票录入!");
            	  return;
              }
        	  var url = "/invoiceEdit/"+chargeoffPkgNo +"/edit";
              $location.path(url);
          };
          //导出发票清单
          $scope.exportInvoiceLists = function() {
        	  var invoiceList = $filter('filter')($scope.settleInvoiceList, {checked:true});
        	  if(invoiceList.length == 0){
        		  alert("请选择一条记录");
        		  return;
        	  }
        	  if(invoiceList.length>1){
        		  alert("只能选择一个核销包进行打包");
        		  return;
        	  }
          
              var chargeoffPkgNo = invoiceList[0].chargeoffPkgNo;
                        
        	  var url = "/invoiceEdit/"+chargeoffPkgNo +"/export";
              $location.path(url);
          };
          
          $scope.viewInvoice = function() {
        	  var invoiceList = $filter('filter')($scope.settleInvoiceList, {checked:true});
          
        	  if(invoiceList.length == 0){
        		  alert("请选择一条记录");
        		  return;
        	  }
        	  if(invoiceList.length>1){
        		  alert("只能选择一个核销包进行打包");
        		  return;
        	  }
              var chargeoffPkgNo = invoiceList[0].settleNo;
        	  var url = "/invoiceEdit/"+chargeoffPkgNo +"/view";
              $location.path(url);
          };
          
          /**
           * 发票录入审核的确认复核
           */
          $scope.batchConfirmInvoiceCheck = function() {
        	  var invoiceList = $filter('filter')($scope.settleInvoiceList, {checked:true});
              
              var chargeoffPkgNos = [];
              $.each(invoiceList,function(index,temp){
                  var keyword={};
                  keyword.chargeoffPkgNo=temp.chargeoffPkgNo;
                 
                  chargeoffPkgNos.push(keyword);
              });
              
      		  settleInvoiceService.batchConfirmInvoiceCheck(chargeoffPkgNos,'', '').then(
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
          
        //重置查询框中内容
          $scope.resetSearchBox = function(){
              $scope.keywords = {
                  "chargeoffPkgNoFlag":"=",
                  "chargeoffPkgNo":"",
                  "stat":"",
                  "startDate":"",
                  "endDate":"",
                  "chargeoffStat":"0",                
                  "locationFlag":"",
                  "settleStat": '0'                 
              };
          };
          
          var init = function () {
              if($scope.setStateBack != true){
	                //分页对象
	                $scope.pagination = {
	                    totalItems:0,
	                    pageIndex:1,
	                    pageSize:10,
	                    maxSize:8,
	                    numPages:4,
	                    previousText: config.pagination.previousText,
	                    nextText: config.pagination.nextText,
	                    firstText: config.pagination.firstText,
	                    lastText: config.pagination.lastText
	                };
	
	                //重置条件查询框
	                $scope.resetSearchBox();
              }else{
              	$scope.setStateBack = null;
              }
              
              $scope.operation = angular.isUndefined($stateParams.operation)? 'invoice': $stateParams.operation;
              $scope.menuFlag = "invoice";
              if($scope.operation ==='invoicecheck'){
            	  $scope.menuFlag = "invoicecheck" ;
              }
              $scope.searchInvoiceEntry();
          };

          init();
    }]);
});