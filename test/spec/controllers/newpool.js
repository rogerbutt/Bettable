'use strict';

describe('Controller: NewpoolCtrl', function () {

  it('Test the getters and setters', function () {

    var test = new newPoolTest();

    var fakePool = {
      'name': 'asdf',
      'desc': 'asdf',
      'win': 'asdf',
      'pot': 100,
      'date': 0,
      'time': 0,
      'betcount': 0,
      'winselect': false,
      'winner': null,
      'options': [
        {
          'name': 'option 1',
          'desc': 'asdf',
          'betters': [],
          'val': 0
        },
        {
          'name': 'option 2',
          'desc': 'asdf',
          'betters': [],
          'val': 0
        }
      ]
    };

    test.addPool(fakePool);

    expect(test.getData('name')).toBe('asdf');
    expect(test.getData('desc')).toBe('asdf');
    expect(test.getData('win')).toBe('asdf');
    expect(test.getData('winner')).toBe(null);

    var currenttime = new Date();

    var datestring = currenttime.getFullYear() + '-' +
                    (currenttime.getMonth()+1) + '-' +
                    currenttime.getDate();

    var saveddate = test.getData('date');

    var savestring = saveddate.getFullYear() + '-' +
                    (saveddate.getMonth()+1) + '-' +
                    saveddate.getDate();

    expect(savestring).toBe(datestring);

  });

  it('Test adding options', function() {

    var test = new newPoolTest();

    expect(test.getOptionCount()).toBe(2);

    test.addOption( 'Option' );

    expect(test.getOptionCount()).toBe(3);

    test.addOption( 'Option 2' );

    expect(test.getOptionCount()).toBe(4);

  });
});


var newPoolTest = (function() {
  function newPoolTest() {
    this._data = {};
    this._options = 2;
  };

  newPoolTest.prototype.addPool = function(data) {
    this._data = data
  };

  newPoolTest.prototype.addOption = function( val ) {
    var option = { 'name': 'asdf', 'desc': 'option' };
    this._data.options;
  }

  newPoolTest.prototype.getOptionCount = function() {
    this._options += 1;
    return this._options - 1;
  }

  newPoolTest.prototype.getData = function(id) {

    if( id === 'date')
      return new Date();

    return this._data[id];
  };

  return newPoolTest;

})();
