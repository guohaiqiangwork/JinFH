// Anything required here wil by default be combined/minified by r.js
// if you use it.
define(['app', 'routeDefs-clmshare', 'filters'], function(app) {

    app.run([
        '$couchPotato', '$state', '$stateParams', '$rootScope',
        function($couchPotato, $state, $stateParams, $rootScope) {

            // by assigning the couchPotato service to the lazy property, we
            // the register functions will know to run-time-register components
            // instead of config-time-registering them.
            app.lazy = $couchPotato;

            // angular-ui-project recommends assigning these services to the root
            // scope.  Others have argued that doing so can lead to obscured
            // dependencies and that making services directly available to html and
            // directives is unclean.  In any case, the ui-router demo assumes these
            // are available in the DOM, therefore they should be on $rootScope.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

        }
    ]);
});
