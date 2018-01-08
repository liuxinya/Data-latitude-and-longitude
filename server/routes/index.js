var express = require('express');
var router = express.Router();
var path = require('path');
var helper = require('../helper');
router.use('/summary', (req, res, next) => {
  let summaryPath = path.join(__dirname, './summary/index.js');
  helper.require(summaryPath)(req, res, next);
});
module.exports = router;
