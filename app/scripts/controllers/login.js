'use strict';

angular.module('assignment4App')
  .controller('LoginCtrl', [ '$scope', 'loginService', '$location', function ($scope, loginService, $location) {
    $scope.login = function() {
      var user;
      loginService.login( $scope.loginForm.email, $scope.loginForm.password, function(uid) {
        user = uid;
        if( user !== null ) {
          $location.path('/');
        }
      });
    };

  }]);
