/****************************************************************************
 * DESC       �����¼����
* Author     : ������Ŀ��
 * CREATEDATE ��2002-06-24
 * MODIFYLIST ��   Name       Date            Reason/Contents
 *          ------------------------------------------------------
 *          zhouxianli     2002-07-08       �޸�ģʽ2�����Ӷ�λ����
 *          zhouxianli     2002-07-12       �޸�ģʽ2����Ϊ�������ư�ť��ʽ
 *          zhouxianli     2002-08-23       �޸�ģʽ2�������Ŀ��ư�ť��ʽ����ڶ���tbody��
 *          zhouxianli     2002-08-26       �޸�ģʽ2���¼�һ��ʱ���Զ���λ����һ���ɼ���
 *          zhouxianli     2002-08-27       �޸�ģʽ2�����п��Ʒ�����Ϊ�ص�ʵ�֣�
 *                                          ��ʹ����һҳ/��һҳģʽ����ʵ�����¼�������
 *																					insert<PageCode>()
 *																					delete<PageCode>()
 *																					previous<PageCode>()
 *																					next<PageCode>()
 *																					fieldLocate<PageCode>(Field)
 *                                          �޸�ģʽ1����������setRowColor(),�ı�һ�е���ɫ
 *                                          �޸�ģʽ2��setRecordState()
 *          zhouxianli     2002-09-05       add method getPageFieldsName();
 *          sunchenggang   2002-09-24       �滻����onePageData.countΪonePageData.length
 *          luxupan        2002-10-10       ���ӷ���������������ʾ
 *                                          setRowColorPG,����flag����һ����ɫ
 *                                          newFieldPG,����ģʽ�ĸ�ֵ����
 *
 *          sunchenggang   2002-11-17       ����ģʽ3,����ģʽ2�а���ģʽ1�����,
 *                                          ����ȫ���������allRowData,����Ӧ����
 *                                          getRowData()��setRowData()��deleteRowRecord()��
 *                                          setCurrentRowRecord()��loadRowRecord()��iniRowRecord()��
 *                                          saveRowRecordToSingleTable() ��saveRowRecordToMultiTable�Ⱥ���
 *
 *         sunchenggang    2002-11-18       ��setRowColorPG()��newFieldPG()������������UICommon.js��
 *         zhouxianli      2002-11-23       ����ģʽ2������¼ʱ���ύ�����޸ĺ���saveRecord,clearRecord
 *         daironghui      2003-04-28       �޸�addRecord,deleteRecord��loadRecord,��field.oldvalue��ֵ,
 *         zhouxianli      2004-09-27       ����ģʽ3,�޸�ע��,�ṩ���ɼ�������
 *                                          ��ʵ�ֶ��ģʽ��ȥ����ǰ�ظ���saveRowRecordToSingleTable����
 *
 ****************************************************************************/

/*
ע�⣺��ҪCommon.js�е�getElementOrder()����,errorMessage()
      fieldInsertRow(PageCode)����ҳ���"insert" + PageCode + "()"����

����ԭ��:
������ģʽ���Ӽ�ģʽ����һ��/��һ��ģʽ��ԭ��������ʾ

ģʽ1:�Ӽ�ģʽ
    <span style="display:none">
      <table id="<PageCode>_Data">
        <tbody>
          �м����һ������(��ʵ��չ�ָ��û�ʹ�õ�һ��tr)
        </tbody>
      </table>
    </span>
    <table id="<PageCode>">
      <thead>
        �м���ʾ����
      </thead>
      <tfoot>
        ����Ӻ�
      </tfoot>
      <tbody>
        �յģ��м���ݶ�����������
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
    ������ҲҪ��д������������֣���ʵ�����ݴӵ�һ�п�ʼ��

    spanΪ����table��,table��Ϊʵ�ʵ�һ������
    talbe��ID����ΪPageCode + "_Data",����������tablei��id��ͬ
    thead��������ͱ������һ��������
    tfoot���������tbodyǰ
    -�Ű�ť��������Ϊ"button_" + PageCode + "_Delete",ȷ����������Ԫ����������
    +�Ű�ť��������Ϊ"button_" + PageCode + "_Insert",ȷ����������Ԫ����������
    ...�Ű�ť��������Ϊ"button_" + PageCode + "_Open_Context",ȷ����������Ԫ����������
    ...����span��������Ϊ"span_" + PageCode + "_Context",ȷ����������Ԫ����������
    ����ȷ����ť��������Ϊ"button_" + PageCode + "_Close_Context",ȷ����������Ԫ����������
*/

