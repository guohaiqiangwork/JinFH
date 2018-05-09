<%--
****************************************************************************
* DESC       ：操作失败提示页面
* AUTHOR     ：zhaijianqiang
* CREATEDATE ：2004-4-27
* MODIFYLIST ：   id       Date            Reason/Contents
*          ------------------------------------------------------
****************************************************************************/
--%>
<%@ page contentType="text/html;charset=GBK" %>
<%@page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="com.sinosoft.sysframework.exceptionlog.UserException"%>
<%@ page isErrorPage="true"%>
<%@ taglib uri="/WEB-INF/app.tld" prefix="app" %>
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic" %>

<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>
<%-- <%response.setHeader("cache-control","public"); %>
 --%>
 <%
  String strCaption = ""; //标题
  String strTitle = ""; //信息
  String strContent = ""; //详细信息
  StringWriter stringWriter = new StringWriter();
  Throwable sysException = (Throwable)request.getAttribute("org.apache.struts.action.EXCEPTION");
  
	if(sysException.getCause()!=null){
		sysException=sysException.getCause();
	}
  sysException.printStackTrace();
  if(sysException instanceof UserException) //用户异常
  {
    UserException ue = (UserException)sysException;
    strTitle += "出现用户异常：";
    strTitle += ue.getErrorMessage() +"<br>";
    strContent += "<table>";
    strContent += "  <tr>";
    strContent += "    <td>";
    strContent += "      ErrorCatalog:";
    strContent += "    </td>";
    strContent += "    <td>";
    strContent += ue.getErrorCatalog();
    strContent += "    </td>";
    strContent += "  </tr>";
    strContent += "  <tr>";
    strContent += "    <td>";
    strContent += "      ErrorNo:";
    strContent += "    </td>";
    strContent += "    <td>";
    strContent += ue.getErrorNo();
    strContent += "    </td>";
    strContent += "  </tr>";
    strContent += "  <tr>";
    strContent += "    <td>";
    strContent += "      ErrorModule:";
    strContent += "    </td>";
    strContent += "    <td>";
    strContent += ue.getErrorModule();
    strContent += "    </td>";
    strContent += "  </tr>";
    strContent += "</table>";
  }
  else if(sysException instanceof SQLException) //SQL异常
  {
       String strErrorCode = ((SQLException)sysException).getErrorCode() + "";
       if(strErrorCode.equals("-268")){
           strTitle += "SQLException系统正在忙，请刷新此页面重新提交即可";
       }
       else{
           strTitle += "SQLException系统可能出现异常，请与系统管理员联系";
       }
      Exception sqlException = (SQLException)sysException;
      if(sqlException!=null)
      {
          sqlException.printStackTrace(new PrintWriter(stringWriter));
          strContent = stringWriter.toString();
      }
  }
  else{
      Exception systemException = (Exception)sysException;
      if(systemException!=null)
      {
          strTitle = systemException.getMessage();
          if(strTitle==null)
          {
            strTitle = "SystemException----------";
          }
          strTitle = strTitle + "<br>";   
          systemException.printStackTrace(new PrintWriter(stringWriter));
          strContent = stringWriter.toString();
      }
  }
%>
<html>
    <head>
        <app:css />
        <script language=javascript>
        function showContent()
        {
          if(trContent.style.display=='')
            trContent.style.display = 'none';
          else
            trContent.style.display = '';
        }
        </script>
    </head>
    
<body>
  
<table width="100%"  border="0" cellpadding="0" cellspacing="0">
     <tr>
         <td align="center">
            
				           	<table width="400px"  border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td colspan="2"><%=strCaption%></td>
                        </tr>
                        <tr class=common>
                          <td align=center width="30%">
                    <%
                        if(sysException instanceof UserException) //用户异常
                        { 
                    %>
                            <img src='/images/error.gif'
                              style='cursor:hand' alt='详细信息' onClick="showContent()">
                          </td>
                          <td width="70%">
                            <%=strTitle%>
                          </td>
                        </tr>
                       
                    <%
                        //处理SQL异常
                        }
                        else if(strTitle.length()>12 && strTitle.substring(0,12).equals("SQLException")){
                    %>
                            <img src='/reins/images/error.gif'
                              style='cursor:hand' alt='详细信息' onClick="showContent()">
                          </td>
                          <td class="common">
                            <%=strTitle.substring(12)%>
                          </td>
                        </tr>
                      
                    <%
                        //处理其他异常
                        }
                        else{
                    %>
                            <img src='/reins/images/error.gif'
                              style='cursor:hand' alt='详细信息' onClick="showContent()">
                          </td>
                          <td >
                            <%=strTitle%>
                          </td>
                        </tr>
                       
                    <%
                        }
                    %>
                      </table>
     
             <table class=sub id="trContent" style="display:none">
                  <tr>
                       <td >
                            <pre><%=strContent%></pre>
                       </td>
                  </tr>
             </table>
                <table class=sub>
                 	 <tr>
                 	
                  	 	 <td align="center"><input type="button" class="button" alt="关闭" value="关闭" onClick="history.back()"></td>
                 	 
                 	 </tr>
                </table>
        </td>
     </tr>
</table>          
      
      
      
      
      
      
      
      
      
      
      
      
    </body>
</html>
