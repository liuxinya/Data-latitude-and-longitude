var express = require('express');
var router = express.Router();
var path = require('path');
var helper = require("../../helper");
router.use('/', (req, res, next) => {
    let params = req.query;
    res.end(helper.package(
        true, {
            "count": {
                "thisMonth": parseInt(Math.random() * 100),
                "thisDay": parseInt(Math.random() * 100),
                "summary": parseInt(Math.random() * 100),
            },
            "amount": {
                "thisMonth": parseInt(Math.random() * 100),
                "thisDay": parseInt(Math.random() * 100),
                "summary": parseInt(Math.random() * 100),
            },
            "income": {
                "thisMonth": parseInt(Math.random() * 100),
                "thisDay": parseInt(Math.random() * 100),
                "summary": parseInt(Math.random() * 100),
            }
        }
    ))
});
module.exports = router;
