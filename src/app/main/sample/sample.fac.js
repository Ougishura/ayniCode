/**
 * Created by diego on 14/6/2016.
 */
(function () {
  'use strict';

  angular
    .module('fuse')
    .factory("Auth",function ($firebaseAuth,pharmacyFactory) {
      return $firebaseAuth();
    });

})();
