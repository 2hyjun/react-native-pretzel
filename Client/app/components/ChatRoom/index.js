import React from 'react'
import {
    Text,
    View,
    Image,
    Alert,
    Platform,
    AsyncStorage,
} from 'react-native';

import styles from './style'

import SocketIOClient from 'socket.io-client';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import global from '../../config/global';
import ChatList from "../../screen/ChatList/index";

export default class Chat extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            partnerId: -1,
            messages: [],
            user_email: global.user_email,
            typingText: null,
        };

        this._init = this._init.bind(this);
        this._onSend = this._onSend.bind(this);
        this._onReceive = this._onReceive.bind(this);
        this._storeMessages = this._storeMessages.bind(this);

        this.socket = global.SocketIo();
        this.socket.on('message', this._onReceive);

        this._init();
    }

    _init() {
        this.socket.emit('join', global.user_email);
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        const ChatRoomSTORAGEKEY = '' + params.partner_email + ':'+ params.rid;
        AsyncStorage.getItem(ChatRoomSTORAGEKEY)
            .then((messages) =>  {
                if (messages !== null)
                    this.setState({messages: JSON.parse(messages)})
            })
            .catch(e => console.error(e));

    }
    _onSend(messages = []) {
        const { params } = this.props.navigation.state;
        this.socket.emit('message', messages[0]);

        this._storeMessages(messages)

    }

    _onReceive(data) {
        const ChatListSTORAGEKEY = '@PRETZEL:chatlist';
        const { params } = this.props.navigation.state;
        AsyncStorage.getItem(ChatListSTORAGEKEY)
            .then((value) => {
                if (!value) {
                    return new Promise.resolve([])
                } else {
                    return new Promise.reject({em: 'already exist'})
                }
            })
            .then((list) => {
                list.push({
                    user_email: data.to,
                    partner_email: data.user.name,
                    title: params.title,
                    rid: params.rid,
                    recentM: data.text,
                });
                AsyncStorage.setItem(ChatListSTORAGEKEY, JSON.stringify(list))
                    .then(() => console.log(list, 'List saved'))
                    .catch(e => console.error(e))
                    .done();
            })
            .catch((e) => {
                if (!e.em)
                    console.error(e)
            })
            .done();
        this._storeMessages(data);
    }

    _storeMessages(messages) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            const arr = this.state.messages;
            const str = JSON.stringify(arr);

            const { params } = this.props.navigation.state;
            const ChatRoomSTORAGEKEY = '' + params.partner_email + ':'+ params.rid;

            AsyncStorage.setItem(ChatRoomSTORAGEKEY, str)
                .then(() => console.log(str, 'saved'))
                .catch(e => console.error(e))
                .done();
        });
    }


    render() {

        return (

                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages) => this._onSend(messages)}
                    placeholder={this.props.navigation.state.params.title}
                    locale={'ko'}
                    renderAvatarOnTop={true}
                    user={{
                        _id: global.user_email,
                        name: global.user_email,
                    }}
                />

        );
    }
}