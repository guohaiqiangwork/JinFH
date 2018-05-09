/****************************************************************************
 * DESC       ：多记录操纵
* Author     : 东安项目组
 * CREATEDATE ：2002-06-24
 * MODIFYLIST ：   Name       Date            Reason/Contents
 *          ------------------------------------------------------
 *          zhouxianli     2002-07-08       修改模式2，增加定位方法
 *          zhouxianli     2002-07-12       修改模式2，改为包含控制按钮方式
 *          zhouxianli     2002-08-23       修改模式2，包含的控制按钮方式置与第二个tbody中
 *          zhouxianli     2002-08-26       修改模式2，新加一条时，自动定位到第一个可见域
 *          zhouxianli     2002-08-27       修改模式2，所有控制方法改为回调实现，
 *                                          即使用上一页/下一页模式必须实现以下几个方法
 *																					insert<PageCode>()
 *																					delete<PageCode>()
 *																					previous<PageCode>()
 *																					next<PageCode>()
 *																					fieldLocate<PageCode>(Field)
 *                                          修改模式1，新增方法setRowColor(),改变一行的颜色
 *                                          修改模式2，setRecordState()
 *          zhouxianli     2002-09-05       add method getPageFieldsName();
 *          sunchenggang   2002-09-24       替换所有onePageData.count为onePageData.length
 *          luxupan        2002-10-10       增加方法，用于批单显示
 *                                          setRowColorPG,根据flag设置一行颜色
 *                                          newFieldPG,上下模式的赋值方法
 *
 *          sunchenggang   2002-11-17       增加模式3,处理模式2中包含模式1的情况,
 *                                          增加全局数组变量allRowData,并相应增加
 *                                          getRowData()、setRowData()、deleteRowRecord()、
 *                                          setCurrentRowRecord()、loadRowRecord()、iniRowRecord()、
 *                                          saveRowRecordToSingleTable() 、saveRowRecordToMultiTable等函数
 *
 *         sunchenggang    2002-11-18       将setRowColorPG()、newFieldPG()两个函数移至UICommon.js中
 *         zhouxianli      2002-11-23       修正模式2零条记录时的提交错误，修改函数saveRecord,clearRecord
 *         daironghui      2003-04-28       修改addRecord,deleteRecord，loadRecord,给field.oldvalue赋值,
 *         zhouxianli      2004-09-27       完善模式3,修改注释,提供答疑及样例，
 *                                          并实现多表模式，去掉以前重复的saveRowRecordToSingleTable方法
 *
 ****************************************************************************/

/*
注意：需要Common.js中的getElementOrder()方法,errorMessage()
      fieldInsertRow(PageCode)调用页面的"insert" + PageCode + "()"方法

工作原理:
分两种模式，加减模式和上一条/下一条模式，原理如下所示

模式1:加减模式
    <span style="display:none">
      <table id="<PageCode>_Data">
        <tbody>
          中间放入一组数据(即实际展现给用户使用的一组tr)
        </tbody>
      </table>
    </span>
    <table id="<PageCode>">
      <thead>
        中间显示标题
      </thead>
      <tfoot>
        放入加号
      </tfoot>
      <tbody>
        空的，中间操纵多组数据区域
      </tbody>
    </table>

    <script language='javascript'>
      function insert<PageCode>()
      {
        insertRow('<PageCode>','<PageCode>_Data');
        ...
      }

      function delete<PageCode>(Field,intPageDataKeyCount,intRowCount)
      {
        deleteRow('<PageCode>',Field,intPageDataKeyCount,intRowCount);
        ...
      }
      ...
    </script>
    标题域也要求写上输入域的名字，即实际数据从第一行开始。

    span为隐藏table用,table中为实际的一组数据
    talbe的ID建议为PageCode + "_Data",不能与其他tablei的id相同
    thead必须包含和表格主体一样的列数
    tfoot必须出现在tbody前
    -号按钮命名建议为"button_" + PageCode + "_Delete",确保不与其他元素重名即可
    +号按钮命名建议为"button_" + PageCode + "_Insert",确保不与其他元素重名即可
    ...号按钮命名建议为"button_" + PageCode + "_Open_Context",确保不与其他元素重名即可
    ...号下span命名建议为"span_" + PageCode + "_Context",确保不与其他元素重名即可
    条款确定按钮命名建议为"button_" + PageCode + "_Close_Context",确保不与其他元素重名即可
*/

