 /***************************************************************************
	 * 
	 * DESC ���ʵ�������غ���
	 * 
	 * AUTHOR ��old
	 * 
	 * CREATEDATE ��2004-05-28
	 * 
	 */


function fzPlanMainModi(){
	setPrpSerialNo();
	   var fzAccbalance = formatNumberToDouble(fm.balance.value);
	    var fzPlanMainbalance = 0;  
	 for(i=1;i<fm.fzPlanMainSerialNo.length;i++){
        fzPlanMainbalance=fzPlanMainbalance + formatNumberToDouble(fm.fzPlanMainBalance[i].value);
        }
       fzPlanMainbalance = ""+ fzPlanMainbalance;
       fzPlanMainbalance = fixNumber(fzPlanMainbalance);
       if((fzAccbalance!=fzPlanMainbalance)){
           alert("�����ʵ����������ʵ�����,�����µ���");
           return false;	
 // modify begin 2006-08-16 by luzhonghua �����˵�ҳ���޸�
           }else
           {
            saveAccIn()	
// modify end 2006-08-16 by luzhonghua �����˵�ҳ���޸�
           }
}


function setPrpSerialNo()
{
	 for(i=1;i<fm.fzPlanMainSerialNo.length;i++)
  {
    fm.fzPlanMainSerialNo[i].value = i;
    var planMainAccNo = fm.fzPlanMainAccno[i].value;
    var planMainCurrency = fm.fzPlanMainCurrency[i].value;  
    var PlanMainCurrNo  = fm.fzPlanMainCurrNo[i].value;      
    var PlanMainRemarks  = fm.fzPlanMainRemarks[i].value;      
    var PlanMainFlag  = fm.fzPlanMainFlag[i].value;     
    var PlanMainReinsCode  = fm.fzPlanMainReinsCode[i].value;
    var PlanMainFReinsCode  = fm.fzPlanMainFReinsCode[i].value;   
    var PlanMainReinsName  = fm.fzPlanMainReinsName[i].value;  
    var PlanMainFReinsName  = fm.fzPlanMainFReinsName[i].value;   
    var PlanMainSettleStatus  = fm.fzPlanMainSettleStatus[i].value; 
    var PlanMainSettleNo  = fm.fzPlanMainSettleNo[i].value;
    var PlanMainReinsNo  = fm.fzPlanMainReinsNo[i].value;    
    var PlanMainPayTimes  = fm.fzPlanMainPayTimes[i].value;     
    var PlanMainShareRate  = fm.fzPlanMainShareRate[i].value;    
    var PlanMainPaidValue  = fm.fzPlanMainPaidValue[i].value;   
// modify begin 2006-08-16 by luzhonghua �����˵�ҳ���޸�
  if(i<fm.fzPlanMainAccno.length-1)
   {
// modify end 2006-08-16 by luzhonghua �����˵�ҳ���޸�
    fm.fzPlanMainAccno[i+1].value = planMainAccNo;
    fm.fzPlanMainCurrency[i+1].value = planMainCurrency;  
    fm.fzPlanMainCurrNo[i+1].value =PlanMainCurrNo;   
    fm.fzPlanMainRemarks[i+1].value =PlanMainRemarks;  
    fm.fzPlanMainFlag[i+1].value=PlanMainFlag;     
    fm.fzPlanMainReinsCode[i+1].value=PlanMainReinsCode;
    fm.fzPlanMainFReinsCode[i+1].value=PlanMainFReinsCode;   
    fm.fzPlanMainReinsName[i+1].value =PlanMainReinsName; 
    fm.fzPlanMainFReinsName[i+1].value=PlanMainFReinsName;   
    fm.fzPlanMainSettleStatus[i+1].value =PlanMainSettleStatus;
    fm.fzPlanMainSettleNo[i+1].value  =PlanMainSettleNo; 
    fm.fzPlanMainReinsNo[i+1].value   =PlanMainReinsNo;  
    fm.fzPlanMainPayTimes[i+1].value  =PlanMainPayTimes;
    fm.fzPlanMainShareRate[i+1].value =PlanMainShareRate;
    fm.fzPlanMainPaidValue[i+1].value =PlanMainPaidValue;
    fm.serialNo.value=i+1;
// modify begin 2006-08-16 by luzhonghua �����˵�ҳ���޸�
  } 
// modify end 2006-08-16 by luzhonghua �����˵�ҳ���޸�
  }
}  

function prpPlanMainAdd()
{   
	insertRow('FzPlanMainArr','FzPlanMainArr_Data');
	setPrpSerialNo();
}   
    
     
// modify begin 2006-08-16 by luzhonghua �����˵�ҳ���޸�
// ɾ��һ��
function deleteAddress(field,intPageDataKeyCount,intRowCount)
{
   var arrayAddressNo = new Array();
  var strFieldName = field.name;
  var intAddressNo = 0;
  var index = 0;
  var i = 0;

  // �õ�������
  for(i=1;i<fm.all(strFieldName).length;i++)
  {
    if(fm.all(strFieldName)[i]==field)
    {
      index = i;
      break;
    }
  }
  intAddressNo = parseInt(fm.fzPlanMainSerialNo[index].value,10);

  try
  {
    arrayAddressNo = getAddressNoFromItemKind();
    for(i=0;i<arrayAddressNo.length;i++)
    {
      if(intAddressNo==parseInt(parseInt(arrayAddressNo[i],10)))
      {
        errorMessage("�õ�ַ�ڱ����Ϣ���Ѵ��ڣ�����ɾ����");
        return;
      }
    }
  }
  catch(e)
  {
  }
  deleteRow('FzPlanMainArr',field.name,intPageDataKeyCount,intRowCount)
  // setAddressNo();
  // setAddressNum();
}
// ɾ�����ư�ť���Ƶ���
// ҳ���ƣ��ֶΣ�����ҳ�п��ư�ť�ĸ���������ҳ��ÿ�����ư�ť�Ŀ��Ƶ�TR�ĸ���
function deleteRow(PageCode,Field,intPageDataKeyCount,intRowCount)
{
  if (intPageDataKeyCount==null)
  {
    intPageDataKeyCount = 1;
  }

  if (intRowCount==null)
  {
    intRowCount = 1;
  }

  var intIndex = parseInt(getElementOrder(Field),10)-1;  // ˳���Ϊ��0��ʼ
  var oTBODY   = document.all(PageCode).tBodies.item(0);
  // var oTBODY = document.getElementById(PageCode).tBodies.item(0);
  // intIndex = intIndex - intPageDataKeyCount; //ȥ���������еĿ��ư�ť�ĸ���

  for(var i=0;i<intRowCount;i++)
  {
    oTBODY.deleteRow(intIndex*intRowCount);
    // deleteRow(intIndex*intRowCount);
  }
}
// modify end 2006-08-16 by luzhonghua �����˵�ҳ���޸�


