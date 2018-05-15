<%--
****************************************************************************
* DESC       £ºÈÕ³£²âÊÔÒ³Ãæ
****************************************************************************/
--%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Collection"%>
<%@page import="java.util.Iterator"%>
<%@page contentType="text/html;charset=GBK"%>
<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/reins-app.tld" prefix="app"%>

<%@page import="com.sinosoft.reins.out.bl.action.custom.*"%>
<%@page import="com.sinosoft.sysframework.reference.DBManager"%>
<%@page import="com.sinosoft.sysframework.common.datatype.DateTime"%>
<%@page import="com.sinosoft.sysframework.reference.AppConfig"%>
<%@page import="com.sinosoft.reins.payment.bl.action.custom.BLPaymentAction"%>

<% 
	BLPaymentAction blPaymentAction = new BLPaymentAction();
	blPaymentAction.sendTtyToPayment("OP201608", "A", "2016-07M", "I", "0");
%>