//�ڱ���·����һ������,
//����Ϊҳ�����ҳԭʼ���ݴ�������
//��:insertTableRow(document.all("Engage"),"Engage_Data");
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

//�ڱ���·����һ������,
//����Ϊҳ�������ƺ�ҳԭʼ���ݴ�������
//��:insertRow("Engage","Engage_Data");
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

//ɾ�����ư�ť���Ƶ���
//ҳ���ƣ��ֶΣ�����ҳ�п��ư�ť�ĸ���������ҳ��ÿ�����ư�ť�Ŀ��Ƶ�TR�ĸ���
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

  var intIndex = parseInt(getElementOrder(Field),10) - 1;  //˳���Ϊ��0��ʼ
  var oTBODY   = document.all(PageCode).tBodies.item(0);
  intIndex = intIndex - intPageDataKeyCount;  //ȥ���������еĿ��ư�ť�ĸ���

  for(var i=0;i<intRowCount;i++)
  {
    oTBODY.deleteRow(intIndex*intRowCount);
  }
}

//�õ�һҳ�Ķ��м�¼�ļ�¼��
//ҳ����
function getRowsCount(PageCode)
{
  var oTBODY   = document.all(PageCode).tBodies.item(0);
  var intCount = oTBODY.rows.length;
  return intCount;
}

//����һ�е���ɫ
function setRowColor(DataPageCode,index,color)
{
	var i = 0;
	var name = "";
  var elements;
  //index--; //˳���Ϊ��0��ʼ
  //�õ�Input�������
  elements = document.all(DataPageCode).tBodies.item(0).getElementsByTagName("input");
  for(i=0;i<elements.length;i++)
  {
  	name = elements[i].name + "[" + index + "]";
    eval("fm." + name + ".style.backgroundColor = color;");
  }
  //�õ�Select�������
  elements = document.all(DataPageCode).tBodies.item(0).getElementsByTagName("select");
  for(i=0;i<elements.length;i++)
  {
  	name = elements[i].name + "[" + index + "]";
    eval("fm." + name + ".style.backgroundColor = color;");
 }
  //�õ�textarea�������
  elements = document.all(DataPageCode).tBodies.item(0).getElementsByTagName("textarea");
  for(i=0;i<elements.length;i++)
  {
  	name = elements[i].name + "[" + index + "]";
    eval("fm." + name + ".style.backgroundColor = color;");
  }

}


//���һҳ�����ж��м�¼
//ҳ����
function deleteAllRows(PageCode)
{
  var oTBODY   = document.all(PageCode).tBodies.item(0);
  var intCount = getRowsCount(PageCode);

  for(var i=0;i<intCount;i++)
  {
   oTBODY.deleteRow(0);
  }
}

//���������£���ʱ����ҳ���"insert" + PageCode + "()"����
function fieldInsertRow(PageCode)
{
  if( window.event.keyCode==40)
  {
    eval("insert" + PageCode + "()");
  }
}


//�õ�һҳ���е�Fields Name
function getPageFieldsName(PageCode,DataPageCode)
{
  var i = 0;
  var elementIndex = 0;
  var elements;
  var pageFieldsName=new Array();
  //�õ�Input�������
  elements = document.all(DataPageCode).tBodies.item(0).getElementsByTagName("input");
  for(i=0;i<elements.length;i++)
  {
  	if(elements[i].name!=("button_" + PageCode + "_Delete"))
  	{
	    pageFieldsName[elementIndex] = elements[i].name;
	    elementIndex++;
	  }
  }
  //�õ�Select�������
  elements = document.all(DataPageCode).tBodies.item(0).getElementsByTagName("select");
  for(i=0;i<elements.length;i++)
  {
    pageFieldsName[elementIndex] = elements[i].name;
    elementIndex++;
  }
  //�õ�textarea�������
  elements = document.all(DataPageCode).tBodies.item(0).getElementsByTagName("textarea");
  for(i=0;i<elements.length;i++)
  {
    pageFieldsName[elementIndex] = elements[i].name;
    elementIndex++;
  }
	return pageFieldsName;
}

