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

app.get('/chat', (req, res) => {
    res.sendFile('C:/Users/2hyjun/pretzel/Server/chat.html');
})

server.listen(port, () => {
    console.log('Pretzel Server listening at port', port);
})