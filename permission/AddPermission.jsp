<%@page contentType="text/html;charset=GBK"%>
<%@page import="java.util.*"%>
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/app.tld" prefix="app" %>
<html>
<head>
<link href="/permission/common/authorityimages/Standard.css" rel="stylesheet" type="text/css">
<script language="javascript">
	function addMethod(){
		 fm.action="/reins/permission.do?actionType=insert";
		 fm.target="fraInterface";
         fm.submit();
	}
	function updateMethod(){
		 fm.action="/reins/permission.do?actionType=update";
		 fm.target="fraInterface";
         fm.submit();
         return true;
	}
	 function treeCheckBox(treeCheckBox){
  		treeCheckBox.checked=true;
  		document.getElementById("gradeTrees").innerHTML+="<input type='checkbox' name='treeCheckBox' value="+treeCheckBox.value+" checked />";
 	 }
	  function intranetCheckBox(intranetCheckBox){
  		document.getElementById("gradeTrees").innerHTML+="<input type='checkbox' name='intranetCheckBox' value="+intranetCheckBox.value+" checked="+intranetCheckBox.checked+" />";
  	  }
 	 function internetCheckBox(internetCheckBox){
  		document.getElementById("gradeTrees").innerHTML+="<input type='checkbox' name='internetCheckBox' value="+internetCheckBox.value+" checked="+internetCheckBox.checked+" />";
  	}