/*
  ģʽ2:��һ��/��һ��ģʽ

    <table id="<PageCode>">

      <tbody>
        һ������(��ʵ��չ�ָ��û�ʹ�õ�һ��tr)
      </tbody>
      <tbody>
        <jsp:include page="/commonship/pub/UIMulLinePrevNextModeControl.jsp">
          <jsp:param name="PageCode" value="<PageCode>" />
        </jsp:include>
      </tbody>
    </table>

    ʵ�����ݴӵ�һ�п�ʼ��
ע��
    ״̬��������Ϊ"span_" + PageCode + "_State"
    ������������Ϊ"span_" + PageCode
    �ύǰһ��Ҫ����saveRecord(PageCode);
    Javascript������ʵ�����ǵ���������ͬ��λ������һ������

    allPageData��Ŷ��onePageData
    onePageData���һ�����ݵ���һ��/��һ��ģʽҳ������
    ����ʵ���Ͽ��Է�Ϊ���Ժ���ͨ���ݣ�
      ���ԣ�currentIndex��count��field������fieldʵ������һ�����飬
            �洢һҳ������������ƣ�
      ��ͨ���ݣ��洢������飬ÿ���������һҳ��Ӧ��field�Ķ����value,title,style,tag��ֵ

*/
//��������������������Ϣ
var allPageData    = new Array();  //���ã����ܵ�����ʱ�����ı�

//���س���ʱ��λ��¼
function fieldLocateRecord(PageCode,Field)
{
  if(!isNumeric(Field.value))
  {
    errorMessage("������Ϸ�������!");
    return false;
  }

  var index = parseInt(Field.value,10);
  if(!isNaN(index))
  {
    return locateRecord(PageCode,index);
  }
}

//���ܣ���һҳ
//����ԭ��
//���浱ǰ��¼
//�������һ������ǰ������һ����������ʾ
//������ʾ�Ѿ����˵�һ����¼
//����״̬
function previousRecord(PageCode)
{
  setCurrentRecord(PageCode);
  var onePageData = getPageData(PageCode);
  if(onePageData.currentIndex<=0)
  {
    errorMessage("�Ѿ����˵�һ����¼!");
    return false;  //ģʽ����
  }
  else
  {
    onePageData.currentIndex--;
    loadRecord(PageCode);
  }
  setRecordState(PageCode,"");
  return true;
}


//���ܣ���һҳ
//����ԭ��
//���浱ǰ��¼
//�������һ������ǰ������һ����������ʾ������״̬��
//��������ʾ��������ʾ�Ѿ��������һ����¼
//����״̬��
function nextRecord(PageCode)
{
  var i = 0;
  var onePageData = getPageData(PageCode);
  var intIndex = onePageData.currentIndex;

  //���浱ǰ��¼
  setCurrentRecord(PageCode);

  //��������һ���ˣ�����ʾ
  if(intIndex>=onePageData.length-1)
  {
    onePageData.currentIndex = onePageData.length-1;
    errorMessage("�Ѿ��������һ����¼!");
    return false;     //ģʽ����
  }
  else //���򣬶�����һ������
  {
    intIndex++;
    onePageData.currentIndex = intIndex;
    loadRecord(PageCode);
  }
  setRecordState(PageCode,"");
  return true;
}