//在表格下方添加一组数据,
//参数为页对象和页原始数据代码名称
//例:insertTableRow(document.all("Engage"),"Engage_Data");
function insertTableRow(Page,DataPageCode)
{

  var oTBODY     = Page.tBodies.item(0);
  var oTBODYData = document.all(DataPageCode).tBodies.item(0);

  var oCellsData;
  var oTR;
  var oTCell;
  var i = 0;
  var j = 0;

  for(i=0;i<oTBODYData.rows.length;i++)
  {
    oCellsData = oTBODYData.rows(i).cells;

    oTR=oTBODY.insertRow(-1);

    if(oTBODYData.rows(i).className!=null)
    {
      oTR.className = oTBODYData.rows(i).className;
    }
    if(oTBODYData.rows(i).align!=null)
    {
      oTR.align = oTBODYData.rows(i).align;
    }


    for(j=0;j<oCellsData.length;j++)
    {
      oTCell=oTR.insertCell(j);
      oTCell.innerHTML = oCellsData.item(j).innerHTML;
      if(oCellsData.item(j).className!=null)
      {
        oTCell.className = oCellsData.item(j).className;
      }
      if(oCellsData.item(j).align!=null)
      {
        oTCell.align = oCellsData.item(j).align;
      }
    }
  }
}

//在表格下方添加一组数据,
//参数为页代码名称和页原始数据代码名称
//例:insertRow("Engage","Engage_Data");
function insertRow(PageCode,DataPageCode)
{
  if(DataPageCode==null)
  {
    DataPageCode = PageCode + "_Data";
  }
  var oTBODY     = document.all(PageCode).tBodies.item(0);
  var oTBODYData = document.all(DataPageCode).tBodies.item(0);

  var oCellsData;
  var oTR;
  var oTCell;
  var i = 0;
  var j = 0;

  for(i=0;i<oTBODYData.rows.length;i++)
  {

    oCellsData = oTBODYData.rows(i).cells;

    oTR=oTBODY.insertRow(-1);

    if(oTBODYData.rows(i).className!=null)
    {
      oTR.className = oTBODYData.rows(i).className;

    }
    if(oTBODYData.rows(i).align!=null)
    {
      oTR.align = oTBODYData.rows(i).align;

    }


    for(j=0;j<oCellsData.length;j++)
    {
      oTCell=oTR.insertCell(j);
      oTCell.innerHTML = oCellsData.item(j).innerHTML;
      if(oCellsData.item(j).className!=null)
      {
        oTCell.className = oCellsData.item(j).className;
      }
      if(oCellsData.item(j).align!=null)
      {
        oTCell.align = oCellsData.item(j).align;
      }
    }
  }
}

//删除控制按钮控制的行
//页名称，字段，数据页中控制按钮的个数，数据页中每个控制按钮的控制的TR的个数
function deleteRow(PageCode,Field,intPageDataKeyCount,intRowCount)
{
  if (intPageDataKeyCount==null)
  {
    intPageDataKeyCount = 1;
  }

  if (intRowCount==null)
  {
    intRowCount = 1;
  }

  var intIndex = parseInt(getElementOrder(Field),10) - 1;  //顺序改为以0开始
  var oTBODY   = document.all(PageCode).tBodies.item(0);
  intIndex = intIndex - intPageDataKeyCount;  //去掉隐含域中的控制按钮的个数

  for(var i=0;i<intRowCount;i++)
  {
    oTBODY.deleteRow(intIndex*intRowCount);
  }
}

//得到一页的多行纪录的记录数
//页名称
function getRowsCount(PageCode)
{
  var oTBODY   = document.all(PageCode).tBodies.item(0);
  var intCount = oTBODY.rows.length;
  return intCount;
}

//设置一行的颜色
function setRowColor(DataPageCode,index,color)
{
	var i = 0;
	var name = "";
  var elements;
  //index--; //顺序改为以0开始
  //得到Input域的名字
  elements = document.all(DataPageCode).tBodies.item(0).getElementsByTagName("input");
  for(i=0;i<elements.length;i++)
  {
  	name = elements[i].name + "[" + index + "]";
    eval("fm." + name + ".style.backgroundColor = color;");
  }
  //得到Select域的名字
  elements = document.all(DataPageCode).tBodies.item(0).getElementsByTagName("select");
  for(i=0;i<elements.length;i++)
  {
  	name = elements[i].name + "[" + index + "]";
    eval("fm." + name + ".style.backgroundColor = color;");
 }
  //得到textarea域的名字
  elements = document.all(DataPageCode).tBodies.item(0).getElementsByTagName("textarea");
  for(i=0;i<elements.length;i++)
  {
  	name = elements[i].name + "[" + index + "]";
    eval("fm." + name + ".style.backgroundColor = color;");
  }

}


//清除一页的所有多行纪录
//页名称
function deleteAllRows(PageCode)
{
  var oTBODY   = document.all(PageCode).tBodies.item(0);
  var intCount = getRowsCount(PageCode);

  for(var i=0;i<intCount;i++)
  {
   oTBODY.deleteRow(0);
  }
}

//按↓（向下）键时调用页面的"insert" + PageCode + "()"方法
function fieldInsertRow(PageCode)
{
  if( window.event.keyCode==40)
  {
    eval("insert" + PageCode + "()");
  }
}


