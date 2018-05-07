define(['app',
	'codes'
], function (app,codes) {

    app.registerController('ReinsurerEditorCtrl', ['$scope', 'ReinsurerService', '$stateParams', '$location', '$window'
        , function ($scope, reinsurerService, $stateParams, $location, $window) {

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

            //切换编辑器模式
            $scope.toggleMode = function (_mode) {
            	
                $scope.operation = _mode;
            };

            //返回查询再保人
            $scope.closeReinsurer = function () {
                var url = '/reinsurers';
                $location.path(url);
            };

            //保存(新增（new），编辑（update）)
            $scope.saveReinsurer = function(){
            	
                if(checkoutRequired()){
                    if($scope.operation === 'new') {
                        reinsurerService.createReinsurer($scope.reinsurer,$scope.global.user).then(
                            function(data){                            	
                            	if(data.result==="success"){
                                	alert("新增成功！再保人为："+data.msg);
                                	$window.location.reload();
                                    $scope.closeReinsurer();
                                }else{
                                	alert("新增失败！");
                                }
                            },
                            function(code){
                                $scope.$emit('notification', {message:'新增失败', delay:3000, type:'danger'});
                                throw(code);
                            }
                        )
                    } else if($scope.operation === 'edit'){
                        console.log("要修改的数据：");
                        console.log($scope.reinsurer);
                        reinsurerService.updateReinsurer($scope.reinsurer,$scope.global.user).then(
                            function(data){
                                if(data.result==="success"){
                                	alert("修改成功！再保人为："+data.msg);
                                	$window.location.reload();
                                    $scope.closeReinsurer();
                                }else{
                                	alert("修改失败！");
                                }
                            },                            
                            function(code){
                                $scope.$emit('notification', {message:'修改失败', delay:3000, type:'danger'});
                                throw(code);
                            }
                        )
                    }
                };

            }           


            //必录项控制
            var checkoutRequired = function(){
            	var flag = true;
                if($scope.reinsurer.locationFlag === "" || $scope.reinsurer.locationFlag === null){
                    alert("请选择境内境外标识！");
                    flag = false;
                    return ;
                }else if($scope.reinsurer.regionCode === "" || $scope.reinsurer.regionCode === null){
                    alert("请选择所在城市/地区！");
                    flag = false;
                    return ;
                }else if($scope.reinsurer.reinsType === "" || $scope.reinsurer.reinsType === null){
                    alert("请选择再保人属性！");
                    flag = false;
                    return ;
                } else if($scope.reinsurer.validStatus === "" || $scope.reinsurer.validStatus === null){
                    alert("请选择有效标志！");
                    flag = false;
                    return ;
                } else if($scope.reinsurer.flag === "" || $scope.reinsurer.flag === null){
                    alert("请选择是否总公司！");
                    flag = false;
                    return ;
                /*} else if($scope.reinsurer.associateFlag === "" || $scope.reinsurer.associateFlag === null){
                    alert("请选择关联再保人！");
                    return false;*/
                } else if($scope.reinsurer.prpDreinsVatList !== null ){
                	
                	$.each($scope.reinsurer.prpDreinsVatList,function(index,temp){
                    	//默认赋值-纳税人身份-
                        if(temp.taxpayerstatus === null || temp.taxpayerstatus === ""){
                        	alert("请选择纳税人身份！");
                        	flag = false;
                            return ;
                        }else{
                        	if(temp.taxPayerId === ""){
                        		alert("请录入纳税人识别号！");
                        		flag = false;
                                return ;
                        	}else if(temp.taxPayerName === ""){
                        		alert("请录入纳税人名称！");
                        		flag = false;
                                return ;
                        	}else if(temp.taxpayerstatus === "Y"){
                        		if(temp.invoiceAddr === ""){
                        			alert("请录入开票地址！");
                        			flag = false;
                                    return ;
                        		}else if(temp.taxPhone === ""){
                        			alert("请录入税务联系电话！");
                        			flag = false;
                                    return ;
                        		}else if(temp.invoiceBank === ""){
                        			alert("请录入开票开户行！");
                        			flag = false;
                                    return ;
                        		}else if(temp.invoiceAccount === ""){
                        			alert("请录入开票银行账号！");
                        			flag = false;
                                    return ;
                        		}
                        	}
                        }                                             
                    });
                }
                	return flag;
                }

        
//        //删除列表
//        $scope.delete = function(){
//            //向后台发送的要删除的列表的每一条的idz
//            var keywords = [];
//            $.each($scope.reinsurerList,function(index,temp){
//                var keyword={};
//                keyword.acceptCode=temp.acceptCode;
//                keyword.acceptName=temp.acceptName;
//                keyword.acceptEnglishName=temp.acceptEnglishName;
//                keyword.acceptType=temp.acceptType;
//                keyword.domeOverFlag=temp.domeOverFlag;
//                keywords.push(keyword);
//            });
//            deleteReinsurer(keywords);
//        };

            //增加行
            $scope.addLayerPrpdAccount = function(){
                var _recepter =  {
                    /*"id":{
                        "reinsCode":'',
                        "serialNo":1
                    },*/
                    "reinsCode":'',
                    "serialNo":1,
                    "accountName":'',
                    "addr":'',
                    "bank":'',
                    "currency":"01",
                    "accounts":'',
                    "startDate":null,
                    "endDate":null,
                    "type":1, 
                    "validStatus":'1',
                    "flag":null
                };

                var temp = angular.copy($scope.reinsurer.prpDAccountList[$scope.reinsurer.prpDAccountList.length-1]);
                if(angular.isUndefined(temp)){
                    $scope.reinsurer.prpDAccountList.push(_recepter);
                }else{
                    delete _recepter.serialNo;
                    temp = _recepter;
                    temp.serialNo +=1;
                    $scope.reinsurer.prpDAccountList.push(temp);
                    countSerialNo();
                }
            };

            
            $scope.addLayerPrpdReinsAssess = function(){
                var _recepter = {
                    "id":{
                        "reinsCode":'',
                        "serialNo":1
                    },
                    "assessLevel":'',
                    "assessDate":null,
                    "assessLevel2":null,
                    "assessDate2":null,
                    "assessLevel3":null,
                    "assessDate3":null,
                    "assessLeve4":null,
                    "assessDate4":null,
                    "validStatus":'1',
                    "remarks":null,
                    "assessTyp":"",
                    "deleteFlag":0
                };
                var temp = angular.copy($scope.reinsurer[$scope.reinsurer.length-1]);
                console.log(temp);
                if(angular.isUndefined(temp)){
                    $scope.reinsurer.push(_recepter);
                }else{
                    delete _recepter.id.serialNo;
                    temp = _recepter;
                   
                    temp.id.serialNo +=1;
                    $scope.reinsurer.push(temp);
                    countSerialNo();
                    
                }
            };
            
            $scope.addLayerPrpdReinsVat = function(){
            	var _recepter = {
                        /*"id":{
                            "reinsCode":'',
                            "comlevel2no":1
                        },*/
                        "reinsCode":'',
                        "comlevel2no":1,
                        "taxpayerstatus":'Y',
                        "taxPayerName":'',
                        "taxPayerId":'',
                        "invoiceAddr":'',
                        "taxPhone":'',
                        "invoiceBank":'',
                        "gmtCreate":'',
                        "gmtModified":'',
                        "invoiceAccount":''
                    };

                var temp = angular.copy($scope.reinsurer.prpDreinsVatList[$scope.reinsurer.prpDreinsVatList.length-1]);
                if(angular.isUndefined(temp)){
                	$scope.reinsurer.prpDreinsVatList.push(_recepter);
                }else{
                    delete _recepter.comlevel2no;
                    temp = _recepter;
                    temp.comlevel2no +=1;
                    $scope.reinsurer.prpDreinsVatList.push(temp);
                   countSerialNo();
                }
            };
            //计算风险单位号（投保单）
            var countSerialNo = function(){
                $.each($scope.reinsurer.prpDAccountList,function(index, r){
                    r.serialNo = index+1;
                });
               /* $.each($scope.reinsurer.prpdReinsAssess,function(index, r){
                    r.id.serialNo = index+1;
                });*/
                $.each($scope.reinsurer.prpDreinsVatList,function(index, r){
                	r.comlevel2no = index+1;
                });
            };

            //移除当前行
           /*$scope.removePrpdAccount = function(data){
                if(confirm("确认删除当前行？")){
                    $.each( $scope.reinsurer.prpDaccountList, function(index, _data){
                        if(data === _data){
                            $scope.reinsurer.prpDaccountList.splice(index, 1);
                        }
                    });
                   countSerialNo();
                }
            }*/
            
            $scope.removePrpdAccount = function($reinsurer,$prpDaccount){
                if(confirm("确认删除当前行？")){
                    $.each( $reinsurer.prpDAccountList, function(index,prpDaccount){
                        if($prpDaccount === prpDaccount){
                            $reinsurer.prpDAccountList.splice(index, 1);
                        }
                    });
                }
            };           
            
            $scope.removePrpdReinsAssess = function($reinsurer){
                if(confirm("确认删除当前行？")){
                    $.each( $scope.reinsurer, function(index, _data){
                        if(data === _data){
                            $scope.reinsurer.splice(index, 1);
                        }
                    });
                }
            };
            $scope.removePrpdReinsVat = function($reinsurer,$prpDreinsVat){
                if(confirm("确认删除当前行？")){
                    $.each( $reinsurer.prpDreinsVatList, function(index,prpDreinsVat){
                        if($prpDreinsVat === prpDreinsVat){
                            $reinsurer.prpDreinsVatList.splice(index, 1);
                        }
                    });
                }
            };
            //typehead输入域
            $scope.getByReturn = function(parameter,value){
                var temp = parameter+"";
                var keywords = {"id":parameter,"value":value, "holdFlag": false};
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
            
            //附件上传成功 
            $scope.onFileUploadDone = function(data){
            	if(data.result != "error"){
    		        $scope.queryReinsurer($scope.reinsurerNo,$scope.global.user)
                    .then(function(data){
                        $scope.reinsurer = defaultAssignment(data);
                        console.log("$scope.getReinsurer's value is :");
                        console.log($scope.reinsurer);
                    	},
                    	function(){

                    	}
                    	);
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
//        //关闭窗口
//        $scope.cancel = function () {
//            $modalInstance.dismiss('cancel');
//        };
            //初始化默认对象
            $scope.initReinsurer = function(){
                console.log("chu shi hua fang fa ");

                $scope.reinsurer = {
                    "reinsCode":'',
                    "longName":'',
                    "shortName":'',
                    "payeeId":'',
                    "regionCode":null,
                    "countryName":null,
                    "locationFlag":'D',
                    "remarks":null,
                    "chgDate":null,
                    "newReinsCode":null,
                    "validStatus":'1',
                    "operatorCode":null,
                    "operatedTime":null,
                    "flag":1,
                    "reinsType":'0',
                    "webAddress":null,
                    "upperReinsCode":null,
                    "currencyFlag":null,
                    "assessDate":null,
                    "reinsKind":null,
                    "reinsFlag":null,
                    "currency":"CNY",
                    "warningLine":null,
                    "wlCurrency":"CNY",
                    "tlCurrency":"CNY",
                    "prpdinrecommcode":null,
                    "validFlag":null,
                    "payeetypename":null,
                   /* "prpdReinsAssess":[
                        {
                            "id":{
                                "reinsCode":'',
                                "serialNo":null
                            },
                            "assessLevel":'',
                            "assessDate":null,
                            "assessLevel2":null,
                            "assessDate2":null,
                            "assessLevel3":null,
                            "assessDate3":null,
                            "assessLeve4":null,
                            "assessDate4":null,
                            "validStatus":'1',
                            "remarks":null,
                            "assessTyp":"",
                            "deleteFlag":0
                        }
                    ],*/
                    "prpDAccountList":[
                        {
                            /*"id":{
                                "reinsCode":'',
                                "serialNo":1
                            },*/                        	
                        	"reinsCode":'',
                        	"serialNo":1,
                            "accountName":'',
                            "addr":'',
                            "bank":'',
                            "type":'1',
                            "currency":"CNY",
                            "accounts":'',
                            "startDate":null,
                            "endDate":null,
                            "validStatus":'1',
                            "flag":null
                        }
                    ],
                    "prpDreinsVatList":[
                       {
                           /*"id":{
                               "reinsCode":'',
                               "comlevel2no":1
                           },*/
                           "reinsCode":'',
                           "comlevel2no":1,
                           "taxpayerstatus":'Y',
                           "taxPayerName":'',
                           "taxPayerId":'',
                           "invoiceAddr":'',
                           "taxPhone":'',
                           "invoiceBank":'',
                           "invoiceAccount":'',
                           "gmtCreate":'',
                           "gmtModified":'',
                           /*"validStatus":'1',
                           "flag":null*/
                       }
                   ],
                    "caddr":null,
                    "eaddr":null,
                };
            };

            //当返回数据没有是，默认赋值
            var defaultAssignment = function(data){
                //默认赋值-是否满足偿付能力-是
               /* if( data.payAbility === null || data.payAbility === ""){
                    data.payAbility = '1';
                }
                //默认赋值-关联再保人-否
                if(data.associateFlag === null || data.associateFlag === ""){
                    data.associateFlag = '0';
                }*/
                //默认赋值-是否总公司-不是
                if(data.flag === null || data.flag === ""){
                    data.flag = '0';
                }
                //默认赋值-最高线币别-人民币
                if(data.tlCurrency === null || data.tlCurrency === ""){
                    data.tlCurrency = 'CNY';
                }
                //默认赋值-资本金信息币别-人民币
                if(data.currency === null || data.currency === ""){
                    data.currency = 'CNY';
                }
                //默认赋值-警告线币别-人民币
                if(data.wlCurrency === null || data.wlCurrency === ""){
                    data.wlCurrency = 'CNY';
                }
               /* //默认赋值-资本公积金币别-人民币
                if(data.crCurrency === null || data.crCurrency === ""){
                    data.crCurrency = '01';
                }*/
                //默认赋值-警告线币别-人民币

                //默认赋值-有效标志-有效
                if(data.validStatus === null || data.validStatus === ""){
                    data.validStatus = "1";
                }
                //默认赋值-再保人属性-
                if(data.reinsType === null || data.reinsType === ""){
                    data.reinsType = "0";
                }
                //默认赋值-境内境外-境内
                if(data.locationFlag === null || data.locationFlag === ""){
                    data.locationFlag = "D";
                }

                $.each(data.prpDreinsVatList,function(index,temp){
                    if(temp.taxPayerStatus === null || temp.taxPayerStatus === ""){
                        temp.taxPayerStatus = "Y";
                    }
                    //默认赋值-有效标志-有效
                   /* if(temp.validStatus === null || temp.validStatus === ""){
                        temp.validStatus = "1";
                    }*/

                });
                
                $.each(data.prpDAccountList,function(index,temp){
                    if(temp.currency === null || temp.currency === ""){
                        temp.currency = "CNY";
                    }
                    //默认赋值-有效标志-有效
                    if(temp.validStatus === null || temp.validStatus === ""){
                        temp.validStatus = "1";
                    }

                });
                               
                return data;
            }
            

            
            //初始化函数
            var init = function(){
                //默认隐藏条件框
                $scope.hideSearchList();

                //默认对象初始化
                $scope.initReinsurer();

                //数据字典初始化             
                $scope.keywords = {
                    "id":"",
                    "value":"",
                    "other1":""
                };

                //货币
                var key = angular.copy($scope.keywords);
                key.id="currency";
                key.value="";
                $scope.getCode(key,{},"currencys");			

                $scope.reinsType = codes["reinsType"]; //再保人属性
                $scope.location = codes["locationFlag"]; //境内境外
                $scope.regionCodes = codes["regionCode"]; //境内境外                  
                $scope.flag = codes["validStatus"]; //有效标志位
                $scope.assessType = codes["assessType"];//其他评级类型
                $scope.type = codes["type"]; //类型
                $scope.taxpayerstatus = codes["taxpayerstatus"]; //纳税人身份
                $scope.certificateType = codes["certificateType"]; //证件类型
                $scope.accountProp = codes["accountProp"]; //对公对私状态

                
                console.log("000**** : " + $scope.operation); 
                
                $scope.operation = angular.isUndefined($stateParams.operation)? 'new': $stateParams.operation;
                $scope.reinsurerNo = angular.isUndefined($stateParams.reinsurerNo)? '': $stateParams.reinsurerNo;
                console.log("111**** : " + $scope.operation); 
                //编辑，查看
                if( $scope.operation === 'edit' ||  $scope.operation === 'view') {
                    console.log("-------------------");
                    console.log("000000:"+ $scope.reinsurerNo);
                    $scope.queryReinsurer($scope.reinsurerNo,$scope.global.user)
                        .then(
                        function(data){
                        	console.log("后台--前台");
                            $scope.reinsurer = defaultAssignment(data);
                            console.log("$scope.getReinsurer's value is :"+$scope.reinsurer);
                        },
                        function(){

                        }
                    );
                }   
            };
           
            init();
        }]);
});