<%--
****************************************************************************
* DESC       ：临分对外帐单显示列表
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

<table class="common" cellpadding="3" cellspacing="0" >
  <tr>
    <td class="formtitle" style="text-align:left" height="25">
      <img style="cursor:hand;" src="/reins/images/butCollapse.gif"
        name="AccImgR" onclick="showPage(this,spanFzAccR);">
        临分对外帐单<br> 
  <span id="spanFzAccR" style="display:none">
  <input type="hidden" name="accNoR" value=""> 
  <table class="list" cellpadding="3" cellspacing="0" id="Retot">
  <thead>
      <tr>
      	<td class="centertitle" >帐单类型</td>
        <td class="centertitle" ><bean:message  key="prompt.fzAcc.AccNo"/></td>
        <td class="centertitle" ><bean:message  key="prompt.fzAcc.ComCode"/></td>
		<td class="centertitle" ><bean:message  key="prompt.fzAcc.ReinsCode"/></td>
        <td class="centertitle" ><bean:message  key="prompt.fzAcc.ReinsName"/></td>
        <td class="centertitle" ><bean:message  key="prompt.fzAcc.RecertifyNo"/></td>
        <td class="centertitle" ><bean:message  key="prompt.fzAcc.Currency"/></td>
        <td class="centertitle" ><bean:message  key="prompt.fzAcc.Balance"/></td>
        <td class="centertitle" >&nbsp;</td>
	  </tr>
    </thead>
    <tfoot>      
    </tfoot>
    <tbody>
<logic:empty name="fzAccFacReinsListForm">
	<input type="hidden" name="accRExistFlag" value="1">
</logic:empty>
<logic:notEmpty  name="fzAccFacReinsListForm" >    
	<input type="hidden" name="accRExistFlag" value="">
<logic:iterate id="fzAccR" name="fzAccFacReinsListForm" >      
      <tr class=common>
       	<td width="10%"><bean:write name="fzAccR" property="flag4" /></td>
        <td width="15%"><bean:write name="fzAccR" property="accNo" /></td>
        <td width="20%" align="left"><bean:write name="fzAccR" property="comName" /></td>
		<td width="10%"><bean:write name="fzAccR" property="reinsCode" /></td>  
        <td width="15%" align="left"><bean:write name="fzAccR" property="reinsName" /></td>
        <td width="10%"><bean:write name="fzAccR" property="recertifyNo" /></td>
        <td width="5%"><bean:write name="fzAccR" property="currency" /><br>
        <td width="10%" align="right"><bean:write name="fzAccR" property="balance" /></td>
        <td width="5%" class="mei">
        <logic:notEqual name="fzAccR" property="flag4" value="冲销帐单">
		   <a href="javascript:printSingleAcc('<bean:write name="fzAccR" property="accNo"/>')">
		     <img src="/reins/images/print.gif" width="20" height="20" border="0"></a>
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