var config = require("../../../config");
var db = require("../../../db/mysql");
var conn = db.connect();

exports.timeline = (req, res) => {

    const query = () => {
        return new Promise((resolve, reject) => {
            var sql = 'SELECT * FROM timeline where completed="N"';
            conn.query(sql, (err, results, fields) => {
                if (err) {
                    reject({
                        err: err
                    })
                } else {
                    resolve(results)
                }
            })
        })
    }

    const respond = (results) => {
        res.status(201).send({
            resultCode: 100,
            result: results
        })
    }

    const onError = (err) => {
        res.status(500).send({
            resultCode: 1,
            result: err.message
        })
    }

    query()
        .then(respond)
        .catch(onError);
}

exports.post = (req, res) => {
    const {
        title,
        content,
        detailInfo,
        expectedPrice,
        fee,
        deadLine,
        contentType,
        place
    } = req.body;
    const checkParams = () => {
        return new Promise((resolve, reject) => {
            if (title && content && detailInfo && expectedPrice && fee && deadLine && contentType && place)
                resolve();
            else
                reject({
                    err: 'Not Enough Params'
                })
        })
    }
    const post = () => {
        return new Promise((resolve, reject) => {
            var sql = 'INSERT INTO timeline' +
                ' (user_email, content, detailInfo, expectedPrice, fee, deadline, title, contentType, time, place) ' +
                'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
            var params = [req.decoded.user_email, content, detailInfo,
                expectedPrice.toString(), fee.toString(), deadLine, title, contentType, config.now(), place
            ];

            conn.query(sql, params, (err, results, fields) => {
                if (err)
                    reject({
                        err: err
                    })
                else {
                    resolve(results)
                }

            })
        })
    }
    const onSuccess = (results) => {
        res.status(201).send({
            resultCode: 100,
            result: results
        })
    }

    const onError = (err) => {
        if (err.err === 'Not Enough Params') {
            res.status(500).send({
                resultCode: 1,
                result: err.err
            })
        } else {
            res.status(500).send({
                resultCode: 2,
                result: err.err.message
            })
        }

    }

    checkParams()
        .then(post)
        .then(onSuccess)
        .catch(onError)
}
exports.delete = (req, res) => {

    var rid = parseInt(req.params.rid);
    const checkParams = (rid) => {
        if (rid)
            return Promise.resolve(rid);
        else
            return Promise.reject({
                err: 'Not Enough Params'
            })
    }

    const CheckPermission = (rid) => {
        return new Promise((resolve, reject) => {
            var sql = 'SELECT user_email FROM timeline WHERE rid=?;'
            var params = [rid];

            conn.query(sql, params, (err, results, fields) => {
                if (err)
                    reject({
                        err: err
                    })
                else if (results.length === 0)
                    reject({
                        err: 'Wrong RID. No such bulletin'
                    })
                else if (req.decoded.user_email !== results[0].user_email) {
                    console.log(req.decoded.user_email)
                    console.log(results[0])
                    reject({
                        err: 'Permisison Denied'
                    })
                } else
                    resolve(rid);
            })
        })
    }

    const Delete = (rid) => {
        return new Promise((resolve, reject) => {
            var sql = 'DELETE from timeline where rid=?;';
            var params = [rid];

            conn.query(sql, params, (err, results, fields) => {
                if (err)
                    reject({
                        err: err
                    })
                else
                    resolve(results);
            })
        })
    }

    const onError = (err) => {
        if (err.err === 'Not Eought Params')
            res.status(500).send({
                resultCode: 1,
                result: err.err
            })
        else if (err.err === 'Wrong RID. No such bulletin')
            res.status(500).send({
                resultCode: 2,
                result: err.err
            })
        else if (err.err === 'Permisison Denied')
            res.status(500).send({
                resultCode: 3,
                result: err.err
            })
        else
            res.status(500).send({
                resultCode: 4,
                result: err.err.message
            })
    }

    const onSuccess = (results) => {
        res.status(201).send({
            resultCode: 100,
            result: results
        })
    }
    checkParams(rid)
        .then(CheckPermission)
        .then(Delete)
        .then(onSuccess)
        .catch(onError)
}

exports.update = (req, res) => {

    var rid = parseInt(req.params.rid);
    console.log('rid: ', rid)
    const {
        title,
        content,
        detailInfo,
        expectedPrice,
        fee,
        deadLine,
        contentType,
        place
    } = req.body;

    const checkParams = () => {
        if (rid)
            return Promise.resolve(rid);
        else
            return Promise.reject({
                err: 'Not Enough Params'
            })
    }
    const checkBodyParams = () => {
        return new Promise((resolve, reject) => {
            if (title && content && detailInfo && expectedPrice && fee && deadLine && contentType && place)
                resolve();
            else
                reject({
                    err: 'Not Enough Body Params'
                })
        })
    }

    const checkPermission = () => {
        return new Promise((resolve, reject) => {
            var sql = 'SELECT user_email FROM timeline where rid=?';
            var params = [rid];
            conn.query(sql, params, (err, results, field) => {
                console.log(results)
                if (err) {
                    reject({
                        err: err
                    })
                } else if (results[0] === undefined) {
                    reject({
                        err: 'No such bulletin. Wrong rid'
                    })
                } else if (req.decoded.user_email !== results[0].user_email) {
                    reject({
                        err: 'Permission Denied'
                    })
                } else {
                    resolve();
                }
            })
        })
    }

    const Update = () => {
        return new Promise((resolve, reject) => {
            var sql = 'UPDATE timeline SET title=?, content=?, detailInfo=?, expectedPrice=?, fee=?, deadline=?, contentType=? , time=?, place=? where rid=?';
            var params = [title, content, detailInfo, expectedPrice, fee, deadLine, contentType, config.now(), place, rid];

            conn.query(sql, params, (err, result, fields) => {
                if (err) {
                    reject({
                        err: err
                    })
                } else {
                    resolve(result)
                }
            })
        })
    }
    const onSuccess = (results) => {
        res.status(201).send({
            resultCode: 100,
            result: results
        })
    }

    const onError = (err) => {
        if (err.err === 'Not Enough Params')
            res.status(500).send({
                resultCode: 1,
                result: err.err
            })
        else if (err.err === 'Not Enough Body Params')
            res.status(500).send({
                resultCode: 2,
                result: err.err
            })
        else if (err.err === 'No such bulletin. Wrong rid')
            res.status(500).send({
                resultCode: 3,
                result: err.err
            })
        else if (err.err === 'Permission Denied')
            res.status(500).send({
                resultCode: 4,
                result: err.err
            })
        else
            res.status(500).send({
                resultCode: 5,
                result: err.err
            })
    }

    checkParams()
        .then(checkBodyParams)
        .then(checkPermission)
        .then(Update)
        .then(onSuccess)
        .catch(onError)

}

exports.mypage = (req, res) => {
    var email = req.decoded.user_email;

    const myPosts = () => {
        return new Promise((resolve, reject) => {
            var sql = 'SELECT * FROM timeline where user_email=?;';
            params = [email];
            //console.log(req.session.signedUser.user_email);
            conn.query(sql, params, (err, results, fields) => {
                if (err) {
                    reject({err: err})
                } else {
                    resolve(results)
                }
            })
        })
    }

    const onSuccess = (results) => {
        res.status(201).send({
            resultCode: 100,
            result: results,
            myInfo: req.decoded
        })
    }

    const onError = (err) => {
        res.status(500).send({
            resultCode: 1,
            result: err.err.message,
            myInfo: undefined
        })
    }

    myPosts()
        .then(onSuccess)
        .catch(onError);
}