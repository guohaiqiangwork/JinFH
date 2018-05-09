/****************************************************************************

 * DESC       ：公用校验JavaScript(兼容IE5/NN6)--Common Project控制，Application Project不能修改

 * AUTHOR     ：zhouxianli

 * CREATEDATE ：2003-10-16

 * MODIFYLIST ：   Name       Date            Reason/Contents

 *          ------------------------------------------------------

 *

 ************************************************************************************/



/**

 * 基本数据校验

 * <p>Copyright: Copyright (c) 2003</p>

 * <p>Company: Sinosoft</p>

 * @author zhouxianli

 * @version 1.0

 */



 /**

    结构为 字段名，字段描述，类型，是否允许为空

           4项都是必需的

 */



var schemaColumns = new Array(); //存储字段结构的数组

var mulLineDataFields = new Array(); //临时存储Form中多行Data字段的数组



function schemaColumn(name,desc,dataType,allowNulls)

{

    this.name = name;

    this.desc = desc;

    this.dataType = dataType;

    this.allowNulls = allowNulls;

}



function getSchemaColumn(name)

{

    for(var i=0;i<schemaColumns.length;i++)

    {

        if(name==schemaColumns[i].name)

            return schemaColumns[i];

    }

    return null;

}



function initMulLineFields(mulLineTableIdList){

    mulLineDataFields = new Array();

    if(mulLineTableIdList==null || mulLineTableIdList==""){

        return;

    }

    var tableIdArray = new Array();

    tableIdArray = split(mulLineTableIdList,",");

    var index = 0;

    for(var i=0;i<tableIdArray.length;i++)

    {

        var elements=new Array();

        elements=getTableElements(tableIdArray[i]);

        for(var j=0;j<elements.length;j++){

            mulLineDataFields[index++]=elements[j];

        }

    }

}



/**

 * 是否是多行输入域

 * @param field 元素

 * @return 是则返回true,否则返回false

 */

function isMulLineField(field)

{

    for(var i=0;i<mulLineDataFields.length;i++){

        if(field==mulLineDataFields[i]){

            return true;

        }

    }

    return false;

}



/**

 * 验证必须输入项(覆盖struts中相应方法)

 * @param form form

 * @return 是返回true,否返回false

 */

function validateRequired(form) {

        var bValid = true;

    var focusField = null;

    var i = 0;

    var field = null;

    var schemaColumn = null;

    var fields = new Array(); //存放schemaColumns

    var count  = 0;

    for(i=0;i<form.elements.length;i++)

    {

        field = form.elements[i];

        if (field.type == 'text' ||

            field.type == 'file' ||

            field.type == 'textarea' ||

            field.type == 'select-one' ||

            field.type == 'radio' ||

            field.type == 'password') {



            count = getElementCount(field.name);

            //跳过多行第一条

            if((count>1 && getElementOrder(field)==1) ||

                (count==1 && isMulLineField(field))){

                continue;

            }



            schemaColumn = getSchemaColumn(field.name);



            if(schemaColumn==null){

                log("字段" + field.name + "没有在ValidateData.js中定义");

                continue;

            }

            //跳过可以为空的输入域

            if(schemaColumn.allowNulls==true){

                continue;

            }



            var value;

			// get field's value

			if (field.type == "select-one") {

				var si = field.selectedIndex;

				value = field.options[si].value;

			} else {

				value = field.value;

			}



            if (value == '') {

                if (focusField == null) {

                    focusField = field;

                }

                fields[fields.length] = schemaColumn;

                bValid = false;

            }

        }

    }



    if (fields.length>0) {

        var message = "";

        for(i=0;i<fields.length;i++)

        {

            message = message + fields[i].desc + "不允许为空\n";

        }

        try{

            focusField.focus();

        }

        catch(E){

        }

        alert(message);

    }

    return bValid;

}