function genAcc(acctype)
{		alert("��ʼ�����˵�"+acctype);
	   var count = 0;
	   var ilength = fm.chooseflag.length;

	   if (acctype != "" && acctype.substring(0,1) != "T")
	   {
	       for(var i=1;i<ilength;i++)
	       {
	           if(fm.chooseflag[i].checked == true)
	           {
	        	 fm.repolicyno1.value = fm.rePolicyNo[i].value;
	              break;
	           }
	       }

	       for(i=1;i<ilength;i++)
	       {
	           if(fm.chooseflag[i].checked == true)
	           {
	               count = count + 1;
	               str = fm.approve[i].value;
	           }
	       }

	       if(count==0) {
	           alert("��ѡ���ʵ�");
	           return false;
	       } else {
	       	   if(str=="δ����"||str=="������") {
	       	   	  alert("�ֱ�ҵ��δ����,���������ʵ�");
	       	   	  return false;
	       	   }
	       }

	   }

	   fm.acctype.value=acctype;
	   var oldTarget = fm.target;
	   alert("׼������̨")
	      fm.action="/reins/genAcc.do";
	      if(acctype != "FB"){
	        fm.target = "_new"; // ��ҳ���ܵ�����ҳ�����ύ
	   }
	   fm.submit();
	   fm.target = oldTarget;
}

  function genTtyAcc(accType){
    var oldTarget = fm.target;
    fm.action = "/reins/ttyAcc.do?actionType=genTtyAcc" + accType;
    fm.targer = "_new"; // ��ҳ���ܵ�����ҳ�����ύ
    fm.submit();
    fm.target = oldTarget;
  }
  // �������˵�����ʱ�Ŀ���
  function genTtyAccChecke(accType,name){
	    progressStart()
	    var oldTarget = fm.target;
	    // document.getElementById("tryAcc").innerHTML="�����˵����ݽ϶࣬�����ĵȴ��˵����ɣ���رմ�ҳ�棬���ɳɹ������ʾ�ɹ���Ϣ...";
	    name.disabled="disabled";
	    fm.action = "/reins/ttyAcc.do?actionType=genTtyAcc" + accType;
	    fm.targer = "_new"; // ��ҳ���ܵ�����ҳ�����ύ
	    fm.submit();
	    fm.target = oldTarget;
}
function genAccIn(acctype)

{

   // fm.acctype.value=acctype;
	 // var oldTarget = fm.target;
 
      fm.action="/reins/genAccIn.do";
      fm.target = "_new"; // ��ҳ���ܵ�����ҳ�����ύ
   fm.submit();
  // fm.target = oldTarget;
}

function dispTreatyInfo(acctype)

{

	 var findFlag = 0;

	 var count = 0;

   var ilength = fm.chooseflag.length;

   for(i=1;i<ilength;i++)

   {

        if(fm.chooseflag[i].checked==true)

        {

        	   count = count + 1;

        	   if(fm.approve[i].value=="δ����")

        	   {

        	   	    findFlag = 1;

        	   	    break;

        	   }

             fm.repolicyno1.value = fm.rePolicyNo[i].value;
             // *add begin huangyq 20060510 20060303_033*/
             fm.sCurrency.value=fm.currency[i].value;
             fm.sumTotal1.value=fm.sumTotal[i].value;
             // *add end huangyq 20060510 20060303_033*/
             break;

        }

   }

   if(count==0)

   {

   	   alert("��ѡ����ⰸ");

   	   return false;

   }

   if(findFlag==1)

   {

       alert("���ⰸδ����,���������ʵ�");

       return false;

   }

    fm.acctype.value=acctype;

    fm.action="/reins/dispTreaty.do";

    fm.submit();

}



/**
 * 
 * �޸��ʵ�У��
 * 
 */

function fzItemPlanModi(ivoption)

{

   fm.modType.value = ivoption;

   fm.action="/reins/calAccPlan.do";

   fm.submit();



}



function saveAcc()

{
  var fzAccbalance = formatNumberToDouble(fm.fzAccBalance.value);

  var itemvalue = 0;

  var fzPlanMainbalance = 0;

  var fzPlanDetailItemValue = 0;

  // �����ʵ���itemvalue���ܺ�

  for (i=1;i<fm.fzItemItemValue.length;i++)

  {

    if (isNaN(formatNumberToDouble(fm.fzItemItemValue[i].value)))

      fm.fzItemItemValue[i].value = "0";

    if(fm.fzItemItemFlag[i].value=="C")

    {



        itemvalue = itemvalue + formatNumberToDouble(fm.fzItemItemValue[i].value);

    }

    else

    {

        itemvalue = itemvalue - formatNumberToDouble(fm.fzItemItemValue[i].value);

    }

  }

  itemvalue = "" + itemvalue;

  itemvalue = fixNumber(itemvalue);

  itemvalue = parseFloat(itemvalue);
  if(fm.accType.value.substring(1,2)==1 || fm.accType.value.substring(1,2)==2)

  {
      if(fzAccbalance==itemvalue)

      { 
          fm.action="/reins/modAcc.do";
          fm.submit();
          return;
      }

      else

      {

          alert("�����ʵ����������ʵ�����,�����µ���");

          return false;

      }

  }
  // ����planMain

  for (i=1;i<fm.fzPlanMainBalance.length;i++)

  {

      if (isNaN(formatNumberToDouble(fm.fzPlanMainBalance[i].value)))

          fm.fzPlanMain_balance[i].value = "0";

          fzPlanMainbalance	= fzPlanMainbalance + formatNumberToDouble(fm.fzPlanMainBalance[i].value);

  }

  fzPlanMainbalance = ""+ fzPlanMainbalance;

  fzPlanMainbalance = fixNumber(fzPlanMainbalance);

  // ����plandetail

  for (i=1;i<getElementCount("fzPlanDetailItemValue",fm);i++)

  {

      if (isNaN(formatNumberToDouble(fm.fzPlanDetailItemValue[i].value)))

          fm.fzPlanDetailItemValue[i].value = "0";

      if(fm.fzPlanDetailItemFlag[i].value=="C")

      {

          fzPlanDetailItemValue= fzPlanDetailItemValue + formatNumberToDouble(fm.fzPlanDetailItemValue[i].value);

      }

      else

      {

          fzPlanDetailItemValue= fzPlanDetailItemValue - formatNumberToDouble(fm.fzPlanDetailItemValue[i].value);

      }

  }

  fzPlanDetailItemValue = ""+fzPlanDetailItemValue;

  fzPlanDetailItemValue = fixNumber(fzPlanDetailItemValue);

  if((fzAccbalance == itemvalue)&&(fzAccbalance==fzPlanMainbalance)&&(fzAccbalance==fzPlanDetailItemValue))

  {

      fm.action="/reins/modAcc.do";

      fm.submit();

  }

  else

  {

      alert("�����ʵ����������ʵ�����,�����µ���");

      return false;

  }

}

function saveAccIn(){
	 
	  fm.action="/reins/modAcc.do";

      fm.submit();
	}

function getExchRate()

{

    fm.action="/reins/getExchRate.do";

    fm.submit();

}



function fixNumber(cellStr)

{

  if(parseFloat(cellStr) == 0)

      return '0';

  if(cellStr.indexOf('.')==-1)

    return cellStr;

  var x = parseFloat(cellStr);

  x += (parseFloat(cellStr) < 0) ? -0.000000005 : 0.000000005;

  // Chop the string to 4 decimal places.

  cellStr = "" + x;

  cellStr = cellStr.substring(0, 5 + cellStr.indexOf('.'));

  // Remove trailing zeros beyond the decimal point.

  cellStrArr = cellStr.split("");

  for(k=cellStrArr.length-1; k > 0 && cellStrArr[k] == '0'; --k)

  cellStrArr[k] = 'X';

  cellStr = "";

  for(k=0; k<cellStrArr.length && cellStrArr[k] != 'X'; ++k)

  cellStr += cellStrArr[k];

  return cellStr;

}

// ��ȡ�����ʵ��ĺ�ͬ��Ϣ
function selectAccPeriod(acctype,accKind)
{
    var operateType = document.getElementById("operateType");
    var ilength     = fm.chooseflag.length;
    var i           = 0;
    var choosecount = 0;
    var treatyNo    = "";
    var refNo       = "";
	if(acctype != "TBBatch" && acctype != "TRBatch"){
	    for(i=1;i<ilength;i++)
	    {
	        if(fm.chooseflag[i].checked)
	        {
	            treatyNo = fm.chooseflag[i].value;
	            refNo = fm.refNo[i].value;
	            choosecount = choosecount+1;
	            break;
	        }
	    }
	
	    if(choosecount==0)
	    {
	        alert("��ѡ���ͬ");
	        return false;
	    }
	}

    fm.acctype.value = acctype;
    if(operateType.value=="Commission"){
      fm.action="/reins/ttyAcc.do?actionType=showAccClosePeriod&accType=" + acctype + "&treatyNo=" + treatyNo + "&refNo=" + refNo;
    }else{
      if(acctype == "TBBatch" || acctype == "TRBatch"){// �����ʵ���������
      	fm.action="/reins/getAccPeriod.do?accType=" + acctype + "&accKind=" + accKind;
      }else{
	    fm.action="/reins/getAccPeriod.do?operateType=AccPeriod&accType=" + acctype + "&treatyNo=" + treatyNo + "&refNo=" + refNo + "&accKind=" + accKind;
      }
    }
    fm.submit();
}

