/**

 * ����ZBWEB��׼���ݶ����ļ�,����༭���ļ�<br>

 * ������ 2004-08-13 17:18:42.589<br>

 * JToolpad(1.2.13) Vendor:zhouxianli@sinosoft.com.cn

 */

addSchemaColumn(new schemaColumn("fciRetotRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciRetotYourPolicyNo","�Է�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciRetotSCurrency","����","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fciRetotAmount","���ս��","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fciRetotPremium","����","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fciRetotExchRate","�һ���","NUMBER(16,10)",false));

addSchemaColumn(new schemaColumn("fciRetotTCurrency","�۱�","VARCHAR2(3)",true));

//addSchemaColumn(new schemaColumn("fciRetotAmountEx","����(�ۺ�)","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fciRetotPremiumEx","����(�ۺ�)","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fciRetotFlag","��־","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fciRetotRiskCode","���ִ���","VARCHAR2(3)",false));



addSchemaColumn(new schemaColumn("fciRepolicyRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciRepolicyYourRefNo","�Է��ֱ�ҵ���","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciRepolicyYourPolicyNo","�Է�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciRepolicyClassCode","�������","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fciRepolicyRiskCode","���ִ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fciRepolicyReinsCode","�ֳ���˾����","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fciRepolicyReinsName","�ֳ���˾����","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fciRepolicyBrokerCode","�����˴���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fciRepolicyBrokerName","����������","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fciRepolicyUwYear","ҵ�����","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fciRepolicyInsuredName","��������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fciRepolicyPolicyType","����/���ε�","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fciRepolicyConveyName","���乤������","VARCHAR2(40)",true));

//addSchemaColumn(new schemaColumn("fciRepolicyStartDate","������","DATE",false));

//addSchemaColumn(new schemaColumn("fciRepolicyEndDate","�ձ�����","DATE",true));

addSchemaColumn(new schemaColumn("fciRepolicyCurrency","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fciRepolicyAmount","�ܱ���","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fciRepolicyPremium","�ܱ���","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fciRepolicyReinsShare","�ֳ���˾��ռ�ݶ�","NUMBER(8,4)",true));

addSchemaColumn(new schemaColumn("fciRepolicySelfShare","��˾��ռ�ݶ�","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fciRepolicyReamount","��˾���ܱ���","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fciRepolicyRepremium","��˾���ܱ���","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fciRepolicyCommission","�����ѱ���","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fciRepolicyTax","˰��ռ����","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fciRepolicyOther","����������ռ����","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fciRepolicyDeductDesc","��������","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fciRepolicyEndorseTimes","���Ĵ���","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fciRepolicyClaimTimes","��������","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fciRepolicyComCode","��������","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fciRepolicyMakeCom","��������","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fciRepolicyHandlerCode","�����˴���","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fciRepolicyApproverCode","�����˴���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fciRepolicyUnderWriteFlag","�˱���־","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fciRepolicyUnderWriteCode","���պ˱��˴���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fciRepolicyUnderWriteName","���պ˱�������","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fciRepolicyUnderWriteEndDate","�˱�����","DATE",true));

addSchemaColumn(new schemaColumn("fciRepolicyOperatorCode","����Ա����","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fciRepolicyInputDate","��������","DATE",false));

addSchemaColumn(new schemaColumn("fciRepolicyInputTime","����ʱ��","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fciRepolicyRemarks","��ע","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fciRepolicyAccFlag","�Ƿ�����ʵ�","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fciRepolicyFlag","��־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoRetotRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoRetotNoticeNo","�ֱ�֪ͨ��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoRetotPolicyNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoRetotRiskCode","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fcoRetotSCurrency","����","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fcoRetotAmount","���ս��","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoRetotPremium","ë����","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoRetotExchRate","�һ���","NUMBER(16,10)",true));

addSchemaColumn(new schemaColumn("fcoRetotTCurrency","�۱�","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fcoRetotAmountEx","����(�ۺ�)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoRetotPremiumEx","ë����(�ۺ�)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fcoRetotFlag","���ñ�־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoRepolicyRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoRepolicyPolicyNo","��������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoRepolicyNoticeNo","�ֱ�֪ͨ��","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyClassCode","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyRiskCode","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyComCode","ҵ�������˾","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyComName","��˾����","VARCHAR(40)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyUwYear","ҵ�����","VARCHAR2(4)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyReportDate","ͳ������","DATE",true));

