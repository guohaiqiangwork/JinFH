/**
 * 管理模块路由
 * @author
 * @time 
 */
define(["route_config"], (route_config) => {
    //设置api
    route_config.api({
        //查询job列表
        task_search: '/misc/bpo/tasks',
         //客户保存
        customer_new: '/misc/bpo/customer/new',
        //客户查询
        customer_search: '/misc/bpo/customer/list',
        //查找客户
        customer_one:'/misc/bpo/customer/findOne/{customerCode}',
        //删除客户
        customer_delete:'/misc/bpo/customer/delete/{ids}',
        //fileCfgByCustomerCode
        filecfg_customerCode:'/misc/bpo/filecfgs/{customerCode}',
        //savefilecfg
        filecfg_add:'/misc/bpo/filecfgs/add',
         //deletefilecfg
        filecfg_delete:'/misc/bpo/filecfgs/delete',
        //******************filefolder***********//
         //filefolderByCustomerCode
        filefolder_customerCode:'/misc/bpo/filefolders/{customerCode}',
        //savefilecfg
        filefolder_add:'/misc/bpo/filefolders/add',
         //deletefilecfg
        filefolder_delete:'/misc/bpo/filefolders/delete',
        //*********************file**************************/
        file_new:'/misc/bpo/file/new',
        //根据主键查询
        file_one:'/misc/bpo/file/{barCode}',
        //filemeta
        file_meta:'/misc/bpo/filemeta/{customerCode}',
        //分页查询
        file_search:'/misc/bpo/file/list',
         //deletefilecfg
        file_delete:'/misc/bpo/file/delete',
        file_staus:'/misc/bpo/file/{customerCode}/{status}',
        img_upload:'/misc/bpo/file/upload',
        submit:'/misc/submit',
        //********************task操作*******************************//
        task_add:'/misc/bpo/task/add',
        //单个task查询
        task_one:'/misc/bpo/task/{id}',
        img_view:'/misc/img/{id}'
    });
    //配置路由函数
    route_config.state({
        path: '/bpo/task/list',
        name: 'task_list',
        viewNode: 'main-content',
        templateUrl: '../page/templates/bpo/task/html/task_list.html',
        component: '../page/templates/bpo/task/ctrl/task_list'
    }).state({
        path: '/bpo/customer/add',
        name: 'customer_add',
        viewNode: 'main-content',
        templateUrl: '../page/templates/bpo/customer/html/customer_add.html',
        component: '../page/templates/bpo/customer/ctrl/customer_add'
    }).state({
        path: '/bpo/customer/list',
        name: 'customer_list',
        viewNode: 'main-content',
        templateUrl: '../page/templates/bpo/customer/html/customer_list.html',
        component: '../page/templates/bpo/customer/ctrl/customer_list'
    }).state({
        path: '/bpo/customer/setting',
        name: 'customer_setting',
        viewNode: 'main-content',
        templateUrl: '../page/templates/bpo/customer/html/customer_setting.html',
        component: '../page/templates/bpo/customer/ctrl/customer_setting'
    }).state({
        path: '/bpo/file/add',
        name: 'file_add',
        viewNode: 'main-content',
        templateUrl: '../page/templates/bpo/file/html/file_add.html',
        component: '../page/templates/bpo/file/ctrl/file_add'
    //file查看
    }).state({
        path: '/bpo/file/view',
        name: 'file_view',
        viewNode: 'main-content',
        templateUrl: '../page/templates/bpo/file/html/file_view.html',
        component: '../page/templates/bpo/file/ctrl/file_add'
    //fileList 查询
    }).state({
        path: '/bpo/file/list',
        name: 'file_list',
        viewNode: 'main-content',
        templateUrl: '../page/templates/bpo/file/html/file_list.html',
        component: '../page/templates/bpo/file/ctrl/file_list'
    //审核任务查询
    }).state({
        path: '/bpo/file/check',
        name: 'file_check',
        viewNode: 'main-content',
        templateUrl: '../page/templates/bpo/file/html/file_check.html',
        component: '../page/templates/bpo/file/ctrl/file_check'
    }).state({
        path: '/bpo/file/upload',
        name: 'file_upload',
        viewNode: 'main-content',
        templateUrl: '../page/templates/bpo/file/html/file_upload.html',
        component: '../page/templates/bpo/file/ctrl/file_upload'
    }).state({
        path: '/bpo/submit',
        name: 'submit',
        viewNode: 'main-content',
        templateUrl: '../page/templates/bpo/file/html/submit.html',
        component: '../page/templates/bpo/file/ctrl/submit'
    //task开始
    }).state({
        path: '/bpo/task/add',
        name: 'task_add',
        viewNode: 'main-content',
        templateUrl: '../page/templates/bpo/task/html/task_add.html',
        component: '../page/templates/bpo/task/ctrl/task_add'
    //移交
    }).state({
        path: '/bpo/task/deliver',
        name: 'task_deliver',
        viewNode: 'main-content',
        templateUrl: '../page/templates/bpo/task/html/task_deliver.html',
        component: '../page/templates/bpo/task/ctrl/task_deliver'
    //移交扫描
    }).state({
        path: '/bpo/deliver/scan',
        name: 'deliver_scan',
        viewNode: 'main-content',
        templateUrl: '../page/templates/bpo/task/html/deliver_scan.html',
        component: '../page/templates/bpo/task/ctrl/deliver_scan'
    })
    /********************************以下内容为邮寄内容****************************/
    .state({
        path: '/bpo/mail/add',
        name: 'mail_add',
        viewNode: 'main-content',
        templateUrl: '../page/templates/bpo/mail/html/mail_add.html',
        component: '../page/templates/bpo/mail/ctrl/mail_add'
    })
    .state({
        path: '/bpo/mail/list',
        name: 'mail_list',
        viewNode: 'main-content',
        templateUrl: '../page/templates/bpo/mail/html/mail_list.html',
        component: '../page/templates/bpo/mail/ctrl/mail_list'
    })
    .state({
        path: '/bpo/mail/detail',
        name: 'mail_detail',
        viewNode: 'main-content',
        templateUrl: '../page/templates/bpo/mail/html/mail_detail.html',
        component: '../page/templates/bpo/mail/ctrl/mail_detail'
    })
    .state({
        path: '/bpo/mail/scan',
        name: 'mail_scan',
        viewNode: 'main-content',
        templateUrl: '../page/templates/bpo/mail/html/mail_scan.html',
        component: '../page/templates/bpo/mail/ctrl/mail_scan'
    })
});