//得到一页所有的Fields Name
function getPageFieldsName(PageCode,DataPageCode)
{
  var i = 0;
  var elementIndex = 0;
  var elements;
  var pageFieldsName=new Array();
  //得到Input域的名字
  elements = document.all(DataPageCode).tBodies.item(0).getElementsByTagName("input");
  for(i=0;i<elements.length;i++)
  {
  	if(elements[i].name!=("button_" + PageCode + "_Delete"))
  	{
	    pageFieldsName[elementIndex] = elements[i].name;
	    elementIndex++;
	  }
  }
  //得到Select域的名字
  elements = document.all(DataPageCode).tBodies.item(0).getElementsByTagName("select");
  for(i=0;i<elements.length;i++)
  {
    pageFieldsName[elementIndex] = elements[i].name;
    elementIndex++;
  }
  //得到textarea域的名字
  elements = document.all(DataPageCode).tBodies.item(0).getElementsByTagName("textarea");
  for(i=0;i<elements.length;i++)
  {
    pageFieldsName[elementIndex] = elements[i].name;
    elementIndex++;
  }
	return pageFieldsName;
}

/*
  模式2:上一条/下一条模式

    <table id="<PageCode>">

      <tbody>
        一组数据(即实际展现给用户使用的一组tr)
      </tbody>
      <tbody>
        <jsp:include page="/commonship/pub/UIMulLinePrevNextModeControl.jsp">
          <jsp:param name="PageCode" value="<PageCode>" />
        </jsp:include>
      </tbody>
    </table>

    实际数据从第一行开始。
注意
    状态区的名字为"span_" + PageCode + "_State"
    保存区的名字为"span_" + PageCode
    提交前一定要调用saveRecord(PageCode);
    Javascript的重载实际上是调用名字相同的位置最后的一个函数

    allPageData存放多个onePageData
    onePageData存放一种内容的上一条/下一条模式页的数据
    数据实际上可以分为属性和普通数据：
      属性：currentIndex，count，field，其中field实际上是一个数组，
            存储一页的输入域的名称；
      普通数据：存储多个数组，每个数组包含一页对应的field的对象的value,title,style,tag的值

*/
//各个多行输入区属性信息
var allPageData    = new Array();  //公用，不能当作临时变量改变

//按回车键时定位纪录
function fieldLocateRecord(PageCode,Field)
{
  if(!isNumeric(Field.value))
  {
    errorMessage("请输入合法的数字!");
    return false;
  }

  var index = parseInt(Field.value,10);
  if(!isNaN(index))
  {
    return locateRecord(PageCode,index);
  }
}

//功能：上一页
//工作原理：
//保存当前纪录
//如果有上一条，当前索引减一，读出并显示
//否则提示已经到了第一条纪录
//设置状态
function previousRecord(PageCode)
{
  setCurrentRecord(PageCode);
  var onePageData = getPageData(PageCode);
  if(onePageData.currentIndex<=0)
  {
    errorMessage("已经到了第一条记录!");
    return false;  //模式三用
  }
  else
  {
    onePageData.currentIndex--;
    loadRecord(PageCode);
  }
  setRecordState(PageCode,"");
  return true;
}


//功能：下一页
//工作原理：
//保存当前纪录
//如果有下一条，当前索引加一，读出并显示，设置状态。
//读出并显示，否则提示已经到了最后一条纪录
//设置状态。
function nextRecord(PageCode)
{
  var i = 0;
  var onePageData = getPageData(PageCode);
  var intIndex = onePageData.currentIndex;

  //保存当前纪录
  setCurrentRecord(PageCode);

  //如果到最后一行了，则提示
  if(intIndex>=onePageData.length-1)
  {
    onePageData.currentIndex = onePageData.length-1;
    errorMessage("已经到了最后一条记录!");
    return false;     //模式三用
  }
  else //否则，读出下一行内容
  {
    intIndex++;
    onePageData.currentIndex = intIndex;
    loadRecord(PageCode);
  }
  setRecordState(PageCode,"");
  return true;
}


//功能：定位第n页
//工作原理：
//保存当前纪录
//检查纪录号，如果有读出并显示，设置状态。
//否则提示错误信息
//设置状态。
function locateRecord(PageCode,index)
{
  var onePageData = getPageData(PageCode);
  //保存当前纪录
  setCurrentRecord(PageCode);

  //如果超过最后一行，则提示
  if(index>onePageData.length)
  {
    errorMessage("不存在记录号为" + index + "的记录, 最大的记录号为" + onePageData.length + "!");
    //modify by weishixin add start 20030828
    //原因：增加处理当没有页数据时，焦点不能移出查询域的BUG
    if(onePageData.length<=0)
    {
    	return true;
    }
    //modify by weishixin add end 20030828
    setRecordState(PageCode,"");
    return false;
  }
  else if(index<1)
  {
    errorMessage("记录号不能小于1!");
    setRecordState(PageCode,"");
    return false;
  }
  else //否则，读出下一行内容
  {
    onePageData.currentIndex = index - 1;
    setPageData(PageCode,onePageData);
    loadRecord(PageCode);
  }
  setRecordState(PageCode,"");
  return true;
}

