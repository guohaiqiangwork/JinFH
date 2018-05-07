/**
 * 管理模块路由
 * @author
 * @time 
 */
define(["route_config"], (route_config) => {
    //设置api
    route_config.api({
        "queryallmenu":"/reins/showMenu.do?actionType=showMenu",
        "queryshortcutmenu":"/misc/menus/shortcutMenu/platform",
        "querymenuandshortcut":"/misc/menus/menuselect/platform",
        "updateshortcutmenu":"/misc/menus/updateshortcutmenu"
        //消息
        /*"queryTopMsg":"/misc/msg/top/Message/5",
        "findMsgById":"/misc/msg/{id}",
        "queryAllMsg":"/misc/msg/page/list",
        "msgpublish":"/misc/msg/add",
        "findEurekaInstances":"/gateway/monitor/clients"*/
    });
    //配置路由函数
    route_config.state({
        path: '/menu',
        name: 'menu',
        viewNode: 'main-content',
        templateUrl: '../page/templates/layout/elements/menu/menu.html',
        component: '../page/templates/layout/elements/menu/menu.js'
    }).state({
        path: '/shortcutmenu',
        name: 'shortcutmenu',
        viewNode: 'main-content',
        templateUrl: '../page/templates/layout/elements/shortcut/shortcutmenu.html',
        component: '../page/templates/layout/elements/shortcut/shortcutmenu'
    })/*.state({
        path: '/shortcutmenu_select',
        name: 'shortcutmenu_select',
        viewNode: 'main-content',
        templateUrl: '../page/templates/layout/elements/shortcut/shortcutmenu_select.html',
        component: '../page/templates/layout/elements/shortcut/shortcutmenu_select'
    }).state({//消息
        path: '/msg',
        name: 'msg',
        viewNode: 'main-content',
        templateUrl: '../page/templates/layout/elements/message/msg.html',
        component: '../page/templates/layout/elements/message/msg'
    }).state({//消息查看
        path: '/msg/view',
        name: 'msg_view',
        viewNode: 'main-content',
        templateUrl: '../page/templates/layout/elements/message/msg_view.html',
        component: '../page/templates/layout/elements/message/msg_view'
    }).state({//消息列表
        path: '/msg/list',
        name: 'msg_list',
        viewNode: 'main-content',
        templateUrl: '../page/templates/layout/elements/message/msg_list.html',
        component: '../page/templates/layout/elements/message/msg_list'
    }).state({//消息发布
        path: '/msg/publish',
        name: 'msg_publish',
        viewNode: 'main-content',
        templateUrl: '../page/templates/layout/elements/message/msg_add.html',
        component: '../page/templates/layout/elements/message/msg_view'
    })*/
});