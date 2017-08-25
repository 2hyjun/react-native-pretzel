const socketIo = require('socket.io');
var clients = 0;
var user = {};
var messageBuffer = {};
module.exports = (server) => {

    const io = socketIo(server, {pingTimeout: 30000});
    io.on('connection', (socket) => {
        
        let email = undefined;
        console.log('\n\t\t\t\t*****someone connected****\n')
        socket.on('join', (user_email) => {
            email = user_email;
            if (!user[email]) {
                clients++;
                console.log('\t\t\t', email, 'connected, socket id: ', socket.id, clients, 'user connected now.');
                user[email] = socket.id;
            } else {
                console.log('\t\t\t\t\t', email, 'reconnected., socket id: ', socket.id, clients, 'user connected now.');
            }
            if (messageBuffer[email]) {
                if (messageBuffer[email].length > 0) {
                    console.log(`-----${email}'s buffer has ${messageBuffer[email].length} messages.`);
                    for (var i = 0; i < messageBuffer[email].length; i++) {
                        setTimeout(() => {
                            io.to(user[email]).emit('message', messageBuffer[email][i]);
                        }, 100);
                        console.log(`${i + 1}'th messages sent`)
                    }
                    messageBuffer[email] = [];
                }
            }
            console.log(user);
        });
        
        socket.on('disconnect', () => {
            if (user[email]) {
                clients--;
                console.log(`\n\t\t\t\t*****${email} disconnected****\n`);
                // console.log(email, 'has been disconnected', clients, 'user connected now.');
                delete user[email];
                console.log(user);
            } 
        });
        
        socket.on('message', (data) => {
            //console.log('MESSAGE: ',data);
            if (user[data.to]) {
                io.to(user[data.to]).emit('message', data);
                //console.log(data);
                console.log('message', data.text, 'delivered from', data.user.name, 'to', data.to);
            } else {
                if (messageBuffer[data.to] === undefined) {
                    messageBuffer[data.to] = [];
                }
                messageBuffer[data.to].push(data);
                console.log(`a messages to ${data.to} is saved.`);
            }
        });

        // {
        //     _id: 1,
        //     text: 'My message',
        //     createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
        //     user: {
        //         _id: 2,
        //         name: 'React Native',
        //         avatar: 'https://facebook.github.io/react/img/logo_og.png',
        //     },
        //     image: 'https://facebook.github.io/react/img/logo_og.png',
        //     // Any additional custom parameters are passed through
        // }
    });
};