//删除当前纪录
function deleteRecord(PageCode)
{
  var i=0;

  var onePageData = getPageData(PageCode);

  var onePageDataTemp = new Array();

  //只有一条纪录时，disable所有控件
  if(onePageData.length<=1)
  {
    disableRecordInput(PageCode);
    for(i=0;i<onePageData["field"].length;i++)
    {
      if(fm.all(onePageData.field[i]).tagName!="SELECT")
      {
        fm.all(onePageData.field[i]).value               = "";
        fm.all(onePageData.field[i]).oldvalue            = "";
      }
      fm.all(onePageData.field[i]).title                 = "";
      fm.all(onePageData.field[i]).style.backgroundColor = "";
      fm.all(onePageData.field[i]).tag                   = "";
    }
    onePageDataTemp.currentIndex = -1;
    onePageDataTemp.count        = 0;
    onePageDataTemp.field        = onePageData.field;
    onePageData                  = onePageDataTemp;
    setPageData(PageCode,onePageData);
  }
  else
  {
    for(i=0;i<onePageData.currentIndex;i++)
    {
      onePageDataTemp[i]=onePageData[i];
    }
    for(i=onePageData.currentIndex+1;i<onePageData.length;i++)
    {
      onePageDataTemp[i-1]=onePageData[i];
    }

    onePageDataTemp.currentIndex = onePageData.currentIndex-1;

    if(onePageDataTemp.currentIndex<0)
    {
      onePageDataTemp.currentIndex = 0;
    }

    onePageDataTemp.count = onePageData.length-1;
    onePageDataTemp.field = onePageData.field;
//    onePageData           = onePageDataTemp;
    setPageData(PageCode,onePageDataTemp);

    loadRecord(PageCode);
  }
  setRecordState(PageCode,"");
}

//加载当前纪录并显示
function loadRecord(PageCode)
{
  var i = 0;
  var onePageData    = getPageData(PageCode);

  if(onePageData.length==0)
    return;

  var onePageRowData = onePageData[onePageData.currentIndex];
  for(i=0;i<onePageData["field"].length;i++)
  {

    fm.all(onePageData.field[i]).value                 = onePageRowData[onePageData.field[i]].value;
    fm.all(onePageData.field[i]).oldvalue              = onePageRowData[onePageData.field[i]].value;
    fm.all(onePageData.field[i]).title                 = onePageRowData[onePageData.field[i]].title;
    fm.all(onePageData.field[i]).style.backgroundColor = onePageRowData[onePageData.field[i]].backgroundColor;
    fm.all(onePageData.field[i]).tag                   = onePageRowData[onePageData.field[i]].tag;
  }

  setRecordState(PageCode,"");
}

//初始化页
function iniRecord(PageCode)
{
  var i = 0;
  var elementIndex = 0;
  var elements;
  var onePageData=new Array();
  onePageData["field"] = new Array();
  //得到Input域的名字
  elements =   document.all(PageCode).tBodies.item(0).getElementsByTagName("input");

  for(i=0;i<elements.length;i++)
  {

    if(elements[i].type=="button") continue;
    onePageData["field"][elementIndex] = elements[i].name;
    fm.all(onePageData.field[elementIndex]).value                 = "";
    fm.all(onePageData.field[elementIndex]).title                 = "";
    fm.all(onePageData.field[elementIndex]).style.backgroundColor = "";
    fm.all(onePageData.field[elementIndex]).tag                   = "";

    elementIndex++;
  }
  //得到Select域的名字
  elements = document.all(PageCode).tBodies.item(0).getElementsByTagName("select");
  for(i=0;i<elements.length;i++)
  {
    onePageData["field"][elementIndex] = elements[i].name;
    fm.all(onePageData.field[elementIndex]).selectedIndex         = 0;
    fm.all(onePageData.field[elementIndex]).title                 = "";
    fm.all(onePageData.field[elementIndex]).style.backgroundColor = "";
    fm.all(onePageData.field[elementIndex]).tag                   = "";

    elementIndex++;
  }
  //得到textarea域的名字
  elements = document.all(PageCode).tBodies.item(0).getElementsByTagName("textarea");
  for(i=0;i<elements.length;i++)
  {
    onePageData["field"][elementIndex] = elements[i].name;
    fm.all(onePageData.field[elementIndex]).value                 = "";
    fm.all(onePageData.field[elementIndex]).title                 = "";
    fm.all(onePageData.field[elementIndex]).style.backgroundColor = "";
    fm.all(onePageData.field[elementIndex]).tag                   = "";

    elementIndex++;
  }

  onePageData["currentIndex"]=-1;        //当前记录索引
  onePageData["count"]=0;

  setPageData(PageCode,onePageData);

  disableRecordInput(PageCode);
  setRecordState(PageCode,"");

}



