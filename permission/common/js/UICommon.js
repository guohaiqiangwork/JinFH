/****************************************************************************

 * DESC       ：公用函数变量定义

 * AUTHOR     ：zhouxianli

 * CREATEDATE ：2002-06-14

 * MODIFYLIST ：   Name       Date            Reason/Contents

 *          ------------------------------------------------------

 *           zhouxianli   2002-07-08       添加输入域的maxleng控制

 *           zhouxianli   2002-08-26       整理

 *           sunchenggang 2002-09-03       修改collectByCurrency脚本

 *           sunchenggang 2002-09-04       添加按币别、保额计算标志汇总脚本collectByCurrencyAndCalculateFlag

 *           zhouxianli   2002-09-05       添加方法,一次给所有的input域添加onchange方法，且保留原有onchange()

 *           sunchenggang 2002-09-06       添加按变化量汇总脚本showCollectChange

 *           zhouxianli   2002-09-09       add method numberFormat()

 *           zhouxianli   2002-09-10       add method setReadonlyOfAllInput(),undoSetReadonlyOfAllInput();

 *           sunchenggang 2002-09-11       add method calTimeSinglePremium()

 *                                         修改deleteRowForPG，当flag="D"时，恢复原值

 *           zhouxianli   2002-09-12       修改setOnchangeOfAllInput为setOnchangeOfTable(),一次给一个table的

 *                                         input域添加onchange方法，且保留原有onchange()

 *                                         修改setTitleOfAllInput();

 *           zhouxianli   2002-09-13       add method isEmpty(field)  return true/false.

 *           sunchenggang 2002-09-18       add method setBackColorOfTable()

 *           luxupan      2002-10-17       增加showSpan和hideSpan方法

 *                                             getTableFieldsName方法

 *                                             setFlagPG方法

 *           zhouxianli   2002-10-21       add method setTableDisabled(PageCode,Value)

 *                                         //为一页中所有的元素设置disabled,value = true or false

 *           zhouxianli   2002-10-22       add method functionReturnFalse() and functionReturnTrue()

 *           zhouxianli   2002-10-23       添加可发布函数列表

 *           zhouxianli   2002-10-24       优化getElementOrder() and getElementCount()

 *           zhouxianli   2002-11-08       修正checkDecimal不校验输入域的数字是否是decimal的问题

 *           zhouxianli   2002-11-11       修改checkDateTime,加入Year-Minute的方式

 *           zhouxianli   2002-11-14       添加函数setCheckBoxReadonly()，设置checkbox的Readonly

 *           zhouxianli   2002-11-14       添加函数pressCustom()，checkCustom()

 *           zhouxianli   2002-11-21       修改函数setOption,支持Select数组

 *           zhouxianli   2002-11-21       新增函数compareFullDate,//比较两个日期字符串

                                           date1=date2则返回0 , date1>date2则返回大于0的整数, date1<date2则返回小于0的整数

 *           zhouxianli   2002-11-22       新增函数setObjectDisplay，设置对象是否显示

 *           lijiyaun     2002-12-03       新增函数checkHour()效验输入小时是否合法

 *           renyiqun     2003-02-26       修改relate()函数

 *           xuxinyuan    2003-04-18       新增函数checkBetweenDate用来校验查询条件的日期

 *           xiaojian     2003-04-22       新增函数compareFullTime(date1,date2)比较两个日期（包括小时和分钟）字符串

 *           zhangying    2003-05-27       新增函数checkNull(field)判断输入域不为空，为空提示，但是不锁定焦点

 *           daironghui   2003-07-03       新增函数showCollectItemG

 *           daironghui   2003-07-09       新增函数showCollectItemSpe

 *           daironghui   2003-07-22       新增函数showText显示无格式保单

 *           sunchenggang 2003-08-31       修改showSpan、showSubPage，按800*600固定显示在屏幕中间位置

 *           xiaojian     2003-09-01       修改getMonthRate()，增加ZFG的月短期费率数组

 *           sunchenggang 2004-03-14       修改showText，改为满屏显示

 ************************************************************************************/



/************************************************************************************

  函数组        函数名称                函数作用

  系统函数

                functionReturnFalse     返回false

                functionReturnTrue      返回true

                functionDoNothing       空函数,什么也不做

                setObjectDisplay        设置对象是否显示

                getElementIndex         查找元素在Form(fm)中的顺序，没有则返回-1

                getElementCount         查找在Form中的同名元素，没有则返回0

                getElementOrder         得到元素在Form中的同名元素中的顺序,从1开始计数

                errorMessage            弹出错误信息

                cancelForm              默认的取消按钮处理方法，即重定向到一个空白文件



  日期处理函数

                getNextDateFullDate     得到下n天

                getNextMonthFullDate    得到下n月

                getNextYearFullDate     得到下n年

                convertFullDateToString 得到日期的字符串表达形式，传入参数为Date类型,如果不传，则默认为当天



  数据判断函数

                isDate                  检查数据是否是日期,是返回true,否则返回false

                isInteger               检查数据是否是整数,即只包含字符0123456789,是返回true,否则返回false

                isNumeric               检查数据是否是数字,是返回true,否则返回false



  输入域校验函数

                checkDatetime           如果输入域不为空，校验输入域的值是否为Datetime型,如果不是则弹出提示且无法离开

                checkDecimal            如果输入域不为空，校验输入域的值是否为在输入许可范围内的Decimal型,如果不是则弹出提示且无法离开

                checkFullDate           如果输入域不为空，校验输入域的值是否为FullDate(即年月日的Date)型,如果不是则弹出提示且无法离开

                checkInteger            如果输入域不为空，校验输入域的值是否为Integer型,如果不是则弹出提示且无法离开

                checkSmallint           如果输入域不为空，校验输入域的值是否为Smallint型,如果不是则弹出提示且无法离开

                checkLength             如果输入域不为空，校验输入域的值是否为不大于最大长度的字符型,如果不是则弹出提示且无法离开

                checkCustom             如果输入域不为空，校验输入域的值是否为指定格式的值,如果不是则弹出提示且无法离开

                checkNull               判断输入域不为空，为空提示，但是不锁定焦点



  字符串处理函数

                leftTrim                返回输入字符串去除左侧开始的空格后的字符串

                rightTri                返回输入字符串去除右侧开始的空格后的字符串

                trim                    返回输入字符串去除左右两侧开始的空格后的字符串

                replace                 返回输入字符串全部替换后的结果

                newString               将给定字符串复制ｎ遍并返回



  输入域按键函数

                pressDatetime           输入域只可输入Datetime型数据

                pressDecimal            输入域只可输入Decimal型数据

                pressFullDate           输入域只可输入FullDate型数据

                pressHour               输入域只可输入Hour数据

                pressInteger            输入域只可输入Integer型数据

                pressCustom             输入域只可输入指定的数据，用规则表达式表示 如pressCustom(event,/[\d]/) 只让输入数字



  数字处理函数

                point                   按传入的精度对数值格式化

                pointTwo                对数值按0.00格式化

                pointFour               对数值按0.0000格式化

                round                   按传入的精度对数值四舍五入

                numberFormat            对数字格式化(实现千分位显示等)，delimiterChar默认为"," precision默认为3

                retExpTest              执行正则函数功能



  其他

                getTableFieldsName      得到table里第一个tbody里的所有输入域的名称

                setOnchangeOfElement

                setOnchangeOfTable        一次给所有的input域添加onchange方法，且保留原有onchange()，不适用于多行的上一条/下一条模式

                setOnchangeOfTableSpecial 一次给所有的input域添加onchange方法，且保留原有onchange()，用于多行的上一条/下一条模式

                setOption                 分割代码并放在select域里，串的格式: 值FIELD_SEPARATOR文本GROUP_SEPARATOR值FIELD_SEPARATOR文本...

                setReadonlyOfAllInput     一次给所有的text,textarea设置为readonly,select-one变成只保留当前选项，过程部分可逆

                setTitleOfAllInput        一次给所有的element用value设置title

                setCheckBoxReadonly       将CheckBox设置为只读或可读写





  应用函数



                showCollectItem         显示汇总主险

                showCollectItemApd      显示汇总附加险

                showCollectCurrency     显示按币别汇总

                showCollectChange       显示按变化量汇总

                showCollectItemC        显示船险汇总主险

                showCollectItemY        显示货险汇总主险

                showCollectItemApdC     显示船险汇总附加险





  ######### 未完待续



/************************************************************************************/





//定义常数

var FIELD_SEPARATOR = "_FIELD_SEPARATOR_";   //字段之间的分割符

var GROUP_SEPARATOR = "_GROUP_SEPARATOR_";     //一组代码之间的分割符

var DATE_DELIMITER="-";       //日期分隔符

var BGCOLORU="#FFFF00";        //修改(颜色)

var BGCOLORI="#00F0F0";       //添加(颜色)

var BGCOLORD="#778899";       //删除(颜色)



var MAX_SMALLINT = Math.pow(2,15) - 1;

var MIN_SMALLINT = -MAX_SMALLINT;



var MAX_INTEGER  = Math.pow(2,31) - 1;

var MIN_INTEGER  = -MAX_INTEGER;

var MIN_HOUR     = 0;

var MAX_HOUR     = 24;



//var DATEVALUEDELIMITER=":";       //日期分隔符

//var NAMEVALUEDELIMITER=":";       //域名与域值的分隔符

//var SBCCASECOLON="：";

//var FIELDDELIMITER="|";       //域之间的分隔符

//var SBCCASEVERTICAL="｜";

//var RECORDDELIMITER="^";      //记录之间的分隔符

//var CODE_DELIMITER = "-";    //代码和名称之间的显示分隔符





function functionReturnFalse()

{

  return false;

}



function functionReturnTrue()

{

  return true;

}



function functionCancelFocus()

{

  errorMessage("只读输入域不能选择！");

  this.blur();

  window.focus();

  return false;

}





//empty function

function functionDoNothing()

{

  //do nothing

}



function getFunctionName(FunctionDesc)

{

  var start = 0;

  var end = 0;

  var tempValue = FunctionDesc;

  tempValue = tempValue.toString();

  start = tempValue.indexOf("{") + 2;

  end = tempValue.lastIndexOf("}");

  tempValue = tempValue.substr(start,end-start);

  tempValue = replace(tempValue,"return","");

  tempValue = replace(tempValue,";",",");

  tempValue = trim(tempValue);

  if(tempValue.charAt(tempValue.length-1)==",")

  {

    tempValue = tempValue.substring(0,tempValue.length-1) + ";";

  }

  return tempValue;

}



//RegExt Test

function regExpTest(source,re)

{

  var result = false;



  if(source==null || source=="")

    return false;



  if(source==re.exec(source))

    result = true;



  return result;

}



//设置对象是否显示

function setObjectDisplay(ID,flag)

{

  var obj = document.all(ID);

  var intCount = 0;

  var i = 0;

  if(obj==null)

  {

    errorMessage("setObjectDisplay('" + ID + "','" + flag + "')的第一个参数不正确");

    return;

  }

  intCount = obj.length;

  //单个

  if(intCount==null)

  {

    if(flag==true)

      obj.style.display = "";

    else

      obj.style.display = "none";

  }

  else //多个

  {

    for(i=0;i<intCount;i++)

    {

      if(flag==true)

        obj[i].style.display = "";

      else

        obj[i].style.display = "none";

    }

  }

}

//查找元素在Form中的顺序，没有则返回-1

function getElementIndex(field)

{

  var intElementIndex = -1;



  for(var i=0;i<fm.elements.length;i++) //查找fm里的元素

  {

    if(fm.elements[i]==field)

    {

      intElementIndex=i;

      break;

    }

  }

  return intElementIndex;

}





