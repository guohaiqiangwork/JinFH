/**
 * 启动器
 */
define([
    'starter',
    'route_config',
    'fileinput',
    'theme',
    'dropdowns',
    'jsviews',
    'messages',
    'require',
    'domReady',
    'jquery',
    'jquery-placeholder',
    'jquery_validate',
    'bootstrapui',
    'bootstrap-suggest',
    'icheck',
    'index',
    'zTree',
    //'templates/sysuser/router',
    //'templates/bpo/bpo_router',
    //'templates/saa/router',
    //'templates/sdd/router',
    //'templates/monitor/router'
    'templates/layout/router'
], (starter) => {
    'use strict';
    //验证登录态,不是登录态，直接跳到登录页
    // require('widget/http').get({
    //     apiName: 'is_login',
    //     isMask: true,
    //     maskMessage: '正在验证登录态...',
    //     success(data) {
    //         if (!data.datas || data.datas.code != '1') {
    //             window.location.href = './login.html';
    //         } else {
    //             /*
    //              * 需要在应用程序启动前进行初始化的
    //              * 操作在顶层模块中使用“运行”功能
    //              */
    //             starter._init(data.datas);
    //         }
    //     },
    //     error() {
    //         window.location.href = './login';
    //     }
    // });
    let data = {
        userName: '张三'
    };
    starter._init(data);
});
