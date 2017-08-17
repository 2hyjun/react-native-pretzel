import React from 'react'
import {
    Text,
    View,
    Image,
    Alert,
    Platform,
} from 'react-native';

import styles from './style'

import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import global from '../../config/global';

const dest = Platform.OS === 'ios' ? 'pretzel@pusan.ac.kr' : 'biper94@gmail.com';

export default class Chat extends React.Component {
    constructor(props) {
        console.disableYellowBox = true;
        super(props);
        this.state = {
            id: -1,
            partnerId: -1,
            messages: [],
            user_email: global.user_email,
        };

        this._init = this._init.bind(this);
        this._onSend = this._onSend.bind(this);
        this._onReceive = this._onReceive.bind(this);
        this._storeMessages = this._storeMessages.bind(this);
        this._getId = this._getId.bind(this);
        this._getPartnerId = this._getPartnerId.bind(this);
        this._getPartnerIdEmit = this._getPartnerIdEmit.bind(this);


        this.socket = SocketIOClient('http://localhost:8124');
        this.socket.on('join', this._getId);
        this.socket.on('message', this._onReceive);
        this.socket.on('getPartnerId', this._getPartnerId);

        this._init();
    }

    _init() {
        this.socket.emit('join', global.user_email);
        if (Platform.OS === 'ios')
            this._getPartnerIdEmit('pretzel@pusan.ac.kr');
        else
            this._getPartnerIdEmit('biper94@gmail.com');
    }

    _getPartnerIdEmit(partnerEmail) {
        this.socket.emit('getPartnerId', partnerEmail);
    }

    _getId() {
        this.socket.on('join', (id) => {
            this.setState({id: id})
        })
    }


    _getPartnerId(partnerId) {
        this.setState({
            partnerId: partnerId
        })
    }
    componentWillMount() {
        this.setState({
            messages: [],
        });
    }
    _onSend(messages = []) {
        messages[0]['to'] = dest;
        this.socket.emit('message', messages[0]);

        this._storeMessages(messages);
    }
    _onReceive(data) {
        this._storeMessages(data);
    }

    _storeMessages(messages) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }
    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => this._onSend(messages)}
                user={{
                    _id: global.user_email,
                    name: global.user_email,
                }}
            />
        );
    }
}