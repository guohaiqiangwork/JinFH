
<!--***************************************************************************
* Description: Ò³½Å´òÓ¡     
* CreateDate:  2018-04-16
* MODIFYLIST £º  Name       Date            Reason/Contents
*          --------------------------------------------------------------------
*
****************************************************************************-->
<%@page contentType="text/html; charset=GBK" %>
<%@page import="com.sinosoft.reins.POJO.po.PrpDuser"%>
<table border="0" width="100%">
	<tr> 
	    <%PrpDuser prpDuser = (PrpDuser)session.getAttribute("user"); %>
		<td  align="left" width="30%"><strong>Made by:&nbsp;&nbsp;</strong><span style='border-bottom:solid windowtext 0.5pt' width="4%"><%=prpDuser.getUsername()%></span></td>
	
		<td colspan="3" align="left" width="40%"><strong>Checked by: </strong>_______________</td>
		<td>&nbsp;</td>
	</tr>
</table>





