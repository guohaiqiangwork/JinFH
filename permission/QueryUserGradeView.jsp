<%@ page contentType="text/html; charset=GBK" %>
<%@page import="java.util.*"%>
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/app.tld" prefix="app" %>
<html>
<head>
<link href="/reins/permission/common/css/Standard.css" rel="stylesheet" type="text/css">
</head>
<!-- <script language="Javascript" src="/reins/out/treaty/js/FhPriority.js"></script>
 --><script language="javascript">
	function query(){
		 fm.action="/reins/userGrade.do?actionType=query";
         fm.submit();
	}
</script>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" >
<form name="fm" action="/reins/userGrade.do" method="post" >
<table  class="common" cellpadding="3" cellspacing="0">
   <tr>
          <tr>
           <td class=title>Ա�����룺</td>
            <td class=input>
              <select name="UserCodeTag" class="tag">
                 <jsp:include page="/permission/StringOption.jsp"/>
              </select>
              <input type="text"  name="UserCode" class="codestyle" onDblClick="code_CodeSelect(this,'UserCode','1','code');" onkeyup= "code_CodeSelect(this,'UserCode','1','code');">
              <input type="text" name="UserName" class="namestyle" disabled >
            </td>

           <td class=title>����������</td>
            <td class=input>
              <select name="ComCodeTag" class="tag">
                 <jsp:include page="/permission/StringOption.jsp"/>
              </select>
              <input type="text"  name="ComCode" class="codestyle" onDblClick="code_CodeSelect(this,'ComCode','1','code');" onkeyup= "code_CodeSelect(this,'ComCode','1','code');">
              <input type="text" name="ComName" class="namestyle" disabled >
            </td>
          </tr>
  </table>
  <table class=sub>
   <tr class=common>
     <td><input type="button" class="button" value="�� ѯ" onclick="query()" ></td>
   </tr>
</table>
</form>
<jsp:include page="/permission/StaticJavascript.jsp" />
</body>
</html>
