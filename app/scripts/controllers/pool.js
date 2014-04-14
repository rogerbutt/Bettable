'use strict';

angular.module('assignment4App')
  .controller('PoolCtrl', [ '$scope', '$routeParams', '$firebase', function ($scope, $routeParams, $firebase) {
    $scope.pool = $firebase(new Firebase('https://rgbq-assignment3.firebaseio.com/pools/' + $routeParams.key));

    /**
     * Add a bettor
     */
    $scope.addBet = function(option, name, val) {

      // Reject non number values
      if( (!isNaN(parseFloat(val)) && isFinite(val)) === false ) {
        return;
      }

      // Set up the better object
      var bettor = {
        'name': name,
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

      // Flip the flag to hide the bettor input
      $scope.bet = false;
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
      for( var i = 0; i < option.betters.length; i++ ) {
        console.log(option.betters[i].name + " won " + (winnings * (option.betters[i].val/option.val)).toString() );
      }

      // Update the model and set the winner
      $scope.pool.$save();
    };

  }]);
