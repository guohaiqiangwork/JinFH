define(['app', 
	'config',
	'codes',
    '/reins/page/templates/common/directives/currency.js',
    '/reins/page/templates/common/directives/percentage.js',
    '/reins/page/templates/common/directives/year.js'
], function (app, config, codes) {

    app.registerController('InquiryDetailModalCtrl', ['$scope', '$stateParams', '$modalInstance','$location', 'certiType', 'certiNo', 'dangerNo',  '$window', 'user', 'RiskunitService'
    	,'operations', 'CodeService', '$q'
        	, function ($scope, $stateParams, $modalInstance, $location, certiType, certiNo, dangerNo, $window, user, riskunitService, operations
        		, codeService, $q) {
        
        $scope.certiType = certiType;
        $scope.certiNo = certiNo;
        $scope.dangerNo = dangerNo;
        $scope.user = user;
        $scope.operations = operations;
        
        
        //临分意向公式计算
       	$scope.intentionCalculator = function(contAttr, methodName, facP, riskunit, layer){
        	
        		if(contAttr === "prop"){
        			$scope.feoXReinssFlag = 0;
        			if(methodName === "getFenbaoF"){
        				//默认费率时，算出分保费（比例）
        				$scope.rate_ = parseFloat((riskunit.prm / riskunit.riskUnitAmt).toFixed(6));
		        		$scope.rate_ = parseFloat(facP.rate).toFixed(4);
        				
        				console.log("后台传入的费率: " + facP.rate);
        				console.log("初始化计算出来的费率: " + $scope.rate_);
        				console.log(Math.abs(facP. rate - $scope.rate_) === 0);
        				//当查出来的费率等于默认费率时，分保费按照保费*接受比例公式计算，否则按钮分保额*费率的公式计算
//        				if(Math.abs(facP.rate - $scope.rate_) === 0){
//        					console.log("保费的值: " + riskunit.prm);
//        					console.log("接受比例的值: " + facP.facComProp);
//        					facP.facComPrm = (parseFloat(riskunit.prm * facP.facComProp/100)).toFixed(2);
//        					console.log("默认费率时，算出分保费（比例）" + facP.facComPrm);
//        				} else {
			        		if(!(facP.rate === 0.0000 || facP.rate === null)){
				        		facP.facComPrm = (parseFloat(facP.facComAmt * facP.rate/100)).toFixed(2);
			        		}
			        		console.log("非默认费率时，算出分保费（比例）" + facP.facComPrm);
//        				}
		        		
		        		if(isNaN(facP.facComPrm)){
		        			facP.facComPrm = 0.00;
		        		}
		        		console.log(facP.facComPrm);
		        		return facP.facComPrm;
        			
        			} else if(methodName === "getFenbaoFNew"){
        				//facP.faccomOriPrm= facP.facComPrm;
        				facP.facComPrm= parseFloat(facP.faccomOriPrm*1 + facP.faccomChgPrm*1).toFixed(2);
        				if(isNaN(facP.facComPrm)){
		        			facP.facComPrm = 0.00;
		        		}
        			} else if(methodName === "getFenbaoFBhl"){
        				//默认费率时，算出分保费变化量（比例）
        				$scope.rate_ = parseFloat((riskunit.prm / riskunit.riskUnitAmt).toFixed(6));
		        		$scope.rate_ = parseFloat(facP.rate).toFixed(4);
        				
        				console.log("后台传入的费率: " + facP.rate);
        				console.log("初始化计算出来的费率: " + $scope.rate_);
        				console.log(Math.abs(facP.rate - $scope.rate_) === 0);
        				if(riskunit.riskUnitAmt === null) {
		        			riskunit.riskUnitAmt = 0;
		        		}
//        				//当查出来的费率等于默认费率时，分保费按照保费*接受比例公式计算，否则按钮分保额*费率的公式计算
        				//当费率差异为false时，分保费按照保费*接受比例公式计算，否则按钮分保额*费率的公式计算
//        				if(Math.abs(facP.rate - $scope.rate_) === 0){
						if(facP.isRateDiff === "0"){
//        					console.log("保费的值: " + riskunit.prm);
//        					console.log("接受比例的值: " + facP.facComProp);
        					facP.faccomChgPrm = (parseFloat(riskunit.prm * facP.facComProp/100) - (facP.faccomOriPrm*1)).toFixed(2);
        					//facP.faccomChgPrm = (parseFloat(((facP.facComProp/100) * riskunit.riskUnitAmt) * facP.rate/100) - (facP.faccomOriPrm*1)).toFixed(2);
        					facP.faccomChgPrm = facP.faccomChgPrm*1;
        					console.log("默认费率时，算出分保费（比例）" + facP.faccomOriPrm);
        					console.log("默认费率时，算出分保费变化量（比例）" + facP.faccomChgPrm);
        				} else {
			        		if(!(facP.rate === 0.0000 || facP.rate === null)){
				        		//facP.faccomOriPrm = (parseFloat(facP.faccomOriAmt * facP.rate/100)).toFixed(2);
				        		facP.faccomChgPrm = (parseFloat(facP.facComAmt * facP.rate/100) - (facP.faccomOriPrm*1)).toFixed(2);
			        			facP.faccomChgPrm = facP.faccomChgPrm*1;
			        		}
			        		if(isNaN(facP.faccomChgPrm)){
			        			facP.faccomChgPrm = 0.00;
			        		}
			        		console.log("非默认费率时，算出分保费（比例）" + facP.faccomOriPrm);
			        		console.log("非默认费率时，算出分保费变化量（比例）" + facP.faccomChgPrm);
        				}
        			}else if(methodName === "getRate"){
        				//初始化费率（保费/保额）（比例）
        				if(riskunit.riskUnitAmt === 0){
		        			//alert("保额作为除数，不能为0!默认设置费率值为0.0000");
		        			facP.rate = 0.0000000000;
		        		} else {
		        			if(facP.rate === 0.0000){
				        		facP.rate = parseFloat((riskunit.prm / riskunit.riskUnitAmt).toFixed(6));
				        		console.log("初始化计算出来的费率: " + facP.rate);
				        		facP.rate = (facP.rate * 100).toFixed(4);
				        		console.log("初始化计算出来的费率: " + facP.rate);
		        			} 
		        			if(isNaN(facP.rate)){
			        			facP.rate = 0.0000000000;
			        		}
			        		console.log("保额: " + riskunit.riskUnitAmt);
			        		console.log("保费: " + riskunit.prm);
			        		console.log("费率值为: " + facP.rate);
		        		}
		        		return facP.rate;
        			} else if(methodName === "getQuandanjsbl"){
        				//获取全单接受比例 - 比例
        				console.log("getQuandanjsbl is coming  ");
        		
		        		if(riskunit.coinsRate === null){
		        			riskunit.coinsRate = 1;
		        		}
		        		facP.facAbsComShare = parseFloat(facP.facComProp * riskunit.coinsRate).toFixed(4);
		        		if(isNaN(facP.facAbsComShare)){
		        			facP.facAbsComShare = 0.0000;
		        		}
		        		console.log("全单接受比例的值是：  " + facP.facAbsComShare);
		        		return facP.facAbsComShare;
		        				
        			
        			} else if(methodName === "getJsbl"){
        				//获取接受比例 - 比例
        				console.log("getJsbl is coming  ");
        		
		        		if(riskunit.coinsRate === null){
		        			riskunit.coinsRate = 1;
		        		}
		        		facP.facComProp = parseFloat(facP.facAbsComShare / riskunit.coinsRate).toFixed(4);
		        		if(isNaN(facP.facComProp)){
		        			facP.facComProp = 0.0000;
		        		}
		        		console.log("接受比例的值是：  " + facP.facComProp);
		        		return facP.facComProp;
		        				
        			
        			} else if(methodName === "getZhengdanjsbl"){
        				//获取整单接受份额 - 比例
        				console.log("getZhengdanjsbl is coming  ");
        		
		        		if(riskunit.coinsRate === null){
		        			riskunit.coinsRate = 1;
		        		}
		        		facP.facAbsFComShare = parseFloat(facP.facFComShareRate * riskunit.coinsRate).toFixed(4);
		        		if(isNaN(facP.facAbsFComShare)){
		        			facP.facAbsFComShare = 0.0000;
		        		}
		        		console.log("整单接受份额的值是：  " + facP.facAbsFComShare);
		        		return facP.facAbsFComShare;
		        				
        			
        			} else if(methodName === "getJsfl"){
        				//获取接受份额 - 比例
        				console.log("getJsfl is coming  ");
        		
		        		if(riskunit.coinsRate === null){
		        			riskunit.coinsRate = 1;
		        		}
		        		facP.facFComShareRate = parseFloat(facP.facAbsFComShare / riskunit.coinsRate).toFixed(4);
		        		if(isNaN(facP.facFComShareRate)){
		        			facP.facFComShareRate = 0.0000;
		        		}
		        		console.log("接受比例的值是：  " + facP.facFComShareRate);
		        		return facP.facFComShareRate;
		        				
        			
        			} else if(methodName === "getFenbaoE"){
        				//获取分保额 - 比例
        				console.log("getFenbaoE is coming  ");
		        		if(riskunit.riskUnitAmt === null) {
		        			riskunit.riskUnitAmt = 0;
		        		}
		        		facP.facComAmt = parseFloat((facP.facComProp/100) * riskunit.riskUnitAmt).toFixed(2);
		        		if(isNaN(facP.facComAmt)){
		        			facP.facComAmt = 0.00;
		        		}
		        		console.log("分保额的值是：  " + facP.facComAmt);
		        		return facP.facComAmt;
		        				
        			
        			} else if(methodName === "getFenbaoEBhl"){
        				//获取分保额变化量 - 比例
        				console.log("getFenbaoEBhl is coming  ");
		        		if(riskunit.riskUnitAmt === null) {
		        			riskunit.riskUnitAmt = 0;
		        		}
		        		facP.faccomChgAmt = parseFloat((facP.facComProp/100) * riskunit.riskUnitAmt - facP.faccomOriAmt*1).toFixed(2);
		        		facP.faccomChgAmt = facP.faccomChgAmt*1;
		        		facP.facComAmt = facP.faccomOriAmt*1 + facP.faccomChgAmt*1;
		        		if(isNaN(facP.faccomChgAmt)){
		        			facP.faccomChgAmt = 0.00;
		        		}
		        		console.log("分保额变化量的值是：  " + facP.faccomChgAmt);
		        		return facP.faccomChgAmt;
		        				
        			
        			} else if(methodName === "chushihua1"){
        				//分保额初始化（比例）
        				//alert("初始化分保额");
		            	console.log(facP.facComAmt);
		            	console.log(riskunit.riskUnitAmt);
		            	console.log(facP.facComProp);
		            	if(angular.isUndefined(facP.facComProp) || facP.facComProp === null){
		            		facP.facComProp = 0.0000;
		            	}
		            	if(!(facP.facComAmt === 0.0000)){
			                facP.facComAmt = parseFloat(riskunit.riskUnitAmt * (facP.facComProp/100)).toFixed(2);
		            	} else {
		            		facP.facComAmt = 0.0000;
		            	}
		            	if(isNaN(facP.facComAmt)){
		        			facP.facComAmt = 0.00;
		        		}
		                console.log("初始化1---start");
		                console.log(facP.facComAmt);
		                console.log("初始化1---end");
		                return facP.facComAmt;
		        				
        			
        			} else if(methodName === "chushihua1chgComAmt"){
        				//分保额变化量初始化（比例）
        				//alert("初始化分保额变化量");
		            	console.log(facP.facComAmt);
		            	console.log(riskunit.riskUnitAmt);
		            	console.log(facP.facComProp);
		            	if(angular.isUndefined(facP.facComProp) || facP.facComProp === null){
		            		facP.facComProp = 0.0000;
		            	}
		                facP.facComAmt = parseFloat(riskunit.riskUnitAmt * (facP.facComProp/100)).toFixed(2);
		                if(isNaN(facP.facComAmt)){
		        			facP.facComAmt = 0.00;
		        		}
		                console.log("初始化1---start");
		                console.log("初始化1---end");
        			} else if(methodName === "getChangedRate"){
        				//税率（比例）
        				facP.rate = (parseFloat((facP.facComPrm / facP.facComAmt)*100)).toFixed(10);
        				if(isNaN(facP.rate)){
		        			facP.rate = 0.0000000000;
		        		}
		            	console.log("新的税率 " + facP.rate);
		            	return facP.rate;
        			} else if(methodName === "getChangedRateNew"){
        				//税率新值（比例）
        				if((facP.faccomOriAmt*1 + facP.faccomChgAmt*1) != 0){
	        				facP.rate = (parseFloat((facP.faccomOriPrm*1 + facP.faccomChgPrm*1) / (facP.faccomOriAmt*1 + facP.faccomChgAmt*1)*100)).toFixed(4);
        				} else {
        					facP.rate = 0.0000;
        				}
        				if((facP.rate) < 0){
        					alert("费率的值不能小于0!");
        				}
        				if(isNaN(facP.rate)){
		        			facP.rate = 0.0000;
		        		}
		            	console.log("新的税率新值 " + facP.rate);
		            	return facP.rate;
        			} else if(methodName === "fenbaofei"){
        				//此处layer的值仅用来区保单分"费率差异"点选框"是=1","否=0"的值，因传递的值刚好相反
        				if(layer === "1-BD"){
        					facP.isRateDiff = "1"
        				}
        				if(layer === "0-BD"){
        					facP.isRateDiff = "0"
        				}
        				//分保费 （比例）
        				if(facP.isRateDiff === "0"){
//        					console.log("保费的值: " + riskunit.prm);
//        					console.log("接受比例的值: " + facP.facComProp);
        					facP.facComPrm = (parseFloat(riskunit.prm * facP.facComProp/100)).toFixed(2);
        					console.log("默认费率时，算出分保费（比例）" + facP.facComPrm);
        				} else {
			        		if(!(facP.rate === 0.0000 || facP.rate === null)){
				        		facP.facComPrm = (parseFloat(facP.facComAmt * facP.rate/100)).toFixed(2);
			        		}
			        		console.log("非默认费率时，算出分保费（比例）" + facP.facComPrm);
        				}
		        		
		                if(isNaN(facP.facComPrm)){
		        			facP.facComPrm = 0.00;
		        		}
		                console.log(facP.facComPrm);
		                return facP.facComPrm;
        			
        			} else if(methodName === "getFenbaoEBhlByFenbaoE"){
        				//通过分保额算出分保额变化量 （比例）
        				console.log(facP.faccomOriAmt);
	                	facP.faccomChgAmt= parseFloat(facP.facComAmt - facP.faccomOriAmt*1).toFixed(2);
		                console.log("分保额变化量 的值： " + facP.faccomChgAmt);
		                return facP.faccomChgAmt;
        			} else if(methodName === "fenbaofeiBhl"){
        				//此处layer的值仅用来批单区分"费率差异"点选框"是=1","否=0"的值，因传递的值刚好相反
        				if(layer === "1-PD"){
        					facP.isRateDiff = "1"
        				}
        				if(layer === "0-PD"){
        					facP.isRateDiff = "0"
        				}
        				//分保费变化量 （比例）
        				console.log("faccomOriAmt---"+facP.faccomOriAmt);
		                console.log("faccomOriPrm----"+facP.faccomOriPrm);
		                if(facP.isRateDiff === "0"){
   		                	facP.faccomChgPrm= ((parseFloat(riskunit.prm * facP.facComProp/100)) - facP.faccomOriPrm*1).toFixed(2);
		                } else {
		                	facP.faccomChgPrm= (parseFloat((facP.faccomOriAmt*1 + facP.faccomChgAmt*1) * (facP.rate/100)) - facP.faccomOriPrm*1).toFixed(2);
		                	//facP.faccomChgPrm= (parseFloat((facP.faccomChgAmt*1) * (facP.rate/100))).toFixed(2);
		                	if(!(facP.rate === 0.0000 || facP.rate === null)){
				        		facP.facComPrm = (parseFloat(facP.facComAmt * facP.rate/100)).toFixed(2);
			        		}
			        		console.log("非默认费率时，算出分保费（比例）" + facP.facComPrm);
		                }
		                if(isNaN(facP.faccomChgPrm)){
		        			facP.faccomChgPrm = 0.00;
		        		}
		                console.log(facP.faccomChgPrm);
		                return facP.faccomChgPrm;
		        				
        			
        			} else if(methodName === "jingfenbaofei"){
        				//净分保费（比例）
        				if(facP.facComComm === "" || facP.facComTax === "" || facP.insGrntAmt === "" ||
        					facP.facComBroke === "" || facP.facComOther === ""){
        					facP.facComComm = 0;
        					facP.facComTax = 0;
        					facP.insGrntAmt = 0;
        					facP.facComBroke = 0;
        					facP.facComOther = 0;
        				}
	                	facP.facComBalance = (parseFloat((facP.facComPrm - facP.facComPrm * parseFloat(facP.facComComm/100) - facP.facComPrm * parseFloat(facP.facComTax/100) - facP.facComPrm * parseFloat(facP.insGrntAmt/100) - 
		                	facP.facComPrm * parseFloat(facP.facComBroke/100) - facP.facComPrm * parseFloat(facP.facComOther/100)))).toFixed(2);
	                	facP.facComBalance = (parseFloat((facP.facComPrm 
	                		 - parseFloat(facP.facComPrm * parseFloat(facP.facComComm/100)).toFixed(2)
	                		 - parseFloat(facP.facComPrm * parseFloat(facP.facComTax/100)).toFixed(2)
	                		 - parseFloat(facP.facComPrm * parseFloat(facP.insGrntAmt/100)).toFixed(2)
	                		 - parseFloat(facP.facComPrm * parseFloat(facP.facComBroke/100)).toFixed(2)
	                		 - parseFloat(facP.facComPrm * parseFloat(facP.facComOther/100)).toFixed(2)))).toFixed(2);
		               	if(isNaN(facP.facComBalance)){
		        			facP.facComBalance = 0.00;
		        		}
		               	console.log("净分保费 计算 start...");
						console.log(facP.facComBalance);
						console.log("净分保费 计算 end...");
		                return facP.facComBalance;
        			} else if(methodName === "jingfenbaofeiNew"){
        				//净分保费变化量（比例）
        				if(facP.facComComm === "" || facP.facComTax === "" || facP.insGrntAmt === "" ||
        					facP.facComBroke === "" || facP.facComOther === ""){
        					facP.facComComm = 0;
        					facP.facComTax = 0;
        					facP.insGrntAmt = 0;
        					facP.facComBroke = 0;
        					facP.facComOther = 0;
        				}
	                	facP.facComBalance = (parseFloat(((facP.faccomOriPrm*1 + facP.faccomChgPrm*1) - 
	                		parseFloat((facP.faccomOriPrm*1 + facP.faccomChgPrm*1) * parseFloat((facP.facComComm*1)/100)).toFixed(2) -
	                		parseFloat((facP.faccomOriPrm*1 + facP.faccomChgPrm*1) * parseFloat((facP.facComTax*1)/100)).toFixed(2) - 
	                		parseFloat((facP.faccomOriPrm*1 + facP.faccomChgPrm*1) * parseFloat((facP.insGrntAmt*1)/100)).toFixed(2) - 
		                	parseFloat((facP.faccomOriPrm*1 + facP.faccomChgPrm*1) * parseFloat((facP.facComBroke*1)/100)).toFixed(2) - 
		                	parseFloat((facP.faccomOriPrm*1 + facP.faccomChgPrm*1) * parseFloat((facP.facComOther*1)/100)).toFixed(2)))).toFixed(2);
		               	facP.facComBalance = facP.facComBalance*1;
		               	if(isNaN(facP.facComBalance)){
		        			facP.facComBalance = 0.00;
		        		}
		               	console.log("净分保费最新值 计算 start...");
		               	console.log(facP.facComBalance);
						console.log("净分保费最新值 计算 end...");
        			}
        		
        		} else if(contAttr === "nprop"){
        		
        			if(methodName === "getFenbaofeiNprop"){
        				//获取分保费 - 超赔
        				console.log("获取分保费 - 超赔");
		        		facP.premium = (parseFloat(layer.layerPremium * (facP.shareRate/100))).toFixed(2);
		        		if(isNaN(facP.premium)){
		        			facP.premium = 0.00;
		        		}
		        		console.log("分保费 - 超赔 " + facP.premium);
		        		return facP.premium;
        			} else if(methodName === "getAllFeoXReinsChgPrm"){
        				//获取变化分保费 - 超赔
        				console.log("获取变化分保费 - 超赔");
        				if(angular.isUndefined(layer.layerPremium)){
        					layer.layerPremium = 0;
        				}
        				if(layer.feoXReinsVos.length>0){
	        				$.each(layer.feoXReinsVos, function(index, fac){
	        					if(angular.isUndefined(fac.oriPremium)){
	        						fac.oriPremium = 0;
	            				}
				        		fac.chgPreium = (parseFloat((layer.layerPremium*1) * (fac.shareRate/100) - fac.oriPremium)).toFixed(2);
				        		fac.chgPreium = fac.chgPreium*1;
				        		if(isNaN(fac.chgPreium)){
				        			fac.chgPreium = 0.00;
				        		}
				        		console.log("变化分保费 - 超赔 " + fac.chgPreium);
	        				});
        				}
        			}else if(methodName === "getAllFeoXReinsPrm"){
        				//获取变化分保费 - 超赔
        				console.log("获取getFeoXReinsPrm - 超赔");
        				if(angular.isUndefined(layer.layerPremium)){
        					layer.layerPremium = 0;
        				}
        				if(layer.feoXReinsVos.length>0){
	        				$.each(layer.feoXReinsVos, function(index, fac){
				        		fac.premium = (parseFloat(layer.layerPremium * fac.shareRate/100 )).toFixed(2);
				        		fac.premium = fac.premium*1;
				        		if(isNaN(fac.premium)){
				        			fac.premium = 0.00;
				        		}
				        		console.log("getFeoXReinsPrm - 超赔 " + fac.premium);
	        				});
        				}
        			} else if(methodName === "getFeoXReinsChgPrm"){
        				//获取变化分保费(接受比例) - 超赔
        				console.log("获取变化分保费(接受比例) - 超赔");
        				if(angular.isUndefined(layer.layerPremium)){
        					layer.layerPremium = 0;
        				}
        				if(angular.isUndefined(facP.oriPremium)){
        					facP.oriPremium = 0;
        				}
        				
		        		facP.chgPreium = (parseFloat((layer.layerPremium*1) * (facP.shareRate/100) - facP.oriPremium)).toFixed(2);
        				if(isNaN(facP.chgPreium)){
		        			facP.chgPreium = 0.00;
		        		}
        				console.log(facP.chgPreium);
        			} else if(methodName === "getCengbaofeiBh"){
        				//获取层保费变化量(接收人变化分保费逆运算) - 超赔

		            	console.log("getCengbaofeiBh is coming  ");
		            	layer.layerchgPremium = (parseFloat((facP.chgPreium*1 + facP.premium*1) / (facP.shareRate/100) - layer.layerPremium)).toFixed(2);
		        		layer.layerchgPremium = layer.layerchgPremium*1;
		        		if(isNaN(layer.layerchgPremium)){
		        			layer.layerchgPremium = 0.00;
		        		}
		        		console.log("层保费变化量(接收人变化分保费逆运算)的值是：  " + layer.layerchgPremium);
		        		return layer.layerchgPremium;
        			
        			} else if(methodName === "getFenchufeneNprop"){
        				//获取分出份额 - 超赔
        				console.log("获取分出份额 - 超赔");
		        		if(riskunit.coinsRate === null){
		        			riskunit.coinsRate = 100;
		        		} 
		        		layer.shareRate = parseFloat(layer.absShareRate / riskunit.coinsRate).toFixed(4);
		        		if(layer.shareRate*1 > 100){
		        			$scope.fenchuFeneCheck = false;
		        			alert("超赔层的分出份额不能大于100！");
		        		} else {
		        			$scope.fenchuFeneCheck = true;
		        		}
		        		if(isNaN(layer.shareRate)){
		        			layer.shareRate = 0.0000;
		        		}
		        		return layer.shareRate;

        			} else if(methodName === "getQuandanFenchublNprop"){
        				//获取全单分出比例 - 超赔
        				console.log("获取全单分出比例 - 超赔");
		        		if(riskunit.coinsRate === null){
		        			riskunit.coinsRate = 1;
		        		}
		        		layer.absShareRate = parseFloat(layer.shareRate * riskunit.coinsRate).toFixed(4);
		        		if(isNaN(layer.absShareRate)){
		        			layer.absShareRate = 0.0000;
		        		}
		        		return layer.absShareRate;

		        				
        			
        			} else if(methodName === "getJsblNprop"){
        				//获取接受比例 - 超赔
        				$scope.feoXReinssFlag = 0;

        				console.log("getJsblNprop is coming  ");
        		
		        		if(riskunit.coinsRate === null) {
		        			riskunit.coinsRate = 1;
		        		}
		        		facP.shareRate = parseFloat(facP.absShareRate * riskunit.coinsRate).toFixed(4);
		        		if(isNaN(facP.shareRate)){
		        			facP.shareRate = 0.0000;
		        		}
		        		console.log("接受比例的值是：  " + facP.shareRate);
		        		return facP.shareRate;

		        				
        			
        			} else if(methodName === "getQuandanjsblNprop"){
        				//获取全单接受比例 - 超赔
        				$scope.feoXReinssFlag = 0;

        				console.log("getQuandanjsblNprop is coming ");
        		
		        		if(riskunit.coinsRate === null){
		        			riskunit.coinsRate = 1;
		        		}
		        		facP.absShareRate = parseFloat(facP.shareRate / riskunit.coinsRate).toFixed(4);
		        		if(isNaN(facP.absShareRate)){
		        			facP.absShareRate = 0.0000;
		        		}
		        		console.log("全单接受比例的值是：  " + facP.absShareRate);
		        		return facP.absShareRate;
		        				
        			
        			} else if(methodName === "getCengfenbaofei"){
        				//获取层分保费 - 超赔

		            	console.log("getCengfenbaofei is coming  ");
		        		layer.layerrePreium = (parseFloat(layer.layerPremium * (layer.shareRate/100))).toFixed(2);
		        		layer.layerrePreium = layer.layerrePreium*1;
		        		if(isNaN(layer.layerrePreium)){
		        			layer.layerrePreium = 0.00;
		        		}
		        		console.log("层分保费的值是：  " + layer.layerrePreium);
		        		return layer.layerrePreium;
		        				
        			
        			} else if(methodName === "getBhlToCengbaofei"){
        				//获取层保费（变化量） - 超赔

		            	console.log("getBhlToCengbaofei is coming  ");
		            	layer.layerchgPremium = (parseFloat((layer.layerrePreium*1 + layer.layerReChgPrem*1) / (layer.shareRate/100) - layer.layerPremium)).toFixed(2);
		        		layer.layerchgPremium = layer.layerchgPremium*1;
		        		if(isNaN(layer.layerchgPremium)){
		        			layer.layerchgPremium = 0.00;
		        		}
		        		console.log("层保费（变化量）的值是：  " + layer.layerchgPremium);
		        		return layer.layerchgPremium;
		        				
        			
        			} else if(methodName === "getCengfenbaofeiBhl"){
        				//获取层分保费变化量 - 超赔

		            	console.log("getCengfenbaofeiBhl is coming  ");
		            	layer.layerReChgPrem = (parseFloat(layer.layerrePreium*1- layer.layerReOriPrem)).toFixed(2);
		        		layer.layerReChgPrem = layer.layerReChgPrem*1;
		        		if(isNaN(layer.layerReChgPrem)){
		        			layer.layerReChgPrem = 0.00;
		        		}
		        		console.log("层分保费变化量的值是：  " + layer.layerReChgPrem);
		        		return layer.layerReChgPrem;
		        				
        			
        			} else if(methodName === "getQuandanPeichangxiane"){
        				//获取全单赔偿限额  - 超赔
        				console.log("getPeichangxiane is coming  ");
        		
		        		if(riskunit.coinsRate === null){
		        			riskunit.coinsRate = 1;
		        		}
		        		layer.absLayerQuota = parseFloat(layer.layerQuota / riskunit.coinsRate).toFixed(2);
		        		if(isNaN(layer.absLayerQuota)){
		        			layer.absLayerQuota = 0.0000;
		        		}
		        		console.log("全单赔偿限额的值是：  " + layer.absLayerQuota);
		        		return layer.absLayerQuota;

        			
        			} else if(methodName === "getQuandanQipeidian"){
        				//获取全单起赔点  - 超赔

        				console.log("getQuandanQipeidian is coming  ");
        		
		        		if(riskunit.coinsRate === null){
		        			riskunit.coinsRate = 1;
		        		}
		        		layer.absExcessLoss = parseFloat(layer.excessLoss / riskunit.coinsRate).toFixed(2);
		        		if(isNaN(layer.absExcessLoss)){
		        			layer.absExcessLoss = 0.0000;
		        		}
		        		console.log("全单起赔点的值是：  " + layer.absExcessLoss);
		        		return layer.absExcessLoss;

		        				
        			
        			} else if(methodName === "getQipeidian"){
        				//获取起赔点  - 超赔

        				console.log("getQipeidian is coming");
        		
		        		if(riskunit.coinsRate === null){
		        			riskunit.coinsRate = 1;
		        		}
		        		layer.excessLoss = parseFloat(layer.absExcessLoss * riskunit.coinsRate).toFixed(2);
		        		if(isNaN(layer.excessLoss)){
		        			layer.excessLoss = 0.0000;
		        		}
		        		console.log("起赔点的值是：  " + layer.excessLoss);
		        		return layer.excessLoss;

        			} else if(methodName === "getPeichangxiane"){
        				//获取赔偿限额  - 超赔
        				console.log("getPeichangxiane is coming  ");
        		
		        		if(riskunit.coinsRate === null){
		        			riskunit.coinsRate = 1;
		        		}
		        		layer.layerQuota = parseFloat(layer.absLayerQuota * riskunit.coinsRate).toFixed(2);
		        		if(isNaN(layer.layerQuota)){
		        			layer.layerQuota = 0.0000;
		        		}
		        		console.log("赔偿限额的值是：  " + layer.layerQuota);
		        		return layer.layerQuota;


        			}else if(methodName === "getLayerChgPrem"){
        				//获取变化分保费 - 超赔
        				console.log("获取LayerChgPrem - 超赔   is coming  ");
		        		layer.layerchgPremium = (parseFloat(layer.layerPremium - layer.layerOriPrem*1)).toFixed(2);
		        		layer.layerchgPremium = layer.layerchgPremium*1;
		        		if(isNaN(layer.layerchgPremium)){
		        			layer.layerchgPremium = 0.00;
		        		}
		        		return layer.layerchgPremium;
        			}
        		
        		}
		}
        
        $scope.getCodes = function(keywords, user){
            var deffered = $q.defer();
            codeService.getCodes(keywords, user).then(
                function(data){
                    deffered.resolve(angular.copy( data));
                },
                function(code){
                    deffered.reject(code);
                }
            );
            return deffered.promise;
        };
        
        //查询字典
        var searchFlag = true;
        $scope.searchList = [];
        $scope.getCode = function(keywords,user,searcher){
            var temp = angular.copy({keywords:keywords,searcher:searcher});
            $scope.searchList.push(temp);
            if(searchFlag && $scope.searchList.length > 0){
                ralSearch();
            }
        };
        var ralSearch = function(user){
           if(searchFlag && $scope.searchList.length > 0){
                searchFlag = false;
                    $scope.getCodes($scope.searchList[0].keywords,user).then(
                        function(data){
                            $scope[$scope.searchList[0].searcher] = data;
                            searchFlag = true;
                            $scope.searchList.splice(0,1);
                            ralSearch();
                        },
                        function(code){
//                            console.log("error  "+code);
                            searchFlag = true;
                            if(angular.equals(code,"bussy")){
                                $scope.searchList.push($scope.searchList[0]);
                                $scope.searchList.splice(0,1);
                            }else{
                                $scope[$scope.searchList[0].searcher] = [];
                                $scope.searchList.splice(0,1);
                            }
                            ralSearch();
                        }
                    )
           }
        };
        
        $scope.getByReturn = function(aim,condition){
            var temp = aim+"";
            var keywords = {"id":aim,"value":condition, "holdFlag": false};
            return $scope.getCodes(keywords,{}).then(
                function(data){
                    console.log(data);
                  return data;
                },
                function(code){
                return [];
                }
            );
        };
        
        
        //初始化差异分保
      	$scope.getDifReinsAbc = function(fac, param){
      		if(param === 'dif'){
      			if((fac.deductible ==="" || fac.deductible ===null) && (fac.deductibleRate ==="" || fac.deductibleRate ===null)){
               		console.log("免赔内容全为空");
               		fac.dif = false;
               	} else {
               		fac.dif = true;
               	}
      		}
      		if(param === 'abc'){
      			if(fac.specialEngage ==="" || fac.specialEngage ===null){
               		console.log("责任内容为空");
               		fac.abc = false;
               	} else {
               		fac.abc = true;
               	}
      		}
      	}
        
        //预处理临分意向的缴费信息
        $scope.dealGetFacPayment = function(){
        	//初始化比例超赔的缴费计划变量
        	$scope.facPlyComShareVosProp = {
                facPlyComShareVos : []
        	};

            $scope.LayersNprop = {
                feoXLayerVos: []
            };

        	//初始化超赔的缴费计划信息
        	if($scope.riskunitsFacPlyInfo.feoXLayerVos.length>0){
       			$.each($scope.riskunitsFacPlyInfo.feoXLayerVos, function(index, layer){
                    $scope.LayersNprop.feoXLayerVos.push(layer);
       			});

                $scope.tabsNprop = $scope.LayersNprop.feoXLayerVos;
         	};

         	//初始化比例的缴费计划信息
         	if($scope.dangerUnitFacEnquiry.facPlyComShareVos.length>0) {
         	if($scope.dangerUnitFacEnquiry.facPlyComShareVos.length>0){
        			$.each($scope.dangerUnitFacEnquiry.facPlyComShareVos, function(index, feo){
                        $scope.facPlyComShareVosProp.facPlyComShareVos.push(feo);
        			});
         	}
                $scope.tabs = $scope.facPlyComShareVosProp.facPlyComShareVos;
         	}
         	
//         	console.log("比例缴费信息为: " + $scope.facPlyComShareVo_.facPlyPays);
//         	console.log("超赔缴费信息为: " + $scope.facPlyComShareVo_.feoXPlans);
        }

            
       //预处理比例接收人中的差异分包
       $scope.dealDifReinsAbcToBoolean = function(){
          if($scope.riskunitsFacPlyInfo.facPlyComShareVos.length>0){
          	$.each($scope.riskunitsFacPlyInfo.facPlyComShareVos, function(index, fac){
           	if(fac.deductible ==="" || fac.deductibleRate ==="" || fac.deductible ===null || fac.deductibleRate ===null){
           		console.log("免赔内容为空");
           		fac.difReins = 0;
           	} else {
           		fac.difReins = 1;
           	}
           	if(fac.specialEngage ==="" || fac.specialEngage ===null){
           		console.log("责任内容为空");
           		fac.abc = 0;
           	} else {
           		fac.abc = 1;
           	}
           });
           console.log($scope.riskunitsFacPlyInfo.facPlyComShareVos);
          }	
       }
          
       //初始化isBusy:false 
       $scope.global = {
            isBusy:false
        };  
        //控制旋转图片显示
        $scope.showBusy = function (_busy) {
            $scope.global.isBusy = _busy;
        };
        
        //增加接收人(比例)       
       $scope.addFeoReinsProp = function(){
            var _recepter =  {
                "reinsCode":'',
                "serialNo":1,
                "finalReinsCode":'',
                "reinsType":'',
                "signedLine":'',
                "signedComm":"",
                "vatRate":'',
                "startDate":null,
                "endDate":null,
                "othRate":'', 
                "addVatRate":'',
                "currency":'',
                "amount":'0',
                "chgAmount":'0',
                "rate":'',
                "premium":'0',
                "chgPremium":'0',
                "deductible":'',
                "deductibleRate":'',
                "remarks":'',
                "specialProvisions":'',
                "deadLineDays":'0'
            };

            var temp = angular.copy($scope.dangerUnitFacEnquiry.feoReinsReceiveList[$scope.dangerUnitFacEnquiry.feoReinsReceiveList.length-1]);
            if(angular.isUndefined(temp)){
                $scope.dangerUnitFacEnquiry.feoReinsReceiveList.push(_recepter);
            }else{
                temp = _recepter;
                temp.serialNo +=1;
                $scope.dangerUnitFacEnquiry.feoReinsReceiveList.push(temp);
                countSerialNo();
            }
        };
        
        var countSerialNo = function(){
            $.each($scope.dangerUnitFacEnquiry.feoReinsReceiveList,function(index, r){
                r.serialNo = index+1;
            });
        };
        

        //删除接收人（比例）
        $scope.removeRecepterProp = function(facPlyComShareVo){
            if(confirm("确定要删除接收人?")){
                $.each($scope.dangerUnitFacEnquiry.feoReinsReceiveList, function(index, fac){
                    if(fac === facPlyComShareVo){
                        $scope.dangerUnitFacEnquiry.feoReinsReceiveList.splice(index, 1);
                    }
                });
                $scope.$emit('notification', {message:'接收人删除成功', delay:3000, type:'success'});
            }
            if($scope.dangerUnitFacEnquiry.feoReinsReceiveList.length===0){
            	$scope.feoXReinssFlag = 1;
            } else {
            	$scope.feoXReinssFlag = 0;
            }
            
        }
        
        //修改 保存
        $scope.saveEnquiry = function(){
        	if(checkoutRequired()){
                    console.log("要修改的数据：");
                    console.log($scope.dangerUnitFacEnquiry);
                    riskunitService.updateEnquiry($scope.dangerUnitFacEnquiry,$scope.global.user).then(
                        function(data){                       	
                            $scope.$emit('notification', {message:'修改成功', delay:3000, type:'success'});
                            if(data.result==="success"){
                            	alert("修改成功！询价单号："+data.msg);
                            	$window.location.reload();
                                $scope.closeInquiry();
                            }else{
                            	alert("修改失败！");
                            }
                        },
                        function(code){
                            $scope.$emit('notification', {message:'修改失败', delay:3000, type:'danger'});
                            throw(code);
                        }
                    )
        	};
        }  
        
        //控件
        var checkoutRequired = function(){
        	var flag = true;
        	var signedLine = 0.00;
        	var signedLinef = 0.00;
              if($scope.dangerUnitFacEnquiry.feoReinsReceiveList !== null ){ 
            	$.each($scope.dangerUnitFacEnquiry.feoReinsReceiveList,function(index,temp){            		
                    if(temp.reinsType === "0"){
                    	if(temp.reinsCode === temp.finalReinsCode){
                    		alert("是经纪人，接受人和最终接受人不能相同");
                    		flag = false;
                            return ;
                    	}
                    }else if(temp.reinsType === "1"){
                    	if(temp.reinsCode !== temp.finalReinsCode){
                    		alert("不是经纪人，接受人和最终接受人必须相同");
                    		flag = false;
                            return ;
                    	}
                    }else if(temp.reinsCode === null || temp.reinsCode === ""){
                    	alert("请录入接收人信息！");
                    	flag = false;
                        return ;
                    }/*else if(temp.facFlag === "1"){
                    	signedLinef = temp.signedLine + signedLinef;
                    }else{
                    	signedLine = temp.signedLine + signedLine;
                    }*/                                          
                });
	            }/*else if(signedLine !== $scope.dangerUnitFacEnquiry.feoEnquiry.facShare){
	              	alert("比例临分信息中的接受份额不等于普通临分比例");
	          		flag = false;
	                return ;
	            }else if(signedLinef !== $scope.dangerUnitFacEnquiry.feoEnquiry.specialFacShare){
	              	alert("比例临分信息中的特约接受份额不等于特约临分比例");
	          		flag = false;
	                return ;
	            }*/
            	return flag;
            }

        
      //返回查询临分
        $scope.closeInquiry = function () {
            var url = '/facings/:operations';
            $location.path(url);
        };

        
        /*临分意向*/
        $scope.getFacPlyInfo = function(certiType, certiNo, dangerNo, user, lan) {
            console.log("InquiryDetailModalCtrl getFacPlyInfo（临分意向） is coming ..");
            $scope.showBusy(true); 
            riskunitService.getFacEnquiryInfo(certiType, certiNo, dangerNo, user, lan).then(
                function(data){
                    if(angular.isUndefined(data.result)){
                    	console.log("data:"+data);
                    	$scope.dangerUnitFacEnquiry = (data);

                      /*  //处理缴费信息
	                    $scope.dealGetFacPayment();
                       	//处理差异分保信息
	                    $scope.dealDifReinsAbcToBoolean();*/

                    } else {
                    	alert("查询失败: " + data.msg);
                    }
                    $scope.showBusy(false);
                },
                function(code){
                    throw(code);
                    //alert(message);
                }
            );
        };
	
        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        var init = function(){
        
          //数据字典差寻条件
            $scope.keywords = {
                "id":"",
                "value":"",
                "other1":""
            };
            
            var key = angular.copy($scope.keywords);
            key.id="reinsCode";
            key.value = "";
            $scope.getCode(key,{},"reinsCodes");
            
            var key = angular.copy($scope.keywords);
            key.id="currency";
            key.value="";
            $scope.getCode(key,{},"currencys");
        
	        console.log("certiType : " + $scope.certiType);
	        console.log("certiNo : " + $scope.certiNo);
	        console.log("dangerNo : " + $scope.dangerNo);
	        console.log("user : " + $scope.user);
	        console.log("operations : " + $scope.operations);
	        $scope.operations = 0;
	        
	        //初始化临分页面编辑与否标志位
	        if(angular.isUndefined($scope.editType)){
	        	$scope.editType = "0";
	        }
	        $scope.pageFlag = ($scope.operations === 0) || ($scope.operations === '0') || ($scope.editType === 0) || ($scope.editType === '0');
        
            if($scope.certiType === 'T'){
        		$scope.certiType = '1'; 
        	} else if($scope.certiType === 'P'){
        		$scope.certiType = '2'; 
        	}else{
        		$scope.certiType = '3'; 
        	}
            //获取详情
            $scope.getFacPlyInfo($scope.certiType, $scope.certiNo, $scope.dangerNo, $scope.user, {});
            /*$scope.getFacPlyInfo("5", $scope.certiNo, dangerNo, $scope.user, {});*/
        };

        init();
    }]);
});