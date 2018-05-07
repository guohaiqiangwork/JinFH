YAHOO.namespace("Claim.accessKey");
var ACCESS_KEY_RETURN = 0xD;   // return
var ACCESS_KEY_SAVE = 0x53;    // ctrl+S
var ACCESS_KEY_SUBMIT = 0x44;  // ctrl+D
var ACCESS_KEY_BACK = 0x46;    // ctrl+F
var ACCESS_KEY_CLOSE = 0x47;   // ctrl+G

var BUTTON_QUERY = /(^查[ 　]*询$)|(^确[ 　]*定$)/
var BUTTON_SAVE = /^(暂|保)[ 　]*存$/
var BUTTON_SUBMIT = /^提[ 　]*交$/
var BUTTON_BACK = /^返[ 　]*回$/
var BUTTON_CLOSE = /^关[ 　]*闭$/

var accessKeyMap = new HashMap();

YAHOO.util.Event.addListener(window,"load",initAllAccessKey);

function initAllAccessKey(){

    // 查找页面上所有按钮

    var list = YAHOO.util.Dom.getElementsBy(
          function(element){
		      return element.type!=null && element.type.toUpperCase() == "BUTTON";
	      },
          "INPUT",
          document.body);

    // 查找其中需要添加快捷键的按钮
    for(var i=0;i<list.length;i++){
		var el=list[i];
		if(BUTTON_QUERY.exec(el.value) != null){
			accessKeyMap.put(ACCESS_KEY_RETURN, el);

		} else if(BUTTON_SAVE.exec(el.value) != null){

			accessKeyMap.put(ACCESS_KEY_SAVE, el);
			el.value+= "(S)";
			//el.accessKey = "S";

		} else if(BUTTON_SUBMIT.exec(el.value) != null){

			accessKeyMap.put(ACCESS_KEY_SUBMIT, el);
			el.value+= "(D)";
			el.accessKey = "D";

		} else if(BUTTON_BACK.exec(el.value) != null){

			accessKeyMap.put(ACCESS_KEY_BACK, el);
			el.value+= "(F)";
			el.accessKey = "F";

		} else if(BUTTON_CLOSE.exec(el.value) != null){

			accessKeyMap.put(ACCESS_KEY_CLOSE, el);
			el.value+= "(G)";
			el.accessKey = "G";
        }
	}

    YAHOO.util.Event.addListener(document,"keydown",accessKey);
}

function accessKey() {
	var event=window.event?window.event:evt;
    if ((event.ctrlKey)
      || event.keyCode==ACCESS_KEY_RETURN){

        var el = accessKeyMap.get(event.keyCode);
        if (el != null){
        try{
        	el.focus();
            el.click();
            event.keyCode=0;   
            event.returnValue=false; 
        	}
        	catch(e){
        	
        	}
        }  
     }
    
}
