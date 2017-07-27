var port = process.env.PORT || 8124;

var express = require('express');
var app = express();

var server = app.listen(port);

var io = require('socket.io').listen(server);

var session = require('express-session');
var MYSQLStore = require('express-mysql-session')(session);
var _ = require('underscore');

var mysql = require('mysql'),
    crypto = require('crypto'),
    bodyParser = require('body-parser');
var mysqlSessionOptions = {
    host: 'localhost',
    port: 3306, // 기본
    user: 'root',
    password: 'zk5687',
    database: 'pretzel'
    // mysql 접속 정보.
    // session에서 만 사용.
}
var mysqlSession = session({
    secret: 'kGusbVJHUSGD6$VgAS4S^VGB',
    resave: false,
    saveUninitialized: true,
    store: new MYSQLStore(mysqlSessionOptions)
});
app.use(mysqlSession);

var sharedSession = require('express-socket.io-session');
io.use(sharedSession(mysqlSession, {
    autosave: true
}))
app.set('view engine', 'pug');
app.locals.pretty = true;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
var signedUser;
var homepage = require('./routes/hompage');
var logout = require('./routes/logout.js');
var login = require('./routes/login');
var register = require('./routes/register');
var timeline = require('./routes/timeline');
var new_request = require('./routes/newRequest');
var timeline_delete = require('./routes/timeline_delete');
var timeline_update = require('./routes/timeline_update');
var mypage = require('./routes/mypage')
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
app.get('/logout', logout);
app.post('/login', login);
app.post('/register', register);
app.get('/timeline', timeline);
app.post('/timeline/new_request', new_request);
app.get("/timeline/delete/:id", timeline_delete);
app.post('/timeline/update/:id', timeline_update);
app.get('/mypage', mypage);

app.get('/login', (req, res) => {
    res.render('new_request');
})
var onlineUser = [];
var clients = 0;


io.on('connection', (socket) => {
    clients++;
    var email = socket.handshake.session.signedUser.user_email;
    if (email) {
        var isInList = _.find(onlineUser, (user) => {
            return user.email == email
        })
        if (isInList) {
            var index = _.findIndex(onlineUser, (user) => {
                return user.email == email
            })
            onlineUser[index].id = socket.id;
            socket.emit('conn', 'Re Hello, ' + socket.handshake.session.signedUser.user_email)
        } else {
            var user = {};
            user['email'] = email;
            user['id'] = socket.id;
            onlineUser.push(user);
            socket.emit('conn', 'Hello, ' + socket.handshake.session.signedUser.user_email)
        }
        io.to(socket.id).emit('message', {
            from: 'admin',
            message: 'Hi guy'
        })

    } else {
        socket.emit('conn', 'Please log in First');
    }
    socket.on('message', (data) => {
        var index = _.findIndex(onlineUser, (user) => {
            return user.email == data.dest
        })
        io.to(onlineUser[index].id).emit('message', data);
    })
})

app.get('/chat', (req, res) => {
    res.render('chat', {
        list: onlineUser,
        user: req.session.signedUser.user_email,
    })
})
server.listen(port, () => {
    console.log('Pretzel Server listening at port', port);
})