//查找在Form中的同名元素，没有则返回0, frm默认为当前页面的fm

function getElementCount(strFieldName,frm)

{

  var intCount = 0;

  var frmForm = (frm==null?document.fm:frm);



  try

  {

    intCount = eval( frmForm.all(strFieldName).length );

    if(isNaN(intCount)) intCount = 1;

  }

  catch(E)

  {

    intCount = 0;

  }



  //select输入域的特殊处理

  if(intCount>1 && frmForm.all(strFieldName)[0].tagName=="OPTION")

  {

    intCount = 1;

  }



  return intCount;

}



//得到元素在Form中的同名元素中的顺序,frm默认为当前页面的fm

function getElementOrder(field,frm)

{

  var intOrder = 0;

  var intCount = getElementCount(field.name,frm);

  var frmForm = (frm==null?document.fm:frm);



  if(intCount>1)

  {

    for(var i=0;i<intCount;i++)

    {

      if(frmForm.all(field.name)[i].name==field.name)

      {

        intOrder++;

      }

      if(frmForm.all(field.name)[i]==field)

      {

        break;

      }

    }

  }

  else

  {

    intOrder = 1;

  }

  return intOrder;

}



//对输入域是否是日期的校验，splitChar参数缺省为"-"

function isDate(date,splitChar)

{

  var charSplit = (splitChar==null?"-":splitChar);

  var strValue = date.split(charSplit);



  if(strValue.length!=3) return false;

  if(!isInteger(strValue[0]) || !isInteger(strValue[1]) || !isInteger(strValue[2]) ) return false;



  var intYear  = parseInt(strValue[0],10);

  var intMonth = parseInt(strValue[1],10)-1;

  var intDay   = parseInt(strValue[2],10);



  var dt = new Date(intYear,intMonth,intDay);

  if( dt.getFullYear() != intYear ||

      dt.getMonth() != intMonth ||

      dt.getDate() != intDay

     )

  {

    return false;

  }

  return true;

}



function isDateII(date,splitChar)

{

  var charSplit = (splitChar==null?"-":splitChar);

  var strValue = date.split(charSplit);



  if(strValue.length!=3) return false;

  if(!isInteger(strValue[0]) || !isInteger(strValue[1]) || !isInteger(strValue[2]) ) return false;

  if(strValue[0].length!=4 || strValue[1].length!=2 || strValue[2].length!=2) return false;

  var intYear  = parseInt(strValue[0],10);

  var intMonth = parseInt(strValue[1],10)-1;

  var intDay   = parseInt(strValue[2],10);



  var dt = new Date(intYear,intMonth,intDay);

  if( dt.getFullYear() != intYear ||

      dt.getMonth() != intMonth ||

      dt.getDate() != intDay

     )

  {

    return false;

  }

  return true;

}



//检查日期输入域

function checkFullDate(field)

{

  if(isEmpty(field))

    return true;

    

  field.value = trim(field.value);

  var strValue = field.value;

  var desc   = field.description;

  //如果description属性不存在，则用name属性

  if(desc==null)

    desc = field.name;

  if(strValue=="")

  {

    return false;

  }



  if(isNumeric(strValue ))

  {

    if(strValue.length>6)

    {

      strValue = strValue.substring(0,4) + DATE_DELIMITER + strValue.substring(4,6) + DATE_DELIMITER + strValue.substring(6);

      field.value = strValue;

    }

  }

  if( !isDateII(strValue,DATE_DELIMITER) && !isDateII(strValue))

  {

    errorMessage("请输入合法的" + desc +"\n类型为日期，格式为YYYYMMDD  或者YYYY-MM-DD");

    field.value="";

    field.focus();

    field.select();

    return false;

  }



  return true;

}



//检查日期输入域,和checkFullDate的区别是允许输入两个日期,之间以":" 分割,

//例如 20030523:20040312,

//例如 2003/03/04:2004/09/12

function checkBetweenDate(field)

{

  if(isEmpty(field))

    return true;

      

  field.value = trim(field.value);

  var strValue = field.value;

  var desc   = field.description;

  //如果description属性不存在，则用name属性

  if(desc==null)

    desc = field.name;

  if(strValue=="")

  {

    return false;

  }



  //不采用直接返回

  var index = strValue.indexOf(":");

  if (index < 0)

  {

    if(isNumeric(strValue ))

    {

      if(strValue.length>6)

      {

        strValue = strValue.substring(0,4) + DATE_DELIMITER + strValue.substring(4,6) + DATE_DELIMITER + strValue.substring(6);

        field.value = strValue;

      }



      if(!isDate(strValue,DATE_DELIMITER) && !isDate(strValue))

      {

       errorMessage("请输入合法的" + desc +"\n类型为日期，格式为YYYY/MM/DD 或者YYYYMMDD");

       field.value="";

       field.focus();

       field.select();

       return false;

      }

    }

    return true;

  }



  var beginDate = strValue.substring(0,index);

  var endDate  = strValue.substring(index + 1);



  if(isNumeric(beginDate ))

  {

    beginDate = beginDate.substring(0,4) + DATE_DELIMITER + beginDate.substring(4,6) + DATE_DELIMITER + beginDate.substring(6);

  }

  if(isNumeric(endDate ))

  {

    endDate = endDate.substring(0,4) + DATE_DELIMITER + endDate.substring(4,6) + DATE_DELIMITER + endDate.substring(6);

  }



  if(!isDate(beginDate,DATE_DELIMITER))

  {

    errorMessage("输入的日期为非法日期,请重新输入");

    field.focus();

    field.select();

    return false;

  }

  if(!isDate(endDate,DATE_DELIMITER))

  {

    errorMessage("输入的日期为非法日期,请重新输入");

    field.focus();

    field.select();

    return false;

  }

   field.value = beginDate + ":" + endDate;

   return true;

}





//得到下n天

function getNextDateFullDate(strDate,intCount)

{

  var tempDate = new Date(strDate);

  if(intCount == null)

  {

    intCount =1;

  }



  var nextDateInMS = tempDate.getTime() + (intCount * 24 * 60 * 60 * 1000 );

  var strReturn = convertFullDateToString(new Date(nextDateInMS));

  return strReturn;

}





//得到下n个月

function getNextMonthFullDate(strDate,intCount)

{

  var tempDate = new Date(strDate);

  if(intCount == null)

  {

    intCount =1;

  }



  tempDate.setMonth(tempDate.getMonth() + intCount );

  var strReturn = convertFullDateToString(tempDate);

  return strReturn;

}





//得到下n个年

function getNextYearFullDate(strDate,intCount)

{

  var tempDate = new Date(strDate);

  if(intCount == null)

  {

    intCount =1;

  }



  tempDate.setFullYear(tempDate.getFullYear() + intCount );

  var strReturn = convertFullDateToString(tempDate);

  return strReturn;

}





//得到日期的字符串表达形式，传入参数为Date类型

//如果不传，则默认为当天

function convertFullDateToString(date)

{

  if(date==null)

  {

    date = new Date();

  }



  var strDate = "";

  strDate = date.getFullYear() + DATE_DELIMITER +

            (date.getMonth() + 1) + DATE_DELIMITER +

            date.getDate();

  return strDate;

}



//比较两个日期字符串

// date1=date2则返回0 , date1>date2则返回1 , date1<date2则返回-1

function compareFullDate(date1,date2)

{

  var strValue1=date1.split(DATE_DELIMITER);

  var date1Temp=new Date(strValue1[0],parseInt(strValue1[1],10)-1,parseInt(strValue1[2],10));



  var strValue2=date2.split(DATE_DELIMITER);

  var date2Temp=new Date(strValue2[0],parseInt(strValue2[1],10)-1,parseInt(strValue2[2],10));



  if(date1Temp.getTime()==date2Temp.getTime())

    return 0;

  else if(date1Temp.getTime()>date2Temp.getTime())

    return 1;

  else

    return -1;

}





//比较两个日期（包括小时和分钟）字符串

// date1=date2则返回0 , date1>date2则返回1 , date1<date2则返回-1

function compareFullTime(date1,date2)

{

  date1=replace(date1," ","-");

  date1=replace(date1,":","-");

  date2=replace(date2," ","-");

  date2=replace(date2,":","-");



  var strValue1=date1.split(DATE_DELIMITER);

  var date1Temp=new Date(strValue1[0],parseInt(strValue1[1],10)-1,parseInt(strValue1[2],10),parseInt(strValue1[3],10),parseInt(strValue1[4],10));



  var strValue2=date2.split(DATE_DELIMITER);

  var date2Temp=new Date(strValue2[0],parseInt(strValue2[1],10)-1,parseInt(strValue2[2],10),parseInt(strValue2[3],10),parseInt(strValue2[4],10));



  if(date1Temp.getTime()==date2Temp.getTime())

    return 0;

  else if(date1Temp.getTime()>date2Temp.getTime())

    return 1;

  else

    return -1;

}





//去掉字符串头空格

function leftTrim(strValue)

{

  var re =/^\s*/;

  if(strValue==null)

    return null;



 strValue= "" + strValue;

  var strReturn = strValue.replace(re,"");



  return strReturn;

}



//去掉字符串尾空格

function rightTrim(strValue)

{

  var re =/\s*$/;

  if(strValue==null)

    return null;



  var strReturn = strValue.replace(re,"");



  return strReturn;

}



//去掉字符串头尾空格

function trim(s)

{

  var strReturn;

  strReturn = leftTrim(s);

  strReturn = rightTrim(strReturn);



  return strReturn;

}



//对输入域是否是整数的校验,即只包含字符0123456789

function isInteger(strValue)

{

  var result = regExpTest(strValue,/\d+/g);

  return result;

}



//对输入域是否是数字的校验

function isNumeric(strValue)

{

  var result = regExpTest(strValue,/\d*[.]?\d*/g);

  return result;

}





//离开域时的数字校验

function checkInteger(field,MinValue,MaxValue)

{

  if(isEmpty(field))

    return true;

    

  field.value = trim(field.value);

  var strValue=field.value;

  if(strValue=="")

    strValue = "0";

  var desc   = field.description;

  //如果description属性不存在，则用name属性

  if(desc==null)

    desc = field.name;



  if(!isInteger(strValue))

  {

    errorMessage("请输入合法的数字");

    field.focus();

    field.select();

    return false;

  }



  MinValue = parseInt(MinValue);

  if(isNaN(MinValue))

    MinValue = MIN_INTEGER;



  MaxValue = parseInt(MaxValue);

  if(isNaN(MaxValue))

    MaxValue = MAX_INTEGER;

  var value = parseInt(strValue);

  if(isNaN(value) || value>MaxValue || value<MinValue)

  {

    errorMessage("请输入合法的" + desc +"\n类型为数字(integer),最小值为" + MinValue + ",最大值为" +MaxValue);

    field.focus();

    field.select();

    return false;

  }

  return true;

}



//离开域时的数字校验

function checkSmallint(field,MinValue,MaxValue)

{

  if(isEmpty(field))

    return true;

      

  field.value = trim(field.value);

  var strValue=field.value;

  if(strValue=="")

    strValue = "0";

  var desc   = field.description;

  //如果description属性不存在，则用name属性

  if(desc==null)

    desc = field.name;



  if(!isInteger(strValue))

  {

    errorMessage("请输入合法的数字");

    field.focus();

    field.select();

    return false;

  }



  MinValue = parseInt(MinValue);

  if(isNaN(MinValue))

    MinValue = MIN_SMALLINT;



  MaxValue = parseInt(MaxValue);

  if(isNaN(MaxValue))

    MaxValue = MAX_SMALLINT;



  var value = parseInt(strValue);

  if(isNaN(value) || value>MaxValue || value<MinValue)

  {

    errorMessage("请输入合法的" + desc +"\n类型为数字(smallint),最小值为" + MinValue + ",最大值为" +MaxValue);

    field.focus();

    field.select();

    return false;

  }

  return true;

}





