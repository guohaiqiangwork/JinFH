/**
 * 管理模块路由
 * @author
 * @lhm 
 */
define(["route_config"], (route_config) => {
    //******************************task功能*********************//
    route_config.api({
        //功能task管理
        search_saa_task: '/misc/saa/task/search',
        add_saa_task:"/misc/saa/task/create",
        delete_saa_task_system:"/misc/saa/task/delete/{taskCodes}",
        saa_task_set_node:"/misc/saa/task/setTreeNode/{systemCode}",
        saa_task_one:"/misc/saa/task/{taskCode}",
        //角色role管理
        search_saa_role: '/misc/saa/role/search',
        saa_role_all: '/misc/saa/role/list/all',
        delete_saa_role:'/misc/saa/role/delete/{roleCodes}',
        add_saa_role:"/misc/saa/role/create",
        saa_role_one:"/misc/saa/role/{roleCode}",
        saa_role_roleuser:"/misc/saa/role/roleuser/{roleCode}",
        saa_role_userrole:"/misc/saa/role/userrole/{userCode}",
        //userRole
        add_user_role:"/misc/saa/userrole/create",
        user_role_one:"/misc/saa/userrole/{id}",
        delete_user_role:"/misc/saa/userrole/delete/{id}",
        //factor
        search_saa_factor:"/misc/saa/factor/search",
        add_saa_factor:"/misc/saa/factor/create",
        delete_saa_factor:"/misc/saa/factor/delete/{factorCodes}",
        saa_factor_one:"/misc/saa/factor/{factorCode}",
        //factorField
        delete_saa_factor_field:"/misc/saa/factorfield/delete/{ids}",
        saa_factorfield_set_node:"/misc/saa/factor/setTreeNode/{factorCode}",
        saa_factor_field_List:"/misc/saa/factorfield/factor/{factorCode}",
        add_saa_factor_field:"/misc/saa/factorfield/create",
        //userpower
        saa_user_power_by_userCode:"/misc/saa/userpower/list/{userCode}",
        delete_saa_user_power:"/misc/saa/userpower/delete/{ids}",
        user_power_one:"/misc/saa/userpower/findByPk/{id}",
        create_user_power:"/misc/saa/userpower/create",
        saa_user_power_role_all: '/misc/saa/userpower/list/all/{userCode}',
        update_user_role:"/misc/saa/userpower/updateUserRoles",
        sys_user_list:"/misc/sysuser/user/list",
        copy_user_powers:"/misc/saa/userpower/copyUserPowers"
    });
    //配置路由函数
    route_config.state({
        // 注意：注释的部分按照惯例根据path生成，如果有不同则自行配置
        name: 'saa_task_list',
        path: '/saa/task/list',
        viewNode: 'main-content',
        templateUrl: '../page/templates/saa/task/task_list.html',
        component: '../page/templates/saa/task/js/task_list',
    }).state({
        name: 'saa_task_edit',
        path: '/saa/task/edit',
        viewNode: 'main-content',
        templateUrl: '../page/templates/saa/task/task_edit.html',
        component: '../page/templates/saa/task/js/task_edit',
    }).state({
        name: 'saa_task_setting',
        path: '/saa/task/setting',
        viewNode: 'main-content',
        templateUrl: '../page/templates/saa/task/task_setting.html',
        component: '../page/templates/saa/task/js/task_setting',
    })
    //role管理
    .state({
        name: 'saa_role_list',
        path: '/saa/role/list',
        viewNode: 'main-content',
        templateUrl: '../page/templates/saa/role/role_list.html',
        component: '../page/templates/saa/role/js/role_list',
    }).state({
        name: 'saa_role_edit',
        path: '/saa/role/edit',
        viewNode: 'main-content',
        templateUrl: '../page/templates/saa/role/role_edit.html',
        component: '../page/templates/saa/role/js/role_edit',
    }).state({
        name: 'saa_user_role',
        path: '/saa/userrole/edit',
        viewNode: 'main-content',
        templateUrl: '../page/templates/saa/role/user_role_edit.html',
        component: '../page/templates/saa/role/js/user_role_edit'
    })//业务权限配置
    .state({
        name: 'saa_factor',
        path: '/saa/factor/list',
        viewNode: 'main-content',
        templateUrl: '../page/templates/saa/factor/factor_list.html',
        component: '../page/templates/saa/factor/js/factor_list'
    }).state({
        name: 'saa_factor_edit',
        path: '/saa/factor/edit',
        viewNode: 'main-content',
        templateUrl: '../page/templates/saa/factor/factor_edit.html',
        component: '../page/templates/saa/factor/js/factor_edit',
    }).state({
        name: 'saa_factorfield_edit',
        path: '/saa/factorfield/edit',
        viewNode: 'main-content',
        templateUrl: '../page/templates/saa/factor/factor_field_edit.html',
        component: '../page/templates/saa/factor/js/factor_field_edit',
    })
    //用户权限配置及管理
    .state({
        name: 'saa_user_power_config',
        path: '/saa/user/power/config',
        viewNode: 'main-content',
        templateUrl: '../page/templates/saa/user/user_power_config.html',
        component: '../page/templates/saa/user/js/user_power_config',
    }).state({
        name: 'saa_user_power_edit',
        path: '/saa/user/power/edit',
        viewNode: 'main-content',
        templateUrl: '../page/templates/saa/user/user_power_edit.html',
        component: '../page/templates/saa/user/js/user_power_edit',
    }).state({
        name: 'saa_user_power_copy',
        path: '/saa/user/power/copy',
        viewNode: 'main-content',
        templateUrl: '../page/templates/saa/user/user_power_copy.html',
        component: '../page/templates/saa/user/js/user_power_copy',
    })
});
