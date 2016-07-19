(function ()
{
    'use strict';

    angular
        .module('app.persons')
        .controller('PersonDialogController', PersonDialogController);

    /** @ngInject */
    function PersonDialogController($mdDialog, msUtils, Persons, Person)
    {
        var vm = this;


        // Data
        vm.title = 'Editar Persona';
        vm.person = angular.copy(Person);
        //vm.persons = Persons;
        //vm.user = User;
        vm.newPerson = false;
        vm.allFields = false;

        if ( !vm.person )
        {
            vm.person = {
                'nroDocument':'',
                'name'    : '',
                'lastName': '',
                'secondName'  : '',
                'secondLastName': '',
                'address' : '',
                'phoneNumber':'',
                'external': 'false'
            };

            vm.title = 'Nueva Persona';
            vm.newPerson = true;
            vm.person.tags = [];
        }

        // Methods
        vm.addNewPerson = addNewPerson;
        vm.savePerson = savePerson;
        vm.deletePersonConfirm = deletePersonConfirm;
        vm.closeDialog = closeDialog;
        vm.toggleInArray = msUtils.toggleInArray;
        vm.exists = msUtils.exists;

        //////////

        /**
         * Add new person
         */
        function addNewPerson()
        {
            //vm.persons.unshift(vm.person);
            Persons.setPerson(null);
            Persons.savePersons(vm.person);
            vm.person ={};
            closeDialog();
        }

        /**
         * Save person
         */
        function savePerson()
        {
            //console.log(vm.person);
            Persons.setPerson(vm.person);
            Persons.savePersons(vm.person);
            vm.person={};

            closeDialog();
        }

        /**
         * Delete Person Confirm Dialog
         */
        function deletePersonConfirm(ev)
        {
            var confirm = $mdDialog.confirm()
                .title('Esta seguro de que desea eliminar a esta persona?')
                .htmlContent('<b>' + vm.person.name + ' ' + vm.person.lastName + '</b>' + 'sera borrado.')
                .ariaLabel('delete person')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCEL');

            $mdDialog.show(confirm).then(function ()
            {

                //vm.persons.splice(vm.persons.indexOf(Person), 1);
                Persons.deletePerson(vm.person);
                console.log("se elimino");
            });
        }

        /**
         * Close dialog
         */
        function closeDialog()
        {
          vm.person = {};
            $mdDialog.hide();
        }

    }
})();
