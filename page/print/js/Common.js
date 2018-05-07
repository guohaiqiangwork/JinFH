/**
 * ����JavaScript(����IE5/NN6)--ƽ̨��������ƣ���Ŀ�鲻���޸ģ��������Ը�
 * ��������������������֪ͨ�ṩ��
 * �������û����private��ͷ,�򷽷��ǹ�����,�ұ�֤������.
 * ���¼ӵķ����������
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
var FIELD_SEPARATOR = "_FIELD_SEPARATOR_";   //�ֶ�֮��ķָ��
var GROUP_SEPARATOR = "_GROUP_SEPARATOR_";     //һ�����֮��ķָ��

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
    var elementsCount = elements.length;
    for(i=0;i<elementsCount;i++){
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
    var valueCount = value.length;
    for(var i=0;i<valueCount;i++)  {
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
    var tbodiesCount = tbodies.length;
    var tempElementsCount = 0;
    for(i=0;i<tbodiesCount;i++){
        tbody=tbodies.item(i);
        tempElements=tbody.getElementsByTagName("INPUT");        //����INPUT��
        tempElementsCount = tempElements.length;
        for(var j=0;j<tempElementsCount;j++){
            elements[index++]=tempElements[j];
        }

        tempElements=tbody.getElementsByTagName("SELECT");     //����SELECT��
        tempElementsCount = tempElements.length;
        for(var j=0;j<tempElementsCount;j++){
            elements[index++]=tempElements[j];
        }

        tempElements=tbody.getElementsByTagName("TEXTAREA"); //����TEXTAREA��
        tempElementsCount = tempElements.length;
        for(var j=0;j<tempElementsCount;j++){
            elements[index++]=tempElements[j];
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
	if(parseFloat(cellStr) == 0){
		return '0';
	}
    if(cellStr.indexOf('.')==-1){
        return cellStr;
    }

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

/**
 * ����Ԫ�ػ�ȡ���㣬����ʧ��ʱ�������
 * @since 2004-10-28
 */
function setFocus(field){
    if (field.type != "hidden"){
        try{
            field.focus();
        }catch(E){}
    }
}

/**
 * ��ʾ��Ϣ��ʾ
 * @since 2004-10-28
 */
function showMessage(message){
    alert("ϵͳ��Ϣ:\r\n" + message);
}

/**
 * ����һ��checkbox,�����ڲ�ѯ�����ѡ������ѡ���,ͨ������onpropertychange������
 * ��:<input type=checkbox name=selectButton onpropertychange="boundCheckBox(this,fm.checkboxSelect)" >
 * @since 2004-11-22
 */
function boundCheckBox(controlField, checkBoxField){
    var count=0;
    try{
        count = checkBoxField.length;
    }catch(E){
    }
    if(isNaN(count)){
        checkBoxField.checked=controlField.checked;
    }else{
        for(var i=0;i<count;i++){
            checkBoxField[i].checked=controlField.checked;
        }
    }
}

/**
 * ����Ԫ����Form�е�˳��û���򷵻�-1
 * @since 2004-11-22
 */
function getElementIndexInForm(form,field)
{
  var intElementIndex = -1;
  var elementsCount = form.elements.length;
  for(var i=0;i<elementsCount;i++) //����fm���Ԫ��
  {
    if(form.elements[i]==field)
    {
      intElementIndex=i;
      break;
    }
  }
  return intElementIndex;
}

/**
 * ����Ԫ��ѡ�����ݣ�����ʧ��ʱ�������
 * @since 2004-11-30
 */
function setSelect(field){
    if (field.type != "hidden"){
        try{
            field.select();
        }catch(E){}
    }
}
/**
 * �Ƿ���IE6
 * @since 2004-12-07
 * @return �Ƿ���ture�����򷵻�false
 */
function isIE6(){
    if(navigator.appVersion.indexOf("MSIE 6")>-1){
        return true;
    }else{
        return false;
    }
}

/**
 * ��ֵ
 * @since 2004-12-08
 */
function bindField(source,target){
    target.value = source.value;
}

/**
 * @param str ����ַ�/�ַ���
 * @param times ������
 * @return ������ַ���
 * @since 2004-12-12
 */
function newString(str,times){
    var value="";
    for(var i=0;i<times;i++){
        value+=str;
    }
    return value;
}