/**

 * 检查是否是合法的varchar类型字段

 * @param form form

 * @param schemaColumn schemaColumn

 * @return 是返回true,否返回false

 */

function isValidateVarcharField(field,schemaColumn){

    var maxLength  = 0;

    var minSpace  = 0;

    var temp = schemaColumn.dataType;

    var start = schemaColumn.dataType.indexOf("(",7);  //"("的位置

    var middle = schemaColumn.dataType.indexOf(",",start); //","的位置

    var end = schemaColumn.dataType.indexOf(")",start); //")"的位置

    if(middle==-1){ //没有设置最小值

        maxLength = parseInt(schemaColumn.dataType.substring(start+1,end));

        minSpace = 0;

    }

    else{

        maxLength = parseInt(schemaColumn.dataType.substring(start+1,middle));

        minSpace = parseInt(schemaColumn.dataType.substring(middle+1,end));

    }



    if (getByteLength(field.value) > maxLength) {

        return false;

    }

    if (getByteLength(field.value) < minSpace) {

        return false;

    }

    return true;

}



/**

 * 检查是否是合法的char类型字段

 * @param form form

 * @param schemaColumn schemaColumn

 * @return 是返回true,否返回false

 */

function isValidateCharField(field,schemaColumn){

    var maxLength  = 0;

    var temp = schemaColumn.dataType;

    var start = schemaColumn.dataType.indexOf("(",4);//"("的位置

    var end = schemaColumn.dataType.indexOf(")",start);//")"的位置

    maxLength=parseInt(schemaColumn.dataType.substring(start+1,end));



    if (getByteLength(field.value) > maxLength) {

        return false;

    }

    return true;

}



/**

 * 检查是否是合法的Integer类型字段

 * @param form form

 * @param schemaColumn schemaColumn

 * @return 是返回true,否返回false

 */

function isValidateIntegerField(field,schemaColumn)

{

  var strValue = field.value;

  if(strValue.length==0)

    return true;



  field.value = trim(field.value);

  var strValue=field.value;

  if(strValue=="")

    strValue = "0";

  field.value = strValue



  if (regExpTest(strValue,/[+|\-]?\d+/g)==false){

    return false;

  }



  var value = parseInt(strValue);



  if(isNaN(value) || value>MAX_INTEGER || value<MIN_INTEGER){

    return false;

  }

  return true;

}



/**

 * 检查是否是合法的SmallInt类型字段

 * @param form form

 * @param schemaColumn schemaColumn

 * @return 是返回true,否返回false

 */

function isValidateSmallintField(field,schemaColumn)

{

    if(isValidateIntegerField(field,schemaColumn)==false){

        return false;

    }

    var strValue = field.value;

    var value = parseInt(strValue);

    if(value>MAX_SMALLINT || value<MIN_SMALLINT){

        return false;

    }

    return true;

}



/**

 * 检查是否是decimal类型字段

 * @param form form

 * @param schemaColumn schemaColumn

 * @return 是返回true,否返回false

 */

function isValidateDecimalField(field,schemaColumn){

    var length  = 0;

    var scale  = 0;

    var temp = schemaColumn.dataType;

    var start = schemaColumn.dataType.indexOf("(");  //"("的位置

    var middle = schemaColumn.dataType.indexOf(","); //","的位置

    var end = schemaColumn.dataType.indexOf(")"); //")"的位置

    if(middle==-1){ //没有设置最小值

        length = parseInt(schemaColumn.dataType.substring(start+1,end));

        scale = 0;

    }

    else{

        length = parseInt(schemaColumn.dataType.substring(start+1,middle));

        scale = parseInt(schemaColumn.dataType.substring(middle+1,end));

    }

    field.value = trim(field.value);//去掉输入域头尾空格

    var strValue=field.value;

     if(strValue==""){

        strValue = "0";

    }

    field.value = strValue;



    if(regExpTest(strValue,/^[+|\-]?\d*[.]?\d*/g)==false){

        return false;

    }

    //检查精度

    middle = strValue.indexOf("."); //"."的位置

    if(middle>-1){

        if(scale<strValue.substr(middle+1).length){

            return false;

        }

    }



    //检查最大长度

    var addLength = 0;

    if(strValue.indexOf("+")>-1 ){

        addLength++;

    }

    if(strValue.indexOf("-")>-1){

        addLength++;

    }



    if(strValue.indexOf(".")==0){

        addLength--;

    }

    else if(strValue.indexOf(".")>0){

        addLength++;

    }



    if (getByteLength(strValue) > (length + addLength)) {

        return false;

    }



    return true;

}



