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
                    //发票查询
                    .state('settlinvoice', {
                        url: '/entry/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['settleInvoice/settleInvoice.list.ctrl'])
                        },
                        views: {
                            main: {
                                templateUrl: 'settleInvoice/reinsSettleInvoiceEntry.list.tpl.html',
                                controller: 'SettleInvoiceListCtrl'
                            }
                        }
                    })
//                    //发票录入审核
//                   .state('settlinvoiceCheck', {
//                       url: '/entrycheck/:operation',
//                        resolve: {
//                            dummy: $couchPotatoProvider.resolveDependencies(['settleInvoice/settleInvoice.list.ctrl'])
//                        },
//                        views: {
//                            main: {
//                                templateUrl: 'settleInvoice/reinsSettleInvoiceEntry.list.tpl.html',
//                                controller: 'SettleInvoiceListCtrl'
//                            }
//                        }
//                    })
                                                          
                    //发票录入
                    .state('settlinvoiceEdit', {
                        url: '/invoiceEdit/:pkgNo/:operation',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['settleInvoice/editor/enterInvoice.edit.ctrl'])
                        },
                        views: {
                        	main: {
                                templateUrl: 'settleInvoice/editor/reinsEnterInvoice.input.html',
                                controller: 'SettleInvoiceEditCtrl'
                            }
                        }
                    })
                ;
            }
        ]
    );
});