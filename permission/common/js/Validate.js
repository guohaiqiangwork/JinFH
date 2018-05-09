/****************************************************************************

 * DESC       ������У��JavaScript(����IE5/NN6)--Common Project���ƣ�Application Project�����޸�

 * AUTHOR     ��zhouxianli

 * CREATEDATE ��2003-10-16

 * MODIFYLIST ��   Name       Date            Reason/Contents

 *          ------------------------------------------------------

 *

 ************************************************************************************/



/**

 * ��������У��

 * <p>Copyright: Copyright (c) 2003</p>

 * <p>Company: Sinosoft</p>

 * @author zhouxianli

 * @version 1.0

 */



 /**

    �ṹΪ �ֶ������ֶ����������ͣ��Ƿ�����Ϊ��

           4��Ǳ����

 */



var schemaColumns = new Array(); //�洢�ֶνṹ������

var mulLineDataFields = new Array(); //��ʱ�洢Form�ж���Data�ֶε�����



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

 * �Ƿ��Ƕ���������

 * @param field Ԫ��

 * @return ���򷵻�true,���򷵻�false

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

 * ��֤����������(����struts����Ӧ����)

 * @param form form

 * @return �Ƿ���true,�񷵻�false

 */

function validateRequired(form) {

        var bValid = true;

    var focusField = null;

    var i = 0;

    var field = null;

    var schemaColumn = null;

    var fields = new Array(); //���schemaColumns

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

            //�������е�һ��

            if((count>1 && getElementOrder(field)==1) ||

                (count==1 && isMulLineField(field))){

                continue;

            }



            schemaColumn = getSchemaColumn(field.name);



            if(schemaColumn==null){

                log("�ֶ�" + field.name + "û����ValidateData.js�ж���");

                continue;

            }

            //��������Ϊ�յ�������

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

            message = message + fields[i].desc + "������Ϊ��\n";

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

 * ����Ƿ��ǺϷ���varchar�����ֶ�

 * @param form form

 * @param schemaColumn schemaColumn

 * @return �Ƿ���true,�񷵻�false

 */

function isValidateVarcharField(field,schemaColumn){

    var maxLength  = 0;

    var minSpace  = 0;

    var temp = schemaColumn.dataType;

    var start = schemaColumn.dataType.indexOf("(",7);  //"("��λ��

    var middle = schemaColumn.dataType.indexOf(",",start); //","��λ��

    var end = schemaColumn.dataType.indexOf(")",start); //")"��λ��

    if(middle==-1){ //û��������Сֵ

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

 * ����Ƿ��ǺϷ���char�����ֶ�

 * @param form form

 * @param schemaColumn schemaColumn

 * @return �Ƿ���true,�񷵻�false

 */

function isValidateCharField(field,schemaColumn){

    var maxLength  = 0;

    var temp = schemaColumn.dataType;

    var start = schemaColumn.dataType.indexOf("(",4);//"("��λ��

    var end = schemaColumn.dataType.indexOf(")",start);//")"��λ��

    maxLength=parseInt(schemaColumn.dataType.substring(start+1,end));



    if (getByteLength(field.value) > maxLength) {

        return false;

    }

    return true;

}



/**

 * ����Ƿ��ǺϷ���Integer�����ֶ�

 * @param form form

 * @param schemaColumn schemaColumn

 * @return �Ƿ���true,�񷵻�false

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

 * ����Ƿ��ǺϷ���SmallInt�����ֶ�

 * @param form form

 * @param schemaColumn schemaColumn

 * @return �Ƿ���true,�񷵻�false

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

 * ����Ƿ���decimal�����ֶ�

 * @param form form

 * @param schemaColumn schemaColumn

 * @return �Ƿ���true,�񷵻�false

 */

function isValidateDecimalField(field,schemaColumn){

    var length  = 0;

    var scale  = 0;

    var temp = schemaColumn.dataType;

    var start = schemaColumn.dataType.indexOf("(");  //"("��λ��

    var middle = schemaColumn.dataType.indexOf(","); //","��λ��

    var end = schemaColumn.dataType.indexOf(")"); //")"��λ��

    if(middle==-1){ //û��������Сֵ

        length = parseInt(schemaColumn.dataType.substring(start+1,end));

        scale = 0;

    }

    else{

        length = parseInt(schemaColumn.dataType.substring(start+1,middle));

        scale = parseInt(schemaColumn.dataType.substring(middle+1,end));

    }

    field.value = trim(field.value);//ȥ��������ͷβ�ո�

    var strValue=field.value;

     if(strValue==""){

        strValue = "0";

    }

    field.value = strValue;



    if(regExpTest(strValue,/^[+|\-]?\d*[.]?\d*/g)==false){

        return false;

    }

    //��龫��

    middle = strValue.indexOf("."); //"."��λ��

    if(middle>-1){

        if(scale<strValue.substr(middle+1).length){

            return false;

        }

    }



    //�����󳤶�

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

 * ����Ƿ��ǺϷ���date�����ֶ�

 * @param form form

 * @param schemaColumn schemaColumn

 * @return �Ƿ���true,�񷵻�false

 */

function isValidateDateField(field,schemaColumn)

{

    field.value = trim(field.value);

    var strValue = field.value;

    //�����ȫ����,��ת��Ϊ����������

    if (regExpTest(strValue,/\d+/g)==true){

        //ֻ����YYYYMMDD��ʽ

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

 * ��֤�ֶ�����

 * @param form form

 * @return �Ƿ���true,�񷵻�false

 */

function validateType(form) {

    var bValid = true;

    var bResult = true;

    var focusField = null;

    var i = 0;

    var field = null;

    var schemaColumn = null;

    var fields = new Array(); //���schemaColumns

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



            //�������е�һ��

            if((count>1 && getElementOrder(field)==1) ||

                (count==1 && isMulLineField(field))){

                continue;

            }



            schemaColumn = getSchemaColumn(field.name);

            if(schemaColumn==null){

                log("�ֶ�" + field.name + "û����ValidateData.js�ж���");

                continue;

            }

            property = schemaColumn.dataType.toLowerCase();



            if (property=="text"){ //text��������У��

                bResult = true;

            }

            else if (property==("byte")){//byte��������У��

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

                log("����"+field.name+"����Ϊ" +property + ".��validateType��û�д���");

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

            var start = 0;  //"("��λ��

            var middle = 0; //","��λ��

            var end = 0;    //")"��λ��

            field=fields[i];



            start = field.dataType.indexOf("(");  //"("��λ��

            middle = field.dataType.indexOf(","); //","��λ��

            end = field.dataType.indexOf(")"); //")"��λ��

            if(middle==-1){ //û��������Сֵ

                maxLength = parseInt(field.dataType.substring(start+1,end));

                minSpace = 0;

            }

            else{

                maxLength = parseInt(field.dataType.substring(start+1,middle));

                minSpace = parseInt(field.dataType.substring(middle+1,end));

            }



            property = field.dataType.toLowerCase();

            if (property=="integer"){

                typeDesc = "����";

//                typeDesc = typeDesc + "(���Ϊ" + MAX_INTEGER + ",��СΪ" + MIN_INTEGER + ")";

            }

            else if (property=="smallint"){

                typeDesc = "С����";

//                typeDesc = typeDesc + "(���Ϊ" + MAX_SMALLINT + ",��СΪ" + MIN_SMALLINT + ")";

            }

            else if (property=="date"){

                typeDesc = "����(��ʽΪYYYY" + DATE_DELIMITER + "MM" + DATE_DELIMITER + "DD)";

            }

            else if(property.indexOf("varchar")!=-1){

                typeDesc = "�ַ���";

                typeDesc = typeDesc + "(��󳤶�Ϊ" + maxLength ;

                if (minSpace>0) {

                    typeDesc = typeDesc + ",��С����Ϊ" + minSpace ;

                }

                typeDesc = typeDesc + ")"

            }

            else if (property.indexOf("char")!=-1){

                typeDesc = "�ַ���";

                typeDesc = typeDesc + "(��󳤶�Ϊ" + maxLength ;

                if (minSpace>0) {

                    typeDesc = typeDesc + ",��С����Ϊ" + minSpace ;

                }

                typeDesc = typeDesc + ")"

            }

            else if (property.indexOf("dec")!=-1||property.indexOf("float")!=-1 ){

                typeDesc = "��ֵ";

                typeDesc = typeDesc + "(��Чλ��Ϊ" + maxLength ;

                if (minSpace>0) {

                    typeDesc = typeDesc + ",����Ϊ" + minSpace ;

                }

                typeDesc = typeDesc + ")"

            }

            message = message + "\"" + field.desc + "\"������" + typeDesc + "\n";

        }



        focusField.focus();

        alert(message);

    }

    return bValid;

}







////���ʱ��������

//function checkTime(field)

//{

//  field.value = trim(field.value);

//  var strValue = field.value;

//  var desc = field.description;

//  //���description���Բ����ڣ�����name����

//  if(desc==null)

//    desc = field.name;

//

//  if(isNumeric(strValue))

//  {

////  	errorMessage("������Ϸ���" + desc +"\n����Ϊʱ�䣬��ʽΪhh:mm:ss");

//  	errorMessage("������Ϸ���ʱ�䣬��ʽΪhh:mm:ss");

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

////	    errorMessage("������Ϸ���" + desc +"\n����Ϊʱ�䣬��ʽΪhh:mm:ss");

//	    errorMessage("������Ϸ���ʱ�䣬��ʽΪhh:mm:ss");

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

////    errorMessage("������Ϸ���" + desc +"\n����Ϊʱ�䣬��ʽΪhh:mm:ss");

//    errorMessage("������Ϸ���ʱ�䣬��ʽΪhh:mm:ss");

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

////���������Ƿ������ڵ�У�飬splitChar����ȱʡΪ"/"

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

////���������Ƿ���ʱ���У�飬splitChar����ȱʡΪ":"

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

////���������Ƿ������ֵ�У��

//function isNumeric(strValue)

//{

//  var result = regExpTest(strValue,/\d*[.]?\d*/g);

//  return result;

//}

//

////���������Ƿ���������У��,��ֻ�����ַ�0123456789

//function isInteger(strValue)

//{

//  var result = regExpTest(strValue,/\d+/g);

//  return result;

//}



/**

* Ĭ�ϵ�У��Form�ķ���

* @return ͨ��true/��ͨ��false

*/

function validateForm(form,mulLineTableIdList)

{

   if(bCancel==true) {

     return true;

   }

   if(!confirm("ȷ��Ҫ������Ϣ��")){

     return false;

   }



   initMulLineFields(mulLineTableIdList);



   return validateRequired(form) && validateType(form);

}



function getDataTypeMaxLength(dataType){

    var maxLength  = 0;

    var minSpace  = 0;

    var start = 0;  //"("��λ��

    var middle = 0; //","��λ��

    var end = 0;    //")"��λ��



    start = dataType.indexOf("(");  //"("��λ��

    middle = dataType.indexOf(","); //","��λ��

    end = dataType.indexOf(")"); //")"��λ��

    //����"("

    if(start>0){

        if(middle==-1){ //û��������Сֵ

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

 * ��ʼ������ҳ��ķ���

 * �������maxLenght����.

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

                log("�ֶ�" + element.name + "û����ValidateData.js�ж���");

                continue;

            }



            //����maxLength

            if (element.type == 'text' ||

                element.type == 'textarea' ||

                element.type == 'password') {



                maxLength=getDataTypeMaxLength(schemaColumn.dataType);

                if(maxLength>0){

                    element.maxLength=maxLength;

                }

            }

            //���onkeypress�����¼�

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

 * �Ƿ��ǺϷ���decimal��������,��("0-9",".","+",'-")

 * �Ƿ���true,�񷵻�false.

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

 * �Ƿ��ǺϷ���integer��������,��("0-9","+",'-")

 * �Ƿ���true,�񷵻�false.

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

 * �Ƿ��ǺϷ���date��������,��("0-9","/")

 * �Ƿ���true,�񷵻�false.

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

        log("�ֶ�" + this.name + "û����ValidateData.js�ж���");

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

            log("����"+field.name+"����Ϊ" +property + ".��keypressHandler��û�д���");

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



