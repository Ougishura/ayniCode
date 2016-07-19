(function ()
{
    'use strict';

    angular
        .module('app.sample')
        .controller('SampleController', function(Auth,$scope,$window,$state,Rols){
          var vm = this;
          vm.createUser = createUser;
          vm.deleteUser = deleteUser;
          vm.signIn = signIn;
          vm.currentUser = currentUser;
          vm.message = null;
          vm.error = null;
          vm.test = null;
          vm.test1 = null;

          function signIn() {
            Auth.$signInWithEmailAndPassword(vm.test, vm.test1).
              then(function (firebaseUser) {

                  currentUser(firebaseUser);


                  console.log('entro '+firebaseUser.uid);
                  console.log('entro '+firebaseUser.email);
                  Rols.resultUserRol();


              }).catch(function(error) {
                // Handle Errors here.
                vm.message = error.code;
                vm.error = error.message;
            });
          }

          function currentUser(firebaseUser) {
            $window.sessionStorage.currentUser = firebaseUser.uid;
            $window.sessionStorage.email = firebaseUser.email;
            //if( $window.sessionStorage.currentUser!==null){

              $state.go('app.sample');
           // }

           // Rols.resultUserRol();
            //$window.sessionStorage.permision;
            //console.log($window.sessionStorage.permision);
            //console.log("c"+$window.sessionStorage.email);
            //$window.sessionStorage.removeItem('permision');



          }

          function createUser() {


            Auth.$createUserWithEmailAndPassword($scope.email,$scope.password)
              .then(function(firebaseUser) {
                vm.message = "User created with uid: " + firebaseUser.uid;
              }).catch(function(error) {
              vm.error = "Error aqui:"+error;
            });


          }

          function deleteUser() {

            // Delete the currently signed-in user
            Auth.$deleteUser().then(function() {
              vm.message = "User deleted";
            }).catch(function(error) {
              vm.error = error;
            });

          }


        });

    /** @ngInject */

})();
