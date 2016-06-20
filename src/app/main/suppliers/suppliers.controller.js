(function ()
{
    'use strict';

    angular
        .module('app.suppliers')
        .controller('SuppliersController', SuppliersController);

    /** @ngInject */
    function SuppliersController($scope, $mdSidenav, Suppliers,msUtils, $mdDialog, $document,pharmacyFactory,$firebaseArray)
    {

        var vm = this;

        // Data
        vm.test;
        vm.roles;
        vm.users;
        vm.suppliers = Suppliers.data;

        vm.filterIds = null;
        vm.listType = 'all';
        vm.listOrder = 'name';
        vm.listOrderAsc = false;
        vm.selectedSuppliers = [];
        vm.newGroupName = '';

        // Methods
        vm.filterChange = filterChange;
        vm.openSupplierDialog = openSupplierDialog;
        vm.deleteSupplierConfirm = deleteSupplierConfirm;
        vm.deleteSupplier = deleteSupplier;
        vm.deleteSelectedSuppliers = deleteSelectedSuppliers;
        vm.toggleSelectSupplier = toggleSelectSupplier;
        vm.deselectSuppliers = deselectSuppliers;
        vm.selectAllSuppliers = selectAllSuppliers;
        vm.deleteSupplier = deleteSupplier;
        vm.addNewGroup = addNewGroup;
        vm.deleteGroup = deleteGroup;
        vm.toggleSidenav = toggleSidenav;
        vm.toggleInArray = msUtils.toggleInArray;
        vm.exists = msUtils.exists;

        //////////

        /**
         * Change Suppliers List Filter
         * @param type
         */

        vm.test =  $firebaseArray(pharmacyFactory.ref.child("suppliers"));
      
        function filterChange(type)
        {

            vm.listType = type;

            if ( type === 'all' )
            {
                vm.filterIds = null;
            }
            else if ( type === 'frequent' )
            {
                vm.filterIds = vm.user.frequentSuppliers;
            }
            else if ( type === 'starred' )
            {
                vm.filterIds = vm.user.starred;
            }
            else if ( angular.isObject(type) )
            {
                vm.filterIds = type.supplierIds;
            }

            vm.selectedSuppliers = [];

        }

        /**
         * Open new supplier dialog
         *
         * @param ev
         * @param supplier
         */
        function openSupplierDialog(ev, supplier)
        {
            $mdDialog.show({
                controller         : 'SupplierDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/suppliers/dialogs/supplier/supplier-dialog.html',
                parent             : angular.element($document.find('#content-container')),
                targetEvent        : ev,
                clickOutsideToClose: true,
                locals             : {
                    Supplier : supplier,
                    Suppliers: vm.suppliers
                }
            });
        }

        /**
         * Delete Supplier Confirm Dialog
         */
        function deleteSupplierConfirm(supplier, ev)
        {
            var confirm = $mdDialog.confirm()
                .title('Are you sure want to delete the supplier?')
                .htmlContent('<b>' + supplier.ruc + ' : ' + supplier.socialName + '</b>' + ' will be deleted.')
                .ariaLabel('delete supplier')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCEL');

            $mdDialog.show(confirm).then(function ()
            {

                deleteSupplier(supplier);
                vm.selectedSuppliers = [];

            }, function ()
            {

            });
        }

        /**
         * Delete Supplier
         */
        function deleteSupplier(supplier)
        {
            vm.suppliers.splice(vm.suppliers.indexOf(supplier), 1);
        }

        /**
         * Delete Selected Suppliers
         */
        function deleteSelectedSuppliers(ev)
        {
            var confirm = $mdDialog.confirm()
                .title('Are you sure want to delete the selected suppliers?')
                .htmlContent('<b>' + vm.selectedSuppliers.length + ' selected</b>' + ' will be deleted.')
                .ariaLabel('delete suppliers')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCEL');

            $mdDialog.show(confirm).then(function ()
            {

                vm.selectedSuppliers.forEach(function (supplier)
                {
                    deleteSupplier(supplier);
                });

                vm.selectedSuppliers = [];

            });

        }

        /**
         * Toggle selected status of the supplier
         *
         * @param supplier
         * @param event
         */
        function toggleSelectSupplier(supplier, event)
        {
            if ( event )
            {
                event.stopPropagation();
            }

            if ( vm.selectedSuppliers.indexOf(supplier) > -1 )
            {
                vm.selectedSuppliers.splice(vm.selectedSuppliers.indexOf(supplier), 1);
            }
            else
            {
                vm.selectedSuppliers.push(supplier);
            }
        }

        /**
         * Deselect suppliers
         */
        function deselectSuppliers()
        {
            vm.selectedSuppliers = [];
        }

        /**
         * Sselect all suppliers
         */
        function selectAllSuppliers()
        {
            vm.selectedSuppliers = $scope.filteredSuppliers;
        }

        /**
         *
         */
        function addNewGroup()
        {
            if ( vm.newGroupName === '' )
            {
                return;
            }

            var newGroup = {
                'id'        : msUtils.guidGenerator(),
                'name'      : vm.newGroupName,
                'supplierIds': []
            };

            vm.user.groups.push(newGroup);
            vm.newGroupName = '';
        }

        /**
         * Delete Group
         */
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
