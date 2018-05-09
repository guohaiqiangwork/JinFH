/**

 * 这是ZBWEB标准数据定义文件,请勿编辑此文件<br>

 * 创建于 2004-08-13 17:18:42.589<br>

 * JToolpad(1.2.13) Vendor:zhouxianli@sinosoft.com.cn

 */

addSchemaColumn(new schemaColumn("fciRetotRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciRetotYourPolicyNo","对方保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciRetotSCurrency","币种","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fciRetotAmount","保险金额","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fciRetotPremium","保费","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fciRetotExchRate","兑换率","NUMBER(16,10)",false));

addSchemaColumn(new schemaColumn("fciRetotTCurrency","折币","VARCHAR2(3)",true));

//addSchemaColumn(new schemaColumn("fciRetotAmountEx","保额(折后)","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fciRetotPremiumEx","保费(折后)","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fciRetotFlag","标志","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fciRetotRiskCode","险种代码","VARCHAR2(3)",false));



addSchemaColumn(new schemaColumn("fciRepolicyRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciRepolicyYourRefNo","对方分保业务号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciRepolicyYourPolicyNo","对方保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciRepolicyClassCode","险类代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fciRepolicyRiskCode","险种代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fciRepolicyReinsCode","分出公司代码","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fciRepolicyReinsName","分出公司名称","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fciRepolicyBrokerCode","经纪人代码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fciRepolicyBrokerName","经纪人名称","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fciRepolicyUwYear","业务年度","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fciRepolicyInsuredName","被保险人","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fciRepolicyPolicyType","定期/航次等","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fciRepolicyConveyName","运输工具名称","VARCHAR2(40)",true));

//addSchemaColumn(new schemaColumn("fciRepolicyStartDate","起保日期","DATE",false));

//addSchemaColumn(new schemaColumn("fciRepolicyEndDate","终保日期","DATE",true));

addSchemaColumn(new schemaColumn("fciRepolicyCurrency","币种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fciRepolicyAmount","总保额","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fciRepolicyPremium","总保费","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fciRepolicyReinsShare","分出公司所占份额","NUMBER(8,4)",true));

addSchemaColumn(new schemaColumn("fciRepolicySelfShare","我司所占份额","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fciRepolicyReamount","我司接受保额","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fciRepolicyRepremium","我司接受保费","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fciRepolicyCommission","手续费比例","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fciRepolicyTax","税所占比例","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fciRepolicyOther","其它费用所占比例","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fciRepolicyDeductDesc","免赔描述","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fciRepolicyEndorseTimes","批改次数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fciRepolicyClaimTimes","立案次数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fciRepolicyComCode","归属机构","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fciRepolicyMakeCom","出单机构","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fciRepolicyHandlerCode","经办人代码","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fciRepolicyApproverCode","复核人代码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fciRepolicyUnderWriteFlag","核保标志","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fciRepolicyUnderWriteCode","最终核保人代码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fciRepolicyUnderWriteName","最终核保人名称","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fciRepolicyUnderWriteEndDate","核保日期","DATE",true));

addSchemaColumn(new schemaColumn("fciRepolicyOperatorCode","操作员代码","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fciRepolicyInputDate","输入日期","DATE",false));

addSchemaColumn(new schemaColumn("fciRepolicyInputTime","输入时间","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fciRepolicyRemarks","备注","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fciRepolicyAccFlag","是否存在帐单","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fciRepolicyFlag","标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoRetotRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoRetotNoticeNo","分保通知号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoRetotPolicyNo","保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoRetotRiskCode","险种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fcoRetotSCurrency","币种","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fcoRetotAmount","保险金额","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoRetotPremium","毛保费","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoRetotExchRate","兑换率","NUMBER(16,10)",true));

addSchemaColumn(new schemaColumn("fcoRetotTCurrency","折币","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fcoRetotAmountEx","保额(折后)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoRetotPremiumEx","毛保费(折后)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fcoRetotFlag","备用标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoRepolicyRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoRepolicyPolicyNo","主保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoRepolicyNoticeNo","分保通知号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyClassCode","险类","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyRiskCode","险种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyComCode","业务归属公司","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyComName","公司名称","VARCHAR(40)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyUwYear","业务年度","VARCHAR2(4)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyReportDate","统计日期","DATE",true));

