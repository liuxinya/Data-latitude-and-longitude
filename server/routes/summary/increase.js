var express = require('express');
var router = express.Router();
var path = require('path');
var helper = require("../../helper");
router.use('/', (req, res, next) => {
    let params = req.query;
    let date = helper.getDate(params.date);
    res.end(helper.package(
        true, {
            increase: helper.generateArr(params.months, (index) => {
                return {
                    date: new Date(date.year, date.month - 1 - params.months + index + 1, date.day).getTime(),
                    data: {
                        count: Math.round(Math.random() * 100000 + 1000000),
                        amount: Math.round(Math.random() * 100000 + 1000000),
                        income: Math.round(Math.random() * 100000 + 1000000)
                    }
                }
            }),
            nextMonthPrediction: {
                date: new Date(date.year, date.month, date.day).getTime(),
                data: {
                    count: Math.round(Math.random() * 100000 + 1000000),
                    amount: Math.round(Math.random() * 100000 + 1000000),
                    income: Math.round(Math.random() * 100000 + 1000000)
                }
            }
        }
    ))
});
module.exports = router;
