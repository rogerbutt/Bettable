'use strict';

angular.module('assignment4App')
  .controller('MainCtrl', [ '$scope', 'loginService', function ($scope, loginService) {
    $scope.logout = function() {
      loginService.logout();
    }
  }]);