//离开域时的数字校验Decimal

function checkDecimal(field,p,s,MinValue,MaxValue)

{

  if(isEmpty(field))

    return true;

      

  field.value = trim(field.value);

  var strValue=formatNumberToString(field.value);

  if(strValue=="")

    strValue = "0";



  var desc   = field.description;

  //如果description属性不存在，则用name属性

  if(desc==null)

    desc = field.name;



  if(!isNumeric(strValue))

  {

    errorMessage("请输入合法的数字");

    field.focus();

    field.select();

    return false;

  }

  p = parseInt(p);

  s = parseInt(s);



  var pLength;

  var sLength;

  var position = strValue.indexOf(".");

  if(position>-1)

  {

    pLength = position;

    sLength = strValue.length - position - 1;

  }

  else

  {

    pLength = strValue.length;

    sLength = 0;

  }



  if(pLength>(p-s) || sLength>s)

  {

    errorMessage("请输入合法的" + desc +"\n类型为数字,整数位最长为" + (p-s) + ",小数位最长为" + s);

    field.focus();

    field.select();

    return false;

  }



  var value = parseFloat(strValue);

  if(MaxValue!=null && MinValue!=null && trim(MaxValue)!="" && trim(MinValue)!="")

  {

    MinValue = parseFloat(MinValue);

    MaxValue = parseFloat(MaxValue);

    if(isNaN(value) || value>MaxValue || value<MinValue)

    {

      errorMessage("请输入合法的" + desc +"\n类型为数字,最小值为" + MinValue + ",最大值为" +MaxValue);

      field.focus();

      field.select();

      return false;

    }

  }

  if (s != 0)

  {

      field.value=formatNum(value);

  }

  return true;

}



//离开域时的数字校验Decimal

function checkDecimal2(field,p,s,MinValue,MaxValue)

{

  if(isEmpty(field))

    return true;

      

  field.value = trim(field.value);

  var strValue=formatNumberToString(field.value);

  if(strValue=="")

    strValue = "0";

  if(strValue.length>0 && strValue.charAt(0)=="-")

    strValue = strValue.substring(1);



  var desc   = field.description;

  //如果description属性不存在，则用name属性

  if(desc==null)

    desc = field.name;



  if(!isNumeric(strValue))

  {

    errorMessage("请输入合法的数字");

    field.focus();

    field.select();

    return false;

  }

  p = parseInt(p);

  s = parseInt(s);



  var pLength;

  var sLength;

  var position = strValue.indexOf(".");

  if(position>-1)

  {

    pLength = position;

    sLength = strValue.length - position - 1;

  }

  else

  {

    pLength = strValue.length;

    sLength = 0;

  }



  if(pLength>(p-s) || sLength>s)

  {

    errorMessage("请输入合法的" + desc +"\n类型为数字,整数位最长为" + (p-s) + ",小数位最长为" + s);

    field.focus();

    field.select();

    return false;

  }



  var value = parseFloat(strValue);

  if(MaxValue!=null && MinValue!=null && trim(MaxValue)!="" && trim(MinValue)!="")

  {

    MinValue = parseFloat(MinValue);

    MaxValue = parseFloat(MaxValue);

    if(isNaN(value) || value>MaxValue || value<MinValue)

    {

      errorMessage("请输入合法的" + desc +"\n类型为数字,最小值为" + MinValue + ",最大值为" +MaxValue);

      field.focus();

      field.select();

      return false;

    }

  }

  field.value=formatNum(value);

  return true;

}



//对输入域的校验,reg为规则表达式

function checkCustom(field,reg,typeDesc)

{

  if(isEmpty(field))

    return true;

    

  var strValue = field.value;

  var desc   = field.description;

  //如果description属性不存在，则用name属性

  if(desc==null)

    desc = field.name;

  if(typeDesc==null)

    typeDesc = reg;



  if(strValue=="")

  {

    return true;

  }



  var r=reg.test(strValue);



  if (r==false)

  {

    errorMessage("请输入合法的" + desc +"\n数据类型为" +typeDesc + "\n格式为" + reg);

    field.focus();

    field.select();

    return false;

  }



  return r;

}



//离开域时的数字校验Datetime

function checkDatetime(field,from,to)

{

  if(isEmpty(field))

    return true;

      

  field.value = trim(field.value);

  field.value = replace(field.value,"/","-");

  var strValue=field.value;

  var desc   = field.description;

  //如果description属性不存在，则用name属性

  if(desc==null)

    desc = field.name;



  if(strValue=="")

  {

    return true;

  }

  from = from.toLowerCase();

  to = to.toLowerCase();



  if(from=="year" && to=="month")

  {

    if(isNumeric(field.value))

    {

      if(strValue.length>4)

      {

        strValue = strValue.substring(0,4) + "-" + strValue.substring(4);

        field.value = strValue;

      }

    }



    if(regExpTest(strValue,/[\d]{4}[-][\d]{1,2}/)==false)

    {

      errorMessage("请输入合法的" + desc +"\n类型为日期时间，格式为YYYY-MM 或者YYYYMM");

      field.focus();

      field.select();

      return false;

    }



    var month = parseInt(replace(strValue.substring(strValue.indexOf("-")+1),"0",""));

    if(!(month>=1 && month<=12))

    {

      errorMessage("请输入合法的月份数！月份数应该为大于等于1小于等于12的整数！");

      field.focus();

      field.select();

      return false;

    }

  }

  else if(from=="year" && to=="minute")

  {



    if(isNumeric(field.value))

    {

      if(strValue.length==12)

      {

        strValue = strValue.substring(0,4) + "-" + strValue.substring(4,6) + "-" + strValue.substring(6,8) + " " + strValue.substring(8,10) + ":" + strValue.substring(10,12);

        field.value = strValue;

      }

    }



    if(regExpTest(strValue,/[\d]{4}[-][\d]{1,2}[-][\d]{1,2} [\d]{1,2}:[\d]{1,2}/)==false)

    {

      errorMessage("请输入合法的" + desc +"\n类型为日期时间，格式为YYYY-MM-DD hh:mm 或者YYYYMMDDhhmm");

      field.focus();

      field.select();

      return false;

    }



    var pos = strValue.indexOf(" ");

    var tempDate = strValue.substring(0,pos);

    strValue = strValue.substring(pos+1);

    if(!isDate(tempDate,"-"))

    {

      errorMessage("请输入合法的日期！");

      field.focus();

      field.select();

      return false;

    }

    pos = strValue.indexOf(":");

    var hour = parseInt(strValue.substring(0,pos));

    var minute = parseInt(strValue.substring(pos+1));

    if(!(hour>=0 && hour<=24))

    {

      errorMessage("请输入合法的小时数！小时数应该为大于等于0小于等于24的整数！");

      field.focus();

      field.select();

      return false;

    }

    if(!(minute>=0 && minute<=59))

    {

      errorMessage("请输入合法的分钟数！分钟数应该为大于等于0小于等于59的整数！");

      field.focus();

      field.select();

      return false;

    }

  }

  else

  {

    errorMessage("Not support now!");

    return false;

  }

  return true;

}





//检查空

function hasValue(field)

{

  if(field.value=="")

    return false;

  else

    return true;

}



//对输入域按键时的校验,reg为规则表达式

function pressCustom(e,reg)

{

  var value = String.fromCharCode(e.keyCode);

  var r=reg.test(value);

  return r;

}



//对输入域按键时的整数校验

function pressInteger(e)

{

  var value = String.fromCharCode(e.keyCode);

  if(value>=0 && value<=9)

    return true;

  else

    return false;

}



//对输入域按键时的小时校验

function pressHour(e)

{

  return pressInteger(e);

}





//对输入域按键时的数字校验

function pressDecimal(e)

{

  var value = String.fromCharCode(e.keyCode);

  if((value>=0 && value<=9) || value==".")

    return true;

  else

    return false;

}

//对输入域按键时的数字校验

function pressDecimal2(e)

{

  var value = String.fromCharCode(e.keyCode);

  if((value>=0 && value<=9) || value=="." || value=="-")

    return true;

  else

    return false;

}



//对输入域按键时的日期校验

function pressFullDate(e)

{

  var value = String.fromCharCode(e.keyCode);

  if((value>=0 && value<=9) || value=="/" || value=="-")

    return true;

  else

    return false;

}



//对输入域按键时的Datetime校验

function pressDatetime(e)

{

  var value = String.fromCharCode(e.keyCode);

  if((value>=0 && value<=9) || value=="/" || value=="-" || value==":" || value==" ")

    return true;

  else

    return false;

}





//打开一个窗口

function openWindow(strURL,strName)

{

  var newWindow = window.open(strURL,strName,'width=640,height=480,top=0,left=0,toolbar=0,location=0,directories=0,menubar=0,scrollbars=1,resizable=1,status=0');

  newWindow.focus();

  return newWindow;

}



//打开一个小窗口

function openSmallWindow(strURL,strName)

{

  var newWindow = window.open(strURL,strName,'width=350,height=220,top=200,left=200,toolbar=0,location=0,directories=0,menubar=0,scrollbars=1,resizable=1,status=0');

  newWindow.focus();

  return newWindow;

}

//分割代码并放在select域里

//串的格式: 值FIELD_SEPARATOR文本GROUP_SEPARATOR值FIELD_SEPARATOR文本...

function setOption(selectName,strValue)

{

  //查不到代码返回

  if(strValue==null || trim(strValue)=="")

  {

    return;

  }



  var arrayField=strValue.split(GROUP_SEPARATOR);

  var i=0;

  var j=0;

  var intCount = getElementCount(selectName);



  if(intCount>1)

  {

    for(j=0;j<intCount;j++)

    {

      fm.all(selectName)[j].options.length = 0;

    }

  }

  else

  {

    fm.all(selectName).options.length = 0;

  }



  while(i<arrayField.length)

  {

    if(intCount>1)

    {

      for(j=0;j<intCount;j++)

      {

        var option=document.createElement("option");

        var arrayTemp=arrayField[i].split(FIELD_SEPARATOR);

        var strFieldName=arrayTemp[0];

        var strFieldValue=unescape(arrayTemp[1]);

        option.value=strFieldName;

        option.text=strFieldValue;



        fm.all(selectName)[j].add(option);

      }

    }

    else

    {

        var option=document.createElement("option");

        var arrayTemp=arrayField[i].split(FIELD_SEPARATOR);

        var strFieldName=arrayTemp[0];

        var strFieldValue=unescape(arrayTemp[1]);

        option.value=strFieldName;

        option.text=strFieldValue;

      fm.all(selectName).add(option);

    }

    i++;

  }

}



/* 大写输入域 --onkeypress时调用该方法 */

function uppercaseKey()

{

  var keycode = window.event.keyCode;

  if( keycode>=97 && keycode<=122 )

  {

    window.event.keyCode = keycode-32;

  }

}



function setFormAllDisabled()

{

  var i = 0;

  for(i=0;i<fm.elements.length;i++)

  {

    fm.elements[i].disabled=true;

  }

}



function setFormAllEnabled()

{

  var i = 0;

  for(i=0;i<fm.elements.length;i++)

  {

    fm.elements[i].disabled=false;

  }

}



//为一页中所有的元素设置disabled

//value = true or false

function setTableDisabled(PageCode,Value)

