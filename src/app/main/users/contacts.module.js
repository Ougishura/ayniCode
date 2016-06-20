(function ()
{
    'use strict';

    angular
        .module('app.contacts', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {

        $stateProvider.state('app.contacts', {
            url    : '/contacts',
            views  : {
                'content@app': {
                    templateUrl: 'app/main/users/contacts.html',
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
        });

    }

})();
