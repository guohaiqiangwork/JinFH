define(['jquery','widget/ajax_form','widget/http','widget/dialog','bigautocomplete'], ($,ajax_form,http,dialog) => {
	var component = {
		//初始化可拖动悬浮框
		_getfloatbox(showButtonId, boxTitle, boxBody, isAppearFirst) {
			  $("body")
			      .append(
			          $("<div id='floatbox'"
			              + "style='display:none;position:fixed;height:86px;width:30px;right:70%;top:10%;border:1px solid #ccc;z-index:9881;background:#fff;box-shadow:2px 2px 5px #ccc'>"
			              + "<div id='closefloatbox' style='opacity:0.5;filter:alpha(opacity=50);line-height:20px;cursor:pointer;position:absolute;float:right;margin:-5px -5px -5px 0px;z-index:9882;'>"
			              + "<i class='fa fa-close'></i></div>"
			              + "<div id='floatboxtitle' style='color:#fe0000;background-color:#CCE4F5 ;'></div>"
			              + "<div id='floatboxbody' onselectstart='return false' style='height:20px;width:28px;padding:5px 5px;position:absolute;background:white;line-height:20px;text-overflow:ellipsis; white-space: nowrap;'>消息体</div>"
			              + "</div>"));
			$("#floatboxbody").html(boxBody);
			$("#floatboxtitle").html(boxTitle);
			// 此事件可显示提示框
			$("#" + showButtonId).bind("click", function() {
				$("#floatbox").show();
			});
			if (isAppearFirst) {
				$("#floatbox").show();
			}
			$("#floatboxtitle").hover(function() {
				$(this).css({
					cursor : "move"
				});
			}, function() {
				$(this).css({
					cursor : "default"
				});
			});

			$("#floatboxtitle").mousedown(function(ed) {
				//获取点击时鼠标相对于浮动框左上角（左上角作为原点）的坐标
				var diffX = ed.pageX - $(this).offset().left;
				var diffY = ed.pageY - $(this).offset().top;
				var boxXW = document.getElementById("floatbox").offsetWidth;
				var boxYH = document.getElementById("floatbox").offsetHeight;
				var pageXW = document.documentElement.offsetWidth;
				var pageYH = document.documentElement.offsetHeight;
				var maxRight = pageXW - boxXW;
				$(document).bind("mousemove", function(e) {
					var changeX = e.clientX - diffX;
					var changeY = e.clientY - diffY;
					//屏幕宽-浮动框的left-浮动框的宽 = right
					var styleRight = pageXW - changeX - boxXW;
					if (styleRight<0) {
						styleRight = 0;
					} else if (styleRight>(maxRight)) {
						styleRight = maxRight;
					}
					styleRight = (styleRight / pageXW) * 100;
					$("#floatbox").animate({
						right : styleRight + "%",
						top : (changeY > 0 && (changeY+boxYH <pageYH))? changeY+ "px":(changeY <= 0?"0px":(changeY+boxYH >=pageYH?pageYH-boxYH+"px":pageYH-boxYH+"px"))
					}, 0);
				});
			});

			$(document).mouseup(function() {
				$(document).unbind("mousemove");
			});
			$("#closefloatbox").click(function() {
				$("#floatbox").hide();
			});
			$("#floatbox").hide();
			//根据文字数量动态改变浮动框高度-suxijiao-20160913-start
			setTimeout(function(){
				if(boxBody != null && typeof(boxBody) == "string" && $.trim(boxBody) != ""){
					$("#floatbox").show();
					var contentHeight = $('#floatboxbody').get(0).scrollHeight;
					var contentWidth = $('#floatboxbody').get(0).scrollWidth;
					$('#floatboxbody').css({"height":contentHeight+"px","width":((contentWidth<150?150:contentWidth)+5)+"px"});
					$('#floatbox').css({"height":contentHeight+55+"px","width":((contentWidth<150?150:contentWidth)+7)+"px"});
					$('#closefloatbox').css("margin","-5px -5px -5px "+((contentWidth<150?150:contentWidth)-19)+"px");
				}else{
					$("#floatbox").hide();
				}
			},500);
			//根据文字数量动态改变浮动框高度-suxijiao-20160913-end
		},
		//获取url中的参数
		_getUrlParam(key){
			var url = location.hash.replace(/^#/, '');
			url = url.substring(url.indexOf('?'));
			var urlValue = false;
		    if (url.indexOf("?") != -1) {
		        var str = url.substring(1);
		        var strs = str.split("&");
		        for(var i = 0; i < strs.length; i ++) {
		        	if(key == strs[i].split("=")[0]){
		        		urlValue = unescape(strs[i].split("=")[1]);
		        		break;
		        	}
		        }
		    }
		    return urlValue;
		},
		//更新url中的参数
		_updateUrlParams(params){
			var url = window.location+"";
			for(var index in params){
				if(this._getUrlParam(index) !== false){
					url = url.replace(index + "=" + this._getUrlParam(index) , index + "=" + params[index]);
				}else{
					if(url.indexOf("?") == -1){
						url += ("?" +index + "=" + params[index]);
					}else{
						url += ("&" +index + "=" + params[index]);
					}
				}
			}
			window.location = url;
		},
		//初始化校验表单
		_initForm($fm){
			ajax_form.init({
	            $form: $fm,
	            rules: this.rules,
	            afterSuccess: $.proxy(this.ajaxSuccess, this)
	        });
		},
		//表单保存方法，不执行必录校验
		_save(opt){
			var options = $.extend({
				mustCheck:null,
				async:false,
				apiName:"",
				contentType:'application/x-www-form-urlencoded',
				type:"POST",
				$form:$("form"),
				params:{}
			}, opt);
			options.async = true;
			options.$form.find("[required]").not(options.mustCheck).attr("vflag","1").removeAttr("required");
			if(!options.$form.valid()){
				options.$form.find("[vflag]").attr("required","required").removeAttr("vflag");
				component.alert("页面有必录项未录入，请检查");
                return;
            }
            options.$form.find("[vflag]").attr("required","required").removeAttr("vflag");
			http.submit(options);
		},
		//表单提交方法，执行所有校验
		_submit(opt){
			var options = $.extend({
				ignorCheck:null,
				async:false,
				apiName:"",
				contentType:'application/x-www-form-urlencoded',
				type:"POST",
				$form:$("form"),
				params:{}
			}, opt);
			options.async = true;
			if(!options.ignorCheck){
				if(!options.$form.valid()){
					component.alert("页面有必录项未录入，请检查");
	                return;
	            }
			}else if(options.$form.not(options.ignorCheck).length > 0){
				if(!options.$form.not(options.ignorCheck).valid()){
					component.alert("页面有必录项未录入，请检查");
	                return;
	            }
			}

			http.submit(options);
		},
		_getCookie(cname) {  
			return localStorage.getItem(cname);
		},
		_setCookie(cname, cvalue, exdays) {
			localStorage.setItem(cname, cvalue); 
	    },
	    alert(valueWord){
	    	dialog.alert({
	    		content:valueWord
	    	});
	    },
	    confirm(valueWord,surefunction,rejectfunction){
	    	dialog.confirm({
	    		content:valueWord,
	    		title: '提示', //标题
	            sureBtnText: '是', //确 定按钮标题
	            cancelBtnText: '否', //取消按钮标题
	            onCreateAfter:function(){
	                $(".alert-background").show();
	            },
	            onSuerBefore:function(){
	            	$(".alert-background").hide();
	            	surefunction && typeof (surefunction) == 'function' && surefunction();
	            },
	            onCloseBefore:function(){
	            	$(".alert-background").hide();
	            	rejectfunction && typeof (rejectfunction) == 'function' && rejectfunction();
	            },
	            onCanceleBefore:function(){
	            	$(".alert-background").hide();
	            	rejectfunction && typeof (rejectfunction) == 'function' && rejectfunction();
	            }
	    	});
	    },
	    //页面元素只读方法
	    _readOnlyDom(extraEles,$scope){
	    	domControl._invokeControl($scope,extraEles);
	    },
	    //查询框初始化
	    _initSearchInput(inputId,hiddenId,params,apiName,initData){
	    	if(window.SearchData[inputId]){
	    		window.SearchData[inputId] = null;
	    	}
	    	//动态绑定优化
	    	// if($(document.getElementById(inputId)).attr("data-cascadeid")) return;
	    	var $input = $(document.getElementById(inputId));
	    	var $hidden = $(document.getElementById(hiddenId));
	    	searchautocomplete._initSearchBox($input,$hidden,params,apiName,initData);
	    }

	};

	var domControl = {
		_invokeControl($scope,extraEles){
			if (!$scope || $scope.length === 0) {
				$scope=$("body");
			}
			var $str = "";
			if(extraEles){
				for(var item in extraEles){
					var funThis = extraEles[item];
	    			$str += item + "," +item + " *,";
	    			funThis && typeof (funThis) == 'function' && funThis($scope.find($(item)));
	    		}
	    		$str = $str.substring(0,$str.length-1);
			}else{
				extraEles = null;
			}
            $scope.find('select, input, textarea, button').not(extraEles == null?null:$($str)).each((i, n) => {
                domControl._handleReadonlyInput(n);
            });
		},
		_handleReadonlyInput(obj) {
            switch (obj.tagName.toUpperCase()) {
                case 'INPUT':
                    var $obj = $(obj);
                    switch ($obj.attr('type').toLowerCase()) {
                        case 'text':
                            $obj.prop('readonly', true);
                            break;
                        case 'radio':
                        	$obj.prop('disabled', true);
                            break;
                        case 'checkbox':
                            $obj.prop('disabled', true);
                            break;
                        case 'button':
                            $obj.prop('disabled', true);
                            break;
                        case 'submit':
                            $obj.prop('disabled', true);
                            break;
                    }
                    break;
                case 'TEXTAREA':
                    $(obj).prop('disabled', true);
                    break;
                case 'SELECT':
                    var $t = $(obj);
                    $t.attr('name', '');
                    $t.prop('disabled', true);
                    $(obj).append('<input type="hidden" name="' + $t.attr('name') + '" value="' + $t.attr('defaultValue') + '">');
                    break;
                case 'BUTTON':
                    $(obj).prop('disabled', true);
                    break;
            }
        }

	};
	var searchautocomplete = {
		_initSearchData($box,params,apiName){
			window.SearchData[$box.attr("id")] = [];
			http.get({
                apiName: apiName || 'init_user_data',
                async:false,
                params:params,
                success(data) {
                    window.SearchData[$box.attr("id")] = data.data;
                }
            });
		},
		_initSearchBox($box,$hidden,params,apiNmae,initData){
			$box.attr('autocomplete','off');
			$box.css({"background-color":"#BFEFFF"})
			$box.attr("placeholder","请输入查询内容或*查询全部");
			searchautocomplete._initSearchData($box,params,apiNmae);
			$box.attr("data-cascadeid",$hidden.attr("id"));
			$box.bigAutocomplete({data:window.SearchData[$box.attr("id")],callback:function(data){
				$box.val(data.result.name);
				$hidden.val(data.result.code);
			}});
			if($hidden.val() && initData){
				$box.val(searchautocomplete._transferCode($box.attr("id"),$hidden.val()));
			}
		},
		_transferCode(boxId,code){
			if(window.SearchData[boxId]){
				for(var i = 0 ; i < window.SearchData[boxId].length ; i++){
					if(window.SearchData[boxId][i].result.code == code){
						return window.SearchData[boxId][i].result.name;
					}
				}
			}
			return "";
		}
	};

	return component;
});