{

  var i = 0;

  var j = 0;

  var elements;

  //得到Input域的名字

  for(i=0;i<document.all(PageCode).tBodies.length;i++)

  {

    elements = document.all(PageCode).tBodies.item(i).getElementsByTagName("input");

    for(j=0;j<elements.length;j++)

    {

      elements[j].disabled=Value;

    }

    //得到Select域的名字

    elements = document.all(PageCode).tBodies.item(i).getElementsByTagName("select");

    for(j=0;j<elements.length;j++)

    {

      elements[j].disabled=Value;

    }

    //得到textarea域的名字

    elements = document.all(PageCode).tBodies.item(i).getElementsByTagName("textarea");

    for(j=0;j<elements.length;j++)

    {

      elements[j].disabled=Value;

    }

  }

}



//设置背景色

function setBackColor(field,bcolor)

{

  field.style.backgroundColor = bcolor;

}





//比较保单与批单值设置背景色(用在批单查询中)

function setBackColorOfTable(TableID)

{

  var i = 0;

  //得到Input域的名字

  elements = document.all(TableID).tBodies.item(0).getElementsByTagName("input");

  for(i=0;i<elements.length;i++)

  {

    if(elements[i].type!="text") continue;

    if(elements[i].value!=elements[i].title)

    {

      setBackColor(elements[i],BGCOLORU);

    }

  }



  //得到Select域的名字

  elements = document.all(TableID).tBodies.item(0).getElementsByTagName("select");

  for(i=0;i<elements.length;i++)

  {

    if(elements[i].value!=elements[i].title)

    {

      setBackColor(elements[i],BGCOLORU);

    }

  }



  //得到textarea域的名字

  elements = document.all(TableID).tBodies.item(0).getElementsByTagName("textarea");

  for(i=0;i<elements.length;i++)

  {

    if(elements[i].value!=elements[i].title)

    {

      setBackColor(elements[i],BGCOLORU);

    }

  }



}





/**

 * 将给定字符串复制ｎ遍

 * @param intLength 字符串长度

 * @return 字符串

 */

function newString(iString, iTimes)

{

  var str = "";

  for (var i = 0 ; i < iTimes; i++)

     str = str + iString;

  return str;

}





//对数字四舍五入

//数值,精度

function round(number,precision)

{

  if(isNaN(number))

    number = 0;

  var prec = Math.pow(10,precision);

  var result = Math.round( number * prec) ;

  result = result/prec;

  return result;

}





//对数字进行格式化,保证precision位

function point(number,precision)

{

  if(isNaN(number))

    number = 0;

  var result = number.toString();

  if(result.indexOf(".")==-1)

    result = result + ".";



  result = result + newString("0",precision);

  result = result.substring(0,precision + result.indexOf(".") + 1);

  return result;

}



//对数字第三位四舍五入

function mathRound(number)

{

  return round(number,2);

}



//对数字按0.00格式化

function pointTwo( s )

{

  return point(s,2);

}



//对数字按0.0000 格式化

function pointFour( s )

{

  return point(s,4);

}



//对数字格式化，delimiterChar默认为"," precision默认为3

function numberFormat(ivalue,delimiterChar,precision)

{

  if((ivalue==null) || (ivalue==""))

    return "";



  if(delimiterChar==null || delimiterChar=="")

    delimiterChar = ",";



  if(precision==null || precision =="")

    precision = 3;



  var i = 0;

  var ovalue = "";

  var times;



  var avalue = "";

  if(ivalue.indexOf(".")>-1)

  {

    avalue = "." + ivalue.substring(ivalue.indexOf(".")+1);

    ivalue = ivalue.substring(0,ivalue.indexOf("."));

  }



  times = ivalue.length % precision;

  if(times!=0)

  {

    ovalue = ivalue.substring(0,times);

    ivalue = ivalue.substring(times);

  }



  for(i=0;i<ivalue.length;i++)

  {

    if(i%precision==0)

    {

      ovalue += delimiterChar;

    }

    ovalue += ivalue.substring(i,i+1)

  }



  if(ovalue.substring(0,1) == delimiterChar)

    ovalue = ovalue.substring(1);



  if ((ovalue.substring(0,1) == '-') &&

      (ovalue.substring(1,2) == delimiterChar))

    ovalue = '-'+ ovalue.substring(2);





  return ovalue + avalue;

}





/**

 * 格式化数字

 * @param value 值

 * @param count 分割位数 默认为3

 * @param precision 小数点保留位数 默认为2

 * @param delimiterChar 分割符 默认为','

 */

function formatFloat(value,count,precision,delimiterChar)

{

  count = count==null?3:count;

  precision = precision==null?2:precision;

  delimiterChar = delimiterChar==null?",":delimiterChar;





  var strReturn = ""; //返回值

  var strValue = point(round(value,precision),precision); //格式化成指定小数位数



  strReturn = strValue.substring(strValue.length-precision-1);

  strValue = strValue.substring(0,strValue.length-precision-1);

  while(strValue.length>count)

  {

    strReturn = delimiterChar + strValue.substring(strValue.length-count) + strReturn;

    strValue = strValue.substring(0,strValue.length-count);

  }



  strReturn = strValue + strReturn;

  return strReturn;

}





//显示打印窗口

function printWindow(strURL,strWindowName)

{

  var pageWidth=screen.availWidth-10;

  var pageHeight=screen.availHeight-30;

  if (pageWidth<100 )

    pageWidth = 100;



  if (pageHeight<100 )

    pageHeight = 100;



  var newWindow = window.open(strURL,strWindowName,'width='+pageWidth+',height='+pageHeight+',top=0,left=0,toolbar=0,location=0,directories=0,menubar=0,scrollbars=1.resizable=1,status=0');

  newWindow.focus();

  return newWindow;

}





//对图片的显示、隐藏

function showImg(imgID,stl)

{

  document.all(imgID).style.display = stl;

}



//控制输入域长度

// 使用方法如下所示

// <input name = "PolicyNo" maxlength="8" description="保单号"  onblur="checkLength(this)">

function checkLength(field)

{

  var str;

  var count  = 0;

  var value  = field.value;

  var length = field.maxLength;

  var desc   = field.description;

  //如果description属性不存在，则用name属性

  if(desc==null)

    desc = field.name;



  if(value=="")

  {

    return true;

  }



  if(value.indexOf("^")>-1 ||

     value.indexOf(FIELD_SEPARATOR)>-1 ||

     value.indexOf(GROUP_SEPARATOR)>-1

    )

  {

    errorMessage("^为系统保留字符，不允许输入！");

    field.focus();

    field.select();

    return false;

  }







  //如果maxlength属性不存在，则返回

  if(isNaN(parseInt(length)))

    return true;



  for(var i=0;i<value.length;i++)

  {

    str = escape(value.charAt(i));

    if(str.substring(0,2)=="%u" && str.length==6)

      count = count + 2;

    else

      count = count + 1;

  }



  if(count>length)

  {

    errorMessage(desc + "输入的内容超长！\n" + desc + "的最大长度为" + length + "个英文字符！\n请重新输入！");

    field.focus();

    field.select();

    return false;

  }

  return true;

}



//截字符串，从0到最大长度为maxLength的byte

function subHeadString(context,maxLength)

{

  var i = 0;

  var count = 0;

  var realLen = 0;

  var str;



  for(i=0;i<context.length;i++)

  {

    str = escape(context.charAt(i));



    if( str.substring(0,2)=="%u" && str.length==6 ) //2 bytes

      count = count + 2;

    else

      count = count + 1;



    if( count>maxLength ) break;

    realLen++;

  }



  return context.substring(0,realLen);

}





//控制输入域不能为空

// 使用方法如下所示

// <input name = "PolicyNo" maxlength="8" description="保单号"  onblur="checkNull(this)">

function checkNull(field)

{

  if(!hasValue(field))

  {

    errorMessage("不能为空");

    return false;

  }

}



//替换字符串函数

function replace(strExpression,strFind,strReplaceWith)

{

  var strReturn;

  var re = new RegExp(strFind,"g");

  if(strExpression==null)

    return null;



  strReturn = strExpression.replace(re,strReplaceWith);

  return strReturn;

}





//计算两个日期的差,返回差的月数(M)或天数(D)

//2003/3/17 改为(其中天数包含2.29这一天)

function dateDiff(dateStart,dateEnd,MD)

{

  var i;

  if(MD=="D") //按天计算差

  {

    var endTm   = dateEnd.getTime();

    var startTm = dateStart.getTime();

    var diffDay = (endTm - startTm)/86400000 + 1;



    return diffDay;

  }

  else //按月计算差

  {

    var endD   = dateEnd.getDate();

    var endM   = dateEnd.getMonth();

    var endY   = dateEnd.getFullYear();

    var startD = dateStart.getDate();

    var startM = dateStart.getMonth();

    var startY = dateStart.getFullYear();



    if(endD>startD) //跟终端版fcalc_month函数统一，endD>startD时才加1

    {

      return (endY-startY)*12 + (endM-startM) + 1;

    }

    else

    {

      return (endY-startY)*12 + (endM-startM);

    }

  }

}





//计算两个日期的差,返回差的月数(M)或天数(D) (其中天数是实际天数，包含2.29这一天)

function dateRealDiff(dateStart,dateEnd,MD)

{

  var i;

  if(MD=="D") //按天计算差

  {

    var endTm   = dateEnd.getTime();

    var startTm = dateStart.getTime();

    var diffDay = (endTm - startTm)/86400000 + 1;

    return diffDay;

  }

  else //按月计算差

  {

    var endD   = dateEnd.getDate();

    var endM   = dateEnd.getMonth();

    var endY   = dateEnd.getFullYear();

    var startD = dateStart.getDate();

    var startM = dateStart.getMonth();

    var startY = dateStart.getFullYear();



    if(endD>startD)

    {

      return (endY-startY)*12 + (endM-startM) + 1;

    }

    else

    {

      return (endY-startY)*12 + (endM-startM);

    }

  }

}





function isEmpty(field)

{

  if(field.value==null || trim(field.value)=="")

  {

    return true;

  }



  return false;

}



//

//  业务相关Javascript

//



//public

//一次给所有的element用value设置title

function setTitleOfAllInput()

{

  for(var i=0;i<fm.elements.length;i++)

  {

    if(fm.elements[i].type=="checkbox" || fm.elements[i].type=="radio")

      fm.elements[i].title = fm.elements[i].checked;

    else

      fm.elements[i].title = fm.elements[i].value;

  }

}





//public

function setOnchangeOfElement(element)

{

  element.onchange=mainOnchange;

}



//public

//一次给所有的input域添加onchange方法，且保留原有onchange()

//用于多行的上一条/下一条模式

function setOnchangeOfTableSpecial(TableID)

{

  var i = 0;

  //得到Input域的名字

  elements = document.all(TableID).tBodies.item(0).getElementsByTagName("input");

  for(i=0;i<elements.length;i++)

  {

    if(elements[i].onchange!=null)

    {

      elements[i].oldOnchange = getFunctionName(elements[i].onchange.toString());

    }

    elements[i].tableID=TableID;

    elements[i].onchange=mainOnchangeSpecial;

  }

  //得到Select域的名字

  elements = document.all(TableID).tBodies.item(0).getElementsByTagName("select");

  for(i=0;i<elements.length;i++)

  {

    if(elements[i].onchange!=null)

    {

      elements[i].oldOnchange = getFunctionName(elements[i].onchange.toString());

    }

    elements[i].tableID=TableID;

    elements[i].onchange=mainOnchangeSpecial;

  }

  //得到textarea域的名字

  elements = document.all(TableID).tBodies.item(0).getElementsByTagName("textarea");

  for(i=0;i<elements.length;i++)

  {

    if(elements[i].onchange!=null)

    {

      elements[i].oldOnchange = getFunctionName(elements[i].onchange.toString());

    }

    elements[i].tableID=TableID;

    elements[i].onchange=mainOnchangeSpecial;

  }

}



