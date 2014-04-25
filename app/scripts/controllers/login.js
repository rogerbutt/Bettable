'use strict';

angular.module('assignment4App')
  .controller('LoginCtrl', [ '$scope', 'loginService', '$location', function ($scope, loginService, $location) {
    $scope.login = function() {
      loginService.login( $scope.loginForm.email, $scope.loginForm.password, function(error) {

        console.log(error);

        if(error === null)
          $location.path('/');
        else
          $scope.logError = error.code;
      });
    };

  }]);