/*
 * //add by zhangjiayu begin 2013-11-11 //�¶��˵�����ת�ո� function
 * settleBatch(acctype,acckind){ alert("000"); if(acctype == "TBBatchSettle"){
 * fm.action="/reins/getAccPeriod.do?accType=" + acctype + "&accKind=" +
 * accKind; }else{ return false; } fm.submit(); }
 */

/*
 * //�ٱ�ϵͳ������� function accTty(acctype) {
 * 
 * 
 * var oldTarget = fm.target; fm.action="/reins/accTty.do?actionType=" +
 * acctype; fm.target = "_new"; //��ҳ���ܵ�����ҳ�����ύ fm.submit(); fm.target =
 * oldTarget; }
 */

// add end

 // ɾ���ʵ�

 function deleteAcc(accNo,accType)

 {
 	var ret =window.confirm("��ȷ��ɾ���ʵ�"+accNo+"��?");

 	if (!ret)
 	{
 		return;
 	}
 	// modify begin by zhaijq 20060301 ɾ���ʵ�ͬʱɾ����ϸ��
	// FIX0425 modify by zhupengju begin ��ϸ�ʵ�Ĭ��ɾ�� ������ʾ��
 	// ret =window.confirm("�Ƿ�ͬʱɾ����ϸ�ʵ���");
	// FIX0425 modify by zhupengju end ��ϸ�ʵ�Ĭ��ɾ�� ������ʾ��
 	if (!ret)
 	{
 		fm.action = "/reins/getAcc.do?accNo="+accNo+"&type1=Delete&accType="+accType+"&DeleteDetail=N";
 	}else{
 	    fm.action = "/reins/getAcc.do?accNo="+accNo+"&type1=Delete&accType="+accType+"&DeleteDetail=Y";
    }
 	// modify end by zhaijq 20060310
    fm.target = "fraSubmit";
 	fm.submit();
 }



 // �����ʵ��˶�

 function checkAcc(checkType,treatyType)
 {
 	var count    = 0;
 	var i        = 0;
 	var checkNo  = "";
    var treatyNo = "";
    var refNo    = "";

 	checkNo= fm.chooseflag.value;
 	if (treatyType!=""){
 	    treatyNo = fm.treatyNo.value;
    }
    var oldTarget = fm.target;
 	if (treatyType == 'T')
 	{
 	   fm.action="/reins/getAccPeriod.do?type1=Check&treatyNo="+checkNo+"&checkType="+checkType+ "&treatyNo=" + treatyNo + "&refNo=" + refNo;;
 	}
 	else if (treatyType == 'R')
 	{
 	   fm.action="/reins/getAcc.do?type1=Check&repayNo="+checkNo+"&checkType="+checkType;
       fm.target="_new";
 	}
 	else
 	{
 	   // modify begin by zhaijq 2005-12-14 �����ʺ˶Ժ�̨ȡ������Լ��
 	   fm.action="/reins/getAcc.do?type1=Check&checkType="+checkType;
 	   // modify end by zhaijq 2005-12-14
       fm.target="_new";
 	}
 	fm.submit();
    fm.target=oldTarget;
 }

 function checkFacAcc(checkType,treatyType)

 {

 	var count   = 0;

 	var i       = 0;

 	var checkNo = "";
    var oldTarget = fm.target;

 	for (i = 1;i<fm.chooseflag.length;i++)

 	{

 		if (fm.chooseflag[i].checked ==true)

 		{

 			count++;

 			checkNo= fm.chooseflag[i].value;

 			break;

 		}

 	}

 	if (count == 0)

 	{

 		alert("��ѡ��һ�");

 		return;

 	}

 	if (treatyType == 'T')

 	{

 	   fm.action="/reins/getAccPeriod.do?type1=Check&treatyNo="+checkNo+"&checkType="+checkType;
       fm.target="_new";
 	}

 	else if (treatyType == 'R')

 	{

 	   fm.action="/reins/getAcc.do?type1=Check&repayNo="+checkNo+"&checkType="+checkType;
       fm.target="_new";
 	}

 	else
 	{
 	   fm.action="/reins/getAcc.do?type1=Check&recertifyNo="+checkNo+"&checkType="+checkType;
       fm.target="_new";
 	}
 	fm.submit();
 	fm.target=oldTarget;

 }



 // ��ӡ��ͬ����嵥

 function printAcc(printType)

 {

 	var ilength = fm.chooseflag.length;

 	var treatyNo;
 	var refNo;

 	var count = 0;

    for(i=1;i<ilength;i++)

    {

        if(fm.chooseflag[i].checked == true)

        {
           treatyNo = fm.chooseflag[i].value;

           refNo = fm.refNo[i].value;

           count++;

           break;

        }

    }

    if (count == 0)

    {

    	alert("���������ѡ��һ���ͬ");

    	return;

    }
    if (printType =="AccFRDetailQuery" || printType =="AccFRRepayDetailQuery" || printType == "AccFRRepayDetailOutStandingQuery")
    {
      fm.action="/reins/accTtyRepolicyPrint.do?operateType="+printType+"&treatyNo="+treatyNo;
    }else {
      fm.action="/reins/accTtyRepolicyPrint.do?operateType=AccPeriod&printType="+printType+"&treatyNo="+treatyNo+"&refNo="+refNo;
    }

    fm.submit();

 }



  // ��ӡ��ͬ�ֱ��嵥
 function printTtyList()
 {
 	var treatyNo     = fm.treatyNo.value;
 	// var sectionNo = fm.sectionNo.value;
 	var accPeriod    = fm.accPeriod.value;
 	var printType    = fm.printType.value;
 	var businessFlag = "";
 	var comCode      = "";
 	var sectionNo    = "";
 	var strAccKind   = "";   // add by chends 20060220 �˵�����G,D,B
	
	// modify by liuhaiqi begin 2007-03-20 �ʵ��ϲ���ӡ
 	if (printType == 'BatchB' || printType == 'BatchR' || printType.substr(1,2) == 'B' || printType.substr(1,2) == 'R'||printType=='payAcc' 
 		|| printType == 'NEWTR' || printType == 'NEWTRByCurrency'||printType=='MergeBatchR' || printType == 'LeadingFee')
 	{
 	// modify by liuhaiqi end 2007-03-20 �ʵ��ϲ���ӡ
 	
      // ��ʱע����Լ��ϸ�嵥��ӡ����
 	  // businessFlag = fm.businessFlag.value;
 	  sectionNo    =fm.sectionNo.value;
 	 // modify begin by zhangTC 20060427 ����ţ�20060418_001 �����Լ������ϸ�˵���ӡ
 	 // modify begin by fengbo 20070326 �����ϸ���嵥��ӡ
 	}else if(printType != 'TtyBatch'&& printType != 'NEWTRDetailByCurrency')
 	 // modify end by fengbo 20070326 �����ϸ���嵥��ӡ
    {
      if(printType != 'payacc')
      {
    	  businessFlag = fm.businessFlag.value;
          comCode      = fm.comCode.value;
 	      sectionNo    = fm.sectionNo.value;
 	    }  
    }
    // modify end by zhangTC 20060427 ����ţ�20060418_001 �����Լ������ϸ�˵���ӡ
    // Ԥ���ʵ�ȡԤ���ʵ���
    // if (printType == 'BatchB' )
    // {
	// accPeriod = fm.estimateAccPeriod.value;
	// }
  // modify by liuhaiqi begin 2007-03-20 �ʵ��ϲ���ӡ
 	if (printType == 'BatchB' || printType == 'BatchR' ||printType=='MergeBatchR' || printType == 'LeadingFee')
 	// modify by liuhaiqi end 2007-03-20 �ʵ��ϲ���ӡ
 	{
 		var remarks=fm.remarks.value;
 		var oldTarget = fm.target;
        fm.action="/reins/accTtyBatchPrint.do";
        fm.target = "_new";
        fm.submit();
        fm.target=oldTarget;
 		// window.open("/reins/accTtyBatchPrint.do?treatyNo="+treatyNo+"&accPeriod="+accPeriod+"&printType="+printType+"&remarks="+remarks);
 	}else if (printType == 'P')
 	{
        // window.open("/reins/accTtyRepolicyPrint.do?treatyNo="+treatyNo+"&accPeriod="+accPeriod+"&businessFlag="+businessFlag+"&sectionNo="+sectionNo+"&comCode="+comCode+"");
        var oldTarget = fm.target;
        fm.action="/reins/accTtyRepolicyPrint.do";
        fm.target = "_new";
        fm.submit();
        fm.target=oldTarget;
    }else if (printType == 'E')
 	  {
        // window.open("/reins/accTtyReendorPrint.do?treatyNo="+treatyNo+"&accPeriod="+accPeriod+"&businessFlag="+businessFlag+"&sectionNo="+sectionNo+"&comCode="+comCode+"");
        var oldTarget = fm.target;
        fm.action="/reins/accTtyReendorPrint.do";
        fm.target = "_new";
        fm.submit();
        fm.target=oldTarget;
    }else if (printType == 'Pay')
 	  {
       // window.open("/reins/accTtyRepayLossPrint.do?treatyNo="+treatyNo+"&accPeriod="+accPeriod+"&businessFlag="+businessFlag+"&sectionNo="+sectionNo+"&comCode="+comCode+"");
       var oldTarget = fm.target;
       fm.action="/reins/accTtyRepayLossPrint.do";
       fm.target = "_new";
       fm.submit();
       fm.target=oldTarget;
    }else if (printType == 'OS')
 	  {
       // window.open("/reins/accTtyRepayOSLossPrint.do?treatyNo="+treatyNo+"&accPeriod="+accPeriod+"&businessFlag="+businessFlag+"&sectionNo="+sectionNo+"&comCode="+comCode+"");
       var oldTarget = fm.target;
       fm.action="/reins/accTtyRepayOSLossPrint.do";
       fm.target = "_new";
       fm.submit();
       fm.target=oldTarget;
    }else if (printType.substr(1,2) == 'B')
 	  {
        window.open("/reins/accTtyListPrint.do?treatyNo="+treatyNo+"&accPeriod="+accPeriod+"&printType="+printType);
    }else if (printType.substr(1,2) == 'R')
 	  {
        var sectionNo = fm.sectionNo.value;
        window.open("/reins/accTtyListPrint.do?treatyNo="+treatyNo+"&accPeriod="+accPeriod+"&printType="+printType + "&sectionNo=" + sectionNo);
    }
    else if(printType == 'NEWTR')
    {
    	/*
		 * var acckind = ""; for(i=0;i<fm.acckindradio.length;i++) {
		 * if(fm.acckindradio[i].checked) acckind = fm.acckindradio[i].value; }
		 * if("I"==acckind) accPeriod = fm.estimateAccPeriod.value; var
		 * sectionNo = fm.sectionNo.value; var currency = fm.currency.value; var
		 * treatyNo = fm.treatyNo.value;
		 */
		
		var reins     = fm.reins;		
		var treatyNos  = fm.treatyNoC; 

		// add by cyu begin 2006-05-24
		var treatyNoC = "";
		for(i=0;i<treatyNos.length;i++){
			if(treatyNos[i].checked){
				treatyNoC = treatyNos[i].value;
				break;
			}
		}
		if(treatyNoC == "0")
		{
			var reinsCode = reins.value;
			var oldTarget = fm.target;
       		fm.action="/reins/accTtyListPrint.do?&reinsCode=" + reinsCode;
        	fm.target = "_new";
    	    fm.submit();
        	fm.target=oldTarget;
		}
		else if(treatyNoC == "1")
		{
			var oldTarget = fm.target;
       		fm.action="/reins/accTtyListPrint.do";
        	fm.target = "_new";
    	    fm.submit();
        	fm.target=oldTarget;
		/*
		 * var reinsCodeArr = "";//����ƴ�Ӷ�������� for(i = 0; i < reins.length;i++){
		 * if(reins[i].selected == true){ if(reinsCodeArr == "") reinsCodeArr +=
		 * reins[i].value; else reinsCodeArr += ";"+reins[i].value; } }
		 * alert(reinsCodeArr);
		 * 
		 * if(reinsCodeArr == ""){ for(i = 1; i < reins.length;i++){ if(i == 1)
		 * reinsCodeArr += reins[i].value; else reinsCodeArr +=
		 * ";"+reins[i].value; } }
		 * 
		 * var accPeriods = ""; if("I"==acckind) accPeriods = fm.accPeriod; else
		 * accPeriods = fm.estimateAccPeriod; var accPeriodArr = "";//����ƴ�Ӷ���ʵ���
		 * for(i = 0; i < accPeriods.length;i++){ if(accPeriods[i].selected ==
		 * true){ if(accPeriodArr == "") accPeriodArr += accPeriods[i].value;
		 * else accPeriodArr += ";"+accPeriods[i].value; } }
		 * 
		 * window.open("/reins/accTtyListPrint.do?accPeriod=" + accPeriodArr +
		 * "&printType=" + printType + "&reinsCode=" + reinsCodeArr +
		 * "&treatyNoC=" + treatyNoC+"&acckind="+acckind);
		 */
		}
		
		// mod by cyu end 2006-05-24
    }
    else if(printType == 'NEWTRByCurrency')
    {   
        // var currency = fm.businessFlag.value;
        // var currencyLength = fm.businessFlag.options.length;
        // if(currency == '' || currency.length == 0)
        // {
        // for(i = 1; i < currencyLength; i++)
        // {
        // currency += fm.businessFlag.options[i].value + ",";
        // }
        // currency = currency.substr(0,currency.length-1);
        // }
        var oldTarget = fm.target;
        // modify begin by fengbo 20061123
        // fm.action="/reins/accTtyListPrint.do?&currency="+currency;
        // fm.action="/reins/reportPrint.do?reportKind=NEWTRByCurrency&currency="+currency;
        fm.action="/reins/reportPrint.do?reportKind=NEWTRByCurrency";
        // //modify end by fengbo 20061123
        fm.target = "_new";
        fm.submit();
        fm.target=oldTarget;
    }
    // modify begin by zhangTC 20060427 ����ţ�20060418_001 �����Լ������ϸ�˵���ӡ
  else if (printType == 'payacc')
   	{
        // var sectionNo = fm.sectionNo.value;
        var oldTarget = fm.target;
        fm.action="/reins/fzAccItem.do";
        fm.target = "_new";
        fm.submit();
        fm.target=oldTarget;
      // modify end by zhangTC 20060427 ����ţ�20060418_001 �����Լ������ϸ�˵���ӡ
     }else if (printType == 'TtyBatch')// �����ٱ��պ�Լ����Ԥ���ʵ�
 	 {       
 	 	// modify begin by fengbo 20061123 ��ireport��д��Լ����Ԥ�����嵥
 	 	    // var currency = fm.businessFlag.value;
        // var currencyLength = fm.businessFlag.options.length;
        // if(currency == '' || currency.length == 0)
        // {
        // for(i = 1; i < currencyLength; i++)
        // {
        // currency += fm.businessFlag.options[i].value + ",";
        // }
        // currency = currency.substr(0,currency.length-1);
        // }
        
        var oldTarget = fm.target;
        
        
        // fm.action="/reins/accTtyListPrint.do?accKind=" + strAccKind;
        fm.action="/reins/reportPrint.do?reportKind=TtyBatch";
        // modify end by fengbo 20061123 ��ireport��д��Լ����Ԥ�����嵥
        
        fm.target = "_new";
        fm.submit();
        fm.target=oldTarget;
     }
     // modify begin by fengbo 20070326 �����ϸ���嵥��ӡ
     else if(printType == 'NEWTRDetailByCurrency')
    {   
        var oldTarget = fm.target;
        fm.action="/reins/reportPrint.do?reportKind=NEWTRDetailByCurrency";
        fm.target = "_new";
        fm.submit();
        fm.target=oldTarget;
    }
    // modify end by fengbo 20070326 �����ϸ���嵥��ӡ
     // alert(printType.substr(1,2));
 }

  // �����ʵ��Ƿ�ȷ�ϵ���ʾ
   function checkStatus()
  {
  	 var flag = 0;
     for (i=0; i<fm.fzAccFacBranchFlag1.length; i++) 
     {
     	if(fm.fzAccFacBranchFlag1[i].value == "δת�ո�"){
     		flag = 1;
     	}
     }
     if(flag == 0)
     {
     	alert("���ʵ�״̬Ϊ"+fm.fzAccFacBranchFlag1[0].value+",�����ظ�ȷ��!");
		return false;
     } 

 }

  // �ʵ�ת����

 function settle(settleType)

 {

 	var count   = 0;

 	var i       = 0;

 	var checkNo = "";
 	var treatyNo = "";
 	var refNo = "";
  	if(settleType=="F"){
     	    if(checkStatus() ==false){
  	        return false;
     	    }
  	}
  
 	for (i = 1;i<fm.chooseflag.length;i++)
 	{
 		if (fm.chooseflag[i].checked == true)

 		{
 			count++;
 			treatyNo = fm.chooseflag[i].value;
      if(settleType == 'T')
 			{
 			   refNo = fm.refNo[i].value;
 			}
 			checkNo= fm.chooseflag[i].value;
 			break;
 		}
   }



 	if (count == 0)

 	{

 		return;

 	}



 	if (settleType== 'F')

 	{

 	   fm.action="/reins/getAcc.do?type1=Settle&recertifyNo="+checkNo+"&settleType="+settleType;

 	}

 	else if (settleType == 'T')

 	{

 	   fm.action="/reins/getAccPeriod.do?type1=Settle&treatyNo="+checkNo+"&settleType="+settleType + "&refNo=" + refNo;

 	}

 	else

 	{

 	   fm.action="/reins/getAcc.do?type1=Settle&recertifyNo="+checkNo+"&settleType="+settleType;

 	}
 	var oldTarget = fm.target;
 	// fm.target = "_new";

 	fm.submit();
 	fm.target = oldTarget; 
 }



 function checkQueryTreaty()

