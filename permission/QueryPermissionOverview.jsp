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
            alert('û�м�¼!');
            return false;
        }else 
        if(count==1){
            var ret = window.confirm("��ȷ��Ҫ���ĸ�Ա��Ȩ����");
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
                alert('��ѡ��һ����¼');
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
	            alert("��ѡ��һ����¼");
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
	            alert("ֻ��ѡ��һ����¼");
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
            alert('û�м�¼!');
            return false;
         }else{
        	var n = 0;
        	for(var i=0;i<fm.checkboxSelect.length;i++){
        	    if(fm.checkboxSelect[i].checked==true){
        	        n = n + 1;
        	    }
       	 	}
	        if(n==0){
	            alert("��ѡ��һ����¼");
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
      <td class="centertitle"  colspan="2">�ٱ���λ����</td>
      <td class="centertitle" >��������</td>
      <td class="centertitle" >����ʱ��</td>
      <td class="centertitle" >״̬</td>
   </tr>
   <logic:notEmpty  name="saaGradeList"> 
   <logic:iterate id="saaGrade"  name="saaGradeList">  
    
    <tr class=common>
      <td  width="5%"  ><input type="radio" name="checkboxSelect" value="<bean:write name="saaGrade" property="id" />" ></td>
      <td  width="20%" ><bean:write name="saaGrade" property="gradeCName"/></td>
      <td  width="25%" ><bean:write name="saaGrade" property="comCode"/></td>
      <td  width="25%" ><bean:write name="saaGrade" property="createTime"/></td>
      <td  width="25%" >
      <logic:equal name="saaGrade" property="validStatus" value="0">��Ч</logic:equal>
      <logic:equal name="saaGrade" property="validStatus" value="1">��Ч</logic:equal>
    </tr>
   </logic:iterate>
    </logic:notEmpty>
  </table>
  
  <table class="sub">
    <tr class=common>
    	 <td><input type="button" class="button" value="�鿴" onclick="return checkMethod()" title=" �� �� "></td>
        <td><input type="button" class="button" value="�� ��" onclick="prepareInsert()" title=" �� �� "></td>
        <td><input type="button" class="button" value="�� ��" onclick="return prepareUpdate()" title="�� ��" ></td>
    </tr>
  </table>
</form>
<jsp:include page="/permission/StaticJavascript.jsp" />
</body>
</html>