//功能：加入一页
//工作原理：
//保存当前纪录
//新加一条纪录，并清空显示，count加一
//设置状态
function addRecord(PageCode)
{
  enableRecordInput(PageCode);

  var onePageData = getPageData(PageCode);
  setCurrentRecord(PageCode);
  var onePageRowData = new Array();
  var intIndex = onePageData.length;
  onePageData.currentIndex = intIndex;
  onePageData[onePageData.currentIndex] = onePageRowData;
  var foundFirstVisibleCommpent = false;
  for(var i=0;i<onePageData["field"].length;i++)
  {
    onePageRowData[onePageData.field[i]] = "";
    if(fm.all(onePageData.field[i]).tagName!="SELECT")
    {
	    fm.all(onePageData.field[i]).value               = "";
	    fm.all(onePageData.field[i]).oldvalue            = "";
    }
    fm.all(onePageData.field[i]).title                 = "";
    fm.all(onePageData.field[i]).style.backgroundColor = "";
    fm.all(onePageData.field[i]).tag                   = "";

    if(foundFirstVisibleCommpent==false)
    {
      if(fm.all(onePageData.field[i]).type != "hidden")
      {
        try{
          fm.all(onePageData.field[i]).focus();
        }catch(E){}
        foundFirstVisibleCommpent = true;
      }
    }
  }

  setRecordState(PageCode,"");
}

//保存当前纪录
function setCurrentRecord(PageCode)
{
  var onePageRowData = new Array();
  var onePageData = getPageData(PageCode);

  onePageData[onePageData.currentIndex] = onePageRowData;

  for(var i=0;i<onePageData["field"].length;i++)
  {
		onePageRowData[onePageData.field[i]] = newField(fm.all(onePageData.field[i]).value,
		                                                fm.all(onePageData.field[i]).title,
		                                                fm.all(onePageData.field[i]).style.backgroundColor,
		                                                fm.all(onePageData.field[i]).tag);

  }

  setPageData(PageCode,onePageData);
}

//设置当前状态
function setRecordState(PageCode,MessageAppend)
{
  var onePageData = getPageData(PageCode);

  allPageData[PageCode].count = allPageData[PageCode].length;
  eval("span_" + PageCode + "_State").innerHTML = "第" + (onePageData.currentIndex + 1) + "条/共" + onePageData.length + "条" + MessageAppend;
}


//保存纪录进入span
function saveRecord(PageCode)
{
  setCurrentRecord(PageCode);
  clearRecord(PageCode);

  var strText = "";
  var onePageData = getPageData(PageCode);
  for(var i=0;i<onePageData.length;i++)
  {
    for(var j=0;j<onePageData["field"].length;j++)
    {
      strText = strText +
                "<input type=hidden name='" + onePageData.field[j] + "'" +
                " value='" + onePageData[i][onePageData.field[j]].value+ "'>";
    }
  }
  eval("span_" + PageCode).innerHTML = strText;

  if(onePageData.length==0)
  {
    enableRecordInput(PageCode);
  }
  return true;
}


//清除纪录所在的span的内容
function clearRecord(PageCode)
{
  eval("span_" + PageCode).innerHTML = "";
  var onePageData = getPageData(PageCode);
  if(onePageData.length==0)
  {
    disableRecordInput(PageCode);
  }
  return true;
}


//使一页对应的输入域disable
function disableRecordInput(PageCode)
{
  var i = 0;
  var onePageData = getPageData(PageCode);
  for(i=0;i<onePageData["field"].length;i++)
  {
    eval("fm." + onePageData.field[i] + ".disabled=true");
  }
  return true;
}

//使一页对应的输入域enable
function enableRecordInput(PageCode)
{
  var i = 0;
  var onePageData = getPageData(PageCode);
  for(i=0;i<onePageData["field"].length;i++)
  {
    eval("fm." + onePageData.field[i] + ".disabled=false");
  }
  return true;
}

//得到一页的所有对象
function getPageData(PageCode)
{
	return allPageData[PageCode];
}

//设置一页的所有对象
function setPageData(PageCode,PageDataArray)
{
	allPageData[PageCode] = PageDataArray;
}

//生成一个field对象,即给一个field对象赋值
function newField(value,title,backgroundColor,tag)
{
	var field = new Array();
	field.value = value;
	field.title = title;
	field.backgroundColor = backgroundColor;
	field.tag   = tag;
	return field;
}




//设置一个页的颜色，即改变一页中所有输入域的颜色
function setRecordColor(PageCode,backgroundColor)
{
  var i = 0;
  var onePageData = getPageData(PageCode);
  for(i=0;i<onePageData["field"].length;i++)
  {
    fm.all(onePageData.field[i]).style.backgroundColor = backgroundColor;
  }
  return true;
}



