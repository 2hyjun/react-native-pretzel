var port = process.env.PORT || 8124;

var express = require('express');
var app = express();

var server = app.listen(port);

//var io = require('socket.io').listen(server);

var bodyParser = require('body-parser');

var _ = require("underscore")

var db = require('./db/mysql');
db.connect();

app.locals.pretty = true;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api', require('./routes/api'));


var RegisterSocketIoServer = require('./socket.io/chat');

RegisterSocketIoServer(server);
// io.on('connection', (socket) => {
//     clients++;
//     //console.log(socket.handshake.session)
//     var email = socket.handshake.session.signedUser.user_email;
//     if (email) {
//         var isInList = _.find(onlineUser, (user) => {
//             return user.email == email
//         })
//         if (isInList) {
//             var index = _.findIndex(onlineUser, (user) => {
//                 return user.email == email
//             })
//             onlineUser[index].id = socket.id;
//         } else {
//             var user = {};
//             user['email'] = email;
//             user['id'] = socket.id;
//             onlineUser.push(user);
//             socket.broadcast.emit('new', email);
//         }
//         io.to(socket.id).emit('message', {
//             from: 'admin',
//             message: 'Hi guy'
//         })

//     } else {
//         socket.emit('conn', 'Please log in First');
//     }
//     socket.on('message', (data) => {
//         var index = _.findIndex(onlineUser, (user) => {
//             return user.email == data.dest
//         })
//         io.to(onlineUser[index].id).emit('message', data);
//     })
// })

server.listen(port, () => {
    console.log('Pretzel Server listening at port', port);
})