/**
 * ���˴���Ķ����⣬��������ӡ
 * @param obj ����Ķ���
 * @since 2004-12-29
 */
function printExcept(obj){
    obj.style.display="none";
    window.print();
    obj.style.display="";
}

/**
 * �ύ����
 * @param form �����form����
 * @param action �����action����,ͨ��Ϊ����
 * @param target Ŀ��
 * @since 2005-03-01
 */
function postAction(form,action,target){
  var oldTarget=form.target;
  if(target!=null){
    form.target=target;
  }
  form.action=action;
  form.submit();
  if(target!=null){
    form.target=oldTarget;
  }
  return true;
}

/**
 * ���ȷ�ϣ����ύ����
 * @param form �����form����
 * @param action �����action����,ͨ��Ϊ����
 * @param message ��ʾ����Ϣ
 * @param target Ŀ��
 * @since 2005-03-02
 */
function postActionWithConfirm(form,action,message,target){
    if(confirm(message)){
        var oldTarget=form.target;
        if(target!=null){
          form.target=target;
        }
        form.action=action;
        form.submit();
        if(target!=null){
          form.target=oldTarget;
        }
        return true;
    }else{
        return false;
    }
}


/**
 * �����е�text,textarea����Ϊreadonly,select-one���ֻ������ǰѡ��
 * @param form �����form����
 * @since 2005-08-29
 */
function setFormDisabled(form){
	if(form==null){
		form = fm;
	}
	var element;
  for(var i=0;i<form.elements.length;i++)
  {
    element = form.elements[i];
    if(element.type=="hidden"){//������hidden��
    	continue;
    }
    if(element.name.indexOf("buttonControl")==0){//���Կ��ư�ť����鿴��ϸ��
    	continue;
    }
    if(element.name=="buttonSubmit"){//�����ύ��ť
    	element.style.display="none";
    	continue;
    }
    element.disabled=true;
  }
}
/**
 * ���ص�һ��ͬ��Ԫ�ص�ֵ
 * @param fieldName ������ֶ���
 * @since 2005-08-29
 */
function getFirstElementValue(fieldName){
  var field;
  if(getElementCount(fieldName)>1){
    field = document.getElementsByName(fieldName)[0];
  }else{
    field = document.getElementsByName(fieldName);
  }
  return field.value;
}

/**
 * ��һ�������ֵĴ���
 * @param urlString ��ַ
 * @param windowName ��������
 * @param optionString ѡ���ַ���
 * @since 2005-12-30
 */
function openWindow(urlString,windowName,optionString){
	var newWindow = window.open(urlString,windowName,optionString);
	try{
  	newWindow.focus();
  }catch(E){}
  return newWindow;
}

/**
 * ����ָ������EXCEL
 * @object object������
 * @since 2005-12-31
 */
 function copyObjectToExcel(object){
  var oXL;
  try{
  oXL = GetObject("","Excel.Application");
 // new ActiveXObject("Excel.Application");
  }catch(E){
    try{
      oXL = new ActiveXObject("Excel.Application");
    }catch(E2){
      showMessage("��ȷ��:\n1.������װ��Excel���\n2.Internetѡ���еİ�ȫ����\"��û�б��Ϊ��ȫ��ActiveX���г�ʼ���ͽű�����\"����Ϊ����");
      return;
    }
  }

  
 try{
	  var oWB = oXL.Workbooks.Add();
	  var oSheet = oWB.ActiveSheet;
	  //�ڴ˽�����ʽ����  
	  //�����п�  
	  oSheet.Rows(6+":"+6).RowHeight =20
	    oSheet.Rows(1+":"+1).RowHeight =20;//�����и�  
	    oSheet.Rows(2+":"+2).RowHeight =20; 
	    oSheet.Columns('A:A').ColumnWidth = 10;  
	    oSheet.Columns('B:B').ColumnWidth = 10;  
	    oSheet.Columns('C:C').ColumnWidth = 18;  
	    oSheet.Columns('D:D').ColumnWidth = 18;
	    oSheet.Columns('E:E').ColumnWidth = 10;
	    oSheet.Columns('F:F').ColumnWidth = 18;
	    oSheet.Columns('I:I').ColumnWidth = 6;
	    oSheet.Rows(1).HorizontalAlignment=1; 
	    oSheet.Rows(2).HorizontalAlignment=1; 
	    oSheet.Rows(3).HorizontalAlignment=1;


	oSheet.Columns.AutoFit;
		oSheet.Rows.AutoFit;
	  var sel=document.body.createTextRange();
	  oXL.Visible = true;
	  sel.moveToElementText(object);
	  sel.select();
	  sel.execCommand("Copy");
	  oSheet.Paste();
	  oSheet.Columns.AutoFit;
	  oSheet.Rows.AutoFit;
	  sel.moveToPoint(1,0);
	  sel.Interior.ColorIndex = 5;
  	  sel.select();
  }catch(E3){
      showMessage("��������IE��ȫ����:\"��û�б��Ϊ��ȫ��ActiveX���г�ʼ���ͽű�����\"����Ϊ����\n���Գ������⣬��ȷ���޵�����IE������ش˵���������");
      return;
  }
  
 
 // idTmr = window.setInterval("Cleanup();",1);
}

