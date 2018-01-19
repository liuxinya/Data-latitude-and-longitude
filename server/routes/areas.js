var express = require('express');
var router = express.Router();
var path = require('path');
var helper = require("../helper");
router.use('/', (req, res, next) => {
    let provinces = helper.require(path.join(__dirname, '../data/area.json')).provinces;
    res.end(helper.package(
        true, provinces.map((province, index) => {
            return {
                code: index,
                name: province.provinceName
            }
        })
    ))
});
module.exports = router;
