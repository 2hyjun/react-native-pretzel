var express = require('express')
var router = express.Router();
var db = require('../db/mysql')
var conn = db.connect();
var config = require('../config');
router.post('/timeline/update/:id', (req, res) => {
    var rid = parseInt(req.params.id);
    var sql = 'SELECT * FROM timeline where rid=?';
    var params = [rid];
    if (rid && req.session.signedUser) {
        conn.query(sql, params, (err, results, field) => {
            console.log(results);
            if (err) {
                console.log(err);
                res.send({
                    resultCode: 2,
                    result: err
                })
            } else if (results[0] === undefined) {
                res.send({
                    resultCode: 6,
                    result: 'No such things that rid=' + rid
                })
            } else if (req.session.signedUser.user_email !== results[0].user_email) {
                res.send({
                    resultCode: 3,
                    result: 'Permission Denied'
                })
            } else if (results[0] !== undefined) {
                var title = req.body.title,
                    content = req.body.content,
                    detailInfo = req.body.detailInfo,
                    expectedPrice = req.body.expectedPrice,
                    fee = req.body.fee,
                    deadLine = req.body.deadLine,
                    contentType = req.body.contentType,
                    place = req.body.place;
                if (title && content && detailInfo && expectedPrice && fee && deadLine && contentType && place) {
                    var sql = 'UPDATE timeline SET title=?, content=?, detailInfo=?, expectedPrice=?, fee=?, deadline=?, contentType=? , time=?, place=? where rid=?';
                    var params = [title, content, detailInfo, expectedPrice, fee, deadLine, contentType, config.now(), place, rid];
                    conn.query(sql, params, (err, result, fields) => {
                        if (err) {
                            console.log(err);
                            res.send({
                                resultCode: 5,
                                result: err
                            })
                        } else {
                            res.send({
                                resultCode: 100,
                                result: result
                            })
                        }
                    })
                } else {
                    res.send({
                        resultCode: 4,
                        result: 'No Body Parameters'
                    })
                }
            }
        })
    } else if (!req.session.signedUser) {
        res.send({
            resultCode: 6,
            result: 'No signed user'
        })
    } else {
        res.send({
            resultCode: 1,
            result: 'No id parameter'
        })
    }
})

module.exports = router;