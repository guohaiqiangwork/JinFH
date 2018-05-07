<%--
****************************************************************************
* DESC       ：操作成功提示页面
* AUTHOR     ：zhaijianqiang
* CREATEDATE ：2004-4-27
* MODIFYLIST ：   id       Date            Reason/Contents
*          ------------------------------------------------------
****************************************************************************/
--%>
<%@page contentType="text/html;charset=GBK"%>
<%@page import="java.util.*"%>
<%@ taglib uri="/WEB-INF/reins-app.tld" prefix="app" %>
<%
   String accType = request.getParameter("accType");
   String type1 = request.getParameter("type1");
   if(type1==null||type1.equals("")){
   type1  = (String)request.getAttribute("type1");
   }
%>
<html:html locale="true">
<head>
   <app:css />
	
<script language="javascript">   
  function accDelete()
  {
     var accType = "<%=accType%>";
     window.alert("所选帐单已成功删除！\n冲销帐单、被冲销帐单以及转收付帐单不删除。");
     var fm = "";
     
     //*add begin huangyq 20060510 20060303_033*/
     if (accType=="L")
     {
         fm = window.parent.fraInterface.RepayForm;
     }
     else
     {
         fm = window.parent.fraInterface.fcoRepolicyListForm;
     }
     //*add end huangyq 20060510 20060303_033*/
     fm.target = "fraInterface";
     fm.action="/reins/fzAccQuery.do"
     fm.submit();
     return false;
  }
  function genAccSuccess()
  {
     var fm = opener.parent.fraInterface.fcoRepolicyListForm;
     fm.target = "fraInterface";
     fm.action="/reins/fzAccQuery.do"
     fm.submit();
     return false;
  }
</script>   
</head>
<body class="bg" >
<form name=fm>

  
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
		                   <%
                       String content = (String)request.getAttribute("content");
                       String url     = (String)request.getAttribute("url");
                       String forward = "";
                       if (url == null || url.equals(""))
                       {
                           forward = "javascript:close();";
                       }else{
                           forward = "javascript:genAccSuccess();window.close();";
                       }
                       if (content == null || content.equals(""))
                       {
                           out.print("操作成功！");
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
                 <tr>
                   <td  align="center">
                   <%
                     if(type1.equals("Settle"))
                     {
                   %>
                     <input type="button"  class="button" value="关 闭" src="/reins/images/button-cancel.gif" onClick="window.hisory.go(-1);">
                 <% 
                     }else
                     {
                   %>
                     <a href="<%=forward%>" class="reins" >[ 关闭 ]</a>
                   <%}%>
                   <td>
                 </tr>
               </table>   
        </td>
     </tr>
</table>    
  
  
  
  
  
</form>  
</body>
</html:html>
<%
 if(type1!=null && type1.equals("Delete")) {%>
<script language="javascript">
  accDelete();
</script>
<%}%>
<script>
  function back(url)
  {        
  	  if (url == null || url == "")
      {
         history.back();
      }
      else
      {
         window.location=url;
      }
  }
</script>
