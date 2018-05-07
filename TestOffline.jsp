<%@page import="org.apache.ibatis.session.SqlSession"%>
<%@page import="com.sinosoft.reins.util.SessionFactoryBatis"%>
<%@page import="org.apache.ibatis.session.SqlSessionFactory"%>
<%@page import="com.sinosoft.reins.POJO.po.ReinsEndorUnit"%>
<%@page import="com.sinosoft.reins.webService.bl.action.domain.BLReinsEndorUnitAction"%>
<%@page import="com.sinosoft.reins.webService.bl.action.domain.BLReinsPolicyUnitAction"%>
<%@page import="com.sinosoft.reins.interf.bl.action.custom.BLReinsUndrtInterfAction"%>
<%@page import="com.sinosoft.reins.POJO.po.ReinsPolicyUnit"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Collection"%>
<%@page import="com.sinosoft.reins.out.bl.action.custom.BLEnquiryAction"%>
<%@page import="com.sinosoft.reins.out.bl.action.domain.BLPrpPdangerUnitAction"%>
<%@page import="com.sinosoft.reins.out.bl.action.custom.BLPDangerGetAction"%>
<%@ page contentType="text/html; charset=GBK"%>
<%@ page import="com.sinosoft.sysframework.reference.AppConfig"%>
<%@ page import="com.sinosoft.reins.interf.bl.action.custom.BLReinsPrpallInterfAction"%>
<%@ page import="javax.servlet.http.HttpServletRequest"%>
<%@ page import="com.sinosoft.reins.out.bl.facade.BLOffLineCalFacade" %>
<html>
<form name="fm" method="post">
	保单号： <input type="text" name="policyNo" id="policyNo"> <input
		class="button" type=button alt=" 确 定 " value="确 定"
		onClick="submitForm()">
	<script language=javascript>
		function submitForm() {
			fm.submit();
		}
	</script>
	<%
//		BLReinsPrpallInterfAction blReinsPrpallInterfAction = new BLReinsPrpallInterfAction();
//		String policyNo = request.getParameter("policyNo");
		BLOffLineCalFacade blOffLineCalFacade = new BLOffLineCalFacade();
//		ReinsPolicyUnit reinsPolicyUnit = null;
//		BLReinsUndrtInterfAction blReinsUndrtInterfAction = new BLReinsUndrtInterfAction();
//		BLReinsPolicyUnitAction blReinsPolicyUnitAction = new BLReinsPolicyUnitAction();
//		BLReinsEndorUnitAction blReinsEndorUnitAction = new BLReinsEndorUnitAction();
//		blReinsInterfServiceAction blReinsInterfServiceAction = new BLReinsInterfServiceAction();
//		BLPDangerGetAction blPDangerGetAction = new BLPDangerGetAction();
//		BLPrpPdangerUnitAction blPrpPdangerUnitAction = new BLPrpPdangerUnitAction();
//		ReinsEndorUnit reinsEndorUnit = null;
//		BLEnquiryAction blEnquiryAction = new BLEnquiryAction();
//		BLReinsEndorItemAction blReinsEndorItemAction = new BLReinsEndorItemAction();
		String serviceId = "";
		SqlSessionFactory factory = SessionFactoryBatis.getSession();
		SqlSession sqlSession = null;
//		if (policyNo != null) {
			try {
				sqlSession = factory.openSession(false);
//				System.out.println(policyNo + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
				//blReinsPrpallInterfAction.genDangerUnit(policyNo, "P",dbManager);
				//blOffLineCalFacade.offLineGenReins(dbManager);
				//保单复核
				//reinsPolicyUnitDto = blReinsPolicyUnitAction.findByPolicyNo(dbManager, policyNo);
				//blReinsUndrtInterfAction.reinsRepolicyCal(reinsPolicyUnitDto, dbManager);	
				//批单复核
				//String endorNo = policyNo;
				//reinsEndorUnit = blReinsEndorUnitAction.findByPrimaryKey(dbManager, endorNo);
				//blReinsUndrtInterfAction.reinsReendorCal(reinsEndorUnitDto, dbManager);
				//生成保单危险单位
				//reinsPolicyUnitDto = blReinsPolicyUnitAction.findByPolicyNo(dbManager, policyNo);
				//blReinsInterfServiceAction.genReinsPolicy("199005009012017000047", reinsPolicyUnitDto, dbManager);
				//生成批单危险单位
				//blPDangerGetAction.getPDanger_ByPolicy("199510101032017000006-01",policyNo, dbManager);
				
				//3、生成危险单位信息  批单复制保单风险评估    及临分询价信息 
				//String conditions = "endorNo not in(select s.endorseno from prppdangerunit s) and endorno not in('199005001022017000041-01','199005001022017000043-01') order by endorno";
				//Collection reinsEndorUnitList = blReinsEndorUnitAction.findByConditions(dbManager, conditions);
				//Iterator itReinsEndorUnitList = reinsEndorUnitList.iterator();
				//while(itReinsEndorUnitList.hasNext()){
				//	reinsEndorUnitDto = new ReinsEndorUnitDto();
				//	reinsEndorUnitDto = (ReinsEndorUnitDto)itReinsEndorUnitList.next();
					/* reinsEndorUnitDto = blReinsEndorUnitAction.findByPrimaryKey(dbManager, policyNo);
					String conditions = "endorno='"+reinsEndorUnitDto.getEndorNo()+"' ";
					Collection<ReinsEndorItemDto> reinsEndorItemList  =  blReinsEndorItemAction.findByConditions(dbManager, conditions);
					reinsEndorUnitDto.getReinsEndorItemDtoList().addAll(reinsEndorItemList);
					blReinsPrpallInterfAction.genDangerUnit(reinsEndorUnitDto.getEndorNo(), "E", dbManager);
				
					//4、根据V7风险评估结果    更新危险单位自留额、是否合约除外
					blPrpPdangerUnitAction.updateRiskInfo(reinsEndorUnitDto, dbManager);
				
					//5、 在3执行后  如果保单有临分 则会复制临分询价单信息 
					//如果保单无临分  但批单需要临分分出 则要生成空的临分询价单
					if("1".equals(reinsEndorUnitDto.getFacFlag())){
						String enquiryStr = " endorseNo = '" + reinsEndorUnitDto.getEndorNo() + "' and enquirytype = 'E' ";
			  			int count=new DBFeoEnquiry(dbManager).getCount(enquiryStr);
			  			if(count<=0){
			  				blEnquiryAction.genPEnquiryInfo(reinsEndorUnitDto, dbManager);
			  			}
				} */
					blOffLineCalFacade.offLineGen();
					sqlSession.commit();
				System.out.println("成功~~~~~~~~~~~~~~~~~~~~~~~~~~~");
			} catch (Exception e) {
				sqlSession.rollback();
				e.printStackTrace();
				throw e;
			} finally {
				sqlSession.close();
			}
//		}
	%>
</form>
</html>