{

	// var classCode = fm.classCode.value;



	// fm.classCode.value=classCode.toUpperCase();



	fm.submit();

}
// �����˵���ӡ

function checkQueryTreatyTotal(){
	var checkArr = document.getElementsByName("check");
	var checkAll = document.getElementById("checkall");
	var checkFlag = 0;
	if(!checkAll.checked){
		for(i=0;i<checkArr.length;i++){
			if(checkArr[i].checked){
				checkFlag += 1;
			}
		}
		if(checkFlag==0){
			alert("����ѡ��һ���Լ����");
			return false;
		}
	}
	if(document.getElementById("ReinsCode").value.length<=0){
		alert("�������������Ϣ ��");
		return false;
	}else if(document.getElementById("AccPeriod").value.length<=0){
		alert("�������˵��� ��");
		return false;
	}
	fm.action = "/reins/recertifyQueryTotal.do";
	fm.submit();
}

// ����ʵ���˵���ӡ

function checkEarnedQueryTreatyTotal(){
	var checkArr = document.getElementsByName("check");
	var checkAll = document.getElementById("checkall");
	var checkFlag = 0;
	if(!checkAll.checked){
		for(i=0;i<checkArr.length;i++){
			if(checkArr[i].checked){
				checkFlag += 1;
			}
		}
		if(checkFlag==0){
			alert("����ѡ��һ���Լ����");
			return false;
		}
	}
	if(document.getElementById("ReinsCode").value.length<=0){
		alert("�������������Ϣ ��");
		return false;
	}else if(document.getElementById("AccPeriod").value.length<=0){
		alert("�������˵��� ��");
		return false;
	}
	fm.action = "/reins/earnedAccTtyListPrint.do?printType=prepareEarnedTtyAccTotal";
	fm.submit();
}

