var express = require('express')
var router = express.Router();
var db = require('../db/mysql')
var crypto = require('crypto')
var config = require('../config')

router.post('/login', (req, res) => {
    var conn = db.get();
    if (req.body.email && req.body.password) {
        var sql = 'SELECT * FROM users where user_email=?;';
        var params = [req.body.email];
        conn.query(sql, params, (err, results, fields) => {
            if (err) {
                //console.log(err);
                console.log(conn.config)
                res.send({
                    resultCode: 1,
                    result: err
                })
            } else if (results.length == 0) {
                res.send({
                    resultCode: 2,
                    result: 'No such ID'
                })
            } else {
                crypto.pbkdf2(req.body.password, config.salt.toString('base64'), 1000, 64, 'sha512', (err, key) => {
                    if (key.toString('base64') === results[0].user_password) {
                        req.session.signedUser = results[0]
                        res.send({
                            resultCode: 100,
                            result: req.session.signedUser
                        });
                    } else {
                        res.send({
                            resultCode: 3,
                            result: 'Wrong Password'
                        });
                    }
                })
            }
        })
    } else {
        res.send({
            resultCode: 4,
            result: 'No Body Parameters'
        });
    }
    // conn.end();
})

module.exports = router;