//pirvate

function mainOnchangeSpecial()

{

  if(fm.all(this.tableID + "_Flag").value==null ||

    (fm.all(this.tableID + "_Flag").value == "")||

    (fm.all(this.tableID + "_Flag").value == "U"))

  {

    mainOnchangeChangeColor(this);

  }

  if(this.oldOnchange!=null)

  {

    return eval(this.oldOnchange.toString());

  }

}



function setOnchangeOfTable(TableID)

{

  var i = 0;

  //得到Input域的名字

  elements = document.all(TableID).tBodies.item(0).getElementsByTagName("input");

  for(i=0;i<elements.length;i++)

  {

    if(elements[i].onchange!=null)

    {

      elements[i].oldOnchange = getFunctionName(elements[i].onchange.toString());

    }

    elements[i].onchange=mainOnchange;

  }

  //得到Select域的名字

  elements = document.all(TableID).tBodies.item(0).getElementsByTagName("select");

  for(i=0;i<elements.length;i++)

  {

    if(elements[i].onchange!=null)

    {

      elements[i].oldOnchange = getFunctionName(elements[i].onchange.toString());

    }

    elements[i].onchange=mainOnchange;

  }

  //得到textarea域的名字

  elements = document.all(TableID).tBodies.item(0).getElementsByTagName("textarea");

  for(i=0;i<elements.length;i++)

  {

    if(elements[i].onchange!=null)

    {

      elements[i].oldOnchange = getFunctionName(elements[i].onchange.toString());

    }

    elements[i].onchange=mainOnchange;

  }

}



//private



function mainOnchangeChangeColor(field)

{

  if(field.style.backgroundColor.toUpperCase()!=BGCOLORI && field.style.backgroundColor.toUpperCase()!=BGCOLORD)

  {

    if(field.type=="select-one")

    {

      var i = 0;

      for(i=0;i<field.options.length;i++)

      {

        if(field.options[i].value==field.title)

          setBackColor(field.options[i],"");

        else

          setBackColor(field.options[i],BGCOLORU);

      }

    }

    else if(field.type=="checkbox")

    {

      if(trim(""+field.checked)!=trim(""+field.title))

        setBackColor(field,BGCOLORU);

      else

        setBackColor(field,"");

    }

    else if(field.type=="radio")

    {

      var i = 0;

      var obj;

      for(i=0;i<getElementCount(field.name);i++)

      {

        obj = eval("fm." + field.name + "[" + i + "]");

        if(trim(""+obj.checked)!=trim(""+obj.title))

          setBackColor(obj,BGCOLORU);

        else

          setBackColor(obj,"");

      }

    }

    else

    {

      if(field.value!=field.title )

        setBackColor(field,BGCOLORU);

      else

        setBackColor(field,"");

    }

  }

}

//pirvate

function mainOnchange()

{

  mainOnchangeChangeColor(this);

  if(this.oldOnchange!=null)

  {

    return eval(this.oldOnchange.toString());

  }

}



//main onblur

function mainOnblur()

{

  if(this.oldOnblur!=null)

  {

//    alert(this.oldOnblur.toString());

    return eval(this.oldOnblur.toString());

  }

}



//main ondblclick

function mainOndblclick()

{

  if(this.oldOndblclick!=null)

  {

    return eval(this.oldOndblclick.toString());

  }

}



//main onfocus

function mainOnfocus()

{

  if(this.oldOnfocus!=null)

  {

    return eval(this.oldOnfocus.toString());

  }

}



//public

function setCheckBoxReadonly(field,flag)

{

  if(flag==null)

  {

    errorMessage("函数setCheckBoxReadonly使用错误，Flag应该为True/Flase!");

    return;

  }



  if(flag==true)

  {

    if(field.setCheckBoxReadonlyFlag!=true)

    {

      field.setCheckBoxReadonlyFlag = true;

      field.oldClassName = field.className;

      field.oldOnclick   = field.onclick;

      field.className = "readonlycheckbox";

      field.onclick = functionReturnFalse;

    }

  }

  else

  {

    if(field.setCheckBoxReadonlyFlag==true)

    {

      field.className = field.oldClassName;

      field.onclick = field.oldOnclick;

      field.setCheckBoxReadonlyFlag = false;

    }

  }

}



//public

function setRadioReadonly(field,flag)

{

  if(flag==null)

  {

    errorMessage("函数setRadioReadonly使用错误，Flag应该为True/Flase!");

    return;

  }

  if(flag==true)

  {

    if(field.setRadioReadonlyFlag!=true)

    {

      field.setRadioReadonlyFlag = true;

      field.oldClassName = field.className;

      field.oldOnfocus   = field.onfocus;

      field.className = "readonlyradio";

      field.onfocus = functionCancelFocus;

    }

  }

  else

  {

    if(field.setRadioReadonlyFlag==true)

    {

      field.className = field.oldClassName;

      field.onfocus = field.oldOnfocus;

      field.setRadioReadonlyFlag = false;

    }

  }

}





//public

function setReadonlyOfElement(iElement)

{

  if(iElement.type=="select-one")

  {

    if(iElement.setReadonlyFlag==true)

    {

      return;

    }

    else

    {

      iElement.setReadonlyFlag = true;

    }



    var optionTags = new Array();

    var index = 0;

    for(var j=iElement.options.length-1;j>=0;j--)

    {

      var tag = new Array();

      tag["value"] = iElement.options[j].value;

      tag["text"]  = iElement.options[j].text;

      optionTags[index++] = tag;

      if(iElement.options[j].value!=iElement.value)

      {

        iElement.remove(j);

      }

    }

    iElement.optionTags = optionTags;

  }

  else if ((iElement.type=="hidden") ||

            (iElement.type=="password") ||

            (iElement.type=="text") ||

            (iElement.type=="textarea"))

  {

    if(iElement.setReadonlyFlag==true)

    {

      return;

    }

    else

    {

      iElement.setReadonlyFlag = true;

    }



    //事件存储在oldXXX里

    iElement.oldOnblur = iElement.onblur;

    iElement.onblur = functionDoNothing;



    iElement.oldOndblclick = iElement.ondblclick;

    iElement.ondblclick = functionDoNothing;



    iElement.oldOnfocus = iElement.onfocus;

    iElement.onfocus = functionDoNothing;



    iElement.oldClassName = iElement.className;

    iElement.readOnly = true;

    iElement.className = "readonlyOnly";





    if(iElement.style.width=="")

    {

      switch (iElement.oldClassName)

      {

         case "codecode" :

             iElement.style.width="40px";

             break;

         case "common" :

             iElement.style.width="160px";

             break;

         case "readonly" :

             iElement.style.width="160px";

             break;

         default :

      }

    }



  }

  else if(iElement.type=="button")

  {

    if(iElement.setReadonlyFlag==true)

    {

      return;

    }

    else

    {

      iElement.setReadonlyFlag = true;

    }



    if(iElement.name.indexOf("Delete")>-1 || iElement.name.indexOf("Insert")>-1)

    {

      iElement.disabled = true;

    }

  }

  else if(iElement.type=="checkbox")

  {

    setCheckBoxReadonly(iElement,true);

  }

  else if(iElement.type=="radio")

  {

    setRadioReadonly(iElement,true);

  }

}



//将容器里的元素设置为只读或可读写

function setContainerReadonly(Container,Flag)

{

  var i = 0;

  var vFlag = (Flag==null?true:Flag);

  var elements;



  //Input域

  elements = Container.getElementsByTagName("input");

  for(i=0;i<elements.length;i++)

  {

    if(vFlag)

      setReadonlyOfElement(elements[i]);

    else

      undoSetReadonlyOfElement(elements[i]);

  }



  //Select域

  elements = Container.getElementsByTagName("select");

  for(i=0;i<elements.length;i++)

  {

    if(vFlag)

      setReadonlyOfElement(elements[i]);

    else

      undoSetReadonlyOfElement(elements[i]);

  }





  //Textarea域

  elements = Container.getElementsByTagName("textarea");

  for(i=0;i<elements.length;i++)

  {

    if(vFlag)

      setReadonlyOfElement(elements[i]);

    else

      undoSetReadonlyOfElement(elements[i]);

  }



}



//public

//一次给所有的text,textarea设置为readonly,select-one变成只保留当前选项

//过程部分可逆

function setReadonlyOfAllInput()

{

  for(var i=0;i<fm.elements.length;i++)

  {

    setReadonlyOfElement(fm.elements[i]);

  }

}



//public

//过程部分可逆,select-one所有附加事件被取消 --OK了

function undoSetReadonlyOfElement(iElement)

{

  if(iElement.type=="select-one")

  {

    if(iElement.setReadonlyFlag!=true)

    {

      return;

    }

    else

    {

      iElement.setReadonlyFlag = false;

    }



    var optionTags = iElement.optionTags;

    var currentValue = iElement.value;



    for(var i=iElement.options.length-1;i>=0;i--)

    {

      iElement.remove(i);

    }



    for(var i=optionTags.length-1;i>=0;i--)

    {

      var tag = optionTags[i];

      var op = document.createElement("OPTION");

      op.value = tag.value;

      op.text =  tag.text;

      iElement.add(op);

    }

    iElement.value = currentValue;



  }

  else if ((iElement.type=="hidden") ||

            (iElement.type=="password") ||

            (iElement.type=="text") ||

            (iElement.type=="textarea"))

  {

    if(iElement.setReadonlyFlag!=true)

    {

      return;

    }

    else

    {

      iElement.setReadonlyFlag = false;

    }



    iElement.onblur = iElement.oldOnblur;

    iElement.ondblclick = iElement.oldOndblclick;

    iElement.onfocus = iElement.oldOnfocus;



    iElement.readOnly = false;

    iElement.className = iElement.oldClassName;

  }

  else if(iElement.type=="button")

  {

    if(iElement.setReadonlyFlag!=true)

    {

      return;

    }

    else

    {

      iElement.setReadonlyFlag = false;

    }



    if(iElement.name.indexOf("Delete")>-1 || iElement.name.indexOf("Insert")>-1)

    {

      iElement.disabled = false;

    }

  }

  else if(iElement.type=="checkbox")

  {

    setCheckBoxReadonly(iElement,false);

  }

  else if(iElement.type=="radio")

  {

    setRadioReadonly(iElement,false);

  }



}

//一次给所有的text,textarea的readonly设置为false,select-one恢复初始设置

function undoSetReadonlyOfAllInput()

{

  for(var i=0;i<fm.elements.length;i++)

  {

    undoSetReadonlyOfElement(fm.elements[i]);

  }

}



//加减模式的添加一行所需Script(Only for PG)

function insertRowForPG(PageCode,DataPageCode)

{

  insertRow(PageCode,DataPageCode);

  var index = getRowsCount(PageCode);

  setRowColor(DataPageCode,index,BGCOLORI);

  try

  {

    fm.all(PageCode + "_Flag")[index].value="I";

  }

  catch(e)

  {

    errorMessage(PageCode + "_Flag 字段不存在");

  }

}





//加减模式的删除一行所需Script(Only for PG)

function deleteRowForPG(PageCode,DataPageCode,field,intPageDataKeyCount,intRowCount)