addSchemaColumn(new schemaColumn("fcoRepolicyInsuredName","被保险人","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyPeriodFlag","保险期限类型","VARCHAR2(1)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyStartDate","起保日期","DATE",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyEndDate","终保日期","DATE",true));

addSchemaColumn(new schemaColumn("fcoRepolicyItemName","保险项目","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyCurrency","币种","VARCHAR2(3)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyAmount","总保额","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyPremium","毛保费","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyBaseRate","我司所占比例","NUMBER(9,6)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyBaseAmount","我司所占保额","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyShareRate","分出份额","NUMBER(9,6)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyReamount","分出保额","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyRepremium","毛分保费","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyBrokerageRate","直接经纪费率","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyBrokerage","直接经纪费","NUMBER(10,2)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyNetPremium","净保费","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyTaxRate","扣税比例","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyPayTimes","交费次数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyEndorTimes","批改次数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyBusinessFlag","业务类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyReinsType","分保方式","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyRemarks","备注","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyMakeComCode","制单部门代码","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyCreaterCode","创建人","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyCreateDTime","创建时间","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyUpdaterCode","修改人","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyUpdateDTime","最后修改时间","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("fcoRepolicySendFlag","下发标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyFlag","标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoShareRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoShareClassCode","险类","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fcoShareSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcoShareReinsMode","分保方式","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fcoShareTreatyNo","合同序号","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoShareRefNo","合同业务号","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoShareReinsType","分保接受人类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoShareReinsNo","分保接受人序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcoShareReinsCode","接受人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoShareReinsName","接受人简称","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fcoShareFReinsCode","最终再保人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoShareFReinsName","最终再保人简称","VARCHAR2(100)",true));

//addSchemaColumn(new schemaColumn("fcoShareShareRate","份额","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fcoShareCurrency","币种","VARCHAR2(3)",true));

//addSchemaColumn(new schemaColumn("fcoShareAmount","分出保额","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoSharePremium","分出保费","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fcoShareCurrencyFlag","分保币种类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoSharePayTimes","付费次数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fcoShareRemarks","备注","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fcoShareFlag","备用字段","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoSpecialNoticeNo","分保通知书号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoSpecialPolicyNo","保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoSpecialReinsNo","接受人序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcoSpecialReinsCode","接受人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoSpecialReinsName","接受人简称","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fcoSpecialFReinsCode","最终接受人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoSpecialFReinsName","最终接受人简称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fcoSpecialPayCode","结付人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoSpecialPayName","结付人简称","VARCHAR2(40)",true));

//addSchemaColumn(new schemaColumn("fcoSpecialShareRate","分保份额","NUMBER(9,6)",true));

//addSchemaColumn(new schemaColumn("fcoSpecialCommRate","手续费比例","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fcoSpecialTaxRate","扣税比例","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fcoSpecialOthRate","其他费用比例","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fcoSpecialNetFlag","以净保费计算否","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoSpecialFlag","备用标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoPolicyNoticeNo","分保通知书号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoPolicyPolicyNo","保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoPolicyMainPolicyNo","主保单号","VARCHAR2(25)",false));

addSchemaColumn(new schemaColumn("fcoPolicyContractNo","合同号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fcoPolicyClassCode","险类代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fcoPolicyRiskCode","险种代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fcoPolicyComCode","业务归属公司代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fcoPolicyComName","公司名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fcoPolicyUwYear","业务年度","VARCHAR2(4)",false));

//addSchemaColumn(new schemaColumn("fcoPolicyReportDate","填报日期","DATE",false));

addSchemaColumn(new schemaColumn("fcoPolicyInsuredName","被保险人","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fcoPolicyRegionCode","所属城市","VARCHAR2(6)",true));

//addSchemaColumn(new schemaColumn("fcoPolicyStartDate","起保日期","DATE",false));

//addSchemaColumn(new schemaColumn("fcoPolicyEndDate","终保日期","DATE",true));

//addSchemaColumn(new schemaColumn("fcoPolicyStartFixDate","开始日期","DATE",true));

//addSchemaColumn(new schemaColumn("fcoPolicyEndFixDate","终止日期","DATE",true));

//addSchemaColumn(new schemaColumn("fcoPolicyStartAddDate","加保保证期开始日期","DATE",true));

//addSchemaColumn(new schemaColumn("fcoPolicyEndAddDate","加保保证期终止日期","DATE",true));

addSchemaColumn(new schemaColumn("fcoPolicyBusinessNature","营业性质代码","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fcoPolicyProductNature","产品性质代码","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fcoPolicyRegion","司法管辖","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fcoPolicyRetroActive","追溯期说明","DATE",true));

addSchemaColumn(new schemaColumn("fcoPolicyRegionFlag","区域类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoPolicyClaimFlag","索赔基础","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoPolicyCrestaZone","CrestaZone","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fcoPolicyConstructStru","建筑结构","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fcoPolicyConstructAge","建筑年龄","NUMBER(4,1)",true));

addSchemaColumn(new schemaColumn("fcoPolicyQuakeGrade","抗震级别","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fcoPolicyItemName","保险项目","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fcoPolicyItemAddr","标的所在地","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fcoPolicyTransMode","运输方式","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fcoPolicyConveyCode","运输工具代码","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fcoPolicyConveyName","运输工具名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fcoPolicyConveyType","运输工具种类","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fcoPolicyConveyFlag","船旗","VARCHAR2(15)",true));

addSchemaColumn(new schemaColumn("fcoPolicyMakeYear","建造年份","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fcoPolicyDistance","航程","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fcoPolicyConveyGrade","船级","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fcoPolicyTonnage","总吨","NUMBER(9,2)",true));

//addSchemaColumn(new schemaColumn("fcoPolicyLoadTon","载重吨","NUMBER(9,2)",true));

addSchemaColumn(new schemaColumn("fcoPolicyCurrency","币种","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fcoPolicyAmount","总保额","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fcoPolicySumAccumulate","累计责任限额","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoPolicySumSale","年销售额","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoPolicyRate","费率","NUMBER(8,4)",true));

//addSchemaColumn(new schemaColumn("fcoPolicyPremium","毛保费","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fcoPolicyBrokerageRate","直接经纪费比例","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fcoPolicyBrokerage","直接经纪费","NUMBER(10,2)",true));

//addSchemaColumn(new schemaColumn("fcoPolicyNetPremium","净保费","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fcoPolicyRiskKind","风险类别","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fcoPolicyNopayDesc","免赔说明","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fcoPolicyPayTimes","交费次数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fcoPolicyEndorTimes","批改次数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fcoPolicyBusinessFlag","业务类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoPolicyRemarks","备注","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fcoPolicyMakeComCode","制单部门代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fcoPolicyCreaterCode","创建人","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fcoPolicyCreateDTime","创建时间","VARCHAR2(19)",false));

addSchemaColumn(new schemaColumn("fcoPolicyUpdaterCode","修改人","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoPolicyUpdateDTime","最后修改时间","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("fcoPolicyFlag","标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoTotNoticeNo","分保通知书号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoTotPolicyNo","保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoTotRiskCode","险种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fcoTotSCurrency","币种","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fcoTotAmount","保险金额","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fcoTotPremium","保费","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fcoTotExchRate","兑换率","NUMBER(16,10)",false));

addSchemaColumn(new schemaColumn("fcoTotTCurrency","折币","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fcoTotAmountEx","保额(折后)","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fcoTotPremiumEx","保费(折后)","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fcoTotFlag","备用标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fliRetotRepayNo","分赔案号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliRetotRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliRetotYourPayNo","对方立案号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliRetotRiskCode","险种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliRetotSCurrency","原币","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliRetotPayValue","物质损失赔款+费用","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fliRetotExchRate","兑换率","NUMBER(16,10)",false));

addSchemaColumn(new schemaColumn("fliRetotTCurrency","折币","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliRetotPayValueEx","物质损失赔款(折后)","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fliRetotFlag","标志","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fliRePayRepayNo","分赔案号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliRePayRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliRePayYourPayNo","对方立案号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliRePayYourPolicyNo","对方保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliRePayYourRefNo","对方分保业务号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliRePayClassCode","险类","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliRePayRiskCode","险种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliRePayReinsCode","分出公司代码","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fliRePayReinsName","分出公司名称","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fliRePayBrokerCode","经纪人代码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fliRePayBrokerName","经纪人名称","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fliRePayUwYear","业务年度","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fliRePayInsuredName","被保险人名称","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fliRePayPolicyType","定期/航次等","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fliRePayConveyName","运输工具名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fliRePayStartDate","起保日期","DATE",false));

addSchemaColumn(new schemaColumn("fliRePayEndDate","终保日期","DATE",true));

addSchemaColumn(new schemaColumn("fliRePayDamageDate","出险日期","DATE",false));

addSchemaColumn(new schemaColumn("fliRePayDamageCode","出险原因代码","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fliRePayDamageReason","出险原因","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fliRePayCurrency","币种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliRePaySumClaim","估损金额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliRePaySumPay","本次赔款金额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliRePaySumOsloss","本次未决金额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliRePayReinsShare","分出公司所占份额","NUMBER(8,4)",true));

addSchemaColumn(new schemaColumn("fliRePaySelfShare","我司所占份额","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fliRePaySumRepay","我司赔款金额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliRePaySumReosloss","我司未决金额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliRePayEndCaseFlag","结案否标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fliRePayComCode","归属机构","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fliRePayMakeCom","出单机构","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fliRePayHandlerCode","经办人代码","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fliRePayApproverCode","复核人代码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fliRePayUnderWriteFlag","核保标志","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fliRePayUnderWriteCode","最终核保人代码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fliRePayUnderWriteName","最终核保人名称","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fliRePayUnderWriteEndDate","核保日期","DATE",true));

addSchemaColumn(new schemaColumn("fliRePayOperatorCode","操作员代码","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fliRePayInputDate","输入日期","DATE",false));

addSchemaColumn(new schemaColumn("fliRePayInputTime","输入时间","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fliRePayRemarks","备注","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fliRePayAccFlag","是否存在帐单","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fliRePayFlag","备用","VARCHAR2(10)",true));



//addSchemaColumn(new schemaColumn("floPayClaimNo","赔案通知号","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floPayPayNo","立案号","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floPayCompensateNo","赔款计算书号","VARCHAR2(22)",true));

//addSchemaColumn(new schemaColumn("floPayNoticeNo","分保通知号","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floPayPolicyNo","保单号","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floPayClassCode","险类","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("floPayRiskCode","险种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floPayComCode","业务归属公司代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("floPayComName","公司名称","VARCHAR(40)",true));

addSchemaColumn(new schemaColumn("floPayUwYear","业务年度","VARCHAR2(4)",false));

//addSchemaColumn(new schemaColumn("floPayReportDate","填报日期","DATE",false));

addSchemaColumn(new schemaColumn("floPayInsuredName","被保险人","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("floPayItemName","标的名称","VARCHAR2(255)",true));

//addSchemaColumn(new schemaColumn("floPayStartDate","起保日期","DATE",false));

//addSchemaColumn(new schemaColumn("floPayEndDate","终保日期","DATE",true));

//addSchemaColumn(new schemaColumn("floPayDamageDate","出险日期","DATE",false));

addSchemaColumn(new schemaColumn("floPayDamageCode","出险原因代码","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floPayDamageReason","出险原因(摘要)","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("floPayCurrency","币种","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("floPayAmount","总保额","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("floPaySumClaim","估损金额","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("floPayOutStanding","未决赔款（最新值）","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("floPaySumPay","本次物质赔款累计金额","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("floPaySumFee","本次费用损失累计金额","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("floPayPayDate","赔付日期","DATE",true));

//addSchemaColumn(new schemaColumn("floPayEndCaseFlag","结案否标志","VARCHAR2(1)",true));

//addSchemaColumn(new schemaColumn("floPayEndCaseDate","结案日期","DATE",true));

addSchemaColumn(new schemaColumn("floPayRemarks","备注","VARCHAR2(255)",true));

//addSchemaColumn(new schemaColumn("floPayMakeComCode","制单公司代码","VARCHAR2(8)",false));

//addSchemaColumn(new schemaColumn("floPayCreaterCode","创建人","VARCHAR2(10)",false));

//addSchemaColumn(new schemaColumn("floPayCreateDTime","创建时间","VARCHAR2(19)",true));

//addSchemaColumn(new schemaColumn("floPayUpdaterCode","修改人","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("floPayUpdateDTime","最后修改时间","VARCHAR2(19)",true));

//addSchemaColumn(new schemaColumn("floPayFlag","备用","VARCHAR2(10)",true));



//addSchemaColumn(new schemaColumn("floPersonLossClaimNo","赔案通知号","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floPersonLossPayNo","立案号","VARCHAR2(22)",true));

//addSchemaColumn(new schemaColumn("floPersonLossCompensateNo","赔款计算书号","VARCHAR2(22)",true));

//addSchemaColumn(new schemaColumn("floPersonLossPolicyNo","保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("floPersonLossSerialNo","序号","NUMBER(15)",false));

//addSchemaColumn(new schemaColumn("floPersonLossRiskCode","险种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floPersonLossPersonNo","人员序号","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("floPersonLossPersonName","人员名称","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("floPersonLossKindCode","承保险别代码","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floPersonLossLiabCode","责任分类代码","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("floPersonLossLiabName","责任分类名称","VARCHAR2(120)",true));

addSchemaColumn(new schemaColumn("floPersonLossJobCode","雇员工种代码","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("floPersonLossJobName","雇员工种名称","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("floPersonLossLiabDetailCode","责任名细分类代码","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("floPersonLossLiabDetailName","责任名细分类名称","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("floPersonLossItemAddress","受损标的地址","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("floPersonLossLossQuantity","人数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("floPersonLossUnit","数量单位","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("floPersonLossUnitAmount","单位赔偿限额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floPersonLossCurrency","实赔币别","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floPersonLossSumRealPay","实赔金额","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("floPersonLossFlag","备用标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("floRepayRepayNo","分赔案号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("floRepayMainClaimNo","主赔案号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floRepayClaimNo","赔案通知号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floRepayPayNo","立案号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floRepayRepolicyNo","分保单号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floRepayPolicyNo","保单号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floRepayNoticeNo","分保通知号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floRepayClassCode","险类","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floRepayRiskCode","险种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floRepayComCode","业务归属公司代码","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("floRepayComName","公司名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("floRepayUwYear","业务年度","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("floRepayReportDate","统计日期","DATE",true));

addSchemaColumn(new schemaColumn("floRepayInsuredName","被保险人","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("floRepayStartDate","起保日期","DATE",true));

addSchemaColumn(new schemaColumn("floRepayEndDate","终保日期","DATE",true));

addSchemaColumn(new schemaColumn("floRepayItemName","保险项目","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("floRepayDamageDate","出险日期","DATE",true));

addSchemaColumn(new schemaColumn("floRepayDamageCode","出险原因代码","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floRepayDamageReason","出险原因","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("floRepayCurrency","币种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floRepayAmount","总保额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floRepayOutStanding","未决金额（最新值）","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floRepaySumPay","累计物质损失赔款金额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floRepaySumFee","累计费用合计","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floRepayEndCaseFlag","结案否标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("floRepayEndCaseDate","结案日期","DATE",true));

addSchemaColumn(new schemaColumn("floRepayBusinessFlag","业务类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("floRepayReinsType","分保方式","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("floRepayRemarks","备注","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("floRepayMakeComCode","制单部门代码","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("floRepayCreaterCode","创建人","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("floRepayCreateDTime","创建时间","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("floRepayUpdaterCode","修改人","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("floRepayUpdateDTime","最后修改时间","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("floRepaySendFlag","下发标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("floRepayFlag","备用","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("floReTotRepayNo","分赔案号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("floReTotClaimNo","赔案通知号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floReTotPayNo","赔案号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floReTotRepolicyNo","分保单号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floReTotPolicyNo","保单号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floReTotRiskCode","险种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floReTotSCurrency","币种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floReTotPayValue","物质损失赔款+费用","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("floReTotExchRate","兑换率","NUMBER(16,10)",false));

addSchemaColumn(new schemaColumn("floReTotTCurrency","折币","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floReTotPayValueEx","总赔款(折后)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floReTotRemarks","备注","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("floReTotFlag","标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("floShareRepayNo","分赔案号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("floShareClaimNo","赔案通知号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floSharePayNo","赔案号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floShareRepolicyNo","分保单号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floSharePolicyNo","保单号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floShareClassCode","险类代码","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floShareSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("floSharePayType","赔款类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("floShareItemCode","项目代码","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("floShareReinsMode","分保方式","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floShareTreatyNo","合同编号","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("floShareRefNo","合同业务号","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("floShareReinsType","分保接受人类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("floShareReinsNo","分保接受人序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("floShareReinsCode","分保接受人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("floShareReinsName","分保接受人名称","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("floShareFReinsCode","最终再保人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("floShareFReinsName","最终再保人简称","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("floShareShareRate","分摊比例","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("floShareTCurrency","币种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floSharePayValue","分摊赔款","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floShareExchRate","兑换率","NUMBER(16,10)",true));

addSchemaColumn(new schemaColumn("floShareSCurrency","赔付币种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floShareRemarks","备注","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("floShareFlag","备用标志","VARCHAR2(10)",true));



//addSchemaColumn(new schemaColumn("floTotClaimNo","赔案通知号","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floTotPayNo","立案号","VARCHAR2(22)",true));

//addSchemaColumn(new schemaColumn("floTotPolicyNo","保单号","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floTotRiskCode","险种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floTotSCurrency","原币","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floTotPayValue","物质损失赔款+费用","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("floTotExchRate","兑换率","NUMBER(16,10)",false));

addSchemaColumn(new schemaColumn("floTotTCurrency","折币","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floTotPayValueEx","物质损失赔款+费用(折后)","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("floTotRemarks","备注","VARCHAR2(255)",true));

//addSchemaColumn(new schemaColumn("floTotFlag","标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fpiReitemReendorNo","分入分批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReitemRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReitemYourEndorNo","对方批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReitemYourPolicyNo","对方发生批改的保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReitemSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpiReitemRiskCode","险种代码","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpiReitemKindCode","险别代码","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpiReitemItemCode","标的代码","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fpiReitemItemName","标的名称","VARCHAR2(120)",true));

addSchemaColumn(new schemaColumn("fpiReitemItemAddr","标的地址","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("fpiReitemCurrency","币种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fpiReitemAmount","保额/赔偿限额","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReitemRate","费率","NUMBER(8,4)",true));

addSchemaColumn(new schemaColumn("fpiReitemPremium","保费","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReitemAmountChg","保额变化量","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpiReitemPremiumChg","保费变化量","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpiReitemCalculateFlag","是否计算保额标志","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fpiReitemFlag","标志","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fpiReendorReendorNo","分入分批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReendorRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReendorYourEndorRefNo","对方分批业务号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReendorYourRefNo","对方分保业务号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReendorYourEndorNo","对方批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReendorYourPolicyNo","对方发生批改的保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReendorClassCode","险类代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fpiReendorRiskCode","险种代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fpiReendorReinsCode","分出公司代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fpiReendorReinsName","分出公司名称","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpiReendorUwYear","业务年度","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fpiReendorInsuredName","被保险人","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fpiReendorPolicyType","定期/航次等","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fpiReendorConveyName","运输工具名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpiReendorStartDate","起保日期","DATE",false));

addSchemaColumn(new schemaColumn("fpiReendorEndDate","终保日期","DATE",true));

addSchemaColumn(new schemaColumn("fpiReendorEndorType","批改类型代码","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fpiReendorEndorDesc","批改类型描述","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fpiReendorEndorDate","批改日期","DATE",true));

addSchemaColumn(new schemaColumn("fpiReendorValidDate","生效日期","DATE",true));

addSchemaColumn(new schemaColumn("fpiReendorEndorseTimes","保单批改次数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fpiReendorCurrency","币种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fpiReendorAmount","总保额","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReendorPremium","总保费","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReendorReamount","我司接受保额","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReendorRepremium","我司接受保费","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReendorAmountChg","总保额变化量","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReendorPremiumChg","总保费变化量","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReendorReinsShare","分出公司所占份额","NUMBER(8,4)",true));

addSchemaColumn(new schemaColumn("fpiReendorSelfShare","我司所占份额","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpiReendorReamountChg","我司接受保额变化量","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReendorRepremiumChg","我司接受保费变化量","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReendorCommission","手续费比例","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpiReendorTax","税所占比例","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpiReendorOther","其它费用所占比例","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpiReendorDeductDesc","免赔描述","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpiReendorComCode","归属机构","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fpiReendorMakeCom","出单机构","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fpiReendorHandlerCode","经办人代码","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fpiReendorApproverCode","复核人代码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpiReendorUnderWriteFlag","核保标志","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fpiReendorUnderWriteCode","最终核保人代码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpiReendorUnderWriteName","最终核保人名称","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fpiReendorUnderWriteEndDate","核保日期","DATE",true));

addSchemaColumn(new schemaColumn("fpiReendorOperatorCode","操作员代码","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fpiReendorInputDate","输入日期","DATE",false));

addSchemaColumn(new schemaColumn("fpiReendorInputTime","输入时间","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fpiReendorRemarks","备注","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpiReendorAccFlag","是否存在帐单","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpiReendorFlag","标志","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpiReendorPostFlag","批单生效标志","VARCHAR2(1)",false));



addSchemaColumn(new schemaColumn("fpiRetotReendorNo","分入分批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiRetotRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiRetotYourEndorNo","对方批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiRetotYourPolicyNo","对方发生批改的保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiRetotRiskCode","险种代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fpiRetotSCurrency","币种","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fpiRetotAmount","保险金额","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fpiRetotPremium","保费","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiRetotExchRate","兑换率","NUMBER(16,10)",false));

addSchemaColumn(new schemaColumn("fpiRetotTCurrency","折币","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fpiRetotAmountEx","保额(折后)","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fpiRetotPremiumEx","保费(折后)","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fpiRetotAmountChg","保额变化量 (原币)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpiRetotPremiumChg","保费变化量 (原币)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpiRetotAmountExChg","保额变化量 (折币)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpiRetotPremiumExChg","保费变化量 (折币)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpiRetotFlag","标志","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fpoEndorEndorNo","批单号","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("fpoEndorEndorDate","批改日期","DATE",false));

addSchemaColumn(new schemaColumn("fpoEndorEndorType","批改类型代码","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("fpoEndorEndorDesc","批改内容","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fpoEndorNoticeNo","分保通知书号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoEndorPolicyNo","保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoEndorMainPolicyNo","主保单号","VARCHAR2(25)",false));

addSchemaColumn(new schemaColumn("fpoEndorContractNo","合同号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fpoEndorClassCode","险类代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fpoEndorRiskCode","险种代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fpoEndorComCode","业务归属公司代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fpoEndorComName","公司名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpoEndorUwYear","业务年度","VARCHAR2(4)",false));

//addSchemaColumn(new schemaColumn("fpoEndorReportDate","填报日期","DATE",false));

addSchemaColumn(new schemaColumn("fpoEndorInsuredName","被保险人","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fpoEndorRegionCode","所属城市","VARCHAR2(6)",true));

//addSchemaColumn(new schemaColumn("fpoEndorStartDate","起保日期","DATE",false));

//addSchemaColumn(new schemaColumn("fpoEndorEndDate","终保日期","DATE",true));

//addSchemaColumn(new schemaColumn("fpoEndorStartFixDate","开始日期","DATE",true));

//addSchemaColumn(new schemaColumn("fpoEndorEndFixDate","终止日期","DATE",true));

//addSchemaColumn(new schemaColumn("fpoEndorStartAddDate","加保保证期开始日期","DATE",true));

//addSchemaColumn(new schemaColumn("fpoEndorEndAddDate","加保保证期终止日期","DATE",true));

addSchemaColumn(new schemaColumn("fpoEndorBusinessNature","营业性质代码","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fpoEndorProductNature","产品性质代码","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fpoEndorRegion","司法管辖","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fpoEndorRetroActive","追溯期说明","DATE",true));

addSchemaColumn(new schemaColumn("fpoEndorRegionFlag","区域类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoEndorClaimFlag","索赔基础","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoEndorCrestaZone","CrestaZone","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fpoEndorConstructStru","建筑结构","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fpoEndorConstructAge","建筑年龄","NUMBER(4,1)",true));

addSchemaColumn(new schemaColumn("fpoEndorQuakeGrade","抗震级别","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fpoEndorItemName","保险项目","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpoEndorItemAddr","标的所在地","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpoEndorTransMode","运输方式","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fpoEndorConveyCode","运输工具代码","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fpoEndorConveyName","运输工具名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpoEndorConveyType","运输工具种类","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fpoEndorConveyFlag","船旗","VARCHAR2(15)",true));

addSchemaColumn(new schemaColumn("fpoEndorMakeYear","建造年份","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fpoEndorDistance","航程","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpoEndorConveyGrade","船级","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fpoEndorTonnage","总吨","NUMBER(9,2)",true));

//addSchemaColumn(new schemaColumn("fpoEndorLoadTon","载重吨","NUMBER(9,2)",true));

addSchemaColumn(new schemaColumn("fpoEndorCurrency","币种","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fpoEndorAmount","总保额","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fpoEndorSumAccumulate","累计责任限额","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoEndorSumSale","年销售额","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoEndorRate","费率","NUMBER(8,4)",true));

//addSchemaColumn(new schemaColumn("fpoEndorPremium","毛保费","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fpoEndorBrokerageRate","直接经纪费比例","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fpoEndorBrokerage","直接经纪费","NUMBER(10,2)",true));

//addSchemaColumn(new schemaColumn("fpoEndorNetPremium","净保费","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpoEndorRiskKind","风险类别","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fpoEndorNopayDesc","免赔说明","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpoEndorPayTimes","交费次数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fpoEndorEndorTimes","批改次数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fpoEndorBusinessFlag","保单币种类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoEndorRemarks","备注","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpoEndorMakeComCode","制单部门代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fpoEndorCreaterCode","创建人","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fpoEndorCreateDTime","创建时间","VARCHAR2(19)",false));

addSchemaColumn(new schemaColumn("fpoEndorUpdaterCode","修改人","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoEndorUpdateDTime","最后修改时间","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("fpoEndorFlag","标志","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoEndorAmountChg","保额变化量","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoEndorPremiumChg","保费变化量","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoEndorPostFlag","批单生效标志","VARCHAR2(1)",false));



addSchemaColumn(new schemaColumn("fpoItemEndorNo","批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoItemNoticeNo","分保通知书号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoItemPolicyNo","保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoItemSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpoItemRiskCode","险种代码","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoItemKindCode","险别代码","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fpoItemItemName","标的名称","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fpoItemItemAddr","标的地址","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("fpoItemContractor","承包商","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("fpoItemPostCode","邮编","VARCHAR2(6)",true));

addSchemaColumn(new schemaColumn("fpoItemWellType","钻井类型代码","VARCHAR2(1)",true));

//addSchemaColumn(new schemaColumn("fpoItemDeep","井深","NUMBER(8,2)",true));

addSchemaColumn(new schemaColumn("fpoItemCurrency","币种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fpoItemAmount","保额","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpoItemSumAccumulate","累计责任限额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoItemRate","费率","NUMBER(8,4)",true));

addSchemaColumn(new schemaColumn("fpoItemCalculateFlag","是否计算保额标志","VARCHAR2(1)",false));

//addSchemaColumn(new schemaColumn("fpoItemPremium","保费","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpoItemNopay","免赔额","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpoItemFlag","备用标志","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fpoItemAmountChg","保额变化量","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoItemPremiumChg","保费变化量","NUMBER(14,2)",true));



addSchemaColumn(new schemaColumn("fpoPlaneEndorNo","批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoPlaneNoticeNo","分保通知号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoPlanePolicyNo","保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoPlaneSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpoPlanePlaneNo","飞机编号","VARCHAR2(16)",false));

addSchemaColumn(new schemaColumn("fpoPlanePlaneType","飞机型号","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoPlaneMakeYear","制造年份","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fpoPlaneSeatCount","座位数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fpoPlaneFlyRange","航行范围","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("fpoPlaneRiskCode","险种代码","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoPlanePassengerFlux","客流量","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoPlaneGoodsFlux","货邮量","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoPlaneMaxPlaneValue","最大飞机价值","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoPlaneAverageValue","平均价值","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoPlaneTowerH","塔台高","NUMBER(7,2)",true));

addSchemaColumn(new schemaColumn("fpoPlaneTowerW","塔台宽","NUMBER(7,2)",true));

addSchemaColumn(new schemaColumn("fpoPlaneTowerL","塔台长","NUMBER(7,2)",true));

addSchemaColumn(new schemaColumn("fpoPlanePlaneUsage","飞机用途","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fpoPlanePeriodFlag","保险期限类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoPlaneLeaseMode","飞机引进方式","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fpoPlaneStartDate","起保日期","DATE",true));

addSchemaColumn(new schemaColumn("fpoPlaneEndDate","终保日期","DATE",true));

addSchemaColumn(new schemaColumn("fpoPlaneRemarks","使用本机场机型","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpoPlaneRecoverFlag","续保标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoPlaneValidFlag","失效标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoPlaneFlag","批改标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fpoReendorReendorNo","分保批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoReendorEndorNo","批单号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fpoReendorEndorDate","批改日期","DATE",true));

addSchemaColumn(new schemaColumn("fpoReendorEndorType","批改类型","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fpoReendorEndorDesc","批改内容","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fpoReendorRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoReendorPolicyNo","主保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoReendorNoticeNo","分保通知号","VARCHAR2(22) ",true));

addSchemaColumn(new schemaColumn("fpoReendorClassCode","险类","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoReendorRiskCode","险种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoReendorComCode","出单公司代码","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fpoReendorComName","公司名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpoReendorUwYear","业务年度","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fpoReendorReportDate","统计日期","DATE",true));

addSchemaColumn(new schemaColumn("fpoReendorInsuredName","被保险人","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fpoReendorPeriodFlag","保险期限类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoReendorStartDate","起保日期","DATE",true));

addSchemaColumn(new schemaColumn("fpoReendorEndDate","终保日期","DATE",true));

addSchemaColumn(new schemaColumn("fpoReendorItemName","保险项目","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpoReendorCurrency","币种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoReendorAmount","总保额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorPremium","毛保费","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorBaseRate","我司所占比例","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoReendorBaseAmount","我司所占保额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorBasePremium","我司所占保费","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorShareRate","分出份额","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoReendorReamount","分出保额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorRepremium","毛分保费","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorBrokerageRate","直接经纪费率","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpoReendorBrokerage","直接经纪费","NUMBER(10,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorNetPremium","净保费","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorTaxRate","扣税比例","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpoReendorPayTimes","交费次数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fpoReendorEndorTimes","批改次数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fpoReendorBusinessFlag","业务类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoReendorReinsType","分保方式","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoReendorRemarks","备注","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpoReendorMakeComCode","制单部门代码","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fpoReendorCreaterCode","创建人","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoReendorCreateDTime","创建时间","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("fpoReendorUpdaterCode","修改人","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoReendorUpdateDTime","最后修改时间","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("fpoReendorSendFlag","下发标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoReendorFlag","标志","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoReendorAmountChg","保额变化量 (兑换后)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorPremiumChg","保费变化量 (兑换后)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorPostFlag","分批单复核(暂不使用)","VARCHAR2(1)",true));



addSchemaColumn(new schemaColumn("fpoRetotReendorNo","分保批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoRetotEndorNo","批单号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fpoRetotRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoRetotNoticeNo","分保通知号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoRetotPolicyNo","保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoRetotRiskCode","险种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoRetotSCurrency","币种","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fpoRetotAmount","保险金额","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoRetotPremium","毛保费","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoRetotExchRate","兑换率","NUMBER(16,10)",true));

addSchemaColumn(new schemaColumn("fpoRetotTCurrency","折币","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fpoRetotAmountEx","保额(折后)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoRetotPremiumEx","毛保费(折后)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoRetotFlag","备用标志","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fpoRetotAmountChg","保额变化量 (原币)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoRetotPremiumChg","保费变化量 (原币)","NUMBER(14,2)",true));



addSchemaColumn(new schemaColumn("fpoShareReendorNo","分保批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoShareRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoShareClassCode","险类","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoShareSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpoShareReinsMode","分保方式","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoShareTreatyNo","合同序号","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoShareRefNo","合同业务号","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoShareReinsType","分保接受人类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoShareReinsNo","分保接受人序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpoShareReinsCode","接受人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoShareReinsName","接受人简称","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fpoShareFReinsCode","最终再保人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoShareFReinsName","最终再保人简称","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fpoShareShareRate","份额","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoShareCurrency","币种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoShareAmount","分出保额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoSharePremium","分出保费","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoShareCurrencyFlag","分保计算方式","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoSharePayTimes","付费次数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fpoShareRemarks","备注","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpoShareFlag","备用字段","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoShareAmountChg","保额变化量 (兑换后)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoSharePremiumChg","保费变化量 (兑换后)","NUMBER(14,2)",true));



addSchemaColumn(new schemaColumn("fpoTotEndorNo","批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoTotNoticeNo","分保通知书号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoTotPolicyNo","保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoTotRiskCode","险种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fpoTotSCurrency","币种","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fpoTotAmount","保险金额","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fpoTotPremium","保费","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fpoTotExchRate","兑换率","NUMBER(16,10)",false));

addSchemaColumn(new schemaColumn("fpoTotTCurrency","折币","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fpoTotAmountEx","保额(折后)","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fpoTotPremiumEx","保费(折后)","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpoTotFlag","标志","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fpoTotAmountChg","保额变化量 (原币)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoTotPremiumChg","保费变化量 (原币)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoTotAmountExChg","保额变化量 (折币)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoTotPremiumExChg","保费变化量 (折币)","NUMBER(14,2)",true));



addSchemaColumn(new schemaColumn("fsoBranchDReCertifyNo","分保业务号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fsoBranchDSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fsoBranchDCoinsType","共保人类型","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fsoBranchDComCode","分保业务所属公司","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoBranchDPayCode","结付公司代码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoBranchDReinsMode","分保方式","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fsoBranchDTreatyNo","合同序","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoBranchDPayTimes","第几期计划","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fsoBranchDCurrency","币种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fsoBranchDPayValue","收/付款金额:保费/赔款","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fsoBranchDOSLoss","未决赔款","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fsoBranchDPayDate","应收/付款日期","DATE",true));

addSchemaColumn(new schemaColumn("fsoBranchDBelongType","所属的统计类型","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("fsoBranchDBusinessFlag","业务类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fsoBranchDAccFlag","生成帐单否","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fsoBranchDAccNo","对内帐单编号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fsoBranchDAccNoC","地市帐单编号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fsoBranchDSendFlag","下发标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fsoBranchDSendDate","下发日期","DATE",true));

addSchemaColumn(new schemaColumn("fsoBranchDFlag","标志位","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fsoBranchDPayType","收/付款类型","VARCHAR2(1)",true));



addSchemaColumn(new schemaColumn("fsoBranchReCertifyNo","分保业务号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fsoBranchSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fsoBranchCoinsType","共保人类型","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fsoBranchComCode","分保业务所属公司","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoBranchPayCode","结付公司代码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoBranchReinsMode","分保方式","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fsoBranchTreatyNo","合同序号","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoBranchTreatyName","合同名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fsoBranchShareRate","份额","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fsoBranchCurrency","币种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fsoBranchAmount","分出保额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fsoBranchPremium","分出保费","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fsoBranchPayValue","摊回赔款","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fsoBranchOSLoss","未决赔款","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fsoBranchOptType","业务类型","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fsoBranchNoticeNo","通知号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fsoBranchPolicyNo","保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fsoBranchEndorNo","批单号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fsoBranchPayNo","赔案号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fsoBranchUwYear","业务年度","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fsoBranchRiskCode","险种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fsoBranchInsuredName","被保险人","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fsoBranchBusinessFlag","业务类型（是否外币业务）","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fsoBranchCreaterCode","创建人","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoBranchCreateDTime","创建时间","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("fsoBranchSendFlag","下发标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fsoBranchSendDate","下发日期","DATE",true));

addSchemaColumn(new schemaColumn("fsoBranchFlag","标志位","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fsoPlanNoticeNo","分保通知号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fsoPlanPolicyNo","保单号码","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fsoPlanEndorNo","批单号码","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fsoPlanSerialNo","交费次数序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fsoPlanPayNo","交费期数","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fsoPlanPlanDate","计划交费截止日期","DATE",false));

addSchemaColumn(new schemaColumn("fsoPlanCurrency","币种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fsoPlanPlanFee","应交费金额","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fsoPlanFlag","标志位","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fsoReplanClassCode","险类","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fsoReplanRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fsoReplanReendorNo","分保批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fsoReplanRepayNo","分赔案号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fsoReplanPayType","收/付款类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fsoReplanUwYear","业务年度","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fsoReplanComCode","公司代码","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fsoReplanSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fsoReplanPayTimes","第几期计划","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fsoReplanReinsMode","分保方式","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fsoReplanTreatyNo","合同编号","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoReplanReinsType","接受人类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fsoReplanReinsNo","分保接受人序号","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fsoReplanReinsCode","接受人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoReplanReinsName","接受人简称","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fsoReplanFReinsCode","最终再保人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoReplanFReinsName","最终再保人简称","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fsoReplanCurrency","币种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fsoReplanPayValue","收/付款金额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fsoReplanPayDate","应收/付款日期","DATE",true));

addSchemaColumn(new schemaColumn("fsoReplanBelongType","所属的统计类型","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fsoReplanAccFlag","生成帐单否","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fsoReplanAccNo","对外帐单编号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fsoReplanFlag","标志位","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fxQryWhereQryCode","查询代码","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fxQryWhereSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fxQryWhereTableName","表名","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fxQryWhereWhereStr","查询限定条件","VARCHAR2(250)",true));

addSchemaColumn(new schemaColumn("fxQryWhereFlag","预留字段","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fxQryMainQryKind","查询种类","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fxQryMainQryCode","查询代码","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fxQryMainQryName","查询名称","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fxQryMainQryType","查询类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fxQryMainTableName","查询基表名称","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fxQryMainFlag","预留字段","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fzItemAccNo","帐单编号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fzItemItemNo","帐单项目序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fzItemItemCode","项目代码","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fzItemItemName","项目名称","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fzItemItemRate","项目比例","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fzItemCurrency1","原币","VARCHAR2(3)",true));

//addSchemaColumn(new schemaColumn("fzItemItemValue1","金额(原币)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzItemCurrency","帐单币种","VARCHAR2(3)",true));

//addSchemaColumn(new schemaColumn("fzItemItemValue","金额(折币)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzItemItemFlag","借/贷方标志","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fzItemFlag","备用标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fzAccAccNo","帐单编号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fzAccOptType","业务类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fzAccAccType","帐单类型","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fzAccAccKind","帐单种类","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fzAccComCode","业务归属公司代码","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fzAccComName","公司名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fzAccInsuredName","被保险人","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fzAccDamageDate","出险日期","DATE",true));

addSchemaColumn(new schemaColumn("fzAccTreatyNo","合同序号(合同帐单)","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fzAccTreatyName","合同名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fzAccAccPeriod","帐单期（合同帐单）","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fzAccRepolicyNo","分保单号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fzAccRecertifyNo","分保业务单证号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fzAccDrCertifyNo","直接业务单证号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fzAccYourRef","对方业务单证号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fzAccFacFlag","临分接受人类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fzAccReinsType","接受人类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fzAccReinsCode","接受人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fzAccReinsName","接受人名称","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fzAccPayCode","结付人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fzAccPayName","结付人名称","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fzAccUwYear","业务年度","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fzAccClassCode","险类","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fzAccRiskCode","险种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fzAccShareRate","分出份额","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fzAccCurrency1","原币","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fzAccBalance1","原币余额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzAccExchRate1","兑换率","NUMBER(16,10)",true));

addSchemaColumn(new schemaColumn("fzAccCurrency","帐单币种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fzAccBalance","余额(兑换后)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fzAccOSLoss","未决赔款","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzAccRemarks","备注(对外)","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fzAccMemo","备注(对内)","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fzAccSepeFlag","分期付款否","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fzAccSettleType","结付类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fzAccMakeComCode","制单部门代码","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fzAccAccDate","业务帐单生成日期","DATE",true));

addSchemaColumn(new schemaColumn("fzAccCreaterCode","创建人","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fzAccCreateDTime","创建时间","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("fzAccUpdaterCode","修改人","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fzAccUpdateDTime","最后修改时间","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("fzAccBelongType","所属的统计类型","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fzAccBusinessFlag","币种类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fzAccFlag","标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fzPlanMainAccNo","帐单编号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fzPlanMainYourRef","对方业务单证号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fzPlanMainPayTimes","付款期数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fzPlanMainSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fzPlanMainReinsNo","接受人序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fzPlanMainReinsCode","接受人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fzPlanMainReinsName","接受人名称","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fzPlanMainFReinsCode","最终接受人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fzPlanMainFReinsName","最终接受人名称","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fzPlanMainShareRate","分出份额","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fzPlanMainCurrency","帐单币种","VARCHAR2(3)",true));

//addSchemaColumn(new schemaColumn("fzPlanMainBalance","结付金额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzPlanMainPaidValue","已结金额","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fzPlanMainSettleDate","应结付日期","DATE",true));

addSchemaColumn(new schemaColumn("fzPlanMainSettleType","结付类型","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fzPlanMainSettleStatus","结算状态","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fzPlanMainSettleNo","结付编号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fzPlanMainCurrNo","第几次结付","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fzPlanMainDueDate","结付日期","DATE",true));

addSchemaColumn(new schemaColumn("fzPlanMainRemarks","备注","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("fzPlanMainFlag","备用标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("prpDReinsRelateReinsCode","接受人代码","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("prpDReinsRelateUpperReinsCode","接受人总公司代码","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("prpDReinsRelateValidStatus","有效标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpDReinsRelateFlag","备用标志字段","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("prpDReinsReinsCode","接受人代码","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("prpDReinsLongName","接受人全称","VARCHAR2(255)",false));

addSchemaColumn(new schemaColumn("prpDReinsShortName","接受人简称","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("prpDReinsRegionCode","所在城市／地区","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("prpDReinsCountryName","所属国家","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("prpDReinsLocationFlag","所在地区分类","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpDReinsCAddr","中文地址","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpDReinsEAddr","英文地址","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpDReinsAssessLevel","评定等级","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpDReinsTtyLinker","合同业务联系人","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("prpDReinsTtyPhone","合同业务电话","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("prpDReinsTtyFax","合同业务传真","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("prpDReinsTtyEmail","合同业务EMAIL","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("prpDReinsFacLinker","临分业务联系人","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("prpDReinsFacPhone","临分业务电话","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("prpDReinsFacFax","临分业务传真","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("prpDReinsFacEmail","临分业务EMAIL","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("prpDReinsRemarks","备注","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpDReinsAccCode","财务专项代码","VARCHAR2(8)",true));

//addSchemaColumn(new schemaColumn("prpDReinsChgDate","变更日期","DATE",true));

addSchemaColumn(new schemaColumn("prpDReinsNewReinsCode","新的分保接受人","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("prpDReinsValidStatus","有效标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpDReinsOperatorCode","操作员编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpDReinsOperateDTime","操作时间","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("prpDReinsFlag","标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoFacRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoFacReinsNo","分保接受人序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcoFacReinsType","接受人类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoFacReinsCode","接受人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoFacReinsName","接受人简称","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fcoFacFReinsCode","最终接受人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoFacFReinsName","最终接受人简称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fcoFacPayCode","结付人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoFacPayName","结付人简称","VARCHAR2(40)",true));

//addSchemaColumn(new schemaColumn("fcoFacOfferedLine","分保份额(Offered)","NUMBER(9,6)",true));

//addSchemaColumn(new schemaColumn("fcoFacSignedLine","分保份额(Signed)","NUMBER(9,6)",true));

//addSchemaColumn(new schemaColumn("fcoFacOfferedComm","手续费比例(Offered)","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fcoFacSignedComm","手续费比例(Signed)","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fcoFacTaxRate","扣税比例","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fcoFacOthRate","其他费用比例","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fcoFacRate","费率","NUMBER(14,10)",true));

addSchemaColumn(new schemaColumn("fcoFacCommitFlag","确认标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoFacCommitDate","确认日期","DATE",true));

addSchemaColumn(new schemaColumn("fcoFacCurrencyFlag","分保币种类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoFacNetFlag","以净保费计算否","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoFacFacFlag","特约接受人标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoFacCalFlag","批改后保额计算方式","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoFacFlag","备用标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fpoRecoinsReendorNo","分保批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoRecoinsRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoRecoinsCoinsType","共保人类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoRecoinsCoinsCode","共保人编码","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fpoRecoinsCoinsName","共保人名称","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fpoRecoinsShareRate","共保比例","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoRecoinsRetentionRate","自留比例","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoRecoinsRetentionFlag","标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoRecoinsTtyShareRate","合同分保共保比例","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoRecoinsFacShareRate","临时分保共保比例","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoRecoinsPayCode","结付公司代码","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fpoRecoinsPayName","结付公司名称","VARCHAR2(40)",true));



addSchemaColumn(new schemaColumn("fliChargeRepayNo","分赔案号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliChargeRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliChargeSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fliChargeYourPayNo","对方立案号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliChargeRiskCode","险种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliChargeChargeCode","费用类别代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliChargeChargeName","费用名称","VARCHAR2(16)",false));

addSchemaColumn(new schemaColumn("fliChargeCurrency","币种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliChargeChargeAmount","费用金额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliChargeSumRealPay","计入赔款金额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliChargeFlag","标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fliPersonLossRepayNo","分赔案号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliPersonLossRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliPersonLossSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fliPersonLossYourPayNo","立案号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fliPersonLossRiskCode","险种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliPersonLossPersonNo","人员序号","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fliPersonLossPersonName","人员名称","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fliPersonLossKindCode","承保险别代码","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fliPersonLossLiabCode","责任分类代码","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fliPersonLossLiabName","责任分类名称","VARCHAR2(120)",true));

addSchemaColumn(new schemaColumn("fliPersonLossJobCode","雇员工种代码","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fliPersonLossJobName","雇员工种名称","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fliPersonLossLiabDetailCode","责任名细分类代码","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fliPersonLossLiabDetailName","责任名细分类名称","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fliPersonLossItemAddress","受损标的地址","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fliPersonLossLossQuantity","人数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fliPersonLossUnit","数量单位","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fliPersonLossUnitAmount","单位赔偿限额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliPersonLossCurrency","实赔币别","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliPersonLossSumRealPay","实赔金额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliPersonLossFlag","备用标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fliReitemRepayNo","分赔案号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliReitemRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliReitemSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fliReitemYourPayNo","对方立案号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliReitemRiskCode","险种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliReitemKindCode","险别","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliReitemItemCode","标的代码","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fliReitemItemName","标的名称","VARCHAR2(120)",true));

addSchemaColumn(new schemaColumn("fliReitemCurrency","赔付币种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliReitemPay","物质损失赔款金额","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fliReitemNopay","免赔额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliReitemRemarks","备注","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fliReitemFlag","标志","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fcoItemNoticeNo","分保通知书号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoItemPolicyNo","保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoItemSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcoItemRiskCode","险种代码","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fcoItemKindCode","险别代码","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fcoItemItemName","标的名称","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fcoItemItemAddr","标的地址","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("fcoItemContractor","承包商","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("fcoItemPostCode","邮编","VARCHAR2(6)",true));

addSchemaColumn(new schemaColumn("fcoItemWellType","钻井类型代码","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoItemDeep","井深","NUMBER(8,2)",true));

addSchemaColumn(new schemaColumn("fcoItemCurrency","币种","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fcoItemAmount","保额","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fcoItemSumAccumulate","累计责任限额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fcoItemRate","费率","NUMBER(8,4)",true));

addSchemaColumn(new schemaColumn("fcoItemCalculateFlag","是否计算保额标志","VARCHAR2(1)",false));

//addSchemaColumn(new schemaColumn("fcoItemPremium","保费","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fcoItemNopay","免赔额","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fcoItemFlag","标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoPlaneNoticeNo","分保通知号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoPlanePolicyNo","保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoPlaneSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcoPlanePlaneNo","飞机编号","VARCHAR2(16)",false));

addSchemaColumn(new schemaColumn("fcoPlanePlaneType","飞机型号","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoPlaneMakeYear","制造年份","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fcoPlaneSeatCount","座位数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fcoPlaneFlyRange","航行范围","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("fcoPlaneRiskCode","险种代码","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fcoPlanePassengerFlux","客流量","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoPlaneGoodsFlux","货邮量","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoPlaneMaxPlaneValue","最大飞机价值","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fcoPlaneAverageValue","平均价值","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fcoPlaneTowerH","塔台高","NUMBER(7,2)",true));

addSchemaColumn(new schemaColumn("fcoPlaneTowerW","塔台宽","NUMBER(7,2)",true));

addSchemaColumn(new schemaColumn("fcoPlaneTowerL","塔台长","NUMBER(7,2)",true));

addSchemaColumn(new schemaColumn("fcoPlanePlaneUsage","飞机用途","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fcoPlanePeriodFlag","保险期限类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoPlaneLeaseMode","飞机引进方式","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fcoPlaneStartDate","起保日期","DATE",true));

addSchemaColumn(new schemaColumn("fcoPlaneEndDate","终保日期","DATE",true));

addSchemaColumn(new schemaColumn("fcoPlaneRemarks","使用本机场机型","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fcoPlaneRecoverFlag","续保标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoPlaneValidFlag","失效标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoPlaneFlag","标志","VARCHAR2(10)",true));



//addSchemaColumn(new schemaColumn("floChargeClaimNo","赔案通知号","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floChargePayNo","立案号","VARCHAR2(22)",true));

//addSchemaColumn(new schemaColumn("floChargeCompensateNo","赔款计算书号","VARCHAR2(22)",true));

//addSchemaColumn(new schemaColumn("floChargePolicyNo","保单号","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floChargeRiskCode","险种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floChargeSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("floChargeChargeCode","费用类别代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floChargeChargeName","费用名称","VARCHAR2(16)",false));

addSchemaColumn(new schemaColumn("floChargeCurrency","币种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floChargeChargeAmount","费用金额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floChargeSumRealPay","计入赔款金额","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("floChargeFlag","标志","VARCHAR2(10)",true));



//addSchemaColumn(new schemaColumn("floItemClaimNo","赔案通知号","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floItemPayNo","立案号","VARCHAR2(22)",true));

//addSchemaColumn(new schemaColumn("floItemCompensateNo","赔款计算书号","VARCHAR2(22)",true));

//addSchemaColumn(new schemaColumn("floItemPolicyNo","保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("floItemSerialNo","序号","NUMBER(15)",false));

//addSchemaColumn(new schemaColumn("floItemRiskCode","险种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floItemKindCode","险别","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floItemItemName","标的名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("floItemPlaneType","飞机型号","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("floItemRegistNo","注册号","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("floItemCurrency","币种（赔付币种）","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floItemPay","物质损失赔款金额","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("floItemNopay","免赔额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floItemRemarks","备注","VARCHAR2(255)",true));

//addSchemaColumn(new schemaColumn("floItemFlag","备用标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fciReitemRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciReitemSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fciReitemYourPolicyNo","对方保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciReitemRiskCode","险种代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fciReitemKindCode","险别代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fciReitemItemCode","标的代码","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fciReitemItemName","标的名称","VARCHAR2(120)",true));

addSchemaColumn(new schemaColumn("fciReitemItemAddr","标的地址","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("fciReitemCurrency","币种","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fciReitemAmount","保额","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fciReitemRate","费率","NUMBER(8,4)",true));

//addSchemaColumn(new schemaColumn("fciReitemPremium","保费","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fciReitemCalculateFlag","是否计算保额标志","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fciReitemFlag","标志","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fcoRecoinsRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoRecoinsCoinsType","共保人类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoRecoinsCoinsCode","共保人编码","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fcoRecoinsCoinsName","共保人名称","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fcoRecoinsShareRate","共保比例","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fcoRecoinsRetentionRate","自留比例","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fcoRecoinsRetentionFlag","标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoRecoinsTtyShareRate","合同分保共保比例","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fcoRecoinsFacShareRate","临时分保共保比例","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fcoRecoinsPayCode","结付公司代码","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fcoRecoinsPayName","结付公司名称","VARCHAR2(40)",true));



addSchemaColumn(new schemaColumn("floReItemRepayNo","分赔案号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("floReItemClaimNo","赔案通知号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("floReItemPayNo","立案号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floReItemPolicyNo","保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("floReItemRepolicyNo","分保单号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floReItemRiskCode","险种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floReItemPayType","赔款类型","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("floReItemItemCode","项目代码","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("floReItemItemName","标的名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("floReItemCurrency","币种（赔付币种）","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floReItemPayValue","物质损失赔款金额","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("floReItemRemarks","备注","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("floReItemFlag","备用标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fciReclauseRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciReclauseSerialNo","条款序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fciReclauseYourPolicyNo","对方保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciReclauseClauseCode","条款代码","VARCHAR2(7)",true));

addSchemaColumn(new schemaColumn("fciReclauseClauseTitle","条款","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fciReclauseFlag","标志","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fxQryColQryCode","查询代码","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fxQryColSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fxQryColColName","字段名","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fxQryColColDispName","字段显示名称","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fxQryColColType","字段类型","VARCHAR2(6)",true));

addSchemaColumn(new schemaColumn("fxQryColTableName","表名","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fxQryColCodeType","代码类名称","VARCHAR2(15)",true));

addSchemaColumn(new schemaColumn("fxQryColCodeFlag","代码标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fxQryColDispFlag","显示标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fxQryColSelectFlag","选择标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fxQryColFlag","预留字段","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fxQryJoinQryCode","查询代码","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fxQryJoinSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fxQryJoinJoinStr","联接条件","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fxQryJoinFlag","预留字段","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fciRecoinsRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciRecoinsSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fciRecoinsYourPolicyNo","对方保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciRecoinsCoinsType","共保人类型","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fciRecoinsCoinsCode","共保人编码","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fciRecoinsCoinsName","共保人名称","VARCHAR2(40)",true));

//addSchemaColumn(new schemaColumn("fciRecoinsShareRate","共保比例","NUMBER(9,6)",false));

addSchemaColumn(new schemaColumn("fciRecoinsFlag","标志","VARCHAR2(2)",true));


addSchemaColumn(new schemaColumn("fcoAbstractRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoAbstractReinsMode","分保方式","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fcoAbstractTreatyNo","合同序号","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fcoAbstractShareRate","份额","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fcoAbstractCurrency","币种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fcoAbstractBelongType","所属的统计类型","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fcoAbstractAmount","分出保额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fcoAbstractPremium","分出保费","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fcoAbstractFlag","备用标志","VARCHAR2(10)",true));


addSchemaColumn(new schemaColumn("fpiReclauseReendorNo","分入分批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReclauseRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReclauseYourEndorNo","对方批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReclauseYourPolicyNo","对方发生批改的保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReclauseSerialNo","条款序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpiReclauseClauseCode","条款代码","VARCHAR2(7)",true));

addSchemaColumn(new schemaColumn("fpiReclauseClauseTitle","条款","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpiReclauseFlag","标志","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fzPlanDetailAccNo","帐单编号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fzPlanDetailSerialNo","第几期","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fzPlanDetailReinsNo","接受人序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fzPlanDetailItemNo","帐单项目序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fzPlanDetailItemCode","项目代码","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fzPlanDetailItemName","项目名称","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fzPlanDetailCurrency","帐单币种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fzPlanDetailItemValue","金额(原币)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzPlanDetailItemFlag","借/贷方标志","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fzPlanDetailCurrNo","结付次数","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fzPlanDetailSettleNo","结付编号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fzPlanDetailExchRate","结付的兑换率","NUMBER(16,10)",true));

addSchemaColumn(new schemaColumn("fzPlanDetailCurrencyS","结付币种(折币)","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fzPlanDetailItemValueS","结付金额(折币)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzPlanDetailDueDate","结付日期","DATE",true));

addSchemaColumn(new schemaColumn("fzPlanDetailFlag","备用标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fpiRecoinsReendorNo","分入分批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiRecoinsRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiRecoinsYourEndorNo","对方批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiRecoinsYourPolicyNo","对方发生批改的保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiRecoinsSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpiRecoinsCoinsType","共保人类型","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fpiRecoinsCoinsCode","共保人编码","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fpiRecoinsCoinsName","共保人名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpiRecoinsShareRate","共保比例","NUMBER(9,6)",false));

addSchemaColumn(new schemaColumn("fpiRecoinsFlag","标志","VARCHAR2(2)",true));


addSchemaColumn(new schemaColumn("prpDAccountReinsCode","接受人代码","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("prpDAccountClassCode","险类","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("prpDAccountAccountName","开户人名称","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpDAccountAddr","开户地址","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpDAccountBank","开户银行","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpDAccountSwiftCode","SwiftCode","VARCHAR2(14)",true));

addSchemaColumn(new schemaColumn("prpDAccountCurrency","币种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("prpDAccountAccounts","帐号","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpDAccountValidStatus","有效标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpDAccountFlag","备用标志字段","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpDAccountStartDate","起始时间","Date",true));

addSchemaColumn(new schemaColumn("prpDAccountEndDate","终止时间","Date",true));



addSchemaColumn(new schemaColumn("fpoAbstractReendorNo","分保批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoAbstractRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoAbstractReinsMode","分保方式","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fpoAbstractTreatyNo","合同序号","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fpoAbstractShareRate","份额","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoAbstractCurrency","币种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoAbstractBelongType","所属的统计类型","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fpoAbstractAmount","分出保额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoAbstractPremium","分出保费","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoAbstractFlag","备用标志","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoAbstractAmountChg","保额变化量 (原币)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoAbstractPremiumChg","保费变化量 (原币)","NUMBER(14,2)",true));



addSchemaColumn(new schemaColumn("fpoClauseEndorNo","批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoClauseNoticeNo","分保通知书号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fpoClauseSerialNo","条款序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpoClauseClauseCode","条款代码","VARCHAR2(7)",true));

addSchemaColumn(new schemaColumn("fpoClauseClauseTitle","条款","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpoClauseFlag","备用标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fpoCoinsEndorNo","批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoCoinsNoticeNo","分保通知书号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoCoinsPolicyNo","保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoCoinsSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpoCoinsCoinsType","共保人类型","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fpoCoinsCoinsCode","共保人编码","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fpoCoinsCoinsName","共保人名称","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fpoCoinsShareRate","共保比例","NUMBER(9,6)",false));

addSchemaColumn(new schemaColumn("fpoCoinsRetentionRate","自留比例","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoCoinsRetentionFlag","标志","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fpoCoinsFlag","备用标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoClauseNoticeNo","分保通知书号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoClauseSerialNo","条款序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcoClauseClauseCode","条款代码","VARCHAR2(7)",true));

addSchemaColumn(new schemaColumn("fcoClauseClauseTitle","条款","VARCHAR2(255)",true));



addSchemaColumn(new schemaColumn("fpoFacReendorNo","分保批单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoFacRepolicyNo","分保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoFacReinsNo","分保接受人序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpoFacReinsType","接受人类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoFacReinsCode","接受人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoFacReinsName","接受人简称","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fpoFacFReinsCode","最终接受人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoFacFReinsName","最终接受人简称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpoFacPayCode","结付人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoFacPayName","结付人简称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpoFacOfferedLine","分保份额(Offered)","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoFacSignedLine","分保份额(Signed)","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoFacOfferedComm","手续费比例(Offered)","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpoFacSignedComm","手续费比例(Signed)","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpoFacTaxRate","扣税比例","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpoFacOthRate","其他费用比例","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpoFacRate","费率","NUMBER(14,10)",true));

addSchemaColumn(new schemaColumn("fpoFacCommitFlag","确认标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoFacCommitDate","确认日期","DATE",true));

addSchemaColumn(new schemaColumn("fpoFacCurrencyFlag","分保计算方式","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoFacNetFlag","以净保费计算否","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoFacFacFlag","特约接受人标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoFacCalFlag","批改后保额计算方式","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoFacFlag","备用标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoCoinsNoticeNo","分保通知书号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoCoinsPolicyNo","保单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoCoinsSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcoCoinsCoinsType","共保人类型","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fcoCoinsCoinsCode","共保人编码","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fcoCoinsCoinsName","共保人名称","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fcoCoinsShareRate","共保比例","NUMBER(9,6)",false));

//addSchemaColumn(new schemaColumn("fcoCoinsRetentionRate","自留比例","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fcoCoinsRetentionFlag","标志","VARCHAR2(1)",false));


addSchemaColumn(new schemaColumn("floAbstractRepayNo","分赔案号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("floAbstractReinsMode","分保方式","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("floAbstractTreatyNo","合同序号","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("floAbstractShareRate","份额","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("floAbstractCurrency","币种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floAbstractBelongType","所属的统计类型","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("floAbstractPay","摊回赔款","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floAbstractFee","摊回费用","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floAbstractOutstanding","未决","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floAbstractFlag","备用标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcrPolicyReportComCode","上报公司代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fcrPolicyMakeComCode","出单公司代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fcrPolicyAccPeriod","帐单期","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fcrPolicyUwYear","业务年度（依起保日期）","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fcrPolicyClassCode","法定分保险类代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fcrPolicyRiskCode","险种代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fcrPolicyCurrency","货币代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fcrPolicyPolicyNo","保单号码","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcrPolicyInsuredName","被保险人","VARCHAR2(50)",false));

addSchemaColumn(new schemaColumn("fcrPolicyOperateDate","出单日期","DATE",false));

addSchemaColumn(new schemaColumn("fcrPolicyStartDate","起保日期","DATE",false));

addSchemaColumn(new schemaColumn("fcrPolicyEndDate","终保日期","DATE",true));

addSchemaColumn(new schemaColumn("fcrPolicyItemName","标的名称","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fcrPolicyItemAddress","标的地区","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fcrPolicyLongLatitude","经纬度","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcrPolicyRate","费率（‰）","NUMBER(5,2)",true));

addSchemaColumn(new schemaColumn("fcrPolicySumAmount","保额","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrPolicySumPremium","保费","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrPolicyRealPremium","实收保费","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrPolicyReinsAmount","分保额","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrPolicyReinsPremium","分保费","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrPolicyRemark","备注","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcrPolicyInputDate","输入日期","DATE",true));

addSchemaColumn(new schemaColumn("fcrPolicyComCode","业务归属机构","VARCHAR2(8)",false));



addSchemaColumn(new schemaColumn("fcrTotalPolicyReportComCode","上报公司代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyMakeComCode","出单公司代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyAccPeriod","帐单期","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyUwYear","业务年度（依起保日期）","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyClassCode","险类代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyRiskCode","险种代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyCurrency","货币代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyOperateMonth1","出单月份1","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyOperateCount1","出单笔数1","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicySumAmount1","总保额1","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicySumPremium1","应收保费1","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyRealPremium1","实收保费1","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyReinsAmount1","分保额1","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyReinsPremium1","分保费1","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyRemark1","备注1","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcrTotalPolicyOperateMonth2","出单月份2","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyOperateCount2","出单笔数2","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicySumAmount2","总保额2","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicySumPremium2","应收保费2","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyRealPremium2","实收保费2","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyReinsAmount2","分保额2","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyReinsPremium2","分保费2","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyRemark2","备注2","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcrTotalPolicyOperateMonth3","出单月份3","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyOperateCount3","出单笔数3","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicySumAmount3","总保额3","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicySumPremium3","应收保费3","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyRealPremium3","实收保费3","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyReinsAmount3","分保额3","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyReinsPremium3","分保费3","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyRemark3","备注3","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcrTotalPolicySumAmount","合计保额","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicySumPremium","合计应收保费","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyRealPremium","合计实收保费","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyReinsAmount","合计分保额","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyReinsPremium","合计分保费","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyRemark","备注","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcrTotalPolicyInputDate","输入日期","DATE",true));

addSchemaColumn(new schemaColumn("fcrTotalPolicyComCode","业务归属机构","VARCHAR2(8)",false));



addSchemaColumn(new schemaColumn("fgoBranchDCertifyNo","业务单证号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fgoBranchDClassCode","险类","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fgoBranchDSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fgoBranchDAccPeriod","帐单期","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fgoBranchDComCode","业务所属公司","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fgoBranchDPayCode","结付公司代码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fgoBranchDTreatyNo","合同序号","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fgoBranchDCurrency","币种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fgoBranchDPremium","保费","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fgoBranchDPayValue","赔款","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fgoBranchDOSLoss","未决赔款","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fgoBranchDPayDate","应收/付款日期","DATE",true));

addSchemaColumn(new schemaColumn("fgoBranchDAccFlag","生成帐单否","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fgoBranchDAccNo","对内帐单编号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fgoBranchDFlag","备用","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fgoBranchDReinsClassCode","中再险类","VARCHAR2(3)",true));



addSchemaColumn(new schemaColumn("fgoRePlanCertifyNo","业务单证号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fgoRePlanClassCode","险类","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fgoRePlanPayType","收/付款类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fgoRePlanUwYear","业务年度","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fgoRePlanAccPeriod","帐单期","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fgoRePlanSerialNo","序号","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fgoRePlanTreatyNo","合同编号","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fgoRePlanReinsCode","接受人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fgoRePlanReinsName","接受人简称","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fgoRePlanCurrency","币种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fgoRePlanPayValue","收/付款金额: 保费/赔款","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fgoRePlanPayDate","应收/付款日期","DATE",true));

addSchemaColumn(new schemaColumn("fgoRePlanAccFlag","生成帐单否","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fgoRePlanAccNo","对外帐单编号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fgoRePlanFlag","备用字段","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fgoRePlanReinsClassCode","中再险类","VARCHAR2(3)",true));


addSchemaColumn(new schemaColumn("fjSettleSettleNo","结算单编号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fjSettleSettleType","结付类型","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fjSettlePayCode","结付人编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fjSettlePayName","结付人名称","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fjSettleCurrency","结付币种","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fjSettleSettleValue","结付金额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fjSettleBank","开户银行","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fjSettleAddr","开户行地址","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fjSettleAccountName","开户人名称","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fjSettleAccounts","帐号","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fjSettleSettleFlag","收／付款标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fjSettlePayMode","付款方式","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fjSettleVoucherNo","银行单证编号","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fjSettleBankComm","银行手续费","NUMBER(8,2)",true));

addSchemaColumn(new schemaColumn("fjSettleOperatorCode","经办人","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fjSettleOperateDTime","创建时间","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("fjSettleApprover1Code","一核人","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fjSettleApprove1DTime","一核时间","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("fjSettleApprover2Code","二核人","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fjSettleApprove2DTime","二核时间","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("fjSettleSendFlag","财务标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fjSettleSenderCode","送交财务的处理人","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fjSettleSendDTime","送财务时间","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("fjSettleRemarks","备注","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("fjSettleFlag","备用标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fjVouRelateCertifyNo","分保业务单证号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fjVouRelateTreatyNo","合同序号","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fjVouRelateAccPeriod","帐单期","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fjVouRelateSettleNo","结算单编号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fjVouRelateMyDocuNo","临时凭证号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fjVouRelateVoucherType","凭证类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fjVouRelateAccType","业务类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fjVouRelateOperatorCode","凭证创建人","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fjVouRelateOperateDTime","凭证创建时间","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("fjVouRelateReceiveDTime","财务接收凭证时间","VARCHAR2(16)",true));



addSchemaColumn(new schemaColumn("flrPayReportComCode","上报公司代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("flrPayMakeComCode","出单公司代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("flrPayAccPeriod","帐单期","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("flrPayUwYear","业务年度（依起保日期）","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("flrPayClassCode","法定分保险类代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("flrPayRiskCode","险种代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("flrPayCurrency","货币代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("flrPayPolicyNo","保单号码","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("flrPayClaimNo","赔案通知号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("flrPayInsuredName","被保险人","VARCHAR2(50)",false));

addSchemaColumn(new schemaColumn("flrPayStartDate","起保日期","DATE",false));

addSchemaColumn(new schemaColumn("flrPayEndDate","终保日期","DATE",true));

addSchemaColumn(new schemaColumn("flrPayItemName","标的名称","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("flrPayDamageDate","出险日期","DATE",false));

addSchemaColumn(new schemaColumn("flrPayDamageCode","出险原因代码","VARCHAR2(6)",false));

addSchemaColumn(new schemaColumn("flrPayPayDate","赔付日期","DATE",false));

addSchemaColumn(new schemaColumn("flrPaySumPaid","总赔款","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrPayREINSPAID","摊赔金额","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrPayInputDate","输入日期","DATE",true));

addSchemaColumn(new schemaColumn("flrPayComCode","业务归属机构","VARCHAR2(8)",false));



addSchemaColumn(new schemaColumn("flrTotalNoPayReportComCode","上报公司代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPayMakeComCode","出单公司代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPayAccPeriod","帐单期","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPayUwYear","业务年度（依起保日期）","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPayClassCode","法定分保险类代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPayRiskCode","险种代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPayCurrency","货币代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPayPaidCount","赔付笔数","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPaySumPaid","合计赔款","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPaySettledPaid","已决赔款","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPayREINSPAID","合计分赔款","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPayRemark","备注","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("flrTotalNoPayInputDate","输入日期","DATE",true));

addSchemaColumn(new schemaColumn("flrTotalNoPayComCode","业务归属机构","VARCHAR2(8)",false));



addSchemaColumn(new schemaColumn("flrTotalPayReportComCode","上报公司代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("flrTotalPayMakeComCode","出单公司代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("flrTotalPayAccPeriod","帐单期","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("flrTotalPayUwYear","业务年度（依起保日期）","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("flrTotalPayClassCode","法定分保险类代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("flrTotalPayRiskCode","险种代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("flrTotalPayCurrency","货币代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("flrTotalPayDamageMonth1","出险月份","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("flrTotalPayPaidCount1","赔付笔数","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("flrTotalPaySumPaid1","总赔款","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrTotalPayReinsPaid1","摊赔金额","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrTotalPayRemark1","备注","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("flrTotalPayDamageMonth2","damagemonth2","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("flrTotalPayPaidCount2","paidcount2","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("flrTotalPaySumPaid2","sumpaid2","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrTotalPayReinsPaid2","reinspaid2","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrTotalPayRemark2","remark2","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("flrTotalPayDamageMonth3","damagemonth3","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("flrTotalPayPaidCount3","paidcount3","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("flrTotalPaySumPaid3","sumpaid3","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrTotalPayReinsPaid3","reinspaid3","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrTotalPayRemark3","remark3","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("flrTotalPaySumPaid","sumpaid","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrTotalPayREINSPAID","reinspaid","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrTotalPayRemark","remark","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("flrTotalPayInputDate","输入日期","DATE",true));

addSchemaColumn(new schemaColumn("flrTotalPayComCode","业务归属机构","VARCHAR2(8)",false));



addSchemaColumn(new schemaColumn("fprEndorReportComCode","上报公司代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fprEndorMakeComCode","出单公司代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fprEndorAccPeriod","帐单期","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fprEndorUwYear","业务年度（依起保日期）","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fprEndorClassCode","法定分保险类代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fprEndorRiskCode","险种代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fprEndorCurrency","货币代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fprEndorPolicyNo","保单号码","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fprEndorEndorNo","批单号码","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fprEndorInsuredName","被保险人","VARCHAR2(50)",false));

addSchemaColumn(new schemaColumn("fprEndorStartDate","起保日期","DATE",false));

addSchemaColumn(new schemaColumn("fprEndorEndDate","终保日期","DATE",true));

addSchemaColumn(new schemaColumn("fprEndorItemName","标的名称","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fprEndorReason","变更原因","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fprEndorEndorDate","变更日期","DATE",false));

addSchemaColumn(new schemaColumn("fprEndorSumAmount","保额变化","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprEndorSumPremium","保费变化","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprEndorReinsAmount","分保额","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprEndorReinsPremium","分保费","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprEndorInputDate","输入日期","DATE",true));

addSchemaColumn(new schemaColumn("fprEndorComCode","业务归属机构","VARCHAR2(8)",false));



addSchemaColumn(new schemaColumn("fprTotalEndorReportComCode","上报公司代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorMakeComCode","出单公司代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorAccPeriod","帐单期","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorUwYear","业务年度（依起保日期）","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorClassCode","法定分保险类代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorRiskCode","险种代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorCurrency","货币代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorOperateMonth1","出单月份","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorOperateCount1","出单笔数","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorSumAmount1","保额变化","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorSumPremium1","保费变化","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorReinsAmount1","分保额","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorReinsPremium1","分保费","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorRemark1","备注","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fprTotalEndorOperateMonth2","operatemonth2","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorOperateCount2","operatecount2","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorSumAmount2","sumamount2","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorSumPremium2","sumpremium2","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorReinsAmount2","reinsamount2","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorReinsPremium2","reinspremium2","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorRemark2","remark2","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fprTotalEndorOperateMonth3","operatemonth3","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorOperateCount3","operatecount3","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorSumAmount3","sumamount3","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorSumPremium3","sumpremium3","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorReinsAmount3","reinsamount3","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorReinsPremium3","reinspremium3","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorRemark3","remark3","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fprTotalEndorSumAmount","sumamount","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorSumPremium","sumpremium","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorReinsAmount","reinsamount","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorReinsPremium","reinspremium","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorRemark","remark","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fprTotalEndorInputDate","输入日期","DATE",true));

addSchemaColumn(new schemaColumn("fprTotalEndorComCode","业务归属机构","VARCHAR2(8)",false));



addSchemaColumn(new schemaColumn("fxConditionConCode","条件代码","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fxConditionConName","条件名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fxConditionClassCode","险类代码","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fxConditionRiskCode","险种代码","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fxConditionUwYear","业务年度","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fxConditionConType","判断类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fxConditionLogic","逻辑条件","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fxConditionCurrency","币种","VARCHAR2(3)",true));

//addSchemaColumn(new schemaColumn("fxConditionPointValue","起点值","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fxConditionTopValue","终点值","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fxConditionStartDate","有效起始日期","DATE",true));

//addSchemaColumn(new schemaColumn("fxConditionEndDate","有效终止日期","DATE",true));

addSchemaColumn(new schemaColumn("fxConditionValidStatus","有效标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fxConditionFlag","标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fxFormRiskCode","险种代码","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fxFormFileType","文件类型","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("fxFormRowNo","行","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fxFormColNo","列","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fxFormFileName","文件名","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fxFormTableName","表名","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fxFormFlag","标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fxReportReportCode","报表代码","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("fxReportReportType","报表类型","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fxReportReportName","报表名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fxReportTemplateName","模板名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fxReportSelectStr1","SQL语句的字段名称1","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fxReportSelectStr2","SQL语句的字段名称2","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fxReportWhereStr","取数据时SQL语句的Where条件","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fxReportGroupBy","SQL语句中的分组条件","VARCHAR2(160)",true));

addSchemaColumn(new schemaColumn("fxReportOrderBy","取数据时SQL语句的Order By字段","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("fxReportReportService","实现报表打印的服务名","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fxReportValidStatus","有效标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fxReportFlag","标志","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fzCancelSourceNo","原始帐单号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fzCancelCancelNo","冲销的帐单号","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fzCancelCancelDate","冲销日期","DATE",true));

addSchemaColumn(new schemaColumn("fzCancelCreaterCode","创建人","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fzTtyRlistIPAddr","IP地址","VARCHAR2(15)",false));

addSchemaColumn(new schemaColumn("fzTtyRlistRefNo","合同业务号","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fzTtyRlistTreatyName","合同名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fzTtyRlistUwYear","业务年度","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fzTtyRlistCurrency","币种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fzTtyRlistPremium","分保费","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzTtyRlistComm","手续费","NUMBER(12,2)",true));

addSchemaColumn(new schemaColumn("fzTtyRlistTax","税","NUMBER(12,2)",true));

addSchemaColumn(new schemaColumn("fzTtyRlistOtherFee","其他费用","NUMBER(12,2)",true));

addSchemaColumn(new schemaColumn("fzTtyRlistLoss","赔款","NUMBER(12,2)",true));

addSchemaColumn(new schemaColumn("fzTtyRlistOSLoss","未决赔款","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzTtyRlistBalance","余额","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzTtyRlistProfitRatio","利润率","NUMBER(10,4)",true));



addSchemaColumn(new schemaColumn("prpDAccItemAccItemCode","帐单项目编码","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("prpDAccItemPositiveCName","中文说明(>0)","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("prpDAccItemPositiveEName","英文说明(>0)","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("prpDAccItemItemPlace","借贷关系","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpDAccItemNegativeCName","Nega中文说明(<0)","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("prpDAccItemNegativeEName","英文说明(<0)","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("prpDAccItemAccYear","财务年度","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("prpDAccItemNewAccItemCode","新代码","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("prpDAccItemValidStatus","有效标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpDAccItemOperatorCode","操作员编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpDAccItemOperateDTime","操作时间","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("prpDAccItemFlag","标志","VARCHAR2(5)",true));



addSchemaColumn(new schemaColumn("prpDArticleAccYear","财务年度","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("prpDArticleOptType","业务类型","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("prpDArticleAccType","帐单类型","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("prpDArticleItemCode","财务科目代码","VARCHAR2(12)",false));

addSchemaColumn(new schemaColumn("prpDArticleArticleCode","专项代码","VARCHAR2(6)",false));

addSchemaColumn(new schemaColumn("prpDArticleOperatorCode","操作员","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpDArticleOperateDTime","操作时间","VARCHAR2(16)",true));



addSchemaColumn(new schemaColumn("prpDArtItemAccYear","财务年度","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("prpDArtItemOptType","业务类型","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("prpDArtItemAccType","帐单类型","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("prpDArtItemAccItemCode","帐单项目编码","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("prpDArtItemAccItemName","帐单项目名称","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("prpDArtItemItemCode","财务科目代码","VARCHAR2(12)",true));

addSchemaColumn(new schemaColumn("prpDArtItemItemName","财务科目说明","VARCHAR2(12)",true));

addSchemaColumn(new schemaColumn("prpDArtItemItemFlag","借贷标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpDArtItemVoucherType","凭证类型","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("prpDArtItemOperatorCode","操作员","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpDArtItemOperateDTime","操作时间","VARCHAR2(16)",true));



addSchemaColumn(new schemaColumn("prpDComAccountComCode","部门代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("prpDComAccountAccountName","开户人名称","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("prpDComAccountAddr","开户地址","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpDComAccountBank","开户银行","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("prpDComAccountCurrency","币种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("prpDComAccountAccounts","帐号","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("prpDComAccountValidStatus","有效标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpDComAccountFlag","备用标志字段","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("prpReinsVerifyClassCode","险类","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("prpReinsVerifyRiskCode","险种","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("prpReinsVerifyCertiType","单号类型","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("prpReinsVerifyCertiNo","投保单号/保单号码/批单号码/预付赔款登记号/赔款计算书号","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("prpReinsVerifyReinsIntent","分保意向","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpReinsVerifyReinsState","再保确认状态","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpReinsVerifyVerifierCode","再保确认人代码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpReinsVerifyReinsHandleText","再保确认意见","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpReinsVerifyReinsHandleDate","再保确认日期","DATE",true));

addSchemaColumn(new schemaColumn("prpReinsVerifyOperatorCode","操作员代码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpReinsVerifyInputDate","输入日期","DATE",false));

addSchemaColumn(new schemaColumn("prpReinsVerifyInputTime","输入时间","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("prpReinsVerifyModifierCode","最后修改人代码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpReinsVerifyModifyDate","最后修改日期","DATE",true));

addSchemaColumn(new schemaColumn("prpReinsVerifyModifyTime","最后修改时间","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("prpReinsVerifyFlag","标志位","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("utiKeyTableName","表名","VARCHAR2(20)",false));

addSchemaColumn(new schemaColumn("utiKeyFieldName","字段名","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("utiKeyFieldMeaning","名称","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("utiKeyColLength","流水号长度","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("utiKeyHeadID","单据号种类","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("utiKeyFlag","标识","VARCHAR2(8)",true));



addSchemaColumn(new schemaColumn("prpDRiskKindUwYear","业务年度","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("prpDRiskKindRiskKindCode","风险类别代码","VARCHAR2(15) ",false));

addSchemaColumn(new schemaColumn("prpDRiskKindCodeCName","中文名称","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("prpDRiskKindCodeEName","英文名称","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("prpDRiskKindNewKindCode","新风险类别代码","VARCHAR2(15)",false));

addSchemaColumn(new schemaColumn("prpDRiskKindValidStatus","有效标志","VARCHAR2(1) ",false));

addSchemaColumn(new schemaColumn("prpDRiskKindOperatorCode","操作员编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpDRiskKindOperateDTime","操作时间","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("prpDRiskKindFlag","备用标志字段","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("flrnopayReportComCode","ReportComCode","CHAR(8)",false));

addSchemaColumn(new schemaColumn("flrnopayMakeComCode","MakeComCode","CHAR(8)",false));

addSchemaColumn(new schemaColumn("flrnopayAccPeriod","AccPeriod","CHAR(8)",false));

addSchemaColumn(new schemaColumn("flrnopayUwYear","UwYear","CHAR(4)",false));

addSchemaColumn(new schemaColumn("flrnopayClassCode","ClassCode","CHAR(3)",false));

addSchemaColumn(new schemaColumn("flrnopayRiskCode","RiskCode","CHAR(3)",false));

addSchemaColumn(new schemaColumn("flrnopayCurrency","Currency","CHAR(3)",false));

addSchemaColumn(new schemaColumn("flrnopayPolicyNo","PolicyNo","CHAR(22)",false));

addSchemaColumn(new schemaColumn("flrnopayClaimNo","ClaimNo","CHAR(22)",false));

addSchemaColumn(new schemaColumn("flrnopayInsuredName","InsuredName","CHAR(50)",false));

addSchemaColumn(new schemaColumn("flrnopayStartDate","StartDate","DATE",false));

addSchemaColumn(new schemaColumn("flrnopayEndDate","EndDate","DATE",false));

addSchemaColumn(new schemaColumn("flrnopayItemName","ItemName","CHAR(30)",true));

addSchemaColumn(new schemaColumn("flrnopayDamageDate","DamageDate","DATE",false));

addSchemaColumn(new schemaColumn("flrnopayDamageCode","DamageCode","CHAR(6)",false));

addSchemaColumn(new schemaColumn("flrnopaySumPaid","SumPaid","DECIMAL(15,2)",false));

addSchemaColumn(new schemaColumn("flrnopayReinsPaid","ReinsPaid","DECIMAL(15,2)",false));

addSchemaColumn(new schemaColumn("flrnopaySettledPaid","SettledPaid","DECIMAL(15,2)",false));

addSchemaColumn(new schemaColumn("flrnopayInputDate","InputDate","DATE",true));

addSchemaColumn(new schemaColumn("flrnopayComCode","ComCode","CHAR(8)",false));



addSchemaColumn(new schemaColumn("prpDPlanePlaneCode","飞机代码","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("prpDPlanePlaneType","飞机型号","VARCHAR2(15)",false));

addSchemaColumn(new schemaColumn("prpDPlanePlaneNo","注册号","VARCHAR2(15)",true));

addSchemaColumn(new schemaColumn("prpDPlaneFleetName","机队名称","VARCHAR2(50)",false));

addSchemaColumn(new schemaColumn("prpDPlaneRange","机体","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("prpDPlaneSeatCount","座位数","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("prpDPlaneMakeYear","制造年份","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("prpDPlaneLeaseMode","所有方式","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("prpDPlanePlaneUsage","飞机用途","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("prpDPlaneRemarks","备注","VARCHAR2(250)",true));

addSchemaColumn(new schemaColumn("prpDPlaneValidStatus","有效标志","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpDPlaneOperatorCode","操作员编码","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpDPlaneOperateDTime","操作时间","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("prpDPlaneFlag","备用标志字段","VARCHAR2(10)",true));



//addSchemaColumn(new schemaColumn("fhReinsTreatyNo","合约编码","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhReinsReinsCode","再保人编码","VARCHAR2(10)",false));
addSchemaColumn(new schemaColumn("fhReinsReinsName","再保人名称","VARCHAR2(40)",true));
addSchemaColumn(new schemaColumn("fhReinsShareRate","接受份额","NUMBER(9,6)",true));
addSchemaColumn(new schemaColumn("fhReinsBrokerFlag","属性","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhReinsFlag","Flag","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhTreatyTreatyNo","合约编码","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhTreatyExTreatyNo","被续转的合约编码","VARCHAR2(8)",true));
addSchemaColumn(new schemaColumn("fhTreatyOptType","OptType","VARCHAR2(2)",true));
addSchemaColumn(new schemaColumn("fhTreatyRefNo","合约简称","VARCHAR2(60)",false));
addSchemaColumn(new schemaColumn("fhTreatyTreatyName","合约全称","VARCHAR2(120)",true));
addSchemaColumn(new schemaColumn("fhTreatyTreatyEName","合约英文描述","VARCHAR2(255)",true));
addSchemaColumn(new schemaColumn("fhTreatyCleanMode","结清方式","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhTreatyReckonDate","核算年度","NUMBER(8)",true));
addSchemaColumn(new schemaColumn("fhTreatyCloseMode","结清方式转换","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhTreatyCloseDate","关闭日期","Date",true));
addSchemaColumn(new schemaColumn("fhTreatyTreatyType","合约类型","VARCHAR2(2)",true));
addSchemaColumn(new schemaColumn("fhTreatyUwYear","业务年度","VARCHAR2(4)",false));
addSchemaColumn(new schemaColumn("fhTreatyStartDate","合约起期","DATE",false));
addSchemaColumn(new schemaColumn("fhTreatyEndDate","合约止期","DATE",true));
addSchemaColumn(new schemaColumn("fhTreatyExtendDate","续转日期","DATE",true));
addSchemaColumn(new schemaColumn("fhTreatyLogoutDate","临时注销通知日期","DATE",true));
addSchemaColumn(new schemaColumn("fhTreatyRePremiumBase","分保费基础","VARCHAR2(2)",false));
addSchemaColumn(new schemaColumn("fhTreatyCalculateBase","计算基础","VARCHAR2(1)",false));
addSchemaColumn(new schemaColumn("fhTreatyReinsureBase","分保基础","VARCHAR2(1)",false));
addSchemaColumn(new schemaColumn("fhTreatyCurrency","币种","VARCHAR2(3)",true));
addSchemaColumn(new schemaColumn("fhTreatyLimitValue","合约限额","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyReinsureRate","分出比例","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyRetentionValue","最大自留额","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyLowerLimitValue","合约下限","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyLargeLossFlag","估损","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhTreatyLargeLossValue","重大赔案通知额","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyControlFlag","共同理赔/理赔控制","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhTreatyCashLossFlag","CashLossFlag","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhTreatyCashLossValue","现金赔款通知额","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyAccDate","出帐日期","NUMBER(8)",true));
addSchemaColumn(new schemaColumn("fhTreatyDueDate","结付日期","NUMBER(8)",true));
addSchemaColumn(new schemaColumn("fhTreatyCreditLetter","信用证标识","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhTreatyCreditLetterNo","信用证号","VARCHAR2(30)",true));
addSchemaColumn(new schemaColumn("fhTreatyLowerCommRate","手续费率下限","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyUpperCommRate","手续费率上限","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyBasePayRate","基准赔付率","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyAdjustRate","赔付率每变动值","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyAdjustCommRate","手续费率调整值","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyXLTreatyNo","超赔合约关联号","VARCHAR2(10)",true));
addSchemaColumn(new schemaColumn("fhTreatyXLTreatyLev","超赔合约的层级关系","NUMBER(8)",true));
addSchemaColumn(new schemaColumn("fhTreatyEGPI","预估保费收入（超赔合约）","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyEstiRePremium","预估分保费","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyXLRate","费率（超赔合约）","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyPayRePremium","预付分保费（超赔合约）","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyPayLowRePremium","最低分保费（超赔合约）","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyResumeTime","责任恢复次数（超赔合约）","NUMBER(8)",true));
addSchemaColumn(new schemaColumn("fhTreatyResumePremium","责任恢复保费（超赔合约）","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyAccPeriod","帐单周期","VARCHAR2(8)",true));
addSchemaColumn(new schemaColumn("fhTreatyCommRate","手续费比例(％)","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyCoinsLimitRate","共保业务限制比例(％)（溢额合约）","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyPartLimitRate","股东业务限制比例(％)（溢额合约）","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyInLimitRate","分入业务限制比例(％)（溢额合约）","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyInShareRate","分入比例(％)（分入合约）","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyInReinsCode","分出人编码（分入合约）","VARCHAR2(10)",true));
addSchemaColumn(new schemaColumn("fhTreatyBroker","经纪人编码（分入合约）","VARCHAR2(10)",true));
addSchemaColumn(new schemaColumn("fhTreatyExchangeFlag","是否是交换合约（分入合约）","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhTreatyExtendFlag","续转标志","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhTreatyStateFlag","合约状态","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhTreatyRemarks","备注","VARCHAR2(255)",true));
addSchemaColumn(new schemaColumn("fhTreatyCreaterCode","创建人","VARCHAR2(10)",true));
addSchemaColumn(new schemaColumn("fhTreatyCreateDate","创建日期","DATE",true));
addSchemaColumn(new schemaColumn("fhTreatyUpdaterCode","修改人","VARCHAR2(10)",true));
addSchemaColumn(new schemaColumn("fhTreatyUpdateDate","最后修改日期","DATE",true));
addSchemaColumn(new schemaColumn("fhTreatyUnderwriteCode","审核人","VARCHAR2(10)",true));
addSchemaColumn(new schemaColumn("fhTreatyUnderwriteEndDate","审核日期","DATE",true));
addSchemaColumn(new schemaColumn("fhTreatyFlag","标志（备用）","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhFinalReinsTreatyNo","TreatyNo","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhFinalReinsReinsCode","再保人编码","VARCHAR2(10)",false));
addSchemaColumn(new schemaColumn("fhFinalReinsReinsName","再保人名称","VARCHAR2(40)",true));
addSchemaColumn(new schemaColumn("fhFinalReinsFReinsCode","最终接受人编码","VARCHAR2(10)",false));
addSchemaColumn(new schemaColumn("fhFinalReinsFReinsName","最终接受人名称","VARCHAR2(40)",true));
addSchemaColumn(new schemaColumn("fhFinalReinsShareRate","接受份额","NUMBER(9,6)",true));
addSchemaColumn(new schemaColumn("fhFinalReinsFlag","Flag","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhSectionTreatyNo","TreatyNo","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhSectionSectionNo","分项编号","VARCHAR2(1)",false));
addSchemaColumn(new schemaColumn("fhSectionClassCode","ClassCode","VARCHAR2(3)",true));
addSchemaColumn(new schemaColumn("fhSectionSectionCDesc","SectionCDesc","VARCHAR2(120)",true));
addSchemaColumn(new schemaColumn("fhSectionSectionEDesc","SectionEDesc","VARCHAR2(255)",true));
addSchemaColumn(new schemaColumn("fhSectionCurrency","Currency","VARCHAR2(3)",true));
addSchemaColumn(new schemaColumn("fhSectionCurrencyName","CurrencyName","VARCHAR2(30)",true));
addSchemaColumn(new schemaColumn("fhSectionRetentionValue","RetentionValue","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhSectionReinsureRate","ReinsureRate","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhSectionLines","Lines","NUMBER(8)",true));
addSchemaColumn(new schemaColumn("fhSectionLimitValue","LimitValue","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhSectionLowerLimitValue","LowerLimitValue","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhSectionCommFlag","CommFlag","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhSectionProCommFlag","ProCommFlag","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhSectionFlag","Flag","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhSectionReinsTreatyNo","TreatyNo","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhSectionReinsSectionNo","SectionNo","VARCHAR2(1)",false));
addSchemaColumn(new schemaColumn("fhSectionReinsReinsCode","ReinsCode","VARCHAR2(10)",false));
addSchemaColumn(new schemaColumn("fhSectionReinsReinsName","ReinsName","VARCHAR2(40)",true));
addSchemaColumn(new schemaColumn("fhSectionReinsShareRate","ShareRate","NUMBER(9,6)",true));
addSchemaColumn(new schemaColumn("fhSectionReinsCommRate","CommRate","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhSectionReinsProCommRate","ProCommRate","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhSectionReinsBelongType","BelongType","VARCHAR2(2)",false));
addSchemaColumn(new schemaColumn("fhSectionReinsFlag","Flag","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhRiskTreatyNo","合约编码","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhRiskSectionNo","合约分项编码","VARCHAR2(1)",false));
addSchemaColumn(new schemaColumn("fhRiskRiskCode","险种代码","VARCHAR2(4)",false));
addSchemaColumn(new schemaColumn("fhRiskFlag","Flag","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhExItemKindTreatyNo","合约编码","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhExItemKindSectionNo","合约分项编码","VARCHAR2(1)",false));
addSchemaColumn(new schemaColumn("fhExItemKindRiskCode","险种","VARCHAR2(4)",false));
addSchemaColumn(new schemaColumn("fhExItemKindItemKind","标的类型","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhExItemKindItemKindDesc","标的类型描述","VARCHAR2 (120)",true));
addSchemaColumn(new schemaColumn("fhExItemKindFlag","Flag","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhInterestTreatyNo","TreatyNo","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhInterestCurrency","Currency","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhInterestAccPeriod","AccPeriod","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhInterestRate","Rate","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhInterestFlag","Flag","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhItemTreatyNo","TreatyNo","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhItemItemNo","ItemNo","VARCHAR2(2)",false));
addSchemaColumn(new schemaColumn("fhItemItemMode","ItemMode","VARCHAR2(2)",true));
addSchemaColumn(new schemaColumn("fhItemCleanMode","CleanMode","VARCHAR2(2)",true));
addSchemaColumn(new schemaColumn("fhItemItemName","ItemName","VARCHAR2(120)",true));
addSchemaColumn(new schemaColumn("fhItemItemRate","ItemRate","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhItemManageRate","ManageRate","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhItemCalStartDate","CalStartDate","NUMBER(8)",true));
addSchemaColumn(new schemaColumn("fhItemBelongType","BelongType","VARCHAR2(2)",false));
addSchemaColumn(new schemaColumn("fhItemRemarks","Remarks","VARCHAR2(255)",true));
addSchemaColumn(new schemaColumn("fhItemFlag","Flag","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhMaterialTreatyNo","TreatyNo","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhMaterialSerialNo","SerialNo","NUMBER(8)",false));
addSchemaColumn(new schemaColumn("fhMaterialFileDesc","FileDesc","VARCHAR2(255)",true));
addSchemaColumn(new schemaColumn("fhMaterialSysFileName","SysFileName","VARCHAR2(30)",true));
addSchemaColumn(new schemaColumn("fhMaterialFileName","FileName","VARCHAR2(50)",true));
addSchemaColumn(new schemaColumn("fhMaterialFilePath","FilePath","VARCHAR2(200)",true));
addSchemaColumn(new schemaColumn("fhMaterialFileType","FileType","VARCHAR2(4)",true));
addSchemaColumn(new schemaColumn("fhMaterialOperatorCode","OperatorCode","VARCHAR2(10)",true));
addSchemaColumn(new schemaColumn("fhMaterialOperateDate","OperateDate","DATE",true));
addSchemaColumn(new schemaColumn("fhMaterialFlag","Flag","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fhPriorityUwYear","年度","VARCHAR2(4)",false));
addSchemaColumn(new schemaColumn("fhPriorityTreatyNo","合约编码","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhPriorityTreatyName","合约全称","VARCHAR2(120)",true));
addSchemaColumn(new schemaColumn("fhPriorityPriorityNo","顺序号","NUMBER(8)",false));
addSchemaColumn(new schemaColumn("fhPriorityFlag","Flag","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhCommRateTreatyNo","TreatyNo","VARCHAR2(8)",false));
//addSchemaColumn(new schemaColumn("fhCommRateSerialNo","SerialNo","NUMBER(8)",false));
addSchemaColumn(new schemaColumn("fhCommRateLowPaidRate","下限","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhCommRateUpperPaidRate","上限","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhCommRateCommRate","CommRate","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhCommRateFlag","Flag","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhStatiTypeTreatyNo","TreatyNo","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhStatiTypeRiskCode","险种编码","VARCHAR2(4)",false));
addSchemaColumn(new schemaColumn("fhStatiTypeKindCode","险别编码","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhStatiTypeBelongType","BelongType","VARCHAR2(2)",false));
addSchemaColumn(new schemaColumn("fhStatiTypeFlag","Flag","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhPaymentTreatyNo","TreatyNo","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhPaymentRepolicyNo","RepolicyNo","VARCHAR2(22)",false));
addSchemaColumn(new schemaColumn("fhPaymentPayCode","PayCode","VARCHAR2(10)",false));
addSchemaColumn(new schemaColumn("fhPaymentPayName","PayName","VARCHAR2(40)",true));
addSchemaColumn(new schemaColumn("fhPaymentCurrency","Currency","VARCHAR2(3)",true));
addSchemaColumn(new schemaColumn("fhPaymentPayPremium","PayPremium","NUMBER(12,2)",true));
addSchemaColumn(new schemaColumn("fhPaymentRemarks","Remarks","VARCHAR2(40)",true));
addSchemaColumn(new schemaColumn("fhPaymentFlag","Flag","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fhRetenCollateUwYear","业务年度","VARCHAR2(4)",false));
addSchemaColumn(new schemaColumn("fhRetenCollateRiskCode","险种","VARCHAR2(4)",false));
addSchemaColumn(new schemaColumn("fhRetenCollateRiskLevel","风险等级","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhRetenCollateRiskClass","风险类别","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhRetenCollateGrade","评分级别","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhRetenCollateRetenFlag","自留标识","VARCHAR2(1)",false));
addSchemaColumn(new schemaColumn("fhRetenCollateRiskLevelDesc","风险等级描述","VARCHAR2(255)",true));
addSchemaColumn(new schemaColumn("fhRetenCollateLastUwYear","LastUwYear","VARCHAR2(4)",true));
addSchemaColumn(new schemaColumn("fhRetenCollateLastRiskLevel","LastRiskLevel","VARCHAR2(3)",true));
addSchemaColumn(new schemaColumn("fhRetenCollateLastRiskClass","LastRiskClass","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhRetenCollateLastGrade","LastGrade","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhRetenCollateLastRetenFlag","LastRetenFlag","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhRetenCollateLastRiskLevelDesc","LastRiskLevelDesc","VARCHAR2(255)",true));
addSchemaColumn(new schemaColumn("fhRetenCollateRemarks","Remarks","VARCHAR2(255)",true));
addSchemaColumn(new schemaColumn("fhRetenCollateFlag","Flag","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fhRetenUwYear","业务年度","VARCHAR2(4)",false));
addSchemaColumn(new schemaColumn("fhRetenRiskCode","险种","VARCHAR2(4)",false));
addSchemaColumn(new schemaColumn("fhRetenRiskLevel","风险等级","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhRetenRiskLevelDesc","风险等级描述","VARCHAR2(255)",false));
addSchemaColumn(new schemaColumn("fhRetenRiskClass","风险类别","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhRetenRiskClassDesc","风险类别描述","VARCHAR2(255)",true));
addSchemaColumn(new schemaColumn("fhRetenGrade","评分级别","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhRetenCurrency","币种","VARCHAR2(3)",true));
addSchemaColumn(new schemaColumn("fhRetenRetentionValue","自留额","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhRetenStartDate","起始日期","Date",true));
addSchemaColumn(new schemaColumn("fhRetenEndDate","终止日期","Date",true));
addSchemaColumn(new schemaColumn("fhRetenRemarks","Remarks","VARCHAR2(255)",true));
addSchemaColumn(new schemaColumn("fhRetenRetenFlag","自留标识","VARCHAR2(1)",false));
addSchemaColumn(new schemaColumn("fhRetenFlag","Flag","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhExchRateTreatyNo","TreatyNo","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhExchRateExchDate","ExchDate","Date",false));
addSchemaColumn(new schemaColumn("fhExchRateBase","Base","NUMBER(8)",true));
addSchemaColumn(new schemaColumn("fhExchRateBaseCurrency","BaseCurrency","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhExchRateExchCurrency","ExchCurrency","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhExchRateExchRate","ExchRate","NUMBER(10,6)",true));
addSchemaColumn(new schemaColumn("fhExchRateValidStatus","ValidStatus","VARCHAR2(1)",false));
addSchemaColumn(new schemaColumn("fhExchRateFlag","Flag","VARCHAR2(2)",true));