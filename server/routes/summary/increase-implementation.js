var express = require('express');
var router = express.Router();
var path = require('path');
var helper = require("../../helper");
router.use('/', (req, res, next) => {
    let businesses = helper.require(path.join(__dirname, '../../data/business-line.json'));
    res.end(helper.package(
        true, {
            count: generateRandomData(),
            amount: generateRandomData(),
            income: generateRandomData(),
        }
    ))
});
function generateRandomData() {
    let target =  Math.round(Math.random() * 10000000 + 100000);
    return {
        data: Math.round(Math.random() * 10000000 + 100000),
        lastYearAverageIncrease: helper.randomPositiveAndNegative() * (Math.random().toFixed(2)),
        implementation: {
            target: target,
            hasDone: Math.round(Math.random() * target)
        },
        implementationRate: helper.randomPositiveAndNegative() * (Math.random().toFixed(2)),
        yearonyear: helper.randomPositiveAndNegative() * (Math.random().toFixed(2)),
    }
}
module.exports = router;
