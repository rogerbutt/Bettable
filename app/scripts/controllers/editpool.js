'use strict';

angular.module('assignment4App')
  .controller('EditpoolCtrl', [ '$scope', '$routeParams', '$firebase', function ($scope, $routeParams, $firebase) {

    // Saved flag
    $scope.saved = false;

    // Get the data
    $scope.pool = $firebase(new Firebase('https://rgbq-assignment3.firebaseio.com/pools/' + $routeParams.key));

    // Add an additional option to the model
    $scope.addOption = function() {
      $scope.pool.options.push({ 'name': '', 'desc': '', 'betters': [], 'val': 0 });
    };

    // Save the data
    $scope.editPool = function() {
      $scope.pool.$save();

      $scope.saved = true;
    };

  }]);