{



  var index = getElementOrder(field)-intPageDataKeyCount;

  var flag = "";

  try

  {

    flag = fm.all(PageCode + "_Flag")[index].value;

  }

  catch(e)

  {

    errorMessage(PageCode + "_Flag 字段不存在");

    return false;

  }



  if(flag=="I")

  {

    deleteRow(PageCode,field,intPageDataKeyCount,intRowCount);

  }

  else if(flag=="D")

  {

    setRowColor(DataPageCode,index,"");



    var pageFieldsName = getPageFieldsName(PageCode,DataPageCode);



    for(var i=0;i<pageFieldsName.length;i++)

    {

      if(fm.all(pageFieldsName[i])[index].type=="text" || fm.all(pageFieldsName[i])[index].type=="textarea" || fm.all(pageFieldsName[i])[index].type=="password")

      {

        //恢复原值

        fm.all(pageFieldsName[i])[index].value=fm.all(pageFieldsName[i])[index].title;



      }

    }

    fm.all(PageCode + "_Flag")[index].value="";



  }

  else

  {

    fm.all(PageCode + "_Flag")[index].value="D";

    setRowColor(DataPageCode,index,BGCOLORD);

  }

}





//更换图片

function changeImage(image,gif)

{

  image.src='/piccshipweb/common/images/'+gif;

}





//取消

function cancelForm()

{

  window.location="/piccshipweb/common/pub/UIBlank.html";

}





//显示错误信息

function errorMessage(strErrMsg)

{

  var strMsg = "系统信息:\n\n" + strErrMsg;

  alert(strMsg);

}



//显示输入框

//leftMove 默认值0，坐标左移leftMove

function showSubPage(field,spanID,leftMove)

{

  var intLeftMove = (leftMove==null?0:leftMove);

  

  var intIndex = parseInt(getElementOrder(field)) - 1;

  var span = eval(spanID );

  var strTemp = span.id;

  var strCompare = "Context"; //比较字符串，条款的最后几个字符是Context



  if(strTemp.indexOf(strCompare)>-1)

  {

    strTemp = strTemp.substring(strTemp.length - strCompare.length);

  }

  else

  {

    strTemp = "";

  }



  //按800*600固定显示在屏幕中间位置

  var ex=10+document.body.scrollLeft;  //得到事件的坐标x

  var ey=120+document.body.scrollTop;   //得到事件的坐标y

  span.style.left=ex;

  span.style.top=ey;

  span.style.display ='';

}



//显示输入框,在span的缺省位置显示

function showSubPageAtDefaultPosition(field,spanID)

{

  var intIndex = parseInt(getElementOrder(field)) - 1;

  var span = eval(spanID + "(" + intIndex + ")");

  span.style.display ='';

}



//隐藏输入框

function hideSubPage(field,spanID)

{

  var intIndex = parseInt(getElementOrder(field)) - 1;

  var span = eval(spanID);

  span.style.display ='none';

}



//显示span

//leftMove: span向左移动的像素,默认值为0

function showSpan(spanID,leftMove)

{

  var intLeftMove = (leftMove==null?0:leftMove);

//  var ex=window.event.clientX+document.body.scrollLeft;  //得到事件的坐标x

//  var ey=window.event.clientY+document.body.scrollTop;   //得到事件的坐标y

//  ex = ex - intLeftMove;



  //按800*600固定显示在屏幕中间位置

  var ex=70+document.body.scrollLeft;  //得到事件的坐标x

  var ey=210+document.body.scrollTop;   //得到事件的坐标y



  document.all(spanID).style.left = ex;

  document.all(spanID).style.top  = ey;

  document.all(spanID).style.display = '';

}



//隐藏span

function hideSpan(spanID)

{

  document.all(spanID).style.display = 'none';

}



//得到table里第一个tbody里的所有输入域的名称

function getTableFieldsName(tableId)

{

  var fields = new Array();

  var i;

  var elements;

  var index = 0;



  //得到Input域的名字

  elements = document.all(tableId).tBodies.item(0).getElementsByTagName("input");

  for(i=0;i<elements.length;i++)

  {

    fields[index] = elements[i].name;

    index++;

  }

  //得到Select域的名字

  elements = document.all(tableId).tBodies.item(0).getElementsByTagName("select");

  for(i=0;i<elements.length;i++)

  {

    fields[index] = elements[i].name;

    index++;

  }

  //得到textarea域的名字

  elements = document.all(tableId).tBodies.item(0).getElementsByTagName("textarea");

  for(i=0;i<elements.length;i++)

  {

    fields[index] = elements[i].name;

    index++;

  }



  return fields;

}

//设置Flag输入域的值

//mode: 1, 单记录的表格

//      2, 加减模式的多记录表格

//      3, 上下条模式的多记录表格

function setFlagPG(tableId,mode)

{

  var i,j;

  var fields;

  //单记录的表格

  if(mode==1)

  {

    fm.all(tableId+'_Flag').value = '';

    fields = getTableFieldsName(tableId);

    for(i=0;i<fields.length;i++)

    {

      if(getElementCount(fields[i])>1) //输入域多于一个

      {

        if( fm.all(fields[i])[0].type=="radio" || fm.all(fields[i])[0].type=="checkbox" )

        {

          for(j=0;j<getElementCount(fields[i]);j++)

          {

            if(fm.all(fields[i])[j].style.display!='none' &&  //域处于显示状态

               new Boolean(fm.all(fields[i])[j].checked).toString()!=fm.all(fields[i])[j].title  //新旧状态不一样

              )

            {

              fm.all(tableId+'_Flag').value = 'U';

              break;

            }//end if

          }//end for

        }

        else

        {

          errorMessage(tableId+"表格中存在多个"+fields[i]+"输入域！");

        }//end if

      }

      else //输入只有一个

      {

        if( fm.all(fields[i]).type=="radio" || fm.all(fields[i]).type=="checkbox" )

        {

          if(fm.all(fields[i]).style.display!='none' &&  //域处于显示状态

             new Boolean(fm.all(fields[i]).checked).toString()!=fm.all(fields[i]).title  //新旧状态不一样

            )

          {

            fm.all(tableId+'_Flag').value = 'U';

            break;

          }//end if

        }

        else

        {

          if(fm.all(fields[i]).type!='button' &&         //非按钮

             fm.all(fields[i]).type!='hidden' &&         //非隐藏域

             fm.all(fields[i]).style.display!='none' &&  //域处于显示状态

             fm.all(fields[i]).readOnly!=true &&         //非只读域

             fm.all(fields[i]).value!=fm.all(fields[i]).title  //新旧值不一样

            )

          {

            fm.all(tableId+'_Flag').value = 'U';

            break;

          }//end if

        }//end if

      }//end if

    }//end for

  }

  //加减模式的多记录表格

  else if(mode==2)

  {

    fields = getTableFieldsName(tableId+'_Data');

    var len = document.all(tableId).tBodies.item(0).rows.length;

    for(i=1;i<=len;i++)

    {

      if(fm.all(tableId+'_Flag')[i].value!='' &&

         fm.all(tableId+'_Flag')[i].value!='U'

        )

      {

        continue;

      }



      fm.all(tableId+'_Flag')[i].value = '';

      for(j=0;j<fields.length;j++)

      {

        if(fm.all(fields[j])[i].type=='checkbox' ) //checkbox输入域

        {

          if(fm.all(fields[j])[i].style.display!='none' &&  //域处于显示状态

             new Boolean(fm.all(fields[j])[i].checked).toString()!=fm.all(fields[j])[i].title  //新旧状态不一样

            )

          {

            fm.all(tableId+'_Flag')[i].value = 'U';

            break;

          }

        }

        else if( fm.all(fields[j])[i].type!='button' &&         //非按钮

                 fm.all(fields[j])[i].type!='hidden' &&         //非隐藏域

                 fm.all(fields[j])[i].style.display!='none' &&  //域处于显示状态

//                 fm.all(fields[j])[i].readOnly!=true &&         //非只读域

                 fm.all(fields[j])[i].value!=fm.all(fields[j])[i].title  //新旧值不一样

          )

        {

          fm.all(tableId+'_Flag')[i].value = 'U';

          break;

        }//end if

      }//end for

    }//end for

  }

  //上下条模式的多记录表格

  else if(mode==3)

  {

    var onePageData = getPageData(tableId);

    fields = onePageData.field;

    for(i=0;i<onePageData.length;i++)

    {

      var onePageRowData = onePageData[i];



      if(onePageRowData[tableId+'_Flag'].value!='' &&

         onePageRowData[tableId+'_Flag'].value!='U'

        )

      {

        continue;

      }



      onePageRowData[tableId+'_Flag'].value = '';

      for(j=0;j<fields.length;j++)

      {

        if(fm.all(fields[j]).type!='button' &&         //非按钮

           fm.all(fields[j]).type!='hidden' &&         //非隐藏域

           fm.all(fields[j]).style.display!='none' &&  //域处于显示状态

           fm.all(fields[j]).readOnly!=true &&         //非只读域

           onePageRowData[fields[j]].value!=onePageRowData[fields[j]].title  //新旧值不一样

          )

        {

          onePageRowData[tableId+'_Flag'].value = 'U';

          if(onePageData.currentIndex==i)

            fm.all(tableId+'_Flag').value = 'U';

          break;

        }

      }

    }

  }



}





//查看审批意见

function visitHandelText(vCaseidNo)

{

  var newWindow = window.open("/pages/VisitHandleText.jsp?CaseidNo="+vCaseidNo,"vistText","width=600,height=200,top=150,left=100,toolbar=0,location=0,directories=0,menubar=0,scrollbars=1,resizable=1,status=0");

  newWindow.focus();

  return newWindow;

}







//显示汇总主险

function showCollectItem()

{

  var newWindow = window.open("/piccshipweb/common/pub/UIItemCollect.html","new","width=400,height=220,top=200,left=200,scrollbars=yes");

  newWindow.focus();

  return newWindow;

}



//显示0801,0802汇总主险

function showCollectItemG()

{

  var newWindow = window.open("/piccshipweb/common/pub/UIItemGCollect.html","new","width=400,height=220,top=200,left=200,scrollbars=yes");

  newWindow.focus();

  return newWindow;

}



//显示船险汇总主险

function showCollectItemC()

{

  var newWindow = window.open("/piccshipweb/common/pub/UIItemCCollect.html","new","width=400,height=220,top=200,left=200,scrollbars=yes");

  newWindow.focus();

  return newWindow;

}



//显示货险汇总主险

function showCollectItemY()

{

  var newWindow = window.open("/piccshipweb/common/pub/UIItemYCollect.html","new","width=400,height=220,top=200,left=200,scrollbars=yes");

  newWindow.focus();

  return newWindow;

}





//显示意外险汇总主险

function showCollectItemE()

{

  var newWindow = window.open("/piccshipweb/common/pub/UIItemECollect.html","new","width=400,height=220,top=200,left=200,scrollbars=yes");

  newWindow.focus();

  return newWindow;

} 



//显示意外险汇总附加

function showFJCollectItemE()

{ 



  var newWindow = window.open("/piccshipweb/common/pub/UIItemECollectFJ.html","new","width=400,height=220,top=200,left=200,scrollbars=yes");

  newWindow.focus();

  return newWindow;

} 



//显示汇总附加险

function showCollectItemApd()

{

  var newWindow = window.open("/piccshipweb/common/pub/UIItemApdCollect.html","new","width=400,height=220,top=200,left=200,scrollbars=yes");

  newWindow.focus();

  return newWindow;

}





//显示船险汇总附加险

function showCollectItemApdC()

{

  var newWindow = window.open("/piccshipweb/common/pub/UIItemApdCollectC.html","new","width=400,height=220,top=200,left=200,scrollbars=yes");

  newWindow.focus();

  return newWindow;

}



//显示汇总收费条款

function showCollectItemSpe()

