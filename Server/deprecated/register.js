var express = require('express')
var router = express.Router();
var crypto = require('crypto');
var db = require('../db/mysql')
var config = require('../config')
var conn = db.connect();

router.post('/register', (req, res) => {
    var email = req.body.email,
        name = req.body.name,
        password = req.body.password,
        univ = req.body.univ,
        major = req.body.major;

    if (email && name && password && univ && major) {
        crypto.pbkdf2(password, config.salt.toString('base64'), 1000, 64, 'sha512', (err, key) => {
            var sql = 'INSERT INTO users (user_email, user_name, user_password, user_univ, user_major) VALUES(?, ?, ?, ?, ?);';
            var params = [email, name, key.toString('base64'), univ, major];
            conn.query(sql, params, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    if (err.errno == 1062) {
                        res.send({
                            registerCode: 1,
                            result: 'Duplicated Email'
                        })
                    } else {
                        res.send({
                            registerCode: 2,
                            result: err
                        })
                    }

                } else {
                    res.send({
                        registerCode: 100,
                        result: 'Register Success'
                    })
                }
                // conn.end();
            })

        })
    } else {
        res.send({
            registerCode: 3,
            result: 'No Body Parameters'
        })
    }
    
})
module.exports = router;