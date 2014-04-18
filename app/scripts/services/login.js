'use strict';

angular.module('assignment4App')
  .factory( 'loginService',
   [ '$firebase', '$firebaseSimpleLogin', '$location', function( $firebase, $firebaseSimpleLogin, $location ) {
     var dataRef = new Firebase('https://rgbq-assignment3.firebaseio.com/');
     var loginObj = $firebaseSimpleLogin(dataRef);

     var userRef = new Firebase('https://rgbq-assignment3.firebaseio.com/users');
     var userObj = $firebase(userRef);

     var companyRef = new Firebase('https://rgbq-assignment3.firebaseio.com/companies');
     var companyObj = $firebase(companyRef);

     return {
      login: function( emailadd, pass, callback ) {
        loginObj.$login('password', {
           email: emailadd,
           password: pass
        }).then(function(user) {
           callback(user.uid);
        }, function(error) {
           console.error('Login failed: ', error);
        });
      },
      logout: function() {
        loginObj.$logout();
        $location.path('/login');
      },
      getUser: function(callback) {
        loginObj.$getCurrentUser().then(function(user) {
          callback(user.uid);
        });
      },
      checkUser: function() {
        loginObj.$getCurrentUser().then(function(user) {
          if( user === null ) {
            $location.path('/login');
          }
        });
      },
      register: function( emailadd, pass, first, last, usrcompanies, callback ) {
        var asdf = loginObj.$createUser( emailadd, pass ).then(function(user) {
          // Create a user
          userObj = userObj || [];
          var userModel = {
            'uid': user.uid,
            'email': emailadd,
            'first': first,
            'last': last,
            'companies': usrcompanies
          };

          var found = false;
          companyObj.$on('loaded', function() {
            var companies = companyObj.$getIndex();
            for(var i = 0; i < usrcompanies.length; i++ ) {
              found = false;
              for(var j = 0; j < companies.length; j++ ) {
                if( usrcompanies[i] === companyObj[companies[j]].name ) {

                  companyObj[companies[j]].users = companyObj[companies[j]].users || [];

                  var newUser = {'uid': user.uid, 'name': first + ' ' + last};

                  companyObj[companies[j]].users.push(newUser);
                  companyObj.$save();
                  found = true;
                }
              }

              // If the company is not found
              if( found === false ) {
                var temp = {
                  'name': usrcompanies[i],
                  'users': []
                };

                companyObj.$add(temp).then(function(ref) {
                  temp.key = ref.name();
                  var comp = companyObj.$child(ref.name());
                  comp.$set(temp);
                  companyObj[ref.name()].users = [];
                  var newUser = {'uid': user.uid, 'name': first + ' ' + last};
                  companyObj[ref.name()].users.push(newUser);
                  companyObj.$save();
                });
              }
            }
          });

          var loc = userObj.$child(user.uid)
          loc.$set(userModel);
          userObj.$save();

          callback(user.uid, null);
        }, function(error) {
          callback(null, error);
        });
      }
    }
   }]);
