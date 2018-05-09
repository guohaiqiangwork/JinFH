<%@page contentType="text/html;charset=GBK"%>
<%@page import="java.util.*"%>
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/app.tld" prefix="app" %>
<html>
<head>
<link href="/permission/common/css/Standard.css" rel="stylesheet" type="text/css">
</head>
<script>   
function prepareInsert(){
      fm.action="/reins/permission.do?actionType=prepareInsert&rootTaskCode=reins";
      fm.submit();
   }
function prepareUpdate(){
	 var count = getElementCount('checkboxSelect');
         if(count==0){
            alert('没有记录!');
            return false;
        }else 
        if(count==1){
            var ret = window.confirm("您确定要更改该员工权限吗？");
    		if (!ret){
        			return;
   				 }
            if(fm.checkboxSelect.checked==true){
            	var checkboxSelect = fm.checkboxSelect.value;
                fm.action = '/reins/permission.do?actionType=prepareUpdate&rootTaskCode=reins';
                fm.target="fraInterface";
                fm.submit();
                return true;
            }else{
                alert('请选择一条记录');
                return false;
            }
           } else{
        	var n = 0;
        	for(var i=0;i<fm.checkboxSelect.length;i++){
        	    if(fm.checkboxSelect[i].checked==true){
        	        n = n + 1;
        	    }
       	 	}
	        if(n==0){
	            alert("请选择一条记录");
	            return false;
	        }
	        else if(n==1){
	            for(var j=0;j<fm.checkboxSelect.length;j++){
	                if(fm.checkboxSelect[j].checked==true){
	                   var checkboxSelect = fm.checkboxSelect[j].value;
	                   fm.action ='/reins/permission.do?actionType=prepareUpdate&rootTaskCode=reins';
	                   fm.target="fraInterface";
	                   fm.submit();
	                   break;
	                 }
	            }
	        }
	        else{
	            alert("只能选择一条记录");
	            return false;
	        }
	        return true;
	    	}
}   

function prepareQuery(){
	fm.action = "/reins/permission.do?actionType=view&rootTaskCode=reins";
	fm.submit();
}

function checkMethod(){
        var count = getElementCount('checkboxSelect');
         if(count==0){
            alert('没有记录!');
            return false;
         }else{
        	var n = 0;
        	for(var i=0;i<fm.checkboxSelect.length;i++){
        	    if(fm.checkboxSelect[i].checked==true){
        	        n = n + 1;
        	    }
       	 	}
	        if(n==0){
	            alert("请选择一条记录");
	            return false;
	        }
	        else{
	            for(var j=0;j<fm.checkboxSelect.length;j++){
	                if(fm.checkboxSelect[j].checked==true){
	                   var ID = fm.checkboxSelect[j].value;
	                   fm.action = '/reins/permission.do?actionType=view&gradeID='+ ID +'&rootTaskCode=reins';
	                   fm.target="fraInterface";
	                   fm.submit();
	                   break;
	                 }
	            }
	        }
	      return true;
	    }
    }

</script>
<body >
<form name="fm" action="reins/permission.do" method="post" >
  <table class="list" cellpadding="5" cellspacing="0" id="saaGrade" >   
    <tr>
      <td class="centertitle"  colspan="2">再保岗位管理</td>
      <td class="centertitle" >归属机构</td>
      <td class="centertitle" >创建时间</td>
      <td class="centertitle" >状态</td>
   </tr>
   <logic:notEmpty  name="saaGradeList"> 
   <logic:iterate id="saaGrade"  name="saaGradeList">  
    
    <tr class=common>
      <td  width="5%"  ><input type="radio" name="checkboxSelect" value="<bean:write name="saaGrade" property="id" />" ></td>
      <td  width="20%" ><bean:write name="saaGrade" property="gradeCName"/></td>
      <td  width="25%" ><bean:write name="saaGrade" property="comCode"/></td>
      <td  width="25%" ><bean:write name="saaGrade" property="createTime"/></td>
      <td  width="25%" >
      <logic:equal name="saaGrade" property="validStatus" value="0">无效</logic:equal>
      <logic:equal name="saaGrade" property="validStatus" value="1">有效</logic:equal>
    </tr>
   </logic:iterate>
    </logic:notEmpty>
  </table>
  
  <table class="sub">
    <tr class=common>
    	 <td><input type="button" class="button" value="查看" onclick="return checkMethod()" title=" 查 看 "></td>
        <td><input type="button" class="button" value="增 加" onclick="prepareInsert()" title=" 增 加 "></td>
        <td><input type="button" class="button" value="配 置" onclick="return prepareUpdate()" title="配 置" ></td>
    </tr>
  </table>
</form>
<jsp:include page="/permission/StaticJavascript.jsp" />
</body>
</html>
