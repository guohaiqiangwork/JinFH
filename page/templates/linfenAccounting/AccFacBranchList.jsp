<%--
****************************************************************************
* DESC       ：临分对内帐单显示列表
* AUTHOR     ：liuyang
* CREATEDATE ：2004-05-28
* MODIFYLIST ：Name       Date            Reason/Contents
*          ------------------------------------------------------
****************************************************************************
--%>

<%@page contentType="text/html;charset=GBK"%>

<%@page import="java.util.*"%>
<%@taglib uri="/WEB-INF/struts-logic.tld" prefix="logic" %>
<%@taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>
<%@taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>
<%@taglib uri="/WEB-INF/reins-app.tld" prefix="app" %>
<body>

<table class="common" cellpadding="3" cellspacing="1" >
  <tr>
    <td class="formtitle"   height="25">
      <img style="cursor:hand;" src="/reins/images/butCollapse.gif"
        name="AccImgB" onclick="showPage(this,spanFzAccB);">
        临分对内帐单<br> 
  <span id="spanFzAccB" style="display:">
  <input type="hidden" name="accNoB" value=""> 
  <table class="list" cellpadding="3" cellspacing="0" id="Retot">
    <thead>
      <tr>
		<td class="centertitle" >帐单类型</td>
		<td class="centertitle" >帐单状态<input type="hidden" name="fzAccFacBranchFlag1"></td>
        <td class="centertitle"  ><bean:message  key="prompt.fzAcc.AccNo"/></td>
        <td class="centertitle"  ><bean:message  key="prompt.fzAcc.ComCode"/></td>
		<td class="centertitle" ><bean:message  key="prompt.fzAcc.ReinsCode"/></td>
        <td class="centertitle" ><bean:message  key="prompt.fzAcc.ReinsName"/></td>
        <td class="centertitle"  ><bean:message  key="prompt.fzAcc.RecertifyNo"/></td>
        <td class="centertitle"  ><bean:message  key="prompt.fzAcc.Currency"/></td>
        <td class="centertitle"  ><bean:message  key="prompt.fzAcc.Balance"/></td>
        <td class="centertitle"  ></td>   
      </tr>
    </thead>
    <tfoot>
    </tfoot>
    <tbody>
<logic:empty name="fzAccFacBranchListForm">
	<input type="hidden" name="accBExistFlag" value="1">
</logic:empty>
	
<logic:notEmpty  name="fzAccFacBranchListForm" >   
	<input type="hidden" name="accBExistFlag" value="">
<logic:iterate id="fzAccB" name="fzAccFacBranchListForm" >      
      <tr class=common>
        <td  width="10%"><bean:write name="fzAccB" property="flag4" />
		    <input type="hidden" name="accNoB" value='<bean:write name="fzAccB" property="accNo" />'>
		    <input type="hidden" name="fzAccFacBranchFlag1" value="<bean:write name="fzAccB" property="flag1"/>">
		</td>
		<td width="9%"><bean:write name="fzAccB" property="flag1" /></td>
        <td width="15%"><bean:write name="fzAccB" property="accNo" /></td>
        <td width="20%" align="left"><bean:write name="fzAccB" property="comName" /></td>  
		<td width="10%"><bean:write name="fzAccB" property="reinsCode" /></td>  
        <td width="15%" align="left"><bean:write name="fzAccB" property="reinsName" /></td>
        <td width="10%"><bean:write name="fzAccB" property="recertifyNo" /></td>
        <td width="7%"><bean:write name="fzAccB" property="currency" /><br>
        <td width="10%" align="right"><bean:write name="fzAccB" property="balance" /></td>
        <td  width="5%"  class="mei">
        <logic:notEqual name="fzAccB" property="flag4"  value="冲销帐单">
		  <a href="javascript:printSingleAcc('<bean:write name="fzAccB" property="accNo"/>')"><img src="/reins/images/print.gif" width="20" height="20" border="0"></img></a>
        </logic:notEqual>
		</td>
     </tr>
</logic:iterate>
</logic:notEmpty> 
   </tbody>
  </table>
  <table class=sub>
  </table>
  </span>
</table>
</body> 