/**
  模式3:模式2中包含模式1的模式: 即每一页录入模式中包含多行录入的模式

注意：
    1. 命名规则参见模式1、模式2

    2. 模式1与模式2的事件处理通过把模式1、模式2中第一个域（一般为序号）作为
       关键字关联，模式1、模式2中第一个域为隐藏域，也可以显示出来，如删除一条页数据，
       则序号将不再是连续的

    3. 在上一条/下一条模式<tfoot>中增加保存区的名字为"span_" + RowCode，参见下面的例子

    4. 提交前,如果页数据与行数据保存在同一个表时,调用saveRowRecordToSingleTable(PageCode,RowCode);
       如果页数据与行数据保存在多个表时，调用saveRowRecordToMultiTable(PageCode,RowCode)

注意:
    a.怎么区分是否在同一个表中?
        如果你需要的数据是对页中的每一行都可以和页本身一起组成一条记录,则为单表.
            记录总数为  ∑(RowCount)      RowCount为每页中行的条数(如果没有则行的条数为1)

        如果你需要的数据是对页中的每一行可以单独组成一条记录,则为多表.
            记录总数为  页的数目+行的数目

    b.是否还需要调用上一条/下一条模式中的 saveRecord 方法?
        不需要，也不能加，应用本模式需要的是根据上问来确定的
            saveRowRecordToSingleTable 或  saveRowRecordToMultiTable方法


    allRowData存放所有页数据对应的行数据

模式3:加减模式

    <table id="<PageCode>">

      <tbody>
        一组数据(即实际展现给用户使用的一组tr)
      </tbody>
      <tbody>
        模式1
      </tbody>
      <tbody>
        <jsp:include page="/commonship/pub/UIMulLinePrevNextModeControl.jsp">
          <jsp:param name="PageCode" value="<PageCode>" />
        </jsp:include>
      </tbody>
    </table>

//  2004-09-27  zhouxianli
//  以下为原始注释,我认为有些问题,所以改成上面的方式.参\prpall\commonship\tbcbpg\UIPrPoEnInsuredEGroupInput.jsp
//  那是一个多表的例子,单表的例子为\prpall\DAA\lp\loss\UILDAAPersonInput.jsp
//
//    <table id="<RowCode>">
//      <thead>
//        中间显示标题
//      </thead>
//      <tfoot>
//        放入保存区id、加号
//        <tr>
//  			  <td>
//             <span id="span_<RowCode>"></span>
//          </td>
//          <td colspan="9">
//            <p align="right"><input onclick="insertRow<RowCode>();" type="button" value="+"></p>
//          </td>
//        </tr>
//      </tfoot>
//      <tbody>
//        空的，中间操纵多组数据区域
//      </tbody>
//    </table>

*/


//所有页数据对应的行数据信息
var allRowData    = new Array();  //公用，不能当作临时变量改变


//得到一页的所有对象
function getRowData(PageCode)
{

	return allRowData[PageCode];
}


//设置一页的所有对象
function setRowData(PageCode,RowDataArray)
{

	allRowData[PageCode] = RowDataArray;
}


//初始化域的名字
function iniRowRecord(RowCode_Data,RowCode)
{
  var i = 0;
  var elementIndex = 0;
  var elements;
  var rowData=new Array();
  rowData["field"] = new Array();

  //得到Input域的名字
  elements = document.all(RowCode_Data).tBodies.item(0).getElementsByTagName("input");

  for(i=0;i<elements.length;i++)
  {
    if(elements[i].type=="button") continue;
    rowData["field"][elementIndex] = elements[i].name;
    fm.all(rowData.field[elementIndex]).value                 = "";
    elementIndex++;
  }
  //得到Select域的名字
  elements = document.all(RowCode_Data).tBodies.item(0).getElementsByTagName("select");
  for(i=0;i<elements.length;i++)
  {
    rowData["field"][elementIndex] = elements[i].name;
    fm.all(rowData.field[elementIndex]).selectedIndex         = 0;
    elementIndex++;
  }
  //得到textarea域的名字
  elements = document.all(RowCode_Data).tBodies.item(0).getElementsByTagName("textarea");
  for(i=0;i<elements.length;i++)
  {
    rowData["field"][elementIndex] = elements[i].name;
    fm.all(rowData.field[elementIndex]).value                 = "";
    elementIndex++;
  }

  setRowData(RowCode,rowData);

}


//设置行关键字（序号）
function setRowRecordState(PageCode,RowCode)
{
  var onePageData = getPageData(PageCode);
  var rowData = getRowData(RowCode);

  for(var i=1;i<fm.all(rowData.field[0]).length;i++)
  {
    fm.all(rowData.field[0])[i].value = fm.all(onePageData.field[0]).value;
  }
}


