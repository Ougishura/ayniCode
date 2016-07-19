/**
 * Created by diego on 11/6/2016.
 */
(function () {
  'use strict';

  angular
    .module('fuse')
    .factory("Usuarios",function ($firebaseArray,$firebaseObject,pharmacyFactory,Auth) {
      var idUser = null;
      var idUser2 = null;

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

          Auth.$createUserWithEmailAndPassword(usuario.email,usuario.password)
            .then(function(firebaseUser) {

              idUser2 = firebaseUser.uid;
              console.log("el id es "+idUser2)
            }).catch(function(error) {
            console.log("Error aqui:"+error);
          });

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

            selectedUser.$save().then(function () {
              console.log("se guardo correctamente");
            }).catch(function(error) {
              // Handle Errors here.
             console.log(error);
            });

            Auth.$updatePassword("arca.ac@hotmail.com").then(function () {

            });
          }else{
            selectedUser = pharmacyFactory.ref.child("users").push({
              "id": null,
              "nroDocument":usuario.nroDocument,
              "name": usuario.name,
              "middleName":usuario.middleName,
              "lastName":usuario.lastName,
              "secondLastName":usuario.secondLastName,
              "address":usuario.address,
              "phoneNumber":usuario.phoneNumber,
              "email":usuario.email
            },function (response) {
              idUser=selectedUser;
              selectedUser.update({
                id : idUser2
              });
            });


            return

          }
        },
        setUser : function (usuario) {
          if(usuario!=null)
            idUser = usuario.id;
          else
            idUser =null;
        },
        pruebaRol : function () {

          var ref = pharmacyFactory.ref.child("users").child("Ponce");
          var result = $firebaseObject(ref);
          console.log(result);
          /*
          var ref3 = pharmacyFactory.ref.child('users').child('roles').on('value', function(keys) {
            keys.foreach(function(keysnapshot) {
              ref.child('project-7064055042611230446').child(keysnapshot.ref().key()).once('value', function(propertysnapshot) {
                if(propertysnapshot.val()!=null){
                  console.log(propertysnapshot.val().description);
                }else{
                  console.log("ptm");
                }
              });
            });
          })*/
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
        }
      };

    });

})();
