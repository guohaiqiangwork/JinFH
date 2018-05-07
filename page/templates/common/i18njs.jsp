<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<script type="text/javascript">
	var i18n = new Object();
	i18n.navigator = new Object();
	i18n.navigator.page="<fmt:message key="navigator.page"/>";
	i18n.navigator.first="<fmt:message key="navigator.first"/>";
	i18n.navigator.last="<fmt:message key="navigator.last" />";
	i18n.navigator.prev="<fmt:message key="navigator.prev"/>";
	i18n.navigator.next="<fmt:message key="navigator.next"/>";	
	i18n.navigator.records="<fmt:message key="navigator.records"/>";		
	i18n.navigator.page="<fmt:message key="navigator.page"/>";
	i18n.navigator.more="<fmt:message key="navigator.more"/>";
	i18n.prompt = new Object();
	i18n.prompt.ok="<fmt:message key="prompt.ok"/>";	
	i18n.prompt.cancel="<fmt:message key="prompt.cancel"/>";	
	
	i18n.errors = new Object();	
	i18n.errors.deletefail="<fmt:message key="errors.delete"/>";	
</script>
