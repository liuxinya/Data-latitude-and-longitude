var express = require('express');
var router = express.Router();
var path = require('path');
var helper = require("../../helper");
router.use('/', (req, res, next) => {
    let params = req.query;
    let date = helper.getDate('20170104');
    res.end(helper.package(
        true, {
            increase: helper.generateArr(12, (index) => {
                return {
                    date: new Date(date.year, date.month - 1 - params.months + index + 1, date.day).getTime(),
                    data: {
                        count: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                        amount: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                        income: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                    }
                }
            }),
            nextMonthPrediction: {
                date: new Date(date.year, date.month, date.day).getTime(),
                data: {
                    count: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                    amount: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                    income: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                }
            }   
        }
    ))
});
module.exports = router;
