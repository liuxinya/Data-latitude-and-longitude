var express = require('express');
var router = express.Router();
var path = require('path');
var helper = require("../../helper");
router.use('/', (req, res, next) => {
    res.end(helper.package(
        true, {
            count: Math.round(Math.random() * 10000 + 10000),
            amount: Math.round(Math.random() * 10000 + 10000),
            income: Math.round(Math.random() * 10000 + 10000)
        }
    ))
});
module.exports = router;
