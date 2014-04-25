'use strict';

describe('Controller: UsersettingsCtrl', function () {

  it("Check for valid emails", function() {
    var test = new userTest();

    var goodEmail = "asdf@asdf.com";
    var badEmail = "asdfghjk";
    var veryBadEmail = null;

    var testUser = {
      'first': 'Andy',
      'last': 'Luu',
      'company': [
        'Facebook'
      ],
      'email': 'andy@andy.com',
      'uid': 'simplelogin: 10'
    };

    test.addUser(testUser);

    expect(test.changeEmail(goodEmail)).toBe('ACCEPTED');
    expect(test.changeEmail(badEmail)).toBe('BAD_EMAIL');
    expect(test.changeEmail(veryBadEmail)).toBe('BAD_EMAIL');
  });

  it("Check getters and setters", function() {
    var test = new userTest();

    var testUser = {
      'first': 'Andy',
      'last': 'Luu',
      'company': [
        'Facebook'
      ],
      'email': 'andy@andy.com',
      'uid': 'simplelogin: 10'
    };

    test.addUser(testUser);

    expect(test.getData('first')).toBe('Andy');
    expect(test.getData('last')).toBe('Luu');

    test.saveData('first', 'Drew');

    expect(test.getData('first')).toBe('Drew');

  });

  it("Check adding money", function() {
    var test = new userTest();

    var testUser = {
      'first': 'Andy',
      'last': 'Luu',
      'company': [
        'Facebook'
      ],
      'email': 'andy@andy.com',
      'uid': 'simplelogin: 10',
      'winnings': 0
    };

    test.addUser(testUser);

    expect(test.getData('winnings')).toBe(0);

    test.addMoney(10);

    expect(test.getData('winnings')).toBe(10);

    test.addMoney(100);

    expect(test.getData('winnings')).toBe(110);
  });

});


var userTest = (function() {
  function userTest() {
    this._data = {};
  };

  userTest.prototype.changeEmail = function(emailstring) {
    if(emailstring === null)
      return "BAD_EMAIL";
    if(emailstring.indexOf('@') === -1) {
      return "BAD_EMAIL";
    }
    return "ACCEPTED";
  };

  userTest.prototype.addMoney = function(money) {
    this._data['winnings'] += money;
  };

  userTest.prototype.addUser = function(data) {
    this._data = data;
  };

  userTest.prototype.saveData = function(id, data) {
    this._data[id] = data;
  };

  userTest.prototype.getData = function(id) {
    return this._data[id];
  };

  return userTest;

})();
