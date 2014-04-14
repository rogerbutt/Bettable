'use strict';

angular.module('assignment4App')
  .controller('NewpoolCtrl', function ($scope, $firebase) {

    // Finished flag
    $scope.finished = false;

    // The betting pool model
    $scope.pool = {
      'name': '',
      'desc': '',
      'win': '',
      'pot': 0,
      'date': 0,
      'time': 0,
      'betcount': 0,
      'winselect': false,
      'winner': null,
      'options': [
        {
          'name': 'option 1',
          'desc': '',
          'betters': [],
          'val': 0
        },
        {
          'name': 'option 2',
          'desc': '',
          'betters': [],
          'val': 0
        }
      ]
    };

    // Add an option on the model
    $scope.addOption = function() {
      $scope.pool.options.push({ 'name': '', 'desc': '', 'betters': [], 'val': 0 });
    };

    // Put the model in the database
    $scope.submitPool = function() {

      // Get the date
      var date = new Date();

      // Get the database
      var database = $firebase(new Firebase('https://rgbq-assignment3.firebaseio.com/pools'));

      // Check if the time is set
      if( $scope.pool.time === 0 ) {
        $scope.pool.time = date.getHours() + ':' + date.getMinutes();
      }

      // Check if the date is set
      if( $scope.pool.date === 0 ) {
        $scope.pool.date = date.getFullYear() + '-' +
                        (date.getMonth()+1) + '-' +
                        date.getDate();
      }

      // Add the data and set the key
      database.$add($scope.pool).then(function(ref) {
        $scope.pool.key = ref.name();
        var pool = database.$child(ref.name());
        pool.$set($scope.pool);
      });

      // Flip the flag
      $scope.finished = true;

    };

  });
