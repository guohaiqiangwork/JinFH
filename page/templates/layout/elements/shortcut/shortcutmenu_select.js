/**
 * 示例
 */
define(['jquery', 'bootstrapui' , 'components' ,'widget/http','widget/ajax_table','widget/dialog','route_config','jquery_fly'], ($, bootstrapui,compontent,http,dt,dialog,route_config) => {

    var page = {

        /**
         * 模块参数
         */
        params: {data:[],thisfloatboxid:""},
        searchtask:$.Deferred(),
        templates:{
            allmenutemp:$.templates("#task-icon-temp"),
            shortcuttemp:$.templates("#select-task-icon-temp")
        },

        /**
         * 模块入口
         */
        initPage() {
            page.searchtask = $.Deferred();
            service._queryMenuForSelect(function(paramdata){
                page.params.data = paramdata;
                page.searchtask.resolve();
            });
            page.searchtask.done(function(){
                if(page.params.data.shortcutList){
                    page.params.data.shortcutList = eval(page.params.data.shortcutList);
                }else{
                    page.params.data.shortcutList = [];
                }
                if(page.params.data.allMenuList){
                    page.params.data.allMenuList = eval(page.params.data.allMenuList);
                }
                else{
                    page.params.data.allMenuList=[];
                }
                page.templates.shortcuttemp.link("#select-task-icon", {tasksselect:page.params.data.shortcutList});
                
                page.templates.allmenutemp.link("#all-task-icon", {tasks:page.params.data.allMenuList});
                
            });
            this.bindEvent();
        },
        
       
        /**
         * 事件绑定
         */
        bindEvent() {
                $("#all-task-icon .shortcutword").each(function(i){
                    var thistitle = $(this).data("id");
                    var $thist = $(this);
                    if($("#select-task-icon [data-id='"+thistitle+"']").length>0){
                        $thist.parent().removeClass("select-item");
                        $thist.parent().find("i").removeClass("color-red").addClass("gray-color");
                    }
                });
                $("#all-task-icon").on("click",".select-item",function(event){
                    var $thisthisthis = $(this);
                    if(page.params.data.shortcutList.length == 8){
                        compontent.alert("快捷功能最多增加8个");
                        return;
                    }
                    var indexParent = $.view(this).parent.getIndex(); 
                    var index = $.view(this).index; 
                    var data = $.view(this).data; 
                    if(!(window.$.browsers == 'I')){
                        var flyclass = $(this).find("i").attr("class");
                        var flyer = $('<i class="'+flyclass+'" style="z-index:9999;"/>'); //抛物体对象   
                        flyer.fly({   
                            start: {   
                                left: event.pageX,//抛物体起点横坐标   
                                top: event.pageY //抛物体起点纵坐标   
                            },   
                            end: {   
                                left: event.pageX+100,//抛物体终点横坐标   
                                top: event.pageY+100, //抛物体终点纵坐标   
                            },  
                            speed: 1.0, //越大越快，默认1.2
                            onEnd: function() {    
                                this.destory(); //销毁抛物体   
                            }   
                        });
                    }
                    $thisthisthis.find("i").removeClass("color-red").addClass("gray-color");
                    $thisthisthis.removeClass("select-item");
                    $.observable(page.params.data.shortcutList).insert(page.params.data.shortcutList.length, data);
                    
                })
                $("#select-task-icon").on("click",".selected-item",function(){
                    var thisTitle = $(this).find(".shortcutword").data("id");
                    var index = $.view(this).index; 
                    var data = $.view(this).data; 
                    // $.observable(page.params.data.menuList[0].childMenu).insert(page.params.data.menuList[0].childMenu.length, data);
                    $("#all-task-icon [data-id='"+thisTitle+"']").parent().addClass("select-item");
                    $("#all-task-icon [data-id='"+thisTitle+"']").parent().find("i").addClass("color-red").removeClass("gray-color");
                    $.observable(page.params.data.shortcutList).remove(index);
                })
                $("#confirm-select").on("click",function(){
                    var selectshortcuts =JSON.stringify(page.params.data.shortcutList);
                    service._updateMenuForSelect(selectshortcuts,function(datasuccess){
                        $("button.close").trigger("click");
                        //$("#customMenus").empty();
                        route_config.innerRouterPage("/shortcutmenu",$("#customMenus"));
                    });
                })
                $(".btn-float-box-close").on("click",function(){
                    $("button.close").trigger("click");
                })
                $(".selected-item").show();
        }
    };

    var service = {
        _queryMenuForSelect(callBack){
            http.get({
                apiName: 'querymenuandshortcut',
                cache:false,
                async:true,
                success(data) {
                    callBack && typeof (callBack) == 'function' && callBack(data.data);
                }
            })
        },
        _updateMenuForSelect(shortliststr,callBack){
            http.post({
                apiName: 'updateshortcutmenu',
                async:false,
                dataType:"json",      
                contentType:"application/json",
                data:JSON.parse(shortliststr),
                success(data) {
                    callBack && typeof (callBack) == 'function' && callBack(data.data);
                    //$("#emptyfmfortemp").empty();
                }
            })
        }
    };

    return {
        initPage: $.proxy(page.initPage, page)
    };
});
