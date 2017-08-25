var crypto = require('crypto'),
    db = require('../../../db/mysql'),
    config = require('../../../config'),
    nodemailer = require('nodemailer'),
    simpleEncrypt = require('../../../config/simpleEncrypt'),
    fs = require('fs');

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
        return new Promise((resolve) => {
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
            
            conn.query(sql, params, (err) => {
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
            let encodeURIEmail = encodeURIComponent(email);
            let encryptedEmail = simpleEncrypt.encrypt('thisiSSeCONdSimplepretzelClientEncryptionKEy', encodeURIEmail);
            console.log('encryptedEmail', encryptedEmail);
            // console.log('encrypted2Email', encrypted2Email);
            const html = 
            `
            <!doctype html>
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <div id="readFrame">
            
                        <xmeta http-equiv="Content-Type" content="text/html; charset=utf-8">
                            <!--  -->
            
            
                            <table width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff">
                                <tbody>
                                    <tr>
                                        <td style="padding:20px 10px 12px 10px;">
                                            <table width="600" cellpadding="0" cellspacing="0" border="0">
                                                <tbody>
                                                    <!-- header -->
                                                    <tr>
                                                        <td valign="top">
                                                            <table width="600" cellpadding="0" cellspacing="0" border="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="92">
                                                                            <font color="#ea604a" font size="120%">pretzel</font>
                                                                        </td>
                                                                        <td>
                                                                            <p width="714" style="margin:0 0 0 0; padding:11px 0 10px 0; font-family:Malgun Gothic, Dotum; font-size:16px; color:#000; text-align:right;">이메일 인증</p>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <!-- //header -->
                                                    <!-- content -->
                                                    <tr>
                                                        <td style="padding:80px 7px 0 10px; border-top:2px solid #ea604a">
                                                            <table width="580" cellpadding="0" cellspacing="0" border="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <p style="margin:0 0 0 0; font-family:Malgun Gothic, Dotum; font-size:30px; color:#000; line-height:42px; letter-spacing:-3px;"
                                                                                align="center">pretzel 회원가입을 진심으로 환영합니다.</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td height="47" style="font-size:0;"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="padding:37px 0 42px 0; border:2px solid #ddd;">
                                                                            <table width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="85"></td>
                                                                                        <td width="390">
                                                                                            <p style="margin:0 0 0 0; padding-bottom: 0; font-family:Malgun Gothic, Dotum; font-size:18px; font-weight:bold; color:#333; line-height:26px; word-break:break-all; white-space:pre-wrap;"
                                                                                                align="center"><a href="http://13.124.147.152:8124/api/auth/checkEmailAuth?email=${encryptedEmail}" style=" color: #ea604a">pretzel 시작하기</a></p>
                                                                                        </td>
                                                                                        <td></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr height="39" style="font-size:0;">
                                                                        <td></td>
                                                                    </tr>
                                                                    <tr height="53" style="font-size:0;">
                                                                        <td></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <!-- //content -->
                                                    <!-- footer -->
                                                    <tr>
                                                        <td>
                                                            <table width="600" cellpadding="0" cellspacing="0" border="0" style="padding:24px 0 0 0; background:#fafafa">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="font-family:Dotum; font-size:12px; color:#333; line-height:20px;">본 메일은 발신전용 메일입니다.</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="font-family:Dotum; font-size:12px; color:#333; line-height:20px; text-align:left">
                                                                            <p>copyright&copy pretzel all right reserved</p>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <!— //footer —>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </xmeta>
                    </div>
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
            transporter.sendMail(mailOptions, (error) => {
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
exports.checkEmailAuth = (req, res) => {
    let EncryptedEmail = req.query.email;
    //const email = simpleEncrypt.decrypt('thisiSfIrStSimplepretzelClientEncryptionKEy', EncryptedEmail);
    let email = simpleEncrypt.decrypt('thisiSSeCONdSimplepretzelClientEncryptionKEy', EncryptedEmail)
    //console.log('decrypted: 'email);
    email = decodeURIComponent(email);
    console.log(email);
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
            conn.query(sql, params, (err, results) => {
                if (err) {
                    reject({
                        err: err
                    });
                } else if (results.length === 0) {
                    reject({
                        errMessage: '존재 하지 않는 이메일입니다.'
                    });
                } else {
                    resolve(conn);
                }
            });
        });
    };

    const verify = (conn) => {
        return new Promise((resolve, reject) => {
            var sql = 'UPDATE users SET auth=? where user_email=?';
            var params = ['Y', email];
            conn.query(sql, params, (err) => {
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
        res.redirect('http://13.124.147.152:8124/verified.html');
    };

    const onError = (err) => {

        console.error(err);

        if (err.errMessage) {
            res.send(err.errMessage);
        } else {
            res.status(500).send('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
        
    };
    getConn()
        .then(checkEmail)
        .then(verify)
        .then(respond)
        .catch(onError);
};

exports.emailVerified = (req, res) => {
    fs.readFile('/verified.html', (err, data) => {
        if (err)
            console.error(err);
        else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
};
