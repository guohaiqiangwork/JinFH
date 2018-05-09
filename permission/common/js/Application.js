/****************************************************************************

 * DESC       ��Ӧ�ü�JavaScript����--Application Project����(����IE5/NN6)

 * AUTHOR     ��zhouxianli

 * CREATEDATE ��2003-05-04

 * MODIFYLIST ��   Name       Date            Reason/Contents

 *          ------------------------------------------------------

 *

 ************************************************************************************/

setVerbose(false);



/**

 * ���������

 * @param field Ԫ��

 * @param tableName tableName

 * @return ��

 */

function hideSubPage(field,tableName)

{

  var order = parseInt(getElementOrder(field));

  var obj = document.getElementsByName(tableName)[order-1];

  obj.style.display ='none';

}



/**

 * ��ʾ�����

 * @param field Ԫ��

 * @param tableName tableName

 * @param leftMove ��������ƫ������Ĭ��ֵ0

 * @return ��

 */

function showSubPage(field,tableName,evt,leftMove)

{

    var order = parseInt(getElementOrder(field));

    var obj = document.getElementsByName(tableName)[order-1];

    var ex = evt.clientX+document.body.scrollLeft;

    var ey = evt.clientY+document.body.scrollTop;

    var intLeftMove = (leftMove==null?0:leftMove);



    strTemp = field.name;

    var strCompare = "Context"; //�Ƚ��ַ������������󼸸��ַ���Context

    if(strTemp.indexOf(strCompare)>-1)

    {

        strTemp = strTemp.substring(strTemp.length - strCompare.length);

    }

    else

    {

        strTemp = "";

    }



    if(strTemp==strCompare)

    {

        ex = ex - 520;

    }



    if(strTemp==strCompare)

    {

        ex = ex - 520;

    }

    ex = ex - intLeftMove;



    obj.style.display ='';

    obj.style.left=ex;

    obj.style.top=ey;

}





//��ʾ������Ϣ

function errorMessage(strErrMsg)

{

  var strMsg = "ϵͳ��Ϣ:\n\n" + strErrMsg;

  alert(strMsg);

}



/**

* Ĭ�ϵ�У��Form�ķ���

* @return ͨ��true/��ͨ��false

*/

function validateQueryForm(form)

{

   if(bCancel==true) {

     return true;

   }

   return validateType(form) && validateDate(form);

}



function customBlurHandler(field){

	return true;

}



/**

*���в�ѯ�õ����������ھ����������Ƿ����ǰ������������ʱ���õ�

*author��zhaijq ���������ұ��ˡ�

*/

function disabledEndDate(field)

  {

      var index = getElementIndex(field);

      if (fm.elements[index].value==':')

      {

          fm.elements[index+2].disabled = false;

      }

      else

      {

          fm.elements[index+2].disabled = true;

      }

  }



  /**

   * ��Double��ֵ��ʽ��Ϊ##,##0.00��ʽ

   * @param num��Double��ֵ

   * @throws Exception

   */

function formatNum(num,len)

{

	if (len == null)

	{

		len = 2;

	}

	if (num == 0)

	{

		if (len == 0)

		{

			strValue = "0";

		}

		else

		{

		    strValue = "0."+getColLengthNum(len);

		}

		return strValue;

	}

	var strValue  = "";

	var tempValue = "";

	var pointPos  = 0;

	tempValue = num.toString();

	pointPos  = tempValue.indexOf(".");

	if (pointPos < 0)

	{

		tempValue = num.toString()+"."+getColLengthNum(len);

		pointPos  = tempValue.indexOf(".");

	}else if ((tempValue.length - pointPos) > len + 1)

	{

		tempValue = tempValue.substring(pointPos+len+1,pointPos+len+2);

		if (parseFloat(tempValue) >=5)

		{

			tempValue = "0."+getColLengthNum(len).substring(0,len-1)+"1";
			//modify by wangxiaolei begin
			if(num>=0){
				num = num + parseFloat(tempValue);
			}else {
				num = num - parseFloat(tempValue);
			}
			//modify by wangxiaolei end
		}

		tempValue = num.toString();

	    tempValue = tempValue.substring(0,pointPos+len+1);
	    
	    //modify ITS-2013053634 bug begin
	    if ((tempValue.length - pointPos) < len + 1){
	    	tempValue = tempValue +getColLengthNum(len - tempValue.length + pointPos+1);
	    }
	    //modify ITS-2013053634 bug end
	    
	}else if ((tempValue.length - pointPos) < len + 1)

	{

		tempValue = num.toString()+getColLengthNum(len - tempValue.length + pointPos+1);

	}

	strValue = tempValue.substring(pointPos,pointPos+len + 1);

	for (var i=1;i<=tempValue.length - len - 1;i++)

	{

		var j = i/3;

		if (j.toString().indexOf(".") < 0 && i != tempValue.length - len - 1)

		{

			strValue = ","+tempValue.substring(pointPos-i,pointPos-i+1)+strValue;

		}

		else

		{

			strValue = tempValue.substring(pointPos-i,pointPos-i+1)+strValue;

		}

	}

	if (len == 0)

	{

		strValue = strValue.substring(0,strValue.length - 1);

	}

	if (strValue.substring(0,1) == "-")

	{

		if (strValue.substring(1,2) == ",")

		{

			strValue = "-"+strValue.substring(2);

		}

	}

	return strValue;

}





  /**

   * ����С��λ����ȡ�ø�ʽ���ַ���β������

   * @param length С��λ����

   * @throws Exception

   */

function getColLengthNum(len)

{

	var num = "";

	for (var i = 0;i<len;i++)

	{

		num += "0";

	}

	return num;

}



