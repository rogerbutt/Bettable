'use strict';

angular.module('assignment4App')
  .controller('ViewpoolsCtrl', [ '$scope', '$firebase', 'loginService', 'usersService', function ($scope, $firebase, loginService, usersService) {

    // Load the database of pools
    var database = $firebase(new Firebase('https://rgbq-assignment3.firebaseio.com/pools'));

    // Get the unique keys of the pools
    var keys = database.$getIndex();

    // Varaible to hold the pools
    $scope.pools = [];

    // Loop through and add data
    loginService.getUser(function(id) {
      usersService.userInfo(id, function(user) {
        keys.forEach(function(key, i) {
          if(database[key].company === user.companies[0])
            $scope.pools.push(database[key]);
          //console.log(key);
        });
      });
    });
  }]);
