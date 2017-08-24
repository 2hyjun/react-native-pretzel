var crypto = require('crypto'),
    db = require('../../../db/mysql'),
    config = require('../../../config'),
    jwt = require('jsonwebtoken'),
    nodemailer = require('nodemailer'),
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
            return Promise.resolve();
        } else {
            return Promise.reject({
                error: '모든 항목을 다 입력해주십시오.'
            });
        }
    };

    const Encrypt = () => {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, config.salt.toString('base64'), 1000, 64, 'sha512', (err, key) => {
                if (err) {
                    console.error(err);
                    reject({
                        error: err
                    });
                }
                else {
                    resolve(key.toString('base64'));
                }
            });
        });
    };
    const getConn = (encryptedPassword) => {
        return new Promise((resolve, reject) => {
            db.get().getConnection((err, conn) => {
                resolve({
                    password: encryptedPassword,
                    conn: conn
                });
            });
        });
        // return Promise.resolve(db.get());
    };
    const Register = (obj) => {
        return new Promise((resolve, reject) => {
            
            var sql =
                'INSERT INTO users ' +
                '(user_email, user_name, user_password, ' +
                'user_univ, user_major) ' +
                'VALUES(?, ?, ?, ?, ?);';
            var encryptedPassword = obj.password;
            var conn = obj.conn;
            var params = [email, name, encryptedPassword, univ, major];
            
            conn.query(sql, params, (err, results, fields) => {
                conn.release();
                if (err)
                    reject({
                        error: err
                    });
                resolve();
            });
        });
    };

    const AuthEmailSend = () => {
        return new Promise((resolve, reject) => {
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'pretzel.summertime@gmail.com',
                    pass: 'pretzel123',
                }
            });
            const html = 
            `<!DOCTYPE html>
            <html>
                <head>
                    <meta charset='utf-8'>
                    <h3>Pretzel 이메일 인증</h3>
                    <img src="cid:unique@kreata.ee" />
                    <a href='http://localhost:8124/api/auth/emailAuthPage'>인증 페이지로 이동</a>
                </head>
                <body>
                    <fieldset>
                        <form action='http://13.124.147.152:8124/api/auth/checkEmail' method="POST">
                            <p>
                                <h5>이메일: </h5>
                                <input type='text' name="email" value=${email} />
                            </p>
                            <p>
                                <h5>비밀번호: </h5>
                                <input type="password" name="password" placeholder="비밀번호" />
                            </p>
                            <p>
                                <input type="submit"/>
                            </p>
                        </form>
                    </fieldset>
                </body>
            </html>
            `;
    
            let mailOptions = {  
                from: '프레첼 <pretzel.summertime@pusan.ac.kr>',
                to: email,
                subject: 'Pretzel 이메일 인증',
                html: html,
            };
            //console.log(mailOptions);
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject({
                        error: error
                    });
                } else {
                    resolve();
                }
            });
        });
        
        
    };

    const HandleError = (err) => {
        console.log(err);
        if (err.error === '모든 항목을 다 입력해주십시오.') {
            res.status(500).send({
                resultCode: 3,
                result: err.error
            });
        } else if (err.error.errno == 1062) {
            res.status(500).send({
                resultCode: 1,
                result: '중복된 이메일입니다.'
            });
        } else {
            res.status(500).send({
                resultCode: 2,
                result: err.error.message
            });
        }
    };

    const respond = () => {
        res.status(201).send({
            resultCode: 100,
            result: `${email}로 인증 메일이 발송 되었습니다.`
        });
    };
    checkParams()
        .then(Encrypt)
        .then(getConn)
        .then(Register)
        .then(AuthEmailSend)
        .then(respond)
        .catch(HandleError);
};

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

exports.checkEmailAuth = (req, res) => {
    let {
        email,
        password
    } = req.body;

    const enc1 = simpleEncrypt.encrypt('thisiSfIrStSimplepretzelClientEncryptionKEy', password);
    password = simpleEncrypt.encrypt('thisiSSeCONdSimplepretzelClientEncryptionKEy', enc1);
    
    const getConn = () => {
        return new Promise((resolve, reject) => {
            db.get().getConnection((err, conn) => {
                resolve(conn);
            });
        });
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
                        errMessage: '존재 하지 않는 이메일입니다.'
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
                    errMessage: '잘못 된 비밀번호 입니다.'
                });
            }
        });
    };
    
    const verify = (obj) => {
        return new Promise((resolve, reject) => {
            var sql = 'UPDATE users SET auth=? where user_email=?';
            var params = ['Y', email];
            obj.conn.query(sql, params, (err, results) => {
                if (err)
                    reject({
                        err:err
                    });
                else {
                    resolve();
                }
            });
        });
    };

    const respond = () => {
        res.send('인증되었습니다.');
    };

    const onError = (err) => {
        
        if (err.errMessage) {
            const html = `
            <script language=javascript>alert('${err.errMessage}')</script>
            `;
            res.send(html);
        } else {
            res.send({
                err: err
            });
        }
    };

    getConn()
        .then(checkEmail)
        .then(Encrypt)
        .then(checkPassword)
        .then(verify)
        .then(respond)
        .catch(onError);
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