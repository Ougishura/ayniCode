/**
 * Created by Christian on 6/25/2016.
 */

(function () {
  'use strict';

  angular
    .module('fuse')
    .factory("Proveedores",function ($firebaseArray,$firebaseObject,pharmacyFactory) {
      var idSupplier = null;
      var idSupplierProduct = null;
      var selectedSupplier = null;
      var selectedSupplierProduct = null;

      return{
        resultSuppliers : function () {
          var ref = pharmacyFactory.ref.child("suppliers");
          var result = $firebaseArray(ref);
          return result;
        },
        resultSuppliersProducts : function (supplier) {
          var ref = pharmacyFactory.ref.child("suppliers").child(supplier).child("listProduct");
          var result = $firebaseArray(ref);
          return result;
        },
        saveSupplier :function (supplier) {
          var ref = null;

          if(idSupplier!=null){
            ref = pharmacyFactory.ref.child("suppliers");
            var ref2= ref.child(idSupplier);
            selectedSupplier = $firebaseObject(ref2);
            selectedSupplier.address = supplier.address;
            selectedSupplier.creationDate =supplier.creationDate;
            selectedSupplier.description = supplier.description;
            selectedSupplier.id=supplier.id;
            selectedSupplier.phoneNumber=supplier.phoneNumber;
            selectedSupplier.ruc=supplier.ruc;
            selectedSupplier.socialName=supplier.socialName;
            selectedSupplier.state=supplier.state;
            selectedSupplier.listProduct = supplier.listProduct;
            selectedSupplier.$save().then(function () {
              console.log("se guardo correctamente");
            }).catch(function(error) {
              // Handle Errors here.
              console.log(error);
            });

          }else{
            selectedSupplier = pharmacyFactory.ref.child("suppliers").push({
              "address":  supplier.address,
              "creationDate": supplier.creationDate,
              "description" :  supplier.description,
              "id": null,
              "phoneNumber": supplier.phoneNumber,
              "ruc":supplier.ruc,
              "socialName":supplier.socialName,
              "state":supplier.state,
              "listProducts" : supplier.listProducts
            },function (response) {
              idSupplier=selectedSupplier.key;
              selectedSupplier.update({
                id : selectedSupplier.key
              });
            });

          }
        },
        saveSupplierProduct : function (supplier,supplierProducts) {
          var prueba="";
          var ref = pharmacyFactory.ref.child("suppliers");
          if(idSupplierProduct!=null){
            var ref2 = ref.child(supplier+"/listProduct/"+supplierProducts.id);
            selectedSupplierProduct = $firebaseObject(ref2);
            selectedSupplierProduct.description = supplierProducts.description;
            selectedSupplierProduct.name = supplierProducts.name;
            selectedSupplierProduct.presentation = supplierProducts.presentation;
            selectedSupplierProduct.prize = supplierProducts.prize;
            selectedSupplierProduct.id = supplierProducts.id;
            selectedSupplierProduct.$save().then(function () {
              console.log("se guardo correctamente");
            }).catch(function(error) {
              // Handle Errors here.
              console.log(error);
            });
          }
          else{
            selectedSupplierProduct = ref.child(supplier).child("listProduct");
            prueba = selectedSupplierProduct.push({
              "description": supplierProducts.description,
              "name": supplierProducts.name,
              "presentation": supplierProducts.presentation,
              "prize": supplierProducts.prize,
              "id" : null
            },function (response) {
              idSupplierProduct=prueba.key;
              prueba.update({
                id : prueba.key
              });
            })
          }
        },

        setSupplierProduct : function(supplierProduct){
          if(supplierProduct!=null)
            idSupplierProduct = supplierProduct.id;
          else
            idSupplierProduct =null;
        },

        setSupplier : function (supplier) {
          if(supplier!=null)
            idSupplier = supplier.id;
          else
            idSupplier =null;

        },

        deleteSupplier : function (supplier) {

          var ref = pharmacyFactory.ref.child("suppliers");
          var ref2 = ref.child(supplier.id);
          selectedSupplier = $firebaseObject(ref2);
          selectedSupplier.$remove().then(function () {
            console.log("se elimino");
          }).catch(function(error) {
            // Handle Errors here.
            console.log(error);
          });
        },
        deleteSupplierProduct : function (supplier,supplierProduct) {
          var ref = pharmacyFactory.ref.child("suppliers");
          var ref2 = ref.child(supplier).child("listProduct").child(supplierProduct.id);
          selectedSupplierProduct = $firebaseObject(ref2);
          selectedSupplierProduct.$remove().then(function () {

          }).catch(function (error) {
            console.log(error);
          })
        }
      };

    });

})();

