const sa = require('superagent');
const fork = require('child_process').fork;
const assert = require('chai').assert;

var server;

const baseUrl = process.env.URL || 'http://localhost:3000/';

(async () => {
  // Start up server as a child process with silent output.
  server = fork('./bin/www');

  // Wait until we hear back from the server that it's listening, then run
  // the tests.
  server.on('message', runTests);

  server.on('error', (e) => {
    console.log(e);
    server.kill();
  });
})();

// Test runner.
async function runTests(m) {
  try {
    await testGetPeopleNearLondon();
    console.log('\x1b[32m%s\x1b[0m', 'Test: testGetPeopleNearLondon passed.');
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', 'Test failed.');
    console.log(err);
  }

  // Kill the server.
  server.kill();
}

// Tests /nearlondon endpoint.
async function testGetPeopleNearLondon() {
  // Make GET request.
  let res = await sa.get(`${baseUrl}nearlondon`);
  let users = res.body;
  assert.isArray(users);
  assert.isNotEmpty(users);
  assert.isNumber(users[0].id);
  assert.isString(users[0].first_name);
  assert.isString(users[0].last_name);
  assert.isString(users[0].email);
  assert.isString(users[0].ip_address);
  assert.isNumber(users[0].latitude);
  assert.isNumber(users[0].longitude);
}
