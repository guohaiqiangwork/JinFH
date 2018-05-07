/**

 * 公用JavaScript(兼容IE5/NN6)--平台中心组控制，项目组不得修改，否则后果自负

 * 如果发现有问题或需求，请通知提供者  

 * 如果方法没有用private开头,则方法是公开的,且保证向后兼容.

 * 最后更新:2004-08-11

 */

/** 全局变量bCancel; */ 

var bCancel = false;

var DATE_DELIMITER = "-";

var DB_INT_LENGTH = 64; //数据库位数,即整数长度，默认为64位

var MAX_INTEGER  = Math.pow(2,DB_INT_LENGTH-1) - 1;

var MIN_INTEGER  = -Math.pow(2,DB_INT_LENGTH-1);

var MAX_SMALLINT = Math.pow(2,DB_INT_LENGTH/4-1) - 1;

var MIN_SMALLINT = -Math.pow(2,DB_INT_LENGTH/4-1);

var VERBOSE = false;//显示所有明细，开发环境中可以调用setVerbose(true)



/**

 * 设置日期分割符，默认为'/'

 * @param delimiter 日期分割符

 */

function setDateDelimiter(delimiter){

    DATE_DELIMITER = delimiter;

}

/**

 * 设置数据库整数长度，默认为64

 * @param len 整数长度

 */

function setDBIntLength(len){

    DB_INT_LENGTH = len;

    MAX_INTEGER  = Math.pow(2,DB_INT_LENGTH-1) - 1;

    MIN_INTEGER  = -Math.pow(2,DB_INT_LENGTH-1);

    MAX_SMALLINT = Math.pow(2,DB_INT_LENGTH/4-1) - 1;

    MIN_SMALLINT = -Math.pow(2,DB_INT_LENGTH/4-1);

}



/**

 * 设置是否显示明细，默认为不显示

 * @param verbose 日期分割符

 */

function setVerbose(verbose){

    VERBOSE = verbose;

}



/**

 * 检查是否显示明细

 * @return 是否显示明细

 */

function isVerbose(){

    return VERBOSE;

}



/**

 * 打印日志信息

 */

function log(value){

    if(isVerbose()){

        window.status=value;

    }

}



/**

 * 判断客户端浏览器是否为Netscape

 * @return 客户端浏览器为Netscape则返回true,否则返回false;

 */

function isNetscape(){

    if(navigator.appName=="Netscape"){

        return true;

    }else{

        return false;

    }

}



/**

 * 得到传入element在Document中的name相同的elements中的顺序(从1开始)

 * @param field element

 * @return 传入element在Document中的name相同的elements中的顺序(从1开始)

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

 * 传入element是否是Document中的name相同的elements中的第0个 

 * @param field element

 * @return 是返回true，否则返回false

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

 * 查找在Document中的element的name属性等如传入值的element个数，没有则返回0

 * @param fieldName 元素名称

 * @return 在Document中的element的name属性等如传入值的element个数

 */

function getElementCount(fieldName){

    var count = 0;

    count = document.getElementsByName(fieldName).length;

    return count;

}



/**

 * 得到字符串的字节长度

 * @param value 字符串

 * @return 字符串的字节长度

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

 * 得到Table的所有元素

 * @param tableId 表名称

 * @return table的所有元素

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

        tempElements=tbody.getElementsByTagName("INPUT");        //加入INPUT域



        for(i=0;i<tempElements.length;i++){

            elements[index++]=tempElements[i];

        }



        tempElements=tbody.getElementsByTagName("SELECT");     //加入SELECT域

        for(i=0;i<tempElements.length;i++){

            elements[index++]=tempElements[i];

        }



        tempElements=tbody.getElementsByTagName("TEXTAREA"); //加入TEXTAREA域

        for(i=0;i<tempElements.length;i++){

            elements[index++]=tempElements[i];

        }

    }

    return elements;

}



/**

 * 去掉字符串头空格

 * @param value 传人字符串

 * @return 去掉头空格后的字符串

 */

function leftTrim(value){

    var re =/^\s*/;

    if(value==null){

        return null;

    }

    return value.replace(re,"");

}



/**

 * 去掉字符串尾空格

 * @param value 传人字符串

 * @return 去掉尾空格后的字符串

 */

function rightTrim(value){

    var re =/\s*$/;

    if(value==null){

        return null;

    }

    return value.replace(re,"");

}



/**

 * 去掉字符串头尾空格

 * @param value 传人字符串

 * @return 去掉头尾空格后的字符串

 */

function trim(value){

    return leftTrim(rightTrim(value));

}





/**

 * 正则表达式测试

 * @param source 传人字符串

 * @param re 正则表达式

 * @return 正则表达式测试结果

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

 * 替换字符串函数

 * @param str 原串

 * @param strFind 查找串

 * @param strReplaceWith 替换串

 * @return 返回替换后的字符串

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

 * 检查输入域是否为空

 * @param field 输入域

 * @return 如果输入域的值为null或空，则返回true，否则返回false

 */

function isEmptyField(field){

    if(field.value==null || trim(field.value)==""){

        return true;

    }

    return false;

}



//Note:2004-08-05  以下三个方法由再保项目组提供，等待实践检验 



/**

   * 将千分号分割的字符串转换为对应字符串

   * @param strValue：格式化字符串

   * @return 去掉逗号的字符串

   */

function formatNumberToString(strValue)

{   

	strValue = trim(strValue);

	strValue = replace(strValue,",","");

	return strValue;

}



  /**

   * 将千分号分割的字符串转换为对应double型数值

   * @param strValue：格式化字符串

   * @return 对应double型数值

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

  * @return 修复后的字符串

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



 