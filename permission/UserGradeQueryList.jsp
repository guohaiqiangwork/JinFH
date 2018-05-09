<%@page contentType="text/html;charset=GBK"%>
<%@page import="java.util.*"%>
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/reins-app.tld" prefix="app" %>
<html:html locale="true">
<head>
    <app:css />
   
	<title>人员管理</title>
	        <script src="/permission/common/js/showpage.js"> </script>
	<html:base/>
</head>
<script language="javascript">
function queryTask(i){
	    var aName = "userCode"+i;
	    var userCode = document.getElementsByName(aName)[0].value;
		fm.action = "/reins/userGrade.do?actionType=queryTask&userCode=" + userCode +"";
        fm.target="fraInterface";
        fm.submit();
    }
    
function deleteTask(i){
	    var aName = "userCode"+i;
	    var userCode = document.getElementsByName(aName)[0].value;
		fm.action = "/reins/userGrade.do?actionType=deleteTask&userCode=" + userCode +"";
        fm.target="fraInterface";
        fm.submit();
}

function changePassword(i){
	var aCode = "userCode"+i;
	var aCName = "userName"+i;
	var userCode = document.getElementsByName(aCode)[0].value;
	var userCName = document.getElementsByName(aCName)[0].value;
	//var userCName = document.getElementsByName(aName)[0].parentNode.nextSibling.childNodes[0].value;
	fm.action = "/reins/permission/ChangePassword.jsp?userCode=" + userCode + "&userCName=" +userCName;
	fm.target="fraInterface";
    fm.submit();
}    
 </script>
 
<body>
<html:errors /> 
<form name="fm" action="/reins/userGrade.do?actionType=query" method="post">
        <html:hidden name="abstractForm" property="rgrade"/>
		<html:hidden name="abstractForm" property="wgrade"/>
		<html:hidden name="abstractForm" property="xgrade"/>
		<html:hidden name="abstractForm" property="pageNo"/>
		<html:hidden name="abstractForm" property="rowsCount"/>
		<html:hidden name="abstractForm" property="rowsPerPage"/>
<script language="JavaScript" >

</script>        
  <table class="list" cellpadding="3" cellspacing="0" >   
    <tr>
      <td class="centertitle" >员工代码</td>
      <td class="centertitle" >员工名称</td>
      <td class="centertitle" >岗位中文描述</td>  
      <td class="centertitle" >创建时间</td>
      <td class="centertitle" ></td>
   </tr>
   <logic:notEmpty  name="gradeList"> 
      <% int i = 0 ;%>
   <logic:iterate id="PrpDuser"  name="gradeList">  
    <tr class=common>
      <td  width="10%" ><input type="hidden" name="userCode<%=++i %>" value="<bean:write name="PrpDuser" property="userCode"/>" />
      <bean:write name="PrpDuser" property="userCode"/>
      </td>
      <td  width="18%" ><input type="hidden" name="userName<%=i %>" value="<bean:write name="PrpDuser" property="username"/>" />
      <bean:write name="PrpDuser" property="username"/></td>      
      <td  width="18%" ><input type="hidden" name=gradeCName value="<bean:write name="PrpDuser" property="gradeCName"/>" />
      <bean:write name="PrpDuser" property="gradeCName"/></td> 
      <td  width="14%" ><input type="hidden" name=createTime value="<bean:write name="PrpDuser" property="createTime"/>" />
      <bean:write name="PrpDuser" property="createTime"/></td>
      <td width="30%">
    	<input type="button" class="button" value="配置" onclick="return queryTask(<%=i%>)">
    	<input type="button" class="button" value="重置" onclick="return deleteTask(<%=i%>)">
    	<input type="button" class="button" value="密码管理" onclick="changePassword(<%=i%>)"/>
      </td>
    </tr>
   	</logic:iterate>
    </logic:notEmpty>
  </table>
  <app:navigate name="fm" objectname="abstractForm"  hasCheckbox="true" />
<script src="/permission/common/js/Repolicy.js"> </script>
<jsp:include page="/permission/StaticJavascript.jsp"/> 
<script src="/permission/common/js/showpage.js"> </script>
</form>
</body>
</html:html>
