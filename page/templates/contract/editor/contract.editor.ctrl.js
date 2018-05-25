define(['app',
    'config',
    'codes',
    '/reins/page/templates/common/directives/currency.js',
    '/reins/page/templates/common/directives/percentage.js',
    '/reins/page/templates/common/directives/year.js',
    '/reins/page/templates/common/directives/nonnegtive.js',
    '/reins/page/templates/contract/editor/contract.exclusion.ctrl.js',
    // '/reins/page/templates/common/directives/percentage2.js'
], function (app, config, codes) {

    app.registerController('ContractEditorCtrl', ['$scope', '$location', '$filter',
        '$stateParams', '$modal', 'ContractService', 'BillService', '$timeout'
        , function ($scope, $location, $filter, $stateParams, $modal, contractService, billService, $timeout) {

            $scope.importExcelDWR = function () {
                var fd = new FormData();
                var file = document.querySelector('input[type=file]').files[0];
                if (file == null || file == "" || file == "undefined") {
                    alert("没有要导入的Excel文件！");
                    return;
                }
                var name = file.name;
                var fileStyle = name.substring(name.lastIndexOf(".") + 1);
                if (fileStyle == "xlsx") {
                    alert("请选用Excel2003文件格式上传");
                    return;
                }
                if (fileStyle != "xls") {
                    alert("请选择Excel文件");
                    return;
                }
                fd.append('logo', file);

                contractService.searchImport(fd, file).then(
                    function (data) {
                        $scope.aa = data.data;
                    }
                );
            };
            $scope.linkageShareRate = function (receptor, id) {
                for (var index = 0; index < $scope.contract.fhSectionList.length; index++) {
                    $scope.contract.fhSectionList[index].fhSectionReinsList[id].shareRate = receptor[id].shareRate;
                }
                ;
            };
            $scope.linkageReinsCode = function (receptor, id) {
                for (var index = 0; index < $scope.contract.fhSectionList.length; index++) {
                    var reinsName;
                    $.each($scope.reinsCodes, function (index, r) {
                        if (r.id === receptor[id].reinsCode) {
                            reinsName = r.value;
                        }
                    });
                    $scope.contract.fhSectionList[index].fhSectionReinsList[id].reinsCode = receptor[id].reinsCode;
                    $scope.contract.fhSectionList[index].fhSectionReinsList[id].reinsName = reinsName;
                }
                ;
            };
            //预处理合同，方便编辑时的操作
            $scope.preDealWith = function (contract) {
                $scope.mayStateFlags = [];
                // 	console.log("before deal ...");
                //	console.log(contract);
                contract = angular.copy(contract);
                if ($scope.contAttr === "nprop") {

                    if (contract.stateFlag === "1" || contract.stateFlag === "2") { //进入编辑状态时，生效的合同某些项目不能编辑
                        $scope.effected = true;
                    }

                    //预处理合同状态
                    if (angular.isDefined(contract) && angular.isDefined(contract.stateFlag)) {

                        if (contract.stateFlag === "0") {
                            $.each($scope.stateFlags, function (index, t) {
                                if (t.id === contract.stateFlag || t.id === "1") {
                                    $scope.mayStateFlags.push(t);
                                }
                            });
                        } else {
                            $.each($scope.stateFlags, function (index, t) {
                                if (parseInt(t.id) >= parseInt(contract.stateFlag)) {
                                    $scope.mayStateFlags.push(t);
                                }
                            });
                        }
                    }
                    contract.endDateHold = angular.copy(contract.endDate);//终止日期
                    contract.startDate = $scope.fomatTimeYNR(contract.startDate);
                    contract.endDate = $scope.fomatTimeYNR(contract.endDate);
                    contract.extendDate = $scope.fomatTimeYNR(contract.extendDate);
                    $.each(contract.fhxLayerList, function (index2, layer) {
                        $.each(layer.fhxReinsList, function (index3, rein) {
                            if (rein.brokerFlag === '1' || rein.brokerFlag === "true") {
                                rein.brokerFlag = "1";
                            } else {
                                rein.brokerFlag = "0";
                            }


                        });
                    });

                } else {
                    if (contract.stateFlag === "4") { //进入编辑状态时，生效的合同某些项目不能编辑
                        $scope.effected = true;
                    }
                    //预处理合同状态
                    if (angular.isDefined(contract) && angular.isDefined(contract.stateFlag)) {
                        if (contract.stateFlag === "4" || contract.stateFlag === "6") {
                            $.each($scope.contStatuses, function (index, t) {
                                if (t.id === contract.stateFlag || t.id === "1") {
                                    $scope.mayStateFlags.push(t);
                                }
                            });
                        } else {
                            $.each($scope.contStatuses, function (index, t) {
                                if (parseInt(t.id) >= parseInt(contract.stateFlag)) {
                                    $scope.mayStateFlags.push(t);
                                }
                            });
                        }
                    }
                    $.each(contract.fhReinsList, function (index1, share) {/*
                    			if(share.brokerFlag==='1'){
                    				share.brokerFlag = "1";
            					}else{
            						share.brokerFlag = "0";
            					}
                    			if(share.isPrireins==="1"){
                    				share.isPrireins = "1";
                    			}else
                    				share.isPrireins = "0";
                    			$.each(share.fhFinalReinsList, function(index2, FShare){
                    				if(FShare.isPrireins ==="1"){
                    					FShare.isPrireins = "1";
                    				}else
                    					FShare.isPrireins = "0";
                    			});
                    		*/
                    });
                    $.each(contract.fhSectionList, function (index3, section) {/*
                    			if(section.fhRiskList.length > 0){
                    				section.insrncCde = section.fhRiskList[0].insrncCde;
                    				$scope.searchEarthQuake(section);
                    			}
                    		*/
                    });

                    contract.endDateHold = angular.copy(contract.contEndTm);
                }
                //	console.log("\n\n\n   contract pre deal");
                return contract;
            };

            //日期格式化yyyy-MM-dd
            $scope.fomatTimeYNR = function (time) {
                //var oldTime = (new Date("2011/11/11 20:10:10")).getTime(); //得到毫秒数
                console.log("init time is : " + time);
                var now = new Date(time); //就得到普通的时间了
                //var now = time;
                var year = now.getFullYear();       //年
                var month = now.getMonth() + 1;     //月
                var day = now.getDate();            //日
                var clock = year + "-";
                if (month < 10)
                    clock += "0";
                clock += month + "-";
                if (day < 10)
                    clock += "0";
                clock += day;

                console.log("time is : " + clock);
                return (clock);
            }

            //是否固定费率分保率
            $scope.isFixedRate = function (isFixedRate) {
                if (isFixedRate == 0) {
                    $scope.FixedRate = true;
                }
                else
                    $scope.FixedRate = false;
            }

            //比例成数分出是否车险特殊分保合同
            $scope.isCarFlag = function (carFlag) {//是否高架车标识  0:否1:是
                if (carFlag === 0) {//传值刚好相反,进行转换
                    carFlag = 1;
                } else {
                    carFlag = 0;
                }
                if (carFlag === 0) {
                    $scope.contract.carFlag = 0;
                    $scope.contract.carServAmoutFlag = 0;//0:默认不选1:业务品质,2:保额区间
                    $.each($scope.contract.fhSectionList, function (index, section) {
                        section.sectionCarFlag = "0";//分项中是否显示高架车信息的标志 0:不显示 1:显示(只有主项中点选高价车，分项中 才可追加高架车信息)
                    });
                }
                else {
                    $scope.contract.carFlag = 1;
                    $scope.contract.carServAmoutFlag = 1;
                    $.each($scope.contract.fhSectionList, function (index, section) {
                        section.sectionCarFlag = "1";
                    });
                }
            }


            //保费支付
            $scope.confirmPay = function (layer, payTimes) {
                layer.fhxPlanList = [];
                if (angular.isUndefined(payTimes) || parseInt(payTimes) < 1) {
                    return false;
                }
                var start = Date.parse($scope.contract.start);
                var end = Date.parse($scope.contract.end);
                if (isNaN(start)) {
                    alert("合同起期还没有填！！");
                    return false;
                }
                if (isNaN(end)) {
                    alert("合同止期还没有填！！");
                    return false;
                }

                var every = parseFloat((parseFloat(layer.mdp) / payTimes) + "").toFixed(2);
                var MDP = layer.mdp;
                var _pay = angular.copy(contractService.getElement("npropPay"));
                //_pay.payNo = 1;
                _pay.payTimes = 1;
                _pay.plan = $scope.contract.start;
                _pay.currency = layer.currency;
                //slh
                if (_pay.currency === "01") {
                    alert("请选择币别！！");
                    return false;
                }
                //slh
                _pay.payValue = (parseFloat(MDP) - every * (parseInt(payTimes) - 1)).toFixed(2) + "";
                //_pay.payTimes = payTimes;
                layer.fhxPlanList.push(_pay);
                if (payTimes > 1) {
                    var ele = ((new Date(end).getTime()) - (new Date(start).getTime())) / parseInt(payTimes);
                    console.log("分期后的天数间隔为 ： " + (ele / 86400000));
                    for (var i = 2; i <= payTimes; i++) {
                        var _pay = angular.copy(contractService.getElement("npropPay"));
                        // _pay.id.payNo = i;
                        _pay.payTimes = i;
                        var temp = (new Date(start).getTime()) + (ele * (i - 1));
                        var temp = $scope.fomatTimeYNR(temp);
//                                 var temp = start + ele * i;
//                                 temp = new Date(temp);
//                                 var nowMonth ;
//                                 if(temp.getMonth()<8){
//                                	 nowMonth = "0"+(temp.getMonth()+1);
//                                 }else{
//                                	 nowMonth = temp.getMonth()+1+"";
//                                 }
//                                 var nowDay ;
//                                 if(temp.getDate() < 10){
//                                	 nowDay = "0"+temp.getDate();
//                                 }else{
//                                	 nowDay = ""+temp.getDate();
//                                 }
//                                 var now = temp.getFullYear()+"-"+nowMonth+"-"+nowDay;
                        //var now = temp.getFullYear()+"-"+temp.getMonth()+"-"+temp.getDate();
                        console.log("分期后的日期为： " + temp);
                        _pay.plan = temp;
                        _pay.currency = layer.currency;
                        _pay.payValue = every + "";
                        //_pay.payTimes = payTimes;
                        layer.fhxPlanList.push(_pay);
                    }
                }
            };
            //验证保费支付日期范围
            $scope.checkPlanDate = function (fhxPlanList, plan) {
                $timeout(function () {
                    var temp = Date.parse(plan);
                    if (isNaN(temp)) {
                        alert("当前支付日期已清空，请输入日期！！");
                    } else {
                        var arr = [{"plan": $scope.contract.startDate}];
                        var _index = 0;
                        $.each(fhxPlanList, function (index, plan) {
                            if (plan.plan === plan) {
                                _index = index + 1;
                            }
                            arr.push(plan);
                        });
                        arr.push({"plan": $scope.contract.endDate});
                        var pre = Date.parse(arr[_index - 1].plan);
                        var next = Date.parse(arr[_index + 1].plan);
                        if (pre > temp) {
                            if (_index === 1) {
                                alert("支付日期不能早于合同起期！");
                                fhxPlanList[_index - 1].plan = $scope.contract.startDate;
                            } else {
                                alert("当前支付日期不能早于上一期");
                                fhxPlanList[_index - 1].plan = fhxPlanList[_index - 2].plan;
                            }
                        }
                        if (temp > next) {
                            if (_index === fhxPlanList.length) {
                                alert("支付日期不能晚于合同止期！！");
                                fhxPlanList[_index - 1].plan = $scope.contract.endDate;
                            } else {
                                alert("当前支付日期不能晚于下一期");
                                fhxPlanList[_index - 1].plan = fhxPlanList[_index].plan;
                            }
                        }
                    }
                }, 100);

            };

            //验证保费支付时的支付金额
            $scope.checkPayValue = function (layer, plan) {
                var alreadyInput = 0.0;
                $.each(layer.fhxPlanList, function (index, p) {
                    if (p != plan)
                        alreadyInput += parseFloat(p.payValue + "");
                });

                $.each($scope.contract.fhxLayerList, function (index2, layer) {
                    if ((alreadyInput + parseFloat(plan.payValue + "")) > layer.mdp) {
                        alert("支付总额不可以大于最低预付分保费(MDP)！！");
                        plan.payValue = (parseFloat(layer.mdp + "") - parseFloat(alreadyInput + "")).toFixed(2) + "";
                    } else if ((alreadyInput + parseFloat(plan.payValue + "")) != layer.mdp) {
                        alert("支付总额已经不等于最低预付分保费(MDP)！！");
                    }
                });
            };
            //根据层起赔点和层止赔点计算层限额
            $scope.countQuota = function (layer) {
                var test = /^\d+\.?\d*$/;
                var temp = 0.00;
                if (test.test(layer.excessLoss) && test.test(layer.expireLoss)) {
                    if (parseFloat(layer.expireLoss + "") > parseFloat(layer.excessLoss + ""))
                        temp = "" + parseFloat(layer.expireLoss + "") - parseFloat(layer.excessLoss + "");
                    else if (parseFloat(layer.expireLoss + "") > 0) {
                        alert("止赔点要大于起赔点！！\n 请重新输入层止赔点！");
                        layer.expireLoss = "";
                    }

                    layer.layerquota = "" + parseFloat((temp + "").replace(/[^\d\.-]/g, "")).toFixed(2);
                } else {

                    layer.layerquota = "0.00";
                }
                $scope.countROL(layer);
            };
            //计算层保费
            $scope.countLayerPremium = function (layer) {
                var test = /^\d+\.?\d*$/;
                if (test.test(layer.egnpi) && test.test(layer.rate)) {
                    var temp = parseFloat(parseFloat(layer.rate + "") / 100) * parseFloat(layer.egnpi + "");
                    layer.layerPremium = parseFloat(temp + "").toFixed(2) + "";
                    //将分项下的gnpi赋值给层信息下的gnpi

                    layer.egnpi = layer.egnpi;
                } else {
                    layer.layerPremium = "0.00";
                }
                $scope.countMDP(layer);
            };
            //计算最低预付分保费mdp
            $scope.countMDP = function (layer) {
                var test = /^(((([1-9][0-9]?)|0)(\.[0-9]{1,4})?)|(100(\.[0]{1,4})?))$/;
                var test1 = /^(((([1-9][0-9]?)|0)(\.[0-9]{1,10})?)|(100(\.[0]{1,10})?))$/;
                var cu = /^\d+(\.\d+)?$/;


                var remember = layer.mdp;
                if (test.test(layer.rate) && test1.test(layer.mdpRate) && cu.test(layer.egnpi)) {
                    layer.mdp = "" + parseFloat((parseFloat(layer.rate + "") / 100 * parseFloat(layer.mdpRate + "") / 100 * parseFloat(layer.egnpi + "")) + "").toFixed(2);
                } else {

                    layer.mdp = "0.00";
                }

                if (remember != layer.mdp) {
                    $scope.equalMDPAndPay(layer);
                    $scope.countROL(layer);
                }
            };
            //计算预付比例 2015-02-05-yanliming
            $scope.countMDPRate = function (layer) {
                var test = /^(((([1-9][0-9]?)|0)(\.[0-9]{1,4})?)|(100(\.[0]{1,4})?))$/;
                var cu = /^\d+(\.\d+)?$/;


                var remember = layer.mdp;
                if (test.test(layer.rate) && cu.test(layer.mdp) && cu.test(layer.egnpi)) {
                    layer.mdpRate = "" + parseFloat((parseFloat(layer.mdp + "") * 100 / (parseFloat(layer.layerPremium + ""))) + "").toFixed(10);
                    //layer.mdpRate = ""+parseFloat(( parseFloat(layer.mdp+"")*100/(parseFloat(layer.rate+"")/100* parseFloat(layer.egnpi+"")) )+"").toFixed(10);
                } else {

                    layer.mdpRate = "0.0000000000";
                }

                if (remember != layer.mdp) {
                    $scope.equalMDPAndPay(layer);
                    $scope.countROL(layer);
                }
            };

            $scope.calTotalQuota = function (layer) {
                var sumRein = 0;
                if (layer.fhXReinstTimesList)
                    $.each(layer.fhXReinstTimesList, function (index, rein) {
                        sumRein = sumRein + rein.reinsRate;
                    })
                if (angular.isNumber(parseFloat(layer.layerquota + "")) && angular.isNumber(parseFloat(sumRein + ""))) {
                    layer.totalquota = ((parseFloat(layer.layerquota + "")) * ((parseFloat(sumRein + "") / 100) + 1)).toFixed(2);
//                    		layer.totalquota=(parseFloat(layer.layerquota+""))*((parseFloat(layer.reinstType+""))+1);
                }
            };
            /**计算最低预付分保费**/
            $scope.calLayerMdp = function (layer) {
                var number = /^\d*(\.\d*)?$/;
                if (angular.isNumber(parseFloat(layer.layerPremium + "")) && angular.isNumber(parseFloat(layer.mdpRate + ""))) {
                    var fhXLayerMdp = (parseFloat(layer.layerPremium + "")) * (parseFloat(layer.mdpRate + "")) / 100;
                    if (isNaN(fhXLayerMdp)) {
                        fhXLayerMdp = 0;
                    }
                    layer.mdp = fhXLayerMdp.toFixed(2);
                }
            };
                  
            /**计算层保费以及格式化**/
            $scope.calLayerPremium = function (layer) {
                var number = /^\d*(\.\d*)?$/;
                if (angular.isNumber(parseFloat(layer.egnpi + "")) && angular.isNumber(parseFloat(layer.rate + ""))) {
                    var layerPremium = (parseFloat(layer.egnpi + "")) * (parseFloat(layer.rate + "")) / 100;
                    if (isNaN(layerPremium)) {
                        layerPremium = 0;
                    }
                    layer.layerPremium = layerPremium.toFixed(2);//四舍五入
                    layer.rate = parseFloat(layer.rate).toFixed(6);
                }
            };
            //add by zhx 比例合同新增溢额合约时自动计算合同限额
            $scope.setLimitValue = function (section) {
                var temp = 0.0;
                var number = /^\d*(\.\d*)?$/;
                if (number.test(section.line) && number.test(section.retentionValue)) {
                    if ((parseFloat(section.line + "") > 0) && (parseFloat(section.retentionValue + "") > 0)) {
                        temp = (parseFloat(section.line + "")) * (parseFloat(section.retentionValue + ""));

                        section.limitValue = "" + (parseFloat(temp + "")).toFixed(2);
                    } else {
                        section.limitValue = 0.00;
                    }
                }
            }

            $scope.setRol = function (layer) {
                var temp = 0.0;
                var number = /^\d*(\.\d*)?$/;
//                    	if(angular.isNumber(parseFloat(layer.egnpi +""))&&angular.isNumber(parseFloat(layer.rate +""))&&angular.isNumber(parseFloat(layer.layerquota+""))){
//                    		if(layer.layerquota!=0){
//                            	temp = (((parseFloat(layer.egnpi +"")) * (parseFloat(layer.rate +"")) / (parseFloat(layer.layerquota+"")) /100*100000) /100000);
                if (number.test(layer.layerquota) && number.test(layer.layerPremium)) {
                    if ((parseFloat(layer.layerquota + "") > 0) && (parseFloat(layer.layerPremium + "") > 0)) {
                        temp = (parseFloat(layer.layerPremium + "")) / (parseFloat(layer.layerquota + "")) * 100;
                        if (temp > 100.0) {
                            //alert("ROL 值过大，系统将强制修改”最低预付分保费(MDP)“！！");
                            alert("ROL 值不能大于100！！");
                        }
                        layer.rol = "" + (parseFloat(temp + "")).toFixed(6);
                    } else {
                        layer.rol = 0.000000;
                    }
                }
            }
            //删除恢复保费类型
            $scope.delReinstTypeList = function (num) {
                $.each($scope.contract.fhxLayerList, function (index, r) {
                    $.each(r.fhXReinstTimesList, function (index1, list) {
                        if (num === index1) {
                            r.fhXReinstTimesList.splice(index1, 1);
                        }
                    });


                });
            }
            //添加恢复类型
            $scope.addReinstTypeList = function () {
                $.each($scope.contract.fhxLayerList, function (index, r) {
                    var data = {
                        reinstTimes: '',
                        reinstType: '0',
                        reinsRate: '',
                        randomNum: angular.copy(Math.random())
                    };
                    r.fhXReinstTimesList.push(data);
                });
            };
            //批量添加恢复类型
            $scope.createNum = function (layer,num) {
                    layer.fhXReinstTimesList = [];
                    for (var i = 0; i < num; i++) {
                        var data = {
                            reinstTimes: i + 1,
                            reinstType: '0',
                            reinsRate: '',
                            randomNum: angular.copy(Math.random())
                        };
                       layer.fhXReinstTimesList.push(data);
                    }
//                $.each($scope.contract.fhxLayerList, function (index, r) {
//                    r.fhXReinstTimesList = TimesList;
//                });
            };
            //校验次数是否重复
            $scope.changeTimes = function (times, randomNum) {
                $.each($scope.contract.fhxLayerList, function (index, r) {
                    $.each(r.fhXReinstTimesList, function (index, fhXReinstTimes) {
                        if (fhXReinstTimes.reinstTimes) {
                            if (fhXReinstTimes.randomNum !== randomNum && fhXReinstTimes.reinstTimes === times) {
                                $.each(r.fhXReinstTimesList, function (index, fhXReinst) {
                                    if (fhXReinst.randomNum === randomNum) {
                                        fhXReinst.reinstTimes = '';
                                    }
                                });
                                alert('重复了！！');
                            }
                        }
                    });
                });
            }
            //计算非比例层ROL
            $scope.countROL = function (layer) {
                var number = /^\d*(\.\d*)?$/;
                var temp = 0.0;

                if (number.test(layer.layerquota) && number.test(layer.layerPremium)) {
                    if ((parseFloat(layer.layerquota + "") > 0) && (parseFloat(layer.layerPremium + "") > 0)) {
                        temp = (parseFloat(layer.layerPremium + "")) / (parseFloat(layer.layerquota + "")) * 100;
//                        		var sub = layer.mdp +"";
                        if (temp >= 100.0) {
                            //alert("ROL 值过大，系统将强制修改”最低预付分保费(MDP)“！！");
                            alert("ROL 值不能大于100！！");
                        }
                        //while(temp > 100.0){
                        //	sub = sub.substring(0,(sub.length - 1));
                        //	if(sub === "" || parseFloat(sub)===0)
                        //		temp = 0.0;
                        //	else

                        //		temp = parseFloat(sub)  / parseFloat(layer.layerquota+"") * 100;
                        //}

                        //layer.mdp = sub;
                    }
                    layer.rol = "" + (parseFloat(temp + "")).toFixed(6);
                } else {
                    layer.rol = "0.000000";
                }

            };
            //验证mdp与保费支付金额是否相同
            $scope.equalMDPAndPay = function (layer) {
                if (parseInt(layer.payTimes) > 0) {
                    var all = 0.0;
                    $.each(layer.fhxPlanList, function (index, p) {
                        //all = all + parseFloat(p.payValue);
                        all = parseFloat(all * 1 + p.payValue * 1).toFixed(2);
                    });

                    if (layer.mdp * 1 > all) {
                        alert(layer.mdp + "--最低预付分保费(MDP) 与保费支付信息中支付金额之和不相等！！" + all);
                    }

                    if (layer.mdp * 1 < all) {
                        alert("最低预付分保费(MDP) 不可小于保费支付信息中支付金额之和，系统将自动重新分配保费支付信息中支付金额！！");
                        $.each(layer.fhxPlanList, function (index, p) {

                            p.payValue = parseFloat(parseFloat(layer.mdp) / parseInt(layer.payTimes)).toFixed(2);
                        });
                        if (parseInt(layer.payTimes) > 1) {

                            layer.fhxPlanList[0].payValue = parseFloat(layer.mdp) - layer.fhxPlanList[0].payValue * (layer.fhxPlanList.length - 1);
                        }
                    }
                }
            };
            //比例合同  输入时验证赔付率、手续费率任一不可重复
            $scope.checkAdjustRate = function (section, checker, aim) {

                if (angular.isDefined(checker[aim])) {
                    var pass = true;
                    $.each(section.contOutprptAdjustcomms, function (index, a) {
                        if (a != checker && a[aim] === checker[aim]) {
                            pass = false;
                        }
                    });
                    if (!pass) {
                        var name;
                        if (aim === "lossRate") {
                            name = "赔付率";
                        } else if (aim === "adjustRate") {
                            name = "手续费率";
                        }
                        alert(name + "是不可以重复的！！");
                        checker[aim] = "";
                    }
                }
            };

            //删除适用险种

            $scope.delRiskType = function (layer, risk) {
                var risks = "";
                var name = "";
                if ($scope.contAttr === "prop") {
                    risks = "fhRiskList";
                    name = risk.riskName;
                } else {
                    risks = "fhxRiskList";
                    name = risk.riskName;
                }
                //if(confirm("该操作将同时删除该种类下的地震,确定移除  \"" + name + "\" 吗？")){
                if (confirm("您确定移除  \"" + name + "\" 吗？")) {
                    $.each(layer[risks], function (index, temp) {
                        if (temp === risk) {

                            layer[risks].splice(index, 1);
                            return false;
                        }
                    });
                    if ($scope.contAttr === "prop") {/*
	                        	$.each(section.contOutInssectEqDtls, function(index2, e2){
	                        		if(e2.insrncCde === risk.insrncCde){
	                        			section.contOutInssectEqDtls.splice(index2,1);
	                        		}
	                        	});
	                        	changeEarthQuake(section);
	                        */
                    }
                }
            };
            //输入分项号或者输入地震险分项号时查重
            $scope.checkNoRepeat = function (section, aim) {
                var name = "";
                if (aim === "sectNo") {
                    name = "分项号";
                } else if (aim === "eqsectNo") {
                    name = "地震险子分项号";
                }
                if (section[aim] != "") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        if (temp.sectNo === section[aim]) {
                            if (!(aim === "sectNo" && section === temp)) {
                                alert("该" + name + "与分项" + temp.sectNo + "的分项号重复！！");
                                section[aim] = "";
                                return false;
                            }
                        } else if (temp.eqsectNo === section[aim]) {
                            if (!(aim === "eqsectNo" && section === temp)) {
                                alert("该" + name + "与分项" + temp.sectNo + "的地震险子分项号重复！！");
                                section[aim] = "";
                                return false;
                            }
                        }
                    });
                }
            };
            //增加地震险种
            $scope.addEarthRisk = function (section) {
                var stopFlag = false;
                var stopFlagFinal = false;
                $scope.equalFlag = [];
                $.each(section.contOutInssectEqDtls, function (index0, ee) {
                    if (ee.insrncCde === section.insrncCde) {
                        if ($scope.equalFlag.length <= 0) {
                            stopFlag = true;
                            $scope.equalFlag.push(true);
                            return false;
                        } else {
                            stopFlag = false;
                        }
                    }
                });
                if (stopFlag) {
                    $.each(section.contOutInssectEqDtls, function (index0, ee) {
                        if ((ee.rdrCde === section.riComCde) && (ee.insrncCde === section.insrncCde)) {
                            stopFlagFinal = true;
                            return false;
                        }
                    });
                }
                if (stopFlagFinal) {
                    alert("该地震险已存在！！");
                    stopFlagFinal = false;
                    return false;
                }
                var adjust = angular.copy(contractService.getElement("propAjusts"));
                adjust.rdrCde = section.riComCde;
                adjust.deletable = true;
                $.each(section.riComCdes, function (index, a) {
                    if (a.id === section.riComCde) {
                        adjust.rdrName = a.value;

                        return false;
                    }
                });
                adjust.insrncCde = section.insrncCde;
                $.each(section.fhRiskList, function (index2, risk) {
                    if (risk.insrncCde === section.insrncCde) {
                        adjust.insrncName = risk.insrncName;
                        section.fhRiskList[index2].rdrCde = "*";
                        return false;
                    }
                });
                section.contOutInssectEqDtls.push(adjust);
            };

            //删除地震险种
            $scope.delEarthRisk = function (section, ri) {
                if (confirm("确定要移除 \"" + ri.rdrName + "\" 吗？")) {
                    var count = 0;
                    $.each(section.contOutInssectEqDtls, function (index, e) {
                        if (e === ri) {
                            section.contOutInssectEqDtls.splice(index, 1);
                        }
                        if (e != ri && e.insrncCde === ri.insrncCde) {
                            count += 1;
                        }
                    });
                    if (count === 0)
                        $.each(section.fhRiskList, function (index2, r) {
                            if (r.insrncCde === ri.insrncCde) {
                                r.rdrCde = "**";
                            }
                        });
                    if (section.contOutInssectEqDtls.length === 0) {
                        section.eqsectNo = "";
                        section.eqCommRate = "";
                    }
                }
            };
            //比例合同除外责任位置
            //比例合同除外责任展开与关闭
            $scope.collapseExclusion = function () {
                $scope.ES.collapseFlag = !$scope.ES.collapseFlag;
                $scope.ES.collapseName = $scope.ES.collapseFlag ? "展开" : "折叠";
            };
            //单条删除除外责任
            $scope.delExclusion = function (e) {
                if (confirm("要删除  \"" + e.itemKindDesc + "\" 吗？"))
                    $.each($scope.contract.fhSectionList, function (index, section) {
                        $.each(section.fhExItemKindList, function (index, ex) {
                            if (ex === e) {
                                section.fhExItemKindList.splice(index, 1);
                            }
                        });
                    });
            };
            //修改除外责任
            $scope.openExclusion = function (risk, selmol) {
            	debugger
                var arrOperation = {};
                arrOperation.oper = $scope.operation;
                arrOperation.selmol = selmol;
                arrOperation.section=[];
            	var getMsgC = $scope.contract.fhSectionList;
            	if(arrOperation.section.length>0){
            		arrOperation.section.splice(0,arrOperation.section.length)
            	}
            	for(var i in getMsgC){
            		if(getMsgC[i].fhExItemKindList){
            			if(getMsgC[i].sectionNo==selmol){
            				if(getMsgC[i].fhExItemKindList.length>0){
                    			for(var t in getMsgC[i].fhExItemKindList){
                    					arrOperation.section.push(getMsgC[i].fhExItemKindList[t])
                    			}
                    		}
            			}
            			
            		}
            	}
                
                $modal.open({
                    templateUrl: '/reins/page/templates/contract/editor/contract.exclusion.tpl.html',
                    controller: 'exclusionCtrl',
                    windowClass: 'modal-big',
                    resolve: {
                        contAttr: function () {
                            return $scope.contAttr;    //操作类型
                        },
                        risk: function () {       //要添加除外责任的适用险种
                            return risk;
                        },
                        operation: function () {
                            return arrOperation;
                        },
                        effected: function () {
                            return $scope.effected;
                        }
                    }
                }).result.then(function (data) {
                    if (angular.isDefined(data) && data != []) {
                        risk = data;
                        console.log(data);
                    }
                });
            };
            //查询字典
            var searchFlag = true;
            $scope.searchList = [];
            $scope.getCode = function (keywords, user, searcher) {
                var temp = angular.copy({keywords: keywords, searcher: searcher});
                $scope.searchList.push(temp);
                if (searchFlag && $scope.searchList.length > 0) {
                    ralSearch(user);
                }
            };
            var ralSearch = function (user) {
                if (searchFlag && $scope.searchList.length > 0) {
                    searchFlag = false;
                    $scope.getCodes($scope.searchList[0].keywords, user).then(
                        function (data) {
                            $scope[$scope.searchList[0].searcher] = data;
                            searchFlag = true;
                            $scope.searchList.splice(0, 1);
                            ralSearch();
                        },
                        function (code) {
                            console.log("error  " + code);
                            searchFlag = true;
                            if (angular.equals(code, "bussy")) {
                                $scope.searchList.push($scope.searchList[0]);
                                $scope.searchList.splice(0, 1);
                            } else {
                                $scope[$scope.searchList[0].searcher] = [];
                                $scope.searchList.splice(0, 1);
                            }
                            ralSearch();
                        }
                    );
                }
            };
            //查询适用险种的二级列表
            $scope.searchRiskCode = function (id) {

                $scope.keywords.id = $scope.classCode;
                var key = angular.copy($scope.keywords);
                key.id = "riskCodeByClass";
                key.value = id;
                $scope.getCode(key, {}, "riskCodes");


            };

            $scope.searchVat = function (section) {
                if (section.vatFlag === "1") {
                    section.taxRate = 6;
                    section.addVatRate = 12;
                } else {
                    section.taxRate = 0;
                    section.addVatRate = 0;
                }
            }
            //控制适用险种二级下拉菜单默认选中第一项
            $scope.$watch("riskCodes", function () {
                if (angular.isDefined($scope.riskCodes) && $scope.riskCodes.length > 0) {
                    $scope.risk.riskCode = $scope.riskCodes[0].id;
                }
            });

            //更改地震险种表
            var changeEarthQuake = function (section) {
                var searchFlag1 = true;
                if (section.fhRiskList.length === 0) {
                    section.insrncCde = "";
                    section.riComCdes = [];

                } else {
                    $.each(section.fhRiskList, function (index, r) {
                        if (r.insrncCde === section.insrncCde) {
                            searchFlag1 = false;
                        }
                    });

                    if (searchFlag1) {
                        section.insrncCde = section.fhRiskList[0].insrncCde;
                        $scope.searchEarthQuake(section);
                    }
                }
            };
            //查询地震险别
            $scope.searchEarthQuake = function (section) {
                var key = angular.copy($scope.keywords);
                key.id = "rdrCodeByRisk";
                key.value = section.insrncCde;
                $scope.getCode(key, {}, "earthQuake_riComCde");
                var watchEarth = $scope.$watch("earthQuake_riComCde", function () {
                    if (angular.isDefined($scope.earthQuake_riComCde) && $scope.earthQuake_riComCde != null) {
                        /*console.log(key)
	                        		console.log($scope.earthQuake_riComCde);*/
                        $.each($scope.contract.fhSectionList, function (index, sec) {
                            if (sec === section) {
                                sec.riComCdes = angular.copy($scope.earthQuake_riComCde);
                                if (sec.riComCdes.length > 0)
                                    sec.riComCde = sec.riComCdes[0].id;
                                else
                                    sec.riComCde = "";
                                $scope.earthQuake_riComCde = null;
                            }
                        });
                        watchEarth();
                    }
                });

            };
            //增加适用险种
            $scope.addRiskType = function (section, riskCode) {
                if ($scope.contAttr === "prop") {
                    var breakFlag = false;
                    var other = false;
                    $.each($scope.contract.fhSectionList, function (index, s) {
                        $.each(s.fhRiskList, function (index0, r0) {
                            if (r0.riskCode === riskCode) {
                                breakFlag = true;
                                if (section != s) {
                                    other = true;
                                }
                                return false;
                            }
                        });
                        if (breakFlag) {
                            return false;
                        }
                    });
                    if (breakFlag) {
                        if (other) {
                            alert("该险种在其他分项中已存在！");
                        } else {
                            alert("该险种已存在！");
                        }
                        return false;
                    }
                    var temp = angular.copy(contractService.getElement("propRisk"));
                    temp.riskCode = riskCode;
//                            temp.deletable = true;
                    $.each($scope.riskCodes, function (index, r) {
                        if (r.id === riskCode) {
                            temp.riskName = r.value;
                        }
                    });
                    section.fhRiskList.push(temp);
                    changeEarthQuake(section);

                }
            };

            //增加适用险种
            $scope.addfhxRiskType = function (layer, riskCode) {
                if ($scope.contAttr === "nprop") {
                    var breakFlag = false;
                    var other = false;

                    $.each($scope.contract.fhxLayerList, function (inde, s) {
                        $.each(s.fhxRiskList, function (index0, r0) {

                            if (r0.riskCode === riskCode) {
                                breakFlag = true;

                                if (s != layer) {
                                    other = true;
                                }
                                return false;
                            }
                        });
                        if (breakFlag) {
                            return false;
                        }
                    });
                    if (breakFlag) {
                        if (other) {
                            alert("该险种在其他分项中已存在！");
                        } else {
                            alert("该险种已存在！");
                        }
                        return false;
                    }
                    var risk = angular.copy(contractService.getElement("npropRisk"));

                    risk.riskCode = riskCode;
                    risk.deletable = true;
                    $.each($scope.riskCodes, function (index, r) {
                        if (r.id === riskCode) {
                            risk.riskName = r.value;
                        }
                    });

                    layer.fhxRiskList.push(risk);
                }
            };

            //切换编辑器模式
            $scope.toggleMode = function (_mode) {
                $scope.operation = _mode;
                $scope.treatyNo = $scope.mode;
                $location.path("/contracts/" + $scope.contAttr + "/" + $scope.treatyNo + "/admin" +"/"+ _mode);
            };

            //关闭窗口提示信息修改
            $scope.closeContract = function (contAttr, mode, operation, formIsDirty) {
                console.log($stateParams.mode);
                if (formIsDirty) {
                    if (confirm('页面有些项未保存，确定要关闭吗？')) {
                        var url = "";
                        if (contAttr === 'prop') {
                            if (mode === 'admin' ||
                                (mode === '0' &&
                                    (operation === 'new')) ||
                                (mode === '1' &&
                                    (operation === 'new')) ||
                                (mode === '2' &&
                                    (operation === 'new'))) {
                                url = "contracts/prop/admin";
                            } else if ($stateParams.kindof === 'admin') {
                                url = "contracts/prop/admin";
                            } else {
                                console.log("!prop,admin,0,1,2");
                                url = "contracts/prop/" + mode;
                            }
                        }
                        if (contAttr === 'nprop') {
                            if (mode === 'admin' ||
                                (mode === '0' &&
                                    (operation === 'new')) ||
                                (mode === '1' &&
                                    (operation === 'new'))) {
                                url = "contracts/nprop/admin";
                            } else if ($stateParams.kindof === 'admin') {
                                url = "contracts/nprop/admin";
                            } else {
                                console.log("!nprop,admin,0,1");
                                url = "contracts/nprop/admin"; //+ mode;
                            }
                        }
                        //$scope.showSearchList();
                        $scope.searchTableFlag = true;
                        $location.path(url);
                    }
                } else {
                    var url = "";
                    if (contAttr === 'prop') {
                        if (mode === 'admin' ||
                            (mode === '0' &&
                                (operation === 'new')) ||
                            (mode === '1' &&
                                (operation === 'new')) ||
                            (mode === '2' &&
                                (operation === 'new'))) {
                            url = "contracts/prop/admin";
                        } else if ($stateParams.kindof === 'admin') {
                            url = "contracts/prop/admin";
                        } else {
                            console.log("!prop,admin,0,1,2");
                            url = "contracts/prop/1";//合同分出账务写死路径
                            // url = "contracts/prop/admin";// + mode;
                        }
                    }
                    if (contAttr === 'nprop') {
                        if (mode === 'admin' ||
                            (mode === '0' &&
                                (operation === 'new')) ||
                            (mode === '1' &&
                                (operation === 'new'))) {
                            url = "contracts/nprop/admin";
                        } else if ($stateParams.kindof === 'admin') {
                            url = "contracts/nprop/admin";
                        } else {
                            console.log("!nprop,admin,0,1");
                            url = "contracts/prop/1";
                            //url = "contracts/nprop/admin"; //+ mode;
                        }
                    }
                    // $scope.showSearchList();
                    $location.path(url);
                }
                /*if(formIsDirty)
                         if (!confirm('页面有些项未保存，确定要关闭吗？'))
                         return false;

                         var url = mode==='admin'? 'admin/contracts/' + contAttr + '/admin': 'contracts/' + contAttr + '/' + mode;

                         $location.path(url);*/
            };

            //增加分项
            //增加分项
            $scope.addSection = function (section) {
                $scope.count = $scope.count + '1';
                if ($scope.contAttr === "prop") {

                    var _section = angular.copy(contractService.getElement("propSection"));
                    _section.sectionNo = getSectionName();
                    _section.isActive = true;
                    _section.treatyNo = $scope.contract.treatyNo;
                    _section.fhSectionReinsList=angular.copy(section.fhSectionReinsList)
                    console.log(_section)
                    var _fhSectionReinsList = angular.copy(_section);
//                             _section.fhSectionReinsList = _fhSectionReinsList
                    $scope.contract.fhSectionList.push(_section);

                }


                /*if($scope.contAttr === "nprop"){
                            var _section =angular.copy(contractService.getElement("npropSection"));

                            _section.sectionNo = getLayerName();
                            _section.isActive = true;
                            _section.currency = $scope.contract.currency;
                            _section.fhxLayerList[0].currency = _section.currency;

                            //_section.id.tmpTreatyNo = $scope.contract.tmpTreatyNo;
                            _section.treatyNo = $scope.contract.treatyNo;
                            $scope.contract.fhxSectionList.push(_section);

                        }*/
            };

            //增加层
            $scope.addLayer = function () {
                $scope.count = $scope.count + '1';
                var _layer = angular.copy(contractService.getElement("npropLayer"));
                //slh 解决复制分项出现的“分期”信息冗余
                _layer.fhxPlanList.length = 0;
                //slh
                _layer.layerNo = getLayerName();
                _layer.isActive = true;
                _layer.currency = $scope.contract.currency;
                console.log($scope.contract.fhxLayerList[0])
                $scope.contract.fhxLayerList[0].currency = _layer.currency;
//                        $scope.contract.fhxLayerList[0].currency = _layer.currency;
                _layer.treatyNo = $scope.contract.treatyNo;
                $scope.contract.fhxLayerList.push(_layer);
            };
            //复制层

            $scope.copyLayer = function (getLayerName, layer) {

                var _layer = angular.copy(layer);


                _layer.layerNo = layer.layerNo + "_copy";
                $scope.contract.fhxLayerList.push(_layer);
            }

            //复制分项
            $scope.copySection = function (section) {

                $scope.count = $scope.count + '1';
                if ($scope.contAttr === "nprop") {
                    var _section = angular.copy(section);
                    console.log(section)
                    _section.sectNo = section.sectionNo + "_copy";
                    _section.sectionNo = section.sectionNo + "_copy";
                    _section.fhxRiskList = [];
                    _section.isActive = true;
                    if (angular.isDefined($scope.contract.fhxSectionList) && $scope.contract.fhxSectionList.length > 0) {
                        $.each($scope.contract.fhxSectionList, function (index, sectionList) {
                            sectionList.isActive = false;
                        });
                    }
                    $scope.contract.fhxSectionList.push(_section);
                } else {
                    var _section = angular.copy(section);
                    console.log(section)
                    _section.sectionNo = section.sectionNo + "_copy";
                    _section.fhRiskList = [];
//                            _section.contOutInssectEqDtls = [];
//                            _section.eqsectNo = "";
//                            _section.eqCommRate = "";
                    _section.isActive = true;
                    if (angular.isDefined($scope.contract.fhSectionList) && $scope.contract.fhSectionList.length > 0) {
                        $.each($scope.contract.fhSectionList, function (index, sectionList) {
                            sectionList.isActive = false;
                        });
                    }
                    $scope.contract.fhSectionList.push(_section);
                }
            };


            //删除分项
            $scope.removeSection = function ($section) {
                if ($section.sectionNo === "a") {
                    alert("不予许删除分项a");
                    return
                }

                if ($scope.contAttr === "prop") {
                    if (confirm('删除分项' + $section.sectionNo + "吗？")) {
                        $.each($scope.contract.fhSectionList, function (index, section) {
                            if ($section === section) {
                                $scope.contract.fhSectionList.splice(index, 1);
                                $scope.$emit('notification', {message: '分项已删除', type: 'success'});
                            }
                        });
                    }
                } else if ($scope.contAttr === "nprop") {

                    if (confirm('删除分项' + $section.sectionNo + "吗？")) {
                        $.each($scope.contract.fhxSectionList, function (index, section) {
                            if ($section === section) {
                                $scope.contract.fhxSectionList.splice(index, 1);
                                alert("删除成功！");
                            }

                        });
                    }
                }
            };

            //增加高价车 ylm 2015/09/22
            $scope.addExpenCar = function ($section) {
                var _adExpenCar = angular.copy(contractService.getElement("propExpenCar"));
                _adExpenCar.sectNo = $section.sectNo;//分项号自动带出
                $section.contOutExpensiveCars.push(_adExpenCar);
            };

            //删除高价车 ylm 2015/09/22
            $scope.removeExpenCar = function ($section, $expenCar) {
                if (confirm("删除高价车" + $expenCar.sectNo + "吗？")) {
                    $.each($section.contOutExpensiveCars, function (index, expenCar) {
                        if ($expenCar === expenCar) {
                            $section.contOutExpensiveCars.splice(index, 1);
                            alert("删除成功！");
                        }
                    });
                }
            };

            //增加浮动率
            $scope.addAdjustrate = function ($section) {
                var _adjustrate = angular.copy(contractService.getElement("propAdjustrate"));
                $section.fhCommRateList.push(_adjustrate);
            };

            //删除浮动率
            $scope.removeAdjustrate = function ($section, $adjustRate) {
                if (confirm("删除浮动率" + $adjustRate.sectionNo + "吗？")) {
                    $.each($section.fhCommRateList, function (index, adjustRate) {
                        if ($adjustRate === adjustRate) {
                            $section.fhCommRateList.splice(index, 1);
                            alert("删除成功！");
                        }
                    });
                }
            };


            //删除层


            $scope.removeLayer = function ($contract, $layer) {
                console.log($contract);
                console.log($layer);

                if (confirm('删除层' + $layer.layerNo + "吗？")) {
                    $.each($contract.fhxLayerList, function (index, layer) {
                        if ($layer === layer) {

                            $contract.fhxLayerList.splice(index, 1);
                        }
                    });
                }
            };

            //经济人转换
            $scope.toggleBrokerFlag = function (recepter) {
                $timeout(function () {
                    if ($scope.contAttr === "nprop" && (recepter.brokerFlag === "false")
                        && angular.isDefined(recepter.fhxFinalReinsList) && recepter.fhxFinalReinsList.length > 0) {
                        if (confirm("该操作将删除该接受人名下的所有最终接受人！！")) {
                            recepter.fhxFinalReinsList = [];
                            recepter.warning = false;
                        } else {
                            recepter.brokerFlag = "true";
                        }
                    } else if ($scope.contAttr === "prop" && (recepter.brokerFlag === "false")
                        && angular.isDefined(recepter.fhFinalReinsList) && recepter.fhFinalReinsList.length > 0) {
                        if (confirm("该操作将删除该接受人名下的所有最终接受人！！")) {
                            recepter.fhFinalReinsList = [];
                            recepter.warning = false;
                        } else {
                            recepter.brokerFlag = "true";
                        }
                    }
                }, 10);
            };
            //查询时需要返回值 --接受人、最终接受人、续转合同代码查询
            $scope.getByReturn = function (aim, condition) {
                var temp = aim + "";
                var keywords = {"id": aim, "value": condition, "holdFlag": false};
                return $scope.getCodes(keywords, {}).then(
                    function (data) {
                        console.log(data);
                        return data;
                    },
                    function (code) {
                        return [];
                    }
                );
            };
            //增加接收人(非比例)
            $scope.addRecepterNprop = function ($layer) {
                var _recepter = angular.copy(contractService.getElement("npropRecepter"));

                $layer.fhxReinsList.push(_recepter);
            };
            //增加机构(非比例)
            $scope.addCompanyNprop = function ($layer) {
                var _recepter = angular.copy(contractService.getElement("npropCompany"));

                $layer.fhxCompanyList.push(_recepter);
            };
            //增加机构(比例)
            $scope.addCompanyprop = function ($contract) {
                var _recepter = angular.copy(contractService.getElement("propCompany"));
                console.log(_recepter)
                $contract.fhReinsList.push(_recepter);
            };
            //删除接收人（非比例）

            $scope.removeRecepterNprop = function ($layer, $layer, $rein) {
                if (confirm('删除接收人' + $rein.reinsCode + "吗？")) {
                    $.each($scope.contract.fhxLayerList, function (index, layer) {
                        if ($layer === layer) {
                            $.each($layer.fhxReinsList, function (index, rein) {
                                if ($rein === rein) {
                                    $layer.fhxReinsList.splice(index, 1);
                                }
                            });
                        }
                    });
                }
            };
            $scope.removeCompanyNprop = function ($layer, $layer, $company) {
                if (confirm('删除机构' + $company.comCode + "吗？")) {
                    $.each($scope.contract.fhxLayerList, function (index, layer) {
                        if ($layer === layer) {
                            $.each($layer.fhxCompanyList, function (index, company) {
                                if ($company === company) {
                                    $layer.fhxCompanyList.splice(index, 1);
                                }
                            });
                        }
                    });
                }
            };

            //添加最终接收人 (非比例)
            $scope.addFinalRecepterNprop = function ($rein) {
                var _finalRecepter = angular.copy(contractService.getElement("npropFinalRecepter"));

                _finalRecepter.layerNo = $rein.layerNo;
                $rein.fhxFinalReinsList.push(angular.copy(_finalRecepter));
                $scope.checkRecepterDetail($rein);
            };

            //删除最终接收人 (非比例)

            $scope.removeFinalRecepterNprop = function ($layer, $layer, $rein, $final) {
                if (confirm('删除最终接收人' + $final.reinsCode + "吗？")) {
                    $.each($layer.fhxReinsList, function (index, rein) {
                        if ($rein === rein) {
                            $.each($rein.fhxFinalReinsList, function (index, final) {
                                if ($final === final) {
                                    $rein.fhxFinalReinsList.splice(index, 1);
                                }
                            });
                        }
                    });
                }

            };

            //增加接收人（比例）
            $scope.addRecepterProp = function (contract) {
                var _recepter = angular.copy(contractService.getElement("propRecepter"));
                _recepter.tmpContNo = contract.tmpContNo;
                contract.fhReinsList.push(angular.copy(_recepter));
                $scope.addRecepterProps(contract);
            };
            $scope.addRecepterProps = function (contract) {
                //增加接收人（比例）
                var _recepter = {//接受人
                    "reinsCode": "",//接受人编码
                    "shareRate": "",//所占份额
                    "commRate": ""
                };
                for (var index = 0; index < contract.fhSectionList.length; index++) {
                    contract.fhSectionList[index].fhSectionReinsList.push(_recepter);
                }
                ;
            };
            //删除接收人（比例）
            $scope.removeRecepterProp = function (recepterList, $recepter) {
                if (confirm('删除接收人' + $recepter.reinsCode + "吗？")) {
                	debugger
                	console.log($scope.contract.fhSectionList)
                	for(var i in $scope.contract.fhSectionList[0].fhSectionReinsList){
                        if($scope.contract.fhSectionList[0].fhSectionReinsList[i].reinsCode == $recepter.reinsCode){
	                        console.log($scope.contract.fhSectionList[0].fhSectionReinsList[i]);
	                        $scope.contract.fhSectionList[0].fhSectionReinsList.splice(i,1)
	                        }     
	                  }
                	$.each(recepterList, function (index, recepter) {
                        if ($recepter === recepter) {
                            recepterList.splice(index, 1);
                            for(var i in $scope.contract.fhSectionList[0].fhSectionReinsList){
                                if($scope.contract.fhSectionList[0].fhSectionReinsList[i].reinsCode == $recepter.reinsCode){
        	                        console.log($scope.contract.fhSectionList[0].fhSectionReinsList[i]);
        	                        $scope.contract.fhSectionList[0].fhSectionReinsList.splice(i,1)
        	                        }     
        	                  };
                        }
                    });
                   /* $.each(recepterList, function (index, recepter) {
                        if ($recepter === recepter) {
                            recepterList.splice(index, 1);
                            for (var indexs = 0; indexs < $scope.contract.fhSectionList.length; indexs++) {
                            	
                                $scope.contract.fhSectionList[indexs].fhSectionReinsList.splice(index, 1);
                            }
                            ;
                        }
                    });*/
                }
            };

            //添加最终接收人 (比例)
            $scope.addFinalRecepterProp = function (recepter) {
                var _finalrecepter = angular.copy(contractService.getElement("propFinalRecepter"));

                if (!recepter.fhFinalReinsList) {
                    recepter.fhFinalReinsList = [];

                }
                recepter.fhFinalReinsList.push(_finalrecepter);

                $scope.checkRecepterDetail(recepter);
            };

            //删除最终接收人 (比例)
            $scope.removeFinalRecepterProp = function ($recepter, $final) {
                if (confirm('删除最终接收人' + $final.freinsCode + "吗？")) {
                    $.each($recepter, function (index, final) {
                        if ($final === final) {
                            $recepter.splice(index, 1);
                        }
                    });
                }
            };

            //刪除經紀人
            $scope.deleteReinsList = function (index) {
                $scope.contract.fhReinsList.splice(index, 1);
            };
            //刪除經紀人
            $scope.deletenReinsList = function (index,$layer) {
                console.log($layer)
                $layer.fhxCompanyList.splice(index, 1);
            };
            //	删除合同
            $scope.deleteContract = function () {
                var contractNo = $scope.contAttr === "nprop" ? $scope.contract.treatyNo : $scope.contract.treatyNo;
                var stateFlag = $scope.contAttr === "nprop" ? $scope.contract.stateFlag : $scope.contract.stateFlag;
                if (stateFlag != "0") {
                    alert("此合同不是暂存状态，无法删除！");
                    return false;
                }
                if (confirm("确定要删除暂存编号为" + contractNo + "的合同吗？")) {
                    $scope.showBusy(true);
                    var list = [];
                    list.push(contractNo);
                    contractService.deleteContracts($scope.contAttr, list, {}).then(
                        function (data) {
                            $scope.showBusy(false);
                            if (data.result === "success") {
                                alert("删除成功!");
                                var url = "/contracts/" + $scope.contAttr + "/admin";
                                $location.path(url);
                            } else
                                alert("删除失败!");
                            console.log(data);
                        },
                        function (code) {
                            $scope.showBusy(false);
                            //处理失败后操作
                            alert("删除失败!");
                        }
                    );
                }
            };
            //复制合同
            $scope.copyContract = function () {
                var contractNo = $scope.contAttr === "nprop" ? $scope.contract.treatyNo : $scope.contract.treatyNo;
                if (confirm("确定要复制编号为 \"" + contractNo + "\" 的合同吗？")) {
                    $scope.showBusy(true);
                    var list = [];
                    list.push(contractNo);
                    contractService.copyContracts($scope.contAttr, list, {}).then(
                        function (data) {
                            $scope.showBusy(false);
                            if (data.result === "success") {//非比例返回的续转合同结果
                                alert("复制成功!合同暂存编号为：" + data.msg);
                                $location.path("/contracts/" + $scope.contAttr + "/admin");
                            } else
                                alert("复制失败");
                            console.log(data);
                        },
                        function (code) {
                            $scope.showBusy(false);
                            //处理失败后操作
                            alert("复制失败");
                        }
                    );
                }
            };
            //续转合同
            $scope.renContract = function () {
                var contractNo = $scope.contAttr === "nprop" ? $scope.contract.treatyNo : $scope.contract.treatyNo;
                if (confirm("确定要续转 编号为" + contractNo + "的合同吗?")) {
                    $scope.showBusy(true);
                    var list = [];
                    list.push(contractNo);
                    contractService.transferContracts($scope.contAttr, list, {}).then(
                        function (data) {
                            $scope.showBusy(false);
                            if (angular.isDefined(data.msg)) {//非比例返回的续转合同结果
                                alert("续转成功!续转合同暂存编号：" + data.msg);
                                $location.path("/contracts/" + $scope.contAttr + "/admin");
//                           			  	$location.path("/contracts/"+ $scope.contAttr +"/"+ data.msg[contractNo] +"/view");
                            } else
                                alert("续转成功!");
                            $location.path("/contracts/" + $scope.contAttr + "/admin");
                            console.log(data);
                        },
                        function (code) {
                            $scope.showBusy(false);
                            //处理失败后操作
                            alert("续传失败!");
                        }
                    );
                }
            };

            //保存(新增，编辑)
            $scope.saveContract = function () {
                if ($scope.contAttr === "prop") {
                	var optType = $scope.contract.optType;
                	if(optType==="undefined"){
                		 alert("业务类型还没有填！！");
                         return false;
                	}
                    var start = Date.parse($scope.contract.stardate);
                    var end = Date.parse($scope.contract.end);
                    if (isNaN(start)) {
                        alert("合同起期还没有填！！");
                        return false;
                    }
                    if (isNaN(end)) {
                        alert("合同止期还没有填！！");
                        return false;
                    }
                    if (start > end) {
                        alert("合同止期不能早于合同起期！！");
                        return false;
                    }
                    var year = $scope.contract.uwYear;
                    var reg = /^\d{4}$/;
                    if (!reg.test(year)) {
                        alert("请输入4位的“业务年度”！！");
                        return false;
                    }
                   } else {
                    var start = Date.parse($scope.contract.start);
                    var end = Date.parse($scope.contract.end);
                    if (isNaN(start)) {
                        alert("合同起期还没有填！！");
                        return false;
                    }
                    if (isNaN(end)) {
                        alert("合同止期还没有填！！");
                        return false;
                    }
                    if (start > end) {
                        alert("合同止期不能早于合同起期！！");
                        return false;
                    }
                    
                    var year = $scope.contract.uwYear;
                    var reg = /^\d{4}$/;
                    if (!reg.test(year)) {
                        alert("请输入4位的“业务年度！！");
                        return false;
                    } 
                    //add by zhx begin
                    for(var i=0;i<$scope.contract.fhxLayerList.length;i++){
                        var layerNo=$scope.contract.fhxLayerList[i].layerNo;   
                         if (isNaN(layerNo)) {
		                     alert("分项号应该为数字,且不能重复！！");
		                     return false;
                         }  
                    }
                  //add by zhx end
                }
                if (!checkRefNo()) {//检查合同简称
                    $scope.showBusy(false);
                    return false;
                } else if (!checkTreatyType()) { //检查合同合同类型是否为空
                    $scope.showBusy(false);
                    return false;
                } else if (!checkCurrencyF()) {// 检查非比例主项合同币别是否为空
                    $scope.showBusy(false);
                    return false;
                } else if (!checkGroupRisk()) { //检查适用险种
                    $scope.showBusy(false);
                    return false;
                } else if (!checkGroupRcepter()) {  //检查接受人
                    $scope.showBusy(false);
                    return false;
                } else if (!checkLine()) {//检查溢额合约线数是否为空
                    $scope.showBusy(false);
                    return false;
                } else if (!checkSectionNo()) {// 检查比例合同分项合同编号是否为空
                    $scope.showBusy(false);
                    return false;
                } else if (!checkSectionCDesc()) {// 检查比例合同分项中文描述是否为空
                    $scope.showBusy(false);
                    return false;
                } else if (!checkSectionEDesc()) {// 检查比例合同分项英文描述是否为空
                    $scope.showBusy(false);
                    return false;
                } else if (!checkCurrency()) {// 检查比例合同分项币别是否为空
                    $scope.showBusy(false);
                    return false;
                } else if (!checkReinsureRate()) {// 检查比例合同分项分出比例是否为空
                    $scope.showBusy(false);
                    return false;
                } else if (!checkLimitValue()) {// 检查比例合同分项合同限额是否为空
                    $scope.showBusy(false);
                    return false;
                } else if (!checkRetentionValue()) {// 检查比例合同分项合同自留额是否为空
                    $scope.showBusy(false);
                    return false;
                } else if (!checkCleanYear()) {//检查结清年限
                    $scope.showBusy(false);
                    return false;
                } else if (!checkShareholderRate()) {// 检查比例合同分项业务比例是否为空
                    $scope.showBusy(false);
                    return false;
                } else if (!checkShareholderMainCoinsRate()) {// 检查比例合同分项主共业务比例是否为空
                    $scope.showBusy(false);
                    return false;
                } else if (!checkShareholdersubCoinsRate()) {// 检查比例合同分项从共业务比例是否为空
                    $scope.showBusy(false);
                    return false;
                } else if (!checkCommRate()) {// 检查比例合同分项固定手续费是否为空
                    $scope.showBusy(false);
                    return false;
                } else if (!checkPcMinRate()) {// 检查比例合同分项纯益手续费比例是否为空
                    $scope.showBusy(false);
                    return false;
                } else if (!checkExpenseRate()) {// 检查比例合同分项接受人管理费用比例是否为空
                    $scope.showBusy(false);
                    return false;
                } else if (!checkPcStartMths()) {// 检查比例合同分项起算日期是否为空
                    $scope.showBusy(false);
                    return false;
                } else if (!checkCarriedYrs()) {// 检查比例合同分项亏损滚转周期是否为空
                    $scope.showBusy(false);
                    return false;
                } else if (!checkExcessLoss()) {//检查非比例的层赔起点
                    $scope.showBusy(false);
                    return false;
                } else if (!checkLayerquota()) {//检查非比例的赔偿限额
                    $scope.showBusy(false);
                    return false;
                } else if (!checkEgnpi()) {//检查非比例的层预估净自留保费
                    $scope.showBusy(false);
                    return false;
                } else if (!checkRate()) {//检查非比例的层费率
                    $scope.showBusy(false);
                    return false;
                } else if (!checkMdpRate()) {//检查非比例的预付比例
                    $scope.showBusy(false);
                    return false;
                } else if (!checkROL()) {//检查非比例的ROL
                    $scope.showBusy(false);
                    return false;
                } else if (!checkReinstTimes()) {//检查非比例的责任恢复次数
                    $scope.showBusy(false);
                    return false;
                } else if (!checkReinsRate()) {//检查非比例的恢复比例信息
                    $scope.showBusy(false);
                    return false;
                } else if (!checkCompany()) {//检查非比例的机构信息
                    $scope.showBusy(false);
                    return false;
                } else if (!checkPayTimes()) {//检查非比例的期次信息
                    $scope.showBusy(false);
                    return false;
                }
                //	console.log("save or update contract ");
                //	console.log($scope.contract);
                //	return false;             //---------------------------------------------------------------------------------------------------------
                $scope.showBusy(true);
                if ($scope.operation === 'new') {
                    contractService.createContract($scope.contAttr, $scope.contract, {}).then(
                        function (data) {
                            $scope.showBusy(false);
                            console.log($scope.contract);
                            if (data.result === "success") {
                                alert("保存成功！编号为：" + data.msg);
                                $scope.operation = "view";

//                                        $location.path("/contracts/"+ $scope.contAttr +"/"+ data.msg +"/view");
                                $location.path("/contracts/" + $scope.contAttr + "/admin");
                            } else {
                                alert("保存失败！");
                            }
                        },
                        function (code) {
                            $scope.showBusy(false);
                            throw(code);
                            alert("保存失败！");
                        }
                    );
                } else {
                    contractService.updateContract($scope.contAttr, $scope.contract, {}).then(
                        function (data) {
                            $scope.showBusy(false);
                            console.log($scope.contract);
                            if (data.result === "success") {
                                alert("编辑成功！");
                                $scope.operation = "view";
                                //编辑，查看
                                if ($scope.operation === 'edit' || $scope.operation === 'view') {
                                    $scope.showBusy(true);
                                    //修改 by renshuai

                                    $scope.getContract($scope.contAttr, $scope.contract.treatyNo, {})
                                        .then(
                                            function (data) {
                                                if (angular.isDefined(data.result) && data.result === "error") {
                                                    alert(data.msg);
                                                    history.back(-1);
                                                } else {
                                                    $scope.contract = $scope.preDealWith(data);
                                                    console.log($scope.contract);
                                                }
                                                $scope.showBusy(false);
                                            },
                                            function () {
                                                $scope.showBusy(false);
                                                alert("链接错误！");
                                                history.back(-1);
                                            }
                                        );
                                }
                                ;
                                $location.path("/contracts/" + $scope.contAttr + "/admin");
                                //$location.path("/contracts/"+ $scope.contAttr +"/"+ data.msg +"/view");
                            } else {
                                alert("编辑失败！");
                            }
                        },
                        function (code) {
                            $scope.showBusy(false);
                            throw(code);
                            alert("编辑失败！");
                        }
                    );
                }

            };
            /*  var illeagal ={
                    		recepter : false
                    	};*/
            //检查增值税，城建税，教育费附加税比例
            var checkVCERate = function () {
                var passFlag = true;
                var vat = "";
                var city = "";
                var education = "";
                if ($scope.contAttr === "prop") {
//                            $.each($scope.contract.fhSectionList,function(index, temp){
//                                if(temp.freeTaxFlag == 1){
//                                	if(temp.vatRate === 0.00){
//                                		passFlag = false;
//                                		vat = "  增值税比例(%)\n";
//                                	}
//                                	if(temp.cityTaxRate === 0.00){
//                                		passFlag = false;
//                                		city = "  城建税比例(%)\n";
//                                	}
//                                	if(temp.educationTaxRate === 0.00){
//                                		passFlag = false;
//                                		education = "  教育费附加税比例(%)\n";
//                                	}
//                                	if(passFlag == false){
//                                		  var r=confirm("请确认是否要将\n"+vat+city+education+"设置为 0")
//                                		  if (r==true){
//                                			passFlag = true;
//                                		  }else{
//                                		    return false;
//                                		  }
//                                	}
//                                }else{
//                                	if(temp.vatRate != 0.00){
//                                		passFlag = false;
//                                		vat = "增值税比例(%)应为0.00\n";
//                                	}
//                                	if(temp.cityTaxRate != 0.00){
//                                		passFlag = false;
//                                		city = "城建税比例(%)应为0.00\n";
//                                	}
//                                	if(temp.educationTaxRate != 0.00){
//                                		passFlag = false;
//                                		education = "教育费附加税比例(%)应为0.00";
//                                	}
//                                	if(passFlag == false){
//                                    	alert("选择免税时:\n"+vat+city+education);
//                                	}
//                                }
//                            })

                }
                return passFlag;
            }
            //全局检查合同简称是否已填
            var checkRefNo = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    if (!$scope.contract.refNo) {
                        passFlag = false;
                    }

                } else {
                    if (!$scope.contract.refNo) {
                        passFlag = false;
                    }
                }
                if (!passFlag) {
                    alert("请添加合同简称哦！");
                } else {
                    console.log("合同简称满足条件！！");
                }
                return passFlag;


            };
            //全局检查适用险种是否已填
            var checkGroupRisk = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        if (temp.fhRiskList.length === 0) {
                            passFlag = false;
                        }
                    });
                } else {
                    $.each($scope.contract.fhxLayerList, function (index, temp) {
                        if (temp.fhxRiskList.length === 0) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("您还没有选择适用险种哦！");
                } else {
                    console.log("适用险种满足条件！！");
                }
                return passFlag;


            };
            //全局检查合同类型是否已填
            var checkTreatyType = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    if ($scope.contract.treatyType === "U") {
                        passFlag = false;
                    }
                } else {
                    if (!($scope.contract.treatyType)) {
                        passFlag = false;
                    }
                }
                if (!passFlag) {
                    alert("请选择合同类型！");
                } else {
                    console.log("合同类型满足条件！！");
                }
                return passFlag;

            };
            //全局检查结清年限是否正确
            var checkCleanYear = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        if (temp.cleanYear > 50) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("结清年限不能>50");
                } else {
                    console.log("结清年限满足条件！！");
                }
                return passFlag;


            };
            //全局检查币别是否填加
            var checkCurrency = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        if (temp.currency === "01") {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("币别不能为空！");
                } else {
                    console.log("币别满足条件！！");
                }
                return passFlag;


            };
            //全局检查非比例层费率是否填加
            var checkRate = function () {
                var passFlag = true;
                if ($scope.contAttr === "nprop") {
                    $.each($scope.contract.fhxLayerList, function (index, temp) {
                        if (temp.rate === "0.000000") {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("层费率不能为空！");
                } else {
                    console.log("层费率满足条件！！");
                }
                return passFlag;
            };
            //全局检查非比例预付比例是否填加
            var checkMdpRate = function () {
                var passFlag = true;
                if ($scope.contAttr === "nprop") {
                    $.each($scope.contract.fhxLayerList, function (index, temp) {
                        if (temp.mdpRate === 0) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("预付比例不能为空！");
                } else {
                    console.log("预付比例满足条件！！");
                }
                return passFlag;
            };
            //全局检查非比例ROL是否填加
            var checkROL = function () {
                var passFlag = true;
                if ($scope.contAttr === "nprop") {
                    $.each($scope.contract.fhxLayerList, function (index, temp) {
                        if (temp.rol === 0) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("ROL不能为空！");
                } else {
                    console.log("ROL满足条件！！");
                }
                return passFlag;
            };
            //全局检查非比例机构信息是否填加
            var checkCompany = function () {
                var passFlag = true;
                if ($scope.contAttr === "nprop") {
                    $.each($scope.contract.fhxLayerList, function (index, temp) {
                        $.each(temp.fhxCompanyList, function (index1, temp1) {
                            if (!temp1.comCode) {
                                passFlag = false;
                            }
                        });
                    });
                }
                if (!passFlag) {
                    alert("请选择机构信息！");
                } else {
                    console.log("机构信息满足条件！！");
                }
                return passFlag;
            };
            //全局检查非比例责任比例是否已填
            var checkReinsRate = function () {
                var passFlag = true;

                if ($scope.contAttr === "nprop") {
                    $.each($scope.contract.fhxLayerList, function (index, temp) {
                        if (temp.fhXReinstTimesList.length === 0) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("请添加恢复比例！");
                } else {
                    console.log("恢复比例满足条件！！");
                }
                return passFlag;
            };
            //全局检查非比例期次是否填加
            var checkPayTimes = function () {
                var passFlag = true;
                if ($scope.contAttr === "nprop") {
                    $.each($scope.contract.fhxLayerList, function (index, temp) {
                        if (temp.fhxPlanList.length === 0) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("请添加期次信息！");
                } else {
                    console.log("期次信息满足条件！！");
                }
                return passFlag;
            };
            //全局检查溢额合约线数是否已填
            var checkLine = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop" && $scope.contract.treatyType === "21") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        var reg = /^[1-9]\d*$/;
                        if (!reg.test(temp.line)) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("线数输入有误！！");
                } else {
                    console.log("线数满足条件！！");
                }
                return passFlag;


            };
            //全局检查比例合同分项编号是否已填
            var checkSectionNo = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        if (!temp.sectionNo) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("请填写Section编号！");
                } else {
                    console.log("Section编号满足条件！！");
                }
                return passFlag;
            };
            //全局检查比例合同合同中文描述是否已填
            var checkSectionCDesc = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        if (!temp.sectionCDesc) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("请填写合同中文描述！");
                } else {
                    console.log("合同中文描述满足条件！！");
                }
                return passFlag;
            };
            //全局检查比例合同合同英文描述是否已填
            var checkSectionEDesc = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        if (!temp.sectionEDesc) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("请填写合同英文描述！");
                } else {
                    console.log("合同英文描述满足条件！！");
                }
                return passFlag;
            };
            //全局检查比例合同分项分出比例是否已填
            var checkReinsureRate = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        if (!temp.reinsureRate) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("请填写分出比例！");
                } else {
                    console.log("分出比例满足条件！！");
                }
                return passFlag;
            };
            //全局检查比例合同合同限额是否已填
            var checkLimitValue = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        //var reg = /^(?:0|[1-9]\d*)(?:\.\d*[1-9])?$/;
                    	var reg =/^([0-9])+(\.[0-9]+)?$/;
                        if (!reg.test(temp.limitValue)) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("合同限额输入有误！");
                } else {
                    console.log("合同限额满足条件！！");
                }
                return passFlag;
            };
            //全局检查比例合同自留额是否已填
            var checkRetentionValue = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        //var reg = /^(?:0|[1-9]\d*)(?:\.\d*[1-9])?$/;
                    	var reg =/^([0-9])+(\.[0-9]+)?$/;
                        if (!reg.test(temp.retentionValue)) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("合同自留额输入有误！");
                } else {
                    console.log("合同自留额满足条件！！");
                }
                return passFlag;
            };
            //全局检查比例合同业务比例是否已填
            var checkShareholderRate = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        if (!temp.shareholderRate) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("请填写业务比例！");
                } else {
                    console.log("业务比例满足条件！！");
                }
                return passFlag;
            };
            //全局检查比例合同主共业务比例是否已填
            var checkShareholderMainCoinsRate = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        if (!temp.shareholderMainCoinsRate) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("请填写主共业务比例！");
                } else {
                    console.log("主共业务比例满足条件！！");
                }
                return passFlag;
            };
            //全局检查比例合同从共业务比例是否已填
            var checkShareholdersubCoinsRate = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        if (!temp.shareholdersubCoinsRate) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("请填写从共业务比例！");
                } else {
                    console.log("从共业务比例满足条件！！");
                }
                return passFlag;
            };
            //全局检查比例合同固定手续费是否已填
            var checkCommRate = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        if (!temp.commRate) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("请填写固定手续费！");
                } else {
                    console.log("固定手续费满足条件！！");
                }
                return passFlag;
            };
            //全局检查比例合同纯益手续费比例是否已填
            var checkPcMinRate = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        if (!temp.pcMinRate) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("请填写纯益手续费比例！");
                } else {
                    console.log("纯益手续费比例满足条件！！");
                }
                return passFlag;
            };
            //全局检查比例合同接受人管理费用比例是否已填
            var checkExpenseRate = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        if (!temp.expenseRate) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("请填写接受人管理费用比例！");
                } else {
                    console.log("接受人管理费用比例满足条件！！");
                }
                return passFlag;
            };
            //全局检查比例合同起算日期是否已填
            var checkPcStartMths = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        var reg = /^[1-9]\d*$/;
                        if (!reg.test(temp.pcStartMths)) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("输入的“起算日期”有误！");
                } else {
                    console.log("起算日期满足条件！！");
                }
                return passFlag;
            };
            //全局检查比例合同亏损滚转周期是否已填
            var checkCarriedYrs = function () {
                var passFlag = true;

                if ($scope.contAttr === "prop") {
                    $.each($scope.contract.fhSectionList, function (index, temp) {
                        var reg = /^[1-9]\d*$/;
                        if (!reg.test(temp.carriedYrs)) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("输入的“亏损滚转周期”有误！");
                } else {
                    console.log("亏损滚转周期满足条件！！");
                }
                return passFlag;
            };
            //检查非比例的层赔起点
            var checkExcessLoss = function () {
                var passFlag = true;
                if ($scope.contAttr === "nprop") {
                    $.each($scope.contract.fhxLayerList, function (index, temp) {
                        //var reg = /^(?:0|[1-9]\d*)(?:\.\d*[1-9])?$/;
                    	var reg =/^([0-9])+(\.[0-9]+)?$/;
                        if (!reg.test(temp.excessLoss)) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("层赔起点输入有误！");
                } else {
                    console.log("层赔起点满足条件！！");
                }
                return passFlag;
            };
            //检查非比例的赔偿限额
            var checkLayerquota = function () {
                var passFlag = true;
                if ($scope.contAttr === "nprop") {
                    $.each($scope.contract.fhxLayerList, function (index, temp) {
                        //var reg = /^(?:0|[1-9]\d*)(?:\.\d*[1-9])?$/;
                    	var reg =/^([0-9])+(\.[0-9]+)?$/;
                        if (!reg.test(temp.layerquota)) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("赔偿限额输入有误！");
                } else {
                    console.log("赔偿限额满足条件！！");
                }
                return passFlag;
            };
            //检查非比例的层预估净自留保费
            var checkEgnpi = function () {
                var passFlag = true;
                if ($scope.contAttr === "nprop") {
                    $.each($scope.contract.fhxLayerList, function (index, temp) {
                       // var reg = /^(?:0|[1-9]\d*)(?:\.\d*[1-9])?$/;
                    	var reg =/^([0-9])+(\.[0-9]+)?$/;
                        if (!reg.test(temp.egnpi)) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("层预估净自留保费输入有误！");
                } else {
                    console.log("层预估净自留保费满足条件！！");
                }
                return passFlag;
            };
            //检查非比例的责任恢复次数
            var checkReinstTimes = function () {
                var passFlag = true;
                if ($scope.contAttr === "nprop") {
                    $.each($scope.contract.fhxLayerList, function (index, temp) {
                        var reg = /^[1-9]\d*$/;
                        if (!reg.test(temp.reinstTimes)) {
                            passFlag = false;
                        }
                    });
                }
                if (!passFlag) {
                    alert("责任恢复次数输入有误！");
                } else {
                    console.log("责任恢复次数满足条件！！");
                }
                return passFlag;
            };
            //检查非比例的币别是否为空
            var checkCurrencyF = function () {
                var passFlag = true;
                if ($scope.contAttr === "nprop") {
                    if ($scope.contract.currency === "01") {
                        passFlag = false;
                    }
                }
                if (!passFlag) {
                    alert("请选择币别！");
                } else {
                    console.log("币别满足条件！！");
                }
                return passFlag;
            };

            //检查接受人最终接受人是否合法
            var checkGroupRcepter = function () {
                var passFlag = true;
                var receiveRateFlag = true;  //接受人之和是否等于100
                var existFinal = true;  //存在最终接受人
                var existPri = true;     //是否存在接受人
                var bPriFinalRel = true;   //经纪人时最终接受人和接受人的关系
                var rPriFinalRel = true;   //再保人时最终接受人和接受人的关系
                var nReinCo = true;   //是否选择再保人
                var brokCo = true;  //比例合同 分入类型 经纪人
                var inReinsCo = true;//比例合同 分入类型 分出人
                var reinCo = true; //比例合同  分入类型 业务所属公司
                if ($scope.contAttr === 'nprop') {

                    var countRate = 0.0;

                    $.each($scope.contract.fhxLayerList, function (index, temp) {
                    	countRate = 0.0;
                        //slh
                        if (parseFloat(temp.layerNo) > 1) {
                            countRate = 0.0;
                        }
                        //slh
                        if (temp.fhxReinsList.length < 1) {
                            existPri = false;
                            passFlag = false;
                            return false;
                        } else {
                            $.each(temp.fhxReinsList, function (index3, rein) {
                            		
                                countRate += parseFloat(rein.shareRate);
                                if (rein.brokerFlag === "true" && rein.fhxFinalReinsList.length === 0) {
                                    existFinal = false;
                                    passFlag = false;
                                    return false;
                                }
                                //20140909 fxy edit
                                if (rein.brokerFlag === "true" || rein.brokerFlag === "1") {
                                    rein.brokerFlag = "1";
                                } else {
                                    rein.brokerFlag = "0";
                                }
                                //slh
                                if (rein.brokerFlag === "0" && rein.reinsCode === "" && rein.freinsCode === "") {
                                    nReinCo = false;
                                    passFlag = false;
                                }

                                //slh  再保人时
                                if (rein.brokerFlag === "0" && rein.reinsCode === rein.freinsCode && rein.reinsCode != "" && rein.freinsCode != "") {
                                    rPriFinalRel = true;
                                    passFlag = true;
                                } else if (rein.brokerFlag === "0" && rein.reinsCode != rein.freinsCode) {
                                    rPriFinalRel = false;
                                    passFlag = false;
                                }
                                //slh
                                //slh 经纪人时
                                if (rein.brokerFlag === "1" && rein.reinsCode != rein.freinsCode) {
                                    bPriFinalRel = true;
                                    passFlag = true;
                                } else if (rein.brokerFlag === "1" && rein.reinsCode === rein.freinsCode) {
                                    bPriFinalRel = false;
                                    passFlag = false;
                                }
                                //slh
                                if (rein.warning === true) {
                                    passFlag = false;
                                    return false;
                                }
                            });
                            $.each($scope.contract.fhxLayerList, function (index2, layer) {
                                if (countRate != layer.shareRate) {
                                    receiveRateFlag = false;
                                    passFlag = false;
                                    return false;
                                }
                            });

                        }
                    });

                } else {
                	if($scope.contract.optType==="00"){
                    var count = 0.0;
                    if ($scope.contract.fhReinsList < 1) {
                        existPri = false;
                        passFlag = false;
                    } else {
                        $.each($scope.contract.fhReinsList, function (index1, recepter) {
                        	
                            count += parseFloat(recepter.shareRate);
                            //add by slh 经纪人
                            if (recepter.brokerFlag === "true" && recepter.reinsCode === "") {
                                nReinCo = false;
                                passFlag = false;
                                return false;
                            }
                            if (recepter.brokerFlag === "true" && recepter.fhFinalReinsList.length === 0) {
                            	existFinal = false;
                                passFlag = false;
                            }
                            if (recepter.brokerFlag === "true" && recepter.fhFinalReinsList.length>0) {
                            var reinsCode = recepter.reinsCode;
                            $.each(recepter.fhFinalReinsList, function (index2, recepter2){
                            	if(reinsCode===recepter2.freinsCode){
                            		bPriFinalRel = false;
                            		passFlag = false;
                            	}
                            });
                            
                            // slh end
                        	}
                            //add by slh  再保人
                            if (recepter.brokerFlag === "false" && recepter.reinsCode === "") {
                                nReinCo = false;
                                passFlag = false;
                            }
                            //slh end
                            if (recepter.warning === true) {
                                passFlag = false;
                                return false;
                            }
                        });
                        //slh start
                        if (count != 100) {
                            receiveRateFlag = false;
                            passFlag = false;
                        }//slh end
//                        		if(count != 100){
//                        			passFlag = false;
//                        		}
                    }
                	}else{
                		if($scope.contract.brokerCode===""){
                			brokCo = false;
                			passFlag = false;
                		}
                		if($scope.contract.inReinsCode===""){
                			inReinsCo = false;
                			passFlag = false;
                		}
                		$.each($scope.contract.fhReinsList, function (index1, recepter) {
                		if(recepter.reinsCode===""){
                			reinCo = false;
                			passFlag = false;
                			return false;
                		}
                		});
                	}
                }
                if (!existPri) {
                    alert("请确定所有层中都有接受人！！");
                } else if (!existFinal) {
                    alert("请确认所有经纪人名下都有最终接受人！！");
                } else if (!nReinCo) {
                    alert("请选择再保人！！");
                } else if (!rPriFinalRel) {
                    alert("接收人和最终接受人不相等!!!");
                } else if (!bPriFinalRel) {
                    alert("接收人和最终接受人相等!!!");
                } else if (!brokCo) {
                    alert("请选择经纪人！！");
                }else if (!inReinsCo) {
                    alert("请选择分出人！！");
                }else if (!reinCo) {
                    alert("请选择业务所属公司！！");
                }else if (!receiveRateFlag) {
                    if ($scope.contAttr === 'prop') {
                        if ($scope.contract.optType != '01') {
                            alert("请确认所有接收人的份额之和为100！！");
                        }
                    } else {
                        alert("请确认分出份额为100！！" +
                            "所有接收人的再保份额之和为100！！");
                    }
                }else if (!passFlag) {
                    alert("请检查最终接受人的分配比例！！");
                }
                return passFlag;

            };
            //输入时检查接受人/最终接受人是否重复
            $scope.distinctReceiver = function (repeat, compare, distinct) {
                //return false; ///----------------------------------------------------------------------------------修改中！！！！！！！
                if ($scope.contAttr === "nprop") {
                    if (distinct === "recepter" && repeat.fhxReinsList.length > 1) {
                        $.each(repeat.fhxReinsList, function (index, r) {

                            if (r != compare && r.reinsCode === compare.reinsCode) {
                                alert("请不要重复添加接受人！");

                                compare.reinsCode = "";
                            }
                        });
                    } else if (distinct === "finalRecepter" && repeat.fhxReinsList.length > 1) {
                        $.each(repeat.fhxReinsList, function (index, r) {

                            if (r != compare && r.freinsCode === compare.freinsCode) {
                                alert("请不要重复添加最终接受人！");

                                compare.freinsCode = "";
                            }
                        });
                    }
                } else {
                    if (distinct === "recepter" && repeat.fhReinsList.length > 1) {
                        $.each(repeat.fhReinsList, function (index, r) {
                            if (r != compare && r.ricomCde === compare.ricomCde) {
                                alert("请不要重复添加接受人！");
                                compare.ricomCde = "";
                            }
                        });
                    } else if (distinct === "finalRecepter" && repeat.fhFinalReinsList.length > 1) {
                        $.each(repeat.fhFinalReinsList, function (index, f) {
                            if (f != compare && f.rifcomCde === compare.rifcomCde) {
                                alert("请不要重复添加最终接受人！");
                                compare.rifcomCde = "";
                            }
                        });
                    }
                }
            };
            //输入时检查高价车业务品质/保额区间是否重复 yanliming 2015/10/12
            $scope.distinctExpenCar = function (section, expenCar, distinct) {
                if ($scope.contAttr === "prop") {
                    if (distinct === "expenCar" && section.contOutExpensiveCars.length > 1) {
                        $.each(section.contOutExpensiveCars, function (index, r) {
                            if (r != expenCar && r.carCode === expenCar.carCode) {
                                alert("请不要重复添加业务品质/保额区间！");
                                expenCar.carCode = "";
                            }
                        });
                    }
                }
            };
            //输入时检查最终接收人的首席是否选定
            $scope.checkFReceptor = function (receptor, finalReceptor) {
                return false; // 若首席必须选择那么删除此行
                $timeout(function () {

                    if ($scope.contAttr === "prop") {
                        $.each(receptor.fhFinalReinsList, function (index, r) {
                            r.hideFlag = finalReceptor.isPrireins;
                        });
                        finalReceptor.hideFlag = false;
                    }
                }, 10);
            };
            //输入时检查接受人最终接收人接收比例和
            $scope.checkRecepterDetail = function (recepter) {
                var sum = 0.0;
                if ($scope.contAttr === 'nprop' && recepter.brokerFlag && recepter.fhxFinalReinsList.length > 0) {
                    $.each(recepter.fhxFinalReinsList, function (index, r) {
                        sum += r.shareRate;
                    });
                    if (sum === recepter.shareRate && recepter.brokerFlag) {
                        recepter.warning = false;
                    } else {
                        recepter.warning = true;
                    }
                } else if ($scope.contAttr === 'prop' && recepter.brokerFlag && recepter.fhFinalReinsList.length > 0) {
                    $.each(recepter.fhFinalReinsList, function (index, r) {
                        sum += r.shareRate;
                    });
                    if (sum === recepter.shareRate && recepter.brokerFlag) {
                        recepter.warning = false;
                    } else {
                        recepter.warning = true;
                    }
                }
            };
            //编辑时检查合同止期是否合法
            /* $scope.checkEndDate = function(contract){
                    	if(true ){

                    		$timeout(function(){

                    			if($scope.contAttr === "prop"){

                    				var nowTime = Date.parse($scope.contract.contEndTm);
                        			if(angular.isDefined($scope.contract.contEndTm)){
                        				var startTime = Date.parse($scope.contract.contBgnTm);
                        				if(!isNaN(nowTime) && !isNaN(startTime)){
                        					if(startTime > nowTime){
                        						alert("合同止期不能早于合同起期，请重新选择合同止期！");
                        						$scope.contract.contEndTm = "";
                        					}
                        				}
                        				if(contract.stateFlag==="4"){
	                        				var preTime = Date.parse($scope.contract.endDateHold);
	                        				if(!isNaN(preTime) && preTime - nowTime > 0){
	                        					alert("编辑时合同止期不能早于已有时间！！");
	                        				}else{
	                        					return false;
	                        				}
                        				} else {
                        					return false;
                        				}
                        			}
                        			$scope.contract.contEndTm = $scope.contract.endDateHold;
                        		}else{

                        			var nowTime = Date.parse($scope.contract.endDate);
                        			if(angular.isDefined($scope.contract.endDate)){
                        				var preTime = Date.parse($scope.contract.endDateHold);
                        				var startTime = Date.parse($scope.contract.startDate);
                        				if(!isNaN(nowTime) && !isNaN(startTime)){
                        					if(startTime > nowTime){
                        						alert("合同止期不能早于合同起期，请重新选择合同止期！");
                        						$scope.contract.endDate = "";
                        					}
                        				}
                        				if(contract.stateFlag==="0"){
	                        				if(!isNaN(preTime) && preTime - nowTime > 0){
	                        					alert("编辑时合同止期不能早于已有时间！！");
	                        				}else{
	                        					return false;
	                        				}
                        				} else {
                        					return false;
                        				}
                        			}
                        			$scope.contract.endDate = $scope.contract.endDateHold;
                        			$scope.$apply($scope.contract.endDate);
                        		}
                    		},200);

                    	}
                    };
*/
            /* $scope.selectTaxFlagChange = function(section){

                    	if(section.vatFlag==="1"){
                    		section.taxRate = "6.00";
//                    		section.cityTaxRate="7.00";
//                    		section.educationTaxRate="5.00";
                    	}else{

                    		section.taxRate = "0.00";
//                    		section.cityTaxRate="0.00";
//                    		section.educationTaxRate="0.00";
                    	}

                    };*/
            //增加分项时显示的分项标题
            var getSectionName = function () {
                if ($scope.contAttr === "nprop")

                    var section = $scope.contract.fhxLayerList.length;
                else
                    var section = $scope.contract.fhSectionList.length;
                section += 1;
                return String.fromCharCode(("a".charCodeAt(0) + section - 1));

            };
            //增加层时显示的层标题

            var getLayerName = function () {
                if ($scope.contract.fhxLayerList.length === 0) {
                    return 1;
                }
                if ($scope.contAttr === "nprop") {

                    var layerName = parseInt($scope.contract.fhxLayerList[$scope.contract.fhxLayerList.length - 1].layerNo);
                    if (isNaN(layerName)) {

                        var lastLayerName = $scope.contract.fhxLayerList[$scope.contract.fhxLayerList.length - 1].layerNo;
                        layerName = (parseInt(lastLayerName.substring(2, lastLayerName.length - 1)) + 1);
                    } else {
                        layerName += 1;
                    }
                    return layerName;
                }
            };

            var init = function () {
                console.log($stateParams.contOutTyp);
                $scope.operationNew = $stateParams.operation;

                $scope.operationNew == 'new' ? $scope.newIf = 'true' : $scope.newIf = 'false'
                $scope.operationNew == 'edit' ? $scope.editIf = 'true' : $scope.editIf = 'false'

                //浮动手续费费率表上传文件
                $scope.uploads = [];
                //初始化适用险种/地震险model

                $scope.risk = {
                    earth: {} //
                };

                //数据字典差寻条件
                $scope.keywords = {
                    "id": "",
                    "value": "",
                    "other1": ""
                };
                //比例、非比例编辑时可以修改的状态
                $scope.mayStateFlags = [];
                if ($scope.contAttr === "nprop") {
                    //应税免税标识

                    $scope.vatFlags = codes['vatFlag'];
                    //非比例合同状态
                    $scope.stateFlags = codes["nprop.stateFlag"];
                    $scope.mayStateFlags = angular.copy($scope.stateFlags);
                    //非比例的业务类型
                    $scope.inoutMrks = codes["nprop.inoutMrk"];

                    //非比例的合同类型默认初始化
                    $scope.treatyTypes = codes["nprop.treatyType"];

                    //恢复保费类型(非比例)
                    $scope.reinstTypes = codes['nprop.reinstTypes'];

                    //合同账单期( 比例有，非比例页面没有)
                    $scope.billPeriodCdes = codes["prop.billPeriodCde"];
                } else {
                    //应税免税标识
                    $scope.vatFlags = codes['vatFlag'];

                    //分保基础
                    $scope.feeBaseCdes = codes['prop.rePremiumBase'];

                    //合同结清方式
                    $scope.settleTypCdes = codes["prop.settleTypCde"];

                    //计算基础
                    $scope.calculateBases = codes["prop.calculateBase"];
                    //估损范围
                    $scope.cashLossFlags = codes["prop.cashLossFlag"];

                    //比例合同状态
                    $scope.contStatuses = codes["prop.stateFlag"];
                    $scope.mayStateFlags = angular.copy($scope.contStatuses);
                    //比例的业务类型
                    $scope.inoutMrks = codes["prop.optType"];

                    //比例的合同类型默认初始化
                    $scope.contGrpTypCdes = codes["prop.treatyType"];

                    //比例合同账单期
                    $scope.billPeriodCdes = codes["prop.accPeriod"];

                    //应税免税标识
                    $scope.vatFlags = codes["prop.vatFlag"];
                    //纯益手续费方式
                    $scope.pcCleanModes = codes["pcCleanMode"];

                    //比例合同除外责任初始化条件变量
                    $scope.ES = {
                        collapseName: "折叠",
                        collapseFlag: false
                    };
                }


                //适用于再保人一级下拉菜单 add by zhx begin
                var key = angular.copy($scope.keywords);
                key.id = "reinsCode";
                key.value = "";
                $scope.getCode(key, {}, "reinsCodes");
                //适用于再保人一级下拉菜单 add by zhx end

                //适用于最终再保人一级下拉菜单 add by zhx begin
                var key = angular.copy($scope.keywords);
                key.id = "freinsCode";
                key.value = "";
                $scope.getCode(key, {}, "freinsCodes");
                //适用于最终再保人 end

                //适用机构信息一级下拉菜单add by zhx begin
                var key = angular.copy($scope.keywords);
                key.id = "comCode";
                key.value = "";
                $scope.getCode(key, {}, "comCodes");

                //适用险种一级下拉菜单
                var key = angular.copy($scope.keywords);
                key.id = "classCode";
                key.value = "";
                $scope.getCode(key, {}, "classCodes");
                //适用险种二级下拉菜单初始化
                var watch = $scope.$watch("classCodes", function () {
                    if (angular.isDefined($scope.classCodes) && $scope.classCodes.length > 0) {
                        //一级下拉菜单默认选项
                        if (angular.isUndefined($scope.risk.classCode)) {
                            //$scope.risk.classCode = $scope.classCodes[0].id;
                        }
                        if (angular.isUndefined($scope.riskCodes)) {
                            var key = angular.copy($scope.keywords);
                            key.id = "riskCodeByClass";
                            key.value = $scope.risk.classCode;
                            $scope.getCode(key, {}, "riskCodes");
                            //注销watch
                            watch();
                        }
                    }
                });

                //默认隐藏条件框
                $scope.hideSearchList();
                var key = angular.copy($scope.keywords);
                key.id = "classCode";
                key.value = "";
                $scope.getCode(key, {}, "classCodes");
                //比例非比例币别
                var key = angular.copy($scope.keywords);
                key.id = "currency";
                key.value = "";
                $scope.getCode(key, {}, "currencys");
                $scope.operation = angular.isUndefined($stateParams.operation) ? 'new' : $stateParams.operation;
                //新增合同时默认主项设置
                console.log($stateParams)
                if ($scope.operation === 'new') {
                    if ($scope.contAttr === "prop") {
                        $scope.contract = angular.copy(contractService.getElement("prop"));
                        $scope.contract.treatyType = $stateParams.contOutTyp;
                        $scope.contract.optType = $stateParams.mode;

                    } else if ($scope.contAttr === "nprop") {
                        $scope.contract = angular.copy(contractService.getElement("nprop"));
                        $scope.contract.inoutMrk = $stateParams.inoutMrk;

                        $scope.contract.treatyType = $stateParams.treatyType;
                        $.each($scope.contract.fhxLayerList, function (index, r) {
                            r.layerType = $stateParams.treatyType;
                            r.fhXReinstTimesList = [];
                        });

                    }
                } else {
                    $scope.contract = {};
                }


                //编辑，查看
                if ($scope.operation === 'edit' || $scope.operation === 'view') {
                    $scope.showBusy(true);

                    $scope.getContract($scope.contAttr, $stateParams.mode, {})

                        .then(
                            function (data) {
                                if (angular.isDefined(data.result) && data.result === "error") {
                                    alert(data.msg);
                                    history.back(-1);
                                } else {
                                    $scope.contract = $scope.preDealWith(data);

                                    console.log($scope.contract)
                                    for (var i = 0; i < $scope.contract.fhxLayerList.length; i++) {
                                        if ($scope.contract.fhxLayerList[i].fhXReinstTimesList.length > 0) {
                                            $.each($scope.contract.fhxLayerList[i].fhXReinstTimesList, function (index, fhXReinstTimes) {
                                                fhXReinstTimes.randomNum = angular.copy(Math.random());
                                            })
                                        }
                                        for (var j = 0; j < $scope.contract.fhxLayerList[i].fhxPlanList.length; j++) {
                                            var getdata = new Date($scope.contract.fhxLayerList[i].fhxPlanList[j].plan);
                                            $scope.contract.fhxLayerList[i].fhxPlanList[j].plan = getdata.getFullYear() + '-' + (getdata.getMonth() + 1) + '-' + getdata.getDate();
                                            $scope.payTimes = $scope.contract.fhxLayerList[i].fhxPlanList[j].length

                                        }
                                    }
                                    console.log($scope.contract);
                                }
                                $scope.showBusy(false);
                            },
                            function () {
                                $scope.showBusy(false);
                                alert("链接错误！");
                                history.back(-1);
                            }
                        );
                }
                ;
            };
            init();
        }]);
});