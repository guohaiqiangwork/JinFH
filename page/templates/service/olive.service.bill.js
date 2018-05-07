/**
 * Created by Administrator on 14-3-20.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 分出业务非比例管理
     ------------------------------------------*/
    angular.module('olive.service.bill', [])
        .constant('BillServiceConfig', {
            files:{
            	prepareCreateBill: {
                    'nprop.contract.2.2.08': 'data/bill/parepareImportComShare.json',
                    'nprop.contract.2.2.09': 'data/bill/parePareInputPremium.json',
                    'nprop.contract.2.2.10': 'data/bill/parePareInputPremium.json'
                },
                createBill:{

                /*contAttr - 比例【P】 /非比例 【PS】
                contFacMrk   合同【0】/临分【1】
                inOutMrk   分入【1】/分出【0】
                inExMrk   对内【0】/对外【1】 没有的为2
                billType    账单类型*/
                    'nprop.contract.2.2.08':'data/bill/genXsBillMain.json', //预付费对内账单
                    'nprop.contract.2.2.09':'data/bill/genTBAdjustAcc.json', //超赔调整账单生成
                    'prop.contract.0.2.06':'data/bill/genTtyTBBill.json',     //月度预提账单
                    'prop.contract.0.2.01':'data/bill/genTtyTRBill.json',         //季度账单
                    'prop.contract.0.2.04':'data/bill/genProOutFCXBill.json', //纯益手续费账单 yanliming 2015-05-22
                    'prop.contract.0.2.02':'data/bill/genProOutFCXBill.json', //现金手续费账单 yanliming 2015-05-27
                    'prop.contract.0.2.03':'data/bill/genProOutFCXBill.json' //浮动手续费账单 /zhangxiaoyong 2015-05-25
                },
                deleteBill: {
                	'nprop.contract.2.2.08':'data/bill/deleteTBAccList.json',//删除预付账单类型
                    'nprop.contract.2.2.09':'data/bill/deleteTBAccList.json',//删除调整账单类型
                    'nprop.contract.2.2.10':'data/bill/deleteTBAccList.json',//删除赔付率账单类型
                    'prop.contract.0.2.06':'data/bill/delTtyTBBill.json', //月度预提账单
                	'prop.contract.0.2.01':'data/bill/delTtyTRBill.json' //季度账单 
                },
                searchBill:{
                	'nprop.contract.2.2.08': 'data/bill/showTBAccList.json', //预付费对内账单
                    'nprop.contract.2.2.09': 'data/bill/showTBAccList.json', //超赔调整账单生成
                    'nprop.contract.2.2.10': 'data/bill/showTBAccList.json', //赔付率调整账单
                	'prop.contract.0.2.06': 'data/bill/showTBBillList.json', //月度预提账单
                	'prop.contract.0.2.01': 'data/bill/showTRBillList.json' , //季度账单
                	'prop.contract.0.2.02':'data/bill/showTRBillList.json', //现金赔款账单  yanliming 2015/06/02
                	'prop.contract.0.2.04':'data/bill/showTRBillList.json', //纯益手续费账单 yanliming 2015/06/02
                	'prop.fac.0.2.11': 'data/bill/showFacAccOut.json',  //临分分保账单查看
                	'prop.fac.0.2.13': 'data/bill/showFacAccOut.json'  //临分分批账单查看
                } ,
                confirmBill: {
                	'prop.contract.0.2.06':'data/bill/confirmTtyTBBill.json', //月度预提账单
                	'prop.contract.0.2.01':'data/bill/confirmTtyTRBill.json',  //季度账单
//                	'nprop.contract.2.2.08': 'data/bill/comfirmAccList.json', //预付费对内账单审核
                	'nprop.contract.2.2.08': 'data/bill/accToPayment.json', //预付费对内账单送收付
                	'nprop.contract.2.2.09': 'data/bill/accToPayment.json', //调整账单类型
                	'nprop.contract.2.2.10': 'data/bill/showTBAccList.json' //赔付率账单类型
                },
                searchRecertiBill:'',
                importFhxBill: 'data/bill/saveFhxComShareList.json',
                getSectionDtl: 'data/bill/saveActRetenPremium.json',
                getBillDate:{
                	'prop': 'data/bill/getTreatyAccPeriods.json' ,//比例合同账单获取账单期
                	'nprop': 'data/bill/getTreatyAccPeriods.json' //超赔账单获取账单期
                },
                updateOutBill:'',
                searchBillDetail: 'data/bill/showTRBillItem.json',
                searchInBillDetail: '' 	
            },
            urls:{
                prepareCreateBill: {
                    'nprop.contract.2.2.08': config.backend.ip + config.backend.base + 'xolContBill/parepareImportComShare.do',
                    'nprop.contract.2.2.09': config.backend.ip + config.backend.base + 'xolContBill/parePareInputPremium.do',
                    'nprop.contract.2.2.10': config.backend.ip + config.backend.base + 'xolContBill/parePareInputPremium.do'
                },
                createBill:{
                /*contAttr - 比例【P】 /非比例 【PS】
                contFacMrk   合同【0】/临分【1】
                inOutMrk   分入【1】/分出【0】
                inExMrk   对内【0】/对外【1】 没有的为2
                billType    账单类型*/
//                    'nprop.contract.2.0.08':config.backend.ip + config.backend.base + 'xolContBill/genXsBillMain.do', //预付费对内账单
//                    'nprop.contract.2.1.08':config.backend.ip + config.backend.base + 'xolContBill/genXsBillMain.do', //预付费对外账单
                    'nprop.contract.2.2.08':config.backend.ip + config.backend.base + 'xolContBill/genXsBillMain.do',//预付费对内账单（原）
                    'nprop.contract.2.2.09':config.backend.ip + config.backend.base + 'xolContBill/genTBAdjustAcc.do', //超赔调整账单生成
                    'prop.contract.0.2.06':config.backend.ip + config.backend.base + 'ttyAcc.do?acctype=genTtyAccTB',     //月度预提账单
                    'prop.contract.0.2.01':config.backend.ip + config.backend.base + 'ttyAcc.do?acctype=genTtyAccTR',         //季度账单
                    'prop.contract.b.2.06':config.backend.ip + config.backend.base + 'contBill/genTtyBatchTBBill.do',     //月度预提账单批量生成
                    'prop.contract.b.2.01':config.backend.ip + config.backend.base + 'contBill/genTtyBatchTRBill.do',         //季度账单批量生成
                    'prop.contract.0.2.04':config.backend.ip + config.backend.base + 'contBill/genProOutFCXBill.do', //纯益手续费账单 yanliming 2015-05-22
                    'prop.contract.0.2.02':config.backend.ip + config.backend.base + 'contBill/genProOutFCXBill.do', //现金手续费账单 yanliming 2015-05-27
                    'prop.contract.0.2.03':config.backend.ip + config.backend.base + 'contBill/genProOutFCXBill.do' //浮动手续费账单 /zhangxiaoyong 2015-05-25
                },       
                updateOutBill:{
                    'prop.contract.0.2.04':config.backend.ip + config.backend.base + 'contBill/updateProOutFCXBill.do', //编辑纯益手续费账单 yanliming 2015-06-01
                    'prop.contract.0.2.02':config.backend.ip + config.backend.base + 'contBill/updateProOutFCXBill.do', //编辑现金手续费账单 yanliming 2015-06-01
                    'prop.contract.0.2.03':config.backend.ip + config.backend.base + 'contBill/updateProOutFCXBill.do', //编辑浮动手续费账单 yanliming 2015-06-19
                    'prop.contract.1.2.01':config.backend.ip + config.backend.base + 'contInBill/updateBill.do', //编辑分入季度账单 yanliming 2015-06-25
                    'prop.contract.1.2.02':config.backend.ip + config.backend.base + 'contInBill/updateBill.do', //编辑分入现金账单 yanliming 2015-06-30
                    'prop.contract.1.2.04':config.backend.ip + config.backend.base + 'contInBill/updateBill.do' //编辑分入纯益手续费账单 zhangxiaoyong 2015-06-09

                },
                deleteBill: {
                	'nprop.contract.2.2.08':config.backend.ip + config.backend.base + 'xolContBill/deleteTBAccList.do',//删除预付账单类型
                    'nprop.contract.2.2.09':config.backend.ip + config.backend.base + 'xolContBill/deleteTBAccList.do',//删除调整账单类型
                    'nprop.contract.2.2.10':config.backend.ip + config.backend.base + 'xolContBill/deleteTBAccList.do',//删除赔付率账单类型
                    'prop.contract.0.2.06':config.backend.ip + config.backend.base + 'contBill/delTtyTBBill.do', //月度预提账单
                	'prop.contract.0.2.01':config.backend.ip + config.backend.base + 'contBill/delTtyTRBill.do'  //季度账单
                },
                searchBill:{ /*张*/
                	'nprop.contract.2.2.08':config.backend.ip + config.backend.base +  'xolContBill/showTBAccList.do', //预付费对内账单（原）
//                	'nprop.contract.2.0.08':config.backend.ip + config.backend.base +  'xolContBill/showTBAccList.do', //预付费对内账单
//                	'nprop.contract.2.1.08':config.backend.ip + config.backend.base +  'xolContBill/showTBAccList.do', //预付费对外账单
                    'nprop.contract.2.2.09':config.backend.ip + config.backend.base +  'xolContBill/showTBAccList.do', //超赔调整账单生成
                    'nprop.contract.2.2.10':config.backend.ip + config.backend.base +  'xolContBill/showTBAccList.do', //赔付率调整账单
                	'prop.contract.0.2.06':config.backend.ip + config.backend.base + 'getAccPeriod.do?accKind=I', //分出月度预提账单
                	'prop.contract.0.2.04':config.backend.ip + config.backend.base + 'getAccPeriod.do?accKind=F', //分出纯益手续费账单 yanliming 2015/06/02
                	'prop.contract.0.2.02':config.backend.ip + config.backend.base + 'getAccPeriod.do?accKind=C', //分出现金赔款账单   yanliming 2015/06/02
                	'prop.contract.0.2.03':config.backend.ip + config.backend.base + 'getAccPeriod.do?accKind=A', //分出浮动手续费账单 zhangxiaoyong 2015/06/17
                	'prop.contract.0.2.01':config.backend.ip + config.backend.base + 'getAccPeriod.do?accKind=G' , //分出季度账单
                	'prop.contract.1.2.01':config.backend.ip + config.backend.base + 'contBill/showTRBillList.do' , //分入季度账单
                	'prop.contract.1.2.07':config.backend.ip + config.backend.base + 'contBill/showTRBillList.do' , //分入浮动账单
                	'prop.contract.1.2.04':config.backend.ip + config.backend.base + 'contBill/showTRBillList.do' , //分入纯益账单
                	'prop.contract.1.2.02':config.backend.ip + config.backend.base + 'contBill/showTRBillList.do' , //分入现金账单
                	'prop.fac.0.2.11':config.backend.ip + config.backend.base + 'facBill/showFacAccOut.do',  //临分业务分保账单查看
                	'prop.fac.0.2.13':config.backend.ip + config.backend.base + 'facBill/showFacClmAccOut.do',  //临分业务分赔账单查看
                	'prop.acc.0.2.1':config.backend.ip + config.backend.base + 'facBill/showFacAccIn.do',  //临分分入分保账单查看
                	'prop.acc.0.2.2':config.backend.ip + config.backend.base + 'facBill/showFacAccIn.do',  //临分分入分批账单查看
                	'prop.acc.0.2.3':config.backend.ip + config.backend.base + 'facBill/showFacAccIn.do'  //临分分入分赔账单查看
                },
                confirmBill: {
                	'prop.contract.0.2.06':config.backend.ip + config.backend.base + 'contBill/confirmTtyTBBill.do', //月度预提账单
                	'prop.contract.0.2.01':config.backend.ip + config.backend.base + 'contBill/confirmTtyTRBill.do',  //季度账单
                	'prop.contract.0.2.02':config.backend.ip + config.backend.base + 'contBill/confirmProOutFCXBill.do', //分出现金赔款账单确认 yanliming 2015/06/23
                	'prop.contract.0.2.03':config.backend.ip + config.backend.base + 'contBill/confirmProOutFCXBill.do', //分出浮动手续费账单确认 yanliming 2015/06/23
                	'prop.contract.0.2.04':config.backend.ip + config.backend.base + 'contBill/confirmProOutFCXBill.do', //分出纯益手续费账单确认 yanliming 2015/06/23
//                	'nprop.contract.2.2.08':config.backend.ip + config.backend.base +  'xolContBill/comfirmAccList.do', //预付费对内账单审核
                	'nprop.contract.2.2.08':config.backend.ip + config.backend.base +  'xolContBill/accToPayment.do', //预付费对内（原）账单送收付
//                	'nprop.contract.2.0.08':config.backend.ip + config.backend.base +  'xolContBill/accToPayment.do', //预付费对内账单送收付
//                	'nprop.contract.2.1.08':config.backend.ip + config.backend.base +  'xolContBill/accToPayment.do', //预付费对外账单送收付
                	'nprop.contract.2.2.09':config.backend.ip + config.backend.base +  'xolContBill/accToPayment.do', //调整账单类型--------------------------------
                	'prop.contract.1.2.02':config.backend.ip + config.backend.base + 'contInBill/confirmTtyInBill.do',//分入现金赔款2015/5/11
                	'nprop.contract.2.2.10':config.backend.ip + config.backend.base +  'xolContBill/showTBAccList.do', //赔付率账单类型
                	'prop.contract.1.2.01':config.backend.ip + config.backend.base + 'contInBill/confirmTtyInBill.do',  //分入季度账单确认 2015、4、27 genTtyBatchTSBill
                	'prop.contract.1.2.03':config.backend.ip + config.backend.base + 'contInBill/confirmTtyInBill.do',
                	'prop.contract.1.2.04':config.backend.ip + config.backend.base + 'contInBill/confirmTtyInBill.do'
                },
                searchContInBill : config.backend.ip + config.backend.base + 'contInBill/searchContInBill.do',//合同分入账单查询列表
                createContInBill : config.backend.ip + config.backend.base + 'contInBill/createContInBill.do',//合同分入生成账单。
                getSectNos:config.backend.ip + config.backend.base + 'contInBill/getSectNos.do',//合约分项
                getReins:config.backend.ip + config.backend.base + 'contInBill/getReins.do',//合约分出人
                getInBillTime:config.backend.ip + config.backend.base + 'getAccPeriod1.do',//获取账单起期和账单止期
                getFeeSign:config.backend.ip + config.backend.base + 'contInBill/getFeeSign.do',//判断账单项目分项
                searchRecertiBill:'',
                importFhxBill: config.backend.ip + config.backend.base + 'xolContBill/saveFhxComShareList.do',
                getSectionDtl:config.backend.ip + config.backend.base + 'xolContBill/saveActRetenPremium.do',
                getBillDate:{
                	'prop':config.backend.ip + config.backend.base + 'getAccPeriod.do' ,//比例合同账单获取账单期
                	'nprop':config.backend.ip + config.backend.base + 'getAccPeriod.do', //超赔账单获取账单期
                	'batch':config.backend.ip + config.backend.base + 'contBill/getTtyBatchAccPeriods.do' //比例分出合同账单批量获取账单期
                },
                searchBillDetail:config.backend.ip + config.backend.base + 'contBill/showTRBillItem.do',    //查询季度账单详细信息
                searchInBillDetail : config.backend.ip + config.backend.base + 'contInBill/getByBillOut.do' //通过账单号进行查询  zhangxiaoyong 2015-06-04 	
                	
            }
        })
        .factory('BillService',['$http', '$q', 'BillServiceConfig', function ($http, $q, billServiceConfig) {
            return {
                //非比例分出账务处理------------------------------start-------------------------------

                /* 事故分摊	用查询合同接口 */

                /* 条件查询方法 -- 同合同查询 **********************************************************/

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
                prepareCreateBill : function(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, user, lan){
                    var deffered = $q.defer();
                    var urlString = contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType;
                    console.log("urlString 's value is : " + urlString);  
                    var _url = config.data.method==='files'? billServiceConfig.files.prepareCreateBill[urlString]: billServiceConfig.urls.prepareCreateBill[urlString];
                    if(angular.isDefined(_url)){
	                    $http({
	                        method: config.data.method==='files'? 'GET':'POST',
	                        dataType: "json",
	                        contentType:'application/json; charset=UTF-8',
	                        url: _url,
	                        headers: {
	                        },
	                        data:{
	                            contAttr:contAttr,
	                            contFacMrk:contFacMrk,
	                            inOutMrk:inOutMrk,
	                            inExMrk:inExMrk,
	                            billType:billType,
	                            keywords:keywords,
	                            user:user,
	                            lan:lan
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
                    } else {
                    	var msg = config.data.method==='files'?"json文件未找到":".do请求未找到";
                    	deffered.reject(msg);
                    	return deffered.promise;
                    }
                },

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
                createBill : function(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, user, lan){
                    var deffered = $q.defer();
                    var urlString = contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType;
                    console.log("urlString 's value is : " + urlString);  /*'s value is : prop.contract.0.2.06*/
                    var _url = config.data.method==='files'? billServiceConfig.files.createBill[urlString]: billServiceConfig.urls.createBill[urlString];
	                if(angular.isDefined(_url)){ 
	                    $http({
	                        method: config.data.method==='files'? 'GET':'POST',
	                        dataType: "json",
	                        contentType:'application/json; charset=UTF-8',
	                        url: _url,
	                        headers: {
	                        },
	                        data:{
	                            contAttr:contAttr,
	                            contFacMrk:contFacMrk,
	                            inOutMrk:inOutMrk,
	                            inExMrk:inExMrk,
	                            billType:billType,
	                            keywords:keywords,
	                            user:user,
	                            lan:lan
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
                    } else {
                    	var msg = config.data.method==='files'?"json文件未找到":".do请求未找到";
                    	deffered.reject(msg);
                    	return deffered.promise;
                    }
                },
                
                /**
                 * 编辑现金、纯益手续费账单 yanliming 2015-06-01
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
                updateOutBill : function(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, user, lan){
                    var deffered = $q.defer();
                    var urlString = contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType;
                    console.log("urlString 's value is : " + urlString); urlString /*'s value is : prop.contract.0.2.06*/
                    var _url = config.data.method==='files'? billServiceConfig.files.updateOutBill: billServiceConfig.urls.updateOutBill[urlString];
	                if(angular.isDefined(_url)){ 
	                    $http({
	                        method: config.data.method==='files'? 'GET':'POST',
	                        dataType: "json",
	                        contentType:'application/json; charset=UTF-8',
	                        url: _url,
	                        headers: {
	                        },
	                        data:{
	                            contAttr:contAttr,
	                            contFacMrk:contFacMrk,
	                            inOutMrk:inOutMrk,
	                            inExMrk:inExMrk,
	                            billType:billType,
	                            keywords:keywords,
	                            user:user,
	                            lan:lan
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
                    } else {
                    	var msg = config.data.method==='files'?"json文件未找到":".do请求未找到";
                    	deffered.reject(msg);
                    	return deffered.promise;
                    }
                },
                /**
                 * 合同分入账单生成
                 * @param contAttr     账单类型
                 * @param keywords     数据
                 * @param user       操作用户
                 * @param lan       语言
                 * @returns {Function|promise|promise|promise}
                 */
                createContInBill : function(contAttr, keywords, user){
                    var deffered = $q.defer();
                    console.log("合同分入账单生成");
                    var _url = config.data.method==='files'? billServiceConfig.files.createContInBill : billServiceConfig.urls.createContInBill;
                    console.log("_url======"+_url);
                    if(angular.isDefined(_url)){
	                    $http({
	                        method: config.data.method==='files'? 'GET':'POST',
	                        dataType: "json",
	                        contentType:'application/json; charset=UTF-8',
	                        url: _url,
	                        headers: {
	                        },
	                        data:{
	                            contAttr:contAttr,
	                        	contract:keywords,
	                            user:user,
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
                    } else {
                    	var msg = config.data.method==='files'?"json文件未找到":".do请求未找到";
                    	deffered.reject(msg);
                    	return deffered.promise;
                    }
                },
                /**
                 * 合同起期，合同止期
                 * @param accPeriod     数据
                 * @param user       操作用户
                 * @param lan       语言
                 * @returns {Function|promise|promise|promise}
                 */
                getInBillTime : function(accPeriod, user){
                    var deffered = $q.defer();
                    console.log("合同起期，合同止期");
                    var _url = config.data.method==='files'? billServiceConfig.files.getInBillTime : billServiceConfig.urls.getInBillTime;
                    if(angular.isDefined(_url)){ 
	                    $http({
	                        method: config.data.method==='files'? 'GET':'POST',
	                        dataType: "json",
	                        contentType:'application/json; charset=UTF-8',
	                        url: _url,
	                        headers: {
	                        },
	                        data:{
	                        	accPeriod:accPeriod
//	                            user:user,
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
                    } else {
                    	var msg = config.data.method==='files'?"json文件未找到":".do请求未找到";
                    	deffered.reject(msg);
                    	return deffered.promise;
                    }
                },
                /**
                 * 合约分项
                 * @param accPeriod     数据
                 * @param user       操作用户
                 * @param lan       语言
                 * @returns {Function|promise|promise|promise}
                 */
                getSectNos : function(tmpContNo, user){
                    var deffered = $q.defer();
                    console.log("合约分项");
                    var _url = config.data.method==='files'? billServiceConfig.files.getSectNos : billServiceConfig.urls.getSectNos;
                    if(angular.isDefined(_url)){ 
	                    $http({
	                        method: config.data.method==='files'? 'GET':'POST',
	                        dataType: "json",
	                        contentType:'application/json; charset=UTF-8',
	                        url: _url,
	                        headers: {
	                        },
	                        data:{
	                        	tmpContNo:tmpContNo
//	                            user:user,
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
                    } else {
                    	var msg = config.data.method==='files'?"json文件未找到":".do请求未找到";
                    	deffered.reject(msg);
                    	return deffered.promise;
                    }
                },
                /**
                 * 合约分出人
                 * @param accPeriod     数据
                 * @param user       操作用户
                 * @param lan       语言
                 * @returns {Function|promise|promise|promise}
                 */
                getReins : function(tmpContNo, user){
                	var deffered = $q.defer();
                	console.log("合约分出人");
                	var _url = config.data.method==='files'? billServiceConfig.files.getReins : billServiceConfig.urls.getReins;
                	if(angular.isDefined(_url)){ 
                		$http({
                			method: config.data.method==='files'? 'GET':'POST',
                					dataType: "json",
                					contentType:'application/json; charset=UTF-8',
                					url: _url,
                					headers: {
                					},
                					data:{
                						tmpContNo:tmpContNo
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
                	} else {
                		var msg = config.data.method==='files'?"json文件未找到":".do请求未找到";
                		deffered.reject(msg);
                		return deffered.promise;
                	}
                },
                /**
                 * 判断账单项目分项
                 * @param accPeriod     数据
                 * @param user       操作用户
                 * @param lan       语言
                 * @returns {Function|promise|promise|promise}
                 */
                getFeeSign : function(feeCde){
                    var deffered = $q.defer();
                    console.log("判断账单项目分项");
                    var _url = config.data.method==='files'? billServiceConfig.files.getFeeSign : billServiceConfig.urls.getFeeSign;
                    if(angular.isDefined(_url)){ 
	                    $http({
	                        method: config.data.method==='files'? 'GET':'POST',
	                        dataType: "json",
	                        contentType:'application/json; charset=UTF-8',
	                        url: _url,
	                        headers: {
	                        },
	                        data:{
	                        	feeCde:feeCde
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
                    } else {
                    	var msg = config.data.method==='files'?"json文件未找到":".do请求未找到";
                    	deffered.reject(msg);
                    	return deffered.promise;
                    }
                },
                /**
                 * 删除预付分保费
                 * 删除对内对外账单
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
                deleteBill : function(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, user, lan){
                    var deffered = $q.defer();
                    if(contAttr === 'prop'){
	                    var _url = config.data.method==='files'? billServiceConfig.files.deleteBill : 
	                    	billServiceConfig.urls.deleteBill[contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType];
                    
                    } else {
                    	var paramV = contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType;
                     	var _url = config.data.method==='files'? billServiceConfig.files.deleteBill : billServiceConfig.urls.deleteBill[paramV];
                    }
                   	console.log(contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType);
                   	if(angular.isDefined(_url)){
	                    $http({
	                        method: config.data.method==='files'? 'GET':'POST',
	                        dataType: "json",
	                        contentType:'application/json; charset=UTF-8',
	                        url: _url,
	                        headers: {
	                        },
	                        data:{
	                            contAttr:contAttr,
	                            contFacMrk:contFacMrk,
	                            inOutMrk:inOutMrk,
	                            inExMrk:inExMrk,
	                            billType:billType,
	                            keywords:keywords,
	                            user:user,
	                            lan:lan
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
                    } else {
                    	var msg = config.data.method==='files'?"json文件未找到":".do请求未找到";
                    	deffered.reject(msg);
                    	return deffered.promise;
                    }
                },

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
                searchBill:function(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, pagination, user, lan){
                	console.log("searchBill");
                    var deffered = $q.defer();
                    var _url='';
                    if(contAttr === "nprop"){
                    	var paramV = contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType;
                    	console.log("paramV 's value is :" + paramV);
                    
                    	 _url = config.data.method==='files'?billServiceConfig.files.searchBill[paramV] : billServiceConfig.urls.searchBill[paramV];
                    }else{
                    	var paramV = contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType;
                    	_url = config.data.method==='files'?billServiceConfig.files.searchBill[paramV]
            			: billServiceConfig.urls.searchBill[paramV];
                    }
                    console.log("账单期显示");
                    console.log(contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType);
                    if(angular.isDefined(_url)){
	                   	$http({
	                        method:config.data.method==='files'?'GET':'POST',  
	                        dataType:"json",
	                        contentType:'application/json:charset=UTF-8',
	                        url:_url,
	                        headers:{
	
	                        },
	                        data:{
	                            contAttr:contAttr,
	                            contFacMrk:contFacMrk,
	                            inOutMrk:inOutMrk,
	                            inExMrk:inExMrk,
	                            billType:billType,
	                            keywords:keywords,
	                            pagination:pagination,
	                            user:user,
	                            lan:lan
	                        },
	                        timeout:config.backend.timeout
	                    })
	                        .success(function(data){
	                            deffered.resolve(data);
	                        })
	                        .error(function(e,code){
	                            deffered.reject(code);
	                        });
	                    return deffered.promise;
                    } else {
                    	var msg = config.data.method==='files'?"json文件未找到":".do请求未找到9";
                    	deffered.reject(msg);
                    	return deffered.promise;
                    }
                },
                /**
                 * 合同分入显示账单
                 * @param keywords     数据  [合约编号，账单期]
                 * @param pagination  分页
                 * @param user       操作用户
                 * @param lan       语言
                 * @returns {Function|promise|promise|promise}
                 */
                searchContInBill:function(contAttr, keywords, pagination){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?billServiceConfig.files.searchContInBill: billServiceConfig.urls.searchContInBill;
                    if(angular.isDefined(_url)){
	                   	$http({
	                        method:config.data.method==='files'?'GET':'POST',
	                        dataType:"json",
	                        contentType:'application/json:charset=UTF-8',
	                        url:_url,
	                        headers:{
	                        },
	                        data:{
	                            contAttr:contAttr,
	                            keywords:keywords,
	                            pagination:pagination
	                        },
	                        timeout:config.backend.timeout
	                    })
	                        .success(function(data){
	                            deffered.resolve(data);
	                        })
	                        .error(function(e,code){
	                            deffered.reject(code);
	                        });
	                    return deffered.promise;
                    } else {
                    	var msg = config.data.method==='files'?"json文件未找到":".do请求未找到";
                    	deffered.reject(msg);
                    	return deffered.promise;
                    }
                },

                /**
                 * 账单确认
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
                confirmBill:function(contAttr, contFacMrk, inOutMrk, inExMrk, billType, keywords, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?billServiceConfig.files.confirmBill[contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType]:
                    	billServiceConfig.urls.confirmBill[contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType];
                   	console.log("confirmBill interface _url's value is " + _url);
                   	if(angular.isDefined(_url)){
	                    $http({
	                        method:config.data.method==='files'?'GET':'POST',
	                        dataType:"json",
	                        contentType:'application/json:charset=UTF-8',
	                        url:_url,
	                        headers:{
	                        },
	                        data:{
	                            contAttr:contAttr,
	                            contFacMrk:contFacMrk,
	                            inOutMrk:inOutMrk,
	                            inExMrk:inExMrk,
	                            billType:billType,
	                            keywords:keywords,
	                            user:user,
	                            lan:lan
	                        },
	                        timeout:config.backend.timeout
	                    })
	                        .success(function(data){
	                            deffered.resolve(data);
	                        })
	                        .error(function(e,code){
	                            deffered.reject(code);
	                        });
	                    return deffered.promise;
                    } else {
                    	var msg = config.data.method==='files'?"json文件未找到":".do请求未找到";
                    	deffered.reject(msg);
                    	return deffered.promise;
                    }
                },

                /**
                 * 超赔临分(分出)账务--条件查询
                 * @param contAttr  非比例【PS】/比例【P】
                 * @param inOutMrk   分入【1】/分出【0】
                 * @param certiType  分保类型
                 * @param keywords
                 * @param pagination
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                searchRecertiBill:function(contAttr, inOutMrk, certiType, keywords, pagination, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?billServiceConfig.files.searchRecertiBill[contAttr] : billServiceConfig.urls.searchRecertiBill;
                    if(angular.isDefined(_url)){
	                    $http({
	                        method:config.data.method==='files'?'GET':'POST',
	                        dataType:"json",
	                        contentType:'application/json:charset=UTF-8',
	                        url:_url,
	                        headers:{
	                        },
	                        data:{
	                            contAttr:contAttr,
	                            inOutMrk:inOutMrk,
	                            certiType:certiType,
	                            keywords:keywords,
	                            pagination:pagination,
	                            user:user,
	                            lan:lan
	                        },
	                        timeout:config.backend.timeout
	                    })
	                        .success(function(data){
	                            deffered.resolve(data);
	                        })
	                        .error(function(e,code){
	                            deffered.reject(code);
	                        });
	                    return deffered.promise;
                    } else {
                    	var msg = config.data.method==='files'?"json文件未找到":".do请求未找到";
                    	deffered.reject(msg);
                    	return deffered.promise;
                    }
                },
                /**
                 * 预付费对内 ---导入
                 * @param importType  [自留额：retentImport，浮动手续费；adjustImport , 预付费：prepayImport ]
                 * @param file  文件对象
                 * @param keywords  数据
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 * 龙 ：
                 * @param  importType [自留额：retentImport，浮动手续费；adjustImport , 预付费：prepayImport ]
                 * @param user
                 * @param lan
                 * file  file [所上传的文件]
                 */
                importFhxBill:function(importType,_file, keywords, user, lan){
                    var deffered = $q.defer();
                    console.log("导入类型--start");
                    console.log(importType);
                    console.log("导入类型--end");
                    console.log("文件对象--_file");
                    console.log(_file);
                    console.log("文件对象--_file");
                    var _url = config.data.method==='files'?billServiceConfig.files.importFhxBill : billServiceConfig.urls.importFhxBill;
                    if(angular.isDefined(_url)){
	                    $http({
	                        method:config.data.method==='files'?'GET':'POST',
	                        dataType:"json",
	                        contentType:'application/json:charset=UTF-8',
	                        url:_url,
	                        headers:{
	                        },
	                        data:{
	                            importType:importType,
	                            file:_file,
	                            keywords:keywords,
	                            user:user,
	                            lan:lan
	                        },
	                        timeout:config.backend.timeout
	                    })
	                        .success(function(data){
	                            deffered.resolve(data);
	                        })
	                        .error(function(e,code){
	                            deffered.reject(code);
	                        });
	                    return deffered.promise;
                    } else {
                    	var msg = config.data.method==='files'?"json文件未找到":".do请求未找到";
                    	deffered.reject(msg);
                    	return deffered.promise;
                    }
                },
                /**
                 * 调整保费---录入实际保费(赔付率)
                 * @param keywords
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                getSectionDtl:function(keywords, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?billServiceConfig.files.getSectionDtl : billServiceConfig.urls.getSectionDtl;
                    if(angular.isDefined(_url)){
	                    $http({
	                        method:config.data.method==='files'?'GET':'POST',
	                        dataType:"json",
	                        contentType:'application/json:charset=UTF-8',
	                        url:_url,
	                        headers:{
	                        },
	                        data:{
	                            keywords:keywords,
	                            user:user,
	                            lan:lan
	                        },
	                        timeout:config.backend.timeout
	                    })
	                        .success(function(data){
	                            deffered.resolve(data);
	                        })
	                        .error(function(e,code){
	                            deffered.reject(code);
	                        });
	                    return deffered.promise;
                    } else {
                    	var msg = config.data.method==='files'?"json文件未找到":".do请求未找到";
                    	deffered.reject(msg);
                    	return deffered.promise;
                    }
                },
                //非比例分出账务处理------------------------------end-----------------------------------------------------
                /**
                 * 获取账单期
                 * @param contractNo  暂存编号
                 */
                getBillDate: function (contAttr, contractNo, user, lan) {
                    //contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? billServiceConfig.files.getBillDate[contAttr]
                    			: billServiceConfig.urls.getBillDate[contAttr];
          			if(angular.isDefined(_url)){
	                    $http({
	                        method:config.data.method==='files'? 'GET':'POST',
	                        url: _url,
	                        //  url: contractServiceConfig[config.data.method].transferContracts,
	                        headers: {
	                            //PICC__RequestVerificationToken: user.verificationToken
	                        },
	                        data:{
	                            contAttr:contAttr,
	                            contractNo:contractNo,
	                            user:user,
	                            lan:lan
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
                    } else {
                    	var msg = config.data.method==='files'?"json文件未找到":".do请求未找到";
                    	deffered.reject(msg);
                    	return deffered.promise;
                    }
                },
                /**
                 * 查询季度账单详细信息
                 * @billType   账单类型
                 * @tmpBillNo  账单号
                 */
                searchBillDetail: function (billType, tmpBillNo , user, lan,mode,viewOreditFlag) {
                    //contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();
                    var _url;
                    if(mode === '2'){ //分入账单
						_url = config.data.method==='files'? billServiceConfig.files.searchInBillDetail
								: billServiceConfig.urls.searchInBillDetail;
					}else if(mode === '1'){
						_url = config.data.method==='files'? billServiceConfig.files.searchBillDetail
								: billServiceConfig.urls.searchBillDetail;
					}
           			if(angular.isDefined(_url)){
	                    $http({
	                        method:config.data.method==='files'? 'GET':'POST',
	                        url: _url,
	                        //  url: contractServiceConfig[config.data.method].transferContracts,
	                        headers: {
	                            //PICC__RequestVerificationToken: user.verificationToken
	                        },
	                        data:{
	                        	billType:billType,
	                        	tmpBillNo:tmpBillNo,
	                            user:user,
	                            lan:lan,
	                            viewOreditFlag:viewOreditFlag
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
                    } else {
                    	var msg = config.data.method==='files'?"json文件未找到":".do请求未找到";
                    	deffered.reject(msg);
                    	return deffered.promise;
                    }
                },

                /**
                 * 提交给一个.do，文件，用同样的action
                 浮动手续费，生成账单
                 */
                createFloatsBill : function(contAttr, keywords){
                	alert(" 浮动手续费，生成账单");
                    var deffered = $q.defer();
                    console.log("浮动手续费，生成账单");
                    var _url = config.data.method==='files'? billServiceConfig.files.createContInBill : billServiceConfig.urls.createContInBill;
                    if(angular.isDefined(_url)){ 
	                    $http({
	                        method: config.data.method==='files'? 'GET':'POST',
	                        dataType: "json",
	                        contentType:'application/json; charset=UTF-8',
	                        url: _url,
	                        headers: {
	                        },
	                        data:{
	                            contAttr:contAttr,
	                        	contract:keywords,
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
                    } else {
                    	var msg = config.data.method==='files'?"json文件未找到":".do请求未找到";
                    	deffered.reject(msg);
                    	return deffered.promise;
                    }
                },
                
              /*  updateBill: function(contract){
                    var deffered = $q.defer();
                    console.log("修改合同分入账单");
                    var _url = config.data.method==='files'? billServiceConfig.files.updateBill : billServiceConfig.urls.updateBill;
                    console.log("_url======"+_url);
                    if(angular.isDefined(_url)){
	                    $http({
	                        method: config.data.method==='files'? 'GET':'POST',
	                        dataType: "json",
	                        contentType:'application/json; charset=UTF-8',
	                        url: _url,
	                        headers: {
	                        },
	                        data:{
	                        	contract:contract
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
                    } else {
                    	var msg = config.data.method==='files'?"json文件未找到":".do请求未找到";
                    	deffered.reject(msg);
                    	return deffered.promise;
                    }
                }*/
                
                
                //-----
                
            };
        }]);

});