'use strict';

angular.module('assignment4App')
  .controller('NewpoolCtrl', [ '$scope', '$firebase', 'loginService', function ($scope, $firebase, loginService) {

    // Get the database
    var database = $firebase(new Firebase('https://rgbq-assignment3.firebaseio.com/pools'));
    var userbase = $firebase(new Firebase('https://rgbq-assignment3.firebaseio.com/users'));


    $scope.companies = [];
    var user;
    loginService.getUser(function(id) {
      user = id;
      console.log(user);

      userbase.$on('loaded', function() {
        var comps = userbase[user].companies;
        comps.forEach(function(name) {
          $scope.companies.push(name);
        });
      });
    });

    // Finished flag
    $scope.finished = false;

    // The betting pool model
    $scope.pool = {
      'admin': '',
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

      $scope.pool.admin = user;

      // Add the data and set the key
      database.$add($scope.pool).then(function(ref) {
        $scope.pool.key = ref.name();
        var pool = database.$child(ref.name());
        pool.$set($scope.pool);
      });

      // Flip the flag
      $scope.finished = true;

    };

  }]);
