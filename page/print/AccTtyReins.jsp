<%--
****************************************************************************
* DESC       ：合约对外帐单打印信息显示页面
* AUTHOR     ：zhaijq
* CREATEDATE ：2004-6-10
* MODIFYLIST ：   id       Date            Reason/Contents
*          ------------------------------------------------------
****************************************************************************/
--%>
<%@page import="java.math.BigDecimal"%>
<%@page contentType="text/html; charset=GBK" %>
<%@page import="java.util.*"%>
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic" %>
 
<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/reins-app.tld" prefix="app" %>

<%@ page import="java.text.*"%>
<%@ page import="com.sinosoft.reins.out.dto.custom.*"%>
<%@ page import="com.sinosoft.reins.utility.ui.control.action.UIFormatAction"%>
<%@ page import="com.sinosoft.sysframework.common.datatype.DateTime"%>
<%@ page import="com.sinosoft.sysframework.reference.AppConfig" %>
<%@ page import="com.sinosoft.reins.POJO.co.AccTtyRPrint" %>
<%@page import="com.sinosoft.reins.POJO.po.PrpDuser"%>
<style >
BODY {
BORDER-TOP-WIDTH: 0px;
BORDER-LEFT-WIDTH: 0px; 
BORDER-BOTTOM-WIDTH: 0px;
BORDER-RIGHT-WIDTH: 0px;
SCROLLBAR-FACE-COLOR:#b7b7b7;
SCROLLBAR-HIGHLIGHT-COLOR:#b7b7b7;
SCROLLBAR-SHADOW-COLOR:#FFFFFF;
SCROLLBAR-3DLIGHT-COLOR:#FFFFFF;
SCROLLBAR-ARROW-COLOR:#FFFFFF;
SCROLLBAR-TRACK-COLOR:#ffffff;
SCROLLBAR-DARKSHADOW-COLOR:#8f8f8f;
}
td.title4Copy{color:#333333;background-color:#ffffff; width:5%;}
</style>
<title>合约对外季度帐单</title>
<link href="css/Standard.css" rel="stylesheet" type="text/css">
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<table id="ExcelTable"   width="90%" border="0" cellpadding="0" cellspacing="0"  align="center"><tr><td colspan="6"><%--用于批量打印--%>
<% Collection    accTtyPrintDtoList = (Collection)request.getAttribute("accTtyPrintDtoList");
   Iterator      iterator        = accTtyPrintDtoList.iterator();
   AccTtyRPrint accTtyRPrint = null;
   DecimalFormat idecimalFormat  = new DecimalFormat("#,##0.00");
   DecimalFormat idecimalFormat1  = new DecimalFormat("0.00");
   int i=0;
   int size=accTtyPrintDtoList.size();
   while(iterator.hasNext())
   {
	   accTtyRPrint   = (AccTtyRPrint)iterator.next();
       BigDecimal itemValueD = new BigDecimal(0.0);
       BigDecimal itemValueC = new BigDecimal(0.0);
       i++;
%>

<table width="90%" border="0" cellpadding="0" cellspacing="0"  align="center">
 <tr> 
    <td  valign="middle" align="center"  height="95">
     <img  src="/reins/images/logo_title.png">&nbsp;
  	</td>
  </tr>
  <tr>
  	<td></td>
  </tr>
  <tr>
  	<td></td>
  </tr>
  <tr>
  	<td></td>
  </tr>
<tr>
    <td align="center" valign="top" >
    <table border="0" cellpadding="5" cellspacing="1" class="table1" style=" font-family:宋体; font-size:10pt;font-weight: bolder;">
        <tr> 
        <td></td>
          <td colspan="2" class="title4" align="center"><font size='3'>
          Reinsurance Quarter Account<font></td>
          <td></td>
        </tr>
        <tr>
			<td></td>
			<td></td>
			<td colspan="3" align="right">
				Report Date:<%=UIFormatAction.toWestFormat(DateTime.current().toString(DateTime.YEAR_TO_DAY),"MMMM.dd,yyyy")%>
			</td>
		</tr>
         <tr>          
          <td colspan="5" align="right" ></td>
        </tr>
           <tr>          
          <td colspan="5" align="right" ></td>
        </tr>
           <tr>          
          <td colspan="5" align="right" ></td>
        </tr>
        <tr> 
          <td class="commonprint" colspan="2" style="font-size:10pt;">Ceding Company</td>
          <td class="commonprint" style="font-size:10pt;">：</td>
          <td class="commonprint" colspan="2" style="font-size:10pt;"><%=AppConfig.get("sysconst.COM_CNAME_LONG") %></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr> 
          <td class="commonprint" colspan="2" style="font-size:10pt;">Reinsurer</td>
          <td wclass="commonprint" style="font-size:10pt;">：</td>
          <td class="commonprint" colspan="2" style="font-size:10pt;"><%=accTtyRPrint.getFreinsName()%></td>
        </tr>
        <!--begin add by fcc 分别显示 Reinsurer和Broker -->
        <tr> 
          <td class="commonprint" colspan="2" style="font-size:10pt;">Broker</td>
          <td wclass="commonprint" style="font-size:10pt;">：</td>
          <td class="commonprint" colspan="2" style="font-size:10pt;"><%=accTtyRPrint.getReinsName()%></td>
        </tr>
        <!-- end add by fcc 分别显示 Reinsurer和Broker -->
        <tr> 
          <td class="commonprint" colspan="2" style="font-size:10pt;">Treaty Name</td>
          <td class="commonprint" style="font-size:10pt;">：</td>
          <td class="commonprint" colspan="2" style="font-size:10pt;"><%=accTtyRPrint.getTreatyName()%></td>
        </tr>
        <tr> 
          <td class="commonprint" colspan="2" style="font-size:10pt;">Treaty No</td>
          <td class="commonprint" style="font-size:10pt;">：</td>
          <td class="commonprint" colspan="2" style="font-size:10pt;"><%=accTtyRPrint.getTreatyNo()%></td>
        </tr>
        <tr> 
          <td class="commonprint" colspan="2" style="font-size:10pt;">SectionDesc</td>
          <td class="commonprint" style="font-size:10pt;">：</td>
          <td class="commonprint" colspan="2" style="font-size:10pt;"><%=accTtyRPrint.getSectionDesc()%></td>
        </tr>
        <tr> 
          <td class="commonprint" colspan="2" style="font-size:10pt;">Reinsurer's share</td>
          <td class="commonprint" style="font-size:10pt;">：</td>
          <td class="commonprint" colspan="2" style="font-size:10pt;"><%=idecimalFormat1.format(accTtyRPrint.getShareRate())%>%</td>
        </tr>
        <tr> 
          <td class="commonprint" colspan="2" style="font-size:10pt;">U/W Year</td>
          <td class="commonprint" style="font-size:10pt;">：</td>
          <td class="commonprint" colspan="2" style="font-size:10pt;"><%=accTtyRPrint.getUwyear()%></td>
        </tr>
        <tr> 
          <td class="commonprint" colspan="2" style="font-size:10pt;">A/C Period</td>
          <td class="commonprint" style="font-size:10pt;">：</td>
          <td class="commonprint" colspan="2" style="font-size:10pt;"><%=accTtyRPrint.getAccPeriod()%></td>
        </tr>
        
        <tr> 
          <td class="commonprint" colspan="2" style="border-bottom: solid windowtext 2.5pt;font-size:10pt;">Currency</td>
          <td class="commonprint" style="border-bottom: solid windowtext 2.5pt;font-size:10pt;">：</td>
          <td class="commonprint" colspan="2" style="border-bottom: solid windowtext 2.5pt;font-size:10pt;"><%=accTtyRPrint.getCurrency()%></td>
        </tr>
      </table>
      </td>
    </tr>
    <tr>
     <td align="center" valign="top" > 
      <table border="0" width="70%" cellpadding="0" cellspacing="0" class="table1" style="font-weight: bolder;">
        <tr class="table">
          <td class="title4"  style="border-bottom: solid windowtext 2.5pt;"></td>
          <td class="title4Copy" style="padding: 8pt;border-bottom: solid windowtext 2.5pt;border-right: solid windowtext 1.5pt;"></td>
          <td class="title4" align="center" style="padding: 8pt;border-bottom: solid windowtext 2.5pt; border-right: solid windowtext 1.5pt;font-size:10pt;">Debit</td>
          <td class="title4" align="center" style="padding: 8pt;border-bottom: solid windowtext 2.5pt;font-size:10pt;">Credit</td>
          <td style="border-bottom: solid windowtext 2.5pt;"></td>
        </tr>
 		
 		<tr>
 			<td class="commonprint" style="font-size:10pt;">R/I Premium</td>
 			<td class="commonprint" style="padding: 8pt;border-right: solid windowtext 1.5pt;">&nbsp;</td>
           <%if ((accTtyRPrint.getPremium().compareTo(BigDecimal.ZERO))>=0){%>
	           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;">&nbsp;</td>  
	           <td class="commonprint" align="right" style="font-size:10pt;"><%=idecimalFormat.format(accTtyRPrint.getPremium())%></td>
	           <% itemValueC =itemValueC.add(accTtyRPrint.getPremium()) ;%>
           <%}else{%> 
	           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;font-size:10pt;"><%=idecimalFormat.format(accTtyRPrint.getPremium().multiply(new BigDecimal(-1)))%></td>  
	           <td class="commonprint" align="right" >&nbsp;</td>
	           <% itemValueD =itemValueD.add(accTtyRPrint.getPremium().multiply(new BigDecimal(-1)));%>
           <%}%>  
           
 		</tr>
		<tr>
 			<td class="commonprint" style="font-size:10pt;">Commission</td>
 			<td class="commonprint" style="border-right: solid windowtext 1.5pt;padding: 8pt;font-size:10pt;" align="right"><%=idecimalFormat.format(accTtyRPrint.getCommRate())%>%</td>
 		   <%if ((accTtyRPrint.getCommission().compareTo(BigDecimal.ZERO))>=0){%>
	           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;font-size:10pt;"><%=idecimalFormat.format(accTtyRPrint.getCommission())%></td>  
	           <td class="commonprint" align="right" >&nbsp;</td>
	           <% itemValueD =itemValueD.add(accTtyRPrint.getCommission());%>
           <%}else{%> 
	           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;">&nbsp;</td>  
	           <td class="commonprint" align="right" style="font-size:10pt;"><%=idecimalFormat.format(accTtyRPrint.getCommission().multiply(new BigDecimal(-1)))%></td>
	           <% itemValueC =itemValueC.add(accTtyRPrint.getCommission().multiply(new BigDecimal(-1)));%>
           <%}%>    
 		</tr>
 		 <!-- 增值税 -->
 		<tr>
 			<td class="commonprint" style="font-size:10pt;">VAT</td>
			<td class="commonprint" style="padding: 8pt;border-right: solid windowtext 1.5pt;">&nbsp;</td>
 		   <%if ((accTtyRPrint.getTaxFee().compareTo(BigDecimal.ZERO))>=0){%>
	           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;">&nbsp;</td>  
	           <td class="commonprint" align="right" style="font-size:10pt;"><%=idecimalFormat.format(accTtyRPrint.getTaxFee())%></td>
	           <% itemValueC =itemValueC.add(accTtyRPrint.getTaxFee());%>
           <%}else{%> 
	           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;">&nbsp;</td>  
	           <td class="commonprint" align="right" style="font-size:10pt;"><%=idecimalFormat.format(accTtyRPrint.getTaxFee())%></td>
	           <% itemValueD =itemValueD.add(accTtyRPrint.getTaxFee().multiply(new BigDecimal(-1)));%>
           <%}%> 
 		</tr> 
 		<!-- 代扣代缴 -->
 		<tr>
 			<td class="commonprint" style="font-size:10pt;">VAT Withheld </td>
 			<td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;padding: 8pt;font-size:10pt;"><%=idecimalFormat1.format(accTtyRPrint.getWhldvatRate())%>%</td>
 		   <%if ((accTtyRPrint.getWhldvat().compareTo(BigDecimal.ZERO))>=0){%>
	           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;font-size:10pt;"><%=idecimalFormat.format(accTtyRPrint.getWhldvat())%></td>  
	           <td class="commonprint" align="right" >&nbsp;</td>
	           <% itemValueD =itemValueD.add(accTtyRPrint.getWhldvat())
	           ;%>
           <%}else{%> 
	           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;">&nbsp;</td>  
	           <td class="commonprint" align="right" style="font-size:10pt;"><%=idecimalFormat.format(accTtyRPrint.getWhldvat())%></td>
	           <% itemValueC =itemValueC.add(accTtyRPrint.getWhldvat().multiply(new BigDecimal(-1)));%>
           <%}%> 
 		</tr>
 		<!-- 代扣代缴附加 -->
 		<tr>
 			<td class="commonprint" style="font-size:10pt;">VAT Surcharge Withheld</td>
 			<td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;padding: 8pt;font-size:10pt;"><%=idecimalFormat1.format(accTtyRPrint.getAddvatRate())%>%</td>
 		   <%if ((accTtyRPrint.getAddvat().compareTo(BigDecimal.ZERO))>=0){%>
	           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;font-size:10pt;"><%=idecimalFormat.format(accTtyRPrint.getAddvat())%></td>  
	           <td class="commonprint" align="right" >&nbsp;</td>
	           <% itemValueD =itemValueD.add(accTtyRPrint.getAddvat());%>
           <%}else{%> 
	           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;">&nbsp;</td>  
	           <td class="commonprint" align="right" style="font-size:10pt;"><%=idecimalFormat.format(accTtyRPrint.getAddvat())%>
	           																<% %>			</td>
	           <% itemValueC =itemValueC.add(accTtyRPrint.getAddvat().multiply(new BigDecimal(-1)));%>
           <%}%> 
 		</tr>
 		<tr>

 			<td class="commonprint" style="font-size:10pt;">Cash Loss Released</td>
 			<td class="commonprint" style="border-right: solid windowtext 1.5pt;padding: 8pt;">&nbsp;</td>
 		   <%if ((accTtyRPrint.getCashLoss().compareTo(BigDecimal.ZERO))>=0){%>
	           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;font-size:10pt;"><%=idecimalFormat.format(accTtyRPrint.getCashLoss())%></td>  
	           <td class="commonprint" align="right" >&nbsp;</td>
	           <% itemValueD =itemValueD.add(accTtyRPrint.getCashLoss()) ;%>
           <%}else{%> 
	           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;">&nbsp;</td>  
	           <td class="commonprint" align="right" style="font-size:10pt;"><%=idecimalFormat.format(accTtyRPrint.getCashLoss().multiply(new BigDecimal(-1)))%></td>
	           <% itemValueC =itemValueC.add(accTtyRPrint.getCashLoss().multiply(new BigDecimal(-1)));%>
           <%}%> 

 		</tr>
 		<tr>
 			<td class="commonprint" style="font-size:10pt;">Paid Loss</td>
 			<td class="commonprint" style="border-right: solid windowtext 1.5pt;padding: 8pt;">&nbsp;</td>
 		   <%if ((accTtyRPrint.getPaidLoss().compareTo(BigDecimal.ZERO))>=0){%>
	           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;font-size:10pt;"><%=idecimalFormat.format(accTtyRPrint.getPaidLoss())%></td>  
	           <td class="commonprint" align="right" >&nbsp;</td>
	           <% itemValueD =itemValueD.add(accTtyRPrint.getPaidLoss()) ;%>
           <%}else{%> 
	           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;">&nbsp;</td>  
	           <td class="commonprint" align="right" style="font-size:10pt;"><%=idecimalFormat.format(accTtyRPrint.getPaidLoss().multiply(new BigDecimal(-1)))%></td>
	           <% itemValueC =itemValueC.add(accTtyRPrint.getPaidLoss().multiply(new BigDecimal(-1)));%>
           <%}%> 
 		</tr>
 		<tr>
	       <td class="commonprint" style="border-bottom: solid windowtext 1.5pt;font-size:10pt;"><%=accTtyRPrint.getBalanceName()%></td>   	   
	       <td class="commonprint" style="border-right: solid windowtext 1.5pt;border-bottom: solid windowtext 1.5pt;padding: 8pt;">&nbsp;</td>   	   
		   <%if ((accTtyRPrint.getBalance().compareTo(BigDecimal.ZERO))>=0){%>
	           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;border-bottom: solid windowtext 1.5pt;font-size:10pt;"><%=idecimalFormat.format(accTtyRPrint.getBalance())%></td>  
	           <td class="commonprint" align="right" style="border-bottom: solid windowtext 1.5pt;">&nbsp;</td>
	           <% itemValueD =itemValueD.add(accTtyRPrint.getBalance());%>
           <%}else{%> 
	           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;border-bottom: solid windowtext 1.5pt;">&nbsp;</td>  
	           <td class="commonprint" align="right" style="border-bottom: solid windowtext 1.5pt;font-size:10pt;"><%=idecimalFormat.format(accTtyRPrint.getBalance().multiply(new BigDecimal(-1)))%></td>
	           <% itemValueC =itemValueC.add(accTtyRPrint.getBalance().multiply(new BigDecimal(-1)));%>
           <%}%> 
 		<td style="border-bottom: solid windowtext 2.5pt;"></td>
 		</tr>
 		
 		<tr>
          <td class="commonprint" style="border-bottom: solid windowtext 1.5pt;font-size:10pt;">Total：</td>
          <td class="commonprint" style="border-right: solid windowtext 1.5pt; border-bottom: solid windowtext 1.5pt;padding: 8pt;">&nbsp;</td>
          <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;border-bottom: solid windowtext 1.5pt;font-size:10pt;"><%=idecimalFormat.format(itemValueD)%></td>  
          <td class="commonprint" align="right" style="border-bottom: solid windowtext 1.5pt;font-size:10pt;"><%=idecimalFormat.format(itemValueC)%></td>  
        <td style="border-bottom: solid windowtext 2.5pt;"></td>
        </tr>
        <tr>
           <td class="commonprint" style="border-bottom: solid windowtext 1.5pt;font-size:10pt;">Your share：</td>
           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt; border-bottom: solid windowtext 1.5pt;padding: 8pt;font-size:10pt;"><%=accTtyRPrint.getShareRate() %>%</td>
           <%if ((accTtyRPrint.getReinsBalance().compareTo(BigDecimal.ZERO))>=0){%>
	           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;border-bottom: solid windowtext 1.5pt;font-size:10pt;"><%=idecimalFormat.format(accTtyRPrint.getReinsBalance())%></td>  
	           <td class="commonprint" align="right" style="border-bottom: solid windowtext 1.5pt;">&nbsp;</td>
           <%}else{%> 
	           <td class="commonprint" align="right" style="border-right: solid windowtext 1.5pt;border-bottom: solid windowtext 1.5pt;">&nbsp;</td>  
	           <td class="commonprint" align="right" style="border-bottom: solid windowtext 1.5pt;font-size:10pt;"><%=idecimalFormat.format(accTtyRPrint.getReinsBalance().multiply(new BigDecimal(-1)))%></td>
           <%}%>
           <td style="border-bottom: solid windowtext 2.5pt;"></td>
        </tr>
 	 </table>
 	 </td>
 	</tr>
 	<tr>
    <td align="center" valign="top">
     <table border="0" cellpadding="5" cellspacing="1" class="table1">
        <tr class="table">
			<td colspan="2">
				<span style="font-family: Arial;">
				For and on behalf of<br>
				<%=AppConfig.get("sysconst.COM_ENAME_LONG") %><br>
				REINSURANCE DEPARTMENT<br>
				国泰财产保险责任有限公司-再保部<br>
				</span>
			</td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td colspan="5">&nbsp;</td>
		</tr>
		<tr>
			<td colspan="5">&nbsp;</td>
		</tr>
		<tr>
			<td colspan="5">
				........................................<br>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Authorized Signature(s)
			</td>
		</tr>
		<tr>
			<td colspan="6">E&OE</td>
		</tr>

        <tr class="table">
			<td  colspan="5">
				<br>
				<br>
				<table border="0" width="100%">
	<tr> 
		<td  align="left" width="30%"><strong>Made by:&nbsp;&nbsp;</strong><span style='border-bottom:solid windowtext 0.5pt' width="4%"></span></td>
		<td colspan="3" align="left" width="40%"><strong>Checked by: </strong>_______________</td>
		<td>&nbsp;</td>
	</tr>
</table>
			</td>
		</tr>
      </table>
      </td>
  </tr>
  <tr>
			<td colspan="5">&nbsp;</td>
		</tr>
		<tr>
			<td colspan="5">&nbsp;</td>
		</tr>
</table>  
 <div style="page-break-before:always"></div>
<%}%>
</td></tr>
</table>
<div align="center" id="divButton" style="display:">
	  <table cellpadding="0" cellspacing="0" width="90%" >
	    <tr>
	      <td class=button style="width:30%" align="center" style="display:">
	        <input type="button" class="button" value="打 印" src="/reins/images/button-print.gif" onclick="printPage();return false;">
	      </td>

	      <td class=button style="width:30%" align="center" style="display:">
	        <input type="button" class="button" value="关 闭" src="/reins/images/button_close.gif" onclick="javascript:window.close()">
	      </td>
	    </tr>
	  </table>
</div>
<script src="/reins/page/print/js/TtyPrint.js"></script>
<script src="/reins/page/print/js/Common.js"></script>
<script language="JavaScript">
   function ExportExcel(){
    var tb=document.getElementById("ExcelTable");
    copyObjectToExcel(tb);//采用JS方式导出
  }   
</script>
