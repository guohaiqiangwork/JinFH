/****************************************************************************

 * DESC       ：代码录入

 * AUTHOR     ：liuyang

 * CREATEDATE ：2003-12-23

 * MODIFYLIST ：   Name       Date            Reason/Contents

 *          ------------------------------------------------------

 ****************************************************************************/



var DEBUG_MODE = true;

var inquery = false;    //正在查询代码标志

var queryError = false; //查询代码错误标志

var sign; //时间戳



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





//查找元素在Form中的顺序，没有则返回-1

function getElementIndex(field){

    var intElementIndex = -1;

    //查找fm里的元素

    for(var i=0;i<fm.elements.length;i++){

        if(fm.elements[i]==field){

            intElementIndex=i;

            break;

        }

    }

    return intElementIndex;

}



//初始化所有代码输入域

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

        window.status = "正在查询代码......";

        return;

    }

    setSign(new Date().getTime());    



    setInquery(true);

    setQueryError(false);



    //请求服务器

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
           //Modify by fan 20060623 修改了合约管理险别显示的问题
           //有待修改,目前只能处理最后一行
            
           
           insertRow = getRowsCount("SectionPartC");             
           
           if  (insertRow>0)
           {
           		fmcode.riskcode.value= fm.fhStatiTypeRiskCode[insertRow].value;
        	}
        	else
        	{
        		//原来的写法
        		fmcode.riskcode.value= fm.riskcode.value;
        	}
           //Modify end fan
        }catch(ex)

        {
        	
        	 fmcode.riskcode.value = "PUB";

        }

        fmcode.submit(); 

                                                                       //提交

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
    
    //双击域拼接参数,add中动态表现在理解为从2开始所以下标需-1 修改中下标从1开始,所以可直接在双击域codetype中进行拼接参数 //zhangjun 
    if("PROV"==codetype){
    	var order = round(parseInt(getElementOrder(field))-1,0);
    	if (order<=0) {
    		order=1;
		}
    	var bankName = fm.bankName[order].value;
    	codetype=codetype+"#"+bankName;
    	
    }else if("CITY"==codetype){
    	var order = round(parseInt(getElementOrder(field))-1,0);
    	if (order<=0) {
    		order=1;
		}
    	var bankName = fm.bankName[order].value;
    	var PROVName = fm.provName[order].value;
    	codetype=codetype+"#"+bankName;
    	codetype+="#"+PROVName;
    }
    if("Name"==codetype){
    	var order = round(parseInt(getElementOrder(field))-1,0);
    	if (order<=0) {
    		order=1;
		}
    	var bankName = fm.bankName[order].value;
    	var PROVName = fm.provName[order].value;
    	var CIRYName = fm.cityName[order].value;
    	codetype=codetype+"#"+bankName;
    	codetype+="#"+PROVName;
    	codetype+="#"+CIRYName;
    } 
    if("BankNum"==codetype){
    	var order = round(parseInt(getElementOrder(field))-1,0);
    	if (order<=0) {
    		order=1;
		}
    	var BankNum = fm.Name[order].value;
    	codetype=codetype+"#"+BankNum;
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
//add by chengyu begin 2012-08-31共保人账户信息  如果开户行地区和银行类别发生改变清空银行号
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
    
    var bankcode=document.getElementsByName("prpDAccountBankCode")[cGetRow];//获取当前list值

    var bank=document.getElementsByName("prpDAccountBank")[cGetRow];
    	if(bankcode.value!=""||bank.value!=""){
     		bankcode.value="";
			bank.value="";
    	}
	
}
//add by chengyu begin 2012-08-29 账户联行号关联查询
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
		alert("请先输入地区和银行类别信息！");
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

        window.status = "正在查询代码......";

        return;

    }

    setSign(new Date().getTime());    



    setInquery(true);

    setQueryError(false);



    //请求服务器

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
           //Modify by fan 20060623 修改了合约管理险别显示的问题
           //有待修改,目前只能处理最后一行
            
           
           insertRow = getRowsCount("SectionPartC");             
           
           if  (insertRow>0)
           {
           		fmcode.riskcode.value= fm.fhStatiTypeRiskCode[insertRow].value;
        	}
        	else
        	{
        		//原来的写法
        		fmcode.riskcode.value= fm.riskcode.value;
        	}
           //Modify end fan
        }catch(ex)

        {

        	 fmcode.riskcode.value = "PUB";

        }

        fmcode.submit(); 

                                                                       //提交

    }

    catch(E){

        if(DEBUG_MODE==true){

            alert("==============="+E);

        }

    }

}
//end by chengyu  2012-08-31共保人账户信息  如果开户行地区和银行类别发生改变清空银行号

