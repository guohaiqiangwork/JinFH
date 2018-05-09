/**

 * ����JavaScript(����IE5/NN6)--ƽ̨��������ƣ���Ŀ�鲻���޸ģ��������Ը�

 * ��������������������֪ͨ�ṩ��  

 * �������û����private��ͷ,�򷽷��ǹ�����,�ұ�֤������.

 * ������:2004-08-11

 */

/** ȫ�ֱ���bCancel; */ 

var bCancel = false;

var DATE_DELIMITER = "-";

var DB_INT_LENGTH = 64; //���ݿ�λ��,���������ȣ�Ĭ��Ϊ64λ

var MAX_INTEGER  = Math.pow(2,DB_INT_LENGTH-1) - 1;

var MIN_INTEGER  = -Math.pow(2,DB_INT_LENGTH-1);

var MAX_SMALLINT = Math.pow(2,DB_INT_LENGTH/4-1) - 1;

var MIN_SMALLINT = -Math.pow(2,DB_INT_LENGTH/4-1);

var VERBOSE = false;//��ʾ������ϸ�����������п��Ե���setVerbose(true)



/**

 * �������ڷָ����Ĭ��Ϊ'/'

 * @param delimiter ���ڷָ��

 */

function setDateDelimiter(delimiter){

    DATE_DELIMITER = delimiter;

}

/**

 * �������ݿ��������ȣ�Ĭ��Ϊ64

 * @param len ��������

 */

function setDBIntLength(len){

    DB_INT_LENGTH = len;

    MAX_INTEGER  = Math.pow(2,DB_INT_LENGTH-1) - 1;

    MIN_INTEGER  = -Math.pow(2,DB_INT_LENGTH-1);

    MAX_SMALLINT = Math.pow(2,DB_INT_LENGTH/4-1) - 1;

    MIN_SMALLINT = -Math.pow(2,DB_INT_LENGTH/4-1);

}



/**

 * �����Ƿ���ʾ��ϸ��Ĭ��Ϊ����ʾ

 * @param verbose ���ڷָ��

 */

function setVerbose(verbose){

    VERBOSE = verbose;

}



/**

 * ����Ƿ���ʾ��ϸ

 * @return �Ƿ���ʾ��ϸ

 */

function isVerbose(){

    return VERBOSE;

}



/**

 * ��ӡ��־��Ϣ

 */

function log(value){

    if(isVerbose()){

        window.status=value;

    }

}



/**

 * �жϿͻ���������Ƿ�ΪNetscape

 * @return �ͻ��������ΪNetscape�򷵻�true,���򷵻�false;

 */

function isNetscape(){

    if(navigator.appName=="Netscape"){

        return true;

    }else{

        return false;

    }

}



/**

 * �õ�����element��Document�е�name��ͬ��elements�е�˳��(��1��ʼ)

 * @param field element

 * @return ����element��Document�е�name��ͬ��elements�е�˳��(��1��ʼ)

 */

function getElementOrder(field){

    var i = 0;

    var order = 0;

    var elements = document.getElementsByName(field.name);

    for(i=0;i<elements.length;i++){

        order++;

        if(elements[i]==field){

            break;

        }

    }

    return order;

}



/**

 * ����element�Ƿ���Document�е�name��ͬ��elements�еĵ�0�� 

 * @param field element

 * @return �Ƿ���true�����򷵻�false

 */

function isFirstElement(field){

    var elements = document.getElementsByName(field.name);

    if(elements[0]==field){

    	return true;

    }

    else{

    	return false;

    }

}



/**

 * ������Document�е�element��name���Ե��紫��ֵ��element������û���򷵻�0

 * @param fieldName Ԫ������

 * @return ��Document�е�element��name���Ե��紫��ֵ��element����

 */

function getElementCount(fieldName){

    var count = 0;

    count = document.getElementsByName(fieldName).length;

    return count;

}



/**

 * �õ��ַ������ֽڳ���

 * @param value �ַ���

 * @return �ַ������ֽڳ���

 */

function getByteLength(value){

    var str;

    var count  = 0;

    

    for(var i=0;i<value.length;i++)  {

        str = escape(value.charAt(i));

        if(str.length==6){

            count = count + 2;

        }else{

            count = count + 1;

        }

    }



  return count;

}



/**

 * �õ�Table������Ԫ��

 * @param tableId ������

 * @return table������Ԫ��

 */

