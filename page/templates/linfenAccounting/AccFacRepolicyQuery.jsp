<%--
****************************************************************************
* DESC       ：临分帐单查询条件输入页面
* AUTHOR     ：liuzhanlong
* CREATEDATE ：2005-06-01
* MODIFYLIST ：   id       Date            Reason/Contents
*          ------------------------------------------------------
****************************************************************************/
--%>
<%@page contentType="text/html;charset=GBK"%>
<%@page import="java.util.*"%>
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic" %>

<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/reins-app.tld" prefix="app" %>

<html:html locale="true">
<head>
<app:css />
<script src="/reins/page/templates/linfenAccounting/showpage.js"> </script>
</head>
<body>

<form name="fcoRepolicyForm" >

  <table  id="QueryInput" class="common" cellpadding="3" cellspacing="0">
  <input type="hidden" name="operateType" value="Gen">
  <input type="hidden" name="opt" value="">
  <tr>
      <td class=title>保单号：</td>
      <td class=input><select name="policyNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
                      <input type="text"  name="policyNo" class="condition" maxlength="44"></td>
      <td class=title>危险单位号：</td>
      <td class=input><select name="dangerNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
                      <input type="text"  name="dangerNo" class="condition" maxlength="5"></td>
  </tr>
  
  <tr>
    <td class=title>投保单号：</td>
    <td class=input>
      <select name="proposalNoTag" class="tag">
	    <jsp:include page="StringOption.jsp"/>
      </select>
      <input type="text" name="proposalNo" class="condition" maxlength="44">
    </td>
	<td class=title>询价单号：</td>
    <td class=input>
      <select name="enquiryNoTag" class="tag">
	    <jsp:include page="StringOption.jsp"/>
      </select>
      <input type="text"  name="enquiryNo" class="condition" maxlength="22">
    </td>
  </tr>
  
  <tr>
     <td class=title>分保业务号：</td>
     <td class=input><select name="recertifyNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
                      <input type="text"  name="recertifyNo" class="condition" maxlength="22"></td>
  
 
 	<td class=title>业务年度：</td>
    <td class=input><select name="uwYearTag" class="tag">
	                  <jsp:include page="StringOption.jsp"/>
                    </select>
                    <input type="text" name="uwYear" class="condition" maxlength="4">
    </td>
  </tr>

  <tr>
    <%--修改原因:查询分保单时，应只能查询出有临分的且已复核的分保单--%>
     <td class=title>帐单生成状态：</td>
       <td class=input>
    					  <input type="radio" name="accType" value="0" >全部
   						  <input type="radio" name="accType" value="1" >已生成帐单
   						  <input type="radio" name="accType" value="2" >未生成帐单
 					  </td>
 					  
    <input type="hidden" name="approve" value="1">     <%--已复核标志--%>
    <td class=title>分保方式：</td>
    <td class=common1 colspan="3">
    <input type="checkbox" name="reinsType" value="1" checked="checked">临分
	<input type="checkbox" name="reinsType" value="2" checked="checked">混合</td>
    
     <input type="hidden" name="biztype" value="P">              
  </tr>
   <tr>
   <td class=title>分保方式：</td>
   <td>
    <input type="checkbox" name="reinsType" value="3" >自留
	<!--add end by fengbo 20061229 增加查询自留的按钮-->
	<input type="checkbox" name="reinsType" value="0" >合约
	<input type="checkbox" name="reinsType" value="1" >临分
	<input type="checkbox" name="reinsType" value="2" >混合
	<input type="checkbox" name="reinsType" value="" checked  >全部 
 	</td>		
  </tr>
  </table>

  <table class=sub>
     <tr class=common>
	     <td><input type="button" class="button" name ="查 询" value="查 询" src="/reins/images/button-query.gif" onClick="doSubmit();"></td>
	     <td><input type="button" class="button" value="重置" src="/reins/images/button-cancel.gif" onclick="form.reset();return false;" ></td>
     </tr>
  </table>

<script>
  var fm = fcoRepolicyForm;
  function doSubmit() {
	  fm.opt.value = 'facOut';
	  alert("查询开始了");
	  fm.action="/reins/recertifyQuery.do";
      fm.submit();
  }
</script>
 </form>
</body>
</html:html> 

