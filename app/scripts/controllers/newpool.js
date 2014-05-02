'use strict';

angular.module('assignment4App')
  .controller('NewpoolCtrl', [ '$scope', '$firebase', 'loginService', function ($scope, $firebase, loginService) {

    // Get the database
    var database = $firebase(new Firebase('https://rgbq-assignment3.firebaseio.com/pools'));
    var userbase = $firebase(new Firebase('https://rgbq-assignment3.firebaseio.com/users'));

    var dataRef = new Firebase('https://rgbq-assignment3.firebaseio.com/companies');
    var companyRef = $firebase(dataRef);

    $scope.companies = [];

    companyRef.$on('loaded', function() {
      var companies = companyRef.$getIndex();
      companies.forEach(function(key, i) {
        $scope.companies.push(companyRef[key].name);
      });
    });

    $scope.select2Options = {
        'multiple': true,
        'simple_tags': true,
        'tags': $scope.companies  // Can be empty list.
    };

    var user;
    loginService.getUser(function(id) {
      user = id;
    });


    // Finished flag
    $scope.finished = false;

    // The betting pool model
    $scope.pool = {
      'admin': '',
      'name': '',
      'desc': '',
      'win': '',
      'type': '',
      'pot': 0,
      'date': 0,
      'time': 0,
      'betcount': 0,
      'rounds': 0,
      'winselect': false,
      'winner': null,
      'squares': [],
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
      if( $scope.pool.type !== 'square' )
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

      if( $scope.pool.type === 'survivor' ) {
        $scope.pool.register = true;
        $scope.pool.rounds = parseInt($scope.pool.rounds);
      }

      if( $scope.pool.type === 'square' ) {

        $scope.pool.squareP = parseInt($scope.pool.squareP);

        var top  = [];
        var left = [];

        while( top.length !== 10 && left.length !== 10 ) {
          var valid = true;
          var temp = Math.floor(Math.random()*10);

          for( var i = 0; i < top.length; i++ ) {
            if( top[i] === temp ) {
              valid = false;
            }
          }
          if( valid === true && top.length !== 10 ) {
            top[top.length] = temp;
          }

          valid = true;
          temp = Math.floor(Math.random()*10);
          for( i = 0; i < left.length; i++ ) {
            if( left[i] === temp ) {
              valid = false;
            }
          }
          if( valid === true && left.length !== 10 ) {
            left[left.length] = temp;
          }
        }

        $scope.pool.topScale = top;
        $scope.pool.leftScale = left;
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
