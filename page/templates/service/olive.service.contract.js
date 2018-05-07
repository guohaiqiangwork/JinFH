define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 比例 非比例合约，基础数据处理
     ------------------------------------------*/
    angular.module('olive.service.contract', [])

        .constant('ContractServiceConfig', {
            files:{
                searchContract: {
                    'P': 'data/contract/contract.prop.list.json',
                    'PS': 'data/contract/contract.nprop.list.json'
                },

                getContract: {
                    'P': 'data/prop.detail.json',
                    'PS': 'data/contract.detail.json'
                },
                createContract: '',
                updateContract: '',
                updateContractsState: '',
                deleteContracts: '',
                copyContracts: '',
                transferContracts: ''
                

            },
            urls:{
                searchContract: config.backend.ip + config.backend.base + 'processFhTreaty.do?actionType=accQuery',

                getContract: config.backend.ip + config.backend.base + 'processFhTreaty.do?actionType=queryContract',

//                createContract: config.backend.ip + config.backend.base + 'treatyManage/createContract.do',
                createContract: config.backend.ip + config.backend.base + 'processFhTreaty.do?actionType=insert',              
                updateContract: config.backend.ip + config.backend.base + 'processFhTreaty.do?actionType=updateContract',
                updateContractsState: config.backend.ip + config.backend.base + 'processFhTreaty.do?actionType=updateContractsState',
                deleteContracts: config.backend.ip + config.backend.base + 'processFhTreaty.do?actionType=deleteContracts',
                copyContracts: config.backend.ip + config.backend.base + 'processFhTreaty.do?actionType=copyContracts',
                transferContracts:config.backend.ip + config.backend.base + 'processFhTreaty.do?actionType=transferContracts',
                searchImport: config.backend.ip + config.backend.base + 'importmodeFhCommRate.do?'
                
            }
        })
        .factory('ContractService',['$http', '$q', '$filter', 'ContractServiceConfig', function ($http, $q, $filter, contractServiceConfig) {
            var localElements = {

                //层信息
                "intention" : {
				            "plyAppNo": "",
				            "plyNo": "",
				            "edrAppNo": "",
				            "edrNo": "",
				            "facNo": "",
				            "layerNo": "1",
				            "dangerNo": 0,
				            "currency": "01",
				            "excessLoss": "",
				            "layerquota": "",
				            "totalquota": 0,
				            "layerPremium": 0,
				            "layerchgPremium": 0,
				            "shareRate": "",
				            "layerrePreium": 0,
				            "layerReChgPrem": 0,
				            "reinstTimes": 0,
				            "reinsTrate": 0,
				            "residualReinstsum": 0,
				            "reinstType": "",
				            "startDate": "",
				            "endDate": "",
				            "remarks": "",
				            "flag": "",
				            "endorTimes": 0,
				            "absExcessLoss": "",
				            "absLayerQuota": "",
				            "abShareRate": "",
				            "feoXReinsVos": [
				            	{
				                    "facNo": "",
				                    "layerNo": 0,
				                    "facRiComCde": "",
				                    "freinsCode": "",
				                    "reinsName": "",
				                    "brokerFlag": "0",
				                    "freinsName": "",
				                    "payCode": 0,
				                    "payName": 0,
				                    "shareRate": "",
				                    "premium": 0,
				                    "chgPreium": 0,
				                    "remarks": "",
				                    "memo": 0,
				                    "flag": "",
				                    "associateFlag": "",
				                    "clntNme": "",
				                    "tel": "",
				                    "fax": "",
				                    "mail": "",
				                    "addr": "",
				                    "zip": "",
				                    "ppwDate":0,
				                    "feoXFReinsVos": [
				                    ],
				                    "feoXPlanVos":[]
				                }
				            
				            ]
				        },

                //添加接收人（风险单位- 比例- 临分意向）
                "intentionRecepterProp" : {
                	 				"facNo": "",
						            "facRiComCde": "",
						            "plyAppNo": "",
						            "plyNo": "",
						            "edrappNo": "",
						            "edrNo": "",
						            "facComAmt": 0,
						            "facComPrm": 0,
						            "deductible": "",
						            "deductibleRate": "",
						            "specialEngage": "",
						            "facComComm": 0,
						            "facComTax": 0,
						            "facComVat": 0,
						            "facComCityTax": 0,
						            "facComEducationTax": 0,
						            "facComBroke": 0,
						            "facComExt": 0,
						            "facComDisc": 0,
						            "facComOther": 0,
						            "facComBalance": 0,
						            "facComIns": "",
						            "linkPlyNo": 0,
						            "linkEdrNo": 0,
						            "modeMrk": "0",
						            "clntNme": "",
						            "tel": "",
						            "fax": "",
						            "mail": "",
						            "addr": "",
						            "zip": "",
						            "brokerFlag": "0",
						            "isRateDiff": "0",
						            "facComProp": "",
						            "rate": 0.00,
						            "insGrntAmt": 0.0000,
						            "ppwDate": 0,
						            "difReins": 0,
						            "freinsName": "",
						            "signedLine": "",
						            "faccomOriAmt": 0,
						            "faccomOriPrm": 0,
						            "faccomOriComm": 0,
						            "faccomOriTax": 0,
						            "faccomOriBroke": 0,
						            "faccomOriExt": 0,
						            "faccomOriDisc": 0,
						            "faccomOriOther": 0,
						            "faccomOriBalance":0,
						            "faccomChgAmt": 0,
						            "faccomChgPrm": 0,
						            "faccomChgComm": 0,
						            "faccomChgTax": 0,
						            "faccomChgBroke": 0,
						            "faccomChgExt": 0,
						            "faccomChgDisc": 0,
						            "faccomChgOther": 0,
						            "faccomChgBalance": 0,
						            "facAbsComShare": 0,
						            "facPlyPays": [],
						            "facPlyFComShareVos": [],
            						"nfaccomOriDisc": 0
                	},

               

                //添加接收人（风险单位- 非比例- 临分意向）
                "intentionRecepterNprop" : {
                    "facNo": "",
                    "layerNo": 0,
                    "facRiComCde": "",
                    "freinsCode": "",
                    "reinsName": "",
                    "brokerFlag": "0",
                    "freinsName": "",
                    "payCode": 0,
                    "payName": 0,
                    "shareRate": "",
                    "premium": 0,
                    "chgPreium": 0,
                    "remarks": "",
                    "memo": 0,
                    "flag": "",
                    "associateFlag": "",
                    "clntNme": "",
                    "tel": "",
                    "fax": "",
                    "mail": "",
                    "addr": "",
                    "zip": "",
                    "ppwDate":0,
                    "feoXFReinsVos": [
                    ]
                },

                //添加分期信息（风险单位- 非比例- 临分意向）
                "intentionPlanNprop" : {
                    "facNo": "001210025042004000034",
                    "layerNo": 1,
                    "payTimes": 1,
                    "planDate": 1396281600000,
                    "currency": "01",
                    "payValue": 1000,
                    "flag": "0"
                },

                //添加期次
                "npropPay" : {
                     "treatyNo": "",
                     "layerNo": "",
                     "payNo": "",
                    "payTimes": "",
                    "planDate": "",
                    "currency": "01",
                    "payValue": "",
                    "flag": ""
                },

               //比例合同初始化元素集
                "prop" : {
                   /* "tmpContNo":"",*/
                    "treatyNo":"",
                    "refNo":"",
//                    "bsnsTyp":"",
                    "treatyType":"",//合同类型
                    "treatyName":"",//合同名称
                    "treatyEName":"",//合同英文全称
                    "exTreatyNo":"",//合约续转代码
                    "calculateBase":"0",//计算基础
                    "closeDate":"",//关闭日期
                    "uwYear":"",//业务年度
                    "startDate":"",//合同起期
                    "endDate":"",//合同止期
                    "extendDate":"",//续转日期
                    "rePremiumBase":"00",//分保基础
                    "accDate":"",//出账天数
                    "dueDate":"",//计算天数
//                    "isFixedRate":"",//是否固定费率分保
//                    "fixedRate":"",//固定费率分保费率%
                    "accPeriod":"0",//账单周期
//                    "expenseRate":"",//管理费率
//                    "cleanMode":"1",//合同结清方式
//                    "cleanYear":"",//未知字段
//                    "unearndPrm":"",//未满期保费转入（出）--（国泰不用）
//                    "pendOut":"",//未决赔款转入（出）--（国泰不用）
//                    "unearndPrmoutRate":"",//未满期保费转出比例%--（国泰不用）
//                    "pendOutRate":"",//未决赔款转出比例% --（国泰不用）
//                    "deductible":"",//合同免赔 --（国泰不用）
//                    "lossSharing":"",//损失分担 -- （国泰不用）
                    "stateFlag":"0",//合同状态
//                    "carFlag":"0",//是否为车险合同 -- （国泰不用）
//                    "carServAmoutFlag":"0",//车险合同属性 --（国泰不行）
//                    "optType":"00",
                    "fhSectionList":[
//                    "contOutInssects":[
                        {
//                            "tmpContNo":"",
                            "treatyNo":"",
                            "sectionNo":"a",//合约分项编码
                            "sectionCDesc":"",//合约分项中文描述
                            "sectionEDesc":"",//合约分项英文描述
                            "currency":"01",//币种
//                            "currencyName":"",
                            "reinsureRate":"",//分出比例（成数合约）
                            "limitValue":"",//合同限额
//                            "hurricaneLimit":"",//台风赔偿限额
//                            "floodLimit":"",//洪水赔偿限额
//                            "earthquakeLimit":"",//地震赔偿限额
                            "retentionValue":"",//最大自留额（溢额合约）
                            "taxRate":"6.00",
                            "commRate":"",//固定手续费（含营业税不含增值税）比例（%）
//                            "surplusLines":"",
                            "line":"",
                            "largeLossValue":"",//重大赔案通知额(立案时的估损，每次调整估损后都需判断是否达到重大赔案通知额)
                            "cashLossValue":"",//现金赔款通知额
//                            "othRate":"",
                            "brokerRate":'',//经纪人费比例
//                            "eqsectNo":"",//地震险子分项号
                            "commRate":"",//手续费(含税)比例(%)
//                            "sectionCarFlag":"",//高价车
//                            "freeTaxFlag":"1",
                            "vatRate":"6.00",
                            "cleanMode":"0",//合同结清方式
                             "cleanYear":"",//结清年限
                             "cashLossFlag":"0",//估损范围
                             "shareholderRate":"",//业务比例(%)
                             "shareholderMainCoinsRate":"",//主共业务比例
                             "shareholdersubCoinsRate":"",//从共业务比例
//                             "otherFee":"",//其他费用
                             "baseRate":"",//我司承担份额(%)
                             "lowOs":"",//损失共担条款下限(%)
                             "uperOs":"",//损失共担条款下限(%)
                             "accidentType":"",//事故类别
                             "accidentTypeValue":"",//事故类别限额
                             "liabilityLimitValue":"",//每次事故责任限额
                             "liabilityLimitValues":"",//累积事故责任限额
                             "shareholderLimRate":"",//股东业务限制比例(%)
                             "unShareholderLimRate":"",//非股东业务限制比例(%)
                             "lossShareRate":"",//损失共担比例(%)
                             "vatFlag":"1",//应税免税标识
                             "addVatRate":"12.00",//附加税比例(%)
                             "pcCleanMode":"0",//纯益手续费方式
                             "pcMinRate":"",//纯益手续费比例(%)
                             "expenseRate":"",//接受人管理费用比例(%)
                             "pcStartMths":"",//起算日期(月)
                             "carriedYrs":"",//亏损滚转周期(月)
                             "fhRiskList":[],
                            "fhSectionReinsList":[{
                            	"reinsCode":"",//接受人编码
    						    "shareRate":"",//所占份额
    						    "commRate" :""//手续费比例
                            }
                            ],
                             "fhCommRateList":[],
//                            "fhCommRateList":[]
//                            "contOutExpensiveCars":[]
                            
                        }

                    ],
                    "fhReinsList":[
//                    "contOutComShares":[//合约接收人信息
						{
//						    "tmpContNo":"",
						    "treatyNo":"",//合约号
						    "reinsCode":"",//接受人编码
						    "shareRate":"",//所占份额
						    "brokerFlag":"false",//经纪人标识：0-接受人,1-经纪人
//						    "isPrireins":"false",
//						    "ttyLinker":"",
//						    "ttyMobile":"",
//						    "ttyPhone":"",
//						    "ttyFax":"",
//						    "ttyEmail":"",
//						    "ttyAddress":"",
//						    "ttyPost":"",
						    "fhFinalReinsList":[]
//						    "fhFinalReinsList":[]
						}
                    ],
                    "fhExItemKindList":[]
                }
                ,

                //比例合同分项初始化元素集
                "propSection" : {
//                    "tmpContNo":"",
                    "treatyNo":"",//合约分享
                    "sectionNo":"",//合约分项
                    "sectionCDesc":"",//分项中文描述
                    "sectionEDesc":"",//分项英文描述
                    "currency":"01",
//                    "currencyName":"0", //币种名称
                    "reinsureRate":"",//分出比例(%)
                    "limitValue":"",//合同限额
                 //   "hurricaneLimit":"",//台风赔偿限额
//                    "floodLimit":"",//洪水赔偿限额
                //    "earthquakeLimit":"",//地震赔偿限额
                    "retentionValue":"",//合同最大自留额
                    "taxRate":"6.00",//营业税比例（%）
                    "commRate":"",//固定手续费（含营业税不含增值税）比例（%）
//                    "surplusLines":"",//
                    "largeLossValue":"",//重大赔案通知额
                    "cashLossValue":"",//现金赔款通知额
                  /*  "othRate":"",*/
//                    "brokeRate":"",//经纪人费比例
                   // "eqsectNo":"",//地震险子分项号
                    "commRate":"",//手续费(含税)比例(%)
//                    "freeTaxFlag":"1",
                    "line":"",
                    "vatRate":"6.00",                   
                    "cleanMode":"0",//合同结清方式
                    "cleanYear":"",//结清年限
                    "cashLossFlag":"0",//估损范围
                    "shareholderRate":"",//业务比例(%)
                    "shareholderMainCoinsRate":"",//主共业务比例
                    "shareholdersubCoinsRate":"",//从共业务比例
//                    "otherFee":"",//其他费用
                    "baseRate":"",//我司承担份额(%)
                    "lowOs":"",//损失共担条款下限(%)
                    "uperOs":"",//损失共担条款下限(%)
                    "accidentType":"",//事故类别
                    "accidentTypeValue":"",//事故类别限额
                    "liabilityLimitValue":"",//每次事故责任限额
                    "liabilityLimitValues":"",//累积事故责任限额
                    "shareholderLimRate":"",//股东业务限制比例(%)
                    "unShareholderLimRate":"",//非股东业务限制比例(%)
                    "lossShareRate":"",//损失共担比例(%)
                    "vatFlag":"1",//应税免税标识
                    "addVatRate":"12",//附加税比例(%)
                    "pcCleanMode":"0",//纯益手续费方式
                    "pcMinRate":"",//纯益手续费比例(%)
                    "expenseRate":"",//接受人管理费用比例(%)
                    "pcStartMths":"",//起算日期(月)
                    "carriedYrs":"",//亏损滚转周期(月)
                    "fhRiskList":[],
                    "fhSectionReinsList":[{
	                	"reinsCode":"",//接受人编码
					    "shareRate":"",//所占份额
					    "commRate" :""//手续费比例
	                	}
	                ],
                    "fhCommRateList":[],
//                    "comMission":""//固定手续费
//                    "contOutExpensiveCars":[]

                },
//
//                //比例合同地震险元素
//                "propAjusts":{
//                    "tmpContNo":"",
//                    "sectNo":"",
//                    "insrncCde":"",
//                    "rdrCde":"",
//                    "insrncName":"",
//                    "rdrName":"",
//                    "contNo":""
//                },

                //添加最终接收人 (比例)
                "propFinalRecepter" :  {
//                    "tmpContNo":"",
                    "treatyNo":"",
                    "reinsCode":"",
                    "freinsCode":"",
                    "shareRate":""
//                    "isPrireins":"false",
//                    "remark":0
                },

                //增加接收人（比例）
                "propRecepter" :  {//接受人
//                    "tmpContNo":"",
                    "treatyNo":"",
                    "reinsCode":"",
//                    "share":"",
                    "brokerFlag":"false",

//                    "isPrireins":"false",
//                    "ttyLinker":"",
//                    "ttyMobile":"",
//                    "ttyPhone":"",
//                    "ttyFax":"",
//                    "ttyEmail":"",
//                    "ttyAddress":"",
//                    "ttyPost":"",
                    "fhFinalReinsList":[]

   
                },
             
                //比例适用险种
                "propRisk" :   {
                    "treatyNo":"",
                    "sectionNo":"",
                    "riskCode":"",//险种代码
                    "riskName":"",
                    "flag":""
//                    "insrncCde":"",
//                    "rdrCde":"**",
//                    "insrncName":"",
//                    "rdrName":"",
//                    "contNo":"",
//                    "contOutprptPropexps":[]
                } ,

                //比例除外责任
                "propExclusion":{
                	 "treatyNo":"",//合约号
                     "sectionNo":"",//合约分项号
                     "riskCode":"",//险种,PK
//                     "objTypeCdeName":""
                     "riskName":""
                },

                //浮动手续费费率
                "propAdjustrate" :  {
//                    "tmpContNo":"",
                    "treatyNo":"",
                    "sectionNo":"",
                    "lowPaidRate":'',
                    "upperPaidRate":'',
                    "commRate":''
                },
//                //高价车
//                "propExpenCar" :  {
//                    "tmpContNo":"",
//                    "contNo":"",
//                    "sectNo":"",
//                    "carCode":"",
//                    "effecFlag":'1',
//                    "outRate":''
//                },
                //非比例合同初始化元素集
                "nprop" : {
                    "treatyNo": "",
                    "exTreatyNo": "",
                    "refNo": "",
                    "treatyName": "",
                    "treatyEName": "",
                    "treatyType": "U",
                    "uwYear": "",
                    "startDate": "",
                    "endDate": "",
                    "closeDate": "",
                    "currency": "01",
                    "extendDate": "",
                    "extendFlag": "",
                    "stateFlag": "0",
                    "flag": "",
                    "updaterCode": "",
                    "updaterTime": "",
                    "remarks": "",
                    "fhxLayerList":
                        [
                            {
                                
                                "treatyNo": "",
                                "layerNo": "1",
                                "layerType": "",
                                "layerCDesc": "",
                                "layerEDesc": "",
                                "currency": "01",
                                "excessLoss": 0,
                                "layerquota": 0,
                                "totalquota": 0,
                                "rate": 0.0000,
                                "rol": 0.0000,
                                "mdpRate": 0.0000,
                                "mdp": 0,
								"egnpi":0,
								"gnpi":0,
                                "layerPremium": 0,
                                "shareRate": "",
                                "reinstTimes": 0,
                                "reinstRate": 0.0000,
                                "residualReinstSum": "",
                                "reinstType": "1",
                                "remarks": "",
                                "flag": "",
                                "rwp": "",
                                "fhxPlanList":  [],
                                "fhxRiskList": [],
                                "fhxCompanyList" :[
                               	 {
                                        "treatyNo": "",
                                        "layerNo": "",
                                        "comCode": "",
                                        "comName": ""
                                }
                               	 ],
                                "fhxReinsList":
                                    [
                                        {
                                            "treatyNo": "",
                                            "layerNo": "1",
                                            "reinsCode": "",
                                            "reinsName": "",
                                            "freinsCode": "",
                                            "freinsName": "",
                                            "brokerFlag": "0",
                                            "payCode": "",
                                            "payName": "",
                                            "shareRate": ""
                                        }
                                    ]
                            }
                        ]
                   
                },


                //非比例层
                 "npropLayer" : {
                     "treatyNo": "",
                     "layerNo": "",
                     "layerType": "",
                     "layerCDesc": "",
                     "layerEDesc": "",
                     "currency": "01",
                     "excessLoss": 0,
                     "layerquota": 0,
                     "totalquota": 0,
                     "rate": 0.0000,
                     "rol": 0.0000,
                     "egnpi": 0,
                     "gnpi": 0,
                     "mdpRate": 0.0000,
                     "mdp": 0,
                     "layerPremium": 0,
                     "shareRate": "",
                     "reinstTimes": 0,
                     "reinstRate": "",
                     "residualReinstSum": 0,
                     "reinstType": "1",
                     "remarks": "",
                     "flag": "",
                     "rwp": "",
                     "fhxRiskList": [],
                     "fhxCompanyList" :[
                    	 {
                             "treatyNo": "",
                             "layerNo": "",
                             "comCode": "",
                             "comName": ""
                     }
                     ], 
                     "fhxReinsList":
                             [
                                 {
                                     "layerNo": "",
                                     "reinsCode": "",
                                     "treatyNo": "",
                                     "reinsName": "",
                                     "freinsCode": "",
                                     "freinsName": "",
                                     "brokerFlag": "0",
                                     "payCode": "",
                                     "payName": "",
                                     "shareRate": ""
                                 }
                             ],
                     "fhxPlanList":
                             [
                                 {
                                     "treatyNo": "",
                                     "layerNo": "",
                                     "payNo": "",
                                     "payTimes": 0,
                                     "planDate": "",
                                     "currency": "01",
                                     "payValue": 0,
                                     "flag": ""
                                 }
                             ]
                 },
/*
                //非比例最终接收人
                "npropFinalRecepter" : {
                        "treatyNo": "",
                        "layerNo": "",
                        "reinsCode": "",
                        "freinsCode": "",
                        "reinsName": "",
                        "freinsName": "",
                        "payCode": "",
                        "payName": "",
                        "shareRate": ""
                },*/

                //非比例接受人
                "npropRecepter" : {
                        "treatyNo": "",
                        "layerNo": "",
                        "reinsCode": "",
                        "reinsName": "",
                        "freinsCode": "",
                        "freinsName": "",
                        "brokerFlag": "0",
                        "payCode": "",
                        "payName": "",
                        "shareRate": ""
                },
                //非比例机构
                "npropCompany" : {
                        "treatyNo": "",
                        "layerNo": "",
                        "comCode": "",
                        "comName": ""
                },
                //非比例适用险种
                "npropRisk" :    {
                    "treatyNo": "",
                    "layerNo": "",
                    "riskCode": "",
                    "riskName": "",
                "fhxExItemKindList": []
                 },
                

                //非比例除外责任
                "npropExclusion":{
                    
                        "treatyNo": "",
                        "riskCode": "",
                        "itemKind": "",
                        "itemKindDesc": "",
                        "flag": ""
                }
            };

            var cleanContractData = function (contAttr, data) {
                switch(contAttr){
                    case('P'):
                        data.cancelTm = $filter('date')(data.cancelTm, config.display.dateFormat);
                        
                        data.contBgnTm = $filter('date')(data.contBgnTm, config.display.dateFormat);
                       
                        data.contEndTm = $filter('date')(data.contEndTm, config.display.dateFormat);
                     
                        break;
                    case('PS'):
                        break;
                }

                return data;
            };
            //清除合同的多余字段
            var cleanContractBackData = function(contAttr, contract){
            	contract = angular.copy(contract);
            	console.log(contract);
            	if(angular.isDefined(contract.endDateHold))
            		delete contract.endDateHold;
            	if(contAttr ==="prop"){
             		$.each(contract.fhReinsList, function(index, share){
             			delete share.priHideFlag;
             			delete share.warning;
             			$.each(share.fhFinalReinsList, function(index2, f){
             				delete f.hideFlag;
             			});
             		});
            		$.each(contract.fhSectionList, function(index1, section){
            			delete section.isActive;
            			delete section.insrncCde;
            			delete section.riComCdes ;
            			delete section.riComCde;
            			/*$.each(section.contOutInssectDtls, function(index2, risk){
            					delete risk.deletable;
            			});*/
//            			$.each(section.contOutInssectEqDtls, function(index3, earth){
//            					delete earth.deletable;
//            			});
            		});
            	}else{
            		$.each(contract.fhxLayerList, function(index, layer){
            			delete layer.isActive;
            			$.each(layer.fhxReinsList, function(index2, re){ 
        					delete re.warning;
        					delete re.priHideFlag;
        					
        				});
                		$.each(layer.fhxRiskList, function(index3, risk){
                			delete risk.deletable;
                		});
                		$.each(layer.fhxCompanyList, function(index3, company){
                			delete company.deletable;
                		});
            		});
            		
            	}
				
            	return contract;
            };
            return {
                //修改向后台传值时合同类型参数
                exchangeAttr : function(contAttr){
                    if(contAttr === "prop"){
                        return "P";
                    }else{
                        return "PS";
                    }
                },

                //获取初始化合同时的元素
                getElement : function(keyword){
                    return localElements[keyword];
                },
                /**
                 *  条件查看
                 * @param contAttr   区别比例非比例合同   'P'：比例；  'PS': 非比例
                 * @param keywords  查询数据
                 * @param pagination 分页信息
                 * @param user  操作用户信息
                 */
                searchContract: function (contAttr, keywords, pagination, user) {
                    contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? contractServiceConfig.files.searchContract[contAttr] : contractServiceConfig.urls.searchContract;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                            contAttr:contAttr,
                            keywords:keywords,
                            pagination:pagination,
                            user:user
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });

                    return deffered.promise;
                },
                /**
                 * 导入浮动手续费率表
                 */
                searchImport: function (fd,file) {
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? contractServiceConfig.files.searchImport : contractServiceConfig.urls.searchImport;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                            fd:fd,
                            file:file
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });

                    return deffered.promise;
                },
                /**
                 *  查看合同详细
                 * @param contAttr   区别比例非比例合同
                 * @param contractNo  合同主键
                 * @param user  操作用户信息
                 */
                getContract: function (contAttr, contractNo, user) {
                   contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? contractServiceConfig.files.getContract[contAttr] : contractServiceConfig.urls.getContract;

                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                            contAttr:contAttr,
                            contractNo:contractNo,
                            user:user
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                        	deffered.resolve(data);
                      //      deffered.resolve(cleanContractData(contAttr, data));
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                /**
                 * 新增
                 * @param contAttr   区别比例非比例合同
                 * @param contract  合同数据
                 * @param user  操作用户信息
                 */
                createContract: function (contAttr, contract, user) {
                	contract = cleanContractBackData(contAttr, contract);
                    contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();
                    console.log("即将新建合同：=======");
                    console.log(contract);
                    var _url = config.data.method==='files'? contractServiceConfig.files.createContract : contractServiceConfig.urls.createContract;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        //url: contractServiceConfig[config.data.method].createContract,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            contAttr:contAttr,
                            contract:contract,
                            user:user
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            //data = eval('('+data+')');
                            //data = JSON.parse(data);
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                            //deffered.resolve([{contractNo:'00001',
                            //contractName:'abc'}]);
                        });
                    return deffered.promise;
                },
               
                
                /**
                 * 编辑合同
                 * @param contAttr   区别比例非比例合同
                 * @param contract  合同数据
                 * @param user   操作用户信息
                 */
                updateContract: function (contAttr, contract, user) {
                	contract = cleanContractBackData(contAttr, contract);
                    contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();
                    console.log("即将更新合同：=======");
                    console.log(contract);
                    var _url = config.data.method==='files'? contractServiceConfig.files.updateContract : contractServiceConfig.urls.updateContract;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        //url: contractServiceConfig[config.data.method].updateContract,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            contAttr:contAttr,
                            contract:contract,
                            user:user
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            //data = eval('('+data+')');
                            //data = JSON.parse(data);
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                            //deffered.resolve([{contractNo:'00001',
                            //contractName:'abc'}]);
                        });
                    return deffered.promise;
                },
                /**
                 *设置状态
                 * @param contAttr   区别比例非比例合同
                 * @param contracts  根据主键修改状态【包括contractNo,state】
                 * @param user  操作用户信息
                 */
                updateContractsState: function (contAttr, contracts, user) {
                    console.log("setState : "+contAttr);
                    console.log(contracts);
                    contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? contractServiceConfig.files.updateContractsState : contractServiceConfig.urls.updateContractsState;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url:_url,
                       // url: contractServiceConfig[config.data.method].updateContractsState,
                        headers: {
                        },
                        data:{
                            contAttr:contAttr,
                            contracts:contracts,
                            user:user
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            //data = eval('('+data+')');
                            //data = JSON.parse(data);
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                            //deffered.resolve([{contractNo:'00001',
                            //contractName:'abc'}]);
                        });
                    return deffered.promise;
                },
                /**
                 * 批量删除合同
                 * @param contAttr   区别比例非比例合同
                 * @param contracts  批量删除主键[contractNo]
                 * @param user  操作用户信息
                 */
                deleteContracts: function (contAttr, contracts, user) {
                    contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? contractServiceConfig.files.deleteContracts : contractServiceConfig.urls.deleteContracts;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        // url: contractServiceConfig[config.data.method].deleteContracts,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            contAttr:contAttr,
                            contracts:contracts,
                            user:user
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            //data = eval('('+data+')');
                            //data = JSON.parse(data);
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                            //deffered.resolve([{contractNo:'00001',
                            //contractName:'abc'}]);
                        });
                    return deffered.promise;
                },
                /**
                 * 批量复制合同
                 * @param contAttr   区别比例非比例合同
                 * @param contracts  合同主键[contractNo]
                 * @param user   操作用户信息
                 */
                copyContracts: function (contAttr, contracts, user) {
                    contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? contractServiceConfig.files.copyContracts : contractServiceConfig.urls.copyContracts;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        //  url: contractServiceConfig[config.data.method].copyContracts,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            contAttr:contAttr,
                            contracts:contracts,
                            user:user
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            //data = eval('('+data+')');
                            //data = JSON.parse(data);
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                            //deffered.resolve([{contractNo:'00001',
                            //contractName:'abc'}]);
                        });
                    return deffered.promise;
                },
                /**
                 * 续传合同
                 * @param contAttr   区别比例非比例合同
                 * @param contracts  合同主键[contractNo]
                 * @param user   操作用户信息
                 */
                transferContracts: function (contAttr, contracts, user) {
                   contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? contractServiceConfig.files.transferContracts : contractServiceConfig.urls.transferContracts;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        //  url: contractServiceConfig[config.data.method].transferContracts,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            contAttr:contAttr,
                            contracts:contracts,
                            user:user
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                            //deffered.resolve([{contractNo:'00001',
                            //contractName:'abc'}]);
                        });
                    return deffered.promise;
                }
                //非比例分出账务处理------------------------------start-------------------------------
                
            };
        }]);

});