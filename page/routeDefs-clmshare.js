define(['app'
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
                                templateUrl: 'riskunit/error.tpl.html'
                            }
                        }
                    })

                    

                    //理赔分摊（clmTms： 理赔次数）
                    .state('claimCal', {
                        url: '/claimCal/:certiNo/:certiType/:clmTms',
                        resolve: {
                            dummy: $couchPotatoProvider.resolveDependencies(['settle/settle.list.ctrl'])
                        },
                        views: {
                            main: {
                                templateUrl: 'settle/settles.list.tpl.html',
                                controller: 'SettleListCtrl'
                            }
                        }
                    })

                ;
            }
        ]
    );
});