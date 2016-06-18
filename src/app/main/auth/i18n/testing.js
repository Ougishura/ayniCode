// for ui-router
(function () {
  
  angular.module('app.sample')
    .controller('authController',function () {
      
    });
  /*app.run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      // We can catch the error thrown when the $requireSignIn promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $state.go("home");
      }
    });
  }]);

  app.config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("home", {
        // the rest is the same for ui-router and ngRoute...
        controller: "HomeCtrl",
        templateUrl: "views/home.html",
        resolve: {
          // controller will not be loaded until $waitForSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["Auth", function(Auth) {
            // $waitForSignIn returns a promise so the resolve waits for it to complete
            return Auth.$waitForSignIn();
          }]
        }
      })
      .state("account", {
        // the rest is the same for ui-router and ngRoute...
        controller: "AccountCtrl",
        templateUrl: "views/account.html",
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      });
  }]);

  app.controller("HomeCtrl", ["currentAuth", function(currentAuth) {
    // currentAuth (provided by resolve) will contain the
    // authenticated user or null if not signed in
  }]);

  app.controller("AccountCtrl", ["currentAuth", function(currentAuth) {
    // currentAuth (provided by resolve) will contain the
    // authenticated user or null if not signed in
  }]);/**
   * Created by Christian on 6/18/2016.
   */

});
