<%--
****************************************************************************
* DESC       ������ʧ����ʾҳ��
* AUTHOR     ��zhaijianqiang
* CREATEDATE ��2004-4-27
* MODIFYLIST ��   id       Date            Reason/Contents
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
  String strCaption = ""; //����
  String strTitle = ""; //��Ϣ
  String strContent = ""; //��ϸ��Ϣ
  StringWriter stringWriter = new StringWriter();
  Throwable sysException = (Throwable)request.getAttribute("org.apache.struts.action.EXCEPTION");
  
	if(sysException.getCause()!=null){
		sysException=sysException.getCause();
	}
  sysException.printStackTrace();
  if(sysException instanceof UserException) //�û��쳣
  {
    UserException ue = (UserException)sysException;
    strTitle += "�����û��쳣��";
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
  else if(sysException instanceof SQLException) //SQL�쳣
  {
       String strErrorCode = ((SQLException)sysException).getErrorCode() + "";
       if(strErrorCode.equals("-268")){
           strTitle += "SQLExceptionϵͳ����æ����ˢ�´�ҳ�������ύ����";
       }
       else{
           strTitle += "SQLExceptionϵͳ���ܳ����쳣������ϵͳ����Ա��ϵ";
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
                        if(sysException instanceof UserException) //�û��쳣
                        { 
                    %>
                            <img src='/images/error.gif'
                              style='cursor:hand' alt='��ϸ��Ϣ' onClick="showContent()">
                          </td>
                          <td width="70%">
                            <%=strTitle%>
                          </td>
                        </tr>
                       
                    <%
                        //����SQL�쳣
                        }
                        else if(strTitle.length()>12 && strTitle.substring(0,12).equals("SQLException")){
                    %>
                            <img src='/reins/images/error.gif'
                              style='cursor:hand' alt='��ϸ��Ϣ' onClick="showContent()">
                          </td>
                          <td class="common">
                            <%=strTitle.substring(12)%>
                          </td>
                        </tr>
                      
                    <%
                        //���������쳣
                        }
                        else{
                    %>
                            <img src='/reins/images/error.gif'
                              style='cursor:hand' alt='��ϸ��Ϣ' onClick="showContent()">
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
                 	
                  	 	 <td align="center"><input type="button" class="button" alt="�ر�" value="�ر�" onClick="history.back()"></td>
                 	 
                 	 </tr>
                </table>
        </td>
     </tr>
</table>          
      
      
      
      
      
      
      
      
      
      
      
      
    </body>
</html>
