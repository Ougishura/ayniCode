(function ()
{
  'use strict';

  angular
    .module('app.auth', [])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
  {
    // State
    $stateProvider.state('app.pages_auth_login-v2', {
      data: {
        requireLogin: false // this property will apply to all children of 'app'
      },
      url      : '/auth',
      views    : {
        'main@'                          : {
          templateUrl: 'app/core/layouts/content-only.html',
          controller : 'MainController as vm'
        },
        'content@app.pages_auth_login-v2': {
          templateUrl: 'app/main/auth/login-v2.html',
          controller : 'SampleController as vm'
        }
      },
      bodyClass: 'login-v2'
    });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/auth');

    // Navigation
    msNavigationServiceProvider.saveItem('pages.auth.login-v2', {
      title : 'Login v2',
      state : 'app.pages_auth_login-v2',
      weight: 2
    },"auth");
  }

})();
