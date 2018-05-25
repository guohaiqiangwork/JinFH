define(['app', 'config', 'codes', '/reins/page/templates/bill/bill.create.ctrl.js'], function (app, config, codes) {

    app.registerController('ContractBillCtrl', ['$scope', '$stateParams', '$modalInstance', '$filter', '$timeout', 'contract', 'contAttr', 'mode',
        "$location",'config', 'BillService', 'ContractService' , 'global', 'showBusy', '$timeout'
        , '$q','CodeService',function ($scope, $stateParams, $modalInstance, $filter, $timeout, contract,contAttr, mode, $location,config, billService,  contractService, global, showBusy, $timeout
        ,$q,codeService) {


			$scope.noDate = {
                "treatyNo" : "",
                "billDate" : "",
                "sectionNos" : []
            };

			//页面跳转
            $scope.pageJump = function(billType,tmpBillNo){
            	var viewOreditFlag = "0";//编辑查看标识 0:查看,1:编辑
            	$scope.pageJumpView = "1"; //1:查看账单明细，0:编辑账单明细，2：不显示账单明细,3新增手工账单
            	$scope.searchBillDetail(billType,tmpBillNo,"","",$scope.mode,viewOreditFlag);
              //$location.path("/contracts_view/" + billType + "/" + tmpBillNo);
            };

            //编辑合同分出纯益、现金账单页面跳转 yanlilming 2015/06/12
            $scope.updatePageJump = function(billType,tmpBillNo){
            	var viewOreditFlag = "1";//编辑查看标识 0:查看,1:编辑
            	$scope.pageJumpView = "0";
            	$scope.searchBillDetail(billType,tmpBillNo,"","",$scope.mode,viewOreditFlag);
        		//获取合约分项号
                $scope.getSectNos($scope.keywords.tmpContNo);
                //获取合约分出人
                $scope.getReins($scope.keywords.tmpContNo);
        		//险种
                $scope.searchList = [];
                
                //币别
                var keyr = angular.copy($scope.keyword);
	  	        keyr.id="currency";
	  	        keyr.value="";
	  	        $scope.getCode(keyr,{},"currencys");
	  	      	//账单项目编码
               $timeout(function(){
	               	var keyf = {
	               			"id" : '',
	               			"value" : ''
	               	          };
	       	          keyf.id="feeCde";
	       	          keyf.value="";
	       	          $scope.getCode(keyf,{},"feecdes");
	               },500);
            	};
	            //获取合约分项号
	            $scope.getSectNos = function(_tmpContNo){
            		 billService.getSectNos(_tmpContNo).then(
                         function(data){
                         	if(data.result ==="error"){
                         		console.log("失败！"+data.msg);
                         	}else{
                         		$scope.contracts.inty=data.msg[0];
                         		$scope.inties = data.msg;
                                console.log(data);
                         	}
                         },
                         function(code){
                         	alert("生成失败!");
                         }
                     );
            }
	            
	          //获取合约分出人
	            $scope.getReins = function(_tmpContNo){
	        		 billService.getReins(_tmpContNo,"").then(
	                     function(data){
	                     	if(data.result ==="error"){
	                     		console.log("失败！"+data.msg);
	                     	}else{
	                     		$scope.contracts.reinTr=data.msg[0];
	                     		$scope.reins = data.msg;
	                            console.log(data);
	                     	}
	                     },
	                     function(code){
	                    	 
	                     }
	                 );
	            }
            
    		//查询字典
     		$scope.searchList = [];
     		var searchFlag = true;
            $scope.getCode = function(keywords,user,searcher){
                var temp = angular.copy({keywords:keywords,searcher:searcher});
                $scope.searchList.push(temp);
                if(searchFlag && $scope.searchList.length > 0){
                    ralSearch();
                }
            };
            $scope.getCodes = function(keywords, user){
                var deffered = $q.defer();
                codeService.getCodes(keywords, user).then(
                    function(data){
                        deffered.resolve(angular.copy( data));
                    },
                    function(code){
                        deffered.reject(code);
                    }
                );
                return deffered.promise;
            };
            var ralSearch = function(user){
                if(true && $scope.searchList.length > 0){
                    searchFlag = false;
                    $scope.getCodes($scope.searchList[0].keywords,user).then(
                        function(data){
                            $scope[$scope.searchList[0].searcher] = data;
                            searchFlag = true;
                            $scope.searchList.splice(0,1);
                            ralSearch();
                        },
                        function(code){
//                      	console.log("error  "+code);
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
                    )
                }
            };
            //查询适用险种的二级列表
	        $scope.searchRiskCode = function(id){
	            //$scope.keywords.id = $scope.classCode;
	        	$scope.contracts.inco = "";
	            var key = angular.copy($scope.keywords);
	            key.id = "riskCodeByClassTmp";
	            key.value = id;
	            $scope.getCode(key, {}, "riskCodeByClassTmp");
	        };
         	//控制适用险种二级下拉菜单默认选中第一项
            $scope.$watch("riskCodeByClassTmp",function(){
                if(angular.isDefined( $scope.riskCodeByClassTmp ) && $scope.riskCodeByClassTmp.length > 0){
                	if((angular.isUndefined ( $scope.contracts.inco) || $scope.contracts.inco == "") ){
                		 $scope.contracts.inco = $scope.riskCodeByClassTmp[0].id;
                	 }
                }
            });
            //监视contracts.ribillInContSubs中是否有元素被改变状态
	        $scope.feeNamelist = function(_index,_fety){ 
	        	if($scope.contracts.ribillInContSubs[_index].fety === ''){
	        		$scope.contracts.ribillInContSubs[_index].feeNme = '';
	        	}else{
	        		 var _tmp = $filter('filter')($scope.feecdes, {id:_fety});
	                 if (_tmp.length > 0) {
	                	 $scope.contracts.ribillInContSubs[_index].feeNme = _tmp[0].value;
	                	 $scope.contracts.ribillInContSubs[_index].repaAmou = 0;
	                	 billService.getFeeSign(_fety).then(
	                             function(data){
	                             	if(data.result ==="error"){
	                             	
	                             	}else{
	                             		
	                             	$scope.contracts.ribillInContSubs[_index].msg = data.msg;
	                             	
	                             	}
	                             },
	                             function(code){
	                             	console.log(data);
	                             }
	                             
	                         );
	                 }else{
	                	 $scope.contracts.ribillInContSubs[_index].feeNme = '';
	                 }
	        	}
	        	
	        	
	        };
			//计算账单余额
	        $scope.getQuickRecords = function(){
	        	var numer = 0;
	  
	        	$.each($scope.contracts.ribillInContSubs,function(index,_ribillInContSubs){
	        		if(_ribillInContSubs.msg ==='1'){
	        			numer += Number(_ribillInContSubs.repaAmou);
	        		}else if(_ribillInContSubs.msg ==='-1' && !(_ribillInContSubs.fety==="D9")){
	        			numer -= Number(_ribillInContSubs.repaAmou);
	        		}
	        	});
	        	$scope.contracts.balance = numer.toFixed(2);
	        };

	        //删除行，账单项目
	        $scope.removeBillAccount = function(data){
	            if(confirm("确认删除当前行？")){
	                $.each( $scope.contracts.ribillInContSubs, function(index, _data){
	                    if(data === _data){
	                        $scope.contracts.ribillInContSubs.splice(index, 1);
	                        //重新计算账单余额
	        				$scope.getQuickRecords();
	                    }
	                });
	                }
	        };
	        //添加行，账单项目
	        $scope.addLayerBill = function(){
	            var _recepter = {
	               	 "fety": "",
	            	 "feeNme": "",
	                 "repaAmou": 0//账单项目中的账单项金额
	            };
	                $scope.contracts.ribillInContSubs.push(_recepter);
	
	        };

            //返回页面跳转
            $scope.pageJumpclose = function(){
            	$scope.pageJumpView = "2";
            };

			//显示与否标志位
			$scope.display = {
				'flag': false
			};
			
			 // yanliming 2015-06-01 编辑-合同分出-纯益、现金手续费账单
	        $scope.updatePropOutBill = function(contracts){
	        	if($scope.contracts.curr === '' || $scope.contracts.curr === null){
	        		alert("请选择币别");
	        		return;
	        	}
	        	if($scope.contracts.inco === '' || $scope.contracts.inco === null){
	        		alert("请选择险类和险种");
	        		return;
	        	}
	        	if(angular.isDefined($scope.contracts.ribillInContSubs)){
	        		var isBack="0";
		        	$.each($scope.contracts.ribillInContSubs, function(index, c){
		           		if(c.fety === "" || c.fety === null){
		           			isBack="1";
		          			alert("请选择账单项目编码-名称");
		       				//return;
		           		}
	                });
	                if(isBack==="1"){
		       	   		return;
	                }
	        	}
	        	
	        	var contFacMrk , inOutMrk, inExMrk,adjustFlag="0";
	        	if($scope.mode === "bill"){
	        		contFacMrk = "bill";    //合同【0】/临分【1】
	        	}else if($scope.mode==="1"){
	        		if(!($scope.contract === 'batch')){
	        			inOutMrk = "0";
	        			contFacMrk = "contract";
	        		} else {
	        			inOutMrk = "b"; //批量生成账单
	        			contFacMrk = "contract";
	        		}
	        		
	        	}else if($scope.mode ==="2"){
	        		inOutMrk = "1";   //inOutMrk   分入【1】/分出【0】
	        		contFacMrk = "contract";
	        	}
	        	if(angular.isDefined($scope.options.optTypes) && $scope.options.optTypes.length > 0 ){
	        		inExMrk = $scope.keywords.optType;
	        	}else{
	        		inExMrk = "2";  //对内【0】/对外【1】
	        		$scope.keywords.adjustFlag=adjustFlag;
	        	}
	        	$scope.keywords.accPeriodQ = $scope.keywords.accperiod;
	        	$scope.contracts.billType = $scope.keywords.billType;
	        	$scope.updateOutBill($scope.contAttr, contFacMrk ,inOutMrk, inExMrk, $scope.keywords.billType, contracts, $scope.global.user, {});
	        };
	        
	        //yanliming 2015/06/15
	        $scope.updateOutBill = function(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, user, lan){
	        
	        	$scope.showBusy(true);
	            billService.updateOutBill(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, user, lan).then(
	                function(data){
	                	if(data.result ==="error"){
	                		alert("编辑失败！"+data.msg);
	                	} else{
	                		
	                    	if(billType === "08"){
	                            $scope.billData = data;
	                        }
	                        if(billType === "09"){
	                            $scope.createResult = data;
	                        }
	                    	
	                        alert("编辑成功!");
	                        //$scope.$emit('notification', {message:'生成成功!', delay:3000, type:'success'});
	                        //生成成功之后查询对应账单期数据
	                        //$scope.options.ready = false;
	                        $scope.pageJumpclose();
	                    	if(!(inOutMrk === "b")){//非批量生成时才提示
	                    		$scope.changeDate($scope.keywords);
	                    	}
	                	}
	                	$scope.showBusy(false);
	                },
	                function(code){
	                	alert("编辑失败!");
	                	//$scope.$emit('notification', {message:'生成失败!', delay:3000, type:'error'});
	                }
	            );
	        };
	        /**
	         * 分入季度生成账单
	         */
	        $scope.createPropAccord = function(){
	        	  $scope.clearBill();
	        	  $scope.pageJumpView = "3";
	        	  $scope.options.ready = true;
		          //比例非比例币别
	        	  var keyr = angular.copy($scope.keyword);
		          keyr.id="currency";
		          keyr.value="";
		          $scope.getCode(keyr,{},"currencys"); 
		          if(angular.isDefined($scope.keywords.tmpContNo)){
		        	   //获取合约分项号 
			           $scope.getSectNos($scope.keywords.tmpContNo);
	       	      }
		          if(angular.isDefined($scope.keywords.tmpContNo)){
			           //获取合约分出人
		               $scope.getReins($scope.keywords.tmpContNo);
	      	      }
		          //获取账单起期账单止期yuqiucheng
		          $scope.getInBillTime($scope.keywords.accperiod);
		          var keyc = angular.copy($scope.keyword);
                keyc.id="classCodeTmp";
                keyc.value=$scope.keywords.tmpContNo;
                $scope.getCode(keyc,{},"classCodeTmp");  
                //适用险种二级下拉菜单初始化
                var watch = $scope.$watch("classCodeTmp", function(){
                    if(angular.isDefined( $scope.classCodeTmp )&& $scope.classCodeTmp.length > 0){
                    
                        //一级下拉菜单默认选项
                        if(angular.isUndefined ( $scope.contracts.incoClass) ){
                           $scope.contracts.incoClass = $scope.classCodeTmp[0].id;
                        }
                        //if(angular.isUndefined( $scope.riskCodes )){
                        if(angular.isDefined( $scope.contracts.incoClass )){
                            var key = angular.copy($scope.keywords);
                            key.id="riskCodeByClassTmp";
                            key.value = $scope.contracts.incoClass;
                            $scope.getCode(key,{},"riskCodeByClassTmp");
                            //注销watch
                            watch();
                        }
                    }
                });
		       //账单项目编码
               $timeout(function(){
	               	var keyf = {
	               			"id" : '',
	               			"value" : ''
	               	          };
	       	          keyf.id="feeCde";
	       	          keyf.value="";
	       	          $scope.getCode(keyf,{},"feecdes");
	               },500);
	        };
	        
	         //合同起期合同止期
	        $scope.getInBillTime = function(_billData){
	        	 billService.getInBillTime(_billData).then(
	                     function(data){
	                     	if(data.result ==="error"){
	                     		console.log("失败！"+data.msg);
	                     	}else{
	                     		$scope.contracts.billPeriFrom=data.msg[0];
	                     		$scope.contracts.billPeriTo=data.msg[1];
	                            console.log(data);
	                     	}
	                     },
	                     function(code){
	                     	alert("生成失败!");
	                     }
	                     
	                 );
	        };
	        
	         $scope.getByReturn = function(aim,condition){
	            var temp = aim+"";
	            var keywords = {"id":aim,"value":condition, "holdFlag": false};
	            return $scope.getCodes(keywords,{}).then(
	                function(data){
	                    console.log(data);
	                  return data;
	                },
	                function(code){
	                return [];
	                }
	            );
	        };
	        
	        // yanliming 2015-05-22 合同分出-纯益手续费账单
	        $scope.createPropOutBill = function(contracts){
	        	if($scope.contracts.curr === '' || $scope.contracts.curr === null){
	        		alert("请选择币别");
	        		return;
	        	}
	        	if($scope.contracts.inco === '' || $scope.contracts.inco === null){
	        		alert("请选择险类和险种");
	        		return;
	        	}
	        	if(angular.isDefined($scope.contracts.ribillInContSubs)){
	        		var isBack="0";
		        	$.each($scope.contracts.ribillInContSubs, function(index, c){
		           		if(c.fety === "" || c.fety === null){
		           			isBack="1";
		          			alert("请选择账单项目编码-名称");
		       				//return;
		           		}
	                });
	                if(isBack==="1"){
		       	   		return;
	                }
	        	}
	        	
	        	var contFacMrk , inOutMrk, inExMrk,adjustFlag="0";
	        	if($scope.mode === "bill"){
	        		contFacMrk = "bill";    //合同【0】/临分【1】
	        	}else if($scope.mode==="1"){
	        		if(!($scope.contract === 'batch')){
	        			inOutMrk = "0";
	        			contFacMrk = "contract";
	        		} else {
	        			inOutMrk = "b"; //批量生成账单
	        			contFacMrk = "contract";
	        		}
	        		
	        	}else if($scope.mode ==="2"){   
	        		inOutMrk = "1";   //inOutMrk   分入【1】/分出【0】
	        		contFacMrk = "contract";
	        	}
	        	if(angular.isDefined($scope.options.optTypes) && $scope.options.optTypes.length > 0 ){
	        		inExMrk = $scope.keywords.optType;
	        	}else{
	        		inExMrk = "2";  //对内【0】/对外【1】
	        		$scope.keywords.adjustFlag=adjustFlag;
	        	}
	        	$scope.keywords.accPeriodQ = $scope.keywords.accperiod;
	        	$scope.contracts.accPeriod = $scope.keywords.accperiod;
	        	$scope.contracts.concNo = $scope.keywords.treatyNo;
	        	$scope.contracts.billType = $scope.keywords.billType;
	        	//20140828 hdl edit
	        	if($scope.mode === '1' && $scope.keywords.billType === '03'){
	        		$scope.options.ready = true;
	        		//比例非比例币别
		  	        var keyr = angular.copy($scope.keyword);
		  	        keyr.id="currency";
		  	        keyr.value="";
		  	        $scope.getCode(keyr,{},"currencys");
		  	      $scope.createBill($scope.contAttr, contFacMrk ,inOutMrk, inExMrk, $scope.keywords.billType, contracts, $scope.global.user, {});
	        	} else {
	        		$scope.createBill($scope.contAttr, contFacMrk ,inOutMrk, inExMrk, $scope.keywords.billType, contracts, $scope.global.user, {});
	        	}
	        	//20140828 hdl edit
	        };
	        //合同分入填写内容后生成账单
	        $scope.createContInBill = function(keywords,user){
	        	if($scope.contracts.curr === '' || $scope.contracts.curr === null){
	        		alert("请选择币别");
	        		return;
	        	}
	        	if($scope.contracts.inco === '' || $scope.contracts.inco === null){
	        		alert("请选择险类和险种");
	        		return;
	        	}
	        	if(angular.isDefined($scope.contracts.ribillInContSubs)){
	        		var isBack="0";
		        	$.each($scope.contracts.ribillInContSubs, function(index, c){
		           		if(c.fety === "" || c.fety === null){
		           			isBack="1";
		          			alert("请选择账单项目编码-名称");
		       				//return;
		           		}
	                });
	                if(isBack==="1"){
		       	   		return;
	                }
	        	}
	        	if($scope.keywords.billType === '01'){
	        		var contAttr = '1';
	        	}else if($scope.keywords.billType === '07'){
	        		var contAttr = '2';
	        	}else if($scope.keywords.billType === '04'){
	        		var contAttr = '3';
	        	}else if($scope.keywords.billType === '02'){
	        		var contAttr = '4';
	        	}
	        	keywords.accPeriod = $scope.keywords.accperiod;
	        	keywords.concNo = $scope.keywords.treatyNo;
	        	$scope.showBusy(true);
	            billService.createContInBill(contAttr,keywords, $scope.global.user).then(
	                function(data){
	                	if(data.result ==="error"){
	                		alert("生成失败！"+data.msg);
	                	}else{
	                        alert("生成成功!");
	                        $scope.toggle();
	                        $scope.pageJumpclose();
	                	}
	                	$scope.showBusy(false);
	                },
	                function(code){
	                	alert("生成失败,"+code.msg);
	                }
	                
	            );
	//            //清空数据。
	//            $scope.contractsAll();
	        };
					
			/**
	         * 准备生成预付分保费
	         * 生成对内对外账单
	         * @param contAttr   比例【P】 /非比例 【PS】
	         * @param contFacMrk   合同【0】/临分【1】
	         * @param inOutMrk   分入【1】/分出【0】
	         * @param inExMrk   对内【0】/对外【1】
	         * @param billType    账单类型
	         * @param keywords     数据
	         * @param user       操作用户
	         * @param lan       语言
	         * @returns {Function|promise|promise|promise}
	         */
	        $scope.prepareCreateBill = function(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, user, lan){
	        	$scope.showBusy(true);
	            billService.prepareCreateBill(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, user, lan).then(
	                function(data){
	                    $scope.urlString = contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType;
	                    if($scope.urlString === "nprop.contract.2.2.08"){
	                    	$scope.accPeriodQCopy = $scope.billData.accPeriodQ;
	                        $scope.billData = data;
	                        if(angular.isUndefined($scope.billData.accPeriodQ)){
	                        	$scope.billData.accPeriodQ = $scope.accPeriodQCopy;
	                        }
	                    }
	
	                    if($scope.urlString === "nprop.contract.2.2.09"){
	                        $scope.createResult = data;
	                    }
	                    $scope.showBusy(false);
	                },
	                function(code){
	                    alert(code);
                        $scope.showBusy(false);
	                }
	            );
	        };
		
			//重新生成账单按钮
			$scope.toggleCreate = function(){

	        	$scope.options.ready = true;
	            
	            $scope.opertation = 'save';
	            //$scope.collapse={npropIn : false};
	
	            $scope.noDate.treatyNo = $scope.contract.tmpTreatyNo;
	            $scope.noDate.billDate = $scope.keywords.billDate;
	            
                $timeout(function(){
	            	$scope.prepareCreateBill($scope.contAttr, "contract", "2" ,"2", $scope.keywords.billType, $scope.noDate, $scope.global.user, "");
				},100);
				$scope.viewFlag = true;
				//alert("该账单期已经生成账单，不能重新生成!");
			}


            //根据页号查询合同列表
            $scope.onSelectPage = function(pageIndex,keywords){

                $scope.noDate.treatyNo = $scope.contract.tmpTreatyNo;
                $scope.noDate.billDate = keywords.billDate;
                $scope.pagination.pageIndex = pageIndex;
                	
               	var contFacMrk = "contract"; //合同【0】- contract/临分【1】 
               	var inOutMrk = 2 // 无分入分出属性 【2】
               	var inExMrk = 2 // 无对内对外属性 【2】
                	
                if($scope.contAttr === "nprop")
                	$scope.searchBill($scope.contAttr, contFacMrk , inOutMrk, inExMrk, keywords.billType, $scope.noDate, $scope.pagination, "", "");
                else
                	$scope.changeDate();
            };

            //显示最左侧合同在结果中排号
            $scope.getIndex = function (_index, _pagination){
                return _index + 1 + (_pagination.pageIndex-1) * _pagination.pageSize;
            };


            //返回
            $scope.closeBill = function(contAttr){
                $location.path("/contracts/" + contAttr + "/bill");
                $modalInstance.close();
            };

            //全选按钮设置为未选中状态（不初始化为false）
            $scope.checkAll = false;

            //被选中的按钮个数
            $scope.selectedCount = 0;

            //点击全部选中时设置控制的单选按钮状态
            $scope.checkAllBill = function (){
                $scope.checkAll = !$scope.checkAll;
                $.each($scope.billList, function(index, bill){
                    bill.checked = $scope.checkAll;
                });
            };

            //监视billList中是否有元素被改变状态
            $scope.$watch('billList', function(){
                if(angular.isUndefined($scope.billList))
                    return false;
                //监测是否有元素被选中
                var _temp = $filter('filter')($scope.billList, {checked:true});

                $scope.selectedCount = _temp.length;
                if(_temp.length === $scope.billList.length)
                    $scope.checkAll = true;
                else
                    $scope.checkAll = false;
            },true);
            
            
            //批量确认
            $scope.confirmBillP = function(billType){
                $scope.checkbillList = $filter('filter')($scope.billList, {checked:true});
                if($scope.contAttr === "nprop"){
                	$scope.noDate.contNo = $scope.contract.tmpTreatyNo;
	                $scope.noDate.billDate = $scope.keywords.billDate;
	                $scope.noDate.sectionNos = $scope.keywords.sectionNos;
	                var inExMrk = 2 // 无对内对外属性 【2】
	                    $scope.confirmBill($scope.contAttr, "contract" ,"2", inExMrk, $scope.keywords.billType, $scope.noDate, $scope.global.user, "");
                }else{
                	var contFacMrk , inOutMrk, inExMrk;
			    	if($scope.mode === "bill"){
			    		contFacMrk = "bill";    //合同【0】/临分【1】
			    	}else if($scope.mode==="1"){
			    		inOutMrk = "0";
			    		contFacMrk = "contract";
			    	}else if($scope.mode ==="2"){
			    		inOutMrk = "1";   //inOutMrk   分入【1】/分出【0】
			    		contFacMrk = "contract";
			    	}
			    	if(angular.isDefined($scope.options.optTypes) && $scope.options.optTypes.length > 0 ){
			    		inExMrk = $scope.keywords.optType;
			    	}else{
			    		inExMrk = "2";  //对内【0】/对外【1】
			    	}
		    		$scope.confirmBill($scope.contAttr, contFacMrk, inOutMrk, inExMrk, $scope.keywords.billType, $scope.billList, $scope.global.user);			    	
                }
            };

            //批量删除 - 非比例
            $scope.deleBillP = function(section){
                $scope.checkbillList = $filter('filter')(section, {checked:true});
               
                $scope.noDate.treatyNo = $scope.contract.tmpTreatyNo;
                $scope.noDate.billDate = $scope.keywords.billDate;
                $scope.noDate.sectionNos = $scope.keywords.sectionNos;
                if($scope.noDate.sectionNos != ""){
	                if(confirm("确认要删除吗？")){
	                	
	                    $scope.deleteBill($scope.contAttr, "contract" ,"2", "2", $scope.keywords.billType, $scope.noDate, "", "");
	                }
                } else {
                	alert("请先选择分项！");
                }
                
            }

            //准备生成非比例预付费对内账单
            $scope.showForm = function(a,
                                       contAttr, contFacMrk ,inOutMrk, inExMrk,
                                       tmpTreatyNo,billType,billDate){
                $scope.options.ready = true;
                $scope.opertation = 'save';
                $scope.collapse={npropIn : false};
                $scope.noDate.treatyNo = tmpTreatyNo;
                $scope.noDate.billDate = billDate;
                $scope.prepareCreateBill(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, $scope.noDate, "", "");
                //需要传入暂存号，账单类型，月份账单期三个参数，并且调用prepareCreateBill接口
            };
            //删除比例账单
            $scope.delePropBill = function(section){
            	$scope.keywords.accPeriodQ = $scope.keywords.accperiod;
            	var contFacMrk , inOutMrk, inExMrk;
		    	if($scope.mode === "bill"){
		    		contFacMrk = "bill";    //合同【0】/临分【1】
		    	}else if($scope.mode==="1"){
		    		inOutMrk = "0";
		    		contFacMrk = "contract";
		    	}else if($scope.mode ==="2"){
		    		inOutMrk = "1";   //inOutMrk   分入【1】/分出【0】
		    		contFacMrk = "contract";
		    	}
		    	if(angular.isDefined($scope.options.optTypes) && $scope.options.optTypes.length > 0 ){
		    		inExMrk = $scope.keywords.optType;
		    	}else{
		    		inExMrk = "2";  //对内【0】/对外【1】
		    	}
		    	
		    	if($scope.keywords.billType === "01"){//季度账单
		    		var temp = $filter('filter')(section, {checked:true});
		    		$scope.keywords.sectionNo  = [];
		    		$.each(temp,function(index, t){
		    			$scope.keywords.sectionNo.push(t.sectionNo);
		    		});
		    	}else if($scope.keywords.billType === "06"){//月度账单
		    		$scope.keywords.sectionNo = "";
		    	}
		    	$scope.keywords.treatyNo=  $scope.contract.treatyNo;
		    	//add by zhx begin
		    	var word="";
		    	for(var i=0;i<section.length;i++){
		    		word=section[i];
			    	$scope.deleteBill($scope.contAttr, contFacMrk ,inOutMrk, inExMrk, $scope.keywords.billType, word, "", "");
		    	}
		    	//add by zhx end
//		    	$scope.deleteBill($scope.contAttr, contFacMrk ,inOutMrk, inExMrk, $scope.keywords.billType, $scope.keywords, "", "");
            };

            //账单期月份切换查询对应月份账单列表---
            $scope.changeDate = function(keywords){
                $scope.display.flag = true;
                //调用后台
                if(contAttr === "prop"){
                	$scope.noDate.billDate = $scope.keywords.billDate;
                	$scope.noDate.treatyNo = $scope.contract.tmpContNo;
                	$scope.keywords.accPeriodQ = $scope.keywords.accperiod;
                	var contFacMrk , inOutMrk, inExMrk;
			    	if($scope.mode === "bill"){
			    		contFacMrk = "bill";    //合同【0】/临分【1】
			    	}else if($scope.mode==="1"){
			    		inOutMrk = "0";
			    		contFacMrk = "contract";
			    	}else if($scope.mode ==="2"){
			    		inOutMrk = "1";   //inOutMrk   分入【1】/分出【0】
			    		contFacMrk = "contract";
			    	}
			    	//暂时部分对内对外
//			    	if(angular.isDefined($scope.options.optTypes) && $scope.options.optTypes.length > 0 ){
//			    		inExMrk = $scope.keywords.optType;
//			    	}else{
//			    		inExMrk = "2";  //对内【0】/对外【1】
//			    	}
			    	inExMrk = "2";  //对内【0】/对外【1】/    就是这儿
			    	$scope.searchBill($scope.contAttr, contFacMrk ,inOutMrk, inExMrk, $scope.keywords.billType, $scope.keywords, $scope.pagination,$scope.global.user, {});
                } else {
                
                	$scope.noDate.billDate = keywords.billDate;
                	$scope.noDate.sectionNos = keywords.sectionNos;
                	$scope.noDate.treatyNo = $scope.contract.tmpTreatyNo;
                	
                	var contFacMrk = "contract"; //合同【0】- contract/临分【1】 
                	var inOutMrk = 2 // 无分入分出属性 【2】
                	var inExMrk = 2 // 无对内对外属性 【2】
//                	if(angular.isDefined($scope.options.optTypes) && $scope.options.optTypes.length > 0 ){
//                		if($scope.keywords.optType==="in"){
//		            		inExMrk = "0";//对内【0】/对外【1】	
//		            	}
//		            	if($scope.keywords.optType==="out"){
//		            		inExMrk = "1";
//		            	}
//			    	}                	
                    $scope.searchBill($scope.contAttr, contFacMrk , inOutMrk, inExMrk, keywords.billType, $scope.noDate, $scope.pagination, "", "");
                   
                }
                
                $scope.viewFlag = false;
            }

            //账单类型切换，重新加载一下账单期的获取
            $scope.changeDateToggle = function(billType){
            	if(billType=="06"){
            		$scope.billDataMore = $scope.arrDataM
            	}else if(billType=="01"){
            		 $scope.billDataMore = $scope.arrDataQ
            	}else if(billType=="02"){
            		 $scope.billDataMore = $scope.arrDataH
            	}else if(billType=="03"){
            		 $scope.billDataMore = $scope.arrDataY
            	}else if(billType=="04"){
            		 $scope.billDataMore = $scope.arrDataM
            	}
            	$scope.keywords.accperiof = $scope.billDataMore[0]
                
                /*$scope.billTypeFlag = billType;
                if($scope.contAttr === "prop"){
                	$scope.changeDate();
                }else
                	$scope.getBillDate(contAttr, $scope.contract.tmpTreatyNo, "", "");*/
                	
               	//加载页面时查一遍是否有对应账单期数据
                //$scope.options.ready = false;	
               	
            };
            
            //根据月份算出对应季度
            $scope.countMonthToQuarter = function(){
            	var myDate = new Date();
                $scope.fullYear = ""+myDate.getFullYear(); 
                if((myDate.getMonth() + 1) < 10){
	                $scope.month = "0"+(myDate.getMonth() + 1);
                } else {
                	$scope.month = ""+(myDate.getMonth() + 1);
                }
                $scope.monthCompare = $scope.fullYear + "-" + $scope.month + "M";
                $scope.billYear = $scope.billData.accPeriodQ[0].substring(0,4);
                if($scope.billYear === $scope.fullYear){
                	$.each($scope.billData.accPeriodQ, function(index, accP){
                		$scope.billMonth = countBillDates(accP);
                		$.each($scope.billMonth, function(index, month){
                			if($scope.exitFlag.length<=0){
	                			if(month === $scope.monthCompare){
	                				$scope.keywords.accperiod = accP;
	                				$scope.keywords.billDate = $scope.monthCompare;
	                				$scope.exitFlag.push(true);
	                			}
                			}
                		});
                	});
                }
            }

            /**
             * 获取账单期
             * @param contractNo  暂存编号
             */
            $scope.getBillDate = function (contAttr, contractNo, user, lan) {
                billService.getBillDate(contAttr, contractNo, user, lan).then(
                    function(data){
                    	console.log(data.accPeriodQ);
                        $scope.arrDataM = [];
                        $scope.arrDataQ = [];
                        $scope.arrDataH = [];
                        $scope.arrDataY = [];
                        for(var i in data.accPeriodQ){
                        	var textV = data.accPeriodQ[i].substr(data.accPeriodQ[i].length-1,1);
                        	//月度
                        	if(textV=="M"){
                        		console.log("月度："+data.accPeriodQ[i]);
                        		$scope.arrDataM.push(data.accPeriodQ[i]);
                        	}else if(textV=="Q"){//季度
                        		console.log("季度："+data.accPeriodQ[i]);
                        		 $scope.arrDataQ.push(data.accPeriodQ[i])
                        	}else if(textV=="H"){//半年
                        		console.log("半年："+data.accPeriodQ[i]);
                        		 $scope.arrDataH.push(data.accPeriodQ[i]);
                        	}else{//一年
                        		console.log("一年："+data.accPeriodQ[i]);
                        		$scope.arrDataY.push(data.accPeriodQ[i])
                        	}
                        	
                        	//str.substr(str.length-1,1)
                        }
                        
                        $scope.billData=data;
                        $scope.billDataMore = $scope.arrDataM
                        $scope.keywords.accperiof = $scope.billDataMore[0]
                       /* $scope.billData.o=$scope.arrDataM
                        $scope.billData.t=$scope.arrDataQ
                        $scope.billData.s=$scope.arrDataH
                        $scope.billData.f=$scope.arrDataY*/
                        
                        
                        //根据月份算出对应季度
                        $scope.countMonthToQuarter();
                        if($scope.exitFlag.length<=0){
	                       	if(angular.isDefined($scope.billData.accPeriodQ)){
	                        	$scope.keywords.accperiod = $scope.billData.accPeriodQ[0];
	                        	$scope.keywords.accperiof = $scope.billData.accPeriodQ[0];
	                       	} else {
	                       		$scope.keywords.accperiod = "";
	                       	}
                       	}
  //
                        /*if($scope.billData.sectionNos.length>1){
                        	$scope.noDate.sectionNos = $scope.billData.sectionNos[0];
                       	//加载页面时查一遍是否有对应账单期数据
                			$scope.changeDate($scope.keywords);
                        }*/
                        if($scope.contAttr ==="nprop" || $scope.keywords.billType==="02")
                        $scope.keywords.sectionNos = $scope.billData.sectionNos[0];
   //
                    },
                    function(code){
                        //throw(code);
                        alert(code);
                        $scope.showBusy(false);
                    }
                );
            };

            //删除预付分保费
            $scope.deleteBill = function(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, user, lan) {
            	$scope.showBusy(true);
                billService.deleteBill(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, user, lan).then(
                    function(data){
                        $scope.showBusy(false);
                        if(angular.isDefined(data.result)&& data.result==="error"){
                        	alert("删除失败! " + data.msg);
                        }else {
                        	//删除成功之后查询对应账单期数据
                        	$scope.changeDate($scope.keywords);
                        	alert("删除成功!");
                        }
                    },
                    function(code){
                        //throw(code);
                        //alert("删除失败!");
                        alert(code);
                        $scope.showBusy(false);
                    }
                );
            };

            //条件查询
            $scope.searchContracts = function(){
                $scope.pagination.pageIndex = 1;
                $scope.searchContract($scope.contAttr, $scope.keywords, $scope.pagination, {});
            };

            var groupBySection = function(billList) {
                if(!angular.isArray(billList))
                    return false;

                var result = {};

                $.each(billList, function(index, bill){
                    if(!result[bill.sectionNo])
                        result[bill.sectionNo]={sectionNo:bill.sectionNo,checked:false,isOpen:true,bills:[]};

                    result[bill.sectionNo].bills.push(bill);
                });
                return result;

            };

            $scope.sectionNo = "";
            $scope.sectionBillCheckd = [];
            $scope.selectBillsBySection = function(_section){

                $timeout(function(){
                    $.each(_section.bills, function(index, bill){
                        bill.checked = _section.checked;
                    });
                    //重复分项的判断
                    if($scope.sectionNo === ""){
                        $scope.sectionNo = _section.sectionNo;
                        $scope.sectionBillCheckd = _section.bills;
                    } else {
                        $scope.sectionNo = $scope.sectionNo + "," + _section.sectionNo;
                        /*if($scope.sectionNo != _section.sectionNo){
                            $.each(_section.bills, function(index, bill){
                                $scope.sectionBillCheckd.push(bill);
                            });
                        }*/
                    }
                },5);

            };

            /**
             * 显示账单
             * @param contAttr   比例【P】 /非比例 【PS】
             * @param contFacMrk   合同【0】/临分【1】
             * @param inOutMrk   分入【1】/分出【0】
             * @param inExMrk   对内【0】/对外【1】
             * @param billType    账单类型 [0]:预付保费  [1]:调整保费
             * @param keywords     数据  [合约编号，账单期]
             * @param pagination  分页
             * @param user       操作用户
             * @param lan       语言
             * @returns {Function|promise|promise|promise}
             */
            $scope.searchBill = function(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, pagination, user, lan) {
            	$scope.showBusy(true);
            	//alert(inOutMrk);
            	if(inOutMrk === '0' || inOutMrk === 2){
            		 billService.searchBill(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, pagination, user, lan).then(
                             function(data){
                             	if($scope.contAttr === 'prop'){
                             		if(angular.isUndefined(data.data) ){
                             			data = {"data":[],"total":0};
                             		}
                             		$scope.billList = data.data;
					            	$scope.showBusy(false);
					            	$scope.pageJumpclose();
                             	}else{
                             		if(angular.isUndefined(data.data) ){
                             			data = {"data":[],"total":0};
                             		}
                             		$scope.billList = data.data;
                             		$scope.showBusy(false);//数据查询完毕,不再提示旋转页面
                             	}
                             	$scope.pagination.totalItems = data.total;
                             	if($scope.pagination.totalItems === 0){
                             		$scope.display.flag = true;
                            		$scope.options.ready = false;
                            		$scope.showBusy(false);
                             	}
                             	/*$scope.display.flag = true;
                        		$scope.options.ready = false;
                        		$scope.showBusy(false);*/
                             },
                             function(code){
                             	$scope.billList = [];
                             	pagination.totalItems = 0;
                                 //throw(code);
                                 alert(code);
                                 $scope.showBusy(false);
                             }
                         );
            	}
            	else if(inOutMrk === '1'){
            		if($scope.keywords.billType === '01'){
                		var contAttr = '1';
                	}else if($scope.keywords.billType === '07'){
                		var contAttr = '2';
                	}else if($scope.keywords.billType === '04'){
                		var contAttr = '3';
                	}else if($scope.keywords.billType === '02'){
                		var contAttr = '4';
                	}
            		billService.searchContInBill(contAttr,keywords, pagination).then(
                            function(data){
                            	
                        	
                        		if(angular.isUndefined(data.data) ){
                        			data = {"data":[],"total":0};
                        		}
                        		if(data.result === 'error'){
                        			alert(data.msg);
                        		}
                        		$scope.billList = data.data;
                            	$scope.pagination.totalItems = data.total;
                            	
                            	$scope.display.flag = true;
                           		$scope.options.ready = false;
                           		$scope.showBusy(false);
                            	$scope.pageJumpclose();
                            },
                            function(code){
                            	$scope.billList = [];
                            	pagination.totalItems = 0;
                                alert(code);
                                $scope.showBusy(false);
                            }
                        );
            	}
            };

            //账单确认\
            $scope.confirmBill = function(contAttr, contFacMrk, inOutMrk, inExMrk, billType, billList, user) {
            	$scope.showBusy(true);
                billService.confirmBill(contAttr, contFacMrk, inOutMrk, inExMrk, billType, billList, user).then(
                    function(data){
                        $scope.showBusy(false);                      
                        if(data.msg ==="0"){
	                		//确认成功之后查询对应账单期数据
	                        alert("确认成功！");
	                		$scope.changeDate($scope.keywords);
	                	} else{
	                		alert("确认失败！");
                		}                       
                    },
                    function(code){
                    }
                );
            };

            //超赔临分(分出)账务--条件查询
            $scope.searchRecertiBill = function(contAttr, inOutMrk, certiType, keywords, pagination, user, lan) {
            	$scope.showBusy(true);
                billService.searchRecertiBill(contAttr, inOutMrk, certiType, keywords, pagination, user, lan).then(
                    function(data){
                        $scope.billList = data.data;
                        pagination.totalItems = data.total;
                        $scope.showBusy(false);
                    },
                    function(code){
                        //throw(code);
                        //alert(message);
                        alert(code);
                        $scope.showBusy(false);
                    }
                );
            };

			var getBillPeriodCde = function(){
				return codes['prop.billPeriodCde'];
			}

            var getBillTypes = function (contAttr) {
            	if($scope.contract==='batch'){
            		return codes['prop.billTypeBatch'];
            	} else {
	                return codes[contAttr + '.billType'];
            	}
            };

            var getOptTypes = function (contAttr, billType) {
                if(angular.isUndefined(billType))
                    return [];

                return codes[contAttr + '.' + billType + '.optType'] || [];
            };

            var getAaas = function (accperiod) {
                if(angular.isUndefined(accperiod))
                    return [];

                return codes[accperiod + '.accperiod'] || [];
            };

//            var getBillDates = function (billType, optType) {
//                //TODO: 调用后台
//                return ['2014-01M', '2014-02M','2014-03M'];
//            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
          //根据合同账单期计算账单期
            var countBillDates = function(accperiod){
            	//$scope.keywords.aaa = aaa;
            	$scope.back = [];
            	if(angular.isDefined(accperiod)){
            	     var temp = accperiod[accperiod.length - 1]; 
            	     var month = accperiod[accperiod.length - 2]; 
                     var head = (accperiod).substring(0,4);
                     if(temp === "Q"){
                    	 for(var i = 1 ; i <= 3; i++){
                    		 var num = ((parseInt(month)-1)*3 +i);
                    		 var a ;
                    		 if(num < 10){
                    			 a = "0"+num;
                    		 }else{
                    			 a = ""+num;
                    		 }
                    		 var t = head + "-" + a +"M";
                    		 $scope.back.push(t);
                    	 }
                     }else if(temp === "M"){
                    	 $scope.back.push(accperiod);
                     }
            	}
            	//预处理月份账单期
            	$scope.dealmonthBill();
           		return $scope.back;
           
            };
            
            //预处理月份账单期
            $scope.dealmonthBill = function(){
            	$scope.backCopy = [];
            	var temp = "";
            	$.each($scope.back, function(index, month){
            		if($scope.monthCompare.length>0){
	            		if((index !=0) && (month === $scope.monthCompare)){
	            			temp = $scope.back[0]; 
	            			$scope.back[index] = temp;
	            			$scope.back[0] = month;
	            		}
            		}
            	});
            };
            //季度账单的详细信息的实现
            $scope._keywords = {
                    "tmpTreatyNo" : "",
                    "billType" : "",
                    "billDate" : ""
                };
                
                //预处理季度账单详细信息数据
                $scope.dealBillData = function(){
                
                	//数据初始化
                	$scope.bfJ = "";
                	$scope.bfD = "";
                	$scope.fhbfcbjJ = "";
                	$scope.fhbfcbjD = "";
                	$scope.lxJ = "";
                	$scope.lxD = "";
                	$scope.txjpkJ = "";
                	$scope.txjpkD = "";
                	$scope.sxfJ = "";
                	$scope.sxfD = "";
                	$scope.pkJ = "";
                	$scope.pkD = "";
                	$scope.tqbfzbjJ = "";
                	$scope.tqbfzbjD = "";
                	$scope.sjJ = "";
                	$scope.sjD = "";
                	$scope.jjfJ = "";
                	$scope.jjfD = "";
                	$scope.yeJ = "";
                	$scope.yeD = "";
                	$scope.wjpkJ = "";
                	$scope.wjpkD = "";
                	$.each($scope.billListsub.billItems, function(index, bill){
                		if(bill.feeCde === "C1" && bill.feeFlag === "D"){
                			$scope.bfJ = bill.feeValue;
                		}
                		if(bill.feeCde === "C1" && bill.feeFlag === "C"){
                			$scope.bfD = bill.feeValue;
                		}
                		if(bill.feeCde === "C2" && bill.feeFlag === "D"){
                			$scope.fhbfcbjJ = bill.feeValue;
                		}
                		if(bill.feeCde === "C2" && bill.feeFlag === "C"){
                			$scope.fhbfcbjD = bill.feeValue;
                		}
                		if(bill.feeCde === "C3" && bill.feeFlag === "D"){
                			$scope.lxJ = bill.feeValue;
                		}
                		if(bill.feeCde === "C3" && bill.feeFlag === "C"){
                			$scope.lxD = bill.feeValue;
                		}
                		if(bill.feeCde === "C4" && bill.feeFlag === "D"){
                			$scope.txjpkJ = bill.feeValue;
                		}
                		if(bill.feeCde === "C4" && bill.feeFlag === "C"){
                			$scope.txjpkD = bill.feeValue;
                		}
                		if(bill.feeCde === "D1" && bill.feeFlag === "D"){
                			$scope.sxfJ = bill.feeValue;
                		}
                		if(bill.feeCde === "D1" && bill.feeFlag === "C"){
                			$scope.sxfD = bill.feeValue;
                		}
                		if(bill.feeCde === "D2" && bill.feeFlag === "D"){
                			$scope.pkJ = bill.feeValue;
                		}
                		if(bill.feeCde === "D2" && bill.feeFlag === "C"){
                			$scope.pkD = bill.feeValue;
                		}
                		if(bill.feeCde === "D3" && bill.feeFlag === "D"){
                			$scope.tqbfzbjJ = bill.feeValue;
                		}
                		if(bill.feeCde === "D3" && bill.feeFlag === "C"){
                			$scope.tqbfzbjD = bill.feeValue;
                		}
                		if(bill.feeCde === "DB" && bill.feeFlag === "D"){
                			$scope.sjJ = bill.feeValue;
                		}
                		if(bill.feeCde === "DB" && bill.feeFlag === "C"){
                			$scope.sjD = bill.feeValue;
                		}
                		if(bill.feeCde === "DD" && bill.feeFlag === "D"){
                			$scope.jjfJ = bill.feeValue;
                		}
                		if(bill.feeCde === "DD" && bill.feeFlag === "C"){
                			$scope.jjfD = bill.feeValue;
                		}
                		if(bill.feeCde === "BAL" && bill.feeFlag === "D"){
                			$scope.yeJ = bill.feeValue;
                		}
                		if(bill.feeCde === "BAL" && bill.feeFlag === "C"){
                			$scope.yeD = bill.feeValue;
                		}
                		if(bill.feeCde === "D9" && bill.feeFlag === "D"){
                			$scope.wjpkJ = bill.feeValue;
                		}
                		if(bill.feeCde === "D9" && bill.feeFlag === "C"){
                			$scope.wjpkD = bill.feeValue;
                		}
                	});
                }
                
                //计算借贷方合计值
                $scope.contDJ = function(){
                	$scope.countD = 0;
                	$scope.countJ = 0;
                	//计算贷方合计值
                	if($scope.bfJ != ""){
                		$scope.countJ += $scope.bfJ*1;
                	}
                	if($scope.fhbfcbjJ != ""){
                		$scope.countJ += $scope.fhbfcbjJ*1;
                	}
                	if($scope.lxJ != ""){
                		$scope.countJ += $scope.lxJ*1;
                	}
                	if($scope.txjpkJ != ""){
                		$scope.countJ += $scope.txjpkJ*1;
                	}
                	if($scope.sxfJ != ""){
                		$scope.countJ += $scope.sxfJ*1;
                	}
                	if($scope.pkJ != ""){
                		$scope.countJ += $scope.pkJ*1;
                	}
                	if($scope.tqbfzbjJ != ""){
                		$scope.countJ += $scope.tqbfzbjJ*1;
                	}
                	if($scope.sjJ != ""){
                		$scope.countJ += $scope.sjJ*1;
                	}
                	if($scope.jjfJ != ""){
                		$scope.countJ += $scope.jjfJ*1;
                	}
                	if($scope.yeJ != ""){
                		$scope.countJ += $scope.yeJ*1;
                	}
                	
                	//计算借方合计值
                	if($scope.bfD != ""){
                		$scope.countD += $scope.bfD*1;
                	}
                	if($scope.fhbfcbjD != ""){
                		$scope.countD += $scope.fhbfcbjD*1;
                	}
                	if($scope.lxD != ""){
                		$scope.countD += $scope.lxD*1;
                	}
                	if($scope.txjpkD != ""){
                		$scope.countD += $scope.txjpkD*1;
                	}
                	if($scope.sxfD != ""){
                		$scope.countD += $scope.sxfD*1;
                	}
                	if($scope.pkD != ""){
                		$scope.countD += $scope.pkD*1;
                	}
                	if($scope.tqbfzbjD != ""){
                		$scope.countD += $scope.tqbfzbjD*1;
                	}
                	if($scope.sjD != ""){
                		$scope.countD += $scope.sjD*1;
                	}
                	if($scope.jjfD != ""){
                		$scope.countD += $scope.jjfD*1;
                	}
                	if($scope.yeD != ""){
                		$scope.countD += $scope.yeD*1;
                	}
                }
                
                /**
                 * 查询季度账单详细信息
                 * @billType   账单类型
                 * @tmpContNo  账单号
                 */
                $scope.searchBillDetail = function(billType, tmpBillNo , user, lan,mode,viewOreditFlag) {
                   	$scope.showBusy(true);
                       billService.searchBillDetail(billType, tmpBillNo , user, lan,mode,viewOreditFlag).then(
                           function(data){
                        	 if(billType==='04'||billType==='02'||billType==='01'||billType==='03'){
                        			$scope.contracts = data;
                        			$scope.contracts.ribillInContSubs = data.ifaceContBllsubs;
                        			if(viewOreditFlag==='1'){
                        				var keyc = angular.copy($scope.keyword);
						                keyc.id="classCodeTmp";
						                keyc.value=$scope.keywords.tmpContNo;
						                $scope.getCode(keyc,{},"classCodeTmp");  
						                //适用险种二级下拉菜单初始化
						                var watch = $scope.$watch("classCodeTmp", function(){
						                    if(angular.isDefined( $scope.classCodeTmp )&& $scope.classCodeTmp.length > 0){
						                        //一级下拉菜单默认选项
//						                    	$scope.contracts.incoClass = $scope.classCodeTmp[0].id;
						                        $scope.contracts.incoClass = data.incoClass;
						                        if(angular.isUndefined ( $scope.contracts.incoClass) ){
						                            $scope.contracts.incoClass = $scope.classCodeTmp[0].id;
						                        }
						                        //if(angular.isUndefined( $scope.riskCodes )){
						                        if(angular.isDefined( $scope.contracts.incoClass )){
						                            var key = angular.copy($scope.keywords);
						                            key.id="riskCodeByClassTmp";
						                            key.value = $scope.contracts.incoClass;
						                            $scope.getCode(key,{},"riskCodeByClassTmp");
						                            //注销watch
						                            watch();
						                        }
						                    }
						                });
                        			}
                        			
                           		$scope.showBusy(false);
                        	}
                           },
                           function(code){
                           	$scope.billListsub = [];
                           	//pagination.totalItems = 0;
                               throw(code);
                               alert("查询失败!");
                           }
                       );
                   };

               //返回
               $scope.closeBillP = function(contAttr){
                   $scope.closeBill(contAttr);
               };

               
               //返回
               $scope.toggle = function(){
                   $scope.options.ready = false;
                   $scope.pageJumpView = "2"; //1:查看账单明细，0:编辑账单明细，2：不显示账单明细,3新增手工账单
               }

               //暂存号和月份账单期集合
               $scope.noDate = {
                   "treatyNo" : "",
                   "billDate" : ""
               };
               
	        /**
	         * 合约账单调整明细 2015-03-13 yanliming
	         */
	        $scope.createPropAdjustMBillDtl = function(){
	        	var contFacMrk , inOutMrk, inExMrk,adjustFlag="1";
	        	if($scope.mode === "bill"){
	        		contFacMrk = "bill";    //合同【0】/临分【1】
	        	}else if($scope.mode==="1"){
	        		inOutMrk = "0";
	        		contFacMrk = "contract";
	        	}
	        	if(angular.isDefined($scope.options.optTypes) && $scope.options.optTypes.length > 0 ){
	        		inExMrk = $scope.keywords.optType;
	        	}else{
	        		inExMrk = "2";  //对内【0】/对外【1】
	        		$scope.keywords.adjustFlag=adjustFlag;
	        	}
	        	$scope.keywords.accPeriodQ = $scope.keywords.accperiod;
	        	//20140828 hdl edit
	        	if($scope.mode === '1' && $scope.keywords.billType === '03'){
	        		$scope.options.ready = true;
	        		//比例非比例币别
		  	        var keyr = angular.copy($scope.keyword);
		  	        keyr.id="currency";
		  	        keyr.value="";
		  	        $scope.getCode(keyr,{},"currencys"); 
	        	} else {
	        		$scope.createBill($scope.contAttr, contFacMrk ,inOutMrk, inExMrk, $scope.keywords.billType, $scope.keywords, $scope.global.user, {});
	        	}
	        	//20140828 hdl edit
	        };
	        
	        /**
	         * 合约调整账单 2015-03-13 yanliming
	         */
	        $scope.createPropAdjBill = function(){
	        	var contFacMrk , inOutMrk, inExMrk,adjustFlag="2";	        	
	        	if($scope.mode === "bill"){
	        		contFacMrk = "bill";    //合同【0】/临分【1】
	        	}else if($scope.mode==="1"){
	        		inOutMrk = "0";
	        		contFacMrk = "contract";
	        	}
	        	if(angular.isDefined($scope.options.optTypes) && $scope.options.optTypes.length > 0 ){
	        		inExMrk = $scope.keywords.optType;
	        	}else{
	        		inExMrk = "2";  //对内【0】/对外【1】
	        		$scope.keywords.adjustFlag=adjustFlag;
	        	}
	        	$scope.keywords.accPeriodQ = $scope.keywords.accperiod;
	        	//20140828 hdl edit
	        	if($scope.mode === '1' && $scope.keywords.billType === '03'){
	        		$scope.options.ready = true;
	        		//比例非比例币别
		  	        var keyr = angular.copy($scope.keyword);
		  	        keyr.id="currency";
		  	        keyr.value="";
		  	        $scope.getCode(keyr,{},"currencys"); 
	        	} else {
	        		$scope.createBill($scope.contAttr, contFacMrk ,inOutMrk, inExMrk, $scope.keywords.billType, $scope.keywords, $scope.global.user, {});
	        	}
	        	//20140828 hdl edit
	        };
	        
	        
	         /**
	        * 生成预付分保费
	        * 生成对内对外账单
	        * @param contAttr   比例【P】 /非比例 【PS】
	        * @param contFacMrk   合同【0】/临分【1】
	        * @param inOutMrk   分入【1】/分出【0】
	        * @param inExMrk   对内【0】/对外【1】
	        * @param billType    账单类型
	        * @param keywords     数据
	        * @param user       操作用户
	        * @param lan       语言
	        * @returns {Function|promise|promise|promise}
	        */
	       $scope.createBill = function(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, user, lan){
	       	
	       	$scope.showBusy(true);
	       
	           billService.createBill(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, user, lan).then(
	               function(data){
	               	if(data.result ==="error"){
	               		alert("生成失败！"+data.msg);
	               	} else{
	               		
	                   	if(billType === "08"){
	                           $scope.billData = data;
	                       }
	                       if(billType === "09"){
	                           $scope.createResult = data;
	                       }
	                   	
	                       alert("生成成功!");
	                       //$scope.$emit('notification', {message:'生成成功!', delay:3000, type:'success'});
	                       //生成成功之后查询对应账单期数据
	                  
	                       $scope.options.ready = false;
	                   	
	                   	$scope.changeDate($scope.keywords);
	               		$scope.pageJumpclose();
	               	}
	               	$scope.showBusy(false);
	               },
	               function(code){
	               		alert("生成失败!");
	               }
	           );
	       };
	       //新增时清空页面数据 add yanliming 2015-07-08
	        $scope.clearBill = function(){
	        	$scope.contracts={
	            		ribillInContSubs:[{
	                      	 "fety": "",
	                      	 "feeNme": "",
	                         "repaAmou": 0,//分入账单项目中的账单项金额
	                         "msg":''
	                      }],	
	                      "billOut": "",
	                      "billType": $scope.keywords.billType,
	                      "concNo" : $scope.keywords.treatyNo,
	                      "billIn": "",
	                      "reinTr": "",
	                      "busiYear": $scope.keywords.busiYear,
	                      "billPeriFrom":"",
	                      "billPeriTo":"",
	                      "inShareRate": '',//分入份额
	                      "inty": "",
	                      "curr": "",
	                      "inco": "",
	                      "balance": 0,
	                      "remaIn": "",
	                      "rema": "",
	                      "noticeTm":"",
	                      "accdntTm":"",
	                      "insured":"",
	                      "sumAmt":"",
	                      "accRson":"",
	                      "accPeriod":$scope.keywords.accperiod,//定义分出账单中的账单期
	                      "tmpContNo":$scope.keywords.tmpContNo,
	            };
	        };
            var init = function(){
                contract.contAttr = contAttr;
                $scope.contract = contract;
                $scope.global = global;
                $scope.showBusy = showBusy;
                $scope.contAttr = contAttr;
		        debugger
                $scope.options = {
                    billTypes: getBillTypes(contract.contAttr),
                    optTypes: [],
                    billDates: [],
                    ready: false,
                    acceptFileTypes: /(\.|\/)(xls|xlsx)$/i,
                    billPeriodCdes: getBillPeriodCde(),
                	maxFileSize: 50000000
                };
                                                                                                                    
                $scope.billList = [{},{}];
                $scope.sectionList = [];
               
                $scope.keywords = {
                		treatyNo:contract.treatyNo,
                        billType: $scope.options.billTypes[0].id,
                        optType: '',
                        billDate: '',
                        //billPeriodCde: $scope.options.billPeriodCdes[1].id,
                        accperiod: "",
                        adjustFlag: "",//自定义调整账单标志:0:生成账单(默认),1:调整明细,2:调整账单
                        sectionNos: "",
                        busiYear: contract.contYear,
                        bill:[{
                        	 "feeCde": "",
                        	 "feeName": "",
                             "fee": ''//分出账单项目中的账单项金额
                        }],
                    };
                $scope.clearBill();
          		  
                if($scope.contAttr === "prop"){
                	$scope.keywords.treatyNo =  $scope.contract.treatyNo;
                	contract.tmpTreatyNo = $scope.contract.treatyNo;
                }
                //分页对象
                $scope.pagination = {
                    totalItems:0,
                    pageIndex:1,
                    pageSize:10,
                    maxSize:8,
                    numPages:4,
                    previousText: config.pagination.previousText,
                    nextText: config.pagination.nextText,
                    firstText:config.pagination.firstText,
                    lastText: config.pagination.lastText
                };

                $scope.$watch('keywords.billType', function(){
                    $scope.options.optTypes = getOptTypes(contract.contAttr, $scope.keywords.billType);
                    if($scope.options.optTypes.length>0)
                        $scope.keywords.optType = $scope.options.optTypes[0].id;
                    else
                        $scope.keywords.optType = '';
                });

               /* $scope.$watch('keywords.optType', function(){
                    $scope.options.billDates = getBillDates($scope.keywords.billType, $scope.keywords.optType);

                    if($scope.options.billDates.length>0)
                        $scope.keywords.billDate = $scope.options.billDates[$scope.options.billDates.length-1];

                    $scope.options.ready = false;
                });*/
                
                $scope.$watch('keywords.accperiod', function(){
                	$scope.options.billDates = countBillDates($scope.keywords.accperiod);
                    if($scope.options.billDates.length>0)
                        $scope.keywords.billDate = $scope.options.billDates[0];

                    $scope.options.ready = false;

                });

                $scope.mode = mode; //1:分出 2：分入

                $scope.pagination.pageIndex = 1;
         //       $scope.searchBill("", "" ,"", "", "02", "", $scope.pagination, "", "");
                if(contAttr === "nprop"){
                	 $scope.getBillDate(contAttr, $scope.contract.treatyNo, "", "");
                }else{
                	if($scope.contract==='batch'){
                		$scope.getBillDate("batch", $scope.keywords.billPeriodCde, "", "");
                	} else {
	                	$scope.getBillDate(contAttr, $scope.contract.treatyNo, "", "");
                	}
                }
                if($scope.contAttr ==="prop"){
                	var watch = $scope.$watch("keywords",function(){
                		if(angular.isDefined($scope.keywords.billDate) && $scope.keywords.billDate != ""){
                			if(!($scope.contract==="batch")){
	                			$scope.changeDate();
                			}
                			watch();
                		}
                	},true);
                	
                }
                
                //账单查询有数据时，按钮显示控制标志位
                $scope.viewFlag = false;
                
                //根据月份算出对应季度
                $scope.exitFlag = [];
                
                $scope.pageJumpView = "2";//1:查看账单明细，0:编辑账单明细，2：不显示账单明细,3新增手工账单
                //合同分入没有月度账单,没有手续费调整账单
                if($scope.mode === '2'){
                	$scope.options.billTypes =  $filter('filter')($scope.options.billTypes,{id:'!06'});
                	$scope.options.billTypes =  $filter('filter')($scope.options.billTypes,{id:'!03'});
                	$scope.options.billTypes =  $filter('filter')($scope.options.billTypes,{id:'!07'});
                	$scope.keywords.billType = $scope.options.billTypes[0].id;
                	console.log($scope.options)
                }
                //如果入口为批量生成账单，不默认查询账单列表。默认跳转入生成账单页面
                if($scope.contract==="batch"){
                	$scope.display.flag = true;
                	$scope.pagination.totalItems = 0;
                }
              
               //为printIp取值提供依据
          	   $scope.config = config;

          	   //数据字典差寻条件
                $scope.keyword = {
                    "id":"",
                    "value":"",
                };
            };
            init();
        }]);
});