function getTableElements(tableId){

    var i = 0;

    var elements=new Array();

    var tempElements = null;

    var tbody;

    var index=0;

    var tbodies = document.getElementById(tableId).tBodies;

    for(i=0;i<tbodies.length;i++){

        tbody=tbodies.item(i);

        tempElements=tbody.getElementsByTagName("INPUT");        //����INPUT��



        for(i=0;i<tempElements.length;i++){

            elements[index++]=tempElements[i];

        }



        tempElements=tbody.getElementsByTagName("SELECT");     //����SELECT��

        for(i=0;i<tempElements.length;i++){

            elements[index++]=tempElements[i];

        }



        tempElements=tbody.getElementsByTagName("TEXTAREA"); //����TEXTAREA��

        for(i=0;i<tempElements.length;i++){

            elements[index++]=tempElements[i];

        }

    }

    return elements;

}



/**

 * ȥ���ַ���ͷ�ո�

 * @param value �����ַ���

 * @return ȥ��ͷ�ո����ַ���

 */

function leftTrim(value){

    var re =/^\s*/;

    if(value==null){

        return null;

    }

    return value.replace(re,"");

}



/**

 * ȥ���ַ���β�ո�

 * @param value �����ַ���

 * @return ȥ��β�ո����ַ���

 */

function rightTrim(value){

    var re =/\s*$/;

    if(value==null){

        return null;

    }

    return value.replace(re,"");

}



/**

 * ȥ���ַ���ͷβ�ո�

 * @param value �����ַ���

 * @return ȥ��ͷβ�ո����ַ���

 */

function trim(value){

    return leftTrim(rightTrim(value));

}





/**

 * ������ʽ����

 * @param source �����ַ���

 * @param re ������ʽ

 * @return ������ʽ���Խ��

 */

function regExpTest(resource,re){

    var result = false;



    if(resource==null || resource==""){

        return false;

    }

    if(resource==re.exec(resource)){

        result = true;

    }

    return result;

}



/**

 * �滻�ַ�������

 * @param str ԭ��

 * @param strFind ���Ҵ�

 * @param strReplaceWith �滻��

 * @return �����滻����ַ���

 */

function replace(str,strFind,strReplaceWith){

    var strReturn;

    var re = new RegExp(strFind,"g");

    if(str==null){

        return null;

    }

    strReturn = str.replace(re,strReplaceWith);

    return strReturn;

}



/**

 * ����������Ƿ�Ϊ��

 * @param field ������

 * @return ����������ֵΪnull��գ��򷵻�true�����򷵻�false

 */

function isEmptyField(field){

    if(field.value==null || trim(field.value)==""){

        return true;

    }

    return false;

}



//Note:2004-08-05  ���������������ٱ���Ŀ���ṩ���ȴ�ʵ������ 



/**

   * ��ǧ�ֺŷָ���ַ���ת��Ϊ��Ӧ�ַ���

   * @param strValue����ʽ���ַ���

   * @return ȥ�����ŵ��ַ���

   */

function formatNumberToString(strValue)

{   

	strValue = trim(strValue);

	strValue = replace(strValue,",","");

	return strValue;

}



  /**

   * ��ǧ�ֺŷָ���ַ���ת��Ϊ��Ӧdouble����ֵ

   * @param strValue����ʽ���ַ���

   * @return ��Ӧdouble����ֵ

   */

function formatNumberToDouble(strValue)

{ 

	var dblValue = 0;

	strValue = formatNumberToString(strValue);

	dblValue = parseFloat(strValue);

	if (isNaN(dblValue))

	{

		dblValue = 0;

	}

	return dblValue;

}



/**

  * This code fixes: 

  * the 2.4999999999999999999 when you really expected 2.5 BUG and...

  * the 3.0000000000000000001 when you were expecting 3 BUG.

  * I can't believe someone would release a math library that works this way.

  *

  * You will probably want to change this to do what you need but 

  * I'm sure you get the idea.

  * @param cellStr 

  * @return �޸�����ַ���

  */

function fixNumber(cellStr)

{

	if(parseFloat(cellStr) == 0)

		return '0';

  if(cellStr.indexOf('.')==-1)

    return cellStr;	



	var x = parseFloat(cellStr);

	x += (parseFloat(cellStr) < 0) ? -0.000000005 : 0.000000005;

	

	// Chop the string to 4 decimal places.

	cellStr = "" + x;

	cellStr = cellStr.substring(0, 5 + cellStr.indexOf('.'));

		

	// Remove trailing zeros beyond the decimal point.

	cellStrArr = cellStr.split("");

		

	for(k=cellStrArr.length-1; k > 0 && cellStrArr[k] == '0'; --k)

		cellStrArr[k] = 'X';

		

	cellStr = "";

	for(k=0; k<cellStrArr.length && cellStrArr[k] != 'X'; ++k)

		cellStr += cellStrArr[k];

	

	return cellStr;

}



 