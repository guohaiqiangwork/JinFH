/**********************************************************

*报表打印相关函数

*

***/
//add by xuyangyang 2014-02-14(取自长安)
function changeUWyear()

{

	fm.textStartDate.value=fm.selectYear.value+"-"+"01"+"-"+"01";

	fm.textEndDate.value=fm.selectYear.value+"-"+"01"+"-"+"31";

}

	

function getDayCount()

{

    var month = parseInt(fm.selectMonth.value);

    var year = parseInt(fm.selectYear.value);

   switch(month)

    { 

        case 1:

        case 3:

        case 5:

        case 7:

        case 8:

        case 10:

        case 12:

	  if(month<10)

	     {	

		fm.textStartDate.value=fm.selectYear.value+"-"+"0"+fm.selectMonth.value+"-"+"01";

		fm.textEndDate.value=fm.selectYear.value+"-"+"0"+month+"-"+"31";

	    }else

	    {

		fm.textStartDate.value=fm.selectYear.value+"-"+month+"-"+"01";	

		fm.textEndDate.value=fm.selectYear.value+"-"+month+"-"+"31";

	    }

	    break;

	case 4:

	case 6:

	case 9:

	case 11:

	    if(month<10)

	    {		

		fm.textStartDate.value=fm.selectYear.value+"-"+"0"+month+"-"+"01";

		fm.textEndDate.value=fm.selectYear.value+"-"+"0"+month+"-"+"30";

	    }else

	    {

		fm.textStartDate.value=fm.selectYear.value+"-"+month+"-"+"01";	

        	fm.textEndDate.value=fm.selectYear.value+"-"+month+"-"+"30";

	    }

	    break;

	case 2:

	   if(year%4 ==0 && year%100 == 0)

	   {

	  	fm.textStartDate.value=fm.selectYear.value+"-"+"02"+"-"+"01";

		fm.textEndDate.value=fm.selectYear.value+"-"+"02"+"-"+"29";

	   }else if(year%400 == 0)

	   {

	       fm.textStartDate.value=fm.selectYear.value+"-"+"02"+"-"+"01";

	       fm.textEndDate.value=fm.selectYear.value+"-"+"02"+"-"+"29";

	   }else

	   {

               fm.textStartDate.value=fm.selectYear.value+"-"+"02"+"-"+"01";

	       fm.textEndDate.value=fm.selectYear.value+"-"+"02"+"-"+"28";

	   }

	   break;

       }

}

function setDateTime()

{

    

    for(i=0;i<4;i++)

    {

    	if(fm.radioButtonQuarter[i].checked==true)

    	{

    	   if(fm.radioButtonQuarter[i].value=="1")

    	   {	

               fm.textStartDate.value=fm.selectYear.value+"-"+"01"+"-"+"01";

               fm.textEndDate.value=fm.selectYear.value+"-"+"03"+"-"+"31";

           }

            if(fm.radioButtonQuarter[i].value=="2")

            {

	    fm.textStartDate.value=fm.selectYear.value+"-"+"04"+"-"+"01";

	    fm.textEndDate.value=fm.selectYear.value+"-"+"06"+"-"+"30";

            }

            if(fm.radioButtonQuarter[i].value=="3")

             { 

	          fm.textStartDate.value=fm.selectYear.value+"-"+"07"+"-"+"01";

	          fm.textEndDate.value=fm.selectYear.value+"-"+"09"+"-"+"30";

             }

             if(fm.radioButtonQuarter[i].value=="4")

             {

	         fm.textStartDate.value=fm.selectYear.value+"-"+"10"+"-"+"01";

	         fm.textEndDate.value=fm.selectYear.value+"-"+"12"+"-"+"31"; 

              }

            }

    }

}

function PrintButtonAction()

{

	

    window.open("/reins/ttyReportPrint.do?selectReport="+ fm.selectReport.value+ "&selectYear=" + fm.selectYear.value+"&textStartDate=" + fm.textStartDate.value +"&textEndDate=" + fm.textEndDate.value +"&strReportPeriod=" + fm.strReportPeriod.value+"&operateType="+fm.operateType.value );

}	           

			

function printPage()

 {

      divButton.style.display = "none";

      window.print();

 }		

//页面打开时根据当前时间初始化selectYear 和selectedMonth的值

function inivalue()

{

	var year = new String(new Date().getYear());

	var month = new String(new Date().getMonth());

	var year2 = year.substr(3,4);

	fm.selectYear.selectedIndex = year2;

	fm.selectMonth .selectedIndex= month;

	if(month<=3)

	{ 

		fm.radioButtonQuarter[0].checked = true;

	}

    else  if(month<=6)

    {

    	fm.radioButtonQuarter[1].checked = true;

    }

    else if(month<=9)

    {

    	fm.radioButtonQuarter[2].checked = true;

    }

    else if(month<=12)

    {

    	fm.radioButtonQuarter[3].checked = true;

    } 

	

		

	getDayCount();

}		 
//add begin by fengbo 20070403 打印重损通知用到
//当改变页面上一个输入域的值时，同名的输入域也更新
function setNewValue(field)
 {
       var i = 0;
       var order = 0;
       var elements = document.getElementsByName(field.name);
       for(i=0;i<elements.length;i++)
       {
           order++;
           if(elements[i]!=field)
           {
               elements[i].value=field.value;
           }
       }
}
//add end by fengbo 20070403 打印重损通知用到
	  

      