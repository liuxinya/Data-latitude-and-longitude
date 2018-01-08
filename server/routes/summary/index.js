var express = require('express');
var router = express.Router();
var path = require('path');
var helper = require("../../helper");
router.use('/', (req, res, next) => {
    next();
});
router.use('/all', (req, res, next) => {
    helper.require(
        path.join(__dirname, './all.js')
    )(req, res, next);
})
module.exports = router;
