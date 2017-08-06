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

    const Register = () => {
        return new Promise((resolve, reject) => {

            if (email && name && password && univ && major) {
                var sql =
                    'INSERT INTO users ' +
                    '(user_email, user_name, user_password, ' +
                    'user_univ, user_major) ' +
                    'VALUES(?, ?, ?, ?, ?);';
                var params = [email, name, password, univ, major];

                conn.query(sql, params, (err, results, fields) => {
                    if (err)
                        reject({
                            error: err
                        })
                    resolve();
                })
            } else {
                reject({
                    error: 'Not Enough Params'
                })
            }

        })
    }

    const HandleError = (err) => {
        if (err.error === 'Not Enough Params') {
            res.status(500).send({
                resultCode: 3,
                result: err.error
            })
        } else if (err.error.errno == 1062) {
            res.status(500).send({
                resultCode: 1,
                result: 'Duplicated Email'
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
            result: 'Register Success'
        })
    }
    Register()
        .then(respond)
        .catch(HandleError)
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
                        err: 'No such Email'
                    })
                } else {
                    resolve(results[0]);
                }
            })
        })
    }
    const checkPassword = (result) => {
        return new Promise((resolve, reject) => {
            if (password === result.user_password) {
                resolve(result);
            } else {
                reject({
                    err: 'Wrong Password'
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
                        err: 'Error while creating token'
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
        if (err.err === 'Wrong Password') {
            res.status(500).send({
                resultCode: 1,
                result: err.err
            })
        } else if (err.err === 'Error while creating token') {
            res.status(500).send({
                resultCode: 2,
                result: err.err
            })
        } else if (err.err === 'No such Email') {
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