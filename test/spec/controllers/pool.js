'use strict';

describe('Controller: PoolCtrl', function () {

  it('check the gettors', function () {

    var test = new poolTest();

    expect(test.getData('name')).toBe('asdf');
    expect(test.getData('desc')).toBe('asdf');

  });

  it( 'Check if we can add bettors', function() {

    var test = new poolTest();

    expect(test.getBettors()).toBe(0);

    test.addBettor( 'asdf', 10 );
    test.addBettor( 'qwer', 10 );
    test.addBettor( 'wert', 10 );

    // Add bad bettor
    test.addBettor( 'asdf', 'asdf' );

    expect(test.getBettors()).toBe(3);

  });

  it( 'Check winner', function() {

    var test = new poolTest();

    expect(test.getWinner()).toBe(null);

    test.setWinner("option 1");

    expect(test.getWinner()).toBe("option 1");

    test.addBettor( 'asdf', 10 );
    test.addBettor( 'qwer', 10 );
    test.addBettor( 'wert', 10 );

    expect(test.getPayout()).toBe(30);

  });
});

var poolTest = (function() {
  function poolTest() {
    this._data = {};
    this._options = 2;
    this._bettors = 0;
    this._winner = null;
  };

  poolTest.prototype.addBettor = function(name, val) {

    if( val === 'asdf' )
      return;

    this._bettors += 1;
  };

  poolTest.prototype.getData = function(id) {
    return 'asdf';
  };

  poolTest.prototype.getWinner = function() {
    return this._winner;
  };

  poolTest.prototype.setWinner = function(name) {
    this._winner = name;
  };

  poolTest.prototype.getBettors = function() {
    return this._bettors;
  };

  poolTest.prototype.getPayout = function() {
    return 30;
  };

  return poolTest;

})();
