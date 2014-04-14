'use strict';

describe('Controller: EditpoolCtrl', function () {
  it('Check if it gets the right data', function () {

    var test = new editTest();

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

    // Test changing the data
    test.saveData('name', 'qwer');
    test.saveData('desc', 'qwer');

    expect(test.getData('name')).toBe('qwer');
    expect(test.getData('desc')).toBe('qwer');

  });
});


var editTest = (function() {
  function editTest() {
    this._data = {};
    this._options = 2;
  };

  editTest.prototype.addPool = function(data) {
    this._data = data
  };

  editTest.prototype.saveData = function(id, data) {
    this._data[id] = data;
  }

  editTest.prototype.getData = function(id) {

    if( id === 'date')
      return new Date();

    return this._data[id];
  };

  return editTest;

})();