//新增加时设置页关键字（序号）
//@param PageCode PageCode
//@param initValue 最小值
function setCurrentRecordSerialNo(PageCode,initValue)
{
  var onePageData = getPageData(PageCode);
  var MaxNo = 0;
  for(i=0;i<onePageData.currentIndex;i++)
  {
    if(MaxNo < parseInt(onePageData[i][onePageData.field[0]].value,10))
    {
      MaxNo = parseInt(onePageData[i][onePageData.field[0]].value,10);
    }
  }
  if(initValue==null){
    initValue = 0;
  }
  if(MaxNo<parseInt(initValue,10)){
    MaxNo = parseInt(initValue,10);
  }
  //取最大值加一
  fm.all(onePageData.field[0]).value = MaxNo+1;

}


//删除当前的所有行记录
function deleteRowRecord(RowCode,PageCode)
{

  var i = 0;
  var j = 0;
  var onePageRowData = new Array();

  var rowData = getRowData(RowCode);

  if(rowData.length<1){

    return;
  }
  onePageRowData.field = rowData.field;

  //默认为Insured (因为历史原因加入)
  if(PageCode==null){
    PageCode="Insured";
  }


  var onePageData  = getPageData(PageCode);
  var keyValue = fm.all(onePageData.field[0]).value; //页ID
  //从行数组中删除所有当前页对应的数据
  for(i=0;i<rowData.length;i++)
  {

    if(rowData[i][rowData.field[0]].value!=keyValue)
    {
     	onePageRowData[j] = rowData[i];
    	j++;
    }
  }

  setRowData(RowCode,onePageRowData);
}

//保存当前的所有行记录
function setCurrentRowRecord(RowCode,PageCode)
{


  //如果当前存在行数据，则在数组中删除所有当前关键字对应的数据，再插入
  deleteRowRecord(RowCode,PageCode);

  var i = 0;
  var j = 0;

  var rowData = getRowData(RowCode);

  j = rowData.length;

  //插入
  for(i=1;i<fm.all(rowData.field[0]).length;i++)
  {
  	var tempArray = new Array();
    rowData[j] = tempArray;

	  for(n=0;n<rowData["field"].length;n++)
	  {
			tempArray[rowData.field[n]] = newField(fm.all(rowData.field[n])[i].value,
			                                       fm.all(rowData.field[n])[i].title,
			                                       fm.all(rowData.field[n])[i].style.backgroundColor,
			                                       fm.all(rowData.field[n])[i].tag);
	  }
	  j++;
  }

  setRowData(RowCode,rowData);
}


//装载一个多行记录
function loadRowRecord(PageCode,RowCode,DataRowCode)
{
	deleteAllRows(RowCode);

	var j = 0;
	var index = 0;

	var onePageData  = getPageData(PageCode);
	var rowData      = getRowData(RowCode);

	//找出所有与关键字相对应的所有行，插入
	for(var i=0;i<rowData.length;i++)
  {
  	if(parseInt(trim(rowData[i][rowData.field[0]].value),10) == parseInt(fm.all(onePageData.field[0]).value,10))
  	{
  		insertRow(RowCode,DataRowCode);
  		index++;

  		for(j=0;j<rowData["field"].length;j++)
  		{
  		  fm.all(rowData.field[j])[index].value                 = rowData[i][rowData.field[j]].value;
  		  fm.all(rowData.field[j])[index].oldvalue              = rowData[i][rowData.field[j]].value;
  		  fm.all(rowData.field[j])[index].title                 = rowData[i][rowData.field[j]].title;
  		  fm.all(rowData.field[j])[index].style.backgroundColor = rowData[i][rowData.field[j]].backgroundColor;
  		  fm.all(rowData.field[j])[index].tag                   = rowData[i][rowData.field[j]].tag;
  		}
  	}
  }
}

