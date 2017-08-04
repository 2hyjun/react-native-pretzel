var express = require('express')
var router = express.Router();
// var db = require('../db/mysql');

router.get('/', (req, res) => {
    if (req.session.signedUser) {
        res.send({
            resultCode: 100
        })
    } else {
        res.send({
            resultCode: 1
        })
    }
});

module.exports = router;