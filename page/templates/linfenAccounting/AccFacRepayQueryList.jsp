<%@page contentType="text/html;charset=GBK"%><%--
****************************************************************************
* DESC       : 临分帐单分赔案查询结果显示页面
* AUTHOR     ：liuyang
* CREATEDATE ：2004-6-15
* MODIFYLIST ：   id       Date            Reason/Contents
*          ------------------------------------------------------
****************************************************************************/
--%>
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic" %>

<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/reins-xapp.tld" prefix="app" %>


<html:html locale="true">
<head>
    <app:css />

    <script src="/reins/page/templates/linfenAccounting/showpage.js"> </script>
<html:base/>
</head>
<body  onload="setchoose();showAcc();" >
<html:errors />
<form name="fcoRepolicyListForm" action="/reins/recertifyQuery.do" method="post" >

   <% 
   
   String operateType = (String)request.getParameter("operateType"); 
   String flagF1 = (String)request.getAttribute("flagF1");
   String flagF2 = (String)request.getAttribute("flagF2");
   String flag3 = (String)request.getAttribute("flag3");
   String accKind = (String)request.getAttribute("accKind");
   
   %>

    <html:hidden name="abstractForm" property="rgrade"/>
		<html:hidden name="abstractForm" property="wgrade"/>
		<html:hidden name="abstractForm" property="xgrade"/>
		<html:hidden name="abstractForm" property="pageNo"/>
		<html:hidden name="abstractForm" property="rowsCount"/>
		<html:hidden name="abstractForm" property="rowsPerPage"/>
 <table class="list"  cellpadding="3" cellspacing="0" id="FcoPolicy">
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
	  <!-- add by liuweiwei 2012/7/4 begin 增加一个属性值用于判断 -->
	  <input type="hidden" name="flag3" value=<%=flag3%>>
	  <!-- add by liuweiwei 2012/7/4 end -->
	  <input type="hidden" name="accKind" value=<%=accKind%>>
    <tr>
      <td class="centertitle" width="3%"></td>
      <!-- modify by liuweiwei 2012-3-14 begin 因为客户需求要求展示结果页面隐藏分摊，复核字段 -->
      <!--<td class="centertitle" width="11%">分摊</td>
      <td class="centertitle" width="7%">复核</td>  -->
      <!-- modify by liuweiwei 2012-3-14 end -->
      <td class="centertitle" width="12%"><bean:message key="prompt.floRepay.RepayNo"/></td>
      <td class="centertitle" style="width:12%" ><bean:message key="prompt.floRepay.PolicyNo"/></td>
      <!-- modify by liuweiwei 2012-3-14 begin  因为客户需求要求在展示页面显示赔案号,理算书号 -->
      <td class="centertitle" style="width:7%" >赔案号</td>
      <td class="centertitle" style="width:11%" >理算书号</td>
      <!-- modify by liuweiwei 2012-3-14 end -->
      <td class="centertitle" width="8%"><bean:message key="prompt.floRepay.DamageDate"/></td>
      <!-- add by liuweiwei 2012-3-26 begin 增加转收付时间的展示 -->
      <%if(flag3.equals("1")){ %>
      <td class="centertitle" style="width:8%" >转收付时间</td>
      <%} %>
      <!-- add by liuweiwei 2012-3-26 end -->
      <td class="centertitle" width="6%"><bean:message key="prompt.floRepay.DamageReason"/></td>
      <td class="centertitle" width="8%"><bean:message key="prompt.floRepay.ComCode"/></td>
      <td class="centertitle" width="6%"><bean:message key="prompt.floRepay.InsuredName"/>/船名</td>
      <!-- add by liuweiwei 2012-3-19 begin 增加一个临分确认人信息 -->
      <%if(flagF1.equals("0")||flag3.equals("1")){ %>
      <td class="centertitle" style="width:6%">临分确认人</td>
      <%} %>
      <!-- add by liuweiwei 2012-3-19 end -->
      <td class="centertitle" width="4%"><bean:message key="prompt.floRepay.Currency"/></td>
      <td class="centertitle" width="10%">已决赔款</td>
      <td class="centertitle" width="10%"><bean:message key="prompt.floRepay.OutStanding"/></td>
   </tr>
   
   <logic:notEmpty  name="floRepayList">
   <logic:iterate id="floRepay"  name="floRepayList">
     <tr class=common>
       <td>
	     <input type="radio" name="chooseflag" value='<bean:write name="floRepay" property="repayNo"/>' onclick="QueryAcc()">
         <input type="hidden" name="chooseno" value='<bean:write name="floRepay" property="chooseNo"/>'>
         <input type="hidden" name="refNo" value="">
         <!-- add by liuweiwei 2012-3-23 begin 增加隐藏字段用于当做后台的查询条件-->
         <input type="hidden" name="repay" value='<bean:write name="floRepay" property="repayNo"/>'>
         <!-- add by liuweiwei 2012-3-23 end -->
       </td>
       <!-- modify by liuweiwei 2012-3-14 begin 因为客户需求要求展示结果页面隐藏分摊，复核字段 -->
       <!--  <td><bean:write name="floRepay" property="arrange"/></td>
       <td>--><input type="hidden" name="approve" value='<bean:write name="floRepay" property="approve"/>'><!--<bean:write name="floRepay" property="approve"/></td>-->
       <!-- modify by liuweiwei 2012-3-14 end -->
       <td><a href="/reins/repay.do?operateType=View&repayNo=<bean:write name='floRepay' property='repayNo'/>">
	        <bean:write name="floRepay" property="repayNo"/></a></td>
       <td ><bean:write name="floRepay" property="policyNo"/></td>
       <!-- modify by liuweiwei 2012-3-14 begin  因为客户需求要求在展示页面显示赔案号,理算书号 -->
       <td ><bean:write name="floRepay" property="mainClaimNo"/></td>
       <td ><bean:write name="floRepay" property="compensateNo"/></td>
       <!-- modify by liuweiwei 2012-3-14 end -->
       <td><bean:write name="floRepay" property="damageDate"/><input type="hidden" name="rePolicyNo" value='<bean:write name="floRepay" property="rePolicyNo"/>'>
       <input type="hidden" name="repayNo" value='<bean:write name="floRepay" property="repayNo"/>'></td>
       <%if(flag3.equals("1")){ %>
       <td style="text-align:right" ><bean:write name="floRepay" property="settleDate"/></td>
       <%} %>
       <td style="text-align:left"><bean:write name="floRepay" property="damageReason"/></td>
       <!-- modify by liuweiwei 2012-3-14 begin  因为客户需求要求在展示页面将出单公司代码换成出单公司名称 -->
       <td ><bean:write name="floRepay" property="comcname"/></td>
        <!-- modify by liuweiwei 2012-3-14 end -->
       <td style="text-align:left"><bean:write name="floRepay" property="insuredName"/></td>
       <!-- add by liuweiwei 2012-3-19 begin  增加一个临分确认人信息-->
       <%if(flagF1.equals("0")||flag3.equals("1")){ %>
       <td class="queryresult"><bean:write name="floRepay" property="userName"/></td>
       <%} %>
       <!-- add by liuweiwei 2012-3-19 end -->
       <td><bean:write name="floRepay" property="currency"/></td>
       <td style="text-align:right" ><bean:write name="floRepay" property="sumTotal" format="#,##0.00"/></td>
       <td class="mei" style="text-align:right" ><bean:write name="floRepay" property="outStanding" format="#,##0.00" /></td>
     </tr>
   </logic:iterate>
   </logic:notEmpty>
  </table>
  <input type="hidden" name="type" value="Q">
  <input type="hidden" name="biztype" value="C">
  <input type="hidden" name="acctype" value="">
  <input type="hidden" name="repolicyno1" value="">
  <table class="common_width" width="130%">
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
        <td>
        	<input type="button" class="middlebutton" value="生成帐单" onclick="genAcc('FB');return false;">
        	<input type="button" class="button" value="帐单删除" onclick="delAcc();return false;">
        	<input type="button" class="button" value="账单转收付" onclick="payment();return false;">
        </td>
