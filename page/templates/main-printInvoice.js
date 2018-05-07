require.config({
    baseUrl: '',
    urlArgs: 'v=beta1.0',
    paths: {
        'jquery': 'assets/js/lib/jquery-1.10.2.min',
        'angular': 'assets/js/lib/angular.1.2.14.min',
        'ngIdle': 'assets/js/lib/angular-idle',
        'locale-zh-cn': 'assets/js/lib/angular-locale_zh-cn',
        'angularTranslate': 'assets/js/lib/angular-translate.min',
        'angular-ui-router': 'assets/js/lib/angular-ui-router.min',
        'ngCookies': 'assets/js/lib/angular-cookies.min',
        'uiBootstrap': 'assets/js/lib/ui-bootstrap-0.10.0',
        'datepicker': 'assets/js/lib/bootstrap-datepicker',
        'mcDatePicker': 'common/directives/mc.datepicker',
        'recepter': 'common/directives/recepter',
        'menus': 'common/configs/menus',
        'mainCtrl': 'common/controllers/main.ctrl',
        'angular-animate'   : 'assets/js/lib/angular-animate.1.2.14.min',
        'angular-couch-potato'  :  'assets/js/lib/angular-couch-potato',
        'angupoly': 'assets/js/lib/angupoly',
        'angularFileUpload'  : 'assets/js/jquery.file.upload/jquery.fileupload-angular'
    },
    shim: {
        'angular': {
            'exports': 'angular'
        },
        'locale-zh-cn': {
            'deps'    : ['angular']
        },
        'angupoly': {
            'deps'    : ['angular']
        },
        'ngIdle': {
            'deps'    : ['angular']
        },
        'angular-ui-router': {
            'deps'    : ['angular']
        },
        'angular-animate': {
            'deps'    : ['angular']
        },
        'angularTranslate': {
            'deps'    : ['angular']
        },
        'uiBootstrap': {
            'exports': 'uiBootstrap'
        }
    },
    priority: [
        'jquery',
        'angular',
        'app-init-printInvoice',
        'mainCtrl'
    ],
    waitSeconds: 150
});

require([
    'jquery',
    'angular',
    'app-init-printInvoice',
    'app',
    'mainCtrl',
    'datepicker'
],
    function ($, angular) {
        angular.element().ready(function () {
            //手工装配Angular APP
            angular.bootstrap($('#ng-app'), ['olive']);
            //关闭启动画面
            $('.splash-window').remove();
        });
    }
);