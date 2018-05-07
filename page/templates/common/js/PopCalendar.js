<!-- Begin  //place these scripts within BODY tag if you are using IE 4.0 or below.

//****************************************************************************

// PopCalendar 3.50, Emailware(please mail&commend me if u like it)

// Originally coded by Liming(Victor) Weng, email: victorwon@netease.com

// Release date: 2000.3.13

// Anyone may modify it to satify his needs, but please leave this comment ahead.

//****************************************************************************
var gdCtrl = new Object();
var gdCtrl2 = new Object();
var goSelectTag = new Array();
var gcGray = "#808080";
var gcToggle = "#ffff00";
var gcBG = "#cccccc";

var gdCurDate = new Date();
var giYear = gdCurDate.getFullYear();
var giMonth = gdCurDate.getMonth()+1;
var giDay = gdCurDate.getDate();

function arrowtag(namestr,valuestr)
{
    document.write("<input type='text' name='"+namestr+"' value='"+valuestr
    	+"' size='10' style='text-align: center;' onclick='fPopCalendar("+namestr+","+namestr+");return false' onfocus='fPopCalendar("+namestr+","+namestr+");return false'>");
}

//****************************************************************************
// Param: popCtrl is the widget beyond which you want this calendar to appear;
//        dateCtrl is the widget into which you want to put the selected date.
// i.e.: <input type="text" name="dc" style="text-align:center" readonly><INPUT type="button" value="V" onclick="fPopCalendar(dc,dc);return false">
//****************************************************************************
function fPopCalendar(popCtrl, dateCtrl)
{
	event.cancelBubble=true;
	gdCtrl = dateCtrl;
	fSetYearMon(giYear, giMonth);
	var point = fGetXY(popCtrl);
	with(VicPopCal.style)
	{
		left = point.x;
		top  = point.y+popCtrl.offsetHeight+1;
		width = VicPopCal.offsetWidth;
		height = VicPopCal.offsetHeight;
		fToggleTags(point);
		visibility = 'visible';
	}
	VicPopCal.focus();
}

/**
 * this Mothed is added by FengJie(FengJie@neusoft.com) for put date into 2 widgets together
 */
function fPopCalendar2(popCtrl, dateCtrl, dateCtrl2)
{
	event.cancelBubble=true;

	gdCtrl = dateCtrl;
	gdCtrl2 = dateCtrl2;
	fSetYearMon(giYear, giMonth);
	var point = fGetXY(popCtrl);

	with (VicPopCal.style)
	{
		left = point.x;
		top  = point.y+popCtrl.offsetHeight+1;
		width = VicPopCal.offsetWidth;
		height = VicPopCal.offsetHeight;
		fToggleTags(point);
		visibility = 'visible';
	}
	VicPopCal.focus();
}

function fSetDate(iYear, iMonth, iDay)
{
	if (iDay<10) iDay='0'+iDay;
	if (iMonth<10) iMonth='0'+iMonth;//added by zhaoshijie 2002-09-25;
	gdCtrl.value = iYear+"-"+iMonth+"-"+iDay; //Here, you could modify the locale as you need !!!!
	gdCtrl2.value = gdCtrl.value;

	fHideCalendar();
}

function fHideCalendar()
{
    if (VicPopCal == null || VicPopCal.style== null)
        return;

	VicPopCal.style.visibility = "hidden";

	for (var i=0;i<goSelectTag.length; i++)
	    goSelectTag[i].style.visibility = "visible";

	goSelectTag.length = 0;
}

function fSetSelected(aCell)
{
	var iOffset = 0;
	var iYear = parseInt(tbSelYear.value);
	var iMonth = parseInt(tbSelMonth.value);

	aCell.bgColor = gcBG;

	with (aCell.children["cellText"])
	{
	    var iDay = parseInt(innerText);
	    if (color==gcGray)
            iOffset = (Victor<10)?-1:1;

	    iMonth += iOffset;

	    if (iMonth<1)
	    {
            iYear--;
            iMonth = 12;

	    }
	    else if (iMonth>12)
	    {
            iYear++;
            iMonth = 1;
	    }
	}
	fSetDate(iYear, iMonth, iDay);
}

function fPoint(iX, iY)
{
	this.x = iX;
	this.y = iY;
}

function fBuildCal(iYear, iMonth)
{
	var aMonth=new Array();
	for(var i=1;i<7;i++)
	    aMonth[i]=new Array(i);

	var dCalDate=new Date(iYear, iMonth-1, 1, 0, 0, 0);
	var iDayOfFirst=dCalDate.getDay();
	var iDaysInMonth=new Date(iYear, iMonth, 0).getDate();
	var iOffsetLast=new Date(iYear, iMonth-1, 0).getDate()-iDayOfFirst+1;
	var iDate = 1;
	var iNext = 1;

	for (var d = 0; d < 7; d++)
	    aMonth[1][d] = (d<iDayOfFirst)?-(iOffsetLast+d):iDate++;
	for (var w = 2; w < 7; w++)
	    for (var d = 0; d < 7; d++)
            aMonth[w][d] = (iDate<=iDaysInMonth)?iDate++:-(iNext++);

	return aMonth;
}

function fDrawCal(iYear, iMonth, iCellHeight, iDateTextSize)
{
	var WeekDay = new Array("日","一","二","三","四","五","六");
	var styleTD = " bgcolor='"+gcBG+"' bordercolor='"+gcBG+"' valign='middle' align='center' height='"+iCellHeight+"' style='font:bold "+iDateTextSize+" 宋体;";            //Coded by Liming Weng(Victor Won) email:victorwon@netease.com

	with (document)
	{
	    write("<tr>");
	    for(var i=0; i<7; i++)
	            write("<td "+styleTD+"color:#990099' >" + WeekDay[i] + "</td>");
	    write("</tr>");

	    for (var w = 1; w < 7; w++)
	    {
            write("<tr>");
            for (var d = 0; d < 7; d++)
            {
				write("<td id=calCell "+styleTD+"cursor:hand;' onMouseOver='this.bgColor=gcToggle' onMouseOut='this.bgColor=gcBG' onclick='fSetSelected(this)'>");
				write("<font id=cellText Victor='Liming Weng'> </font>");
				write("</td>")
            }
            write("</tr>");
	    }
	}
}

