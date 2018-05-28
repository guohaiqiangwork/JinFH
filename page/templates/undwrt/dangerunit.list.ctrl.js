define(['app',
    'config',
    '/reins/page/templates/undwrt/dangerunit.editor.riskUnit.ctrl.js',
], function (app, config) {
    app.controller('RiskUnitListCtrl', ['$scope', '$stateParams', '$filter', '$timeout', '$modal', '$filter', '$location', 'RiskunitService', 'ContractService'
        , function ($scope, $stateParams, $filter, $timeout, $modal, $filter, $location, riskunitService, contractService) {


            //临分意向-比例-接收人备用对象初始化
            $scope.facPlyComShareVo_ = {
                "facPlyPays": [],
                "feoXPlans": []
            }

            $scope.checkAll = false;

            //被选中的按钮个数
            $scope.selectedCount = 0;

            //点击全部选中时设置控制的单选按钮状态
            $scope.checkAllCumulativeRisk = function () {
                // console.log("list...checkAllCumulativeRisk");
                $scope.checkAll = !$scope.checkAll;
                $.each($scope.cumulativeRiskList, function (index, c) {
                    // console.log(c.checked);
                    c.checked = $scope.checkAll;
                });
            };

            //监视riskunitsAccPlyInfo中是否有元素被改变状态
            $scope.$watch('cumulativeRiskList', function () {
                if (angular.isUndefined($scope.cumulativeRiskList))
                    return false;
                //监测是否有元素被选中
                var _temp = $filter('filter')($scope.cumulativeRiskList, {checked: true});
                // console.log(_temp.length);

                $scope.selectedCount = _temp.length;
                if (_temp.length === $scope.cumulativeRiskList.length)
                    $scope.checkAll = true;
                else
                    $scope.checkAll = false;

                $scope.checkedRow_ = {
                    riskunitamt: 0,
                    riskunitprm: 0,
                    osamt: 0,
                    lossamt: 0,
                    retrate: 0,
                    retamt: 0,
                    retprm: 0,
                    contrate: 0,
                    contamt: 0,
                    contprm: 0,
                    facrate: 0,
                    facamt: 0,
                    facprm: 0,
                    apretrate: 0,
                    apretamt: 0,
                    apretprm: 0
                };

                //风险累积的合计
                $.each(_temp, function (index, row) {
                    $scope.checkedRow_.riskunitamt = $scope.checkedRow_.riskunitamt + row.riskunitamt;
                    $scope.checkedRow_.riskunitprm = $scope.checkedRow_.riskunitprm + row.riskunitprm;
                    $scope.checkedRow_.osamt = $scope.checkedRow_.osamt + row.osamt;
                    $scope.checkedRow_.lossamt = $scope.checkedRow_.lossamt + row.lossamt;
                    $scope.checkedRow_.retrate = $scope.checkedRow_.retrate + row.retrate;
                    $scope.checkedRow_.retamt = $scope.checkedRow_.retamt + row.retamt;
                    $scope.checkedRow_.retprm = $scope.checkedRow_.retprm + row.retprm;
                    $scope.checkedRow_.contrate = $scope.checkedRow_.contrate + row.contrate;
                    $scope.checkedRow_.contamt = $scope.checkedRow_.contamt + row.contamt;
                    $scope.checkedRow_.contprm = $scope.checkedRow_.contprm + row.contprm;
                    $scope.checkedRow_.facrate = $scope.checkedRow_.facrate + row.facrate;
                    $scope.checkedRow_.facamt = $scope.checkedRow_.facamt + row.facamt;
                    $scope.checkedRow_.facprm = $scope.checkedRow_.facprm + row.facprm;
                    $scope.checkedRow_.apretrate = $scope.checkedRow_.apretrate + row.apretrate;
                    $scope.checkedRow_.apretamt = $scope.checkedRow_.apretamt + row.apretamt;
                    $scope.checkedRow_.apretprm = $scope.checkedRow_.apretprm + row.apretprm;
                });

            }, true);

            //保存标志位
            $scope.save = {
                "flag": false
            };

            //输入时检查接受人/最终接受人是否重复
            $scope.distinctReceiver = function (contAttr, dangerUnitFacEnquiry, feoReins, distinct) {
                // console.log("distinctReceiver's method is coming...");
                if (contAttr === "prop") {
                    if (feoReins.reinsType === '0') {
                        //非经纪人
                        feoReins.finalReinsCode = feoReins.reinsCode;

                        if (distinct === "reinsCode" && dangerUnitFacEnquiry.feoReinsReceiveList.length > 1) {
                            $.each(dangerUnitFacEnquiry.feoReinsReceiveList, function (index, r) {
                                if (r != feoReins && r.reinsCode === feoReins.reinsCode) {
                                    alert("请不要重复添加接受人！");
                                    feoReins.reinsCode = "";
                                }
                            });
                        }
                    }
                    if (feoReins.reinsType === '1') {
                        //经纪人
                        if (distinct === "finalReinsCode" && dangerUnitFacEnquiry.feoReinsReceiveList.length > 1) {
                            $.each(dangerUnitFacEnquiry.feoReinsReceiveList, function (index, r) {
                                if (r != feoReins && r.reinsCode === feoReins.reinsCode && r.finalReinsCode === feoReins.finalReinsCode) {
                                    alert("请不要重复添加最终接受人！");
                                    feoReins.finalReinsCode = "";
                                }
                            });
                        }
                    }

                } else {
                    if (distinct === "recepter" && repeat.feoXReinsList.length > 1) {
                        $.each(repeat.feoXReinsList, function (index, r) {
                            if (r != compare && r.facRiComCde === compare.facRiComCde) {
                                alert("请不要重复添加接受人！");
                                compare.facRiComCde = "";
                            }
                        });
                    } else if (distinct === "finalRecepter" && repeat.feoXFReinsVos.length > 1) {
                        $.each(repeat.feoXFReinsVos, function (index, f) {
                            if (f != compare && f.freinsCode === compare.freinsCode) {
                                alert("请不要重复添加最终接受人！");
                                compare.freinsCode = "";
                            }
                        });
                    }
                }
            };
            //根据再保人境内外性质,自动带出附加税比例值
            $scope.selectfacReinsCodeChange = function (dangerUnitFacEnquiry, feoReins) {
                if (dangerUnitFacEnquiry.taxFree === '0') {//应税
                    if (feoReins.feoReinsCde.substr(feoReins.feoReinsCde.length - 1, 1) === "1") {
                        feoReins.facComVat = 6.000000;
                        feoReins.facComCityTax = 0.000000;
                        feoReins.facComEducationTax = 0.000000;
                    }
                    if (feoReins.facPlyFComShareVos.length > 0) {
                        $.each(feoReins.facPlyFComShareVos, function (index, f) {
                            if (f.facRiFComCde.substr(f.facRiFComCde.length - 1, 1) === "2") {
                                feoReins.facComVat = 6.000000;
                                feoReins.facComCityTax = 7.000000;
                                feoReins.facComEducationTax = 5.000000;
                            }
                        });
                    } else {
                        if (feoReins.feoReinsCde.substr(feoReins.feoReinsCde.length - 1, 1) === "2") {
                            feoReins.facComVat = 6.000000;
                            feoReins.facComCityTax = 7.000000;
                            feoReins.facComEducationTax = 5.000000;
                        }
                    }
                } else {//免税
                    feoReins.facComVat = 0.000000;
                    feoReins.facComCityTax = 0.000000;
                    feoReins.facComEducationTax = 0.000000;
                }

            };


            //根据再保人境内外性质,自动带出附加税比例值
            $scope.selectXFacRiComCdeChange = function (repeat, feoXReins) {
                if (repeat.taxFree === '0') {//应税
                    if (feoXReins.facRiComCde.substr(feoXReins.facRiComCde.length - 1, 1) === "1") {
                        feoXReins.facComVat = 6.000000;
                        feoXReins.facComCityTax = 0.000000;
                        feoXReins.facComEducationTax = 0.000000;
                    }
                    if (feoXReins.feoXFReinsVos.length > 0) {
                        $.each(feoXReins.feoXFReinsVos, function (index, f) {
                            if (f.freinsCode.substr(f.freinsCode.length - 1, 1) === "2") {
                                feoXReins.facComVat = 6.000000;
                                feoXReins.facComCityTax = 7.000000;
                                feoXReins.facComEducationTax = 5.000000;
                            }
                        });
                    } else if (feoXReins.facRiComCde.substr(feoXReins.facRiComCde.length - 1, 1) === "2") {
                        feoXReins.facComVat = 6.000000;
                        feoXReins.facComCityTax = 7.000000;
                        feoXReins.facComEducationTax = 5.000000;
                    }
                } else {//免税
                    feoXReins.facComVat = 0.000000;
                    feoXReins.facComCityTax = 0.000000;
                    feoXReins.facComEducationTax = 0.000000;
                }
            };


            //比例临分临分意向公式计算
            //contAttr：prop 比例临分， nprop非比例临分
            $scope.enquiryPropCalculator = function (methodName, feoReins, dangerUnit, layer) {
                $scope.feoXReinssFlag = 0;
                if (methodName === "getFacPremium") {
                    //默认费率时，算出分保费（比例）
                    $scope.rate_ = parseFloat((dangerUnit.premium / dangerUnit.amount).toFixed(6));
                    $scope.rate_ = parseFloat(feoReins.rate).toFixed(4);

                    if (feoReins.isRateDiff === "0") {
                        feoReins.premium = (parseFloat(dangerUnit.noTaxPremium * feoReins.signedLine / 100)).toFixed(2);
                        // console.log("默认费率时，算出分保费（比例）" + feoReins.premium);
                    } else {
                        if (!(feoReins.rate === 0.0000 || feoReins.rate === null)) {
                            feoReins.premium = (parseFloat(feoReins.amount * feoReins.rate / 100)).toFixed(2);
                        }
                        // console.log("非默认费率时，算出分保费（比例）" + feoReins.premium);
                    }

                    if (isNaN(feoReins.premium)) {
                        feoReins.premium = 0.00;
                    }
                    // console.log(feoReins.premium);
                    return feoReins.premium;

                } else if (methodName === "getFenbaoFNew") {
                    feoReins.premium = parseFloat(feoReins.faccomOriPrm * 1 + feoReins.faccomChgPrm * 1).toFixed(2);
                    if (isNaN(feoReins.premium)) {
                        feoReins.premium = 0.00;
                    }
                } else if (methodName === "getFenbaoFBhl") {
                    //默认费率时，算出分保费变化量（比例）

                    if (dangerUnit.amount === null) {
                        dangerUnit.amount = 0;
                    }
                    if (feoReins.isRateDiff === "0") {
                        feoReins.faccomChgPrm = (parseFloat(dangerUnit.noTaxPremium * feoReins.signedLine / 100) - (feoReins.faccomOriPrm * 1)).toFixed(2);
                        feoReins.faccomChgPrm = feoReins.faccomChgPrm * 1;
                    } else {
                        if (!(feoReins.rate === 0.0000 || feoReins.rate === null)) {
                            //feoReins.faccomOriPrm = (parseFloat(feoReins.faccomOriAmt * feoReins.rate/100)).toFixed(2);
                            feoReins.faccomChgPrm = (parseFloat(feoReins.amount * feoReins.rate / 100) - (feoReins.faccomOriPrm * 1)).toFixed(2);
                            feoReins.faccomChgPrm = feoReins.faccomChgPrm * 1;
                        }
                        if (isNaN(feoReins.faccomChgPrm)) {
                            feoReins.faccomChgPrm = 0.00;
                        }
                        // console.log("非默认费率时，算出分保费（比例）" + feoReins.faccomOriPrm);
                        // console.log("非默认费率时，算出分保费变化量（比例）" + feoReins.faccomChgPrm);
                    }
                } else if (methodName === "getRate") {
                    //初始化费率（保费/保额）（比例）
                    if (dangerUnit.amount === 0) {
                        //alert("保额作为除数，不能为0!默认设置费率值为0.0000");
                        feoReins.rate = 0.0000000000;
                    } else {
                        if (feoReins.rate === 0.0000) {
                            feoReins.rate = parseFloat((dangerUnit.premium / dangerUnit.amount).toFixed(12));
                            // console.log("初始化计算出来的费率: " + feoReins.rate);
                            feoReins.rate = (feoReins.rate * 100).toFixed(10);
                            // console.log("初始化计算出来的费率: " + feoReins.rate);
                        }
                        if (isNaN(feoReins.rate)) {
                            feoReins.rate = 0.0000000000;
                        }
                    }
                    return feoReins.rate;
                } else if (methodName === "getJsblByFenbaoE") {
                    //通过分保额获取接受比例 - 比例
                    feoReins.signedLine = parseFloat((feoReins.amount / dangerUnit.amount).toFixed(6));
                    feoReins.signedLine = (feoReins.signedLine * 100).toFixed(4);
                    return feoReins.signedLine;

                } else if (methodName === "getFacAmount") {
                    //获取分保额 - 比例
                    // console.log("getFacAmount is coming  ");
                    if (dangerUnit.amount === null) {
                        dangerUnit.amount = 0;
                    }
                    feoReins.amount = parseFloat((feoReins.signedLine / 100) * dangerUnit.amount).toFixed(2);
                    if (isNaN(feoReins.amount)) {
                        feoReins.amount = 0.00;
                    }
                    // console.log("分保额的值是：  " + feoReins.amount);
                    return feoReins.amount;


                } else if (methodName === "getFenbaoEBhl") {
                    //获取分保额变化量 - 比例
                    // console.log("getFenbaoEBhl is coming  ");
                    if (dangerUnit.amount === null) {
                        dangerUnit.amount = 0;
                    }
                    feoReins.faccomChgAmt = parseFloat((feoReins.signedLine / 100) * dangerUnit.amount - feoReins.faccomOriAmt * 1).toFixed(3);
                    feoReins.faccomChgAmt = Math.round(feoReins.faccomChgAmt * 100) / 100;
                    feoReins.amount = feoReins.faccomOriAmt * 1 + feoReins.faccomChgAmt * 1;
                    if (isNaN(feoReins.faccomChgAmt)) {
                        feoReins.faccomChgAmt = 0.00;
                    }
                    // console.log("分保额变化量的值是：  " + feoReins.faccomChgAmt);
                    return feoReins.faccomChgAmt;


                } else if (methodName === "chushihua1") {
                    //分保额初始化（比例）
                    //alert("初始化分保额");
                    if (angular.isUndefined(feoReins.signedLine) || feoReins.signedLine === null) {
                        feoReins.signedLine = 0.0000;
                    }
                    if (!(feoReins.amount === 0.0000)) {
                        feoReins.amount = parseFloat(dangerUnit.amount * (feoReins.signedLine / 100)).toFixed(2);
                    } else {
                        feoReins.amount = 0.0000;
                    }
                    if (isNaN(feoReins.amount)) {
                        feoReins.amount = 0.00;
                    }
                    return feoReins.amount;


                } else if (methodName === "chushihua1chgComAmt") {
                    //分保额变化量初始化（比例）
                    //alert("初始化分保额变化量");
                    // console.log(feoReins.amount);
                    // console.log(dangerUnit.amount);
                    // console.log(feoReins.signedLine);
                    if (angular.isUndefined(feoReins.signedLine) || feoReins.signedLine === null) {
                        feoReins.signedLine = 0.0000;
                    }
                    feoReins.amount = parseFloat(dangerUnit.amount * (feoReins.signedLine / 100)).toFixed(2);
                    if (isNaN(feoReins.amount)) {
                        feoReins.amount = 0.00;
                    }
                    // console.log("初始化1---start");
                    // console.log("初始化1---end");
                } else if (methodName === "getChangedRate") {
                    //税率（比例）
                    feoReins.rate = (parseFloat((feoReins.premium / feoReins.amount) * 100)).toFixed(10);
                    if (isNaN(feoReins.rate)) {
                        feoReins.rate = 0.0000000000;
                    }
                    // console.log("新的税率 " + feoReins.rate);
                    return feoReins.rate;
                } else if (methodName === "getChangedRateNew") {
                    //税率新值（比例）
                    if ((feoReins.faccomOriAmt * 1 + feoReins.faccomChgAmt * 1) != 0) {
                        feoReins.rate = (parseFloat((feoReins.faccomOriPrm * 1 + feoReins.faccomChgPrm * 1) / (feoReins.faccomOriAmt * 1 + feoReins.faccomChgAmt * 1) * 100)).toFixed(4);
                    } else {
                        feoReins.rate = 0.0000;
                    }
                    if ((feoReins.rate) < 0) {
                        alert("费率的值不能小于0!");
                    }
                    if (isNaN(feoReins.rate)) {
                        feoReins.rate = 0.0000;
                    }
                    // console.log("新的税率新值 " + feoReins.rate);
                    return feoReins.rate;
                } else if (methodName === "fenbaofei") {
                    //此处layer的值仅用来区保单分"费率差异"点选框"是=1","否=0"的值，因传递的值刚好相反
                    if (layer === "1-BD") {
                        feoReins.isRateDiff = "1"
                    }
                    if (layer === "0-BD") {
                        feoReins.isRateDiff = "0"
                    }
                    //分保费 （比例）
                    if (feoReins.isRateDiff === "0") {
                        feoReins.premium = (parseFloat(dangerUnit.noTaxPremium * feoReins.signedLine / 100)).toFixed(2);
                        // console.log("默认费率时，算出分保费（比例）" + feoReins.premium);
                    } else {
                        if (!(feoReins.rate === 0.0000 || feoReins.rate === null)) {
                            feoReins.premium = (parseFloat(feoReins.amount * feoReins.rate / 100)).toFixed(2);
                        }
                        // console.log("非默认费率时，算出分保费（比例）" + feoReins.premium);
                    }

                    if (isNaN(feoReins.premium)) {
                        feoReins.premium = 0.00;
                    }
                    // console.log(feoReins.premium);
                    return feoReins.premium;

                } else if (methodName === "getFenbaoEBhlByFenbaoE") {
                    //通过分保额算出分保额变化量 （比例）
                    // console.log(feoReins.faccomOriAmt);
                    feoReins.faccomChgAmt = parseFloat(feoReins.amount - feoReins.faccomOriAmt * 1).toFixed(2);
                    // console.log("分保额变化量 的值： " + feoReins.faccomChgAmt);
                    return feoReins.faccomChgAmt;
                } else if (methodName === "fenbaofeiBhl") {
                    //此处layer的值仅用来批单区分"费率差异"点选框"是=1","否=0"的值，因传递的值刚好相反
                    if (layer === "1-PD") {
                        feoReins.isRateDiff = "1"
                    }
                    if (layer === "0-PD") {
                        feoReins.isRateDiff = "0"
                    }
                    //分保费变化量 （比例）
                    // console.log("faccomOriAmt---" + feoReins.faccomOriAmt);
                    // console.log("faccomOriPrm----" + feoReins.faccomOriPrm);
                    if (feoReins.isRateDiff === "0") {
                        feoReins.faccomChgPrm = ((parseFloat(dangerUnit.premium * feoReins.signedLine / 100)) - feoReins.faccomOriPrm * 1).toFixed(2);
                    } else {
                        feoReins.faccomChgPrm = (parseFloat((feoReins.faccomOriAmt * 1 + feoReins.faccomChgAmt * 1) * (feoReins.rate / 100)) - feoReins.faccomOriPrm * 1).toFixed(2);
                        if (!(feoReins.rate === 0.0000 || feoReins.rate === null)) {
                            feoReins.premium = (parseFloat(feoReins.amount * feoReins.rate / 100)).toFixed(2);
                        }
                        // console.log("非默认费率时，算出分保费（比例）" + feoReins.premium);
                    }

                    if (isNaN(feoReins.faccomChgPrm)) {
                        feoReins.faccomChgPrm = 0.00;
                    }
                    // console.log("分保费的值：       " + feoReins.premium);
                    // console.log("分保费变量量的值： " + feoReins.faccomChgPrm);
                    return feoReins;

                }
            }

            //临分意向公式计算
            //contAttr：prop 比例临分， nprop非比例临分
            $scope.intentionCalculator = function (contAttr, methodName, facP, riskunit, layer) {

                if (contAttr === "nprop") {

                    if (methodName === "getFenbaofeiNprop") {
                        //获取分保费 - 超赔
                        // console.log("获取分保费 - 超赔");
                        facP.premium = (parseFloat(layer.layerPremium * (facP.shareRate / 100))).toFixed(2);
                        if (isNaN(facP.premium)) {
                            facP.premium = 0.00;
                        }
                        // console.log("分保费 - 超赔 " + facP.premium);
                        return facP.premium;
                    } else if (methodName === "getAllFeoXReinsChgPrm") {
                        //获取变化分保费 - 超赔
                        // console.log("获取变化分保费 - 超赔");
                        if (angular.isUndefined(layer.layerPremium)) {
                            layer.layerPremium = 0;
                        }
                        if (layer.feoXReinsList.length > 0) {
                            $.each(layer.feoXReinsList, function (index, fac) {
                                if (angular.isUndefined(fac.oriPremium)) {
                                    fac.oriPremium = 0;
                                }
                                fac.chgPreium = (parseFloat((layer.layerPremium * 1) * (fac.shareRate / 100) - fac.oriPremium)).toFixed(2);
                                fac.chgPreium = fac.chgPreium * 1;
                                if (isNaN(fac.chgPreium)) {
                                    fac.chgPreium = 0.00;
                                }
                                // console.log("变化分保费 - 超赔 " + fac.chgPreium);
                            });
                        }
                    } else if (methodName === "getAllFeoXReinsPrm") {
                        //获取变化分保费 - 超赔
                        // console.log("获取getFeoXReinsPrm - 超赔");
                        if (angular.isUndefined(layer.layerPremium)) {
                            layer.layerPremium = 0;
                        }
                        if (layer.feoXReinsList.length > 0) {
                            $.each(layer.feoXReinsList, function (index, fac) {
                                fac.premium = (parseFloat(layer.layerPremium * fac.shareRate / 100)).toFixed(2);
                                fac.premium = fac.premium * 1;
                                if (isNaN(fac.premium)) {
                                    fac.premium = 0.00;
                                }
                                // console.log("getFeoXReinsPrm - 超赔 " + fac.premium);
                            });
                        }
                    } else if (methodName === "getFeoXReinsChgPrm") {
                        //获取变化分保费(接受比例) - 超赔
                        // console.log("获取变化分保费(接受比例) - 超赔");
                        if (angular.isUndefined(layer.layerPremium)) {
                            layer.layerPremium = 0;
                        }
                        if (angular.isUndefined(facP.oriPremium)) {
                            facP.oriPremium = 0;
                        }

                        facP.chgPreium = (parseFloat((layer.layerPremium * 1) * (facP.shareRate / 100) - facP.oriPremium)).toFixed(2);
                        if (isNaN(facP.chgPreium)) {
                            facP.chgPreium = 0.00;
                        }
                        // console.log(facP.chgPreium);

                    } else if (methodName === "getCengbaofeiBh") {
                        //获取层保费变化量(接收人变化分保费逆运算) - 超赔

                        // console.log("getCengbaofeiBh is coming  ");
                        layer.layerchgPremium = (parseFloat((facP.chgPreium * 1 + facP.premium * 1) / (facP.shareRate / 100) - layer.layerPremium)).toFixed(2);
                        layer.layerchgPremium = layer.layerchgPremium * 1;
                        if (isNaN(layer.layerchgPremium)) {
                            layer.layerchgPremium = 0.00;
                        }
                        // console.log("层保费变化量(接收人变化分保费逆运算)的值是：  " + layer.layerchgPremium);
                        return layer.layerchgPremium;

                    } else if (methodName === "getFenchufeneNprop") {
                        //获取分出份额 - 超赔
                        // console.log("获取分出份额 - 超赔");
                        if (riskunit.coinsRate === null) {
                            riskunit.coinsRate = 100;
                        }
                        layer.shareRate = parseFloat(layer.absShareRate / riskunit.coinsRate).toFixed(4);
                        if (layer.shareRate * 1 > 100) {
                            $scope.fenchuFeneCheck = false;
                            alert("超赔层的分出份额不能大于100！");
                        } else {
                            $scope.fenchuFeneCheck = true;
                        }
                        if (isNaN(layer.shareRate)) {
                            layer.shareRate = 0.0000;
                        }
                        return layer.shareRate;

                    } else if (methodName === "getQuandanFenchublNprop") {
                        //获取全单分出比例 - 超赔
                        // console.log("获取全单分出比例 - 超赔");
                        if (riskunit.coinsRate === null) {
                            riskunit.coinsRate = 1;
                        }
                        layer.absShareRate = parseFloat(layer.shareRate * riskunit.coinsRate).toFixed(4);
                        if (isNaN(layer.absShareRate)) {
                            layer.absShareRate = 0.0000;
                        }
                        return layer.absShareRate;


                    } else if (methodName === "getJsblNprop") {
                        //获取接受比例 - 超赔
                        $scope.feoXReinssFlag = 0;

                        // console.log("getJsblNprop is coming  ");

                        if (riskunit.coinsRate === null) {
                            riskunit.coinsRate = 1;
                        }
                        facP.shareRate = parseFloat(facP.absShareRate * riskunit.coinsRate).toFixed(4);
                        if (isNaN(facP.shareRate)) {
                            facP.shareRate = 0.0000;
                        }
                        // console.log("接受比例的值是：  " + facP.shareRate);
                        return facP.shareRate;


                    } else if (methodName === "getQuandanjsblNprop") {
                        //获取全单接受比例 - 超赔
                        $scope.feoXReinssFlag = 0;

                        // console.log("getQuandanjsblNprop is coming ");

                        if (riskunit.coinsRate === null) {
                            riskunit.coinsRate = 1;
                        }
                        facP.absShareRate = parseFloat(facP.shareRate / riskunit.coinsRate).toFixed(4);
                        if (isNaN(facP.absShareRate)) {
                            facP.absShareRate = 0.0000;
                        }
                        // console.log("全单接受比例的值是：  " + facP.absShareRate);
                        return facP.absShareRate;


                    } else if (methodName === "getCengfenbaofei") {
                        //获取层分保费 - 超赔

                        // console.log("getCengfenbaofei is coming  ");
                        layer.layerrePreium = (parseFloat(layer.layerPremium * (layer.shareRate / 100))).toFixed(2);
                        layer.layerrePreium = layer.layerrePreium * 1;
                        if (isNaN(layer.layerrePreium)) {
                            layer.layerrePreium = 0.00;
                        }
                        // console.log("层分保费的值是：  " + layer.layerrePreium);
                        return layer.layerrePreium;


                    } else if (methodName === "getBhlToCengbaofei") {
                        //获取层保费（变化量） - 超赔

                        // console.log("getBhlToCengbaofei is coming  ");
                        layer.layerchgPremium = (parseFloat((layer.layerrePreium * 1 + layer.layerReChgPrem * 1) / (layer.shareRate / 100) - layer.layerPremium)).toFixed(2);
                        layer.layerchgPremium = layer.layerchgPremium * 1;
                        if (isNaN(layer.layerchgPremium)) {
                            layer.layerchgPremium = 0.00;
                        }
                        // console.log("层保费（变化量）的值是：  " + layer.layerchgPremium);
                        return layer.layerchgPremium;


                    } else if (methodName === "getCengfenbaofeiBhl") {
                        //获取层分保费变化量 - 超赔

                        // console.log("getCengfenbaofeiBhl is coming  ");
                        if (angular.isUndefined(layer.layerReOriPrem) || isNaN(layer.layerReOriPrem)) {
                            layer.layerReOriPrem = 0.00;
                        }
                        layer.layerReChgPrem = (parseFloat(layer.layerrePreium * 1 - layer.layerReOriPrem)).toFixed(2);
                        layer.layerReChgPrem = layer.layerReChgPrem * 1;
                        if (isNaN(layer.layerReChgPrem)) {
                            layer.layerReChgPrem = 0.00;
                        }
                        // console.log("层分保费变化量的值是：  " + layer.layerReChgPrem);
                        return layer.layerReChgPrem;


                    } else if (methodName === "getQuandanPeichangxiane") {
                        //获取全单赔偿限额  - 超赔
                        // console.log("getPeichangxiane is coming  ");

                        if (riskunit.coinsRate === null) {
                            riskunit.coinsRate = 1;
                        }
                        layer.absLayerQuota = parseFloat(layer.layerQuota / riskunit.coinsRate).toFixed(2);
                        if (isNaN(layer.absLayerQuota)) {
                            layer.absLayerQuota = 0.0000;
                        }
                        // console.log("全单赔偿限额的值是：  " + layer.absLayerQuota);
                        return layer.absLayerQuota;


                    } else if (methodName === "getQuandanQipeidian") {
                        //获取全单起赔点  - 超赔

                        // console.log("getQuandanQipeidian is coming  ");

                        if (riskunit.coinsRate === null) {
                            riskunit.coinsRate = 1;
                        }
                        layer.absExcessLoss = parseFloat(layer.excessLoss / riskunit.coinsRate).toFixed(2);
                        if (isNaN(layer.absExcessLoss)) {
                            layer.absExcessLoss = 0.0000;
                        }
                        // console.log("全单起赔点的值是：  " + layer.absExcessLoss);
                        return layer.absExcessLoss;


                    } else if (methodName === "getQipeidian") {
                        //获取起赔点  - 超赔

                        // console.log("getQipeidian is coming");

                        if (riskunit.coinsRate === null) {
                            riskunit.coinsRate = 1;
                        }
                        layer.excessLoss = parseFloat(layer.absExcessLoss * riskunit.coinsRate).toFixed(2);
                        if (isNaN(layer.excessLoss)) {
                            layer.excessLoss = 0.0000;
                        }
                        // console.log("起赔点的值是：  " + layer.excessLoss);
                        return layer.excessLoss;

                    } else if (methodName === "getPeichangxiane") {
                        //获取赔偿限额  - 超赔
                        // console.log("getPeichangxiane is coming  ");

                        if (riskunit.coinsRate === null) {
                            riskunit.coinsRate = 1;
                        }
                        layer.layerQuota = parseFloat(layer.absLayerQuota * riskunit.coinsRate).toFixed(2);
                        if (isNaN(layer.layerQuota)) {
                            layer.layerQuota = 0.0000;
                        }
                        // console.log("赔偿限额的值是：  " + layer.layerQuota);
                        return layer.layerQuota;


                    } else if (methodName === "getLayerChgPrem") {
                        //获取变化分保费 - 超赔
                        // console.log("获取LayerChgPrem - 超赔   is coming  ");
                        if (angular.isUndefined(layer.layerOriPrem) || isNaN(layer.layerOriPrem)) {
                            layer.layerOriPrem = 0.00;
                        }
                        layer.layerchgPremium = (parseFloat(layer.layerPremium - layer.layerOriPrem * 1)).toFixed(2);
                        layer.layerchgPremium = layer.layerchgPremium * 1;
                        if (isNaN(layer.layerchgPremium)) {
                            layer.layerchgPremium = 0.00;
                        }
                        return layer.layerchgPremium;
                    }

                }

            }

            //经纪人选中与否控制最终接收人的信息是否删除
            $scope.ctrlFinalRecepter = function (contAttr, recepter) {
                if (recepter.reinsType === '1' || recepter.reinsType === false) {
                    // console.log(true);
                } else {
                    // console.log(false);
                    if (contAttr === 'prop') {
                        /*if(angular.isDefined(recepter.facPlyFComShareVos)){
        					if(recepter.facPlyFComShareVos.length > 0){
		        				if(confirm("确认要删除最终接收人的信息吗?")){
		        					recepter.facPlyFComShareVos = [];
		        					console.log("prop");
		        					recepter.warning = false;
		        					console.log(recepter.warning);
		        				}
		        			}
        				}*/
                    } else {
                        if (angular.isDefined(recepter.feoXFReinsVos)) {
                            if (recepter.feoXFReinsVos.length > 0) {
                                if (confirm("确认要删除最终接收人的信息吗?")) {
                                    recepter.feoXFReinsVos = [];
                                    // console.log("nprop");
                                    recepter.warning = false;
                                }
                            }
                        }
                    }

                }
            }

            //初始化经纪人("1"/"0"- true/false)
            $scope.dealBrokerToBoolean = function () {
                $timeout(function () {
                    //预处理比例中的经纪人
                    if ($scope.dangerUnitFacEnquiry.feoReinsReceiveList.length > 0) {

                        $.each($scope.dangerUnitFacEnquiry.feoReinsReceiveList, function (index, fac) {
                            if (fac.reinsType === "0" || fac.reinsType) {
                                fac.reinsType = true;
                            } else {
                                fac.reinsType = false;
                            }
                        });
                    }
                    //预处理超赔中的经纪人
                    if ($scope.dangerUnitFacEnquiry.feoXLayerList.length > 0) {
                        $.each($scope.dangerUnitFacEnquiry.feoXLayerList, function (index, layer) {
                            $.each(layer.feoXReinsList, function (index, feo) {
                                if (feo.brokerFlag === "1" || feo.brokerFlag === true) {
                                    feo.brokerFlag = true;
                                } else {
                                    feo.brokerFlag = false;
                                }
                            });
                        });
                    }
                }, 10);
            }
            //特约
            $scope.dealBrokerToBooleans = function () {
                $timeout(function () {
                    if ($scope.dangerUnitFacEnquiry.feoReinsReceiveList.length > 0) {
                        $.each($scope.dangerUnitFacEnquiry.feoReinsReceiveList, function (index, fac) {
                            if (fac.facFlag === "0" || fac.feoReinsReceiveFacFlag === true) {
                                fac.facFlag = true;
                            } else {
                                fac.facFlag = false;
                            }
                        });
                    }
                }, 10);
            }

            //初始化差异分保
            $scope.getDifReinsAbc = function (fac, param) {
                if (param === 'dif') {
                    if ((fac.deductible === "" || fac.deductible === null) && (fac.deductibleRate === "" || fac.deductibleRate === null)) {
                        fac.dif = false;
                        fac.dif_ = false;
                    } else {
                        fac.dif = true;
                        fac.dif_ = true;
                    }
                }
                if (param === 'abc') {
                    if (fac.specialEngage === "" || fac.specialEngage === null) {
                        fac.abc = false;
                        fac.abc_ = false;
                    } else {
                        fac.abc = true;
                        fac.abc_ = true;
                    }
                }
            }

            //处理差异分保(由选中状态切换为未选中时，清空数据)
            $scope.dealDifReinsAbcChecked = function (fac, param) {
                if (param === 'dif') {
                    if (fac.dif) {
                        fac.dif = false;
                        fac.dif_ = false;
                    } else {
                        fac.deductible = "";
                        fac.deductibleRate = ""
                        fac.dif = true;
                        fac.dif_ = true;

                    }
                }
                if (param === 'abc') {
                    if (fac.abc) {
                        fac.abc = false;
                        fac.abc_ = false;
                    } else {
                        fac.specialEngage = "";
                        fac.abc = true;
                        fac.abc_ = true;

                    }
                }
                // console.log($scope.dangerUnitFacEnquiry);
            }

            //生成缴费计划参数对象(certiType,certiNo)
            $scope.planKeywords = {
                "certiType": "",
                "certiNo": ""
            }

            //临分意向-返回
            $scope.comeback = function (invalid, dirty, showExtra) {
                showExtra = "";
                $scope.trialListShareTrue = false //试算结果 默认不展示
                $scope.trialListShareTrueTable = true //试算列表
                // console.log("dirty's value is : " + dirty);
                // console.log("invalid's value is : " + invalid);
                // console.log("$scope.save.flag " + $scope.save.flag);
                if (invalid != '' && dirty != '') {
                    if ((dirty || ((!invalid) === false)) && $scope.save.flag === false) {
                        if (confirm("页面有未保存的元素，确认要返回吗?")) {
                            /*临分意向*/
                            $scope.editType = 1;
                            $scope.getFacEnquiryInfo($scope.certiType, $scope.certiNo, $scope.editType, $scope.global.user, {});
                            return showExtra;
                        } else {
                            return "intention";
                        }
                    }
                }
            };

            $scope.getByReturn = function (aim, condition) {
                var temp = aim + "";
                var keywords = {"id": aim, "value": condition, "holdFlag": false};
                return $scope.getCodes(keywords, {}).then(
                    function (data) {
                        return data;
                    },
                    function (code) {
                        return [];
                    }
                );
            };

            //预处理超赔中的接收人缴费信息
            $scope.dealNpropRecepter = function () {
                if ($scope.dangerUnitFacEnquiry.feoXLayerList.length > 0) {
                    $.each($scope.dangerUnitFacEnquiry.feoXLayerList, function (index, layer) {
                        $.each(layer.feoXReinsList, function (index, feo) {
                            $scope.feo_Nprop = {
                                feoXPlans: []
                            };
                            if (angular.isDefined(feo.feoXPlans)) {
                                $.each(feo.feoXPlans, function (index, plan) {
                                    if (plan.riComCde === feo.facRiComCde) {
                                        // console.log("nprop facP.facRiComCde's value is : " + feo.facRiComCde);
                                        // console.log(plan);
                                        if ($scope.feo_Nprop.feoXPlans.length > 0) {
                                            feo.feoXPlans.push(plan);
                                        } else {
                                            feo.feoXPlans = [];
                                            $scope.feo_Nprop.feoXPlans.push(plan);
                                            feo.feoXPlans.push(plan);
                                        }
                                    }
                                });
                            }
                        });
                    });
                }
            }


            //保存时批量处理差异分保(由选中状态切换为未选中时，清空数据)
            $scope.dealDifReinsAbcCheckedSave = function () {
                if ($scope.dangerUnitFacEnquiry.feoReinsReceiveList.length > 0) {
                    $.each($scope.dangerUnitFacEnquiry.feoReinsReceiveList, function (index, fac) {
                        if (fac.dif && fac.dif_) {
                            fac.dif = false;
                        } else {
                            fac.deductible = "";
                            fac.deductibleRate = ""
                            fac.dif = true;

                        }

                        if (fac.abc && fac.abc_) {
                            fac.abc = false;
                        } else {
                            fac.specialEngage = "";
                            fac.abc = true;

                        }

                        if ((fac.deductible === "" || fac.deductible === null) && (fac.deductibleRate === "")) {
                            // console.log("免赔内容全为空");
                            fac.dif = false;
                        } else {
                            fac.dif = true;
                        }

                        if (fac.specialEngage === "" || fac.specialEngage === null) {
                            // console.log("责任内容为空");
                            fac.abc = false;
                        } else {
                            fac.abc = true;
                        }
                    });
                }
            }

            //输入时检查比例超赔中接收人的分保费之和是否等于层信息的分保费
            $scope.checkLayerComPrmEqual = function () {
                $scope.errorFlagCheckLayer = [];
                if ($scope.dangerUnitFacEnquiry.feoXLayerList.length > 0) {
                    $.each($scope.dangerUnitFacEnquiry.feoXLayerList, function (index, layer) {
                        var sum = 0;
                        // console.log("checkRecepter");
                        if (layer.feoXReinsList.length > 0 && angular.isDefined(layer.feoXReinsList)) {
                            if ($scope.certiTypeCopy === '1' || $scope.certiTypeCopy === '2') {
                                $.each(layer.feoXReinsList, function (index, r) {
                                    sum += r.premium * 1;
                                });
                                sum = parseFloat(sum).toFixed(4);
                                // console.log(sum);
                                layer.layerrePreium = parseFloat(layer.layerrePreium).toFixed(4);
                                // console.log(layer.layerrePreium);
                                if (sum === layer.layerrePreium) {
                                    $scope.checkLayerComPrmEqualFlag = true;
                                } else {
                                    alert("层 " + layer.layerNo + " 的接收人分保费之和应该等于层信息中的层分保费！");
                                    $scope.checkLayerComPrmEqualFlag = false;
                                    $scope.errorFlagCheckLayer.push($scope.checkLayerComPrmEqualFlag);
                                    return false;
                                }
                            } else {
                                $.each(layer.feoXReinsList, function (index, r) {
                                    sum += r.chgPreium * 1;
                                });
                                sum = parseFloat(sum).toFixed(4);
                                // console.log(sum);
                                layer.layerReChgPrem = parseFloat(layer.layerReChgPrem).toFixed(4);
                                // console.log(layer.layerReChgPrem);
                                if (sum === layer.layerReChgPrem) {
                                    $scope.checkLayerComPrmEqualFlag = true;
                                } else {
                                    alert("层 " + layer.layerNo + " 的接收人分保费变化量之和应该等于层信息中的层分保费变化量！");
                                    $scope.checkLayerComPrmEqualFlag = false;
                                    $scope.errorFlagCheckLayer.push($scope.checkLayerComPrmEqualFlag);
                                    return false;
                                }
                            }
                        }
                    });
                    if ($scope.errorFlagCheckLayer.length > 0) {
                        $scope.checkLayerComPrmEqualFlag = false;
                    }
                }
            };

            //临分意向-保存
            $scope.saveFacEnquiry = function (facEnquiry, id) {
               for(var i=0;i<$scope.dangerUnitFacEnquiry.feoReinsReceiveList.length;i++) {
                    if($scope.dangerUnitFacEnquiry.feoReinsReceiveList[i].reinsType){
                        if($scope.dangerUnitFacEnquiry.feoReinsReceiveList[i].reinsCode === $scope.dangerUnitFacEnquiry.feoReinsReceiveList[i].finalReinsCodes.id){
                            alert('再保代理人/再保经纪人勾选，接受人/经纪人 和 最终接受人 不能相等');
                            return false;
                        }
                    }
                    if(!$scope.dangerUnitFacEnquiry.feoReinsReceiveList[i].reinsType){
                        if($scope.dangerUnitFacEnquiry.feoReinsReceiveList[i].reinsCode !== $scope.dangerUnitFacEnquiry.feoReinsReceiveList[i].finalReinsCodes.id){
                            alert('再保代理人/再保经纪人未勾选，接受人/经纪人 和 最终接受人 必须相等');
                            return false;
                        }
                    }
                }

                //输入时检查超赔接受人(接收人接受比例之和必须等于层信息的分出比例 否则接收人的接受比例报warning)
                $scope.checkRecepter(); //暂时注释掉
                // console.log("checkRecepterFlag " + $scope.checkRecepterFlag);

                if (!$scope.checkRecepterFlag) {
                    return;
                }

                //输入时检查比例超赔中的最终接收人接受比例之和是否等于接受比例
                /*$scope.checkRecepterDetail();
            	if(!$scope.checkRecepterDetailFlag){
            		return;
            	}*/

                //输入时检查比例超赔中接收人的分保费之和是否等于层信息的分保费
                $scope.checkLayerComPrmEqual();
                if (!$scope.checkLayerComPrmEqualFlag) {
                    return;
                }

                //输入时检查比例超赔中接收人的分保费是否等于缴费信息的分保费
                $scope.checkComPrmEqual();
                if (!$scope.checkComPrmEqualFlag) {
                    return;
                }

                //预处理超赔层币别是否一致
                $scope.dealNpropCurrency();
                if (!$scope.currencyFlag) {
                    return;
                }

                //预处理超赔层的分出份额是否大于100
                if (!$scope.fenchuFeneCheck) {
                    alert("超赔层的分出份额不能大于100！");
                    return;
                }

                //预处理比例中的差异分保(免赔-责任;true-false;1-0)
                $scope.dealDifReinsAbcToNum();

                //预处理比例超赔中的经纪人(true-false;"1"-"0")
                // $scope.dealBrokerToString();

                //预处理超赔中的接收人缴费信息
                $scope.dealNpropRecepter();

                $scope.keywords_ = {
                    certiNo: "",
                    certiType: "",
                    dangerNo: ""
                };

                $scope.keywords_.certiNo = $scope.certiNo;
                $scope.keywords_.certiType = $scope.certiTypeCopy;
                $scope.keywords_.dangerNo = $scope.dangerNo;

                $scope.feoXPlansFlag = 0;

                //当临分意向-超赔有层信息时，判断是否有接受人，并且是否有缴费信息
                if ($scope.dangerUnitFacEnquiry.feoXLayerList.length > 0) {
                    $.each($scope.dangerUnitFacEnquiry.feoXLayerList, function (index, layer) {
                        if (layer.feoXReinsList.length > 0 && angular.isDefined(layer.feoXReinsList)) {
                            $.each(layer.feoXReinsList, function (index, feoXReinss) {
                                if (angular.isDefined(feoXReinss.feoXPlans)) {
                                    if (feoXReinss.feoXPlans.length > 0) {
                                        $scope.feoXReinssFlag = 1;
                                        $scope.feoXPlansFlag = 1;
                                    }
                                }
                            });
                        }
                    });
                }

                //初始化错误变量
                $scope.error = {
                    flag: []
                };
                //1）比例录入接受人且验证通过且有生成的缴费信息,超赔不录入,可以进行保存
                //2）超赔录入接收人且验证通过且有生成的缴费信息,比例不录入,可以进行保存
                //反之，保存按钮不可用。或者弹出提示信息
                var saveFlag = "0";


                //回写edrno,edrappno
                $scope.dangerUnitFacEnquiry.edrNo = "";
                if ($scope.dangerUnitFacEnquiry.feoXLayerList.length > 0 && $scope.planNpropFlag === false) {
                    $.each($scope.dangerUnitFacEnquiry.feoXLayerList, function (index, layer) {
                        if (layer.feoXReinsList.length > 0 && angular.isDefined(layer.feoXReinsList)) {
                            $.each(layer.feoXReinsList, function (index, feoXReinss) {
                                if (angular.isDefined(feoXReinss.feoXPlanVos)) {
                                    if (feoXReinss.feoXPlanVos.length > 0 && ($scope.error.flag.length <= 0)) {
                                        $scope.feoXReinssFlag = 1;
                                        $scope.feoXPlansFlag = 1;
                                    } else {
                                        if ($scope.error.flag.length > 0) {
                                            return false;
                                        } else {
                                            alert("非比例的缴费信息没有生成,请先生成！");
                                            $scope.error.flag.push(true);
                                            return;
                                        }
                                    }
                                }
                            });
                        } else {
                            $scope.feoXReinssFlag === 2;
                        }

                    });
                    //全部遍历判断完接收人的缴费计划之后，再进行保存操作。
                    if ($scope.error.flag.length <= 0) {
                        if (saveFlag === "0") {
                            $scope.saveFacPlyInfo($scope.keywords_, $scope.dangerUnitFacEnquiry, $scope.global.user, "");
                            saveFlag = "1";
                        }
                    }
                }
                //结构置空调用保存方法
                // console.log("结构置空调用保存方法" + saveFlag != "1" && ($scope.error.flag.length <= 0));
                //进行赋值
                $.each($scope.dangerUnitFacEnquiry.feoReinsReceiveList,function(index,items) {
                    if(items.finalReinsCodes){
                        var finalReinsCodeTransfer = items.finalReinsCodes
                        items.finalReinsCode = finalReinsCodeTransfer.id
                        items.finalReinsName = finalReinsCodeTransfer.value
                        items.WithHoldFlag = finalReinsCodeTransfer.other1
                    }
                })
                console.log($scope.dangerUnitFacEnquiry.feoReinsReceiveList)
                //校验接受人管理
                $scope.signedLineTrue = true;
                var facShareListSum = [];
                var specialFacShareListSum = [];
                $.each($scope.dangerUnitFacEnquiry.feoReinsReceiveList,function(index,items){
                    if(items.facFlag == '1'){
                        facShareListSum.push(items.signedLine)
                    }
                    if(items.facFlag == '0'){
                        specialFacShareListSum.push(items.signedLine)
                    }
                });
                var facShareSumA = eval(facShareListSum.join('+')) //特约
                var specialFacShareSumB = eval(specialFacShareListSum.join('+')) //普通
                if(specialFacShareListSum.length > 0){
                    if(specialFacShareSumB != $scope.feoEnquiry.facShare){
                        $scope.signedLineTrue = false;
                        alert('普通临分与接受比例不相等')
                        return
                    }
                }
                if(facShareListSum.length > 0 ){
                    if(facShareSumA != $scope.feoEnquiry.specialFacShare){
                        $scope.signedLineTrue = false;
                        alert('特约临分与接受比例不相等')
                        return
                    }
                }

                // $.each($scope.dangerUnitFacEnquiry.feoReinsReceiveList,function(index,items){
                //     // 普通临分 facShare 特约临分specialFacShare
                //     if($scope.feoEnquiry.facFlag == '1'){
                //         if(items.facFlag == '0'){
                //             if(items.signedLine != $scope.feoEnquiry.facShare){
                //                 $scope.signedLineTrue = false;
                //                 alert('普通临分与接受比例不相等')
                //                 return
                //             }
                //         }
                //     }
                //     if($scope.feoEnquiry.specialFacFlag == '1'){
                //         if(items.facFlag == '1'){
                //             if(items.signedLine != $scope.feoEnquiry.specialFacShare){
                //                 $scope.signedLineTrue = false;
                //                 alert('特约临分与接受比例不相等')
                //                 return
                //             }
                //         }
                //     }
                // })
                if (id == '2') {
                    if($scope.feoEnquiry.verifyFlag != '0'){
                        alert('非暂存状态不可再次提交再保')
                        return
                    }
if($scope.signedLineTrue){
    $scope.saveFacEnquiryreinsurance($scope.keywords_, $scope.dangerUnitFacEnquiry, $scope.global.user)

}
                }
                if (id == "1") {
                    if (saveFlag != "1" && ($scope.error.flag.length <= 0)) {
                        // console.log($scope.feoEnquiry)
                        if(!$scope.dangerUnitFacEnquiry.feoEnquiry.facFlag){
                            $scope.dangerUnitFacEnquiry.feoEnquiry.facFlag='0';
                        }
                        if(!$scope.dangerUnitFacEnquiry.feoEnquiry.specialFacFlag){
                            $scope.dangerUnitFacEnquiry.feoEnquiry.specialFacFlag = '0';
                        }
                        if( $scope.signedLineTrue){
                            $scope.saveFacEnquiryDetail($scope.keywords_, $scope.dangerUnitFacEnquiry, $scope.global.user);
                        }
                    }
                }


                //预处理比例超赔的经纪人（"1"/"0" - true/false）
                $scope.dealBrokerToBoolean();

                //预处理比例接收人中的差异分包
                $scope.dealDifReinsAbcToBoolean();

                //批量处理差异分保(由选中状态切换为未选中时，清空数据)
                $scope.dealDifReinsAbcCheckedSave();

            }

            //临分意向--保存接口
            $scope.saveFacEnquiryDetail = function (certiType, facEnquiry, user, lan) {
                $scope.showBusy(true);
                riskunitService.saveFacEnquiry(certiType, facEnquiry, user, lan).then(
                    function (data) {
                        if (!angular.isDefined(data.msg)) {
                            alert("保存失败! " + data.msg);
                            $scope.showBusy(false);
                        } else {
                            alert("保存成功!");
                            $scope.reinsuranceTrue = false
                            $scope.planPropFlag = false;
                            $scope.planNpropFlag = false;
                            $scope.save.flag = true;
                            $scope.showBusy(false);
                            $scope.getFacEnquiryInfo($scope.certiTypeCopy, $scope.certiNo, $scope.dangerNo, $scope.global.user, {});
                            //$scope.$emit('notification', {message:'临分意向保存成功', delay:3000, type:'success'});
                        }
                    },
                    function (code) {
                        $scope.$emit('notification', {message: '临分意向保存失败', delay: 3000, type: 'error'});
                        $scope.showBusy(false);
                        throw(code);
                    }
                );
            };
            //临分意向--提交
            $scope.saveFacEnquiryreinsurance = function (certiType, facEnquiry, user, lan) {
                $scope.showBusy(true);
                riskunitService.saveFacEnquiryReinsurance(certiType, facEnquiry, user, lan).then(
                    function (data) {
                        if (angular.isDefined(data.msg)) {
                            alert("提交失败! " + data.msg);
                            $scope.showBusy(false);
                        } else {
                            alert("提交成功!");
                            $scope.planPropFlag = false;
                            $scope.planNpropFlag = false;
                            $scope.save.flag = true;
                            $scope.showBusy(false);
                            $scope.getFacEnquiryInfo($scope.certiTypeCopy, $scope.certiNo, $scope.dangerNo, $scope.global.user, {});

                            //$scope.$emit('notification', {message:'临分意向保存成功', delay:3000, type:'success'});
                        }
                    },
                    function (code) {
                        $scope.$emit('notification', {message: '临分意向保存失败', delay: 3000, type: 'error'});
                        $scope.showBusy(false);
                        throw(code);
                    }
                );
            };

            //增加分项时显示的分项标题
            var getSectionName = function () {
                if (angular.isUndefined($scope.dangerUnitFacEnquiry) || $scope.dangerUnitFacEnquiry === "") {
                    $scope.dangerUnitFacEnquiry = {
                        "feoReinsReceiveList": [],
                        "feoXLayerList": []
                    };
                }

                var section = $scope.dangerUnitFacEnquiry.feoXLayerList.length;
                section += 1;
                return section;

            };

            //增加层
            $scope.addLayer = function () {
                var _section = angular.copy(contractService.getElement("intention"));
                // console.log(_section);
                // console.log(_section.layerNo);
                _section.layerNo = getSectionName();
                // console.log(_section.layerNo);
                _section.feoXReinsList[0].layerNo = _section.layerNo;
                _section.feoXReinsList[0].delePFlag = true;
                if (angular.isUndefined($scope.dangerUnitFacEnquiry) || $scope.dangerUnitFacEnquiry === "") {
                    // console.log("增加接收 对象 undefined");
                    $scope.dangerUnitFacEnquiry = {
                        "feoReinsReceiveList": [],
                        "feoXLayerList": []
                    };
                }
                $scope.dangerUnitFacEnquiry.feoXLayerList.push(_section);
            }
            //删除层
            $scope.removeLayer = function (risiunit, $layer) {
                if (confirm('删除层' + $layer.layerNo + "吗？")) {
                    $.each(risiunit, function (index, layer) {
                        if ($layer === layer)
                            risiunit.splice(index, 1);
                    });
                    $scope.$emit('notification', {message: '层删除成功', delay: 3000, type: 'success'});
                }
            }

            //增加接收人(比例)
            $scope.addFeoReinsProp = function () {
                // enquiryFeoReinsProp
                var _feoReinsProp = angular.copy(contractService.getElement("enquiryFeoReinsProp"));
                if (angular.isUndefined($scope.dangerUnitFacEnquiry) || $scope.dangerUnitFacEnquiry === "") {
                    $scope.dangerUnitFacEnquiry = {
                        "feoReinsReceiveList": [],
                        "feoXLayerList": []
                    };
                }
                var _feoReinsProp = {
                    facFlag: '0',
                    vatRate:'6.000000'
                }
                // _feoReinsProp.isNewFlag = "1";
                $scope.dangerUnitFacEnquiry.feoReinsReceiveList.push(_feoReinsProp);
                $scope.feoXReinssFlag = 0;

                $scope.getDifReinsAbc(_feoReinsProp, 'dif');
                $scope.getDifReinsAbc(_feoReinsProp, 'abc');
            }

            //删除接收人（比例）
            $scope.removeRecepterProp = function (facPlyComShareVo) {
                if (confirm("确定要删除接收人?")) {
                    $.each($scope.dangerUnitFacEnquiry.feoReinsReceiveList, function (index, fac) {
                        if (fac === facPlyComShareVo) {
                            $scope.dangerUnitFacEnquiry.feoReinsReceiveList.splice(index, 1);
                        }
                    });
                    $scope.$emit('notification', {message: '接收人删除成功', delay: 3000, type: 'success'});
                }
                if ($scope.dangerUnitFacEnquiry.feoReinsReceiveList.length === 0) {
                    $scope.feoXReinssFlag = 1;
                } else {
                    $scope.feoXReinssFlag = 0;
                }

            }

            //增加最终接收人(比例)
            $scope.addFinalRecepterProp = function (facP) {
                var _section = angular.copy(contractService.getElement("intentionFinalRecepterProp"));
                _section.isNewFlag = "1";
                facP.facPlyFComShareVos.push(_section);
//                $scope.checkRecepterDetail1(contAttr,facP);
            }

            //输入时检查超赔层接受人(接收人接受比例之和必须等于层信息的分出比例 否则接收人的接受比例报warning)
            $scope.checkRecepter = function () {
                if ($scope.dangerUnitFacEnquiry.feoXLayerList.length > 0) {
                    $.each($scope.dangerUnitFacEnquiry.feoXLayerList, function (index, layer) {
                        var sum = 0.0;
                        // console.log("checkRecepter");
                        if (layer.feoXReinsList.length > 0 && angular.isDefined(layer.feoXReinsList)) {
                            $.each(layer.feoXReinsList, function (index, r) {
                                sum += r.shareRate * 1;
                            });
                            sum = parseFloat(sum).toFixed(4);
                            // console.log(sum);
                            layer.shareRate = parseFloat(layer.shareRate).toFixed(4);
                            // console.log(layer.shareRate);
                            if (sum === layer.shareRate) {
                                $scope.checkRecepterFlag = true;
                            } else {
                                alert("层 " + layer.layerNo + " 的接收人接受比例之和应该等于层信息中的分出份额！");
                                $scope.checkRecepterFlag = false;
                                return false;
                            }
                        }
                    });
                }
            };

            //预处理超赔层币别是否一致
            $scope.dealNpropCurrency = function () {
                //超赔接收人遍历
                if ($scope.dangerUnitFacEnquiry.feoXLayerList.length > 0 && $scope.facFlag.length <= 0) {
                    $scope.currencyCopy = "";
                    $scope.currencyArray = [];
                    $.each($scope.dangerUnitFacEnquiry.feoXLayerList, function (index, layer) {
                        if ($scope.currencyCopy === "") {
                            $scope.currencyCopy = layer.currency;
                            $scope.currencyFlag = true;
                        } else {
                            if ($scope.currencyArray.length <= 0) {
                                if ($scope.currencyCopy != layer.currency) {
                                    $scope.currencyFlag = false;
                                    $scope.currencyArray.push(false);
                                    return;
                                }
                            }
                        }
                    });
                    if ($scope.currencyArray.length > 0) {
                        $scope.currencyFlag = false;
                        alert("超赔层的币别不一致！");
                    }
                } else {
                    $scope.currencyFlag = true;
                }
            };

            //输入时检查接受人比例是否等于最终接收人接收比例之和
            $scope.checkRecepterDetail1 = function (contAttr, repeat) {
                var sum = 0.0;
                if (contAttr === 'prop' && repeat.brokerFlag === true && repeat.facPlyFComShareVos.length > 0) {
                    $.each(repeat.facPlyFComShareVos, function (index, r) {
                        sum += r.facFComShareRate;
                    });
                    if (sum === repeat.facComProp && repeat.brokerFlag === true) {
                        repeat.warning = false;
                    } else {
                        repeat.warning = true;
                    }
                }
            };

            //输入时检查接受人最终接收人
            $scope.checkRecepterDetail = function () {
                var sum = 0.0;

                //比例接收人遍历
                $scope.facFlag = [];
                if ($scope.dangerUnitFacEnquiry.feoReinsReceiveList.length > 0) {
                    $.each($scope.dangerUnitFacEnquiry.feoReinsReceiveList, function (index, recepter) {

                        sum = 0.0;
                        reinsCode = recepter.reinsCode.split("-")[0];
                        facVatRate = recepter.vatRate;
                        facAddVatRate = recepter.addVatRate;
                        if ($scope.dangerUnitFacEnquiry.taxFree === '1' && (facVatRate !== 0 || facAddVatRate !== 0)) {
                            alert("免税条件下，接受人 " + reinsCode + " 的增值税率、附加税率应录为 0 ！");
                            $scope.checkRecepterDetailFlag = false;
                            $scope.facFlag.push($scope.checkRecepterDetailFlag);
                            return;
                        }

                        finalReinsCode = recepter.finalReinsCode;
                        finalReinsCode = finalReinsCode.split("-")[0];
                        locationFlag = finalReinsCode.substr(finalReinsCode.length - 1, 1);
                        if ($scope.dangerUnitFacEnquiry.taxFree === '0' && locationFlag === "2" && facVatRate === 0 && facAddVatRate === 0) {
                            alert(finalReinsCode + " 为境外最终接受人，请修改增值税率、附加税率，使其不为  0");
                        }

                    });
                    if ($scope.facFlag.length > 0) {
                        $scope.checkRecepterDetailFlag = false;
                    }
                }

                sum = 0.0;
                //超赔接收人遍历
                if ($scope.dangerUnitFacEnquiry.feoXLayerList.length > 0 && $scope.facFlag.length <= 0) {
                    $scope.layerArray = [];
                    $.each($scope.dangerUnitFacEnquiry.feoXLayerList, function (index, layer) {
                        if (angular.isDefined(layer.feoXReinsList)) {
                            if (layer.feoXReinsList.length > 0) {
                                $.each(layer.feoXReinsList, function (index, recepter) {
                                    sum = 0.0;
                                    facRiComCde = recepter.facRiComCde.split("-")[0];
                                    facComVat = recepter.facComVat;
                                    facComCityTax = recepter.facComCityTax;
                                    facComEducationTax = recepter.facComEducationTax;
                                    if ($scope.dangerUnitFacEnquiry.taxFree === '1' && (facComVat !== 0 || facComCityTax !== 0 || facComEducationTax !== 0)) {
                                        alert("免税条件下，接受人 " + facRiComCde + " 的增值税率、城建税率、教育费附加税率应录为 0 ！");
                                        $scope.checkRecepterDetailFlag = false;
                                        $scope.facFlag.push($scope.checkRecepterDetailFlag);
                                        return;
                                    }
                                    if (recepter.brokerFlag && recepter.feoXFReinsVos.length > 0) {
                                        $.each(recepter.feoXFReinsVos, function (index, r) {
                                            sum += r.shareRate * 1;

                                            facRiFComCde = r.freinsCode;
                                            fComCode = facRiFComCde.split("-")[0];
                                            locationFlag = facRiFComCde.substr(facRiFComCde.length - 1, 1);
                                            if ($scope.dangerUnitFacEnquiry.taxFree === '0' && locationFlag === "2" && facComCityTax === 0 && facComEducationTax === 0) {
                                                alert(fComCode + " 为境外最终接受人，请修改经纪人 " + facRiComCde + " 的城建税率、教育费附加税率，使其不为  0");
                                            }
                                        });
                                        sum = parseFloat(sum).toFixed(4);
                                        // console.log(sum);
                                        recepter.shareRate = parseFloat(recepter.shareRate).toFixed(4);
                                        // console.log(recepter.shareRate);
                                        // console.log(sum === recepter.shareRate);
                                        if (sum === recepter.shareRate) {
                                            $scope.checkRecepterDetailFlag = true;
                                        } else {
                                            if ($scope.layerArray.length <= 0) {
                                                alert("超赔的最终接收人接受比例之和必须等于接受人的接受比例！");
                                                $scope.checkRecepterDetailFlag = false;
                                                $scope.layerArray.push(false);
                                                return;
                                            }
                                        }
                                    }
                                    if (recepter.brokerFlag && recepter.feoXFReinsVos.length <= 0) {
                                        if ($scope.layerArray.length <= 0) {
                                            alert("超赔的接收人为经纪人时必须录入最终接收人信息！");
                                            $scope.checkRecepterDetailFlag = false;
                                            $scope.layerArray.push(false);
                                            return;
                                        }
                                    } else {
                                        $scope.checkRecepterDetailFlag = true;
                                    }
                                });
                            }
                        }
                    });
                    if ($scope.layerArray.length > 0) {
                        $scope.checkRecepterDetailFlag = false;
                    }
                }
            };

            //输入时检查比例超赔中的分保费是否等于缴费信息的分保费
            $scope.checkComPrmEqual = function () {
                //比例接收人遍历
                $scope.facFlag = [];

                //超赔接收人遍历
                if ($scope.dangerUnitFacEnquiry.feoXLayerList.length > 0 && $scope.facFlag.length <= 0) {
                    $scope.layerFlag = [];
                    $.each($scope.dangerUnitFacEnquiry.feoXLayerList, function (index, layer) {
                        var endorType = $scope.dangerUnitFacEnquiry.endorType;
                        if (endorType !== "2005") {
                            if (layer.feoXReinsList.length > 0 && angular.isDefined(layer.feoXReinsList)) {
                                $.each(layer.feoXReinsList, function (index, recepter) {
                                    if (angular.isDefined(recepter.feoXPlanVos)) {
                                        if (recepter.feoXPlanVos.length > 0) {
                                            var sum = 0;
                                            $.each(recepter.feoXPlanVos, function (index, p) {
                                                if (recepter.feoXPlanVos.length > 1) {
                                                    sum += p.facComPrm * 1;
                                                } else {
                                                    p.facComPrm = parseFloat(p.facComPrm).toFixed(2);
                                                    if ($scope.certiTypeCopy === "1" || $scope.certiTypeCopy === '2') {
                                                        recepter.premium = parseFloat(recepter.premium).toFixed(2);
                                                        if (p.facComPrm === recepter.premium) {
                                                            $scope.checkComPrmEqualFlag = true;
                                                        } else {
                                                            alert("超赔层 " + layer.layerNo + "超赔接收人 " + recepter.facRiComCde + " 的缴费计划的分保费必须等于其分保费，请重新生成！");
                                                            $scope.checkComPrmEqualFlag = false;
                                                            $scope.layerFlag.push($scope.checkComPrmEqualFlag);
                                                            return;
                                                        }
                                                    } else {
                                                        recepter.chgPreium = parseFloat(recepter.chgPreium).toFixed(2);
                                                        if (p.facComPrm === recepter.chgPreium) {
                                                            $scope.checkComPrmEqualFlag = true;
                                                        } else {
                                                            alert("超赔层 " + layer.layerNo + "超赔接收人 " + recepter.facRiComCde + " 的缴费计划的分保费变化量必须等于其分保费变化量，请重新生成！");
                                                            $scope.checkComPrmEqualFlag = false;
                                                            $scope.layerFlag.push($scope.checkComPrmEqualFlag);
                                                            return;
                                                        }
                                                    }
                                                }
                                            });
                                            if (recepter.feoXPlanVos.length > 1) {
                                                sum = parseFloat(sum).toFixed(2);
                                                if ($scope.certiTypeCopy === '1' || $scope.certiTypeCopy === '2') {
                                                    recepter.premium = parseFloat(recepter.premium).toFixed(2);
                                                    if (sum * 1 === recepter.premium * 1) {
                                                        $scope.checkComPrmEqualFlag = true;
                                                    } else {
                                                        alert("超赔层 " + layer.layerNo + "超赔接收人 " + recepter.facRiComCde + " 的缴费计划的分保费之和必须等于其分保费，请重新生成！");
                                                        $scope.checkComPrmEqualFlag = false;
                                                        $scope.layerFlag.push($scope.checkComPrmEqualFlag);
                                                        return;
                                                    }
                                                } else {
                                                    recepter.chgPreium = parseFloat(recepter.chgPreium).toFixed(2);
                                                    if (sum * 1 === recepter.chgPreium * 1) {
                                                        $scope.checkComPrmEqualFlag = true;
                                                    } else {
                                                        alert("超赔层 " + layer.layerNo + "超赔接收人 " + recepter.facRiComCde + " 的缴费计划的分保费变化量之和必须等于其分保费变化量，请重新生成！");
                                                        $scope.checkComPrmEqualFlag = false;
                                                        $scope.layerFlag.push($scope.checkComPrmEqualFlag);
                                                        return;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        }

                    });
                    if ($scope.layerFlag.length > 0) {
                        $scope.checkComPrmEqualFlag = false;
                    }
                }
            };


            //删除最终接收人（比例）
            $scope.removeFinalRecepterProp = function (facP, facvo) {
                if (confirm("确定要删除最终接收人?")) {
                    $.each(facP, function (index, fac) {
                        if (fac === facvo) {
                            facP.splice(index, 1);
                        }
                    });
                    $scope.$emit('notification', {message: '最终接收人删除成功', delay: 3000, type: 'success'});
                }
            }

            //生成缴费计划（比例）
            $scope.addPlanProp = function (param, facPlyPays) {
                //输入时检查比例超赔中的最终接收人接受比例之和是否等于接受比例
                $scope.checkRecepterDetail();
                if (!$scope.checkRecepterDetailFlag) {
                    return;
                }
                $scope.planPropFlag = true;
                $scope.facPlyComShareVo = facPlyPays;


                // console.log("addPlanProp");
                // console.log($scope.certiType);
                // console.log(facPlyPays);
                $scope.planKeywords.certiType = $scope.certiType;
                $scope.planKeywords.certiNo = $scope.certiNo;

                if (param != "") {
                    if (confirm("确认要生成缴费计划吗？")) {
                        $scope.getFacPayment("prop", $scope.planKeywords, facPlyPays, "", "", "");
                    }
                } else {
                    $scope.getFacPayment("prop", $scope.planKeywords, facPlyPays, "", "", "");
                }
            }

            //增加接收人(非比例)
            $scope.addRecepterNprop = function (layer) {
                var _section = angular.copy(contractService.getElement("intentionRecepterNprop"));
                _section.layerNo = layer.layerNo;
//                if(layer.feoXReinsList.length>0){
//                	$.each(layer.feoXReinsList, function(index, feo){
//                		if(feo.facRiComCde != "") {
//	                		feo.delePFlag = false;
//                		} else {
//                			feo.delePFlag = true;
//                		}
//                	});
//                }
//                _section.delePFlag = true;
                _section.isNewFlag = "1";
                layer.feoXReinsList.push(_section);
                $scope.feoXReinssFlag = 0;
                //$scope.chushihua1(facComAmt,riskUnitAmt,faccomSharerate);
                //$scope.chushihua2(rate,facComAmt,facComPrm,prm,faccomSharerate);
            }

            //删除接收人（非比例）
            $scope.removeRecepterNprop = function (facP, facvo) {
                if (confirm("确定要删除接收人?")) {
                    $.each(facP.feoXReinsList, function (index, fac) {
                        if (fac === facvo) {
                            facP.feoXReinsList.splice(index, 1);
                        }
                    });
                    $scope.$emit('notification', {message: '接收人删除成功', delay: 3000, type: 'success'});
                }
                // console.log("删除接收人（非比例）--" + facP.feoXReinsList.length);
                if (facP.feoXReinsList.length === 0) {
                    $scope.feoXReinssFlag = 1;
                    $scope.facPlyComShareVoNprop = {
                        "feoXPlans": []
                    }
                } else {
                    $scope.feoXReinssFlag = 0;
                }
            }

            //增加最终接收人(非比例)
            $scope.addFinalRecepterNprop = function (recepter) {
                var _section = angular.copy(contractService.getElement("intentionFinalRecepterNprop"));
                _section.layerNo = recepter.layerNo;
//                if(recepter.feoXFReinsVos.length>0){
//                	$.each(recepter.feoXFReinsVos, function(index, feoF){
//                		if(feoF.freinsCode != ""){
//                			feoF.delePFlag = false;
//                		} else {
//                			feoF.delePFlag = true;
//                		}
//                	});
//                }
//                _section.delePFlag = true;
                _section.isNewFlag = "1";
                recepter.feoXFReinsVos.push(_section);
                //$scope.checkRecepterDetail("nprop", recepter);
            }

            //删除最终接收人（非比例）
            $scope.removeFinalRecepterNprop = function (facP, facvo) {
                if (confirm("确定要删除最终接收人?")) {
                    $.each(facP, function (index, fac) {
                        if (fac === facvo) {
                            facP.splice(index, 1);
                        }
                    });
                    $scope.$emit('notification', {message: '最终接收人删除成功', delay: 3000, type: 'success'});
                }
            }

            //生成缴费计划（非比例）
            $scope.addPlanNprop = function (facPlyPays, layerNo) {
                //输入时检查超赔接受人(接收人接受比例之和必须等于层信息的分出比例 否则接收人的接受比例报warning)
                $scope.checkRecepter();
                // console.log("checkRecepterFlag " + $scope.checkRecepterFlag);

                if (!$scope.checkRecepterFlag) {
                    return;
                }
                $scope.checkRecepterDetail();
                if (!$scope.checkRecepterDetailFlag) {
                    return;
                }
                // console.log("addPlanNprop");
                // console.log($scope.certiType);
                $scope.planNpropFlag = true;
                $scope.planKeywords.certiType = $scope.certiTypeCopy;
                $scope.planKeywords.certiNo = $scope.certiNo;
                //console.log(facPlyPays.feoXPlans);

                $scope.getFacPayment("nprop", $scope.planKeywords, facPlyPays, layerNo, "", "");
            }

            //预处理临分意向的缴费信息
            $scope.dealGetFacPayment = function () {
                //初始化比例超赔的缴费计划变量
                /*$scope.feoReinsReceiveListProp = {
                    feoReinsReceiveList : []
	           	};*/

                $scope.LayersNprop = {
                    feoXLayerList: []
                };

                //初始化超赔的缴费计划信息
                if ($scope.dangerUnitFacEnquiry.feoXLayerList.length > 0) {
                    $.each($scope.dangerUnitFacEnquiry.feoXLayerList, function (index, layer) {
                        $scope.LayersNprop.feoXLayerList.push(layer);
                        if ($scope.certiTypeCopy === "3" || $scope.certiTypeCopy === "4") {
                            if (layer.feoXReinsList.length > 0) {
                                $.each(layer.feoXReinsList, function (index, recepter) {
                                    recepter.delePFlag = false;
                                    if (recepter.feoXFReinsVos.length > 0) {
                                        $.each(recepter.feoXFReinsVos, function (index, r) {
                                            r.delePFlag = false;
                                        });
                                    }
                                });
                            }
                        }
                    });

                    $scope.tabsNprop = $scope.LayersNprop.feoXLayerList;
                }
                ;

                //初始化比例的缴费计划信息
                /*if($scope.dangerUnitFacEnquiry.feoReinsReceiveList.length>0) {
           			$.each($scope.dangerUnitFacEnquiry.feoReinsReceiveList, function(index, feo){
                           $scope.feoReinsReceiveListProp.feoReinsReceiveList.push(feo);
                           if($scope.certiTypeCopy === "3" ||　$scope.certiTypeCopy === "4") {
                           		if(feo.facPlyFComShareVos.length > 0){
				            		$.each(feo.facPlyFComShareVos, function(index, r){
										r.delePFlag = false;
				            		});
			            		}
						   }
           			});
                    $scope.tabs = $scope.feoReinsReceiveListProp.feoReinsReceiveList;
             	}*/

            }

            //临分意向--生成缴费计划
            $scope.getFacPayment = function (contAttr, certiType, facPlyInfo, layerNo, user, lan) {

                //预处理差异分保
                $scope.dealDifReinsAbcToNum();

                $scope.showBusy(true);
                riskunitService.getFacPayment(contAttr, certiType, facPlyInfo, layerNo, user, lan).then(
                    function (data) {
                        if (angular.isUndefined(data.result)) {
                            if (contAttr === "nprop") {
                                //取到当前层的结构，并且将后台返回缴费信息重写当前层的缴费信息
                                $.each(facPlyInfo.feoXLayerList, function (index, layer) {
                                    if (layer.layerNo === layerNo) {
                                        $.each(layer.feoXReinsList, function (index, f) {
                                            $scope.feoXReinss_ = {
                                                feoXPlans: []
                                            };
                                            $.each(data, function (index, r) {
                                                if (f.facRiComCde === r.riComCde) {
                                                    if ($scope.feoXReinss_.feoXPlans.length > 0) {
                                                        f.feoXPlanVos.push(r);
                                                    } else {
                                                        $scope.feoXReinss_.feoXPlans.push(r);
                                                        f.feoXPlanVos = [];
                                                        f.feoXPlanVos.push(r);
                                                    }
                                                }
                                            });
                                        });
                                    }
                                });
                            } else {
                                //取到比例临分的结构，并且将后台返回缴费信息重写当前比例临分的缴费信息
                                $.each(facPlyInfo.feoReinsReceiveList, function (index, r) {
                                    $scope.r_ = {
                                        facPlyPays: []
                                    }
                                    $.each(data, function (index, d) {
                                        if (r.facRiComCde === d.riComCde) {
                                            // console.log(d.riComCde);
                                            if ($scope.r_.facPlyPays.length > 0) {
                                                r.facPlyPays.push(d);
                                            } else {
                                                r.facPlyPays = [];
                                                $scope.r_.facPlyPays.push(d);
                                                r.facPlyPays.push(d);
                                            }
                                        }
                                    });
                                });
                            }

                            //停止加载进度条
                            $scope.showBusy(false);
                            //预处理缴费信息
                            $scope.dealGetFacPayment();

                            //处理差异分保信息
                            $scope.dealDifReinsAbcToBoolean();

                            //批量处理差异分保(由选中状态切换为未选中时，清空数据)
                            $scope.dealDifReinsAbcCheckedSave();

                        } else {
                            //停止加载进度条
                            $scope.showBusy(false);
                            alert("生成失败！ " + data.msg);
                        }
                    },
                    function (code) {
                        throw(code);
                    }
                );
            };


            //是否进行单条查看分保试算标志
            var reinShareFlag = true;
            /**
             * 转换boolean类型的值
             */
            var transformBooleanToBool = function (data) {
                if (data === "1" || data === 1) {
                    data = true;
                } else {
                    data = false;
                }
                return data;
            }
            var transformBooleanToNum = function (data) {
                if (data === true || data === "true") {
                    data = "1";
                } else {
                    data = "0";
                }
                return data;
            }

            /**
             * 判断保额保费输入值是否大于所给值 前台控制
             * ----start----
             */
            var prepareData = function (data) {//准备数据阶段
                var sum1 = 0;
                var sum2 = 0;
                var sum3 = 0;
                var sum4 = 0;
                $.each(data, function (index, dangerUnit) {
                    dangerUnit._temp = {
                        sumDangerUnitAmt: 0,
                        sumPrm: 0,
                        sumExTaxPremium: 0,
                        sumTax: 0,
                        warning: false,
                        copyUnitAmt: 0,
                        copyPrm: 0,
                        sumAmtEdr: 0,//批单页面初始保额值
                        sumPrmEdr: 0,//批单页面初始保费值
                        sumExTaxPremiumEdr: 0,
                        sumTaxEdr: 0,
                        sumPrmEdrMain2: 0
                    };
                    sum1 += dangerUnit.amount;//保额和
                    sum2 += dangerUnit.premium;//保费和
                    sum3 += dangerUnit.noTaxPremium;
                    sum4 += dangerUnit.taxFee;
                    dangerUnit._temp.copyUnitAmt = dangerUnit.amount;
                    dangerUnit._temp.copyPrm = dangerUnit.premium;
                    //批单初始值
                    /*$.each(dangerUnit.riskItems,function(index,riskItems){
                        var b = riskItems.calculateFlag === 'Y'? 1 : 0;//是否参与计算
                        dangerUnit._temp.sumAmtEdr += b*riskItems.amount;

                        dangerUnit._temp.sumPrmEdr += riskItems.premium;
                        dangerUnit._temp.sumExTaxPremiumEdr += riskItems.exTaxPremium;
                        dangerUnit._temp.sumTaxEdr += riskItems.tax;
                    });*/
                    //sum2 = sum2-riskunit._temp.sumPrmEdrMain2; //初始化总保费时，过滤掉恐怖险的保费
                });
                $.each(data, function (index, _data) {
                    _data._temp.sumDangerUnitAmt = sum1;
                    _data._temp.sumPrm = sum2;
                    _data._temp.sumExTaxPremium = sum3;
                    _data._temp.sumTax = sum4;
                });
                return data;
            };

            //页面输入计算公式
            $scope.updateRiskUnit = function (_riskunit, _source) {
                //自留比例初始化
                $scope._riskunit = _riskunit;
                switch (_source) {
                    case('fstSurplusAmt'):
                        if (isNaN(_riskunit.fstSurplusAmt)) {
                            _riskunit.fstSurplusAmt = 0.00;
                        }
                        _riskunit.allFstSurplusAmt = _riskunit.fstSurplusAmt / _riskunit.ourRate;
                        break;
                    case('openCoverAmt'):
                        if (isNaN(_riskunit.openCoverAmt)) {
                            _riskunit.openCoverAmt = 0.00;
                        }
                        _riskunit.allOpenCoverAmt = _riskunit.openCoverAmt / _riskunit.ourRate;

                        break;
                    case('allFstSurplusAmt'):
                        if (isNaN(_riskunit.allFstSurplusAmt)) {
                            _riskunit.allFstSurplusAmt = 0.00;
                        }
                        _riskunit.fstSurplusAmt = _riskunit.allFstSurplusAmt * _riskunit.ourRate;

                        break;
                    case('allOpenCoverAmt'):
                        if (isNaN(_riskunit.allOpenCoverAmt)) {
                            _riskunit.allOpenCoverAmt = 0.00;
                        }
                        _riskunit.openCoverAmt = _riskunit.allOpenCoverAmt * _riskunit.ourRate;

                        break;
                    case('allRiskKeepAmt'):

                        //var proportion = parseFloat((_riskunit.allRiskKeepAmt * _riskunit.ourRate / _riskunit.riskUnitAmt*100).toFixed(4));
                        var proportion = parseFloat((_riskunit.allRiskKeepAmt / _riskunit.allRiskUnitAmt * 100).toFixed(10));
                        if (proportion > 100) {
                            _riskunit.allRetentProp = 100;
                        }
                        else {
                            _riskunit.allRetentProp = proportion;
                        }

                        _riskunit.riskKeepAmt = _riskunit.allRiskKeepAmt * _riskunit.ourRate;
                        _riskunit.retentProp = parseFloat(_riskunit.allRetentProp.toFixed(10));
                        //华泰自留额改变时，通过条件判断，算出溢额限额，预约限额
                        if (_riskunit.allRiskKeepAmt >= $scope.riskLvls[0].overBaseValue) {
                            _riskunit.fstSurplusAmt = _riskunit.riskUnitAmt;
                            _riskunit.allFstSurplusAmt = _riskunit.fstSurplusAmt / _riskunit.ourRate;
                        } else {
                            _riskunit.fstSurplusAmt = 0;
                            _riskunit.allFstSurplusAmt = _riskunit.fstSurplusAmt / _riskunit.ourRate;
                        }
                        if (_riskunit.allRiskKeepAmt >= $scope.riskLvls[0].openCoveBaseValue) {
                            _riskunit.openCoverAmt = _riskunit.riskUnitAmt;
                            _riskunit.allOpenCoverAmt = _riskunit.openCoverAmt / _riskunit.ourRate;
                        } else {
                            _riskunit.openCoverAmt = 0;
                            _riskunit.allOpenCoverAmt = _riskunit.openCoverAmt / _riskunit.ourRate;
                        }

                        break;
                    case('riskKeepAmt'):

                        var proportion = parseFloat((_riskunit.riskKeepAmt / _riskunit.riskUnitAmt * 100).toFixed(10));
                        if (proportion > 100) {
                            _riskunit.retentProp = 100;
                        }
                        else {
                            _riskunit.retentProp = proportion;
                        }

                        _riskunit.allRiskKeepAmt = _riskunit.riskKeepAmt / _riskunit.ourRate;
                        _riskunit.allRetentProp = parseFloat(_riskunit.retentProp.toFixed(10));
                        //华泰自留额改变时，通过条件判断，算出溢额限额，预约限额
                        // if (_riskunit.allRiskKeepAmt >= $scope.riskLvls[0].overBaseValue) {
                        //     _riskunit.fstSurplusAmt = _riskunit.riskUnitAmt;
                        //     _riskunit.allFstSurplusAmt = _riskunit.fstSurplusAmt / _riskunit.ourRate;
                        // } else {
                        //     _riskunit.fstSurplusAmt = 0;
                        //     _riskunit.allFstSurplusAmt = _riskunit.fstSurplusAmt / _riskunit.ourRate;
                        // }
                        // if (_riskunit.allRiskKeepAmt >= $scope.riskLvls[0].openCoveBaseValue) {
                        //     _riskunit.openCoverAmt = _riskunit.riskUnitAmt;
                        //     _riskunit.allOpenCoverAmt = _riskunit.openCoverAmt / _riskunit.ourRate;
                        // } else {
                        //     _riskunit.openCoverAmt = 0;
                        //     _riskunit.allOpenCoverAmt = _riskunit.openCoverAmt / _riskunit.ourRate;
                        // }

                        break;
                    case('allRetentProp'):
                        if ($scope.certiType === "1") {
//                            if($scope.riskKeepAmtContant > _riskunit.riskUnitAmt){
//                                _riskunit.riskKeepAmt = _riskunit.riskUnitAmt;
//                            }
                            _riskunit.allRiskKeepAmt = Math.round(_riskunit.allRiskUnitAmt * _riskunit.allRetentProp / 100);
                            //_riskunit.allRetentProp = parseFloat((_riskunit.allRiskKeepAmt / _riskunit.allRiskUnitAmt*100).toFixed(4));
                        }
                        if ($scope.certiType === "3") {
                            _riskunit.allRiskKeepAmt = Math.round(_riskunit.allRiskUnitAmt * _riskunit.allRetentProp / 100);
                            //_riskunit.allRetentProp = parseFloat((_riskunit.allRiskKeepAmt / _riskunit.allRiskUnitAmt*100).toFixed(4));
//                            _riskunit.amtChg = Math.abs(_riskunit.riskUnitAmt - _riskunit.amtOri);
//                            _riskunit.premChg = Math.abs(_riskunit.prm - _riskunit.premOri);
                            _riskunit.amtChg = (_riskunit.riskUnitAmt - _riskunit.amtOri);
                            _riskunit.premChg = (_riskunit.prm - _riskunit.premOri);
                        }

                        _riskunit.riskKeepAmt = _riskunit.allRiskKeepAmt * _riskunit.ourRate;
                        _riskunit.retentProp = parseFloat(_riskunit.allRetentProp.toFixed(10));
                        if (_riskunit.retentProp > 100) {
                            _riskunit.retentProp = 100;
                        }
                        //华泰自留额改变时，通过条件判断，算出溢额限额，预约限额
                        if (_riskunit.allRiskKeepAmt >= $scope.riskLvls[0].overBaseValue) {
                            _riskunit.fstSurplusAmt = _riskunit.riskUnitAmt;
                            _riskunit.allFstSurplusAmt = _riskunit.fstSurplusAmt / _riskunit.ourRate;
                        } else {
                            _riskunit.fstSurplusAmt = 0;
                            _riskunit.allFstSurplusAmt = _riskunit.fstSurplusAmt / _riskunit.ourRate;
                        }
                        if (_riskunit.allRiskKeepAmt >= $scope.riskLvls[0].openCoveBaseValue) {
                            _riskunit.openCoverAmt = _riskunit.riskUnitAmt;
                            _riskunit.allOpenCoverAmt = _riskunit.openCoverAmt / _riskunit.ourRate;
                        } else {
                            _riskunit.openCoverAmt = 0;
                            _riskunit.allOpenCoverAmt = _riskunit.openCoverAmt / _riskunit.ourRate;
                        }

                        break;
                    case('retentProp'):
                        if ($scope.certiType === "1") {
//                            if($scope.riskKeepAmtContant > _riskunit.riskUnitAmt){
//                                _riskunit.riskKeepAmt = _riskunit.riskUnitAmt;
//                            }
                            _riskunit.riskKeepAmt = Math.round(_riskunit.riskUnitAmt * _riskunit.retentProp) / 100;
                            _riskunit.allRiskKeepAmt = _riskunit.riskKeepAmt / _riskunit.ourRate;
                            _riskunit.allRetentProp = parseFloat(_riskunit.retentProp.toFixed(10));
                            if (_riskunit.allRetentProp > 100) {
                                _riskunit.allRetentProp = 100;
                            }
                        }
                        if ($scope.certiType === "3") {
                            _riskunit.riskKeepAmt = Math.round(_riskunit.riskUnitAmt * _riskunit.retentProp) / 100;
                            _riskunit.allRiskKeepAmt = _riskunit.riskKeepAmt / _riskunit.ourRate;
                            _riskunit.allRetentProp = parseFloat(_riskunit.retentProp.toFixed(10));
                            if (_riskunit.allRetentProp > 100) {
                                _riskunit.allRetentProp = 100;
                            }
//                            _riskunit.amtChg = Math.abs(_riskunit.riskUnitAmt - _riskunit.amtOri);
//                            _riskunit.premChg = Math.abs(_riskunit.prm - _riskunit.premOri);
                            _riskunit.amtChg = (_riskunit.riskUnitAmt - _riskunit.amtOri);
                            _riskunit.premChg = (_riskunit.prm - _riskunit.premOri);
                        }

                        //华泰自留额改变时，通过条件判断，算出溢额限额，预约限额
                        if (_riskunit.allRiskKeepAmt >= $scope.riskLvls[0].overBaseValue) {
                            _riskunit.fstSurplusAmt = _riskunit.riskUnitAmt;
                            _riskunit.allFstSurplusAmt = _riskunit.fstSurplusAmt / _riskunit.ourRate;
                        } else {
                            _riskunit.fstSurplusAmt = 0;
                            _riskunit.allFstSurplusAmt = _riskunit.fstSurplusAmt / _riskunit.ourRate;
                        }
                        if (_riskunit.allRiskKeepAmt >= $scope.riskLvls[0].openCoveBaseValue) {
                            _riskunit.openCoverAmt = _riskunit.riskUnitAmt;
                            _riskunit.allOpenCoverAmt = _riskunit.openCoverAmt / _riskunit.ourRate;
                        } else {
                            _riskunit.openCoverAmt = 0;
                            _riskunit.allOpenCoverAmt = _riskunit.openCoverAmt / _riskunit.ourRate;
                        }

                        break;
                    case('amtRate'):
                        if ($scope.certiType === "1") {
                            if ($scope.RU.dangerUnitList.length > 0) {
                                // console.log("总保额为： " + $scope.riskUnitAmtAccount);
                                // console.log("总保费为： " + $scope.prmAccount);
                                _riskunit.riskUnitAmt = $scope.riskUnitAmtAccount * _riskunit.amtRate / 100;
                                //通过保额，共保比例算出华泰保额
                                _riskunit.allRiskUnitAmt = _riskunit.riskUnitAmt / _riskunit.ourRate;

                                _riskunit.prm = $scope.prmAccount * _riskunit.amtRate / 100;
                                _riskunit.exTaxPremium = $scope.exTaxPrmAccount * _riskunit.amtRate / 100;
                                _riskunit.tax = $scope.taxAccount * _riskunit.amtRate / 100;
                                _riskunit.fstSurplusAmt = _riskunit.riskUnitAmt;
                                _riskunit.openCoverAmt = _riskunit.riskUnitAmt;
                            }
                        }
                        if ($scope.certiType === "3") {
                            var oriRiskUnit = [];
                            oriRiskUnit = $scope.copyData;//复制页面刚加载数据，对比占比值是否修改
                            var riskUnitNo = _riskunit.riskUnitNo;
                            --riskUnitNo;
                            if (oriRiskUnit.length > _riskunit.riskUnitNo || oriRiskUnit.length === _riskunit.riskUnitNo) {
                                //因集合元素下标从0开始比危险单位序号少1故if判断要先把危险单位序号减1,仅仅便于取值
                                if (oriRiskUnit[riskUnitNo].amtRate !== _riskunit.amtRate) {
                                    _riskunit.riskUnitAmt = _riskunit._temp.sumAmtEdr * _riskunit.amtRate / 100;
                                    //通过保额，共保比例算出华泰保额
                                    _riskunit.allRiskUnitAmt = _riskunit.riskUnitAmt / _riskunit.ourRate;

                                    _riskunit.prm = _riskunit._temp.sumPrmEdr * _riskunit.amtRate / 100;
                                    _riskunit.exTaxPremium = _riskunit._temp.sumExTaxPremiumEdr * _riskunit.amtRate / 100;
                                    _riskunit.tax = _riskunit._temp.sumTaxEdr * _riskunit.amtRate / 100;
                                    //                            _riskunit.amtChg = Math.abs(_riskunit.riskUnitAmt - _riskunit.amtOri);
                                    //                            _riskunit.premChg = Math.abs(_riskunit.prm - _riskunit.premOri);
                                    _riskunit.amtChg = _riskunit.riskUnitAmt - _riskunit.amtOri;
                                    _riskunit.premChg = _riskunit.prm - _riskunit.premOri;
                                    _riskunit.exTaxPremiumChg = _riskunit.exTaxPremium - _riskunit.exTaxPremiumOri;
                                    _riskunit.taxChg = _riskunit.tax - _riskunit.taxOri;
                                    _riskunit.fstSurplusAmt = _riskunit.riskUnitAmt;
                                    _riskunit.openCoverAmt = _riskunit.riskUnitAmt;
                                }
                            } else {
                                _riskunit.riskUnitAmt = _riskunit._temp.sumAmtEdr * _riskunit.amtRate / 100;
                                //通过保额，共保比例算出华泰保额
                                _riskunit.allRiskUnitAmt = _riskunit.riskUnitAmt / _riskunit.ourRate;

                                _riskunit.prm = _riskunit._temp.sumPrmEdr * _riskunit.amtRate / 100;
                                _riskunit.exTaxPremium = _riskunit._temp.sumExTaxPremiumEdr * _riskunit.amtRate / 100;
                                _riskunit.tax = _riskunit._temp.sumTaxEdr * _riskunit.amtRate / 100;
                                //                            _riskunit.amtChg = Math.abs(_riskunit.riskUnitAmt - _riskunit.amtOri);
                                //                            _riskunit.premChg = Math.abs(_riskunit.prm - _riskunit.premOri);
                                _riskunit.amtChg = _riskunit.riskUnitAmt - _riskunit.amtOri;
                                _riskunit.premChg = _riskunit.prm - _riskunit.premOri;
                                _riskunit.exTaxPremiumChg = _riskunit.exTaxPremium - _riskunit.exTaxPremiumOri;
                                _riskunit.taxChg = _riskunit.tax - _riskunit.taxOri;
                                _riskunit.fstSurplusAmt = _riskunit.riskUnitAmt;
                                _riskunit.openCoverAmt = _riskunit.riskUnitAmt;
                            }
                        }
                        break;
                }
            };
            //检测相加和是否溢出(投保单)
            var overflowSum = function () {
                var sum = 0;
                $.each($scope.RU.dangerUnitList, function (index, riskunit) {
                    sum += riskunit.riskUnitAmt * 1;
                    if (parseFloat(sum).toFixed(2) > riskunit._temp.sumDangerUnitAmt) {
                        riskunit._temp.warning = true;
                        $scope.RU.editButton = true;
                    }
                });
            }
            /**
             * ---end--
             */

            /**
             * 进合同-除外责任-前台控制
             * ----start----
             */
            $scope.selectExclusion = function (riskunit){
                console.log(riskunit)
                $timeout(function () {
                    if (riskunit.exItemKind.treatyNo == null || riskunit.exItemKind.treatyNo == undefined || riskunit.exItemKind.treatyNo == "") {
                        riskunit.flag = true;
                    }
                    else {
                        riskunit.flag = false;
                    }
                }, 50);
            };
            /**
             * ----end----
             */

            /*查询结投保单号或保单号或批单号查询危险单位列表*/
            $scope.searchRiskUnit = function (certiNo) {
                $scope.showBusy(true);//loading图片显示
                riskunitService.searchDangerUnitList($scope.certiTypeCopy, certiNo, $scope.global.user, $scope.global.lang).then(
                    function (data) {
                        $.each(data, function (index, riskUnit) {
                            riskUnit.flag = transformBooleanToBool(riskUnit.flag);
                        });
                        $scope.RU.dangerUnitList = prepareData(data);
                        $scope.EdrDataLength = $scope.RU.dangerUnitList.length;
                        // console.log($scope.RU.dangerUnitList);
                        if (angular.isUndefined($scope.RU.dangerUnitList[0])) {
                            $scope.splitMode.flag = "no";
                        } else {
                            $scope.splitMode.flag = $scope.RU.dangerUnitList[0].flag;
                            getExItemKind();//获取除外责任
                            /*分保试算*/
                            $scope.showReinsShare();
                            $scope.showBusy(false);
                        }
                        // console.log("init总保额为： " + $scope.unitAmountAccount);
                        // console.log("init总保费为： " + $scope.premiumAccount);
                        if ($scope.RU.dangerUnitList.length > 0) {
                            if ($scope.unitAmountAccount === 0 || $scope.premiumAccount === 0) {
                                $.each($scope.RU.dangerUnitList, function (index, dangerUnit) {

                                    $scope.unitAmountAccount += dangerUnit.amount;
                                    $scope.premiumAccount += dangerUnit.premium;
                                    $scope.noTaxPremiumAccount += dangerUnit.noTaxPremium;
                                    $scope.taxFeeAccount += dangerUnit.taxFee;
                                    $scope.getRiskLevel(dangerUnit.riskCode, dangerUnit.startDate, $scope.global.user, $scope.global.lang);
                                });
                            }
                        }
                        //$scope.retentionValueContant = $scope.RU.dangerUnitList[0].retentionValue;
                        // console.log("init自留额为： " + $scope.retentionValueContant);
                        // console.log("$scope.splitMode.flag 's is : " + $scope.splitMode.flag);
                    },
                    function (code) {
                        throw(code);
                    }
                );
            };

            //获取风险等级
            $scope.getRiskLevel = function (riskCode, startDate, user, lan) {

                riskunitService.getRiskLevel(riskCode, startDate, user, lan).then(
                    function (data) {
                        $scope.riskLvls = data;
                    },
                    function (code) {
                        throw (code);
                    }
                );
            }

            //获取除外责任数组内容
            var getExItemKind = function () {
                //获取除外责任
                $.each($scope.RU.dangerUnitList, function (index, dangerUnit) {
                    riskunitService.queryExItemKind($scope.certiTypeCopy, $scope.certiNo, dangerUnit.riskCode, dangerUnit.startDate, $scope.user, $scope.lang).then(
                        function (data) {

                            $scope.exItemKindList = data;
                        },
                        function (code) {
                            throw (code);
                        }
                    );
                });
            }
            //翻译除外责任
            $scope.getName = function (_id) {
                var temp = _id;
                if (angular.isDefined($scope.ObjTypeList)) {
                    $.each($scope.ObjTypeList, function (index, o) {
                        if (o.objTypeCode === ("" + _id) || o.objTypeCode === _id) {
                            temp = o.objTypeCode + '-' + o.objTypeDesc;
                            return;
                        }
                    });
                }
                return temp;
            };
            /**
             * 分保试算 /（ 等比分出保单 - 不掉用接口)   调用数据库接口
             * @param certiType   投保单 / 批单申请单  【T 投保单；E 批单申请单】
             * @param certiNo   投保单号/批单申请单号
             * @param riskUnitNo 风险单位号
             * @param user
             * @param lan
             */
            $scope.showReinsShare = function () {
                riskunitService.showReinsShare($scope.certiTypeCopy, $scope.certiNo, $scope.global.user, $scope.global.lang).then(
                    function (data) {
                        // console.log("分保试算 interface");
                        if (data !== undefined || data !== null || data !== "") {
                            $scope.RU.reinsShareList = data;
                            //$scope.groupData = groupBySection(data);
                            $scope.showReinsShares($scope.RU.dangerUnitList[0].riskUnitNo);
                        }

                    },
                    function (code) {
                        throw(code);
                    }
                );
            };

            //重构某个数组
            /*var groupBySection = function(data) {
                var result = [];
                var result2 = [];
                if(data.length > 0) {
                	$.each(data, function(index1, reinsShare){
	                    result.push({dangerNo:reinsShare.dangerNo,plyEdrComShares:[]});
	                    $.each(reinsShare.plyEdrComShares,function(index2,_temp){
	                        if(!result[index1].plyEdrComShares[_temp.reinsType]){
	                            result[index1].plyEdrComShares[_temp.reinsType]={
	                                reinsType:_temp.reinsType,
	                                checked:false,
	                                isOpen:true,
	                                plyEdrComShares:[],
	                                shareRateCount:0,
	                                premiumCount:0,
	                                exTaxPremiumCount:0,
	                                taxCount:0,
	                                amountCount:0
	                            };
	                            result[index1].plyEdrComShares[_temp.reinsType].plyEdrComShares.push(_temp);
	                            result[index1].plyEdrComShares[_temp.reinsType].shareRateCount += _temp.shareRate;
	                            result[index1].plyEdrComShares[_temp.reinsType].premiumCount += _temp.premium;
	                            result[index1].plyEdrComShares[_temp.reinsType].exTaxPremiumCount += _temp.exTaxPremium;
	                            result[index1].plyEdrComShares[_temp.reinsType].taxCount += _temp.tax;
	                            result[index1].plyEdrComShares[_temp.reinsType].amountCount += _temp.amount;
	                        }
	                    });
	                });
                } else {
                	//alert("无分保试算结果，请进行试算！");
                }
                return result;
            };*/

            //初始化count字段值
            var initCount = function (share) {
                //如果没有查到分保试算则跳过，否则初始化count字段值
                if (angular.isUndefined(share)) {

                } else {
                    if ($scope.certiType === '1') {
                        share.shareRateCount = 0;
                        share.amountCount = 0;
                        share.premiumCount = 0;
                        share.exTaxPremiumCount = 0;
                        share.taxCount = 0;
                    } else {
                        share.shareRateCount = 0;
                        share.amountCount = 0;
                        share.premiumCount = 0;
                        share.exTaxPremiumCount = 0;
                        share.taxCount = 0;
                        //share.oriAmountCount = 0;
                        //share.oriPremiumCount = 0;
                        //share.oriExTaxPremiumCount = 0;
                        //share.oriTaxCount=0;
                        share.chgAmountCount = 0;
                        share.chgPremiumCount = 0;
                        share.chgExTaxPremiumCount = 0;
                    }
                    return share;
                }
            };

            //分组的公共方法
            var groupByReinsType = function (shares) {
                var result = {};
                if (angular.isUndefined(shares)) {
                } else {
                    $.each(shares, function (index, share) {
                        //console.log(share);

                        if (!result[share.reinsType]) {
                            result[share.reinsType] = {
                                reinsType: share.reinsType,
                                PlyEdrComShares: []
                            };
                        }
                        result[share.reinsType].PlyEdrComShares.push(share);
                    });
                }

                return result;
            };

            //查看所有的分保试算结果
            $scope.showAllReinsShares = function () {
                $scope.showBusy(true);//loading图片显示
                //设置分保试算按钮在3秒内不能重复点击 begin
                $scope.calReinsShareFlag = true;//设置分保试算不能点击---在5秒内不能重复点击
                var calReinsShareFlagTime = $timeout(function () {
                    $scope.calReinsShareFlag = false;
                }, 5000);
                //设置分保试算按钮在3秒内不能重复点击  end

                riskunitService.queryRetentMax($scope.certiTypeCopy, $scope.certiNo, $scope.global.user, $scope.global.lang).then(
                    function (data) {
                        if (data) {
                            $scope.showBusy(false);//loading图片隐藏
                            $scope.RU.reinsShares = (data);
                            $scope.trialListShare = []
                            $scope.trialListShareTrue ='true' //试算结果展示
                            $.each($scope.RU.reinsShares, function (index, r) {
                                if (angular.isUndefined(r.shareRateCount)) {
                                    $scope.RU.reinsShares[index] = initCount($scope.RU.reinsShares[index]);
                                    $scope.RU.reinsShares[index] = reinsShareCount($scope.RU.reinsShares[index]);
                                }
                            });
                            var amountTotalList = [];
                            var premiumTotalList = [];
                            var noTaxPremiumTotalList = [];
                            var taxFeeTotalList = [];
                            var shareRateTotalList = [];
                            var amountChgTotalList = [];
                            var premiumChgTotalList = [];
                            var chgNoTaxPremiumTotalList = [];
                            var chgTaxFeeTotalList = [];
                            $scope.reinsShares = angular.copy($scope.RU.reinsShares);
                            //$scope.groupData = groupBySection(data);
                            $.each($scope.reinsShares, function (index, unitrisk) {
                                // unitrisk.groupped = groupByReinsType(unitrisk.plyEdrComShares);
                                unitrisk.groupped = groupByReinsType(unitrisk.reinsShareList);
                            });

                            $.each($scope.reinsShares, function (index, unitrisk) {
                                $scope.trialListShare.push(unitrisk.reinsShareList)
                            });

                            for(var i = 0;i<$scope.trialListShare[0].length;i++){
                                if ($scope.trialListShare) {
                                    amountTotalList.push($scope.trialListShare[0][i].amount)
                                    premiumTotalList.push($scope.trialListShare[0][i].premium)
                                    noTaxPremiumTotalList.push($scope.trialListShare[0][i].noTaxPremium)
                                    taxFeeTotalList.push($scope.trialListShare[0][i].taxFee)
                                    shareRateTotalList.push($scope.trialListShare[0][i].shareRate)
                                    amountChgTotalList.push($scope.trialListShare[0][i].amountChg)
                                    premiumChgTotalList.push($scope.trialListShare[0][i].premiumChg)
                                    chgNoTaxPremiumTotalList.push($scope.trialListShare[0][i].chgNoTaxPremium)
                                    chgTaxFeeTotalList.push($scope.trialListShare[0][i].chgTaxFee)
                                }
                            }
                            // $.each($scope.trialListShare, function (index, items) {
                            //     if (items) {
                            //         amountTotalList.push(items[index].amount)
                            //         premiumTotalList.push(items[index].premium)
                            //         noTaxPremiumTotalList.push(items[index].noTaxPremium)
                            //         taxFeeTotalList.push(items[index].taxFee)
                            //         shareRateTotalList.push(items[index].shareRate)
                            //         amountChgTotalList.push(items[index].amountChg)
                            //         premiumChgTotalList.push(items[index].premiumChg)
                            //         chgNoTaxPremiumTotalList.push(items[index].chgNoTaxPremium)
                            //         chgTaxFeeTotalList.push(items[index].chgTaxFee)
                            //     }
                            // });
                            $scope.amountTotal = eval(amountTotalList.join('+'))
                            $scope.premiumTotal = eval(premiumTotalList.join('+'))
                            $scope.noTaxPremiumTotal = eval(noTaxPremiumTotalList.join('+'))
                            $scope.taxFeeTotal = eval(taxFeeTotalList.join('+'))
                            $scope.shareRateTotal = eval(shareRateTotalList.join('+'))
                            $scope.amountChgTotal = eval(amountChgTotalList.join('+'))
                            $scope.premiumChgTotal = eval(premiumChgTotalList.join('+'))
                            $scope.chgNoTaxPremiumTotal = eval(chgNoTaxPremiumTotalList.join('+'))
                            $scope.chgTaxFeeTotal = eval(chgTaxFeeTotalList.join('+'))
                            $scope.showBusy(false);//loading图片显示
                            alert("计算完成!");


                            // throw (code);
                            // alert("计算失败!");

                        } else if (data === "false") {
                            alert("风险单位自留额超过最大值,不能进行分保试算!");
                            $scope.showBusy(false);//loading图片显示
                        }
                        else {
                            alert("处理失败！");
                            $scope.showBusy(false);//loading图片显示
                        }
                    },
                    function (code) {
                        throw (code);
                    }
                );
            };


//查看所有分保试算结果时 返回按钮 动做
            $scope.resultBack = function () {
                $scope.showReinsShare($scope.RU.dangerUnitList[0].riskUnitNo);
            };

//单项查看分保试算 ------ 根据风险单位号显示
            $scope.showReinsShares = function (dangerNo) {
                $scope.reinsShareList = [];
                $.each($scope.RU.reinsShareList, function (index, r) {
                    if (r.dangerNo === dangerNo) {
                        $scope.reinsShareList.push(r);
                    }
                });

                $scope.reinsShareList[0] = initCount($scope.reinsShareList[0]);
                $scope.reinsShareList[0] = reinsShareCount($scope.reinsShareList[0]);

                $scope.reinsShareList = angular.copy($scope.reinsShareList);

                // console.log($scope.reinsShareList);
                if ($scope.reinsShareList.length > 0) {
                    $.each($scope.reinsShareList, function (index, unitrisk) {
                        if (angular.isUndefined(unitrisk)) {
                        } else {
                            unitrisk.groupped = groupByReinsType(unitrisk.plyEdrComShares);
                        }
                    });
                }
            };
//计算分保试算合计 单行数据  index--要计算shares的下标
            var reinsShareCount = function (shares) {
                //如果没有查到分保试算则跳过，否则计算分保试算合计 单行数据  index--要计算shares的下标
                if (angular.isUndefined(shares)) {
                } else {
                    $.each(shares, function (index, r) {
                        if ($scope.certiTypeCopy === '1' || $scope.certiTypeCopy === '2') {
                            shares.shareRateCount = (parseFloat(shares.shareRateCount + "") + parseFloat(r.shareRate + "")).toFixed(4);
                            shares.amountCount = parseFloat(shares.amountCount) + (parseFloat(r.amount));
                            shares.premiumCount = parseFloat(shares.premiumCount) + (parseFloat(r.premium));
                            shares.exTaxPremiumCount = parseFloat(shares.exTaxPremiumCount) + (parseFloat(r.exTaxPremium));
                            shares.taxCount = parseFloat(shares.taxCount) + (parseFloat(r.tax));
                        } else {
                            shares.shareRateCount = (parseFloat(shares.shareRateCount + "") + parseFloat(r.shareRate + "")).toFixed(4);
                            shares.amountCount = parseFloat(shares.amountCount) + (parseFloat(r.amount));
                            shares.premiumCount = parseFloat(shares.premiumCount) + (parseFloat(r.premium));
                            shares.exTaxPremiumCount = parseFloat(shares.exTaxPremiumCount) + (parseFloat(r.exTaxPremium));
                            shares.taxCount = parseFloat(shares.taxCount) + (parseFloat(r.tax));
                            shares.oriAmountCount = parseFloat(shares.oriAmountCount) + (parseFloat(r.oriAmount));
                            shares.oriPremiumCount = parseFloat(shares.oriPremiumCount) + (parseFloat(r.oriPremium));
                            shares.oriExTaxPremiumCount = parseFloat(shares.oriExTaxPremiumCount) + (parseFloat(r.oriExTaxPremium));
                            shares.oriTaxCount = parseFloat(shares.oriTaxCount) + (parseFloat(r.oriTax));
                            shares.chgAmountCount = parseFloat(shares.chgAmountCount) + (parseFloat(r.chgAmount));
                            shares.chgPremiumCount = parseFloat(shares.chgPremiumCount) + (parseFloat(r.chgPremium));
                            shares.chgExTaxPremiumCount = parseFloat(shares.chgExTaxPremiumCount) + (parseFloat(r.chgExTaxPremium));
                        }
                    });

                    return shares;
                }
            };

//预处理比例接收人中的差异分包
            $scope.dealDifReinsAbcToBoolean = function () {
                if ($scope.dangerUnitFacEnquiry.feoReinsReceiveList.length > 0) {
                    $.each($scope.dangerUnitFacEnquiry.feoReinsReceiveList, function (index, feoReinsReceive) {
                        if ((feoReinsReceive.deductible != "" && feoReinsReceive.deductible != null) || (feoReinsReceive.deductibleRate != "" && feoReinsReceive.deductibleRate != null)) {
                            feoReinsReceive.dif = true;
                        } else {
                            feoReinsReceive.dif = false;
                        }
                        if (feoReinsReceive.specialEngage != "" && feoReinsReceive.specialEngage != null) {
                            feoReinsReceive.abc = true;
                        } else {
                            feoReinsReceive.abc = false;
                        }
                        if (feoReinsReceive.facFlag == '1') {
                            feoReinsReceive.facFlag = '1'
                        } else {
                            feoReinsReceive.facFlag = '0'
                        }
                    });
                }
            }

//预处理比例超赔中的经纪人(true/false - "1"/"0")
            $scope.dealBrokerToString = function () {
                //预处理比例中的经纪人

                if ($scope.dangerUnitFacEnquiry.feoReinsReceiveList.length > 0) {
                    $.each($scope.dangerUnitFacEnquiry.feoReinsReceiveList, function (index, fac) {

                        if (fac.reinsType) {
                            fac.reinsType = "0";
                        } else {
                            fac.reinsType = "1";
                        }
                        // console.log("dealBrokerToString _预处理比例中的经纪人 :" + fac.brokerFlag);
                    });
                }
                //预处理超赔中的经纪人
                if ($scope.dangerUnitFacEnquiry.feoXLayerList.length > 0) {
                    $.each($scope.dangerUnitFacEnquiry.feoXLayerList, function (index, layer) {
                        $.each(layer.feoXReinsList, function (index, feo) {
                            if (feo.brokerFlag) {
                                feo.brokerFlag = "1";
                            } else {
                                feo.brokerFlag = "0";
                            }
                            // console.log("dealBrokerToString _预处理超赔中的经纪人 :" + feo.brokerFlag);
                        });
                    });
                }
            }

//预处理比例中的差异分保(免赔-责任;true-false;1-0)
            $scope.dealDifReinsAbcToNum = function () {
                if ($scope.dangerUnitFacEnquiry.feoReinsReceiveList.length > 0) {
                    $.each($scope.dangerUnitFacEnquiry.feoReinsReceiveList, function (index, fac) {
                        if (fac.dif === false) {
                            fac.dif = 0;
                        } else {
                            fac.dif = 1;
                            // console.log(fac.dif);
                        }
                        if (fac.abc === false) {
                            fac.abc = 0;
                        } else {
                            fac.abc = 1;
                            fac.dif = 1;
                        }
                    });
                }
            }

//超赔中的分保费默认保留两位小数
            $scope.dealPremiumToFix2 = function () {
                if ($scope.dangerUnitFacEnquiry.feoXLayerList.length > 0) {
                    $.each($scope.dangerUnitFacEnquiry.feoXLayerList, function (index, layer) {
                        if (angular.isDefined(layer.feoXReinsList)) {
                            $.each(layer.feoXReinsList, function (index, feo) {
                                feo.premium = parseFloat(feo.premium).toFixed(2);
                            });
                        }
                    });
                }
            }

            /*临分意向-查询*/
            $scope.getFacEnquiryInfo = function (certiType, certiNo, dangerNo, user, lan) {
                // console.log("InquiryDetailModalCtrl getFacEnquiryInfo（临分意向） is coming ..");
                $scope.showBusy(true);

                riskunitService.getFacEnquiryInfo(certiType, certiNo, dangerNo, user, lan).then(
                    function (data) {

                        if (angular.isUndefined(data.result)) {
                            $scope.dangerUnitFacEnquiry = (data);
                            $.each( $scope.dangerUnitFacEnquiry.feoReinsReceiveList,function(index,items){
                                    items.vatRate = '6.000000'
                            });
                            $.each( $scope.dangerUnitFacEnquiry.feoReinsReceiveList,function(index,items){
                                if(items.finalReinsCode){
                                    items.finalReinsCodes ={
                                        id: items.finalReinsCode,
                                        other1:items.finalReinsOther1,
                                        value:items.finalReinsName
                                    }
                                }
                            });

                            console.log($scope.dangerUnitFacEnquiry.feoReinsReceiveList)
                            $scope.feoEnquiry = $scope.dangerUnitFacEnquiry.feoEnquiry;
                            $scope.feoEnquiry.riskCode = $scope.dangerUnitFacEnquiry.riskCode;
                            $scope.feoEnquiry.certiName = $scope.dangerUnitFacEnquiry.certiName;
                            $scope.feoEnquiry.certiNo = $scope.dangerUnitFacEnquiry.certiNo;
                            $scope.feoEnquiry.dangerNo = $scope.dangerUnitFacEnquiry.dangerNo;
                            //隐藏试算结果
                            if($scope.trialListShareTrue){
                                $scope.trialListShareTrue = false
                            }
                            //隐藏试算列表
                            if( $scope.trialListShareTrueTable){
                                $scope.trialListShareTrueTable = false
                            }
                            //处理缴费信息
                            //$scope.dealGetFacPayment(); //暂时注释掉，因为此版本中比例合约没有缴费信息

                            //处理差异分保信息
                            $scope.dealDifReinsAbcToBoolean();
                        } else {
                            alert("查询失败: " + data.msg);
                        }
                        $scope.showBusy(false);
                    },
                    function (code) {
                        throw(code);
                        //alert(message);
                    }
                );
            };

            /*获取风险累积数据*/
            $scope.showRiskPool = function (riskUnit) {
                // console.log("list's riskunitsAccPlyInfo is coming ..");
                riskunitService.showRiskPool($scope.certiTypeCopy, $scope.certiNo, riskUnit, $scope.global.user, $scope.global.lang).then(
                    function (data) {
                        $scope.cumulativeRiskList = (data);
                        // console.log($scope.cumulativeRiskList);
                    },
                    function (code) {
                        throw(code);
                    }
                );
            };

            /***
             * 批单 相关方法
             */
//用于记录批单初始风险单位个数，判断删除风险单位标准
            $scope.EdrDataLength = 0;

//保存批单
            $scope.updateRiskunitEdr = function (riskUnit) {
                if (judgeEqualInitValue(riskUnit)) {
                    $scope.RU.changeFlag = false;
                    $.each(riskUnit, function (index, riskunits) {
                        riskunits.flag = transformBooleanToNum(riskunits.flag);
                    });
                    if (!judgeSplitByItem(riskUnit) && riskUnit[0].splitType === "1") {
                        //按标的拆分保存
                        modifyRiskUnit($scope.certiTypeCopy, "1", riskUnit, $scope.global.user, $scope.global.lang);
                    } else if (!judgeSplitByProportion(riskUnit) && riskUnit[0].splitType === "2") {
                        //按占比拆分保存
                        modifyRiskUnit($scope.certiTypeCopy, "2", riskUnit, $scope.global.user, $scope.global.lang);
                    } else {
                        //普通保存
                        modifyRiskUnit($scope.certiTypeCopy, "3", riskUnit, $scope.global.user, $scope.global.lang);
                    }
                } else {
                    alert("保存的保额、保费的要与初始值一样！");
                    $scope.RU.editButton = false;
                }
            }

//自留比例验证
            $scope.retentionPropCheck = function (r) {
                if ($scope.riskKeepAmtFlag = "true") {
                    var retentionFlag = "0";
                    $scope.retentPropFlag = "true";
                    //$.each(riskUnit, function(index, r){
                    r.retentProp = parseFloat((r.riskKeepAmt / r.riskUnitAmt).toFixed(6));
                    r.retentProp = (r.retentProp * 100).toFixed(4);
                    if (r.retentProp > 100) {
                        $scope.retentPropFlag = "false";
                        // console.log("自留比例为: " + r.retentProp);
                        r.retentProp = "";
                        retentionFlag = "1";
                    }
                    //});
                    if (retentionFlag === "0") {
                        $scope.retentPropFlag = "true";
                    }
                }
            }

//自留额验证
            $scope.riskKeepAmtCheck = function (r) {
                var riskKeepAmtFlag = "0";
                $scope.riskKeepAmtFlag = "true";
                //$.each(riskUnit, function(index, r){
                //r.retentProp =  Math.round(r.riskKeepAmt /r.riskUnitAmt * 10000) / 100;
                if (r.riskKeepAmt > r.riskUnitAmt) {
                    $scope.riskKeepAmtFlag = "false";
                    // console.log("自留额为: " + r.riskKeepAmt);
                    r.riskKeepAmt = r.riskUnitAmt;
                    riskKeepAmtFlag = "1";
//						alert("自留额不能大于保额!");
                }
                //});
                if (riskKeepAmtFlag === "0") {
                    $scope.riskKeepAmtFlag = "true";
                }
            }

            /**
             *保存投保单/批单
             * @param certiType   投保单 / 批单申请单  【T 投保单；E 批单申请单】
             * @param riskUnit  整个风险单位信息
             * @param user
             * @param lan
             */
            $scope.updateRiskUnits = function (riskUnit) {
            	console.log(riskUnit)

                // console.log(riskUnit[0].dangerItemCoList);
                //如果标的信息中有附加险2的数据，将本期riskunitVo的splitType 置成B
                if (riskUnit.length > 0) {
                    $.each(riskUnit, function (index, r) {
                        if (r.dangerItemCoList.length > 0) {
                            $scope.splitTypeBFlagArray = [];
                            $.each(r.dangerItemCoList, function (index, item) {
                                // console.log("item.isSelected " + item.isSelected);
                                if ((item.mainRiskFlag === "1" && item.isSelected) ||
                                    (item.mainRiskFlag === "0" && item.isSelected) ||
                                    (item.mainRiskFlag === "3" && item.isSelected) ||
                                    (item.mainRiskFlag === "4" && item.isSelected)) {
                                    if ($scope.splitTypeBFlagArray.length <= 0) {
                                        $scope.splitTypeBFlagArray.push(true);
                                        item.isOnlyMainFlag2 = false;
                                    }
                                }
                            });
                            if ($scope.splitTypeBFlagArray.length <= 0) {
                                $.each(r.dangerItemCoList, function (index, item) {
                                    if (item.isOnlyMainFlag2 = false) {
                                    } else {
                                        if ((item.mainRiskFlag === "2" || item.mainRiskFlag === "4") && item.isSelected) {
                                            if ($scope.splitTypeBFlagArray.length <= 0) {
                                                r.splitType = "B";
                                                // console.log("之后: " + r.splitType);
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    });
                }

                // console.log("----riskUnit---start-");
                // console.log(riskUnit);
                // console.log("----riskUnit---end-");
                $scope.updateRiskUnit(riskUnit, 'riskKeepAmt');
                $scope.riskKeepAmtCheck(riskUnit);
                $scope.retentionPropCheck(riskUnit);
                overflowSum();
                if ($scope.retentPropFlag === "true" && $scope.riskKeepAmtFlag === "true") {
                    if (judgeEqualInitValue(riskUnit)) {
                        //设置表单改动标志位
                        $scope.RU.changeFlag = false;
                        // console.log("是否按标的信息拆分保存：" + "$scope.splitMode.flagFlag:" + $scope.splitMode.flagFlag);//true,数据没有改变，普通保存
                        // console.log("是否按占比拆分保存：" + "$scope.splitMode.flagFlag:" + $scope.splitMode.flagFlag);//false，数据发生改变，按占比拆分保存

                        $.each(riskUnit, function (index, riskunits) {
                            riskunits.flag = transformBooleanToNum(riskunits.flag);
                        });
                        if (!judgeSplitByProportion(riskUnit) && $scope.splitMode.flagFlag === '2') {
                            modifyRiskUnit($scope.certiType, "2", riskUnit, $scope.global.user, $scope.global.lang);
                        } else if (!judgeSplitByItem(riskUnit) && $scope.splitMode.flagFlag === '1') {
                            //标的拆分保存验证
                            if ($scope.mainRisk2FlagArray.length > 0) {
                                alert("该附加险已经在其它风险单位单独拆分了，请注意拆分是否正确！");
                            }

                            //标的拆分保存时判断是否选择了恐怖险(mainriskunit为2的记录)
                            $scope.dealMainRisk2(riskUnit);
                            //按标的拆分保存时验证是否选择恐怖险
                            $scope.mainRiskUnit2CheckedArrayFlag = true;
                            modifyRiskUnit($scope.certiType, "1", riskUnit, $scope.global.user, $scope.global.lang);
                        } else {
                            if (!judgeSplitByItem(riskUnit)) {
                                modifyRiskUnit($scope.certiType, "1", riskUnit, $scope.global.user, $scope.global.lang);
                            } else {
                                modifyRiskUnit($scope.certiType, "3", riskUnit, $scope.global.user, $scope.global.lang);
                            }
                        }
                    } else {
                        alert("保存的保额、保费的要与初始值一样！");
                    }
                } else {
                    $scope.updateRiskUnit(riskUnit, 'riskKeepAmt');
                    $scope.riskKeepAmtCheck(riskUnit);
                    $scope.retentionPropCheck(riskUnit);
                    overflowSum();
                }
            };

//监测splitMode变化
            $scope.$watch('splitMode.flag', function () {
                if ($scope.splitMode.flag === '1') {
                    $scope.splitMode.flagFlag = '1';
                }
                else if ($scope.splitMode.flag === '2') {
                    $scope.splitMode.flagFlag = '2';
                    $.each($scope.RU.dangerUnitList, function (index, r) {
                        $scope.toggleExtra(r, "");
                    });
                } else {
                    $scope.splitMode.flagFlag = '3';
                }
                // console.log("监测splitMode变化 " + $scope.splitMode.flagFlag);
//                console.log("新增标志位：："+$scope.splitMode.flagFlag);
            });

//保存调用的service
            var modifyRiskUnit = function (certiType, splitType, certiNo, user, lan) {
                $scope.showBusy(true);//loading图片显示
                riskunitService.modifyRiskUnit(certiType, splitType, certiNo, user, lan).then(
                    function (data) {
                        init();
                        $scope.$emit('notification', {message: '保存成功', delay: 3000, type: 'success'});
                        $scope.showBusy(false);//loading图片显示
                    },
                    function (code) {
                        $scope.$emit('notification', {message: '出错啦', delay: 8000, type: 'danger'});
                        //throw (code);
                        // console.log(code);
                        $scope.showBusy(false);//loading图片显示
                    }
                );
            }

//计算要保存的值是否等于初始值
            var judgeEqualInitValue = function (riskUnit) {
                var sumA = 0;
                var sumP = 0;
                var sumE = 0;
                var flag;
                $.each(riskUnit, function (index, riskunit) {
//	               if($scope.certiTypeCopy === "1" || $scope.certiTypeCopy === "2"){
                    sumA += riskunit.amount * 1;
                    sumP += riskunit.noTaxPremium * 1;
//                   } else {
//	                   sumA += (riskunit.riskUnitAmt - riskunit.amtChg);//保额和
//	                   sumP += (riskunit.prm - riskunit.premChg);//保费和
//                   }

                    if (riskunit.dangerItemCoList.length > 0) {
                        $scope.splitTypeBFlagArray = [];
                        var sumAmtResetRecord = 0;
                        var sumPrmResetRecord = 0;
                        $.each(riskunit.dangerItemCoList, function (index, item) {
//	            			if(angular.isDefined(item.isOperation)){
//	            				if((item.mainRiskFlag === "4" && item.isSelected)){
//		            				sumP += item.premium*1;
//		            			}
//	            			} else {
//	            				if($scope.certiTypeCopy === "3" || $scope.certiTypeCopy === "4"){
                            if ((item.mainRiskFlag === "1" && item.isSelected) ||
                                (item.mainRiskFlag === "0" && item.isSelected) ||
                                (item.mainRiskFlag === "3" && item.isSelected)) {
                                if ($scope.splitTypeBFlagArray.length <= 0) {
                                    $scope.splitTypeBFlagArray.push(true);
                                    item.isOnlyMainFlag2 = false;
                                }
                            }
//			            		}
//	            			}
                        });

                        if ($scope.splitTypeBFlagArray.length <= 0) {
                            $.each(riskunit.dangerItemCoList, function (index, item) {
//	            				if($scope.certiTypeCopy === "3" || $scope.certiTypeCopy === "4"){
                                if (item.isOnlyMainFlag2 = false) {
                                } else {
                                    if ((item.mainRiskFlag === "2" || item.mainRiskFlag === "4") && item.isSelected) {
                                        if ($scope.splitTypeBFlagArray.length <= 0) {
                                            sumAmtResetRecord = item.amount;
                                            sumA = sumA * 1 - sumAmtResetRecord * 1;
                                            // console.log("之后: " + sumAmtResetRecord);
                                            // console.log("之后: " + sumA);
                                        }
                                    }
                                }
//			            		}
                            });
                        }
                    }
                });

                if (parseFloat(sumA * 1).toFixed(2) === parseFloat(riskUnit[0]._temp.sumDangerUnitAmt * 1).toFixed(2)
                    && parseFloat(sumP * 1).toFixed(2) === parseFloat(riskUnit[0]._temp.sumExTaxPremium * 1).toFixed(2)) {
                    flag = true;
                } else {
                    flag = false;
                }
                // console.log("未转换的数据：");
                // console.log("初始保额保费的值:" + riskUnit[0]._temp.sumDangerUnitAmt + " --- " + riskUnit[0]._temp.sumPrm);
                // console.log("保存的保额和保费和：" + sumA + " --- " + sumP);
                // console.log("parseFloat.tofixed后的数据：");
                // console.log("初始保额保费的值：" + parseFloat(riskUnit[0]._temp.sumDangerUnitAmt).toFixed(2) + " --- " + parseFloat(riskUnit[0]._temp.sumPrm).toFixed(2));
                // console.log("保存的保额和保费和：" + parseFloat(sumA).toFixed(2) + " --- " + parseFloat(sumP).toFixed(2));
                // console.log("是否相等：" + flag);
                return flag;
            }

//判断是否按标的信息拆分
            var judgeSplitByItem = function (riskUnit) {
                var orgdata = [];
                var newdata = [];
                $.each(riskUnit, function (index, riskunits) {
                    $.each(riskunits.dangerItemCoList, function (index2, newRiskItems) {
                        if (!newRiskItems.isSelected)
                            newdata[newRiskItems.isSelected] = {
                                isSelected: newRiskItems.isSelected
                            }
                        newdata.push(newRiskItems.isSelected);
                    });
                });
                $.each($scope.copyRiskItems, function (index, copyRiskunits) {
                    $.each(copyRiskunits.dangerItemCoList, function (index, orgRiskitems) {
                        if (!orgRiskitems.isSelected)
                            orgdata[orgRiskitems.isSelected] = {
                                isSelected: orgRiskitems.isSelected
                            }
                        orgdata.push(orgRiskitems.isSelected);
                    });
                });
                var boolean = orgdata.toString() === newdata.toString();
                return boolean;
            }

//判断是否按占比拆分
            var judgeSplitByProportion = function (riskUnit) {
                var orgdata = [];
                var newdata = [];
                $.each(riskUnit, function (index, newriskunits) {
                    if (!newriskunits.amtRate)
                        newdata[newriskunits.amtRate] = {
                            isSelected: newriskunits.amtRate
                        }
                    newdata.push(newriskunits.amtRate);
                });
                $.each($scope.copyRiskItems, function (index, copyRiskunits) {
                    if (!copyRiskunits.amtRate)
                        orgdata[copyRiskunits.amtRate] = {
                            isSelected: copyRiskunits.amtRate
                        }
                    orgdata.push(copyRiskunits.amtRate);
                });
                var boolean = orgdata.toString() === newdata.toString();
                return boolean;
            }

            /*删除投保单/批单
             */
            $scope.deleteRiskUnit = function (riskunit) {
                $scope.RU.changeFlag = true;
                if ($scope.certiType === "1") {
                    $.each($scope.RU.dangerUnitList, function (index, temp) {
                        if (riskunit === temp) {
                            $scope.RU.dangerUnitList.splice(index, 1);
                        }
                    });
                } else if ($scope.certiType === "3") {
                    $.each($scope.RU.dangerUnitList, function (index, temp) {
                        if (riskunit === temp) {
                            $scope.RU.dangerUnitList.splice(index, 1);
                            $scope.deleteDateRecord.push(temp);
                        }
                    });
                }
                countRiskUnitNo();
                overflowSum();//计算当前值相加是否大于初始值相加和
            };
//隐藏查询列表
            $scope.hideSearchList = function () {
                $scope.hideList = true;
            };

//查询、列表框显示
            $scope.showSearchList = function () {
                $scope.hideList = false;
            };

//手工拆分编辑
//手工拆分危险单位功能实现  modify by lyt 20180418 start
            $scope.jumpRiskUnitSplit = function (certiNo) {
                $modal.open({
                    templateUrl: '/reins/page/templates/undwrt/dangerunit.editor.riskUnit.tpl.html',
                    controller: 'JumpRiskUnitListCtrl',
                    resolve: {
                        certiNo: function () {
                            return certiNo;
                        },
                        user: function () {
                            return $scope.global.user;
                        },
                        dangerUnitList: function () {
                            return $scope.RU.dangerUnitList;
                        },
                    }
                });
            }
//手工拆分危险单位功能实现  modify by lyt 20180418 end

//风险单位编辑
            $scope.editRiskUnit = function (flag) {

                //复制数据，防止取消编辑时丢失
                $scope.copyData = angular.copy(prepareData($scope.RU.dangerUnitList));//恢复到之前的数据
                $scope.copySpliteMode = angular.copy($scope.splitMode.flag);
                // console.log($scope.copySpliteMode);
                $scope.copyRiskItems = angular.copy(prepareData($scope.RU.dangerUnitList));//判断标的信息是否改变

                //获取风险等级
                $.each($scope.RU.dangerUnitList, function (index, riskunits) {
                    //传参：险种代码，起保时间，币别，建筑类型，用户，语言

                    $scope.getRiskLevel(riskunits.riskCode, riskunits.startDate, riskunits.amtCur, riskunits.bldTypCde, $scope.global.user, $scope.global.lang);
                });


                $.each($scope.RU.dangerUnitList, function (index, temp) {
                    temp.editing = flag;
                    temp.editSplit = flag;
                    temp.editSaveFlag = flag;
                    temp.editSplitSaveFlag = true;
                    temp.flag = true;
                });

                $scope.editSplitFlag = false;
                $scope.splitEditFlag = false;

            };

//风险等级改变选项时，带出自留额的值
            $scope.selectChange = function (riskunit) {
                $.each($scope.riskLvls, function (index, temp) {
                    if (temp.riskLvl === riskunit.riskLvlCde) {
                        riskunit.riskKeepAmt = temp.retentAmt;
                        //20140813 edit fxy start
                        if (riskunit.riskKeepAmt > riskunit.riskUnitAmt) {
                            riskunit.riskKeepAmt = riskunit.riskUnitAmt;
                            riskunit.allRiskKeepAmt = riskunit.riskKeepAmt / riskunit.ourRate;
                        }
                        //20140813 edit fxy end
                        //20140815 edit fxy start
                        riskunit.riskLvlDesc = temp.riskLevelDesc;

                        if (riskunit.riskKeepAmt >= temp.overBaseValue) {
                            riskunit.fstSurplusAmt = riskunit.riskUnitAmt;
                            riskunit.allFstSurplusAmt = riskunit.fstSurplusAmt / riskunit.ourRate;
                        } else {
                            riskunit.fstSurplusAmt = 0;
                            riskunit.allFstSurplusAmt = riskunit.fstSurplusAmt / riskunit.ourRate;
                        }
                        if (riskunit.riskKeepAmt >= temp.openCoveBaseValue) {
                            riskunit.openCoverAmt = riskunit.riskUnitAmt;
                            riskunit.allOpenCoverAmt = riskunit.openCoverAmt / riskunit.ourRate;
                        } else {
                            riskunit.openCoverAmt = 0;
                            riskunit.allOpenCoverAmt = riskunit.openCoverAmt / riskunit.ourRate;
                        }
                        //20140815 edit fxy end
                    }
                });
            }

//取消编辑时恢复到之前的数据状态
            $scope.undo = function () {
                $.each($scope.copyData, function (index, _temp) {
                    _temp.editing = false;
                    _temp.editSplit = false;
                });

                $.each($scope.RU.dangerUnitList, function (index, temp) {
                    temp.editSplit = false;
                });
                $scope.RU.dangerUnitList = $scope.copyData;
                $scope.splitMode.flag = $scope.copySpliteMode;
                // console.log($scope.splitMode.flag);
                $scope.splitFlag = false;
                init();
            };

//风险积累、标的信息、除外责任显示控制按钮
            $scope.toggleExtra = function (_dangerunit, _extra) {
                _dangerunit.showExtra = _dangerunit.showExtra === _extra ? '' : _extra;
                $scope._dangerunit = _dangerunit;
                if (_dangerunit.showExtra === 'accumulations') {
                    /*获取风险累积数据*/
                    $scope.cumulativeRiskList = [];
                    $scope.showRiskPool($scope._dangerunit);
                }
                if (_dangerunit.showExtra === 'enquiryFac') {
                    $scope.dangerNo = _dangerunit.dangerNo;
                    // $scope.feoEnquiry = _dangerunit
                    /*临分意向*/
                    $scope.getFacEnquiryInfo($scope.certiTypeCopy, $scope.certiNo, $scope.dangerNo, $scope.global.user, {});
                }
            };

            /**
             * 标的信息勾选拆分
             * 2014.6.6
             * 杨烁
             */
//勾选选择框触发的事件
            $scope.selectItem = function (riskunit, plyApp) {
                if (plyApp.mainRiskFlag === '1') {
                    if (!plyApp.isSelected) {
                        syncMainRisks(riskunit, plyApp);
                        //区分主险-险种代码赋值
                        if ($scope.rdrCde === "") {
                            $scope.rdrCde = plyApp.rdrCde;
                        }
                        //根据所选主险邮编/船名改变风险单位的邮编/船名
                        riskunit.zipCde = plyApp.zipCode;
                        syncAdtRisksByMain(riskunit, plyApp);//同步附加险2
                    }
                    syncAditionalRisks(riskunit, plyApp);//同步附加险0
                }
                if (plyApp.mainRiskFlag === '2') {
                    syncAdtRisksByAdtion(riskunit, plyApp);//同步附加险2
                }
                $.each($scope.RU.dangerUnitList, function (index, _riskunit) {
                    updateRiskUnitAmountNew(_riskunit, plyApp);
                    $timeout(function () {
                        $scope.updateRiskUnit(_riskunit, 'retentProp');
                    }, 50)
                });
            }
//判断所有风险单位里是否存在附加险2单独拆分的情况
            var judgeOnlyAdtTwoSelectedByAll = function (plyApp) {
                var flag = false;
                $.each($scope.RU.dangerUnitList, function (index, riskunit) {
                    $.each(riskunit.riskItems, function (index, riskItems) {
                        if (countSelectMainRiskByItemType(riskunit, plyApp) <= 0) {
                            if (riskItems.mainRiskFlag === "2" || riskItems.mainRiskFlag === "4") {
                                if (riskItems.isSelected) {
                                    flag = true;
                                    $scope.judgeData = riskunit;
                                    return false;
                                } else {
                                    flag = false;
                                }
                            }
                        }
                    })
                })
                return flag;
            }
//判断其他风险单位里是否存在附加险2单独拆分的情况
            var judgeOnlyAdtTwoByOther = function (riskunit, plyApp) {
                var flag = false;
                $scope.flagArray = [];
                $.each($scope.RU.dangerUnitList, function (index, _riskunit) {
                    if (riskunit !== _riskunit) {
                        $.each(_riskunit.riskItems, function (index, riskItem) {
                            if (countSelectMainRiskByItemType(_riskunit, plyApp) <= 0) {
                                if ((riskItem.mainRiskFlag === '2' || riskItem.mainRiskFlag === '4') && (riskItem.itemType === plyApp.itemType) && (riskItem.rdrCde === plyApp.rdrCde)) {
                                    if (riskItem.isSelected) {
                                        if ($scope.flagArray.length <= 0) {
                                            flag = true;
                                            $scope.judgeData = _riskunit;
                                            $scope.flagArray.push(true);
                                            return;
                                        }
                                    }
                                }
                            }
                        });
                    }
                });
                if ($scope.flagArray.length <= 0) {
                    flag = false;
                } else {
                    flag = true;
                }
                return flag;
            }
//判断除去本条风险单位后，其他风险单位是否有恐怖险和主险共同拆分
            var judgeOtherAtlRiskSelects = function (riskunit, plyApp) {
                var flag = false;
//                $timeout(function(){
                $.each($scope.RU.dangerUnitList, function (index, _riskunit) {
                    if (riskunit !== _riskunit) {
                        $.each(_riskunit.riskItems, function (index, riskItem) {
                            console.info("选中的主险个数：" + countSelectMainRiskByItemType(_riskunit, plyApp));
                            if (countSelectMainRiskByItemType(_riskunit, plyApp) > 0) {
                                if (riskItem.mainRiskFlag === '2' && (riskItem.itemType === plyApp.itemType)) {
                                    if (riskItem.isSelected) {
                                        // console.log(riskItem.itemType === plyApp.itemType);
                                        // console.log(riskItem.isSelected);
                                        flag = true;
                                        $scope.judgeData = _riskunit;
//                                            $scope.newData = unDoSelectedByOnlyTwoAdtRisk($scope.judgeData,plyApp);//去除掉单纯拆分的恐怖险勾选
                                        return false;
                                    }
                                }
                            }
                        });
                    }
                });
//                },50);
                console.info("^^^^^^^^^^^^^^^^^^^^^^^^^");
                console.info(flag);
                console.info("^^^^^^^^^^^^^^^^^^^^^^^^^");
                return flag;
            };
            $scope.judgeData = [];
            $scope.newData = [];
//方法：去除单独拆分的恐怖险的勾选项。（用来解决一个勾选bug）
            var unDoSelectedByOnlyTwoAdtRisk = function (riskunits, plyApp) {
                $.each(riskunits.riskItems, function (index, riskItems) {
                    if (countSelectMainRiskByItemType(riskunits, plyApp) > 0) {
                        if (riskItems.mainRiskFlag === '2' && (riskItems.itemType === plyApp.itemType)) {
                            if (riskItems.isSelected) {
                                // console.log("我把勾选项取消了。");
                                riskItems.isSelected = false;
                            }
                        }
                    }
                })
                return riskunits;
            }
//同步附加险2的勾选状态（勾选主险时的同步事件）
            var syncAdtRisksByMain = function (riskunit, plyApp) {
                if (judgeOtherAtlRiskSelects(riskunit, plyApp)) {
                    //$scope.newData = unDoSelectedByOnlyTwoAdtRisk($scope.judgeData,plyApp); //没必要去掉已选择的附加险
                    //console.info($scope.newData);
                    $.each(riskunit.riskItems, function (index, riskItems) {
                        $.each($scope.judgeData.riskItems, function (index, items) {
                            if (riskItems.mainRiskFlag === "2" && items.mainRiskFlag === "2"
                                && riskItems.itemNo === items.itemNo && (riskItems.rdrCde === items.rdrCde) && items.isSelected) {
                                if (riskItems.itemType === items.itemType) {
                                    riskItems.isSelected = items.isSelected;
//                                    alert("请注意勾选恐怖险");
                                }
                            }
                        });
                    });
                }
            }

//标的拆分保存时判断是否选择了恐怖险(mainriskunit为2的记录)
            $scope.dealMainRisk2 = function (riskunit) {
                $scope.mainRiskUnit2CheckedArray = [];
                // console.log(riskunit.riskItems);
                if (angular.isDefined(riskunit.riskItems)) {
                    $.each(riskunit.riskItems, function (index, items) {
                        if (items.mainRiskFlag === "2" && items.isSelected && $scope.mainRiskUnit2CheckedArray.length <= 0) {
                            $scope.mainRiskUnit2CheckedArray.push(true);
                        } else {
                            return false;
                        }
                    });
                }
                if ($scope.mainRiskUnit2CheckedArray.length <= 0) {
                    $scope.mainRiskUnit2CheckedArrayFlag = false;
                } else {
                    $scope.mainRiskUnit2CheckedArrayFlag = true;
                }
            }


//同步附加险2的勾选状态（勾选附加险2时的同步事件）
            var syncAdtRisksByAdtion = function (riskunit, plyApp) {
                $scope.mainRisk2FlagArray = [];
                if (!plyApp.isSelected) {
                    if (judgeOnlyAdtTwoByOther(riskunit, plyApp)) {
                        $scope.mainRisk2FlagArray.push(true);
                        alert("该附加险已经在其它风险单位单独拆分了，请注意拆分是否正确！");
                    }
                }
            }
//同步主险勾选
            var syncMainRisks = function (riskunit, plyApp) {
                //如果 plyApp.isSelected , 清除其他风险单位的主险标识为1的checkbox
                $timeout(function () {
                    if (plyApp.isSelected) {
                        $.each($scope.RU.dangerUnitList, function (index, _riskunit) {
                            if (riskunit !== _riskunit) {
                                $.each(_riskunit.riskItems, function (index, riskItem) {
                                    if (riskItem.itemNo === plyApp.itemNo && (riskItem.rdrCde === plyApp.rdrCde) && riskItem.itemType === plyApp.itemType) {
                                        riskItem.isSelected = false;
                                        syncAditionalRisks(_riskunit, riskItem);
                                    }
                                });
                            }
                        });
                    }
                }, 5);
            };
//同步附加险勾选
            var syncAditionalRisks = function (riskunit, plyApp) {
                $timeout(function () {
                    if (countSelectMainRiskByItemType(riskunit, plyApp) > 0) {
                        updateAditionalZeroSelected(riskunit, plyApp, true);
                    } else {
                        updateAditionalZeroSelected(riskunit, plyApp, false);
                    }
                }, 50)
            }
//修改附加险0的勾选状态
            var updateAditionalZeroSelected = function (riskunit, plyApp, isSelected) {
                $.each(riskunit.riskItems, function (index, riskItems) {
                    if (riskItems.itemType === plyApp.itemType) {
                        if (riskItems.mainRiskFlag === '0') {
                            riskItems.isSelected = isSelected;
                        }
                    }
                });
            }
//返回主险的勾选数量，根据itemType判断
            var countSelectMainRiskByItemType = function (riskunit, plyApp) {
                var count = 0;
                $.each(riskunit.riskItems, function (index, riskItems) {
                    if ((riskItems.mainRiskFlag === '1' || riskItems.mainRiskFlag === '3') && riskItems.isSelected) {
                        if (riskItems.itemType === plyApp.itemType) {
                            count++;
                        }
                    }
                });
                return count;
            }

            /**
             * @date 2014.6.5
             * 统计标的信息保额、保费总和
             * @author ys
             * @param riskunit
             * @param plyApp
             */
            var updateRiskUnitAmountNew = function (riskunit, plyApp) {
                $timeout(function () {
                    var proportion = 0;//占比（保额）
                    var sumMainRisk = 0;//主险和（保额）
                    var sumSelectMainRisk = 0; //选中主险保额和
                    var sumSelectAdditional = 0;//选中的附加险的保额和
                    var sumSelectMainRiskPremium = 0;//选中的主险的保费和
                    var sumSelectMainRiskExTaxPremium = 0;
                    var sumSelectMainRiskTax = 0;

                    var sumSelectAddtionalPremium = 0;//选中的附加险的保费和

                    // ----2014.6.5 杨烁--start------
                    //占比
                    var proportionMaterialCov = 0;//物质损失保额占比
//                    var proportionMaterialPre = 0;//物质损失保费占比
                    var proportionBusinessCov = 0;//营业中断保额占比
//                    var proportionBusinessPre = 0;//营业中断保费占比
                    //主险和
                    var sumMainRiskMaterialCov = 0;//物质损失保额和
                    var sumMainRiskMaterialPre = 0;//物质损失保费和
                    var sumMainRiskBusinessCov = 0;//营业中断保额和
                    var sumMainRiskBusinessPre = 0;//营业中断保费和
                    //选中的保额
                    var sumSelectMaterialMainCov = 0;//选中的物质损失主险和
                    var sumSelectBusinessMainCov = 0;//选中的营业中断主险和

                    var sumSelectMaterialAddtiCov = 0;//选中的物质损失附加险和
                    var sumSelectMaterialAddtiCovMainRisk2 = 0; //选中的物质损失附加险和(恐怖险单拆保存)
                    var sumSelectBusinessAddtiCov = 0;//选中的营业中断附加险和
                    var sumSelectBusinessAddtiCovMainRisk2 = 0; //选中的营业中断附加险和(恐怖险单拆保存)

                    //选中的保费
                    var sumSelectMaterialMainPre = 0;//选中的物质损失主险和
                    var sumSelectMaterialMainExTaxPre = 0;
                    var sumSelectMaterialMainTax = 0;

                    var sumSelectBusinessMainPre = 0;//选中的营业中断主险和
                    var sumSelectBusinessMainExTaxPre = 0;
                    var sumSelectBusinessMainTax = 0;

                    var sumSelectMaterialAddtiPre = 0;//选中的物质损失附加险和
                    var sumSelectMaterialAddtiExTaxPre = 0;
                    var sumSelectMaterialAddtiTax = 0;

                    var sumSelectBusinessAddtiPre = 0;//选中的营业中断附加险和
                    var sumSelectBusinessAddtiExTaxPre = 0;
                    var sumSelectBusinessAddtiTax = 0;
                    //----end-----
                    // prepareData(riskunit);
                    $.each(riskunit.riskItems, function (index, riskItem) {
                        var a = riskItem.isSelected ? 1 : 0;//是否选中
                        var b = riskItem.calculateFlag === 'Y' ? 1 : 0;//是否参与计算
                        if ($scope.certiTypeCopy === '1' | $scope.certiTypeCopy === '2') {
                            var c = riskItem.mainRiskFlag === '1' ? 1 : 0;//是否主险
                            var d = riskItem.mainRiskFlag !== '1' ? 1 : 0;//是否附加险
                        } else {
                            var c = (riskItem.mainRiskFlag === '1' || riskItem.mainRiskFlag === '3') ? 1 : 0;//是否主险
//	                        var d = !(riskItem.mainRiskFlag === '1' || riskItem.mainRiskFlag === '3' || riskItem.mainRiskFlag === '4')? 1 : 0;//是否附加险
                            var d = !(riskItem.mainRiskFlag === '1' || riskItem.mainRiskFlag === '3') ? 1 : 0;//是否附加险
                        }
                        var e = riskItem.itemType === '1' ? 1 : 0;//是否物质损失 1：物质损失 0：营业中断
                        var f = riskItem.itemType !== '1' ? 1 : 0;//是否营业中断 1：物质损失 0：营业中断
                        riskItem.isOperation = true; //判断是否操作了标的信息

                        //占比比例
                        //物质损失主险保额占比
                        sumMainRiskMaterialCov += e * c * riskItem.amount; //物质损失主险和
                        sumSelectMaterialMainCov += e * a * b * c * riskItem.amount;//选中的物质损失主险和
                        proportionMaterialCov = parseFloat(sumSelectMaterialMainCov / sumMainRiskMaterialCov * 100).toFixed(4);//占比

                        //营业中断损失主险保额占比
                        sumMainRiskBusinessCov += f * c * riskItem.amount; //物质损失主险和
                        sumSelectBusinessMainCov += f * a * b * c * riskItem.amount;//选中的物质损失主险和
                        proportionBusinessCov = parseFloat(sumSelectBusinessMainCov / sumMainRiskBusinessCov * 100).toFixed(4);//占比

                        //物质损失主险保费
                        sumSelectMaterialMainPre += e * a * c * riskItem.premium;//选中保费主险和
                        sumSelectMaterialMainExTaxPre += e * a * c * riskItem.exTaxPremium;
                        sumSelectMaterialMainTax += e * a * c * riskItem.tax;
                        //营业中断损失主险保费
                        sumSelectBusinessMainPre += f * a * c * riskItem.premium;//选中保费主险和
                        sumSelectBusinessMainExTaxPre += f * a * c * riskItem.exTaxPremium;
                        sumSelectBusinessMainTax += f * a * c * riskItem.tax;

                        //勾选的附加险和
                        sumSelectMaterialAddtiCov += e * a * b * d * riskItem.amount;//物质附加险保额和
                        sumSelectMaterialAddtiCovMainRisk2 += e * a * d * riskItem.amount;//物质附加险保额和(恐怖险单拆保额值)
                        sumSelectMaterialAddtiPre += e * a * d * riskItem.premium;//物质附加险保费和
                        sumSelectMaterialAddtiExTaxPre += e * a * d * riskItem.exTaxPremium;
                        sumSelectMaterialAddtiTax += e * a * d * riskItem.tax;

                        sumSelectBusinessAddtiCov += f * a * b * d * riskItem.amount;
                        sumSelectBusinessAddtiCovMainRisk2 += f * a * d * riskItem.amount;//营业附加险保额和(恐怖险单拆保额值)
                        sumSelectBusinessAddtiPre += f * a * d * riskItem.premium;
                        sumSelectBusinessAddtiExTaxPre += f * a * d * riskItem.exTaxPremium;
                        sumSelectBusinessAddtiTax += f * a * d * riskItem.tax;

                    });
                    //选中的物质损失保额值
                    var materiaCover = sumSelectMaterialMainCov + sumSelectMaterialAddtiCov * proportionMaterialCov / 100;
                    //选中的物质损失保费值
                    var materiaPre = sumSelectMaterialMainPre + sumSelectMaterialAddtiPre * proportionMaterialCov / 100;
                    var materiaExTaxPremium = sumSelectMaterialMainExTaxPre + sumSelectMaterialAddtiExTaxPre * proportionMaterialCov / 100;
                    var materiaTax = sumSelectMaterialMainTax + sumSelectMaterialAddtiTax * proportionMaterialCov / 100;

                    //选中的营业中断保额值
                    var businessCover = sumSelectBusinessMainCov + sumSelectBusinessAddtiCov * proportionBusinessCov / 100;
                    //选中的营业中断保费值
                    var businessPre = sumSelectBusinessMainPre + sumSelectBusinessAddtiPre * proportionBusinessCov / 100;
                    var businessExTaxPremium = sumSelectBusinessMainExTaxPre + sumSelectBusinessAddtiExTaxPre * proportionBusinessCov / 100;
                    var businessTax = sumSelectBusinessMainTax + sumSelectBusinessAddtiTax * proportionBusinessCov / 100;

                    if (proportionMaterialCov > 0 || proportionBusinessCov > 0) {
                        if (sumSelectMaterialMainCov > 0 && sumSelectBusinessMainCov > 0) {//两个性质的主险都有勾选的
                            riskunit.riskUnitAmt = materiaCover + businessCover;
                            riskunit.prm = materiaPre + businessPre;
                            riskunit.exTaxPremium = materiaExTaxPremium + businessExTaxPremium;
                            riskunit.tax = materiaTax + businessTax;
                        }
                        else if (sumSelectMaterialMainCov > 0 && sumSelectBusinessMainCov <= 0) {//物质主险勾选，营业中断主险未勾选
                            riskunit.riskUnitAmt = materiaCover + sumSelectBusinessAddtiCov;
                            riskunit.prm = materiaPre + sumSelectBusinessAddtiPre;
                            riskunit.exTaxPremium = materiaExTaxPremium + sumSelectBusinessAddtiExTaxPre;
                            riskunit.tax = materiaTax + sumSelectBusinessAddtiTax;
                        }
                        else if (sumSelectMaterialMainCov <= 0 && sumSelectBusinessMainCov > 0) {//物质主险未勾选，营业中断主险勾选
                            riskunit.riskUnitAmt = sumSelectMaterialAddtiCov + businessCover;
                            riskunit.prm = sumSelectMaterialAddtiPre + businessPre;
                            riskunit.exTaxPremium = sumSelectMaterialAddtiExTaxPre + businessExTaxPremium;
                            riskunit.tax = sumSelectMaterialAddtiTax + businessTax;
                        } else {
                            riskunit.riskUnitAmt = sumSelectMaterialAddtiCov + sumSelectBusinessAddtiCov;
                            riskunit.prm = sumSelectMaterialAddtiPre + sumSelectBusinessAddtiPre;
                            riskunit.exTaxPremium = sumSelectMaterialAddtiExTaxPre + sumSelectBusinessAddtiExTaxPre;
                            riskunit.tax = sumSelectMaterialAddtiTax + sumSelectBusinessAddtiTax;
                        }
                    } else {//物质主险、营业中断主险都未勾选
                        riskunit.riskUnitAmt = sumSelectMaterialAddtiCovMainRisk2 + sumSelectBusinessAddtiCovMainRisk2;
                        riskunit.prm = sumSelectMaterialAddtiPre + sumSelectBusinessAddtiPre;
                        riskunit.exTaxPremium = sumSelectMaterialAddtiExTaxPre + sumSelectBusinessAddtiExTaxPre;
                        riskunit.tax = sumSelectMaterialAddtiTax + sumSelectBusinessAddtiTax;
                    }

                    //页面显示值
                    if (proportionMaterialCov > 0 || proportionBusinessCov > 0) {
                        riskunit.amtRate = parseFloat(riskunit.riskUnitAmt / riskunit._temp.sumDangerUnitAmt * 100).toFixed(4);
                    } else {
                        riskunit.amtRate = parseFloat(0 / riskunit._temp.sumDangerUnitAmt * 100).toFixed(4);
                    }
                    riskunit.openCoverAmt = riskunit.riskUnitAmt;
                    riskunit.fstSurplusAmt = riskunit.riskUnitAmt;

                    //通过保额，共保比例算出华泰保额
                    riskunit.allRiskUnitAmt = riskunit.riskUnitAmt / riskunit.ourRate;

                    //计算值是否大于初始值
                    if (riskunit.riskUnitAmt > riskunit._temp.sumDangerUnitAmt) {
                        riskunit._temp.warning = true;
                        $scope.RU.editButton = true;
                    } else {
                        riskunit._temp.warning = false;
                        $scope.RU.editButton = false;
                    }
                }, 50);
            }

//添加风险单位
            $scope.addRiskUnit = function () {
                $scope.RU.changeFlag = true;
                //增加时push临近的一条数据
                var _temp = angular.copy($scope.RU.dangerUnitList[$scope.RU.dangerUnitList.length - 1]);
                _temp.riskUnitNo += 1;
                _temp.riskUnitNme = "风险单位" + _temp.riskUnitNo;
                _temp.deleFlag = true;
                //_temp.unitFlag = "1";
                var initAddress = "";
                $scope.addRiskFlagArray = [];
                $scope.addMainRisk2RiskFlag = false;
                if (angular.isDefined($scope.RU.dangerUnitList)) {
                    $.each($scope.RU.dangerUnitList, function (index, riskunit) {
                        $.each(riskunit.riskItems, function (index, item) {
                            if (((item.mainRiskFlag === "1" && item.isSelected) ||
                                (item.mainRiskFlag === "0" && item.isSelected)) &&
                                (item.address != "" && item.address != null && item.address != "null")) {
                                if (initAddress === "") {
                                    initAddress = item.address;
                                    $scope.addMainRisk2RiskFlag = false;
                                }
                            }
                            if (item.mainRiskFlag === "2" && item.isSelected && initAddress === "") {
                                initAddress = "无";
                            }
                        });
                    });
                    if (initAddress === "") {
                        initAddress = "无";
                    }
                }
                _temp.riskUnitAddr = initAddress;

                if (!($scope.certiTypeCopy === "1" || $scope.certiTypeCopy === "2")) {
                    $.each(_temp.riskItems, function (index, item) {
                        item.isSelected = false;
                    });
                    _temp.riskUnitAmt = 0;
                    _temp.prm = 0;
                    _temp.exTaxPremium = 0;
                    _temp.tax = 0;
                    _temp.amtChg = 0;
                    _temp.premChg = 0;
                    _temp.riskKeepAmt = 0;
                    _temp.retentProp = 0;
                }
                $scope.RU.dangerUnitList.push(_temp);
                countRiskUnitNo();
                //overflowSum();
                $scope.RU.editButton = false;
            };
//计算风险单位号（投保单）
            var countRiskUnitNo = function () {
                $.each($scope.RU.dangerUnitList, function (index, r) {
                    r.riskUnitNo = index + 1;
                });
            };

//初始化标的占比切换变量
            $scope.splitItemFlag = false;

            /**
             * 按标的拆分
             */
            $scope.splitItemRiskUnit = function (flag) {
                $.each($scope.RU.dangerUnitList, function (index, temp) {
                    temp.editing = flag;
                    temp.editSplit = flag;
                    temp.splitType = "1"
                });

                // console.log($scope.RU.dangerUnitList[0].splitType);

                $scope.editSplitFlag = true;

                $scope.splitMode.flag = "1";
                $scope.splitEditFlag = true;
            }

            /**
             * 按占比拆分
             * @param certiType   投保单 / 批单申请单  【1 投保单；2 批单申请单】
             * @param certiNo   投保单号/批单申请单号
             * @param user    用户
             * @param lan   语言
             */
            $scope.splitRiskUnit = function () {
                // console.log("splitRiskUnit start " + $scope.splitMode.flag);
//                if(confirm("此操作将无法恢复，确认按占比拆分吗？")){
                $scope.splitItemFlag = true;
                // console.log("按占比拆分所传参数：" + "certiType" + $scope.certiTypeCopy + " " + "certiNo:" + $scope.certiNo);
                $scope.showBusy(true);
                riskunitService.splitRiskUnit($scope.certiTypeCopy, $scope.certiNo, $scope.global.user, $scope.global.lang).then(
                    function (data) {
                        $scope.showBusy(false);
                        init();
                        $scope.$emit('notification', {message: '按占比拆分成功', delay: 3000, type: 'success'});

                        $scope.splitFlag = true;
                        $scope.splitMode.flag = 2;
                    },
                    function (code) {
                        throw (code);
                        $scope.showBusy(false);
                        $scope.$emit('notification', {message: '出错啦', delay: 8000, type: 'danger'});
                        //console.log(code);
                    }
                )

                //获取风险等级
                $.each($scope.RU.dangerUnitList, function (index, riskunits) {
                    //传参：险种代码，起保时间，币别，建筑类型，用户，语言
                    $scope.getRiskLevel(riskunits.insrnCCde, riskunits.startDate, riskunits.amtCur, riskunits.bldTypCde, $scope.global.user, $scope.global.lang);
                });
//                } else {
//                	$scope.splitItemFlag = false;
//                	$scope.splitFlag = false;
//                	$scope.splitMode.flag = "1";
//                	$scope.splitMode.flagFlag = "1";
//                	return ;
//                }

                // console.log("splitRiskUnit end " + $scope.splitMode.flag);
            };

//获取风险单位列表
            var getDangerUnitList = function () {
                $scope.searchRiskUnit($scope.certiNo);
                $scope.RU.P = false;
            };

            /**
             * 还原风险单位拆分
             *  certiType   投保单 / 批单申请单  【1 投保单；2 批单申请单】
             *  certiNo   投保单号/批单申请单号
             *  user    用户
             *  lan   语言
             */
            $scope.restoreRiskUnits = function () {
                if (confirm('确定要还原风险单位拆分吗？此操作不可恢复')) {
                    $scope.showBusy(true);//loading图片显示
                    riskunitService.revertRiskUnit($scope.certiTypeCopy, $scope.certiNo, $scope.global.user, $scope.global.lang).then(
                        function (data) {
//                            $scope.RU.dangerUnitList = prepareData(data);
//                            //重新计算分保试算
//                            $scope.showReinsShare();
                            $scope.showBusy(false);//loading图片显示
                            init();
                            $scope.$emit('notification', {message: '还原风险单位成功', delay: 3000, type: 'success'});
                        },
                        function (code) {
                            throw (code);
                            $scope.showBusy(false);//loading图片显示
                            $scope.$emit('notification', {message: '出错啦', delay: 8000, type: 'danger'});
                        }
                    )
                }
            };

//查询字典
            var searchFlag = true;
            $scope.searchList = [];
            $scope.getCode = function (keywords, user, searcher) {
                var temp = angular.copy({keywords: keywords, searcher: searcher});
                $scope.searchList.push(temp);
                if (searchFlag && $scope.searchList.length > 0) {
                    ralSearch();
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
//                            console.log("error  "+code);
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
                    )
                }
            };

//初始化拆分方式绑定字段
            $scope.splitMode = {
                flag: '2'
            }

//初始化风险等级变量
            $scope.riskLvls = {
                riskLvl: '',//风险等价
                retentAmt: null//自留额
            };
            $scope.cascadeConcatenation = function (item, itemList) {
                $.each($scope.riskLvls, function (index, temp) {
                    if (temp.riskClass == item) {
                        itemList.riskClassDesc = temp.riskClassDesc;//风险类别
                        itemList.retCurrency = temp.currency; //自留额币别
                        itemList.retentionValue = temp.retentionValue //自留额
                    }
                })
            }

            $scope.getSignedLineTotal = function (id) {

                for (var i = 0; i < $scope.dangerUnitFacEnquiry.feoReinsReceiveList.length; i++) {
                    if ($scope.dangerUnitFacEnquiry.feoReinsReceiveList[i].signedLine == id) {
                        $scope.signedLineTotal = id * $scope.dangerUnitFacEnquiry.feoReinsReceiveList[i].sumAmount
                    }
                }
            }
            //普通临分和特约临分
            $scope.checkBoxOne =function(items){
                if(items.facFlag == '1' && items.specialFacFlag == '1'){
                    alert('特约临分 和 普通临分 不能同时选择')
                    items.facFlag = '0'
                    items.specialFacFlag = '0'
                }
            }
            //            截取接受最后一位
            $scope.getInterceptingTheLast =function (item) {
                if(item.finalReinsCodes.other1 == 'D'){
                    item.addVatRate ='0.000000'
                }
                if(item.finalReinsCodes.other1 == 'F'){
                    item.addVatRate ='12.000000'
                }
            }

            var init = function () {
                $scope.trialListShareTrue = false //试算结果 默认不展示
                $scope.trialListShareTrueTable = true //试算列表
                $scope.reinsuranceTrue = true
                //生成缴费计划标志位
                $scope.planPropFlag = false;
                $scope.planNpropFlag = false;


                //控制分保试算附带按钮的折叠状态
                $scope.hideOption = true;

                //初始化除外责任
                $scope.exItemKindList = {
                    itemKindCode: '',
                    itemKindDesc: ''
                };

                //初始化等比分出变量值
                $scope.equalMark = 0;

                $scope.$on('$stateChangeStart', function (event, next) {
//                    console.log(next.name);
                    if (next.name === 'riskunit')
                        $scope.showSearchList();
                    if (next.name === 'riskunit.operation')
                        $scope.hideSearchList();
                });

                //获取币别
                // $scope.keywords = {
                //     id: '',
                //     value: ''
                // }
                //数据字典差寻条件
                $scope.keywords = {
                    "id":"",
                    "value":"",
                    "other1":""
                };
                var key = angular.copy($scope.keywords);
                key.id = "currency";
                key.value = "";
                $scope.getCode(key, {}, "currencys");

                var key = angular.copy($scope.keywords);
                key.id="reinsCode";
                key.value = "";
                $scope.getCode(key,{},"reinsCodes");
                //从路由获取的参数
                $scope.certiType = $stateParams.certiType;//1，投保单,2: 保单  ,3,批单申请单 4:批单
                $scope.editType = $stateParams.editType;//是否可编辑（0，查看，1，编辑）
                $scope.certiNo = $stateParams.certiNo;//投保单/批单号
                //console.log("从路由获取参数:"+"___"+"是否可编辑："+$scope.editType+"___"+"类型:"+$scope.certiType+"___"+"投保单/批单号："+$scope.certiNo);
                $scope.RU = {
                    riskItems: "",//按标的信息
                    proportion: "",//按占比
                    editButton: false,
                    reinsTrialList: [],      //所有分保试算结果
                    changeFlag: false,  //是否进行过增加/删除风险单位操作标志--false 未进行过
                    equalMark: false,            //是否等比分出  默认为false
                    addtionalTwoFlg: false,
                    dangerUnitList: [],
                    pagination: {
                        pageIndex: 1,
                        pageSize: 20
                    }
                };

                //要显示的分保试算结果
                $scope.reinsTrialList = [];

//              /*分保试算*/
//              $scope.showReinsShare();

                //保存按钮可用与否的一个标志位
                //$scope.feoXReinssFlag = 2;

                //初始化总保费，总保额变量
                $scope.unitAmountAccount = 0;
                $scope.premiumAccount = 0;
                $scope.noTaxPremiumAccount = 0;
                $scope.taxFeeAccount = 0;
                //初始化占比，标的标志位变量
                $scope.editSplitFlag = false;

                //占比与否标志位
                $scope.splitFlag = false;

                //编辑，手工拆分后增加显示与否标志位
                $scope.splitEditFlag = false;

                //初始化临分页面编辑与否标志位
                $scope.editTypeFlag = ($scope.editType === 1) || ($scope.editType === '1');

                //初始化超赔接收人接受比例之和等于层分出比例验证通过与否标志位
                $scope.checkRecepterFlag = true;

                //初始化输入时检查比例超赔接收人中的分保费是否等于缴费信息的分保费标志位
                $scope.checkComPrmEqualFlag = true;

                //初始化输入时检查比例超赔中接收人的分保费之和是否等于层信息的分保费
                $scope.checkLayerComPrmEqualFlag = true;

                //初始化风险单位标的拆分的区别主险的险种类别
                $scope.rdrCde = "";

                //初始化自留额
                $scope.retentionValueContant = 0;

                //初始化超赔层币别一致标志位
                $scope.currencyFlag = false;

                //初始化超赔层的分出份额不能大于100标志位
                $scope.fenchuFeneCheck = true;

                //路由处理
                $scope.certiTypeCopy = $scope.certiType;
                if ($scope.certiType === '2') {
                    $scope.certiType = "1";
                    $scope.editType = "0";
                    $scope.certiTypeCopy = "2";
                }
                if ($scope.certiType === '4') {
                    $scope.certiType = "3";
                    $scope.editType = "0";
                    $scope.certiTypeCopy = "4";
                }

                /*查询结果列表*/
                getDangerUnitList();

                //按标的拆分保存时验证是否选择恐怖险
                $scope.mainRiskUnit2CheckedArrayFlag = true;
                $scope.mainRisk2FlagArray = [];

                //分保费变化量的值应该小于等于分保费的值标志位
                $scope.fenbaofeiBhlFlag = true;
                $scope.fenbaofeiBhlFlagArray = [];

                //批单接收人，最终接收人是否可删除标志位
                $scope.delePFlag = false;

                //风险单位批单删除的记录备份
                $scope.deleteDateRecord = [];

                $scope.calReinsShareFlag = false;//设置试算不能点击---在5秒内不能重复点击
            };

            init();
        }])
    ;

})
;