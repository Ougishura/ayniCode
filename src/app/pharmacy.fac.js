/**
 * Created by diego on 11/6/2016.
 */
(function () {
  'use strict';

  angular
    .module('fuse')
    .factory("pharmacyFactory",function ($http,$firebaseArray) {

      var config = {
        apiKey: "AIzaSyDXwpM3OBKxJinZ1EPl2QJk6SW7SESXJK0",
        authDomain: "project-7064055042611230446.firebaseapp.com",
        databaseURL: "https://project-7064055042611230446.firebaseio.com",
        storageBucket: "project-7064055042611230446.appspot.com",
      };

      firebase.initializeApp(config);

      return{
        ref: firebase.database().ref()
      }
    });

})();
