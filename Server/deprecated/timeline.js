var express = require('express')
var router = express.Router();
var db = require('../db/mysql')

router.get('/timeline', (req, res) => {
    var conn = db.connect();
    var sql = 'SELECT * FROM timeline where completed="N"';
    conn.query(sql, (err, results, fields) => {
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
            });
        }

    })
    // conn.end();
})

module.exports = router;