//���ܣ���λ��nҳ
//����ԭ��
//���浱ǰ��¼
//����¼�ţ�����ж�������ʾ������״̬��
//������ʾ������Ϣ
//����״̬��
function locateRecord(PageCode,index)
{
  var onePageData = getPageData(PageCode);
  //���浱ǰ��¼
  setCurrentRecord(PageCode);

  //����������һ�У�����ʾ
  if(index>onePageData.length)
  {
    errorMessage("�����ڼ�¼��Ϊ" + index + "�ļ�¼, ���ļ�¼��Ϊ" + onePageData.length + "!");
    //modify by weishixin add start 20030828
    //ԭ�����Ӵ���û��ҳ����ʱ�����㲻���Ƴ���ѯ���BUG
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
    errorMessage("��¼�Ų���С��1!");
    setRecordState(PageCode,"");
    return false;
  }
  else //���򣬶�����һ������
  {
    onePageData.currentIndex = index - 1;
    setPageData(PageCode,onePageData);
    loadRecord(PageCode);
  }
  setRecordState(PageCode,"");
  return true;
}

//ɾ����ǰ��¼
function deleteRecord(PageCode)
{
  var i=0;

  var onePageData = getPageData(PageCode);

  var onePageDataTemp = new Array();

  //ֻ��һ����¼ʱ��disable���пؼ�
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

//���ص�ǰ��¼����ʾ
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

//��ʼ��ҳ
function iniRecord(PageCode)
{
  var i = 0;
  var elementIndex = 0;
  var elements;
  var onePageData=new Array();
  onePageData["field"] = new Array();
  //�õ�Input�������
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
  //�õ�Select�������
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
  //�õ�textarea�������
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

  onePageData["currentIndex"]=-1;        //��ǰ��¼����
  onePageData["count"]=0;

  setPageData(PageCode,onePageData);

  disableRecordInput(PageCode);
  setRecordState(PageCode,"");

}



//���ܣ�����һҳ
//����ԭ��
//���浱ǰ��¼
//�¼�һ����¼���������ʾ��count��һ
//����״̬
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

//���浱ǰ��¼
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

//���õ�ǰ״̬
function setRecordState(PageCode,MessageAppend)
{
  var onePageData = getPageData(PageCode);

  allPageData[PageCode].count = allPageData[PageCode].length;
  eval("span_" + PageCode + "_State").innerHTML = "��" + (onePageData.currentIndex + 1) + "��/��" + onePageData.length + "��" + MessageAppend;
}


//�����¼����span
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


//�����¼���ڵ�span������
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


//ʹһҳ��Ӧ��������disable
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

//ʹһҳ��Ӧ��������enable
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

//�õ�һҳ�����ж���
function getPageData(PageCode)
{
	return allPageData[PageCode];
}

//����һҳ�����ж���
function setPageData(PageCode,PageDataArray)
{
	allPageData[PageCode] = PageDataArray;
}

//����һ��field����,����һ��field����ֵ
function newField(value,title,backgroundColor,tag)
{
	var field = new Array();
	field.value = value;
	field.title = title;
	field.backgroundColor = backgroundColor;
	field.tag   = tag;
	return field;
}




//����һ��ҳ����ɫ�����ı�һҳ���������������ɫ
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
  ģʽ3:ģʽ2�а���ģʽ1��ģʽ: ��ÿһҳ¼��ģʽ�а�������¼���ģʽ

ע�⣺
    1. ��������μ�ģʽ1��ģʽ2

    2. ģʽ1��ģʽ2���¼�����ͨ����ģʽ1��ģʽ2�е�һ����һ��Ϊ��ţ���Ϊ
       �ؼ��ֹ�����ģʽ1��ģʽ2�е�һ����Ϊ������Ҳ������ʾ��������ɾ��һ��ҳ���ݣ�
       ����Ž�������������

    3. ����һ��/��һ��ģʽ<tfoot>�����ӱ�����������Ϊ"span_" + RowCode���μ����������

    4. �ύǰ,���ҳ�����������ݱ�����ͬһ����ʱ,����saveRowRecordToSingleTable(PageCode,RowCode);
       ���ҳ�����������ݱ����ڶ����ʱ������saveRowRecordToMultiTable(PageCode,RowCode)

ע��:
    a.��ô�����Ƿ���ͬһ������?
        �������Ҫ�������Ƕ�ҳ�е�ÿһ�ж����Ժ�ҳ����һ�����һ����¼,��Ϊ����.
            ��¼����Ϊ  ��(RowCount)      RowCountΪÿҳ���е�����(���û�����е�����Ϊ1)

        �������Ҫ�������Ƕ�ҳ�е�ÿһ�п��Ե������һ����¼,��Ϊ���.
            ��¼����Ϊ  ҳ����Ŀ+�е���Ŀ

    b.�Ƿ���Ҫ������һ��/��һ��ģʽ�е� saveRecord ����?
        ����Ҫ��Ҳ���ܼӣ�Ӧ�ñ�ģʽ��Ҫ���Ǹ���������ȷ����
            saveRowRecordToSingleTable ��  saveRowRecordToMultiTable����


    allRowData�������ҳ���ݶ�Ӧ��������

ģʽ3:�Ӽ�ģʽ

    <table id="<PageCode>">

      <tbody>
        һ������(��ʵ��չ�ָ��û�ʹ�õ�һ��tr)
      </tbody>
      <tbody>
        ģʽ1
      </tbody>
      <tbody>
        <jsp:include page="/commonship/pub/UIMulLinePrevNextModeControl.jsp">
          <jsp:param name="PageCode" value="<PageCode>" />
        </jsp:include>
      </tbody>
    </table>

//  2004-09-27  zhouxianli
//  ����Ϊԭʼע��,����Ϊ��Щ����,���Ըĳ�����ķ�ʽ.��\prpall\commonship\tbcbpg\UIPrPoEnInsuredEGroupInput.jsp
//  ����һ����������,���������Ϊ\prpall\DAA\lp\loss\UILDAAPersonInput.jsp
//
//    <table id="<RowCode>">
//      <thead>
//        �м���ʾ����
//      </thead>
//      <tfoot>
//        ���뱣����id���Ӻ�
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
//        �յģ��м���ݶ�����������
//      </tbody>
//    </table>

*/


//����ҳ���ݶ�Ӧ����������Ϣ
var allRowData    = new Array();  //���ã����ܵ�����ʱ�����ı�


//�õ�һҳ�����ж���
function getRowData(PageCode)
{

	return allRowData[PageCode];
}


//����һҳ�����ж���
function setRowData(PageCode,RowDataArray)
{

	allRowData[PageCode] = RowDataArray;
}


//��ʼ���������
function iniRowRecord(RowCode_Data,RowCode)
{
  var i = 0;
  var elementIndex = 0;
  var elements;
  var rowData=new Array();
  rowData["field"] = new Array();

  //�õ�Input�������
  elements = document.all(RowCode_Data).tBodies.item(0).getElementsByTagName("input");

  for(i=0;i<elements.length;i++)
  {
    if(elements[i].type=="button") continue;
    rowData["field"][elementIndex] = elements[i].name;
    fm.all(rowData.field[elementIndex]).value                 = "";
    elementIndex++;
  }
  //�õ�Select�������
  elements = document.all(RowCode_Data).tBodies.item(0).getElementsByTagName("select");
  for(i=0;i<elements.length;i++)
  {
    rowData["field"][elementIndex] = elements[i].name;
    fm.all(rowData.field[elementIndex]).selectedIndex         = 0;
    elementIndex++;
  }
  //�õ�textarea�������
  elements = document.all(RowCode_Data).tBodies.item(0).getElementsByTagName("textarea");
  for(i=0;i<elements.length;i++)
  {
    rowData["field"][elementIndex] = elements[i].name;
    fm.all(rowData.field[elementIndex]).value                 = "";
    elementIndex++;
  }

  setRowData(RowCode,rowData);

}


//�����йؼ��֣���ţ�
function setRowRecordState(PageCode,RowCode)
{
  var onePageData = getPageData(PageCode);
  var rowData = getRowData(RowCode);

  for(var i=1;i<fm.all(rowData.field[0]).length;i++)
  {
    fm.all(rowData.field[0])[i].value = fm.all(onePageData.field[0]).value;
  }
}


//������ʱ����ҳ�ؼ��֣���ţ�
//@param PageCode PageCode
//@param initValue ��Сֵ
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
  //ȡ���ֵ��һ
  fm.all(onePageData.field[0]).value = MaxNo+1;

}


