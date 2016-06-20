(function ()
{
    'use strict';

    angular
        .module('app.suppliers', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {

        $stateProvider.state('app.suppliers', {
            url    : '/suppliers',
            views  : {
                'content@app': {
                    templateUrl: 'app/main/suppliers/suppliers.html',
                    controller : 'SuppliersController as vm'
                }
            },
            resolve: {
                Suppliers: function (msApi)
                {
                    return msApi.resolve('suppliers.suppliers@get');
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/suppliers');

        // Api
        msApiProvider.register('suppliers.suppliers', ['app/data/suppliers/suppliers.json']);
       // msApiProvider.register('suppliers.user', ['app/data/suppliers/user.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse.suppliers', {
            title : 'PROVEEDORES',
            icon  : 'icon-account-box',
            state : 'app.suppliers',
            weight: 10
        });

    }

})();
