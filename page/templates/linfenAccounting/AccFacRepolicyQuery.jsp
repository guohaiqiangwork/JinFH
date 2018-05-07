<%--
****************************************************************************
* DESC       ���ٷ��ʵ���ѯ��������ҳ��
* AUTHOR     ��liuzhanlong
* CREATEDATE ��2005-06-01
* MODIFYLIST ��   id       Date            Reason/Contents
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
      <td class=title>�����ţ�</td>
      <td class=input><select name="policyNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
                      <input type="text"  name="policyNo" class="condition" maxlength="44"></td>
      <td class=title>Σ�յ�λ�ţ�</td>
      <td class=input><select name="dangerNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
                      <input type="text"  name="dangerNo" class="condition" maxlength="5"></td>
  </tr>
  
  <tr>
    <td class=title>Ͷ�����ţ�</td>
    <td class=input>
      <select name="proposalNoTag" class="tag">
	    <jsp:include page="StringOption.jsp"/>
      </select>
      <input type="text" name="proposalNo" class="condition" maxlength="44">
    </td>
	<td class=title>ѯ�۵��ţ�</td>
    <td class=input>
      <select name="enquiryNoTag" class="tag">
	    <jsp:include page="StringOption.jsp"/>
      </select>
      <input type="text"  name="enquiryNo" class="condition" maxlength="22">
    </td>
  </tr>
  
  <tr>
     <td class=title>�ֱ�ҵ��ţ�</td>
     <td class=input><select name="recertifyNoTag" class="tag">
	                    <jsp:include page="StringOption.jsp"/>
                      </select>
                      <input type="text"  name="recertifyNo" class="condition" maxlength="22"></td>
  
 
 	<td class=title>ҵ����ȣ�</td>
    <td class=input><select name="uwYearTag" class="tag">
	                  <jsp:include page="StringOption.jsp"/>
                    </select>
                    <input type="text" name="uwYear" class="condition" maxlength="4">
    </td>
  </tr>

  <tr>
    <%--�޸�ԭ��:��ѯ�ֱ���ʱ��Ӧֻ�ܲ�ѯ�����ٷֵ����Ѹ��˵ķֱ���--%>
     <td class=title>�ʵ�����״̬��</td>
       <td class=input>
    					  <input type="radio" name="accType" value="0" >ȫ��
   						  <input type="radio" name="accType" value="1" >�������ʵ�
   						  <input type="radio" name="accType" value="2" >δ�����ʵ�
 					  </td>
 					  
    <input type="hidden" name="approve" value="1">     <%--�Ѹ��˱�־--%>
    <td class=title>�ֱ���ʽ��</td>
    <td class=common1 colspan="3">
    <input type="checkbox" name="reinsType" value="1" checked="checked">�ٷ�
	<input type="checkbox" name="reinsType" value="2" checked="checked">���</td>
    
     <input type="hidden" name="biztype" value="P">              
  </tr>
   <tr>
   <td class=title>�ֱ���ʽ��</td>
   <td>
    <input type="checkbox" name="reinsType" value="3" >����
	<!--add end by fengbo 20061229 ���Ӳ�ѯ�����İ�ť-->
	<input type="checkbox" name="reinsType" value="0" >��Լ
	<input type="checkbox" name="reinsType" value="1" >�ٷ�
	<input type="checkbox" name="reinsType" value="2" >���
	<input type="checkbox" name="reinsType" value="" checked  >ȫ�� 
 	</td>		
  </tr>
  </table>

  <table class=sub>
     <tr class=common>
	     <td><input type="button" class="button" name ="�� ѯ" value="�� ѯ" src="/reins/images/button-query.gif" onClick="doSubmit();"></td>
	     <td><input type="button" class="button" value="����" src="/reins/images/button-cancel.gif" onclick="form.reset();return false;" ></td>
     </tr>
  </table>

<script>
  var fm = fcoRepolicyForm;
  function doSubmit() {
	  fm.opt.value = 'facOut';
	  alert("��ѯ��ʼ��");
	  fm.action="/reins/recertifyQuery.do";
      fm.submit();
  }
</script>
 </form>
</body>
</html:html> 

