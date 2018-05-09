/****************************************************************************

 * DESC       ������¼��

 * AUTHOR     ��liuyang

 * CREATEDATE ��2003-12-23

 * MODIFYLIST ��   Name       Date            Reason/Contents

 *          ------------------------------------------------------

 ****************************************************************************/



var DEBUG_MODE = true;

var inquery = false;    //���ڲ�ѯ�����־

var queryError = false; //��ѯ��������־

var sign; //ʱ���



function isInquery(){

	return inquery;

}



function isQueryError(){

	return queryError;

}



function setInquery(pInquery){

	inquery = pInquery;

}



function setQueryError(pQueryError){

	queryError = pQueryError;

}



function getSign(){

	return sign;

}

function setSign(pSign){

	sign=pSign;

}





//����Ԫ����Form�е�˳��û���򷵻�-1

function getElementIndex(field){

    var intElementIndex = -1;

    //����fm���Ԫ��
    for(var i=0;i<fm.elements.length;i++){

        if(fm.elements[i]==field){

            intElementIndex=i;

            break;

        }

    }

    return intElementIndex;

}



//��ʼ�����д���������

function initAllCodeInput(){

    for(var i=0;i<fm.elements.length;i++){

        if(fm.elements[i].className=="codecode" || fm.elements[i].className=="codename"){

            fm.elements[i].tag = fm.elements[i].value;

        }

    }

}



function private_Code_CallService(field,codetype,relation,inputtype,querytype,limit,method){
    var fmcode = parent.fraCode.fm;
    
    var insertRow=0 ;

    if (codetype=="ChageRiskCode")

    {

    	setInquery(false);

    }
    if (codetype=="businessNature")

    {
    	setInquery(false);

    }

    if(isInquery()==true){

        window.status = "���ڲ�ѯ����......";

        return;

    }

    setSign(new Date().getTime());    



    setInquery(true);

    setQueryError(false);



    //���������

    try

    {

        if(relation==null){

            relation = 1;

        }

        if(inputtype==null){

            inputtype = "code";

        }

        if(querytype==null){

            querytype = "always";

        }

        if(limit==null){

            limit = "must";

        }

        if(method==null){

            method = "select";

        }
        fmcode.codeindex.value= getElementIndex(field);
       
        if (codetype=="ChageRiskCode" )

        {
        	fmcode.codevalue.value=fm.elements[getElementIndex(field)-1].value;
        }
        else if(codetype=="BusinessChannel2" || codetype=="BusinessChannel3")
        {
            fmcode.codevalue.value=fm.elements[getElementIndex(field)-2].value;
        }
        

    	else

    	{

        	fmcode.codevalue.value=field.value;

        }

        fmcode.codetype.value=codetype;
		
        fmcode.relation.value=relation;

        fmcode.inputtype.value=inputtype;

        fmcode.querytype.value=querytype;

        fmcode.limit.value=limit;

        fmcode.method.value=method;

        fmcode.fieldsign.value= getSign();

        fmcode.other.value="";

        try

        {
           //Modify by fan 20060623 �޸��˺�Լ�����ձ���ʾ������
           //�д��޸�,Ŀǰֻ�ܴ������һ��
            
           
           insertRow = getRowsCount("SectionPartC");             
           
           if  (insertRow>0)
           {
           		fmcode.riskcode.value= fm.fhStatiTypeRiskCode[insertRow].value;
        	}
        	else
        	{
        		//ԭ����д��
        		fmcode.riskcode.value= fm.riskcode.value;
        	}
           //Modify end fan
        }catch(ex)

        {
        	
        	 fmcode.riskcode.value = "PUB";

        }

        fmcode.submit(); 

                                                                       //�ύ

    }

    catch(E){

        if(DEBUG_MODE==true){

            alert("==============="+E);

        }

    }

}





function code_CodeSelect(field,codetype,relation,inputtype,querytype,limit,method){
   
    if(!isInquery() && !isQueryError()){

        window.status="";

    }

    if (event!=null)

    {
    	if(event.type=="keyup"){
    	    var charCode=window.event.keyCode;
    	    if(!(charCode==13 & window.event.ctrlKey)){
    	        return;

    	    }

    	}
    }
    
    window.status=window.status+"select";
    

    private_Code_CallService(field,codetype,relation,inputtype,querytype,limit,"select");

}