/**
 * ����ָ������б����EXCEL
 * @table ����������
 * @since 2005-12-31
 */
 function copyResultDataToExcel(table){
  var oXL;
  try{
   oXL = GetObject("","Excel.Application");
  }catch(E){
    try{
      oXL = new ActiveXObject("Excel.Application");
    }catch(E2){
      showMessage("��ȷ��:\n1.������װ��Excel���\n2.Internetѡ���еİ�ȫ����\"��û�б��Ϊ��ȫ��ActiveX���г�ʼ���ͽű�����\"����Ϊ����");
      return;
    }
  }

  var oWB = oXL.Workbooks.Add();
  var oSheet = oWB.ActiveSheet;
  var sel=document.body.createTextRange();
  sel.moveToElementText(table.tHead.rows(0));
  sel.select();
  sel.execCommand("Copy");
  oSheet.Range("A1").select();
  oSheet.Paste();
  sel.moveToElementText(table.tBodies(0));
  sel.select();
  sel.execCommand("Copy");
  oSheet.Range("A2").select();
  oSheet.Paste();
  sel.moveToPoint(1,0);
  sel.select();
  oXL.Visible = true;
}

/**
 * ����ָ������б����EXCEL(ֻ��������)
 * @table ����������
 * @since 2005-12-31
 */
 function exportResultDataToExcel(table){
  var oXL;
  try{
   oXL = GetObject("","Excel.Application");
  }catch(E){
    try{
      oXL = new ActiveXObject("Excel.Application");
    }catch(E2){
      showMessage("��ȷ��:\n1.������װ��Excel���\n2.Internetѡ���еİ�ȫ����\"��û�б��Ϊ��ȫ��ActiveX���г�ʼ���ͽű�����\"����Ϊ����");
      return;
    }
  }

  var oWB = oXL.Workbooks.Add();
  var oSheet = oWB.ActiveSheet;
  var Lenr = 1;
  var maxColumn = 0; //���Column�ţ���0��ʼ
  for (var i=0;i<Lenr;i++){
    var Lenc = table.tHead.rows(i).cells.length;
    for (j=0;j<Lenc;j++) {
      if(maxColumn<j){
        maxColumn = j;
      }
      oSheet.Columns(j+1).EntireColumn.NumberFormatLocal = "@";
      oSheet.Cells(i+1,j+1).value = table.tHead.rows(i).cells(j).innerText;
    }
  }

  Lenr = table.tBodies(0).rows.length;
  for (var i=0;i<Lenr;i++){
    var Lenc = table.tBodies(0).rows(i).cells.length;
    var j=0;
    var value = table.tBodies(0).rows(i).cells(j).innerText;
    var pos = value.indexOf(" ");
    if(pos>-1){
      value = trim(value.substring(pos));
    }
    oSheet.Cells(i+2,j+1).value = value;
    for (j=1;j<Lenc;j++) {
      oSheet.Cells(i+2,j+1).value = table.tBodies(0).rows(i).cells(j).innerText;
    }
  }
  for (var i=0;i<maxColumn;i++){           
      oSheet.Columns(i+1).EntireColumn.AutoFit; 
  }  
  oXL.Visible = true;
}

/**
 * ��������ͬ��Ԫ�ص�ֵ
 * @param fieldName ������ֶ�
 * @since 2005-08-29
 */