function fUpdateCal(iYear, iMonth)
{
	myMonth = fBuildCal(iYear, iMonth);
	var i = 0;

	for (var w = 0; w < 6; w++)
	    for (var d = 0; d < 7; d++)
			with (cellText[(7*w)+d])
			{
				Victor = i++;

				if (myMonth[w+1][d]<0)
				{
					color = gcGray;
					innerText = -myMonth[w+1][d];
				}
				else
				{
					color = ((d==0)||(d==6))?"red":"black";
                    if (iYear==giYear && iMonth==giMonth && myMonth[w+1][d]==giDay)
                    {
                        innerHTML="<span style='background-color:#ffffcc'>" + myMonth[w+1][d] + "</span>";
                    } else {
					    innerText = myMonth[w+1][d];
                    }
				}
            }
}

function fSetYearMon(iYear, iMon)
{
	tbSelMonth.options[iMon-1].selected = true;
	for (var i = 0; i < tbSelYear.length; i++)
	    if (tbSelYear.options[i].value == iYear)
            tbSelYear.options[i].selected = true;
	fUpdateCal(iYear, iMon);
}

function fPrevMonth()
{
	var iMon = tbSelMonth.value;
	var iYear = tbSelYear.value;

	if (--iMon<1)
	{
	    iMon = 12;
		iYear--;
	}
	fSetYearMon(iYear, iMon);
}

function fNextMonth()
{
	var iMon = tbSelMonth.value;
	var iYear = tbSelYear.value;

	if (++iMon>12)
	{
		iMon = 1;
		iYear++;
	}
	fSetYearMon(iYear, iMon);
}

function fToggleTags()
{
	with (document.all.tags("SELECT"))
	{
	    for (var i=0; i<length; i++){ 
			if ((item(i).Victor!="Won")&&fTagInBound(item(i)))
			{
				item(i).style.visibility = "hidden";
				goSelectTag[goSelectTag.length] = item(i);
			}
	}
}
}

function fTagInBound(aTag)
{
	with (VicPopCal.style)
	{
	    var l = parseInt(left);
	    var t = parseInt(top);
	    var r = l+parseInt(width);
	    var b = t+parseInt(height);
	    var ptLT = fGetXY(aTag);
	    return !((ptLT.x>r)||(ptLT.x+aTag.offsetWidth<l)||(ptLT.y>b)||(ptLT.y+aTag.offsetHeight<t));
	}
}

function fGetXY(aTag)
{
	var oTmp = aTag;
	var pt = new fPoint(0,0);
	do
	{
		pt.x += oTmp.offsetLeft;
		pt.y += oTmp.offsetTop;
		oTmp = oTmp.offsetParent;
		if(oTmp==null){ 
			break;
			
		}
	} while(oTmp.tagName!="BODY");

	return pt;
}



var gMonths = new Array("&nbsp;一月","&nbsp;二月","&nbsp;三月","&nbsp;四月","&nbsp;五月","&nbsp;六月","&nbsp;七月","&nbsp;八月","&nbsp;九月","&nbsp;十月","十一月","十二月");
with (document)
{
	write("<Div id='VicPopCal' onclick='event.cancelBubble=true' style='POSITION:absolute;visibility:hidden;border:1px ridge;z-index:90000;'>");
	write("<table border='0' bgcolor='#6699cc'>");
	write("<TR>");
	write("<td valign='middle' align='center'><input type='button' name='PrevMonth' value='<' style='height:20;width:20;FONT:bold' onClick='fPrevMonth()'>");
	write("&nbsp;<SELECT name='tbSelYear' id='tbSelYear' onChange='fUpdateCal(tbSelYear.value, tbSelMonth.value)' Victor='Won'>");
	for(var i=1900;i<=2015;i++)
		write("<OPTION value='"+i+"'>"+i+"年</OPTION>");
	write("</SELECT>");
	write("&nbsp;<select name='tbSelMonth' id='tbSelMonth' onChange='fUpdateCal(tbSelYear.value, tbSelMonth.value)' Victor='Won'>");
	for (var i=0; i<12; i++)
		write("<option value='"+(i+1)+"'>"+gMonths[i]+"</option>");
	write("</SELECT>");
	write("&nbsp;<input type='button' name='PrevMonth' value='>' style='height:20;width:20;FONT:bold' onclick='fNextMonth()'>");
	write("</td>");
	write("</TR><TR>");
	write("<td align='center'>");
	write("<DIV style='background-color:#999999'><table width='100%' border='0' cellpadding='2'>");
	fDrawCal(giYear, giMonth, 12, 12);
	write("</table></DIV>");
	write("</td>");
	write("</TR><TR><TD align='center'>");
	write("<B style='cursor:hand; font: bold 14 宋体' onclick='fSetDate(giYear,giMonth,giDay)' onMouseOver='this.style.color=gcToggle' onMouseOut='this.style.color=0'>今天："+giYear+"年"+giMonth+"月"+giDay+"日</B>");
	write("</TD></TR>");
	write("</TABLE></Div>");
	write("<SCRIPT event=onclick() for=document>fHideCalendar()</SCRIPT>");
}

// End -- Coded by Liming Weng, email: victorwon@netease.com -->

