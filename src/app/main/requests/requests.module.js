/**
 * Created by Christian on 7/12/2016.
 */
(function ()
{
  'use strict';

  angular
    .module('app.requests', [])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
  {

    $stateProvider.state('app.requests',  {
      url    : '/requests',
      views  : {
        'content@app': {
          templateUrl: 'app/main/requests/request.html',
          controller : 'RequestsController as vm'
        }
      },
      resolve: {
        Suppliers: function (msApi)
        {
          return msApi.resolve('requests.requests@get');
        }
      }
    })/*.state('app.requests.requestInternal',{
      url    : '/:person',
      views  : {
        'content@app': {
          templateUrl: 'app/main/requests/requestInternal.html',
          controller: 'requestInternalController as vm'
        },
        resolve: {
          SupplierProducts: function (msApi) {
            return msApi.resolve('requestInternals.requestInternals@get');
          },
          SupplierProduct : function (msApi) {
            return msApi.resolve('requestInternal.requestInternal@get');
          }
        }
      }
    })*/;

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/requests');

    // Api
    msApiProvider.register('requests.requests', ['app/data/requests/requests.json']);
    // msApiProvider.register('suppliers.user', ['app/data/suppliers/user.json']);

    // Navigation
    msNavigationServiceProvider.saveItem('fuse.requests', {
      title : 'PEDIDOS',
      icon  : 'icon-account-box',
      state : 'app.requests',
      weight: 10
    });
  }
})();
