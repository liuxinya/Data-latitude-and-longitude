var express = require('express');
var router = express.Router();
var path = require('path');
var helper = require("../../helper");
router.use('/', (req, res, next) => {
    let provinces = helper.require(path.join(__dirname, '../../data/area.json')).provinces;
    res.end(helper.package(
        true, provinces.map((province) => {
            return {
                name: province.provinceName,
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
