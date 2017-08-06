var express = require('express');
var router = express.Router();
var db = require('../db/mysql')

var config = require('../config')

router.post('/timeline/new_request', (req, res) => {
    var conn = db.connect();

    var title = req.body.title,
        content = req.body.content,
        detailInfo = req.body.detailInfo,
        expectedPrice = req.body.expectedPrice,
        fee = req.body.fee,
        deadLine = req.body.deadLine,
        contentType = req.body.contentType,
        place = req.body.place;

    if (title && content && detailInfo && expectedPrice && fee && deadLine && contentType && place) {
        var sql = 'INSERT INTO timeline' +
            ' (user_email, content, detailInfo, expectedPrice, fee, deadline, title, contentType, time, place) ' +
            'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        
        var params = [req.session.signedUser.user_email, content, detailInfo, 
            expectedPrice.toString(), fee.toString(), deadLine, title, contentType, config.now(), place];
        
        conn.query(sql, params, (err, results, fields) => {
            if (err) {
                console.log(err);
                res.send({
                    resultCode: 1,
                    result: err
                })
            } else {
                res.send({
                    resultCode: 100,
                    result: results
                })
            }
        })
    } else {
        res.send({
            resultCode: 2,
            result: '파라미터 부족'
        })
    }
    // conn.end();
})

module.exports = router;