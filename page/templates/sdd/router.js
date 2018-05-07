/**
 * 管理模块路由
 * @author
 * @lhm 
 */
define(["route_config"], (route_config) => {
    //******************************task功能*********************//
    route_config.api({
        //功能task管理
        search_sdd_type: '/misc/sdd/type/search',
        add_sdd_type:'/misc/sdd/type/create',
        delete_sdd_type:'/misc/sdd/type/delete/{ids}',
        sdd_type_one:'/misc/sdd/type/{id}',
        sdd_type_code:'/misc/sdd/type/code/{id}',
        //code管理
        add_code_type:'/misc/sdd/code/create',
        upd_code_type:'/misc/sdd/code/update',
        code_type_one:'/misc/sdd/code/{id}',
        delete_code_type:'/misc/sdd/code/delete/{id}'
    });
    //配置路由函数
    route_config.state({
        name: 'sdd_type_list',
        path: '/sdd/type/list',
        viewNode: 'main-content',
        templateUrl: '../page/templates/sdd/type/type_list.html',
        component: '../page/templates/sdd/type/js/type_list'
    }).state({
        name: 'sdd_type_edit',
        path: '/sdd/type/edit',
        viewNode: 'main-content',
        templateUrl: '../page/templates/sdd/type/type_edit.html',
        component: '../page/templates/sdd/type/js/type_edit'
    }).state({
        name: 'sdd_code_type',
        path: '/sdd/codetype/edit',
        viewNode: 'main-content',
        templateUrl: '../page/templates/sdd/type/code_type_edit.html',
        component: '../page/templates/sdd/type/js/code_type_edit'
    })
});
