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

var homepage = require('./routes/hompage');
var logout = require('./routes/logout.js');
var login = require('./routes/login');
var register = require('./routes/register');
var timeline = require('./routes/timeline');
var new_request = require('./routes/newRequest');
var timeline_delete = require('./routes/timeline_delete');
var timeline_update = require('./routes/timeline_update');
var mypage = require('./routes/mypage')
app.get('/', homepage);
app.get('/logout', logout);
app.post('/login', login);
app.post('/register', register);
app.get('/timeline', timeline);
app.post('/timeline/new_request', new_request);
app.get("/timeline/delete/:id", timeline_delete);
app.post('/timeline/update/:id', timeline_update);
app.get('/mypage', mypage);

<<<<<<< HEAD
app.get('/login', (req, res) => {
    res.render('login');
=======
app.get('/chat', (req, res) => {
    res.sendfile('./chat.html');
>>>>>>> ee7aa2542caf1034fe692446deb84711a97d1cce
})

var onlineUser = {};
io.on('connection', (socket) => {
    clients++;
<<<<<<< HEAD
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
=======
    socket.emit('Hello!');
    socket.broadcast.emit('new', clients + ' clients connected!\nYour Socket ID: ' + socket.id)
    socket.on('disconnect', () => {
        clients--;
        socket.broadcast.emit('new', clients + ' clients connected!\nYour Socket ID: ' + socket.id)
>>>>>>> ee7aa2542caf1034fe692446deb84711a97d1cce
    })
    socket.send(socket.id)
})

server.listen(port, () => {
    console.log('Pretzel Server listening at port', port);
})