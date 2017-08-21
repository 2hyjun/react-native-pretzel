import {
    AsyncStorage,
    Alert
} from 'react-native'
import SocketIOClient from 'socket.io-client';
import {
    GiftedChat
} from 'react-native-gifted-chat';
import Reactotron from 'reactotron-react-native'

import _ from 'lodash';
import global from './global'
const socket = null;
const Socket = {
    onReceive: (data) => {
        return new Promise((Resolve, Reject) => {
            const ChatListSTORAGEKEY = '@PRETZEL:chatlist';
            const ChatRoomSTORAGEKEY = '' + data.user._id + ':' + data.rid;

            const GetPrevList = () => {
                return new Promise((resolve, reject) => {
                    AsyncStorage.getItem(ChatListSTORAGEKEY)
                        .then((value) => {
                            console.log("GetPrevList")
                            if (!value)
                                resolve([]);
                            else 
                                resolve(JSON.parse(value));
                        })
                });

            }
            const SetChatList = (list) => {
                return new Promise((resolve, reject) => {
                    console.log("SetChatList")
                    let messageInfo = {
                        user_email: data.to,
                        partner_email: data.user.name,
                        title: data.title,
                        rid: data.rid,
                    }
                    if (!_.find(list, messageInfo))
                        list.push(messageInfo);
                    AsyncStorage.setItem(ChatListSTORAGEKEY, JSON.stringify(list))
                        .then(() => {
                            resolve();
                        })


                });
            }
            const GetPrevMessages = () => {
                return new Promise((resolve, reject) => {
                    console.log("GetPrevMessages")
                    AsyncStorage.getItem(ChatRoomSTORAGEKEY)
                        .then((value) => {
                            if (value)
                                resolve(JSON.parse(value))
                            else
                                resolve([]);
                        })
                });


            }

            const SetMessages = (list) => {
                return new Promise((resolve, reject) => {
                    console.log("SetMessages")
                    list = GiftedChat.append(list, data);
                    AsyncStorage.setItem(ChatRoomSTORAGEKEY, JSON.stringify(list))
                        .then(() => {
                            resolve()
                        })
                });

            }
            GetPrevList()
                .then(SetChatList)
                .catch(e => {
                    if (!e.em)
                        console.error(e)
                })
                .done();

            GetPrevMessages()
                .then(SetMessages)
                .catch(e => {
                    if (!e.em)
                        console.error(e)
                })
                .then(() => {
                    return new Promise((resolve, reject) => {
                        Resolve();
                    });
                })
        });



    },

    StoreMessages(data) {

        AsyncStorage.getItem(ChatRoomSTORAGEKEY)
            .then((value) => {
                if (value)
                    return new Promise.resolve(JSON.parse(value));
                else
                    return new Promise.resolve([]);
            })
            .then((list) => {
                list = GiftedChat.append(list, data);
                AsyncStorage.setItem(ChatRoomSTORAGEKEY, JSON.stringify(list))
                    .then(() => {
                        Alert.alert('', 'message got it!')
                        return
                    })
                    .catch(e => console.error(e))

            });
    },
    connectSocket: () => {
        Reactotron.log(socket);
        if (socket === null) {
            socket = SocketIOClient('http://13.124.147.152:8124');
            socket.emit('join', global.user_email);
        }
        
        return socket;
    },
};


export default Socket;