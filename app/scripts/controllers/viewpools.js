'use strict';

angular.module('assignment4App')
  .controller('ViewpoolsCtrl', function ($scope, $firebase) {

    // Load the database of pools
    var database = $firebase(new Firebase('https://rgbq-assignment3.firebaseio.com/pools'));

    // Get the unique keys of the pools
    var keys = database.$getIndex();

    // Varaible to hold the pools
    $scope.pools = [];

    // Loop through and add data
    keys.forEach(function(key, i) {
      $scope.pools.push(database[key]);
      //console.log(key);
    });
  });
