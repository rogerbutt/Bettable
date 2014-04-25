'use strict';

angular.module('assignment4App')
  .controller('UsersettingsCtrl', [ '$scope', 'usersService', 'loginService', function ($scope, usersService, loginService) {

    $scope.user = {};

    loginService.getUser(function(id) {
      usersService.userInfo(id, function(data) {
        $scope.user = data;
      });
    });

    $scope.remove = function(index) {
      usersService.deleteInvite($scope.user.uid, index);
    }

    $scope.user.companies = [];

    $scope.select2Options = {
        'multiple': true,
        'simple_tags': true,
        'tags': $scope.user.companies  // Can be empty list.
    };
  }]);
