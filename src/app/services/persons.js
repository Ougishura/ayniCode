/**
 * Created by diego on 11/6/2016.
 */
(function () {
  'use strict';

  angular
    .module('fuse')
    .factory("Persons",function ($firebaseArray,$firebaseObject,pharmacyFactory) {
      var idPerson =  null;
      var selectedPerson = null;
      var cad = null;


      return{
        resultPersons : function () {
          var ref = pharmacyFactory.ref.child("persons");
          var result = $firebaseArray(ref);
          return result;
        },
        resultPersonsExternal : function () {
          var ref = pharmacyFactory.ref.child("persons").orderByChild('external').equalTo(true);
          var result = $firebaseArray(ref);
          return result;
        },
        resultPersonsInternal : function () {
          var ref = pharmacyFactory.ref.child("persons").orderByChild('external').equalTo(false);
          var result = $firebaseArray(ref);
          return result;
        },
        savePersons :function (persona) {
          var ref = null;
          var f=new Date();
          var day=null;
          var month=null;
          if(f.getDay()<=9){
            day = "0"+f.getDay();
          }
          if(f.getMonth()){
            month = "0"+f.getMonth();
          }
          cad =f.getFullYear()+"-"+month+"-"+day + " " + f.getHours()+":"+f.getMinutes()+":"+f.getSeconds();

          if(idPerson!=null){
            ref = pharmacyFactory.ref.child("persons");
            var ref2= ref.child(idPerson);
            selectedPerson = $firebaseObject(ref2);
            selectedPerson.id = persona.id;
            selectedPerson.nroDocument = persona.nroDocument;
            selectedPerson.name = persona.name;
            selectedPerson.middleName = persona.middleName;
            selectedPerson.lastName = persona.lastName;
            selectedPerson.secondLastName = persona.secondLastName;
            selectedPerson.address = persona.address;
            selectedPerson.phoneNumber = persona.phoneNumber;
            selectedPerson.external = persona.external;
            selectedPerson.state = "true";
            selectedPerson.creationDate = cad;
            selectedPerson.$save().then(function () {
              console.log("OK");
            }).catch(function(error) {
              console.log(error);
            });
            }else{
              selectedPerson = pharmacyFactory.ref.child("persons").push({

                "id":null,
                "nroDocument":persona.nroDocument,
                "name":persona.name,
                "middleName":persona.middleName,
                "lastName":persona.lastName,
                "secondLastName":persona.secondLastName,
                "address":persona.address,
                "phoneNumber":persona.phoneNumber,
                "external":persona.external,
                "state":"true",
                "creationDate":  cad
            },function (response) {
              idPerson=selectedPerson;
              selectedPerson.update({
                id : selectedPerson.key
              });
            });
          }
        },
        setPerson : function (persona) {
          if(persona!=null)
            idPerson = persona.id;
          else
            idPerson =null;
        },
        deletePerson : function (persona) {

          var ref = pharmacyFactory.ref.child("persons");
          var ref2= ref.child(persona.id);
          var result = $firebaseArray(ref);
          selectedPerson = $firebaseObject(ref2);
          selectedPerson.$remove().then(function () {
            console.log("Eliminated");
            console.log(result);
          }).catch(function(error) {
            // Handle Errors here.
            console.log(error);
          });
        }
      };

    });
})();
