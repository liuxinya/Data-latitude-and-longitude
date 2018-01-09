var express = require('express');
var router = express.Router();
var path = require('path');
var helper = require("../../helper");
router.use('/', (req, res, next) => {
    let businesses = helper.require(path.join(__dirname, '../../data/business-line.json'));
    res.end(helper.package(
        true, businesses.map((business) => {
            return {
                name: business.name,
                data: {
                    count: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                    amount: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                    income: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                }
            }
        })
    ))
});
module.exports = router;
