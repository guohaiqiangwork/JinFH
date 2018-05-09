
<%@page contentType="text/html;charset=GBK"%>
<%@page import="java.util.*"%>
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/app.tld" prefix="app" %>
<html>
<head>
<script type="text/javascript" src="/reins/page/templates/common/dtree/dtree.js"></script>
<script type="text/javascript" >
</script>
</head>
<body id="all_title">
<div id="wrapper">
<div id="container">
<form name="fm" action=""	target="companyTreeRight">

	<table width="100%" border="0" cellpadding="5" cellspacing="1">
		<br/>
	<div id="gradeTrees" align="left"></div>
	
	<%
		if(request.getAttribute("actionType").equals("view")){
		%>
	<script language="javascript">
		d = new dTree('d');
		d.add('0','-1','功能列表(功能名称后两选项框分别表示内网，外网权限)按住SHIFT可同时选择下级','','功能列表','','','','',false,false,true);
	<logic:iterate id="SaaGradetask"  name="gradeTasks">  
		d.add('<bean:write name="SaaGradetask"  property="taskCode" />',
		'<bean:write name="SaaGradetask"  property="taskParentCode" />',
		'<bean:write name="SaaGradetask"  property="taskCName" />','','','','','','',true,
		'<bean:write name="SaaGradetask"  property="value" />',true,true,true,
		'<bean:write name="SaaGradetask"  property="intranetValue" />',true,
		'<bean:write name="SaaGradetask"  property="internetValue" />');
	</logic:iterate>   
			document.getElementById("gradeTrees").innerHTML = d;  
   			 function openAndClose(){
     			 if(fom.openCloseAll.value=="展开"){
       			 fom.openCloseAll.value = "合并";
       			 d.openAll();
      			}else{
      			  fom.openCloseAll.value = "展开";
       				 d.closeAll();
      				}
   				 }
	 </script>			
	<% 
		}else{
		%>
		<script language="javascript">
		d = new dTree('d');
		d.add('0','-1','功能列表(功能名称后两选项框分别表示内网，外网权限)按住SHIFT可同时选择下级','','功能列表','','','','',false,false,true);
	   <logic:iterate id="SaaGradetask"  name="gradeTasks">  
  			d.add('<bean:write name="SaaGradetask"  property="taskCode" />',
  			'<bean:write name="SaaGradetask"  property="taskParentCode" />',
  			'<bean:write name="SaaGradetask"  property="taskCName" />','','','','','','',true,
  			'<bean:write name="SaaGradetask"  property="value" />',true,
  			'<bean:write name="SaaGradetask"  property="hasPower" />',true,
  			'<bean:write name="SaaGradetask"  property="intranetValue" />',true,
  			'<bean:write name="SaaGradetask"  property="internetValue" />');
  	   </logic:iterate>   
	document.getElementById("gradeTrees").innerHTML = d; 
    function openAndClose(){
      if(fm.openCloseAll.value=="展开"){
        fm.openCloseAll.value = "合并";
        d.openAll();
      }else{
        fm.openCloseAll.value = "展开";
        d.closeAll();
      }
    }
    function selected(){
    	var listCheckBox=new Array();
    	var listintranetCheckBox=new Array();
    	var listinternetCheckBox=new Array();
    	listCheckBox=fm.treeCheckBox;
    	listintranetCheckBox=fm.intranetCheckBox;
    	listinternetCheckBox=fm.internetCheckBox;
    	for(var i=0;i<listCheckBox.length;i++){
    		if(listCheckBox[i].checked){
    			parent.treeCheckBox(listCheckBox[i]);
    		}
    		if(listintranetCheckBox[i]!=null&&listintranetCheckBox[i].checked){
    			parent.intranetCheckBox(listintranetCheckBox[i]);
    		}
    		if(listinternetCheckBox[i]!=null&&listinternetCheckBox[i].checked){
    			parent.internetCheckBox(listinternetCheckBox[i]);
    		}
    		
    	}
    }
	 </script>	
	<% 
		}
	 %>

	
	<script language="javascript">
    function openAndClose(){
      if(fm.openCloseAll.value=="展开"){//
        fm.openCloseAll.value = "合并";
        d.openAll();
      }else{
        fm.openCloseAll.value = "展开";
        d.closeAll();
      }
    }
    function selected(){
    	var listCheckBox=new Array();
    	var listintranetCheckBox=new Array();
    	var listinternetCheckBox=new Array();
    	listCheckBox=fm.treeCheckBox;
    	listintranetCheckBox=fm.intranetCheckBox;
    	listinternetCheckBox=fm.internetCheckBox;
    	for(var i=0;i<listCheckBox.length;i++){
    		if(listCheckBox[i].checked){
    			parent.treeCheckBox(listCheckBox[i]);
    		}
    		if(listintranetCheckBox[i]!=null&&listintranetCheckBox[i].checked){
    			parent.intranetCheckBox(listintranetCheckBox[i]);
    		}
    		if(listinternetCheckBox[i]!=null&&listinternetCheckBox[i].checked){
    			parent.internetCheckBox(listinternetCheckBox[i]);
    		}
    		
    	}
    }
	 </script>

</table>
</form>
</div>
</div>
</body>
</html>