/**

 * 检查是否是合法的date类型字段

 * @param form form

 * @param schemaColumn schemaColumn

 * @return 是返回true,否返回false

 */

function isValidateDateField(field,schemaColumn)

{

    field.value = trim(field.value);

    var strValue = field.value;

    //如果是全数字,则转换为日期型数据

    if (regExpTest(strValue,/\d+/g)==true){

        //只接受YYYYMMDD格式

        if(getByteLength(strValue)!=8){

            return false;

        }

        strValue = strValue.substring(0,4) + DATE_DELIMITER +

                   strValue.substring(4,6) + DATE_DELIMITER +

                   strValue.substring(6);

    }

    field.value = strValue;

    if(getByteLength(strValue)==9){

        strValue=strValue.substring(0,8)+"0" + strValue.substring(8);

        field.value = strValue;

    }



    if(getByteLength(strValue)!=10 ||

            strValue.substring(4,5) != DATE_DELIMITER ||

            strValue.substring(7,8) != DATE_DELIMITER){

        return false;

    }

    var year = parseInt(strValue.substring(0,4));

    var month = parseInt(strValue.substring(5,7));

    var date = parseInt(strValue.substring(8,10));

    var testDate = new Date(year,month,date);

    if(testDate.getFullYear()!=year ||testDate.getMonth()!=month ||testDate.getDate()!=date){

        return false;

    }

    return true;

}







/**

 * 验证字段类型

 * @param form form

 * @return 是返回true,否返回false

 */

