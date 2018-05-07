<%@page contentType="text/html;charset=GBK"%><%--
****************************************************************************
* DESC       ���ٷ��ʵ���ѯ��������ҳ��
* AUTHOR     ��liuyang
* CREATEDATE ��2004-05-28
* MODIFYLIST ��   id       Date            Reason/Contents
*          ------------------------------------------------------
****************************************************************************/
--%>

<%@page import="java.util.*"%>
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic" %>

<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/reins-app.tld" prefix="app" %>

<html:html locale="true">
<head>
<title><bean:message key="prompt.fcoPolicy.TitleName"/></title>
<app:css />
<script src="calendar.js"> </script>
<script src="/page/templates/linfenAccounting/showpage.js"> </script>
</head>
<body >

<form name="fcoRepayForm" action="/reins/recertifyQuery.do?rows=10&opt=facOut" method="post" >

  <table  id="QueryInput" class="common" cellpadding="3" cellspacing="0">
  <input type="hidden" name="operateType" value="Gen">


  <tr>
      <td class=title>���ⰸ�ţ�</td>
      <td class=input><select name="recertifyNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
                      <input type="text"  name="recertifyNo" class="condition" maxlength="40"></td>
        <td class=title><bean:message key="prompt.floRepay.PolicyNo" />��</td>
        <td class=input>
          <select name="policyNoTag" class="tag">
	        <jsp:include page="StringOption.jsp"/>
          </select>
          <input type="text"  name="policyNo" class="condition" maxlength="44" ></td>
       
  </tr>
  <tr>
      <td class=title>Σ�յ�λ�ţ�</td>
      <td class=input><select name="dangerNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
                      <input type="text"  name="dangerNo" class="condition" maxlength="5"></td>
    <td class=title>�����ţ�</td>
    <td class=input><select name="payNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
                      <input type="text"  name="payNo" class="condition" maxlength="44"></td>
  </tr>

  <tr>
    <td class=title><bean:message key="prompt.fcoRepolicy.UwYear" />��</td>
    <td class=input><select name="uwYearTag" class="tag">
	                  <jsp:include page="StringOption.jsp"/>
                    </select>
                    <input type="text" name="uwYear" class="condition" maxlength="4">
    </td>
     <td class=title>�������ڣ�</td>
    <td class=input><select name="damageDateTag" class="tag" onChange="javascript:disabledEndDate(this)">
	                  <jsp:include page="DateOption.jsp"/>
                    </select>
                    <input type="text" name="damageDate" class="date" maxlength="10" onClick="return Calendar('damageDate');"> �� <input type="text" name="damageDate2" class="date" maxlength="10" onClick="return Calendar('damageDate2');"></td>
  </tr>
  <tr>
    <td class=title><bean:message key="prompt.fcoRepolicy.StartDate" />��</td>
    <td class=input><select name="startDateTag" class="tag" onChange="javascript:disabledEndDate(this)">
	                  <jsp:include page="DateOption.jsp"/>
                    </select>
                    <input type="text" name="startDate" class="date" maxlength="10" onClick="return Calendar('startDate');"> �� <input type="text" name="startDate2" class="date" maxlength="10" onClick="return Calendar('startDate2');"></td>

	  <td class=title>������ţ�</td>
      <td class=input><select name="compensateNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
         <input type="text"  name="compensateNo" class="condition" maxlength="22"></td>
  </tr>

  <tr>
    <td class=title>�ֱ����ţ�</td>
      <td class=input><select name="repolicyNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
                      <input type="text"  name="repolicyNo" class="condition" maxlength="22"></td>
     <input type="hidden" name="approve" value="1">     <%--�Ѹ��˱�־--%>
         
    
  </tr>
  <tr> 
    <td class=title>�ֱ���ʽ��</td>
    <td class=common1><input type="checkbox" name="reinsType" value="1" checked="checked">�ٷ�
	<input type="checkbox" name="reinsType" value="2" checked="checked">���</td>
    <td class=title><bean:message key="prompt.fcoRepolicy.InsuredName" />��</td>
    <td class=input><select name="insuredNameTag" class="tag">
	                  <jsp:include page="StringOption.jsp"/>
                    </select>
                    <input type="text" name="insuredName" class="condition" maxlength="100">
    </td>
  </tr>
  <%--add begin by zhangTC 20070110�ֱ����ʵ�/�������ʵ�/���ⰸ�ʵ����ɲ�ѯ���������Ƿ����ɹ��ʵ�ѡ���ѯ--%>
   <tr>
 			 <td class=title>�ʵ�����״̬��</td>
       <td class=common1>
    					  <input type="radio" name="accType" value="0" >ȫ��
   						  <input type="radio" name="accType" value="1" >�������ʵ�
   						  <input type="radio" name="accType" value="2" checked="checked">δ�����ʵ�
 					  </td>
    
        <input type="hidden" name="biztype" value="C">
  </tr>
  </table>

  <table class=sub>
     <tr class=common>
	     <td><input type="submit" class="button" value="�� ѯ"></td>
	     <td><input type="submit" class="button" value="ȡ ��" onclick="form.reset();return false;" ></td>
     </tr>
  </table>

<jsp:include page="StaticJavascript.jsp" />
<script src="showpage.js"> </script>		
<script src="Common.js"> </script>
 </form>
</body>
</html:html>
<script>
  var fm = fcoRepayForm;
</script>