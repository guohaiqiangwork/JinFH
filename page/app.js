define([
    'jquery',
    'angular',
    'angular-couch-potato',
    //'locale-zh-cn',
    'angular-animate',
    'angularTranslate',
    'angular-ui-router',
    'ngCookies',
    'uiBootstrap',
    //'datepicker',
    //'mcDatePicker',
    'services',
    'angupoly',
    //'angularFileUpload',
    'ngIdle',
    //'fileinput',
    //'theme',
    'dropdowns',
    'jsviews',
    //'messages',
    'require',
    'domReady',
    'jquery-placeholder',
    'bootstrapui',
    'bootstrap-suggest',
    'icheck',
    'index',
    'zTree',
    'templates/layout/router'
    ], function ($, angular, couchPotato) {

        'use strict';

        var app = angular.module('olive', [
                    'scs.couch-potato',
                    'ngLocale',
                    'ngAnimate',
                    'pascalprecht.translate',
                    'ui.router',
                    'ngCookies',
                    'ui.bootstrap',
                    //'mc.datepicker',
                    'olive.service',
                    'angupoly',
                    'ngIdle'
        ]);
        
    couchPotato.configureApp(app);
    return app;
});