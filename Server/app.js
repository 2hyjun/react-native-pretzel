var salt = 'fuckyouhackerthisissaltforyou';
var port = process.env.PORT || 8124;

var express = require('express');
var app = express();

var server = app.listen(port);

var io = require('socket.io').listen(server);

var session = require('express-session');
var MYSQLStore = require('express-mysql-session')(session);

var mysql = require('mysql'),
    crypto = require('crypto'),
    bodyParser = require('body-parser');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zk5687',
    database: 'pretzel'
});
var mysqlSessionOptions = {
    host: 'localhost',
    port: 3306, // 기본
    user: 'root',
    password: 'zk5687',
    database: 'pretzel'
    // mysql 접속 정보.
    // session에서 만 사용.
}

function now() {
    var date;
    date = new Date();
    date.getUTCDate()
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' +
        ('00' + (date.getUTCHours() + 9)).slice(-2) + ':' +
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2);
    return date;
}

console.log(now());
app.use(session({
    secret: 'kGusbVJHUSGD6$VgAS4S^VGB',
    resave: false,
    saveUninitialized: true,
    store: new MYSQLStore(mysqlSessionOptions)
}))

app.set('view engine', 'pug');
app.locals.pretty = true;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    if (req.session.signedUser) {
        res.send({
            resultCode: 100
        })
    } else {
        res.send({
            resultCode: 1
        })
    }
});

app.get('/logout', (req, res) => {
    delete req.session.signedUser;
    res.send('logout success')
})

app.post('/login', (req, res) => {
    if (req.body.email && req.body.password) {
        var sql = 'SELECT * FROM users where user_email=?;';
        var params = [req.body.email];
        conn.query(sql, params, (err, results, fields) => {
            if (err) {
                console.log(err);
                res.send({
                    resultCode: 1,
                    result: err
                })
            } else if (results.length == 0) {
                res.send({
                    resultCode: 2,
                    result: 'No such ID'
                })
            } else {
                crypto.pbkdf2(req.body.password, salt.toString('base64'), 1000, 64, 'sha512', (err, key) => {
                    if (key.toString('base64') === results[0].user_password) {
                        req.session.signedUser = results[0]
                        res.send({
                            resultCode: 100,
                            result: req.session.signedUser
                        });
                    } else {
                        res.send({
                            resultCode: 3,
                            result: 'Wrong Password'
                        });
                    }
                })
            }
        })
    } else {
        res.send({
            resultCode: 4,
            result: 'No Body Parameters'
        });
    }
})

app.post('/register', (req, res) => {
    var email = req.body.email,
        name = req.body.name,
        password = req.body.password,
        univ = req.body.univ,
        major = req.body.major;

    if (email && name && password && univ && major) {
        crypto.pbkdf2(password, salt.toString('base64'), 1000, 64, 'sha512', (err, key) => {
            var sql = 'INSERT INTO users (user_email, user_name, user_password, user_univ, user_major) VALUES(?, ?, ?, ?, ?);';
            var params = [email, name, key.toString('base64'), univ, major];
            conn.query(sql, params, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    if (err.errno == 1062) {
                        res.send({
                            registerCode: 1,
                            result: 'Duplicated Email'
                        })
                    } else {
                        res.send({
                            registerCode: 2,
                            result: err
                        })
                    }

                } else {
                    res.send({
                        registerCode: 100,
                        result: 'Register Success'
                    })
                }
            })
        })
    } else {
        res.redirect({
            registerCode: 3,
            result: 'No Body Parameters'
        })
    }
})

app.get('/timeline', (req, res) => {
    var sql = 'SELECT * FROM timeline where completed="N"';
    conn.query(sql, (err, results, fields) => {
        if (err) {
            console.log(err);
            res.send({
                resultCode: 1,
                result: err
            })
        } else {
            res.send({
                resultCode: 100,
                result: results
            });
        }

    })
})

app.post('/timeline/new_request', (req, res) => {
    var title = req.body.title,
        content = req.body.content,
        detailInfo = req.body.detailInfo,
        expectedPrice = req.body.expectedPrice,
        fee = req.body.fee,
        deadLine = req.body.deadLine,
        contentType = req.body.contentType,
        place = req.body.place;
    if (title && content && detailInfo && expectedPrice && fee && deadLine && contentType && place) {
        var sql = 'INSERT INTO timeline' +
            ' (user_email, content, detailInfo, expectedPrice, fee, deadline, title, contentType, time, place) ' +
            'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        var params = [req.session.signedUser.user_email, content, detailInfo, expectedPrice, fee, deadLine, title, contentType, now(), place];
        conn.query(sql, params, (err, results, fields) => {
            if (err) {
                console.log(err);
                res.send({
                    resultCode: 1,
                    result: err
                })
            } else {
                res.send({
                    resultCode: 100,
                    result: results
                })
            }
        })
    } else {
        res.send({
            resultCode: 2,
            result: '파라미터 부족'
        })
    }
})

app.get("/timeline/delete/:id", (req, res) => {
    var rid = parseInt(req.params.id);
    var sql = 'SELECT * FROM timeline where rid=?;';
    //console.log(sql)
    var params = [rid];
    conn.query(sql, params, (err, results, fields) => {
        if (err) {
            console.log(err);
            res.send({
                resultCode: 3,
                result: err
            })
        } else if (req.session.signedUser.user_email !== results[0].user_email) {
            res.send({
                resultCode: 1,
                result: 'Permission Denied'
            })
        } else {
            var sql = 'DELETE FROM timeline where rid=?';
            conn.query(sql, params, (err, results, fields) => {
                if (err) {
                    console.log(err)
                    res.send({
                        resultCode: 2,
                        result: err
                    })
                } else {
                    res.send({
                        resultCode: 100,
                        result: results
                    })
                }
            })
        }
    })
})


app.post('/timeline/update/:id', (req, res) => {
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
                    var params = [title, content, detailInfo, expectedPrice, fee, deadLine, contentType, now(), place, rid];
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


app.get('/mypage', (req, res) => {
    var sql = 'SELECT * FROM timeline where user_email=?;';
    params = [req.session.signedUser.user_email];
    console.log(req.session.signedUser.user_email);
    conn.query(sql, params, (err, results, fields) => {
        if (err) {
            console.log(err);
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
app.get('/test', (req, res) => {
    // var sql = 'SELECT '+
    // 'user_email, content, ' + 
    // 'detailInfo, expectedPrice, ' + 
    // 'fee, deadline, rid, title'
    // ' FROM timeline_helpyou, timeline_helpme';
    var sql = 'SELECT user_email FROM timeline_helpyou';
    conn.query(sql, (err, results, fields) => {
        res.send(results);
    })
})
app.get('/chat', (req, res) => {
    res.sendFile('C:/Users/2hyjun/pretzel/Server/chat.html');
})

server.listen(port, () => {
    console.log('Pretzel Server listening at port', port);
})