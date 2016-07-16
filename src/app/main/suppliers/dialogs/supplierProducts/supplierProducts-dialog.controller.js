/**
 * Created by Christian on 7/3/2016.
 */
(function ()
{
  'use strict';

  angular
    .module('app.suppliers')
    .controller('SupplierProductsDialogController', SupplierProductsDialogController);

  /** @ngInject */
  function SupplierProductsDialogController($mdDialog,supplierProduct,supplierProducts,supplier, msUtils, Proveedores,$state)
  {
    var vm = this;

    // Data
    vm.title = 'Editar Producto';
    vm.supplier = angular.copy(supplier);
    vm.supplierProduct = angular.copy(supplierProduct);
    vm.supplierProducts = supplierProducts;
    vm.newSupplierProduct = false;
    vm.allFields = false;
//version de prueba
    if ( !vm.supplierProduct)
    {
      vm.supplierProduct = {
        'name': '',
        'description'    : '',
        'price' : '',
        'id'      : '',
        'presentation' : ''
      };

      vm.title = 'Nuevo Producto';
      vm.newSupplierProduct = true;
      vm.supplierProduct.tags = [];
    }

    // Methods
    vm.addNewSupplierProduct = addNewSupplierProduct;
    vm.saveSupplierProduct = saveSupplierProduct;
    vm.deleteSupplierProductConfirm = deleteSupplierProductConfirm;
    vm.closeDialog = closeDialog;
    vm.toggleInArray = msUtils.toggleInArray;
    vm.exists = msUtils.exists;

    //////////

    /**
     * Add new supplier
     */
    function addNewSupplierProduct()
    {
      Proveedores.setSupplierProduct(null);
      Proveedores.saveSupplierProduct(vm.supplier,vm.supplierProduct);
      closeDialog();

    }

    /**
     * Save supplier
     */
    function saveSupplierProduct()
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

      Proveedores.setSupplierProduct(vm.supplierProduct);
      Proveedores.saveSupplierProduct(vm.supplier,vm.supplierProduct);

      closeDialog();
    }

    /**
     * Delete Supplier Confirm Dialog
     */
    function deleteSupplierProductConfirm(ev)
    {

      var confirm = $mdDialog.confirm()
        .title('Are you sure want to delete the supplier?')
        .htmlContent('<b>' + vm.supplierProduct.name + ' ' + vm.supplierProduct.description + '</b>' + ' will be deleted.')
        .ariaLabel('delete supplier')
        .targetEvent(ev)
        .ok('OK')
        .cancel('CANCEL');

      $mdDialog.show(confirm).then(function ()
      {
        Proveedores.deleteSupplierProduct(vm.supplier,vm.supplierProduct);
        init();
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