function code_CodeChange(field,codetype,relation,inputtype,querytype,limit,method){

    if(!isInquery() && !isQueryError()){

        window.status="";

    }



    if(field.tag==field.value){

        return;

    }

    window.status=window.status+"change";

    private_Code_CallService(field,codetype,relation,inputtype,querytype,limit,"change");

}
//add by chengyu begin 2012-08-31�������˻���Ϣ  ��������е���������������ı�������к�
function code_CodeSelectAreaclcode(field,codetype,relation,inputtype,querytype,limit,method){
    
    bank_Code_Clear();
    code_CodeSelect(field,codetype,relation,inputtype,querytype,limit,method);
}

function code_CodeSelectBankType(field,codetype,relation,inputtype,querytype,limit,method){
	
    bank_Code_Clear();
    code_CodeSelect(field,codetype,relation,inputtype,querytype,limit,method);
}

function bank_Code_Clear(){

    cGetRow=window.event.srcElement.parentElement.parentElement.rowIndex;
    var count = fm.prpDAccountBankCode.length;   
    
    var bankcode=document.getElementsByName("prpDAccountBankCode")[cGetRow];//��ȡ��ǰlistֵ

    var bank=document.getElementsByName("prpDAccountBank")[cGetRow];
    	if(bankcode.value!=""||bank.value!=""){
     		bankcode.value="";
			bank.value="";
    	}
	
}
//add by chengyu begin 2012-08-29 �˻����кŹ�����ѯ
function code_CodeSelectBankCode(field,codetype,relation,inputtype,querytype,limit,method){

	var count =fm.prpDAccountAreaclcode.length;
	for(var i=1;i<count;i++){
	   var Areaclcode=fm.prpDAccountAreaclcode[i].value;
	}
	var count1 =fm.prpDAccountBankType.length;
	for(var i=1;i<count1;i++){
	   var BankType=fm.prpDAccountBankType[i].value;
	}
	if(Areaclcode!=""&&BankType!=""){
		var other=Areaclcode+","+BankType;
		
	}else {
		alert("����������������������Ϣ��")
		return;
	}
	 if(!isInquery() && !isQueryError()){

        window.status="";

    }

    if (event!=null)

    {

    	if(event.type=="keyup"){

    	    var charCode=window.event.keyCode;

    	    if(!(charCode==13 & window.event.ctrlKey)){

    	        return;

    	    }

    	}

    }
    		    window.status=window.status+"select";
    		    
    
    	private_Code_CallServiceBankCode(field,codetype,relation,inputtype,querytype,limit,"select",other);
	
}
function private_Code_CallServiceBankCode(field,codetype,relation,inputtype,querytype,limit,method,other){

    var fmcode = parent.fraCode.fm;
    var insertRow=0 ;

    if (codetype=="ChageRiskCode")

    {

    	setInquery(false);

    }

    if(isInquery()==true){

        window.status = "���ڲ�ѯ����......";

        return;

    }

    setSign(new Date().getTime());    



    setInquery(true);

    setQueryError(false);



    //���������

    try

    {

        if(relation==null){

            relation = 1;

        }

        if(inputtype==null){

            inputtype = "code";

        }

        if(querytype==null){

            querytype = "always";

        }

        if(limit==null){

            limit = "must";

        }

        if(method==null){

            method = "select";

        }

        fmcode.codeindex.value= getElementIndex(field);

        if (codetype=="ChageRiskCode")

        {

        	fmcode.codevalue.value=fm.elements[getElementIndex(field)-1].value;

        }

    	else

    	{

        	fmcode.codevalue.value=field.value;

        }

        fmcode.codetype.value=codetype;
		
        fmcode.relation.value=relation;

        fmcode.inputtype.value=inputtype;

        fmcode.querytype.value=querytype;

        fmcode.limit.value=limit;

        fmcode.method.value=method;

        fmcode.fieldsign.value= getSign();

        fmcode.other.value=other;

        try

        {
           //Modify by fan 20060623 �޸��˺�Լ�����ձ���ʾ������
           //�д��޸�,Ŀǰֻ�ܴ������һ��
            
           
           insertRow = getRowsCount("SectionPartC");             
           
           if  (insertRow>0)
           {
           		fmcode.riskcode.value= fm.fhStatiTypeRiskCode[insertRow].value;
        	}
        	else
        	{
        		//ԭ����д��
        		fmcode.riskcode.value= fm.riskcode.value;
        	}
           //Modify end fan
        }catch(ex)

        {

        	 fmcode.riskcode.value = "PUB";

        }

        fmcode.submit(); 

                                                                       //�ύ

    }

    catch(E){

        if(DEBUG_MODE==true){

            alert("==============="+E);

        }

    }

}
//end by chengyu  2012-08-31�������˻���Ϣ  ��������е���������������ı�������к�

