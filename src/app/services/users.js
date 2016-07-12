/**
 * Created by diego on 11/6/2016.
 */
(function () {
  'use strict';

  angular
    .module('fuse')
    .factory("Usuarios",function ($firebaseArray,$firebaseObject,pharmacyFactory,Auth) {
      var idUser = null;

      var results = null;
      var selectedUser = null;

      return{
        resultUsers : function () {
          var ref = pharmacyFactory.ref.child("users");
          var result = $firebaseArray(ref);
          return result;
        },
        saveUsers :function (usuario) {
          var ref = null;

          if(idUser!=null){
            ref = pharmacyFactory.ref.child("users");
            var ref2= ref.child(idUser);
            selectedUser = $firebaseObject(ref2);
            console.log(selectedUser);
            selectedUser.id = usuario.id;
            selectedUser.nroDocument =usuario.nroDocument;
            selectedUser.name = usuario.name;
            selectedUser.middleName=usuario.middleName;
            selectedUser.lastName=usuario.lastName;
            selectedUser.secondLastName=usuario.secondLastName;
            selectedUser.address=usuario.address;
            selectedUser.phoneNumber=usuario.phoneNumber;
            selectedUser.email=usuario.email;
            selectedUser.rol = usuario.rol;

            selectedUser.$save().then(function () {
              console.log("se guardo correctamente");
            }).catch(function(error) {
              // Handle Errors here.
             console.log(error);
            });
          }else{

            Auth.$createUserWithEmailAndPassword(usuario.email,usuario.password)
              .then(function(firebaseUser) {
                selectedUser = pharmacyFactory.ref.child("users/"+firebaseUser.uid).set({
                  "id": firebaseUser.uid,
                  "nroDocument":usuario.nroDocument,
                  "name": usuario.name,
                  "middleName":usuario.middleName,
                  "lastName":usuario.lastName,
                  "secondLastName":usuario.secondLastName,
                  "address":usuario.address,
                  "phoneNumber":usuario.phoneNumber,
                  "email":usuario.email,
                  "rol" : usuario.rol
                });
              }).catch(function(error) {
              console.log("Error aqui:"+error);
            });
          }
        },
        setUser : function (usuario) {
          if(usuario!=null)
            idUser = usuario.id;
          else
            idUser =null;
        },
        deleteUser : function (usuario) {

          var ref = pharmacyFactory.ref.child("users");
          var ref2= ref.child(usuario.id);
          selectedUser = $firebaseObject(ref2);
          selectedUser.$remove().then(function () {
            console.log("se elimino");
          }).catch(function(error) {
            // Handle Errors here.
            console.log(error);
          });
        },

        getRoles : function () {
          var ref = pharmacyFactory.ref.child('roles');
          return $firebaseArray(ref);
        }

      };

    });

})();
