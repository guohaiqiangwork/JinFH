/****************************************************************************

 * DESC       ���ֱ�������غ���

 * AUTHOR     ��old

 * CREATEDATE ��2004-02-03

/**

  



/**

 �ı���ϸ���� ��ʾ�����Ϣ

 */

function changeDetailType(currobject)

{

   if(currobject.value =="H")

   {

     spanShare1.style.display="none";

     spanShare2.style.display='';

     spanShare3.style.display="none"

   }

   if(currobject.value =="L")

   {

     spanShare1.style.display='';

     spanShare2.style.display="none";

     spanShare3.style.display="none"

   }

   if(currobject.value =="Z")

   {

     spanShare1.style.display="none";

     spanShare2.style.display="none";

     spanShare3.style.display=''

   }

}



/**

 �ֱ�����У��

*/

function ArrangeRepolicy(biztype)

{

   var i = 0;

   var choosecount = 0;

   var findFlag = 0;

   //���ѡ��

   var ilength = fm.chooseflag.length;

  //underWriteFlag��chooseflag������һ��
if(ilength==2)
{
	 
	 if(fm.chooseflag[1].checked)
	 {
	 	 choosecount=1;
	 	if( fm.underWriteFlag.value=="1")
	 	{
	 		 findFlag = 1;
	 	}	  
	 }
} 
else
{	   
   for(i=1;i<ilength;i++)

   {
      if(fm.chooseflag[i].checked)

      {

          choosecount = choosecount+1;

          if(fm.underWriteFlag[i].value=="1")

          {

      	     findFlag = 1;

      	     break;

          }

      }     

   }
}
   if(biztype =="cb")

   {

      str = "��";

   }

   if(biztype =="pg")

   {

      str = "��";

   }	

   if(choosecount==0) //û��ѡ��

   {

       alert("��ѡ���"+str+"��");

       return false;

   }

   if(choosecount>1)

   {

       alert("��ֻ��ѡ��һ�ŷ�"+str+"��");

       return false;

   }

   if(findFlag==1)

   {

       alert("�����Ѿ����˵ķ�"+str+"��,���ܽ��зֱ�����");

       return false;

   }

   if(biztype =="cb")

   {

       fm.action="/reins/getRepolicy.do?type=Add";

   }

   if(biztype =="pg")

   {

       fm.action="/reins/getReendor.do?type=Add"; 

   }       

   fm.submit();

}

function AutoArrangeRepolicy()

{ 

   fm.action="/reins/getRepolicy.do?type=Add";

   alert ("sorry,�˹�����δ����");

}



function save(stroption)

{

   var dblRetRate = 100 - parseFloat(repolicyForm.fcorepolicy_shareRate.value);

   repolicyForm.arrangetype.value= stroption;

   if(validateForm(repolicyForm,'Fcofac_Data,Recoins_Data','')!=true)

   { 	

  	   return false;

   }

   var ret;

   if(stroption=="S")

   {

      if(dblRetRate!=0)	

      {

      	  ret= window.confirm(" ����"+dblRetRate+"%δ�ֳ�,�Ƿ�Ҫ����������\n���\"ȷ��\"����������\"ȡ��\"������������"); 	

          if(ret)

          {

             repolicyForm.addretflag.value = "T";	

      	     repolicyForm.submit();

          }

      }

      else

      {

      	  repolicyForm.addretflag.value = "F"; 

          repolicyForm.submit();	

      }	     

   }	

}



function saveReendor(stroption)

{

   var dblRetRate = 100 - parseFloat(reendorForm.fcoreendor_shareRate.value);

   reendorForm.arrangetype.value= stroption;

   var ret;

   if(validateForm(reendorForm,'FpoFac_Data,Recoins_Data','')!=true)

   { 	

  	   return false;

   }

   if(stroption=="S")

   {

       if(dblRetRate!=0)

       {	

           ret= window.confirm(" ����"+dblRetRate+"%δ�ֳ�,�Ƿ�Ҫ����������\n���\"ȷ��\"����������\"ȡ��\"������������"); 	

           if(ret)

           {

      	       reendorForm.addretflag.value = "T";

      	       reendorForm.submit();

           }

       }

       else

       {

       	   reendorForm.addretflag.value = "F";

      	   reendorForm.submit();

       }	     

   }	

}







function RepolicyCal(stroption)

{ 

   if(repolicyForm.type.value=="Show")

      return false;	

   var icount = 0;

   var dblSignLine = 0;

   var dblCurRate  = 0;

   if(stroption=='H')

   {

      for (i=1;i<repolicyForm.chooseflag.length;i++)

      {

         if(repolicyForm.chooseflag[i].checked)

         {

            icount = icount+1;

         }

      }

      if(icount==0)

      {

      	  alert("����ѡ��Ҫ����ҵ��ĺ�ͬ");

      	  return false;

      }	      

   }	

   if(stroption=='L')

   {

   	   for(i=1;i<repolicyForm.fcoFacSignedComm.length;i++)

   	   {

   	       dblSignLine = dblSignLine + parseFloat(repolicyForm.fcoFacSignedLine[i].value);	

   	   }	

       dblCurRate = dblSignLine	+ parseFloat(repolicyForm.fcorepolicy_shareRate.value);

       if(dblCurRate>100)

       {

           alert("�Ѿ�����100%��,�����µ�������");

           return false;	

       }

   }	

   repolicyForm.caltype.value= stroption;

   repolicyForm.action="/reins/repolicyCal.do";

   repolicyForm.submit();

}



