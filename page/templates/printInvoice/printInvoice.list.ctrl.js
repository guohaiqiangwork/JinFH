define(
		['app', 'config','codes'
		 ],
		function (app, config, codes) {
			app.registerController('PrintInvoiceListCtrl', ['$scope', '$stateParams', '$filter','$location', 'PrintInvoiceService',
        function ($scope, $stateParams ,$filter,$location,printInvoiceService) {
    	//开票查询
         $scope.searchInvoicePrint = function() {
        	/*$scope.pagination.pageIndex = 1;*/
        	 printInvoiceService.searchInvoicePrint($scope.operation,$scope.pagination,$scope.keywords ,'', '').then(
                  function(data){
                  		 $scope.printInvoiceList = data.data;
                  		 $scope.pagination.totalItems = data.total;          
                  }
              );
          };
          
         
          //根据页码查询
          $scope.onSelectPage = function(pageIndex){
              $scope.pagination.pageIndex = pageIndex;
              var _pagination = angular.copy($scope.pagination);
              $scope.searchInvoicePrint();
          };
          //开票
          $scope.getInvoiceLists = function() {
        	  var invoiceList = $filter('filter')($scope.printInvoiceList, {checked:true});
        	  if(invoiceList.length == 0){
        		  alert("请选择一条记录");
        		  return;
        	  }
        	  if(invoiceList.length>1){
        		  if($scope.operation ==='invoice'){
        			  alert("请仅选择一个核销包进行操作");
            		  return;
        		  }
        	 if($scope.operation ==='invoicecheck'){
        			  alert("只能选择一条记录进行审核");
            		  return;
        		  }
        	  }
              var chargeoffPkgNo = invoiceList[0].settleNo;
              var payCode = invoiceList[0].payCode;
              var invUndwrtFlag = invoiceList[0].invUndwrtFlag;
              if($scope.operation ==='invoice'){
            	  if(invUndwrtFlag==='4'){
                	  alert("已选择核销包已录入开票，请点击【修改开票信息】按钮进行开票信息修改!");
                	  return;
                  }
              }else if($scope.operation ==='invoicecheck'){
            	  if(invUndwrtFlag==='5'){
                	  alert("已经审核通过的开票，不能再进行审核!");
                	  return;
                  }
              }
        	  var url = "/printInvoiceEdit/"+chargeoffPkgNo+"/"+payCode +"/new";
        	  if($scope.operation==='invoicecheck'){
        		  url = "/printInvoiceEdit/"+chargeoffPkgNo +"/invoicecheckList";
        	  }      	  
              $location.path(url);
          };
          
          $scope.editInvoice = function() {
        	  var invoiceList = $filter('filter')($scope.printInvoiceList, {checked:true});
        	  if(invoiceList.length == 0){
        		  alert("请选择一条记录");
        		  return;
        	  }
        	  if(invoiceList.length>1){
        		  alert("请仅选择一个核销包进行操作");
        		  return;
        	  }
          
              var chargeoffPkgNo = invoiceList[0].settleNo;
              var payCode = invoiceList[0].payCode;
              var invUndwrtFlag = invoiceList[0].invUndwrtFlag;
              if(invUndwrtFlag==='0'){
            	  alert("已选择核销包还未录入发票，请点击【录入发票】按钮进行发票录入!");
            	  return;
              }
        	  var url = "/printInvoiceEdit/"+chargeoffPkgNo+"/"+payCode +"/edit";
              $location.path(url);
          };
          
          $scope.viewInvoice = function() {
        	  var invoiceList = $filter('filter')($scope.printInvoiceList, {checked:true});
        	  if(invoiceList.length == 0){
        		  alert("请选择一条记录");
        		  return;
        	  }
              var chargeoffPkgNo = invoiceList[0].settleNo;
              var payCode = invoiceList[0].payCode;
        	  var url = "/printInvoiceEdit/"+chargeoffPkgNo+"/"+payCode +"/view";
              $location.path(url);
          };
          
          /**
           * 发票录入审核的确认复核
           */
          $scope.batchConfirmInvoiceCheck = function() {
        	  var invoiceList = $filter('filter')($scope.printInvoiceList, {checked:true});
              
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
                      	$location.path("/print/invoicecheck");
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
              
              $scope.searchInvoicePrint();
          };

          init();
    }]);
});