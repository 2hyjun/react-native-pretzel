const socketIo = require('socket.io')
var clients = 0;
var user = {};
module.exports = (server) => {


    const io = socketIo(server);
    io.on('connection', (socket) => {
        
        let email = undefined;

        socket.on('join', (user_email) => {
            email = user_email;
            if (!user[email]) {
                clients++;
                console.log('\t\t\t', email, 'connected, socket id: ', socket.id, clients, 'user connected now.');
                user[email] = socket.id;
            } else {
                console.log('\t\t\t\t\t', email, 'reconnected., socket id: ', socket.id, clients, 'user connected now.');
            }
            console.log(user);
        })

        socket.on('check', (user_email) => {
            email = user_email;
            if (!user[email]) {
                clients++;
                console.log('\t\t\t', email, 'reconnected, socket id: ', socket.id, clients, 'user connected now.');
                user[email] = socket.id;
            } else {
                console.log('\t\t\t', email, 'was connected successfully, socket id: ', socket.id, clients, 'user connected now.');
            }
            console.log(user);
        })
        
        socket.on('disconnect', () => {
            if (user[email]) {
                clients--;
                console.log(email, 'has been disconnected', clients, 'user connected now.');
                delete user[email];
                console.log(user)
            }
            
        })
        socket.on('message', (data) => {
		console.log('MESSAGE: ',data);
            if (user[data.to]) {
                
                io.to(user[data.to]).emit('message', data);
                //console.log(data);
                console.log('message', data.text, 'delivered from', data.user.name, 'to', data.to)
            } else {
                console.log(data);
                console.log(user);
                
                console.log('saved')
            }
            
        })

        socket.on('debug', (data) => {
            //console.log('message', data);
        })

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
    })
}
