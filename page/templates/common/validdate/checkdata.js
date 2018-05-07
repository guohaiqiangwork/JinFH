/**
 * @author user
 */
		YAHOO.namespace("quote.data");

		//定义所有的校验规则
		YAHOO.quote.data.zhsPar=/[\u4e00-\u9fa5]{2,}/;
		YAHOO.quote.data.idnoPar=/^\d{15}(\d{2}[A-Za-z0-9])?$|^\d{9}([A-Za-z0-9])?$|^\d{11}([A-Za-z0-9])?$/;
		YAHOO.quote.data.forbidPar=/\*|\@/;
		YAHOO.quote.data.numPar= /^(([+])?(0|([1-9][0-9]*))([.][0-9]+)?)?$/;
		YAHOO.quote.data.unnegativeIntPar= /^[1-9]\d*$|^0$/;
		YAHOO.quote.data.moneyPar=/\d{1,10}/;
		YAHOO.quote.data.plusMoneyPar = /^((0|[1-9][0-9]*)([.][0-9]{1,2})?)?$/;
		YAHOO.quote.data.moneyPointPar=/^(\-?(0|[1-9][0-9]*)([.][0-9]{1,2})?)?$/;
		YAHOO.quote.data.ratePar=/\d{1,4}\.\d{0,4}$|\d{1,4}$/;
		YAHOO.quote.data.money1Par = /^\-?[1-9]\d{0,2},(\d{3},)*\d{3}(\.\d+)?$|^\-?[1-9]\d{0,2}(\.\d+)?$|^\-0?(\.\d+)$|^\-0(\.\d+)?$|^0?(\.\d+)?/;
		YAHOO.quote.data.numSpacePar=/\d{1,}\ |\d{1,}$/g;
		YAHOO.quote.data.vinPar=/[A-Za-z0-9]{17}/;
		YAHOO.quote.data.agePar=/[0-9]{1,3}/;
		YAHOO.quote.data.newDicPar=/^@/;
		YAHOO.quote.data.errTipPar = /\[错误\:/;
		YAHOO.quote.data.emailPar=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		//YAHOO.quote.data.datePar =/[\d]{4}[-][\d]{1,2}[-][\d]{1,2}/;
		//YAHOO.quote.data.datetimePar =/[\d]{4}[-][\d]{1,2}[-][\d]{1,2}/;
		YAHOO.quote.data.queryPar = /[&\\^'"]/;
		YAHOO.quote.data.identityPar=/(^\d{15}$)|(^\d{17}([0-9]|X)$)/;

		//定义所有的校验类型（对应input域的class）
		YAHOO.quote.data.dcchkPar=/dc-chk/;
		YAHOO.quote.data.dttextPar=/dt-text/;
		YAHOO.quote.data.dtnumPar=/dt-num/;
		YAHOO.quote.data.dtunnegativeIntPar=/dt-unnegativeInt/;
		YAHOO.quote.data.dtmoneyPar=/dt-money/;
		YAHOO.quote.data.dtplusMoneyPar=/dt-plusMoney/;
		YAHOO.quote.data.dtratePar=/dt-rate/;
		YAHOO.quote.data.dtdatePar=/dt-date/;
		YAHOO.quote.data.dtzhsPar=/dt-zhs/;
		YAHOO.quote.data.dtvinPar=/dt-vin/;
		YAHOO.quote.data.dtagePar=/dt-age/;
		YAHOO.quote.data.dqueryPar=/dt-query/;
		YAHOO.quote.data.dtemailPar=/dt-email/;
		YAHOO.quote.data.dtidentityPar=/dt-identity/;

		YAHOO.quote.data.lenPar=/[^\x00-\xff]/g;

		YAHOO.quote.data.strLen=function(){return this.replace(YAHOO.quote.data.lenPar,"aa").length;}
		YAHOO.quote.data.isDate=function(str){
			var r = str.match(/^(\d{1,4})(-)(\d{1,2})\2(\d{1,2})$/);
			if(r==null)return false;
			var d = new Date(r[1], r[3]-1, r[4]);
			return(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
		}
		YAHOO.quote.data.isTime=function(str){
			var r = str.match(/^(\d{1,4})(-)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
			if(r==null)return false;
			var d = new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]);
			return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]);
		}

		YAHOO.quote.data.rangeOfMoney=function(str){			
			if(parseFloat(str)>=1000000000000||parseFloat(str)<=-1000000000000){
				return false;
			}
			return true;
		}

		//校验数据
		YAHOO.quote.data.datacheck=function(root){
			//输入内容的长度校验
			//if(!$.checkTextTextAreaLength()){
			//	return false;
			//}
			YAHOO.quote.data.datacheck.clearTips();
			var vFlag = true;
			var arrEl = YAHOO.util.Dom.getElementsBy(YAHOO.quote.data.datacheck.isElement,"input",root);
			for(var i=0;i<arrEl.length;i++){
				var el = arrEl[i];
				//是否超长

				//是否为空:如果要求不为空而为空，则直接抛错。
				if(YAHOO.quote.data.dcchkPar.test(el.className)){
					if(trim(el.value)==""){
						YAHOO.quote.data.datacheck.adderror(el,"这里是必输项，必须填写信息！请正确填写！");
						vFlag = false;
					}else{//对于快捷键操作，input域名称未及时更新问题
						var hiddenCom = document.getElementById(el.id.substring(0,el.id.length-3));
						if(!!hiddenCom){
							if(trim(hiddenCom.value)=="" && el.id.substring(el.id.length-3)=="_ac"){
								YAHOO.quote.data.datacheck.adderror(el,"这里是必输项，必须填写信息！请正确填写！");
								vFlag = false;
							}
						}
					}
				}
				//数字类型
				if(YAHOO.quote.data.dtnumPar.test(el.className)){
					if((el.value && el.value.length>0 && trim(el.value).length==0 ) || (trim(el.value)!=""&&!YAHOO.quote.data.numPar.test(el.value))){
						YAHOO.quote.data.datacheck.adderror(el,"这里必须填写一个不含空格的正确的数字!请仔细检查！");
						vFlag = false;
					}
				}
				//正整数或0
				if(YAHOO.quote.data.dtunnegativeIntPar.test(el.className)){
					if((el.value && el.value.length>0 && trim(el.value).length==0 ) || (trim(el.value)!=""&&!YAHOO.quote.data.unnegativeIntPar.test(el.value))){
						YAHOO.quote.data.datacheck.adderror(el,"这里必须填写一个不含空格的正整数或0!请仔细检查！");
						vFlag = false;
					}
				}
				//日期类型
				if(YAHOO.quote.data.dtdatePar.test(el.className)){
					if(el.value!=""&&!YAHOO.quote.data.isDate(el.value)){
						YAHOO.quote.data.datacheck.adderror(el,"这里必须填写一个不含空格的正确的日期(YYYY-MM-DD)！请仔细检查！");
						vFlag = false;
					}
				}
				//email类型
				if(YAHOO.quote.data.dtemailPar.test(el.className)){
					if(trim(el.value)!=""&&!YAHOO.quote.data.emailPar.test(el.value)){
						YAHOO.quote.data.datacheck.adderror(el,"这里必须填写一个正确的电子邮箱地址(xxx@xxx.xxx)！请仔细检查！");
						vFlag = false;
					}
				}
				//货币类型
				if(YAHOO.quote.data.dtmoneyPar.test(el.className)){
					if((el.value && el.value.length>0 && trim(el.value).length==0 ) ||(trim(el.value)!="" && !YAHOO.quote.data.moneyPointPar.test(el.value))){
						YAHOO.quote.data.datacheck.adderror(el,"这里必须填写一个不含空格的正确的数量！请仔细检查！");
						vFlag = false;
					}else{
						if(trim(el.value)!="" && !YAHOO.quote.data.rangeOfMoney(el.value)){
							YAHOO.quote.data.datacheck.adderror(el,"金额范围为(-10000亿，10000亿)！请仔细检查！");
							vFlag = false;
						}
					}
				}
								
				//正货币类型
				if(YAHOO.quote.data.dtplusMoneyPar.test(el.className)){
					if((el.value && el.value.length>0 && trim(el.value).length==0 ) ||(trim(el.value)!="" && !YAHOO.quote.data.plusMoneyPar.test(el.value))){
						YAHOO.quote.data.datacheck.adderror(el,"该处金额必须是正金额且保留小数点后两位！请仔细检查！");
						vFlag = false;
					}
				}
				//比例 类型
				if(YAHOO.quote.data.dtratePar.test(el.className)){
					if(((el.value && el.value.length>0 && trim(el.value).length==0 ) || (trim(el.value)!=""&&!YAHOO.quote.data.ratePar.test(el.value)))){
						YAHOO.quote.data.datacheck.adderror(el,"这里必须填写一个正确的数值,例如0.1234！请仔细检查！");
						vFlag = false;
					}else if(trim(el.value)!="" && (parseFloat(trim(el.value))<0 || parseFloat(trim(el.value))>100)){//比例在0~100內
						YAHOO.quote.data.datacheck.adderror(el,"这里必须填写一个正确的数值且在0~100內,例如0.1234！请仔细检查！");
						vFlag = false
					}
				}
				//中文文字型
				if(YAHOO.quote.data.dtzhsPar.test(el.className)){
					if(trim(el.value)!=""&&! YAHOO.quote.data.zhsPar.test(el.value)){
						YAHOO.quote.data.datacheck.adderror(el,"这里必须填写正确的文字！请仔细检查！");
						vFlag = false;
					}
				}
				//校验VIN码
				if(YAHOO.quote.data.dtvinPar.test(el.className)){
					if(trim(el.value)!=""&&! YAHOO.quote.data.vinPar.test(el.value)){
						YAHOO.quote.data.datacheck.adderror(el,"这里必须填写17位VIN码！请仔细检查VIN码是否为17位！");
						vFlag = false;
					}
				}

				//校验年龄
				if(YAHOO.quote.data.dtagePar.test(el.className)){
					if(trim(el.value)!=""&&! YAHOO.quote.data.agePar.test(el.value)){
						YAHOO.quote.data.datacheck.adderror(el,"请填写正确的年龄！");
						vFlag = false;
					}
				}
				
				//校验身份证
				if(YAHOO.quote.data.dtidentityPar.test(el.className)){
					if(trim(el.value)!=""&&! YAHOO.quote.data.identityPar.test(el.value)){
						YAHOO.quote.data.datacheck.adderror(el,"请填写正确的身份证号码，15位号码应全为数字，18位号码末位可以为数字或X！");
						vFlag = false;
					}
				}

				//校验查询条件，不能含有特殊字符
				if(YAHOO.quote.data.dqueryPar.test(el.className)){
					if(trim(el.value)!=""&& YAHOO.quote.data.queryPar.test(el.value)){
						YAHOO.quote.data.datacheck.adderror(el,"请输入正确的内容，不能含有特殊字符！");
						vFlag = false;
					}else{
						if(trim(el.value).length>0&&trim(el.value).substring(0,1)=="*"){
							YAHOO.quote.data.datacheck.adderror(el,"为提升系统性能，请不要在第一位输入模糊查询字符“*”！");
							vFlag = false;
						}
					}
				}
			}
			return vFlag;
		}
		YAHOO.quote.data.datacheck.errTips=[];