function validateType(form) {

    var bValid = true;

    var bResult = true;

    var focusField = null;

    var i = 0;

    var field = null;

    var schemaColumn = null;

    var fields = new Array(); //存放schemaColumns

    var count  = 0;

    var type = "";

    var property = "";

    for(i=0;i<form.elements.length;i++)

    {

        field = form.elements[i];

        if (field.type == 'text' ||

            field.type == 'password' ||

            field.type == 'textarea') {



            if(field.value==""){

                continue;

            }

            count = getElementCount(field.name);



            //跳过多行第一条

            if((count>1 && getElementOrder(field)==1) ||

                (count==1 && isMulLineField(field))){

                continue;

            }



            schemaColumn = getSchemaColumn(field.name);

            if(schemaColumn==null){

                log("字段" + field.name + "没有在ValidateData.js中定义");

                continue;

            }

            property = schemaColumn.dataType.toLowerCase();



            if (property=="text"){ //text类型无需校验

                bResult = true;

            }

            else if (property==("byte")){//byte类型无需校验

                bResult = true;

            }

            else if (property=="integer"){

                bResult = isValidateIntegerField(field,schemaColumn);

            }

            else if (property=="smallint"){

                bResult = isValidateSmallintField(field,schemaColumn);

            }

            else if (property=="date"){

                bResult = isValidateDateField(field,schemaColumn);

            }

            else if(property.indexOf("varchar")!=-1){

                bResult = isValidateVarcharField(field,schemaColumn);

            }

            else if (property.indexOf("char")!=-1){

                bResult = isValidateCharField(field,schemaColumn);

            }

            else if (property.indexOf("dec")!=-1){

                bResult = isValidateDecimalField(field,schemaColumn);

            }

            else if (property.indexOf("float")!=-1){

                bResult = isValidateDecimalField(field,schemaColumn);

            }

            else{

                log("警告"+field.name+"类型为" +property + ".在validateType中没有处理");

                return true;

            }



            if(bResult==false){

                if (focusField == null) {

                    focusField = field;

                }

                fields[fields.length] = schemaColumn;

                bValid = false;

            }

        }

    }



    if (fields.length>0) {

        var message = "";

        for(i=0;i<fields.length;i++)

        {

            var typeDesc = "";

            var maxLength  = 0;

            var minSpace  = 0;

            var start = 0;  //"("的位置

            var middle = 0; //","的位置

            var end = 0;    //")"的位置

            field=fields[i];



            start = field.dataType.indexOf("(");  //"("的位置

            middle = field.dataType.indexOf(","); //","的位置

            end = field.dataType.indexOf(")"); //")"的位置

            if(middle==-1){ //没有设置最小值

                maxLength = parseInt(field.dataType.substring(start+1,end));

                minSpace = 0;

            }

            else{

                maxLength = parseInt(field.dataType.substring(start+1,middle));

                minSpace = parseInt(field.dataType.substring(middle+1,end));

            }



            property = field.dataType.toLowerCase();

            if (property=="integer"){

                typeDesc = "整数";

//                typeDesc = typeDesc + "(最大为" + MAX_INTEGER + ",最小为" + MIN_INTEGER + ")";

            }

            else if (property=="smallint"){

                typeDesc = "小整数";

//                typeDesc = typeDesc + "(最大为" + MAX_SMALLINT + ",最小为" + MIN_SMALLINT + ")";

            }

            else if (property=="date"){

                typeDesc = "日期(格式为YYYY" + DATE_DELIMITER + "MM" + DATE_DELIMITER + "DD)";

            }

            else if(property.indexOf("varchar")!=-1){

                typeDesc = "字符串";

                typeDesc = typeDesc + "(最大长度为" + maxLength ;

                if (minSpace>0) {

                    typeDesc = typeDesc + ",最小长度为" + minSpace ;

                }

                typeDesc = typeDesc + ")"

            }

            else if (property.indexOf("char")!=-1){

                typeDesc = "字符串";

                typeDesc = typeDesc + "(最大长度为" + maxLength ;

                if (minSpace>0) {

                    typeDesc = typeDesc + ",最小长度为" + minSpace ;

                }

                typeDesc = typeDesc + ")"

            }

            else if (property.indexOf("dec")!=-1||property.indexOf("float")!=-1 ){

                typeDesc = "数值";

                typeDesc = typeDesc + "(有效位数为" + maxLength ;

                if (minSpace>0) {

                    typeDesc = typeDesc + ",精度为" + minSpace ;

                }

                typeDesc = typeDesc + ")"

            }

            message = message + "\"" + field.desc + "\"必须是" + typeDesc + "\n";

        }



        focusField.focus();

        alert(message);

    }

    return bValid;

}







////检查时间输入域

//function checkTime(field)

//{

//  field.value = trim(field.value);

//  var strValue = field.value;

//  var desc = field.description;

//  //如果description属性不存在，则用name属性

//  if(desc==null)

//    desc = field.name;

//

//  if(isNumeric(strValue))

//  {

////  	errorMessage("请输入合法的" + desc +"\n类型为时间，格式为hh:mm:ss");

//  	errorMessage("请输入合法的时间，格式为hh:mm:ss");

//    field.value="";

//    field.focus();

//    field.select();

//    return false;

//  }

//  for(i=0;i<strValue.length;i++)

//  {

//  	if(isInteger(strValue.substring(i,i+1)) || strValue.substring(i,i+1) == ":"){

//  		}

//  	else{

////	    errorMessage("请输入合法的" + desc +"\n类型为时间，格式为hh:mm:ss");