function setSameElementValue(field){ 
  if(getElementCount(field.name)>1){
    var fields = document.getElementsByName(field.name);
    for(var i=0;i<fields.length;i++){
      fields[i].value=field.value;
    }
  } 
}

function readCookie(name) {
    var cookieValue = "";
    var search = name + "=";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) {
                end = document.cookie.length;
            }
            cookieValue = unescape(document.cookie.substring(offset, end));
        }
    }
    return cookieValue;
}
function writeCookie(name, value, hours) {
    var expire = "";
    if (hours != null) {
        expire = new Date((new Date()).getTime() + hours * 3600000);
        expire = ";  expires=" + expire.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expire;
}
/**
* Cross-browser XMLHttpRequest instantiation.
*/
if (typeof XMLHttpRequest == "undefined") {
    XMLHttpRequest = function () {
        var msxmls = ["MSXML3", "MSXML2", "Microsoft"];
        for (var i = 0; i < msxmls.length; i++) {
            try {
                return new ActiveXObject(msxmls[i] + ".XMLHTTP");
            }
            catch (e) {
            }
        }
        throw new Error("No XML component installed!");
    };
}
function createXMLHttpRequest() {
    try {
    // Attempt to create it "the Mozilla way" 
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    // Guess not - now the IE way
        if (window.ActiveXObject) {
            return new ActiveXObject(getXMLPrefix() + ".XmlHttp");
        }
    }
    catch (ex) {
    }
    return false;
} 


//a xml http request variable.
var xmlRequest;
/**
 * request server mode sync
 */
function syncRequest(url) {
    xmlRequest = createXMLHttpRequest();
    xmlRequest.onreadystatechange = processStateChange;
    try {
        xmlRequest.open("POST", url, false);
    }
    catch (e) {
        alert(e);
    }
    xmlRequest.send(null);
}
function asyncRequest(url) {
    xmlRequest = createXMLHttpRequest();
    xmlRequest.onreadystatechange = processStateChange;
    try {
        xmlRequest.open("POST", url, true);
    }
    catch (e) {
        alert(e);
    }
    xmlRequest.send(null);
}
function processStateChange() {
    if (xmlRequest.readyState == 4) { // Complete
        if (xmlRequest.status == 200) { // OK response
        } else {
            alert("Problem: " + xmlRequest.statusText);
        }
    }
}
function isEmpty(field){
    if(field.value==null || trim(field.value)==""){
    	  return true;
    }
    return false;
}
function isNumeric(strValue){
   var result = regExpTest(strValue,/\d*[.]?\d*/g);
   return result;
}
function errorMessage(strErrMsg){
    var strMsg = "ϵͳ��Ϣ:\n\n" + strErrMsg;
    alert(strMsg);
}
function checkDecimal(field,p,s,MinValue,MaxValue){
    if(isEmpty(field))
    return true;
    field.value = trim(field.value);
    var strValue=formatNumberToString(field.value);
    if(strValue=="")
       strValue = "0";
    var desc   = field.description;
    //���description���Բ����ڣ�����name����
    if(desc==null)
       desc = field.name;
       /*
    if(!isNumeric(strValue)){
         errorMessage("������Ϸ�������");
       field.focus();
       field.select();
       return false;
    }*/

    p = parseInt(p);
    s = parseInt(s);
    var pLength;
    var sLength;
    var position = strValue.indexOf(".");
    if(position>-1){
	      pLength = position;
        sLength = strValue.length - position - 1;
    }else{
    	  pLength = strValue.length;
        sLength = 0;
    }

    if(pLength>(p-s) || sLength>s){
        errorMessage("������Ϸ���" + desc +"\n����Ϊ����,����λ�Ϊ" + (p-s) + ",С��λ�Ϊ" + s);
        field.focus();
        field.select();
        return false;
     }
     var value = parseFloat(strValue);

     if(MaxValue!=null && MinValue!=null && trim(MaxValue)!="" && trim(MinValue)!=""){
         MinValue = parseFloat(MinValue);
         MaxValue = parseFloat(MaxValue);
        if(isNaN(value) || value>MaxValue || value<MinValue){

            errorMessage("������Ϸ���" + desc +"\n����Ϊ����,��СֵΪ" + MinValue + ",���ֵΪ" +MaxValue);
            field.focus();
            field.select();
            return false;

        }

     }
     
     return true;

}
