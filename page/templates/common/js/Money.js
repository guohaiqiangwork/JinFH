var list = document.getElementsByTagName("input");
var size = list.length;
for(var i=0;i<size;i++){
  var object = list[i];
  var el = object.getAttribute("class");
  if (el == null){
    el = object.getAttribute("className");
  }
  if (el == null){
    continue;
  }
  var money = el.indexOf("dt-money");
  var plusMoney = el.indexOf("dt-plusMoney");
  if(money>0 || plusMoney>0){
    YAHOO.util.Event.addListener(object,"focus",_select);
    if(object.defaultValue == "" && object.value == ""){
      object.value = "0.00";
    }
  }
  function _select(){
    this.select();
  }
}
function _initSelectMoney(){
var listNew = document.getElementsByTagName("input");
var length = listNew.length;
for(var i=0;i<length;i++){
  var object = listNew[i];
  var el = object.getAttribute("class");
  if (el == null){
    el = object.getAttribute("className");
  }
  if (el == null){
    continue;
  }
  var money = el.indexOf("dt-money");
  var plusMoney = el.indexOf("dt-plusMoney");
  if(money>0 || plusMoney>0){
    YAHOO.util.Event.addListener(object,"focus",_select);
    if(object.defaultValue == "" && object.value == ""){
      object.value = "0.00";
    }
  }
  function _select(){
    this.select();
  }
}
}