{

  var newWindow = window.open("/piccshipweb/common/pub/UIItemSpeCollect.html","new","width=400,height=220,top=200,left=200,scrollbars=yes");

  newWindow.focus();

  return newWindow;

}



//显示按币别汇总

function showCollectCurrency()

{

  var newWindow = window.open("/piccshipweb/common/pub/UICurrencyCollect.html","new","width=400,height=220,top=200,left=200,scrollbars=yes");

  newWindow.focus();

  return newWindow;

}





//显示按变化量汇总

function showCollectChange()

{

  var newWindow = window.open("/piccshipweb/common/pub/UIChangeCollect.html","new","width=400,height=220,top=200,left=200,scrollbars=yes");

  newWindow.focus();

  return newWindow;

}





//对span的显示、隐藏

function showPage(img,spanID)

{

  if(spanID.style.display=="")

  {

    //关闭

    spanID.style.display="none";

    img.src="/reins/images/butCollapse.gif";

  }

  else

  {

    //打开

    spanID.style.display="";

    img.src="/reins/images/butExpand.gif";

  }

}

function showPage0301(img,spanID,table)

{

  var intCount =0;

  var i =0;

  if(spanID.style.display=="")

  {

    //关闭

    spanID.style.display="none";

    img.src="/piccshipweb/common/images/butCollapse.gif";

  }

  else

  {

    //打开

    spanID.style.display="";

    if (fm.PolicyType.value!="02" && fm.PolicyType.value!="04")

    {

      if (table=="Main")

      {

        tdFamilyNoMainTitle.innerHTML="";

        tdFamilyNameMainTitle.innerHTML="";

        intCount = getRowsCount("ItemKindMain");

        if (intCount==0)

        {

          fm.FamilyNoMain.style.display="none";

          fm.FamilyNameMain.style.display="none";

        }

        else

        {

          for (i=1; i<=intCount; i++)

          {

            fm.all("FamilyNoMain")[i].style.display="none";

            fm.all("FamilyNameMain")[i].style.display="none";

          }

        }

      }

      else

      {

        tdFamilyNoSubTitle.innerHTML="";

        tdFamilyNameSubTitle.innerHTML="";

        intCount = getRowsCount("ItemKindSub");

        if (intCount==0)

        {

          fm.FamilyNoSub.style.display="none";

          fm.FamilyNameSub.style.display="none";

        }

        else

        {

          for (i=1; i<=intCount; i++)

          {

            fm.all("FamilyNoSub")[i].style.display="none";

            fm.all("FamilyNameSub")[i].style.display="none";

          }

        }

      }

    }

    else

    {

      if (table=="Main")

      {

        intCount = getRowsCount("ItemKindMain");

        if (intCount==0)

        {

          fm.FamilyNoMain.style.display="";

          fm.FamilyNameMain.style.display="";

        }

        else

        {

          for (i=1; i<=intCount; i++)

          {

            fm.all("FamilyNoMain")[i].style.display="";

            fm.all("FamilyNameMain")[i].style.display="";

          }

        }

        tdFamilyNoMainTitle.innerHTML="分户序号";

        tdFamilyNameMainTitle.innerHTML="分户名称";

        tdFamilyNoMainTitle.style.width='5%';

        tdFamilyNameMainTitle.style.width='7%';

        tdItemDetailMainTitle.style.width='8.17%';

        tdAddressNoMainTitle.style.width='5.20%';

        tdUnitAmountMainTitle.style.width='8.17%';

        tdQuantityMainTitle.style.width='8.18%';

      }

      else

      {

        intCount = getRowsCount("ItemKindSub");

        if (intCount==0)

        {

          fm.FamilyNoSub.style.display="";

          fm.FamilyNameSub.style.display="";

        }

        else

        {

          for (i=1; i<=intCount; i++)

          {

            fm.all("FamilyNoSub")[i].style.display="";

            fm.all("FamilyNameSub")[i].style.display="";

          }

        }

        tdFamilyNoSubTitle.innerHTML="分户序号";

        tdFamilyNameSubTitle.innerHTML="分户名称";

        tdFamilyNoSubTitle.style.width='5%';

        tdFamilyNameSubTitle.style.width='7%';

        tdKindNameSubTitle.style.width='10.17%';

        tdUnitAmountSubTitle.style.width='8.17%';

        tdQuantitySubTitle.style.width='8.18%';

      }

    }

    img.src="/piccshipweb/common/images/butExpand.gif";

  }

}

//对span的显示only

function showPageOnly(img,spanID)

{

  //打开

  spanID.style.display="";

  img.src="/piccshipweb/common/images/butExpand.gif";

}





//保额，保费按币别汇总，

//传入参数：包含币别，保额，保费的原始数组(Currency,Amount,Premium)

//返回值：按币别汇总的币别，保额，保费的数组

function collectByCurrency(arrayFee)

{

  var arrayReturn = new Array();

  var i = 0;

  var j = 0;

  for(i=0;i<arrayFee.length;i++)

  {

    for(j=i+1;j<arrayFee.length;j++)

    {

      if(trim(arrayFee[j].Currency)==trim(arrayFee[i].Currency))

      {

        arrayFee[i].Amount  = parseFloat(arrayFee[i].Amount) + parseFloat(arrayFee[j].Amount);

        arrayFee[j].Amount  = 0;

        arrayFee[i].Premium = parseFloat(arrayFee[i].Premium) + parseFloat(arrayFee[j].Premium);

        arrayFee[j].Premium = 0;

      }

    }

  }



  j=0;

  for(i=0;i<arrayFee.length;i++)

  {

    if(arrayFee[i].Amount == 0 && arrayFee[i].Premium == 0)

    {

      continue;

    }

    arrayReturn[j] = arrayFee[i];

    j++;

  }



  return arrayReturn;

}





//保额，保费按币别、保额计算标志汇总，

//传入参数：包含币别，保额，保费的原始数组(Currency,Amount,Premium)

//返回值：按币别、保额计算标志汇总的币别，保额，保费的数组

function collectByCurrencyAndCalculateFlag(arrayFee)

{

  var arrayReturn = new Array();

  var i = 0;

  var j = 0;

  var blnExist = false;

  for(i=0;i<arrayFee.length;i++)

  {

    blnExist = false;

    for(j=0;j<arrayReturn.length;j++)

    {

      if(arrayFee[i].Currency==arrayReturn[j].Currency)

      {

        blnExist = true;

        break;

      }

    }

    if(blnExist)

    {

      arrayReturn[j].Premium = arrayReturn[j].Premium + arrayFee[i].Premium;

      if(arrayFee[i].CalculateFlag=="Y")

      {

        arrayReturn[j].Amount = arrayReturn[j].Amount + arrayFee[i].Amount;

        arrayReturn[j].CalculateFlag = "Y";

      }

    }

    else

    {

      if(arrayFee[i].CalculateFlag!="Y") arrayFee[i].Amount = 0;

      arrayReturn[arrayReturn.length] = arrayFee[i];

    }

  }



  return arrayReturn;

}





////按币别汇总函数

//var arrayCollect = new Array();    //汇总项数组

//

////汇总 (行数,币别域名,保额域名,保费域名)

//function collectFee(intNum,CN,Amt,Prm )

//{

//  var arrayCollectOne ;

//  for(i=0;i<intNum;i++)

//  {

//    var strCN      = fm.all(CN)[i].value;

//    var strAmount  = fm.all(Amt)[i].value;

//    var strPremium = fm.all(Prm)[i].value;

//    var existFlag  = false;

//

//    if(!isNumeric(strAmount))

//      strAmount=0;

//    else

//      strAmount=eval(strAmount);

//    if(!isNumeric(strPremium))

//      strPremium=0;

//    else

//      strPremium=eval(strPremium);

//

//    for(j=0;j<arrayCollect.length;j++)

//    {

//      if( arrayCollect[j]["CN"] == strCN )

//      {

//        existFlag = true;

//        break;

//      }

//    }

//    if(!existFlag)

//    {

//      arrayCollectOne = new Array(); //一个汇总项

//      arrayCollectOne["CN"] = strCN;

//      arrayCollectOne["Amount"] = strAmount;

//      arrayCollectOne["Premium"] = strPremium;

//      arrayCollect[j] = arrayCollectOne;

//    }

//    else

//    {

//      arrayCollect[j]["Amount"] = arrayCollect[j]["Amount"] + strAmount ;

//      arrayCollect[j]["Premium"] = arrayCollect[j]["Premium"] + strPremium ;

//    }

//  }

//}



//

////给新***代码赋值 --代码维护模块专用onblur=setNewCode(this)

//function setNewCode(field)

//{

//  if( trim(fm.all("new"+field.name).value)=="" )

//  {

//    fm.all("new"+field.name).value = field.value;

//  }

//}







//得到短期费率表

function getMonthRate(intMonthNum,strRiskCode)

{

  var mrate;

  var floatReturn;

  strRiskCode = strRiskCode==null?"PUB":strRiskCode;

  if(strRiskCode=="1102" || strRiskCode=="CBC")

    mrate = new Array(0,30,40,50,60,70,80,85,90,95,100,100,100);

  else if(strRiskCode=="1103" || strRiskCode.substring(0,1)=="E")

    mrate = new Array(0,25,35,45,55,65,70,75,80,85,90,95,100);

  else if(strRiskCode=="ZFG")

    mrate = new Array(0,15,25,35,45,55,65,75,80,85,90,95,100);

  else

    mrate = new Array(0,10,20,30,40,50,60,70,80,85,90,95,100);

  floatReturn = Math.floor(intMonthNum/12)+ mrate[intMonthNum%12]/100;

  return floatReturn;

}



//计算短期费率函数

function getShortRate(strMode,strStartDate,strStartHour,strEndDate,strEndHour)

{

  var shortRate = 0;

  var strRiskCode = "PUB";

  if(parseInt(strMode,10)==1 )  //月比例

  {

    try{ strRiskCode = fm.RiskCode.value; }catch(e){}

    return getShortRateMonth(strStartDate,strEndDate,strRiskCode);

  }

  else if(parseInt(strMode,10)==2 )  //日比例

  {

    return getShortRateDay(strStartDate,strStartHour,strEndDate,strEndHour);

  }

  else

  {

    shortRate = 100;

  }

  return shortRate;

}





//按日比例计算短期费率函数,根据终端逻辑进行修改SUNCG20040624 

function getShortRateDay(strStartDate,strStartHour,strEndDate,strEndHour)

{

  var startDate = new Date(strStartDate);

  var endDate   = new Date(strEndDate);

  var dayCount  = dateDiff(startDate,endDate,"D");

  var shortRate = 0;

  var intStartHour = 0;

  var intEndHour   = 0;

  var strNextDate  = 0; 

  var nextDate;

  var nextDayCount = 0;

 

  intStartHour = parseInt(strStartHour);

  intEndHour   = parseInt(strEndHour);

  

  if(isNaN(intStartHour))

    intStartHour = 0;

  if(isNaN(intEndHour))

    intEndHour = 24;

  

  if(intEndHour<=intStartHour)

  {

    if(strStartHour=="24" && strEndHour=="0")

      dayCount = dayCount -2;

    else

      dayCount = dayCount -1;

  }



  strNextDate = getNextYearFullDate(strStartDate,1);  

  nextDate = new Date(strNextDate);  

  nextDayCount = dateDiff(startDate,nextDate,"D");

  nextDayCount = nextDayCount -1;

  

  shortRate = dayCount/nextDayCount*100;

  return shortRate;

}



//按月比例计算短期费率函数

function getShortRateMonth(strStartDate,strEndDate,strRiskCode)

