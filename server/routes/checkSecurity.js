var express = require('express');
var router = express.Router();
var path = require('path');
var helper = require("../helper");
router.use('/', (req, res, next) => {
    res.end(helper.package(
        true, {}
    ))
});
module.exports = router;
