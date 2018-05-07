define(['app'], function(app) {
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
                                templateUrl: 'riskunit/error.tpl.html'
                            }
                        }
                    })                    
                    
                    //开票查询
                    .state('printInvoice', {
                        url: '/print/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['printInvoice/printInvoice.list.ctrl'])
                        },
                        views: {
                            main: {
                                templateUrl: 'printInvoice/printInvoice.list.tpl.html',
                                controller: 'PrintInvoiceListCtrl'
                            }
                        }
                    })
//                      //开票审核查询
//                    .state('printInvoiceCheck', {
//                        url: '/printcheck/:operation',
//                        resolve: {
//                            dummy: $couchPotatoProvider.resolveDependencies(['printInvoice/printInvoice.list.ctrl'])
//                        },
//                        views: {
//                            main: {
//                                templateUrl: 'printInvoice/printInvoice.list.tpl.html',
//                                controller: 'PrintInvoiceListCtrl'
//                            }
//                        }
//                    })                
                                    //开票录入
                    .state('printInvoiceEdit', {
                        url:'/printInvoiceEdit/:pkgNo/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['printInvoice/editor/printInvoice.edit.ctrl'])
                        },
                        views: {
                        	main: {
                                templateUrl:'printInvoice/editor/printInvoice.input.html',
                                controller: 'PrintInvoiceEditCtrl'
                            }
                        }
                    })
           
                ;
            }
        ]
    );
});