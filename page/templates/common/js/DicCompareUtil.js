/**
*险类枚举
*/
function ClassCodeEnum(){
	this.A = "A";
	this.B = "B";
	this.C = "C";
	this.D = "D";
	this.E = "E";
	this.F = "F";
	this.G = "G";
	this.H = "H";
	this.I = "I";
	this.J = "J";
	this.K = "K";
	this.L = "L";
	this.M = "M";
	this.N = "N";
	this.O = "O";
	this.P = "P";
	this.Q = "Q";
	this.R = "R";
	this.S = "S";
	this.T = "T";
	this.U = "U";
	this.V = "V";
	this.W = "W";
	this.X = "X";
	this.Y = "Y";
	this.Z = "Z";
}

function DicCompareUtil() {
	this.ClassCode=new ClassCodeEnum();
	/**
	 * 初始化新旧险类对照表 ，目前先将新旧代码写成一致，等确定信息后再调整
	 */
	this.ClassCodeCompareTable={
		"A":["A","16"],          
		"B":["B","12"],          
		"C":["C","08"],          
		"D":["D","05"],          
		"E":["E","06","20"],     
		"F":["F","F"],           
		"G":["G","03"],          
		"H":["H","13"],          
		"I":["I","14"],          
		"J":["J","04","02"],     
		"K":["K","17"],          
		"L":["L","21"],          
		"M":["M","15"],          
		"N":["N","18"],          
		"O":["O","19"],          
		"P":["P","P"],           
		"Q":["Q","01"],          
		"R":["R","R"],           
		"S":["S","01"],          
		"T":["T","01"],          
		"U":["U","U"],           
		"V":["V","V"],           
		"W":["W","07","23","22"],
		"X":["X","11"],          
		"Y":["Y","09"],          
		"Z":["Z","10"]           
          		
	};
	//新旧代码对比
	this.compareClassCode=function(ClassCode,classCodeCode){
		if(typeof classCodeCode !='string'){
			return false;
		}
		var ret=false;
		//对于字符串为空的情况返回false
		classCodeCode=classCodeCode.replace(/(^\s*)|(\s*$)/g, ""); 
		if(classCodeCode.length<1){
			return false; 
		}
		/**if(classCodeCode==DicCompareUtil.ClassCodeCompareTable[ClassCode][0]
			||classCodeCode==DicCompareUtil.ClassCodeCompareTable[ClassCode][1]){
			ret=true;
		}*/
		for(var i=0;i<DicCompareUtil.ClassCodeCompareTable[ClassCode].length;i++){
			if(classCodeCode==DicCompareUtil.ClassCodeCompareTable[ClassCode][i]){
				ret=true;
				break;
			}
		}
		return ret;
	}
	//获取新代码
	/**this.getClassCodeNewCode=function(ClassCode){
		return DicCompareUtil.ClassCodeCompareTable[ClassCode][1];
	};*/
	//获取老代码
	/**this.getClassCodeOldCode=function(ClassCode){
		return DicCompareUtil.ClassCodeCompareTable[ClassCode][0];
	};*/
	//根据险类代码获取险类
	this.getClassCode=function(classCode){
		if(typeof classCode !='string'){
			return "";
		}
		classCode=classCode.replace(/(^\s*)|(\s*$)/g, ""); 
		if(""==classCode){
			return "";
		}
		var ret="";
		for(var key in DicCompareUtil.ClassCodeCompareTable){
			/**if(DicCompareUtil.ClassCodeCompareTable[key][0]==classCode||
				DicCompareUtil.ClassCodeCompareTable[key][1]==classCode){
				ret=key;
				break;	
			}*/
			if(DicCompareUtil.compareClassCode(key,classCode)){
				ret=key;
				break;
			}
		}
		return key;
	}
}
window.DicCompareUtil=new DicCompareUtil();
/**
使用例子：
window.alert(DicCompareUtil.compareClassCode(
				DicCompareUtil.ClassCode.A, "B"));
window.alert(DicCompareUtil.compareClassCode(
				DicCompareUtil.ClassCode.B, "B"));
window.alert(DicCompareUtil.getClassCodeOldCode(
				DicCompareUtil.ClassCode.B));
window.alert(DicCompareUtil.getClassCodeNewCode(
				DicCompareUtil.ClassCode.B));				
				*/