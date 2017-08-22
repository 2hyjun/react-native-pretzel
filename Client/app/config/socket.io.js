import { AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client';
import Reactotron from 'reactotron-react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import _ from 'lodash';

import global from './global';

let socket = null;

const Socket = {
    onReceive: (data) => {
        return new Promise((Resolve) => {
            const ChatListSTORAGEKEY = '@PRETZEL:chatlist';
            const ChatRoomSTORAGEKEY = '' + data.user._id + ':' + data.rid;

            const GetPrevList = () => {
                return new Promise((resolve) => {
                    AsyncStorage.getItem(ChatListSTORAGEKEY)
                        .then((value) => {
                            Reactotron.log('GetPrevList');
                            if (!value) {
                                resolve([]);
                            } else {
                                resolve(JSON.parse(value));
                            }
                        });
                });
            };
            const SetChatList = (list) => {
                return new Promise((resolve) => {
                    Reactotron.log('SetChatList');
                    const messageInfo = {
                        user_email: data.to,
                        partner_email: data.user.name,
                        title: data.title,
                        rid: data.rid,
                    };
                    if (!_.find(list, messageInfo)) {
                        list.push(messageInfo);
                    }
                    AsyncStorage.setItem(ChatListSTORAGEKEY, JSON.stringify(list))
                        .then(() => {
                            resolve();
                        });
                });
            };
            const GetPrevMessages = () => {
                return new Promise((resolve) => {
                    Reactotron.log("GetPrevMessages");
                    AsyncStorage.getItem(ChatRoomSTORAGEKEY)
                        .then((value) => {
                            if (value) {
                                resolve(JSON.parse(value));
                            } else {
                                resolve([]);
                            }
                        });
                });
            };

            const SetMessages = (list) => {
                return new Promise((resolve) => {
                    Reactotron.log("SetMessages");
                    let newList = list;
                    newList = GiftedChat.append(list, data);
                    AsyncStorage.setItem(ChatRoomSTORAGEKEY, JSON.stringify(newList))
                        .then(() => {
                            resolve();
                        });
                });
            };
            GetPrevList()
                .then(SetChatList)
                .catch(e => {
                    if (!e.em) {
                        console.error(e);
                    }
                })
                .done();

            GetPrevMessages()
                .then(SetMessages)
                .catch(e => {
                    if (!e.em) {
                        console.error(e);
                    }
                })
                .then(() => {
                    Resolve();
                });
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
    disconnect: () => {
        socket.disconnect();
        socket = null;
    },
};


export default Socket;
