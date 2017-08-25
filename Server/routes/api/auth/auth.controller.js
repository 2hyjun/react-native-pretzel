var crypto = require('crypto'),
    db = require('../../../db/mysql'),
    config = require('../../../config'),
    jwt = require('jsonwebtoken'),
    simpleEncrypt = require('../../../config/simpleEncrypt');
/*
    POST /api/auth/register
    {
        email,
        name,
        password,
        univ,
        major
    }
*/

/*
    POST /api/auth/login
    {
        email,
        password,
    }
*/

exports.login = (req, res) => {
    const {
        email,
        password
    } = req.body;
    const secret = config.secret;
    
    const getConn = () => {
        return new Promise((resolve, reject) => {
            db.get().getConnection((err, conn) => {
                resolve(conn);
            });
        });
        // return Promise.resolve(db.get());
    };
    const checkEmail = (conn) => {
        return new Promise((resolve, reject) => {
            var sql = 'SELECT * FROM users where user_email=?;';
            var params = [email];
            conn.query(sql, params, (err, results, fields) => {
                if (err) {
                    reject({
                        err: err
                    });
                } else if (results.length === 0) {
                    reject({
                        err: '존재 하지 않는 이메일입니다.'
                    });
                } else {
                    resolve({
                        conn: conn,
                        result:results[0]
                    });
                }
            });
        });
    };
    const Encrypt = (obj) => {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, config.salt.toString('base64'), 1000, 64, 'sha512', (err, key) => {
                if (err) {
                    console.error(err);
                    reject({
                        err: err
                    });
                }
                else {
                    resolve({
                        conn: obj.conn,
                        result: obj.result, 
                        encryptedPassword: key.toString('base64')
                    });
                }
            });
        });
    };
    const checkPassword = (obj) => {
        return new Promise((resolve, reject) => {
            if (obj.encryptedPassword === obj.result.user_password) {
                resolve(obj);
            } else {
                reject({
                    err: '잘못 된 비밀번호 입니다.'
                });
            }
        });
    };
    const checkEmailAuth = (obj) => {
        return new Promise((resolve, reject) => {
            var sql = 'SELECT auth FROM users where user_email=?';
            var params = [email];
            obj.conn.query(sql, params, (err, results, fields) => {
                obj.conn.release();
                if (err) {
                    console.error(err);
                    reject({
                        err: err
                    });
                }
                if (results[0].auth === 'N') {
                    reject({
                        err: '이메일 인증을 완료 해주세요.'
                    });
                } else {
                    resolve(obj.result);
                }
            });
        });
    };

    const createToken = (result) => {
        return new Promise((resolve, reject) => {
            const payload = {
                user_email: result.user_email,
                user_name: result.user_name,
                user_univ: result.user_univ,
                user_major: result.user_major
            };
            //console.log('payload', payload);
            const options = {
                expiresIn: '30d',
                issuer: 'pretzel',
                subject: 'userInfo'
            };
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    reject({
                        err: '토큰 생성 중 오류가 발생했습니다.'
                    });
                } else {
                    console.log('sign success');
                    resolve(token);
                }
            });
        });
    };
    const onError = (err) => {
        console.log(err);
        if (err.err === '잘못 된 비밀번호 입니다.') {
            res.status(500).send({
                resultCode: 1,
                result: err.err
            });
        } else if (err.err === '토큰 생성중 오류가 발생했습니다.') {
            res.status(500).send({
                resultCode: 2,
                result: err.err
            });
        } else if (err.err === '존재 하지 않는 이메일입니다.') {
            res.status(500).send({
                resultCode: 3,
                result: err.err
            });
        } else if (err.err === '이메일 인증을 완료 해주세요.') {
            res.status(500).send({
                resultCode: 4,
                result: err.err
            });
        } else {
            res.status(500).send({
                resultCode: 5,
                result: err.message
            });
        }

    };

    const respond = (token) => {
        console.log('Login SUccess');
        res.json({
            resultCode: 100,
            result: token
        });
    };

    getConn()
        .then(checkEmail)
        .then(Encrypt)
        .then(checkPassword)
        .then(checkEmailAuth)
        .then(createToken)
        .then(respond)
        .catch(onError);
};

exports.check = (req, res) => {
    res.status(201).send({
        resultCode: 100,
        result: req.decoded
    });
};

exports.emailAuthPage = (req, res) => {
    var html = `
    <html>
        <body>
            <img src="http://13.124.147.152:8124/hsk.gif"/>
            <h3>Hello</h3>
        </body>
    </html>
    `;
    res.send(html);
};