//	    errorMessage("请输入合法的时间，格式为hh:mm:ss");

//	    field.value="";

//	    field.focus();

//	    field.select();

//	    strValue = "";

//	    return false;

//  	}

//  }

//  if(strValue != ""){

//  if( !isTime(strValue,":"))

//  {

////    errorMessage("请输入合法的" + desc +"\n类型为时间，格式为hh:mm:ss");

//    errorMessage("请输入合法的时间，格式为hh:mm:ss");

//    field.value="";

//    field.focus();

//    field.select();

//    return false;

//  }rue;

//}

//

//  return true;

//}

//

////对输入域是否是日期的校验，splitChar参数缺省为"/"

//function isDate(date,splitChar)

//{

//  var charSplit = (splitChar==null?"/":splitChar);

//  var strValue = date.split(charSplit);

//

//  if(strValue.length!=3) return false;

//  if(!isInteger(strValue[0]) || !isInteger(strValue[1]) || !isInteger(strValue[2]) ) return false;

//

//  var intYear = eval(strValue[0]);

//  var intMonth = eval(strValue[1]);

//  var intDay = eval(strValue[2]);

//

//  if( intYear<1 || intYear>9999 || intMonth<1 || intMonth>12 || intDay<1 || intDay>31 ) return false;

//  return true

//

////对输入域是否是时间的校验，splitChar参数缺省为":"

//function isTime(date,splitChar)

//{

//  var charSplit = (splitChar==null?"/":splitChar);

//  var strValue = date.split(charSplit);

//

//  if(strValue.length!=3) return false;

//  if(!isInteger(strValue[0]) || !isInteger(strValue[1]) || !isInteger(strValue[2]) ) return false;

//

//  var intHour = eval(strValue[0]);

//  var intMinute = eval(strValue[1]);

//  var intSecond = eval(strValue[2]);

//

//  if( intHour<0 || intHour>23 || intMinute<1 || intMinute>60 || intSecond<1 || intSecond>60 ) return false;

//  return true;

//}

//

//}

//

////对输入域是否是数字的校验

//function isNumeric(strValue)

//{

//  var result = regExpTest(strValue,/\d*[.]?\d*/g);

//  return result;

//}

//

////对输入域是否是整数的校验,即只包含字符0123456789

//function isInteger(strValue)

//{

//  var result = regExpTest(strValue,/\d+/g);

//  return result;

//}



/**

* 默认的校验Form的方法

* @return 通过true/不通过false

*/

function validateForm(form,mulLineTableIdList)

{

   if(bCancel==true) {

     return true;

   }

   if(!confirm("确认要保存信息？")){

     return false;

   }



   initMulLineFields(mulLineTableIdList);



   return validateRequired(form) && validateType(form);

}



function getDataTypeMaxLength(dataType){

    var maxLength  = 0;

    var minSpace  = 0;

    var start = 0;  //"("的位置

    var middle = 0; //","的位置

    var end = 0;    //")"的位置



    start = dataType.indexOf("(");  //"("的位置

    middle = dataType.indexOf(","); //","的位置

    end = dataType.indexOf(")"); //")"的位置

    //存在"("

    if(start>0){

        if(middle==-1){ //没有设置最小值

            maxLength = parseInt(dataType.substring(start+1,end));

            minSpace = 0;

        }

        else{

            maxLength = parseInt(dataType.substring(start+1,middle));

            minSpace = parseInt(dataType.substring(middle+1,end));

        }

    }



    if (dataType=="integer"){

        maxLength=DB_INT_LENGTH;

    }

    else if (dataType=="smallint"){

        maxLength=DB_INT_LENGTH/4;

    }

    else if (dataType=="date"){

        maxLength=10;

    }

    return maxLength;

}



/**

 * 初始化整个页面的方法

 * 设置域的maxLenght属性.

 */

function initPage()

