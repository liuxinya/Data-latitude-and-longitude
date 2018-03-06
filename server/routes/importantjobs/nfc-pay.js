var express = require('express');
var router = express.Router();
var path = require('path');
var helper = require("../../helper");
router.use('/', (req, res, next) => {
    let params = req.query;
    res.end(helper.package(
        true, [
            {
                "name": '呵呵哒2',
                "value": parseInt(Math.random()*40)
            },
            {
                "name": '嘟2',
                "value": parseInt(Math.random()*40)
            },
            {
                "name": '安安',
                "value": parseInt(Math.random()*40)
            },
            {
                "name": '哇哇',
                "value": parseInt(Math.random()*40)
            },
        ]
    ))
});
module.exports = router;