//		YAHOO.quote.data.datacheck.errObjs=[];
		YAHOO.quote.data.datacheck.clearTips=function(){
			for(var i=0;i<YAHOO.quote.data.datacheck.errTips.length;i++){
				var errtip = YAHOO.quote.data.datacheck.errTips[i];
				var el = errtip._context;
				if(false){
					el.title="";
					YAHOO.util.Dom.removeClass(el,"dc-err");
				}else{
					el[0].title="";
					YAHOO.util.Dom.removeClass(el[0],"dc-err");
				}
				errtip.destroy();;
			}
			YAHOO.quote.data.datacheck.errTips=[];
		}
		//根据el的id，获取相应的tip的id。
		YAHOO.quote.data.datacheck.getTipNameByEl=function(el,tname){
			if(el.id!=""){
				tname = "errtip_"+el.id;
			}else{
				tname = "errtip_"+el.name;
			}
//			alert("name is "+tname);
			return tname;
		}

		/**
		 * 增加错误消息
		 * @param {String|HTMLElement} el
		 * @param {String} msg
		 */
		YAHOO.quote.data.datacheck.adderror=function(el,msg){
			el.title = el.title + "[错误: "+msg+" ]";
			var tipname = new YAHOO.quote.data.datacheck.getTipNameByEl(el,tipname);
			tipname = ""+tipname;
			var errtip = new YAHOO.widget.Tooltip( tipname.toString(),{context:el,zIndex:300});
			YAHOO.quote.data.datacheck.errTips[ YAHOO.quote.data.datacheck.errTips.length ] = errtip;
			//YAHOO.quote.data.datacheck.errObjs[ YAHOO.quote.data.datacheck.errObjs.length ] = el;
			YAHOO.util.Dom.addClass(el,"dc-err");
		}
		//判断是否为指定的数据校验对象
		YAHOO.quote.data.datacheck.isElement=function(el){
			return true;
		}