// ��ӡ��ͬ�����嵥

 function printList(printType)

 {

 	var ilength = fm.chooseflag.length;
 	var treatyNo;
	var refNo;
 	var count = 0;

    for(i=1;i<ilength;i++)
	{
		if(fm.chooseflag[i].checked == true)
		{
			treatyNo = fm.chooseflag[i].value;
			refNo = fm.refNo[i].value;
			count++;
			break;
		}
	}
    if (count == 0)
    {
    	alert("���������ѡ��һ���ͬ");
    	return;
    }

    fm.action="/reins/accTtyListPrint.do?printType="+printType+"&treatyNo="+treatyNo+"&refNo="+refNo;
    fm.submit();
 }

 // �����ʵ�

 function cancel(accType)

 {

 	var accNo = "";

 	var count = 0;

 	if (accType == 'R')

 	{

 		for (var i = 1;i<fm.accNoR.length;i++)

 		{

 			if (fm.accNoR[i].checked==true)

 			{

 				accNo = fm.accNoR[i].value;

 				count++;

 				break;

 			}

 		}

 	}

 	else if (accType == 'B')

 	{

 		for (var i = 1;i<fm.accNoB.length;i++)

 		{

 			if (fm.accNoB[i].checked==true)

 			{

 				accNo = fm.accNoB[i].value;

 				count++;

 				break;

 			}

 		}

 	}

 	if (count == 0)

 	{

 		alert("����������ѡ��һ���ʵ�");

 		return;

 	}

 	fm.action="/reins/getAcc.do?accNo="+accNo+"&type1=Cancel";

 	fm.submit();

 }



 // �����ʵ�ת����

 function settleCancel(accType)

 {

 	var accNo = "";

 	var count = 0;

 	if (accType == 'R')

 	{

 		for (var i = 1;i<fm.accNoR.length;i++)

 		{

 			if (fm.accNoR[i].checked==true)

 			{

 				accNo = fm.accNoR[i].value;

 				count++;

 				break;

 			}

 		}

 	}

 	else if (accType == 'B')

 	{

 		for (var i = 1;i<fm.accNoB.length;i++)

 		{

 			if (fm.accNoB[i].checked==true)

 			{

 				accNo = fm.accNoB[i].value;

 				count++;

 				break;

 			}

 		}

 	}

 	if (count == 0)

 	{

 		alert("����������ѡ��һ���ʵ�");

 		return;

 	}

 	fm.action="/reins/getAcc.do?accNo="+accNo+"&type1=Settle&settleType=Cancel";

 	fm.submit();

 }



 function printSingleAcc(accNo)

 {

 	window.open("/reins/accPrint.do?accNo="+accNo);

 }

 function editAcc(accNo)

 {

 	window.open("/reins/getAcc.do?accNo="+accNo+"&type1=Edit");

 }


 function batchPrint(printType)

 {
 	var count = 0;

 	var treatyNo = "";
 	var refNo;

 	for (var i=1;i<fm.chooseflag.length;i++)

 	{

 		if (fm.chooseflag[i].checked == true)

 		{
 			count++;

 			treatyNo = fm.chooseflag[i].value;
 			refNo = fm.refNo[i].value;

 			break;

 		}

 	}

 	if (count == 0)

 	{

 		alert("��ѡ��һ����ͬ");

 		return;

 	}

 	if (printType == 'B')

 	{

 		fm.action="/reins/accTtyListPrint.do?printType=BatchB&treatyNo="+treatyNo+"&refNo="+refNo;

 	}

 	if (printType == 'R')

 	{

 		fm.action="/reins/accTtyListPrint.do?printType=BatchR&treatyNo="+treatyNo+"&refNo="+refNo;

 	}
 	// add by liuhaiqi begin 2007-03-20 �ʵ��ϲ���ӡ
 	if(printType == 'MergeR') {
 		fm.action="/reins/accTtyListPrint.do?printType=MergeBatchR&treatyNo="+treatyNo+"&refNo="+refNo;
 	}
  // add by liuhaiqi end 2007-03-20 �ʵ��ϲ���ӡ
    if(printType == 'LeadingFee'){
    	fm.action="/reins/accTtyListPrint.do?printType=LeadingFee&treatyNo="+treatyNo+"&refNo="+refNo;
    }
 	fm.submit();

 }



 // ��ʾ�ʵ��б�

 function showAcc()

 {
    var ilength = fm.chooseflag.length;
    for(var i=1;i<ilength;i++)

    {  
        if(fm.chooseflag[i].checked == true)

        {
           spanFzAccB.style.display="";

    	   spanFzAccR.style.display="";

           fm.AccImgB.src="/reins/images/butExpand.gif";

           fm.AccImgR.src="/reins/images/butExpand.gif";

           break;

        }

    }

}

