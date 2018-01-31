var express = require('express');
var router = express.Router();
var path = require('path');
var helper = require("../../helper");
router.use('/', (req, res, next) => {
    res.end(helper.package(
        true, '恩；拉伸，的；了， 阿里看什么的卢卡斯吗'
    ))
});
module.exports = router;
