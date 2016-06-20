(function ()
{
    'use strict';

    angular
        .module('app.contacts')
        .controller('ContactDialogController', ContactDialogController);

    /** @ngInject */
    function ContactDialogController($mdDialog, Contact, Contacts, User, msUtils, Usuarios)
    {
        var vm = this;

        // Data
        vm.title = 'Añadir Usuario';
        vm.contact = angular.copy(Contact);
        vm.contacts = Contacts;
        vm.user = User;
        vm.newContact = false;
        vm.allFields = false;

        if ( !vm.contact )
        {
            vm.contact = {
                'id'      : msUtils.guidGenerator(),
                'name'    : '',
                'lastName': '',
                'avatar'  : 'assets/images/avatars/profile.jpg',
                'nickname': '',
                'company' : '',
                'jobTitle': '',
                'email'   : '',
                'phone'   : '',
                'address' : '',
                'birthday': null,
                'notes'   : ''
            };

            vm.title = 'Nuevo Usuario';
            vm.newContact = true;
            vm.contact.tags = [];
        }

        // Methods
        vm.addNewContact = addNewContact;
        vm.saveContact = saveContact;
        vm.deleteContactConfirm = deleteContactConfirm;
        vm.closeDialog = closeDialog;
        vm.toggleInArray = msUtils.toggleInArray;
        vm.exists = msUtils.exists;

        //////////

        /**
         * Add new contact
         */
        function addNewContact()
        {
            //vm.contacts.unshift(vm.contact);
            Usuarios.setUser(null);
            Usuarios.saveUsers(vm.contact);
            vm.contact ={};
            closeDialog();
        }

        /**
         * Save contact
         */
        function saveContact()
        {
            // Dummy save action
            /*for ( var i = 0; i < vm.contacts.length; i++ )
            {
                if ( vm.contacts[i].id === vm.contact.id )
                {
                    vm.contacts[i] = angular.copy(vm.contact);
                    break;
                }
            }*/

            console.log(vm.contact);
            Usuarios.setUser(vm.contact);
            Usuarios.saveUsers(vm.contact);
            vm.contact={};

            closeDialog();
        }

        /**
         * Delete Contact Confirm Dialog
         */
        function deleteContactConfirm(ev)
        {
            var confirm = $mdDialog.confirm()
                .title('Are you sure want to delete the contact?')
                .htmlContent('<b>' + vm.contact.name + ' ' + vm.contact.lastName + '</b>' + ' will be deleted.')
                .ariaLabel('delete contact')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCEL');

            $mdDialog.show(confirm).then(function ()
            {

                //vm.contacts.splice(vm.contacts.indexOf(Contact), 1);
                Usuarios.deleteUser(vm.contact);
                console.log("se elimino");
            });
        }

        /**
         * Close dialog
         */
        function closeDialog()
        {
          vm.contact = {};
            $mdDialog.hide();
        }

    }
})();
