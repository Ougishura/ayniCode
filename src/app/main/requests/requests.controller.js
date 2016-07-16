/**
 * Created by Christian on 7/12/2016.
 */
(function ()
{
  'use strict';

  angular
    .module('app.requests')
    .controller('RequestsController', RequestsController);

  /** @ngInject */
  function RequestsController($state,$scope,$mdSidenav,Pedidos,msUtils,$mdDialog,$document,$stateParams)
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
    //vm.newGroupName = '';


    // Methods
   // vm.filterChange = filterChange;
   // vm.openProducts = openProducts;
    vm.openRequestDialog = openRequestDialog;
    vm.deleteRequestConfirm = deleteRequestConfirm;
    vm.deleteRequest = deleteRequest;
    vm.deleteSelectedRequests = deleteSelectedRequests;
    vm.toggleSelectSupplier = toggleSelectRequest;
    vm.deselectRequests = deselectRequests;
    vm.selectAllRequests = selectAllRequests;
    vm.deleteRequest = deleteRequest;
    vm.toggleSidenav = toggleSidenav;
    vm.toggleInArray = msUtils.toggleInArray;
    //vm.exists = msUtils.exists;

    vm.test =  Pedidos.resultRequests();
    vm.test.$loaded().then(function () {
      angular.forEach(vm.test,function (sale) {
        var nombre = Pedidos.searchSeller(sale);
      });

    });

    /**
     * Open new supplier dialog
     *
     * @param ev
     * @param request
     */
    function openRequestDialog(ev, request)
    {
      // $mdDialog.show({
      //   controller         : 'SupplierDialogController',
      //   controllerAs       : 'vm',
      //   templateUrl        : 'app/main/suppliers/dialogs/supplier/supplier-dialog.html',
      //   parent             : angular.element($document.find('#content-container')),
      //   targetEvent        : ev,
      //   clickOutsideToClose: true,
      //   locals             : {
      //     Supplier : supplier,
      //     Suppliers: vm.suppliers
      //   }
      // });
    }

    /**
     * Delete Supplier Confirm Dialog
     */
    function deleteRequestConfirm(supplier, ev)
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

        //deleteSupplier(supplier);
        vm.selectedRequests = [];

      }, function ()
      {

      });
    }

    /**
     * Delete Request
     */
    function deleteRequest(request)
    {
      Proveedores.deleteSupplier(supplier);
      //  vm.suppliers.splice(vm.suppliers.indexOf(supplier), 1);
    }

    /**
     * Delete Selected Suppliers
     */
    function deleteSelectedRequests(ev)
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

        vm.selectedRequests.forEach(function (request)
        {
          deleteRequest(request);
        });

        vm.selectedRequests = [];

      });

    }

    /**
     * Toggle selected status of the supplier
     *
     * @param request
     * @param event
     */
    function toggleSelectRequest(request, event)
    {
      if ( event )
      {
        event.stopPropagation();
      }

      if ( vm.selectedRequests.indexOf(request) > -1 )
      {
        vm.selectedRequests.splice(vm.selectedRequests.indexOf(request), 1);
      }
      else
      {
        vm.selectedRequests.push(request);
      }
    }

    /**
     * Deselect requests
     */
    function deselectRequests()
    {
      vm.selectedRequests = [];
    }

    /**
     * Sselect all requests
     */
    function selectAllRequests()
    {
      vm.selectedRequests = $scope.filteredRequests;
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
   /* function openProducts(supplier,event){
      if(event){
        event.stopPropagation();
      }
      $state.go('app.suppliers.supplierProducts', {products: supplier.id});


    }*/
  }
})();

