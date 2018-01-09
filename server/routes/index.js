var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');
var helper = require('../helper');
router.use('/', (req, res, next) => {
  try {
    let handler = helper.require(path.join(__dirname, req.path));
    console.log(typeof handler);
    if(typeof handler === 'function') {
      handler(req, res, next);
    } else {
      next();
    }
  } catch(e) {
    console.log(e);
    next();
  }
});
module.exports = router;
