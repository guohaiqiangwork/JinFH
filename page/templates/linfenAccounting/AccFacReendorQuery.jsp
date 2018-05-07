<%@page contentType="text/html;charset=GBK"%><%--
****************************************************************************
* DESC       ���ٷ��ʵ���ѯ��������ҳ��
* AUTHOR     ��liuyang
* CREATEDATE ��2004-05-28
* MODIFYLIST ��   id       Date            Reason/Contents
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
      <td class=title>��������ţ�</td>
      <td class=input><select name="endorNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
       <input type="text"  name="endorNo" class="condition" maxlength="50"></td>
      <td class=title>�����ţ�</td>
      <td class=input><select name="policyNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
                      <input type="text"  name="policyNo" class="condition" maxlength="44"></td>
  </tr>
  <tr>
      <td class=title>Σ�յ�λ�ţ�</td>
      <td class=input><select name="dangerNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
                      <input type="text"  name="dangerNo" class="condition" maxlength="5"></td>
                      
	 <td class=title><bean:message key="prompt.fcoRepolicy.UwYear" />��</td>
    <td class=input><select name="uwYearTag" class="tag">
	                  <jsp:include page="StringOption.jsp"/>
                    </select>
                    <input type="text" name="uwYear" class="condition" maxlength="4">
  </tr>

  <tr>
    <td class=title><bean:message key="prompt.fcoRepolicy.InsuredName" />��</td>
    <td class=input><select name="insuredNameTag" class="tag">
	                  <jsp:include page="StringOption.jsp"/>
                    </select>
                    <input type="text" name="insuredName" class="condition" maxlength="100">
    </td>
    
        <td class=title>�������ţ�</td>
    <td class=input><select name="recertifyNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
                      <input type="text"  name="recertifyNo" class="condition" maxlength="22"></td>
    <input type="hidden" name="approve" value="1">     <%--�Ѹ��˱�־--%>
  </tr>

  <tr>

    <td class=title>�ֱ���ʽ��</td>
   <td>
    <input type="checkbox" name="reinsType" value="1" checked="checked">�ٷ�
	<input type="checkbox" name="reinsType" value="2" checked="checked">���</td>
                   <input type="hidden" name="biztype" value="E">
    <td class=title>�ʵ�����״̬��</td>
      		 <td class=common1 colspan="3">
    					  <input type="radio" name="accType" value="0" checked="checked" >ȫ��
   						  <input type="radio" name="accType" value="1" >�������ʵ�
   						  <input type="radio" name="accType" value="2" >δ�����ʵ�
 					  </td>
  </tr>

<%--add end by zhangTC 20070110�ֱ����ʵ�/�������ʵ�/���ⰸ�ʵ����ɲ�ѯ���������Ƿ����ɹ��ʵ�ѡ���ѯ--%>
  </table>

  <table class=sub>
     <tr class=common>
	     <td><input type="submit" class="button" value="�� ѯ"></td>
	     <td><input type="submit" class="button" value="ȡ ��" onclick="form.reset();return false;" ></td>
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
