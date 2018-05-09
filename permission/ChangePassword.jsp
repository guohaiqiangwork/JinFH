<%--
****************************************************************************
* DESC       ：密码修改页面
* AUTHOR     ：qjc
* CREATEDATE ：2004-08-09
* MODIFYLIST ：   id       Date            Reason/Contents
*          ------------------------------------------------------
****************************************************************************/
--%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@page import="java.util.*"%>
<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/reins-app.tld" prefix="app" %>
<html>
<head>
	  <title>修改密码</title>
        <app:css />
    <STYLE>BODY {
	          SCROLLBAR-FACE-COLOR:#F6FCFE;
            SCROLLBAR-HIGHLIGHT-COLOR:#4D9AC4;
            SCROLLBAR-SHADOW-COLOR:#4D9AC4;
            SCROLLBAR-3DLIGHT-COLOR:#F6FCFE;
            SCROLLBAR-ARROW-COLOR:#F6FCFE;
            SCROLLBAR-TRACK-COLOR:#F6FCFE;
            SCROLLBAR-DARKSHADOW-COLOR:#F6FCFE;
    }
    </STYLE>

    <title>用户信息</title>
    <script language="javascript">
		function changePassword(userCode){
  			var fm = changePasswordForm;
    		if(fm.newPassword.value!= fm.secondPassword.value)
    		{
		    	alert("两次录入的密码不一致！");
		    	return false;
		    }
    		fm.action="/reins/changePassword.do?userCode=" + userCode;
			fm.submit();
			}
    </script>
   
</head>
<body class="interface" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<form name ="changePasswordForm" method="post" >
             <table class=common border="0" cellspacing="1" cellpadding="3">
             	<tr>
      	        <td class=formtitle colspan="2"> 修改密码 </td>
              </tr>
             <%
             	String userCode = request.getParameter("userCode");
             	String userCName = request.getParameter("userCName");
              %>
          	  <tr>
                <td class=title>员工代码：</td>
                <td class=input><input name="userCode" type="text" class="common" maxlength="10" value=<%=userCode %> readonly/></td>
             	<td class=title>员工名称：</td>
                <td class=input><input name="userName" type="text" class="common" maxlength="10" value=<%=userCName %> readonly/></td>
              </tr>
              
              <tr>
                <td class=title>旧密码：</td>
                <td class=input><input name="oldPassword" type="text" class="common" maxlength="10"/></td>
              </tr>
              <tr> 
                <td class=title>新密码：</td>
                <td class=input><input name="newPassword" type="password" class="common" maxlength="10"/></td>
              </tr>
              <tr> 
                <td class=title>重复密码：</td>
                <td class=input><input name="secondPassword" type="password" class="common" maxlength="10"/></td>
              </tr> 
            </table>
            <table width="100%">
              <tr > 
                  <td align="center" >
                  <input type="button" class="button" value="确定" onclick="changePassword(<%=userCode%>);"> </td>
              </tr>
            </table>
</form>
</body>
<jsp:include page="/permission/StaticJavascript.jsp"/> 

</html>
