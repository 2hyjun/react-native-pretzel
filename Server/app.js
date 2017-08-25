var port = process.env.PORT || 8124;

var express = require('express');
var app = express();

var server = app.listen(port);

//var io = require('socket.io').listen(server);

var bodyParser = require('body-parser');

var db = require('./db/mysql');
db.connect();

app.locals.pretty = true;
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api', require('./routes/api'));


var RegisterSocketIoServer = require('./socket.io/chat');

RegisterSocketIoServer(server);

server.listen(port, () => {
    console.log('Pretzel Server listening at port', port);
});