{

  var startDate = new Date(strStartDate);

  var endDate   = new Date(strEndDate);



  var monthCount = dateDiff(startDate,endDate,"M");



  var shortRate  = getMonthRate(monthCount,strRiskCode) * 100;

  return shortRate;

}



//

//  查询

//

//对输入域是否是日期的校验(日期格式xxxx-xx-xx)

function isDateI(date)

{

  var strValue;

  strValue=date.split("-");



  if(strValue.length!=3) return false;

  if(!isInteger(strValue[0]) || !isInteger(strValue[1]) || !isInteger(strValue[2]) ) return false;



  var intYear=eval(strValue[0]);

  var intMonth=eval(strValue[1]);

  var intDay=eval(strValue[2]);



  if( intYear<0 || intYear>9999 || intMonth<0 || intMonth>12 || intDay<0 || intDay>31 ) return false;

  return true;

}



//比较两个日期字符串(日期格式xxxx/xx/xx)

// date1=date2则返回0 , date1>date2则返回1 , date1<date2则返回2

function compareDateI(date1,date2)

{

  var strValue=date1.split("/");

  var date1Temp=new Date(strValue[0],strValue[1],strValue[2]);



  strValue=date2.split("/");

  var date2Temp=new Date(strValue[0],strValue[1],strValue[2]);



  if(date1Temp.getTime()==date2Temp.getTime())

    return 0;

  else if(date1Temp.getTime()>date2Temp.getTime())

    return 1;

  else

    return 2;

}



//对输入域是否是满足查询格式的日期的校验(日期格式xxxx/xx/xx)

function isQueryDate(sign,date)

{

  var strValue;



  //区间的判断

  if (sign==":")

  {

    strValue=date.split(":");

    if (strValue.length!=2) return false;

    if (!isDateI(strValue[0])) return false;

    if (!isDateI(strValue[1])) return false;

    if (compareDateI(strValue[0],strValue[1])==1) return false;

  }

  //单一日期的判断

  else

  {

    return isDateI(date);

  }

  return true;

}



//对输入域是否是满足查询格式的整数的校验integer

function isQueryInteger(sign,integer)

{

  var strValue;



  //区间的判断

  if (sign==":")

  {

    strValue=integer.split(":");

    if (strValue.length!=2) return false;

    if (!isInteger(strValue[0])) return false;

    if (!isInteger(strValue[1])) return false;

    if (strValue[0]>strValue[1]) return false;

  }

  //单一日期的判断

  else

  {

    return isInteger(integer);

  }

  return true;

}



//对输入域是否是满足查询格式的数字的校验

function isQueryNum(sign,num)

{

  var strValue;



  //区间的判断

  if (sign==":")

  {

    strValue=num.split(":");

    if (strValue.length!=2) return false;

    if (!isNumeric(strValue[0])) return false;

    if (!isNumeric(strValue[1])) return false;

    if (strValue[0]<strValue[1]) return false;

  }

  //单一日期的判断

  else

  {

    return isNumeric(num);

  }

  return true;

}



//小时判断

function checkHour(field)

{

    if (field.value<0||field.value>24)

    {

    errorMessage("时间格式输入不合法");

    field.focus();

    return false;

    }

}







//财产核定损汇总

function collectProp()

{

  openWindow("/piccshipweb/temp/common/lp/UILpropCollect.jsp","CollectProp");

}

//人员核定损汇总

function collectPerson()

{

  openWindow("/piccshipweb/temp/common/lp/UILpersonCollect.jsp","CollectPerson");

}

//财产赔付清单汇总

function collectLoss()

{

  openWindow("/piccshipweb/0501/lp/compensate/UIL0501lossCollect.jsp","CollectLoss");

}

//人员赔付清单汇总

function collectPersonLoss()

{

  openWindow("/piccshipweb/temp/common/lp/UILpersonLossCollect.jsp","CollectPersonLoss");

}





//关联

function relate(strPolicyNo,strProposalFlag)

{

  if(strProposalFlag == null)

  {

    strProposalFlag = "N";

  }



  if(strProposalFlag == "N")

  {

    if(strPolicyNo == null || trim(strPolicyNo).length != 22)

    {

      alert("没有提供有效的22位保单号！");

        return;

    }

  }

  else if(strProposalFlag == null || trim(strProposalFlag).length != 22)

  {

    alert("没有提供有效的22位投保单号！");

      return;

  }



  var strURL = "/piccshipweb/common/pub/UIRelate.jsp?PolicyNo="+strPolicyNo+"&ProposalFlag="+strProposalFlag;

  var newWindow = window.open(strURL,"Relate",'width=640,height=360,top=0,left=0,toolbar=0,location=0,directories=0,menubar=0,scrollbars=1,resizable=1,status=0');

  newWindow.focus();

}





//生成一个field对象,即给一个field对象赋值

function newFieldPG(value,title,tag,flag)

{

  var field = new Array();

  field.value = value;

  field.title = title;



  if(flag=="I")

    field.backgroundColor = BGCOLORI;

  else if(flag=="D")

    field.backgroundColor = BGCOLORD;

  else if(flag=="U" && value!=title)

    field.backgroundColor = BGCOLORU;

  else

    field.backgroundColor = "";



  field.tag   = tag;

  return field;

}





//批单显示时，设置一行的颜色

function setRowColorPG(DataPageCode,index,flag)

{

  var i = 0;

  var name = "";

  var elements;

  var color = "";

  if(flag=="I")

  {

    setRowColor(DataPageCode,index,BGCOLORI);

    return ;

  }

  else if(flag=="D"||flag=="B")

  {

    setRowColor(DataPageCode,index,BGCOLORD);

    return ;

  }

  else if(trim(flag)=="")

  {

    return ;

  }



  //--以下是flag=="U"的情况

  color = BGCOLORU;



  //得到Input域的名字

  elements = document.all(DataPageCode).tBodies.item(0).getElementsByTagName("input");

  for(i=0;i<elements.length;i++)

  {

    if(elements[i].type=="button") continue;

    if(fm.all(elements[i].name)[index].value!=fm.all(elements[i].name)[index].title)

      fm.all(elements[i].name)[index].style.backgroundColor = color;

  }

  //得到Select域的名字

  elements = document.all(DataPageCode).tBodies.item(0).getElementsByTagName("select");

  for(i=0;i<elements.length;i++)

  {

    if(fm.all(elements[i].name)[index].value!=fm.all(elements[i].name)[index].title)

      fm.all(elements[i].name)[index].style.backgroundColor = color;

  }

  //得到textarea域的名字

  elements = document.all(DataPageCode).tBodies.item(0).getElementsByTagName("textarea");

  for(i=0;i<elements.length;i++)

  {

    if(fm.all(elements[i].name)[index].value!=fm.all(elements[i].name)[index].title)

      fm.all(elements[i].name)[index].style.backgroundColor = color;

  }



}



//容器里存在相同元素的位置

function getSameElementOrder(container,elementTagName,elementName,elementValue)

{

  var elements = container.getElementsByTagName(elementTagName);

  for(var i=0;i<elements.length;i++)

  {

    if(elements[i].name==elementName)

    {

      if(elements[i].value==elementValue)

      {

        return getElementOrder(elements[i],container.document.fm);

      }

    }//end if

  }//end for

  return -1;

}//end function



//元素在容器里的数组位置

function getElementOrderFromContainer(container,elementTagName,field)

{

  var index = -1;

  var elements = container.getElementsByTagName(elementTagName);

  for(var i=0;i<elements.length;i++)

  {

    if(elements[i].name==field.name)

    {

      index++;

      if(elements[i]==field) return index;

    }//end if

  }//end for

  return -1;

}



//按钮单击事件，用于条款的显示

function buttonOnClick(Field,strCodeType,intCodeCodeOffset,intCodeNameOffset,strSubPageCode)

{

  var intElementIndex=getElementIndex(Field);

  var strCodeCode = trim(fm.elements[intElementIndex + intCodeCodeOffset].value);

  var strContext  = trim(fm.elements[intElementIndex + intCodeNameOffset].value);



  var strCodeTypeTemp = "";

  if(strCodeType.indexOf("Context")>-1)

  {

    strCodeTypeTemp = strCodeType.substring(0,strCodeType.indexOf("Context"));

  }

  else

  {

    return;

  }



  if(strContext=="")

  {

    strContext = ""; //根据strCodeTypeTemp、strCodeCode取内容

    fm.elements[intElementIndex + intCodeNameOffset].value = strContext;

    showSubPage(Field,strSubPageCode);

  }



  showSubPage(Field,strSubPageCode);

}





/**

 @author      徐新元

 @description 查看轨迹信息

 @param       无

 @return      无

 */

function viewTrace(businessNo)

{

  if(businessNo=="")

  {

    errorMessage("没有轨迹信息!");

    return ;

  }

  var strURL="/uwcommon/UIUwCommonTraceInfo.jsp?BusinessNo=" + businessNo;

  window.open(strURL,'轨迹信息','width=640,height=300,top=50,left=80,toolbar=0,location=0,directories=0,menubar=0,scrollbars=1.resizable=1,status=0');

}



/**

 @author      daironghui

 @description 查看无格式保单文本

 @param       businessNo

 @return      无

 */

function showText(businessNo)

{

  var strURL = "";

  if(businessNo=="")

  {

    errorMessage("没有文本信息!");

    return ;

  }



  strURL="/piccshipweb/common/tbcb/UIPrpslPoliShowText.jsp?BizNo=" + businessNo;

  window.open(strURL,'文本信息','width=790,height=540,top=0,left=0,toolbar=0,location=0,directories=0,menubar=0,scrollbars=1.resizable=1,status=0');

}





//获取条款内容(财产卢续攀20030407)

//strQueryString参数格式是：参数1=值1&参数2=值2

function getClauseContext(strQueryString)

{

  var ClauseURL = "/piccshipweb/common/pub/UIClauseGet.jsp";

  var strURL = ClauseURL + "?" + strQueryString;

  var vXmlText = getResponseXmlText(strURL);

  //截掉头尾字符[]

  if(vXmlText.length>=2)

    return vXmlText.substring(1,vXmlText.length-1);

  else

    return "";

}



//使用xmlhttp访问页面，并获取数据(财产卢续攀20030407)

function getResponseXmlText(strURL)

{

  var objXmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

  objXmlHttp.Open("POST",strURL,false);

  objXmlHttp.setRequestHeader("Content-type","text/xml");

  objXmlHttp.Send("");

  if(objXmlHttp.status==200)

  {

    return objXmlHttp.responseXML.text;

  }

  else if(objXmlHttp.status==404)

  {

    alert("找不到页面："+ strURL);

    return "";

  }

  else

  {

    alert("访问"+ strURL +"出错，错误号："+objXmlHttp.status);

    return "";

  }

}



//通用设置序号函数(财产卢续攀20030407)

//参数 serialNoElements 序号域数组

//     startNo 开始序号

function resetSerialNumber(serialNoElements,startNo)

{

  for(var i=0;i<serialNoElements.length;i++)

    serialNoElements[i].value = startNo + i;

}



//将空值输入域设为给定值，isMulti表示该域是否为多个输入域

function setEmpty(FieldName,FieldValue,isMulti)

{

    var i = 0;

    if (!isMulti)

    {

      if (fm.all(FieldName).value == "")

        fm.all(FieldName).value = FieldValue;

    }

    else

    {



      for(i = 0; i< fm.all(FieldName).length; i++)

      {

        theField = fm.all(FieldName)[i];

        if (trim(theField.value) == "" || isNaN(eval(theField.value)) || eval(theField.value) == 0)

          theField.value = FieldValue;

      }

    }

}





function checkNotNull(field)

{

  if(!hasValue(field))

  {

    return false;

  }

  return true;

}

