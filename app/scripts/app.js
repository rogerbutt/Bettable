'use strict';

angular.module('assignment4App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/NewPool', {
        templateUrl: 'views/newpool.html',
        controller: 'NewpoolCtrl'
      })
      .when('/ViewPools', {
        templateUrl: 'views/viewpools.html',
        controller: 'ViewpoolsCtrl'
      })
      .when('/pool/:key*', {
        templateUrl: 'views/pool.html',
        controller: 'PoolCtrl'
      })
      .when('/edit/:key*', {
        templateUrl: 'views/editpool.html',
        controller: 'EditpoolCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