//保存纪录进入span （数据保存在一个表时的存储函数）
function saveRowRecordToSingleTable(PageCode,RowCode)
{
  setCurrentRecord(PageCode);
  setCurrentRowRecord(RowCode,PageCode);
  //必须删除所有当前显示的行
  deleteAllRows(RowCode);

  clearRecord(PageCode);
  clearRowRecord(RowCode);

  var onePageData = getPageData(PageCode);
  var rowData     = getRowData(RowCode);
  var strText1 = "";
  var strText2 = "";
  var i = 0;
  var j = 0;
  var n = 0;
  var bFind = false;
  var serialNo = 0;

  //按页存储对应的行数据
  for(j=0;j<onePageData.length;j++)
  {
    bFind = false;

    //重新设置页序号
    serialNo++;

    for(i=0;i<rowData.length;i++)
    {
      if(rowData[i][rowData.field[0]].value == onePageData[j][onePageData.field[0]].value)
  	  {
  	    bFind = true;

  	    //存储行对应的页数据
  	  	for(n=0;n<onePageData["field"].length;n++)
		    {
          if(n==0)
          {
            strText1 = strText1 +
  		               "<input type=hidden name='" + onePageData.field[n] + "'" +
  		               " value='" + serialNo + "'>";
          }
          else
          {
  		      strText1 = strText1 +
  		                "<input type=hidden name='" + onePageData.field[n] + "'" +
  		                " value='" + onePageData[j][onePageData.field[n]].value+ "'>";
  		    }
		    }

    	  //存储页对应的行数据
        for(n=0;n<rowData["field"].length;n++)
        {
          if(n==0)
          {
            strText2 = strText2 +
  		               "<input type=hidden name='" + rowData.field[n] + "'" +
  		               " value='" + serialNo + "'>";
          }
          else
          {
            strText2 = strText2 +
                      "<input type=hidden name='" + rowData.field[n] + "'" +
                      " value='" + rowData[i][rowData.field[n]].value+ "'>";
          }
        }
      }
  	}

    //如果不存在对应的行数据，也保存，对应行数据为空
    if(bFind == false)
    {
	    //存储行对应的页数据
	  	for(n=0;n<onePageData["field"].length;n++)
	    {
        if(n==0)
        {
          strText1 = strText1 +
		               "<input type=hidden name='" + onePageData.field[n] + "'" +
		               " value='" + serialNo + "'>";
        }
        else
        {
		      strText1 = strText1 +
		                "<input type=hidden name='" + onePageData.field[n] + "'" +
		                " value='" + onePageData[j][onePageData.field[n]].value+ "'>";
		    }
	    }

  	  //存储页对应的行数据
      for(n=0;n<rowData["field"].length;n++)
      {
        if(n==0)
        {
          strText2 = strText2 +
		               "<input type=hidden name='" + rowData.field[n] + "'" +
		               " value='" + serialNo + "'>";
        }
        else
        {
          strText2 = strText2 +
                    "<input type=hidden name='" + rowData.field[n] + "'" +
                    " value=''>";
        }
      }
    }
  }

  eval("span_" + PageCode).innerHTML = strText1;
  eval("span_" + RowCode).innerHTML  = strText2;

  if(onePageData.length==0)
  {
    enableRecordInput(PageCode);
  }

  return true;
}


//保存纪录进入 （数据保存在多个表时的存储函数）
//不提供序号重排功能，因为可能会打乱其他引用的地方
function saveRowRecordToMultiTable(PageCode,RowCode)
{
  setCurrentRecord(PageCode);
  setCurrentRowRecord(RowCode,PageCode);
  //必须删除所有当前显示的行
  deleteAllRows(RowCode);

  clearRecord(PageCode);
  clearRowRecord(RowCode);

  var onePageData = getPageData(PageCode);
  var rowData     = getRowData(RowCode);
  var strText1 = "";
  var strText2 = "";
  var i = 0;
  var j = 0;
  var n = 0;
  var bFind = false;
  var serialNo = 0;
  var hasAdd = false;
  //按页存储对应的行数据
  for(j=0;j<onePageData.length;j++)
  {
    bFind = false;
    hasAdd = false;

    for(i=0;i<rowData.length;i++)
    {
      if(rowData[i][rowData.field[0]].value == onePageData[j][onePageData.field[0]].value)
  	  {
  	    bFind = true;
  	    if(hasAdd==false){
      	    //存储行对应的页数据,只保存一次
      	  	for(n=0;n<onePageData["field"].length;n++)
      	  	{
     		      strText1 = strText1 +
      		                "<input type=hidden name='" + onePageData.field[n] + "'" +
      		                " value='" + onePageData[j][onePageData.field[n]].value+ "'>";
    	    }
    	    hasAdd=true;
    	}

    	//存储页对应的行数据
        for(n=0;n<rowData["field"].length;n++)
        {
            strText2 = strText2 +
                      "<input type=hidden name='" + rowData.field[n] + "'" +
                      " value='" + rowData[i][rowData.field[n]].value+ "'>";
        }
      }
  	}

    //如果不存在对应的行数据，则保存页数据，不保存行数据
    if(bFind == false)
    {
	    //存储行对应的页数据
	  	for(n=0;n<onePageData["field"].length;n++)
	    {
		      strText1 = strText1 +
		                "<input type=hidden name='" + onePageData.field[n] + "'" +
		                " value='" + onePageData[j][onePageData.field[n]].value+ "'>";
	    }
    }
  }

  eval("span_" + PageCode).innerHTML = strText1;
  eval("span_" + RowCode).innerHTML  = strText2;

  if(onePageData.length==0)
  {
    enableRecordInput(PageCode);
  }

  return true;
}

//清除行记录所在的span的内容
function clearRowRecord(RowCode)
{
  eval("span_" + RowCode).innerHTML = "";
  return true;
}
