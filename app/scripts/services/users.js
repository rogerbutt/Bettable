'use strict';

angular.module('assignment4App')
  .factory( 'usersService',
   [ '$firebase', function($firebase) {

     var dataRef = new Firebase('https://rgbq-assignment3.firebaseio.com/users');
     var userRef = $firebase(dataRef);

     return {
       userInfo: function(uid, callback) {
         userRef.$on('loaded', function() {
           callback(userRef[uid]);
         });
       },
       sendInvite: function(uid, poolname, poolid) {
         userRef.$on('loaded', function() {
           userRef[uid].invites = userRef[uid].invites || [];
           var invite =  {
             'name': poolname,
             'id': poolid
           };
           userRef[uid].invites.push(invite);
           userRef.$save();
         });
       },
       deleteInvite: function(uid, index) {
         userRef.$on('loaded', function() {
           userRef[uid].invites.splice(index, 1);
           userRef.$save();
         });
       },
       addWinnings: function(uid, val) {
         userRef.$on('loaded', function() {
           userRef[uid].winnings = userRef[uid].winnings || 0;
           userRef[uid].winnings += parseInt(val);
           userRef.$save();
         });
       },
       madeBet: function(uid, poolkey) {
         userRef.$on('loaded', function() {
           userRef[uid].bets = userRef[uid].bets || [];
           userRef[uid].bets.push(poolkey);
           userRef.$save();
         });
       },
       checkBet: function(uid, poolkey, callback) {
         userRef.$on('loaded', function() {
           for( var i = 0; i < userRef[uid].bets.length; i++ ) {
             if( userRef[uid].bets[i] === poolkey ) {
               callback(true);
               break;
             }
           }
           callback(false);
         });
       }
     }
   }]);
