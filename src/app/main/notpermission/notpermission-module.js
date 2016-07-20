(function ()
{
    'use strict';

    angular
        .module('app.pages_errors_notpermission', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider)
    {
        // State
        $stateProvider.state('app.pages_errors_notpermission', {
            url      : '/notpermission',
            views    : {
                    'content@app': {
                    templateUrl: 'app/main/notpermission/notpermission.html',
                    controller : 'NotPermissionController as vm'
                }
            }
        });

        // Translation
      $translatePartialLoaderProvider.addPart('app/main/notpermission');
    }

})();
