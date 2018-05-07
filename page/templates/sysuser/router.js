/**
 * 管理模块路由
 * @author
 * @time 
 */
define(["route_config"], (route_config) => {
    //设置api
    route_config.api({
        //查询用户列表
        search_user: '/misc/sysuser/user/search',
        //获取用户内容
        select_user: '/misc/sysuser/user/select/{id}',
        //新增或更新用户
        create_user: '/misc/sysuser/user/create',
        //删除用户
        delete_user: '/misc/sysuser/user/delete/{ids}'
    });
    //配置路由函数
    route_config.state({
        // 注意：注释的部分按照惯例根据path生成，如果有不同则自行配置
        // name: 'sysuser_user_list',
        // viewNode: 'main-content',
        // templateUrl: '../page/templates/sysuser/user/list.html',
        // component: '../page/templates/sysuser/user/js/list',
        path: '/sysuser/user/list'
    }).state({
        path: '/sysuser/user/edit' 
    }) 
});
