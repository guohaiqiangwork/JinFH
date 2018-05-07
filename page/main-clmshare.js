require.config({
    baseUrl: 'page',
    urlArgs: 'v=beta1.0',
    paths: {
    	'jquery': '../plugin/jquery1.11.1/jquery.min',
        'domReady': '../plugin/requirejs/domReady',
        'route_config': "./route_config",
        'jsviews': '../plugin/jsviews/jsviews.min',
        'jquery_validate': '../plugin/jquery.validate/jquery.validate',
        'jquery-placeholder': '../plugin/jquery-placeholder/jquery.placeholder',
        'bootstrapui': '../plugin/bootstrap/js/bootstrap.min',
        //选择框
        'select2':'../plugin/select2-master/dist/js/select2.min',
        'icheck': '../plugin/icheck-1.x/icheck.min',
        'bootbox': '../plugin/bootbox/4.4.0/bootbox',
        'dropdowns': '../plugin/dropdowns/dist/js/dropdowns-enhancement',
        'bootstrap-suggest': '../plugin/search/bootstrap-suggest.min',
        'slimscroll': '../plugin/slimScroll/jquery.slimscroll.min',
        'datetimepicker': '../plugin/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min',
        //'messages': './i18n/messages_zh_cn',
		'jquery_form': '../plugin/jquery.form/jquery.form',
        'cropper': '../plugin/cropper/src/cropper',
        'ckeditor': '../plugin/ckeditor/ckeditor',
        'jquery_fly': '../plugin/fly/jquery.fly.min',
        'jquery-datatable': '../plugin/custom/js/jquery.dataTables.min',
        'bootstrap-editable':'../plugin/bootstrap3-editable-1.5.1/bootstrap3-editable/js/bootstrap-editable.min',
        'bootstrap-table':'../plugin/bootstrap-table/dist/bootstrap-table.min',
        'bootstrap-table-locale-zh':'../plugin/bootstrap-table/dist/locale/bootstrap-table-zh-CN.min',
        'bootstrap-table-editable':'../plugin/bootstrap-table/dist/extensions/editable/bootstrap-table-editable.min',
        'fileinput':'../plugin/bootstrap-fileinput/js/fileinput',
        //'theme':'../plugin/bootstrap-fileinput/themes/explorer/theme.min',
        'echarts':'../plugin/echarts/echarts',
        'echarts-gl':'../plugin/echarts/echarts-gl',
        'components': '../page/service/components',
        'bigautocomplete': '../plugin/custom/jquery-bigautocomplete/js/jquery.bigautocomplete',
        'zTree':'../plugin/zTree_v3/js/jquery.ztree.all',
        'qrcode':'../plugin/jquery-qrcode/qrcode',
        'jquery-qrcode':'../plugin/jquery-qrcode/jquery.qrcode',
        'angular': '../plugin/angular.1.2.14.min',
        'ngIdle': '../plugin/angular-idle',
        'angularTranslate': '../plugin/angular-translate.min',
        'angular-ui-router': '../plugin/angular-ui-router.min',
        'ngCookies': '../plugin/angular-cookies.min',
        'uiBootstrap': '../plugin/ui-bootstrap-0.10.0',
        //'datepicker': '../plugin/bootstrap-datepicker',        
        'angular-animate'   : '../plugin/angular-animate.1.2.14.min',
        'angular-couch-potato'  :  '../plugin/angular-couch-potato',
        'angupoly': '../plugin/angupoly',
        'index': '../page/templates/layout/index_init',
        'recepter': '../page/templates/common/directives/recepter',
        'menus': '../page/templates/common/configs/menus',
        'mainCtrl': '../page/templates/common/controllers/main.ctrl',
        'angularFileUpload'  : '../plugin/jquery.file.upload/jquery.fileupload-angular'
    },
    shim: {
        'angular': {
            'exports': 'angular'
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
        'app-init-clmshare',
        'mainCtrl'
    ],
    waitSeconds: 150
});

require([
    'jquery',
    'angular',
    'app-init-clmshare',
    'mainCtrl'
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