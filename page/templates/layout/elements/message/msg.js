/**
 * 示例
 */
define(['jquery','widget/http','widget/dialog',], ($,http,dialog) => {

    var page = {

        /**
         * 模块参数
         */
        params: {
            msgData:null,
            deferred: null
        },

        /**
         * 模块入口
         */
        initPage() {
            this.params.deferred = $.Deferred();
            this.params.deferred.done(() => {
                this.bindEvent();
            });
            //通过获取的数据请求页面的基本信息
            service._queryTopMsg($.proxy(this.render,this));
            this.params.deferred.resolve('ok');
        },
        render(data){
            page.params.msgData = data;
            $.views.converters("hisgo", function(val) {  
                return getDateDiff(val);  
            });
            $.templates({
                messageTml: "#messageTml"
            });
            $.templates.messageTml.link("#messages",{messages:page.params.msgData},messageHelpers);
        },
        /**
         * 事件绑定
         */
        bindEvent() {
            $(".media-body").on('click','a.message',$.proxy(this.viewClick, this));
        },
        viewClick(event){
            let $this = $(event.target),
                id = $this.data('id');
            dialog.page({
                title: '消息查看',
                stateParams: { pageType: 'view', id: id}, //传输给新页面的数据；pageType比传；update,add,view
                loadUrl: '/msg/view'
            });
        }
    };

    function getDateDiff(dateTimeStamp){
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if(diffValue < 0){return;}
        var monthC =diffValue/month;
        var weekC =diffValue/(7*day);
        var dayC =diffValue/day;
        var hourC =diffValue/hour;
        var minC =diffValue/minute;
        if(monthC>=1){
            result="" + parseInt(monthC) + "月前";
        }
        else if(weekC>=1){
            result="" + parseInt(weekC) + "周前";
        }
        else if(dayC>=1){
            result=""+ parseInt(dayC) +"天前";
        }
        else if(hourC>=1){
            result=""+ parseInt(hourC) +"小时前";
        }
        else if(minC>=1){
            result=""+ parseInt(minC) +"分钟前";
        }else
        result="刚刚";
        return result;
    }
    var messageHelpers = {
        readMsg:function(index, ev, eventArgs) {
            console.log("index:"+JSON.stringify(index));
            if(!ev.data){
                $.observable(page.params.msgData[index]).setProperty("read", true);
            }
        }
    }
    var service = {
        _queryTopMsg(callBack){
            http.get({
                apiName: 'queryTopMsg',
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
                    callBack && typeof (callBack) == 'function' && callBack(data.data);
                },
                error(data){
                    $("#messages").empty();
                    $("#messages").html('<div class="row"><img src="/img/wait.png" width="50%" height="50%"/>服务暂不可用</div>');
                }
            })
        }
    };
    return {
        initPage: $.proxy(page.initPage, page)
    };
});
