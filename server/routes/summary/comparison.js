var express = require('express');
var router = express.Router();
var path = require('path');
var helper = require("../../helper");
router.use('/', (req, res, next) => {
    res.end(helper.package(
        true, {
            count:  Math.random().toFixed(2) * (Math.round(Math.random()) === 0 ? -1 : 1),
            amount: Math.random().toFixed(2) * (Math.round(Math.random()) === 0 ? -1 : 1),
            income: Math.random().toFixed(2) * (Math.round(Math.random()) === 0 ? -1 : 1),
        }
    ))
});
module.exports = router;