/**

* ��ȡ��������ַ������ȣ������ĺ��ֵĳ��Ȱ���ռ��λ�ַ�ת����

* @param field������

* @param field����ֵ��������

* @throws Exception

*/

function checkLength(field,description)

{

  var str;

  var count  = 0;

  var value  = field.value;

  var length = field.maxLength;

  var desc   = description;

  //���description���Բ����ڣ�����name����

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

    errorMessage("^Ϊϵͳ�����ַ������������룡");

    field.focus();

    field.select();

    return false;

  }



  //���maxlength���Բ����ڣ��򷵻�

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

    errorMessage(desc + "��������ݳ�����\n" + desc + "����󳤶�Ϊ" + length + "��Ӣ���ַ���\n���������룡");

    field.focus();

    field.select();

    return false;

  }

  return true;

}

 //������Form�е�ͬ��Ԫ�أ�û���򷵻�0, frmĬ��Ϊ��ǰҳ���fm

function getRowsCount(PageCode)

{
  var oTBODY   = document.all(PageCode).tBodies.item(0);

  var intCount = oTBODY.rows.length;

  return intCount;

}



///�ڴ�����ŵ�form������ region Ϊ�������fm.serialNo

function serialInsertRow(region,field)

{

	insertRow(field);

  var i = 0;


   for(i=1; i<=getRowsCount(field); i++)

  {

      vNewNo = "" + i;

      eval(region)[i].value = vNewNo;

  }

}



function serialDeleteRow(st,region,field)

{

	deleteRow(region,field);

	var i = 0;

	    for(i=1; i<=getRowsCount(field); i++)

	{

	    vNewNo = "" + i;

	    st[i].value = vNewNo;

	}

}



//�������������ǧ�ֺ�ȥ��

function formFieldFormat(fm){

	for(i=0;i<fm.elements.length;i++)

    {

        var field = fm.elements[i];

        if (field.type == 'text' ||

            field.type == 'password' ||

            field.type == 'textarea') {



            if(field.value==""){

                continue;

            }

            var strValue = trim(field.value);

			var dblValue = formatNumberToDouble(strValue);

			if (dblValue != 0) {field.value = dblValue;}

        }

    }

}



//*********************************��UICommon���ƹ����ķ���

//�������������

function checkFullDate(field)

{

  if(isEmptyField(field))

    return true;



  field.value = trim(field.value);

  var strValue = field.value;

  var desc   = field.description;

  //���description���Բ����ڣ�����name����

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

    errorMessage("������Ϸ���" + desc +"\n����Ϊ���ڣ���ʽΪYYYYMMDD  ����YYYY-MM-DD");

    field.value="";

    field.focus();

    field.select();

    return false;

  }



  return true;

}



//���������Ƿ������ֵ�У��

function isNumeric(strValue)

{

  var result = regExpTest(strValue,/\d*[.]?\d*/g);

  return result;

}

//���������Ƿ������ֵ�У��(��������)

function isNumericWithMinus(strValue)

{

  var result = regExpTest(strValue,/[-]{0,1}\d*[.]?\d*/g);

  return result;

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



//���������Ƿ���������У��,��ֻ�����ַ�0123456789

function isInteger(strValue)

{

  var result = regExpTest(strValue,/\d+/g);

  return result;

}



//�������򰴼�ʱ������У��

function pressFullDate(e)

{

  var value = String.fromCharCode(e.keyCode);

  if((value>=0 && value<=9) || value=="/" || value=="-")

    return true;

  else

    return false;

}



//�뿪��ʱ������У��Decimal

function checkDecimal(field,p,s,MinValue,MaxValue)

{


  if(isEmptyField(field))

    return true;

  field.value = trim(field.value);

  var strValue=formatNumberToString(field.value);

  if(strValue=="")

    strValue = "0";



  var desc   = field.description;

  //���description���Բ����ڣ�����name����

  if(desc==null)

    desc = field.name;

  if(!isNumericWithMinus(strValue))

  {

    errorMessage("������Ϸ�������");

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

    errorMessage("������Ϸ���" + desc +"\n����Ϊ����,����λ�Ϊ" + (p-s) + ",С��λ�Ϊ" + s);

    field.focus();

    field.select();

    return false;

  }

  var value = parseFloat(strValue);

  var MaxValue = MaxValue.toString();

  var MinValue = MinValue.toString();

  if(MaxValue!=null && MinValue!=null)

  {

    MinValue = parseFloat(MinValue);

    MaxValue = parseFloat(MaxValue);

    if(isNaN(value) || value>MaxValue || value<MinValue)

    {

      errorMessage("������Ϸ���" + desc +"\n����Ϊ����,��СֵΪ" + MinValue + ",���ֵΪ" +MaxValue);

      field.focus();

      field.select();

      return false;

    }

  }

  var dblValue = formatNumberToDouble(trim(field.value));

  field.value = formatNum(dblValue,s);

  return true;

}



function getFormatedNumber(field)

{

 var strValue = trim(field.value);

 var dblValue = formatNumberToDouble(strValue);

 var strValue = formatNum(dblValue);

 field.value = strValue;

}

//////////////////////////////////////////////////////////

////////////////////    Run   ////////////////////////////

//////////////////////////////////////////////////////////



//��������������

//��ֵ,����

function round(number,precision)

{

  if(isNaN(number))

    number = 0;

  var prec = Math.pow(10,precision);

  var result = Math.round( number * prec) ;

  result = result/prec;

  return result;

}



function processMenuClick(title){
	//add by zhaoliang  2014-09-22 
	if('�˳�|ע��' == title){
		var question = confirm("ȷ���˳�ô��");
		if(question != "0"){
			top.location.href='http://'+window.location.hostname+':'+window.location.port+'/reins';
		}
	}
    top.fraMainCenter.rows = "100%,0%";
	top.fraTitle.setTitle(title);
}