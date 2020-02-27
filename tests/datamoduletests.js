const data = require('../model/data');
const assert = require('chai').assert;

before(async function() {
  this.timeout(60000);  // 60 second timeout.
  // Initialise data module.
  await data.init();
});

