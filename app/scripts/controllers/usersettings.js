'use strict';

angular.module('assignment4App')
  .controller('UsersettingsCtrl', [ '$scope', 'usersService', 'loginService', function ($scope, usersService, loginService) {
    loginService.getUser(function(id) {
      usersService.userInfo(id, function(data) {
        $scope.user = data;
      });
    });

    $scope.remove = function(index) {
      usersService.deleteInvite($scope.user.uid, index);
    }
  }]);
