/**
 * Created by diego on 11/6/2016.
 */
(function () {
  'use strict';

  angular
    .module('fuse')
    .factory("Auth",function ($firebaseAuth) {
      return $firebaseAuth();

    });

})();
