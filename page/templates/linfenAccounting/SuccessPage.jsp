<!-- add by zjy 2014-2-28 -->
<%--
****************************************************************************
* DESC       �������ɹ���ʾҳ��
* AUTHOR     ��zhaijianqiang
* CREATEDATE ��2004-4-27
* MODIFYLIST ��   id       Date            Reason/Contents
*          ------------------------------------------------------
****************************************************************************/
--%>
<%@page contentType="text/html;charset=GBK" %> 
<%@page import="java.util.*"%>
<%@ taglib uri="/WEB-INF/reins-app.tld" prefix="app" %>
<html:html locale="true">
<head>
   <app:css />
  
</head>
<body class="bg" >

  
  <table width="100%"  border="0" cellpadding="0" cellspacing="0">
     <tr>
         <td align="center">
             <table width="353" cellpadding="0" cellspacing="0" align="center">
			          <tr><td><img src='/reins/images/imgmessage.gif'></td></tr> 
                <tr>
				           	<td class="common" height=141px align="center" background="/reins/images/bgmessage.gif">
				           	<table class=sub>
				           	  <tr><td width=40% class=common1 align=center ><img src='/reins/images/message.gif'></td>
		                  <td width=60% class=common1>
		                    <% String content = (String)request.getAttribute("content");
             String url     = (String)request.getAttribute("url");
             System.out.print("url==="+url);
             if (url == null || url.equals(""))
             {
                 url = "";
             }
             if (content == null || content.equals(""))
             {
                 out.print("�����ɹ���");
             }
             else
             { 
                 out.print(content);
             }%>
		                  </td>
				           		</tr>
				           		</table>
				           	</td>
				           </tr>
               </table>  
               <table class=sub>
                 <tr >
                   <td align=center>
                   <%if (url.equals("")){
                   	%>
                   	<input class="button" name="buttonClose" type="button" alt="�ر�" value="����" onClick="history.go(-1);return false;">
                   <%}else{%>
                     <a href="javascript:back('<%=url%>')" class="reins" >[ ���� ]</a>
                   <%}%>
                   <td>
                 </tr>
               </table>   
        </td>
     </tr>
</table>    
     
</body>
</html:html>
<script>
  function back(url)
  {        
      if (url == null || url == "")
      {
         history.back(-1);
      }
      else
      {
         window.location=url;
      }
  }
</script>
