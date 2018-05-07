<%@page contentType="text/html;charset=GBK"%><%--
****************************************************************************
* DESC       ：临分帐单查询条件输入页面
* AUTHOR     ：liuyang
* CREATEDATE ：2004-05-28
* MODIFYLIST ：   id       Date            Reason/Contents
*          ------------------------------------------------------
****************************************************************************/
--%>

<%@page import="java.util.*"%>
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic" %>

<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/reins-app.tld" prefix="app" %>

<%
   String operateType = (String)request.getParameter("operateType");
%>
<html:html locale="true">
<head>
<title><bean:message key="prompt.fcoPolicy.TitleName"/></title>
<app:css />
<script src="/reins/common/js/calendar.js"> </script>
<script src="/reins/common/js/showpage.js"> </script>
</head>
<body  >

<form name="fcoReendorForm" action="/reins/recertifyQuery.do?rows=10&opt=facOut" method="post" >

  <table class=common id="QueryInput" cellpadding="3" cellspacing="0">
  <input type="hidden" name="operateType" value='<%=operateType%>'>

  <% System.out.println("operateType=" + operateType); %>


  <tr>
      <td class=title>批单申请号：</td>
      <td class=input><select name="endorNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
       <input type="text"  name="endorNo" class="condition" maxlength="50"></td>
      <td class=title>保单号：</td>
      <td class=input><select name="policyNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
                      <input type="text"  name="policyNo" class="condition" maxlength="44"></td>
  </tr>
  <tr>
      <td class=title>危险单位号：</td>
      <td class=input><select name="dangerNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
                      <input type="text"  name="dangerNo" class="condition" maxlength="5"></td>
                      
	 <td class=title><bean:message key="prompt.fcoRepolicy.UwYear" />：</td>
    <td class=input><select name="uwYearTag" class="tag">
	                  <jsp:include page="StringOption.jsp"/>
                    </select>
                    <input type="text" name="uwYear" class="condition" maxlength="4">
  </tr>

  <tr>
    <td class=title><bean:message key="prompt.fcoRepolicy.InsuredName" />：</td>
    <td class=input><select name="insuredNameTag" class="tag">
	                  <jsp:include page="StringOption.jsp"/>
                    </select>
                    <input type="text" name="insuredName" class="condition" maxlength="100">
    </td>
    
        <td class=title>分批单号：</td>
    <td class=input><select name="recertifyNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
                      <input type="text"  name="recertifyNo" class="condition" maxlength="22"></td>
    <input type="hidden" name="approve" value="1">     <%--已复核标志--%>
  </tr>

  <tr>

    <td class=title>分保方式：</td>
   <td>
    <input type="checkbox" name="reinsType" value="1" checked="checked">临分
	<input type="checkbox" name="reinsType" value="2" checked="checked">混合</td>
                   <input type="hidden" name="biztype" value="E">
    <td class=title>帐单生成状态：</td>
      		 <td class=common1 colspan="3">
    					  <input type="radio" name="accType" value="0" checked="checked" >全部
   						  <input type="radio" name="accType" value="1" >已生成帐单
   						  <input type="radio" name="accType" value="2" >未生成帐单
 					  </td>
  </tr>

<%--add end by zhangTC 20070110分保单帐单/分批单帐单/分赔案帐单生成查询界面增加是否生成过帐单选择查询--%>
  </table>

  <table class=sub>
     <tr class=common>
	     <td><input type="submit" class="button" value="查 询"></td>
	     <td><input type="submit" class="button" value="取 消" onclick="form.reset();return false;" ></td>
     </tr>
  </table>

<jsp:include page="StaticJavascript.jsp" />
<script src="showpage.js"> </script>
<script src="Common.js"> </script>
 </form>
</body>
</html:html>
<script>
  var fm = fcoReendorForm;
