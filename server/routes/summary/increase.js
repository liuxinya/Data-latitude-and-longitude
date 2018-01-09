var express = require('express');
var router = express.Router();
var path = require('path');
var helper = require("../../helper");
router.use('/', (req, res, next) => {
    res.end(helper.package(
        true, {
            increase: [
                {
                    date: new Date().getTime(),
                    data: {
                        count: Math.round(Math.random() * 100000 + 1000000),
                        amount: Math.round(Math.random() * 100000 + 1000000),
                        income: Math.round(Math.random() * 100000 + 1000000)
                    }
                },
                {
                    date: new Date().getTime(),
                    data: {
                        count: Math.round(Math.random() * 100000 + 1000000),
                        amount: Math.round(Math.random() * 100000 + 1000000),
                        income: 900
                    }
                },
                {
                    date: new Date().getTime(),
                    data: {
                        count: Math.round(Math.random() * 100000 + 1000000),
                        amount: Math.round(Math.random() * 100000 + 1000000),
                        income: Math.round(Math.random() * 100000 + 1000000)
                    }
                }
            ],
            nextMonthPrediction: {
                date: new Date().getTime(),
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
