
<!-- ****************************************************************************
* DESC       ���ٷ��ʵ��ֱ�����ѯ�����ʾҳ��
*  add 2018
* MODIFYLIST ��   id       Date            Reason/Contents
*          ------------------------------------------------------
****************************************************************************/ -->


 <%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/reins-xapp.tld" prefix="app" %>
<% 
   
   String operateType = (String)request.getParameter("operateType"); 
   String flagF1 = (String)request.getAttribute("flagF1");
   String flagF2 = (String)request.getAttribute("flagF2");
   String accKind = (String)request.getAttribute("accKind");
   String flag3 = (String)request.getAttribute("flag3");
   
   %>
<html:html locale="true">
<head>
<app:css />
<title><bean:message key="prompt.fcoRepolicy.HeadName"/></title>
<script src="/reins/page/templates/linfenAccounting/showpage.js"> </script>
<html:base/>
</head>

<body  onload="setchoose();showAcc();" >
<html:errors />
<form name="fcoRepolicyListForm" action="/reins/recertifyQuery.do" method="post">
<script language="JavaScript" >
   		/*  ָ��fm����,����������ֵ */
      var fm = fcoRepolicyListForm;
</script>
<script language="javascript">
 function QueryAcc()
 {
    fm.action="/reins/fzAccQuery.do";
    fm.submit();
 }

 function setchoose()
 {
    var ilength = fm.chooseno.length;

    for(i=1;i<ilength;i++)
    {
        if(fm.chooseno[i].value.length!=0)
        {
           fm.chooseflag[i].checked=true;
           break;
        }
    }
 }

