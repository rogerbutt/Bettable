'use strict';

angular.module('assignment4App')
  .controller('RegisterCtrl', [ '$scope', 'loginService', '$location', '$firebase', function ($scope, loginService, $location, $firebase) {
    $scope.register = function() {
      loginService.register( $scope.registerForm.email,
                             $scope.registerForm.password,
                             $scope.registerForm.firstname,
                             $scope.registerForm.lastname,
                             $scope.registerForm.companies,
                             function(user, error) {
        if(user !== null) {
          $location.path('/login');
        }
        else {
          $scope.error = error.code;
        }
      });
    }

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
  }]);
