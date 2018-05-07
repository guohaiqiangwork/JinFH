<%--
****************************************************************************
* DESC       ���ٷ��ʵ���������ѯ�����ʾҳ��
* AUTHOR     ��liuyang
* CREATEDATE ��2004-05-29
* MODIFYLIST ��   id       Date            Reason/Contents
*          ------------------------------------------------------
****************************************************************************/
--%>

<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic" %>

<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/reins-xapp.tld" prefix="app" %>



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
    <%--ָ��fm����,����������ֵ--%>
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
   	var reendorNoCh = "";
   	var flag = confirm("ȷ�������ʵ���");

	if(flag){
		for(i=1;i<ilength;i++){
       		if(fm.chooseflag[i].checked==true){
           		fm.repolicyno1.value = fm.rePolicyNo[i].value;
		   		reendorNoCh = fm.chooseflag[i].value;
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
   		}else if(fm.flagF1.value=="2"){
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
   		fm.action="/reins/cancelAccP.do?reendorNoCh=" + reendorNoCh;
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
//    fm.rows.value = rows;
//    fm.pageNo.value = 1;    
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
   
   <% 
   
   String operateType = (String)request.getParameter("operateType"); 
   String flagF1 = (String)request.getAttribute("flagF1");
   String flagF2 = (String)request.getAttribute("flagF2");
   String flag3=(String)request.getAttribute("flag3");
   String accKind = (String)request.getAttribute("accKind");
   
   %>
     <input type="hidden" name="chooseflag" >
     <input type="hidden" name="chooseno">
     <input type="hidden" name="approve" >
     <input type="hidden" name="rePolicyNo">
     <input type="hidden" name="refNo">
     <input type="hidden" name="checkType" value="">
     <input type="hidden" name="settleType" value="">
     <input type="hidden" name="operateType" value=<%=operateType%>>
	 <input type="hidden" name="flagF1" value=<%=flagF1%>>
	 <input type="hidden" name="flagF2" value=<%=flagF2%>>
	 <!-- add by liuweiwei 2012/7/4 begin ����һ���ֶ������ж� -->
	 <input type="hidden" name="flag3" value=<%=flag3%>>
	 <input type="hidden" name="reinsType">
	 <input type="hidden" name="endorNo">
	 <input type="hidden" name="riskCode">
	 <!-- add by liuweiwei 2012/7/4 end -->
	 <input type="hidden" name="accKind" value=<%=accKind%>>
   <table class="list" cellspacing="0" cellpadding="3" id="fpoReendor">
    <tr>
      <td class="centertitle"></td>
      <!-- modify by liuweiwei 2012-3-13 end -->
      <td class="centertitle"><bean:message key="prompt.fpoReendor.ReendorNo"/></td>
      <td class="centertitle"><bean:message key="prompt.fpoReendor.PolicyNo"/></td>
      <!-- modify by liuweiwei 2012-3-13 begin  ��Ϊ�ͻ�����Ҫ����ʾ������һ��-->
      <td class="centertitle" >������</td>
      <!-- modify by liuweiwei 2012-3-13 end -->
      <td class="centertitle">��Ч����</td>
      <!-- modify by zjy begin 2014-3-27 reason for ��������endorDate�洢�����м�����Ч����validdate -->
      <!-- add by liuweiwei 2012-3-26 begin ����ת�ո�ʱ���չʾ -->
       <%if(flag3.equals("1")){ %>
      <td class="centertitle">ת�ո�ʱ��</td>
      <%} %>
      <!-- modify by liuweiwei 2012-3-13 end -->
      <td class="centertitle"><bean:message key="prompt.fpoReendor.ComCode"/></td>
      <td class="centertitle"><bean:message key="prompt.fpoReendor.InsuredName"/></td>
      <!-- add by liuweiwei 2012-3-19 begin ����һ���ٷ�ȷ������Ϣ -->
      <%if(flagF1.equals("0")||flag3.equals("1")){ %>
      <td class="centertitle" >�ٷ�ȷ����</td>
      <%} %>
      <!-- add by liuweiwei 2012-3-19 end -->
      <td class="centertitle"><bean:message key="prompt.fpoReendor.Currency"/></td>
      <td class="centertitle"><bean:message key="prompt.fpoReendor.AmountChg"/></td>
      <td class="centertitle">��˰���ѱ仯��</td>
      <td class="centertitle"><bean:message key="prompt.fpoReendor.BaseRate"/></td>
      <td class="centertitle"><bean:message key="prompt.fpoReendor.ShareRate"/></td>
      </tr>
  
   <logic:notEmpty  name="fpoReendorListForm">
   <logic:iterate id="fpoReendor"  name="fpoReendorListForm">

    <tr class=common>
      <td  class="queryresult" width="3%"  >
          <input type="radio" name="chooseflag" value='<bean:write name="fpoReendor" property="reendorNo" />' onclick="QueryAcc()">
          <input type="hidden" name="chooseno" value='<bean:write name="fpoReendor" property="chooseNo"/>'>
          <input type="hidden"  name="refNo" value="">
          <!--add by liuweiwei 2012-3-23 begin ����һ�������ֶ����ں�̨�Ĳ�ѯ���� -->
          <input type="hidden"  name="reendorNo" value='<bean:write name="fpoReendor" property="reendorNo"/>'>
          <!--add by liuweiwei 2012-3-23 end  -->
      </td>
      <!-- modify by liuweiwei 2012-3-13 begin  ��Ϊ�ͻ�����Ҫ�����ظ���һ��-->
      <!-- <td  class="queryresult" width="8%"  nowrap >--><input type="hidden" class="four1" name="approve" 
	    value='<bean:write name="fpoReendor" property="approve" />'><!--<bean:write name="fpoReendor" property="approve" /></td> -->
	    <!-- modify by liuweiwei 2012-3-13 end -->
	    <td  class="queryresult" width="10%"  ><bean:write name="fpoReendor" property="reendorNo" />
	    <input type="hidden" name="rePolicyNo" value='<bean:write name="fpoReendor" property="rePolicyNo"/>'>
	    <input type="hidden" name="reendorNo" value='<bean:write name="fpoReendor" property="reendorNo"/>'>
	     <input type="hidden" name="reinsType" value='<bean:write name="fpoReendor" property="reinsType"/>'>
	      <input type="hidden" name="riskCode" value='<bean:write name="fpoReendor" property="riskCode"/>'>
	      <input type="hidden" name="endorNo" value='<bean:write name="fpoReendor" property="endorNo"/>'>
	      <input type="hidden" name="comCode" value='<bean:write name="fpoReendor" property="comCode"/>'>
	      
	  </td>
      <td class="queryresult"width="10%"  ><bean:write name="fpoReendor" property="policyNo"/></td>
      <td class="queryresult"width="10%"  ><bean:write name="fpoReendor" property="endorNo"/></td>
      <td class="queryresult" width="10%"  ><bean:write name="fpoReendor" property="endorDate"/></td>
       <%if(flag3.equals("1")){ %>
       <td class="queryresult" style="text-align:right"  width="8%" ><bean:write name="fpoReendor" property="settleDate"/></td>
       <%} %>
      <!-- modify by liuweiwei 2012-3-13 begin  ��Ϊ�ͻ�����Ҫ��ȡ����������һ��-->
      <!-- <td class="queryresult" width="12%"  style="text-align:left" ><bean:write name="fpoReendor" property="endorDesc"/>&nbsp;</td> -->
      <!-- modify by liuweiwei 2012-3-13 end -->
      <td class="queryresult" width="8%"  ><bean:write name="fpoReendor" property="comcName"/></td>
      <td class="queryresult" width="8%" style="text-align:left"><bean:write name="fpoReendor" property="insuredName"/></td>
      <!-- add by liuweiwei 2012-3-19 begin  ����һ���ٷ�ȷ������Ϣ-->
       <%if(flagF1.equals("0")||flag3.equals("1")){ %>
      <td class="queryresult" width="8%"><bean:write name="fpoReendor" property="userName"/></td>
      <%} %>
       <!-- add by liuweiwei 2012-3-19 end -->
      <td class="queryresult" width="6%"  ><bean:write name="fpoReendor" property="currency"/></td>
      <td class="queryresult" style="text-align:right"  width="8%"><bean:write name="fpoReendor" property="amountChg"/></td>
      <td class="queryresult" style="text-align:right"  width="6%"><bean:write name="fpoReendor" property="premiumChg"/></td>
      <td class="queryresult" style="text-align:right"  width="8%" ><bean:write name="fpoReendor" property="baseRate" format="0.000000"/></td>
      <td class="mei" style="text-align:right"  width="8%" ><bean:write name="fpoReendor" property="shareRate" format="0.000000"/></td>
    </tr>
     
    </logic:iterate>
    </logic:notEmpty>
  </table>
  <input type="hidden" name="type" value="Q">
  <input type="hidden" name="biztype" value="E">
  <input type="hidden" name="acctype" value="">
  <input type="hidden" name="repolicyno1" value="">
  <table class="common_width" width="150%">
   <tr >
     <td>
     <app:navigate name="fcoRepolicyListForm" objectname="abstractForm"  hasCheckbox="true" />
      </td>
   </tr>
      </table>

<table class=sub>
   <tr class=common>
<%if (operateType.equals("Gen"))
{
%>
      <td><input type="button" class="middlebutton" value="�����ʵ�" onclick="genAcc('FB');return false;">
      <input type="button" class="button" value="��ӡ�ֱ���" onclick="PrintParticularsButtonAction();return false;">
      <input type="button" class="button" value="�ʵ�ɾ��" onclick="delAcc();return false;">
      <input type="button" class="button" value="�˵�ת�ո�" onclick="payment();return false;"></td>
<%}
if (operateType.equals("Maintenance"))
{
%>
	<td class="title2" width="25%" align="center">
	  <input type="button" class="button" value="�ʵ�ɾ��" onclick="delAcc();return false;">
	</td>
<%}
if (operateType.equals("Settle"))
{
%>
      <!--modify begin by fengbo 20070110 ���ʵ�ȷ�ϡ��޸�Ϊ���ʵ�ת�ո��ѡ�-->
      <td><input name="settleBtn" type="button" class="middlebutton" value="���˲�ת�ո�" onclick="settleReendor('F');return false;"></td>
      <!--modify end by fengbo 20070110 ���ʵ�ȷ�ϡ��޸�Ϊ���ʵ�ת�ո��ѡ�-->
<%}%>
   </tr>
</table>

<%-- ���������ϸ��Ϣ --%>
<jsp:include page="AccFacBranchList.jsp" />
<jsp:include page="AccFacReinsList.jsp" />
<script src="Account.js"> </script>
<jsp:include page="StaticJavascript.jsp" />
<script src="showpage.js"> </script>

<script>
function settleReendor(settleType)

 {

 	var count   = 0;
 	var i       = 0;
 	var checkNo = "";
 	var treatyNo = "";
 	var refNo = "";
 	fm.settleBtn.disabled = true;
    if(checkStatus() ==false){
  	    return false;
    }
  
 	for (i = 1;i<fm.chooseflag.length;i++)
 	{
 		if (fm.chooseflag[i].checked == true)

 		{
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

        var i = 0;
        var choosecount = 0;
        var findFlag = 0;
       //���ѡ��
      var ilength = fm.chooseflag.length;
     for(i=1;i<ilength;i++)
     {
      if(fm.chooseflag[i].checked)
      {
          choosecount = choosecount+1;
          //modify begin by fengbo add 20061010
          if (fm.reinsType[i].value == '0')
          {
               alert("�÷������ֱ���ʽΪ��ͬ�����ش�ӡ");
               return;
          }
          
     //add begin by Yangyd 20070824:��������Ҫ��ӡ 
                    if (fm.reinsType[i].value == '3')
          {
               alert("�÷������ֱ���ʽΪ���������ش�ӡ");
               return;
          }
     //add end by Yangyd 20070824:��������Ҫ��ӡ
         window.open("/reins/SlipPrint.do?reendorNo="+ fm.chooseflag[i].value+"&endorNo="+fm.endorNo[i].value+"&riskCode=" + fm.riskCode[i].value +""+"&printType=RepolicyParticularsPrint"+"&printKind=P");
      }
     }

     if(choosecount==0) //û��ѡ��
     {
       alert("��ѡ�������");
       return false;
     }
   if(choosecount>1)
   {
       alert("��ֻ��ѡ��һ�ŷ�����");
       return false;
   }
 }
</script>
</form>
</body>
</html:html>