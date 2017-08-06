var port = process.env.PORT || 8124;

var express = require('express');
var app = express();

var server = app.listen(port);

var io = require('socket.io').listen(server);

var session = require('express-session');
var MYSQLStore = require('express-mysql-session')(session);

var jwt = require('express-jwt');

var mysql = require('mysql'),
    crypto = require('crypto'),
    bodyParser = require('body-parser');

var sharedsession = require('express-socket.io-session');

var _ = require("underscore")

var mysqlSessionOptions = {
    host: 'localhost',
    port: 3306, // 기본
    user: 'root',
    password: 'zk5687',
    database: 'pretzel'
    // mysql 접속 정보.
    // session에서 만 사용.
}
var Session = session({
    secret: 'kGusbVJHUSGD6$VgAS4S^VGB',
    resave: false,
    saveUninitialized: true,
    store: new MYSQLStore(mysqlSessionOptions)
});
app.use(Session)

io.use(sharedsession(Session, {
    autosave: true
}))
app.set('view engine', 'pug');
app.locals.pretty = true;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api', require('./routes/api'));

var onlineUser = [];
var clients = 0;
app.get('/chat', (req, res) => {
    res.render('chat', {
        list: onlineUser
    })
})


io.on('connection', (socket) => {
    clients++;
    console.log(socket.handshake.session)
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
        } else {
            var user = {};
            user['email'] = email;
            user['id'] = socket.id;
            onlineUser.push(user);
            socket.broadcast.emit('new', email);
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
    socket.send(socket.id)
})

server.listen(port, () => {
    console.log('Pretzel Server listening at port', port);
})