// ���ɺ�ͬ����Ԥ���ʵ�,ת����
function setEstimateAccPeriod(estimateAccPeriodOld)
{
  var strTtyAccPeriod  = fm.accPeriod.value;
  var strUwYear        = strTtyAccPeriod.substring(0,4);
  var intAccPeriod     = strTtyAccPeriod.substring(6,7);
  var strAccPeriodType = strTtyAccPeriod.substring(7,8);
  var elementAccPeriod = fm.estimateAccPeriod;
  // var elementAccPeriodOld = fm.estimateAccPeriodOld.value;
  // add by chends begin 20060220 �ж϶����˵���Ԥ���˵������ڲ���˵���β�����˵�
  // var strPrintType = fm.printType.value;
  // var strAccKind = fm.accKind.value;

  // add by chends end 20060220

      for(var i=elementAccPeriod.options.length-1;i>=0;i--)
      {
        elementAccPeriod.remove(i);
      }
    
      if (strAccPeriodType == "M" || strAccPeriodType == "Y")
      {
        for (i=0;i<12;i++)
        {
          var option = document.createElement("option");
    
          if ((i+1) < 10)
          {
    
            option.text=strUwYear + "-0" + (i+1) + "M";
            if (option.text==estimateAccPeriodOld){
            	option.text=strUwYear + "-0" + (i+1) + "M";
            	option.defaultSelect = true;
            	// alert("11111");
            }
    
            elementAccPeriod.add(option);
          }
          else
          {
            option.text=strUwYear + "-" + (i+1) + "M";
            if (option.text==estimateAccPeriodOld){
            	option.text=strUwYear + "-" + (i+1) + "M";
            	option.defaultSelect = true;
            	// alert("22222");
            }
            elementAccPeriod.add(option);
          }
        }
      }
      if (strAccPeriodType == "Q")
      {
        for (i=(intAccPeriod*3-2); i<=(intAccPeriod*3); i++)
        {
          var option = document.createElement("option");
    
          if (i < 10)
          {
            option.text=strUwYear + "-0" + (i) + "M";
            var Month = "";
            if(fm.Month.value!=""||fm.Month.value!=null)
             {
              Month = fm.Month.value;
             }
             if(Month==i)
             {
               	// option.defaultSelect = true; --Ĭ���¶��ʵ��ڸ�Ϊ�ü��ȵĵ�һ����
             }
            if (option.text==estimateAccPeriodOld){
// modify begin 2006-08-16 by luzhonghua �����˵�ҳ���޸�
            		option.text=strUwYear + "-0" + (i) + "M";
            	option.defaultSelect = true;
            }
            elementAccPeriod.add(option);
          }
          else
          {
            option.text=strUwYear + "-" + (i) + "M";
            if (option.text==estimateAccPeriodOld){
 
// modify end 2006-08-16 by luzhonghua �����˵�ҳ���޸�
            	option.text=strUwYear + "-" + (i) + "M";
            	option.defaultSelect = true;
            }
    
            elementAccPeriod.add(option);
          }
        }
        // var option1 = document.createElement("option");
        // option1.text = strTtyAccPeriod;
        // elementAccPeriod.add(option1);
      }
      if (strAccPeriodType.equals == "H")
      {
        for (i=(intAccPeriod*6-5); i<=(intAccPeriod*6); i++)
        {
          var option = document.createElement("option");
    
          if (i < 10)
          {
            option.text=strUwYear + "-0" + (i) + "M";
            if (option.text==estimateAccPeriodOld){
            	option.text=strUwYear + "-0" + (i+1) + "M";
            	option.selected = true;
            	// alert("55555");
            }
    
            elementAccPeriod.add(option);
          }
          else
          {
            option.text=strUwYear + "-" + (i) + "M";
            if (option.text==estimateAccPeriodOld){
            	option.text=strUwYear + "-" + (i) + "M";
            	option.selected = true;
            	// alert("66666");
            }
            elementAccPeriod.add(option);
          }
        }
      }
    
      for(i=0;i<elementAccPeriod.options.length;i++){
      	if(elementAccPeriod.options[i].defaultSelect == true){
          elementAccPeriod.selectedIndex = i;
      		break;
      	}
      }
  
}
function setPeriodState()
{
	// alert("fm.action()="+fm.action());
	// var oldaction = fm.action();
	var oldTarget = fm.target;
	// alert("00000");
	fm.action="/reins/getPeriodState.do?actionType=accPeriod";
	fm.submit();
	// fm.action=oldaction;
	fm.target = oldTarget;
}