function ReendorCal(stroption)

{ 

   if(reendorForm.type.value=="Show")

      return false;	

   var icount = 0;

   if(stroption=='H')

   {

      for (i=1;i<reendorForm.chooseflag.length;i++)

      {

         if(reendorForm.chooseflag[i].checked)

         {

            icount = icount+1;

         }

      }

      if(icount==0)

      {

      	  alert("����ѡ��Ҫ����ҵ��ĺ�ͬ");

      	  return false;

      }	      

   }	

   reendorForm.caltype.value= stroption;

   reendorForm.action="/reins/reendorCal.do";

   reendorForm.submit();

}



//��ʾ�ֱ����ֳ�����

function loadForm()

{

  var dblShareRate = 0;

  for (i=0;i<repolicyForm.fcorepolicy_shareRate.length;i++)

  {

    if (isNaN(parseFloat(repolicyForm.fcorepolicy_shareRate[i].value)))

      repolicyForm.fcorepolicy_shareRate[i].value = "0";

    dblShareRate = dblShareRate + parseFloat(repolicyForm.fcorepolicy_shareRate[i].value); 

  }	

  //repolicyForm.fcorepolicy_shareRate.value = dblShareRate;

  if (dblShareRate!=0)

  {

     showPage(this,spanRePolicySituation)	

  }

}

//��ʾ�������ֳ�����

function loadForm1()

{

  var dblShareRate = 0;

  for (i=0;i<reendorForm.shareRate.length;i++)

  {

    if (isNaN(parseFloat(reendorForm.shareRate[i].value)))

      reendorForm.shareRate[i].value = "0";

    dblShareRate = dblShareRate + parseFloat(reendorForm.shareRate[i].value); 

  }	

  //reendorForm.fcoreendor_shareRate.value = dblShareRate;

  if (dblShareRate!=0)

  {

     showPage(this,spanRePolicySituation)	

  }

}

//���˷ֱ���ǰ��У��

function approvecheck(option,biztype) //option = 'A' ������ option = 'D' ���������� //biztype='cb' �ֱ� bizetype='pg' ����

{

   var i = 0;

   var choosecount = 0;

   var str1 = "";

   fm.apptype.value= option;

   //���ѡ��

   var ilength = fm.chooseflag.length;

   if(biztype=='cb')

   {

       str1 = "��";

   }

   else

   {

       str1 = "��";	

  }	  
  
////underWriteFlag��chooseflag������һ��
//if(ilength==2)
//{
//	 
//	 if(fm.chooseflag[1].checked)
//	 {
//	 	str = fm.underWriteFlag.value;
//	  choosecount=1;
//	  
//	 }
//	}
//else{
//
//   for(i=2;i<ilength-1;i++)
//
//   {
//
//      if(fm.chooseflag[i].checked)
//
//      {
//
//          choosecount = choosecount+1;
//
//          str = fm.underWriteFlag[i].value;
//
//      }
//
//    }
//  }
  
   for(i=1;i<ilength;i++)

   {

      if(fm.chooseflag[i].checked)

      {

          choosecount = choosecount+1;

          str = fm.underWriteFlag[i].value;

      }

   }

   if(choosecount==0) //û��ѡ��

   {

      alert("��ѡ���"+str1+"��");

      return false;

   }

   if(choosecount>1)

   {

      alert("��ֻ��ѡ��һ�ŷ�"+str1+"��");

        return false;

   }

   if (option=='A')

   {

       if(str=="1")

       {

          alert("��"+str1+"���Ѿ�����,�����ٽ��и���");

          return false;

       }   

   }

   if (option=='U')

   {

       if(str=="0"|| str=="9")

       {

          alert("��"+str1+"��û�н��и���,���ܸ�������");

          return false;

       }   

   }

   if(biztype=='cb')

   {

       fm.action ="/reins/approveRepolicy.do";		

   }

   else

   {

       fm.action ="/reins/approveReendor.do";		 

   }	

   fm.submit();	

}

 

//�ֱ�����ѯ�����ύ֮ǰ�Բ�ѯ�������м��

function checkQueryRepolicy()

{   

	var classCode = fm.classCode.value;

	var riskCode  = fm.riskCode.value;

	var currency  = fm.currency.value;

	

	fm.classCode.value=classCode.toUpperCase();

	fm.riskCode.value=riskCode.toUpperCase();	

	fm.currency.value=currency.toUpperCase();



	fm.submit();

}





