(function ()
{
    'use strict';

    angular
        .module('fuse')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $timeout, $state,$window,$location,Rols)
    {
      console.log($rootScope+ "  awdasdasda");
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;
        console.log(requireLogin);

        if (requireLogin && $window.sessionStorage.getItem('currentUser') === null) {
          //$state.go("app.auth");

          // get me a login modal!
          //console.log($window.sessionStorage.getItem('currentUser'));
          //console.log("no existe usuario");
         // $location.url('/auth');

        }
        else{
          //Rols.resultUserRol();

          //console.log("existe usuario");
          //console.log($window.sessionStorage.getItem('currentUser'));

        }
      });
     /* $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {

        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
          $state.go("/auth");
        }
      });        // Activate loading indicator*/
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function ()
        {
            $rootScope.loadingProgress = true;
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function ()
        {
            $timeout(function ()
            {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });
    }
})();
