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
        res.render('index', {
            time: Date(),
            img: 'hsk.gif',
            user: req.session.signedUser
        });
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    delete req.session.signedUser;
    res.redirect('/')
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', (req, res) => {
    if (req.body.email && req.body.password) {
        var sql = 'SELECT * FROM users where user_email=?;';
        var params = [req.body.email];
        conn.query(sql, params, (err, results, fields) => {
            if (results.length == 0) {
                res.write(`<script language=javascript>alert('No Such Email')</script>`);
                res.write(`<script language=javascript>window.location='/login'</script>`);
            } else {
                crypto.pbkdf2(req.body.password, salt.toString('base64'), 1000, 64, 'sha512', (err, key) => {
                    if (key.toString('base64') === results[0].user_password) {
                        req.session.signedUser = results[0]
                        
                        console.log(req.session.signedUser);
                        res.send(req.session.signedUser);
                    } else {
                        res.write(`<script language=javascript>alert('Wrong ID & Password')</script>`);
                        res.write(`<script language=javascript>window.location='/login'</script>`);
                    }
                })
            }
        })
    } else {
        res.status(500).send('Internal Server Error');
    }
})

app.get('/register', (req, res) => {
    res.render('register');
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
                    if (err.errno == 1062) {
                        res.write(`<script language=javascript>alert('Email Duplicated')</script>`);
                        res.write(`<script language=javascript>window.location='/register'</script>`);
                    } else {
                        res.status(500).send('Internal Server Error');
                    }

                } else {
                    res.redirect('/')
                }
            })
        })
    } else {
        res.status(500).send('Internal Server Error');
    }
})

app.get('/timeline', (req, res) => {
    var output = `
    <a href='/timeline/timeline_helpme'>Help Me</a><br>
    <a href='/timeline/timeline_helpyou'>Help You</a><br>
    `;
    res.send(output);
})

app.get(['/timeline/timeline_helpme','/timeline/timeline_helpme/:id'], (req, res) => {
    var sql = 'SELECT * FROM timeline_helpme';
    conn.query(sql, (err, results, fields) => {
        console.log('id in get', req.params.id);
        res.render('timeline_helpme', {
            timeline: results,
            id: parseInt(req.params.id)
        });    
    })
})
app.get(['/timeline/timeline_helpyou','/timeline/timeline_helpyou/:id'], (req, res) => {
    var sql = 'SELECT * FROM timeline_helpyou';
    conn.query(sql, (err, results, fields) => {
        console.log('id in get', req.params.id);
        res.render('timeline_helpme', {
            timeline: results,
            id: parseInt(req.params.id)
        });    
    })
})
app.get('/timeline/new_request', (req, res) => {
    res.render('new_request');
})

app.post('/timeline/new_request', (req, res) => {
    var title = req.body.title,
        content = req.body.content,
        detailInfo = req.body.detailInfo,
        expectedPrice = req.body.expectedPrice,
        fee = req.body.fee,
        deadLine = req.body.deadLine,
        type = req.body.type;
    
    var db = (type == '해주세요') ? 'timeline_helpme' : 'timeline_helpyou';
    var sql = 'INSERT INTO ' + db
        + ' (user_email, content, detailInfo, expectedPrice, fee, deadline, title) '
        + 'VALUES(?, ?, ?, ?, ?, ?, ?);';
    var params = [req.session.signedUser.user_email, content, detailInfo, expectedPrice, fee, deadLine, title];
    conn.query(sql, params, (err, results, fields) => {
        res.redirect('/timeline');
    })
})
server.listen(port, () => {
    console.log('Pretzel Server listening at port', port);
})