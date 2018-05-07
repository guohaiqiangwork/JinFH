define(['app',
	'config',
    'codes',
    '/reins/page/templates/common/directives/currency.js',
    '/reins/page/templates/common/directives/percentage.js',
    '/reins/page/templates/common/directives/year.js'
], function (app,config,codes) {

    app.registerController('BillCreateCtrl', ['$scope','BillService','CodeService','$timeout','$filter','$q',
         function ($scope,billService,codeService,$timeout,$filter,$q) {
         
        //fileDoMethod
//        $scope.fileDoMethod = function(){
//        	$scope.fileDoMethod = "/reins/xolContBill/saveFhxComShareList.do";
//        }
        
        //附件上传成功 
        $scope.onFileUploadDone = function(data){
        	
        	if(data.result != "error"){
			    $scope.noDate.treatyNo = $scope.contract.tmpTreatyNo;
		        $scope.noDate.billDate = $scope.keywords.billDate;
	//	        nprop.contract.0.2.08
	            $scope.prepareCreateBill($scope.contAttr, "contract", "2" ,"2", $scope.keywords.billType, $scope.noDate, $scope.global.user, "");
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
                

         $scope._keywords = {
             "tmpTreatyNo" : "",
             "billType" : "",
             "billDate" : ""
         };

        //返回
        $scope.closeBillP = function(contAttr){
            $scope.closeBill(contAttr);
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
                        $scope.billData = data;
                    }

                    if($scope.urlString === "nprop.contract.2.2.09"){
                        $scope.createResult = data;
                    }
                    $scope.showBusy(false);
                },
                function(code){
                }
            );
        };
        $scope.createPropBill = function(){
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
        	$scope.keywords.accPeriodQ = $scope.keywords.aaa;
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
        	$scope.keywords.accPeriodQ = $scope.keywords.aaa;
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
        /**
         * 分入季度生成账单
         */
        $scope.createPropAccord = function(){
        	  $scope.clearBill();
        	  $scope.options.ready = true;
        	  $scope.pageJumpView = "3";
        	  $scope.contracts.incoClass = $scope.classCodeTmp[0].id;//险类给一个默认值
        	  $scope.contracts.inco = $scope.riskCodeByClassTmp[0].id;//险种给一个默认值
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
	          $scope.getInBillTime($scope.keywords.aaa);
        }; 
        
        /**
         * add yanliming 2015-05-08
         * 获取批量季度账单的账单期
         */
        $scope.genBathPropAccord = function(){
        	var billPeriFrom = "";
        	var billPeriTo = "";
        	billService.getInBillTime($scope.keywords.aaa).then(
                     function(data){
                     	if(data.result ==="error"){
                     		console.log("失败！"+data.msg);
                     	}else{
                     		$scope.contracts.billPeriFrom=data.msg[0];
                     		$scope.contracts.billPeriTo=data.msg[1];
                     		
                     		billPeriFrom = $scope.contracts.billPeriFrom.substring(0,4)+$scope.contracts.billPeriFrom.substring(5,7);
					        billPeriTo = $scope.contracts.billPeriTo.substring(0,4)+$scope.contracts.billPeriTo.substring(5,7);
					        //为了传递截取到的账单起止期字符串这个友好提框是不可少的,如果没有起期:billPeriFrom,止期:billPeriTo无法赋值
					        alert("将为您生成账单期从： "+$scope.contracts.billPeriFrom.substring(0,7)+"月 至 "+$scope.contracts.billPeriTo.substring(0,7)+"月的季度账单");
					        window.open( "http://"+config.backend.printIp+"/WDDE/pdf2.jsp?zhumobanname=sx-rei-jdzd-pl&paras=1%3d"+billPeriFrom+"%262%3d"+billPeriTo+"&KEY=N");
                     		
                            console.log(data);
                     	}
                     },
                     function(code){
                     	alert("生成失败!");
                     }
                     
                 );
                 
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
                		//alert("生成失败createBill！"+data.msg);
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
                    	if(!(inOutMrk === "b")){//非批量生成时才提示
                    		$scope.changeDate($scope.keywords);
                    	}
                		$scope.pageJumpclose();
                	}
                	$scope.showBusy(false);
                },
                function(code){
                	//alert("生成失败createBill!");
                }
            );
        };
        
        //返回页面跳转
        $scope.pageJumpclose = function(){
        	$scope.pageJumpView = "2";
        };
        
        //录入实际保费
        $scope.change = function(data){

            data.rwp = (parseFloat(data.rate*data.gnpi)).toFixed(2);

        };


        //生成账单按钮
        $scope.createBills = function(){
        	var inExMrk = "2";
            $scope.noDate.treatyNo = $scope.contract.tmpTreatyNo;
            $scope.noDate.billDate = $scope.keywords.billDate;
            
            $scope.createBillFlag = true;
            //验证录入的实际净自留保费值是否为空
            $scope.getSectionDtl($scope.createResult, $scope.global.user, "");

            /*contAttr - 比例【P】 /非比例 【PS】
             contFacMrk   合同【0】/临分【1】
             inOutMrk   分入【1】/分出【0】
             inExMrk   对内【0】/对外【1】 有的没有
             billType    账单类型*/
            if($scope.errMsg === ""){
	            if(($scope.createCheck.length<=0 && $scope.keywords.billType === "09") 
	            	|| ($scope.keywords.billType === "08")){
//	            	if($scope.keywords.optType==="in"){
//	            		inExMrk = "0";
//	            	}
//	            	if($scope.keywords.optType==="out"){
//	            		inExMrk = "1";
//	            	}
	            	$scope.createBill($scope.contAttr, "contract", "2" ,inExMrk, $scope.keywords.billType, $scope.noDate, $scope.global.user, "");
	           	}
            } else {
            	if($scope.keywords.billType === "08" && angular.isUndefined($scope.billData)){
	            	alert("模板数据错误： " + $scope.errMsg);
            	}
            	if($scope.keywords.billType === "08" && angular.isDefined($scope.billData)){
            		$scope.createBill($scope.contAttr, "contract", "2" ,inExMrk, $scope.keywords.billType, $scope.noDate, $scope.global.user, "");
            	}
            }
        }


        //调整保费---录入实际保费(赔付率)
        $scope.getSectionDtl = function(treatyNo, user, lan) {
        	$scope.showBusy(true);
        	$scope.createCheck = [];
        	if(angular.isDefined($scope.createResult)){
	        	$.each($scope.createResult, function(index, c){
	            	$.each(c.fhxLayerViewVoList, function(index, f){
	            		if(f.gnpi === "" || f.gnpi === null){
	           				alert("层 " + c.sectionNo + " 的实际净自留保费值为空！");
	           				$scope.createCheck.push(false);
	           				return;
	            		}
	            	});
	            });
	            if($scope.createCheck.length<=0){
	            	billService.getSectionDtl(treatyNo, user, lan).then(
		                function(data){
		                    $scope.showBusy(false);
		                    if(!$scope.createBillFlag){
			                    alert("保存成功!");
		                    }
		                },
		                function(code){
		                    throw(code);
		                    alert("保存失败!");
		                    //$scope.$emit('notification', {message:'保存失败!', delay:3000, type:'error'});
		                }
		            );
	            } else {
	            	$scope.showBusy(false);
	            }
       		} else {
       			$scope.showBusy(false);
       		}
        };

        //切换编辑状态
        $scope.toggleMode = function(model){
            $scope.opertation = model;
            if(model === "save"){
            	$scope.getSectionDtl($scope.createResult, $scope.global.user, "");
            	$.each($scope.createResult, function(index, c){
	            	$.each(c.fhxLayerViewVoList, function(index, f){
	            		if(f.gnpi != f.gnpi_){
		            		f.gnpi_ = f.gnpi;
		            		$scope.change(f);
	            		}
	            	});
	            });
            }
            if(model === "cancel"){
            	 $.each($scope.createResult, function(index, c){
	            	$.each(c.fhxLayerViewVoList, function(index, f){
	            		if(f.gnpi != f.gnpi_){
		            		f.gnpi = f.gnpi_;
		            		$scope.change(f);
	            		}
	            	});
	            });
            }
            //$scope.editData1 = angular.copy( $scope.adjustBill);
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

        //准备生成非比例预付费对内账单
        $scope.showForm = function(a){
        	
        	$scope.options.ready = true;

            $scope.opertation = 'save';

            $scope.noDate.treatyNo = $scope.contract.tmpTreatyNo;
            $scope.noDate.billDate = $scope.keywords.billDate;
            
            $scope.prepareCreateBill($scope.contAttr, "contract", "2" ,"2", $scope.keywords.billType, $scope.noDate, $scope.global.user, "");
        };
        
        
        //查询字典
        var searchFlag = true;
        $scope.searchList = [];
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
//                  	console.log("error  "+code);
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
            var key = angular.copy($scope.keywords);
            key.id = "riskCodeByClassTmp";
            key.value = id;
            $scope.getCode(key, {}, "riskCodeByClassTmp");
        };

        //控制适用险种二级下拉菜单默认选中第一项
        $scope.$watch("riskCodeByClassTmp",function(){
        	if(angular.isDefined( $scope.riskCodeByClassTmp ) && $scope.riskCodeByClassTmp.length > 0){
        		$scope.contracts.inco = $scope.riskCodeByClassTmp[0].id;
        	}
        });

//        //查询字典
//        $scope.getCode = function(keywords, user ,searcher){
//        
//            codeService.getCodes(keywords, user).then(
//                function(data){
//                    $scope[searcher] = angular.copy(data);
//                },
//                function(code){
//                	$scope[searcher] = [];
//                }
//            );
//        };
        
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
        //合同分入填写内容后生成账单
        $scope.createContInBill = function(keywords,user){
        	if($scope.contracts.curr === '' || $scope.contracts.curr === null){
        		alert("请选择币别");
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
        	keywords.accPeriod = $scope.keywords.aaa;
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
//        //初始化合同分入的数据
//        $scope.contractsAll = function(){
////          合同分入生成账单的参数
//            $scope.contracts={
//            		ribillInContSubs:[{
//                      	 "fety": "",
//                      	 "feeNme": "",
//                        "repaAmou": 0//分入账单项目中的账单项金额
//                      }],	
//                      "billOut": "",
//                      "billType": "",
//                      "billIn": "",
//                      "reinTr": "",
//                      "busiYear": "",
//                      "inShareRate": '',//分入份额
//                      "curr": "",
//                      "inco": "",
//                      "balance": 0,
//                      "remaIn": "",
//                      "rema": "",
//                      "tmpContNo":""
//            };
//        }
        
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
        }
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
                      "accPeriod":$scope.keywords.aaa,//定义分出账单中的账单期
                      "tmpContNo":$scope.keywords.tmpContNo,
            };
        };
        
        //初始化
        var init = function(){
        	$scope.clearBill();
            //数据字典差寻条件
            $scope.keyword = {
                "id":"",
                "value":"",
            };
            //险种
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
                    if(angular.isUndefined( $scope.riskCodeByClassTmp )){
                        var key = angular.copy($scope.keywords);
                        key.id="riskCodeByClassTmp";
                        key.value = $scope.contracts.incoClass;
                        $scope.getCode(key,{},"riskCodeByClassTmp");
                        //注销watch
                        watch();
                    }
                }
            });
            $scope.$watch("contracts.ribillInContSubs", function(){
            	
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
           if(($scope.contAttr === "prop" && $scope.mode==='2' && $scope.keywords.billType==='01')
        		   || ($scope.mode === '1')){
        		   
        	   //批量生成账单不调用获取合同分项号方法	   
        	   if(angular.isDefined($scope.keywords.tmpContNo)){
	        	   //获取合约分项号 
		           $scope.getSectNos($scope.keywords.tmpContNo);
		          
        	   }
	           //合同起期合同止期
           	   $scope.getInBillTime($scope.keywords.aaa);
           };
           
           if(($scope.contAttr === "prop" && $scope.mode==='2' && $scope.keywords.billType==='08')
        		   ){
        		   
        	   //批量生成账单不调用获取合同分项号方法	   
        	   if(angular.isDefined($scope.keywords.tmpContNo)){
		           //获取合约分出人
	               $scope.getReins($scope.keywords.tmpContNo);
		          
        	   }
           }
           //获取数据、
           $scope.pagination.pageIndex = 1;
           //生成账单标志位
           $scope.createBillFlag = false;
           //上传是否成功标志位
           $scope.errMsg = "";
          
	       //为printIp取值提供依据
           $scope.config = config;
        }
        init();
    }]);
});
