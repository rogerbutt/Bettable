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
          for( var i = 0; i < database[key].companies.length; i++ ) {
            for( var j = 0; j < user.companies.length; j++ ) {
              if( database[key].companies[i] === user.companies[j] )
                $scope.pools.push(database[key]);
            }
          }
        });
        $scope.$apply();
      });
    });
  }]);
