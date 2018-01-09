var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');
var helper = require('../helper');
router.use('/', (req, res, next) => {
  try {
    let handler = getHandler(req.path.split('/'));
    if(typeof handler === 'function') {
      handler(req, res, next);
    } else {
      next();
    }
  } catch(e) {
    next();
  }
});
function getHandler(arr, count) {
  count = count || 0;
  // 
  while(count < arr.length - 1) {
    let arr_before = arr.slice(0, arr.length - count - 1);
    let arr_after = arr.slice(arr.length - count - 1);
    for(let i = 0; i < arr_after.length; i++) {
      let _str = arr_after.slice(0, arr_after.length - i).join('-')
      str = path.join(arr_before.join('/'), _str);
      try {
        return helper.require(path.join(__dirname, str))
      } catch(e) {
        i++
      }
    }
    count++;
  }
  return null;
}
module.exports = router;
