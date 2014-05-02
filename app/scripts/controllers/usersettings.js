'use strict';

angular.module('assignment4App')
  .controller('UsersettingsCtrl', [ '$scope', '$firebase', 'usersService', 'loginService', function ($scope, $firebase, usersService, loginService) {

    $scope.userNames = []

    function adminOptions() {
      if($scope.user.admin === 'false')
        return;

      var companyKey = null;
      var companyRef = $firebase(new Firebase('https://rgbq-assignment3.firebaseio.com/companies/'));
      var companies = companyRef.$getIndex();
      for( var i = 0; i < companies.length; i++ ) {
        if(companyRef[companies[i]].name === $scope.user.companies[0]) {
          companyKey = companies[i];
          break;
        }
      }

      if(companyKey !== null) {
        $scope.company = companyRef.$child(companyKey);
      }
    }

    $scope.user = {};

    loginService.getUser(function(id) {
      usersService.userInfo(id, function(data) {
        $scope.user = data;

        adminOptions();
      });
    });

    $scope.loadEdit = function() {
      usersService.userInfo($scope.editSelect, function(data) {
        $scope.editUser = data;
      });
    }

    $scope.remove = function(index) {
      usersService.deleteInvite($scope.user.uid, index);
    }

    $scope.save = function() {
      usersService.editUser($scope.user.uid, $scope.user);
    }

    $scope.editSave = function() {
      usersService.editUser($scope.editUser.uid, $scope.editUser);
    }

    $scope.user.companies = [];

    $scope.select2Options = {
        'multiple': true,
        'simple_tags': true,
        'tags': $scope.user.companies  // Can be empty list.
    };

  }]);