addSchemaColumn(new schemaColumn("fcoRepolicyInsuredName","��������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyPeriodFlag","������������","VARCHAR2(1)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyStartDate","������","DATE",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyEndDate","�ձ�����","DATE",true));

addSchemaColumn(new schemaColumn("fcoRepolicyItemName","������Ŀ","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyCurrency","����","VARCHAR2(3)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyAmount","�ܱ���","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyPremium","ë����","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyBaseRate","��˾��ռ����","NUMBER(9,6)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyBaseAmount","��˾��ռ����","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyShareRate","�ֳ��ݶ�","NUMBER(9,6)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyReamount","�ֳ�����","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyRepremium","ë�ֱ���","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyBrokerageRate","ֱ�Ӿ��ͷ���","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyBrokerage","ֱ�Ӿ��ͷ�","NUMBER(10,2)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyNetPremium","������","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyTaxRate","��˰����","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyPayTimes","���Ѵ���","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyEndorTimes","���Ĵ���","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyBusinessFlag","ҵ������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyReinsType","�ֱ���ʽ","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyRemarks","��ע","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyMakeComCode","�Ƶ����Ŵ���","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyCreaterCode","������","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyCreateDTime","����ʱ��","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyUpdaterCode","�޸���","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fcoRepolicyUpdateDTime","����޸�ʱ��","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("fcoRepolicySendFlag","�·���־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoRepolicyFlag","��־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoShareRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoShareClassCode","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fcoShareSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcoShareReinsMode","�ֱ���ʽ","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fcoShareTreatyNo","��ͬ���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoShareRefNo","��ͬҵ���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoShareReinsType","�ֱ�����������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoShareReinsNo","�ֱ����������","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcoShareReinsCode","�����˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoShareReinsName","�����˼��","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fcoShareFReinsCode","�����ٱ��˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoShareFReinsName","�����ٱ��˼��","VARCHAR2(100)",true));

//addSchemaColumn(new schemaColumn("fcoShareShareRate","�ݶ�","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fcoShareCurrency","����","VARCHAR2(3)",true));

//addSchemaColumn(new schemaColumn("fcoShareAmount","�ֳ�����","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoSharePremium","�ֳ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fcoShareCurrencyFlag","�ֱ���������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoSharePayTimes","���Ѵ���","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fcoShareRemarks","��ע","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fcoShareFlag","�����ֶ�","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoSpecialNoticeNo","�ֱ�֪ͨ���","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoSpecialPolicyNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoSpecialReinsNo","���������","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcoSpecialReinsCode","�����˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoSpecialReinsName","�����˼��","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fcoSpecialFReinsCode","���ս����˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoSpecialFReinsName","���ս����˼��","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fcoSpecialPayCode","�Ḷ�˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoSpecialPayName","�Ḷ�˼��","VARCHAR2(40)",true));

//addSchemaColumn(new schemaColumn("fcoSpecialShareRate","�ֱ��ݶ�","NUMBER(9,6)",true));

//addSchemaColumn(new schemaColumn("fcoSpecialCommRate","�����ѱ���","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fcoSpecialTaxRate","��˰����","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fcoSpecialOthRate","�������ñ���","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fcoSpecialNetFlag","�Ծ����Ѽ����","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoSpecialFlag","���ñ�־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoPolicyNoticeNo","�ֱ�֪ͨ���","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoPolicyPolicyNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoPolicyMainPolicyNo","��������","VARCHAR2(25)",false));

addSchemaColumn(new schemaColumn("fcoPolicyContractNo","��ͬ��","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fcoPolicyClassCode","�������","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fcoPolicyRiskCode","���ִ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fcoPolicyComCode","ҵ�������˾����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fcoPolicyComName","��˾����","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fcoPolicyUwYear","ҵ�����","VARCHAR2(4)",false));

//addSchemaColumn(new schemaColumn("fcoPolicyReportDate","�����","DATE",false));

addSchemaColumn(new schemaColumn("fcoPolicyInsuredName","��������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fcoPolicyRegionCode","��������","VARCHAR2(6)",true));

//addSchemaColumn(new schemaColumn("fcoPolicyStartDate","������","DATE",false));

//addSchemaColumn(new schemaColumn("fcoPolicyEndDate","�ձ�����","DATE",true));

//addSchemaColumn(new schemaColumn("fcoPolicyStartFixDate","��ʼ����","DATE",true));

//addSchemaColumn(new schemaColumn("fcoPolicyEndFixDate","��ֹ����","DATE",true));

//addSchemaColumn(new schemaColumn("fcoPolicyStartAddDate","�ӱ���֤�ڿ�ʼ����","DATE",true));

//addSchemaColumn(new schemaColumn("fcoPolicyEndAddDate","�ӱ���֤����ֹ����","DATE",true));

addSchemaColumn(new schemaColumn("fcoPolicyBusinessNature","Ӫҵ���ʴ���","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fcoPolicyProductNature","��Ʒ���ʴ���","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fcoPolicyRegion","˾����Ͻ","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fcoPolicyRetroActive","׷����˵��","DATE",true));

addSchemaColumn(new schemaColumn("fcoPolicyRegionFlag","��������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoPolicyClaimFlag","�������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoPolicyCrestaZone","CrestaZone","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fcoPolicyConstructStru","�����ṹ","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fcoPolicyConstructAge","��������","NUMBER(4,1)",true));

addSchemaColumn(new schemaColumn("fcoPolicyQuakeGrade","���𼶱�","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fcoPolicyItemName","������Ŀ","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fcoPolicyItemAddr","������ڵ�","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fcoPolicyTransMode","���䷽ʽ","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fcoPolicyConveyCode","���乤�ߴ���","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fcoPolicyConveyName","���乤������","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fcoPolicyConveyType","���乤������","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fcoPolicyConveyFlag","����","VARCHAR2(15)",true));

addSchemaColumn(new schemaColumn("fcoPolicyMakeYear","�������","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fcoPolicyDistance","����","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fcoPolicyConveyGrade","����","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fcoPolicyTonnage","�ܶ�","NUMBER(9,2)",true));

//addSchemaColumn(new schemaColumn("fcoPolicyLoadTon","���ض�","NUMBER(9,2)",true));

addSchemaColumn(new schemaColumn("fcoPolicyCurrency","����","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fcoPolicyAmount","�ܱ���","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fcoPolicySumAccumulate","�ۼ������޶�","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoPolicySumSale","�����۶�","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fcoPolicyRate","����","NUMBER(8,4)",true));

//addSchemaColumn(new schemaColumn("fcoPolicyPremium","ë����","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fcoPolicyBrokerageRate","ֱ�Ӿ��ͷѱ���","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fcoPolicyBrokerage","ֱ�Ӿ��ͷ�","NUMBER(10,2)",true));

//addSchemaColumn(new schemaColumn("fcoPolicyNetPremium","������","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fcoPolicyRiskKind","�������","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fcoPolicyNopayDesc","����˵��","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fcoPolicyPayTimes","���Ѵ���","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fcoPolicyEndorTimes","���Ĵ���","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fcoPolicyBusinessFlag","ҵ������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoPolicyRemarks","��ע","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fcoPolicyMakeComCode","�Ƶ����Ŵ���","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fcoPolicyCreaterCode","������","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fcoPolicyCreateDTime","����ʱ��","VARCHAR2(19)",false));

addSchemaColumn(new schemaColumn("fcoPolicyUpdaterCode","�޸���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoPolicyUpdateDTime","����޸�ʱ��","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("fcoPolicyFlag","��־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoTotNoticeNo","�ֱ�֪ͨ���","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoTotPolicyNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoTotRiskCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fcoTotSCurrency","����","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fcoTotAmount","���ս��","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fcoTotPremium","����","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fcoTotExchRate","�һ���","NUMBER(16,10)",false));

addSchemaColumn(new schemaColumn("fcoTotTCurrency","�۱�","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fcoTotAmountEx","����(�ۺ�)","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fcoTotPremiumEx","����(�ۺ�)","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fcoTotFlag","���ñ�־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fliRetotRepayNo","���ⰸ��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliRetotRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliRetotYourPayNo","�Է�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliRetotRiskCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliRetotSCurrency","ԭ��","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliRetotPayValue","������ʧ���+����","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fliRetotExchRate","�һ���","NUMBER(16,10)",false));

addSchemaColumn(new schemaColumn("fliRetotTCurrency","�۱�","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliRetotPayValueEx","������ʧ���(�ۺ�)","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fliRetotFlag","��־","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fliRePayRepayNo","���ⰸ��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliRePayRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliRePayYourPayNo","�Է�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliRePayYourPolicyNo","�Է�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliRePayYourRefNo","�Է��ֱ�ҵ���","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliRePayClassCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliRePayRiskCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliRePayReinsCode","�ֳ���˾����","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fliRePayReinsName","�ֳ���˾����","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fliRePayBrokerCode","�����˴���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fliRePayBrokerName","����������","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fliRePayUwYear","ҵ�����","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fliRePayInsuredName","������������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fliRePayPolicyType","����/���ε�","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fliRePayConveyName","���乤������","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fliRePayStartDate","������","DATE",false));

addSchemaColumn(new schemaColumn("fliRePayEndDate","�ձ�����","DATE",true));

addSchemaColumn(new schemaColumn("fliRePayDamageDate","��������","DATE",false));

addSchemaColumn(new schemaColumn("fliRePayDamageCode","����ԭ�����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fliRePayDamageReason","����ԭ��","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fliRePayCurrency","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliRePaySumClaim","������","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliRePaySumPay","���������","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliRePaySumOsloss","����δ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliRePayReinsShare","�ֳ���˾��ռ�ݶ�","NUMBER(8,4)",true));

addSchemaColumn(new schemaColumn("fliRePaySelfShare","��˾��ռ�ݶ�","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fliRePaySumRepay","��˾�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliRePaySumReosloss","��˾δ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliRePayEndCaseFlag","�᰸���־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fliRePayComCode","��������","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fliRePayMakeCom","��������","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fliRePayHandlerCode","�����˴���","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fliRePayApproverCode","�����˴���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fliRePayUnderWriteFlag","�˱���־","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fliRePayUnderWriteCode","���պ˱��˴���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fliRePayUnderWriteName","���պ˱�������","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fliRePayUnderWriteEndDate","�˱�����","DATE",true));

addSchemaColumn(new schemaColumn("fliRePayOperatorCode","����Ա����","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fliRePayInputDate","��������","DATE",false));

addSchemaColumn(new schemaColumn("fliRePayInputTime","����ʱ��","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fliRePayRemarks","��ע","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fliRePayAccFlag","�Ƿ�����ʵ�","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fliRePayFlag","����","VARCHAR2(10)",true));



//addSchemaColumn(new schemaColumn("floPayClaimNo","�ⰸ֪ͨ��","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floPayPayNo","������","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floPayCompensateNo","���������","VARCHAR2(22)",true));

//addSchemaColumn(new schemaColumn("floPayNoticeNo","�ֱ�֪ͨ��","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floPayPolicyNo","������","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floPayClassCode","����","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("floPayRiskCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floPayComCode","ҵ�������˾����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("floPayComName","��˾����","VARCHAR(40)",true));

addSchemaColumn(new schemaColumn("floPayUwYear","ҵ�����","VARCHAR2(4)",false));

//addSchemaColumn(new schemaColumn("floPayReportDate","�����","DATE",false));

addSchemaColumn(new schemaColumn("floPayInsuredName","��������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("floPayItemName","�������","VARCHAR2(255)",true));

//addSchemaColumn(new schemaColumn("floPayStartDate","������","DATE",false));

//addSchemaColumn(new schemaColumn("floPayEndDate","�ձ�����","DATE",true));

//addSchemaColumn(new schemaColumn("floPayDamageDate","��������","DATE",false));

addSchemaColumn(new schemaColumn("floPayDamageCode","����ԭ�����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floPayDamageReason","����ԭ��(ժҪ)","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("floPayCurrency","����","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("floPayAmount","�ܱ���","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("floPaySumClaim","������","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("floPayOutStanding","δ��������ֵ��","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("floPaySumPay","������������ۼƽ��","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("floPaySumFee","���η�����ʧ�ۼƽ��","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("floPayPayDate","�⸶����","DATE",true));

//addSchemaColumn(new schemaColumn("floPayEndCaseFlag","�᰸���־","VARCHAR2(1)",true));

//addSchemaColumn(new schemaColumn("floPayEndCaseDate","�᰸����","DATE",true));

addSchemaColumn(new schemaColumn("floPayRemarks","��ע","VARCHAR2(255)",true));

//addSchemaColumn(new schemaColumn("floPayMakeComCode","�Ƶ���˾����","VARCHAR2(8)",false));

//addSchemaColumn(new schemaColumn("floPayCreaterCode","������","VARCHAR2(10)",false));

//addSchemaColumn(new schemaColumn("floPayCreateDTime","����ʱ��","VARCHAR2(19)",true));

//addSchemaColumn(new schemaColumn("floPayUpdaterCode","�޸���","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("floPayUpdateDTime","����޸�ʱ��","VARCHAR2(19)",true));

//addSchemaColumn(new schemaColumn("floPayFlag","����","VARCHAR2(10)",true));



//addSchemaColumn(new schemaColumn("floPersonLossClaimNo","�ⰸ֪ͨ��","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floPersonLossPayNo","������","VARCHAR2(22)",true));

//addSchemaColumn(new schemaColumn("floPersonLossCompensateNo","���������","VARCHAR2(22)",true));

//addSchemaColumn(new schemaColumn("floPersonLossPolicyNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("floPersonLossSerialNo","���","NUMBER(15)",false));

//addSchemaColumn(new schemaColumn("floPersonLossRiskCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floPersonLossPersonNo","��Ա���","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("floPersonLossPersonName","��Ա����","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("floPersonLossKindCode","�б��ձ����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floPersonLossLiabCode","���η������","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("floPersonLossLiabName","���η�������","VARCHAR2(120)",true));

addSchemaColumn(new schemaColumn("floPersonLossJobCode","��Ա���ִ���","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("floPersonLossJobName","��Ա��������","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("floPersonLossLiabDetailCode","������ϸ�������","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("floPersonLossLiabDetailName","������ϸ��������","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("floPersonLossItemAddress","�����ĵ�ַ","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("floPersonLossLossQuantity","����","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("floPersonLossUnit","������λ","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("floPersonLossUnitAmount","��λ�⳥�޶�","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floPersonLossCurrency","ʵ��ұ�","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floPersonLossSumRealPay","ʵ����","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("floPersonLossFlag","���ñ�־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("floRepayRepayNo","���ⰸ��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("floRepayMainClaimNo","���ⰸ��","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floRepayClaimNo","�ⰸ֪ͨ��","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floRepayPayNo","������","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floRepayRepolicyNo","�ֱ�����","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floRepayPolicyNo","������","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floRepayNoticeNo","�ֱ�֪ͨ��","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floRepayClassCode","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floRepayRiskCode","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floRepayComCode","ҵ�������˾����","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("floRepayComName","��˾����","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("floRepayUwYear","ҵ�����","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("floRepayReportDate","ͳ������","DATE",true));

addSchemaColumn(new schemaColumn("floRepayInsuredName","��������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("floRepayStartDate","������","DATE",true));

addSchemaColumn(new schemaColumn("floRepayEndDate","�ձ�����","DATE",true));

addSchemaColumn(new schemaColumn("floRepayItemName","������Ŀ","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("floRepayDamageDate","��������","DATE",true));

addSchemaColumn(new schemaColumn("floRepayDamageCode","����ԭ�����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floRepayDamageReason","����ԭ��","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("floRepayCurrency","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floRepayAmount","�ܱ���","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floRepayOutStanding","δ��������ֵ��","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floRepaySumPay","�ۼ�������ʧ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floRepaySumFee","�ۼƷ��úϼ�","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floRepayEndCaseFlag","�᰸���־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("floRepayEndCaseDate","�᰸����","DATE",true));

addSchemaColumn(new schemaColumn("floRepayBusinessFlag","ҵ������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("floRepayReinsType","�ֱ���ʽ","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("floRepayRemarks","��ע","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("floRepayMakeComCode","�Ƶ����Ŵ���","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("floRepayCreaterCode","������","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("floRepayCreateDTime","����ʱ��","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("floRepayUpdaterCode","�޸���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("floRepayUpdateDTime","����޸�ʱ��","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("floRepaySendFlag","�·���־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("floRepayFlag","����","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("floReTotRepayNo","���ⰸ��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("floReTotClaimNo","�ⰸ֪ͨ��","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floReTotPayNo","�ⰸ��","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floReTotRepolicyNo","�ֱ�����","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floReTotPolicyNo","������","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floReTotRiskCode","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floReTotSCurrency","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floReTotPayValue","������ʧ���+����","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("floReTotExchRate","�һ���","NUMBER(16,10)",false));

addSchemaColumn(new schemaColumn("floReTotTCurrency","�۱�","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floReTotPayValueEx","�����(�ۺ�)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floReTotRemarks","��ע","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("floReTotFlag","��־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("floShareRepayNo","���ⰸ��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("floShareClaimNo","�ⰸ֪ͨ��","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floSharePayNo","�ⰸ��","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floShareRepolicyNo","�ֱ�����","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floSharePolicyNo","������","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floShareClassCode","�������","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floShareSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("floSharePayType","�������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("floShareItemCode","��Ŀ����","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("floShareReinsMode","�ֱ���ʽ","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floShareTreatyNo","��ͬ���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("floShareRefNo","��ͬҵ���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("floShareReinsType","�ֱ�����������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("floShareReinsNo","�ֱ����������","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("floShareReinsCode","�ֱ������˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("floShareReinsName","�ֱ�����������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("floShareFReinsCode","�����ٱ��˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("floShareFReinsName","�����ٱ��˼��","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("floShareShareRate","��̯����","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("floShareTCurrency","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floSharePayValue","��̯���","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floShareExchRate","�һ���","NUMBER(16,10)",true));

addSchemaColumn(new schemaColumn("floShareSCurrency","�⸶����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floShareRemarks","��ע","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("floShareFlag","���ñ�־","VARCHAR2(10)",true));



//addSchemaColumn(new schemaColumn("floTotClaimNo","�ⰸ֪ͨ��","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floTotPayNo","������","VARCHAR2(22)",true));

//addSchemaColumn(new schemaColumn("floTotPolicyNo","������","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floTotRiskCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floTotSCurrency","ԭ��","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floTotPayValue","������ʧ���+����","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("floTotExchRate","�һ���","NUMBER(16,10)",false));

addSchemaColumn(new schemaColumn("floTotTCurrency","�۱�","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floTotPayValueEx","������ʧ���+����(�ۺ�)","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("floTotRemarks","��ע","VARCHAR2(255)",true));

//addSchemaColumn(new schemaColumn("floTotFlag","��־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fpiReitemReendorNo","�����������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReitemRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReitemYourEndorNo","�Է�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReitemYourPolicyNo","�Է��������ĵı�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReitemSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpiReitemRiskCode","���ִ���","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpiReitemKindCode","�ձ����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpiReitemItemCode","��Ĵ���","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fpiReitemItemName","�������","VARCHAR2(120)",true));

addSchemaColumn(new schemaColumn("fpiReitemItemAddr","��ĵ�ַ","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("fpiReitemCurrency","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fpiReitemAmount","����/�⳥�޶�","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReitemRate","����","NUMBER(8,4)",true));

addSchemaColumn(new schemaColumn("fpiReitemPremium","����","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReitemAmountChg","����仯��","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpiReitemPremiumChg","���ѱ仯��","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpiReitemCalculateFlag","�Ƿ���㱣���־","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fpiReitemFlag","��־","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fpiReendorReendorNo","�����������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReendorRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReendorYourEndorRefNo","�Է�����ҵ���","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReendorYourRefNo","�Է��ֱ�ҵ���","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReendorYourEndorNo","�Է�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReendorYourPolicyNo","�Է��������ĵı�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReendorClassCode","�������","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fpiReendorRiskCode","���ִ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fpiReendorReinsCode","�ֳ���˾����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fpiReendorReinsName","�ֳ���˾����","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpiReendorUwYear","ҵ�����","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fpiReendorInsuredName","��������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fpiReendorPolicyType","����/���ε�","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fpiReendorConveyName","���乤������","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpiReendorStartDate","������","DATE",false));

addSchemaColumn(new schemaColumn("fpiReendorEndDate","�ձ�����","DATE",true));

addSchemaColumn(new schemaColumn("fpiReendorEndorType","�������ʹ���","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fpiReendorEndorDesc","������������","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fpiReendorEndorDate","��������","DATE",true));

addSchemaColumn(new schemaColumn("fpiReendorValidDate","��Ч����","DATE",true));

addSchemaColumn(new schemaColumn("fpiReendorEndorseTimes","�������Ĵ���","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fpiReendorCurrency","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fpiReendorAmount","�ܱ���","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReendorPremium","�ܱ���","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReendorReamount","��˾���ܱ���","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReendorRepremium","��˾���ܱ���","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReendorAmountChg","�ܱ���仯��","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReendorPremiumChg","�ܱ��ѱ仯��","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReendorReinsShare","�ֳ���˾��ռ�ݶ�","NUMBER(8,4)",true));

addSchemaColumn(new schemaColumn("fpiReendorSelfShare","��˾��ռ�ݶ�","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpiReendorReamountChg","��˾���ܱ���仯��","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReendorRepremiumChg","��˾���ܱ��ѱ仯��","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiReendorCommission","�����ѱ���","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpiReendorTax","˰��ռ����","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpiReendorOther","����������ռ����","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpiReendorDeductDesc","��������","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpiReendorComCode","��������","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fpiReendorMakeCom","��������","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fpiReendorHandlerCode","�����˴���","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fpiReendorApproverCode","�����˴���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpiReendorUnderWriteFlag","�˱���־","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fpiReendorUnderWriteCode","���պ˱��˴���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpiReendorUnderWriteName","���պ˱�������","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fpiReendorUnderWriteEndDate","�˱�����","DATE",true));

addSchemaColumn(new schemaColumn("fpiReendorOperatorCode","����Ա����","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fpiReendorInputDate","��������","DATE",false));

addSchemaColumn(new schemaColumn("fpiReendorInputTime","����ʱ��","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fpiReendorRemarks","��ע","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpiReendorAccFlag","�Ƿ�����ʵ�","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpiReendorFlag","��־","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpiReendorPostFlag","������Ч��־","VARCHAR2(1)",false));



addSchemaColumn(new schemaColumn("fpiRetotReendorNo","�����������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiRetotRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiRetotYourEndorNo","�Է�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiRetotYourPolicyNo","�Է��������ĵı�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiRetotRiskCode","���ִ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fpiRetotSCurrency","����","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fpiRetotAmount","���ս��","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fpiRetotPremium","����","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpiRetotExchRate","�һ���","NUMBER(16,10)",false));

addSchemaColumn(new schemaColumn("fpiRetotTCurrency","�۱�","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fpiRetotAmountEx","����(�ۺ�)","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fpiRetotPremiumEx","����(�ۺ�)","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fpiRetotAmountChg","����仯�� (ԭ��)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpiRetotPremiumChg","���ѱ仯�� (ԭ��)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpiRetotAmountExChg","����仯�� (�۱�)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpiRetotPremiumExChg","���ѱ仯�� (�۱�)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpiRetotFlag","��־","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fpoEndorEndorNo","������","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("fpoEndorEndorDate","��������","DATE",false));

addSchemaColumn(new schemaColumn("fpoEndorEndorType","�������ʹ���","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("fpoEndorEndorDesc","��������","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fpoEndorNoticeNo","�ֱ�֪ͨ���","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoEndorPolicyNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoEndorMainPolicyNo","��������","VARCHAR2(25)",false));

addSchemaColumn(new schemaColumn("fpoEndorContractNo","��ͬ��","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fpoEndorClassCode","�������","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fpoEndorRiskCode","���ִ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fpoEndorComCode","ҵ�������˾����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fpoEndorComName","��˾����","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpoEndorUwYear","ҵ�����","VARCHAR2(4)",false));

//addSchemaColumn(new schemaColumn("fpoEndorReportDate","�����","DATE",false));

addSchemaColumn(new schemaColumn("fpoEndorInsuredName","��������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fpoEndorRegionCode","��������","VARCHAR2(6)",true));

//addSchemaColumn(new schemaColumn("fpoEndorStartDate","������","DATE",false));

//addSchemaColumn(new schemaColumn("fpoEndorEndDate","�ձ�����","DATE",true));

//addSchemaColumn(new schemaColumn("fpoEndorStartFixDate","��ʼ����","DATE",true));

//addSchemaColumn(new schemaColumn("fpoEndorEndFixDate","��ֹ����","DATE",true));

//addSchemaColumn(new schemaColumn("fpoEndorStartAddDate","�ӱ���֤�ڿ�ʼ����","DATE",true));

//addSchemaColumn(new schemaColumn("fpoEndorEndAddDate","�ӱ���֤����ֹ����","DATE",true));

addSchemaColumn(new schemaColumn("fpoEndorBusinessNature","Ӫҵ���ʴ���","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fpoEndorProductNature","��Ʒ���ʴ���","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fpoEndorRegion","˾����Ͻ","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fpoEndorRetroActive","׷����˵��","DATE",true));

addSchemaColumn(new schemaColumn("fpoEndorRegionFlag","��������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoEndorClaimFlag","�������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoEndorCrestaZone","CrestaZone","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fpoEndorConstructStru","�����ṹ","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fpoEndorConstructAge","��������","NUMBER(4,1)",true));

addSchemaColumn(new schemaColumn("fpoEndorQuakeGrade","���𼶱�","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fpoEndorItemName","������Ŀ","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpoEndorItemAddr","������ڵ�","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpoEndorTransMode","���䷽ʽ","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fpoEndorConveyCode","���乤�ߴ���","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fpoEndorConveyName","���乤������","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpoEndorConveyType","���乤������","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fpoEndorConveyFlag","����","VARCHAR2(15)",true));

addSchemaColumn(new schemaColumn("fpoEndorMakeYear","�������","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fpoEndorDistance","����","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpoEndorConveyGrade","����","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fpoEndorTonnage","�ܶ�","NUMBER(9,2)",true));

//addSchemaColumn(new schemaColumn("fpoEndorLoadTon","���ض�","NUMBER(9,2)",true));

addSchemaColumn(new schemaColumn("fpoEndorCurrency","����","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fpoEndorAmount","�ܱ���","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fpoEndorSumAccumulate","�ۼ������޶�","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoEndorSumSale","�����۶�","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoEndorRate","����","NUMBER(8,4)",true));

//addSchemaColumn(new schemaColumn("fpoEndorPremium","ë����","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fpoEndorBrokerageRate","ֱ�Ӿ��ͷѱ���","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fpoEndorBrokerage","ֱ�Ӿ��ͷ�","NUMBER(10,2)",true));

//addSchemaColumn(new schemaColumn("fpoEndorNetPremium","������","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpoEndorRiskKind","�������","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fpoEndorNopayDesc","����˵��","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpoEndorPayTimes","���Ѵ���","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fpoEndorEndorTimes","���Ĵ���","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fpoEndorBusinessFlag","������������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoEndorRemarks","��ע","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpoEndorMakeComCode","�Ƶ����Ŵ���","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fpoEndorCreaterCode","������","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fpoEndorCreateDTime","����ʱ��","VARCHAR2(19)",false));

addSchemaColumn(new schemaColumn("fpoEndorUpdaterCode","�޸���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoEndorUpdateDTime","����޸�ʱ��","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("fpoEndorFlag","��־","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoEndorAmountChg","����仯��","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoEndorPremiumChg","���ѱ仯��","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoEndorPostFlag","������Ч��־","VARCHAR2(1)",false));



addSchemaColumn(new schemaColumn("fpoItemEndorNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoItemNoticeNo","�ֱ�֪ͨ���","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoItemPolicyNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoItemSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpoItemRiskCode","���ִ���","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoItemKindCode","�ձ����","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fpoItemItemName","�������","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fpoItemItemAddr","��ĵ�ַ","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("fpoItemContractor","�а���","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("fpoItemPostCode","�ʱ�","VARCHAR2(6)",true));

addSchemaColumn(new schemaColumn("fpoItemWellType","�꾮���ʹ���","VARCHAR2(1)",true));

//addSchemaColumn(new schemaColumn("fpoItemDeep","����","NUMBER(8,2)",true));

addSchemaColumn(new schemaColumn("fpoItemCurrency","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fpoItemAmount","����","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpoItemSumAccumulate","�ۼ������޶�","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoItemRate","����","NUMBER(8,4)",true));

addSchemaColumn(new schemaColumn("fpoItemCalculateFlag","�Ƿ���㱣���־","VARCHAR2(1)",false));

//addSchemaColumn(new schemaColumn("fpoItemPremium","����","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpoItemNopay","�����","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpoItemFlag","���ñ�־","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fpoItemAmountChg","����仯��","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoItemPremiumChg","���ѱ仯��","NUMBER(14,2)",true));



addSchemaColumn(new schemaColumn("fpoPlaneEndorNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoPlaneNoticeNo","�ֱ�֪ͨ��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoPlanePolicyNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoPlaneSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpoPlanePlaneNo","�ɻ����","VARCHAR2(16)",false));

addSchemaColumn(new schemaColumn("fpoPlanePlaneType","�ɻ��ͺ�","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoPlaneMakeYear","�������","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fpoPlaneSeatCount","��λ��","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fpoPlaneFlyRange","���з�Χ","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("fpoPlaneRiskCode","���ִ���","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoPlanePassengerFlux","������","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoPlaneGoodsFlux","������","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoPlaneMaxPlaneValue","���ɻ���ֵ","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoPlaneAverageValue","ƽ����ֵ","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoPlaneTowerH","��̨��","NUMBER(7,2)",true));

addSchemaColumn(new schemaColumn("fpoPlaneTowerW","��̨��","NUMBER(7,2)",true));

addSchemaColumn(new schemaColumn("fpoPlaneTowerL","��̨��","NUMBER(7,2)",true));

addSchemaColumn(new schemaColumn("fpoPlanePlaneUsage","�ɻ���;","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fpoPlanePeriodFlag","������������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoPlaneLeaseMode","�ɻ�������ʽ","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fpoPlaneStartDate","������","DATE",true));

addSchemaColumn(new schemaColumn("fpoPlaneEndDate","�ձ�����","DATE",true));

addSchemaColumn(new schemaColumn("fpoPlaneRemarks","ʹ�ñ���������","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpoPlaneRecoverFlag","������־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoPlaneValidFlag","ʧЧ��־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoPlaneFlag","���ı�־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fpoReendorReendorNo","�ֱ�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoReendorEndorNo","������","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fpoReendorEndorDate","��������","DATE",true));

addSchemaColumn(new schemaColumn("fpoReendorEndorType","��������","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fpoReendorEndorDesc","��������","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fpoReendorRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoReendorPolicyNo","��������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoReendorNoticeNo","�ֱ�֪ͨ��","VARCHAR2(22) ",true));

addSchemaColumn(new schemaColumn("fpoReendorClassCode","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoReendorRiskCode","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoReendorComCode","������˾����","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fpoReendorComName","��˾����","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpoReendorUwYear","ҵ�����","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fpoReendorReportDate","ͳ������","DATE",true));

addSchemaColumn(new schemaColumn("fpoReendorInsuredName","��������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fpoReendorPeriodFlag","������������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoReendorStartDate","������","DATE",true));

addSchemaColumn(new schemaColumn("fpoReendorEndDate","�ձ�����","DATE",true));

addSchemaColumn(new schemaColumn("fpoReendorItemName","������Ŀ","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpoReendorCurrency","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoReendorAmount","�ܱ���","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorPremium","ë����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorBaseRate","��˾��ռ����","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoReendorBaseAmount","��˾��ռ����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorBasePremium","��˾��ռ����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorShareRate","�ֳ��ݶ�","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoReendorReamount","�ֳ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorRepremium","ë�ֱ���","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorBrokerageRate","ֱ�Ӿ��ͷ���","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpoReendorBrokerage","ֱ�Ӿ��ͷ�","NUMBER(10,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorNetPremium","������","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorTaxRate","��˰����","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpoReendorPayTimes","���Ѵ���","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fpoReendorEndorTimes","���Ĵ���","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fpoReendorBusinessFlag","ҵ������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoReendorReinsType","�ֱ���ʽ","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoReendorRemarks","��ע","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpoReendorMakeComCode","�Ƶ����Ŵ���","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fpoReendorCreaterCode","������","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoReendorCreateDTime","����ʱ��","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("fpoReendorUpdaterCode","�޸���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoReendorUpdateDTime","����޸�ʱ��","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("fpoReendorSendFlag","�·���־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoReendorFlag","��־","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoReendorAmountChg","����仯�� (�һ���)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorPremiumChg","���ѱ仯�� (�һ���)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoReendorPostFlag","����������(�ݲ�ʹ��)","VARCHAR2(1)",true));



addSchemaColumn(new schemaColumn("fpoRetotReendorNo","�ֱ�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoRetotEndorNo","������","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fpoRetotRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoRetotNoticeNo","�ֱ�֪ͨ��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoRetotPolicyNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoRetotRiskCode","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoRetotSCurrency","����","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fpoRetotAmount","���ս��","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoRetotPremium","ë����","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoRetotExchRate","�һ���","NUMBER(16,10)",true));

addSchemaColumn(new schemaColumn("fpoRetotTCurrency","�۱�","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fpoRetotAmountEx","����(�ۺ�)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoRetotPremiumEx","ë����(�ۺ�)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoRetotFlag","���ñ�־","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fpoRetotAmountChg","����仯�� (ԭ��)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoRetotPremiumChg","���ѱ仯�� (ԭ��)","NUMBER(14,2)",true));



addSchemaColumn(new schemaColumn("fpoShareReendorNo","�ֱ�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoShareRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoShareClassCode","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoShareSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpoShareReinsMode","�ֱ���ʽ","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoShareTreatyNo","��ͬ���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoShareRefNo","��ͬҵ���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoShareReinsType","�ֱ�����������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoShareReinsNo","�ֱ����������","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpoShareReinsCode","�����˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoShareReinsName","�����˼��","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fpoShareFReinsCode","�����ٱ��˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoShareFReinsName","�����ٱ��˼��","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fpoShareShareRate","�ݶ�","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoShareCurrency","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoShareAmount","�ֳ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoSharePremium","�ֳ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoShareCurrencyFlag","�ֱ����㷽ʽ","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoSharePayTimes","���Ѵ���","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fpoShareRemarks","��ע","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpoShareFlag","�����ֶ�","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoShareAmountChg","����仯�� (�һ���)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoSharePremiumChg","���ѱ仯�� (�һ���)","NUMBER(14,2)",true));



addSchemaColumn(new schemaColumn("fpoTotEndorNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoTotNoticeNo","�ֱ�֪ͨ���","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoTotPolicyNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoTotRiskCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fpoTotSCurrency","����","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fpoTotAmount","���ս��","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fpoTotPremium","����","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fpoTotExchRate","�һ���","NUMBER(16,10)",false));

addSchemaColumn(new schemaColumn("fpoTotTCurrency","�۱�","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fpoTotAmountEx","����(�ۺ�)","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fpoTotPremiumEx","����(�ۺ�)","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fpoTotFlag","��־","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fpoTotAmountChg","����仯�� (ԭ��)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoTotPremiumChg","���ѱ仯�� (ԭ��)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoTotAmountExChg","����仯�� (�۱�)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fpoTotPremiumExChg","���ѱ仯�� (�۱�)","NUMBER(14,2)",true));



addSchemaColumn(new schemaColumn("fsoBranchDReCertifyNo","�ֱ�ҵ���","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fsoBranchDSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fsoBranchDCoinsType","����������","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fsoBranchDComCode","�ֱ�ҵ��������˾","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoBranchDPayCode","�Ḷ��˾����","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoBranchDReinsMode","�ֱ���ʽ","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fsoBranchDTreatyNo","��ͬ��","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoBranchDPayTimes","�ڼ��ڼƻ�","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fsoBranchDCurrency","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fsoBranchDPayValue","��/������:����/���","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fsoBranchDOSLoss","δ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fsoBranchDPayDate","Ӧ��/��������","DATE",true));

addSchemaColumn(new schemaColumn("fsoBranchDBelongType","������ͳ������","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("fsoBranchDBusinessFlag","ҵ������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fsoBranchDAccFlag","�����ʵ���","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fsoBranchDAccNo","�����ʵ����","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fsoBranchDAccNoC","�����ʵ����","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fsoBranchDSendFlag","�·���־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fsoBranchDSendDate","�·�����","DATE",true));

addSchemaColumn(new schemaColumn("fsoBranchDFlag","��־λ","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fsoBranchDPayType","��/��������","VARCHAR2(1)",true));



addSchemaColumn(new schemaColumn("fsoBranchReCertifyNo","�ֱ�ҵ���","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fsoBranchSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fsoBranchCoinsType","����������","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fsoBranchComCode","�ֱ�ҵ��������˾","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoBranchPayCode","�Ḷ��˾����","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoBranchReinsMode","�ֱ���ʽ","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fsoBranchTreatyNo","��ͬ���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoBranchTreatyName","��ͬ����","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fsoBranchShareRate","�ݶ�","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fsoBranchCurrency","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fsoBranchAmount","�ֳ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fsoBranchPremium","�ֳ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fsoBranchPayValue","̯�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fsoBranchOSLoss","δ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fsoBranchOptType","ҵ������","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fsoBranchNoticeNo","֪ͨ��","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fsoBranchPolicyNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fsoBranchEndorNo","������","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fsoBranchPayNo","�ⰸ��","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fsoBranchUwYear","ҵ�����","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fsoBranchRiskCode","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fsoBranchInsuredName","��������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fsoBranchBusinessFlag","ҵ�����ͣ��Ƿ����ҵ��","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fsoBranchCreaterCode","������","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoBranchCreateDTime","����ʱ��","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("fsoBranchSendFlag","�·���־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fsoBranchSendDate","�·�����","DATE",true));

addSchemaColumn(new schemaColumn("fsoBranchFlag","��־λ","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fsoPlanNoticeNo","�ֱ�֪ͨ��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fsoPlanPolicyNo","��������","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fsoPlanEndorNo","��������","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fsoPlanSerialNo","���Ѵ������","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fsoPlanPayNo","��������","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fsoPlanPlanDate","�ƻ����ѽ�ֹ����","DATE",false));

addSchemaColumn(new schemaColumn("fsoPlanCurrency","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fsoPlanPlanFee","Ӧ���ѽ��","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fsoPlanFlag","��־λ","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fsoReplanClassCode","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fsoReplanRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fsoReplanReendorNo","�ֱ�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fsoReplanRepayNo","���ⰸ��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fsoReplanPayType","��/��������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fsoReplanUwYear","ҵ�����","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fsoReplanComCode","��˾����","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fsoReplanSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fsoReplanPayTimes","�ڼ��ڼƻ�","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fsoReplanReinsMode","�ֱ���ʽ","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fsoReplanTreatyNo","��ͬ���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoReplanReinsType","����������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fsoReplanReinsNo","�ֱ����������","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fsoReplanReinsCode","�����˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoReplanReinsName","�����˼��","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fsoReplanFReinsCode","�����ٱ��˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fsoReplanFReinsName","�����ٱ��˼��","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fsoReplanCurrency","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fsoReplanPayValue","��/������","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fsoReplanPayDate","Ӧ��/��������","DATE",true));

addSchemaColumn(new schemaColumn("fsoReplanBelongType","������ͳ������","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fsoReplanAccFlag","�����ʵ���","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fsoReplanAccNo","�����ʵ����","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fsoReplanFlag","��־λ","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fxQryWhereQryCode","��ѯ����","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fxQryWhereSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fxQryWhereTableName","����","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fxQryWhereWhereStr","��ѯ�޶�����","VARCHAR2(250)",true));

addSchemaColumn(new schemaColumn("fxQryWhereFlag","Ԥ���ֶ�","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fxQryMainQryKind","��ѯ����","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fxQryMainQryCode","��ѯ����","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fxQryMainQryName","��ѯ����","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fxQryMainQryType","��ѯ����","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fxQryMainTableName","��ѯ��������","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fxQryMainFlag","Ԥ���ֶ�","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fzItemAccNo","�ʵ����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fzItemItemNo","�ʵ���Ŀ���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fzItemItemCode","��Ŀ����","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fzItemItemName","��Ŀ����","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fzItemItemRate","��Ŀ����","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fzItemCurrency1","ԭ��","VARCHAR2(3)",true));

//addSchemaColumn(new schemaColumn("fzItemItemValue1","���(ԭ��)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzItemCurrency","�ʵ�����","VARCHAR2(3)",true));

//addSchemaColumn(new schemaColumn("fzItemItemValue","���(�۱�)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzItemItemFlag","��/������־","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fzItemFlag","���ñ�־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fzAccAccNo","�ʵ����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fzAccOptType","ҵ������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fzAccAccType","�ʵ�����","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fzAccAccKind","�ʵ�����","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fzAccComCode","ҵ�������˾����","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fzAccComName","��˾����","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fzAccInsuredName","��������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fzAccDamageDate","��������","DATE",true));

addSchemaColumn(new schemaColumn("fzAccTreatyNo","��ͬ���(��ͬ�ʵ�)","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fzAccTreatyName","��ͬ����","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fzAccAccPeriod","�ʵ��ڣ���ͬ�ʵ���","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fzAccRepolicyNo","�ֱ�����","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fzAccRecertifyNo","�ֱ�ҵ��֤��","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fzAccDrCertifyNo","ֱ��ҵ��֤��","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fzAccYourRef","�Է�ҵ��֤��","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fzAccFacFlag","�ٷֽ���������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fzAccReinsType","����������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fzAccReinsCode","�����˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fzAccReinsName","����������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fzAccPayCode","�Ḷ�˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fzAccPayName","�Ḷ������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fzAccUwYear","ҵ�����","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fzAccClassCode","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fzAccRiskCode","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fzAccShareRate","�ֳ��ݶ�","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fzAccCurrency1","ԭ��","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fzAccBalance1","ԭ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzAccExchRate1","�һ���","NUMBER(16,10)",true));

addSchemaColumn(new schemaColumn("fzAccCurrency","�ʵ�����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fzAccBalance","���(�һ���)","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fzAccOSLoss","δ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzAccRemarks","��ע(����)","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fzAccMemo","��ע(����)","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fzAccSepeFlag","���ڸ����","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fzAccSettleType","�Ḷ����","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fzAccMakeComCode","�Ƶ����Ŵ���","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fzAccAccDate","ҵ���ʵ���������","DATE",true));

addSchemaColumn(new schemaColumn("fzAccCreaterCode","������","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fzAccCreateDTime","����ʱ��","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("fzAccUpdaterCode","�޸���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fzAccUpdateDTime","����޸�ʱ��","VARCHAR2(19)",true));

addSchemaColumn(new schemaColumn("fzAccBelongType","������ͳ������","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fzAccBusinessFlag","��������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fzAccFlag","��־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fzPlanMainAccNo","�ʵ����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fzPlanMainYourRef","�Է�ҵ��֤��","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fzPlanMainPayTimes","��������","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fzPlanMainSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fzPlanMainReinsNo","���������","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fzPlanMainReinsCode","�����˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fzPlanMainReinsName","����������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fzPlanMainFReinsCode","���ս����˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fzPlanMainFReinsName","���ս���������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fzPlanMainShareRate","�ֳ��ݶ�","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fzPlanMainCurrency","�ʵ�����","VARCHAR2(3)",true));

//addSchemaColumn(new schemaColumn("fzPlanMainBalance","�Ḷ���","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzPlanMainPaidValue","�ѽ���","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fzPlanMainSettleDate","Ӧ�Ḷ����","DATE",true));

addSchemaColumn(new schemaColumn("fzPlanMainSettleType","�Ḷ����","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fzPlanMainSettleStatus","����״̬","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fzPlanMainSettleNo","�Ḷ���","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fzPlanMainCurrNo","�ڼ��νḶ","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fzPlanMainDueDate","�Ḷ����","DATE",true));

addSchemaColumn(new schemaColumn("fzPlanMainRemarks","��ע","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("fzPlanMainFlag","���ñ�־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("prpDReinsRelateReinsCode","�����˴���","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("prpDReinsRelateUpperReinsCode","�������ܹ�˾����","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("prpDReinsRelateValidStatus","��Ч��־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpDReinsRelateFlag","���ñ�־�ֶ�","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("prpDReinsReinsCode","�����˴���","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("prpDReinsLongName","������ȫ��","VARCHAR2(255)",false));

addSchemaColumn(new schemaColumn("prpDReinsShortName","�����˼��","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("prpDReinsRegionCode","���ڳ��У�����","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("prpDReinsCountryName","��������","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("prpDReinsLocationFlag","���ڵ�������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpDReinsCAddr","���ĵ�ַ","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpDReinsEAddr","Ӣ�ĵ�ַ","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpDReinsAssessLevel","�����ȼ�","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpDReinsTtyLinker","��ͬҵ����ϵ��","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("prpDReinsTtyPhone","��ͬҵ��绰","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("prpDReinsTtyFax","��ͬҵ����","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("prpDReinsTtyEmail","��ͬҵ��EMAIL","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("prpDReinsFacLinker","�ٷ�ҵ����ϵ��","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("prpDReinsFacPhone","�ٷ�ҵ��绰","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("prpDReinsFacFax","�ٷ�ҵ����","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("prpDReinsFacEmail","�ٷ�ҵ��EMAIL","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("prpDReinsRemarks","��ע","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpDReinsAccCode","����ר�����","VARCHAR2(8)",true));

//addSchemaColumn(new schemaColumn("prpDReinsChgDate","�������","DATE",true));

addSchemaColumn(new schemaColumn("prpDReinsNewReinsCode","�µķֱ�������","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("prpDReinsValidStatus","��Ч��־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpDReinsOperatorCode","����Ա����","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpDReinsOperateDTime","����ʱ��","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("prpDReinsFlag","��־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoFacRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoFacReinsNo","�ֱ����������","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcoFacReinsType","����������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoFacReinsCode","�����˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoFacReinsName","�����˼��","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fcoFacFReinsCode","���ս����˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoFacFReinsName","���ս����˼��","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fcoFacPayCode","�Ḷ�˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoFacPayName","�Ḷ�˼��","VARCHAR2(40)",true));

//addSchemaColumn(new schemaColumn("fcoFacOfferedLine","�ֱ��ݶ�(Offered)","NUMBER(9,6)",true));

//addSchemaColumn(new schemaColumn("fcoFacSignedLine","�ֱ��ݶ�(Signed)","NUMBER(9,6)",true));

//addSchemaColumn(new schemaColumn("fcoFacOfferedComm","�����ѱ���(Offered)","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fcoFacSignedComm","�����ѱ���(Signed)","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fcoFacTaxRate","��˰����","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fcoFacOthRate","�������ñ���","NUMBER(6,4)",true));

//addSchemaColumn(new schemaColumn("fcoFacRate","����","NUMBER(14,10)",true));

addSchemaColumn(new schemaColumn("fcoFacCommitFlag","ȷ�ϱ�־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoFacCommitDate","ȷ������","DATE",true));

addSchemaColumn(new schemaColumn("fcoFacCurrencyFlag","�ֱ���������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoFacNetFlag","�Ծ����Ѽ����","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoFacFacFlag","��Լ�����˱�־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoFacCalFlag","���ĺ󱣶���㷽ʽ","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoFacFlag","���ñ�־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fpoRecoinsReendorNo","�ֱ�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoRecoinsRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoRecoinsCoinsType","����������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoRecoinsCoinsCode","�����˱���","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fpoRecoinsCoinsName","����������","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fpoRecoinsShareRate","��������","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoRecoinsRetentionRate","��������","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoRecoinsRetentionFlag","��־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoRecoinsTtyShareRate","��ͬ�ֱ���������","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoRecoinsFacShareRate","��ʱ�ֱ���������","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoRecoinsPayCode","�Ḷ��˾����","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fpoRecoinsPayName","�Ḷ��˾����","VARCHAR2(40)",true));



addSchemaColumn(new schemaColumn("fliChargeRepayNo","���ⰸ��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliChargeRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliChargeSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fliChargeYourPayNo","�Է�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliChargeRiskCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliChargeChargeCode","����������","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliChargeChargeName","��������","VARCHAR2(16)",false));

addSchemaColumn(new schemaColumn("fliChargeCurrency","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliChargeChargeAmount","���ý��","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliChargeSumRealPay","���������","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliChargeFlag","��־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fliPersonLossRepayNo","���ⰸ��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliPersonLossRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliPersonLossSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fliPersonLossYourPayNo","������","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fliPersonLossRiskCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliPersonLossPersonNo","��Ա���","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fliPersonLossPersonName","��Ա����","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fliPersonLossKindCode","�б��ձ����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fliPersonLossLiabCode","���η������","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fliPersonLossLiabName","���η�������","VARCHAR2(120)",true));

addSchemaColumn(new schemaColumn("fliPersonLossJobCode","��Ա���ִ���","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fliPersonLossJobName","��Ա��������","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fliPersonLossLiabDetailCode","������ϸ�������","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fliPersonLossLiabDetailName","������ϸ��������","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fliPersonLossItemAddress","�����ĵ�ַ","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fliPersonLossLossQuantity","����","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fliPersonLossUnit","������λ","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fliPersonLossUnitAmount","��λ�⳥�޶�","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliPersonLossCurrency","ʵ��ұ�","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliPersonLossSumRealPay","ʵ����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliPersonLossFlag","���ñ�־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fliReitemRepayNo","���ⰸ��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliReitemRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliReitemSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fliReitemYourPayNo","�Է�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fliReitemRiskCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliReitemKindCode","�ձ�","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliReitemItemCode","��Ĵ���","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fliReitemItemName","�������","VARCHAR2(120)",true));

addSchemaColumn(new schemaColumn("fliReitemCurrency","�⸶����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fliReitemPay","������ʧ�����","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fliReitemNopay","�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fliReitemRemarks","��ע","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fliReitemFlag","��־","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fcoItemNoticeNo","�ֱ�֪ͨ���","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoItemPolicyNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoItemSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcoItemRiskCode","���ִ���","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fcoItemKindCode","�ձ����","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fcoItemItemName","�������","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fcoItemItemAddr","��ĵ�ַ","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("fcoItemContractor","�а���","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("fcoItemPostCode","�ʱ�","VARCHAR2(6)",true));

addSchemaColumn(new schemaColumn("fcoItemWellType","�꾮���ʹ���","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoItemDeep","����","NUMBER(8,2)",true));

addSchemaColumn(new schemaColumn("fcoItemCurrency","����","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fcoItemAmount","����","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fcoItemSumAccumulate","�ۼ������޶�","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fcoItemRate","����","NUMBER(8,4)",true));

addSchemaColumn(new schemaColumn("fcoItemCalculateFlag","�Ƿ���㱣���־","VARCHAR2(1)",false));

//addSchemaColumn(new schemaColumn("fcoItemPremium","����","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fcoItemNopay","�����","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fcoItemFlag","��־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoPlaneNoticeNo","�ֱ�֪ͨ��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoPlanePolicyNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoPlaneSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcoPlanePlaneNo","�ɻ����","VARCHAR2(16)",false));

addSchemaColumn(new schemaColumn("fcoPlanePlaneType","�ɻ��ͺ�","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoPlaneMakeYear","�������","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fcoPlaneSeatCount","��λ��","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fcoPlaneFlyRange","���з�Χ","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("fcoPlaneRiskCode","���ִ���","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fcoPlanePassengerFlux","������","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoPlaneGoodsFlux","������","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcoPlaneMaxPlaneValue","���ɻ���ֵ","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fcoPlaneAverageValue","ƽ����ֵ","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fcoPlaneTowerH","��̨��","NUMBER(7,2)",true));

addSchemaColumn(new schemaColumn("fcoPlaneTowerW","��̨��","NUMBER(7,2)",true));

addSchemaColumn(new schemaColumn("fcoPlaneTowerL","��̨��","NUMBER(7,2)",true));

addSchemaColumn(new schemaColumn("fcoPlanePlaneUsage","�ɻ���;","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("fcoPlanePeriodFlag","������������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoPlaneLeaseMode","�ɻ�������ʽ","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fcoPlaneStartDate","������","DATE",true));

addSchemaColumn(new schemaColumn("fcoPlaneEndDate","�ձ�����","DATE",true));

addSchemaColumn(new schemaColumn("fcoPlaneRemarks","ʹ�ñ���������","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fcoPlaneRecoverFlag","������־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoPlaneValidFlag","ʧЧ��־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoPlaneFlag","��־","VARCHAR2(10)",true));



//addSchemaColumn(new schemaColumn("floChargeClaimNo","�ⰸ֪ͨ��","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floChargePayNo","������","VARCHAR2(22)",true));

//addSchemaColumn(new schemaColumn("floChargeCompensateNo","���������","VARCHAR2(22)",true));

//addSchemaColumn(new schemaColumn("floChargePolicyNo","������","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floChargeRiskCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floChargeSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("floChargeChargeCode","����������","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floChargeChargeName","��������","VARCHAR2(16)",false));

addSchemaColumn(new schemaColumn("floChargeCurrency","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floChargeChargeAmount","���ý��","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floChargeSumRealPay","���������","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("floChargeFlag","��־","VARCHAR2(10)",true));



//addSchemaColumn(new schemaColumn("floItemClaimNo","�ⰸ֪ͨ��","VARCHAR2(22)",false));

//addSchemaColumn(new schemaColumn("floItemPayNo","������","VARCHAR2(22)",true));

//addSchemaColumn(new schemaColumn("floItemCompensateNo","���������","VARCHAR2(22)",true));

//addSchemaColumn(new schemaColumn("floItemPolicyNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("floItemSerialNo","���","NUMBER(15)",false));

//addSchemaColumn(new schemaColumn("floItemRiskCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floItemKindCode","�ձ�","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floItemItemName","�������","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("floItemPlaneType","�ɻ��ͺ�","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("floItemRegistNo","ע���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("floItemCurrency","���֣��⸶���֣�","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floItemPay","������ʧ�����","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("floItemNopay","�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floItemRemarks","��ע","VARCHAR2(255)",true));

//addSchemaColumn(new schemaColumn("floItemFlag","���ñ�־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fciReitemRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciReitemSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fciReitemYourPolicyNo","�Է�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciReitemRiskCode","���ִ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fciReitemKindCode","�ձ����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fciReitemItemCode","��Ĵ���","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fciReitemItemName","�������","VARCHAR2(120)",true));

addSchemaColumn(new schemaColumn("fciReitemItemAddr","��ĵ�ַ","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("fciReitemCurrency","����","VARCHAR2(3)",false));

//addSchemaColumn(new schemaColumn("fciReitemAmount","����","NUMBER(14,2)",false));

//addSchemaColumn(new schemaColumn("fciReitemRate","����","NUMBER(8,4)",true));

//addSchemaColumn(new schemaColumn("fciReitemPremium","����","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("fciReitemCalculateFlag","�Ƿ���㱣���־","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fciReitemFlag","��־","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fcoRecoinsRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoRecoinsCoinsType","����������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoRecoinsCoinsCode","�����˱���","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fcoRecoinsCoinsName","����������","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fcoRecoinsShareRate","��������","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fcoRecoinsRetentionRate","��������","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fcoRecoinsRetentionFlag","��־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fcoRecoinsTtyShareRate","��ͬ�ֱ���������","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fcoRecoinsFacShareRate","��ʱ�ֱ���������","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fcoRecoinsPayCode","�Ḷ��˾����","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fcoRecoinsPayName","�Ḷ��˾����","VARCHAR2(40)",true));



addSchemaColumn(new schemaColumn("floReItemRepayNo","���ⰸ��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("floReItemClaimNo","�ⰸ֪ͨ��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("floReItemPayNo","������","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floReItemPolicyNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("floReItemRepolicyNo","�ֱ�����","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("floReItemRiskCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floReItemPayType","�������","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("floReItemItemCode","��Ŀ����","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("floReItemItemName","�������","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("floReItemCurrency","���֣��⸶���֣�","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("floReItemPayValue","������ʧ�����","NUMBER(14,2)",false));

addSchemaColumn(new schemaColumn("floReItemRemarks","��ע","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("floReItemFlag","���ñ�־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fciReclauseRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciReclauseSerialNo","�������","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fciReclauseYourPolicyNo","�Է�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciReclauseClauseCode","�������","VARCHAR2(7)",true));

addSchemaColumn(new schemaColumn("fciReclauseClauseTitle","����","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fciReclauseFlag","��־","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fxQryColQryCode","��ѯ����","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fxQryColSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fxQryColColName","�ֶ���","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fxQryColColDispName","�ֶ���ʾ����","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fxQryColColType","�ֶ�����","VARCHAR2(6)",true));

addSchemaColumn(new schemaColumn("fxQryColTableName","����","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fxQryColCodeType","����������","VARCHAR2(15)",true));

addSchemaColumn(new schemaColumn("fxQryColCodeFlag","�����־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fxQryColDispFlag","��ʾ��־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fxQryColSelectFlag","ѡ���־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fxQryColFlag","Ԥ���ֶ�","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fxQryJoinQryCode","��ѯ����","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fxQryJoinSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fxQryJoinJoinStr","��������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fxQryJoinFlag","Ԥ���ֶ�","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fciRecoinsRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciRecoinsSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fciRecoinsYourPolicyNo","�Է�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fciRecoinsCoinsType","����������","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fciRecoinsCoinsCode","�����˱���","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fciRecoinsCoinsName","����������","VARCHAR2(40)",true));

//addSchemaColumn(new schemaColumn("fciRecoinsShareRate","��������","NUMBER(9,6)",false));

addSchemaColumn(new schemaColumn("fciRecoinsFlag","��־","VARCHAR2(2)",true));


addSchemaColumn(new schemaColumn("fcoAbstractRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoAbstractReinsMode","�ֱ���ʽ","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fcoAbstractTreatyNo","��ͬ���","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fcoAbstractShareRate","�ݶ�","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fcoAbstractCurrency","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fcoAbstractBelongType","������ͳ������","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fcoAbstractAmount","�ֳ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fcoAbstractPremium","�ֳ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fcoAbstractFlag","���ñ�־","VARCHAR2(10)",true));


addSchemaColumn(new schemaColumn("fpiReclauseReendorNo","�����������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReclauseRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReclauseYourEndorNo","�Է�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReclauseYourPolicyNo","�Է��������ĵı�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiReclauseSerialNo","�������","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpiReclauseClauseCode","�������","VARCHAR2(7)",true));

addSchemaColumn(new schemaColumn("fpiReclauseClauseTitle","����","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpiReclauseFlag","��־","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("fzPlanDetailAccNo","�ʵ����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fzPlanDetailSerialNo","�ڼ���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fzPlanDetailReinsNo","���������","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fzPlanDetailItemNo","�ʵ���Ŀ���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fzPlanDetailItemCode","��Ŀ����","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fzPlanDetailItemName","��Ŀ����","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fzPlanDetailCurrency","�ʵ�����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fzPlanDetailItemValue","���(ԭ��)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzPlanDetailItemFlag","��/������־","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fzPlanDetailCurrNo","�Ḷ����","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fzPlanDetailSettleNo","�Ḷ���","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fzPlanDetailExchRate","�Ḷ�Ķһ���","NUMBER(16,10)",true));

addSchemaColumn(new schemaColumn("fzPlanDetailCurrencyS","�Ḷ����(�۱�)","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fzPlanDetailItemValueS","�Ḷ���(�۱�)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzPlanDetailDueDate","�Ḷ����","DATE",true));

addSchemaColumn(new schemaColumn("fzPlanDetailFlag","���ñ�־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fpiRecoinsReendorNo","�����������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiRecoinsRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiRecoinsYourEndorNo","�Է�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiRecoinsYourPolicyNo","�Է��������ĵı�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpiRecoinsSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpiRecoinsCoinsType","����������","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fpiRecoinsCoinsCode","�����˱���","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fpiRecoinsCoinsName","����������","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpiRecoinsShareRate","��������","NUMBER(9,6)",false));

addSchemaColumn(new schemaColumn("fpiRecoinsFlag","��־","VARCHAR2(2)",true));


addSchemaColumn(new schemaColumn("prpDAccountReinsCode","�����˴���","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("prpDAccountClassCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("prpDAccountAccountName","����������","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpDAccountAddr","������ַ","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpDAccountBank","��������","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpDAccountSwiftCode","SwiftCode","VARCHAR2(14)",true));

addSchemaColumn(new schemaColumn("prpDAccountCurrency","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("prpDAccountAccounts","�ʺ�","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpDAccountValidStatus","��Ч��־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpDAccountFlag","���ñ�־�ֶ�","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpDAccountStartDate","��ʼʱ��","Date",true));

addSchemaColumn(new schemaColumn("prpDAccountEndDate","��ֹʱ��","Date",true));



addSchemaColumn(new schemaColumn("fpoAbstractReendorNo","�ֱ�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoAbstractRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoAbstractReinsMode","�ֱ���ʽ","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fpoAbstractTreatyNo","��ͬ���","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fpoAbstractShareRate","�ݶ�","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoAbstractCurrency","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fpoAbstractBelongType","������ͳ������","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fpoAbstractAmount","�ֳ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoAbstractPremium","�ֳ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoAbstractFlag","���ñ�־","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoAbstractAmountChg","����仯�� (ԭ��)","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fpoAbstractPremiumChg","���ѱ仯�� (ԭ��)","NUMBER(14,2)",true));



addSchemaColumn(new schemaColumn("fpoClauseEndorNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoClauseNoticeNo","�ֱ�֪ͨ���","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fpoClauseSerialNo","�������","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpoClauseClauseCode","�������","VARCHAR2(7)",true));

addSchemaColumn(new schemaColumn("fpoClauseClauseTitle","����","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fpoClauseFlag","���ñ�־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fpoCoinsEndorNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoCoinsNoticeNo","�ֱ�֪ͨ���","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoCoinsPolicyNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoCoinsSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpoCoinsCoinsType","����������","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fpoCoinsCoinsCode","�����˱���","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fpoCoinsCoinsName","����������","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fpoCoinsShareRate","��������","NUMBER(9,6)",false));

addSchemaColumn(new schemaColumn("fpoCoinsRetentionRate","��������","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoCoinsRetentionFlag","��־","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fpoCoinsFlag","���ñ�־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoClauseNoticeNo","�ֱ�֪ͨ���","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoClauseSerialNo","�������","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcoClauseClauseCode","�������","VARCHAR2(7)",true));

addSchemaColumn(new schemaColumn("fcoClauseClauseTitle","����","VARCHAR2(255)",true));



addSchemaColumn(new schemaColumn("fpoFacReendorNo","�ֱ�������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoFacRepolicyNo","�ֱ�����","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fpoFacReinsNo","�ֱ����������","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fpoFacReinsType","����������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoFacReinsCode","�����˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoFacReinsName","�����˼��","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fpoFacFReinsCode","���ս����˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoFacFReinsName","���ս����˼��","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpoFacPayCode","�Ḷ�˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fpoFacPayName","�Ḷ�˼��","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fpoFacOfferedLine","�ֱ��ݶ�(Offered)","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoFacSignedLine","�ֱ��ݶ�(Signed)","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fpoFacOfferedComm","�����ѱ���(Offered)","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpoFacSignedComm","�����ѱ���(Signed)","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpoFacTaxRate","��˰����","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpoFacOthRate","�������ñ���","NUMBER(6,4)",true));

addSchemaColumn(new schemaColumn("fpoFacRate","����","NUMBER(14,10)",true));

addSchemaColumn(new schemaColumn("fpoFacCommitFlag","ȷ�ϱ�־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoFacCommitDate","ȷ������","DATE",true));

addSchemaColumn(new schemaColumn("fpoFacCurrencyFlag","�ֱ����㷽ʽ","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoFacNetFlag","�Ծ����Ѽ����","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoFacFacFlag","��Լ�����˱�־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoFacCalFlag","���ĺ󱣶���㷽ʽ","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fpoFacFlag","���ñ�־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcoCoinsNoticeNo","�ֱ�֪ͨ���","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoCoinsPolicyNo","������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcoCoinsSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcoCoinsCoinsType","����������","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fcoCoinsCoinsCode","�����˱���","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fcoCoinsCoinsName","����������","VARCHAR2(60)",true));

addSchemaColumn(new schemaColumn("fcoCoinsShareRate","��������","NUMBER(9,6)",false));

//addSchemaColumn(new schemaColumn("fcoCoinsRetentionRate","��������","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("fcoCoinsRetentionFlag","��־","VARCHAR2(1)",false));


addSchemaColumn(new schemaColumn("floAbstractRepayNo","���ⰸ��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("floAbstractReinsMode","�ֱ���ʽ","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("floAbstractTreatyNo","��ͬ���","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("floAbstractShareRate","�ݶ�","NUMBER(9,6)",true));

addSchemaColumn(new schemaColumn("floAbstractCurrency","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("floAbstractBelongType","������ͳ������","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("floAbstractPay","̯�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floAbstractFee","̯�ط���","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floAbstractOutstanding","δ��","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("floAbstractFlag","���ñ�־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fcrPolicyReportComCode","�ϱ���˾����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fcrPolicyMakeComCode","������˾����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fcrPolicyAccPeriod","�ʵ���","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fcrPolicyUwYear","ҵ����ȣ��������ڣ�","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fcrPolicyClassCode","�����ֱ��������","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fcrPolicyRiskCode","���ִ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fcrPolicyCurrency","���Ҵ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fcrPolicyPolicyNo","��������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fcrPolicyInsuredName","��������","VARCHAR2(50)",false));

addSchemaColumn(new schemaColumn("fcrPolicyOperateDate","��������","DATE",false));

addSchemaColumn(new schemaColumn("fcrPolicyStartDate","������","DATE",false));

addSchemaColumn(new schemaColumn("fcrPolicyEndDate","�ձ�����","DATE",true));

addSchemaColumn(new schemaColumn("fcrPolicyItemName","�������","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fcrPolicyItemAddress","��ĵ���","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fcrPolicyLongLatitude","��γ��","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcrPolicyRate","���ʣ��룩","NUMBER(5,2)",true));

addSchemaColumn(new schemaColumn("fcrPolicySumAmount","����","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrPolicySumPremium","����","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrPolicyRealPremium","ʵ�ձ���","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrPolicyReinsAmount","�ֱ���","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrPolicyReinsPremium","�ֱ���","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrPolicyRemark","��ע","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcrPolicyInputDate","��������","DATE",true));

addSchemaColumn(new schemaColumn("fcrPolicyComCode","ҵ���������","VARCHAR2(8)",false));



addSchemaColumn(new schemaColumn("fcrTotalPolicyReportComCode","�ϱ���˾����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyMakeComCode","������˾����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyAccPeriod","�ʵ���","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyUwYear","ҵ����ȣ��������ڣ�","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyClassCode","�������","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyRiskCode","���ִ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyCurrency","���Ҵ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyOperateMonth1","�����·�1","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyOperateCount1","��������1","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicySumAmount1","�ܱ���1","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicySumPremium1","Ӧ�ձ���1","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyRealPremium1","ʵ�ձ���1","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyReinsAmount1","�ֱ���1","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyReinsPremium1","�ֱ���1","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyRemark1","��ע1","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcrTotalPolicyOperateMonth2","�����·�2","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyOperateCount2","��������2","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicySumAmount2","�ܱ���2","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicySumPremium2","Ӧ�ձ���2","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyRealPremium2","ʵ�ձ���2","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyReinsAmount2","�ֱ���2","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyReinsPremium2","�ֱ���2","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyRemark2","��ע2","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcrTotalPolicyOperateMonth3","�����·�3","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyOperateCount3","��������3","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicySumAmount3","�ܱ���3","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicySumPremium3","Ӧ�ձ���3","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyRealPremium3","ʵ�ձ���3","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyReinsAmount3","�ֱ���3","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyReinsPremium3","�ֱ���3","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyRemark3","��ע3","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcrTotalPolicySumAmount","�ϼƱ���","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicySumPremium","�ϼ�Ӧ�ձ���","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyRealPremium","�ϼ�ʵ�ձ���","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyReinsAmount","�ϼƷֱ���","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyReinsPremium","�ϼƷֱ���","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fcrTotalPolicyRemark","��ע","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fcrTotalPolicyInputDate","��������","DATE",true));

addSchemaColumn(new schemaColumn("fcrTotalPolicyComCode","ҵ���������","VARCHAR2(8)",false));



addSchemaColumn(new schemaColumn("fgoBranchDCertifyNo","ҵ��֤��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fgoBranchDClassCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fgoBranchDSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fgoBranchDAccPeriod","�ʵ���","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fgoBranchDComCode","ҵ��������˾","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fgoBranchDPayCode","�Ḷ��˾����","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fgoBranchDTreatyNo","��ͬ���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fgoBranchDCurrency","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fgoBranchDPremium","����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fgoBranchDPayValue","���","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fgoBranchDOSLoss","δ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fgoBranchDPayDate","Ӧ��/��������","DATE",true));

addSchemaColumn(new schemaColumn("fgoBranchDAccFlag","�����ʵ���","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fgoBranchDAccNo","�����ʵ����","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fgoBranchDFlag","����","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fgoBranchDReinsClassCode","��������","VARCHAR2(3)",true));



addSchemaColumn(new schemaColumn("fgoRePlanCertifyNo","ҵ��֤��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fgoRePlanClassCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fgoRePlanPayType","��/��������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fgoRePlanUwYear","ҵ�����","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fgoRePlanAccPeriod","�ʵ���","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fgoRePlanSerialNo","���","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fgoRePlanTreatyNo","��ͬ���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fgoRePlanReinsCode","�����˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fgoRePlanReinsName","�����˼��","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fgoRePlanCurrency","����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fgoRePlanPayValue","��/������: ����/���","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fgoRePlanPayDate","Ӧ��/��������","DATE",true));

addSchemaColumn(new schemaColumn("fgoRePlanAccFlag","�����ʵ���","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fgoRePlanAccNo","�����ʵ����","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fgoRePlanFlag","�����ֶ�","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fgoRePlanReinsClassCode","��������","VARCHAR2(3)",true));


addSchemaColumn(new schemaColumn("fjSettleSettleNo","���㵥���","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fjSettleSettleType","�Ḷ����","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fjSettlePayCode","�Ḷ�˱���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fjSettlePayName","�Ḷ������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("fjSettleCurrency","�Ḷ����","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fjSettleSettleValue","�Ḷ���","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fjSettleBank","��������","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fjSettleAddr","�����е�ַ","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fjSettleAccountName","����������","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fjSettleAccounts","�ʺ�","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fjSettleSettleFlag","�գ������־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fjSettlePayMode","���ʽ","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fjSettleVoucherNo","���е�֤���","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fjSettleBankComm","����������","NUMBER(8,2)",true));

addSchemaColumn(new schemaColumn("fjSettleOperatorCode","������","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fjSettleOperateDTime","����ʱ��","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("fjSettleApprover1Code","һ����","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fjSettleApprove1DTime","һ��ʱ��","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("fjSettleApprover2Code","������","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fjSettleApprove2DTime","����ʱ��","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("fjSettleSendFlag","�����־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fjSettleSenderCode","�ͽ�����Ĵ�����","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fjSettleSendDTime","�Ͳ���ʱ��","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("fjSettleRemarks","��ע","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("fjSettleFlag","���ñ�־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fjVouRelateCertifyNo","�ֱ�ҵ��֤��","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fjVouRelateTreatyNo","��ͬ���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fjVouRelateAccPeriod","�ʵ���","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("fjVouRelateSettleNo","���㵥���","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fjVouRelateMyDocuNo","��ʱƾ֤��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fjVouRelateVoucherType","ƾ֤����","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fjVouRelateAccType","ҵ������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fjVouRelateOperatorCode","ƾ֤������","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fjVouRelateOperateDTime","ƾ֤����ʱ��","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("fjVouRelateReceiveDTime","�������ƾ֤ʱ��","VARCHAR2(16)",true));



addSchemaColumn(new schemaColumn("flrPayReportComCode","�ϱ���˾����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("flrPayMakeComCode","������˾����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("flrPayAccPeriod","�ʵ���","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("flrPayUwYear","ҵ����ȣ��������ڣ�","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("flrPayClassCode","�����ֱ��������","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("flrPayRiskCode","���ִ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("flrPayCurrency","���Ҵ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("flrPayPolicyNo","��������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("flrPayClaimNo","�ⰸ֪ͨ��","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("flrPayInsuredName","��������","VARCHAR2(50)",false));

addSchemaColumn(new schemaColumn("flrPayStartDate","������","DATE",false));

addSchemaColumn(new schemaColumn("flrPayEndDate","�ձ�����","DATE",true));

addSchemaColumn(new schemaColumn("flrPayItemName","�������","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("flrPayDamageDate","��������","DATE",false));

addSchemaColumn(new schemaColumn("flrPayDamageCode","����ԭ�����","VARCHAR2(6)",false));

addSchemaColumn(new schemaColumn("flrPayPayDate","�⸶����","DATE",false));

addSchemaColumn(new schemaColumn("flrPaySumPaid","�����","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrPayREINSPAID","̯����","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrPayInputDate","��������","DATE",true));

addSchemaColumn(new schemaColumn("flrPayComCode","ҵ���������","VARCHAR2(8)",false));



addSchemaColumn(new schemaColumn("flrTotalNoPayReportComCode","�ϱ���˾����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPayMakeComCode","������˾����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPayAccPeriod","�ʵ���","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPayUwYear","ҵ����ȣ��������ڣ�","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPayClassCode","�����ֱ��������","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPayRiskCode","���ִ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPayCurrency","���Ҵ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPayPaidCount","�⸶����","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPaySumPaid","�ϼ����","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPaySettledPaid","�Ѿ����","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPayREINSPAID","�ϼƷ����","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrTotalNoPayRemark","��ע","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("flrTotalNoPayInputDate","��������","DATE",true));

addSchemaColumn(new schemaColumn("flrTotalNoPayComCode","ҵ���������","VARCHAR2(8)",false));



addSchemaColumn(new schemaColumn("flrTotalPayReportComCode","�ϱ���˾����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("flrTotalPayMakeComCode","������˾����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("flrTotalPayAccPeriod","�ʵ���","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("flrTotalPayUwYear","ҵ����ȣ��������ڣ�","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("flrTotalPayClassCode","�����ֱ��������","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("flrTotalPayRiskCode","���ִ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("flrTotalPayCurrency","���Ҵ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("flrTotalPayDamageMonth1","�����·�","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("flrTotalPayPaidCount1","�⸶����","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("flrTotalPaySumPaid1","�����","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrTotalPayReinsPaid1","̯����","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("flrTotalPayRemark1","��ע","VARCHAR2(10)",true));

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

addSchemaColumn(new schemaColumn("flrTotalPayInputDate","��������","DATE",true));

addSchemaColumn(new schemaColumn("flrTotalPayComCode","ҵ���������","VARCHAR2(8)",false));



addSchemaColumn(new schemaColumn("fprEndorReportComCode","�ϱ���˾����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fprEndorMakeComCode","������˾����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fprEndorAccPeriod","�ʵ���","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fprEndorUwYear","ҵ����ȣ��������ڣ�","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fprEndorClassCode","�����ֱ��������","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fprEndorRiskCode","���ִ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fprEndorCurrency","���Ҵ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fprEndorPolicyNo","��������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fprEndorEndorNo","��������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fprEndorInsuredName","��������","VARCHAR2(50)",false));

addSchemaColumn(new schemaColumn("fprEndorStartDate","������","DATE",false));

addSchemaColumn(new schemaColumn("fprEndorEndDate","�ձ�����","DATE",true));

addSchemaColumn(new schemaColumn("fprEndorItemName","�������","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("fprEndorReason","���ԭ��","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("fprEndorEndorDate","�������","DATE",false));

addSchemaColumn(new schemaColumn("fprEndorSumAmount","����仯","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprEndorSumPremium","���ѱ仯","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprEndorReinsAmount","�ֱ���","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprEndorReinsPremium","�ֱ���","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprEndorInputDate","��������","DATE",true));

addSchemaColumn(new schemaColumn("fprEndorComCode","ҵ���������","VARCHAR2(8)",false));



addSchemaColumn(new schemaColumn("fprTotalEndorReportComCode","�ϱ���˾����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorMakeComCode","������˾����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorAccPeriod","�ʵ���","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorUwYear","ҵ����ȣ��������ڣ�","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorClassCode","�����ֱ��������","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorRiskCode","���ִ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorCurrency","���Ҵ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorOperateMonth1","�����·�","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorOperateCount1","��������","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorSumAmount1","����仯","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorSumPremium1","���ѱ仯","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorReinsAmount1","�ֱ���","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorReinsPremium1","�ֱ���","NUMBER(15,2)",false));

addSchemaColumn(new schemaColumn("fprTotalEndorRemark1","��ע","VARCHAR2(10)",true));

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

addSchemaColumn(new schemaColumn("fprTotalEndorInputDate","��������","DATE",true));

addSchemaColumn(new schemaColumn("fprTotalEndorComCode","ҵ���������","VARCHAR2(8)",false));



addSchemaColumn(new schemaColumn("fxConditionConCode","��������","NUMBER(15)",false));

addSchemaColumn(new schemaColumn("fxConditionConName","��������","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fxConditionClassCode","�������","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fxConditionRiskCode","���ִ���","VARCHAR2(3)",true));

addSchemaColumn(new schemaColumn("fxConditionUwYear","ҵ�����","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("fxConditionConType","�ж�����","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fxConditionLogic","�߼�����","VARCHAR2(2)",true));

addSchemaColumn(new schemaColumn("fxConditionCurrency","����","VARCHAR2(3)",true));

//addSchemaColumn(new schemaColumn("fxConditionPointValue","���ֵ","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fxConditionTopValue","�յ�ֵ","NUMBER(14,2)",true));

//addSchemaColumn(new schemaColumn("fxConditionStartDate","��Ч��ʼ����","DATE",true));

//addSchemaColumn(new schemaColumn("fxConditionEndDate","��Ч��ֹ����","DATE",true));

addSchemaColumn(new schemaColumn("fxConditionValidStatus","��Ч��־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fxConditionFlag","��־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fxFormRiskCode","���ִ���","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fxFormFileType","�ļ�����","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("fxFormRowNo","��","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fxFormColNo","��","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("fxFormFileName","�ļ���","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fxFormTableName","����","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fxFormFlag","��־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fxReportReportCode","�������","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("fxReportReportType","��������","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fxReportReportName","��������","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fxReportTemplateName","ģ������","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fxReportSelectStr1","SQL�����ֶ�����1","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fxReportSelectStr2","SQL�����ֶ�����2","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fxReportWhereStr","ȡ����ʱSQL����Where����","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("fxReportGroupBy","SQL����еķ�������","VARCHAR2(160)",true));

addSchemaColumn(new schemaColumn("fxReportOrderBy","ȡ����ʱSQL����Order By�ֶ�","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("fxReportReportService","ʵ�ֱ����ӡ�ķ�����","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fxReportValidStatus","��Ч��־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("fxReportFlag","��־","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fzCancelSourceNo","ԭʼ�ʵ���","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("fzCancelCancelNo","�������ʵ���","VARCHAR2(22)",true));

addSchemaColumn(new schemaColumn("fzCancelCancelDate","��������","DATE",true));

addSchemaColumn(new schemaColumn("fzCancelCreaterCode","������","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("fzTtyRlistIPAddr","IP��ַ","VARCHAR2(15)",false));

addSchemaColumn(new schemaColumn("fzTtyRlistRefNo","��ͬҵ���","VARCHAR2(10)",false));

addSchemaColumn(new schemaColumn("fzTtyRlistTreatyName","��ͬ����","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("fzTtyRlistUwYear","ҵ�����","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("fzTtyRlistCurrency","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("fzTtyRlistPremium","�ֱ���","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzTtyRlistComm","������","NUMBER(12,2)",true));

addSchemaColumn(new schemaColumn("fzTtyRlistTax","˰","NUMBER(12,2)",true));

addSchemaColumn(new schemaColumn("fzTtyRlistOtherFee","��������","NUMBER(12,2)",true));

addSchemaColumn(new schemaColumn("fzTtyRlistLoss","���","NUMBER(12,2)",true));

addSchemaColumn(new schemaColumn("fzTtyRlistOSLoss","δ�����","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzTtyRlistBalance","���","NUMBER(14,2)",true));

addSchemaColumn(new schemaColumn("fzTtyRlistProfitRatio","������","NUMBER(10,4)",true));



addSchemaColumn(new schemaColumn("prpDAccItemAccItemCode","�ʵ���Ŀ����","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("prpDAccItemPositiveCName","����˵��(>0)","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("prpDAccItemPositiveEName","Ӣ��˵��(>0)","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("prpDAccItemItemPlace","�����ϵ","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpDAccItemNegativeCName","Nega����˵��(<0)","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("prpDAccItemNegativeEName","Ӣ��˵��(<0)","VARCHAR2(30)",true));

addSchemaColumn(new schemaColumn("prpDAccItemAccYear","�������","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("prpDAccItemNewAccItemCode","�´���","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("prpDAccItemValidStatus","��Ч��־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpDAccItemOperatorCode","����Ա����","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpDAccItemOperateDTime","����ʱ��","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("prpDAccItemFlag","��־","VARCHAR2(5)",true));



addSchemaColumn(new schemaColumn("prpDArticleAccYear","�������","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("prpDArticleOptType","ҵ������","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("prpDArticleAccType","�ʵ�����","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("prpDArticleItemCode","�����Ŀ����","VARCHAR2(12)",false));

addSchemaColumn(new schemaColumn("prpDArticleArticleCode","ר�����","VARCHAR2(6)",false));

addSchemaColumn(new schemaColumn("prpDArticleOperatorCode","����Ա","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpDArticleOperateDTime","����ʱ��","VARCHAR2(16)",true));



addSchemaColumn(new schemaColumn("prpDArtItemAccYear","�������","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("prpDArtItemOptType","ҵ������","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("prpDArtItemAccType","�ʵ�����","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("prpDArtItemAccItemCode","�ʵ���Ŀ����","VARCHAR2(2)",false));

addSchemaColumn(new schemaColumn("prpDArtItemAccItemName","�ʵ���Ŀ����","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("prpDArtItemItemCode","�����Ŀ����","VARCHAR2(12)",true));

addSchemaColumn(new schemaColumn("prpDArtItemItemName","�����Ŀ˵��","VARCHAR2(12)",true));

addSchemaColumn(new schemaColumn("prpDArtItemItemFlag","�����־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpDArtItemVoucherType","ƾ֤����","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("prpDArtItemOperatorCode","����Ա","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpDArtItemOperateDTime","����ʱ��","VARCHAR2(16)",true));



addSchemaColumn(new schemaColumn("prpDComAccountComCode","���Ŵ���","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("prpDComAccountAccountName","����������","VARCHAR2(100)",true));

addSchemaColumn(new schemaColumn("prpDComAccountAddr","������ַ","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpDComAccountBank","��������","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("prpDComAccountCurrency","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("prpDComAccountAccounts","�ʺ�","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("prpDComAccountValidStatus","��Ч��־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpDComAccountFlag","���ñ�־�ֶ�","VARCHAR2(10)",true));



addSchemaColumn(new schemaColumn("prpReinsVerifyClassCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("prpReinsVerifyRiskCode","����","VARCHAR2(3)",false));

addSchemaColumn(new schemaColumn("prpReinsVerifyCertiType","��������","VARCHAR2(1)",false));

addSchemaColumn(new schemaColumn("prpReinsVerifyCertiNo","Ͷ������/��������/��������/Ԥ�����ǼǺ�/���������","VARCHAR2(22)",false));

addSchemaColumn(new schemaColumn("prpReinsVerifyReinsIntent","�ֱ�����","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpReinsVerifyReinsState","�ٱ�ȷ��״̬","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpReinsVerifyVerifierCode","�ٱ�ȷ���˴���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpReinsVerifyReinsHandleText","�ٱ�ȷ�����","VARCHAR2(255)",true));

addSchemaColumn(new schemaColumn("prpReinsVerifyReinsHandleDate","�ٱ�ȷ������","DATE",true));

addSchemaColumn(new schemaColumn("prpReinsVerifyOperatorCode","����Ա����","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpReinsVerifyInputDate","��������","DATE",false));

addSchemaColumn(new schemaColumn("prpReinsVerifyInputTime","����ʱ��","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("prpReinsVerifyModifierCode","����޸��˴���","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpReinsVerifyModifyDate","����޸�����","DATE",true));

addSchemaColumn(new schemaColumn("prpReinsVerifyModifyTime","����޸�ʱ��","VARCHAR2(8)",true));

addSchemaColumn(new schemaColumn("prpReinsVerifyFlag","��־λ","VARCHAR2(2)",true));



addSchemaColumn(new schemaColumn("utiKeyTableName","����","VARCHAR2(20)",false));

addSchemaColumn(new schemaColumn("utiKeyFieldName","�ֶ���","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("utiKeyFieldMeaning","����","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("utiKeyColLength","��ˮ�ų���","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("utiKeyHeadID","���ݺ�����","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("utiKeyFlag","��ʶ","VARCHAR2(8)",true));



addSchemaColumn(new schemaColumn("prpDRiskKindUwYear","ҵ�����","VARCHAR2(4)",false));

addSchemaColumn(new schemaColumn("prpDRiskKindRiskKindCode","����������","VARCHAR2(15) ",false));

addSchemaColumn(new schemaColumn("prpDRiskKindCodeCName","��������","VARCHAR2(40)",true));

addSchemaColumn(new schemaColumn("prpDRiskKindCodeEName","Ӣ������","VARCHAR2(80)",true));

addSchemaColumn(new schemaColumn("prpDRiskKindNewKindCode","�·���������","VARCHAR2(15)",false));

addSchemaColumn(new schemaColumn("prpDRiskKindValidStatus","��Ч��־","VARCHAR2(1) ",false));

addSchemaColumn(new schemaColumn("prpDRiskKindOperatorCode","����Ա����","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpDRiskKindOperateDTime","����ʱ��","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("prpDRiskKindFlag","���ñ�־�ֶ�","VARCHAR2(10)",true));



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



addSchemaColumn(new schemaColumn("prpDPlanePlaneCode","�ɻ�����","VARCHAR2(8)",false));

addSchemaColumn(new schemaColumn("prpDPlanePlaneType","�ɻ��ͺ�","VARCHAR2(15)",false));

addSchemaColumn(new schemaColumn("prpDPlanePlaneNo","ע���","VARCHAR2(15)",true));

addSchemaColumn(new schemaColumn("prpDPlaneFleetName","��������","VARCHAR2(50)",false));

addSchemaColumn(new schemaColumn("prpDPlaneRange","����","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("prpDPlaneSeatCount","��λ��","NUMBER(15)",true));

addSchemaColumn(new schemaColumn("prpDPlaneMakeYear","�������","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("prpDPlaneLeaseMode","���з�ʽ","VARCHAR2(4)",true));

addSchemaColumn(new schemaColumn("prpDPlanePlaneUsage","�ɻ���;","VARCHAR2(20)",true));

addSchemaColumn(new schemaColumn("prpDPlaneRemarks","��ע","VARCHAR2(250)",true));

addSchemaColumn(new schemaColumn("prpDPlaneValidStatus","��Ч��־","VARCHAR2(1)",true));

addSchemaColumn(new schemaColumn("prpDPlaneOperatorCode","����Ա����","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("prpDPlaneOperateDTime","����ʱ��","VARCHAR2(16)",true));

addSchemaColumn(new schemaColumn("prpDPlaneFlag","���ñ�־�ֶ�","VARCHAR2(10)",true));



//addSchemaColumn(new schemaColumn("fhReinsTreatyNo","��Լ����","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhReinsReinsCode","�ٱ��˱���","VARCHAR2(10)",false));
addSchemaColumn(new schemaColumn("fhReinsReinsName","�ٱ�������","VARCHAR2(40)",true));
addSchemaColumn(new schemaColumn("fhReinsShareRate","���ܷݶ�","NUMBER(9,6)",true));
addSchemaColumn(new schemaColumn("fhReinsBrokerFlag","����","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhReinsFlag","Flag","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhTreatyTreatyNo","��Լ����","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhTreatyExTreatyNo","����ת�ĺ�Լ����","VARCHAR2(8)",true));
addSchemaColumn(new schemaColumn("fhTreatyOptType","OptType","VARCHAR2(2)",true));
addSchemaColumn(new schemaColumn("fhTreatyRefNo","��Լ���","VARCHAR2(60)",false));
addSchemaColumn(new schemaColumn("fhTreatyTreatyName","��Լȫ��","VARCHAR2(120)",true));
addSchemaColumn(new schemaColumn("fhTreatyTreatyEName","��ԼӢ������","VARCHAR2(255)",true));
addSchemaColumn(new schemaColumn("fhTreatyCleanMode","���巽ʽ","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhTreatyReckonDate","�������","NUMBER(8)",true));
addSchemaColumn(new schemaColumn("fhTreatyCloseMode","���巽ʽת��","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhTreatyCloseDate","�ر�����","Date",true));
addSchemaColumn(new schemaColumn("fhTreatyTreatyType","��Լ����","VARCHAR2(2)",true));
addSchemaColumn(new schemaColumn("fhTreatyUwYear","ҵ�����","VARCHAR2(4)",false));
addSchemaColumn(new schemaColumn("fhTreatyStartDate","��Լ����","DATE",false));
addSchemaColumn(new schemaColumn("fhTreatyEndDate","��Լֹ��","DATE",true));
addSchemaColumn(new schemaColumn("fhTreatyExtendDate","��ת����","DATE",true));
addSchemaColumn(new schemaColumn("fhTreatyLogoutDate","��ʱע��֪ͨ����","DATE",true));
addSchemaColumn(new schemaColumn("fhTreatyRePremiumBase","�ֱ��ѻ���","VARCHAR2(2)",false));
addSchemaColumn(new schemaColumn("fhTreatyCalculateBase","�������","VARCHAR2(1)",false));
addSchemaColumn(new schemaColumn("fhTreatyReinsureBase","�ֱ�����","VARCHAR2(1)",false));
addSchemaColumn(new schemaColumn("fhTreatyCurrency","����","VARCHAR2(3)",true));
addSchemaColumn(new schemaColumn("fhTreatyLimitValue","��Լ�޶�","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyReinsureRate","�ֳ�����","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyRetentionValue","���������","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyLowerLimitValue","��Լ����","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyLargeLossFlag","����","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhTreatyLargeLossValue","�ش��ⰸ֪ͨ��","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyControlFlag","��ͬ����/�������","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhTreatyCashLossFlag","CashLossFlag","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhTreatyCashLossValue","�ֽ����֪ͨ��","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyAccDate","��������","NUMBER(8)",true));
addSchemaColumn(new schemaColumn("fhTreatyDueDate","�Ḷ����","NUMBER(8)",true));
addSchemaColumn(new schemaColumn("fhTreatyCreditLetter","����֤��ʶ","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhTreatyCreditLetterNo","����֤��","VARCHAR2(30)",true));
addSchemaColumn(new schemaColumn("fhTreatyLowerCommRate","������������","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyUpperCommRate","������������","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyBasePayRate","��׼�⸶��","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyAdjustRate","�⸶��ÿ�䶯ֵ","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyAdjustCommRate","�������ʵ���ֵ","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyXLTreatyNo","�����Լ������","VARCHAR2(10)",true));
addSchemaColumn(new schemaColumn("fhTreatyXLTreatyLev","�����Լ�Ĳ㼶��ϵ","NUMBER(8)",true));
addSchemaColumn(new schemaColumn("fhTreatyEGPI","Ԥ���������루�����Լ��","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyEstiRePremium","Ԥ���ֱ���","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyXLRate","���ʣ������Լ��","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyPayRePremium","Ԥ���ֱ��ѣ������Լ��","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyPayLowRePremium","��ͷֱ��ѣ������Լ��","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyResumeTime","���λָ������������Լ��","NUMBER(8)",true));
addSchemaColumn(new schemaColumn("fhTreatyResumePremium","���λָ����ѣ������Լ��","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhTreatyAccPeriod","�ʵ�����","VARCHAR2(8)",true));
addSchemaColumn(new schemaColumn("fhTreatyCommRate","�����ѱ���(��)","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyCoinsLimitRate","����ҵ�����Ʊ���(��)������Լ��","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyPartLimitRate","�ɶ�ҵ�����Ʊ���(��)������Լ��","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyInLimitRate","����ҵ�����Ʊ���(��)������Լ��","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyInShareRate","�������(��)�������Լ��","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhTreatyInReinsCode","�ֳ��˱��루�����Լ��","VARCHAR2(10)",true));
addSchemaColumn(new schemaColumn("fhTreatyBroker","�����˱��루�����Լ��","VARCHAR2(10)",true));
addSchemaColumn(new schemaColumn("fhTreatyExchangeFlag","�Ƿ��ǽ�����Լ�������Լ��","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhTreatyExtendFlag","��ת��־","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhTreatyStateFlag","��Լ״̬","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhTreatyRemarks","��ע","VARCHAR2(255)",true));
addSchemaColumn(new schemaColumn("fhTreatyCreaterCode","������","VARCHAR2(10)",true));
addSchemaColumn(new schemaColumn("fhTreatyCreateDate","��������","DATE",true));
addSchemaColumn(new schemaColumn("fhTreatyUpdaterCode","�޸���","VARCHAR2(10)",true));
addSchemaColumn(new schemaColumn("fhTreatyUpdateDate","����޸�����","DATE",true));
addSchemaColumn(new schemaColumn("fhTreatyUnderwriteCode","�����","VARCHAR2(10)",true));
addSchemaColumn(new schemaColumn("fhTreatyUnderwriteEndDate","�������","DATE",true));
addSchemaColumn(new schemaColumn("fhTreatyFlag","��־�����ã�","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhFinalReinsTreatyNo","TreatyNo","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhFinalReinsReinsCode","�ٱ��˱���","VARCHAR2(10)",false));
addSchemaColumn(new schemaColumn("fhFinalReinsReinsName","�ٱ�������","VARCHAR2(40)",true));
addSchemaColumn(new schemaColumn("fhFinalReinsFReinsCode","���ս����˱���","VARCHAR2(10)",false));
addSchemaColumn(new schemaColumn("fhFinalReinsFReinsName","���ս���������","VARCHAR2(40)",true));
addSchemaColumn(new schemaColumn("fhFinalReinsShareRate","���ܷݶ�","NUMBER(9,6)",true));
addSchemaColumn(new schemaColumn("fhFinalReinsFlag","Flag","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhSectionTreatyNo","TreatyNo","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhSectionSectionNo","������","VARCHAR2(1)",false));
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

//addSchemaColumn(new schemaColumn("fhRiskTreatyNo","��Լ����","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhRiskSectionNo","��Լ�������","VARCHAR2(1)",false));
addSchemaColumn(new schemaColumn("fhRiskRiskCode","���ִ���","VARCHAR2(4)",false));
addSchemaColumn(new schemaColumn("fhRiskFlag","Flag","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhExItemKindTreatyNo","��Լ����","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhExItemKindSectionNo","��Լ�������","VARCHAR2(1)",false));
addSchemaColumn(new schemaColumn("fhExItemKindRiskCode","����","VARCHAR2(4)",false));
addSchemaColumn(new schemaColumn("fhExItemKindItemKind","�������","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhExItemKindItemKindDesc","�����������","VARCHAR2 (120)",true));
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

addSchemaColumn(new schemaColumn("fhPriorityUwYear","���","VARCHAR2(4)",false));
addSchemaColumn(new schemaColumn("fhPriorityTreatyNo","��Լ����","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhPriorityTreatyName","��Լȫ��","VARCHAR2(120)",true));
addSchemaColumn(new schemaColumn("fhPriorityPriorityNo","˳���","NUMBER(8)",false));
addSchemaColumn(new schemaColumn("fhPriorityFlag","Flag","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhCommRateTreatyNo","TreatyNo","VARCHAR2(8)",false));
//addSchemaColumn(new schemaColumn("fhCommRateSerialNo","SerialNo","NUMBER(8)",false));
addSchemaColumn(new schemaColumn("fhCommRateLowPaidRate","����","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhCommRateUpperPaidRate","����","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhCommRateCommRate","CommRate","NUMBER(8,4)",true));
addSchemaColumn(new schemaColumn("fhCommRateFlag","Flag","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhStatiTypeTreatyNo","TreatyNo","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhStatiTypeRiskCode","���ֱ���","VARCHAR2(4)",false));
addSchemaColumn(new schemaColumn("fhStatiTypeKindCode","�ձ����","VARCHAR2(3)",false));
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

addSchemaColumn(new schemaColumn("fhRetenCollateUwYear","ҵ�����","VARCHAR2(4)",false));
addSchemaColumn(new schemaColumn("fhRetenCollateRiskCode","����","VARCHAR2(4)",false));
addSchemaColumn(new schemaColumn("fhRetenCollateRiskLevel","���յȼ�","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhRetenCollateRiskClass","�������","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhRetenCollateGrade","���ּ���","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhRetenCollateRetenFlag","������ʶ","VARCHAR2(1)",false));
addSchemaColumn(new schemaColumn("fhRetenCollateRiskLevelDesc","���յȼ�����","VARCHAR2(255)",true));
addSchemaColumn(new schemaColumn("fhRetenCollateLastUwYear","LastUwYear","VARCHAR2(4)",true));
addSchemaColumn(new schemaColumn("fhRetenCollateLastRiskLevel","LastRiskLevel","VARCHAR2(3)",true));
addSchemaColumn(new schemaColumn("fhRetenCollateLastRiskClass","LastRiskClass","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhRetenCollateLastGrade","LastGrade","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhRetenCollateLastRetenFlag","LastRetenFlag","VARCHAR2(1)",true));
addSchemaColumn(new schemaColumn("fhRetenCollateLastRiskLevelDesc","LastRiskLevelDesc","VARCHAR2(255)",true));
addSchemaColumn(new schemaColumn("fhRetenCollateRemarks","Remarks","VARCHAR2(255)",true));
addSchemaColumn(new schemaColumn("fhRetenCollateFlag","Flag","VARCHAR2(10)",true));

addSchemaColumn(new schemaColumn("fhRetenUwYear","ҵ�����","VARCHAR2(4)",false));
addSchemaColumn(new schemaColumn("fhRetenRiskCode","����","VARCHAR2(4)",false));
addSchemaColumn(new schemaColumn("fhRetenRiskLevel","���յȼ�","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhRetenRiskLevelDesc","���յȼ�����","VARCHAR2(255)",false));
addSchemaColumn(new schemaColumn("fhRetenRiskClass","�������","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhRetenRiskClassDesc","�����������","VARCHAR2(255)",true));
addSchemaColumn(new schemaColumn("fhRetenGrade","���ּ���","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhRetenCurrency","����","VARCHAR2(3)",true));
addSchemaColumn(new schemaColumn("fhRetenRetentionValue","������","NUMBER(14,2)",true));
addSchemaColumn(new schemaColumn("fhRetenStartDate","��ʼ����","Date",true));
addSchemaColumn(new schemaColumn("fhRetenEndDate","��ֹ����","Date",true));
addSchemaColumn(new schemaColumn("fhRetenRemarks","Remarks","VARCHAR2(255)",true));
addSchemaColumn(new schemaColumn("fhRetenRetenFlag","������ʶ","VARCHAR2(1)",false));
addSchemaColumn(new schemaColumn("fhRetenFlag","Flag","VARCHAR2(10)",true));

//addSchemaColumn(new schemaColumn("fhExchRateTreatyNo","TreatyNo","VARCHAR2(8)",false));
addSchemaColumn(new schemaColumn("fhExchRateExchDate","ExchDate","Date",false));
addSchemaColumn(new schemaColumn("fhExchRateBase","Base","NUMBER(8)",true));
addSchemaColumn(new schemaColumn("fhExchRateBaseCurrency","BaseCurrency","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhExchRateExchCurrency","ExchCurrency","VARCHAR2(3)",false));
addSchemaColumn(new schemaColumn("fhExchRateExchRate","ExchRate","NUMBER(10,6)",true));
addSchemaColumn(new schemaColumn("fhExchRateValidStatus","ValidStatus","VARCHAR2(1)",false));
addSchemaColumn(new schemaColumn("fhExchRateFlag","Flag","VARCHAR2(2)",true));