</script>
</head>
<body id="all_title">
<form name="fm" action="reins/permission.do"	method="post" target="fraInterface">
	<table width="100%" class="fix_table">
		<tr class="top">
			<%
				if (request.getAttribute("actionType").equals("insert")) {
			%>
				<td colspan="6" class=formtitle>岗位增加</td>
			<%
				}else if (request.getAttribute("actionType").equals("update")){
			%>
				<td colspan="6" class=formtitle><!--<img src="/saa/pages/image/imgformtitle.gif" align="absmiddle"> --> 岗位配置</td>
			<%
				}else{
			%>
				<td colspan="6" class=formtitle><!-- <img src="/saa/pages/image/imgformtitle.gif" align="absmiddle">  --> 岗位查看</td>
			<%
				}
			 %>	
		</tr>

		<logic:equal name="actionType" value="view">
			<table class="list" cellspacing="0" cellpadding="3" >
				<tr>
					<td class="centertitle2" width=19%>
						岗位名称中文
					</td>
					<td class="centertitle2" width=25%>
						岗位名称英文
					</td>
					<td class="centertitle2" width=14%>
						岗位繁体名称
					</td>
					<td class="centertitle2" width=14%>
						岗位归属机构
					</td>
					<td class="centertitle2" width=14%>
						岗位性质
					</td>
					<td class="centertitle2" width=14%>
						有效标志
					</td>
				</tr>
				<tr class=common>
					<td>
						<bean:write name="SaaGrade" property="gradeCName"/>
					</td>
					<td>
						<bean:write name="SaaGrade" property="gradeEName"/>
					</td>
					<td>
						<bean:write name="SaaGrade" property="gradeTName"/>
					</td>
					<td>
						<bean:write name="SaaGrade" property="comCode"/>
					</td>
					<td>
						<logic:equal name="SaaGrade" property="commonGrade" value="1" >公有</logic:equal>
						<logic:equal name="SaaGrade" property="commonGrade" value="0" >私有</logic:equal>
					</td>
					<td>
						<logic:equal name="SaaGrade" property="validStatus" value="1" >有效</logic:equal>
						<logic:equal name="SaaGrade" property="validStatus" value="0" >无效</logic:equal>
					</td>
				</tr>
			</table>			
		</logic:equal>
	
	<logic:equal name="actionType" value="update">
			<input type="hidden"  name="ID" value="<bean:write name="SaaGrade" property="id"/>"/>
			<tr>
				<td class="bgc_tt short">岗位名称中文</td>
				<td class="long"><input type="text"  name="gradecname" value="<bean:write name="SaaGrade" property="gradeCName"/>"/></td>
				<td class="bgc_tt short">岗位名称英文</td>
				<td class="long"><input type="text" name="gradeename"  value="<bean:write name="SaaGrade" property="gradeEName"/>"/></td>				
				<td class="bgc_tt short">岗位繁体名称</td>
				<td class="long"><input type="text" name="gradetname" value="<bean:write name="SaaGrade" property="gradeTName"/>"/></td>			
				
			</tr>
			<tr>
				<td class="bgc_tt short">岗位归属机构</td>
				<td class="long"><input type="text" name="comcode" value="<bean:write name="SaaGrade" property="comCode"/>"/></td>
				<td class="bgc_tt short">岗位性质</td>
				<td class="long">
					<logic:equal name="SaaGrade" property="commonGrade" value="1" >
						<select class="three" name="commongrade">
                     		<option value="1">公有</option>
					 		<option value="0">私有</option>
						</select>
					</logic:equal>
					<logic:equal name="SaaGrade" property="commonGrade" value="0" >
						<select class="three" name="commongrade">
                     		<option value="0">私有</option>
					 		<option value="1">公有</option>
						</select>
					</logic:equal>
				</td>

				<td class="bgc_tt short">有效标志</td>
				<td class="long">
				<logic:equal name="SaaGrade" property="validStatus" value="1" >
				<select  class="three" name="validstatus">
                     <option value="1">有效</option>
					 <option value="0">无效</option>
				</select>
				</logic:equal>
				<logic:equal name="SaaGrade" property="validStatus" value="0" >
				<select  class="three" name="validstatus">
					 <option value="0">无效</option>
                     <option value="1">有效</option>
				</select>
				</logic:equal>
				</td>
			</tr>
	</logic:equal>
    
     
     <logic:equal name="actionType" value="insert">

			<tr>
				<td class="bgc_tt short">岗位名称中文</td>
				<td class="long"><input type="text"  name="gradecname"/></td>
				<td class="bgc_tt short">岗位名称英文</td>
				<td class="long"><input type="text" name="gradeename"/></td>				
				<td class="bgc_tt short">岗位繁体名称</td>
				<td class="long"><input type="text" name="gradetname"/></td>				
			</tr>
			<tr>
				<td class="bgc_tt short">岗位归属机构</td>
				<td class="long"><input type="text" name="comcode"/></td>
				<td class="bgc_tt short">岗位性质</td>
				<td class="long">
					<select class="three" name="commongrade">
					 	<option value="0">私有</option>
                     	<option value="1">公有</option>
					</select>
				</td>
				<!--  <td class="long""><s:select name="grade.commonGrade" 
					list="#{'1':'公有','0':'私有'}" /></td>		-->	
				<td class="bgc_tt short">有效标志</td>
				<td class="long">
				<select class="three" name="validstatus">
					 <option value="0">无效</option>
                     <option value="1">有效</option>
				</select>
				</td>
			</tr>
     </logic:equal>
	</table>
	<!-- 
		<iframe id="taskIframe" name="reins" frameborder="0" width="100%" height="80">再保险系统</iframe>  -->
		<h4 align="center" >再保险系统功能</h4>
	
	<jsp:include page="/permission/tasksView.jsp"/> 
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr align="center" class="top">
			<logic:equal name="actionType" value="insert">
				<td><input type="button" value="确定" class="button"
				onclick="addMethod()"></td>
				<td><input type="button"  value="返回" class="button"
				onclick="history.back();"></td>
			</logic:equal>	
			<logic:equal name="actionType" value="update">
				<td><input type="button" value="保存" class="button"
					onclick="return updateMethod()"></td>
			</logic:equal>	
			<logic:equal name="actionType" value="view">
				<td><input type="button"  value="返回" class="button"
				onclick="history.back();"></td>
			</logic:equal>	
		</tr>
	</table>
</form>
<jsp:include page="/permission/StaticJavascript.jsp" />
</body>
</html>
