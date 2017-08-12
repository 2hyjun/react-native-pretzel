var config = require("../../../config");
var db = require("../../../db/mysql");

exports.timeline = (req, res) => {

    const getConn = () => {
        return new Promise((resolve, reject) => {
            db.get().getConnection((err, conn) => {
                // if (err) {
                //     console.log('getConn Error: ', err);
                //     reject({
                //         err: err
                //     })
                // } else
                    resolve(conn);
            })
        })
        // return Promise.resolve(db.get());
    }
    const query = (conn) => {
        return new Promise((resolve, reject) => {
            var sql = 'SELECT * FROM timeline where completed="N"';
            conn.query(sql, (err, results, fields) => {
                conn.release();
                if (err) {
                    console.log(err);
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
    getConn()
        .then(query)
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
            if (title && content && detailInfo && expectedPrice 
                && fee && deadLine && contentType && place) {
                //console.log('checkParams')
                resolve();
                
            }
            else
                reject({
                    err: '모든 항목을 모두 입력해주십시오.'
                })
        })
    }
    const getConn = () => {
        return new Promise((resolve, reject) => {
            db.get().getConnection((err, conn) => {
                // if (err) {
                //     console.log('getConn Error: ', err);
                //     reject({
                //         err: err
                //     })
                // }
                // else {
                    resolve(conn);
                // }
                    
            })
        })
    }
    const post = (conn) => {
        return new Promise((resolve, reject) => {
            var sql = 'INSERT INTO timeline' +
                ' (user_email, content, detailInfo, expectedPrice, fee, deadline, title, contentType, time, place) ' +
                'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
            var time = config.now();
            //console.log(time);
            var params = [req.decoded.user_email, content, detailInfo,
                expectedPrice.toString(), fee.toString(), deadLine, title, contentType, time, place
            ];

            conn.query(sql, params, (err, results, fields) => {
                conn.release();
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
        if (err.err === '모든 항목을 모두 입력해주십시오.') {
            res.status(500).send({
                resultCode: 1,
                result: err.err
            })
        } else if (err.err === undefined) {
            res.status(500).send({
                resultCode: 3,
                result: err
            })
        } else {
            // console.log('hehehe')
            res.status(500).send({
                resultCode: 2,
                result: err.err.message
            })
        }

    }

    checkParams()
        .then(getConn)
        .then(post)
        .then(onSuccess)
        .catch(onError)
}
exports.delete = (req, res) => {

    var rid = parseInt(req.params.rid);

    const checkParams = () => {
        if (rid)
            return Promise.resolve();
        else
            return Promise.reject({
                err: '모든 항목을 모두 입력해주십시오.'
            })
    }
    const getConn = () => {
        return new Promise((resolve, reject) => {
            db.get().getConnection((err, conn) => {
                // console.log('getConn Error: ', err);
                // if (err)
                //     reject({
                //         err: err
                //     })
                // else
                    resolve(conn);
            })
        })
    }
    const CheckPermission = (conn) => {
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
                        err: '해당 하는 게시물이 없습니다.'
                    })
                else if (req.decoded.user_email !== results[0].user_email) {
                    // console.log(req.decoded.user_email)
                    // console.log(results[0])
                    reject({
                        err: '권한이 없습니다.'
                    })
                } else
                    resolve(conn);
            })
        })
    }

    const Delete = (conn) => {
        return new Promise((resolve, reject) => {
            var sql = 'DELETE from timeline where rid=?;';
            var params = [rid];

            conn.query(sql, params, (err, results, fields) => {
                conn.release();
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
        if (err.err === '모든 항목을 모두 입력해주십시오.')
            res.status(500).send({
                resultCode: 1,
                result: err.err
            })
        else if (err.err === '해당 하는 게시물이 없습니다.')
            res.status(500).send({
                resultCode: 2,
                result: err.err
            })
        else if (err.err === '권한이 없습니다.')
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
    checkParams()
        .then(getConn)
        .then(CheckPermission)
        .then(Delete)
        .then(onSuccess)
        .catch(onError)
}

exports.update = (req, res) => {

    var rid = parseInt(req.params.rid);
    // console.log('rid: ', rid)
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
                err: '모든 항목을 모두 입력해주십시오.'
            })
    }
    const checkBodyParams = () => {
        return new Promise((resolve, reject) => {
            if (title && content && detailInfo && expectedPrice && fee && deadLine && contentType && place)
                resolve();
            else
                reject({
                    err: '모든 항목을 모두 입력해주십시오.'
                })
        })
    }
    const getConn = () => {
        return new Promise((resolve, reject) => {
            db.get().getConnection((err, conn) => {
                // console.log('getConn Error: ', err);
                // if (err)
                //     reject({
                //         err: err
                //     })
                // else
                    resolve(conn);
            })
        })
    }

    const checkPermission = (conn) => {
        return new Promise((resolve, reject) => {
            var sql = 'SELECT user_email FROM timeline where rid=?';
            var params = [rid];
            conn.query(sql, params, (err, results, field) => {
                // console.log(results)
                if (err) {
                    reject({
                        err: err
                    })
                } else if (results[0] === undefined) {
                    reject({
                        err: '해당하는 게시물이 없습니다.'
                    })
                } else if (req.decoded.user_email !== results[0].user_email) {
                    reject({
                        err: '권한이 없습니다.'
                    })
                } else {
                    resolve(conn);
                }
            })
        })
    }

    const Update = (conn) => {
        return new Promise((resolve, reject) => {
            var sql = 'UPDATE timeline SET title=?, content=?, detailInfo=?, expectedPrice=?, fee=?, deadline=?, contentType=? , time=?, place=? where rid=?';
            var params = [title, content, detailInfo, expectedPrice, fee, deadLine, contentType, config.now(), place, rid];

            conn.query(sql, params, (err, result, fields) => {
                conn.release();
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
        if (err.err === '모든 항목을 모두 입력해주십시오.')
            res.status(500).send({
                resultCode: 1,
                result: err.err
            })
        else if (err.err === '모든 항목을 모두 입력해주십시오.')
            res.status(500).send({
                resultCode: 2,
                result: err.err
            })
        else if (err.err === '해당하는 게시물이 없습니다.')
            res.status(500).send({
                resultCode: 3,
                result: err.err
            })
        else if (err.err === '권한이 없습니다.')
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
        .then(getConn)
        .then(checkPermission)
        .then(Update)
        .then(onSuccess)
        .catch(onError)

}

exports.mypage = (req, res) => {
    var email = req.decoded.user_email;
    const getConn = () => {
        return new Promise((resolve, reject) => {
            db.get().getConnection((err, conn) => {
                conn.release();
                // console.log('getConn Error: ', err);
                // if (err)
                //     reject({
                //         err: err
                //     })
                // else
                    resolve(conn);
            })
        })
    }
    const myPosts = (conn) => {
        return new Promise((resolve, reject) => {
            var sql = 'SELECT * FROM timeline where user_email=?;';
            params = [email];
            //console.log(req.session.signedUser.user_email);
            conn.query(sql, params, (err, results, fields) => {
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

    const onSuccess = (results) => {
        res.status(201).send({
            resultCode: 100,
            result: results,
            myInfo: req.decoded
        })
    }

    const onError = (err) => {
        console.log(err);
        res.status(500).send({
            resultCode: 1,
            result: err.err.message,
            myInfo: undefined
        })
    }
    getConn()
        .then(myPosts)
        .then(onSuccess)
        .catch(onError);
}