<%}
if (operateType.equals("Maintenance"))
{
%>
	<td class="title2" width="25%" align="center">
	  <input type="button" class="button" value="帐单删除" onclick="delAcc();return false;">
	</td>
<%}%>
<%if (operateType.equals("Settle"))
{
%>
        <!--modify begin by fengbo 20070110 “帐单确认”修改为“帐单转收付费”-->
        <td><input name="settleBtn" type="button" class="middlebutton" value="复核并转收付" onclick="settleRepay('F');return false;"></td>
        <!--modify end by fengbo 20070110 “帐单确认”修改为“帐单转收付费”-->
<%}%>
     </tr>
  </table>
<%-- 公共子项：明细信息 --%>
<jsp:include page="AccFacBranchList.jsp" />
<jsp:include page="AccFacReinsList.jsp" />
</form>
</body>
</html:html>
<script>
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
   	var repayNoCh = "";
   	var flag = confirm("确定冲销帐单吗？");
   
	if(flag){
		for(i=1;i<ilength;i++){
       		if(fm.chooseflag[i].checked==true){
           		fm.repolicyno1.value = fm.rePolicyNo[i].value;
		   		repayNoCh = fm.chooseflag[i].value;

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
       		alert("请选择帐单");
       		return false;
   		}else{
       		if(str=="未复核"||str=="待复核"){
       	   		alert("分保业务未复核,不能冲销帐单");
       	   		return false;
       		}
   		}
   		if(fm.accRExistFlag.value=="1"){
       		alert("请生成账单");
	   		return false;
   		}
   		if(fm.flagF1.value=="0"){
       		alert("账单未转收付，不可冲销");
	   		return false;
   		}else if(fm.flagF1.value=="2"){
           	alert("账单已结算，不可冲销");
		   	return false;
   		}
   		if(fm.flagF2.value=="1"){
       		alert("此账单已冲销");
	   		return false;
   		}
   		if(fm.accKind.value=="L"){
       		alert("此账单为冲销账单");
	   		return false;
   		}
   		fm.action="/reins/cancelAccL.do?repayNoCh=" + repayNoCh;
   		fm.submit();
	}else{
		return false;
	}
   
}

function settleRepay(settleType)

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
function changeRowsPerPage(field) {
    var rows = parseInt(field.value, 10);
    if (isNaN(rows)) {
    	alert("请正确输入数字！");
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
<script src="Account.js"> </script>
<jsp:include page="StaticJavascript.jsp" />
<script src="showpage.js"> </script>