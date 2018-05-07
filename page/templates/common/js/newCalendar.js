YAHOO.namespace("Claim.calendar");
function init_calendar(calContainer,imgBtn,dateText,dateType){
	
    //YAHOO.util.Event.addListener(imgBtn,"click",popCalendar,imgBtn,true);

   // YAHOO.util.Event.addListener(imgBtn,"click",popCalendar,imgBtn,true);
   
    //imgBtn：为绑定事件的元素id
    //"click"：为事件类型
    //popWdatePicker：为事件响应的回调函数名
    //imgBtn：当最后一个参数为true时，为回调函数传入的参数对象；当最后一个参数为false时，该参数被忽略。
   
    //集成了新的日期控件，修改回调函数
    YAHOO.util.Event.addListener(imgBtn,"click",popWdatePicker,imgBtn,true);

	//function popCalendar(){
	   //   var textCtl = document.getElementById(dateText);
	   //   fPopCalendar(textCtl, textCtl);
	   //   return false;
	//}
	
	function popWdatePicker(){
		var textCtl = document.getElementById(dateText);
		WdatePicker({el:textCtl});
        return false;
	}

}