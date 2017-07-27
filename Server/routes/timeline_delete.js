var express = require('express')
var router = express.Router();
var db = require('../db/mysql')


router.get('/timeline/delete/:id', (req, res) => {

    var rid = parseInt(req.params.id);
    var sql = 'SELECT * FROM timeline where rid=?;';
    //console.log(sql)
    var params = [rid];
    var conn = db.connect();
    conn.query(sql, params, (err, results, fields) => {
        // console.log(req.session.signedUser);
        // console.log(results);
        console.log(req.session.signedUser.user_email);
        console.log(results[0].user_email);
        if (err) {
            console.log(err);
            res.send({
                resultCode: 3,
                result: err
            })
        } else if (results.length == 0) {
            res.send({
                resultCode: 4,
                result: 'Wrong RID. No such bulletin'
            })
        } else if (req.session.signedUser.user_email !== results[0].user_email) {

            res.send({
                resultCode: 1,
                result: 'Permission Denied'
            })
        } else {
            var sql = 'DELETE FROM timeline where rid=?';
            var params = [req.params.id];
            conn.query(sql, params, (err, results, fields) => {
                if (err) {
                    console.log(err)
                    res.send({
                        resultCode: 2,
                        result: err
                    })
                } else {
                    res.json({
                        resultCode: 100,
                        result: results
                    })
                }
            })
            
        }
    })
    // conn.end();
})

module.exports = router;