// ��ӡ��ͬ�嵥,���������Ⱥ��´�ӡ
function setPrintEstimateAccPeriod(estimateAccPeriodOld)
{
  var strTtyAccPeriod  = fm.accPeriod.value;
  var strUwYear        = strTtyAccPeriod.substring(0,4);
  var intAccPeriod     = strTtyAccPeriod.substring(6,7);
  var strAccPeriodType = strTtyAccPeriod.substring(7,8);
  var elementAccPeriod = fm.estimateAccPeriod;
  // var elementAccPeriodOld = fm.estimateAccPeriodOld.value;
  // �޸Ķ����ʵ���ӡ����¼�����js����
  if(elementAccPeriod != null){
	  for(var i=elementAccPeriod.options.length-1;i>=0;i--)
	  {
	    elementAccPeriod.remove(i);
	  }
	  if (strAccPeriodType == "M" || strAccPeriodType == "Y")
	  {
	    for (i=0;i<12;i++)
	    {
	      var option = document.createElement("option");
	
	      if ((i+1) < 10)
	      {
	
	        option.text=strUwYear + "-0" + (i+1) + "M";
	        if (option.text==estimateAccPeriodOld){
	        	option.text=strUwYear + "-0" + (i+1) + "M";
	        	option.defaultSelect = true;
	        }
	
	        elementAccPeriod.add(option);
	      }
	      else
	      {
	        option.text=strUwYear + "-" + (i+1) + "M";
	        if (option.text==estimateAccPeriodOld){
	        	option.text=strUwYear + "-" + (i+1) + "M";
	        	option.defaultSelect = true;
	        }
	        elementAccPeriod.add(option);
	      }
	    }
	  }
	  if (strAccPeriodType == "Q")
	  {
	    for (i=(intAccPeriod*3-2); i<=(intAccPeriod*3); i++)
	    {
	      var option = document.createElement("option");
	
	      if (i < 10)
	      {
	        option.text=strUwYear + "-0" + (i) + "M";
	      
	        var Month = "";
	            if(fm.Month.value!=""||fm.Month.value!=null)
	             {
	              Month = fm.Month.value;
	             }
	             if(Month==i)
	             {
	             	option.selected = true;
	             }
	        if (option.text==estimateAccPeriodOld){
	// modify begin 2006-08-16 by luzhonghua �����˵�ҳ���޸�
	        			option.text=strUwYear + "-0" + (i) + "M";
	        	option.defaultSelect = true;
	        }
	        elementAccPeriod.add(option);
	      }
	      else
	      {
	        option.text=strUwYear + "-" + (i) + "M";
	        if (option.text==estimateAccPeriodOld){
	// modify end 2006-08-16 by luzhonghua �����˵�ҳ���޸�
	           
	           	option.text=strUwYear + "-" + (i) + "M";
	        	  option.defaultSelect = true;            	
	        }
	
	        elementAccPeriod.add(option);
	      }
	    }
	    // var option1 = document.createElement("option");
	    // option1.text = strTtyAccPeriod;
	    // elementAccPeriod.add(option1);
	  }
	  if (strAccPeriodType.equals == "H")
	  {
	    for (i=(intAccPeriod*6-5); i<=(intAccPeriod*6); i++)
	    {
	      var option = document.createElement("option");
	
	      if (i < 10)
	      {
	        option.text=strUwYear + "-0" + (i) + "M";
	        if (option.text==estimateAccPeriodOld){
	        	option.text=strUwYear + "-0" + (i+1) + "M";
	        	option.selected = true;
	        }
	
	        elementAccPeriod.add(option);
	      }
	      else
	      {
	        option.text=strUwYear + "-" + (i) + "M";
	        if (option.text==estimateAccPeriodOld){
	        	option.text=strUwYear + "-" + (i) + "M";
	        	option.selected = true;
	        }
	        elementAccPeriod.add(option);
	      }
	    }
	  }
	
	  for(i=0;i<elementAccPeriod.options.length;i++){
	  	if(elementAccPeriod.options[i].defaultSelect == true){
	      elementAccPeriod.selectedIndex = i;
	  		break;
	  	}
	  }
  }


}
// add by zhangTC begin 20060321
function selectAccPeriod1()
{
     var i = 0;
     var choosecount = 0;
     var ilength = fm.chooseflag.length;
     for(i=1;i<ilength;i++)
     {
        if(fm.chooseflag[i].checked)
        {
            choosecount = choosecount+1;
            treatyNo = fm.chooseflag[i].value;
        }
     }
     if(choosecount==0) // û��ѡ��
     {
       // alert("��ѡ���ͬ");
         return false;
     }
    // ����1
    // fm.method="post";
    // fm.action="/reins/fzAccQuery.do?biztype=Select"+"&treatyNo="+treatyNo;
    // fm.submit();
    
    // ����2
    var submitStr = "treatyNo="+treatyNo;
    var strAccperiod = getClauseContext(submitStr);
    
    // window.open(submitStr,'�˵���ѡ��','width=750,height=600,top=50,left=80,toolbar=0,location=0,directories=0,menubar=0,scrollbars=1,resizable=1,status=1');
    // window.open(,"newwindow"
	// ,"scrollbars=yes,toolbar=yes,status=yes,top=100,left=100,menubar=yes,resizable
	// = yes,width=500,Height=300");
  
}
// ��ȡ��������(�Ʋ�¬����20030407)
// strQueryString������ʽ�ǣ�����1=ֵ1&����2=ֵ2
function getClauseContext(strQueryString)
{
  var ClauseURL = "/reins/out/account/UIClauseGet.jsp";
  var strURL = ClauseURL+"?"+strQueryString;
  var vXmlText = getResponseXmlText(strURL);
  // var vXmlText = new ActiveXObject("Microsoft.XMLHTTP");
  // vXmlText = getResponseXmlText(strURL);
  // �ص�ͷβ�ַ�[]
  if(vXmlText.length>=2)
  {

  // while(indexQ !=-1)
  // {
  // alert(indexQ);
  // alertQ = vXmlText.indexOf("Q",indexQ+1);
  // }
   
  // ;
    setOption("accPeriodSel",vXmlText.substring(1,vXmlText.length-1)) 
    }
  else
    return "";


}
// ʹ��xmlhttp����ҳ�棬����ȡ����(�Ʋ�¬����20030407)
function getResponseXmlText(strURL)
{
  var objXmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  objXmlHttp.Open("POST",strURL,false);
  objXmlHttp.setRequestHeader("Content-type","text/xml");
  objXmlHttp.Send("");
  if(objXmlHttp.status==200)
  {
   // return objXmlHttp.responseXML.text;
    return objXmlHttp.responseXML.text;
  }
  else if(objXmlHttp.status==404)
  {
    alert("�Ҳ���ҳ�棺"+strURL);
    return "";
  }
  else
  {
    alert("����"+ strURL +"��������ţ�"+objXmlHttp.status);
    return "";
  }
}
// �ָ���벢����select����
// ���ĸ�ʽ: ֵFIELD_SEPARATOR�ı�GROUP_SEPARATORֵFIELD_SEPARATOR�ı�...
var FIELD_SEPARATOR = "_FIELD_SEPARATOR_";   // �ֶ�֮��ķָ��
var GROUP_SEPARATOR = "_GROUP_SEPARATOR_";     // һ�����֮��ķָ��
function setOption(selectName,strValue)
{
  // �鲻�����뷵��
  if(strValue==null || trim(strValue)=="")
  {
    return;
  }

  var arrayField=strValue.split(GROUP_SEPARATOR);
  var i=0;
  var j=0;
  var intCount = getElementCount(selectName);

  if(intCount>1)
  {
    for(j=0;j<intCount;j++)
    {
      fm.all(selectName)[j].options.length = 0;
    }
  }
  else
  {
    fm.all(selectName).options.length = 0;
  }

  while(i<arrayField.length)
  {
    if(intCount>1)
    {
      for(j=0;j<intCount;j++)
      {
        var option=document.createElement("option");
        var arrayTemp=arrayField[i].split(FIELD_SEPARATOR);
        var strFieldName=arrayTemp[0];
        var strFieldValue=unescape(arrayTemp[1]);
        option.value=strFieldName;
        option.text=strFieldValue;

        fm.all(selectName)[j].add(option);
      }
    }
    else
    {
        var option=document.createElement("option");
        var arrayTemp=arrayField[i].split(FIELD_SEPARATOR);
        var strFieldName=arrayTemp[0];
        var strFieldValue=unescape(arrayTemp[1]);
        option.value=strFieldName;
        option.text=strFieldValue;
      fm.all(selectName).add(option);
    }
    i++;
  }
}
// ���ɺ�ͬ����Ԥ���ʵ�,ת����
function setEstimateAccPeriodSel(estimateAccPeriodOld)
{
  var strTtyAccPeriod  = fm.accPeriodSel.value;
  var strUwYear        = strTtyAccPeriod.substring(0,4);
  var intAccPeriod     = strTtyAccPeriod.substring(6,7);
  var strAccPeriodType = strTtyAccPeriod.substring(7,8);
  var elementAccPeriod = fm.estimateAccPeriodSel;
  // var elementAccPeriodOld = fm.estimateAccPeriodOld.value;
  // add by chends begin 20060220 �ж϶����˵���Ԥ���˵������ڲ���˵���β�����˵�
  // var strPrintType = fm.printType.value;
  // var strAccKind = fm.accKind.value;

  // add by chends end 20060220

      for(var i=elementAccPeriod.options.length-1;i>=0;i--)
      {
        elementAccPeriod.remove(i);
      }
    
      if (strAccPeriodType == "M" || strAccPeriodType == "Y")
      {
        for (i=0;i<12;i++)
        {
          var option = document.createElement("option");
    
          if ((i+1) < 10)
          {
    
            option.text=strUwYear + "-0" + (i+1) + "M";
            if (option.text==estimateAccPeriodOld){
            	option.text=strUwYear + "-0" + (i+1) + "M";
            	option.defaultSelect = true;
            }
    
            elementAccPeriod.add(option);
          }
          else
          {
            option.text=strUwYear + "-" + (i+1) + "M";
            if (option.text==estimateAccPeriodOld){
            	option.text=strUwYear + "-" + (i+1) + "M";
            	option.defaultSelect = true;
            }
            elementAccPeriod.add(option);
          }
        }
      }
      if (strAccPeriodType == "Q")
      {
        for (i=(intAccPeriod*3-2); i<=(intAccPeriod*3); i++)
        {
          var option = document.createElement("option");
    
          if (i < 10)
          {
            option.text=strUwYear + "-0" + (i) + "M";
            var Month = "";
            if(fm.Month.value!=""||fm.Month.value!=null)
             {
              Month = fm.Month.value;
             }
             if(Month==i)
             {
               option.defaultSelect = true;
             }
            if (option.text==estimateAccPeriodOld){
            	option.text=strUwYear + "-0" + (i) + "M";
            	option.defaultSelect = true;
            }
            elementAccPeriod.add(option);
          }
          else
          {
            option.text=strUwYear + "-" + (i) + "M";
            if (option.text==estimateAccPeriodOld){
            	option.text=strUwYear + "-" + (i) + "M";
            	option.defaultSelect = true;
            }
    
            elementAccPeriod.add(option);
          }
        }
        // var option1 = document.createElement("option");
        // option1.text = strTtyAccPeriod;
        // elementAccPeriod.add(option1);
      }
      if (strAccPeriodType.equals == "H")
      {
        for (i=(intAccPeriod*6-5); i<=(intAccPeriod*6); i++)
        {
          var option = document.createElement("option");
    
          if (i < 10)
          {
            option.text=strUwYear + "-0" + (i) + "M";
            if (option.text==estimateAccPeriodOld){
            	option.text=strUwYear + "-0" + (i+1) + "M";
            	option.selected = true;
            }
    
            elementAccPeriod.add(option);
          }
          else
          {
            option.text=strUwYear + "-" + (i) + "M";
            if (option.text==estimateAccPeriodOld){
            	option.text=strUwYear + "-" + (i) + "M";
            	option.selected = true;
            }
            elementAccPeriod.add(option);
          }
        }
      }
    
      for(i=0;i<elementAccPeriod.options.length;i++){
      	if(elementAccPeriod.options[i].defaultSelect == true){
          elementAccPeriod.selectedIndex = i;
      		break;
      	}
      }
  
}
// add by zhangTC end 20060321

