const sa = require('superagent');
const assert = require('chai').assert;

// Latitude and longitude of London in degrees.
const londonLat = 51.507;
const londonLong = -0.128;

// The value of 1 degree of longitude depends on the latitude. This equates to a
// difference of ~1.4 miles between 50 miles South of London and 50 miles North.
// In order to save on computation I've used an approximation of 43 miles. Were
// more accuracy to be required, the value could be calculated dynamically for
// each user's latitude value.
const latMiles = 69;      // ~1 degree of latitude from London in miles.
const longMiles = 43;     // ~1 degree of longitude from London in miles.

var usersArray = [];      // Array to hold users that either live in London, or are
                          // currently within 50 miles of it.

async function init() {
  // Initially populate users array.
  await populateUsersArray();

  // Update the users array at 60 second intervals.
  setInterval(updateUsersArray, 60000);
}

async function getPeopleNearLondon() {
  return usersArray;
}

async function updateUsersArray() {
  try {
    await populateUsersArray();
    console.log(usersArray);
  } catch (err) {
    console.log(err);
    console.log('Failed to update usersArray.');
  }
}

async function populateUsersArray() {
  // Get users that live in London and store in users array.
  let res = await sa.get('https://bpdts-test-app.herokuapp.com/city/London/users');
  tempArray = res.body;

  // Assert we've got an array.
  assert.isArray(tempArray);

  // Get complete users list.
  res = await sa.get('https://bpdts-test-app.herokuapp.com/users');
  let allUsers = res.body;

  // Assert we've got an array.
  assert.isArray(allUsers);

  // Filter out users within 50 miles of London and add to users array.
  usersArray = tempArray.concat(filterUsersNearLondon(allUsers));
}

function filterUsersNearLondon(users) {
  let result = [];

  // Filter out users outside 50 mile radius and add rest to result array.
  for (let i=0; i < users.length; i++) {
    // Calculate latitudinal and longitudinal distances to London in miles.
    let latDist = (users[i].latitude - londonLat) * latMiles;
    let longDist = (users[i].longitude - londonLong) * longMiles;

    // Eliminate immediately if either latitudinal or longitudinal distance is
    // greater than 50 miles from center of London.
    if (Math.abs(latDist) > 50 || Math.abs(longDist) > 50) continue;

    // Calculate straight line distance to center of London and determine if it
    // exceeds 50 miles.
    if (Math.sqrt(latDist*latDist + longDist*longDist) > 50) continue;

    // User is within 50 miles of the center of London so add to array.
    result.push(users[i]);
  }

  return result;
}

module.exports = {
  init: init,
  getPeopleNearLondon: getPeopleNearLondon,
  filterUsersNearLondon: filterUsersNearLondon
};
