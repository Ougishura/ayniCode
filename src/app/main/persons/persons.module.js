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
  function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider,$windowProvider)
  {

    $stateProvider.state('app.persons', {
      url    : '/persons',
      views  : {
        'content@app': {
          templateUrl: function () {

            var $window = $windowProvider.$get();
            var array = null;
            var exists = false;

            if($window.sessionStorage.getItem('permision')!=null){
              array = $window.sessionStorage.getItem('permision').split(",");

              angular.forEach(array,function (value,key) {
                if(value=="persons"){
                  exists = true;
                }
              });

              if(exists==true){
                return 'app/main/persons/persons.html';
              }
              else{
                return 'app/main/notpermission/notpermission.html';
              }

            }
            else if($window.sessionStorage.getItem('permision')==null){
              array = null;
            }

          },
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
