(function($) {
     
    var key = "12345678";
   
    startUp();
    //isLogin();


    function isLogin() {
        var JSESSIONID = localStorage.getItem("JSESSIONID");
        //alert(JSESSIONID);
        if(JSESSIONID!=null){
            window.location.href = './index.html';
        }  
    }
    function setCookie(name,value){
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }
    function removeCookie(name){
        var exp = new Date();
        exp.setDate(exp.getDate()-1);    
        document.cookie = name + "="+ escape (1) + ";expires=" + exp.toGMTString();
    }
    function getCookie(key) {
        var _cookie = document.cookie,
            items = _cookie.split(";"),
            item = [];
        for (var i = 0, size = items.length; i < size; i++) {
            item = items[i].split("=");
            if (key == item[0].replace(/(^\s*)|(\s*$)/g, "") && item.length == 2) {
                return decodeURIComponent(item[1]);
            }
        }
        return '';
    }
    function startUp() {
       document.onkeydown = function(e) {
               var ev = document.all ? window.event : e;
               if (ev.keyCode == 13) {
                 $('#save').trigger('click');
               }
        }
        $('#save').on('click', function() {
            var userName = $.trim($('#user-name').val()),
                password = $.trim($('#password').val());
            if (password == '' || userName == '') {
                $('#alert-content').html('帐号,密码或验证码不允许为空')
                $('#myModal').modal('show');
                return;
            } 
            $.ajax({
                url: '/reins/main.do?actionType=main',
                data: {
                    userCode: userName, 
                    password: password,
                },
                xhrFields: {
                  withCredentials: true
                },
                type: 'POST',
                dataType: 'JSON',
                beforeSend: function() {
                    $('#msg').html('正在登录...');
                    $('#smarkLoading').show();
                },
                complete: function() {
                    $('#captcha-param-img').trigger('click');
                },
                success: function(data) {
                    data.data = typeof data.data == 'object' ? data.data : JSON.parse(data.data || '{"code": "0"}');
                    //if (data.status == '200') {
                        $('#alert-error').html('');
                        $('#smarkLoading').hide();
                        if("1"===data.data.usertype){
                            localStorage.setItem("JSESSIONID",data.data.token);
                            localStorage.setItem("jwt",data.data.token);
                            localStorage.setItem("usercode",data.data.usercode);
                            localStorage.setItem("username",data.data.username);
                            //localStorage.setItem("username",data.data.userName);
                            localStorage.setItem("nickname",data.data.nickname);
                            localStorage.setItem("usertype",data.data.usertype);
                            //setCookie("JSESSIONID",data.data);
                            $('#msg').html('正在跳转...');
                            window.location.href = './index.html';
                        }else{                            
                            $('#smarkLoading').hide();
                            $('#alert-content').html('该用户类型的账号不允许登录');
                            $('#myModal').modal('show');
                        }
                    /*} else{
                        $('#smarkLoading').hide();
                        $('#alert-content').html(data.statusText);
                        $('#myModal').modal('show');
                    }*/
                },
                error: function(e) {
                	console.log(e);
                    $('#smarkLoading').hide();
                    $('#smarkLoading').hide();
                    $('#alert-content').html('账号或者密码错误');
                    $('#myModal').modal('show');
                    
                }

            })
        });
    }
})(jQuery);
