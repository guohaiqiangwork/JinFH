define(['jquery','widget/http','widget/dialog','qrcode','jquery-qrcode'], ($,http,dialog) => {
    var userData ={
        user: {
            code: '王蕴(3201000001) ',
            img: '../plugin/images/4.png',
            name: '',
            work: false
        }
    } 
    var key = "12345678"; 
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
    $(function () { 
        /*var JSESSIONID = localStorage.getItem("JSESSIONID");
        if(JSESSIONID==null){
            window.location.href = './login.html';
        }*/
        $("#toggleContent").on("click",function(e){
            var helpers = $("#helpers");
            if(helpers.height()!="240"){
                helpers.height(240);
                $("#toggleContent").html('展开更多资源 <i class="fa fa-caret-down"></i>');
            }
            else{
                helpers.height("auto");
                $("#toggleContent").html('收起更多资源 <i class="fa fa-caret-up"></i>'); 
            }
            
        });
        $('input').placeholder();
        //$("[data-toggle='popover']").popover();
        //菜单数据驱动绑定
        $.templates({
            userDataTmpl: "#userDataTml"
            //instanceDataTml:"#instanceDataTml"
            //toDoListDataTml:"#toDoListDataTml"
        });
        userData.user.code = localStorage.getItem("username");
        userData.user.name = localStorage.getItem("nickname");
        //alert(userData.user.name);
        $.templates.userDataTmpl.link("#userData",userData.user)
        //$('[data-toggle="tooltip"]').tooltip();
        /*****************************dashboard***********************/
        $.views.converters("format", function(val) {  
            return new Date(val).Format("yyyy-MM-dd hh:mm:ss");  
        });
        $.views.converters("formatDay", function(val) {  
            return new Date(val).Format("yyyy-MM-dd");  
        });
        $.views.converters("byteToG", function(val) {  
            return Math.round((parseInt(val))/(1024*1024*1024));  
        });
        /*http.get({
            apiName: 'findEurekaInstances',
            cache:false,
            async:false,
            type: 'get',
            headers: {
                Authorization: "Arch6WithCloud "+localStorage.getItem("jwt")
            }, 
            xhrFields: {
                withCredentials: true
            },
            success(data) {
                $.templates.instanceDataTml.link("#clients",{instances:data.data});
            }
        });*/
        //$.templates.toDoListDataTml.link("#toDoList",null);
        /******生成二维码*****/
        /*$("#barCode").qrcode({
            render  : "canvas",
            text    : "http://jsptz.com",
            width: 100,
            height: 100
        });
        var tbody = $("a.info");
        tbody.on('click',$.proxy(monitorDetail, this));*/
    });
    function setCompanyVal(val) {
        $.observable(userData.user).setProperty("company", val);
    }
    function _pageClose(){
        jQDialogClose();
    }
    function monitorDetail(event){
       let $this = $(event.target),
                url = $this.data('id');
            dialog.page({
                title: '监控',
                modal_width:1400,
                stateParams: { pageType: 'view',url:url}, //传输给新页面的数据；pageType比传；update,add,view
                loadUrl: '/monitor/admin/detail'
        });
    }
});