// ����ѡ����
// DO:add by liuhaiqi begin 2006-05-11 itest BUG���:659
function lockOption()
{
   var getValue  = fm.lastAccPeriodSel.value;
   var getValue2 = fm.lastEstimateAccPeriodSel.value;
   for (var i=0;i<fm.accPeriodSel.options.length;i++){
    if (fm.accPeriodSel.options[i].value==getValue){
        fm.accPeriodSel.options[i].selected = true; 
		setEstimateAccPeriodSel(getValue2);
        for (var i=0;i<fm.estimateAccPeriodSel.options.length;i++){
          if (fm.estimateAccPeriodSel.options[i].value==getValue2){
          fm.estimateAccPeriodSel.options[i].selected = true;   
		  break;
         }   
       }
		break;
     }
    }
}

function change(temp){// �����Ƿ���ʾԤ���ʵ���
  	if(temp=="I")
  	{
    	estimateAccPeriodtd.style.display = "";
    	fm.estimateAccPeriod.style.display = "";
    }
    else if(temp=="G")
    {
    	estimateAccPeriodtd.style.display = "none";
     	fm.estimateAccPeriod.style.display = "none";
    }
  }
// DO:add by liuhaiqi begin 2006-05-11 itest BUG���:659
// add by luzhonghua 20060801
/** ȫ��ѡ��* */
  function selectAllOne()
  {
    var flag = fm.selectedAll.checked;
    if(flag==true)
    {
      for(var i=0;i<fm.chooseflag.length;i++)
      {
        if (fm.chooseflag[i].value=="none") continue;
        fm.chooseflag[i].checked = true;
       // fm.CheckFlag[i].value = "Y";
      }
    }
    else if(flag==false)
    {
      for(var i=0;i<fm.chooseflag.length;i++)
      {
        if (fm.chooseflag[i].value=="none") continue;
        fm.chooseflag[i].checked = false;
        // fm.CheckFlag[i].value = "N";
      }
    }
  }
  
function commCheck(){
	var count = 0;
	   var ilength = fm.chooseflag.length;
	   var recertifyNo = "";

	   for(i=1;i<ilength;i++){
		   if(fm.chooseflag[i].checked==true){
			   fm.repolicyno1.value = fm.rePolicyNo[i].value;
			   recertifyNo = fm.chooseflag[i].value;
			   break;
		   }
	   }
	   for(i=1;i<ilength;i++){
		   if(fm.chooseflag[i].checked==true){
			   count = count + 1;
			   str = fm.approve[i].value;
		   }
	   }
	   if(count==0){
		   alert("��ѡ���ٷ�ҵ��");
		   return "no";
	   }else{
		   if(str=="δ����"||str=="������"){
			   alert("�ֱ�ҵ��δ���ˣ�");
			   return "no";
		   }
	   }
	   if(fm.accRExistFlag.value=="1"){
		   alert("���������˵���");
		   return "no";
	   }
	   if(fm.flagF1.value=="1"){
			   alert("�˵���ת�ո�������ɾ����");
			   return "no";
	    }
	   if(fm.flagF1.value=="2"){
			   alert("�˵��ѽ��㣬����ɾ����");
			   return "no";
	    }
	   if(fm.flagF2.value=="1"){
		   alert("�Ѿ����ɳ����˵�������ɾ����");
		   return "no";
	   }
	   return recertifyNo;
}
// ɾ���ٷ��ʵ�
 function delAcc(){
	 alert("��ʼɾ��!")
	 var recertifyNo = commCheck() ;
	 if(recertifyNo ==  "no"){
		return;
	 }
	fm.target = "fraSubmit";
	fm.action = "/reins/getAcc.do?recertifyNo=" + recertifyNo + "&accNo=&type1=Delete&DeleteDetail=Y";
	fm.submit();
	}
 // add by xuyangyang 2013/10/29 begin
// ��Լ����
 function selectCleanCut(actionType){
 		var treatyNo;
 		for (i = 1;i<fm.chooseflag.length;i++)
  		{
  		if (fm.chooseflag[i].checked == true)
  		{
  			treatyNo = fm.chooseflag[i].value;
  			break;
  		}
    }
    if(treatyNo == null || '' == treatyNo){
    alert("��ѡ���Լ");	
    return false;
   }
 		fm.action="/reins/accCleanCut.do?actionType="+actionType+"&treatyNo="+treatyNo;
     fm.submit();
 }
 // add by xuyangyang 2013/10/29 begin
