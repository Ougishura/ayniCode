(function ()
{
    'use strict';

    angular
        .module('app.suppliers')
        .controller('SuppliersController', SuppliersController);

    /** @ngInject */
    function SuppliersController($state,$scope,$mdSidenav,Proveedores,msUtils,$mdDialog,$document,$stateParams)
    {

        var vm = this;

        // Data
        vm.test;
        vm.test1;
        vm.filterIds = null;
        vm.listType = 'all';
        vm.listOrder = 'name';
        vm.listOrderAsc = false;
        vm.selectedSuppliers = [];
        vm.newGroupName = '';


        // Methods
        vm.filterChange = filterChange;
        vm.openProducts = openProducts;
        vm.openSupplierDialog = openSupplierDialog;
        vm.deleteSupplierConfirm = deleteSupplierConfirm;
        vm.deleteSupplier = deleteSupplier;
        vm.deleteSelectedSuppliers = deleteSelectedSuppliers;
        vm.toggleSelectSupplier = toggleSelectSupplier;
        vm.deselectSuppliers = deselectSuppliers;
        vm.selectAllSuppliers = selectAllSuppliers;
        vm.deleteSupplier = deleteSupplier;
        vm.toggleSidenav = toggleSidenav;
        vm.toggleInArray = msUtils.toggleInArray;
        vm.exists = msUtils.exists;

        vm.test =  Proveedores.resultSuppliers();

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
                .title('Esta seguro que desea eliminar este proveedor?')
                .htmlContent('<b>' + supplier.ruc + ' : ' + supplier.socialName + '</b>' + ' will be deleted.')
                .ariaLabel('Eliminar Proveedor')
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
          Proveedores.deleteSupplier(supplier);
          //  vm.suppliers.splice(vm.suppliers.indexOf(supplier), 1);
        }

        /**
         * Delete Selected Suppliers
         */
        function deleteSelectedSuppliers(ev)
        {
            var confirm = $mdDialog.confirm()
                .title('Esta seguro de eliminar los proveedores seleccionados?')
                .htmlContent('<b>' + vm.selectedSuppliers.length + ' selected</b>' + ' will be deleted.')
                .ariaLabel('Eliminar Proveedores')
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
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }
      function openProducts(supplier,event){
        if(event){
          event.stopPropagation();
        }
        $state.go('app.suppliers.supplierProducts', {products: supplier.id});


      }
    }

})();
