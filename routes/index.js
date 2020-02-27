const express = require('express');
const router = express.Router();
const data = require('../model/data.js');

/* GET people living in or currently within 50 miles of London. */
router.get('/nearlondon', async (req, res, next) => {
  try {
    let result = await data.getPeopleNearLondon();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

module.exports = router;
