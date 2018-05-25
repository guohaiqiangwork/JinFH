define(['app',
    //风险单位
    '/reins/page/templates/undwrt/dangerunit.list.ctrl.js',
    '/reins/page/templates/undwrt/dangerunit.editor.ctrl.js'
    ], function(app) {
    app.registerProvider(
        'routeDefs',
        [
            '$stateProvider',
            '$urlRouterProvider',
            '$couchPotatoProvider',
            '$locationProvider',
            '$provide',
            function (
                $stateProvider,
                $urlRouterProvider,
                $couchPotatoProvider
                ) {

                this.$get = function() {
                    // this is a config-time-only provider
                    // in a future sample it will expose runtime information to the app
                    return {};
                };

                $urlRouterProvider
                    .when('', '/');

                $urlRouterProvider.otherwise('/error');

                $stateProvider
                    .state('error', {
                        url: '/error',
                        
                        views:{
                            'main': {
                                templateUrl: '/reins/page/templates/undwrt/error.tpl.html'
                            }
                        }
                    })

                    

                    //风险单位
                    //bizType: 1 投保单  2 批单
                    //certiType 1，投保单,2: 保单 ,3,批单申请单 4:批单
                    .state('riskunit', {
                        url: '/:certiType/:editType/:certiNo',
                        views: {
                            main: {
                                templateUrl: '/reins/page/templates/undwrt/dangerunit.list.tpl.html',
                                controller: 'RiskUnitListCtrl'
                            }
                        }
                    })

                    //风险单位
                    //operation: intention 临分意向  2 风险累积
                    .state('riskunit.operation', {
                        url: '/:params/:operation',
                        views: {
                            operation: {
                                templateUrl: '/reins/page/templates/undwrt/dangerunit.editor.tpl.html',
                                controller: 'RiskUnitEditorCtrl'
                            }
                        }
                    })

                ;
            }
        ]
    );
});