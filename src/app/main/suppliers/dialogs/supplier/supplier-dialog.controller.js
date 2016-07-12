(function ()
{
    'use strict';

    angular
        .module('app.suppliers')
        .controller('SupplierDialogController', SupplierDialogController);

    /** @ngInject */
    function SupplierDialogController($mdDialog, Supplier, Suppliers, msUtils, Proveedores)
    {
        var vm = this;

        // Data
        vm.title = 'Editar Producto ';
        vm.supplier = angular.copy(Supplier);
        vm.suppliers = Suppliers;
        vm.newSupplier = false;
        vm.allFields = false;

        if ( !vm.supplier )
        {
            vm.supplier = {
              'socialName': '',
              'ruc'    : '',
              'address' : '',
              'phoneNumber' : '',
              'id'      : msUtils.guidGenerator(),
              'creationDate': '',
              'description': '',
              'avatar'  : 'assets/images/avatars/profile.jpg',
              'state'   : '',
              'listProducts' : ''
            };

            vm.title = 'Nuevo Proveedor';
            vm.newSupplier = true;
            vm.supplier.tags = [];
        }

        // Methods
        vm.addNewSupplier = addNewSupplier;
        vm.saveSupplier = saveSupplier;
        vm.deleteSupplierConfirm = deleteSupplierConfirm;
        vm.closeDialog = closeDialog;

        vm.toggleInArray = msUtils.toggleInArray;
        vm.exists = msUtils.exists;

        //////////

        /**
         * Add new supplier
         */
        function addNewSupplier()
        {
          Proveedores.setSupplier(null);
          Proveedores.saveSupplier(vm.supplier);
          closeDialog();
        }

        /**
         * Save supplier
         */
        function saveSupplier()
        {
           /* // Dummy save action
            for ( var i = 0; i < vm.suppliers.length; i++ )
            {
                if ( vm.suppliers[i].id === vm.supplier.id )
                {
                    vm.suppliers[i] = angular.copy(vm.supplier);
                    break;
                }
            }*/
            console.log(vm.supplier);
          Proveedores.setSupplier(vm.supplier);
          Proveedores.saveSupplier(vm.supplier);

            closeDialog();
        }

        /**
         * Delete Supplier Confirm Dialog
         */
        function deleteSupplierConfirm(ev)
        {
            var confirm = $mdDialog.confirm()
                .title('Are you sure want to delete the supplier?')
                .htmlContent('<b>' + vm.supplier.socialName + ' ' + vm.supplier.ruc + '</b>' + ' will be deleted.')
                .ariaLabel('delete supplier')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCEL');

            $mdDialog.show(confirm).then(function ()
            {
              Proveedores.deleteSupplier(vm.supplier);
            });
        }

        /**
         * Close dialog
         */
        function closeDialog()
        {
            $mdDialog.hide();
        }
    }
})();
