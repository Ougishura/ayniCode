/**
 * Created by arca on 5/7/16.
 */
(function ()
{
  'use strict';

  angular
    .module('app.persons', [])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
  {

    $stateProvider.state('app.persons', {
      url    : '/persons',
      views  : {
        'content@app': {
          templateUrl: 'app/main/persons/persons.html',
          controller : 'PersonsController as vm'
        }
      }
    });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/persons');

    // Navigation
    msNavigationServiceProvider.saveItem('fuse.persons', {
      title : 'PERSONAS',
      icon  : 'icon-account-box',
      state : 'app.persons',
      weight: 10
    },"persons");

  }

})();
