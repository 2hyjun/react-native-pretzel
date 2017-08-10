var crypto = require('crypto'),
    db = require('../../../db/mysql'),
    config = require("../../../config"),
    conn = db.connect(),
    jwt = require('jsonwebtoken')
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

exports.register = (req, res) => {
    const {
        email,
        name,
        password,
        univ,
        major
    } = req.body;
    const checkParams = () => {

        if (email && name && password && univ && major) {
            return Promise.resolve()
        } else {
            return Promise.reject({
                error: '모든 항목을 다 입력해주십시오.'
            })
        }
    }

    const Encrypt = () => {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, config.salt.toString('base64'), 1000, 64, 'sha512', (err, key) => {
                if (err) {
                    console.error(err)
                    reject({
                        error: err
                    })
                }
                else {
                    resolve(key.toString('base64'));
                }
            })
        })
    }

    const Register = (encryptPassword) => {
        return new Promise((resolve, reject) => {


            var sql =
                'INSERT INTO users ' +
                '(user_email, user_name, user_password, ' +
                'user_univ, user_major) ' +
                'VALUES(?, ?, ?, ?, ?);';
            var params = [email, name, encryptPassword, univ, major];

            conn.query(sql, params, (err, results, fields) => {
                if (err)
                    reject({
                        error: err
                    })
                resolve();
            })


        })
    }

    const HandleError = (err) => {
        console.log(err);
        if (err.error === '모든 항목을 다 입력해주십시오.') {
            res.status(500).send({
                resultCode: 3,
                result: err.error
            })
        } else if (err.error.errno == 1062) {
            res.status(500).send({
                resultCode: 1,
                result: '중복된 이메일입니다.'
            })
        } else {
            res.status(500).send({
                resultCode: 2,
                result: err.error.message
            })
        }
    }

    const respond = () => {
        res.status(201).send({
            resultCode: 100,
            result: '회원가입이 성공적으로 완료되었습니다.'
        })
    }
    checkParams()
        .then(Encrypt)
        .then(Register)
        .then(respond)
        .catch(HandleError);
}

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
    
    const checkEmail = (email) => {
        return new Promise((resolve, reject) => {
            var sql = 'SELECT * FROM users where user_email=?;';
            var params = [email];
            conn.query(sql, params, (err, results, fields) => {
                if (err) {
                    reject({
                        err: err
                    })
                } else if (results.length === 0) {
                    reject({
                        err: '존재 하지 않는 이메일입니다.'
                    })
                } else {
                    resolve(results[0]);
                }
            })
        })
    }
    const Encrypt = (result) => {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, config.salt.toString('base64'), 1000, 64, 'sha512', (err, key) => {
                if (err) {
                    console.error(err)
                    reject({
                        error: err
                    })
                }
                else {
                    resolve({
                        result: result, 
                        encryptPassword: key.toString('base64')
                    });
                }
            })
        })
    }
    const checkPassword = (obj) => {
        return new Promise((resolve, reject) => {
            if (obj.encryptPassword === obj.result.user_password) {
                resolve(obj.result);
            } else {
                reject({
                    err: '잘못 된 비밀번호 입니다.'
                })
            }
        })
    }

    const createToken = (result) => {
        return new Promise((resolve, reject) => {
            const payload = {
                user_email: result.user_email,
                user_name: result.user_name,
                user_univ: result.user_univ,
                user_major: result.user_major
            }
            //console.log('payload', payload);
            const options = {
                expiresIn: '30d',
                issuer: 'pretzel',
                subject: 'userInfo'
            }
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    reject({
                        err: '토큰 생성 중 오류가 발생했습니다.'
                    });
                } else {
                    console.log('sign success')
                    resolve(token);
                }
            })
        })
    }
    const onError = (err) => {
        var resultCode;
        console.log(err);
        if (err.err === '잘못 된 비밀번호 입니다.') {
            res.status(500).send({
                resultCode: 1,
                result: err.err
            })
        } else if (err.err === '토큰 생성중 오류가 발생했습니다.') {
            res.status(500).send({
                resultCode: 2,
                result: err.err
            })
        } else if (err.err === '존재 하지 않는 이메일입니다.') {
            res.status(500).send({
                resultCode: 3,
                result: err.err
            })
        } else {
            res.status(500).send({
                resultCode: 4,
                result: err.message
            })
        }

    }

    const respond = (token) => {
        console.log('Login SUccess')
        res.json({
            resultCode: 100,
            result: token
        })
    }

    checkEmail(email)
        .then(Encrypt)
        .then(checkPassword)
        .then(createToken)
        .then(respond)
        .catch(onError);
}

exports.check = (req, res) => {
    res.status(201).send({
        resultCode: 100,
        result: req.decoded
    })
}