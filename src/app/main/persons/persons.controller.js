(function ()
{
  'use strict';

  angular
    .module('app.persons')
    .controller('PersonsController', PersonsController);

  /** @ngInject */
  function PersonsController($scope, $mdSidenav,msUtils, $mdDialog, $document,Persons,$filter)
  {

    //data
    var vm = this;
    //vm.ejem = Persons.resultPersons();
    vm.allPersons = Persons.resultPersons();
    vm.externalPersons = Persons.resultPersonsExternal();
    vm.internalPersons = Persons.resultPersonsInternal();
    vm.filterIds = 'all';
    vm.listType = 'all';
    vm.listOrder = 'name';
    vm.listOrderAsc = false;
    vm.selectedPersons = [];
    //vm.selectedPersons2 = [];
    //vm.selectedPersons2 =  Persons.resultPersons();
    //vm.newGroupName = '';




    // Methods
    vm.filterChange = filterChange;
    vm.openPersonDialog = openPersonDialog;
    vm.deletePersonConfirm = deletePersonConfirm;
    vm.deletePerson = deletePerson;
    vm.deleteSelectedPersons = deleteSelectedPersons;
    vm.toggleSelectPerson = toggleSelectPerson;
    vm.deselectPersons = deselectPersons;
    vm.selectAllPersons = selectAllPersons;
    vm.deletePerson = deletePerson;
    //vm.addNewGroup = addNewGroup;
    //vm.deleteGroup = deleteGroup;
    vm.toggleSidenav = toggleSidenav;
    vm.toggleInArray = msUtils.toggleInArray;
    vm.exists = msUtils.exists;
   // vm.prueba = pruebRol;

    //////////
   // $filter('filter')(myObjects, { shape: "circle", color: "red" });
    /**
     * Change Persons List Filter
     * @param type
     */

    //vm.test =  $firebaseArray(pharmacyFactory.ref.child("users"));

    //vm.test =  Persons.resultUsers();


    //function pruebRol() {
    //  Persons.pruebaRol();
   // }


    /**
     * Change Persons List Filter
     * @param type
     */

    function filterChange(type)
    {

      vm.listType = type;

      if ( type === 'all' )
      {
        vm.filterIds = 'all';
      }
      else if ( type === 'external' )
      {
        vm.filterIds = 'external';
      }
      else if ( type === 'internal' )
      {
        vm.filterIds = 'internal'
      }
      else if ( angular.isObject(type) )
      {
        vm.filterIds = type.personIds;
      }

      vm.selectedPersons = [];

    }


    /**
     * Open new person dialog
     *
     * @param ev
     * @param person
     */
    function openPersonDialog(ev, person)
    {
      console.log(Persons.resultPersons());
      $mdDialog.show({
        controller         : 'PersonDialogController',
        controllerAs       : 'vm',
        templateUrl        : 'app/main/persons/dialogs/person/person-dialog.html',
        parent             : angular.element($document.find('#content-container')),
        targetEvent        : ev,
        clickOutsideToClose: true,
        locals             : {
          Person : person,
          //Persons: vm.selectPersons
          //Person : person,
          //User    : vm.user,
          //Persons: vm.persons
        }
      });
    }


    /**
     * Delete Person Confirm Dialog
     */
    function deletePersonConfirm(person, ev)
    {
      var confirm = $mdDialog.confirm()
        .title('¿Esta seguro de que desea eliminar a esta persona?')
        .htmlContent('<b>' + person.name + ' ' + person.lastName + '</b>' + ' sera borrado.')
        .ariaLabel('persona borrada')
        .targetEvent(ev)
        .ok('OK')
        .cancel('CANCELAR');

      $mdDialog.show(confirm).then(function ()
      {

        console.log(allPersons);
        Persons.deletePerson(person);

      }, function ()
      {

      });
    }


    /**
     * Delete Person
     */
    function deletePerson(person)
    {
      //vm.persons.splice(vm.persons.indexOf(person), 1);
    }


    /**
     * Delete Selected Persons
     */
    function deleteSelectedPersons(ev)
    {
      var confirm = $mdDialog.confirm()
        .title('¿Esta seguro que desea eliminar las siguientes personas?')
        .htmlContent('<b>' + vm.selectedPersons.length + ' selected</b>' + ' seran borradas.')
        .ariaLabel('personas borradas')
        .targetEvent(ev)
        .ok('OK')
        .cancel('CANCELAR');

      $mdDialog.show(confirm).then(function ()
      {

        vm.selectedPersons.forEach(function (person)
        {
          Persons.deletePerson(person);
        });

        vm.selectedPersons = [];

      });

    }


    /**
     * Toggle selected status of the person
     *
     * @param person
     * @param event
     */
    function toggleSelectPerson(person, event)
    {
      if ( event )
      {
        event.stopPropagation();
      }

      if ( vm.selectedPersons.indexOf(person) > -1 )
      {
        vm.selectedPersons.splice(vm.selectedPersons.indexOf(person), 1);
      }
      else
      {
        vm.selectedPersons.push(person);
      }
    }


    /**
     * Deselect persons
     */
    function deselectPersons()
    {
      vm.selectedPersons = [];
    }


    /**
     * Select all persons
     */
    function selectAllPersons()
    {
      vm.selectedPersons = $scope.filteredPersons;

      if ( vm.filterIds === 'all' )
      {
        vm.selectedPersons = $scope.filteredPersonsAll;
      }
      else if ( vm.filterIds === 'external' )
      {
        vm.selectedPersons = $scope.filteredPersonsExternal;
      }
      else if ( vm.filterIds === 'internal' )
      {
        vm.selectedPersons = $scope.filteredPersonsInternal;
      }
    }

    /**
     *
     */
    /*
    function addNewGroup()
    {
      if ( vm.newGroupName === '' )
      {
        return;
      }

      var newGroup = {
        'id'        : msUtils.guidGenerator(),
        'name'      : vm.newGroupName,
        'personIds': []
      };

      vm.user.groups.push(newGroup);
      vm.newGroupName = '';
    }

    /**
     * Delete Group
     */

    /*
    function deleteGroup(ev)
    {
      var group = vm.listType;

      var confirm = $mdDialog.confirm()
        .title('Are you sure want to delete the group?')
        .htmlContent('<b>' + group.name + '</b>' + ' will be deleted.')
        .ariaLabel('delete group')
        .targetEvent(ev)
        .ok('OK')
        .cancel('CANCEL');

      $mdDialog.show(confirm).then(function ()
      {

        vm.user.groups.splice(vm.user.groups.indexOf(group), 1);

        filterChange('all');
      });

    }

    /**
     * Toggle sidenav
     *
     * @param sidenavId
     */
    function toggleSidenav(sidenavId)
    {
      $mdSidenav(sidenavId).toggle();
    }

  }

})();
