
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
 
 function addMethod(){
        	var n = 0;
        	for(var i=0;i<fm.chooseflag.length;i++){
        	    if(fm.chooseflag[i].checked==true){
        	        n = n + 1;
        	    }
       	 	}
	        if(n==0){
	            alert("请选择一条记录");
	            return false;
	        }
	        else if(n==1){
	            for(var j=0;j<fm.chooseflag.length;j++){
	                if(fm.chooseflag[j].checked==true){
	                   var chooseflag = fm.chooseflag[j].value;
	                   var validstatus = fm.validstatus[j].value;
	                   fm.action ="/reins/userGrade.do?actionType=insert&validstatus="+ validstatus +"";
	                   fm.target="fraInterface";
	                   fm.submit();
	                   break;
	                 }
	            }
	        }
	        return true;
 	}
 </script>
 
<body>
<html:errors /> 
<form name="fm" action="/reins/userGrade.do" method="post">
<script language="JavaScript" >
 
</script>        
    
  <table class="list" cellpadding="3" cellspacing="0" >   
  		<tr>
			<td colspan="4" class=formtitle><!-- <img src="" align="absmiddle">  -->员工岗位</td>
		</tr>
		<tr>
			<td class="bgc_tt short">员工代码</td>
			<td class="long"><bean:write name="saa_gradeDto" property="userCode" /></td>
			 <input type="hidden" name="userCode" value="<bean:write name="saa_gradeDto" property="userCode"/>"/> 
		</tr>
		<tr>
			<td colspan="4"  class=formtitle><!-- <img src="" align="absmiddle">  -->岗位列表</td>
		</tr>
  	<input type="hidden" name="creatorcode" value="<bean:write name="saa_gradeDto" property="creatorCode"/>"/>
	<input type="hidden" name="updatercode" value="<bean:write name="saa_gradeDto" property="updaterCode"/>"/>
	<input type="hidden" name="gradecname" value="<bean:write name="saa_gradeDto" property="gradeCName"/>"/>	
	<input type="hidden" name="invalidDate" value="<bean:write name="saa_gradeDto" property="invalidDate"/>"/>
	
    <tr>
      <td class="centertitle" ></td>
      <td class="centertitle" >岗位代码</td>
      <td class="centertitle" >岗位中文名称</td>  
      <td class="centertitle" >归属机构</td>
      <td class="centertitle" >有效标志</td>
   </tr>

   <logic:notEmpty  name="gradeList">  
   <logic:iterate id="SaaGrade"  name="gradeList">  
    <tr class=common>
      <td  width="5%"  ><input type="radio" name="chooseflag" value="<bean:write name="SaaGrade" property="id" />" ></td>
      <td  width="18%">	<bean:write name="SaaGrade" property="id"/></td>
      <td  width="18%" >
		<input type="hidden" name="gradecname" value="<bean:write name="SaaGrade" property="gradeCName"/>"/>
      <bean:write name="SaaGrade" property="gradeCName"/></td> 
      <td  width="14%" ><bean:write name="SaaGrade" property="comCode"/></td>
      <td  width="14%" >
        <input type="hidden" name="validstatus" value="<bean:write name="SaaGrade" property="validStatus"/>"/>
      	<logic:equal name="SaaGrade" property="validStatus" value="1">有效</logic:equal>
      	<logic:equal name="SaaGrade" property="validStatus" value="0">无效</logic:equal>    			      			
      </td>
    </tr>
   </logic:iterate>
    </logic:notEmpty>
  </table>
  
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr align="center" class="top">
		<td><input type="button" value="保存" class="button"
				onclick="return addMethod()"></td>
		<td><input type="button" value="返回" class="button"
					onclick="javascript:history.back();"></td>
		</tr>
	</table>
<script src="/permission/common/js/Repolicy.js"> </script>
<jsp:include page="/permission/StaticJavascript.jsp"/> 
<script src="/permission/common/js/showpage.js"> </script>
</form>
</body>
</html:html>
