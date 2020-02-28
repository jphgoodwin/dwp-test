const data = require('../model/data');
const assert = require('chai').assert;

before(async function() {
  this.timeout(60000);  // 60 second timeout.
  // Initialise data module.
  await data.init();
});

describe('#filterUsersNearLondon()', function() {
  it('should return filtered array of users near London', function() {
    this.timeout(60000);  // 60 second timeout.
    let inputArray = [
      { id: 1, latitude: 55.5, longitude: 5.2 },
      { id: 2, latitude: 51.1, longitude: 0.7 },
      { id: 3, latitude: 48.2, longitude: -5.8 },
      { id: 4, latitude: 50.8, longitude: -0.3 },
      { id: 5, latitude: 63.4, longitude: 2.6 }
    ]
    let filteredArray = data.filterUsersNearLondon(inputArray);
    assert.isArray(filteredArray);
    assert.equal(filteredArray.length, 2);
    assert.equal(filteredArray[0].id, 2);
    assert.equal(filteredArray[0].latitude, 51.1);
    assert.equal(filteredArray[0].longitude, 0.7);
    assert.equal(filteredArray[1].id, 4);
    assert.equal(filteredArray[1].latitude, 50.8);
    assert.equal(filteredArray[1].longitude, -0.3);
  });
});

describe('#getPeopleNearLondon()', function() {
  it('should return array of users living in or currently near London', function() {
    let users = data.getPeopleNearLondon();
    assert.isArray(users);
    assert.isNotEmpty(users);
    assert.isNumber(users[0].id);
    assert.isString(users[0].first_name);
    assert.isString(users[0].last_name);
    assert.isString(users[0].email);
    assert.isString(users[0].ip_address);
    assert.isNumber(users[0].latitude);
    assert.isNumber(users[0].longitude);
  });
});

after(function() {
  // Clear intervals.
  data.clearIntervals();
});
