var express = require('express');
var router = express.Router();
var path = require('path');
var helper = require("../../helper");
router.use('/', (req, res, next) => {
    let params = req.query;
    let date = helper.getDate(params.date);
    let month = 6;
    res.end(helper.package(
        true, {
            increase: helper.generateArr(month, (index) => {
                let _date = new Date(date.year, date.month - 1 - 6 + index + 1, date.day).getTime();
                return {
                    date: parseDate(_date),
                    data: {
                        count: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                        amount: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                        income: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                    }
                }
            }),
            nextMonthPrediction: {
                date: parseDate(new Date(date.year, date.month, date.day).getTime()),
                data: {
                    count: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                    amount: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                    income: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                }
            }
        }
    ))
});
router.use('/increase', (req, res, next) => {
    let params = req.query;
    let date = helper.getDate(params.date);
    let month = 6;
    res.end(helper.package(
        true, helper.generateArr(params.months, (index) => {
            return {
                date: new Date(date.year, date.month - 1 - 6 + index + 1, date.day).getTime(),
                data: {
                    count: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                    amount: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                    income: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                }
            }
        })
    ))
});
router.use('/nextMonthPrediction', (req, res, next) => {
    let params = req.query;
    let date = helper.getDate(params.date);
    let month = 6;
    res.end(helper.package(
        true, {
            date: new Date(date.year, date.month, date.day).getTime(),
            data: {
                count: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                amount: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
                income: helper.randomPositiveAndNegative() * Math.random().toFixed(2),
            }
        }
    ))
});
function parseZero(num) {
    return num < 10 ? `0${num}` : num;
}
function parseDate(date) {
    date = new Date(date);
    return `${parseZero(date.getFullYear())}${parseZero(date.getMonth() + 1)}${parseZero(date.getDate())}`
}
module.exports = router;