{

    var i=0;

    var j=0;

    var maxLength=0;

    var element;

    var schemaColumn;

    var method;

    for(i=0;i<document.forms.length;i++){

        for(j=0;j<document.forms[i].elements.length;j++){

            element = document.forms[i].elements[j];



            if(element.name=="" || element.type == 'hidden'){

                continue;

            }

            schemaColumn = getSchemaColumn(element.name);

            if(schemaColumn==null){

                log("字段" + element.name + "没有在ValidateData.js中定义");

                continue;

            }



            //设置maxLength

            if (element.type == 'text' ||

                element.type == 'textarea' ||

                element.type == 'password') {



                maxLength=getDataTypeMaxLength(schemaColumn.dataType);

                if(maxLength>0){

                    element.maxLength=maxLength;

                }

            }

            //添加onkeypress处理事件

            method = null;

            if(element.onkeypress!=null){

              method = element.onkeypress;

            }

            element.onkeypress=keypressHandler;

            if (method!=null){

                eval("element.onkeypress.prototype." + element.name + "=" + method);

            }

        }

    }

}



/**

 * 是否是合法的decimal类型输入,即("0-9",".","+",'-")

 * 是返回true,否返回false.

 */

function isValidateDecimalInput(e)

{

    var value;

    if(isNetscape()){

        value=String.fromCharCode(e.charCode);

    }

    else{

        value=String.fromCharCode(e.keyCode);

    }

    if(regExpTest(value,/[+|\-|\.|0-9]{1}/)==true){

        return true;

    }

    else{

        return false;

    }

}



/**

 * 是否是合法的integer类型输入,即("0-9","+",'-")

 * 是返回true,否返回false.

 */

function isValidateIntegerInput(e)

{

    var value;

    if(isNetscape()){

        value=String.fromCharCode(e.charCode);

    }

    else{

        value=String.fromCharCode(e.keyCode);

    }

    if(regExpTest(value,/[+|\-|0-9]{1}/)==true){

        return true;

    }

    else{

        return false;

    }

}



/**

 * 是否是合法的date类型输入,即("0-9","/")

 * 是返回true,否返回false.

 */

function isValidateDateInput(e)

{

    var value;

    if(isNetscape()){

        value=String.fromCharCode(e.charCode);

    }

    else{

        value=String.fromCharCode(e.keyCode);

    }

    if(regExpTest(value,/[\/|0-9]{1}/)==true){

        return true;

    }

    else{

        return false;

    }

}





function keypressHandler(evt)

{

    var testValue;

    testValue = true;

    evt = (evt) ? evt : window.event;

    var schemaColumn = getSchemaColumn(this.name);

    if(schemaColumn==null){

        log("字段" + this.name + "没有在ValidateData.js中定义");

        testValue=true;

    }

    else{

        var dataType = schemaColumn.dataType.toLowerCase();

        if (dataType=="integer"){

            testValue=isValidateIntegerInput(evt);

        }

        else if (dataType=="smallint"){

            testValue=isValidateIntegerInput(evt);

        }

        else if (dataType=="date"){

            testValue=isValidateDateInput(evt);

        }

        else if(dataType.indexOf("varchar")!=-1){

            testValue=true;

        }

        else if (dataType.indexOf("char")!=-1){

            testValue=true;

        }

        else if (dataType.indexOf("dec")!=-1||dataType.indexOf("float")!=-1 ){

            testValue=isValidateDecimalInput(evt);

        }

        else{

            log("警告"+field.name+"类型为" +property + ".在keypressHandler中没有处理");

            testValue=true;

        }

        if(testValue!=true){

            return false;

        }

    }



    try{

        var obj;

        obj = eval("this.onkeypress.prototype." + this.name );

        if(obj != null)

        {

            if(obj.apply(obj,arguments)==false){

                return false;

            }

        }

    }catch(E){

        log(E);

        testValue=false;

    }

    return testValue;

}



