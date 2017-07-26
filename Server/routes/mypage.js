var express = require('express')
var router = express.Router();
var db = require('../db/mysql');

router.get('/mypage', (req, res) => {
    var conn = db.connect();
    var sql = 'SELECT * FROM timeline where user_email=?;';
    params = [req.session.signedUser.user_email];
    //console.log(req.session.signedUser.user_email);
    conn.query(sql, params, (err, results, fields) => {
        if (err) {
            //console.log(err);
            res.send({
                resultCode: 1,
                result: err,
                myInfo: undefined
            })
        } else {
            res.send({
                resultCode: 100,
                result: results,
                myInfo: req.session.signedUser
            })
        }
    })
})    

module.exports = router;