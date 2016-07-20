(function ()
{
    'use strict';

    angular
        .module('app.contacts', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider,$windowProvider)
    {


        $stateProvider.state('app.contacts', {
            url    : '/contacts',
            views  : {
                'content@app': {
                    templateUrl: function () {

                      var $window = $windowProvider.$get();
                      var array = null;
                      var exists = false;

                      if($window.sessionStorage.getItem('permision')!=null){
                        array = $window.sessionStorage.getItem('permision').split(",");

                        angular.forEach(array,function (value,key) {
                          if(value=="user"){
                            exists = true;
                          }
                        });

                        if(exists==true){
                         return 'app/main/users/contacts.html';
                        }
                        else{
                          return 'app/main/notpermission/notpermission.html';
                        }

                      }
                      else if($window.sessionStorage.getItem('permision')==null){
                        array = null;
                      }

                    },
                    controller : 'ContactsController as vm'
                }
            },
            resolve: {
                Contacts: function (msApi)
                {
                    return msApi.resolve('contacts.contacts@get');
                },
                User: function (msApi)
                {
                    return msApi.resolve('contacts.user@get');
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/users');

        // Api
        msApiProvider.register('contacts.contacts', ['app/data/contacts/contacts.json']);
        msApiProvider.register('contacts.user', ['app/data/contacts/user.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('fuse.contacts', {
            title : 'USUARIOS',
            icon  : 'icon-account-box',
            state : 'app.contacts',
            weight: 10
        },"user");

    }

})();