/**

 Ӧ�����ڵ���У��

*/

function adjustPayDate(biztype,valueNo)

{

   /*var i = 0;

   var choosecount = 0;

   var findFlag = 0;

   //���ѡ��

   var ilength = fm.chooseflag.length;

   for(i=1;i<ilength;i++)

   {

      if(fm.chooseflag[i].checked)

      {

          choosecount = choosecount+1;

          if(fm.flag[i].value=="0")

          {

      	     findFlag = 1;

      	     break;

          }

      }

      

   }

   if(biztype =="cb")

   {

      str = "��";

   }

   if(biztype =="pg")

   {

      str = "��";

   }	

   if(choosecount==0) //û��ѡ��

   {

       alert("��ѡ���"+str+"��");

       return false;

   }

   if(choosecount>1)

   {

       alert("��ֻ��ѡ��һ�ŷ�"+str+"��");

       return false;

   }

   if(findFlag==1)

   {

       alert("����û�и��˵ķ�"+str+"��,���ܽ���Ӧ�����ڵ���");

       return false;

   }*/

   fm.action="/reins/adjustPayDate.do?type="+biztype+"&valueNo="+valueNo;

   fm.submit();

}

function associateRepolicy()

{

	window.open("/reins/getAssociate.do?strNo=" + fm.repolicyNo.value,"newwindow" ,"scrollbars=yes,toolbar=yes,status=yes,top=100,left=100,menubar=yes,resizable = yes,width=500,Height=300");

}



function QueryRepolicy(biztype)

{

	  if (biztype=='cb')

	  {

        if(fm.oldType.value=="adjustPayDate")

        {

        	fm.action="/reins/out/common/AdjustDateQuery.jsp?type="+fm.oldType.value; 

        }

    else

    	{

           fm.action="/reins/out/common/repolicy/RepolicyQuery.jsp?type="+fm.oldType.value;    

        }

    }

    if (biztype=='pg')

	  {

	  	if(fm.oldType.value=="adjustPayDate")

        {

        	fm.action="/reins/out/common/AdjustDateQuery.jsp?type="+fm.oldType.value; 

        }

    else

	    {

	        fm.action="/reins/out/common/reendor/ReendorQuery.jsp?type="+fm.oldType.value;    

	    }

      }

    fm.submit();

}



function setReadOnlyOfRecoins()

{   

    var i = 0;    

    for (i=1;i<fm.fcoRecoinsCoinsCode.length;i++)

    {

       if(fm.flag7.checked)

       {

           fm.fcoRecoinsTtyShareRate[i].readOnly = false;

           fm.fcoRecoinsFacShareRate[i].readOnly = false;	

           fm.fcoRecoinsRetentionRate[i].readOnly = false;		                         

       }

       else

       {

           fm.fcoRecoinsTtyShareRate[i].readOnly = true;

           fm.fcoRecoinsFacShareRate[i].readOnly = true;	

           fm.fcoRecoinsRetentionRate[i].readOnly = true;		    

       }

    }   

 }

 

 

 

function setReinsInfo(field)

{ 

	var index = getElementIndex(field);

	fm.elements[index+2].value=fm.elements[index].value;

	fm.elements[index+4].value=fm.elements[index].value;

	fm.elements[index+3].value=fm.elements[index+1].value;

	fm.elements[index+5].value=fm.elements[index+1].value;

}

function initValue()

{//����ע�͵���RepolicyEdit.jsp��include FcoFacEdit.jsp����fm�Ҳ�����,ע�͵��˺���

	//if(fm.uniteFlag.value=="2")

	//{
//
	//	fm.flag7.disabled = false;

	//}else

	//	{
//
	//		fm.flag7.disabled = true;

	//	}

}

//add by dongyanqi 20051111������ʾ����������Ϣ
function viewEvaluateRiskInfo(businessType)
{ 
	var endorseNo ;	
	var policyNo ;
	if(businessType=='E')
	{
	  endorseNo=fm.fpoReendorEndorseNo.value;
	}
	if(businessType=='P')   
	{
	  policyNo=fm.fcoRepolicyPolicyNo.value;   
	}
 var url="/reins/ViewEvaluateRiskInfo.do?businessType="+businessType+"&endorseNo="+endorseNo+"&policyNo="+policyNo; 
         
  window.open(url,"����������Ϣ","top=50,left=80,resizable=0,scrollbars=1,dependent,width=600,height=500");
}


//��ʾ�ֱ������켣
function showAdjustTrace(){
	var repolicyNo    = fm.repolicyNo.value;
	//RepolicyAdjustTrace.jsp
	var submitStr = "/reins/adjustRepolicy.do?repolicyno=" + repolicyNo+"&optType=traceShow";
	window.open(submitStr,'�ֱ������켣','width=1000,height=600,top=50,left=0,toolbar=0,location=0,directories=0,menubar=0,scrollbars=1.resizable=1,status=0');
}