'use strict';

angular.module('assignment4App')
  .controller('MainCtrl', [ '$scope', 'loginService', 'usersService', function ($scope, loginService, usersService) {
    $scope.logout = function() {
      loginService.logout();
    }

    $scope.notifications = 0;

    loginService.getUser(function(uid) {
      usersService.userInfo(uid, function(userData) {
        $scope.notifications = userData.invites.length;
      });
    });

  }]);
