const socketIo = require('socket.io')
var clients = 0;
var user = {};
module.exports = (server) => {


    const io = socketIo(server);
    io.on('connection', (socket) => {
        
        let email = undefined;

        socket.on('join', (user_email) => {
            if (!user[user_email])
                clients++;
            console.log('\t\t\t', user_email, 'connected, socket id: ', socket.id, clients, 'user connected now.');
            email = user_email;
            user[email] = socket.id;
            console.log(user);
        })
        
        socket.on('disconnect', () => {
            console.log(email, 'has been disconnected');
            console.log(user)
        })
        socket.on('message', (data) => {
		console.log('MESSAGE: ',data);
            if (user[data.to]) {
                
                io.to(user[data.to]).emit('message', data);
                //console.log(data);
                console.log('message', data.text, 'delivered from', data.user.name, 'to', data.to)
            } else {
                console.log('user: ', user);
                
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
