/**
 * Created by Christian on 6/25/2016.
 */
(function () {
  "use strict";
  angular
    .module("app.suppliers")
    .controller("supplierProductsController", supplierProductsController);
  /** @ngInject */
  function supplierProductsController($scope,$state,Proveedores,msUtils,$mdDialog,$document){
    var vm = this;
    vm.test;
    vm.test1="";
    vm.supplierProducts=[];
    vm.filterIds = null;
    vm.listType = 'all';
    vm.listOrder = 'name';
    vm.listOrderAsc = false;


    vm.filterIds = null;
    vm.listType = 'all';
    vm.listOrder = 'name';
    vm.listOrderAsc = false;
    vm.selectedSupplierProducts = [];



    // Methods
    vm.openSupplierProductsDialog = openSupplierProductsDialog;
    vm.deleteSupplierProductsConfirm = deleteSupplierProductsConfirm;
    vm.deleteSupplierProducts = deleteSupplierProducts;
    vm.deleteSelectedSupplierProducts = deleteSelectedSupplierProducts;
    vm.toggleSelectSupplierProducts = toggleSelectSupplierProducts;
    vm.deselectSupplierProducts = deselectSupplierProducts;
    vm.selectAllSupplierProducts = selectAllSupplierProducts;
    vm.deleteSupplierProducts = deleteSupplierProducts;
    vm.toggleSidenav = toggleSidenav;
    vm.toggleInArray = msUtils.toggleInArray;
    vm.exists = msUtils.exists;
    vm.test1 = Proveedores.resultSuppliersProducts($state.params.products);
    vm.test =  Proveedores.resultSuppliers();

    /**
     * Open new supplierProduct dialog
     *
     * @param ev
     * @param supplierProduct
     */
    function openSupplierProductsDialog(ev, supplierProduct)
    {
      $mdDialog.show({
        controller         : 'SupplierProductsDialogController',
        controllerAs       : 'vm',
        templateUrl        : 'app/main/suppliers/dialogs/supplierProducts/supplierProducts-dialog.html',
        parent             : angular.element($document.find('#content-container')),
        targetEvent        : ev,
        clickOutsideToClose: true,
        locals             : {
          supplierProduct : supplierProduct,
          supplierProducts : vm.supplierProducts,
          supplier : $state.params.products
        }
      });
    }

    /**
     * Delete SupplierProducts Confirm Dialog
     */
    function deleteSupplierProductsConfirm(supplierProduct, ev)
    {
      var confirm = $mdDialog.confirm()
        .title('Are you sure want to delete the supplierProduct?')
        .htmlContent('<b>' + supplierProduct.name + ' : ' + supplierProduct.description + '</b>' + ' will be deleted.')
        .ariaLabel('delete supplierProduct')
        .targetEvent(ev)
        .ok('OK')
        .cancel('CANCEL');

      $mdDialog.show(confirm).then(function ()
      {

        deleteSupplierProducts(supplierProduct);
        vm.selectedSupplierProducts = [];

      }, function ()
      {

      });
    }

    /**
     * Delete SupplierProducts
     */
    function deleteSupplierProducts(supplierProduct)
    {
      Proveedores.deleteSupplierProduct($state.params.products,supplierProduct);
      //vm.supplierProducts.splice(vm.supplierProducts.indexOf(supplierProduct), 1);
    }

    /**
     * Delete Selected SupplierProducts
     */
    function deleteSelectedSupplierProducts(ev)
    {
      var confirm = $mdDialog.confirm()
        .title('Are you sure want to delete the selected supplier Product?')
        .htmlContent('<b>' + vm.selectedSupplierProducts.length + ' selected</b>' + ' will be deleted.')
        .ariaLabel('delete supplierProducts')
        .targetEvent(ev)
        .ok('OK')
        .cancel('CANCEL');

      $mdDialog.show(confirm).then(function ()
      {

        vm.selectedSupplierProducts.forEach(function (supplierProduct)
        {
          console.log("entro");
          console.log(supplierProduct);
          deleteSupplierProducts(supplierProduct);
        });

        vm.selectedSupplierProducts = [];

      });

    }

    /**
     * Toggle selected status of the supplier
     *
     * @param product
     * @param event
     */
    function toggleSelectSupplierProducts(product, event)
    {
      if ( event )
      {
        event.stopPropagation();
      }

      if ( vm.selectedSupplierProducts.indexOf(product) > -1 )
      {
        vm.selectedSupplierProducts.splice(vm.selectedSupplierProducts.indexOf(product), 1);
      }
      else
      {
        vm.selectedSupplierProducts.push(product);
      }
    }

    /**
     * Deselect suppliers
     */
    function deselectSupplierProducts()
    {
      vm.selectedSupplierProducts = [];
    }

    /**
     * Sselect all suppliers
     */
    function selectAllSupplierProducts()
    {
      vm.selectedSupplierProducts = $scope.filteredSupplierProducts;
    }
    /**
     * Toggle sidenav
     *
     * @param sidenavId
     */
    function toggleSidenav(sidenavId) {
      $mdSidenav(sidenavId).toggle();
    }
  }
})();