//ɾ����ǰ�������м�¼
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

  //Ĭ��ΪInsured (��Ϊ��ʷԭ�����)
  if(PageCode==null){
    PageCode="Insured";
  }


  var onePageData  = getPageData(PageCode);
  var keyValue = fm.all(onePageData.field[0]).value; //ҳID
  //����������ɾ�����е�ǰҳ��Ӧ������
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

//���浱ǰ�������м�¼
function setCurrentRowRecord(RowCode,PageCode)
{


  //�����ǰ���������ݣ�����������ɾ�����е�ǰ�ؼ��ֶ�Ӧ�����ݣ��ٲ���
  deleteRowRecord(RowCode,PageCode);

  var i = 0;
  var j = 0;

  var rowData = getRowData(RowCode);

  j = rowData.length;

  //����
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


//װ��һ�����м�¼
function loadRowRecord(PageCode,RowCode,DataRowCode)
{
	deleteAllRows(RowCode);

	var j = 0;
	var index = 0;

	var onePageData  = getPageData(PageCode);
	var rowData      = getRowData(RowCode);

	//�ҳ�������ؼ������Ӧ�������У�����
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

//�����¼����span �����ݱ�����һ����ʱ�Ĵ洢������
function saveRowRecordToSingleTable(PageCode,RowCode)
{
  setCurrentRecord(PageCode);
  setCurrentRowRecord(RowCode,PageCode);
  //����ɾ�����е�ǰ��ʾ����
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

  //��ҳ�洢��Ӧ��������
  for(j=0;j<onePageData.length;j++)
  {
    bFind = false;

    //��������ҳ���
    serialNo++;

    for(i=0;i<rowData.length;i++)
    {
      if(rowData[i][rowData.field[0]].value == onePageData[j][onePageData.field[0]].value)
  	  {
  	    bFind = true;

  	    //�洢�ж�Ӧ��ҳ����
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

    	  //�洢ҳ��Ӧ��������
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

    //��������ڶ�Ӧ�������ݣ�Ҳ���棬��Ӧ������Ϊ��
    if(bFind == false)
    {
	    //�洢�ж�Ӧ��ҳ����
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

  	  //�洢ҳ��Ӧ��������
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


//�����¼���� �����ݱ����ڶ����ʱ�Ĵ洢������
//���ṩ������Ź��ܣ���Ϊ���ܻ�����������õĵط�
function saveRowRecordToMultiTable(PageCode,RowCode)
{
  setCurrentRecord(PageCode);
  setCurrentRowRecord(RowCode,PageCode);
  //����ɾ�����е�ǰ��ʾ����
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
  //��ҳ�洢��Ӧ��������
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
      	    //�洢�ж�Ӧ��ҳ����,ֻ����һ��
      	  	for(n=0;n<onePageData["field"].length;n++)
      	  	{
     		      strText1 = strText1 +
      		                "<input type=hidden name='" + onePageData.field[n] + "'" +
      		                " value='" + onePageData[j][onePageData.field[n]].value+ "'>";
    	    }
    	    hasAdd=true;
    	}

    	//�洢ҳ��Ӧ��������
        for(n=0;n<rowData["field"].length;n++)
        {
            strText2 = strText2 +
                      "<input type=hidden name='" + rowData.field[n] + "'" +
                      " value='" + rowData[i][rowData.field[n]].value+ "'>";
        }
      }
  	}

    //��������ڶ�Ӧ�������ݣ��򱣴�ҳ���ݣ�������������
    if(bFind == false)
    {
	    //�洢�ж�Ӧ��ҳ����
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

//����м�¼���ڵ�span������
function clearRowRecord(RowCode)
{
  eval("span_" + RowCode).innerHTML = "";
  return true;
}
