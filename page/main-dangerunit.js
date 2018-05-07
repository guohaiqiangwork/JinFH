require.config({
    baseUrl: '',
    urlArgs: 'v=beta1.0',
    paths: {
    	'jquery': '/reins/plugin/jquery1.11.1/jquery.min',
        'domReady': '/reins/plugin/requirejs/domReady',
        'route_config': "./route_config",
        'jsviews': '/reins/plugin/jsviews/jsviews.min',
        'jquery_validate': '/reins/plugin/jquery.validate/jquery.validate',
        'jquery-placeholder': '/reins/plugin/jquery-placeholder/jquery.placeholder',
        'bootstrapui': '/reins/plugin/bootstrap/js/bootstrap.min',
        //选择框
        'select2':'/reins/plugin/select2-master/dist/js/select2.min',
        'icheck': '/reins/plugin/icheck-1.x/icheck.min',
        'bootbox': '/reins/plugin/bootbox/4.4.0/bootbox',
        'dropdowns': '/reins/plugin/dropdowns/dist/js/dropdowns-enhancement',
        'bootstrap-suggest': '/reins/plugin/search/bootstrap-suggest.min',
        'slimscroll': '/reins/plugin/slimScroll/jquery.slimscroll.min',
        'datetimepicker': '/reins/plugin/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min',
        //'messages': './i18n/messages_zh_cn',
		'jquery_form': '/reins/plugin/jquery.form/jquery.form',
        'cropper': '/reins/plugin/cropper/src/cropper',
        'ckeditor': '/reins/plugin/ckeditor/ckeditor',
        'jquery_fly': '/reins/plugin/fly/jquery.fly.min',
        'jquery-datatable': '/reins/plugin/custom/js/jquery.dataTables.min',
        'bootstrap-editable':'/reins/plugin/bootstrap3-editable-1.5.1/bootstrap3-editable/js/bootstrap-editable.min',
        'bootstrap-table':'/reins/plugin/bootstrap-table/dist/bootstrap-table.min',
        'bootstrap-table-locale-zh':'/reins/plugin/bootstrap-table/dist/locale/bootstrap-table-zh-CN.min',
        'bootstrap-table-editable':'/reins/plugin/bootstrap-table/dist/extensions/editable/bootstrap-table-editable.min',
        'fileinput':'/reins/plugin/bootstrap-fileinput/js/fileinput',
        //'theme':'../plugin/bootstrap-fileinput/themes/explorer/theme.min',
        'echarts':'/reins/plugin/echarts/echarts',
        'echarts-gl':'/reins/plugin/echarts/echarts-gl',
        'components': '/reins/page/service/components',
        'bigautocomplete': '/reins/plugin/custom/jquery-bigautocomplete/js/jquery.bigautocomplete',
        'zTree':'/reins/plugin/zTree_v3/js/jquery.ztree.all',
        'qrcode':'/reins/plugin/jquery-qrcode/qrcode',
        'jquery-qrcode':'/reins/plugin/jquery-qrcode/jquery.qrcode',
        'angular': '/reins/plugin/angular.1.2.14.min',
        'ngIdle': '/reins/plugin/angular-idle',
        'angularTranslate': '/reins/plugin/angular-translate.min',
        'angular-ui-router': '/reins/plugin/angular-ui-router.min',
        'ngCookies': '/reins/plugin/angular-cookies.min',
        'uiBootstrap': '/reins/plugin/ui-bootstrap-0.10.0',
        //'datepicker': '../plugin/bootstrap-datepicker',        
        'angular-animate'   : '/reins/plugin/angular-animate.1.2.14.min',
        'angular-couch-potato'  :  '/reins/plugin/angular-couch-potato',
        'angupoly': '/reins/plugin/angupoly',
        'index': '/reins/page/templates/layout/index_init',
        'recepter': '/reins/page/templates/common/directives/recepter',
        'menus': '/reins/page/templates/common/configs/menus',
        'mainCtrl': '/reins/page/templates/common/controllers/main.ctrl',
        'angularFileUpload'  : '/reins/plugin/jquery.file.upload/jquery.fileupload-angular'
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
        'app-init-dangerunit',
        'mainCtrl'
    ],
    waitSeconds: 150
});

require([
    'jquery',
    'angular',
    'app-init-dangerunit',
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