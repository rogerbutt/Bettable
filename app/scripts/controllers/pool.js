'use strict';

angular.module('assignment4App')
  .controller('PoolCtrl', [ '$scope', '$routeParams', '$firebase', 'loginService', 'usersService', function ($scope, $routeParams, $firebase, loginService, usersService) {

    $scope.pool = $firebase(new Firebase('https://rgbq-assignment3.firebaseio.com/pools/' + $routeParams.key));
    $scope.admin = false;
    $scope.betted = false;

    var username;

    loginService.getUser(function(id) {
      usersService.userInfo(id, function(data) {
        $scope.user = data;
        if($scope.user.uid === $scope.pool.admin)
          $scope.admin = true;
        username = $scope.user.first + ' ' + $scope.user.last;

        $scope.pool.$on('loaded', function() {
          usersService.checkBet($scope.user.uid, $scope.pool.key, function(val) {
            $scope.betted = $scope.betted || val;
          });
        });
      });
    });

    /**
     * Add a bettor
     */
    $scope.addBet = function(option, val) {

      // Reject non number values
      if( (!isNaN(parseFloat(val)) && isFinite(val)) === false ) {
        return;
      }

      var userid;
      var data;

      // Set up the better object
      var bettor = {
        'name': $scope.user.first + ' ' + $scope.user.last,
        'uid': $scope.user.uid,
        'val': val
      };

      // Add the value to the total pot
      $scope.pool.pot += parseInt(val);

      // Check the bettor array
      option.betters = option.betters || [];

      // Add to the bettor array
      option.betters.push(bettor);

      // Parse the input
      option.val += parseInt(val);

      // Increase the number of bettors
      $scope.pool.betcount++;

      // Update the model
      $scope.pool.$save();

      // Keep track of the bets made
      usersService.madeBet($scope.user.uid, $scope.pool.key, val);

      // Flip the flag to hide the bettor input
      $scope.bet = false;
      $scope.betted = true;
    };

    /**
     * Check the date to end the betting
     */
    $scope.checkDate = function() {

      // Get the current time
      var currentdate = new Date();

      // Format the date
      var currdatestr = currentdate.getFullYear() + '-' +
                      (currentdate.getMonth()+1) + '-' +
                      currentdate.getDate();

      // Format the time
      var currtime = currentdate.getHours() + ':' + currentdate.getMinutes();

      // Change the strings into date objects to compare
      var currdate = new Date(currdatestr);
      var enddate = new Date($scope.pool.date);

      // Return comparison
      return(currdate > enddate || (currtime > $scope.pool.time && currdate === enddate) );
    };

    /**
     * Have the administrator select a winning side
     */
    $scope.selectWinner = function(option) {

      // Flip the flag
      $scope.pool.winselect = true;
      $scope.pool.winner = option.name;

      // Calculate the winnings
      var winnings = $scope.pool.pot - option.val;

      // Calculate winnings for each person
      if( option.betters !== undefined ) {
        for( var i = 0; i < option.betters.length; i++ ) {
          usersService.addWinnings(option.betters[i].uid, winnings*(option.betters[i].val/option.val) + option.betters[i].val);
        }
      }

      // Update the model and set the winner
      $scope.pool.$save();
    };

    $scope.workers = [];

    var dataRef = new Firebase('https://rgbq-assignment3.firebaseio.com/companies/');
    var workerRef = $firebase(dataRef);

    var temp = [];

    workerRef.$on('loaded', function() {
      var comps = workerRef.$getIndex();
      $scope.pool.$on('loaded', function() {
        for( var i = 0; i < comps.length; i++) {
          for( var j = 0; j < $scope.pool.companies.length; j++ ) {
            if( $scope.pool.companies[j] === workerRef[comps[i]].name ) {
              temp = temp.concat(workerRef[comps[i]].users);
            }
          }
        }
        for( i = 0; i < temp.length; i++ ) {
          if( temp[i].uid !== username )
            $scope.workers.push(temp[i].name);
        }
      });
    });

    $scope.invite = function() {
      for( var i = 0; i < $scope.invites.length; i++ ) {
        for( var j = 0; j < temp.length; j++ ) {
          if( $scope.invites[i] === temp[j].name ) {
            usersService.sendInvite(temp[j].uid, $scope.pool.name, $scope.pool.key);
          }
        }
      }
      $scope.invites = [];
    };

    $scope.buySquare = function() {
      $scope.pool.squares = $scope.pool.squares || [];
      console.log('asdfasdfasdf');
      if( $scope.pool.squares.length < 100 ) {
        $scope.pool.squares.push({'id': $scope.user.uid, 'name': $scope.user.first + ' ' + $scope.user.last });
        usersService.madeBet($scope.user.uid, $scope.pool.key, $scope.pool.squareP);

        $scope.bet = false;
        $scope.betted = true;

        $scope.pool.betcount++;

        $scope.pool.pot = parseInt($scope.pool.pot) + parseInt($scope.pool.squareP);

        $scope.pool.$save();
      }
    };

    $scope.squareWin = function(bettor) {
      usersService.addWinnings(bettor.id, $scope.pool.pot);
      $scope.pool.winselect = true;

      $scope.pool.winner = bettor.name;

      $scope.pool.$save();
    };

    $scope.select2Options = {
        'multiple': true,
        'simple_tags': true,
        'tags': $scope.workers  // Can be empty list.
    };

  }]);