function cancelAcc(){
   	var count = 0;
   	var ilength = fm.chooseflag.length;
   	var repolicyNoCh = "";
   	var flag = confirm("ȷ�������ʵ���");
   	
   	if(flag){
   	   	for(i=1;i<ilength;i++){
       		if(fm.chooseflag[i].checked==true){
           		fm.repolicyno1.value = fm.rePolicyNo[i].value;
		   		repolicyNoCh = fm.rePolicyNo[i].value;
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
       		alert("��ѡ���ʵ�");
       		return false;
   		}else{
       		if(str=="δ����"||str=="������"){
       	   		alert("�ֱ�ҵ��δ����,���ܳ����ʵ�");
       	   		return false;
       		}
   		}
   		if(fm.accRExistFlag.value=="1"){
       		alert("�������˵�");
	   		return false;
   		}
   		if(fm.flagF1.value=="0"){
       		alert("�˵�δת�ո������ɳ���");
	   		return false;
   		}else  if(fm.flagF1.value=="2"){
           	alert("�˵��ѽ��㣬���ɳ���");
		   	return false;
   		}
   		if(fm.flagF2.value=="1"){
       		alert("���˵��ѳ���");
	   		return false;
   		}
   		if(fm.accKind.value=="L"){
       		alert("���˵�Ϊ�����˵�");
	   		return false;
   		}
   		fm.action="/reins/cancelAccC.do?rePolicyNo=" + repolicyNoCh;
   		fm.submit();
   	}else{
   		return false;
   	}

   
 }

function changeRowsPerPage(field) {
    var rows = parseInt(field.value, 10);
    if (isNaN(rows)) {
    	alert("����ȷ�������֣�");
        return false;
    }
    if (rows > 500) {
        alert("\u6bcf\u9875\u4e0d\u5141\u8bb8\u8d85\u8fc7500\u6761");
        return false;
    }   
    fm.action="/reins/recertifyQuery.do?opt=facOut&rows=" + rows;
    fm.submit();
    return true;
}
</script>

<html:hidden name="abstractForm" property="rgrade"/>
<html:hidden name="abstractForm" property="wgrade"/>
<html:hidden name="abstractForm" property="xgrade"/>
<html:hidden name="abstractForm" property="pageNo"/>
<html:hidden name="abstractForm" property="rowsCount"/>
<html:hidden name="abstractForm" property="rowsPerPage"/>
  <input type="hidden" name="type" value="Q">
  <input type="hidden" name="biztype" value="P">
  <input type="hidden" name="acctype" value="">
  <input type="hidden" name="repolicyno1" value="">
  <input type="hidden" name="chooseflag" >
     <input type="hidden" name="approve" >
     <input type="hidden" name="chooseno">
     <input type="hidden" name="rePolicyNo">
     <input type="hidden" name="refNo">
      <input type="hidden" name="classCode">
      <input type="hidden" name="riskCode">
      <input type="hidden" name="policyNo">
     <input type="hidden" name="checkType" value="">
     <input type="hidden" name="settleType" value="">
     <input type="hidden" name="operateType" value=<%=operateType%>>
	 <input type="hidden" name="flagF1" value=<%=flagF1%>>
	 <input type="hidden" name="flagF2" value=<%=flagF2%>>
	 <input type="hidden" name="flag3" value=<%=flag3%>>
	 <input type="hidden" name="accKind" value=<%=accKind%>>
	 <input type="hidden" name="reinsType">
   <table class="list"  cellspacing="0" cellpadding="3" id="fcoRepolicy" border=0 >
    <tr>
      <td class="centertitle" style="width:3%" ></td>
      <!-- modify by liuweiwei 2012-3-13 end -->
      <td class="centertitle" style="width:10%" ><bean:message key="prompt.fcoRepolicy.RepolicyNo"/></td>
      <td class="centertitle" style="width:10%" ><bean:message key="prompt.fcoRepolicy.PolicyNo"/></td>
      <!-- modify by liuweiwei 2012-3-13 begin ��Ϊ�ͻ�����Ҫ����չʾҳ����ʾ������˾���� -->
      <td class="centertitle" style="width:8%" >������˾</td>
       <!-- modify by liuweiwei 2012-3-13 end -->
      <td class="centertitle" style="width:8%"><bean:message key="prompt.fcoRepolicy.InsuredName"/></td>
      <!-- add by liuweiwei 2012-3-19 begin ����һ���ٷ�ȷ������Ϣ -->
      <%if(flagF1.equals("0")||flag3.equals("1")){ %>
      <td class="centertitle" style="width:8%">�ٷ�ȷ����</td>
      <%} %>
      <!-- add by liuweiwei 2012-3-19 end -->
      <td class="centertitle" style="width:7%" ><bean:message key="prompt.fcoRepolicy.StartDate"/></td>
      <!-- add by liuweiwei 2012-3-26 begin ����ת�ո�ʱ���չʾ -->
      <%if(flag3.equals("1")){ %>
      <td class="centertitle" style="width:8%" >ת�ո�ʱ��</td>
      <%} %>
      <!-- add by liuweiwei 2012-3-26 end -->
      <td class="centertitle" style="width:4%" ><bean:message key="prompt.fcoRepolicy.Currency"/></td>
      <td class="centertitle" style="width:8%" ><bean:message key="prompt.fcoRepolicy.Amount"/></td>
      <td class="centertitle" style="width:6%" >�ܺ�˰����</td>
      <td class="centertitle" style="width:6%" ><bean:message key="prompt.fcoRepolicy.BaseRate"/></td>
      <td class="centertitle" style="width:6%" ><bean:message key="prompt.fcoRepolicy.ShareRate"/></td>

   </tr>

   <logic:notEmpty  name="fcoRepolicyListForm">
   <logic:iterate id="fcoRepolicy"  name="fcoRepolicyListForm">

    <tr>
      <td class="queryresult" >
          <input type="radio" name="chooseflag" value='<bean:write name="fcoRepolicy" property="rePolicyNo" />' onclick="QueryAcc()">
          <input type="hidden" name="chooseno" value='<bean:write name="fcoRepolicy" property="chooseNo"/>' >
          <input type="hidden"  name="refNo" value="">
      </td>
      <!-- modify by liuweiwei 2012-3-13 begin ��Ϊ�ͻ�����Ҫ����չʾҳ�������˸�����һ�� -->
      <!--  <td class="queryresult" nowrap>-->
	      <input type="hidden" class="four1" name="approve" value='<bean:write name="fcoRepolicy" property="approve" />'>
		  <!--<bean:write name="fcoRepolicy" property="approve" />
	  </td>-->
	  <!-- modify by liuweiwei 2012-3-13 end -->
      <td class="queryresult">
	      <bean:write name="fcoRepolicy" property="rePolicyNo" />
	     <input type="hidden" name="rePolicyNo" value='<bean:write name="fcoRepolicy" property="rePolicyNo"/>'>
	     <input type="hidden" name="classCode" value='<bean:write name="fcoRepolicy" property="classCode"/>'>
	     <input type="hidden" name="riskCode" value='<bean:write name="fcoRepolicy" property="riskCode"/>'>
	      <input type="hidden" name="reinsType" value='<bean:write name="fcoRepolicy" property="reinsType"/>'>
	      <input type="hidden" name="policyNo" value='<bean:write name="fcoRepolicy" property="policyNo"/>'>
	      <input type="hidden" name="comCode" value='<bean:write name="fcoRepolicy" property="comCode"/>'>
	      
	  </td>
      <td class="queryresult"><bean:write name="fcoRepolicy" property="policyNo"/></td>
      <!-- modify by liuweiwei 2012-3-13 begin ��Ϊ�ͻ�����Ҫ����չʾҳ����ʾ������˾���� -->
      <td class="queryresult"><bean:write name="fcoRepolicy" property="comcName"/></td>
       <!-- modify by liuweiwei 2012-3-13 end -->
      <td class="queryresult"  style="text-align:left" ><bean:write name="fcoRepolicy" property="insuredName"/></td>
      <!-- add by liuweiwei 2012-3-19 begin  ����һ���ٷ�ȷ������Ϣ-->
      <%if(flagF1.equals("0")||flag3.equals("1")){ %>
      <td class="queryresult"><bean:write name="fcoRepolicy" property="userName"/></td>
      <%} %>
       <!-- add by liuweiwei 2012-3-19 end -->
      <td class="queryresult" ><bean:write name="fcoRepolicy" property="startDate"/></td>
      <%if(flag3.equals("1")){ %>
       <td class="queryresult" style="text-align:right" ><bean:write name="fcoRepolicy" property="settleDate"/></td>
       <%} %>
      <td class="queryresult" ><bean:write name="fcoRepolicy" property="currency"/></td>
      <td class="queryresult" style="text-align:right" ><bean:write name="fcoRepolicy" property="amountStr"/></td>
      <td class="queryresult" style="text-align:right" ><bean:write name="fcoRepolicy" property="premiumStr"/></td>
      <td class="queryresult" style="text-align:right" ><bean:write name="fcoRepolicy" property="baseRateStr"/></td>
      <td class="mei" style="text-align:right" ><bean:write name="fcoRepolicy" property="shareRateStr"/></td>
    </tr>

    </logic:iterate>
    </logic:notEmpty>
  </table>
<app:navigate name="fcoRepolicyListForm" objectname="abstractForm"  hasCheckbox="true" />
<iframe id="free" width="0" height="0" ></iframe>
<table class="sub">
   <tr>
<%if (operateType.equals("Gen"))
{
%>
      <td class="title2" width ="25%" align="center">
	     <input type="button" class="button" value="�����ʵ�" onclick="genAcc('FB');return false;">
	     <input type="button" class="button" value="��ӡ�ֱ���" onclick="PrintParticularsButtonAction();">
	     <input type="button" class="button" value="ɾ���˵�" onclick="delAcc();return false;">
	     <input type="button" class="button" value="�˵�ת�ո�" onclick="payment();return false;">
      </td>


<%}
if (operateType.equals("Maintenance"))
{
%>
    <!--   <td class="title2" width="25%" align="center"><input type="button" class="button" value="�����ʺ˶�" onclick="checkFacAcc('F','');return false;"></td>-->
	<td class="title2" width="25%" align="center">
	  <input type="button" class="button" value="�ʵ�ɾ��" onclick="delAcc();return false;">
	</td>
<%}
if (operateType.equals("Settle"))
{
%>
      <td class="title2" width="25%" align="center">
	     <input name="settleBtn" type="button" class="button" value="���˲�ת�ո�" onclick="settleCheck('F');return false;">
	  </td>
<%}%>
   </tr>
</table>
���������ϸ��Ϣ
<jsp:include page="AccFacBranchList.jsp" />
<jsp:include page="AccFacReinsList.jsp" />
<jsp:include page="StaticJavascript.jsp" />
<script src="Account.js"></script>

<script>
 	function settleCheck(settleType)
 	{
 		var count   = 0;
 		var i       = 0;
 		var checkNo = "";
 		var treatyNo = "";
 		var refNo = "";
 		
 		fm.settleBtn.disabled = true;
 		if(fm.flag3 == '1'){
 			alert("�ʵ���ת�ո��������ظ��ύ��");
 			return false;
 		}
  
 		for (i = 1;i<fm.chooseflag.length;i++)
 		{
 			if (fm.chooseflag[i].checked == true){
	 			count++;
 				treatyNo = fm.chooseflag[i].value;
 				checkNo= fm.chooseflag[i].value;
 				break;
 			}
   		}
 		if (count == 0)
 		{
	 		return;
	 	}
	 	
	 	fm.action="/reins/getAcc.do?type1=Settle&recertifyNo="+checkNo+"&settleType="+settleType;
 		var oldTarget = fm.target;
 		//fm.target = "_new"; 
 		fm.submit();
 		fm.target = oldTarget; 
 	}
 	
 	  function PrintParticularsButtonAction()
  {
      var i           = 0;
      var choosecount = 0;
      var findFlag    = 0;
      var rePolicyNo  = "";
      var classCode   = "";
      var riskCode    = "";
      //modify start by fengbo add
      var enquiryNo   = "";
      //modify start by fengbo end
      //���ѡ��

      var ilength = fm.chooseflag.length;
      for(i=1;i<ilength;i++)
      {
          if (fm.chooseflag[i].checked == true)
          {
              choosecount = choosecount+1;
              if (fm.reinsType[i].value == '0')
              {
                  alert("�÷ֱ����ֱ���ʽΪ��ͬ�����ش�ӡ");
                  return;
              }
              
       //add begin by Yangyd 20070824:��������Ҫ��ӡ 
              if (fm.reinsType[i].value == '3')
              {
                  alert("�÷ֱ����ֱ���ʽΪ���������ش�ӡ");
                  return;
              }
      //add end by Yangyd 20070824:��������Ҫ��ӡ 
            
              rePolicyNo  = fm.chooseflag[i].value;
              classCode   = fm.classCode[i].value;
              riskCode    = fm.riskCode[i].value;
              //modify start by fengbo add
              policyNo   = fm.policyNo[i].value;
              //modify start by fengbo end
          }
      }
      if(choosecount==0) //û��ѡ��
      {
          alert("��ѡ��ֱ���");
          return;
      }
      if(choosecount>1)
      {
          alert("��ֻ��ѡ��һ�ŷֱ���");
          return;
      }
      //modify start by fengbo 20060825
      window.open("/reins/SlipPrint.do?rePolicyNo="+ rePolicyNo +"&policyNo="+policyNo+ "&classCode=" + classCode +""+"&riskCode=" + riskCode +""+"&printType=RepolicyParticularsPrint"+"&printKind=T");
      //modify end by fengbo 20060825
  }

</script>
</form>
</body>
</html:html>